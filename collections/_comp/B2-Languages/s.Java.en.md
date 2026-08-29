---
title: Java - Quick Reference
abbreviation: Java
categories: Sheet
subclass: Languages
---

## PART 1 — Language Identity, Design Philosophy, and Problem Space

### Starting Assumptions — version, runtime, implementation, and density strategy

This guide targets **Java 25 LTS / JDK 25 on a HotSpot-class JVM** as the main professional baseline. Java 26 is treated as the current feature-release reference, while Java 21 LTS remains important for enterprise compatibility, migration, and long-lived production systems. Oracle currently lists JDK 26 as the latest Java SE release, JDK 25 as the latest LTS release, and JDK 21 as the previous LTS release; OpenJDK records JDK 25 GA on September 16, 2025 and JDK 26 GA on March 17, 2026. ([オラクル][1])

**Density strategy:** adaptive — Java’s surface syntax is relatively stable and teachable, but professional mastery requires substantial treatment of the JVM, nominal object-oriented design, erased generics, collections, exception/resource boundaries, concurrency, build tooling, and enterprise-scale maintainability.

This part follows the uploaded tutorial specification: it treats Java as a coherent design system rather than as a syntax list, with special attention to `java_jvm_and_managed_runtime`, `java_nominal_oop_and_generics`, and `java_concurrency_and_enterprise_design`. 

A critical distinction must be maintained throughout the guide:

| Layer                         | What it governs                       | Examples                                                                               | Why the distinction matters                         |
| ----------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Java language specification   | Source-level syntax and semantics     | variables, classes, generics, statements, expressions, exceptions, definite assignment | Determines what Java source code means              |
| Java SE API                   | Standard platform libraries           | `java.lang`, `java.util`, `java.time`, `java.nio`, `java.concurrent`                   | Determines portable standard-library behavior       |
| JVM specification             | Virtual-machine execution model       | bytecode, class files, class loading, verification, JVM instructions                   | Explains what compiled Java targets                 |
| JDK implementation            | Compiler, tools, runtime distribution | `javac`, `java`, `jar`, `jlink`, JFR, `jcmd`                                           | Determines tooling and implementation behavior      |
| HotSpot / vendor JVM behavior | Concrete runtime strategy             | JIT, GC algorithms, profiling, deoptimization, runtime diagnostics                     | Determines much observed performance behavior       |
| Ecosystem convention          | Practices outside the language itself | Maven, Gradle, JUnit, Spring, Jakarta EE, logging frameworks                           | Determines how Java is commonly used professionally |

The Java SE 25 API documentation distinguishes Java SE APIs, whose module names start with `java`, from JDK-specific APIs, whose module names start with `jdk`; this distinction matters because not every JDK-specific API is part of the Java SE platform contract. ([Oracle Documentation][2])

### What Java Is — managed, nominal, class-centered, portable, industrial

Java is a **statically typed, class-based, nominally typed, garbage-collected, general-purpose programming language** designed around a managed runtime. Its core promise is not maximum expressiveness, minimum syntax, or complete low-level control. Its core promise is **portable, toolable, maintainable software at large scale**.

The usual slogan “write once, run anywhere” is incomplete but useful. Java source is compiled into JVM class files rather than directly into a single machine-specific executable. The JVM specification defines the class file format, loading/linking/initialization behavior, bytecode instruction set, and execution model; this is why Java portability is fundamentally a *VM-mediated portability model*, not merely a compiler trick. ([Oracle Documentation][3])

Java’s identity is therefore best understood through three linked design commitments:

| Commitment          | Java’s choice                                                                  | Practical consequence                                                                                |
| ------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Runtime portability | Compile source to JVM bytecode                                                 | The same program can target many operating systems and CPU architectures through JVM implementations |
| Nominal abstraction | Classes, interfaces, packages, modules, declared types                         | Large systems can use explicit contracts, stable APIs, and tool-supported refactoring                |
| Managed execution   | Garbage collection, runtime metadata, JIT optimization, reflection, monitoring | Java reduces manual memory-management burden but makes performance runtime-dependent                 |

Java is not merely “object-oriented.” It is a language where **objects, classes, interfaces, modules, exceptions, annotations, generics, reflection, and tooling** form an integrated engineering system.

### Historical Problem Space — why Java was designed this way

Java emerged in the 1990s under several pressures: C and C++ were powerful but unsafe and difficult to port; distributed systems and networked applications were growing; GUI and embedded ambitions required portability; and enterprise software needed stronger tooling, libraries, and maintenance discipline.

The original Java design therefore emphasized:

| Historical pressure           | Java response                                                    | Lasting consequence                                               |
| ----------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| C/C++ memory hazards          | Garbage collection and no pointer arithmetic in ordinary Java    | Fewer manual memory bugs, less low-level control                  |
| Platform fragmentation        | JVM bytecode and standard APIs                                   | Strong portability story, runtime dependency                      |
| Large application development | Classes, interfaces, packages, visibility, documentation tools   | Good refactoring and API design support                           |
| Security concerns             | Class loading, verification, sandbox history                     | Stronger managed-runtime boundaries, though not complete security |
| Enterprise maintainability    | Static types, checked exceptions, stable libraries               | Verbose but analyzable codebases                                  |
| Tooling needs                 | Regular syntax, metadata, reflection, standard build conventions | Strong IDE, testing, profiling, and framework ecosystems          |

Java’s history explains its conservatism. It usually prefers **compatibility, explicit structure, and platform stability** over rapid syntactic experimentation. Newer Java has become more concise through records, pattern matching, text blocks, local variable inference, switch expressions, sealed types, and virtual threads, but this modernization is layered onto a compatibility-preserving core.

### Language Personality — Java’s major design dimensions

Before using labels such as “static,” “strong,” or “object-oriented,” the ambiguity must be removed.

**Static typing** means type checks are performed before execution, usually at compile time. It does not mean no runtime checks exist. Java still performs runtime checks for casts, array stores, reflection, `instanceof`, dynamic dispatch, class loading, and null dereference.

**Strong typing** is less precise. In Java’s case, it usually means values are not freely reinterpreted across unrelated types without explicit conversion. However, Java still has casts, boxing/unboxing, numeric conversions, raw types, reflection, and unchecked warnings.

**Object-oriented** means different things in different languages. In Java, it primarily means class-based nominal subtyping with encapsulated state and behavior. It does not mean every good Java design should use inheritance.

| Dimension            | Java’s choice                                                | What it makes easy                                             | What it makes hard or costly                                                    |
| -------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Typing time          | Mostly static                                                | Refactoring, IDE support, API contracts, compile-time feedback | Some flexibility requires generics, interfaces, casts, or framework indirection |
| Type identity        | Nominal                                                      | Explicit contracts, stable APIs, precise domain modeling       | More boilerplate than structural typing or duck typing                          |
| Object model         | Class-based, reference-oriented                              | Encapsulation, polymorphism, framework integration             | Shared mutable state and inheritance misuse                                     |
| Generic model        | Erased generics                                              | Backward compatibility with older bytecode and libraries       | Runtime type information limitations, wildcard complexity, heap pollution risks |
| Memory model         | Managed heap plus GC                                         | Less manual allocation/free discipline                         | GC behavior, object churn, latency, memory pressure                             |
| Runtime model        | JVM with JIT                                                 | Adaptive optimization, portability, runtime diagnostics        | Warmup effects, deoptimization, implementation-dependent performance            |
| Error model          | Checked and unchecked exceptions                             | Explicit recoverable-error signaling is possible               | Poorly designed checked exceptions can pollute APIs                             |
| Concurrency model    | Threads, locks, atomics, executors, futures, virtual threads | Rich concurrency toolkit                                       | Data races, visibility errors, cancellation and interruption complexity         |
| Metaprogramming      | Annotations and reflection                                   | Frameworks, dependency injection, declarative metadata         | Runtime indirection, harder debugging, reflection cost                          |
| Ecosystem philosophy | Stability, tooling, libraries, enterprise convention         | Mature production workflow                                     | Heavy dependency graphs and framework overreach                                 |

### Java’s Core Design Tradeoff — explicit structure for maintainability

Java’s main tradeoff is **explicit structure in exchange for maintainability, tooling, and long-term compatibility**.

| Design feature         | Problem solved                       | Capability gained                                        | Cost introduced                     | Misuse encouraged                      | Programs that benefit                 | Programs that suffer                       |
| ---------------------- | ------------------------------------ | -------------------------------------------------------- | ----------------------------------- | -------------------------------------- | ------------------------------------- | ------------------------------------------ |
| Static nominal typing  | Ambiguous contracts in large systems | Refactoring, API stability, IDE analysis                 | More declarations and type ceremony | Over-modeling every concept as a class | Enterprise systems, libraries, APIs   | Small scripts, highly dynamic prototypes   |
| Classes and interfaces | Need for reusable abstraction        | Encapsulation and polymorphism                           | Inheritance complexity              | Deep class hierarchies                 | Long-lived domain models              | Simple data transformations                |
| Erased generics        | Backward compatibility               | Type-safe collections without breaking old bytecode      | Runtime generic limitations         | Raw types and unchecked casts          | Large legacy-compatible ecosystems    | Runtime type-reflective generic code       |
| Garbage collection     | Manual memory-management hazards     | Safer ordinary programming                               | Runtime memory-management cost      | Ignoring allocation behavior           | Server applications, business systems | Hard real-time systems                     |
| Checked exceptions     | Invisible recoverable failure        | API-level error signaling                                | Verbose signatures and wrapping     | Catch-and-ignore, overbroad `throws`   | APIs with meaningful recovery         | Callback-heavy or framework-driven code    |
| JVM portability        | Platform fragmentation               | Cross-platform deployment                                | Runtime dependency                  | Ignoring VM-specific performance       | Server and enterprise systems         | Ultra-small binaries or bare-metal systems |
| Reflection/annotations | Need for metadata-driven frameworks  | Dependency injection, ORMs, serialization, testing tools | Runtime failure and indirection     | Framework magic as architecture        | Enterprise frameworks                 | Simple systems needing directness          |

The professional Java mindset is not “use every feature.” It is **choose the level of structure that pays for itself over time**.

### What Java Makes Easy — stable systems, explicit contracts, tooling

Java makes the following kinds of work comparatively easy:

| Work type                   | Why Java helps                                                                               |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| Large codebases             | Packages, modules, visibility, static types, IDE refactoring, documentation, test frameworks |
| Public APIs                 | Explicit types, interfaces, checked contracts, stable binary compatibility conventions       |
| Enterprise services         | Mature libraries, observability tools, dependency management, application frameworks         |
| Concurrent server workloads | Threads, executors, concurrent collections, virtual threads, monitoring tools                |
| Cross-platform applications | JVM abstraction and broad vendor support                                                     |
| Long-term maintenance       | Backward compatibility, LTS releases, stable standard library                                |
| Tool-driven development     | Strong IDEs, build tools, profilers, debuggers, analyzers                                    |

Java’s productivity is not mostly about short syntax. It is about **tool-amplified engineering regularity**.

### What Java Makes Hard — lightweight expression, runtime purity, low-level control

Java makes several things harder than adjacent languages:

| Hard area                      | Why it is hard in Java                                                         | Better mental model                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Ultra-light scripting          | Java’s type and project structure create ceremony                              | Use Java for systems, not always for throwaway scripts                                    |
| Runtime structural flexibility | Java is nominal, not duck-typed                                                | Model contracts with interfaces, records, sealed types, or framework boundaries           |
| Zero-overhead abstraction      | Objects, boxing, lambdas, streams, reflection, and GC may allocate or dispatch | Treat abstraction as usually efficient but not automatically free                         |
| Fully precise null safety      | `null` is legal for most reference types                                       | Use API discipline, annotations, validation, and `Optional` where appropriate             |
| Generic runtime reflection     | Type erasure removes most generic parameters at runtime                        | Use explicit `Class<T>`, type tokens, or framework-specific mechanisms                    |
| Deterministic cleanup          | GC does not close files, sockets, database connections, or locks               | Use `try-with-resources` and explicit lifecycle management                                |
| Shared-memory concurrency      | Java exposes powerful but sharp primitives                                     | Prefer immutability, confinement, executors, structured task design, and safe publication |
| Small standalone deployment    | JVM-based deployment has runtime and packaging complexity                      | Use `jlink`, containers, native-image alternatives, or accept JVM deployment cost         |

### What Java Discourages or Prevents — and what it leaves to discipline

Java deliberately prevents many low-level hazards common in C/C++: ordinary Java has no pointer arithmetic, no manual `free`, no arbitrary memory reinterpretation, and no unchecked stack memory lifetime. This improves memory safety for ordinary code.

But Java does **not** prevent all serious bugs.

| Area              | Java prevents or reduces                      | Java leaves to programmer discipline                                          |
| ----------------- | --------------------------------------------- | ----------------------------------------------------------------------------- |
| Memory management | Most use-after-free and double-free errors    | Memory leaks through retained references, unclosed resources                  |
| Type safety       | Many invalid operations at compile time       | Raw types, unchecked casts, reflection misuse                                 |
| Null safety       | Nothing systematic at the language level      | Null contracts, validation, annotations, `Optional` usage                     |
| Concurrency       | Some library-level safety tools               | Data races, deadlocks, visibility errors, cancellation mistakes               |
| API design        | Visibility, interfaces, records, sealed types | Over-abstraction, leaky abstractions, unstable contracts                      |
| Error handling    | Exceptions and `try-with-resources`           | Meaningful recovery design, logging, propagation boundaries                   |
| Security          | Managed runtime and verification help         | Deserialization risks, dependency supply chain, reflection, native calls      |
| Performance       | JIT and GC optimize many cases                | Allocation pressure, boxing, bad data structures, blocking, poor benchmarking |

A common failure in Java education is treating Java as if the compiler will protect against all design mistakes. Java’s compiler is strong, but Java still depends heavily on **API discipline, runtime awareness, and engineering convention**.

### Interdisciplinary Foundations — JVM, nominal types, concurrency, and enterprise design

Java benefits from interdisciplinary explanation, but only where it clarifies actual programming. The key lenses are compiler/runtime systems, type theory, software architecture, concurrency theory, and production engineering.

| Lens or external field | Core idea                                                                               | Java features clarified                                            | Practical programming consequence                                                 | Where it appears in the guide | Limit of the lens                                                |
| ---------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------- |
| Compiler and VM theory | Source code is transformed into intermediate representation and executed by a runtime   | bytecode, class files, JIT, class loading, verification            | Performance and behavior depend on both language semantics and JVM implementation | PART 7                        | Does not replace API-level programming knowledge                 |
| Type theory            | Types classify values and constrain operations                                          | nominal typing, subtyping, generics, variance, erasure             | Helps explain what Java can and cannot prove statically                           | PART 3                        | Java’s type system is pragmatic, not a fully formal proof system |
| Object-oriented design | Behavior is organized behind contracts and object boundaries                            | classes, interfaces, inheritance, composition                      | Helps decide when to use interfaces, records, services, and composition           | PART 3, PART 4                | OOP does not justify deep inheritance everywhere                 |
| Concurrency theory     | Concurrent execution requires reasoning about ordering, visibility, and shared state    | threads, locks, atomics, `volatile`, memory model, virtual threads | Prevents false confidence in “thread-safe-looking” code                           | PART 7                        | Theory must be paired with real profiling and diagnostics        |
| Software architecture  | Large systems require boundaries and change management                                  | packages, modules, build tools, dependency graphs, APIs            | Explains why Java values explicit structure and compatibility                     | PART 5, PART 9                | Architecture cannot compensate for poor local code               |
| Production engineering | Running systems fail through latency, memory, I/O, dependencies, and observability gaps | GC, JFR, logging, metrics, profiling, deployment                   | Makes Java mastery operational rather than purely syntactic                       | PART 6, PART 9                | Production conventions vary by organization                      |

**Interdisciplinary Lens: JVM and managed runtime**

What it clarifies: Java’s actual behavior is partly source semantics, partly VM execution, and partly implementation strategy.

Language feature involved: bytecode, class loading, JIT, GC, reflection, runtime monitoring.

Practical consequence: Java performance should be reasoned about through measurement, allocation behavior, warmup, GC pressure, and runtime diagnostics, not by source syntax alone.

Limit of the lens: JVM knowledge does not automatically produce good domain modeling, API design, or maintainable architecture.

### Adjacent Languages — similarity, difference, transfer risk

Java sits near several language families but should not be mentally reduced to any one of them.

| Adjacent language       | Similarity                                                      | Major difference                                                                                              | Transfer risk                                                          |
| ----------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| C++                     | Classes, static typing, performance concern, long-lived systems | Java uses managed memory, no ordinary pointer arithmetic, different generics model, JVM runtime               | Importing RAII or template intuitions too directly                     |
| C#                      | Nominal OOP, managed runtime, generics, enterprise use          | C# has reified generics, properties, richer language-level features, different ecosystem                      | Assuming all .NET design patterns map directly                         |
| Python                  | High-level libraries, object use, broad application domain      | Python is dynamically typed and structurally flexible at runtime                                              | Expecting Java to be concise or duck-typed                             |
| JavaScript / TypeScript | Large ecosystem, server-side use, tooling                       | Java has runtime-enforced nominal classes and JVM execution; TypeScript types erase into JavaScript semantics | Confusing TypeScript-style structural typing with Java interfaces      |
| Kotlin                  | JVM ecosystem, null-safety focus, concise syntax                | Kotlin has stronger null modeling, data classes, extension functions, coroutines                              | Expecting Java to have Kotlin’s syntactic and type-system conveniences |
| Scala                   | JVM, functional and object-oriented mix                         | Scala has a much more expressive type system and functional orientation                                       | Overcomplicating Java with Scala-like abstraction habits               |
| Rust                    | Static typing, safety concerns, modern systems thinking         | Rust uses ownership/borrowing, no GC by default, different concurrency model                                  | Expecting Java to provide compile-time ownership guarantees            |
| Go                      | Server-side simplicity, concurrency focus                       | Go uses structural interfaces and goroutines; Java uses nominal interfaces and JVM threads/virtual threads    | Treating Java interfaces like Go interfaces                            |

The main transfer rule: **Java rewards explicit contracts and stable boundaries more than clever local expressiveness**.

### Transfer Map — habits that carry over, change, or fail

| Source-language habit or concept   | How it appears in Java           | What transfers                     | What changes                                                                            | Common failure mode                                        | Better mental model                                                  |
| ---------------------------------- | -------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| C/C++ object thinking              | Java classes and interfaces      | Encapsulation and polymorphism     | No manual memory freeing; object layout is VM-managed                                   | Thinking Java objects have C++ value semantics             | Java variables hold primitive values or object references            |
| C++ templates                      | Java generics                    | Reusable typed APIs                | Generics are erased, not template-expanded                                              | Expecting `List<String>.class` or `new T()`                | Generics mainly provide compile-time type constraints                |
| Python duck typing                 | Java interfaces                  | Behavioral abstraction             | Contracts must be declared nominally                                                    | Expecting shape-based compatibility                        | Define an interface for the required behavior                        |
| TypeScript structural interfaces   | Java interfaces                  | Interface-based design             | Java type compatibility is nominal                                                      | Assuming matching methods are enough                       | Implement or extend the declared Java type                           |
| C# properties and reified generics | Java methods and erased generics | Similar enterprise API discipline  | Java lacks equivalent language-level properties and reified generic type parameters     | Overestimating runtime generic information                 | Pass explicit type metadata when needed                              |
| Kotlin null safety                 | Java references and annotations  | Null-aware API discipline          | Null safety is not enforced uniformly by the Java language                              | Assuming annotations are always enforced                   | Treat null contracts as API conventions unless tooling enforces them |
| Rust ownership                     | Java references and GC           | Attention to aliasing and mutation | No borrow checker                                                                       | Assuming compiler prevents shared mutable-state bugs       | Use immutability, confinement, and synchronization                   |
| Go goroutines                      | Java virtual threads             | Lightweight concurrency intuition  | Java still has Java Memory Model, interruption, blocking, and synchronization semantics | Treating virtual threads as eliminating concurrency design | Virtual threads reduce thread scarcity, not shared-state hazards     |

### Java’s Object Model — nominal contracts over structural coincidence

Java’s object model is nominal. A type is not accepted because it happens to have the right methods; it is accepted because it explicitly declares the right type relationship. This is the difference between **accidental shape compatibility** and **declared contract compatibility**.

```java
interface Notifier {
    void notifyUser(String message);
}

final class EmailNotifier implements Notifier {
    @Override
    public void notifyUser(String message) {
        // send email
    }
}
```

The object-oriented point is not “put everything in classes.” The point is that Java uses classes and interfaces to make contracts explicit. This is valuable in large systems because APIs can be documented, versioned, tested, refactored, mocked, and reviewed.

**Tempting but wrong mental model:** “If a class has the right method, Java should accept it.”

**Surprising behavior:** Java rejects a class with the same method shape unless it explicitly implements or extends the required type.

**Correct semantic explanation:** Java uses nominal typing. Compatibility is based on declared type relationships.

**Professional rule of thumb:** Use interfaces for stable behavioral contracts; use records or classes for data with clear domain meaning; avoid creating interfaces only to satisfy an abstract design aesthetic.

**Boundary where the rule changes:** Reflection, dynamic proxies, method handles, serialization frameworks, and dependency-injection frameworks can operate outside ordinary source-level nominal checks, but that shifts safety from compile time to runtime/tooling.

### Java’s Type System — strong enough for engineering, not a proof system

Java’s type system is designed for mainstream engineering. It catches many category errors, supports refactoring, enables generics, and makes APIs analyzable. But it is not designed to prove arbitrary program correctness.

| Type-system property      | Java’s behavior                                  | Practical consequence                       | Common misunderstanding                           |
| ------------------------- | ------------------------------------------------ | ------------------------------------------- | ------------------------------------------------- |
| Static checking           | Most type compatibility checked before execution | Many errors caught early                    | Static typing does not eliminate runtime checks   |
| Nominal subtyping         | Compatibility follows declared relationships     | Explicit API contracts                      | Matching method names are not enough              |
| Generics                  | Compile-time parameterized types                 | Safer collections and reusable APIs         | Generic type information mostly erased at runtime |
| Primitive/reference split | Primitive values differ from object references   | Performance and nullability behavior differ | Treating `int` and `Integer` as identical         |
| Null permissiveness       | Most reference variables may hold `null`         | Null checks and API contracts matter        | Assuming Java is null-safe                        |
| Runtime casts             | Casts may fail at runtime                        | Boundaries require care                     | Treating a cast as validation                     |
| Arrays                    | Reified and covariant                            | Runtime array-store checks                  | Assuming arrays behave like generic collections   |

Java’s type system is therefore **practical, conservative, and compatibility-driven**. It is stronger than dynamic runtime-only checking, weaker than ownership-based systems, less expressive than advanced functional type systems, and less structurally flexible than TypeScript or Go.

### Java’s Runtime Personality — performance is dynamic, not absent

Java performance should not be understood through the old stereotype “Java is slow.” Java performance is **runtime-adaptive**. The JVM can interpret, profile, compile hot methods, inline calls, optimize allocations, and later deoptimize if assumptions change. This is powerful, but it means performance depends on runtime context.

| Runtime mechanism  | What it does                                      | Practical consequence                                             |
| ------------------ | ------------------------------------------------- | ----------------------------------------------------------------- |
| Bytecode           | Portable intermediate representation              | Java code targets JVM execution rather than one machine binary    |
| Class loading      | Loads classes on demand                           | Startup, dependency conflicts, reflection, and modules matter     |
| Verification       | Checks class file validity and safety constraints | Managed execution gains safety boundaries                         |
| JIT compilation    | Compiles hot code paths during execution          | Warmup and profiling affect benchmarks                            |
| Garbage collection | Reclaims unreachable heap objects                 | Allocation rate and object retention affect latency and memory    |
| Reflection         | Inspects or invokes program structure at runtime  | Framework flexibility with runtime cost and failure modes         |
| Runtime monitoring | Observes JVM and application behavior             | Profiling, JFR, heap dumps, metrics are part of professional Java |

**Tempting but wrong mental model:** “Java source code tells the whole performance story.”

**Surprising behavior:** A method may become faster after warmup, slower under allocation pressure, or change behavior under a different GC, JVM flag, CPU, container limit, or workload.

**Correct semantic explanation:** Java source semantics are stable, but performance is shaped by JVM implementation, JIT profiling, GC, and runtime environment.

**Professional rule of thumb:** Do not infer Java performance from syntax alone. Use profiling, allocation analysis, realistic benchmarks, and production telemetry.

**Boundary where the rule changes:** Some costs are semantic or API-level and can be reasoned about without profiling: blocking I/O blocks a carrier of execution, synchronization creates ordering constraints, object allocation increases memory pressure, and reflection introduces dynamic lookup.

### Java’s Error Philosophy — explicit failure, imperfectly enforced

Java has one of the most debated error models among mainstream languages. It uses checked exceptions, unchecked exceptions, `Error`, assertions, resource-management constructs, and conventional result-like APIs.

| Error form              | Meaning                                            | Best use                                             | Failure mode                                            |
| ----------------------- | -------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| Checked exception       | Recoverable or contractually visible failure       | File I/O, parsing, APIs where callers must decide    | Polluted signatures, meaningless wrapping               |
| Runtime exception       | Programming error or unchecked operational failure | Invalid arguments, illegal state, unexpected failure | Overusing unchecked exceptions for everything           |
| `Error`                 | Serious VM/system-level problem                    | Usually not handled by application code              | Catching too broadly                                    |
| Assertion               | Internal invariant check                           | Development/testing assumptions                      | Relying on assertions for required runtime validation   |
| `Optional`              | Absence of a value                                 | Return values where absence is expected              | Using it for fields, parameters, or every nullable case |
| Result-like custom type | Explicit success/failure modeling                  | Domain workflows needing composable outcomes         | Recreating a poor exception system                      |

Java’s error philosophy is not “checked exceptions are good” or “checked exceptions are bad.” The real issue is whether the caller can make a meaningful recovery decision. If yes, a checked exception may be appropriate. If no, forcing checked handling often creates noise.

### Java’s Concurrency Personality — powerful shared-memory tools with discipline required

Java has a deep concurrency model. It includes platform threads, virtual threads, locks, monitors, `volatile`, atomics, concurrent collections, executors, futures, completable futures, structured approaches in newer APIs, and a formal Java Memory Model.

Virtual threads became final in JDK 21 through JEP 444; Oracle’s documentation describes virtual threads as lightweight threads intended to reduce the effort of writing, maintaining, and debugging high-throughput concurrent applications. ([OpenJDK][4])

But virtual threads do not erase concurrency problems.

| Concurrency feature    | Capability gained                                | Cost or risk                                                       |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| Platform threads       | Direct OS-backed concurrency                     | Expensive at very high counts                                      |
| Virtual threads        | Cheap blocking-style concurrency                 | Still requires cancellation, synchronization, and resource control |
| `synchronized`         | Mutual exclusion and visibility                  | Deadlocks, contention, pinning concerns in some contexts           |
| `volatile`             | Visibility and ordering for individual variables | Not a compound-operation lock                                      |
| Atomics                | Lock-free updates for simple state               | Harder reasoning under complex invariants                          |
| Executors              | Task submission and lifecycle management         | Misconfigured pools and hidden queueing                            |
| Concurrent collections | Safer shared data structures                     | Not automatic transactionality                                     |
| CompletableFuture      | Async composition                                | Callback complexity and executor confusion                         |

**Tempting but wrong mental model:** “Virtual threads make concurrency easy.”

**Surprising behavior:** Programs with virtual threads can still deadlock, race, leak resources, overwhelm downstream systems, or mishandle cancellation.

**Correct semantic explanation:** Virtual threads reduce the cost of blocking-style concurrency. They do not remove the Java Memory Model, shared mutable state, synchronization, backpressure, or lifecycle design.

**Professional rule of thumb:** Prefer simple blocking code on virtual threads for I/O-heavy workloads, but still design ownership, cancellation, resource limits, and shared-state boundaries explicitly.

### Java and Enterprise-Scale Software — why Java feels conservative

Java is deeply shaped by enterprise software. That does not mean Java is only for enterprise systems, nor that enterprise Java is always good. It means Java’s ecosystem has been selected for:

| Enterprise pressure   | Java ecosystem response                                              |
| --------------------- | -------------------------------------------------------------------- |
| Long-lived systems    | LTS releases, backward compatibility, stable APIs                    |
| Large teams           | Explicit types, packages, access control, code review conventions    |
| Dependency management | Maven, Gradle, BOMs, repositories, version constraints               |
| Testability           | JUnit, mocking frameworks, integration-test tooling                  |
| Observability         | logging, metrics, tracing, JFR, profilers, heap analysis             |
| Framework integration | annotations, reflection, dependency injection, proxies               |
| Compatibility         | binary compatibility, semantic versioning concerns, migration guides |
| Deployment            | JARs, containers, application servers, runtime images                |

Java’s strength here is also its weakness. A mature Java system may be highly observable, testable, and maintainable; it may also become framework-heavy, annotation-driven, dependency-bloated, and difficult to reason about locally.

A professional Java tutorial must therefore separate **Java the language**, **Java SE the platform**, **the JDK**, **the JVM**, and **framework Java**.

### Strengths and Costs — the central balance sheet

| Strength                       | Cost                                                                |
| ------------------------------ | ------------------------------------------------------------------- |
| Strong tooling and IDE support | Code can become ceremony-heavy                                      |
| Mature standard library        | Legacy APIs remain visible                                          |
| JVM portability                | Runtime configuration and vendor differences matter                 |
| Garbage collection             | Memory behavior must be understood through allocation and retention |
| Static nominal typing          | Less flexible than structural or dynamic systems                    |
| Interfaces and generics        | Can produce abstraction layers that obscure simple logic            |
| Backward compatibility         | Old design decisions persist                                        |
| Concurrency libraries          | Powerful primitives can be misused                                  |
| Framework ecosystem            | Indirection can hide control flow                                   |
| Enterprise adoption            | Conventions can become heavyweight defaults                         |

The better Java programmer is not the one who uses the most Java machinery. It is the one who knows when Java’s structure is buying maintainability and when it is merely adding accidental complexity.

### Mature, Emerging, and Overhyped Trends — what matters now

Java’s current direction is modernization without abandoning its compatibility contract.

| Trend type       | Trend                                          | Status                                                 | Driving pressure                                     | Caveat                                                                 |
| ---------------- | ---------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| Mature           | Records                                        | Stable modern data modeling                            | Need concise immutable-ish carriers                  | Records are not full algebraic data types                              |
| Mature           | Pattern matching for `instanceof` and `switch` | Increasingly central                                   | Safer branching and data-oriented programming        | Preview/final status differs by release and feature                    |
| Mature           | Sealed classes/interfaces                      | Stable type hierarchy control                          | Exhaustiveness and domain modeling                   | Requires disciplined hierarchy design                                  |
| Mature           | Virtual threads                                | Production-relevant since JDK 21                       | Scalable blocking-style concurrency                  | Does not solve shared-state correctness                                |
| Mature           | `java.time`                                    | Modern date/time default                               | Correct time modeling                                | Legacy APIs still appear in old code                                   |
| Emerging         | Foreign Function & Memory API                  | Native interop and off-heap access                     | Better native boundary than older JNI in many cases  | Requires careful safety/resource reasoning                             |
| Emerging         | Data-oriented programming style                | Records, sealed types, pattern matching                | Cleaner modeling of values and variants              | Java remains nominal and class-based                                   |
| Emerging         | Smaller runtime images                         | `jlink`, modular runtime images, container deployment  | Deployment efficiency                                | Requires module and dependency understanding                           |
| Overhyped        | “Java is becoming a scripting language”        | Limited truth                                          | Simpler entry points and source launch help learning | Java’s core identity remains system/application development            |
| Overhyped        | “Virtual threads replace async design”         | Wrong                                                  | Blocking style becomes more scalable                 | Backpressure, cancellation, and resource limits remain                 |
| Overhyped        | “Frameworks write the application”             | Dangerous                                              | Framework automation reduces boilerplate             | Architecture and failure analysis still require explicit understanding |
| Declining/legacy | Applets                                        | Obsolete                                               | Historical browser-era Java                          | Recognize only for history                                             |
| Declining/legacy | Built-in Java serialization as default         | Generally avoided in modern security-conscious systems | Historical object serialization convenience          | Prefer explicit formats and controlled schemas                         |
| Declining/legacy | Raw types                                      | Legacy compatibility                                   | Pre-generics code support                            | Avoid in new code except narrow interop cases                          |

Java 25 release notes identify several language-level changes and preview features, including module import declarations and primitive types in patterns, `instanceof`, and `switch` as a preview feature; this reinforces the need to distinguish finalized features from preview features when teaching modern Java. ([オラクル][5])

### What Java Makes Easy, Hard, Prevented, and Disciplined — compact judgment table

| Category           | Java’s behavior                                                                                      | Practical judgment                                         |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Easy               | Explicit APIs, object modeling, collections, testing, IDE refactoring, server-side tooling           | Use Java when structure and longevity matter               |
| Hard               | Ultra-dynamic modeling, minimal scripts, zero-overhead abstractions, deep runtime generic reflection | Avoid fighting the language’s nominal and managed nature   |
| Prevented          | Many pointer and manual-memory errors                                                                | Do not import C/C++ memory assumptions                     |
| Discouraged        | Unstructured global behavior, implicit contracts, unchecked dynamic shape matching                   | Prefer declared types and explicit boundaries              |
| Left to discipline | Null handling, API design, concurrency correctness, dependency hygiene, resource cleanup             | Professional Java depends on conventions as much as syntax |
| Runtime-dependent  | Throughput, latency, GC behavior, JIT optimization, startup, memory footprint                        | Measure real workloads instead of trusting stereotypes     |

### Common Misreadings of Java’s Identity — failure-first macro corrections

| Tempting but wrong mental model                     | Why it fails                                                                                                 | Better mental model                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| “Java is just old C++ with garbage collection.”     | Java has a VM, erased generics, reflection, class loading, managed metadata, and different object semantics. | Java is a managed-runtime, nominal OOP language with C-family syntax.    |
| “Java is slow.”                                     | JVM JITs can produce high throughput, but startup, warmup, GC, allocation, and workload shape results.       | Java performance is runtime-adaptive and measurement-dependent.          |
| “Java is pass-by-reference.”                        | Method arguments receive copies of values; object references are values.                                     | Java is pass-by-value; reference values allow shared object mutation.    |
| “Interfaces are like duck typing.”                  | Java requires declared nominal compatibility.                                                                | Interfaces are explicit contracts.                                       |
| “Generics preserve full runtime type information.”  | Java generics are mostly erased.                                                                             | Generics mainly protect compile-time API use.                            |
| “Garbage collection means no memory leaks.”         | Reachable but unused objects are not collected; resources are not closed by GC.                              | GC manages memory reclamation, not lifecycle correctness.                |
| “Checked exceptions guarantee good error handling.” | Callers can catch, ignore, wrap, or propagate badly.                                                         | Error design depends on meaningful recovery boundaries.                  |
| “Virtual threads remove concurrency complexity.”    | Data races, visibility, cancellation, deadlocks, and resource exhaustion remain.                             | Virtual threads reduce thread scarcity, not correctness obligations.     |
| “Spring is Java.”                                   | Spring is a framework ecosystem built on Java/JVM mechanisms.                                                | Separate language, platform, runtime, library, and framework convention. |

### The Macro Mental Model for the Rest of the Guide

Java should be approached through five linked questions.

| Question                         | Java-specific answer                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| What is a Java program?          | Source code compiled into class files, organized by packages/modules, executed by a JVM.                                                    |
| What is a Java value?            | Either a primitive value or a reference value pointing to an object or array.                                                               |
| What is a Java abstraction?      | Usually a class, interface, method, generic type, record, enum, sealed hierarchy, or package/module boundary.                               |
| What is a Java failure boundary? | Usually an exception, validation boundary, resource boundary, trust boundary, concurrency boundary, or framework/runtime boundary.          |
| What is Java performance?        | A product of source design, library/API choices, allocation behavior, JIT compilation, GC, synchronization, I/O, and runtime configuration. |

This mental model prepares the rest of the tutorial:

| Later part | What PART 1 prepares                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| PART 2     | Reading Java syntax as surface form over reference-oriented, class-centered semantics                                  |
| PART 3     | Modeling data with classes, records, enums, sealed types, generics, collections, and null discipline                   |
| PART 4     | Choosing methods, functions, lambdas, objects, interfaces, inheritance, and composition appropriately                  |
| PART 5     | Managing packages, modules, visibility, errors, resources, effects, and trust boundaries                               |
| PART 6     | Using the Java standard library and ecosystem by task rather than by memorized package names                           |
| PART 7     | Explaining source behavior through JVM execution, memory, GC, JIT, and concurrency semantics                           |
| PART 8     | Understanding why modern Java is becoming more data-oriented and concurrency-friendly without abandoning compatibility |
| PART 9     | Practicing Java professionally through build tools, testing, profiling, debugging, deployment, review, and maintenance |
| PART 10    | Moving from tutorial knowledge to expert judgment through real systems, failure analysis, and long-term maintenance    |

**Core conclusion:** Java is best understood as a **compatibility-preserving, nominally typed, managed-runtime language for building maintainable systems**. Its professional use depends on more than knowing syntax: it requires understanding how source-level constructs map to JVM behavior, how nominal contracts shape design, how erased generics and nullability create sharp edges, how concurrency interacts with the Java Memory Model, and how tooling and ecosystem conventions shape real Java code.

## PART 2 — Core Syntax and Semantic Primitives Reference

### Orientation — syntax, semantics, source forms, primitive recognition

`PART 2` is a **source-reading and primitive-semantics reference**. It covers the surface constructs needed to read Java code accurately before deeper modeling, abstraction, modules, error handling, standard-library work, and JVM execution are treated in later parts. The uploaded specification asks this part to remain focused on core syntax and primitive semantic constructs rather than becoming the full type-system, runtime, or ecosystem chapter. 

The official Java Language Specification for Java SE 25 places lexical structure, identifiers, keywords, literals, operators, expressions, statements, classes, interfaces, arrays, exceptions, packages, modules, and definite assignment in distinct chapters; that separation is useful because Java syntax is not merely notation but a layered system of tokens, declarations, expressions, statements, and type-bearing constructs. ([docs.oracle.com][1])

| Layer             | Core question                                   | Java examples                                                        | Primary professional use                                    |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------- |
| Lexical layer     | What character sequences count as tokens?       | identifiers, keywords, literals, comments, operators                 | Reading source correctly and avoiding token-level ambiguity |
| Declaration layer | What program entities are introduced?           | classes, interfaces, records, enums, fields, methods, variables      | Understanding what names exist and where                    |
| Expression layer  | What produces a value or performs an operation? | method call, assignment expression, arithmetic, `new`, cast, lambda  | Understanding value flow and side effects                   |
| Statement layer   | What controls execution?                        | `if`, `for`, `while`, `switch`, `try`, `throw`, `return`             | Understanding control flow and reachability                 |
| Type layer        | What static category is assigned?               | primitive type, class type, interface type, array type, generic type | Understanding compile-time constraints                      |
| Runtime layer     | What happens when executed?                     | object allocation, dispatch, class loading, exception throwing       | Understanding behavior beyond syntax                        |

A central mistake is to treat Java syntax as if it were only “C-like punctuation.” Java’s syntax carries assumptions about **declaration order, type checking, scope, initialization, identity, mutability, and side effects**. Even simple syntax such as `String s = "x";` combines a local variable declaration, a reference type, a string literal, initialization, and a binding between a name and a value.

### Lexical Structure — Unicode, tokens, whitespace, comments, identifiers, keywords

Java source code is tokenized before it is parsed. The lexical layer defines what counts as an identifier, keyword, literal, operator, separator, comment, or whitespace. Java’s lexical structure is specified in terms of Unicode input, lexical translations, line terminators, tokens, comments, identifiers, keywords, and literals. ([docs.oracle.com][1])

| Construct  | Meaning                                        | Syntax shape                                     | Canonical example       | Design meaning                                    | Practical consequence                         | Common pitfall                                                    |
| ---------- | ---------------------------------------------- | ------------------------------------------------ | ----------------------- | ------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------- |
| Whitespace | Separates tokens where needed                  | spaces, tabs, line terminators                   | `int x = 1;`            | Formatting does not usually affect meaning        | Style tools can reformat safely in many cases | Assuming line breaks terminate statements                         |
| Comment    | Ignored by compiler except documentation tools | `//`, `/* */`, `/** */`                          | `// TODO`               | Comments are outside executable semantics         | Useful for intent, not behavior               | Commenting stale assumptions                                      |
| Identifier | Programmer-defined name                        | Unicode-aware identifier rules                   | `totalCount`, `userId`  | Names introduce semantic handles                  | Naming affects readability and API quality    | Using misleading or overly generic names                          |
| Keyword    | Reserved language word                         | fixed reserved words                             | `class`, `if`, `return` | Protects grammar structure                        | Cannot be used as ordinary identifiers        | Forgetting contextual keywords are special only in some positions |
| Literal    | Source representation of a value               | numeric, char, string, boolean, null, text block | `"hello"`, `42`, `null` | Creates primitive values or references to objects | Literal form affects type and runtime value   | Confusing literal appearance with object identity                 |
| Operator   | Built-in operation syntax                      | `+`, `==`, `&&`, `=`, `::`, `->`                 | `a + b`                 | Encodes common operations compactly               | Operator meaning depends on operand types     | Assuming `==` means value equality for objects                    |
| Separator  | Structural punctuation                         | `{}`, `()`, `[]`, `;`, `,`, `.`                  | `list.get(0)`           | Defines nesting, access, and statement boundaries | Source structure becomes parse structure      | Misplacing semicolons after control headers                       |

Java statements usually require semicolons, but Java is not a line-oriented language. This is legal:

```java
int total
    =
    10
    +
    20;
```

This is readable only as a demonstration. Professional Java should use formatting that makes declaration, assignment, and expression structure obvious.

**Language-design note:** Java’s C-family lexical surface lowers adoption cost for C/C++/C# programmers, but the underlying semantics differ sharply. For example, Java has no ordinary pointer arithmetic, object access uses references, and memory management is not source-level manual allocation/free.

**Common Pitfalls:**
Do not infer semantics from visual similarity to C or C++. `.` in Java is member access through a reference or type name, not pointer dereference syntax. `==` compares primitive values or reference identity, not general object value equality. A newline does not finish a statement unless the grammar is already complete.

### Comments and Documentation Syntax — line comments, block comments, Javadoc, API intent

Java supports three major comment forms:

| Comment form          | Syntax           | Primary use                    | Consumed by       | Professional rule                                   |
| --------------------- | ---------------- | ------------------------------ | ----------------- | --------------------------------------------------- |
| Line comment          | `// comment`     | Local explanation, short notes | Compiler ignores  | Use sparingly for intent or non-obvious constraints |
| Block comment         | `/* comment */`  | Longer internal note           | Compiler ignores  | Avoid large stale blocks of text                    |
| Documentation comment | `/** comment */` | Public API documentation       | Javadoc/doc tools | Use for public or reusable APIs                     |

```java
/**
 * Returns the display name shown to external users.
 *
 * @param userId stable internal user identifier
 * @return non-empty display name
 * @throws UserNotFoundException if the user does not exist
 */
public String displayName(UserId userId) throws UserNotFoundException {
    return repository.findDisplayName(userId);
}
```

Documentation comments are not merely decorative. In Java, public APIs often live for years, and Javadoc becomes part of the effective contract. A method signature tells what the compiler can check; documentation tells what the type system cannot express: null contracts, ordering assumptions, side effects, performance expectations, thread-safety, security constraints, and domain invariants.

| API fact                          | Can Java signature express it directly? | Usually documented how?             |
| --------------------------------- | --------------------------------------: | ----------------------------------- |
| Parameter type                    |                                     Yes | Method signature                    |
| Return type                       |                                     Yes | Method signature                    |
| Checked exception                 |                                     Yes | `throws` clause                     |
| Whether parameter may be `null`   |                           Not uniformly | Javadoc, annotations, validation    |
| Whether return value may be empty |                  Partly with `Optional` | Type choice plus Javadoc            |
| Whether method mutates input      |                           Not generally | Javadoc and naming                  |
| Whether method is thread-safe     |                           Not generally | Javadoc and class-level contract    |
| Whether method performs I/O       |                            Not directly | Javadoc, naming, exception behavior |
| Performance complexity            |                            Not directly | Javadoc when important              |

**Tempting but wrong mental model:** “If the compiler ignores comments, comments are not part of the program.”

**Surprising behavior or bug:** Public methods with insufficient documentation produce misuse even when every call compiles.

**Correct semantic explanation:** Comments do not affect Java execution semantics, but documentation comments can become part of the API contract used by humans, tools, and downstream maintainers.

**Professional rule of thumb:** Document public API behavior that the Java type system does not encode. Do not document obvious syntax-level facts.

**Boundary where the rule changes:** For private local code, strong naming and simple structure are usually better than verbose comments. For public libraries, comments often carry contractual meaning.

**Common Pitfalls:**
Do not use comments to compensate for bad names, tangled control flow, or hidden side effects. Do not let Javadoc promise stronger guarantees than the implementation provides. Do not document `@return the result` when the return type and method name already say that.

### Naming Conventions — classes, methods, variables, constants, packages

Java naming conventions are ecosystem conventions, not usually compiler-enforced language rules. Their importance comes from readability, tooling, refactoring, and API stability.

| Entity         | Conventional form                 | Example                                | Meaning conveyed                    | Common pitfall                                       |
| -------------- | --------------------------------- | -------------------------------------- | ----------------------------------- | ---------------------------------------------------- |
| Class          | `UpperCamelCase` noun             | `CustomerInvoice`                      | A type or domain concept            | Naming service objects as vague `Manager`            |
| Interface      | `UpperCamelCase` noun/adjective   | `Repository`, `Runnable`, `Comparable` | Behavioral contract                 | Prefixing all interfaces with `I` in Java-style code |
| Method         | `lowerCamelCase` verb/verb phrase | `calculateTotal()`                     | Operation or query                  | Hiding mutation behind query-like names              |
| Variable       | `lowerCamelCase` noun             | `invoiceCount`                         | Local value or reference            | Single-letter names outside narrow scopes            |
| Constant       | `UPPER_SNAKE_CASE`                | `MAX_RETRIES`                          | Static final constant               | Using constants for configurable runtime values      |
| Package        | lowercase reversed domain style   | `com.example.billing`                  | Namespace and architecture location | Deep package nesting without boundary meaning        |
| Type parameter | short uppercase                   | `T`, `E`, `K`, `V`, `R`                | Generic placeholder                 | Using cryptic parameters in complex APIs             |

```java
package com.example.billing;

public final class InvoiceCalculator {
    private static final int MAX_LINE_ITEMS = 500;

    public Money calculateTotal(Invoice invoice) {
        // ...
        return Money.zero();
    }
}
```

Naming is a semantic compression mechanism. `calculateTotal` suggests a computation. `save` suggests persistence and side effects. `get` suggests a cheap accessor, though Java frameworks sometimes blur this convention.

| Name pattern       | Usually implies                                 | Risk when false                                               |
| ------------------ | ----------------------------------------------- | ------------------------------------------------------------- |
| `getX()`           | Cheap retrieval without meaningful side effects | Expensive I/O hidden as a property-like access                |
| `isX()` / `hasX()` | Boolean query                                   | Hidden mutation or remote call                                |
| `findX()`          | May not exist, may query storage                | Ambiguous null/optional behavior                              |
| `loadX()`          | Fetches or initializes                          | Unclear caching/lifecycle                                     |
| `saveX()`          | Persists state                                  | Transaction and failure boundary ambiguity                    |
| `parseX()`         | Converts text to value, may fail                | Poor error modeling                                           |
| `tryX()`           | Attempt may fail safely                         | Nonstandard return convention if unclear                      |
| `validateX()`      | Checks constraints                              | Unclear whether it throws, returns boolean, or returns errors |

**Language-design note:** Java’s nominal type system makes names especially important. In structurally typed or duck-typed languages, behavior may be inferred from shape. In Java, declared type names, package names, and method names are central to the reader’s understanding of the intended contract.

**Common Pitfalls:**
Avoid generic nouns such as `Data`, `Info`, `Util`, `Helper`, `Manager`, and `Processor` unless the abstraction is genuinely generic. Avoid names that obscure side effects. A method named `getUser()` should not unexpectedly create a user, send a network request, mutate global state, and commit a transaction.

### Literals — numeric, boolean, char, string, text block, null

Java literals are source-level representations of values. They are not all the same kind of thing. Some represent primitive values directly; some represent references to objects; one represents the absence of a reference.

| Literal kind      | Examples                                    | Type or category                        | Notes                                                                   |
| ----------------- | ------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| Integer literal   | `0`, `42`, `1_000`, `0xFF`, `0b1010`, `42L` | `int` by default, `long` with `L`       | Underscores improve readability                                         |
| Floating literal  | `3.14`, `1e9`, `2.0f`, `6.02D`              | `double` by default, `float` with `f`   | Decimal-looking values are not exact decimals                           |
| Boolean literal   | `true`, `false`                             | `boolean`                               | Not interchangeable with integers                                       |
| Character literal | `'a'`, `'\n'`, `'\u0041'`                   | `char`                                  | Represents a UTF-16 code unit, not necessarily a full Unicode character |
| String literal    | `"hello"`                                   | `String` reference                      | Strings are objects; literals may be interned                           |
| Text block        | `"""..."""`                                 | `String` reference                      | Multi-line string literal                                               |
| Null literal      | `null`                                      | null type assignable to reference types | Represents no object reference                                          |

Modern Java includes text blocks as a permanent language feature since Java 15, and Java’s language-change summary lists records, pattern matching, sealed classes, switch expressions, module import declarations, and compact source files among Java’s post-9 language evolution. ([docs.oracle.com][2])

```java
int count = 1_000_000;
long distance = 9_000_000_000L;

double ratio = 0.1;       // binary floating-point approximation
float temperature = 36.5f;

boolean active = true;
char letter = 'A';

String name = "Ada";

String json = """
        {
          "name": "Ada",
          "active": true
        }
        """;

Object missing = null;
```

Numeric literal suffixes and defaults matter:

| Expression  | Usual interpretation          | Practical consequence                           |
| ----------- | ----------------------------- | ----------------------------------------------- |
| `42`        | `int` literal                 | May require widening or suffix in some contexts |
| `42L`       | `long` literal                | Use for values outside `int` range              |
| `3.14`      | `double` literal              | Default floating type                           |
| `3.14f`     | `float` literal               | Explicitly lower precision                      |
| `1_000_000` | `int` literal with separators | Same value as `1000000`                         |
| `0xFF`      | hexadecimal integer           | Useful for bit-level values                     |
| `0b1010`    | binary integer                | Useful for flags and masks                      |

`String` literals require special caution because strings are objects, immutable, and may be interned. The following code is legal but teaches a dangerous habit:

```java
String a = "java";
String b = "java";

System.out.println(a == b);      // may print true for interned literals
System.out.println(a.equals(b)); // true by value
```

The reliable object-value comparison is `equals`, not `==`. String interning is a runtime/platform feature of string literals and explicit `intern()` usage; it should not become the general mental model for object equality.

**Tempting but wrong mental model:** “A literal is just text inserted into the program.”

**Surprising behavior or bug:** `0.1 + 0.2` does not behave like exact decimal arithmetic, and `"a" == new String("a")` is false.

**Correct semantic explanation:** Literals have types and runtime representation rules. Floating literals use binary floating-point; string literals produce references to immutable `String` objects, with interning behavior relevant to identity.

**Professional rule of thumb:** Use integer types for counts, `BigDecimal` for exact decimal financial values, `equals` for object value comparison, and text blocks for readable multi-line string constants.

**Boundary where the rule changes:** Primitive numeric comparison with `==` is ordinary value comparison; object reference comparison with `==` is identity comparison.

**Common Pitfalls:**
Do not use `==` for string value comparison. Do not use `double` or `float` for exact money arithmetic. Do not assume `char` means “a human-visible character.” Do not use `null` as an unstructured catch-all for every kind of absence.

### Variables and Binding — local variables, fields, parameters, references, values

A Java variable is a named storage location whose type is known statically. For primitive types, the variable holds a primitive value. For reference types, the variable holds a reference value that may refer to an object or array, or may be `null`.

```java
int count = 3;               // variable holds primitive int value
String name = "Grace";       // variable holds reference to a String object
List<String> names = List.of("Ada", "Grace"); // variable holds reference to a List object
```

| Variable category | Declared where                     | Lifetime and role                                  | Example                                     |
| ----------------- | ---------------------------------- | -------------------------------------------------- | ------------------------------------------- |
| Local variable    | Inside method/block                | Exists during execution of block after declaration | `int count = 0;`                            |
| Parameter         | Method, constructor, lambda, catch | Receives argument value                            | `void send(String message)`                 |
| Instance field    | Inside class, non-`static`         | Belongs to each object instance                    | `private String name;`                      |
| Static field      | Inside class, `static`             | Belongs to class, shared across instances          | `private static int count;`                 |
| Pattern variable  | Introduced by pattern              | Available where pattern definitely matches         | `if (x instanceof String s)`                |
| Resource variable | In try-with-resources              | Automatically closed                               | `try (var in = Files.newInputStream(path))` |

Java is **pass-by-value**. The confusion comes from the fact that reference values are values. Passing an object to a method passes a copy of the reference value, not the object itself and not a caller variable.

```java
static void rename(StringBuilder builder) {
    builder.append(" updated");     // mutates the object
}

static void replace(StringBuilder builder) {
    builder = new StringBuilder("new"); // reassigns only local parameter
}

public static void main(String[] args) {
    StringBuilder name = new StringBuilder("old");

    rename(name);
    System.out.println(name); // old updated

    replace(name);
    System.out.println(name); // still old updated
}
```

| Operation                         | What changes?                     |                      Caller observes change? | Why                                                       |
| --------------------------------- | --------------------------------- | -------------------------------------------: | --------------------------------------------------------- |
| Mutating object through reference | Object state                      |                                          Yes | Caller and callee references point to same object         |
| Reassigning parameter             | Callee’s local parameter variable |                                           No | Parameter variable is a local copy of the reference value |
| Reassigning local variable        | Local variable only               | No external effect unless object was mutated | Variable binding changes, object may remain               |
| Mutating primitive parameter      | Impossible directly               |                                           No | Primitive parameter receives a copy                       |

**Tempting but wrong mental model:** “Java passes objects by reference.”

**Surprising behavior or bug:** A method can mutate the object passed to it, but cannot make the caller’s variable refer to a different object.

**Correct semantic explanation:** Java passes argument values. For reference types, the argument value is a reference. The reference can be used to mutate the referenced object if the object is mutable.

**Professional rule of thumb:** Say “Java is pass-by-value; object references are values.” This phrase prevents most false explanations.

**Boundary where the rule changes:** Reflection, mutable holders, arrays, atomics, and wrapper objects can simulate “out parameters,” but this is a design choice, not Java’s call semantics.

### Explicit Types and `var` — declared type, inferred local type, readability boundary

Java traditionally requires explicit variable types. Since Java 10, local variable type inference allows `var` for local variables when the initializer gives enough information. Oracle’s language-change summary lists local variable type inference as a Java 10 feature. ([docs.oracle.com][2])

```java
String name = "Ada";
var count = 10;
var names = List.of("Ada", "Grace");
```

`var` does not make Java dynamically typed. The compiler still infers a static type.

| Form                                            | Meaning                          | Good use                                        | Bad use                                                  |
| ----------------------------------------------- | -------------------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| `String name = "Ada";`                          | Explicit local type              | Public readability, unclear initializer         | Overly verbose when RHS repeats type                     |
| `var name = "Ada";`                             | Compiler infers `String`         | Obvious initializer                             | Hiding important abstraction type                        |
| `var users = userRepository.findActiveUsers();` | Type inferred from method return | Acceptable if method name and context are clear | Bad if return type matters to API usage                  |
| `var result = process(input);`                  | Type inferred but obscure        | Usually weak                                    | Reader must chase method signature                       |
| `var map = new HashMap<String, Integer>();`     | Inferred implementation type     | Concise construction                            | May expose concrete type when interface type is intended |

`var` is especially useful when it reduces repetition without hiding meaning:

```java
var usersById = new HashMap<UserId, User>();
var path = Path.of("data", "users.json");
var matcher = USER_PATTERN.matcher(input);
```

But explicit types are better when the abstraction boundary matters:

```java
Map<UserId, User> usersById = new HashMap<>();
List<User> users = repository.findActiveUsers();
```

The first line says callers should think in terms of `Map`, not necessarily `HashMap`. The second line exposes that the result is a `List`, not a `Set`, stream, iterable, or lazy query.

| Design choice              | Meaning                         | Practical consequence                       |
| -------------------------- | ------------------------------- | ------------------------------------------- |
| Explicit interface type    | Program to abstraction          | Easier substitution and testing             |
| Explicit concrete type     | Concrete operations matter      | Tighter coupling                            |
| `var` with constructor     | Let RHS speak                   | Concise but may infer concrete type         |
| `var` with factory method  | Depends on method clarity       | Good with clear names, bad with vague names |
| `var` with numeric literal | May infer narrower/default type | Can surprise with `int`, `double`, etc.     |

**Language-design note:** Java’s `var` is local syntactic relief, not a shift to dynamic typing. It preserves Java’s static type system while reducing obvious repetition.

**Common Pitfalls:**
Do not use `var` when the inferred type is non-obvious, when the declared abstraction is more important than the implementation, or when numeric literal inference may mislead the reader. Do not describe `var` as dynamic typing.

### Assignment — binding update, side effects, compound assignment, definite assignment

Assignment changes the value stored in a variable. It does not necessarily change the object previously referenced by that variable. The distinction between **rebinding a variable** and **mutating an object** is central to Java.

```java
String name = "Ada";
name = "Grace"; // local variable now refers to a different String object

List<String> names = new ArrayList<>();
names.add("Ada"); // mutates the ArrayList object
names = new ArrayList<>(); // variable now refers to a different ArrayList
```

| Construct                | Meaning                             | Example             | Design meaning                             | Practical consequence                    | Common pitfall                                       |
| ------------------------ | ----------------------------------- | ------------------- | ------------------------------------------ | ---------------------------------------- | ---------------------------------------------------- |
| Simple assignment        | Store new value into variable       | `x = 3;`            | Updates binding/storage                    | Later reads see new value                | Confusing variable reassignment with object mutation |
| Field assignment         | Store value into object/class field | `user.name = name;` | Mutates object or class state              | Affects aliases to same object           | Exposing mutable fields publicly                     |
| Array element assignment | Store value into array slot         | `items[0] = item;`  | Mutates array object                       | Aliases observe update                   | Assuming final array means immutable elements        |
| Compound assignment      | Apply operation and assign          | `x += 1;`           | Combines operation, conversion, assignment | Concise but can hide narrowing           | Surprising numeric conversion                        |
| Increment/decrement      | Add/subtract one                    | `i++`, `++i`        | Side-effect expression                     | Useful in loops                          | Misusing inside complex expressions                  |
| Initialization           | First assignment at declaration     | `int x = 1;`        | Establishes initial value                  | Required for local variables before read | Assuming local variables get default values          |

Instance fields and static fields receive default values if not explicitly initialized. Local variables do not have usable default values; they must be definitely assigned before being read. The Java Language Specification explicitly treats definite assignment as a structural property of statements and expressions, not as arbitrary value reasoning. ([docs.oracle.com][1])

```java
int x;
// System.out.println(x); // compile-time error: local variable not initialized

int y;
if (Math.random() > 0.5) {
    y = 1;
}
// System.out.println(y); // compile-time error: not definitely assigned
```

Definite assignment is conservative:

```java
int x;
if (true) {
    x = 1;
}
System.out.println(x); // allowed because the structure is clear enough here
```

But Java does not generally prove arbitrary program facts. It is not a theorem prover.

Compound assignment has a special narrowing behavior that can surprise even experienced programmers:

```java
byte b = 1;
// b = b + 1;  // compile-time error: b + 1 is int
b += 1;        // allowed; compound assignment includes implicit cast
```

| Expression  | Meaning                                            | Risk                                 |
| ----------- | -------------------------------------------------- | ------------------------------------ |
| `b = b + 1` | binary numeric promotion makes expression an `int` | Cannot assign to `byte` without cast |
| `b += 1`    | roughly `b = (byte)(b + 1)`                        | May hide narrowing or overflow       |
| `i++`       | returns old value, then increments                 | Confusing in larger expressions      |
| `++i`       | increments, then returns new value                 | Still side-effecting                 |

**Tempting but wrong mental model:** “Assignment changes the thing.”

**Surprising behavior or bug:** After `list2 = list1`, mutating `list2` also appears through `list1`.

**Correct semantic explanation:** Assignment changes what value a variable stores. If the value is a reference, multiple variables may store references to the same object.

**Professional rule of thumb:** Say exactly whether code reassigns a variable, mutates an object, mutates an array, or mutates shared state.

**Boundary where the rule changes:** Immutable objects such as `String`, many value-based API classes, and records with immutable components cannot be mutated through ordinary methods; reassignment then becomes the visible change.

**Common Pitfalls:**
Do not assume local variables have default values. Do not use compound assignment when narrowing or overflow matters. Do not write expressions whose meaning depends on the subtle result value of `i++` or `++i`. Do not confuse `final` on a reference variable with immutability of the referenced object.

### Identity and Equality — `==`, `equals`, `hashCode`, object identity, value equality

Java distinguishes **identity comparison** from **value equality**. This is one of the most important source-level semantic distinctions in the language.

| Operation              | Primitive operands                    | Reference operands                                                       | Main use                                                      |
| ---------------------- | ------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `==`                   | Compares primitive values             | Compares whether references point to the same object, or both are `null` | Primitive comparison, identity checks, enum comparison        |
| `!=`                   | Primitive inequality                  | Reference non-identity                                                   | Same as above                                                 |
| `equals`               | Not available for primitives directly | Method-defined value equality                                            | Domain equality, string equality, collection element equality |
| `hashCode`             | Not available for primitives directly | Hash bucket compatibility with `equals`                                  | Hash-based collections                                        |
| `Objects.equals(a, b)` | Handles boxed values/references       | Null-safe equality                                                       | Safer equality in nullable contexts                           |

```java
String a = new String("java");
String b = new String("java");

System.out.println(a == b);      // false: different objects
System.out.println(a.equals(b)); // true: same character sequence
```

For primitives:

```java
int x = 1000;
int y = 1000;

System.out.println(x == y); // true
```

For enums, `==` is idiomatic because enum constants are singleton-like named constants:

```java
enum Status {
    ACTIVE, SUSPENDED
}

Status status = Status.ACTIVE;

if (status == Status.ACTIVE) {
    // idiomatic
}
```

For objects, especially strings, records, domain objects, and collection elements, value equality usually requires `equals`.

```java
record UserId(String value) {}

UserId a = new UserId("u-001");
UserId b = new UserId("u-001");

System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true; records synthesize value-based equals
```

Records are important because they provide a concise way to declare transparent data carriers and automatically derive component-based `equals`, `hashCode`, and `toString`. Records became a permanent Java feature in Java 16. ([docs.oracle.com][2])

The `equals` / `hashCode` contract is crucial for collections:

```java
Set<UserId> ids = new HashSet<>();

ids.add(new UserId("u-001"));

System.out.println(ids.contains(new UserId("u-001"))); // true for a record
```

If a class overrides `equals` but not `hashCode`, hash-based collections such as `HashSet` and `HashMap` can behave incorrectly.

```java
final class BadUserId {
    private final String value;

    BadUserId(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object other) {
        return other instanceof BadUserId id
                && value.equals(id.value);
    }

    // hashCode missing: bad for HashMap / HashSet
}
```

A correct manual implementation must keep equality and hashing consistent:

```java
final class GoodUserId {
    private final String value;

    GoodUserId(String value) {
        this.value = Objects.requireNonNull(value);
    }

    @Override
    public boolean equals(Object other) {
        return other instanceof GoodUserId id
                && value.equals(id.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}
```

| Type or situation                          | Preferred equality mechanism                | Why                                                          |
| ------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------ |
| `int`, `long`, `boolean`, other primitives | `==`                                        | Primitive value comparison                                   |
| `double`, `float`                          | `==` only with caution                      | `NaN`, signed zero, precision issues                         |
| `String`                                   | `equals`                                    | Character-sequence equality                                  |
| Enum                                       | `==`                                        | Enum constants are unique constants                          |
| Record                                     | `equals`                                    | Synthesized component equality                               |
| Domain entity                              | Depends on identity model                   | Database ID, business key, or object identity may differ     |
| Nullable references                        | `Objects.equals(a, b)`                      | Avoids null dereference                                      |
| Arrays                                     | `Arrays.equals` / `Arrays.deepEquals`       | Arrays do not override `equals` by contents                  |
| Lists/Sets/Maps                            | `equals`                                    | Collection interfaces define value equality contracts        |
| BigDecimal                                 | `compareTo` or `equals` depending on intent | `equals` considers scale; `compareTo` compares numeric value |

`BigDecimal` is a common professional trap:

```java
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("1.00");

System.out.println(a.equals(b));     // false: scale differs
System.out.println(a.compareTo(b));  // 0: numeric value equal
```

Arrays are another trap:

```java
int[] a = {1, 2, 3};
int[] b = {1, 2, 3};

System.out.println(a.equals(b));        // false: Object identity equality
System.out.println(Arrays.equals(a, b)); // true: element equality
```

**Tempting but wrong mental model:** “`==` means equality.”

**Surprising behavior or bug:** Two strings, arrays, boxed values, or domain objects may “look equal” but fail `==`.

**Correct semantic explanation:** `==` compares primitive values or reference identity. Object value equality is method-defined, usually through `equals`.

**Professional rule of thumb:** Use `==` for primitives and enums; use `equals` or `Objects.equals` for object value equality; ensure `equals` and `hashCode` are consistent for hash-based collections.

**Boundary where the rule changes:** Some classes intentionally preserve identity semantics and should not override `equals`. Entity objects with lifecycle, mutable state, database identity, or object identity semantics require deliberate equality design.

**Common Pitfalls:**
Do not use `==` for string content. Do not put mutable objects into `HashSet` or use them as `HashMap` keys if fields involved in `equals`/`hashCode` can change. Do not assume arrays compare by contents. Do not use `BigDecimal.equals` when numeric equality ignoring scale is intended.

### Mutability Basics — mutable objects, immutable objects, `final`, aliasing, defensive copying

Java’s mutability model is simple at the syntax level but subtle in real programs. Variables can be reassigned unless declared `final`. Objects may or may not expose mutating operations. Multiple references may point to the same mutable object.

```java
List<String> a = new ArrayList<>();
List<String> b = a;

b.add("Ada");

System.out.println(a); // [Ada]
```

The list object is shared. The variables `a` and `b` are separate variables holding reference values to the same object.

`final` prevents reassignment of the variable, not mutation of the object:

```java
final List<String> names = new ArrayList<>();

names.add("Ada");        // allowed: object mutation
// names = new ArrayList<>(); // not allowed: variable reassignment
```

| Construct               | What is fixed?                                | What may still change?                    | Example                              |
| ----------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------ |
| `final int x = 1;`      | Primitive variable value                      | Nothing for that variable                 | `x` cannot be reassigned             |
| `final String s = "x";` | Reference variable                            | Referenced object is immutable anyway     | `s` cannot point elsewhere           |
| `final List<String> xs` | Reference variable                            | List contents may mutate                  | `xs.add("a")` may be allowed         |
| Immutable object        | Object state                                  | Variable may point elsewhere unless final | `String`, many `java.time` types     |
| Unmodifiable view       | Mutating through view blocked                 | Underlying collection may still change    | `Collections.unmodifiableList(list)` |
| Immutable copy          | New collection cannot be structurally changed | Elements may be mutable                   | `List.copyOf(list)`                  |

Java has no universal language-level immutability marker for arbitrary object graphs. `final` fields help create immutable classes, but immutability is a design property, not merely a keyword.

```java
public final class Money {
    private final BigDecimal amount;
    private final Currency currency;

    public Money(BigDecimal amount, Currency currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public BigDecimal amount() {
        return amount;
    }

    public Currency currency() {
        return currency;
    }
}
```

This class is effectively immutable if its fields refer to immutable objects and it does not leak mutable internal state.

Defensive copying matters when mutable objects cross boundaries:

```java
public final class Schedule {
    private final List<String> tasks;

    public Schedule(List<String> tasks) {
        this.tasks = List.copyOf(tasks);
    }

    public List<String> tasks() {
        return tasks;
    }
}
```

Without `List.copyOf`, the caller could mutate the original list after construction:

```java
List<String> tasks = new ArrayList<>();
tasks.add("write");

Schedule schedule = new Schedule(tasks);

tasks.add("mutate after construction"); // should not affect schedule if copied
```

| Mutability strategy  | Best use                                                    | Cost                              | Failure mode                                   |
| -------------------- | ----------------------------------------------------------- | --------------------------------- | ---------------------------------------------- |
| Mutable object       | Local builders, accumulators, performance-sensitive updates | Aliasing risk                     | Shared unexpected mutation                     |
| Immutable object     | Values, identifiers, money, timestamps, configuration       | More allocation or copying        | Over-copying large structures                  |
| Unmodifiable wrapper | Prevent mutation through one API surface                    | May still reflect backing changes | False sense of immutability                    |
| Immutable copy       | Boundary protection                                         | Copy cost                         | Shallow immutability only                      |
| `final` variable     | Prevent accidental reassignment                             | Does not freeze object            | Mistaking final reference for immutable object |
| `final` field        | Supports stable object construction                         | Object graph may still be mutable | Leaking mutable internals                      |

**Tempting but wrong mental model:** “`final` means immutable.”

**Surprising behavior or bug:** A `final List<String>` can still have elements added or removed.

**Correct semantic explanation:** `final` prevents reassignment of a variable or field after initialization. It does not automatically make the referenced object immutable.

**Professional rule of thumb:** Treat immutability as an object/API design property. Use `final` for stable bindings, immutable classes for values, and defensive copies at trust boundaries.

**Boundary where the rule changes:** Primitive `final` variables are effectively immutable because the variable directly stores the value. For reference types, the object’s own mutability rules matter.

### Scope Basics — blocks, shadowing, lifetime, name lookup

Java scope is primarily controlled by declarations and blocks. A block is a sequence of statements enclosed in `{}`. Names declared inside a block are generally unavailable outside that block.

```java
public void process(boolean active) {
    int count = 0;

    if (active) {
        String message = "active";
        count++;
        System.out.println(message);
    }

    // System.out.println(message); // not in scope
    System.out.println(count);
}
```

| Scope kind             | Introduced by                           | Visible where                          | Example                      | Common pitfall                                       |
| ---------------------- | --------------------------------------- | -------------------------------------- | ---------------------------- | ---------------------------------------------------- |
| Local block scope      | Local variable declaration              | From declaration point to end of block | `int count = 0;`             | Expecting visibility before declaration              |
| Method parameter scope | Method declaration                      | Entire method body                     | `void run(String arg)`       | Reusing vague parameter names                        |
| Lambda parameter scope | Lambda expression                       | Lambda body                            | `x -> x + 1`                 | Capturing mutable local variables incorrectly        |
| Field scope            | Class body and qualified access         | Object/class member context            | `this.name`                  | Confusing field with local variable                  |
| Type scope             | Class/interface/record/enum declaration | Depends on declaration and access      | `UserService`                | Name collision across packages                       |
| Package scope          | Package declaration                     | Compilation units in same package      | package-private class/member | Assuming package-private means module-private        |
| Pattern variable scope | Successful pattern region               | Where pattern is definitely matched    | `if (o instanceof String s)` | Expecting pattern variable outside valid flow region |

Java allows field names to be shadowed by local variables or parameters. This is common in constructors:

```java
public final class User {
    private final String name;

    public User(String name) {
        this.name = name;
    }
}
```

Here, the parameter `name` shadows the field `name`. `this.name` refers to the field of the current object.

Shadowing can be useful when controlled, but it becomes dangerous when it obscures which variable is being read or written:

```java
public final class Counter {
    private int count;

    public void reset() {
        int count = 0; // local variable, not field
    }
}
```

`reset` above does not reset the field. It creates a local variable and discards it.

| Name form        | Meaning                                    | Example                                                  |
| ---------------- | ------------------------------------------ | -------------------------------------------------------- |
| `name`           | Nearest visible declaration named `name`   | local variable, parameter, or field depending on context |
| `this.name`      | Instance field or method of current object | `this.name = name;`                                      |
| `ClassName.name` | Static member or nested type               | `Math.PI`                                                |
| `package.Type`   | Fully qualified type name                  | `java.util.List`                                         |
| `super.name`     | Member inherited from superclass           | `super.toString()`                                       |

**Language-design note:** Java’s name lookup supports local reasoning, but large systems rely on packages, imports, and visibility rules to prevent accidental collisions. Scope is therefore not just a syntax rule; it is part of Java’s architecture model.

**Tempting but wrong mental model:** “If a variable has the same name as a field, assigning it updates the field.”

**Surprising behavior or bug:** A local variable can shadow a field, causing code to update the local variable instead of object state.

**Correct semantic explanation:** Unqualified names resolve to the nearest applicable declaration. Fields can be accessed explicitly with `this`.

**Professional rule of thumb:** Use `this.field = parameter` in constructors when parameter names match fields. Avoid unnecessary shadowing elsewhere.

**Boundary where the rule changes:** Static contexts have no `this`. Inside static methods, unqualified field access can only refer to static members or visible local names.

**Common Pitfalls:**
Do not use shadowing casually. Do not introduce local variables with the same names as important fields unless the assignment pattern is obvious. Do not assume package-private access is a security boundary; it is an architectural visibility rule.

### Primitive Types — numeric values, boolean, char, promotion, overflow

Java primitive types are not objects. They store values directly and have fixed language-level meanings.

| Primitive type | Category            | Size / nature                    | Typical use                   | Common pitfall                           |
| -------------- | ------------------- | -------------------------------- | ----------------------------- | ---------------------------------------- |
| `byte`         | integer             | 8-bit signed                     | binary data, compact arrays   | Arithmetic promotes to `int`             |
| `short`        | integer             | 16-bit signed                    | rare, compact data            | Arithmetic promotes to `int`             |
| `int`          | integer             | 32-bit signed                    | default integer work          | Overflow is silent                       |
| `long`         | integer             | 64-bit signed                    | large counts, timestamps      | Forgetting `L` suffix for large literals |
| `float`        | floating            | 32-bit binary floating point     | memory-sensitive numeric data | Low precision                            |
| `double`       | floating            | 64-bit binary floating point     | default floating work         | Not exact decimal arithmetic             |
| `char`         | character/code unit | 16-bit unsigned UTF-16 code unit | legacy character handling     | Not necessarily a full Unicode character |
| `boolean`      | truth value         | `true` / `false`                 | conditions                    | Not convertible to/from integers         |

Java arithmetic on small integer types usually promotes operands to `int`:

```java
byte a = 1;
byte b = 2;

// byte c = a + b; // compile-time error: a + b is int
byte c = (byte) (a + b);
```

Integer overflow does not throw by default:

```java
int max = Integer.MAX_VALUE;
int wrapped = max + 1;

System.out.println(wrapped); // -2147483648
```

For exact overflow detection, use methods such as `Math.addExact`:

```java
int result = Math.addExact(Integer.MAX_VALUE, 1); // throws ArithmeticException
```

Floating-point arithmetic follows binary floating-point behavior:

```java
System.out.println(0.1 + 0.2); // 0.30000000000000004
```

This is not a Java defect specifically; it is a consequence of representing decimal fractions in binary floating-point.

| Task                     | Usually appropriate type                 | Reason                                          |
| ------------------------ | ---------------------------------------- | ----------------------------------------------- |
| Count items              | `int` or `long`                          | Integral value                                  |
| File size                | `long`                                   | Can exceed `int`                                |
| Money                    | `BigDecimal`, domain-specific money type | Decimal exactness and currency rules            |
| Scientific approximation | `double`                                 | Floating approximation acceptable               |
| Boolean state            | `boolean`                                | No integer truthiness                           |
| Text processing          | `String`, `int` code points when needed  | `char` is not enough for all Unicode characters |

**Tempting but wrong mental model:** “Java numeric types automatically protect against overflow.”

**Surprising behavior or bug:** `Integer.MAX_VALUE + 1` silently wraps.

**Correct semantic explanation:** Java integer arithmetic uses fixed-width two’s-complement-like behavior for `int` and `long`; overflow is not automatically checked in ordinary arithmetic.

**Professional rule of thumb:** Use `int` for ordinary small counts, `long` for large counts and sizes, `BigDecimal` or domain money types for exact decimal business values, and explicit exact arithmetic methods when overflow matters.

**Boundary where the rule changes:** Some library methods, such as `Math.addExact`, deliberately check overflow and throw exceptions.

**Common Pitfalls:**
Do not use `float` or `double` for money. Do not assume `char` means one displayed character. Do not rely on overflow unless implementing a deliberately low-level algorithm. Do not use `byte` or `short` for ordinary arithmetic merely to “save memory” in local variables.

### Reference Types — classes, interfaces, arrays, enums, records, null

Reference types are types whose values are references to objects or arrays. A reference variable may hold a reference value or `null`.

| Reference type kind | Example                          | What values look like                                | Central use                     |
| ------------------- | -------------------------------- | ---------------------------------------------------- | ------------------------------- |
| Class type          | `String`, `ArrayList`, `User`    | Reference to object or `null`                        | Objects with state and behavior |
| Interface type      | `List`, `Runnable`, `Comparable` | Reference to object implementing interface or `null` | Behavioral abstraction          |
| Array type          | `int[]`, `String[]`              | Reference to array object or `null`                  | Fixed-size indexed sequence     |
| Enum type           | `Status`                         | Reference to enum constant or `null`                 | Closed named constants          |
| Record type         | `UserId`                         | Reference to record object or `null`                 | Transparent data carrier        |
| Annotation type     | `Override`, custom annotation    | Metadata form                                        | Tool/framework metadata         |

```java
String text = "hello";
List<String> names = new ArrayList<>();
int[] numbers = {1, 2, 3};
Status status = Status.ACTIVE;
UserId id = new UserId("u-001");
```

A reference variable is not the object itself:

```java
List<String> a = new ArrayList<>();
List<String> b = a;

a.add("Ada");
System.out.println(b); // [Ada]
```

Both variables hold reference values pointing to the same list object.

Null is assignable to reference types:

```java
String name = null;
// name.length(); // NullPointerException at runtime
```

| Operation             | Primitive type                                    | Reference type                                  |
| --------------------- | ------------------------------------------------- | ----------------------------------------------- |
| Variable stores       | Actual primitive value                            | Reference value                                 |
| Can be `null`         | No                                                | Yes, except special cases by convention/tooling |
| `==` means            | Value equality                                    | Reference identity                              |
| Method calls          | Not on primitive directly, except boxing contexts | Dispatch through reference                      |
| Default field value   | `0`, `false`, etc.                                | `null`                                          |
| Generic type argument | Not directly                                      | Yes; use wrapper for primitives                 |

**Language-design note:** Java’s reference model supports object sharing, polymorphism, dynamic dispatch, and managed memory. The cost is aliasing: many variables can refer to the same mutable object.

**Common Pitfalls:**
Do not say “the variable contains the object.” A variable of reference type contains a reference value. Do not treat `null` as a valid object. Do not forget that arrays are objects. Do not assume reference equality is value equality.

### Operators and Expressions — precedence, side effects, evaluation, short-circuiting

An expression computes a value, performs an operation, or both. Java expressions can be pure-looking while still causing side effects, especially assignments, increments, method calls, object creation, and array updates.

| Expression kind | Example              | Meaning                                 | Side-effect risk                    |
| --------------- | -------------------- | --------------------------------------- | ----------------------------------- |
| Literal         | `42`, `"x"`          | Value representation                    | Usually none                        |
| Variable access | `count`              | Read variable value                     | None by itself                      |
| Assignment      | `count = 3`          | Store and produce assigned value        | Yes                                 |
| Method call     | `service.save(user)` | Invoke method                           | Often yes                           |
| Object creation | `new User(name)`     | Allocate and initialize object          | Allocation, constructor effects     |
| Field access    | `user.name`          | Read/write field                        | Write can mutate state              |
| Array access    | `items[0]`           | Read/write indexed element              | Write mutates array                 |
| Cast            | `(User) value`       | Runtime or compile-time type conversion | May throw                           |
| Lambda          | `x -> x + 1`         | Function-like object expression         | Captures context                    |
| Conditional     | `condition ? a : b`  | Choose expression branch                | Branch expressions may have effects |

Java operators have precedence rules, but professional code should not force readers to memorize obscure precedence chains.

```java
int result = a + b * c;      // multiplication before addition
int clearer = a + (b * c);   // often clearer in nontrivial expressions
```

| Operator family      | Examples                | Meaning                                    | Pitfall                                        |                         |                                       |
| -------------------- | ----------------------- | ------------------------------------------ | ---------------------------------------------- | ----------------------- | ------------------------------------- |
| Arithmetic           | `+`, `-`, `*`, `/`, `%` | Numeric operations                         | Overflow, integer division                     |                         |                                       |
| String concatenation | `+`                     | Builds string when one operand is `String` | Hidden allocation in loops                     |                         |                                       |
| Comparison           | `<`, `<=`, `>`, `>=`    | Primitive/order comparison                 | Not for arbitrary object comparison            |                         |                                       |
| Equality             | `==`, `!=`              | Primitive equality or reference identity   | Object value equality confusion                |                         |                                       |
| Logical              | `&&`, `                 |                                            | `, `!`                                         | Boolean logic           | Side effects skipped by short-circuit |
| Bitwise              | `&`, `                  | `, `^`, `~`                                | Bit operations; also boolean non-short-circuit | Confusing `&` with `&&` |                                       |
| Shift                | `<<`, `>>`, `>>>`       | Bit shifting                               | Signed vs unsigned shift                       |                         |                                       |
| Assignment           | `=`, `+=`, `-=`, etc.   | Update variable/storage                    | Hidden narrowing in compound assignment        |                         |                                       |
| Conditional          | `?:`                    | Expression-level branch                    | Nesting hurts readability                      |                         |                                       |
| Type test            | `instanceof`            | Runtime type check / pattern match         | Overusing instead of polymorphism              |                         |                                       |
| Member access        | `.`                     | Access member                              | Null dereference risk                          |                         |                                       |
| Method reference     | `::`                    | Reference method/constructor               | Type depends on target functional interface    |                         |                                       |
| Lambda               | `->`                    | Function-like expression                   | Captured locals must be effectively final      |                         |                                       |

Short-circuiting matters:

```java
if (user != null && user.isActive()) {
    send(user);
}
```

The second operand is evaluated only if `user != null` is true. This prevents a null dereference.

Non-short-circuit boolean operators evaluate both sides:

```java
if (user != null & user.isActive()) {
    send(user);
}
```

This can throw `NullPointerException` because `user.isActive()` is evaluated even when `user` is `null`.

Integer division truncates:

```java
int ratio = 5 / 2;      // 2
double precise = 5 / 2; // 2.0, because division happened as int division first
double better = 5.0 / 2; // 2.5
```

String concatenation with `+` is convenient but can hide repeated allocation if used badly in loops:

```java
String result = "";
for (String part : parts) {
    result += part; // poor for many iterations
}
```

Prefer `StringBuilder` or collectors in repeated concatenation.

**Tempting but wrong mental model:** “Expressions only compute values.”

**Surprising behavior or bug:** `i++`, `list.add(x)`, `map.put(k, v)`, `x = y`, and `new FileInputStream(path)` all appear in expression positions but have side effects or resource implications.

**Correct semantic explanation:** Java expressions can compute values and perform side effects. Syntax category does not imply purity.

**Professional rule of thumb:** Keep expressions simple when they contain side effects. Avoid clever combinations of assignment, increment, method calls, and conditionals.

**Boundary where the rule changes:** Pure functional-style APIs can make expressions easier to reason about, but Java does not enforce purity. A method call may do anything its implementation permits.

**Common Pitfalls:**
Do not confuse `&` with `&&` in ordinary conditions. Do not rely on complex operator precedence. Do not use `==` for object value equality. Do not hide expensive or mutating operations inside expressions that look like simple reads.

### Basic Control Flow — `if`, loops, `switch`, `break`, `continue`, `return`

Java control flow is statement-oriented. Most program execution is controlled by statements rather than expression syntax.

| Construct      | Syntax shape                              | Use                                          | Common pitfall                                     |
| -------------- | ----------------------------------------- | -------------------------------------------- | -------------------------------------------------- |
| `if`           | `if (condition) statement else statement` | Conditional execution                        | Missing braces in maintenance-sensitive code       |
| `while`        | `while (condition) statement`             | Repeat while condition holds                 | Infinite loops                                     |
| `do while`     | `do statement while (condition);`         | Execute at least once                        | Rare; often less readable                          |
| Classic `for`  | `for (init; condition; update)`           | Index-based iteration                        | Off-by-one errors                                  |
| Enhanced `for` | `for (Type x : iterable)`                 | Iterate arrays/iterables                     | Cannot safely remove from many collections         |
| `switch`       | `switch` statement/expression             | Branch by value/pattern depending on feature | Fall-through in old-style statement                |
| `break`        | Exit loop/switch                          | Termination                                  | Breaking wrong level in nested code                |
| `continue`     | Next loop iteration                       | Skip rest of loop body                       | Obscuring loop logic                               |
| `return`       | Exit method with/without value            | Method result                                | Returning before cleanup without resource handling |
| `throw`        | Throw exception                           | Failure transfer                             | Throwing overly broad exceptions                   |

Basic `if`:

```java
if (score >= 60) {
    return "pass";
} else {
    return "fail";
}
```

Braces are not always syntactically required for a single statement, but they are often professionally preferred:

```java
if (active)
    send(user);
    audit(user); // always runs; indentation is misleading
```

Prefer:

```java
if (active) {
    send(user);
    audit(user);
}
```

Classic loop:

```java
for (int i = 0; i < items.size(); i++) {
    process(items.get(i));
}
```

Enhanced loop:

```java
for (Item item : items) {
    process(item);
}
```

Use enhanced `for` when the index is not meaningful. Use classic `for` when the index, range control, or reverse iteration matters.

| Iteration task         | Better construct                        | Reason                        |
| ---------------------- | --------------------------------------- | ----------------------------- |
| Visit every element    | Enhanced `for`                          | Clear and low ceremony        |
| Need index             | Classic `for`                           | Index is explicit             |
| Remove while iterating | `Iterator` removal or collection method | Avoid concurrent modification |
| Transform collection   | Stream or loop                          | Depends on clarity and cost   |
| Repeat until condition | `while`                                 | Condition is primary          |
| Execute at least once  | `do while`                              | Rare but semantically exact   |
| Break on first match   | Loop with `break` / early `return`      | Clear control transfer        |

`switch` has evolved. Traditional `switch` statements can fall through; modern switch expressions and arrow labels reduce many errors.

Traditional style:

```java
switch (status) {
    case ACTIVE:
        sendActiveMessage();
        break;
    case SUSPENDED:
        sendSuspendedMessage();
        break;
    default:
        sendDefaultMessage();
}
```

Modern arrow style:

```java
switch (status) {
    case ACTIVE -> sendActiveMessage();
    case SUSPENDED -> sendSuspendedMessage();
    default -> sendDefaultMessage();
}
```

Switch expression:

```java
String label = switch (status) {
    case ACTIVE -> "active";
    case SUSPENDED -> "suspended";
};
```

With enums, sealed hierarchies, and modern pattern matching, `switch` can become a modeling tool rather than just a control statement. Detailed modeling use belongs in `PART 3` and `PART 4`, but the primitive source-recognition rule is simple: old-style colon `case` may fall through; arrow `case ->` does not fall through in the same way.

**Tempting but wrong mental model:** “Indentation controls Java blocks.”

**Surprising behavior or bug:** A statement visually indented under `if` may run unconditionally if braces are missing.

**Correct semantic explanation:** Java block structure is controlled by braces and grammar, not indentation.

**Professional rule of thumb:** Use braces for `if`, `for`, and `while` bodies in maintainable code, even when a single statement would be legal.

**Boundary where the rule changes:** Very short guard clauses may be accepted in some codebases without braces, but consistency matters more than local cleverness.

**Common Pitfalls:**
Do not forget `break` in old-style switch statements unless fall-through is deliberate and documented. Do not mutate collections structurally inside enhanced `for` unless using a safe mechanism. Do not make loop exit conditions depend on hidden mutations scattered through the body.

### Basic Method Syntax — parameters, return types, overloading, overriding, varargs

Methods are named operations declared in classes, records, enums, or interfaces. A method signature exposes a name, parameter types, return type, type parameters when generic, modifiers, and possibly a `throws` clause.

```java
public Money calculateTotal(Invoice invoice, TaxPolicy taxPolicy) {
    Money subtotal = invoice.subtotal();
    return taxPolicy.applyTo(subtotal);
}
```

| Method component | Example                                       | Meaning                                          |
| ---------------- | --------------------------------------------- | ------------------------------------------------ |
| Access modifier  | `public`                                      | Who may call it                                  |
| Other modifier   | `static`, `final`, `abstract`, `synchronized` | Special method behavior or restrictions          |
| Type parameters  | `<T>`                                         | Generic method parameterization                  |
| Return type      | `Money`                                       | Type returned to caller                          |
| Method name      | `calculateTotal`                              | Operation identity                               |
| Parameters       | `(Invoice invoice)`                           | Values received from caller                      |
| Throws clause    | `throws IOException`                          | Checked exceptions caller must handle or declare |
| Body             | `{ ... }`                                     | Executed statements                              |

A method returning no value uses `void`:

```java
public void sendEmail(User user, String message) {
    mailer.send(user.email(), message);
}
```

A method can return early:

```java
public boolean isEligible(User user) {
    if (user == null) {
        return false;
    }
    return user.isActive();
}
```

Method overloading means multiple methods have the same name but different parameter lists:

```java
public void log(String message) {
    log(message, Severity.INFO);
}

public void log(String message, Severity severity) {
    // ...
}
```

Overloading is resolved at compile time based on declared argument types. It is not the same as overriding.

Overriding means a subclass or implementing class provides behavior for a method declared in a superclass or interface:

```java
interface Formatter {
    String format(Object value);
}

final class JsonFormatter implements Formatter {
    @Override
    public String format(Object value) {
        return toJson(value);
    }
}
```

| Concept     | Meaning                                | Resolved when?               | Example risk                        |
| ----------- | -------------------------------------- | ---------------------------- | ----------------------------------- |
| Overloading | Same method name, different parameters | Compile time                 | Ambiguous calls with `null`         |
| Overriding  | Subtype replaces inherited behavior    | Runtime dispatch             | Broken superclass contract          |
| Hiding      | Static method/field name in subtype    | Compile-time reference type  | Confusing static polymorphism       |
| Varargs     | Variable number of arguments           | Compile-time array packaging | Heap pollution with generic varargs |

Varargs:

```java
public void sendAll(String... messages) {
    for (String message : messages) {
        send(message);
    }
}
```

A varargs parameter is treated like an array inside the method:

```java
public void sendAll(String... messages) {
    System.out.println(messages.length);
}
```

Varargs should usually be the final parameter:

```java
public void log(Severity severity, String... messages) {
    // ...
}
```

Overloading with `null` can be ambiguous:

```java
void process(String value) {}
void process(Integer value) {}

// process(null); // ambiguous
```

**Language-design note:** Java methods combine static type checking with runtime dynamic dispatch. The compiler checks that a call is legal; the runtime may choose the actual overridden implementation based on the object’s class.

**Tempting but wrong mental model:** “The method called is always determined by the variable’s declared type.”

**Surprising behavior or bug:** A variable declared as an interface type can invoke an implementation method selected at runtime.

**Correct semantic explanation:** Instance method overriding uses dynamic dispatch. Overloading selection is compile-time; overriding dispatch is runtime.

**Professional rule of thumb:** Use overloading only when the operations are genuinely the same conceptual action. Use `@Override` whenever overriding is intended.

**Boundary where the rule changes:** Static methods are not dynamically overridden. They are hidden, and calls are resolved based on the reference type used in source.

**Common Pitfalls:**
Do not overload methods in ways that make `null`, boxing, or varargs resolution surprising. Do not omit `@Override`. Do not use varargs for APIs where the caller needs a meaningful collection abstraction.

### Basic Class Syntax — fields, constructors, methods, initialization, `this`

Classes are Java’s central declaration form. A class can declare fields, constructors, methods, nested types, initialization blocks, and modifiers.

```java
public final class User {
    private final UserId id;
    private String displayName;

    public User(UserId id, String displayName) {
        this.id = Objects.requireNonNull(id);
        this.displayName = Objects.requireNonNull(displayName);
    }

    public UserId id() {
        return id;
    }

    public String displayName() {
        return displayName;
    }

    public void rename(String displayName) {
        this.displayName = Objects.requireNonNull(displayName);
    }
}
```

| Class member         | Example                      | Meaning                   | Common pitfall                                  |
| -------------------- | ---------------------------- | ------------------------- | ----------------------------------------------- |
| Instance field       | `private String name;`       | Per-object state          | Exposing mutable fields                         |
| Static field         | `private static int count;`  | Class-level state         | Hidden global mutable state                     |
| Constructor          | `public User(...)`           | Initializes new object    | Calling overridable methods during construction |
| Instance method      | `public String name()`       | Behavior on object        | Hidden side effects                             |
| Static method        | `public static User of(...)` | Class-associated behavior | Treating as polymorphic                         |
| Nested class         | `static class Builder`       | Type inside type          | Overcomplicating structure                      |
| Initialization block | `{ ... }`, `static { ... }`  | Initialization logic      | Hard-to-follow lifecycle                        |

Constructors do not have return types:

```java
public User(String name) {
    this.name = name;
}
```

This is a method, not a constructor:

```java
public void User(String name) {
    // bad: ordinary method named User, not constructor
}
```

`this` refers to the current object:

```java
public void rename(String displayName) {
    this.displayName = displayName;
}
```

`static` members belong to the class rather than an individual object:

```java
public final class IdGenerator {
    private static long nextId = 1;

    public static long next() {
        return nextId++;
    }
}
```

Static mutable state is dangerous in concurrent and test-heavy systems because it behaves like global state.

| Design choice          | Best use                               | Risk                               |
| ---------------------- | -------------------------------------- | ---------------------------------- |
| `private final` field  | Stable object state                    | Shallow immutability only          |
| Mutable field          | Entity lifecycle, local state machines | Aliasing, concurrency issues       |
| Static constant        | True universal constant                | Misusing for runtime configuration |
| Static mutable field   | Rare shared process-wide state         | Test interference, races           |
| Constructor validation | Enforce invariants                     | Throwing before object is usable   |
| Factory method         | Naming construction variants           | Hiding complexity if overused      |

**Tempting but wrong mental model:** “A class is just a bag of fields and functions.”

**Surprising behavior or bug:** Poor constructor validation allows invalid objects to exist and forces every method to defend against impossible states.

**Correct semantic explanation:** A class defines a type, state representation, initialization rules, and behavior. Constructors establish initial invariants.

**Professional rule of thumb:** Keep fields private. Establish invariants in constructors or factories. Expose behavior and stable queries rather than representation.

**Boundary where the rule changes:** Simple records are often better than manually written classes for transparent data carriers. Frameworks may require no-argument constructors or reflective field access, but that is framework convention, not ideal language-level design.

**Common Pitfalls:**
Do not expose public mutable fields. Do not put business logic in static global utilities by default. Do not let constructors leak `this`. Do not confuse static methods with polymorphic behavior.

### Basic Interface Syntax — contracts, implementation, default methods, static methods

Interfaces declare contracts. A class can implement one or more interfaces.

```java
public interface PaymentGateway {
    PaymentResult charge(Money amount, PaymentMethod method);
}

public final class StripeGateway implements PaymentGateway {
    @Override
    public PaymentResult charge(Money amount, PaymentMethod method) {
        // ...
        return PaymentResult.success();
    }
}
```

| Interface element | Example                      | Meaning                                   | Common pitfall                    |
| ----------------- | ---------------------------- | ----------------------------------------- | --------------------------------- |
| Abstract method   | `void run();`                | Implementing class must provide behavior  | Interface too broad               |
| Default method    | `default int size() { ... }` | Interface provides method body            | Adding stateful assumptions       |
| Static method     | `static Comparator<T> ...`   | Utility/factory associated with interface | Expecting override                |
| Constant          | `String NAME = "x";`         | implicitly `public static final`          | Using interfaces as constant bags |
| Private method    | `private void helper()`      | Shared internal logic for default methods | Overcomplicated default behavior  |

Interfaces should express stable behavior:

```java
public interface Clock {
    Instant now();
}
```

This is useful because it abstracts time access for testing and design.

A poor interface is one created merely because “every class should have an interface”:

```java
public interface UserServiceInterface {
    User getUser(UserId id);
}
```

If there is only one implementation, no meaningful abstraction boundary, and no testing or substitution value, the interface may be accidental complexity.

Default methods allow interface evolution:

```java
public interface Repository<T> {
    Optional<T> findById(String id);

    default boolean existsById(String id) {
        return findById(id).isPresent();
    }
}
```

They can reduce breakage when adding behavior, but they should not turn interfaces into hidden base classes.

**Language-design note:** Java interfaces are nominal contracts. A class must explicitly implement the interface; having matching methods is not enough.

**Common Pitfalls:**
Do not create interfaces automatically for every class. Do not use interfaces as constant containers. Do not put heavy stateful logic in default methods. Do not assume static interface methods participate in polymorphism.

### Basic Record Syntax — compact transparent data carriers

Records are concise classes for transparent data carriers. They declare components, and Java provides a canonical constructor, accessors, `equals`, `hashCode`, and `toString`.

```java
public record UserId(String value) {}
```

This gives an accessor named `value()`:

```java
UserId id = new UserId("u-001");
System.out.println(id.value());
```

A record can validate its components using a compact constructor:

```java
public record UserId(String value) {
    public UserId {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("value must not be blank");
        }
    }
}
```

| Record feature        | Meaning                    | Practical consequence                           |
| --------------------- | -------------------------- | ----------------------------------------------- |
| Component list        | Declares state             | State is part of public API                     |
| Accessor              | `value()`                  | No JavaBean `getValue()` by default             |
| Canonical constructor | Initializes all components | Can validate invariants                         |
| `equals` / `hashCode` | Component-based            | Works well as map keys if components are stable |
| `toString`            | Component display          | Useful but not a security-safe log format       |
| Final nature          | Records are final          | No subclassing                                  |

Records are not merely “less verbose classes.” They communicate that the object is primarily a transparent aggregate of values.

| Use record when                           | Prefer class when                       |
| ----------------------------------------- | --------------------------------------- |
| Data components are the public model      | Representation must be hidden           |
| Component equality is correct             | Identity/lifecycle equality matters     |
| Object should be shallowly immutable      | Object has complex mutable state        |
| You want concise domain values            | You need inheritance                    |
| Invariants are simple and component-based | Construction involves complex protocols |

**Tempting but wrong mental model:** “Records are Java’s version of mutable DTOs.”

**Surprising behavior or bug:** Record equality uses all components, which may be wrong for entities where identity is not component equality.

**Correct semantic explanation:** A record is a transparent, shallowly immutable data carrier with component-based equality.

**Professional rule of thumb:** Use records for value-like data. Do not use records for mutable entities with lifecycle identity.

**Boundary where the rule changes:** A record component can itself refer to a mutable object. The record is shallowly immutable, not deeply immutable.

**Common Pitfalls:**
Do not put mutable collections into records without defensive copying if immutability is expected. Do not use records for objects whose identity is independent of their fields. Do not assume record accessors use JavaBean `getX()` naming.

### Basic Enum Syntax — named constants, behavior, identity

Enums define a closed set of named constants.

```java
public enum Status {
    ACTIVE,
    SUSPENDED,
    DELETED
}
```

Enums can have fields, constructors, and methods:

```java
public enum Severity {
    LOW(1),
    MEDIUM(2),
    HIGH(3);

    private final int level;

    Severity(int level) {
        this.level = level;
    }

    public int level() {
        return level;
    }
}
```

Enum comparison with `==` is idiomatic:

```java
if (status == Status.ACTIVE) {
    // ...
}
```

| Enum feature                 | Meaning                  | Professional use                 |
| ---------------------------- | ------------------------ | -------------------------------- |
| Named constants              | Fixed known values       | Domain states, modes, categories |
| Private constructor          | Initialize constant data | Attach stable metadata           |
| Methods                      | Behavior per enum type   | Avoid scattered switch logic     |
| Constant-specific class body | Per-constant behavior    | Useful but can become obscure    |
| `values()`                   | All constants array      | Iteration                        |
| `valueOf`                    | Parse exact enum name    | Beware external input            |

Enums are good for closed sets, but external data should not be blindly parsed with `valueOf` unless exact names are part of the stable contract:

```java
Status status = Status.valueOf(input); // throws if input does not match exactly
```

For external input, use explicit parsing:

```java
public static Optional<Status> parseStatus(String input) {
    return switch (input.toLowerCase(Locale.ROOT)) {
        case "active" -> Optional.of(Status.ACTIVE);
        case "suspended" -> Optional.of(Status.SUSPENDED);
        case "deleted" -> Optional.of(Status.DELETED);
        default -> Optional.empty();
    };
}
```

**Language-design note:** Enums give Java a safe named-constant mechanism superior to integer constants. They support both identity comparison and type safety.

**Common Pitfalls:**
Do not persist enum ordinal values unless the order is an explicit stable protocol. Do not use `valueOf` directly on untrusted input. Do not create giant enums with unrelated behavior merely to avoid classes.

### Basic Array Syntax — fixed size, indexed access, covariance, reification

Arrays are fixed-size objects with indexed elements.

```java
int[] numbers = {1, 2, 3};
String[] names = new String[10];

numbers[0] = 42;
System.out.println(numbers.length);
```

| Array syntax      | Meaning                                             |
| ----------------- | --------------------------------------------------- |
| `int[] xs`        | Array of `int`                                      |
| `new int[10]`     | New array with length 10 and default element values |
| `{1, 2, 3}`       | Array initializer                                   |
| `xs[i]`           | Element access                                      |
| `xs.length`       | Array length field                                  |
| `String[][] grid` | Array of arrays                                     |

Arrays know their component type at runtime; generics mostly do not. Arrays are also covariant:

```java
String[] strings = new String[1];
Object[] objects = strings;

objects[0] = 123; // ArrayStoreException at runtime
```

This compiles because `String[]` is considered a subtype of `Object[]`, but it fails at runtime because the actual array can store only `String`.

By contrast, generic collections are invariant:

```java
List<String> strings = List.of("a");
// List<Object> objects = strings; // compile-time error
```

| Arrays                   | Generic collections                                |
| ------------------------ | -------------------------------------------------- |
| Fixed size               | Usually resizable or abstraction-dependent         |
| Reified component type   | Type parameters erased                             |
| Covariant                | Invariant                                          |
| Efficient for primitives | Cannot store primitives directly as type arguments |
| Simple indexed storage   | Rich APIs and abstractions                         |
| Runtime store checks     | Compile-time generic checks with erasure caveats   |

**Tempting but wrong mental model:** “Arrays and lists are the same kind of sequence.”

**Surprising behavior or bug:** Arrays allow covariance and then may throw `ArrayStoreException`; generic lists prevent the analogous assignment at compile time.

**Correct semantic explanation:** Arrays are reified and covariant. Generic collections are erased and invariant.

**Professional rule of thumb:** Use arrays for primitive buffers, low-level APIs, fixed-size data, and varargs. Use collections for most domain-level sequences.

**Boundary where the rule changes:** Performance-sensitive code, interoperability APIs, and memory-sensitive primitive storage may justify arrays.

**Common Pitfalls:**
Do not expose mutable internal arrays directly. Do not confuse `array.length` with `list.size()`. Do not expect array `equals` to compare contents. Do not rely on covariance except where legacy APIs require it.

### Basic Package and Import Syntax — namespaces, source organization, type lookup

A Java source file usually begins with a package declaration, followed by imports, followed by type declarations.

```java
package com.example.billing;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public final class Invoice {
    // ...
}
```

| Construct             | Meaning                                      | Example                                         | Common pitfall                                  |
| --------------------- | -------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `package` declaration | Places compilation unit in package namespace | `package com.example.billing;`                  | Package name not matching directory conventions |
| Single-type import    | Imports one type                             | `import java.util.List;`                        | Importing wrong class with same simple name     |
| On-demand import      | Imports all accessible types in package      | `import java.util.*;`                           | Name ambiguity, less explicit                   |
| Static import         | Imports static members                       | `import static java.util.Comparator.comparing;` | Obscuring origin of methods/constants           |
| Fully qualified name  | Uses full package path                       | `java.util.List`                                | Verbose but disambiguating                      |

Imports do not include subpackages. `import java.util.*;` does not import `java.util.concurrent.*`.

Package names are not just cosmetic. They encode architectural location, visibility relationships, and dependency direction.

| Package pattern             | Usually means                        | Risk                                       |
| --------------------------- | ------------------------------------ | ------------------------------------------ |
| `com.example.user`          | Feature/domain package               | Good if cohesive                           |
| `com.example.user.api`      | Public-facing contracts              | Can become dumping ground                  |
| `com.example.user.internal` | Implementation details by convention | Not automatically enforced without modules |
| `com.example.util`          | Shared utility package               | Often becomes incoherent                   |
| `com.example.config`        | Configuration                        | Can mix framework and domain concerns      |

Package-private access means no explicit access modifier:

```java
final class InternalParser {
    // visible within same package
}
```

This is a useful design tool, but it is not a security boundary.

**Language-design note:** Packages solve name organization; modules solve stronger dependency and readability boundaries. Basic package syntax appears here; full module-boundary design belongs in `PART 5`.

**Common Pitfalls:**
Do not use wildcard imports in codebases that prefer explicit import readability. Do not confuse package-private with private. Do not create packages by technical layer only when domain boundaries would be clearer. Do not assume imports affect runtime dependency availability; they are source-level type-name conveniences.

### Basic Error Syntax — `throw`, `try`, `catch`, `finally`, `throws`

Java errors and exceptional control flow are expressed with `throw`, `try`, `catch`, `finally`, and `throws`.

```java
public User loadUser(UserId id) throws IOException {
    try {
        return repository.load(id);
    } catch (FileNotFoundException e) {
        throw new UserNotFoundException(id, e);
    }
}
```

| Syntax             | Meaning                                      | Example                                | Common pitfall                                 |
| ------------------ | -------------------------------------------- | -------------------------------------- | ---------------------------------------------- |
| `throw`            | Throws an exception object                   | `throw new IllegalArgumentException()` | Throwing vague exceptions                      |
| `throws`           | Declares checked exceptions method may throw | `throws IOException`                   | Treating as documentation only                 |
| `try`              | Protects block for handlers/finalization     | `try { ... }`                          | Overly broad protected block                   |
| `catch`            | Handles matching exception type              | `catch (IOException e)`                | Catching too broadly                           |
| `finally`          | Runs after try/catch before exit             | `finally { cleanup(); }`               | Cleanup that throws and masks original failure |
| try-with-resources | Ensures resource closing                     | `try (var in = ...) {}`                | Resource must implement `AutoCloseable`        |

Checked exception example:

```java
public String readConfig(Path path) throws IOException {
    return Files.readString(path);
}
```

Unchecked exception example:

```java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("age must be non-negative");
    }
    this.age = age;
}
```

Try-with-resources is the standard syntax for resource cleanup:

```java
try (BufferedReader reader = Files.newBufferedReader(path)) {
    return reader.readLine();
}
```

This is preferable to manual `finally` for closeable resources because it handles closure reliably and preserves suppressed exceptions.

Multi-catch:

```java
try {
    parse(input);
} catch (NumberFormatException | DateTimeParseException e) {
    throw new InvalidInputException("Invalid input: " + input, e);
}
```

Exception handling should be designed around recovery boundaries:

| Situation                              | Better action                                        |
| -------------------------------------- | ---------------------------------------------------- |
| Caller can retry or choose alternative | Use checked exception or explicit result-like API    |
| Argument violates method contract      | Throw `IllegalArgumentException`                     |
| Object state makes operation invalid   | Throw `IllegalStateException`                        |
| External I/O fails                     | Propagate or translate `IOException` meaningfully    |
| Exception only needs logging here?     | Usually do not catch just to log and rethrow blindly |
| Cannot handle meaningfully             | Let it propagate or translate at boundary            |

**Tempting but wrong mental model:** “Catching an exception means handling it.”

**Surprising behavior or bug:** Code catches an exception, logs it, returns a default value, and corrupts later program behavior.

**Correct semantic explanation:** A `catch` block intercepts exceptional control flow. It only “handles” the failure if it restores a meaningful program state or translates the failure appropriately.

**Professional rule of thumb:** Catch exceptions at boundaries where there is a real decision: retry, translate, compensate, reject input, close a protocol, or report failure.

**Boundary where the rule changes:** Low-level libraries may catch and wrap exceptions to preserve abstraction. Top-level application boundaries may catch broadly to log, respond, or terminate gracefully.

**Common Pitfalls:**
Do not catch `Exception` merely to silence errors. Do not ignore interrupted status in concurrent code. Do not use exceptions for ordinary loop control. Do not put too much code inside one `try` block if only one operation is expected to fail.

### Basic Object Creation — `new`, constructors, factories, initialization

Objects are commonly created with `new`, which allocates an object and invokes a constructor.

```java
User user = new User(new UserId("u-001"), "Ada");
```

| Creation form        | Example                                | Meaning                     | Best use                                 |
| -------------------- | -------------------------------------- | --------------------------- | ---------------------------------------- |
| Constructor call     | `new User(name)`                       | Direct object creation      | Clear simple construction                |
| Static factory       | `User.of(name)`                        | Named creation method       | Validation, caching, alternate names     |
| Builder              | `User.builder().name(name).build()`    | Stepwise construction       | Many optional parameters                 |
| Collection factory   | `List.of("a", "b")`                    | Library-provided creation   | Immutable/unmodifiable collection result |
| Reflection           | `clazz.getConstructor().newInstance()` | Runtime dynamic creation    | Frameworks, plugins                      |
| Dependency injection | Constructor called by framework        | Framework-managed lifecycle | Enterprise applications                  |

Static factories can name construction intent:

```java
public final class Money {
    private final BigDecimal amount;
    private final Currency currency;

    private Money(BigDecimal amount, Currency currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public static Money of(BigDecimal amount, Currency currency) {
        return new Money(amount, currency);
    }

    public static Money zero(Currency currency) {
        return new Money(BigDecimal.ZERO, currency);
    }
}
```

Constructor overloading can become ambiguous when many parameters share the same type:

```java
new User("Ada", "Lovelace", "admin", "active");
```

A record, builder, or domain-specific value objects may communicate intent better.

**Language-design note:** Java object creation is explicit at the source level, but frameworks may hide it through reflection, proxies, dependency injection, or serialization. That distinction matters in debugging.

**Common Pitfalls:**
Do not use constructors with long same-typed parameter lists. Do not perform heavy I/O in constructors unless the class contract makes that explicit. Do not assume every object in Java source was created with visible `new`; frameworks and deserialization may instantiate reflectively.

### Basic Casts and Type Tests — explicit conversion, `instanceof`, pattern variables

Casts tell the compiler that a value should be treated as a more specific or different type. Some casts are checked at runtime; some numeric casts convert values.

```java
Object value = "hello";

if (value instanceof String s) {
    System.out.println(s.length());
}
```

| Construct              | Meaning                            | Example                 | Failure mode                    |
| ---------------------- | ---------------------------------- | ----------------------- | ------------------------------- |
| Reference cast         | Treat reference as target type     | `(String) value`        | `ClassCastException`            |
| Numeric cast           | Convert numeric value              | `(int) 3.14`            | Truncation or overflow          |
| `instanceof`           | Runtime type test                  | `x instanceof String`   | Overuse instead of polymorphism |
| Pattern `instanceof`   | Type test plus variable            | `x instanceof String s` | Scope misunderstanding          |
| Generic unchecked cast | Cast involving erased generic type | `(List<String>) value`  | Heap pollution                  |

Old style:

```java
if (value instanceof String) {
    String s = (String) value;
    System.out.println(s.length());
}
```

Modern pattern style:

```java
if (value instanceof String s) {
    System.out.println(s.length());
}
```

Pattern variables are available only where the match is known:

```java
if (value instanceof String s && s.length() > 3) {
    System.out.println(s);
}

// s is not available here
```

Casts are not validation in the broad domain sense. A cast can prove runtime type compatibility, but it does not prove that an object is semantically valid.

```java
Object input = "2026-05-10";
String text = (String) input; // type ok
// Still not validated as date, user ID, path, JSON, etc.
```

**Tempting but wrong mental model:** “A cast converts the object into the desired type.”

**Surprising behavior or bug:** `(User) value` does not transform a `Map` or JSON object into a `User`; it only checks whether the reference already points to a `User`.

**Correct semantic explanation:** A reference cast changes the static view of a reference and may perform a runtime type check. It does not rebuild the object.

**Professional rule of thumb:** Use casts at narrow dynamic boundaries. Prefer polymorphism, generics, sealed types, and explicit parsing/validation for ordinary design.

**Boundary where the rule changes:** Numeric casts do convert values, but may lose information.

**Common Pitfalls:**
Do not scatter casts through business logic. Do not ignore unchecked cast warnings. Do not use `instanceof` chains when polymorphism or sealed-type switch would better express the model. Do not mistake type checking for input validation.

### Basic Generic Syntax — type parameters, diamond, wildcards preview

Generics allow classes, interfaces, methods, and records to be parameterized by types.

```java
List<String> names = new ArrayList<String>();
```

The diamond operator reduces repetition:

```java
List<String> names = new ArrayList<>();
```

Generic method:

```java
public static <T> T first(List<T> values) {
    if (values.isEmpty()) {
        throw new IllegalArgumentException("values must not be empty");
    }
    return values.get(0);
}
```

| Generic syntax      | Meaning                                     | Example                  |
| ------------------- | ------------------------------------------- | ------------------------ |
| `List<String>`      | List whose elements are statically `String` | `List<String> names`     |
| `<T>`               | Type parameter declaration                  | `class Box<T>`           |
| `T value`           | Variable of type parameter                  | `private final T value;` |
| `new ArrayList<>()` | Infer constructor type arguments            | diamond syntax           |
| `?`                 | Unknown type wildcard                       | `List<?>`                |
| `? extends Number`  | Unknown subtype of `Number`                 | producer-like reading    |
| `? super Integer`   | Unknown supertype of `Integer`              | consumer-like writing    |

A simple generic class:

```java
public final class Box<T> {
    private final T value;

    public Box(T value) {
        this.value = value;
    }

    public T value() {
        return value;
    }
}
```

Use:

```java
Box<String> box = new Box<>("hello");
String value = box.value();
```

Generics are central to Java, but their deeper rules belong in `PART 3` and their erasure model belongs in `PART 7`. For `PART 2`, the key reading rule is: generic syntax adds static type information, especially to APIs and collections, but it does not mean Java stores full generic type parameters at runtime.

```java
List<String> strings = new ArrayList<>();
strings.add("Ada");

// strings.add(42); // compile-time error
```

**Tempting but wrong mental model:** “`List<String>` exists as a fully distinct runtime type.”

**Surprising behavior or bug:** Runtime checks often cannot distinguish `List<String>` from `List<Integer>` because type parameters are erased.

**Correct semantic explanation:** Java generics primarily enforce compile-time constraints. Most type-argument information is not preserved as ordinary runtime type identity.

**Professional rule of thumb:** Use generics to express API contracts and collection element types. Treat unchecked warnings as design signals, not noise.

**Boundary where the rule changes:** Some generic metadata can be recovered from declarations through reflection, but ordinary object instances do not carry complete generic type arguments in the way many learners expect.

**Common Pitfalls:**
Do not use raw types such as `List` in new code. Do not suppress unchecked warnings casually. Do not expect `new T()` or `T.class` to work without explicit type metadata.

### Basic Lambda and Method Reference Syntax — functional interfaces, capture, target typing

Java lambdas are expressions that implement **functional interfaces**: interfaces with a single abstract method.

```java
Runnable task = () -> System.out.println("running");
```

A lambda has a target type. The same lambda syntax can mean different interface types depending on context.

```java
Predicate<String> nonEmpty = s -> !s.isEmpty();
Function<String, Integer> length = s -> s.length();
Consumer<String> printer = s -> System.out.println(s);
```

| Syntax                | Meaning                                         | Example                      |
| --------------------- | ----------------------------------------------- | ---------------------------- |
| `() -> body`          | No-argument lambda                              | `() -> now()`                |
| `x -> body`           | One inferred parameter                          | `x -> x.toString()`          |
| `(x, y) -> body`      | Multiple parameters                             | `(a, b) -> a + b`            |
| `(String s) -> body`  | Explicit parameter type                         | `(String s) -> s.length()`   |
| `x -> expression`     | Expression body returns value if target expects | `x -> x + 1`                 |
| `x -> { statements }` | Block body                                      | `x -> { log(x); return x; }` |
| `Type::method`        | Method reference                                | `String::length`             |
| `object::method`      | Bound method reference                          | `printer::print`             |
| `Type::new`           | Constructor reference                           | `ArrayList::new`             |

Captured local variables must be final or effectively final:

```java
String prefix = "[LOG] ";

Consumer<String> logger = message -> System.out.println(prefix + message);

// prefix = "[NEW] "; // would break effective finality
```

This restriction avoids confusion around local variable lifetime and mutation capture.

Lambdas are not general-purpose function values independent of types. They are converted to instances of functional interfaces.

```java
@FunctionalInterface
interface Transformer<T, R> {
    R transform(T value);
}

Transformer<String, Integer> length = s -> s.length();
```

**Language-design note:** Java added lambdas without abandoning its nominal type system. A lambda is not “just a function”; it is an expression whose meaning depends on the target functional interface.

**Tempting but wrong mental model:** “Java has first-class functions exactly like JavaScript or Python.”

**Surprising behavior or bug:** A lambda cannot be assigned without a target type, and overload resolution may become ambiguous.

**Correct semantic explanation:** Lambda expressions are target-typed and instantiate functional interfaces.

**Professional rule of thumb:** Use lambdas for small behavior parameters. Use named classes or methods when behavior needs identity, state, documentation, or reuse.

**Boundary where the rule changes:** Method references can improve readability when they directly name an existing operation; they can hurt readability when they obscure parameter flow.

**Common Pitfalls:**
Do not write large lambdas with complex control flow. Do not mutate shared state from lambdas without concurrency discipline. Do not assume captured variables can be reassigned. Do not overuse method references when a lambda would be clearer.

### Basic Annotation Syntax — metadata, compiler checks, framework hooks

Annotations attach metadata to declarations, types, parameters, methods, fields, and other program elements.

```java
@Override
public String toString() {
    return "User";
}
```

| Annotation             | Common use              | Meaning                                                  |
| ---------------------- | ----------------------- | -------------------------------------------------------- |
| `@Override`            | Method declarations     | Compiler checks overriding intent                        |
| `@Deprecated`          | Old APIs                | API should generally not be used in new code             |
| `@SuppressWarnings`    | Warning control         | Suppresses selected compiler warnings                    |
| `@FunctionalInterface` | Interface declarations  | Compiler checks single abstract method                   |
| Custom annotations     | Framework/tool metadata | Interpreted by tools, reflection, processors, frameworks |

Annotations can have values:

```java
@Deprecated(since = "2.0", forRemoval = true)
public void oldMethod() {
}
```

Custom annotation use:

```java
public @interface Audited {
    String value();
}

@Audited("payment")
public void charge() {
}
```

The annotation itself does nothing unless a compiler, annotation processor, runtime reflection mechanism, framework, or tool interprets it.

| Annotation consumer  | Example                                      | Effect                     |
| -------------------- | -------------------------------------------- | -------------------------- |
| Compiler             | `@Override`                                  | Compile-time checking      |
| Javadoc/tooling      | `@Deprecated`                                | Documentation and warnings |
| Annotation processor | code generation / validation                 | Build-time behavior        |
| Runtime framework    | dependency injection, routing, serialization | Runtime behavior           |
| Static analyzer      | nullness, security, style checks             | Tool-enforced convention   |

**Tempting but wrong mental model:** “Adding an annotation automatically changes language behavior.”

**Surprising behavior or bug:** A custom annotation may have no effect if no processor or framework reads it.

**Correct semantic explanation:** An annotation is metadata. Its effect depends on retention policy and on a consumer that interprets it.

**Professional rule of thumb:** Treat annotations as part of an explicit tooling or framework contract. Know who reads the annotation and when.

**Boundary where the rule changes:** Some annotations are interpreted by the compiler itself, such as `@Override` and `@SuppressWarnings`.

**Common Pitfalls:**
Do not use annotations as magical architecture. Do not suppress warnings without understanding the warning. Do not confuse framework annotations with Java language features.

### Basic Access Modifiers — `public`, `protected`, package-private, `private`

Access modifiers control source-level visibility.

| Modifier        | Visible from                                            | Typical use                  | Common pitfall                                |
| --------------- | ------------------------------------------------------- | ---------------------------- | --------------------------------------------- |
| `public`        | Everywhere with access to type/module                   | Public API                   | Exposing too much                             |
| `protected`     | Same package and subclasses                             | Inheritance extension points | Misunderstanding cross-package access         |
| package-private | Same package                                            | Internal collaboration       | Assuming stronger encapsulation than it gives |
| `private`       | Declaring top-level class member / nested context rules | Implementation details       | Overusing when testing design is poor         |

For top-level types, only `public` or package-private are ordinary choices:

```java
public final class PublicApi {
}

final class PackageInternalHelper {
}
```

For members:

```java
public final class User {
    private final String name;

    public User(String name) {
        this.name = name;
    }

    public String name() {
        return name;
    }
}
```

Visibility should express API boundaries, not merely satisfy compiler access.

| Design intent                         | Good visibility choice                 |
| ------------------------------------- | -------------------------------------- |
| External stable API                   | `public`                               |
| Internal implementation detail        | `private` or package-private           |
| Collaborating classes in same package | package-private                        |
| Carefully designed subclass hook      | `protected`                            |
| Constant used across modules          | `public static final`, if truly stable |
| Mutable state                         | Usually `private`                      |

**Language-design note:** Access modifiers support encapsulation, but encapsulation is also a design discipline. A `public` method with a mutable internal collection can still leak representation.

```java
public List<String> names() {
    return names; // leaks mutable internal list if names is mutable
}
```

Prefer:

```java
public List<String> names() {
    return List.copyOf(names);
}
```

or maintain an immutable internal representation.

**Common Pitfalls:**
Do not make classes, methods, or fields `public` by default. Do not use `protected` as if it means “private to subclasses only.” Do not expose mutable implementation details through public accessors.

### Modifiers and Declaration Keywords — `static`, `final`, `abstract`, `sealed`, `synchronized`

Java uses modifiers to refine declarations.

| Modifier       | Applies to                                             | Meaning                                                              | Common pitfall                                 |
| -------------- | ------------------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------- |
| `static`       | fields, methods, nested classes, initialization blocks | Belongs to class rather than instance                                | Hidden global state                            |
| `final`        | variables, fields, methods, classes                    | No reassignment, no override, or no subclassing depending on context | Mistaking final reference for immutable object |
| `abstract`     | classes, methods                                       | Incomplete; must be implemented by concrete subtype                  | Abstract class when interface would do         |
| `sealed`       | classes/interfaces                                     | Restricts permitted subtypes                                         | Poorly chosen closed hierarchy                 |
| `non-sealed`   | subclasses of sealed type                              | Reopens hierarchy                                                    | Weakening exhaustiveness                       |
| `synchronized` | methods/blocks                                         | Acquires monitor lock                                                | Assuming it solves all concurrency issues      |
| `volatile`     | fields                                                 | Visibility/ordering for field access                                 | Treating as compound atomicity                 |
| `transient`    | fields                                                 | Excluded from default serialization                                  | Assuming all serializers honor it              |
| `strictfp`     | floating-point behavior legacy context                 | Less central in modern Java                                          | Usually irrelevant in ordinary code            |
| `native`       | methods                                                | Implemented outside Java                                             | Boundary to native code                        |
| `default`      | interface methods, switch labels                       | Interface method body or switch fallback                             | Context-dependent keyword                      |

`static` example:

```java
public final class MathUtil {
    public static int square(int x) {
        return x * x;
    }
}
```

`final` examples:

```java
final int count = 10;

public final class UserId {
}

public class Base {
    public final void stableMethod() {
    }
}
```

`abstract` example:

```java
public abstract class Shape {
    public abstract double area();
}
```

`sealed` example:

```java
public sealed interface PaymentResult
        permits PaymentSuccess, PaymentFailure {
}

public record PaymentSuccess(String transactionId) implements PaymentResult {
}

public record PaymentFailure(String reason) implements PaymentResult {
}
```

Sealed types are especially important for modeling closed alternatives, but the modeling implications belong more fully in `PART 3`.

**Language-design note:** Java modifiers encode design constraints into declarations. The compiler can enforce some constraints, but not the design wisdom behind them.

**Common Pitfalls:**
Do not make everything `static` to avoid modeling object relationships. Do not assume `volatile` makes compound operations safe. Do not use `abstract` classes for every abstraction; interfaces are often better for contracts. Do not use `sealed` unless the set of permitted subtypes is genuinely part of the domain model.

### Source File Shape — compilation unit, one public top-level type, package conventions

A Java source file is a compilation unit. It may contain a package declaration, imports, and top-level type declarations.

```java
package com.example.user;

import java.time.Instant;

public final class User {
    private final String name;
    private final Instant createdAt;

    public User(String name, Instant createdAt) {
        this.name = name;
        this.createdAt = createdAt;
    }
}
```

A conventional Java source file with a public top-level class is named after that public class:

```text
User.java
```

| Source element               |            Usual order | Notes                                   |
| ---------------------------- | ---------------------: | --------------------------------------- |
| Package declaration          |                      1 | At most one                             |
| Imports                      |                      2 | After package, before type declarations |
| Public top-level type        |                      3 | File name usually matches               |
| Package-private helper types | after/before as needed | Use sparingly in same file              |
| Nested types                 |  inside enclosing type | Useful when strongly related            |

Multiple top-level package-private classes can exist in one file, but overusing this harms navigability.

**Common Pitfalls:**
Do not put many unrelated top-level classes in one source file. Do not rely on source-file organization alone as an architectural boundary. Do not confuse package structure with module structure or dependency management.

### Primitive Semantic Checklist — reading Java source accurately

| Source pattern          | Correct reading                                                          |
| ----------------------- | ------------------------------------------------------------------------ |
| `Type name = expr;`     | Declare variable of static type `Type`, initialize with expression value |
| `var name = expr;`      | Declare local variable with compiler-inferred static type                |
| `name = expr;`          | Reassign variable or storage location                                    |
| `obj.method(arg)`       | Invoke method through reference; may dispatch dynamically                |
| `ClassName.method(arg)` | Invoke static method or access static member                             |
| `new Type(args)`        | Allocate and initialize object                                           |
| `a == b`                | Primitive value equality or reference identity                           |
| `a.equals(b)`           | Method-defined equality, may throw if `a` is null                        |
| `Objects.equals(a, b)`  | Null-safe equality                                                       |
| `final Type x`          | Variable/field cannot be reassigned after initialization                 |
| `private final` field   | Stable field binding, not necessarily deeply immutable                   |
| `List<String>`          | Compile-time generic element contract, mostly erased at runtime          |
| `String[]`              | Reified array type with runtime component checks                         |
| `if (x instanceof T t)` | Runtime type test and scoped pattern variable                            |
| `try (...) {}`          | Resource-management block with automatic close                           |
| `throws IOException`    | Method exposes checked exception obligation                              |
| `@Annotation`           | Metadata interpreted by compiler/tool/framework if applicable            |
| `static`                | Class-level member, not instance-level polymorphic state                 |
| `sealed`                | Closed subtype set controlled by declaration                             |

### Core Syntax Tradeoff Map — why Java looks the way it does

| Syntax/design choice    | Problem solved                   | Capability gained                      | Cost introduced                       | Misuse encouraged                         |
| ----------------------- | -------------------------------- | -------------------------------------- | ------------------------------------- | ----------------------------------------- |
| C-family syntax         | Familiarity for many programmers | Readable imperative structure          | Visual confusion with C/C++ semantics | Importing wrong pointer/value assumptions |
| Explicit declarations   | Large-system clarity             | Static analysis and refactoring        | Verbosity                             | Boilerplate-heavy design                  |
| Classes as primary unit | Encapsulation and API structure  | Object modeling                        | Over-classification                   | Everything-as-object anti-pattern         |
| Interfaces              | Behavioral contracts             | Polymorphism and substitution          | Contract proliferation                | Interface for every class                 |
| Generics                | Type-safe reusable APIs          | Safer collections                      | Erasure and wildcard complexity       | Raw types and unchecked casts             |
| Exceptions              | Nonlocal failure transfer        | Separation of normal and failure paths | Control-flow invisibility             | Catching too broadly                      |
| Annotations             | Metadata without manual wiring   | Framework/tool integration             | Hidden behavior                       | Annotation-driven opacity                 |
| Modifiers               | Declarative constraints          | Encapsulation and API control          | Keyword density                       | Treating syntax as design substitute      |

Java source syntax is therefore not accidental verbosity. It is a surface form designed to make declarations, contracts, and boundaries visible enough for compilers, tools, teams, and long-lived systems. The same syntax can become harmful when it is used to manufacture unnecessary abstraction rather than to clarify program structure.
## PART 3 — Data, Types, and Modeling Reference by Task Pattern

### Orientation — data modeling, type safety, representation choice, domain meaning

Java data modeling is not simply “choose a class.” It is the practice of choosing a representation that makes invalid states harder to express, common operations readable, API contracts stable, and runtime costs acceptable.

In Java, data modeling choices usually involve these mechanisms:

| Modeling mechanism | Primary role                                 | Best use                                    | Main cost                                          |
| ------------------ | -------------------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| Primitive type     | Direct scalar value                          | counts, flags, numeric calculations         | no domain meaning by itself                        |
| Wrapper type       | Object form of primitive                     | generics, nullable legacy APIs              | boxing, nullability                                |
| Class              | Encapsulated state and behavior              | entities, services, mutable domain objects  | boilerplate and design responsibility              |
| Record             | Transparent data carrier                     | value-like aggregates                       | shallow immutability only                          |
| Enum               | Closed set of named constants                | statuses, modes, categories                 | weak if state space needs data variants            |
| Sealed hierarchy   | Closed family of subtypes                    | finite variants with different data         | more structure and source organization             |
| Interface          | Behavioral contract                          | polymorphic APIs                            | accidental over-abstraction                        |
| Generic type       | Reusable typed abstraction                   | containers, repositories, algorithms        | erasure and wildcard complexity                    |
| Collection         | Group of values                              | lists, sets, maps, queues                   | mutability, equality, ordering, performance        |
| `Optional`         | Explicit possible absence in return position | maybe-result APIs                           | misuse as field/parameter/general null replacement |
| Annotation         | Metadata or tool-level constraint            | validation, nullness, framework integration | only works if a tool/framework enforces it         |

A Java type is not automatically a domain model. `String userId` is type-correct but weakly modeled. `UserId userId` carries domain meaning. `Map<String, Object>` can represent many things but proves almost nothing. A record such as `record UserId(String value)` is more explicit, but it still needs validation if blank or malformed values are invalid.

The central design question in Java is:

| Question                      | Bad answer                            | Better Java answer                                                      |
| ----------------------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| What values are valid?        | “The caller should know.”             | Constructor/factory validation, domain-specific types                   |
| Can the value be absent?      | Use `null` everywhere                 | Use `Optional` for return absence, validation for required input        |
| Is the state space finite?    | Use arbitrary strings or integers     | Use `enum` or sealed hierarchy                                          |
| Does behavior vary by type?   | Use `if` chains on flags              | Use polymorphism or sealed `switch`                                     |
| Is ordering meaningful?       | Use whatever collection is convenient | Choose `List`, `Set`, `Map`, `Queue`, or sorted collection deliberately |
| Is mutation intended?         | Expose mutable internals              | Encapsulate mutation or use immutable copies                            |
| Is the type boundary trusted? | Cast and hope                         | Parse, validate, and translate at the boundary                          |

### Type-System Properties — static typing, nominal typing, subtyping, erasure, runtime checks

Java’s type system is static and nominal, but not purely compile-time. Many operations are checked at compile time; some are checked at runtime; some are left to programmer discipline.

| Type-system property      | Java behavior                                                      | Practical consequence                                 | Common misunderstanding                        |
| ------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------- | ---------------------------------------------- |
| Static typing             | Variables, parameters, fields, and methods have compile-time types | Many invalid operations are rejected before execution | Static typing does not remove runtime failures |
| Nominal typing            | Compatibility follows declared relationships                       | Interfaces/classes define explicit contracts          | Matching method names are not enough           |
| Subtyping                 | Classes extend classes; classes implement interfaces               | Polymorphism through declared supertypes              | Subtyping is not automatically good modeling   |
| Generics                  | Type parameters constrain APIs at compile time                     | Safer collections and helpers                         | Runtime generic information is mostly erased   |
| Type erasure              | Generic type arguments mostly not available at runtime             | Backward compatibility with old bytecode              | `List<String>` is not a distinct runtime class |
| Runtime casts             | Some checks happen during execution                                | Dynamic boundaries can fail                           | Casts do not validate domain correctness       |
| Null permissiveness       | Most reference variables may be `null`                             | Null contracts require discipline                     | Java is not null-safe by default               |
| Primitive/reference split | `int` differs from `Integer`                                       | Boxing, nullability, performance effects              | Wrapper and primitive are not identical        |
| Array covariance          | `String[]` is an `Object[]`                                        | Runtime store checks                                  | Arrays behave differently from generics        |

**Interdisciplinary Lens: Type theory**

What it clarifies: Java types classify values and constrain operations, but Java’s type system is pragmatic rather than maximally expressive.

Language feature involved: nominal subtyping, interfaces, generics, casts, arrays, records, sealed classes.

Practical consequence: A Java type should be treated as an API contract and design boundary, not merely as compiler decoration.

Limit of the lens: Type theory explains static guarantees, but Java programs also depend on runtime behavior, mutable state, reflection, annotations, frameworks, and conventions.

A useful mental map:

| What Java can check                                | Example                                                   |
| -------------------------------------------------- | --------------------------------------------------------- |
| Method exists on declared type                     | `user.name()` only if `name` is declared                  |
| Assignment compatibility                           | `List<String>` cannot be assigned to `List<Object>`       |
| Constructor argument types                         | `new UserId(42)` rejected if constructor expects `String` |
| Checked exception handling                         | `IOException` must be caught or declared                  |
| Enum exhaustiveness in some modern switch contexts | Depends on switch form and type                           |

| What Java cannot fully check by default    | Example                                                       |
| ------------------------------------------ | ------------------------------------------------------------- |
| Non-nullness of ordinary references        | `String name` may still be `null`                             |
| String format validity                     | `String email` may not be an email                            |
| Collection immutability                    | `List<T>` does not guarantee immutable list                   |
| Thread safety                              | A type may be shared unsafely                                 |
| Resource lifecycle                         | A reference may point to an unclosed resource                 |
| Runtime generic element type after erasure | `List<?>` may hide heap pollution                             |
| Business invariants                        | `age >= 0`, `start <= end`, `amount currency matches account` |

**Tempting but wrong mental model:** “If Java compiles, the data is valid.”

**Surprising behavior or bug:** A compiled program can still accept `null`, blank IDs, negative money amounts, inconsistent date ranges, unsafe casts, and mutable aliases.

**Correct semantic explanation:** Java type checking proves compatibility with declared types. It does not automatically prove domain validity, resource safety, immutability, or thread safety.

**Professional rule of thumb:** Use Java types to encode as much domain structure as is worth encoding, then enforce remaining invariants at construction and boundary points.

**Boundary where the rule changes:** Framework validation, static analyzers, nullness tools, annotation processors, and runtime schema validators can add guarantees, but those are tool/framework contracts, not plain Java language guarantees.

### Define Structured Data — class, record, enum, sealed hierarchy, map, tuple-like structures

The first major data-modeling task is choosing how to represent structured information.

| Task                                          | Preferred construct                      | When to use                                          | Design meaning                       | Common pitfall                             |
| --------------------------------------------- | ---------------------------------------- | ---------------------------------------------------- | ------------------------------------ | ------------------------------------------ |
| Represent transparent value data              | `record`                                 | Components are the public model                      | Data carrier with component equality | Using record for lifecycle entity          |
| Represent encapsulated object with behavior   | class                                    | Invariants, hidden representation, mutable lifecycle | Object owns state and behavior       | Exposing fields directly                   |
| Represent finite named constants              | `enum`                                   | Fixed set of simple states                           | Closed symbolic domain               | Persisting ordinal values                  |
| Represent finite variants with different data | sealed interface/class + records/classes | Algebraic-like domain modeling                       | Closed family of alternatives        | Overengineering small state                |
| Represent dynamic external data               | parsed DTO, map only at boundary         | JSON/config/untrusted input                          | Boundary representation              | Letting `Map<String,Object>` infect domain |
| Represent temporary grouping                  | small record                             | Return multiple related values                       | Named structure                      | Using arrays or raw lists as tuples        |

A weak model:

```java
public void activateUser(String userId, String status, String role) {
    // userId may be blank
    // status may be misspelled
    // role may be invalid
}
```

A stronger model:

```java
public record UserId(String value) {
    public UserId {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("user id must not be blank");
        }
    }
}

public enum UserStatus {
    ACTIVE,
    SUSPENDED,
    DELETED
}

public enum Role {
    ADMIN,
    MEMBER,
    GUEST
}

public void activateUser(UserId userId, UserStatus status, Role role) {
    // invalid categories are harder to pass accidentally
}
```

The stronger model is not always necessary for every local variable, but it is valuable at API boundaries, domain boundaries, and long-lived code paths.

### Use Records for Transparent Value Data — components, validation, equality, shallow immutability

A `record` is appropriate when the data components are the essential public meaning of the type.

```java
public record EmailAddress(String value) {
    public EmailAddress {
        if (value == null || !value.contains("@")) {
            throw new IllegalArgumentException("invalid email address");
        }
    }
}
```

Records automatically provide:

| Generated feature     | Example                   | Practical meaning           |
| --------------------- | ------------------------- | --------------------------- |
| Component accessors   | `email.value()`           | Access by component name    |
| Canonical constructor | `new EmailAddress(value)` | Initializes all components  |
| `equals`              | component-based           | Value-like equality         |
| `hashCode`            | component-based           | Works with hash collections |
| `toString`            | component display         | Useful for debugging        |
| Final class           | cannot subclass           | Stable value shape          |

Records are ideal for small domain values:

```java
public record Money(BigDecimal amount, Currency currency) {
    public Money {
        Objects.requireNonNull(amount);
        Objects.requireNonNull(currency);

        if (amount.signum() < 0) {
            throw new IllegalArgumentException("amount must not be negative");
        }
    }
}
```

But records are only shallowly immutable:

```java
public record BadOrder(List<String> items) {
}
```

The `items` reference cannot be reassigned inside the record, but the list object may be mutable. Use defensive copying:

```java
public record Order(List<String> items) {
    public Order {
        items = List.copyOf(items);
    }
}
```

| Record use                                           | Good or risky?      | Reason                                                 |
| ---------------------------------------------------- | ------------------- | ------------------------------------------------------ |
| `record UserId(String value)`                        | Good                | Domain-specific value                                  |
| `record Point(int x, int y)`                         | Good                | Transparent coordinate data                            |
| `record Money(BigDecimal amount, Currency currency)` | Good if validated   | Value object                                           |
| `record User(String id, String passwordHash)`        | Context-dependent   | May expose sensitive representation through `toString` |
| `record Account(List<Transaction> transactions)`     | Risky unless copied | Mutable component aliasing                             |
| `record UserEntity(...)` with mutable lifecycle      | Often wrong         | Entity identity may not equal all fields               |

**Tempting but wrong mental model:** “A record is automatically deeply immutable.”

**Surprising behavior or bug:** A record containing a mutable list can appear to change after construction if the original list is mutated.

**Correct semantic explanation:** Record fields are final, but referenced objects may still be mutable. Record immutability is shallow.

**Professional rule of thumb:** Use records for transparent value-like data. Defensively copy mutable components at construction.

**Boundary where the rule changes:** For performance-sensitive code, copying large structures may be too expensive; then the mutability contract must be explicit.

**Common Pitfalls:**
Do not use records for entities whose equality should be based on stable identity rather than all components. Do not put secrets in records without considering generated `toString`. Do not rely on record syntax to enforce deep immutability.

### Use Classes for Encapsulated State and Behavior — invariants, lifecycle, mutation, identity

A class is better than a record when representation should be hidden, state may change under controlled rules, identity matters, or behavior is central.

```java
public final class BankAccount {
    private final AccountId id;
    private Money balance;

    public BankAccount(AccountId id, Money openingBalance) {
        this.id = Objects.requireNonNull(id);
        this.balance = Objects.requireNonNull(openingBalance);
    }

    public AccountId id() {
        return id;
    }

    public Money balance() {
        return balance;
    }

    public void deposit(Money amount) {
        requirePositive(amount);
        balance = balance.plus(amount);
    }

    public void withdraw(Money amount) {
        requirePositive(amount);
        if (balance.isLessThan(amount)) {
            throw new IllegalArgumentException("insufficient funds");
        }
        balance = balance.minus(amount);
    }
}
```

This model does not expose a public setter for `balance`. The class controls valid transitions.

| Class modeling need         | Why class fits                                               |
| --------------------------- | ------------------------------------------------------------ |
| Hidden representation       | Fields can be private and transformed internally             |
| Controlled mutation         | Methods can enforce invariants                               |
| Lifecycle identity          | Equality can be based on ID or object identity               |
| Complex construction        | Constructors/factories can validate and normalize            |
| Behavior-rich domain object | Methods colocate behavior with state                         |
| Framework integration       | Many frameworks expect classes with annotations/constructors |

A class can be immutable:

```java
public final class Temperature {
    private final double celsius;

    private Temperature(double celsius) {
        this.celsius = celsius;
    }

    public static Temperature celsius(double value) {
        return new Temperature(value);
    }

    public static Temperature fahrenheit(double value) {
        return new Temperature((value - 32) * 5 / 9);
    }

    public double celsius() {
        return celsius;
    }
}
```

A class can be mutable but still safe if mutation is controlled.

| Design choice          | Effect                   | Risk                                    |
| ---------------------- | ------------------------ | --------------------------------------- |
| `private` fields       | Hide representation      | Excessive accessor boilerplate          |
| Constructor validation | Prevent invalid objects  | Heavy constructor side effects          |
| Static factory         | Name construction intent | Overusing factories for simple cases    |
| No setters             | Preserve invariants      | May be inconvenient for some frameworks |
| Controlled setters     | Explicit mutation points | Can weaken domain model                 |
| Mutable entity         | Represents lifecycle     | Harder concurrency and equality         |

**Tempting but wrong mental model:** “A class with getters and setters is a proper Java model.”

**Surprising behavior or bug:** Public setters allow invalid object states after construction, even if the constructor validates.

**Correct semantic explanation:** Encapsulation means controlling representation and transitions, not merely making fields private and generating accessors.

**Professional rule of thumb:** Use classes when behavior, invariants, lifecycle, or representation hiding matter. Avoid automatic setters unless mutation is genuinely part of the model.

**Boundary where the rule changes:** Framework DTOs, serialization objects, and persistence entities may require conventions that are not ideal domain modeling; isolate them where possible.

**Common Pitfalls:**
Do not create anemic classes that only expose mutable fields through getters/setters while pretending to enforce invariants. Do not put long-term domain logic into `Map<String,Object>`. Do not make equality depend on mutable fields used in hash collections.

### Model Finite States — enum, enum with behavior, sealed alternatives, state objects

Finite state is common: user status, payment result, order lifecycle, parsing outcome, permission mode. Java offers several levels of precision.

| State-modeling task          | Construct        | Example                        | Best use                       | Pitfall                         |
| ---------------------------- | ---------------- | ------------------------------ | ------------------------------ | ------------------------------- |
| Simple closed names          | `enum`           | `ACTIVE`, `SUSPENDED`          | Fixed categories               | Adding unrelated data elsewhere |
| Closed names with metadata   | enum fields      | severity level, label          | Stable per-constant properties | Persisting ordinal              |
| Closed names with behavior   | enum methods     | strategy per constant          | Small behavior variation       | Too much logic in enum          |
| Variants with different data | sealed hierarchy | `Success`, `Failure`           | Result/event/state variants    | Overcomplex for simple states   |
| Open behavior family         | interface        | plugins, extensible strategies | Extensible systems             | Losing exhaustiveness           |

Basic enum:

```java
public enum OrderStatus {
    CREATED,
    PAID,
    SHIPPED,
    CANCELLED
}
```

Enum with behavior:

```java
public enum OrderStatus {
    CREATED {
        @Override
        public boolean canCancel() {
            return true;
        }
    },
    PAID {
        @Override
        public boolean canCancel() {
            return true;
        }
    },
    SHIPPED {
        @Override
        public boolean canCancel() {
            return false;
        }
    },
    CANCELLED {
        @Override
        public boolean canCancel() {
            return false;
        }
    };

    public abstract boolean canCancel();
}
```

This can be clearer than scattered switch statements, but it can also become too dense if the behavior needs dependencies, state, or complex collaboration.

For states with different data, use sealed types:

```java
public sealed interface PaymentResult
        permits PaymentResult.Success, PaymentResult.Failure {

    record Success(String transactionId) implements PaymentResult {
    }

    record Failure(String reason) implements PaymentResult {
    }
}
```

Then branch by type:

```java
public String message(PaymentResult result) {
    return switch (result) {
        case PaymentResult.Success success ->
                "Paid: " + success.transactionId();
        case PaymentResult.Failure failure ->
                "Failed: " + failure.reason();
    };
}
```

Sealed hierarchies are Java’s closest mainstream tool for modeling algebraic data types, but they remain nominal and class/interface-based.

| Use enum when                   | Use sealed hierarchy when                  |
| ------------------------------- | ------------------------------------------ |
| Each state has same shape       | Variants carry different data              |
| State names are enough          | Variant-specific payload matters           |
| Small fixed category set        | Exhaustive branching over variant objects  |
| Persistence names can be stable | Domain events/results need typed structure |
| Behavior per state is small     | Behavior/data combination is richer        |

**Tempting but wrong mental model:** “Use `String` for status because it is flexible.”

**Surprising behavior or bug:** `"active"`, `"ACTIVE"`, `"actve"`, and `"disabled"` all compile as strings.

**Correct semantic explanation:** A string does not encode the finite state space. An enum or sealed type does.

**Professional rule of thumb:** Use `enum` for simple closed symbolic states. Use sealed hierarchies when alternatives need different data or exhaustive type-specific handling.

**Boundary where the rule changes:** External protocols may represent states as strings; parse them at the boundary and translate into domain enums or sealed types internally.

**Common Pitfalls:**
Do not persist enum ordinals. Do not use giant enums as substitutes for a real object model. Do not use sealed types when the set of implementations must remain open to third-party extension.

### Model Domain Concepts — primitive obsession, value objects, identifiers, units, invariants

A frequent Java modeling failure is **primitive obsession**: representing domain concepts with raw primitives or strings when a named type would prevent mistakes.

Weak model:

```java
public void transfer(String fromAccount, String toAccount, BigDecimal amount) {
}
```

Stronger model:

```java
public record AccountId(String value) {
    public AccountId {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("account id must not be blank");
        }
    }
}

public record TransferAmount(BigDecimal value) {
    public TransferAmount {
        Objects.requireNonNull(value);
        if (value.signum() <= 0) {
            throw new IllegalArgumentException("amount must be positive");
        }
    }
}

public void transfer(AccountId from, AccountId to, TransferAmount amount) {
}
```

The stronger model gives names to domain roles. It also prevents accidentally passing an arbitrary string where an account ID is expected.

| Raw representation        | Domain-specific alternative | Benefit                                 |
| ------------------------- | --------------------------- | --------------------------------------- |
| `String userId`           | `UserId`                    | Prevents mixing user ID with email/name |
| `String email`            | `EmailAddress`              | Centralizes validation                  |
| `BigDecimal amount`       | `Money`                     | Couples amount with currency            |
| `int seconds`             | `Duration`                  | Avoids unit confusion                   |
| `String status`           | `OrderStatus`               | Prevents invalid state names            |
| `Map<String,Object> user` | `UserDto` / `User`          | Makes expected shape explicit           |

Java’s standard library already offers some domain-like types:

| Standard type | Better than       | Why                                    |
| ------------- | ----------------- | -------------------------------------- |
| `Path`        | `String path`     | Path operations and platform awareness |
| `Instant`     | `long timestamp`  | Time semantics                         |
| `Duration`    | `long millis`     | Unit clarity                           |
| `LocalDate`   | `String date`     | Calendar date semantics                |
| `URI`         | `String uri`      | Parsed URI structure                   |
| `UUID`        | `String id`       | Identifier format                      |
| `Currency`    | `String currency` | Currency code semantics                |
| `Locale`      | `String locale`   | Locale semantics                       |

**Design tradeoff:** Domain-specific types increase clarity and safety, but they also add code. The right level depends on API importance, bug cost, frequency of use, and whether the concept has real invariants.

| Use raw type when                              | Use domain type when                          |
| ---------------------------------------------- | --------------------------------------------- |
| Value is local and obvious                     | Value crosses method/class boundaries         |
| No domain invariant exists                     | Validation or normalization matters           |
| Low bug cost                                   | Confusing it with another value is costly     |
| Temporary calculation                          | Public API or long-lived domain state         |
| Standard library type already captures meaning | Multiple raw values share same primitive type |

**Tempting but wrong mental model:** “A `String` is fine because the value is textual.”

**Surprising behavior or bug:** The compiler cannot distinguish email, username, user ID, account ID, country code, and status if all are `String`.

**Correct semantic explanation:** Type names encode domain roles. Raw primitives encode only representation.

**Professional rule of thumb:** Introduce domain-specific value types at important boundaries and where same-shaped values are easy to confuse.

**Boundary where the rule changes:** Over-modeling every trivial local value creates noise. Modeling should reduce real ambiguity, not satisfy aesthetic purity.

**Common Pitfalls:**
Do not wrap primitives without adding meaning, validation, or API clarity. Do not allow domain wrappers to become ceremony-only. Do not ignore standard library types that already model the concept.

### Choose the Right Collection — `List`, `Set`, `Map`, `Queue`, arrays, streams

Collections are among the most important Java modeling tools. Choosing the wrong collection often produces hidden bugs.

| Task                             | Preferred abstraction | Why                                   | Common pitfall                        |
| -------------------------------- | --------------------- | ------------------------------------- | ------------------------------------- |
| Ordered sequence with duplicates | `List<T>`             | Preserves order and allows duplicates | Using when uniqueness matters         |
| Unique elements                  | `Set<T>`              | Enforces uniqueness by equality       | Broken `equals`/`hashCode`            |
| Key-value lookup                 | `Map<K,V>`            | Associates keys with values           | Using list search repeatedly          |
| FIFO processing                  | `Queue<T>`            | Models waiting work                   | Using list as queue                   |
| Double-ended operations          | `Deque<T>`            | Stack/queue operations                | Legacy `Stack`                        |
| Fixed primitive buffer           | array                 | Efficient indexed storage             | Exposing mutable array                |
| Lazy/pipeline transformation     | `Stream<T>`           | Declarative processing                | Reusing stream or hiding side effects |
| Concurrent access                | concurrent collection | Thread-safe operations                | Assuming compound logic is atomic     |

Basic choices:

```java
List<User> users = new ArrayList<>();
Set<UserId> activeUserIds = new HashSet<>();
Map<UserId, User> usersById = new HashMap<>();
Queue<Job> jobs = new ArrayDeque<>();
```

Use interface types for variables and fields when the abstraction is enough:

```java
private final Map<UserId, User> usersById = new HashMap<>();
```

This exposes the modeling intent: key-value lookup. The implementation remains changeable.

| Collection | Ordering                  | Duplicates              | Lookup style          | Typical implementation                |
| ---------- | ------------------------- | ----------------------- | --------------------- | ------------------------------------- |
| `List`     | positional order          | allowed                 | by index or iteration | `ArrayList`, `LinkedList` rarely      |
| `Set`      | depends on implementation | not allowed by equality | membership            | `HashSet`, `LinkedHashSet`, `TreeSet` |
| `Map`      | key-based                 | keys unique             | by key                | `HashMap`, `LinkedHashMap`, `TreeMap` |
| `Queue`    | processing order          | allowed                 | head/tail operations  | `ArrayDeque`, concurrent queues       |
| `Deque`    | both ends                 | allowed                 | stack/queue           | `ArrayDeque`                          |
| array      | index order               | allowed                 | by index              | built-in                              |

`ArrayList` is usually the default list implementation. `LinkedList` is rarely the performance win beginners expect, because memory locality and allocation overhead often matter more than theoretical insertion complexity.

```java
List<String> names = new ArrayList<>();
names.add("Ada");
names.add("Grace");
```

Set behavior depends on `equals` and `hashCode`:

```java
Set<UserId> ids = new HashSet<>();

ids.add(new UserId("u-001"));
ids.add(new UserId("u-001"));

System.out.println(ids.size()); // 1 if UserId equality is component-based
```

Map lookup:

```java
Map<UserId, User> users = new HashMap<>();
users.put(user.id(), user);

User user = users.get(userId);
```

A `Map.get` returning `null` is ambiguous if null values are allowed. It may mean “no mapping” or “mapped to null.” Prefer avoiding null values in maps where possible.

```java
if (users.containsKey(userId)) {
    User user = users.get(userId);
}
```

Or design the API to return `Optional<User>`:

```java
public Optional<User> findUser(UserId id) {
    return Optional.ofNullable(users.get(id));
}
```

| Collection choice     | Hidden design question                              |
| --------------------- | --------------------------------------------------- |
| `List<T>`             | Is order meaningful or just accidental?             |
| `Set<T>`              | Is equality correctly defined and stable?           |
| `Map<K,V>`            | Is key identity clear and immutable?                |
| `Queue<T>`            | Who consumes, and what are failure/retry semantics? |
| `Stream<T>`           | Is this a one-shot pipeline or stored data?         |
| Array                 | Is fixed size and mutability acceptable?            |
| Concurrent collection | Are compound operations still safe?                 |

**Tempting but wrong mental model:** “Use `List` for any group of things.”

**Surprising behavior or bug:** Duplicate values appear, lookup becomes linear, and order accidentally becomes part of behavior.

**Correct semantic explanation:** Each collection interface encodes a different data contract: order, uniqueness, key association, queue discipline, or indexed storage.

**Professional rule of thumb:** Choose the narrowest collection abstraction that matches the domain operation: `Set` for membership, `Map` for lookup, `List` for ordered sequence, `Queue` for work ordering.

**Boundary where the rule changes:** Framework APIs often require specific collection types; adapt at the boundary rather than weakening the internal model.

**Common Pitfalls:**
Do not use `List` when uniqueness is required. Do not use mutable objects as hash keys if equality fields can change. Do not expose internal mutable collections directly. Do not assume concurrent collections make multi-step workflows atomic.

### Collection Mutability and Copies — modifiable, unmodifiable, immutable-by-contract

Java collection references do not tell whether the collection can be modified. `List<T>` is an interface; it does not promise mutability or immutability.

```java
List<String> mutable = new ArrayList<>();
List<String> fixed = Arrays.asList("a", "b");
List<String> unmodifiable = List.of("a", "b");
```

| Creation form                        | Mutability behavior                                  | Caveat                                    |
| ------------------------------------ | ---------------------------------------------------- | ----------------------------------------- |
| `new ArrayList<>()`                  | structurally modifiable                              | mutable                                   |
| `Arrays.asList(...)`                 | fixed size, elements settable                        | `add/remove` unsupported                  |
| `List.of(...)`                       | unmodifiable                                         | rejects null elements                     |
| `List.copyOf(...)`                   | unmodifiable copy                                    | shallow copy                              |
| `Collections.unmodifiableList(list)` | unmodifiable view                                    | backing list may still change             |
| `stream.toList()`                    | unmodifiable result in modern Java                   | exact implementation not the point        |
| `Collectors.toList()`                | no strong mutability guarantee by interface contract | often mutable but should not rely blindly |

Defensive copy at boundary:

```java
public final class Team {
    private final List<UserId> members;

    public Team(List<UserId> members) {
        this.members = List.copyOf(members);
    }

    public List<UserId> members() {
        return members;
    }
}
```

Unmodifiable view pitfall:

```java
List<String> source = new ArrayList<>();
List<String> view = Collections.unmodifiableList(source);

source.add("Ada");

System.out.println(view); // [Ada]
```

The view prevents mutation through `view`, but does not freeze `source`.

| Requirement                        | Better choice                                |
| ---------------------------------- | -------------------------------------------- |
| Need to build incrementally        | `ArrayList`, then copy                       |
| Need stable API return             | `List.copyOf` or internally immutable list   |
| Need live view                     | unmodifiable wrapper, documented             |
| Need deep immutability             | copy elements or use immutable element types |
| Need concurrent modification       | concurrent collection or synchronization     |
| Need persistent structural sharing | external persistent collection library       |

**Tempting but wrong mental model:** “Returning `List` means callers cannot mutate internals.”

**Surprising behavior or bug:** The caller mutates a returned list and corrupts object invariants.

**Correct semantic explanation:** `List` is only an interface. Mutability depends on implementation and whether the list aliases internal state.

**Professional rule of thumb:** Make defensive copies when crossing trust boundaries. Return unmodifiable collections unless mutation is explicitly part of the API contract.

**Boundary where the rule changes:** High-performance internal code may avoid copies, but then ownership and mutation rules must be documented and enforced by convention.

**Common Pitfalls:**
Do not confuse unmodifiable views with immutable snapshots. Do not assume `final List<T>` means unmodifiable contents. Do not expose internal arrays or collections from domain objects.

### Represent Optional or Missing Values — `null`, `Optional`, sentinel values, empty collections

Absence is one of Java’s sharpest modeling problems. Java permits `null` for most reference types, but `null` carries no explanation: absent, unknown, invalid, not loaded, not applicable, or error can all look the same.

| Absence representation | Best use                                         | Cost                        | Common pitfall                               |
| ---------------------- | ------------------------------------------------ | --------------------------- | -------------------------------------------- |
| `null`                 | Legacy APIs, internal carefully controlled state | Null dereference risk       | Ambiguous meaning                            |
| `Optional<T>`          | Return value that may be absent                  | Wrapper and API ceremony    | Using for fields/parameters indiscriminately |
| Empty collection       | No elements                                      | Clear for plural results    | Confusing empty with unavailable             |
| Sentinel object        | Special object representing none                 | Avoids null in some designs | Sentinel leaks into domain logic             |
| Exception              | Absence is failure                               | Clear failure path          | Overusing for expected absence               |
| Sealed result type     | Absence plus reason                              | Precise modeling            | More code                                    |
| Null object pattern    | Object with do-nothing behavior                  | Polymorphic simplification  | Can hide missing data                        |

Return absence:

```java
public Optional<User> findUser(UserId id) {
    return Optional.ofNullable(usersById.get(id));
}
```

Use:

```java
Optional<User> maybeUser = repository.findUser(id);

maybeUser.ifPresent(this::sendNotification);
```

Or:

```java
User user = repository.findUser(id)
        .orElseThrow(() -> new UserNotFoundException(id));
```

Do not use `Optional.get()` without checking:

```java
Optional<User> user = repository.findUser(id);
// User value = user.get(); // bad unless presence is already proven
```

For plural results, prefer empty collection over `null`:

```java
public List<User> findActiveUsers() {
    if (noUsersFound()) {
        return List.of();
    }
    return queryActiveUsers();
}
```

| Task                                 | Better representation                   |
| ------------------------------------ | --------------------------------------- |
| Maybe one result from lookup         | `Optional<T>`                           |
| Zero or more results                 | empty `List<T>` / `Set<T>`              |
| Required constructor parameter       | reject `null` with validation           |
| Field initialized later by framework | carefully documented nullable field     |
| Failure to parse with error reason   | exception or result type                |
| External nullable input              | validate and translate at boundary      |
| Cache may not have loaded value      | explicit state type, not ambiguous null |

`Optional` is mainly designed for return values. As a field type, it can add overhead and awkwardness; as a parameter, it often shifts responsibility to the caller in an unhelpful way.

Bad parameter style:

```java
public void send(Optional<String> subject) {
}
```

Usually better:

```java
public void send(String subject) {
    Objects.requireNonNull(subject);
}

public void sendWithoutSubject() {
}
```

or overload intentionally if the domain warrants it.

**Tempting but wrong mental model:** “Replace every `null` with `Optional`.”

**Surprising behavior or bug:** APIs become noisy, fields become awkward, and callers wrap/unwrap without clearer meaning.

**Correct semantic explanation:** `Optional` models possible absence in an API result. It is not a universal nullness system.

**Professional rule of thumb:** Use `Optional<T>` for return values where absence is expected and meaningful. Use empty collections for plural absence. Validate required values early.

**Boundary where the rule changes:** Some frameworks, serialization libraries, and persistence systems handle `Optional` fields poorly or with special conventions; do not assume framework support.

**Common Pitfalls:**
Do not return `null` from a method whose return type is `Optional<T>`. Do not call `Optional.get()` casually. Do not use `Optional<List<T>>` unless distinguishing “not loaded” from “loaded but empty” is genuinely necessary. Do not use null to encode multiple different states.

### Constrain Input — constructors, factories, validation methods, annotations, parsing

Java types alone do not enforce domain validity. A `String` can be blank. An `int` can be negative. A `BigDecimal` can have the wrong scale. A `Path` can point somewhere unauthorized. Input constraints must be enforced deliberately.

| Constraint task             | Java mechanism                                  | Best use                           | Pitfall                              |
| --------------------------- | ----------------------------------------------- | ---------------------------------- | ------------------------------------ |
| Required non-null           | `Objects.requireNonNull`                        | Constructor/method boundary        | Checking too late                    |
| Numeric range               | explicit check                                  | age, count, amount                 | Silent overflow before check         |
| Text format                 | parser/factory                                  | email, ID, code                    | Regex-only false confidence          |
| Cross-field invariant       | constructor/factory                             | date range, money/currency         | Validating fields independently only |
| External request validation | DTO + validation framework + domain translation | web/API input                      | Treating annotations as domain model |
| Normalization               | factory or constructor                          | trim, case folding, canonical form | Changing data unexpectedly           |
| Authorization constraint    | service/policy layer                            | user action permissions            | Mixing with basic parsing            |

Constructor validation:

```java
public record DateRange(LocalDate start, LocalDate end) {
    public DateRange {
        Objects.requireNonNull(start);
        Objects.requireNonNull(end);

        if (end.isBefore(start)) {
            throw new IllegalArgumentException("end must not be before start");
        }
    }
}
```

Static factory with parsing:

```java
public record EmailAddress(String value) {
    public EmailAddress {
        Objects.requireNonNull(value);
        if (!value.contains("@")) {
            throw new IllegalArgumentException("invalid email");
        }
    }

    public static Optional<EmailAddress> parse(String input) {
        if (input == null || !input.contains("@")) {
            return Optional.empty();
        }
        return Optional.of(new EmailAddress(input));
    }
}
```

This example uses a simplified email check; real email validation is more complex. The modeling point is that parsing external input should produce a domain type only after validation.

Annotations can express constraints for tools or frameworks:

```java
public record CreateUserRequest(
        @NotBlank String name,
        @Email String email
) {
}
```

But annotations require a validation engine. The Java compiler does not enforce `@Email`.

| Boundary                  | Recommended strategy                                            |
| ------------------------- | --------------------------------------------------------------- |
| Public constructor        | Validate required invariants                                    |
| Static factory            | Parse, normalize, return domain type                            |
| Public method             | Validate preconditions                                          |
| External JSON/input       | DTO → validation → domain translation                           |
| Database read             | Validate or trust based on controlled persistence boundary      |
| Internal private method   | Validate only if invariant may be violated internally           |
| Performance-critical path | Validate at boundary, avoid repeated checks inside trusted core |

**Tempting but wrong mental model:** “Validation annotations make the data valid.”

**Surprising behavior or bug:** Annotated objects are used without ever invoking the validator.

**Correct semantic explanation:** Annotations are metadata. They only enforce constraints if a tool, framework, or explicit validation call processes them.

**Professional rule of thumb:** Validate at boundaries and construct valid domain objects. Do not let untrusted raw data circulate through the system.

**Boundary where the rule changes:** In highly trusted internal code, repeated validation may be unnecessary if object construction already enforces invariants.

**Common Pitfalls:**
Do not spread validation randomly across the codebase. Do not validate only UI inputs while trusting API/database inputs blindly. Do not let invalid objects exist and rely on later methods to detect them.
### Validate External Data — DTOs, parsers, schema boundaries, domain translation

External data should not be treated as domain data merely because it has the right apparent shape. JSON, command-line arguments, HTTP parameters, database rows, environment variables, message-queue payloads, files, and user input are **untrusted boundaries**. Java’s type system only applies after data has been parsed into Java objects; it does not prove that external data is valid, authorized, complete, safe, or semantically meaningful.

| External source            | Typical raw representation      | Main risk                                   | Better modeling strategy                 |
| -------------------------- | ------------------------------- | ------------------------------------------- | ---------------------------------------- |
| JSON request               | DTO, `Map`, framework object    | missing fields, wrong types, invalid values | request DTO → validation → domain object |
| Database row               | entity, projection, raw columns | stale schema, nulls, inconsistent data      | persistence model → domain model         |
| Environment variable       | `String`                        | missing, malformed, wrong unit              | parser returning typed config            |
| CLI argument               | `String[]`                      | wrong arity, invalid option                 | command parser → typed command           |
| File content               | `String`, bytes, stream         | encoding, size, malicious content           | bounded read → parse → validate          |
| HTTP parameter             | `String`                        | injection, invalid format                   | parse at controller/boundary             |
| Message payload            | bytes/string/DTO                | version mismatch, replay, malformed payload | versioned schema and validation          |
| Reflection/framework input | object graph                    | hidden nulls, proxy behavior                | explicit boundary checks                 |

A weak boundary:

```java
public void createUser(Map<String, Object> body) {
    String name = (String) body.get("name");
    String email = (String) body.get("email");

    userService.create(name, email);
}
```

This compiles but has many hidden failures: missing keys, wrong runtime types, blank names, invalid email, null values, and unchecked casts.

A stronger boundary:

```java
public record CreateUserRequest(String name, String email) {
}

public record CreateUserCommand(UserName name, EmailAddress email) {
}

public CreateUserCommand toCommand(CreateUserRequest request) {
    Objects.requireNonNull(request);

    return new CreateUserCommand(
            UserName.parse(request.name())
                    .orElseThrow(() -> new IllegalArgumentException("invalid name")),
            EmailAddress.parse(request.email())
                    .orElseThrow(() -> new IllegalArgumentException("invalid email"))
    );
}
```

The DTO represents transport shape. The command represents validated domain intent. This separation prevents transport-layer convenience from infecting domain logic.

| Layer       | Object type                 | Responsibility            | Should contain domain invariants?                    |
| ----------- | --------------------------- | ------------------------- | ---------------------------------------------------- |
| Transport   | request/response DTO        | external shape            | usually no, except simple syntactic validation       |
| Validation  | validator/parser            | check and translate       | yes, as boundary enforcement                         |
| Domain      | value object/entity/command | meaningful internal model | yes                                                  |
| Persistence | entity/record/projection    | database mapping          | sometimes, but often mixed with persistence concerns |
| Framework   | proxy/annotated object      | lifecycle and integration | no, unless explicitly designed                       |

A parser should make failure explicit:

```java
public record Port(int value) {
    public Port {
        if (value < 1 || value > 65_535) {
            throw new IllegalArgumentException("port out of range");
        }
    }

    public static Optional<Port> parse(String input) {
        try {
            return Optional.of(new Port(Integer.parseInt(input)));
        } catch (NumberFormatException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }
}
```

For configuration, returning a domain type is clearer than passing strings around:

```java
public record ServerConfig(Host host, Port port) {
    public static ServerConfig from(Environment environment) {
        Host host = Host.parse(environment.require("HOST"))
                .orElseThrow(() -> new IllegalArgumentException("invalid HOST"));

        Port port = Port.parse(environment.require("PORT"))
                .orElseThrow(() -> new IllegalArgumentException("invalid PORT"));

        return new ServerConfig(host, port);
    }
}
```

| Validation result style | Example                     | Best use                             | Tradeoff                                |
| ----------------------- | --------------------------- | ------------------------------------ | --------------------------------------- |
| Throw exception         | `new Port(value)` throws    | Constructor invariant violation      | Simple but non-compositional            |
| Return `Optional<T>`    | `Port.parse(input)`         | parse success/failure without reason | Loses error detail                      |
| Return custom result    | `ParseResult<Port>`         | validation with reason               | More code                               |
| Accumulate errors       | `ValidationResult<T>`       | forms, APIs, batch validation        | More infrastructure                     |
| Framework validation    | Bean Validation annotations | web/API input                        | Requires framework execution            |
| Schema validation       | JSON schema, protobuf, etc. | cross-language contracts             | Schema may not capture all domain rules |

**Tempting but wrong mental model:** “Once JSON is deserialized into a Java object, it is type-safe.”

**Surprising behavior or bug:** Deserialized objects can contain nulls, invalid strings, wrong units, empty collections, or values that violate cross-field invariants.

**Correct semantic explanation:** Deserialization gives Java-shaped data, not necessarily valid domain data.

**Professional rule of thumb:** Treat external data as raw until it has been parsed, validated, normalized, and translated into domain-specific Java types.

**Boundary where the rule changes:** In tightly controlled internal protocols, some validation can be centralized or delegated to schema guarantees, but trust assumptions should be explicit.

**Common Pitfalls:**
Do not let `Map<String,Object>`, raw JSON nodes, or framework DTOs flow deep into domain logic. Do not confuse syntactic validation with authorization. Do not validate each field independently when the real invariant involves multiple fields. Do not rely on annotations unless the validation pipeline actually runs.

### Convert, Narrow, Parse, or Cast Values — conversion safety, failure modes, semantic distance

Java has several mechanisms that look like “conversion,” but they are semantically different.

| Mechanism                     | Example                       | What it does                               | Safety level               | Failure mode                               |
| ----------------------------- | ----------------------------- | ------------------------------------------ | -------------------------- | ------------------------------------------ |
| Widening primitive conversion | `long x = intValue;`          | Converts to wider numeric type             | usually safe               | precision caveats for floating conversions |
| Narrowing primitive cast      | `int x = (int) longValue;`    | Converts to smaller/different numeric type | risky                      | truncation, overflow, precision loss       |
| Boxing                        | `Integer x = 1;`              | Wraps primitive in object                  | mostly safe                | allocation/nullability context             |
| Unboxing                      | `int x = integer;`            | Extracts primitive from wrapper            | risky if null              | `NullPointerException`                     |
| Reference upcast              | `Object x = string;`          | Treats subtype as supertype                | safe                       | loses specific API statically              |
| Reference downcast            | `String s = (String) object;` | Checks runtime type                        | risky                      | `ClassCastException`                       |
| Parsing                       | `Integer.parseInt(text)`      | Interprets text into value                 | input-dependent            | parsing exception                          |
| Domain factory                | `EmailAddress.parse(text)`    | Validates and constructs domain type       | best for domain            | optional/result/exception                  |
| `toString`                    | `value.toString()`            | Produces string representation             | not necessarily reversible | unstable or debug-oriented output          |

A cast is not a parser:

```java
Object raw = "42";

String text = (String) raw;        // runtime type check
int value = Integer.parseInt(text); // parsing text into number
```

A cast is not domain validation:

```java
Object raw = "admin@example.com";

String emailText = (String) raw;        // only proves it is a String
EmailAddress email = new EmailAddress(emailText); // validates domain rule
```

Primitive narrowing:

```java
long large = 3_000_000_000L;
int narrowed = (int) large;

System.out.println(narrowed); // overflowed value
```

Unboxing null:

```java
Integer maybeCount = null;
// int count = maybeCount; // NullPointerException
```

`String.valueOf` is null-tolerant in a specific way:

```java
Object value = null;

System.out.println(String.valueOf(value)); // "null"
// System.out.println(value.toString());   // NullPointerException
```

This distinction matters in logging and serialization.

| Task                                    | Recommended mechanism                                  |
| --------------------------------------- | ------------------------------------------------------ |
| Convert small integer to larger integer | widening conversion                                    |
| Convert text to primitive               | parser with error handling                             |
| Convert text to domain value            | domain parser/factory                                  |
| Treat implementation as interface       | upcast or interface-typed variable                     |
| Recover specific subtype                | pattern matching `instanceof` or carefully placed cast |
| Convert object to external format       | serializer, not `toString` unless explicitly designed  |
| Convert nullable wrapper to primitive   | handle null first                                      |
| Convert collection element types        | do not cast blindly; map/validate elements             |

**Tempting but wrong mental model:** “Casting converts values into what I need.”

**Surprising behavior or bug:** `(User) map` fails; `(int) largeLong` silently changes the numeric value; `(List<String>) rawList` compiles with warning but may fail later.

**Correct semantic explanation:** A reference cast checks or changes the static view of an object reference. Primitive casts convert numeric representation. Parsing interprets external representation. Domain construction validates meaning.

**Professional rule of thumb:** Use casts only near dynamic boundaries. Use parsers and factories for semantic conversion.

**Boundary where the rule changes:** Low-level libraries, framework integrations, and reflection-heavy code may require casts, but they should be isolated and documented.

**Common Pitfalls:**
Do not suppress unchecked cast warnings without proving the boundary. Do not use `toString` as a stable serialization format unless the type explicitly promises it. Do not unbox wrapper values that may be null. Do not rely on numeric casts where overflow matters.

### Handle Unknown or Untrusted Data — `Object`, `unknown shape`, raw types, validation funnels

Sometimes Java code must handle values whose precise type is not known statically: deserialized JSON, plugin inputs, reflection results, raw collections, framework callbacks, scripting boundaries, or legacy APIs.

| Unknown-data form    | Example                 | Risk                              | Better approach                         |
| -------------------- | ----------------------- | --------------------------------- | --------------------------------------- |
| `Object`             | `Object value`          | unchecked assumptions             | pattern match and validate              |
| Raw collection       | `List values`           | heap pollution                    | convert to `List<?>`, validate elements |
| `Map<String,Object>` | dynamic object shape    | scattered casts                   | boundary parser                         |
| Reflection result    | `method.invoke(...)`    | runtime type and exception issues | narrow wrapper API                      |
| JSON tree            | `JsonNode`, equivalent  | missing/wrong fields              | schema/parser translation               |
| Legacy API           | raw or nullable values  | hidden old contracts              | adapter layer                           |
| Native boundary      | memory handles/pointers | safety and lifecycle risk         | explicit safe wrapper                   |

Pattern matching helps with local narrowing:

```java
public String describe(Object value) {
    return switch (value) {
        case null -> "missing";
        case String s -> "text: " + s;
        case Integer i -> "integer: " + i;
        case List<?> list -> "list of size " + list.size();
        default -> "unknown";
    };
}
```

But `List<?>` does not prove element types. Validate elements explicitly:

```java
public static Optional<List<String>> asStringList(Object value) {
    if (!(value instanceof List<?> rawList)) {
        return Optional.empty();
    }

    List<String> result = new ArrayList<>();
    for (Object element : rawList) {
        if (!(element instanceof String s)) {
            return Optional.empty();
        }
        result.add(s);
    }

    return Optional.of(List.copyOf(result));
}
```

Raw types should be avoided in new code:

```java
List raw = new ArrayList();
raw.add("text");
raw.add(123);

List<String> strings = raw; // unchecked warning
```

Use `List<?>` when the element type is unknown:

```java
List<?> values = List.of("text", 123);
Object first = values.get(0);
// values.add("x"); // not allowed except null
```

| Type           | Meaning                          | Can read elements as | Can add elements? |
| -------------- | -------------------------------- | -------------------- | ----------------- |
| `List`         | raw legacy list                  | `Object`, unsafely   | yes, unsafe       |
| `List<?>`      | list of unknown element type     | `Object`             | not meaningfully  |
| `List<Object>` | list that may contain any object | `Object`             | yes               |
| `List<String>` | list of strings                  | `String`             | strings only      |

`List<?>` and `List<Object>` are not the same. A `List<String>` can be used as `List<?>`, but not as `List<Object>`.

**Tempting but wrong mental model:** “`Object` means flexible and therefore safe.”

**Surprising behavior or bug:** Code using `Object` compiles but fails through `ClassCastException`, null handling, or invalid shape assumptions.

**Correct semantic explanation:** `Object` is the top-level reference type. It proves almost nothing except that the value is some reference value or null.

**Professional rule of thumb:** Funnel unknown data through a small number of parser/validator functions and translate it into typed domain objects.

**Boundary where the rule changes:** Truly generic infrastructure may need to carry `Object` values internally, but public APIs should expose typed contracts wherever possible.

**Common Pitfalls:**
Do not let raw types survive beyond legacy adapters. Do not treat `Map<String,Object>` as a domain model. Do not confuse `List<?>` with `List<Object>`. Do not cast collections wholesale without validating their elements.

### Write Reusable Generic Helpers — type parameters, bounds, variance, API shape

Generics let Java express reusable APIs without abandoning static type checking.

Simple generic helper:

```java
public static <T> T requireSingle(List<T> values) {
    if (values.size() != 1) {
        throw new IllegalArgumentException("expected exactly one value");
    }
    return values.get(0);
}
```

Generic class:

```java
public final class Page<T> {
    private final List<T> items;
    private final int pageNumber;

    public Page(List<T> items, int pageNumber) {
        this.items = List.copyOf(items);
        this.pageNumber = pageNumber;
    }

    public List<T> items() {
        return items;
    }

    public int pageNumber() {
        return pageNumber;
    }
}
```

Bounded type parameter:

```java
public static <T extends Comparable<T>> T max(List<T> values) {
    if (values.isEmpty()) {
        throw new IllegalArgumentException("empty list");
    }

    T best = values.get(0);
    for (T value : values) {
        if (value.compareTo(best) > 0) {
            best = value;
        }
    }
    return best;
}
```

Generic design choices:

| Task                          | Generic form                | Meaning                     | Pitfall                                  |
| ----------------------------- | --------------------------- | --------------------------- | ---------------------------------------- |
| Preserve same type in and out | `<T> T identity(T value)`   | input and output linked     | unnecessary type parameter if not linked |
| Generic container             | `class Box<T>`              | stores values of type `T`   | leaking mutable internals                |
| Require capability            | `<T extends Comparable<T>>` | `T` must support comparison | bound too restrictive                    |
| Read from producer            | `List<? extends Number>`    | can read as `Number`        | cannot add arbitrary `Number`            |
| Write to consumer             | `List<? super Integer>`     | can add `Integer`           | reads only as `Object`                   |
| Unknown element type          | `List<?>`                   | type-safe unknown           | cannot write meaningful values           |
| Runtime type needed           | `Class<T>` parameter        | carry type token            | not enough for nested generics           |

The standard mnemonic for wildcard variance is `PECS`: producer extends, consumer super.

Producer example:

```java
public static double sum(List<? extends Number> numbers) {
    double total = 0.0;
    for (Number number : numbers) {
        total += number.doubleValue();
    }
    return total;
}
```

The list produces numbers for the method. The method should not add to it.

Consumer example:

```java
public static void addDefaults(List<? super Integer> values) {
    values.add(0);
    values.add(1);
}
```

The list consumes integers. Reading specific integer values back is not statically safe:

```java
Object value = values.get(0);
```

Generic helper with target collection:

```java
public static <T> void copyAll(List<? extends T> source, List<? super T> target) {
    for (T value : source) {
        target.add(value);
    }
}
```

| API shape              | Good when                                    | Bad when                                       |
| ---------------------- | -------------------------------------------- | ---------------------------------------------- |
| `List<T>`              | method both reads and writes same exact type | caller has subtype/supertype flexibility needs |
| `List<? extends T>`    | method only reads values as `T`              | method needs to add `T`                        |
| `List<? super T>`      | method only writes `T` values                | method needs to read as `T`                    |
| `<T>` method parameter | type relationship matters                    | `T` appears only once                          |
| `Class<T>` argument    | runtime class needed                         | nested generic info needed                     |
| raw type               | almost never in new code                     | legacy boundary only                           |

A useless type parameter:

```java
public static <T> void log(String message) {
    System.out.println(message);
}
```

`T` appears nowhere meaningful. Remove it.

A meaningful type parameter:

```java
public static <T> List<T> repeat(T value, int count) {
    List<T> result = new ArrayList<>();
    for (int i = 0; i < count; i++) {
        result.add(value);
    }
    return List.copyOf(result);
}
```

**Tempting but wrong mental model:** “Generics make Java fully type-safe at runtime.”

**Surprising behavior or bug:** A generic helper can compile with unchecked warnings and later fail because type parameters were erased.

**Correct semantic explanation:** Generics enforce compile-time relationships among types. Most type arguments are erased at runtime.

**Professional rule of thumb:** Use type parameters only when they express a real relationship. Use wildcards to accept more callers without weakening safety.

**Boundary where the rule changes:** Public APIs may sometimes choose simpler generic signatures over maximally flexible wildcard forms if readability is more important than variance precision.

**Common Pitfalls:**
Do not use raw types. Do not ignore unchecked warnings. Do not add type parameters that do not relate inputs and outputs. Do not overuse wildcards in return types; they often make caller code harder.

### Express Behavioral Contracts — interfaces, abstract classes, sealed interfaces, functional interfaces

A behavioral contract says what an object can do, not merely what data it contains. Java’s main contract mechanism is the interface.

```java
public interface UserRepository {
    Optional<User> findById(UserId id);

    void save(User user);
}
```

A class implements the contract:

```java
public final class JdbcUserRepository implements UserRepository {
    @Override
    public Optional<User> findById(UserId id) {
        // query database
        return Optional.empty();
    }

    @Override
    public void save(User user) {
        // persist user
    }
}
```

| Contract mechanism   | Best use                                           | Tradeoff                                |
| -------------------- | -------------------------------------------------- | --------------------------------------- |
| Interface            | Stable behavior without implementation inheritance | Can proliferate unnecessarily           |
| Abstract class       | Shared base behavior/state plus extension points   | Single inheritance and tighter coupling |
| Sealed interface     | Closed behavior family                             | Not open for third-party extension      |
| Functional interface | Single behavior parameter                          | Not enough for multi-method protocols   |
| Annotation contract  | Tool/framework behavior                            | Requires external enforcement           |
| Generic bound        | Type must support operation                        | Can be too restrictive                  |
| Marker interface     | Type-level tag                                     | Weak if no behavior attached            |

Interface for behavior:

```java
public interface Clock {
    Instant now();
}
```

This is useful because the behavior is substitutable.

Functional interface:

```java
@FunctionalInterface
public interface PriceRule {
    Money apply(Money basePrice);
}
```

Usage:

```java
PriceRule discount = price -> price.multiply(new BigDecimal("0.90"));
```

Abstract class when shared implementation truly matters:

```java
public abstract class AbstractAuditedService {
    protected final AuditLog auditLog;

    protected AbstractAuditedService(AuditLog auditLog) {
        this.auditLog = Objects.requireNonNull(auditLog);
    }

    protected void audit(String event) {
        auditLog.record(event);
    }
}
```

This creates stronger coupling than an interface. Use it only when shared state or implementation is genuinely part of the design.

Sealed interface for closed behavior family:

```java
public sealed interface ShippingPolicy
        permits DomesticShipping, InternationalShipping {
    Money calculate(Order order);
}
```

| Use interface when                       | Use abstract class when                           |
| ---------------------------------------- | ------------------------------------------------- |
| Many unrelated implementations may exist | Implementations share state or algorithm skeleton |
| Contract matters more than shared code   | Base class invariants matter                      |
| Multiple inheritance of type is useful   | Single inheritance cost is acceptable             |
| Testing/substitution is important        | Protected extension hooks are intentional         |

**Tempting but wrong mental model:** “Every class should have an interface.”

**Surprising behavior or bug:** Codebase fills with one-implementation interfaces that add indirection without substitutability.

**Correct semantic explanation:** An interface is a contract boundary. It is useful when the boundary supports substitution, testing, plugin behavior, layering, or API separation.

**Professional rule of thumb:** Create interfaces for meaningful behavioral variation or architectural boundaries, not by reflex.

**Boundary where the rule changes:** Frameworks and testing conventions may encourage interface extraction, but design value should still be assessed.

**Common Pitfalls:**
Do not use marker interfaces when annotations or sealed types would express intent better. Do not use abstract classes merely to share two helper methods. Do not make interfaces so broad that implementations must throw unsupported-operation exceptions.

### Define Type Safety Boundaries — trusted core, dynamic edge, unchecked operations

A type safety boundary is where the program moves between statically reliable Java types and less reliable data or behavior: raw collections, reflection, serialization, external input, native calls, dependency injection, dynamic proxies, and unchecked casts.

| Boundary            | What weakens safety                             | Local containment strategy                         |
| ------------------- | ----------------------------------------------- | -------------------------------------------------- |
| External input      | raw text/bytes                                  | parse and validate into domain types               |
| Reflection          | runtime lookup/invocation                       | wrapper API and checked failure handling           |
| Serialization       | object construction outside normal constructors | validation after deserialization                   |
| Raw legacy API      | erased/unchecked types                          | adapter that returns typed values                  |
| Generic varargs     | heap pollution risk                             | safe design and `@SafeVarargs` only when justified |
| Native interop      | memory/resource safety                          | narrow wrapper and lifecycle ownership             |
| Framework injection | runtime wiring                                  | constructor validation and integration tests       |
| Dynamic proxy       | behavior not visible in source                  | contract tests and clear interfaces                |

Unchecked cast isolated:

```java
public final class LegacyUserAdapter {
    private final LegacyApi legacyApi;

    public LegacyUserAdapter(LegacyApi legacyApi) {
        this.legacyApi = legacyApi;
    }

    public List<UserId> loadUserIds() {
        List<?> raw = legacyApi.loadIds();

        List<UserId> result = new ArrayList<>();
        for (Object value : raw) {
            if (!(value instanceof String text)) {
                throw new IllegalStateException("legacy id is not a string");
            }
            result.add(new UserId(text));
        }
        return List.copyOf(result);
    }
}
```

The unchecked or dynamic behavior is confined to the adapter. The rest of the system receives `List<UserId>`.

Reflection boundary:

```java
public Object invoke(Object target, Method method, Object... args) {
    try {
        return method.invoke(target, args);
    } catch (IllegalAccessException e) {
        throw new IllegalStateException("method not accessible", e);
    } catch (InvocationTargetException e) {
        throw new RuntimeException("method failed", e.getCause());
    }
}
```

Reflection can be necessary in frameworks, but it should not become casual business logic.

| Operation                        | Risk level       | Professional handling                    |
| -------------------------------- | ---------------- | ---------------------------------------- |
| `@SuppressWarnings("unchecked")` | high if broad    | keep scope tiny and justify              |
| raw `List`                       | high in new code | convert to `List<?>` and validate        |
| `Class.cast`                     | medium           | useful for controlled dynamic type token |
| `instanceof` pattern             | low/medium       | safe local narrowing                     |
| reflection invoke                | medium/high      | isolate and translate exceptions         |
| deserialization                  | high             | validate and restrict types              |
| native boundary                  | high             | explicit lifecycle and safety wrapper    |

**Tempting but wrong mental model:** “Unchecked warning means the compiler is being annoying.”

**Surprising behavior or bug:** Program compiles, but a collection contains the wrong element type and fails far away from the unsafe cast.

**Correct semantic explanation:** An unchecked warning indicates the compiler cannot prove type safety, usually because generic information is erased or raw types are involved.

**Professional rule of thumb:** Treat unchecked warnings as boundary alarms. Suppress only in the smallest possible scope after validating the invariant manually.

**Boundary where the rule changes:** Generic infrastructure libraries may legitimately require unchecked operations internally, but their public APIs should restore type safety.

**Common Pitfalls:**
Do not suppress warnings at class or package level to hide real problems. Do not return raw types from public APIs. Do not let reflection exceptions leak in meaningless forms. Do not assume framework-generated objects obey all constructor invariants unless the framework actually calls those constructors.

### Model Data with Inheritance, Composition, or Sealed Types — reuse vs substitutability

Java inheritance is often overused for data modeling. The key question is whether a subtype truly satisfies substitutability: wherever the base type is expected, the subtype should behave consistently with the base contract.

Weak inheritance:

```java
public class User {
    // ...
}

public class AdminUser extends User {
    // ...
}
```

This may be reasonable, but often “admin” is a role, not a subtype. Composition may be better:

```java
public final class User {
    private final UserId id;
    private final Set<Role> roles;

    public boolean hasRole(Role role) {
        return roles.contains(role);
    }
}
```

| Modeling goal                 | Prefer                 | Reason                            |
| ----------------------------- | ---------------------- | --------------------------------- |
| Share implementation only     | composition/delegation | avoids fragile base class         |
| Express true subtype relation | inheritance/interface  | substitutability                  |
| Close finite alternatives     | sealed hierarchy       | exhaustiveness and control        |
| Add optional capability       | interface              | behavior contract                 |
| Attach role/state             | field/composition      | avoids fake subtype               |
| Vary algorithm                | strategy interface     | behavior can change independently |

Sealed hierarchy for real alternatives:

```java
public sealed interface Account
        permits PersonalAccount, BusinessAccount {
    AccountId id();
}

public final class PersonalAccount implements Account {
    private final AccountId id;
    private final PersonName owner;

    public PersonalAccount(AccountId id, PersonName owner) {
        this.id = Objects.requireNonNull(id);
        this.owner = Objects.requireNonNull(owner);
    }

    @Override
    public AccountId id() {
        return id;
    }
}

public final class BusinessAccount implements Account {
    private final AccountId id;
    private final CompanyName company;

    public BusinessAccount(AccountId id, CompanyName company) {
        this.id = Objects.requireNonNull(id);
        this.company = Objects.requireNonNull(company);
    }

    @Override
    public AccountId id() {
        return id;
    }
}
```

Branching:

```java
public String displayOwner(Account account) {
    return switch (account) {
        case PersonalAccount personal -> personal.owner().value();
        case BusinessAccount business -> business.company().value();
    };
}
```

Inheritance becomes harmful when the subclass is merely a configuration variant:

```java
public class FastReportGenerator extends ReportGenerator {
}

public class SlowReportGenerator extends ReportGenerator {
}
```

A strategy is often clearer:

```java
public interface ReportStrategy {
    Report generate(Input input);
}

public final class ReportService {
    private final ReportStrategy strategy;

    public ReportService(ReportStrategy strategy) {
        this.strategy = Objects.requireNonNull(strategy);
    }

    public Report generate(Input input) {
        return strategy.generate(input);
    }
}
```

| Inheritance benefit         | Inheritance cost             |
| --------------------------- | ---------------------------- |
| Shared polymorphic API      | tight coupling to base class |
| Reuse of protected behavior | fragile base-class problem   |
| Runtime dispatch            | harder state reasoning       |
| Framework extension point   | lifecycle constraints        |
| Sealed exhaustiveness       | less extensibility           |

**Tempting but wrong mental model:** “If two things are similar, one should extend the other.”

**Surprising behavior or bug:** A subclass violates assumptions of the superclass, causing bugs in code that expects the base type.

**Correct semantic explanation:** Inheritance is not similarity. It is substitutability plus inherited implementation.

**Professional rule of thumb:** Prefer composition for reuse. Use inheritance when the subtype relation is stable, behavioral, and meaningful.

**Boundary where the rule changes:** Some frameworks require inheritance-based extension. Treat that as framework integration, not a general modeling principle.

**Common Pitfalls:**
Do not model roles, flags, or modes as subclasses unless they are genuine types. Do not expose protected mutable state casually. Do not use inheritance only to avoid writing delegation code.

### Model Data for Concurrency — immutability, confinement, safe publication, shared state

Java data modeling must account for concurrency when objects cross thread boundaries. A type that is safe in single-threaded code can become unsafe when shared.

| Concurrency modeling strategy | Meaning                                       | Best use                         | Risk                              |
| ----------------------------- | --------------------------------------------- | -------------------------------- | --------------------------------- |
| Immutability                  | object state cannot change after construction | shared values, configs, messages | shallow immutability mistakes     |
| Thread confinement            | object used by one thread/task                | request-local state, builders    | accidental escape                 |
| Synchronization               | guarded mutable state                         | shared counters/state machines   | deadlock/contention               |
| Atomic variables              | lock-free simple state                        | counters, flags, references      | compound invariants not protected |
| Concurrent collection         | internally thread-safe operations             | shared maps/queues               | multi-step logic still unsafe     |
| Copy-on-write                 | replace whole snapshot                        | read-heavy state                 | write cost                        |
| Message passing               | transfer data between workers                 | pipelines, actors                | protocol design needed            |

Immutable message:

```java
public record UserCreatedEvent(UserId userId, Instant occurredAt) {
    public UserCreatedEvent {
        Objects.requireNonNull(userId);
        Objects.requireNonNull(occurredAt);
    }
}
```

This can be safely shared if its components are themselves immutable or safely treated.

Mutable non-thread-safe object:

```java
public final class Counter {
    private int value;

    public void increment() {
        value++;
    }

    public int value() {
        return value;
    }
}
```

This is unsafe if shared across threads without synchronization.

Synchronized version:

```java
public final class SynchronizedCounter {
    private int value;

    public synchronized void increment() {
        value++;
    }

    public synchronized int value() {
        return value;
    }
}
```

Atomic version for a simple counter:

```java
public final class AtomicCounter {
    private final AtomicInteger value = new AtomicInteger();

    public void increment() {
        value.incrementAndGet();
    }

    public int value() {
        return value.get();
    }
}
```

But atomics do not automatically protect compound invariants:

```java
public final class AccountBalance {
    private final AtomicInteger balance = new AtomicInteger();

    public void withdraw(int amount) {
        if (balance.get() >= amount) {
            balance.addAndGet(-amount); // race between check and update
        }
    }
}
```

A compare-and-set loop or lock is needed.

| Data shape                                 | Thread-safety judgment                                            |
| ------------------------------------------ | ----------------------------------------------------------------- |
| Immutable record with immutable components | generally safe to share                                           |
| Record containing mutable list             | unsafe unless copied or confined                                  |
| `ArrayList` shared across threads          | unsafe without synchronization                                    |
| `ConcurrentHashMap`                        | safe for individual operations, not arbitrary compound invariants |
| `AtomicInteger`                            | safe for simple atomic updates                                    |
| Mutable entity                             | requires confinement, locking, or transactional boundary          |
| Static mutable field                       | high risk                                                         |

**Interdisciplinary Lens: Concurrency theory**

What it clarifies: Correct concurrent behavior depends on ordering, visibility, atomicity, and ownership, not merely on whether a type compiles.

Language feature involved: fields, `final`, `volatile`, synchronization, atomics, concurrent collections, immutable records.

Practical consequence: Data models should define whether objects are immutable, confined, guarded, or safely published.

Limit of the lens: Concurrency theory does not tell which domain representation is best; it only clarifies safety constraints once sharing exists.

**Tempting but wrong mental model:** “If a field is private, it is thread-safe.”

**Surprising behavior or bug:** Private mutable state can still be accessed concurrently through public methods and produce races.

**Correct semantic explanation:** Encapsulation controls access paths; it does not automatically serialize execution or guarantee visibility.

**Professional rule of thumb:** Decide whether each shared type is immutable, confined, synchronized, atomic, or concurrent-collection-based.

**Boundary where the rule changes:** Thread-local or request-local objects may be safely mutable if they do not escape to other threads.

**Common Pitfalls:**
Do not share mutable collections without a safety strategy. Do not assume `final` makes referenced objects thread-safe. Do not assume concurrent collections make a multi-operation workflow atomic. Do not use static mutable state casually.

### Model Equality and Identity — value objects, entities, records, collections, hash keys

Java modeling requires a deliberate equality policy. Not all objects should compare by all fields.

| Model kind             | Equality should usually mean        | Good construct                                     | Pitfall                          |
| ---------------------- | ----------------------------------- | -------------------------------------------------- | -------------------------------- |
| Value object           | same component values               | record or final class                              | mutable components               |
| Entity                 | same stable identity                | class with ID-based equality or identity semantics | equality based on mutable fields |
| Enum constant          | same constant                       | enum with `==`                                     | comparing names unnecessarily    |
| Collection             | interface-defined contents equality | `List`, `Set`, `Map`                               | element equality broken          |
| Array                  | identity by default                 | arrays with `Arrays.equals` if needed              | assuming content equality        |
| Proxy/framework object | depends on framework                | careful design                                     | class comparison issues          |

Value object:

```java
public record ProductCode(String value) {
    public ProductCode {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("blank product code");
        }
    }
}
```

Entity:

```java
public final class User {
    private final UserId id;
    private String displayName;

    public User(UserId id, String displayName) {
        this.id = Objects.requireNonNull(id);
        this.displayName = Objects.requireNonNull(displayName);
    }

    public UserId id() {
        return id;
    }

    @Override
    public boolean equals(Object other) {
        return other instanceof User user
                && id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
```

This design says display-name changes do not change identity.

| Equality design question        | Consequence                                           |
| ------------------------------- | ----------------------------------------------------- |
| Is this a value or entity?      | Determines whether all components or stable ID matter |
| Can fields change?              | Mutable equality fields break hash collections        |
| Is subclassing allowed?         | Equality across class hierarchies is difficult        |
| Will objects be proxied?        | `getClass()` vs `instanceof` decisions matter         |
| Will object be used as map key? | `hashCode` stability is essential                     |
| Are arrays/components mutable?  | equality may be shallow or unstable                   |

Records synthesize equality over all components. That is excellent for value objects and wrong for some entities.

```java
public record UserRecord(UserId id, String displayName) {
}
```

If display name changes conceptually while identity remains the same, a record may be the wrong representation.

Hash key danger:

```java
public final class MutableKey {
    private String value;

    public MutableKey(String value) {
        this.value = value;
    }

    public void rename(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object other) {
        return other instanceof MutableKey key
                && Objects.equals(value, key.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
```

If this object is used as a `HashMap` key and then mutated, lookup can fail.

**Tempting but wrong mental model:** “All fields should be included in `equals`.”

**Surprising behavior or bug:** Changing a mutable field makes an object disappear from a `HashSet`.

**Correct semantic explanation:** Hash-based collections rely on stable `equals` and `hashCode` behavior while the object is stored.

**Professional rule of thumb:** Use immutable value objects as hash keys. For entities, define equality around stable identity or avoid overriding equality if object identity is intended.

**Boundary where the rule changes:** ORM frameworks and proxies can complicate equality; entity equality may require framework-specific care.

**Common Pitfalls:**
Do not use mutable fields in `hashCode` for objects stored in hash collections. Do not use records for lifecycle entities without considering equality. Do not compare arrays with `equals` when content equality is intended. Do not mix identity and value semantics in one type.

### Model Time, Money, Units, and Quantities — standard types, precision, domain wrappers

Many real Java bugs come from representing semantically rich values with weak raw types.

| Concept               | Weak representation      | Better representation        | Why                                   |
| --------------------- | ------------------------ | ---------------------------- | ------------------------------------- |
| Date and time instant | `long`, `String`, `Date` | `Instant`                    | precise moment on timeline            |
| Calendar date         | `String`                 | `LocalDate`                  | date without time zone                |
| Duration              | `long millis`            | `Duration`                   | unit-safe time amount                 |
| Time zone             | `String`                 | `ZoneId`                     | validated zone semantics              |
| Money amount          | `double`                 | `BigDecimal` plus `Currency` | decimal exactness                     |
| File path             | `String`                 | `Path`                       | path operations and platform behavior |
| URI                   | `String`                 | `URI`                        | parsed structure                      |
| UUID                  | `String`                 | `UUID`                       | typed identifier                      |

Money model:

```java
public record Money(BigDecimal amount, Currency currency) {
    public Money {
        Objects.requireNonNull(amount);
        Objects.requireNonNull(currency);
    }

    public Money plus(Money other) {
        if (!currency.equals(other.currency)) {
            throw new IllegalArgumentException("currency mismatch");
        }
        return new Money(amount.add(other.amount), currency);
    }
}
```

Time model:

```java
public record BookingWindow(Instant opensAt, Instant closesAt) {
    public BookingWindow {
        Objects.requireNonNull(opensAt);
        Objects.requireNonNull(closesAt);

        if (!closesAt.isAfter(opensAt)) {
            throw new IllegalArgumentException("closing time must be after opening time");
        }
    }
}
```

Avoid:

```java
public record BadBooking(String opensAt, String closesAt) {
}
```

This forces parsing and validation everywhere.

| Modeling issue               | Good Java response                              |
| ---------------------------- | ----------------------------------------------- |
| Exact decimal arithmetic     | `BigDecimal`, not `double`                      |
| Currency-aware amount        | custom `Money` type                             |
| Machine timestamp            | `Instant`                                       |
| Human calendar date          | `LocalDate`                                     |
| Time-zone-specific date-time | `ZonedDateTime`                                 |
| Elapsed time                 | `Duration`                                      |
| Repeated calendar period     | `Period`                                        |
| Units                        | domain wrapper or unit library                  |
| IDs                          | domain-specific record wrapping validated value |

**Tempting but wrong mental model:** “A timestamp is just a number.”

**Surprising behavior or bug:** Mixing seconds and milliseconds, local time and UTC, or amount and currency produces valid Java but invalid business behavior.

**Correct semantic explanation:** Primitive and string representations do not carry unit, calendar, currency, or domain semantics.

**Professional rule of thumb:** Use standard library semantic types first; create domain wrappers when the standard type is still too general.

**Boundary where the rule changes:** Interoperability protocols may require strings or numbers externally. Convert at boundaries, not throughout the domain model.

**Common Pitfalls:**
Do not use `double` for money. Do not store date/time as arbitrary strings internally. Do not mix `Instant`, `LocalDateTime`, and `ZonedDateTime` without understanding their meanings. Do not represent units with naked `int` or `long` when confusion is likely.

### Derive Types from Values — factories, inference, `var`, sealed narrowing, pattern matching

Java does not have TypeScript-style type derivation from object literals, but it does derive some static types through constructors, factory methods, `var`, generic inference, and pattern matching.

| Derivation context       | Example                                         | What is inferred or narrowed             |
| ------------------------ | ----------------------------------------------- | ---------------------------------------- |
| Local variable inference | `var path = Path.of("x");`                      | local variable static type               |
| Diamond operator         | `new ArrayList<String>()` → `new ArrayList<>()` | constructor type arguments               |
| Generic method inference | `List.of("a", "b")`                             | element type                             |
| Pattern matching         | `x instanceof String s`                         | narrowed variable type                   |
| Switch pattern           | `case User u ->`                                | narrowed branch type                     |
| Factory method           | `Money.of(...)`                                 | named target type                        |
| Lambda target typing     | `Predicate<String> p = s -> ...`                | lambda parameter and result expectations |

`var` derives local variable type from the initializer:

```java
var names = List.of("Ada", "Grace");
```

But the exact inferred type may be less obvious than expected. It is usually better to specify the interface type when the abstraction matters:

```java
List<String> names = List.of("Ada", "Grace");
```

Generic method inference:

```java
var ids = List.of(new UserId("u-001"), new UserId("u-002"));
```

The compiler infers a suitable generic type for `List.of`.

Pattern narrowing:

```java
public int lengthIfString(Object value) {
    if (value instanceof String s) {
        return s.length();
    }
    return 0;
}
```

Sealed narrowing with switch:

```java
public Money shippingCost(Shipping shipping) {
    return switch (shipping) {
        case DomesticShipping d -> d.flatRate();
        case InternationalShipping i -> i.rate().calculate();
    };
}
```

| Use inference when                  | Prefer explicit type when       |
| ----------------------------------- | ------------------------------- |
| initializer is obvious              | abstraction boundary matters    |
| local variable has narrow scope     | public API or field declaration |
| type name is noisy and repeated     | inferred type is surprising     |
| factory method clearly names result | numeric literal type matters    |
| pattern variable narrows safely     | cast would hide risk            |

**Tempting but wrong mental model:** “`var` means the type is flexible.”

**Surprising behavior or bug:** `var` fixes a static type at compile time; it does not allow later assignment to unrelated types.

**Correct semantic explanation:** Java inference reduces explicit syntax while preserving static typing.

**Professional rule of thumb:** Use inference to remove repetition, not to hide important type information.

**Boundary where the rule changes:** In fluent APIs and generic-heavy code, explicit intermediate types can be valuable for debugging and readability.

**Common Pitfalls:**
Do not use `var` when it hides whether a collection is mutable, ordered, concrete, or interface-typed. Do not rely on inferred numeric types without checking. Do not mistake pattern narrowing for domain validation.

### Data Modeling Option Matrix — strength, cost, best use

| Modeling option      | Strength                      | Cost                           | Best use                             | Avoid when                            |
| -------------------- | ----------------------------- | ------------------------------ | ------------------------------------ | ------------------------------------- |
| Primitive            | simple, fast, direct          | no domain meaning              | local arithmetic, counters           | domain boundary values                |
| Wrapper              | works with generics, nullable | boxing/null risk               | collections, legacy APIs             | performance-sensitive primitive loops |
| `String`             | universal text carrier        | weak validation                | raw external text                    | domain concepts with invariants       |
| Record               | concise value model           | shallow immutability           | IDs, DTOs, value aggregates          | mutable lifecycle entities            |
| Class                | encapsulation and behavior    | more design/code               | entities, services, invariants       | transparent data only                 |
| Enum                 | finite named state            | limited data per state         | statuses, modes                      | variants with rich payloads           |
| Sealed hierarchy     | closed variants with data     | more structure                 | results, events, domain alternatives | open plugin systems                   |
| Interface            | behavior contract             | indirection                    | substitutable behavior               | no real variation                     |
| Generic class        | reusable typed abstraction    | erasure complexity             | containers, repositories             | one-off domain object                 |
| Collection           | group modeling                | mutability/performance choices | lists, sets, maps                    | when domain type is needed            |
| `Optional`           | explicit absence              | wrapper/call ceremony          | return maybe-value                   | fields/parameters by default          |
| `Map<String,Object>` | flexible shape                | little static safety           | raw boundary only                    | internal domain logic                 |

### Type/Data Modeling Decision Table — task, construct, rule of thumb

| Task                                       | Recommended construct/API          | Rule of thumb                           | Common failure mode                    |
| ------------------------------------------ | ---------------------------------- | --------------------------------------- | -------------------------------------- |
| Define a value-like domain concept         | record or final class              | validate at construction                | wrapper with no invariant or meaning   |
| Define a lifecycle entity                  | class                              | stable identity and controlled mutation | record equality over mutable state     |
| Represent simple finite states             | enum                               | avoid strings and ordinals              | invalid string states                  |
| Represent variants with different payloads | sealed interface + records/classes | use exhaustive switch where useful      | overusing inheritance                  |
| Represent maybe-one lookup result          | `Optional<T>` return               | absence expected and non-error          | returning null                         |
| Represent many results                     | empty collection                   | never return null collections           | `Optional<List<T>>` without reason     |
| Choose ordered data                        | `List<T>`                          | order matters                           | using list for uniqueness              |
| Choose unique data                         | `Set<T>`                           | equality must be stable                 | mutable hash keys                      |
| Choose lookup data                         | `Map<K,V>`                         | key type should be domain-specific      | stringly typed keys                    |
| Handle untrusted input                     | parser/validator                   | raw → validated domain type             | casts scattered everywhere             |
| Write reusable helper                      | generics                           | type parameter must express relation    | raw types or useless `<T>`             |
| Express behavior                           | interface                          | contract must support substitution      | interface per class                    |
| Share data across threads                  | immutable/concurrent/guarded type  | decide safety strategy explicitly       | private mutable state assumed safe     |
| Convert text to value                      | parser/factory                     | parsing is not casting                  | `ClassCastException` or invalid domain |
| Cross unchecked boundary                   | adapter                            | localize warning and validate           | global `@SuppressWarnings`             |

### High-Frequency Java Modeling Pitfall Index — failure mode, correction, review cue

| Pitfall                     | Why it happens                        | Better model                                 | Review cue                                           |
| --------------------------- | ------------------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| Primitive obsession         | raw types are easy                    | domain-specific records/classes              | many `String`/`int` parameters of different meanings |
| Null ambiguity              | null is convenient                    | `Optional`, empty collection, explicit state | method docs explain multiple null meanings           |
| Mutable collection leakage  | references are shared                 | defensive copy/unmodifiable result           | getter returns internal list                         |
| Record misuse for entities  | records are concise                   | class with identity policy                   | record has mutable lifecycle meaning                 |
| Enum ordinal persistence    | ordinal looks compact                 | stable name/code mapping                     | database stores `0`, `1`, `2`                        |
| Hash key mutation           | object equality changes               | immutable keys                               | key has setters or mutable equality fields           |
| Raw types                   | legacy compatibility                  | generics or `<?>`                            | compiler unchecked warnings                          |
| Cast-based validation       | cast feels like conversion            | parser/factory                               | `(DomainType) value` near boundary                   |
| Over-interface design       | interface feels professional          | interface only for real boundary             | one implementation, no substitution                  |
| Inheritance for roles       | similarity confused with subtype      | role field or composition                    | `AdminUser extends User` without substitutability    |
| Annotation-only validation  | metadata mistaken for enforcement     | explicit validation pipeline                 | annotated object used before validation              |
| Thread-unsafe sharing       | private state mistaken for safe state | immutability/confinement/locking             | mutable object stored in shared service              |
| `Optional.get()` misuse     | Optional treated like nullable box    | `orElse`, `orElseThrow`, pattern of absence  | `get()` without prior check                          |
| `List` for every collection | list is familiar                      | choose by operation                          | repeated `contains`/manual uniqueness                |
| Weak external boundary      | DTO treated as domain                 | DTO → command/domain translation             | framework object passed into core logic              |
## PART 4 — Control Flow, Functions, Abstraction, and Composition by Task Pattern

### Orientation — behavior design, execution paths, abstraction choices, composition pressure

Java behavior is expressed through statements, methods, objects, interfaces, lambdas, exceptions, and library-level composition APIs. The language is not purely object-oriented in everyday use, nor is it a fully function-first language. Professional Java code usually combines several behavior mechanisms:

| Mechanism              | Primary role                         | Best use                                    | Main risk                                     |
| ---------------------- | ------------------------------------ | ------------------------------------------- | --------------------------------------------- |
| Statement control flow | Direct execution control             | simple branching, loops, early returns      | tangled imperative logic                      |
| Method                 | Named reusable operation             | local behavior, public APIs, domain actions | vague signatures or hidden side effects       |
| Constructor/factory    | object creation behavior             | validation, normalization, lifecycle setup  | heavy side effects during construction        |
| Interface              | behavior contract                    | substitution, testing, layered boundaries   | unnecessary abstraction                       |
| Class                  | behavior plus state                  | entities, services, stateful components     | anemic or over-stateful design                |
| Lambda                 | small behavior value                 | callbacks, filters, transformations         | hidden side effects, unreadable large lambdas |
| Method reference       | named existing behavior              | concise delegation                          | obscured parameter flow                       |
| Stream pipeline        | data transformation pipeline         | map/filter/reduce style operations          | overuse, debugging difficulty, side effects   |
| Inheritance            | subtype behavior variation           | true substitutability                       | fragile base class, fake taxonomy             |
| Composition            | assemble behavior from collaborators | services, strategies, policies              | too many tiny abstractions                    |
| Annotation             | metadata-driven behavior             | frameworks, validation, routing, DI         | magical hidden control flow                   |

`PART 4` is about **how to express behavior**, not merely how to spell `if`, `for`, or `lambda`. The central question is:

| Design question                        | Poor answer                               | Better Java answer                                                              |
| -------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------- |
| How should execution branch?           | nested conditionals everywhere            | choose guard clauses, switch, polymorphism, or sealed matching deliberately     |
| How should data be transformed?        | mutate shared collections casually        | use loops or streams according to clarity and cost                              |
| How should behavior be reused?         | copy/paste or abstract prematurely        | extract methods, functional interfaces, strategy objects, or services as needed |
| How should APIs communicate intent?    | vague names and broad parameters          | precise signatures, domain types, clear errors                                  |
| How should variation be represented?   | flags and `if` chains                     | interfaces, enums, sealed types, strategies, or composition                     |
| How should side effects be controlled? | hide them inside expressions              | isolate mutation, I/O, logging, persistence, and external calls                 |
| How should complexity be managed?      | either giant methods or tiny abstractions | local clarity plus stable boundaries                                            |

A useful Java rule: **control flow is local, abstraction is architectural**. A loop or `if` may solve a local problem well. An interface or class hierarchy should be justified by longer-term variation, boundary control, or domain meaning.

### Choose Control Flow — guard clauses, conditionals, loops, switch, polymorphism

The first behavior task is choosing the right control-flow form.

| Task                       | Construct                       | Best use                             | Tradeoff                         | Common pitfall                                |
| -------------------------- | ------------------------------- | ------------------------------------ | -------------------------------- | --------------------------------------------- |
| Reject invalid input early | guard clause                    | precondition failure                 | simple and readable              | too many scattered exits without clear policy |
| Choose between two paths   | `if` / `else`                   | binary condition                     | direct                           | deep nesting                                  |
| Choose among finite values | `switch`                        | enum, sealed types, known categories | clearer than many `if`s          | old-style fall-through                        |
| Repeat until condition     | `while`                         | condition-driven repetition          | flexible                         | infinite loops                                |
| Iterate over collection    | enhanced `for`                  | visiting elements                    | readable                         | unsafe structural mutation                    |
| Index-based iteration      | classic `for`                   | index needed                         | precise                          | off-by-one errors                             |
| Transform collection       | stream or loop                  | map/filter/reduce                    | concise when simple              | side effects and debugging difficulty         |
| Vary behavior by type      | polymorphism or sealed `switch` | domain alternatives                  | removes conditionals from caller | over-abstracting small cases                  |
| Abort current operation    | `return`, `throw`, `break`      | clear exit                           | reduces nesting                  | hidden cleanup issues                         |

Guard clause:

```java
public User loadUser(UserId id) {
    Objects.requireNonNull(id, "id");

    return repository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
}
```

Nested style:

```java
public void process(User user) {
    if (user != null) {
        if (user.isActive()) {
            if (user.hasEmail()) {
                sendEmail(user);
            }
        }
    }
}
```

Guard-clause style:

```java
public void process(User user) {
    if (user == null) {
        return;
    }
    if (!user.isActive()) {
        return;
    }
    if (!user.hasEmail()) {
        return;
    }

    sendEmail(user);
}
```

The guard-clause version is not automatically better in every case, but it often makes preconditions and main behavior easier to separate.

| Conditional shape | Use when                                        | Avoid when                                   |
| ----------------- | ----------------------------------------------- | -------------------------------------------- |
| Guard clause      | invalid or irrelevant cases should exit early   | cleanup or transaction scope becomes unclear |
| `if` / `else`     | two genuine branches                            | many unrelated conditions accumulate         |
| `else if` chain   | few ordered conditions                          | branch count keeps growing                   |
| `switch`          | one discriminating value controls branch        | conditions are unrelated                     |
| Polymorphism      | behavior belongs to type                        | only one small local branch exists           |
| Sealed `switch`   | finite type alternatives need explicit handling | hierarchy should remain open                 |
| Strategy object   | behavior varies independently of data           | strategy is used only once trivially         |

A common progression:

```java
public Money shippingCost(Order order) {
    if (order.destination().isDomestic()) {
        return domesticCost(order);
    } else {
        return internationalCost(order);
    }
}
```

If the branch is local and simple, this is fine. If the behavior grows and depends on different policy objects, use composition:

```java
public interface ShippingPolicy {
    Money calculate(Order order);
}

public final class ShippingService {
    private final ShippingPolicy policy;

    public ShippingService(ShippingPolicy policy) {
        this.policy = Objects.requireNonNull(policy);
    }

    public Money shippingCost(Order order) {
        return policy.calculate(order);
    }
}
```

**Tempting but wrong mental model:** “Conditionals are less object-oriented, so they are bad.”

**Surprising behavior or bug:** Code replaces a simple two-branch `if` with five classes and becomes harder to read.

**Correct semantic explanation:** Control-flow constructs are not inferior to abstraction mechanisms. The right choice depends on locality, variation, stability, and domain meaning.

**Professional rule of thumb:** Use direct control flow for local decisions. Introduce polymorphism or strategies when behavior variation is stable, repeated, or architecturally meaningful.

**Boundary where the rule changes:** In framework-heavy systems, behavior variation may be configured externally through dependency injection, annotations, or service discovery; then explicit local control flow may move into configuration.

**Common Pitfalls:**
Do not remove every `if` in the name of object-oriented purity. Do not leave large `if` chains when they encode stable domain variants. Do not use early returns in ways that bypass required cleanup, locking, transaction handling, or audit logic.

### Branch by Value or Structure — `if`, `switch`, enum, sealed hierarchy, pattern matching

Branching in Java can be based on boolean conditions, primitive or object values, enum constants, string values, type patterns, or sealed alternatives.

| Branching task        | Best construct                  | Example                        | Main caveat                             |
| --------------------- | ------------------------------- | ------------------------------ | --------------------------------------- |
| Boolean condition     | `if`                            | `if (user.isActive())`         | condition should be readable            |
| Numeric range         | `if` / helper method            | `if (age >= 18)`               | avoid magic numbers                     |
| Enum state            | `switch`                        | `case ACTIVE ->`               | handle all meaningful states            |
| String command        | `switch` or parser              | `case "start" ->`              | external strings need validation        |
| Type alternative      | pattern `switch` / `instanceof` | `case Success s ->`            | avoid replacing polymorphism blindly    |
| Nullable value        | explicit null handling          | `case null ->` where supported | null policy must be clear               |
| Cross-field condition | named predicate                 | `if (order.canBeCancelled())`  | avoid leaking business logic everywhere |

Enum `switch`:

```java
public String label(UserStatus status) {
    return switch (status) {
        case ACTIVE -> "Active";
        case SUSPENDED -> "Suspended";
        case DELETED -> "Deleted";
    };
}
```

This is clearer than string branching:

```java
public String label(String status) {
    return switch (status) {
        case "ACTIVE" -> "Active";
        case "SUSPENDED" -> "Suspended";
        case "DELETED" -> "Deleted";
        default -> "Unknown";
    };
}
```

If `status` is internal domain data, use an enum. If it is external raw input, parse it first.

```java
public static Optional<UserStatus> parseStatus(String input) {
    if (input == null) {
        return Optional.empty();
    }

    return switch (input.trim().toUpperCase(Locale.ROOT)) {
        case "ACTIVE" -> Optional.of(UserStatus.ACTIVE);
        case "SUSPENDED" -> Optional.of(UserStatus.SUSPENDED);
        case "DELETED" -> Optional.of(UserStatus.DELETED);
        default -> Optional.empty();
    };
}
```

Branching over sealed alternatives:

```java
public sealed interface PaymentResult
        permits PaymentSuccess, PaymentFailure {
}

public record PaymentSuccess(String transactionId) implements PaymentResult {
}

public record PaymentFailure(String reason) implements PaymentResult {
}

public String render(PaymentResult result) {
    return switch (result) {
        case PaymentSuccess success ->
                "Payment succeeded: " + success.transactionId();
        case PaymentFailure failure ->
                "Payment failed: " + failure.reason();
    };
}
```

This is useful when the caller needs to produce a different result for each variant. But if behavior belongs inside each variant, use polymorphism:

```java
public sealed interface PaymentResult
        permits PaymentSuccess, PaymentFailure {
    String render();
}

public record PaymentSuccess(String transactionId) implements PaymentResult {
    @Override
    public String render() {
        return "Payment succeeded: " + transactionId;
    }
}

public record PaymentFailure(String reason) implements PaymentResult {
    @Override
    public String render() {
        return "Payment failed: " + reason;
    }
}
```

| Design choice      | Better when                                    | Worse when                                        |
| ------------------ | ---------------------------------------------- | ------------------------------------------------- |
| `switch` over enum | behavior is external formatting/classification | enum starts accumulating too much unrelated logic |
| methods on enum    | behavior is intrinsic to state                 | behavior needs external dependencies              |
| sealed `switch`    | caller must handle variants explicitly         | variant behavior should be encapsulated           |
| polymorphic method | behavior belongs to variant                    | many unrelated operations get forced into type    |
| strategy object    | behavior varies independently                  | too many one-method classes without reuse         |

**Tempting but wrong mental model:** “Pattern matching means Java should now branch on types everywhere.”

**Surprising behavior or bug:** Code becomes a long type-case chain and ignores polymorphic design.

**Correct semantic explanation:** Pattern matching makes type-based branching safer and clearer when type alternatives are the right model. It does not replace ordinary polymorphism.

**Professional rule of thumb:** Use `switch` when the operation is naturally external to the variants; use polymorphism when the operation belongs to each variant.

**Boundary where the rule changes:** For serialization, UI rendering, reporting, and protocol translation, external branching over variants is often appropriate because the operation belongs to the boundary, not the domain object.

**Common Pitfalls:**
Do not branch on raw strings when the internal state is finite. Do not use `default` to hide missing enum cases unless unknown values are genuinely possible. Do not use `instanceof` chains for behavior that should be dispatched polymorphically. Do not move every operation into the variant type if it creates bloated domain objects.

### Iterate and Transform Data — loops, iterators, streams, collectors, side effects

Java offers several ways to process collections and sequences. The choice should depend on whether the operation is imperative, transformational, stateful, short-circuiting, or side-effecting.

| Task                             | Good construct               | Example                      | Caveat                                      |
| -------------------------------- | ---------------------------- | ---------------------------- | ------------------------------------------- |
| Visit each item with side effect | enhanced `for`               | send email to each user      | side effects should be intentional          |
| Build new list by transformation | stream `map` or loop         | users → names                | stream clarity depends on simplicity        |
| Filter values                    | stream `filter` or loop      | active users                 | avoid hidden side effects in predicate      |
| Accumulate result                | loop or collector            | total amount                 | choose readable form                        |
| Remove items while iterating     | iterator or `removeIf`       | remove inactive              | avoid concurrent modification               |
| Find first match                 | stream `findFirst` or loop   | first active user            | stream should not obscure condition         |
| Group values                     | collectors                   | group by status              | collector complexity can reduce readability |
| Process with index               | classic `for`                | compare neighboring elements | streams are awkward for indexes             |
| Stop early on condition          | loop or short-circuit stream | any match                    | avoid full traversal accidentally           |

Enhanced loop:

```java
for (User user : users) {
    if (user.isActive()) {
        sendNotification(user);
    }
}
```

Stream transformation:

```java
List<EmailAddress> emails = users.stream()
        .filter(User::isActive)
        .map(User::email)
        .toList();
```

The stream version is good because it expresses a pipeline: filter active users, map to emails, collect to a list.

A bad stream:

```java
List<EmailAddress> emails = new ArrayList<>();

users.stream()
        .filter(user -> {
            audit(user);
            return user.isActive();
        })
        .forEach(user -> emails.add(user.email()));
```

This mixes side effects into a pipeline and mutates external state. A loop is clearer:

```java
List<EmailAddress> emails = new ArrayList<>();

for (User user : users) {
    audit(user);
    if (user.isActive()) {
        emails.add(user.email());
    }
}

emails = List.copyOf(emails);
```

Collectors:

```java
Map<UserStatus, List<User>> usersByStatus = users.stream()
        .collect(Collectors.groupingBy(User::status));
```

Counting:

```java
long activeCount = users.stream()
        .filter(User::isActive)
        .count();
```

Finding:

```java
Optional<User> firstActive = users.stream()
        .filter(User::isActive)
        .findFirst();
```

Removing:

```java
users.removeIf(user -> !user.isActive());
```

Manual removal inside enhanced `for` is unsafe for many collections:

```java
for (User user : users) {
    if (!user.isActive()) {
        users.remove(user); // often ConcurrentModificationException
    }
}
```

Use iterator removal when needed:

```java
Iterator<User> iterator = users.iterator();

while (iterator.hasNext()) {
    User user = iterator.next();
    if (!user.isActive()) {
        iterator.remove();
    }
}
```

| Loop vs stream decision                    | Prefer loop                     | Prefer stream           |
| ------------------------------------------ | ------------------------------- | ----------------------- |
| Side effects                               | yes                             | usually no              |
| Complex branching                          | yes                             | usually no              |
| Simple map/filter pipeline                 | acceptable                      | yes                     |
| Need index                                 | yes                             | usually no              |
| Early return from method                   | yes                             | no direct method return |
| Debug step-by-step                         | often yes                       | harder but possible     |
| Grouping/reducing                          | sometimes                       | often yes               |
| Checked exceptions inside operation        | often yes                       | awkward in streams      |
| Performance-sensitive primitive processing | maybe specialized loops/streams | measure                 |

Streams are lazy until a terminal operation executes:

```java
Stream<User> pipeline = users.stream()
        .filter(user -> {
            System.out.println("filtering " + user.id());
            return user.isActive();
        });

// Nothing printed yet.

List<User> active = pipeline.toList(); // now filtering happens
```

A stream is single-use:

```java
Stream<User> stream = users.stream();

long count = stream.count();
// stream.toList(); // illegal: stream already operated upon or closed
```

Parallel streams require caution:

```java
users.parallelStream()
        .forEach(this::sendNotification);
```

This may look attractive, but side effects, ordering, thread safety, blocking behavior, and shared resources can make it unsafe or slower.

**Tempting but wrong mental model:** “Streams are always more modern and therefore better than loops.”

**Surprising behavior or bug:** A stream pipeline with side effects behaves unpredictably, is hard to debug, or performs worse than a clear loop.

**Correct semantic explanation:** Streams express transformations over data. They work best when operations are stateless, non-interfering, and side-effect-light.

**Professional rule of thumb:** Use streams for clear data transformations. Use loops for complex control flow, mutation, checked exceptions, early exits, and side-effect-heavy operations.

**Boundary where the rule changes:** Some stream operations over large collections can be efficient and expressive, especially with collectors. But performance should be measured, not assumed.

**Common Pitfalls:**
Do not mutate external collections inside stream pipelines. Do not reuse streams. Do not assume `parallelStream` is a free speedup. Do not hide I/O inside `map` or `filter` without making side effects clear. Do not turn simple loops into unreadable collector puzzles.

### Compose Functions and Small Behaviors — lambdas, method references, functional interfaces

Java supports function-like composition through lambdas and method references, but the target type is always a functional interface. This preserves Java’s nominal type system.

| Task                        | Construct                            | Example                   | Best use                     |
| --------------------------- | ------------------------------------ | ------------------------- | ---------------------------- |
| Predicate                   | `Predicate<T>`                       | `user -> user.isActive()` | filtering, validation        |
| Transformation              | `Function<T,R>`                      | `User::email`             | mapping values               |
| Side effect consumer        | `Consumer<T>`                        | `this::send`              | callbacks, iteration         |
| Value supplier              | `Supplier<T>`                        | `Instant::now`            | deferred creation            |
| Binary operation            | `BinaryOperator<T>`                  | `BigDecimal::add`         | reduction                    |
| Primitive specialization    | `IntPredicate`, `LongFunction`, etc. | `i -> i > 0`              | reduce boxing                |
| Custom functional interface | domain-specific SAM                  | `PriceRule`               | meaningful behavior contract |

Standard functional interfaces:

```java
Predicate<User> active = User::isActive;
Function<User, EmailAddress> email = User::email;
Consumer<User> notify = this::sendNotification;
Supplier<Instant> now = Instant::now;
```

Composition:

```java
Predicate<User> activeWithEmail = user ->
        user.isActive() && user.email() != null;
```

Using standard combinators:

```java
Predicate<User> active = User::isActive;
Predicate<User> hasEmail = user -> user.email() != null;

Predicate<User> activeWithEmail = active.and(hasEmail);
```

Function composition:

```java
Function<User, EmailAddress> userEmail = User::email;
Function<EmailAddress, String> emailText = EmailAddress::value;

Function<User, String> userEmailText = userEmail.andThen(emailText);
```

Custom functional interface when domain meaning matters:

```java
@FunctionalInterface
public interface PriceRule {
    Money apply(Money basePrice);
}
```

Usage:

```java
PriceRule tenPercentDiscount = price ->
        price.multiply(new BigDecimal("0.90"));
```

This is better than `Function<Money, Money>` when the behavior has domain meaning and belongs in an API.

| Use standard functional interface when                  | Use custom functional interface when          |
| ------------------------------------------------------- | --------------------------------------------- |
| meaning is obvious and generic                          | behavior has domain name                      |
| local variable or private helper                        | public API                                    |
| `Predicate`, `Function`, `Consumer` communicates enough | exception policy or domain vocabulary matters |
| no additional documentation needed                      | behavior should be documented                 |
| composition with standard APIs matters                  | long-term contract matters                    |

Lambdas can capture effectively final variables:

```java
Currency currency = Currency.getInstance("USD");

Function<BigDecimal, Money> usd = amount ->
        new Money(amount, currency);
```

They cannot capture a reassigned local variable:

```java
int count = 0;

// Runnable task = () -> System.out.println(count);
// count++; // would break effective finality
```

Captured references can still point to mutable objects:

```java
List<String> names = new ArrayList<>();

Runnable task = () -> names.add("Ada"); // allowed, but mutates captured object
```

This is legal but can be dangerous, especially in concurrent code.

Method reference readability:

```java
users.stream()
        .map(User::email)
        .forEach(this::sendEmail);
```

This is clear if the method names communicate intent. But method references can hide parameter relationships:

```java
orders.stream()
        .map(this::process)
        .toList();
```

If `process` has side effects or vague meaning, a lambda or explicit loop may be clearer.

**Tempting but wrong mental model:** “A Java lambda is just a free-standing function.”

**Surprising behavior or bug:** A lambda needs a target functional interface, cannot freely mutate captured local variables, and may hide side effects.

**Correct semantic explanation:** Java lambdas are target-typed expressions converted to functional-interface instances.

**Professional rule of thumb:** Use lambdas for small, local behavior. Use named methods or custom interfaces when behavior needs identity, documentation, reuse, or domain meaning.

**Boundary where the rule changes:** Frameworks and asynchronous APIs may store lambdas and execute them later, on another thread, or under another lifecycle. Capture only stable, safe state.

**Common Pitfalls:**
Do not write large lambdas. Do not mutate shared state from lambdas without a concurrency strategy. Do not use method references that obscure behavior. Do not use generic `Function<T,R>` in public APIs when a domain-specific behavior name would clarify the contract.

### Write Reusable Helpers — extraction, static helpers, instance methods, utility classes

Reusable helpers in Java can be private methods, public methods, static functions, utility classes, service methods, or reusable objects. The correct form depends on whether the behavior needs state, polymorphism, dependency injection, or domain ownership.

| Helper form          | Best use                            | Example                        | Main risk                        |
| -------------------- | ----------------------------------- | ------------------------------ | -------------------------------- |
| Private method       | clarify local class logic           | `validateInput()`              | hiding too much state dependency |
| Static helper        | stateless operation                 | `MoneyRules.requirePositive()` | utility-class dumping ground     |
| Instance method      | behavior belongs to object state    | `account.withdraw(amount)`     | anemic model if absent           |
| Service method       | operation coordinates collaborators | `paymentService.charge(order)` | god service                      |
| Functional parameter | small injected behavior             | `filter(predicate)`            | unreadable callbacks             |
| Strategy object      | reusable behavior variation         | `TaxPolicy`                    | too many tiny classes            |
| Generic helper       | reusable type-safe logic            | `first(List<T>)`               | over-generic API                 |

Private extraction:

```java
public void register(CreateUserCommand command) {
    requireValid(command);

    User user = User.create(command.name(), command.email());
    repository.save(user);
    auditUserCreated(user);
}

private void requireValid(CreateUserCommand command) {
    Objects.requireNonNull(command);
}
```

Extraction is good when it names a concept. It is bad when it merely hides one line without improving clarity.

Poor helper:

```java
private boolean check(User user) {
    return user != null && user.isActive() && user.hasEmail();
}
```

Better helper name:

```java
private boolean canReceiveNotification(User user) {
    return user != null && user.isActive() && user.hasEmail();
}
```

Static utility class:

```java
public final class MoneyChecks {
    private MoneyChecks() {
    }

    public static void requirePositive(Money amount) {
        if (amount.isZeroOrNegative()) {
            throw new IllegalArgumentException("amount must be positive");
        }
    }
}
```

Static helpers are acceptable for stateless, general operations. But if behavior belongs to a domain type, put it there:

```java
public record Money(BigDecimal amount, Currency currency) {
    public boolean isPositive() {
        return amount.signum() > 0;
    }
}
```

Instead of:

```java
MoneyUtils.isPositive(money);
```

Use service methods when the operation coordinates multiple objects or external systems:

```java
public final class PaymentService {
    private final PaymentGateway gateway;
    private final OrderRepository orders;

    public PaymentService(PaymentGateway gateway, OrderRepository orders) {
        this.gateway = Objects.requireNonNull(gateway);
        this.orders = Objects.requireNonNull(orders);
    }

    public PaymentResult pay(OrderId orderId, PaymentMethod method) {
        Order order = orders.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        PaymentResult result = gateway.charge(order.total(), method);

        if (result instanceof PaymentSuccess) {
            order.markPaid();
            orders.save(order);
        }

        return result;
    }
}
```

| Extraction question                  | If yes           | If no                         |
| ------------------------------------ | ---------------- | ----------------------------- |
| Does the helper name a real concept? | extract          | leave inline                  |
| Does it reduce duplication?          | extract          | avoid accidental indirection  |
| Does it isolate a policy?            | strategy/service | simple method may be enough   |
| Does it need object state?           | instance method  | static may fit                |
| Does it need collaborators?          | service object   | static utility is poor        |
| Is it generic across types?          | generic helper   | domain-specific method better |

**Tempting but wrong mental model:** “Reusable means static utility method.”

**Surprising behavior or bug:** Utility classes accumulate unrelated operations and become procedural dumping grounds.

**Correct semantic explanation:** Reuse can be local extraction, domain behavior, service coordination, strategy injection, or generic abstraction. Static utility is only one option.

**Professional rule of thumb:** Put behavior where its data, invariants, and dependencies naturally live.

**Boundary where the rule changes:** Cross-cutting technical helpers, pure calculations, and adapter functions may be appropriate as static utilities.

**Common Pitfalls:**
Do not create `CommonUtils`, `GeneralHelper`, or `MiscUtil` classes. Do not extract methods with vague names. Do not move domain behavior out of domain objects merely to keep objects as data bags. Do not make helpers public before there is a real public API need.

### Design Function and Method Signatures — parameters, return values, errors, names

A Java method signature is a contract. It tells callers what values are required, what result is produced, what checked failures may occur, and often what abstraction level the method occupies.

Weak signature:

```java
public Object process(Object input, boolean flag, String mode) {
    // ...
    return null;
}
```

Stronger signature:

```java
public PaymentResult charge(PaymentRequest request) {
    // ...
}
```

| Signature dimension       | Weak form                      | Stronger form                             |
| ------------------------- | ------------------------------ | ----------------------------------------- |
| Parameter meaning         | `String id`                    | `UserId id`                               |
| Many same-type parameters | `String a, String b, String c` | request object or domain types            |
| Boolean flag              | `send(user, true)`             | separate method or enum                   |
| Return absence            | nullable result                | `Optional<T>` or explicit result          |
| Failure                   | vague unchecked exception      | domain exception/result where appropriate |
| Side effect               | hidden in name                 | verb communicates operation               |
| Mutation                  | setter-like everywhere         | domain action method                      |
| Multiple return values    | array/list/map                 | record result                             |
| External input            | raw `String`/`Map`             | parsed command/DTO/domain type            |

Avoid boolean flags when they create hidden branches:

```java
public void send(User user, boolean urgent) {
}
```

Call site:

```java
send(user, true);
```

The meaning of `true` is unclear. Prefer:

```java
public enum Priority {
    NORMAL,
    URGENT
}

public void send(User user, Priority priority) {
}
```

or separate methods if behavior is meaningfully distinct:

```java
public void sendNormal(User user) {
}

public void sendUrgent(User user) {
}
```

Use parameter objects when several values form one concept:

```java
public record SearchQuery(
        String text,
        int page,
        int pageSize,
        SortOrder sortOrder
) {
    public SearchQuery {
        if (page < 0) {
            throw new IllegalArgumentException("page must not be negative");
        }
        if (pageSize <= 0 || pageSize > 100) {
            throw new IllegalArgumentException("invalid page size");
        }
    }
}
```

Instead of:

```java
public SearchResult search(String text, int page, int pageSize, String sort) {
}
```

Return a named result when output has structure:

```java
public record ImportResult(int importedCount, int skippedCount, List<String> errors) {
    public ImportResult {
        errors = List.copyOf(errors);
    }
}
```

Instead of returning `Map<String,Object>`.

Method names should reveal side effects:

| Method name      | Expected meaning                        | Risk if violated                            |
| ---------------- | --------------------------------------- | ------------------------------------------- |
| `findUser`       | lookup, may not find                    | unexpected creation or mutation             |
| `getUser`        | cheap retrieval or property-like access | hidden I/O                                  |
| `loadUser`       | fetch from storage/external source      | unclear caching                             |
| `createUser`     | creates new user                        | surprising if it only validates             |
| `saveUser`       | persists state                          | unclear transaction/failure                 |
| `validateUser`   | checks validity                         | unclear whether returns, throws, or mutates |
| `calculateTotal` | pure-ish computation                    | surprising external call                    |
| `sendEmail`      | side-effecting I/O                      | must expose failure policy                  |

A method should either return useful information or perform a clear side effect. Doing both can be fine but should be explicit.

```java
public User createUser(CreateUserCommand command) {
    User user = User.create(command.name(), command.email());
    repository.save(user);
    return user;
}
```

This creates, persists, and returns a user. The name should make persistence semantics clear if that matters:

```java
public User createAndSaveUser(CreateUserCommand command) {
    // ...
}
```

But overly literal names can become clumsy. In service APIs, `createUser` may conventionally imply persistence. The key is consistency.

| Signature smell                           | Why it is bad               | Better option                             |
| ----------------------------------------- | --------------------------- | ----------------------------------------- |
| Many primitive/string parameters          | call-site ambiguity         | domain types or request record            |
| Boolean parameter                         | unclear branch meaning      | enum, separate methods, strategy          |
| Return `Object`                           | type safety lost            | generic or domain result                  |
| Return `null` for many meanings           | ambiguous absence/failure   | `Optional`, result type, exception        |
| Throws broad `Exception`                  | hides failure contract      | specific exception or translated boundary |
| Method does too much                      | unclear responsibility      | split command/query or service steps      |
| Name says query but mutates               | violates reader expectation | rename or separate side effect            |
| Public method exposes implementation type | tight coupling              | return interface or domain type           |

**Tempting but wrong mental model:** “A method signature only needs to satisfy the compiler.”

**Surprising behavior or bug:** Callers misuse a method because boolean flags, nullable returns, vague names, or broad exceptions hide the actual contract.

**Correct semantic explanation:** A method signature is a human and compiler contract. It shapes how future code can call, test, refactor, and reason about behavior.

**Professional rule of thumb:** Make illegal or unclear calls hard to write. Use domain types, named records, precise return types, and clear side-effect names.

**Boundary where the rule changes:** Very small private methods can sometimes use simple primitives because local context is obvious. Public APIs require more explicit modeling.

**Common Pitfalls:**
Do not expose `Object` or raw collections to avoid designing a type. Do not use `boolean` flags for multiple behavioral modes. Do not return `null` where absence is normal. Do not declare `throws Exception` in serious APIs unless implementing a framework contract that requires it.
### Use Closures Safely — captured variables, effectively final locals, mutable state, delayed execution

A Java lambda can capture local variables from its surrounding scope, but captured local variables must be `final` or **effectively final**. This rule is not cosmetic. It prevents a lambda from depending on a local variable whose stack-frame lifetime and reassignment behavior would otherwise be confusing.

```java
public Runnable buildTask(String userId) {
    String prefix = "[user=" + userId + "]";

    return () -> System.out.println(prefix);
}
```

`prefix` is effectively final because it is assigned once and not reassigned.

This fails:

```java
public Runnable buildTask(String userId) {
    String prefix = "[user=" + userId + "]";
    prefix = prefix.toUpperCase(Locale.ROOT);

    return () -> System.out.println(prefix);
}
```

The variable is reassigned, so it is no longer effectively final. A corrected version uses a new variable:

```java
public Runnable buildTask(String userId) {
    String rawPrefix = "[user=" + userId + "]";
    String normalizedPrefix = rawPrefix.toUpperCase(Locale.ROOT);

    return () -> System.out.println(normalizedPrefix);
}
```

| Closure issue                | Java rule                           | Practical consequence                 | Common pitfall                                  |
| ---------------------------- | ----------------------------------- | ------------------------------------- | ----------------------------------------------- |
| Capturing local variable     | Must be final or effectively final  | Prevents local reassignment confusion | Trying to increment local counter inside lambda |
| Capturing object reference   | Reference must be effectively final | Object may still mutate               | Mistaking final capture for immutable state     |
| Capturing fields             | Allowed                             | Captures `this` implicitly            | Leaking object state into delayed task          |
| Capturing mutable collection | Allowed if reference stable         | Collection can mutate                 | Shared mutable state bug                        |
| Delayed execution            | Lambda may run later                | Captured state must remain valid      | Capturing request/session resource              |
| Cross-thread execution       | Lambda may run on another thread    | Thread safety matters                 | Capturing non-thread-safe object                |

A common failed counter pattern:

```java
int count = 0;

users.forEach(user -> {
    // count++; // not allowed
});
```

A better stream-oriented form:

```java
long activeCount = users.stream()
        .filter(User::isActive)
        .count();
```

If mutation is genuinely needed, use a loop:

```java
int count = 0;

for (User user : users) {
    if (user.isActive()) {
        count++;
    }
}
```

Do not use mutable holders merely to bypass closure rules:

```java
int[] count = {0};

users.forEach(user -> {
    if (user.isActive()) {
        count[0]++;
    }
});
```

This is legal but usually poor style. It hides mutation and becomes dangerous if execution becomes parallel.

Capturing fields is often more subtle:

```java
public final class EmailSender {
    private final MailClient client;

    public EmailSender(MailClient client) {
        this.client = Objects.requireNonNull(client);
    }

    public Runnable taskFor(User user) {
        return () -> client.send(user.email());
    }
}
```

The lambda captures `this.client` and `user`. This is fine if both remain valid and thread-safe for the eventual execution context. It is dangerous if `user` is mutable, tied to a transaction, or invalid outside the current request.

| Captured value              | Safe when                   | Risky when                                           |
| --------------------------- | --------------------------- | ---------------------------------------------------- |
| Immutable value object      | value is stable             | component is mutable                                 |
| `String`, `Instant`, `UUID` | naturally stable            | semantic validity expires                            |
| `List<T>`                   | copied or unmodifiable      | mutable and shared                                   |
| entity object               | stable snapshot not needed  | later mutation changes behavior                      |
| database/session object     | lifecycle controlled        | lambda outlives session                              |
| service dependency          | thread-safe and long-lived  | request-scoped or stateful                           |
| `this`                      | object is safe to use later | object escapes during construction or across threads |

**Tempting but wrong mental model:** “If a lambda compiles, captured state is safe.”

**Surprising behavior or bug:** A lambda runs later and observes mutated object state, closed resources, stale request data, or non-thread-safe collaborators.

**Correct semantic explanation:** Java restricts local variable capture, but it does not freeze referenced objects or guarantee lifecycle/thread safety.

**Professional rule of thumb:** Capture immutable values or stable services. Avoid capturing mutable local state, request-scoped resources, or objects whose lifecycle ends before the lambda runs.

**Boundary where the rule changes:** In short, immediate stream pipelines over local data, capture risk is lower because execution is local and synchronous unless a parallel/asynchronous API is involved.

**Common Pitfalls:**
Do not use arrays or `AtomicInteger` as fake mutable local variables unless the design truly needs mutation. Do not capture mutable entities in asynchronous tasks without snapshotting. Do not capture `this` in constructors or long-lived callbacks without considering object lifetime.

### Use Annotations and Metadata-Driven Behavior — compiler checks, validation, dependency injection, reflection

Annotations attach metadata to program elements. They are central to modern Java frameworks, but their meaning depends on who reads them: compiler, annotation processor, static analyzer, runtime framework, serializer, dependency injection container, test framework, or documentation tool.

| Annotation category       | Example                                   | Consumer                  | Effect                          |
| ------------------------- | ----------------------------------------- | ------------------------- | ------------------------------- |
| Compiler-check annotation | `@Override`                               | Java compiler             | verifies method override        |
| Warning control           | `@SuppressWarnings`                       | compiler/static analyzer  | suppresses selected warning     |
| API lifecycle             | `@Deprecated`                             | compiler/tools/Javadoc    | marks discouraged API           |
| Functional interface      | `@FunctionalInterface`                    | compiler                  | verifies single abstract method |
| Validation                | `@NotNull`, `@Email`, `@Size`             | validation framework/tool | validates if invoked            |
| Dependency injection      | `@Inject`, framework-specific annotations | DI container              | object wiring                   |
| Persistence               | ORM annotations                           | persistence framework     | database mapping                |
| Web routing               | framework annotations                     | web framework             | request handling                |
| Serialization             | JSON/XML annotations                      | serializer                | data format mapping             |
| Testing                   | test annotations                          | test runner               | test discovery/lifecycle        |

A compiler-read annotation:

```java
@Override
public String toString() {
    return "User";
}
```

This has direct compiler value. If the method does not actually override a superclass/interface method, compilation fails.

A framework-read annotation:

```java
public record CreateUserRequest(
        @NotBlank String name,
        @Email String email
) {
}
```

This only matters if a validation framework processes the object. The Java compiler does not know that `@Email` means valid email.

A dependency-injection-oriented class:

```java
public final class UserService {
    private final UserRepository repository;
    private final Clock clock;

    @Inject
    public UserService(UserRepository repository, Clock clock) {
        this.repository = Objects.requireNonNull(repository);
        this.clock = Objects.requireNonNull(clock);
    }
}
```

The annotation may let a DI container select this constructor. But the explicit constructor still matters: it states dependencies, supports tests, and allows null checks.

| Metadata-driven behavior           | Strength                             | Cost                           |
| ---------------------------------- | ------------------------------------ | ------------------------------ |
| Reduces wiring boilerplate         | less manual setup                    | hidden control flow            |
| Integrates with frameworks         | conventional ecosystem support       | framework coupling             |
| Enables build-time/runtime tooling | validation, code generation, routing | tool-dependent semantics       |
| Keeps code declarative             | compact configuration                | harder debugging               |
| Supports cross-cutting concerns    | transactions, security, metrics      | invisible execution boundaries |

**Tempting but wrong mental model:** “Annotation equals language feature.”

**Surprising behavior or bug:** The annotation is present, but nothing happens because no processor, framework, or runtime hook reads it.

**Correct semantic explanation:** An annotation is metadata. Its behavior depends on retention, target, and a consumer.

**Professional rule of thumb:** For every annotation, know who reads it, when it is read, and what failure mode occurs if it is ignored.

**Boundary where the rule changes:** Some annotations are compiler-recognized and have immediate language-tooling effects. Most application annotations are framework contracts.

**Common Pitfalls:**
Do not bury core business behavior entirely behind annotations. Do not use `@SuppressWarnings` broadly. Do not assume validation annotations run automatically. Do not let annotation-driven code obscure transaction, security, or concurrency boundaries.

### Choose Functions, Objects, or Services — behavior placement, state, dependencies, identity

Java does not have top-level functions in the same way as some languages. Behavior usually lives in methods, static helpers, objects, services, lambdas, or functional interfaces. The decision should be based on state, dependencies, domain ownership, and variation.

| Behavior placement               | Use when                                               | Avoid when                                               |
| -------------------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| Instance method on domain object | behavior uses object state and preserves invariants    | operation needs many external dependencies               |
| Static method                    | stateless operation, factory, pure helper              | behavior belongs to domain object or needs collaborators |
| Service object                   | operation coordinates repositories, gateways, policies | service becomes god object                               |
| Functional interface             | small behavior variation passed as dependency          | behavior needs multiple methods/state                    |
| Lambda                           | local short behavior                                   | behavior is complex or reused                            |
| Strategy object                  | interchangeable algorithm/policy                       | variation is not real or only used once                  |
| Constructor/factory              | creation, validation, normalization                    | heavy I/O or workflow logic                              |
| Framework handler/controller     | boundary translation                                   | domain logic stays there                                 |

Domain method:

```java
public final class Order {
    private OrderStatus status;
    private final List<OrderLine> lines;

    public Money total() {
        return lines.stream()
                .map(OrderLine::subtotal)
                .reduce(Money.zero(currency()), Money::plus);
    }

    public void cancel() {
        if (status == OrderStatus.SHIPPED) {
            throw new IllegalStateException("shipped order cannot be cancelled");
        }
        status = OrderStatus.CANCELLED;
    }
}
```

This behavior belongs to `Order` because it uses and protects order state.

Service method:

```java
public final class CheckoutService {
    private final OrderRepository orders;
    private final PaymentGateway paymentGateway;
    private final InventoryService inventory;

    public CheckoutService(
            OrderRepository orders,
            PaymentGateway paymentGateway,
            InventoryService inventory
    ) {
        this.orders = Objects.requireNonNull(orders);
        this.paymentGateway = Objects.requireNonNull(paymentGateway);
        this.inventory = Objects.requireNonNull(inventory);
    }

    public CheckoutResult checkout(OrderId orderId, PaymentMethod method) {
        Order order = orders.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));

        inventory.reserve(order.lines());
        PaymentResult payment = paymentGateway.charge(order.total(), method);

        if (payment instanceof PaymentSuccess) {
            order.markPaid();
            orders.save(order);
        }

        return new CheckoutResult(order.id(), payment);
    }
}
```

This behavior belongs to a service because it coordinates external collaborators and side effects.

Static helper:

```java
public final class Slugs {
    private Slugs() {
    }

    public static String normalize(String text) {
        return text.trim()
                .toLowerCase(Locale.ROOT)
                .replaceAll("\\s+", "-");
    }
}
```

This is acceptable if slug normalization is genuinely stateless and technical. If it becomes domain-specific, use a domain type:

```java
public record Slug(String value) {
    public Slug {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("blank slug");
        }
        value = normalize(value);
    }

    private static String normalize(String text) {
        return text.trim()
                .toLowerCase(Locale.ROOT)
                .replaceAll("\\s+", "-");
    }
}
```

| Question                                            | If yes | Likely placement            |
| --------------------------------------------------- | ------ | --------------------------- |
| Does behavior protect object invariant?             | yes    | domain object method        |
| Does behavior coordinate multiple dependencies?     | yes    | service                     |
| Is behavior stateless and generic?                  | yes    | static helper               |
| Is behavior a replaceable policy?                   | yes    | interface/strategy          |
| Is behavior a one-off local transformation?         | yes    | lambda                      |
| Does behavior require external framework lifecycle? | yes    | framework-managed component |
| Does behavior create valid object?                  | yes    | constructor/factory         |
| Does behavior expose public contract?               | yes    | named method/interface      |

**Tempting but wrong mental model:** “Business logic should always be in services.”

**Surprising behavior or bug:** Domain objects become passive data bags, services grow huge, and invariants are enforced inconsistently.

**Correct semantic explanation:** Services coordinate workflows. Domain objects should still own behavior that protects their own state and invariants.

**Professional rule of thumb:** Put behavior at the lowest level where it has the necessary data and authority, but not lower than its dependencies allow.

**Boundary where the rule changes:** Persistence frameworks, serialization frameworks, or architectural styles may constrain domain-object methods. Even then, keep invariant logic explicit and centralized.

**Common Pitfalls:**
Do not turn every operation into a service. Do not create static utility functions for behavior that belongs to domain objects. Do not put external I/O inside value objects. Do not let controllers or framework handlers become domain services.

### Choose Inheritance or Composition — subtype, reuse, delegation, strategy

Inheritance is one of Java’s oldest abstraction mechanisms, but modern Java practice uses it carefully. Composition is often safer because it separates reuse from subtyping.

| Goal                                  | Prefer                            | Reason                                             |
| ------------------------------------- | --------------------------------- | -------------------------------------------------- |
| Express true subtype substitutability | inheritance/interface             | caller can use subtype wherever base type expected |
| Share implementation                  | composition/delegation            | avoids fragile base class                          |
| Add optional capability               | interface                         | avoids forcing unrelated base class                |
| Vary algorithm                        | strategy object                   | behavior can change independently                  |
| Close finite alternatives             | sealed hierarchy                  | controlled subtype set                             |
| Reuse stateful helper                 | collaborator object               | clearer ownership                                  |
| Extend framework hook                 | inheritance if framework requires | treat as framework constraint                      |

Weak inheritance for reuse:

```java
public class CsvExporter extends FileWriter {
    // bad if inheritance is only used to reuse file-writing behavior
}
```

Better composition:

```java
public final class CsvExporter {
    private final Writer writer;

    public CsvExporter(Writer writer) {
        this.writer = Objects.requireNonNull(writer);
    }

    public void export(List<Row> rows) throws IOException {
        for (Row row : rows) {
            writer.write(format(row));
        }
    }
}
```

Inheritance for substitutability:

```java
public interface NotificationChannel {
    void send(Message message);
}

public final class EmailChannel implements NotificationChannel {
    @Override
    public void send(Message message) {
        // send email
    }
}

public final class SmsChannel implements NotificationChannel {
    @Override
    public void send(Message message) {
        // send SMS
    }
}
```

This is not implementation inheritance; it is interface-based substitutability.

Abstract class for shared template logic:

```java
public abstract class AbstractReportRenderer {
    public final String render(Report report) {
        StringBuilder output = new StringBuilder();
        renderHeader(report, output);
        renderBody(report, output);
        renderFooter(report, output);
        return output.toString();
    }

    protected abstract void renderBody(Report report, StringBuilder output);

    protected void renderHeader(Report report, StringBuilder output) {
        output.append(report.title()).append('\n');
    }

    protected void renderFooter(Report report, StringBuilder output) {
    }
}
```

This is acceptable when the template method pattern is intentional. It is risky when subclasses depend on fragile internal sequencing.

| Inheritance risk        | Meaning                                               |
| ----------------------- | ----------------------------------------------------- |
| Fragile base class      | base change breaks subclasses                         |
| Protected state leakage | subclasses mutate internals unpredictably             |
| Constructor hazards     | overridable methods during construction are dangerous |
| Deep hierarchy          | behavior becomes hard to locate                       |
| False taxonomy          | subtype relation models convenience, not truth        |
| Testing difficulty      | subclass behavior depends on hidden base machinery    |

Composition with strategy:

```java
public interface DiscountPolicy {
    Money discountFor(Order order);
}

public final class PricingService {
    private final DiscountPolicy discountPolicy;

    public PricingService(DiscountPolicy discountPolicy) {
        this.discountPolicy = Objects.requireNonNull(discountPolicy);
    }

    public Money price(Order order) {
        return order.total().minus(discountPolicy.discountFor(order));
    }
}
```

This allows changing discount behavior without subclassing `PricingService`.

**Tempting but wrong mental model:** “Inheritance is the main way to reuse Java code.”

**Surprising behavior or bug:** A base-class change breaks subclasses that depended on undocumented protected behavior.

**Correct semantic explanation:** Inheritance couples subtype and implementation reuse. Composition separates them.

**Professional rule of thumb:** Use inheritance for stable subtype relationships. Use composition for reuse and interchangeable behavior.

**Boundary where the rule changes:** Some frameworks require subclassing. In those cases, keep framework inheritance at the boundary and avoid spreading it into domain design.

**Common Pitfalls:**
Do not use inheritance because two classes share a few methods. Do not expose protected mutable fields. Do not call overridable methods from constructors. Do not build deep hierarchies where interfaces and composition would be clearer.

### Express Reusable Abstractions — interfaces, generics, records, sealed types, policies

Reusable abstractions are valuable when they reduce duplication, clarify contracts, or isolate variation. They are harmful when they add indirection without reducing complexity.

| Abstraction mechanism | Best use                     | Failure mode                                    |
| --------------------- | ---------------------------- | ----------------------------------------------- |
| Interface             | stable behavior boundary     | one-implementation abstraction with no purpose  |
| Generic type          | reusable type-safe structure | unreadable wildcard-heavy API                   |
| Record                | named data result/input      | overused for every parameter group              |
| Sealed type           | finite alternatives          | closed when extension is needed                 |
| Enum                  | small fixed state/strategy   | giant enum with unrelated behavior              |
| Strategy              | interchangeable policy       | too many tiny policy objects                    |
| Template method       | fixed algorithm skeleton     | fragile inheritance                             |
| Higher-order function | local behavior parameter     | large lambda with hidden dependencies           |
| Annotation            | framework/tool metadata      | invisible architecture                          |
| Module/package        | architectural boundary       | package structure without dependency discipline |

A reusable abstraction should answer at least one of these questions:

| Question                           | Abstraction justified when                          |
| ---------------------------------- | --------------------------------------------------- |
| What varies?                       | multiple implementations or likely stable variation |
| What must stay stable?             | public API or boundary contract                     |
| What must be hidden?               | implementation detail or representation             |
| What must be enforced?             | invariant, lifecycle, security, resource rule       |
| What must be reused?               | behavior/data relationship appears repeatedly       |
| What must be tested independently? | substitutable dependency or policy                  |

Example: reusable policy abstraction.

```java
public interface RetryPolicy {
    boolean shouldRetry(int attempt, Throwable failure);
}

public final class FixedRetryPolicy implements RetryPolicy {
    private final int maxAttempts;

    public FixedRetryPolicy(int maxAttempts) {
        if (maxAttempts < 1) {
            throw new IllegalArgumentException("maxAttempts must be positive");
        }
        this.maxAttempts = maxAttempts;
    }

    @Override
    public boolean shouldRetry(int attempt, Throwable failure) {
        return attempt < maxAttempts;
    }
}
```

This abstraction is useful if retry behavior varies or must be tested/configured independently.

Bad abstraction:

```java
public interface UserNameGetter {
    String getUserName(User user);
}
```

If it only wraps `User::name`, it adds no useful boundary.

Generic abstraction:

```java
public interface Repository<ID, T> {
    Optional<T> findById(ID id);

    void save(T value);
}
```

This can be useful, but it can also become too generic if different repositories have different consistency, transaction, locking, and query semantics.

| Abstraction smell                                    | Meaning                                             | Correction                               |
| ---------------------------------------------------- | --------------------------------------------------- | ---------------------------------------- |
| Name is vague                                        | `Manager`, `Processor`, `Handler` with unclear role | name the domain responsibility           |
| Only one trivial implementation                      | no real variation                                   | remove interface unless boundary matters |
| Generic parameters everywhere                        | abstraction too broad                               | specialize                               |
| Methods throw unsupported exceptions                 | interface too wide                                  | split interface                          |
| Callers must know implementation details             | abstraction leaks                                   | redesign boundary                        |
| Abstraction hides side effects                       | unsafe API                                          | expose effect in name/contract           |
| Framework annotation required to understand behavior | hidden coupling                                     | document and isolate                     |

**Tempting but wrong mental model:** “More abstraction means more professional code.”

**Surprising behavior or bug:** Code becomes harder to modify because every change crosses interfaces, factories, providers, and configuration layers.

**Correct semantic explanation:** Abstraction trades local simplicity for boundary stability and variation management. If no boundary or variation exists, abstraction may be negative value.

**Professional rule of thumb:** Abstract over real variation, real boundaries, or real invariants. Do not abstract over imagined future complexity too early.

**Boundary where the rule changes:** Public libraries and large enterprise systems sometimes need abstractions before all implementations exist, because API compatibility and team boundaries are long-term constraints.

**Common Pitfalls:**
Do not create interfaces solely because the class is public. Do not make generic repositories erase important domain behavior. Do not use abstract base classes as dumping grounds. Do not split simple behavior across layers without a boundary reason.

### Design Public APIs — stability, visibility, contracts, overloads, null policy, compatibility

A public Java API is a long-term contract. Once used by other code, it becomes expensive to change. API design should prioritize clarity, type safety, compatibility, and explicit failure behavior.

| API design dimension | Good practice                          | Bad practice                                 |
| -------------------- | -------------------------------------- | -------------------------------------------- |
| Names                | domain-specific, action-revealing      | vague `process`, `handle`, `doWork`          |
| Parameter types      | domain types or precise standard types | many raw strings/booleans                    |
| Return type          | specific and meaningful                | `Object`, raw collection, nullable ambiguity |
| Null policy          | documented and enforced                | implicit null acceptance                     |
| Mutability           | unmodifiable return or clear ownership | leaking mutable internals                    |
| Exceptions           | specific and meaningful                | `throws Exception`                           |
| Overloads            | small coherent family                  | ambiguous overloads with null/boxing         |
| Visibility           | minimal necessary                      | public by default                            |
| Compatibility        | additive evolution                     | breaking signature changes                   |
| Documentation        | behavior not in type system            | restating obvious syntax                     |

Bad API:

```java
public Object process(String id, String type, boolean async, Map data)
        throws Exception {
    // ...
}
```

Better API:

```java
public SubmissionResult submit(
        SubmissionRequest request,
        ExecutionMode mode
) throws SubmissionException {
    // ...
}
```

With named types:

```java
public enum ExecutionMode {
    SYNCHRONOUS,
    ASYNCHRONOUS
}

public record SubmissionRequest(
        SubmissionId id,
        SubmissionType type,
        Map<String, String> attributes
) {
    public SubmissionRequest {
        Objects.requireNonNull(id);
        Objects.requireNonNull(type);
        attributes = Map.copyOf(attributes);
    }
}
```

API return mutability:

```java
public List<User> users() {
    return users; // bad if internal mutable list
}
```

Better:

```java
public List<User> users() {
    return List.copyOf(users);
}
```

or maintain an unmodifiable internal list.

Null policy:

```java
public User findUser(UserId id) {
    // returns null if not found? unclear
}
```

Better:

```java
public Optional<User> findUser(UserId id) {
    Objects.requireNonNull(id);
    return repository.findById(id);
}
```

When absence is an error:

```java
public User requireUser(UserId id) {
    return findUser(id)
            .orElseThrow(() -> new UserNotFoundException(id));
}
```

Overload danger:

```java
public void send(String message) {
}

public void send(Object message) {
}

send(null); // may be confusing or ambiguous depending overloads
```

Overloads should represent the same conceptual operation. If behavior differs significantly, use different names.

| API evolution                            | Usually compatible                                  | Often breaking                    |
| ---------------------------------------- | --------------------------------------------------- | --------------------------------- |
| Add new method to class                  | yes                                                 | if subclasses affected indirectly |
| Add default method to interface          | often                                               | if conflicts occur                |
| Add abstract method to interface         | breaking                                            | implementers must change          |
| Change parameter type                    | breaking                                            | callers fail                      |
| Change return type                       | often breaking unless covariant in override context | callers fail                      |
| Add checked exception                    | breaking                                            | callers must handle/declare       |
| Remove enum constant                     | breaking                                            | callers may fail                  |
| Add enum constant                        | source may compile but logic may miss new case      | switch/default behavior risk      |
| Change `equals`/`hashCode`               | behavioral breaking                                 | collections affected              |
| Change mutability of returned collection | behavioral breaking                                 | callers affected                  |

**Tempting but wrong mental model:** “Public just means other code can call it.”

**Surprising behavior or bug:** A public method becomes impossible to change because callers depend on undocumented null behavior, mutability, exceptions, or timing.

**Correct semantic explanation:** Public APIs create compatibility obligations beyond what the compiler explicitly records.

**Professional rule of thumb:** Make APIs narrow, typed, documented, and hard to misuse. Expose less than feels necessary.

**Boundary where the rule changes:** Internal application code can evolve more freely than published libraries, but large internal systems often develop library-like compatibility constraints.

**Common Pitfalls:**
Do not return mutable internals. Do not expose implementation classes when an interface or domain type is enough. Do not add broad overloads casually. Do not make every class and method public. Do not leave null behavior undocumented.

### Avoid Over-Abstraction and Under-Abstraction — complexity balance, code smells, refactoring cues

Java code commonly fails in two opposite ways: too little abstraction or too much abstraction.

Under-abstracted code:

```java
public void handle(Order order) {
    if (order.type().equals("DOMESTIC")) {
        // calculate domestic shipping
        // apply domestic tax
        // send domestic notification
    } else if (order.type().equals("INTERNATIONAL")) {
        // calculate international shipping
        // apply international tax
        // send international notification
    }
}
```

This may begin as simple code but becomes brittle when each branch grows.

Over-abstracted code:

```java
OrderHandlingProcessor processor =
        processorFactory
                .providerFor(order.type())
                .create()
                .withContext(context)
                .build();

processor.process(order);
```

This may be justified in a framework or plugin architecture, but it is excessive if there are two stable branches and no real extension point.

| Symptom                                | Likely problem         | Better response                              |
| -------------------------------------- | ---------------------- | -------------------------------------------- |
| giant method                           | under-abstraction      | extract named operations                     |
| repeated branch logic                  | under-abstraction      | enum behavior, strategy, sealed type, helper |
| repeated primitive groups              | under-abstraction      | parameter record/domain type                 |
| many one-method interfaces             | over-abstraction       | inline or concrete class                     |
| factory/provider chains                | over-abstraction       | direct construction or DI                    |
| vague abstractions                     | over-abstraction       | name concrete responsibility                 |
| interface with one implementation      | maybe over-abstraction | keep only if boundary/testing matters        |
| utility class with everything          | under-modeled behavior | move behavior to domain/service              |
| subclass hierarchy for minor variation | over-inheritance       | composition/strategy/field                   |
| long parameter lists                   | under-modeled data     | request object/value type                    |

Abstraction decision table:

| Question                                                    | If yes                 | If no                         |
| ----------------------------------------------------------- | ---------------------- | ----------------------------- |
| Is the code repeated with meaningful variation?             | abstract variation     | keep direct                   |
| Is there a stable boundary?                                 | interface/API          | concrete implementation       |
| Is the concept part of domain vocabulary?                   | name a type/method     | avoid artificial wrapper      |
| Is the operation hard to test because of dependencies?      | inject collaborator    | keep local if simple          |
| Is future variation likely and costly?                      | design extension point | avoid speculative abstraction |
| Is the current abstraction harder to explain than the code? | simplify               | keep if it pays for itself    |
| Does the abstraction hide side effects?                     | redesign               | acceptable if contract clear  |

A reasonable refactoring path:

```java
public Money shippingCost(Order order) {
    if (order.destination().isDomestic()) {
        return domesticShippingCost(order);
    }
    return internationalShippingCost(order);
}
```

If behavior grows:

```java
public interface ShippingCostPolicy {
    Money calculate(Order order);
}
```

Then inject:

```java
public final class ShippingService {
    private final ShippingCostPolicy policy;

    public ShippingService(ShippingCostPolicy policy) {
        this.policy = Objects.requireNonNull(policy);
    }

    public Money costFor(Order order) {
        return policy.calculate(order);
    }
}
```

This path is better than starting with a factory hierarchy before there is real variation.

**Tempting but wrong mental model:** “Design patterns should be applied early.”

**Surprising behavior or bug:** The code becomes pattern-shaped but problem-obscuring.

**Correct semantic explanation:** Design patterns are names for recurring solutions under specific forces. Without those forces, the pattern is accidental complexity.

**Professional rule of thumb:** Start concrete, identify real variation, then abstract around stable concepts.

**Boundary where the rule changes:** Public frameworks, plugin architectures, and multi-team platform APIs may need abstraction before all use cases are visible, because compatibility and extension points are part of the product.

**Common Pitfalls:**
Do not use design patterns as decoration. Do not leave repeated domain rules scattered because “abstraction is bad.” Do not create factories for objects that can be constructed directly. Do not confuse testability with interface proliferation.

### Compose Behavior with Objects — dependency injection, policies, collaborators, lifecycle

Java composition usually means one object delegates part of its behavior to another object. This is the basis of many service designs, testing strategies, and enterprise architectures.

```java
public final class InvoiceService {
    private final InvoiceRepository invoices;
    private final TaxPolicy taxPolicy;
    private final Clock clock;

    public InvoiceService(
            InvoiceRepository invoices,
            TaxPolicy taxPolicy,
            Clock clock
    ) {
        this.invoices = Objects.requireNonNull(invoices);
        this.taxPolicy = Objects.requireNonNull(taxPolicy);
        this.clock = Objects.requireNonNull(clock);
    }

    public Invoice createInvoice(Customer customer, List<InvoiceLine> lines) {
        Invoice invoice = Invoice.create(customer, lines, clock.instant());
        invoice.applyTax(taxPolicy);
        invoices.save(invoice);
        return invoice;
    }
}
```

This class composes repository persistence, tax policy, and time access.

| Collaborator type | Example             | Role                      |
| ----------------- | ------------------- | ------------------------- |
| Repository        | `InvoiceRepository` | persistence boundary      |
| Gateway/client    | `PaymentGateway`    | external service boundary |
| Policy            | `TaxPolicy`         | replaceable decision rule |
| Clock             | `Clock`             | time source abstraction   |
| Mapper            | `InvoiceMapper`     | transformation boundary   |
| Validator         | `InvoiceValidator`  | validation logic          |
| Publisher         | `EventPublisher`    | event side effect         |
| Factory           | `InvoiceFactory`    | complex creation          |

Constructor injection is usually clearer than field injection because dependencies are explicit:

```java
public UserService(UserRepository repository, PasswordHasher hasher) {
    this.repository = Objects.requireNonNull(repository);
    this.hasher = Objects.requireNonNull(hasher);
}
```

Field injection hides required dependencies:

```java
@Inject
private UserRepository repository;
```

Frameworks may support it, but constructor injection better matches Java’s explicit-contract style.

Composition can be too granular:

```java
public final class UserNameUppercaseConverter {
    public String convert(String name) {
        return name.toUpperCase(Locale.ROOT);
    }
}
```

This is likely unnecessary unless it participates in a meaningful extension system.

| Composition benefit             | Composition cost              |
| ------------------------------- | ----------------------------- |
| clearer dependency boundaries   | more objects                  |
| easier testing with substitutes | wiring complexity             |
| replaceable policies            | interface proliferation risk  |
| separation of concerns          | behavior may become scattered |
| avoids inheritance coupling     | delegation boilerplate        |
| supports framework DI           | hidden lifecycle if overused  |

**Tempting but wrong mental model:** “Dependency injection makes design good.”

**Surprising behavior or bug:** A system has many injected services but no clear ownership of domain rules.

**Correct semantic explanation:** Dependency injection supplies collaborators. It does not decide whether the collaborators are meaningful abstractions.

**Professional rule of thumb:** Compose objects around real dependencies, policies, and boundaries. Prefer constructor injection for required dependencies.

**Boundary where the rule changes:** Some frameworks or legacy systems may require field/setter injection. Treat that as integration constraint, not ideal object design.

**Common Pitfalls:**
Do not inject trivial helpers that could be static or local. Do not put all domain behavior in injected services. Do not hide required dependencies. Do not use DI containers as a substitute for understanding object lifecycles.

### Coordinate Side Effects — mutation, I/O, logging, persistence, transactions, events

Java code often runs in side-effect-heavy environments: databases, files, network services, message queues, logs, caches, metrics, and transactions. Professional behavior design separates pure-ish computation from side-effect coordination where possible.

| Side effect         | Typical API            | Design concern                  |
| ------------------- | ---------------------- | ------------------------------- |
| Object mutation     | setters/domain methods | invariant preservation          |
| Collection mutation | `add`, `remove`, `put` | aliasing and thread safety      |
| File I/O            | `Files`, streams       | resource closure and exceptions |
| Network I/O         | clients/sockets        | latency, retries, timeouts      |
| Database write      | repository/ORM         | transaction boundary            |
| Logging             | logger                 | signal vs noise                 |
| Metrics/tracing     | observability APIs     | cardinality and overhead        |
| Event publishing    | publisher/bus          | ordering and reliability        |
| Cache update        | cache API              | consistency                     |
| Email/message send  | gateway                | retry and idempotency           |

Separate calculation:

```java
public Money calculateTotal(Order order, TaxPolicy taxPolicy) {
    Money subtotal = order.subtotal();
    Money tax = taxPolicy.taxFor(order);
    return subtotal.plus(tax);
}
```

From side-effecting workflow:

```java
public Invoice createAndSaveInvoice(Order order) {
    Money total = calculateTotal(order, taxPolicy);

    Invoice invoice = Invoice.create(order.id(), total, clock.instant());
    invoiceRepository.save(invoice);
    eventPublisher.publish(new InvoiceCreated(invoice.id()));

    return invoice;
}
```

A side-effecting method name should reveal the effect. `calculateTotal` should not save to a database. `findUser` should not create a user. `validate` should not silently mutate state unless documented.

Transaction-like workflow:

```java
public void cancelOrder(OrderId orderId) {
    Order order = orders.findById(orderId)
            .orElseThrow(() -> new OrderNotFoundException(orderId));

    order.cancel();
    orders.save(order);
    events.publish(new OrderCancelled(order.id()));
}
```

This simple code hides important questions:

| Question                                                 | Why it matters        |
| -------------------------------------------------------- | --------------------- |
| Is `orders.save` transactional?                          | partial updates       |
| Should event publish happen inside or after transaction? | consistency           |
| What if event publishing fails?                          | retry or compensation |
| Is cancellation idempotent?                              | duplicate requests    |
| What if order is concurrently modified?                  | locking/versioning    |
| Should failure be checked or unchecked?                  | API contract          |

These issues are not solved by syntax. They require boundary design.

**Tempting but wrong mental model:** “Side effects are just method calls.”

**Surprising behavior or bug:** A method call performs remote I/O, blocks, retries, mutates state, commits transactions, or publishes events.

**Correct semantic explanation:** Java method syntax does not distinguish pure computation from effects. Effects must be expressed through naming, API design, types, exceptions, and architecture.

**Professional rule of thumb:** Make side effects visible at method boundaries. Keep pure calculation separate from effect coordination when it improves testability and reasoning.

**Boundary where the rule changes:** Some domain methods intentionally mutate object state; that is fine when mutation preserves invariants and is clear.

**Common Pitfalls:**
Do not hide I/O behind getter-like names. Do not mix calculation, persistence, notification, and logging in one unstructured method. Do not ignore idempotency in externally triggered operations. Do not assume event publishing and database commits succeed or fail together.

### Design for Testable Behavior — seams, clocks, randomness, external systems

Testability in Java is strongly connected to behavior composition. Code is hard to test when it directly creates time, randomness, external clients, files, network calls, or global state inside methods.

Hard to test:

```java
public boolean isExpired(Session session) {
    return Instant.now().isAfter(session.expiresAt());
}
```

Better:

```java
public final class SessionPolicy {
    private final Clock clock;

    public SessionPolicy(Clock clock) {
        this.clock = Objects.requireNonNull(clock);
    }

    public boolean isExpired(Session session) {
        return clock.instant().isAfter(session.expiresAt());
    }
}
```

`Clock` is a standard Java abstraction that makes time testable.

Hard to test:

```java
public Receipt checkout(Order order) {
    PaymentGateway gateway = new RealPaymentGateway();
    return gateway.charge(order.total());
}
```

Better:

```java
public final class CheckoutService {
    private final PaymentGateway gateway;

    public CheckoutService(PaymentGateway gateway) {
        this.gateway = Objects.requireNonNull(gateway);
    }

    public Receipt checkout(Order order) {
        return gateway.charge(order.total());
    }
}
```

| Hard-coded dependency                 | Better seam                                        |
| ------------------------------------- | -------------------------------------------------- |
| `Instant.now()`                       | `Clock`                                            |
| `new Random()` inside method          | injected `RandomGenerator` or deterministic source |
| `new RealClient()`                    | injected interface/client                          |
| static global state                   | constructor dependency or explicit context         |
| direct file path                      | `Path` parameter or storage abstraction            |
| direct environment access             | configuration object                               |
| direct thread creation                | executor abstraction                               |
| direct database call in domain method | repository/service boundary                        |

Testability does not require every class to have an interface. It requires seams where behavior varies or external effects occur.

| Testability goal         | Good design move             | Overdone version                      |
| ------------------------ | ---------------------------- | ------------------------------------- |
| Control time             | inject `Clock`               | wrap every standard class             |
| Replace external service | interface/gateway            | interface for every data class        |
| Verify domain rule       | pure method/domain object    | mock every collaborator               |
| Avoid global state       | constructor injection        | massive DI graph for trivial code     |
| Test parsing             | parser returns domain/result | test through full web stack only      |
| Test side effects        | isolate boundary             | assert private implementation details |

**Tempting but wrong mental model:** “To test Java code, every class needs an interface.”

**Surprising behavior or bug:** Tests become mock-heavy and brittle while domain logic remains poorly tested.

**Correct semantic explanation:** Testability comes from clear boundaries, deterministic inputs, and isolated side effects, not from interface count.

**Professional rule of thumb:** Create seams around time, randomness, I/O, persistence, external services, and policies. Keep pure domain behavior directly testable.

**Boundary where the rule changes:** Public libraries and plugins may need interfaces for API stability even before tests require substitutes.

**Common Pitfalls:**
Do not mock value objects. Do not inject trivial utilities just to satisfy a pattern. Do not directly call system time, random sources, or external services in logic that needs deterministic tests. Do not design only for unit tests while ignoring integration behavior.

### Control Asynchronous and Concurrent Behavior — tasks, executors, futures, virtual threads, cancellation

Java behavior can execute synchronously, asynchronously, concurrently, or in parallel. These terms should not be blurred.

| Term                   | Meaning in practice                                     | Java examples                        |
| ---------------------- | ------------------------------------------------------- | ------------------------------------ |
| Synchronous            | caller waits for result                                 | ordinary method call                 |
| Asynchronous           | caller can continue before result is ready              | `CompletableFuture`, callbacks       |
| Concurrent             | multiple tasks in progress over same time period        | threads, virtual threads, executors  |
| Parallel               | multiple tasks execute simultaneously on multiple cores | parallel computation, fork/join      |
| Nonblocking            | operation does not block current thread                 | NIO, async APIs                      |
| Blocking               | current thread waits                                    | file/network/database call           |
| Structured task design | task lifetime is bounded by scope                       | structured concurrency concepts/APIs |
| Cancellation           | task is asked to stop                                   | interruption, future cancellation    |

Simple executor use:

```java
ExecutorService executor = Executors.newFixedThreadPool(4);

Future<Result> future = executor.submit(() -> computeResult());

try {
    Result result = future.get();
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
    throw new RuntimeException("interrupted", e);
} catch (ExecutionException e) {
    throw new RuntimeException("task failed", e.getCause());
} finally {
    executor.shutdown();
}
```

Ignoring interruption is a serious Java concurrency mistake:

```java
try {
    future.get();
} catch (InterruptedException e) {
    // bad: swallowed interruption
}
```

Better:

```java
try {
    future.get();
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
    throw new RuntimeException("interrupted", e);
}
```

`CompletableFuture` composition:

```java
CompletableFuture<User> userFuture =
        CompletableFuture.supplyAsync(() -> repository.load(userId), executor);

CompletableFuture<EmailAddress> emailFuture =
        userFuture.thenApply(User::email);
```

This can be useful, but executor choice and exception handling matter.

Virtual-thread style:

```java
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<User> user = executor.submit(() -> userClient.load(userId));
    Future<Account> account = executor.submit(() -> accountClient.load(accountId));

    return new UserAccount(user.get(), account.get());
}
```

Virtual threads make blocking-style code more scalable for many I/O-heavy tasks, but they do not make shared mutable state safe.

| Async/concurrency choice | Best use                         | Caveat                            |
| ------------------------ | -------------------------------- | --------------------------------- |
| Ordinary method call     | local deterministic behavior     | caller blocks                     |
| Executor + `Future`      | task execution with result       | lifecycle and cancellation        |
| `CompletableFuture`      | async composition                | callback/executor complexity      |
| Virtual threads          | many blocking I/O tasks          | still need resource limits        |
| Parallel streams         | data-parallel operations         | side effects/order issues         |
| Concurrent collections   | shared data structure operations | compound invariants not automatic |
| Locks/synchronization    | guard shared mutable state       | deadlock/contention               |
| Atomics                  | simple lock-free state           | not full transaction logic        |

**Tempting but wrong mental model:** “Asynchronous means faster.”

**Surprising behavior or bug:** Async code is slower or less reliable due to thread-pool saturation, blocking, poor cancellation, exception loss, or shared-state races.

**Correct semantic explanation:** Asynchrony changes waiting and coordination. It does not remove work, dependencies, resource limits, or correctness constraints.

**Professional rule of thumb:** Use concurrency to express real independent work or scalable waiting. Always design cancellation, timeouts, exception handling, executor ownership, and shared-state safety.

**Boundary where the rule changes:** For CPU-bound work, thread count should relate to available cores. For I/O-bound work, virtual threads can support many blocking tasks, but downstream systems still impose limits.

**Common Pitfalls:**
Do not create unbounded concurrent work. Do not ignore `InterruptedException`. Do not use `parallelStream` for blocking I/O by default. Do not mutate shared non-thread-safe collections from concurrent tasks. Do not confuse virtual threads with unlimited external capacity.

### Composition Option Matrix — coupling, readability, maintainability

| Composition option   | Coupling level         | Readability              | Maintainability impact  | Best use                 | Failure mode            |
| -------------------- | ---------------------- | ------------------------ | ----------------------- | ------------------------ | ----------------------- |
| Inline expression    | lowest abstraction     | high for simple logic    | easy locally            | one-off simple behavior  | repeated logic          |
| Private method       | class-local            | high if well named       | improves local clarity  | named step               | vague extraction        |
| Static helper        | low object coupling    | medium                   | reusable if cohesive    | pure utility             | utility dumping ground  |
| Instance method      | object-coupled         | high if behavior belongs | preserves invariants    | domain behavior          | anemic model if absent  |
| Lambda               | context-coupled        | high when small          | flexible local behavior | filter/map/callback      | hidden side effects     |
| Functional interface | contract-coupled       | medium/high              | named behavior          | policy/callback          | generic API noise       |
| Strategy object      | collaborator-coupled   | high if domain-named     | replaceable behavior    | algorithms/policies      | class explosion         |
| Interface service    | architectural coupling | medium                   | boundary/testability    | external dependency      | interface proliferation |
| Abstract class       | inheritance coupling   | medium/low               | shared template         | framework/base algorithm | fragile base            |
| Annotation-driven    | framework coupling     | high superficially       | concise integration     | framework conventions    | invisible behavior      |
| Sealed hierarchy     | closed type coupling   | high for finite variants | exhaustive handling     | domain alternatives      | closed too early        |

### API Design Choice Table — readability, safety, flexibility

| API choice             | Readability      | Safety      | Flexibility | Better when                         | Worse when                 |
| ---------------------- | ---------------- | ----------- | ----------- | ----------------------------------- | -------------------------- |
| Domain parameter type  | high             | high        | medium      | concept has meaning                 | trivial local value        |
| Raw `String` parameter | medium           | low         | high        | raw external text                   | internal domain value      |
| Boolean flag           | low              | medium      | medium      | extremely local and obvious         | public API mode            |
| Enum mode              | high             | high        | medium      | finite modes                        | open extension needed      |
| `Optional<T>` return   | high             | high        | medium      | expected absence                    | absence is error           |
| Nullable return        | low              | low         | high        | legacy/framework constraint         | new API                    |
| Exception              | high for failure | medium/high | medium      | exceptional or recoverable boundary | ordinary absence           |
| Result type            | high             | high        | medium      | success/failure data needed         | simple failure             |
| Interface parameter    | medium           | high        | high        | behavior substitution               | no variation               |
| Concrete parameter     | high             | high        | low         | exact implementation needed         | abstraction desired        |
| `List<T>` return       | high             | medium      | medium      | ordered result                      | uniqueness needed          |
| `Stream<T>` return     | medium           | medium      | high        | lazy pipeline ownership clear       | resource/lifecycle unclear |
| Mutable return         | medium           | low         | high        | caller owns result                  | exposes internals          |
| Unmodifiable return    | high             | high        | medium      | API boundary                        | caller expected to mutate  |

### Behavior Failure Mode Index — common Java abstraction mistakes

| Failure mode                  | Symptom                                    | Root cause                               | Correction                                       |
| ----------------------------- | ------------------------------------------ | ---------------------------------------- | ------------------------------------------------ |
| Nested conditional pyramid    | deeply indented code                       | no guard clauses or extracted predicates | early return, named predicate, switch            |
| Stringly typed branching      | many string comparisons                    | finite state not modeled                 | enum or parser                                   |
| God service                   | one service does everything                | poor responsibility boundaries           | split workflow, domain behavior, policies        |
| Anemic domain model           | objects only have getters/setters          | behavior moved outside data              | put invariant-preserving behavior in domain type |
| Interface proliferation       | interface for every class                  | pattern imitation                        | keep interfaces for real variation/boundaries    |
| Static utility dumping ground | `Utils` class grows endlessly              | no domain placement                      | move behavior to domain/service/cohesive helper  |
| Inheritance misuse            | subclass for minor variation               | reuse confused with subtype              | composition or strategy                          |
| Large lambdas                 | unreadable stream/callback logic           | behavior lacks name                      | extract method or class                          |
| Stream abuse                  | side effects inside pipeline               | style over clarity                       | loop or pure stream pipeline                     |
| Hidden I/O                    | getter-like method blocks or calls network | effect not represented                   | rename and isolate boundary                      |
| Swallowed interruption        | catch does nothing                         | concurrency misunderstanding             | restore interrupt and propagate/handle           |
| Mock-heavy tests              | many fake interfaces                       | design optimized for mocking             | test domain directly, seam only external effects |
| Annotation magic              | behavior invisible in source               | framework overreliance                   | document and isolate framework boundaries        |
| Overloaded ambiguity          | confusing calls with `null`/boxing         | too many overloads                       | clearer names or parameter object                |
| Public API leakage            | internal mutable collection returned       | boundary not protected                   | defensive copy/unmodifiable view                 |
## PART 5 — Modules, Errors, Effects, Resources, and Boundaries by Task Pattern

### Orientation — boundary management, failure surfaces, resource discipline, effect visibility

Java programs become difficult not because every class is complex, but because boundaries are complex. A professional Java system must manage boundaries between packages, modules, APIs, persistence, external input, resources, threads, frameworks, dynamic behavior, native calls, and versioned dependencies.

`PART 5` treats Java as a boundary-management language. The central question is not merely “how do I write `try` or `package`?” but:

| Boundary question                          | Java mechanism                                             | Main professional risk            |
| ------------------------------------------ | ---------------------------------------------------------- | --------------------------------- |
| What code may see this type/member?        | `public`, `private`, package-private, `protected`, modules | accidental API exposure           |
| What is public contract vs implementation? | interfaces, classes, packages, modules, documentation      | unstable or leaky APIs            |
| What failure is recoverable?               | checked exceptions, unchecked exceptions, result types     | meaningless catch/throws patterns |
| What must be cleaned up?                   | `try-with-resources`, `AutoCloseable`, lifecycle APIs      | resource leaks                    |
| Where do side effects happen?              | method naming, service boundaries, repositories, clients   | hidden I/O or mutation            |
| Where does trust stop?                     | DTOs, validation, parsing, adapters                        | invalid data entering core logic  |
| Where is behavior dynamic or unchecked?    | reflection, annotations, raw types, proxies                | runtime surprises                 |
| What compatibility must be preserved?      | API design, binary compatibility, semantic versioning      | breaking downstream users         |
| What crosses runtime boundaries?           | classpath, module path, native access, serialization       | environment-dependent failure     |

Java’s language design gives strong tools for boundary expression, but it does not enforce all good boundary discipline. A `public` method can still expose mutable internals. A checked exception can still be ignored badly. A package can still contain unrelated responsibilities. An annotation can still hide a dangerous runtime dependency.

### Declare Module and Package Boundaries — packages, JPMS modules, source layout, architectural scope

Java uses packages as the primary namespace and access-control grouping mechanism. Since Java 9, the Java Platform Module System, often called `JPMS`, adds stronger module-level boundaries through `module-info.java`.

A package is declared at the top of a source file:

```java
package com.example.billing;

public final class InvoiceService {
}
```

A module is declared in `module-info.java`:

```java
module com.example.billing {
    requires java.sql;
    exports com.example.billing.api;
}
```

| Boundary level       | Mechanism                                        | What it controls                       | What it does not automatically control |
| -------------------- | ------------------------------------------------ | -------------------------------------- | -------------------------------------- |
| Class                | `private`, `public`, `final`, etc.               | member visibility and inheritance      | package architecture                   |
| Package              | `package` declaration and package-private access | namespace and same-package access      | dependency direction across packages   |
| Module               | `module-info.java`                               | readable modules and exported packages | all architectural quality              |
| Build artifact       | JAR, module, dependency                          | distribution and dependency graph      | source-level correctness               |
| Application boundary | service, process, container                      | deployment/runtime boundary            | internal design by itself              |

A package name should communicate architecture. Compare:

```text
com.example.user
com.example.order
com.example.payment
```

with:

```text
com.example.controllers
com.example.services
com.example.repositories
```

Layer-based packages may be useful, but domain-based packages often preserve cohesion better in large systems. The better structure depends on scale and architecture, not on a universal rule.

| Package style              | Strength                                       | Cost                         | Good when                       |
| -------------------------- | ---------------------------------------------- | ---------------------------- | ------------------------------- |
| Domain/feature package     | keeps related behavior together                | may duplicate layer concepts | domain boundaries are important |
| Technical-layer package    | separates controllers/services/repositories    | scatters feature logic       | framework conventions dominate  |
| API/internal package split | separates public contracts from implementation | requires discipline          | reusable libraries/services     |
| Deep hierarchy             | fine-grained navigation                        | can become ceremonial        | large, stable systems           |
| Flat package               | simple                                         | weak boundaries              | small modules                   |

A common pattern:

```text
com.example.billing.api
com.example.billing.internal
com.example.billing.spi
```

| Package    | Typical role                                      |
| ---------- | ------------------------------------------------- |
| `api`      | public-facing contracts, DTOs, interfaces         |
| `internal` | implementation details not meant for outside use  |
| `spi`      | service-provider interfaces for extension         |
| `model`    | domain model, if not already organized by feature |
| `config`   | configuration/wiring code                         |
| `adapter`  | external-system integration                       |

Package naming alone does not enforce all access. A package called `internal` is a convention unless module exports or build rules enforce it.

With JPMS, only exported packages are accessible to other modules:

```java
module com.example.billing {
    exports com.example.billing.api;

    requires com.example.common;
}
```

If implementation packages are not exported, other modules cannot access them through normal module rules.

| JPMS directive        | Meaning                                     | Example use                         |
| --------------------- | ------------------------------------------- | ----------------------------------- |
| `requires`            | this module depends on another module       | `requires java.sql;`                |
| `requires transitive` | dependency is exposed to downstream modules | API uses types from required module |
| `exports`             | package is accessible to other modules      | public API packages                 |
| `exports ... to`      | package exported only to selected modules   | controlled friend-like access       |
| `opens`               | package available for deep reflection       | frameworks needing reflection       |
| `opens ... to`        | reflection opened to selected modules       | safer framework integration         |
| `uses`                | consumes service                            | service loading                     |
| `provides ... with`   | supplies service implementation             | plugin/provider architecture        |

**Tempting but wrong mental model:** “A package name creates an architectural boundary.”

**Surprising behavior or bug:** Classes in another package still access public implementation classes because they are public and exported or on the classpath.

**Correct semantic explanation:** Packages organize names and package-private access. Modules can enforce stronger export/readability boundaries. Architecture also requires dependency discipline.

**Professional rule of thumb:** Use packages for cohesion and visibility; use modules or build rules when boundaries must be enforced; keep public APIs small.

**Boundary where the rule changes:** Many enterprise applications still run primarily on the classpath rather than as strict JPMS modules. In such systems, package naming and build-time dependency rules carry more boundary weight.

**Common Pitfalls:**
Do not make implementation classes `public` merely because tests or frameworks need access. Do not assume `internal` in a package name prevents use. Do not create deep package hierarchies that encode no real boundary. Do not use JPMS `opens` broadly when only a framework-specific package needs reflection.

### Organize Files, Packages, and Modules — source sets, build tools, test boundaries, generated code

Java source organization is strongly shaped by build tools. Maven and Gradle commonly separate production code, test code, resources, generated sources, and build output.

A typical Maven-like layout:

```text
src/main/java/com/example/billing/InvoiceService.java
src/main/resources/application.properties
src/test/java/com/example/billing/InvoiceServiceTest.java
src/test/resources/test-data.json
```

A typical module-aware source layout may include:

```text
src/main/java/module-info.java
src/main/java/com/example/billing/api/InvoiceApi.java
src/main/java/com/example/billing/internal/DefaultInvoiceService.java
```

| Source area          | Role                                 | Boundary meaning                            |
| -------------------- | ------------------------------------ | ------------------------------------------- |
| `src/main/java`      | production Java source               | shipped code                                |
| `src/main/resources` | production resources                 | configuration/data on classpath/module path |
| `src/test/java`      | test Java source                     | test-only access and fixtures               |
| `src/test/resources` | test resources                       | test data/config                            |
| generated sources    | annotation processors, codegen tools | tool-generated boundary                     |
| build output         | compiled classes/JARs                | distribution artifacts                      |

Test code often has broader access needs, but weakening production visibility for tests is usually a design smell. Prefer testing through public or package-private APIs when appropriate, or place tests in the same package to access package-private members without making them public.

```java
package com.example.billing;

class PriceCalculatorTest {
    // same package as package-private PriceCalculator
}
```

Generated code introduces another boundary. Annotation processors, serializers, ORMs, and API generators may create or transform source behavior. Generated code should be treated as a tool boundary: readable when debugging, but not manually edited.

| Organization issue                         | Better practice                                             |
| ------------------------------------------ | ----------------------------------------------------------- |
| Tests require publicizing internals        | use same-package tests or redesign API                      |
| Generated code mixed with handwritten code | separate source directories                                 |
| Framework config scattered everywhere      | isolate configuration packages                              |
| Package cycles                             | break with interface/API package or refactor responsibility |
| Test fixtures in production source         | move to test source set                                     |
| Resources accessed by raw file paths       | use classpath/module resource APIs when appropriate         |
| Multiple modules share internals           | create explicit shared API or rethink boundary              |

**Language-design note:** Java source organization is not specified entirely by the language. Build tools, IDEs, test frameworks, annotation processors, and deployment formats shape the effective structure of Java projects.

**Common Pitfalls:**
Do not modify generated code manually. Do not place test-only helpers in production source. Do not make production APIs public only for tests. Do not allow package cycles to hide architectural confusion.

### Control Visibility — `private`, package-private, `protected`, `public`, exported packages

Visibility is Java’s first line of boundary control. The default should not be `public`; the default should be **as private as practical**.

| Visibility      | Scope                         | Best use                           | Main risk                                   |
| --------------- | ----------------------------- | ---------------------------------- | ------------------------------------------- |
| `private`       | declaring class               | implementation details             | over-isolation when collaboration is needed |
| package-private | same package                  | internal package collaboration     | package becomes too broad                   |
| `protected`     | same package plus subclasses  | carefully designed extension hooks | often misunderstood                         |
| `public`        | all accessible code           | stable API                         | accidental long-term commitment             |
| exported public | public and exported by module | module-level API                   | stronger compatibility burden               |
| opened package  | reflection access             | framework integration              | weakens encapsulation                       |

A well-encapsulated class:

```java
public final class Account {
    private final AccountId id;
    private Money balance;

    public Account(AccountId id, Money openingBalance) {
        this.id = Objects.requireNonNull(id);
        this.balance = Objects.requireNonNull(openingBalance);
    }

    public AccountId id() {
        return id;
    }

    public Money balance() {
        return balance;
    }

    public void deposit(Money amount) {
        requirePositive(amount);
        balance = balance.plus(amount);
    }
}
```

The class exposes behavior and stable queries, not arbitrary field mutation.

A leaky class:

```java
public final class Account {
    public AccountId id;
    public Money balance;
}
```

This allows any caller to violate invariants.

Package-private helper:

```java
final class AccountNumberParser {
    AccountNumber parse(String input) {
        return new AccountNumber(input);
    }
}
```

This helper is visible only within its package. It does not need to be `public`.

`protected` deserves caution. It is not “private to subclasses.” It also allows access from the same package. It creates an extension contract.

```java
public abstract class Template {
    public final void run() {
        before();
        execute();
        after();
    }

    protected void before() {
    }

    protected abstract void execute();

    protected void after() {
    }
}
```

Here, `protected` methods are intentional extension hooks. They must be designed and documented.

| Visibility decision   | Good reason                    | Bad reason                    |
| --------------------- | ------------------------------ | ----------------------------- |
| `private` field       | preserve invariants            | none; usually correct         |
| package-private class | internal package collaboration | hiding disorganized package   |
| `protected` method    | subclass extension point       | test access or convenience    |
| `public` method       | stable external API            | “might be useful later”       |
| exported package      | public module contract         | accidental framework scanning |
| `opens` package       | needed reflective access       | broad convenience             |

**Tempting but wrong mental model:** “Public means reusable.”

**Surprising behavior or bug:** A public method becomes depended on by external code and cannot be changed without breaking compatibility.

**Correct semantic explanation:** Public visibility creates an API surface. API surface creates maintenance obligations.

**Professional rule of thumb:** Expose the smallest surface that lets correct clients do their work. Keep implementation details private, package-private, or non-exported.

**Boundary where the rule changes:** Some frameworks require reflective access to constructors, fields, or methods. Prefer narrow `opens ... to` module directives or framework-specific configuration when possible.

**Common Pitfalls:**
Do not use `protected` for testing convenience. Do not make classes public because the IDE generated them that way. Do not expose mutable fields. Do not confuse visibility with security. Do not export packages that are not intended as APIs.

### Separate Public API from Implementation — interfaces, DTOs, internal classes, adapters

A public API should express what clients need to know, not how the system happens to implement it. Java gives several mechanisms for separating API and implementation.

| Boundary task            | Java mechanism                              | Example                           |
| ------------------------ | ------------------------------------------- | --------------------------------- |
| Expose behavior contract | interface                                   | `PaymentGateway`                  |
| Hide implementation      | package-private class, non-exported package | `DefaultPaymentGateway`           |
| Expose stable data shape | record/DTO                                  | `PaymentRequest`                  |
| Hide persistence model   | mapper/adapter                              | entity ↔ domain                   |
| Hide external client     | gateway interface                           | HTTP client behind service        |
| Hide framework wiring    | configuration class                         | framework annotations isolated    |
| Hide generated code      | adapter layer                               | generated schema types translated |

API package:

```java
package com.example.payment.api;

public interface PaymentGateway {
    PaymentResult charge(PaymentRequest request);
}
```

Implementation package:

```java
package com.example.payment.internal;

final class HttpPaymentGateway implements PaymentGateway {
    @Override
    public PaymentResult charge(PaymentRequest request) {
        // HTTP integration
        return PaymentResult.success("tx-001");
    }
}
```

If using modules:

```java
module com.example.payment {
    exports com.example.payment.api;

    requires java.net.http;
}
```

The internal implementation package is not exported.

Do not expose implementation-specific types in API signatures:

```java
public HttpPaymentResponse charge(HttpPaymentRequest request) {
    // leaks transport implementation
}
```

Prefer domain/API types:

```java
public PaymentResult charge(PaymentRequest request) {
    // hides transport implementation
}
```

| API leakage                               | Why it is harmful                    | Better boundary       |
| ----------------------------------------- | ------------------------------------ | --------------------- |
| Return `ArrayList<T>`                     | exposes implementation choice        | return `List<T>`      |
| Accept `HashMap<K,V>`                     | over-specifies caller data structure | accept `Map<K,V>`     |
| Expose ORM entity                         | couples domain/API to persistence    | DTO/domain record     |
| Expose HTTP client type                   | couples service to transport         | gateway interface     |
| Expose framework annotation in core model | couples domain to framework          | adapter/DTO           |
| Return mutable internal collection        | leaks representation                 | unmodifiable copy     |
| Throw low-level exception                 | leaks implementation                 | translate at boundary |

Boundary translation:

```java
public final class PaymentAdapter {
    private final ExternalPaymentClient client;

    public PaymentAdapter(ExternalPaymentClient client) {
        this.client = Objects.requireNonNull(client);
    }

    public PaymentResult charge(PaymentRequest request) {
        ExternalPaymentRequest external = toExternal(request);

        try {
            ExternalPaymentResponse response = client.charge(external);
            return toDomain(response);
        } catch (ExternalPaymentException e) {
            throw new PaymentGatewayException("payment provider failed", e);
        }
    }
}
```

The rest of the system does not need to know the external provider’s request/response classes.

**Tempting but wrong mental model:** “If the implementation type is convenient, expose it.”

**Surprising behavior or bug:** Changing an HTTP library, ORM mapping, or collection implementation becomes an API-breaking change.

**Correct semantic explanation:** Public signatures freeze dependencies. Implementation types in signatures become part of the contract.

**Professional rule of thumb:** Expose domain contracts and stable abstractions; keep implementation-specific types behind adapters.

**Boundary where the rule changes:** Internal application layers may tolerate implementation exposure if the codebase is small and cohesive. Public libraries and multi-team systems should be stricter.

**Common Pitfalls:**
Do not return concrete mutable collections unnecessarily. Do not let persistence entities become external API objects by default. Do not throw low-level implementation exceptions through high-level APIs. Do not let framework annotations define the core domain model unless the domain is intentionally framework-bound.

### Handle Failure — checked exceptions, unchecked exceptions, result types, domain errors

Java’s error model is mixed. It has checked exceptions, unchecked exceptions, `Error`, assertions, `Optional`, result-like objects, and framework-specific error conventions. Choosing the right mechanism depends on whether the failure is expected, recoverable, exceptional, local, domain-specific, or boundary-specific.

| Failure kind                  | Typical Java mechanism          | Example                    | Main caveat                      |
| ----------------------------- | ------------------------------- | -------------------------- | -------------------------------- |
| Invalid argument              | unchecked exception             | `IllegalArgumentException` | message should be meaningful     |
| Invalid object state          | unchecked exception             | `IllegalStateException`    | may reveal poor lifecycle design |
| Expected absence              | `Optional<T>`                   | `findUser`                 | avoid `Optional.get()` misuse    |
| Recoverable I/O failure       | checked exception               | `IOException`              | avoid meaningless wrapping       |
| Domain failure with data      | result type or domain exception | `PaymentResult`            | choose one convention            |
| Programming bug               | unchecked exception/assertion   | impossible branch          | do not hide                      |
| Serious VM/system failure     | `Error`                         | `OutOfMemoryError`         | usually not application-handled  |
| Validation failure collection | validation result               | form/API validation        | requires design                  |
| External service failure      | translated exception/result     | gateway failure            | preserve cause and context       |

Checked exception:

```java
public String readConfig(Path path) throws IOException {
    return Files.readString(path);
}
```

Unchecked precondition failure:

```java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("age must not be negative");
    }
    this.age = age;
}
```

Expected absence:

```java
public Optional<User> findUser(UserId id) {
    return Optional.ofNullable(users.get(id));
}
```

Domain result:

```java
public sealed interface PaymentResult
        permits PaymentResult.Success, PaymentResult.Failure {

    record Success(String transactionId) implements PaymentResult {
    }

    record Failure(String reason) implements PaymentResult {
    }
}
```

Use:

```java
PaymentResult result = gateway.charge(request);

switch (result) {
    case PaymentResult.Success success ->
            order.markPaid(success.transactionId());
    case PaymentResult.Failure failure ->
            order.markPaymentFailed(failure.reason());
}
```

| Use checked exception when                                  | Use unchecked exception when                                   | Use result type when                                |
| ----------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| caller can meaningfully recover or must acknowledge failure | caller violated contract or failure is not locally recoverable | success/failure is part of ordinary domain workflow |
| failure is part of API contract                             | failure indicates bug or invalid state                         | failure needs data and pattern handling             |
| boundary is low-level I/O or parse-like operation           | broad propagation is acceptable                                | caller frequently branches on outcome               |
| Java standard API already uses checked exception            | checked signature would pollute layers                         | multiple outcomes are expected                      |

A poor checked-exception design:

```java
public void updateUser(User user) throws Exception {
}
```

This tells the caller almost nothing.

A better design:

```java
public void updateUser(User user) throws UserUpdateException {
}
```

or:

```java
public UpdateResult updateUser(User user) {
}
```

depending on whether failure is exceptional or part of normal workflow.

Exception translation at boundary:

```java
public User loadUser(UserId id) {
    try {
        return externalClient.fetchUser(id.value());
    } catch (ExternalClientException e) {
        throw new UserDirectoryException("failed to load user " + id, e);
    }
}
```

The cause is preserved. The domain-level exception hides low-level dependency details from callers.

**Tempting but wrong mental model:** “Checked means recoverable; unchecked means unrecoverable.”

**Surprising behavior or bug:** A checked exception is caught and ignored, while an unchecked exception may be the right way to report a contract violation.

**Correct semantic explanation:** Checkedness is a compile-time handling requirement, not a perfect semantic classification. Design must still decide recovery boundaries.

**Professional rule of thumb:** Use exceptions for exceptional control transfer or contract violations; use `Optional` for expected absence; use domain result types when success/failure is ordinary workflow data.

**Boundary where the rule changes:** Frameworks may impose exception conventions. For example, web frameworks often translate exceptions into HTTP responses, and transaction frameworks may treat checked and unchecked exceptions differently by convention.

**Common Pitfalls:**
Do not catch exceptions just to log and continue. Do not throw `Exception` or `RuntimeException` when a specific type communicates meaning. Do not use exceptions for ordinary collection lookup absence. Do not lose the cause when wrapping exceptions.

### Represent Recoverable and Unrecoverable Errors — recovery boundaries, propagation, translation

The most important error-handling question is: **who can make a meaningful decision here?**

If the current method can recover, it should recover. If it cannot recover but can add context, it should translate or propagate. If the failure represents invalid input, it should reject. If the failure represents an impossible state, it should fail clearly.

| Situation                    | Better action                     | Example                    |
| ---------------------------- | --------------------------------- | -------------------------- |
| Method can retry             | retry with policy                 | transient external failure |
| Method can choose fallback   | fallback explicitly               | optional config source     |
| Method can reject input      | throw validation exception/result | invalid request            |
| Method can add context       | wrap/translate exception          | low-level client failure   |
| Method cannot decide         | propagate                         | caller owns policy         |
| Top-level boundary           | log/respond/terminate             | HTTP handler, CLI main     |
| Programming invariant broken | throw unchecked exception         | impossible branch          |
| JVM/system failure           | usually do not catch              | `OutOfMemoryError`         |

A bad catch:

```java
try {
    process(input);
} catch (Exception e) {
    // ignore
}
```

This hides failure.

A better boundary catch:

```java
try {
    process(input);
} catch (InvalidInputException e) {
    return Response.badRequest(e.getMessage());
} catch (ProcessingException e) {
    logger.error("processing failed for request {}", requestId, e);
    return Response.serverError();
}
```

This catch occurs at a boundary that can translate failure into an external response.

Recovery with fallback:

```java
public Config loadConfig() {
    try {
        return configFile.load();
    } catch (IOException e) {
        logger.warn("failed to load config file; using defaults", e);
        return Config.defaults();
    }
}
```

This is valid only if defaults are a safe and intentional fallback.

Exception propagation with context:

```java
public Report loadReport(ReportId id) {
    try {
        return reportStore.load(id);
    } catch (IOException e) {
        throw new ReportLoadException("failed to load report " + id, e);
    }
}
```

| Error design smell                          | Why it is bad          | Better design                           |
| ------------------------------------------- | ---------------------- | --------------------------------------- |
| `catch (Exception e) {}`                    | swallows all failures  | catch specific type and act             |
| log-and-rethrow everywhere                  | duplicate noisy logs   | log at meaningful boundary              |
| wrapping without cause                      | loses diagnostic data  | include original cause                  |
| generic error message                       | hard to debug          | include safe context                    |
| fallback by default                         | hides real failure     | fallback only by policy                 |
| checked exception through all layers        | API pollution          | translate at boundary                   |
| unchecked exception for expected user error | poor external handling | validation result or specific exception |
| converting all errors to `Optional.empty()` | loses failure reason   | distinguish absence from failure        |

**Tempting but wrong mental model:** “Handle exceptions as close as possible.”

**Surprising behavior or bug:** Low-level code catches failure without enough context and makes the wrong recovery decision.

**Correct semantic explanation:** Exceptions should be handled where there is enough context to decide what failure means.

**Professional rule of thumb:** Catch at decision boundaries, not merely at lexical proximity.

**Boundary where the rule changes:** Resource cleanup should be close to acquisition. That is why `try-with-resources` is local even when error handling is not.

**Common Pitfalls:**
Do not swallow exceptions. Do not log the same exception at every layer. Do not convert every failure into a boolean or `Optional`. Do not catch `Throwable` except in very specialized top-level or infrastructure code.

### Manage Resources — `try-with-resources`, `AutoCloseable`, lifecycle, cleanup guarantees

Garbage collection manages memory. It does not close files, sockets, database connections, locks, streams, native handles, or other external resources. Resource management is therefore a separate boundary discipline.

The standard Java pattern is `try-with-resources`:

```java
public String readFirstLine(Path path) throws IOException {
    try (BufferedReader reader = Files.newBufferedReader(path)) {
        return reader.readLine();
    }
}
```

The resource must implement `AutoCloseable` or `Closeable`.

| Resource              | Typical API                                   |       Must close? | Common leak                            |
| --------------------- | --------------------------------------------- | ----------------: | -------------------------------------- |
| File stream           | `InputStream`, `OutputStream`                 |               yes | not closing on exception               |
| Reader/writer         | `Reader`, `Writer`                            |               yes | forgetting charset/buffering           |
| Socket                | `Socket`, HTTP client resources depending API |             often | connection exhaustion                  |
| Database connection   | `Connection`                                  |               yes | pool exhaustion                        |
| JDBC statement/result | `Statement`, `ResultSet`                      |               yes | cursor/resource leak                   |
| Native memory/session | FFM/native APIs                               |               yes | off-heap leak                          |
| Lock                  | `Lock`                                        |   unlock required | missing `finally`                      |
| Executor service      | `ExecutorService`                             | shutdown required | thread leak                            |
| Stream from I/O       | `Files.lines(path)`                           |               yes | assuming stream is ordinary collection |

Multiple resources:

```java
public void copy(Path source, Path target) throws IOException {
    try (
            InputStream in = Files.newInputStream(source);
            OutputStream out = Files.newOutputStream(target)
    ) {
        in.transferTo(out);
    }
}
```

The resources are closed automatically in reverse order.

Manual cleanup with `finally` is still relevant for non-`AutoCloseable` protocols:

```java
Lock lock = new ReentrantLock();
lock.lock();

try {
    updateSharedState();
} finally {
    lock.unlock();
}
```

For closeable resources, prefer `try-with-resources` over manual `finally`.

Suppressed exceptions matter. If both the try block and close operation throw, Java preserves the close exception as a suppressed exception on the primary exception.

```java
try (ProblematicResource resource = new ProblematicResource()) {
    resource.use();
}
```

This is why `try-with-resources` is safer than ad hoc cleanup logic.

Custom resource:

```java
public final class Lease implements AutoCloseable {
    private final Lock lock;

    public Lease(Lock lock) {
        this.lock = Objects.requireNonNull(lock);
        this.lock.lock();
    }

    @Override
    public void close() {
        lock.unlock();
    }
}
```

Usage:

```java
try (Lease ignored = new Lease(lock)) {
    updateSharedState();
}
```

This pattern can express scoped resource ownership, but it should be used carefully so `close` semantics are obvious.

| Resource pattern           | Guarantee                               | Cost                            |
| -------------------------- | --------------------------------------- | ------------------------------- |
| `try-with-resources`       | automatic close on all exits            | requires `AutoCloseable`        |
| `finally` cleanup          | manual guaranteed block                 | easy to get wrong               |
| object finalization        | obsolete/dangerous historical mechanism | not deterministic               |
| cleaner-like mechanisms    | fallback cleanup                        | not prompt or primary lifecycle |
| explicit `close` method    | caller-controlled lifecycle             | caller may forget               |
| container-managed resource | framework controls lifecycle            | lifecycle hidden                |
| pool                       | reuse expensive resource                | exhaustion if not returned      |

**Tempting but wrong mental model:** “The garbage collector will clean it up.”

**Surprising behavior or bug:** Memory is reclaimed but file descriptors, database connections, sockets, or native resources remain exhausted.

**Correct semantic explanation:** GC reclaims unreachable heap objects. External resources require explicit lifecycle management.

**Professional rule of thumb:** Acquire resources in the smallest practical scope and release them with `try-with-resources` or `finally`.

**Boundary where the rule changes:** Some long-lived resources are intentionally owned by application lifecycle components. They still need explicit shutdown policy.

**Common Pitfalls:**
Do not rely on finalization for cleanup. Do not return a stream backed by an open file unless ownership is clear. Do not forget to shut down executors you create. Do not catch cleanup exceptions blindly. Do not hold locks while performing slow I/O unless deliberately designed.

### Express Side Effects — method naming, command/query separation, mutation boundaries

Java does not mark pure and impure functions in the type system. A method call can compute a value, mutate an object, write a database, send an email, block on network I/O, publish an event, acquire a lock, or do all of these. Therefore side effects must be made visible through API design.

| Effect kind          | Example method                               | Visibility strategy           |
| -------------------- | -------------------------------------------- | ----------------------------- |
| Pure-ish computation | `calculateTotal`                             | return value, no hidden I/O   |
| Object mutation      | `order.cancel()`                             | verb names state transition   |
| Persistence          | `repository.save(order)`                     | repository/gateway boundary   |
| External I/O         | `client.fetchUser(id)`                       | client/gateway naming         |
| Event publication    | `publisher.publish(event)`                   | explicit side-effect API      |
| Logging              | `logger.info(...)`                           | boundary or diagnostic action |
| Metrics              | `metrics.increment(...)`                     | observability concern         |
| Cache mutation       | `cache.put(key, value)`                      | explicit cache API            |
| Locking              | `lock.lock()`                                | scoped/try-finally discipline |
| Transaction          | framework annotation or explicit transaction | boundary must be known        |

Command-query separation is a useful heuristic:

| Method type         | Should do                         | Should avoid                          |
| ------------------- | --------------------------------- | ------------------------------------- |
| Query               | return information                | surprising mutation or external write |
| Command             | perform state change              | unclear return semantics              |
| Command with result | perform action and report outcome | hidden unrelated effects              |

Query-like method:

```java
public Money total() {
    return lines.stream()
            .map(OrderLine::subtotal)
            .reduce(Money.zero(currency), Money::plus);
}
```

Command-like method:

```java
public void cancel() {
    if (!canCancel()) {
        throw new IllegalStateException("order cannot be cancelled");
    }
    status = OrderStatus.CANCELLED;
}
```

A dangerous query:

```java
public User getUser(UserId id) {
    User user = remoteClient.fetch(id);
    auditLog.record("loaded user " + id);
    return user;
}
```

This may be acceptable in some service context, but `getUser` hides remote I/O and audit side effects. A clearer name might be:

```java
public User fetchAndAuditUser(UserId id) {
    User user = remoteClient.fetch(id);
    auditLog.record("loaded user " + id);
    return user;
}
```

or split the concerns.

| Naming cue                             | Expected effect                                                |
| -------------------------------------- | -------------------------------------------------------------- |
| `calculate`, `format`, `derive`        | mostly computation                                             |
| `find`, `lookup`                       | may return absence, usually query                              |
| `load`, `fetch`                        | may perform I/O                                                |
| `save`, `persist`, `update`            | writes state                                                   |
| `send`, `publish`, `emit`              | external side effect                                           |
| `validate`                             | checks input; return/throw policy should be clear              |
| `ensure`, `require`                    | may throw if condition not met                                 |
| `initialize`, `start`, `stop`, `close` | lifecycle effect                                               |
| `get`                                  | should be cheap/property-like unless convention says otherwise |

Side effects should be placed at boundaries where failure, retry, transaction, idempotency, and observability can be controlled.

| Side-effect boundary | Design concern                                   |
| -------------------- | ------------------------------------------------ |
| Database write       | transaction, locking, consistency                |
| External HTTP call   | timeout, retry, circuit breaking, authentication |
| File write           | atomicity, permissions, encoding                 |
| Email/message send   | idempotency, duplicate delivery                  |
| Event publish        | ordering, transaction coupling                   |
| Cache update         | invalidation and staleness                       |
| Logging              | sensitive data leakage                           |
| Metrics              | cardinality and overhead                         |

**Tempting but wrong mental model:** “A method’s side effects are obvious from its body.”

**Surprising behavior or bug:** Callers use a method as if it were cheap and pure, but it performs I/O, blocks, logs sensitive data, or mutates shared state.

**Correct semantic explanation:** Java method signatures do not encode effects. Naming, types, exceptions, documentation, and architecture must carry effect information.

**Professional rule of thumb:** Make side effects visible in names and boundaries. Keep computation separable from external effects when feasible.

**Boundary where the rule changes:** Some framework methods have conventional names that imply effects within that ecosystem. The convention should still be documented or obvious to experienced maintainers.

**Common Pitfalls:**
Do not hide remote calls behind property-like getters. Do not mutate object state inside methods named like queries. Do not publish events inside low-level helpers without making the event boundary explicit. Do not log sensitive values as a side effect of normal formatting.
### Define Trust Boundaries — external input, internal domain, authorization, validation, adapters

A trust boundary is any point where data, behavior, identity, or execution context crosses from a less trusted region into a more trusted region. In Java, trust boundaries usually appear at web controllers, command-line entry points, file readers, message consumers, database reads, deserialization, reflection, dependency injection, native calls, and plugin systems.

| Trust boundary      | Incoming form                   | Main risk                                   | Boundary strategy                           |
| ------------------- | ------------------------------- | ------------------------------------------- | ------------------------------------------- |
| HTTP request        | strings, JSON, multipart data   | invalid fields, injection, spoofed identity | DTO → validation → domain command           |
| CLI input           | `String[]`                      | malformed options, wrong units              | parser → typed command                      |
| Environment/config  | strings/files                   | missing values, wrong type, secret exposure | typed config object                         |
| File input          | bytes/text                      | encoding, size, malicious content           | bounded read, parse, validate               |
| Database            | rows/entities                   | nulls, stale schema, inconsistent state     | repository translation and validation       |
| Message queue       | bytes/JSON/protobuf             | version mismatch, replay, invalid payload   | schema/version check and domain translation |
| External API        | response DTO                    | partial failure, incompatible schema        | gateway adapter                             |
| Reflection          | `Object`, `Method`, `Field`     | runtime type failure, access violation      | narrow reflective boundary                  |
| Native interop      | memory handles/native resources | memory/resource safety                      | wrapper and lifecycle discipline            |
| Framework injection | proxy or generated object       | hidden lifecycle and behavior               | explicit contracts and tests                |

A weak boundary:

```java
public void createUser(Map<String, Object> requestBody) {
    String email = (String) requestBody.get("email");
    userService.create(email);
}
```

A stronger boundary:

```java
public record CreateUserRequest(String email, String displayName) {
}

public record CreateUserCommand(EmailAddress email, DisplayName displayName) {
}

public CreateUserCommand toCommand(CreateUserRequest request) {
    Objects.requireNonNull(request, "request");

    EmailAddress email = EmailAddress.parse(request.email())
            .orElseThrow(() -> new InvalidRequestException("invalid email"));

    DisplayName displayName = DisplayName.parse(request.displayName())
            .orElseThrow(() -> new InvalidRequestException("invalid display name"));

    return new CreateUserCommand(email, displayName);
}
```

The DTO is the transport shape. The command is the validated domain intent. The domain service should not need to know whether the original data came from JSON, CLI arguments, a message queue, or a test fixture.

| Boundary layer       |  Should it trust input? | Role                                    |
| -------------------- | ----------------------: | --------------------------------------- |
| Transport DTO        |                      no | represent external shape                |
| Parser/validator     |                      no | reject or translate                     |
| Domain command/value | yes, after construction | represent valid internal meaning        |
| Domain service       |              mostly yes | execute rules over valid types          |
| Repository/gateway   |               partially | translate external/persistent data      |
| Framework object     |           no by default | integration mechanism, not domain proof |

Authorization is distinct from validation. Validation asks whether a value is well-formed and semantically acceptable. Authorization asks whether the actor may perform the action.

```java
public void cancelOrder(UserId actor, OrderId orderId) {
    User user = users.require(actor);
    Order order = orders.require(orderId);

    if (!policy.canCancel(user, order)) {
        throw new ForbiddenException("user may not cancel this order");
    }

    order.cancel();
    orders.save(order);
}
```

Do not hide authorization inside a low-level parser. A valid `OrderId` does not mean the caller may access that order.

| Concern           | Example question                    | Proper location                 |
| ----------------- | ----------------------------------- | ------------------------------- |
| Syntax validation | Is this a UUID-shaped string?       | parser/value factory            |
| Domain validation | Is this order cancellable?          | domain object/service           |
| Authorization     | May this user cancel this order?    | policy/service boundary         |
| Authentication    | Who is the caller?                  | security/session boundary       |
| Consistency       | Has the order changed concurrently? | repository/transaction boundary |
| Auditing          | Should this action be recorded?     | application boundary            |

**Tempting but wrong mental model:** “Validated input is trusted input.”

**Surprising behavior or bug:** A request contains syntactically valid values, but the caller is not authorized to use them.

**Correct semantic explanation:** Validation, authentication, authorization, consistency, and auditing are separate boundary concerns.

**Professional rule of thumb:** Parse and validate external shape first; authorize actions separately; translate into domain types before core logic.

**Boundary where the rule changes:** In purely internal helper methods, repeated validation may be unnecessary if all callers already operate on validated domain types. This assumption should remain local and intentional.

**Common Pitfalls:**
Do not pass raw request DTOs deep into domain logic. Do not confuse a valid ID with permission to access the resource. Do not let external strings remain as internal status, role, or type markers. Do not perform security checks only in the UI or client.

### Handle External Input — parsing, normalization, rejection, error reporting

External input should be handled as a staged process: receive, bound, parse, normalize, validate, authorize if needed, translate, then execute. Java code becomes safer when each stage has a clear object type.

| Stage     | Purpose                                 | Example                          |
| --------- | --------------------------------------- | -------------------------------- |
| Receive   | obtain raw input                        | HTTP body, CLI args, file bytes  |
| Bound     | apply size/time/resource limits         | max file size, timeout           |
| Parse     | turn raw representation into Java shape | JSON DTO, integer parse          |
| Normalize | canonicalize where appropriate          | trim, case fold, normalize path  |
| Validate  | enforce constraints                     | non-empty name, valid date range |
| Translate | create domain type                      | `EmailAddress`, `OrderId`        |
| Authorize | check actor/action/resource             | policy check                     |
| Execute   | perform use case                        | service method                   |
| Report    | produce boundary-specific output        | HTTP response, CLI error         |

Parser design:

```java
public record PageSize(int value) {
    private static final int MIN = 1;
    private static final int MAX = 100;

    public PageSize {
        if (value < MIN || value > MAX) {
            throw new IllegalArgumentException("page size must be between 1 and 100");
        }
    }

    public static Optional<PageSize> parse(String input) {
        try {
            return Optional.of(new PageSize(Integer.parseInt(input)));
        } catch (NumberFormatException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }
}
```

Boundary use:

```java
public SearchCommand parseSearch(Map<String, String> params) {
    String query = params.getOrDefault("q", "").trim();

    if (query.isBlank()) {
        throw new InvalidRequestException("query must not be blank");
    }

    PageSize pageSize = PageSize.parse(params.getOrDefault("pageSize", "20"))
            .orElseThrow(() -> new InvalidRequestException("invalid page size"));

    return new SearchCommand(new SearchText(query), pageSize);
}
```

Normalization should be deliberate. Lowercasing an email-like value, trimming a display name, normalizing Unicode, resolving a path, or canonicalizing a URI can change meaning.

| Input type       | Common normalization                     | Caveat                                   |
| ---------------- | ---------------------------------------- | ---------------------------------------- |
| username         | trim, case policy                        | case sensitivity may be domain-specific  |
| email            | trim, limited normalization              | full email semantics are complex         |
| path             | normalize/resolve                        | path traversal and symlinks matter       |
| locale text      | Unicode normalization                    | user-visible changes possible            |
| currency code    | uppercase                                | validate against `Currency`              |
| enum-like status | trim and uppercase                       | external code mapping should be explicit |
| search query     | trim                                     | do not over-normalize user intent        |
| password         | usually no trimming unless policy states | changing password input is dangerous     |

Input rejection should preserve useful but safe context:

```java
throw new InvalidRequestException("invalid pageSize: must be an integer between 1 and 100");
```

Avoid leaking secrets or unsafe raw payloads in logs:

```java
logger.warn("invalid login request for username={}", username);
```

Do not log raw passwords, tokens, full credit-card data, session cookies, or large untrusted bodies.

| Reporting target   | Good error style                          |
| ------------------ | ----------------------------------------- |
| User-facing API    | clear, safe, non-internal message         |
| Logs               | diagnostic context without sensitive data |
| Metrics            | aggregated failure category               |
| Audit trail        | actor/action/resource/outcome             |
| Internal exception | preserve cause and stack trace            |

**Tempting but wrong mental model:** “Parsing is just converting strings.”

**Surprising behavior or bug:** Parsed values pass type checks but contain wrong units, unsafe paths, invalid states, or unauthorized resource references.

**Correct semantic explanation:** Parsing creates a Java representation; validation and authorization determine whether that representation is acceptable for the intended use.

**Professional rule of thumb:** Parse near the boundary, validate before domain entry, and log/report failures without leaking sensitive data.

**Boundary where the rule changes:** Internal machine-generated data from a strictly controlled schema may need less defensive validation, but versioning and compatibility checks still matter.

**Common Pitfalls:**
Do not normalize secrets unexpectedly. Do not log entire raw requests. Do not treat `Integer.parseInt` success as full validation. Do not let invalid values become partially constructed domain objects.

### Isolate Unsafe, Dynamic, or Unchecked Behavior — casts, raw types, reflection, proxies, native access

Java is mostly type-safe in ordinary source code, but several mechanisms weaken static guarantees: unchecked casts, raw types, reflection, serialization, dynamic proxies, annotation-driven frameworks, native interop, and some generic varargs patterns. These mechanisms are not inherently wrong. They should be isolated.

| Mechanism           | Why it weakens guarantees                 | Proper containment                          |
| ------------------- | ----------------------------------------- | ------------------------------------------- |
| Raw type            | bypasses generic checking                 | legacy adapter only                         |
| Unchecked cast      | compiler cannot prove type safety         | tiny scope with validation                  |
| Reflection          | runtime lookup/invocation                 | framework/adapter boundary                  |
| Dynamic proxy       | behavior generated at runtime             | interface contract tests                    |
| Serialization       | object construction outside ordinary flow | validation after read                       |
| Generic varargs     | possible heap pollution                   | safe API design, careful annotation         |
| Native interop      | memory/resource outside Java safety       | wrapper and lifecycle ownership             |
| Framework injection | runtime wiring                            | constructor contracts and integration tests |

Unchecked cast, poorly scoped:

```java
@SuppressWarnings("unchecked")
public List<UserId> loadIds() {
    return (List<UserId>) legacyApi.load();
}
```

Better:

```java
public List<UserId> loadIds() {
    Object raw = legacyApi.load();

    if (!(raw instanceof List<?> list)) {
        throw new IllegalStateException("legacy API did not return a list");
    }

    List<UserId> result = new ArrayList<>();
    for (Object item : list) {
        if (!(item instanceof String text)) {
            throw new IllegalStateException("legacy ID is not a string");
        }
        result.add(new UserId(text));
    }

    return List.copyOf(result);
}
```

Reflection wrapper:

```java
public final class ReflectiveInvoker {
    public Object invoke(Method method, Object target, Object... args) {
        try {
            return method.invoke(target, args);
        } catch (IllegalAccessException e) {
            throw new IllegalStateException("method is not accessible: " + method, e);
        } catch (InvocationTargetException e) {
            Throwable cause = e.getCause();
            if (cause instanceof RuntimeException runtime) {
                throw runtime;
            }
            if (cause instanceof Error error) {
                throw error;
            }
            throw new RuntimeException("method invocation failed: " + method, cause);
        }
    }
}
```

This wrapper gives reflection failure a controlled shape. The rest of the application should not casually manipulate `Method`, `Field`, or raw `Object` values.

Dynamic proxies and annotation-driven frameworks require an additional mental model: the object at runtime may not be a plain instance of the source class. It may be a proxy that intercepts calls for transactions, security, caching, lazy loading, metrics, or remote invocation.

| Framework/dynamic effect | Consequence                                       |
| ------------------------ | ------------------------------------------------- |
| Transaction proxy        | method call may start/commit/rollback transaction |
| Lazy-loading proxy       | getter may trigger database access                |
| Security proxy           | method may fail before body executes              |
| Caching proxy            | result may come from cache                        |
| Mock proxy               | behavior supplied by test framework               |
| Serialization proxy      | object shape may be reconstructed                 |
| AOP interceptor          | control flow not visible in method body           |

**Tempting but wrong mental model:** “If source code has no call, no behavior happens.”

**Surprising behavior or bug:** A method call triggers a transaction, lazy database load, authorization check, cache hit, or generated proxy path.

**Correct semantic explanation:** Java runtime behavior can be mediated by proxies, reflection, generated code, or framework containers.

**Professional rule of thumb:** Keep dynamic behavior at integration boundaries. Make framework effects explicit in architecture and tests.

**Boundary where the rule changes:** Infrastructure libraries and frameworks legitimately use reflection and proxies internally. Application code should usually consume typed APIs rather than duplicate that dynamism everywhere.

**Common Pitfalls:**
Do not suppress unchecked warnings broadly. Do not spread reflection into ordinary business logic. Do not assume framework proxies behave exactly like direct objects. Do not expose raw types in public APIs. Do not let native-resource handles escape without lifecycle rules.

### Handle Serialization and Data Format Boundaries — JSON, Java serialization, schemas, compatibility

Serialization converts in-memory objects to external representations and back. This is a boundary because external representation has versioning, security, compatibility, and validation concerns.

| Format/boundary             | Typical use                 | Main concern                       |
| --------------------------- | --------------------------- | ---------------------------------- |
| JSON                        | web APIs, config, messages  | schema drift, nulls, type mismatch |
| XML                         | legacy/enterprise formats   | verbosity, parser security         |
| Protobuf/Avro/etc.          | versioned schemas/messages  | schema evolution                   |
| Java built-in serialization | legacy object serialization | security and compatibility risks   |
| CSV                         | tabular exchange            | escaping, types, headers           |
| Properties/YAML/TOML        | configuration               | type parsing and validation        |
| Binary custom format        | performance/protocol needs  | maintainability and versioning     |

A DTO for JSON:

```java
public record UserResponse(
        String id,
        String displayName,
        String email
) {
}
```

A domain object may be different:

```java
public final class User {
    private final UserId id;
    private DisplayName displayName;
    private EmailAddress email;

    // domain behavior and invariants
}
```

Do not assume the external representation and the internal model should be the same. A DTO exists for boundary stability; a domain object exists for internal correctness.

| Serialization design question    | Why it matters          |
| -------------------------------- | ----------------------- |
| Are fields optional or required? | missing-value behavior  |
| Are unknown fields accepted?     | forward compatibility   |
| Are nulls allowed?               | domain safety           |
| Are names stable?                | API compatibility       |
| Is version encoded?              | migration               |
| Are secrets included?            | security                |
| Is polymorphism allowed?         | deserialization safety  |
| Are constructors invoked?        | invariant enforcement   |
| Is data validated after read?    | corrupted/hostile input |

Java built-in serialization should be treated as legacy or specialized infrastructure, not a default modern choice. It can bypass ordinary construction patterns and has a long history of security concerns when used with untrusted data.

Safer boundary style:

```java
public User toDomain(UserRequest request) {
    return new User(
            new UserId(request.id()),
            new DisplayName(request.displayName()),
            new EmailAddress(request.email())
    );
}
```

This ensures domain constructors validate values after deserialization.

| Boundary object                 | Internal object                                           |
| ------------------------------- | --------------------------------------------------------- |
| shaped for protocol             | shaped for domain                                         |
| may contain nullable fields     | should enforce invariants                                 |
| may use primitive/string fields | should use domain types                                   |
| may reflect versioned API       | may reflect current model                                 |
| may expose only safe fields     | may contain sensitive/internal state                      |
| may be framework-annotated      | should not require framework semantics unless intentional |

**Tempting but wrong mental model:** “Serialize the domain object directly.”

**Surprising behavior or bug:** API changes break clients, secrets leak, invalid objects are reconstructed, or framework annotations pollute domain code.

**Correct semantic explanation:** Serialization is a boundary translation problem, not just object dumping.

**Professional rule of thumb:** Use explicit DTOs or schemas at external boundaries. Translate into validated domain objects.

**Boundary where the rule changes:** Small internal tools may serialize simple records directly. Public APIs, security-sensitive systems, and long-lived services should be stricter.

**Common Pitfalls:**
Do not deserialize untrusted Java serialized objects casually. Do not expose internal domain objects as external API responses by default. Do not assume deserialization enforces constructor invariants. Do not include secrets in generated `toString` or serialized records.

### Design Compatibility Boundaries — source, binary, semantic, dependency, protocol

Java’s professional identity is strongly tied to compatibility. A change can be source-compatible, binary-compatible, but still semantically breaking.

| Compatibility kind       | Meaning                                   | Example                            |
| ------------------------ | ----------------------------------------- | ---------------------------------- |
| Source compatibility     | client source still compiles              | method signature remains usable    |
| Binary compatibility     | existing compiled client still links/runs | no incompatible method removal     |
| Semantic compatibility   | behavior remains compatible               | same null/mutability/error meaning |
| API compatibility        | public contract remains stable            | public types/methods preserved     |
| Protocol compatibility   | external message/API remains stable       | JSON field meanings preserved      |
| Dependency compatibility | library versions still work together      | transitive dependency resolution   |
| Runtime compatibility    | works on intended JDK/JVM/container       | target release and module access   |

A source-compatible change may be semantically breaking:

```java
public List<User> users() {
    return List.copyOf(users);
}
```

If an earlier version returned a mutable list that callers mutated, switching to an unmodifiable list may break behavior even if compilation succeeds.

| Change                          |    Source compatibility | Binary compatibility |                Semantic risk |
| ------------------------------- | ----------------------: | -------------------: | ---------------------------: |
| Add method to class             |             usually yes |          usually yes |                          low |
| Remove public method            |                      no |                   no |                         high |
| Change parameter type           |                      no |                   no |                         high |
| Add checked exception           |          no for callers |    not always simple |                  medium/high |
| Change return mutability        |                     yes |                  yes |                         high |
| Change null policy              |                     yes |                  yes |                         high |
| Add enum constant               |               often yes |                  yes | medium/high for switch logic |
| Remove enum constant            | often no/behavior break |                 high |                         high |
| Change `equals`/`hashCode`      |                     yes |                  yes |                         high |
| Change serialization field name |       source irrelevant |       protocol break |                         high |
| Change default method behavior  |                     yes |                  yes |                  medium/high |
| Add abstract interface method   |     no for implementers |                   no |                         high |

Public API evolution should prefer additive changes:

```java
public interface UserRepository {
    Optional<User> findById(UserId id);

    default User requireById(UserId id) {
        return findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }
}
```

Adding a default method may be less disruptive than adding an abstract method, but conflicts and semantic effects are still possible.

Versioned DTOs:

```java
public record CreateUserRequestV1(String email) {
}

public record CreateUserRequestV2(String email, String displayName) {
}
```

Versioning is not always necessary, but public protocols need migration strategy.

Dependency compatibility is its own boundary. Maven/Gradle dependencies can introduce transitive versions that change runtime behavior.

| Dependency issue            | Example symptom                           | Boundary response               |
| --------------------------- | ----------------------------------------- | ------------------------------- |
| Transitive conflict         | `NoSuchMethodError` at runtime            | dependency constraints/BOM      |
| Duplicate classes           | classpath ambiguity                       | dependency cleanup              |
| Split package/module issue  | module resolution failure                 | package/module refactor         |
| Version drift               | different environments behave differently | lock/verify versions            |
| Optional dependency missing | runtime class not found                   | explicit dependency declaration |
| Shaded library conflict     | unexpected class behavior                 | relocation and audit            |
| Framework version mismatch  | annotation/proxy behavior fails           | compatibility matrix            |

**Tempting but wrong mental model:** “If it compiles, the change is compatible.”

**Surprising behavior or bug:** Callers compile but fail because behavior, mutability, serialization shape, dependency version, or runtime access changed.

**Correct semantic explanation:** Compatibility includes source, binary, semantic, protocol, dependency, and runtime dimensions.

**Professional rule of thumb:** Treat public APIs, serialized forms, dependency versions, and runtime assumptions as compatibility contracts.

**Boundary where the rule changes:** Internal code with no external callers can change more freely, but large internal systems often behave like public APIs across teams.

**Common Pitfalls:**
Do not change public return mutability casually. Do not add enum constants without checking exhaustive logic. Do not assume dependency upgrades are local. Do not expose unstable internal types in public signatures. Do not confuse binary compatibility with behavioral compatibility.

### Manage Classpath, Module Path, and Runtime Access Boundaries — class loading, modules, reflection

Java code is compiled and run in an environment where classes and modules must be found, loaded, and allowed to access one another. Many professional Java failures are not source-code failures but boundary failures in class loading, dependency resolution, or module access.

| Runtime boundary  | Meaning                                                   | Typical failure                               |
| ----------------- | --------------------------------------------------------- | --------------------------------------------- |
| Classpath         | unordered-ish set of classes/JARs visible to class loader | wrong version, duplicate class, missing class |
| Module path       | modules resolved with descriptors                         | unreadable module, non-exported package       |
| Class loader      | runtime mechanism that loads classes                      | same class name loaded by different loaders   |
| Export            | module exposes package for compile/runtime access         | package not accessible                        |
| Open              | module permits reflection into package                    | reflection failure                            |
| Service loader    | runtime provider discovery                                | provider missing                              |
| Automatic module  | non-modular JAR treated as module                         | unstable module name                          |
| Multi-release JAR | version-specific classes                                  | runtime-specific behavior                     |

Classpath-style applications often fail with errors such as:

| Error                                          | Common cause                                                     |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| `ClassNotFoundException`                       | class not available at runtime                                   |
| `NoClassDefFoundError`                         | class was present at compile time but missing/failing at runtime |
| `NoSuchMethodError`                            | incompatible library version at runtime                          |
| `ClassCastException` involving same class name | class loader mismatch                                            |
| `IllegalAccessError`                           | binary access conflict                                           |
| reflective access exception                    | module not opened/exported or access denied                      |

Module-aware applications add stronger checks:

```java
module com.example.app {
    requires com.example.billing;
    requires java.sql;
}
```

If a package is not exported, other modules cannot normally access it even if public classes exist inside it.

Reflection under modules requires attention. A package may be exported for ordinary access but not opened for deep reflection.

```java
module com.example.domain {
    exports com.example.domain.api;
    opens com.example.domain.model to com.fasterxml.jackson.databind;
}
```

This says the model package is opened reflectively to a specific framework. Broad `opens` should be avoided unless necessary.

| Boundary need                          | Prefer                                     |
| -------------------------------------- | ------------------------------------------ |
| compile-time API access                | `exports`                                  |
| framework reflection                   | narrow `opens ... to`                      |
| dependency on module                   | `requires`                                 |
| re-export dependency types used in API | `requires transitive`                      |
| plugin/provider discovery              | `uses` / `provides`                        |
| non-modular legacy dependency          | classpath or automatic module with caution |

**Tempting but wrong mental model:** “Imports determine runtime availability.”

**Surprising behavior or bug:** Source imports compile, but runtime fails because the dependency is missing, the wrong version is loaded, or the module does not export/open the package.

**Correct semantic explanation:** `import` only simplifies source names. Runtime availability is determined by classpath/module path, dependencies, class loaders, and module access rules.

**Professional rule of thumb:** Diagnose Java runtime linkage failures as dependency and class-loading boundary problems, not just source-code problems.

**Boundary where the rule changes:** Simple single-module/classpath applications may not need JPMS design, but dependency version and classpath discipline still matter.

**Common Pitfalls:**
Do not confuse `import` with dependency declaration. Do not place multiple incompatible versions of the same library on the classpath. Do not broadly open modules for reflection without need. Do not ignore `NoSuchMethodError`; it often signals runtime dependency mismatch.

### Boundary Effects in Framework-Based Java — dependency injection, transactions, persistence, lazy loading

Frameworks often move boundaries out of explicit source code and into annotations, proxies, configuration, generated classes, or runtime containers. This is powerful but changes how code must be read.

| Framework effect     | Source may show           | Hidden boundary                                     |
| -------------------- | ------------------------- | --------------------------------------------------- |
| Dependency injection | constructor/annotation    | object creation controlled by container             |
| Transaction          | `@Transactional`          | transaction begins/commits/rolls back around method |
| Persistence          | entity annotations        | database mapping and lazy loading                   |
| Validation           | constraint annotations    | validator must run                                  |
| Web routing          | route annotations         | method called by framework                          |
| Security             | authorization annotations | access check before method body                     |
| Caching              | cache annotation          | result may be cached or invalidated                 |
| Messaging            | listener annotation       | method invoked by message container                 |

Example:

```java
public final class OrderApplicationService {
    private final OrderRepository orders;

    public OrderApplicationService(OrderRepository orders) {
        this.orders = Objects.requireNonNull(orders);
    }

    @Transactional
    public void cancel(OrderId id) {
        Order order = orders.require(id);
        order.cancel();
        orders.save(order);
    }
}
```

The annotation may define a transaction boundary, but only if the framework proxy/container recognizes and applies it. Direct self-invocation may bypass proxy behavior in some frameworks. This is a framework convention issue, not a Java language rule.

| Framework boundary question    | Why it matters                               |
| ------------------------------ | -------------------------------------------- |
| Who constructs the object?     | lifecycle and dependency availability        |
| Is the object proxied?         | method calls may be intercepted              |
| Which methods are intercepted? | public/private/self-call behavior may differ |
| When does validation run?      | annotations may not enforce by themselves    |
| When does transaction start?   | persistence consistency                      |
| Is loading lazy?               | getters may trigger database I/O             |
| What thread executes callback? | thread-safety and context propagation        |
| How are exceptions translated? | API error semantics                          |

**Tempting but wrong mental model:** “The annotation explains everything.”

**Surprising behavior or bug:** Annotation does not apply because the object was not framework-managed, the method was called internally, the package was not opened, or the proxy could not intercept it.

**Correct semantic explanation:** Framework annotations are interpreted by framework machinery under specific lifecycle and proxy rules.

**Professional rule of thumb:** Know whether code is plain Java execution or framework-mediated execution. Keep framework boundaries explicit and test them at integration level.

**Boundary where the rule changes:** Some frameworks use compile-time enhancement or generated code rather than runtime proxies. The general rule remains: the annotation is metadata; the framework defines the behavior.

**Common Pitfalls:**
Do not assume annotated methods behave the same when called from tests, constructors, or self-invocation. Do not put lazy-loading entity access in logging or `toString`. Do not let transaction boundaries be implicit in business reasoning. Do not treat framework-managed objects as ordinary manually constructed objects without checking lifecycle.

### Boundary Task Reference — construct/API, professional use, pitfall

| Boundary task               | Construct/API                  | Professional use                | Pitfall                           |
| --------------------------- | ------------------------------ | ------------------------------- | --------------------------------- |
| Hide field representation   | `private` fields               | preserve invariants             | public mutable fields             |
| Share package internals     | package-private                | cohesive internal collaboration | oversized package                 |
| Expose stable API           | `public`                       | client contract                 | accidental API growth             |
| Control subclass extension  | `protected`, `final`, `sealed` | deliberate extension boundary   | fragile hierarchy                 |
| Separate API package        | `api` / exported package       | stable module surface           | leaking implementation types      |
| Hide implementation package | non-exported/internal package  | implementation flexibility      | relying on convention only        |
| Define module dependency    | `requires`                     | explicit module graph           | missing transitive API dependency |
| Allow reflection narrowly   | `opens ... to`                 | framework access                | broad reflective exposure         |
| Represent absence           | `Optional<T>` return           | expected maybe-result           | `Optional.get()` abuse            |
| Represent failure           | exception/result type          | explicit failure boundary       | broad `Exception`                 |
| Clean resource              | `try-with-resources`           | deterministic cleanup           | relying on GC                     |
| Guard lock                  | `try/finally`                  | guaranteed unlock               | I/O while locked                  |
| Validate external input     | parser/value object            | raw-to-domain translation       | DTO in core logic                 |
| Isolate unchecked cast      | adapter                        | keep unsafe code local          | global warning suppression        |
| Translate external API      | gateway/adapter                | dependency hiding               | leaking vendor types              |
| Preserve compatibility      | stable signatures/DTOs         | long-term API use               | semantic breaking change          |
| Manage dependency boundary  | Maven/Gradle constraints/BOM   | version consistency             | runtime linkage errors            |

### Error Mechanism Decision Table — when to use which Java failure form

| Error mechanism            | Use when                                             | Avoid when                                       | Failure mode if misused       |
| -------------------------- | ---------------------------------------------------- | ------------------------------------------------ | ----------------------------- |
| `IllegalArgumentException` | caller passed invalid argument                       | external user error needs rich response          | vague validation handling     |
| `IllegalStateException`    | receiver state disallows operation                   | state model should prevent invalid state         | lifecycle confusion           |
| Checked exception          | caller must acknowledge recoverable boundary failure | failure cannot be meaningfully handled by caller | throws-clause pollution       |
| Unchecked domain exception | failure should propagate to boundary                 | ordinary success/failure branch                  | hidden control flow           |
| `Optional<T>`              | expected absence of single value                     | need failure reason                              | absent vs failed ambiguity    |
| Empty collection           | zero results                                         | not loaded / unavailable distinction matters     | loss of state meaning         |
| Sealed result type         | finite outcomes with data                            | simple exceptional failure                       | extra ceremony                |
| Validation result          | multiple validation errors                           | simple constructor invariant                     | overbuilt validation          |
| Assertion                  | internal development invariant                       | required runtime validation                      | disabled checks in production |
| `Error`                    | JVM/system-level serious failure                     | normal application flow                          | catching too broadly          |

### Resource Pattern Decision Table — guarantee, cost, correct use

| Resource pattern              | Guarantee                     | Cost                       | Correct use                           | Common misuse                                      |
| ----------------------------- | ----------------------------- | -------------------------- | ------------------------------------- | -------------------------------------------------- |
| `try-with-resources`          | closes resources on all exits | resource must be closeable | files, streams, JDBC, native sessions | returning resource-backed stream without ownership |
| `finally`                     | executes cleanup block        | manual correctness         | locks, custom protocols               | cleanup code that throws and masks cause           |
| explicit `close()`            | caller controls lifecycle     | caller may forget          | long-lived service/resource           | no owner documented                                |
| container-managed lifecycle   | framework controls start/stop | hidden lifecycle           | DI-managed clients, pools             | constructing manually outside container            |
| resource pool                 | reuse expensive resources     | exhaustion/leak risk       | DB connections, clients               | not returning/closing borrowed resource            |
| immutable snapshot            | no cleanup needed             | copy/allocation cost       | stable data crossing boundary         | copying huge data unnecessarily                    |
| lazy stream                   | delayed processing            | resource may remain open   | controlled pipeline in local scope    | escaping beyond resource scope                     |
| cleaner/finalization fallback | last-resort cleanup           | non-deterministic          | safety net only                       | primary cleanup mechanism                          |

### Module and Visibility Decision Table — coupling and maintenance consequence

| Boundary option                | Coupling level           | Maintenance consequence           | Use when                  |
| ------------------------------ | ------------------------ | --------------------------------- | ------------------------- |
| `private` member               | lowest external coupling | easiest to change                 | implementation detail     |
| package-private class/member   | package-coupled          | changeable inside package         | internal collaboration    |
| `protected` method             | subclass-coupled         | hard to change safely             | documented extension hook |
| `public` class/member          | client-coupled           | long-term contract                | stable API                |
| exported package               | module-client-coupled    | module API commitment             | package is intended API   |
| non-exported package           | module-internal          | safer to refactor                 | implementation detail     |
| opened package                 | reflection-coupled       | framework access obligation       | reflection is required    |
| public concrete implementation | high                     | implementation frozen in API      | clients genuinely need it |
| public interface               | contract-coupled         | implementers/callers depend on it | meaningful substitution   |
| adapter boundary               | dependency isolated      | easier replacement                | external system/library   |

### Boundary Failure Mode Index — what to look for in real Java code

| Failure mode                 | Symptom                                       | Root cause                       | Correction                               |
| ---------------------------- | --------------------------------------------- | -------------------------------- | ---------------------------------------- |
| Accidental public API        | many public classes/methods unused externally | visibility too broad             | reduce visibility, separate API/internal |
| Package-as-folder thinking   | packages mirror files but not architecture    | no boundary model                | organize by cohesion/dependency          |
| Internal DTO leakage         | API exposes persistence/framework types       | no adapter boundary              | translate DTO/entity/domain              |
| Null boundary leak           | external nullable values enter core           | missing validation               | parse/validate at entry                  |
| Exception swallowing         | empty catch or generic fallback               | no recovery policy               | handle at decision boundary              |
| Log-and-rethrow everywhere   | duplicated noisy logs                         | no logging boundary              | log once at meaningful boundary          |
| Resource leak                | file/socket/connection exhaustion             | missing close/shutdown           | `try-with-resources` or lifecycle owner  |
| Hidden I/O                   | getter/query performs network/database call   | effect boundary invisible        | rename/isolate                           |
| Broad reflection access      | module/package opened widely                  | framework convenience            | narrow `opens ... to`                    |
| Runtime dependency mismatch  | `NoSuchMethodError` / class loading errors    | dependency version conflict      | dependency constraints and runtime audit |
| Framework proxy surprise     | annotation not applied                        | lifecycle/proxy misunderstanding | integration tests and explicit boundary  |
| Raw type contamination       | unchecked warnings everywhere                 | legacy/dynamic data not isolated | adapter and typed API                    |
| Serialization vulnerability  | untrusted object deserialization              | unsafe format boundary           | explicit schema/DTO validation           |
| Semantic compatibility break | callers compile but behavior changes          | contract not documented          | document mutability/null/error behavior  |
| Transaction ambiguity        | partial writes or inconsistent events         | hidden transaction boundary      | explicit service/application boundary    |
## PART 6 — Standard Library and Core Ecosystem Reference by Task Pattern

### Orientation — Java SE APIs, JDK tools, ecosystem libraries, framework boundaries

Java’s practical power comes from three layers that must be separated:

| Layer                             | What it contains                      | Examples                                                                           | Design meaning                                         |
| --------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Java language                     | syntax and source-level semantics     | classes, records, generics, exceptions, lambdas                                    | defines what Java code means                           |
| Java SE standard library          | portable platform APIs                | `java.lang`, `java.util`, `java.time`, `java.nio`, `java.net`, `java.concurrent`   | defines common cross-platform capabilities             |
| JDK tools and implementation APIs | tools and vendor/JDK-specific support | `javac`, `jar`, `jlink`, `jpackage`, JFR, `jcmd`                                   | supports building, packaging, diagnostics              |
| Core ecosystem                    | common external tools/libraries       | Maven, Gradle, JUnit, logging libraries, JSON libraries, Spring/Jakarta ecosystems | defines professional workflow and application patterns |

The standard library should be learned by **task**, not by memorizing package names. The same package can serve many tasks, and the same task may involve several packages.

| Task category              | Main standard APIs                              | Common ecosystem layer                                |
| -------------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| Core object behavior       | `java.lang`, `java.util.Objects`                | static analyzers, IDE inspections                     |
| Collections and iteration  | `java.util`, `java.util.stream`                 | Guava, Eclipse Collections, Vavr in some codebases    |
| Text and regex             | `String`, `StringBuilder`, `Pattern`, `Matcher` | Apache Commons Text, ICU4J                            |
| Dates and time             | `java.time`                                     | domain-specific time libraries rarely needed          |
| Files and paths            | `java.nio.file`, `java.io`                      | Apache Commons IO                                     |
| Networking                 | `java.net`, `java.net.http`                     | OkHttp, Netty, Apache HttpClient                      |
| Concurrency                | `java.lang.Thread`, `java.util.concurrent`      | reactive frameworks, coroutine-like frameworks on JVM |
| Serialization/data formats | limited built-ins, standard APIs                | Jackson, Gson, protobuf, Avro                         |
| Logging/observability      | limited standard logging, management APIs, JFR  | SLF4J, Logback, Log4j, Micrometer, OpenTelemetry      |
| Testing                    | assertions only in language/JDK                 | JUnit, AssertJ, Mockito, Testcontainers               |
| Build/dependencies         | JDK tools                                       | Maven, Gradle                                         |
| Packaging/deployment       | `jar`, `jlink`, `jpackage`                      | containers, build plugins                             |
| CLI/process/OS             | `ProcessBuilder`, system properties, env        | picocli, Commons CLI                                  |
| Configuration              | properties, environment, system properties      | Typesafe Config, Spring config, MicroProfile Config   |

A professional Java learner should treat the standard library as the baseline vocabulary. Ecosystem libraries are chosen when the standard library is insufficient, too low-level, or when a framework convention is already dominant.

### Core Language Utilities — `java.lang`, `Objects`, `System`, wrappers, `Math`

`java.lang` is automatically imported. It contains fundamental types and utilities: `Object`, `String`, `Integer`, `Long`, `Boolean`, `Math`, `System`, `Thread`, `Throwable`, `Exception`, `RuntimeException`, `Enum`, `Class`, and more.

| Task                      | Standard API                         | Canonical use                   | Caveat                                  |
| ------------------------- | ------------------------------------ | ------------------------------- | --------------------------------------- |
| Null check                | `Objects.requireNonNull`             | constructor/method boundary     | message should be useful                |
| Null-safe equality        | `Objects.equals`                     | compare nullable references     | still depends on `equals`               |
| Hash composition          | `Objects.hash`                       | simple `hashCode`               | may allocate; records often avoid need  |
| Numeric math              | `Math`                               | exact arithmetic, min/max, trig | floating-point caveats                  |
| Primitive wrapper parsing | `Integer.parseInt`, `Long.parseLong` | parse text to primitive         | throws on malformed input               |
| System properties         | `System.getProperty`                 | JVM/system configuration        | stringly typed                          |
| Environment variables     | `System.getenv`                      | external config                 | stringly typed, process-level           |
| Current time millis       | `System.currentTimeMillis`           | legacy timestamp                | prefer `Instant` / `Clock` for modeling |
| Nano time                 | `System.nanoTime`                    | elapsed-time measurement        | not wall-clock time                     |
| Runtime type token        | `Class<T>`                           | reflection/type tokens          | limited generic info                    |

Null check:

```java
public User(UserId id, EmailAddress email) {
    this.id = Objects.requireNonNull(id, "id");
    this.email = Objects.requireNonNull(email, "email");
}
```

Null-safe equality:

```java
if (Objects.equals(left, right)) {
    // handles nulls safely
}
```

Exact arithmetic:

```java
int total = Math.addExact(count, delta);
```

This throws `ArithmeticException` on overflow, unlike ordinary `+`.

Parsing:

```java
public static Optional<Integer> parseInt(String input) {
    try {
        return Optional.of(Integer.parseInt(input));
    } catch (NumberFormatException e) {
        return Optional.empty();
    }
}
```

| Utility                    | Good use                      | Common misuse                               |
| -------------------------- | ----------------------------- | ------------------------------------------- |
| `Objects.requireNonNull`   | enforce required values early | checking too late after dereference         |
| `Objects.equals`           | nullable equality             | using as substitute for equality design     |
| `Math.addExact`            | overflow-sensitive arithmetic | ignoring thrown exception                   |
| `System.currentTimeMillis` | rough wall-clock timestamp    | measuring elapsed performance               |
| `System.nanoTime`          | elapsed durations             | displaying date/time                        |
| `System.getenv`            | process config boundary       | deep domain logic access                    |
| wrapper parse methods      | controlled parsing            | treating parse success as domain validation |

**Tempting but wrong mental model:** “`System.currentTimeMillis` is fine for time.”

**Surprising behavior or bug:** Wall-clock time can move backward or jump due to clock adjustments; elapsed-time measurement becomes wrong.

**Correct semantic explanation:** Wall-clock time and monotonic elapsed time are different concepts. `System.nanoTime` is for elapsed durations; `Instant`/`Clock` are for time modeling.

**Professional rule of thumb:** Use `Objects` for boundary checks, `Math.*Exact` when overflow matters, `Clock`/`Instant` for domain time, and `System` APIs mainly at environment/runtime boundaries.

**Common Pitfalls:**
Do not access environment variables throughout business logic. Do not use wrapper parsing as full validation. Do not use `System.nanoTime` as a timestamp. Do not rely on ordinary integer arithmetic when overflow is a correctness issue.

### Collections and Iteration — `List`, `Set`, `Map`, queues, streams, factories

Java’s collections framework is central to everyday programming. It should be understood through contracts: order, uniqueness, key lookup, mutability, concurrency, and equality.

| Task                                 | Standard API                 | Canonical implementation | Caveat                                |
| ------------------------------------ | ---------------------------- | ------------------------ | ------------------------------------- |
| Ordered sequence                     | `List<T>`                    | `ArrayList<T>`           | allows duplicates                     |
| Unique membership                    | `Set<T>`                     | `HashSet<T>`             | depends on stable `equals`/`hashCode` |
| Ordered unique membership            | `Set<T>`                     | `LinkedHashSet<T>`       | preserves insertion order             |
| Sorted unique membership             | `SortedSet` / `NavigableSet` | `TreeSet<T>`             | requires comparator/order             |
| Key-value lookup                     | `Map<K,V>`                   | `HashMap<K,V>`           | keys need stable equality             |
| Ordered map                          | `Map<K,V>`                   | `LinkedHashMap<K,V>`     | insertion/access order                |
| Sorted map                           | `NavigableMap<K,V>`          | `TreeMap<K,V>`           | comparator/order                      |
| Queue                                | `Queue<T>`                   | `ArrayDeque<T>`          | not thread-safe                       |
| Stack/deque                          | `Deque<T>`                   | `ArrayDeque<T>`          | prefer over legacy `Stack`            |
| Immutable/unmodifiable list creation | `List.of`, `List.copyOf`     | standard factories       | shallow immutability                  |
| Stream processing                    | `Stream<T>`                  | `collection.stream()`    | one-shot, lazy until terminal op      |

Basic collection factories:

```java
List<String> names = List.of("Ada", "Grace");
Set<String> roles = Set.of("ADMIN", "MEMBER");
Map<String, Integer> scores = Map.of("Ada", 100, "Grace", 95);
```

Copy at boundary:

```java
public record Team(List<UserId> members) {
    public Team {
        members = List.copyOf(members);
    }
}
```

Mutable build, immutable result:

```java
List<User> result = new ArrayList<>();

for (User user : users) {
    if (user.isActive()) {
        result.add(user);
    }
}

return List.copyOf(result);
```

Map operations:

```java
Map<UserId, User> usersById = new HashMap<>();

usersById.put(user.id(), user);

Optional<User> findUser(UserId id) {
    return Optional.ofNullable(usersById.get(id));
}
```

`computeIfAbsent` is useful but should not hide expensive or side-effect-heavy creation:

```java
UserProfile profile = profiles.computeIfAbsent(userId, this::loadProfile);
```

This is concise, but `loadProfile` may perform I/O. If so, the effect should be understood and documented.

| Method                         | Use                                     | Caveat                                  |
| ------------------------------ | --------------------------------------- | --------------------------------------- |
| `get`                          | retrieve map value                      | null ambiguity                          |
| `containsKey`                  | distinguish missing key from null value | two lookups unless needed               |
| `getOrDefault`                 | default value                           | default is always evaluated before call |
| `computeIfAbsent`              | lazy initialize missing value           | mapping function constraints            |
| `merge`                        | combine values                          | can be less readable                    |
| `removeIf`                     | filter mutable collection in place      | mutation side effect                    |
| `List.copyOf`                  | stable unmodifiable copy                | shallow copy                            |
| `Collections.unmodifiableList` | unmodifiable view                       | backing collection may mutate           |

Streams:

```java
List<EmailAddress> emails = users.stream()
        .filter(User::isActive)
        .map(User::email)
        .toList();
```

Collectors:

```java
Map<UserStatus, List<User>> byStatus = users.stream()
        .collect(Collectors.groupingBy(User::status));
```

Avoid storing streams in fields or returning resource-backed streams casually. A stream is a one-shot pipeline, not a collection.

| Need                        | Better choice                             |
| --------------------------- | ----------------------------------------- |
| reusable data               | collection                                |
| one-time transformation     | stream                                    |
| side-effect-heavy iteration | loop                                      |
| index-aware processing      | loop                                      |
| grouping/reducing           | collector or explicit loop                |
| primitive numeric stream    | `IntStream`, `LongStream`, `DoubleStream` |
| concurrent access           | concurrent collection                     |
| stable API return           | unmodifiable collection                   |

**Tempting but wrong mental model:** “Collections are interchangeable containers.”

**Surprising behavior or bug:** A `HashSet` loses lookup ability after a mutable key changes; a returned mutable list corrupts internal state; a stream is reused and fails.

**Correct semantic explanation:** Collection interfaces encode contracts. Implementations encode performance, ordering, mutability, and concurrency behavior.

**Professional rule of thumb:** Choose collections by operation and contract: `List` for order, `Set` for uniqueness, `Map` for lookup, `Queue` for processing, unmodifiable copies for API boundaries.

**Common Pitfalls:**
Do not use mutable hash keys. Do not return internal mutable collections. Do not use `List` when uniqueness is required. Do not assume `List.of` returns mutable lists. Do not put side effects into stream pipelines casually.

### Text and Regular Expressions — `String`, `StringBuilder`, `Pattern`, charsets, formatting

Text handling in Java involves immutable `String`, mutable builders, regex APIs, Unicode realities, and encoding boundaries.

| Task                    | Standard API                  | Canonical use                  | Caveat                   |
| ----------------------- | ----------------------------- | ------------------------------ | ------------------------ |
| Store text              | `String`                      | immutable text value           | not a byte sequence      |
| Build text repeatedly   | `StringBuilder`               | loops, formatting construction | not thread-safe          |
| Thread-safe builder     | `StringBuffer`                | rare legacy/threaded use       | usually unnecessary      |
| Compare text            | `equals`, `equalsIgnoreCase`  | value comparison               | locale/case caveats      |
| Search simple substring | `contains`, `indexOf`         | simple matching                | not regex                |
| Split simple text       | `split`                       | regex-based split              | regex escaping surprises |
| Regex match             | `Pattern`, `Matcher`          | compiled regex                 | escaping and performance |
| Format string           | `String.format`, `formatted`  | formatted output               | locale and cost          |
| Join strings            | `String.join`, collectors     | delimiters                     | null handling            |
| Encode/decode bytes     | `Charset`, `StandardCharsets` | explicit encoding              | platform default risk    |

String is immutable:

```java
String name = "Ada";
String upper = name.toUpperCase(Locale.ROOT);
```

`name` is unchanged. `upper` refers to a new string.

Repeated concatenation in loops:

```java
String result = "";

for (String part : parts) {
    result += part; // poor for many iterations
}
```

Better:

```java
StringBuilder builder = new StringBuilder();

for (String part : parts) {
    builder.append(part);
}

String result = builder.toString();
```

For joining:

```java
String csv = String.join(",", values);
```

Regex:

```java
private static final Pattern USER_ID_PATTERN =
        Pattern.compile("[a-zA-Z0-9_-]+");

public boolean isValidUserId(String input) {
    return USER_ID_PATTERN.matcher(input).matches();
}
```

Compile frequently reused regex patterns once. Recompiling inside a hot loop is wasteful.

`String.split` uses regex, not literal separator semantics:

```java
"a.b.c".split(".");   // surprising: "." means any character in regex
"a.b.c".split("\\."); // split on literal dot
```

Character encoding:

```java
String text = Files.readString(path, StandardCharsets.UTF_8);
Files.writeString(path, text, StandardCharsets.UTF_8);
```

Avoid relying on platform default encoding unless the boundary explicitly says so.

| Text issue                         | Better practice                                      |
| ---------------------------------- | ---------------------------------------------------- |
| Case-insensitive protocol matching | use `Locale.ROOT`                                    |
| Human-language case conversion     | use appropriate locale                               |
| Byte/text conversion               | specify `Charset`                                    |
| Complex text validation            | parse/validate, not only regex if semantics matter   |
| User-visible text                  | beware Unicode normalization and grapheme clusters   |
| Secret values                      | avoid logging or `toString` exposure                 |
| Repeated building                  | use `StringBuilder` or joining collectors            |
| Literal split                      | escape regex or use non-regex method where available |

**Tempting but wrong mental model:** “A Java `char` is a character.”

**Surprising behavior or bug:** Some human-visible characters require more than one UTF-16 code unit, so `char` and `length()` do not always match user-perceived characters.

**Correct semantic explanation:** Java `String` stores UTF-16 code units. Unicode code points and grapheme clusters are different layers.

**Professional rule of thumb:** Use `String` for ordinary text, but be precise at boundaries: encoding, locale, normalization, regex semantics, and security-sensitive logging.

**Common Pitfalls:**
Do not use `==` for string content. Do not rely on default charset. Do not forget that `split` takes regex. Do not use `toLowerCase()` without locale awareness in protocol-like code. Do not log secrets through string formatting.

### Dates, Time, and Time Zones — `java.time`, legacy APIs, clocks, duration

Modern Java date/time work should use `java.time`. The older `Date` and `Calendar` APIs are mostly legacy maintenance concerns.

| Task                 | Standard API     | Meaning                      | Common pitfall                         |
| -------------------- | ---------------- | ---------------------------- | -------------------------------------- |
| Machine timestamp    | `Instant`        | point on UTC timeline        | using local date-time for global event |
| Calendar date        | `LocalDate`      | date without time/time zone  | treating as instant                    |
| Time of day          | `LocalTime`      | clock time without date/zone | lacks date context                     |
| Local date-time      | `LocalDateTime`  | date-time without zone       | ambiguous globally                     |
| Zoned date-time      | `ZonedDateTime`  | date-time with zone rules    | DST complexity                         |
| Offset date-time     | `OffsetDateTime` | date-time with fixed offset  | not full zone rules                    |
| Duration             | `Duration`       | elapsed time amount          | not calendar months                    |
| Period               | `Period`         | calendar date amount         | not exact elapsed seconds              |
| Time zone            | `ZoneId`         | region-based zone            | not same as offset                     |
| Testable time source | `Clock`          | injectable time provider     | using `Instant.now()` everywhere       |

Current instant:

```java
Instant now = Instant.now();
```

Testable version:

```java
public final class TokenPolicy {
    private final Clock clock;

    public TokenPolicy(Clock clock) {
        this.clock = Objects.requireNonNull(clock);
    }

    public boolean isExpired(Token token) {
        return clock.instant().isAfter(token.expiresAt());
    }
}
```

Date range:

```java
public record DateRange(LocalDate start, LocalDate end) {
    public DateRange {
        Objects.requireNonNull(start);
        Objects.requireNonNull(end);

        if (end.isBefore(start)) {
            throw new IllegalArgumentException("end must not be before start");
        }
    }
}
```

Duration:

```java
Duration timeout = Duration.ofSeconds(30);
```

Zoned time:

```java
ZoneId tokyo = ZoneId.of("Asia/Tokyo");
ZonedDateTime meeting = ZonedDateTime.of(
        LocalDate.of(2026, 5, 11),
        LocalTime.of(9, 0),
        tokyo
);
```

| Use case                 | Prefer                              | Avoid                             |
| ------------------------ | ----------------------------------- | --------------------------------- |
| event creation time      | `Instant`                           | `LocalDateTime` without zone      |
| birthday                 | `LocalDate`                         | `Instant`                         |
| timeout                  | `Duration`                          | raw `long millis`                 |
| billing month            | `YearMonth` or domain type          | raw string                        |
| recurring calendar logic | `Period`, `LocalDate`, domain rules | fixed seconds if calendar matters |
| test current time        | injected `Clock`                    | hard-coded `Instant.now()`        |
| legacy interop           | convert at boundary                 | spreading `Date`/`Calendar`       |

Conversion at boundary:

```java
Date legacyDate = Date.from(instant);
Instant modern = legacyDate.toInstant();
```

**Tempting but wrong mental model:** “A date-time value is just a timestamp.”

**Surprising behavior or bug:** A `LocalDateTime` has no time zone and cannot uniquely identify a moment globally.

**Correct semantic explanation:** `Instant`, `LocalDate`, `LocalDateTime`, `ZonedDateTime`, `Duration`, and `Period` represent different concepts.

**Professional rule of thumb:** Use `Instant` for machine time, `LocalDate` for calendar dates, `ZonedDateTime` for human scheduling with time zones, and `Clock` for testable current time.

**Common Pitfalls:**
Do not store global events as `LocalDateTime` without zone/offset context. Do not use raw milliseconds throughout domain code. Do not mix `Duration` and `Period` casually. Do not use old `Date`/`Calendar` except at legacy boundaries.

### Files, Paths, and I/O — `Path`, `Files`, streams, readers, writers, resources

Java file and path work should generally use `java.nio.file.Path` and `Files`. Older `java.io.File` appears in legacy APIs but is less expressive.

| Task               | Standard API                   | Canonical use              | Caveat                        |
| ------------------ | ------------------------------ | -------------------------- | ----------------------------- |
| Represent path     | `Path`                         | `Path.of("data", "x.txt")` | path may not exist            |
| Read whole text    | `Files.readString`             | small/medium files         | memory cost                   |
| Write whole text   | `Files.writeString`            | simple writes              | atomicity concerns            |
| Read lines         | `Files.lines`                  | stream processing          | stream must be closed         |
| Read bytes         | `Files.readAllBytes`           | binary data                | memory cost                   |
| Open input stream  | `Files.newInputStream`         | streaming data             | close required                |
| Open reader        | `Files.newBufferedReader`      | text with charset          | close required                |
| Create directories | `Files.createDirectories`      | ensure directory path      | permissions                   |
| Copy/move/delete   | `Files.copy`, `move`, `delete` | filesystem operations      | exceptions and atomicity      |
| Walk tree          | `Files.walk`                   | recursive traversal        | close stream, large traversal |

Path creation:

```java
Path configPath = Path.of("config", "application.properties");
```

Read text with charset:

```java
String config = Files.readString(configPath, StandardCharsets.UTF_8);
```

Stream file lines safely:

```java
try (Stream<String> lines = Files.lines(configPath, StandardCharsets.UTF_8)) {
    List<String> nonEmpty = lines
            .filter(line -> !line.isBlank())
            .toList();
}
```

`Files.lines` returns a stream backed by an open resource. It must be closed.

Write file:

```java
Files.writeString(
        outputPath,
        content,
        StandardCharsets.UTF_8,
        StandardOpenOption.CREATE,
        StandardOpenOption.TRUNCATE_EXISTING
);
```

Create directory:

```java
Files.createDirectories(outputPath.getParent());
```

Copy stream:

```java
try (
        InputStream in = Files.newInputStream(source);
        OutputStream out = Files.newOutputStream(target)
) {
    in.transferTo(out);
}
```

| File task           | Design concern                    |
| ------------------- | --------------------------------- |
| user-supplied path  | path traversal, permissions       |
| relative path       | working directory assumptions     |
| large file          | streaming vs whole-file read      |
| text file           | charset                           |
| concurrent write    | locking/atomic move               |
| temporary file      | cleanup                           |
| recursive traversal | resource use and symlinks         |
| delete              | existence and permissions         |
| config file         | validation after parsing          |
| uploaded file       | size limit and content validation |

Path traversal boundary:

```java
public Path resolveUnderBase(Path base, String userInput) {
    Path resolved = base.resolve(userInput).normalize();

    if (!resolved.startsWith(base.normalize())) {
        throw new SecurityException("path escapes base directory");
    }

    return resolved;
}
```

This is still simplified; symlinks and filesystem-specific behavior may require stricter handling.

**Tempting but wrong mental model:** “A path string is just a filename.”

**Surprising behavior or bug:** Relative paths depend on working directory; user input can escape directories; default charset differs; `Files.lines` leaks if not closed.

**Correct semantic explanation:** Filesystem access is an external resource boundary involving paths, permissions, encodings, resource lifetime, and sometimes security.

**Professional rule of thumb:** Use `Path` and `Files`; specify charsets; close streams; validate user-supplied paths; avoid whole-file reads for large files.

**Common Pitfalls:**
Do not use raw string concatenation for paths. Do not rely on default charset. Do not forget to close file-backed streams. Do not trust uploaded or user-supplied paths. Do not assume file operations are atomic unless explicitly designed.

### Serialization and Data Formats — standard limits, JSON ecosystem, DTO boundaries

Java’s standard library has limited modern data-format support. Built-in Java serialization exists but is generally not the default choice for modern external data exchange. Professional Java commonly uses ecosystem libraries for JSON, XML, protobuf, Avro, or other formats.

| Task                      | Standard / ecosystem tool                 | Typical use                | Caveat                          |
| ------------------------- | ----------------------------------------- | -------------------------- | ------------------------------- |
| Java object serialization | `Serializable`                            | legacy/internal cases      | security and compatibility risk |
| JSON                      | Jackson, Gson, JSON-B depending ecosystem | web APIs, config, messages | DTO validation needed           |
| XML                       | JAXP and ecosystem libraries              | legacy/enterprise formats  | parser security                 |
| Properties                | `java.util.Properties`                    | simple key-value config    | string-only, limited structure  |
| Binary schema             | protobuf, Avro, etc.                      | versioned service messages | schema evolution rules          |
| CSV                       | external library often useful             | tabular exchange           | escaping/types                  |
| Base64                    | `java.util.Base64`                        | encode binary as text      | not encryption                  |
| Compression               | `java.util.zip`                           | gzip/zip handling          | zip-slip and resource bounds    |

Properties:

```java
Properties properties = new Properties();

try (Reader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
    properties.load(reader);
}

String host = properties.getProperty("host");
```

Then parse into typed config:

```java
public record DatabaseConfig(String host, Port port) {
}
```

Base64:

```java
String encoded = Base64.getEncoder().encodeToString(bytes);
byte[] decoded = Base64.getDecoder().decode(encoded);
```

DTO boundary for JSON-like data:

```java
public record CreateUserRequest(
        String email,
        String displayName
) {
}

public CreateUserCommand toCommand(CreateUserRequest request) {
    return new CreateUserCommand(
            new EmailAddress(request.email()),
            new DisplayName(request.displayName())
    );
}
```

Do not treat deserialization as validation.

| Format concern    | Correct response                           |
| ----------------- | ------------------------------------------ |
| missing fields    | validation/defaulting policy               |
| unknown fields    | compatibility policy                       |
| null fields       | null policy                                |
| date/time format  | explicit formatter/time zone               |
| polymorphic types | strict allowed-type policy                 |
| large payload     | size limits and streaming                  |
| external schema   | version compatibility                      |
| secrets           | exclude from serialization/logging         |
| object invariants | reconstruct through validated domain types |

Java built-in serialization danger zone:

```java
public final class User implements Serializable {
    private static final long serialVersionUID = 1L;
}
```

Recognize this in legacy code, but do not default to it for untrusted data or public protocols.

**Tempting but wrong mental model:** “Serialization is automatic persistence.”

**Surprising behavior or bug:** A serialized object becomes incompatible after class changes, leaks fields, bypasses invariants, or creates security risk.

**Correct semantic explanation:** Serialization is an external representation boundary. It requires schema, validation, compatibility, and security decisions.

**Professional rule of thumb:** Use explicit DTOs/schemas for external formats. Translate into validated domain types. Treat built-in Java serialization as legacy/specialized unless there is a strong reason.

**Common Pitfalls:**
Do not deserialize untrusted data with unsafe mechanisms. Do not expose domain objects directly as API payloads without considering compatibility. Do not rely on `toString` as serialization. Do not confuse Base64 with encryption.

### Networking and HTTP — `java.net`, `java.net.http`, URIs, clients, timeouts

Java includes standard networking APIs and a modern HTTP client. Network calls are effect boundaries: they can block, fail, timeout, retry, return partial data, or expose security concerns.

| Task                  | Standard API               | Use                              | Caveat                                          |
| --------------------- | -------------------------- | -------------------------------- | ----------------------------------------------- |
| Represent URI         | `URI`                      | parsed URI                       | validate scheme/host/path                       |
| Represent URL         | `URL`                      | legacy/interoperability          | can involve handlers; prefer `URI` for modeling |
| HTTP client           | `java.net.http.HttpClient` | standard HTTP calls              | configure timeouts/executors                    |
| HTTP request          | `HttpRequest`              | build request                    | body/headers/security                           |
| HTTP response         | `HttpResponse<T>`          | response with typed body handler | status handling needed                          |
| Socket-level work     | `Socket`, `ServerSocket`   | low-level networking             | resource and protocol complexity                |
| Encode URL components | URI builders/external libs | query/path construction          | string concatenation risk                       |

Simple HTTP GET:

```java
HttpClient client = HttpClient.newHttpClient();

HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://example.com/users/123"))
        .timeout(Duration.ofSeconds(5))
        .GET()
        .build();

HttpResponse<String> response =
        client.send(request, HttpResponse.BodyHandlers.ofString());

if (response.statusCode() == 200) {
    String body = response.body();
}
```

Async request:

```java
CompletableFuture<HttpResponse<String>> future =
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
```

HTTP boundary wrapper:

```java
public final class UserDirectoryClient {
    private final HttpClient client;
    private final URI baseUri;

    public UserDirectoryClient(HttpClient client, URI baseUri) {
        this.client = Objects.requireNonNull(client);
        this.baseUri = Objects.requireNonNull(baseUri);
    }

    public Optional<UserProfile> fetch(UserId id) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(baseUri.resolve("/users/" + id.value()))
                .timeout(Duration.ofSeconds(3))
                .GET()
                .build();

        try {
            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 404) {
                return Optional.empty();
            }
            if (response.statusCode() != 200) {
                throw new UserDirectoryException("unexpected status: " + response.statusCode());
            }

            return Optional.of(parseProfile(response.body()));
        } catch (IOException e) {
            throw new UserDirectoryException("user directory I/O failure", e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new UserDirectoryException("interrupted while calling user directory", e);
        }
    }
}
```

| Network concern  | Rule                                  |
| ---------------- | ------------------------------------- |
| timeout          | always set meaningful timeout         |
| interruption     | restore interrupt status              |
| HTTP status      | treat status code as part of protocol |
| retry            | use explicit retry policy             |
| idempotency      | retry only when safe                  |
| authentication   | avoid logging secrets/tokens          |
| URI construction | avoid unsafe string concatenation     |
| response parsing | validate external data                |
| TLS/certificates | do not bypass validation casually     |
| resource limits  | bound body size and concurrency       |

**Tempting but wrong mental model:** “An HTTP call is just a method call.”

**Surprising behavior or bug:** The call blocks, times out, returns a 500, returns malformed JSON, or succeeds twice after retrying a non-idempotent operation.

**Correct semantic explanation:** Network calls are unreliable external effects. Their failure, latency, security, and protocol semantics must be modeled.

**Professional rule of thumb:** Wrap network APIs behind clients/gateways. Set timeouts. Translate failures. Validate responses. Preserve interruption.

**Common Pitfalls:**
Do not call external services from getters or hidden helpers. Do not retry non-idempotent requests blindly. Do not ignore status codes. Do not concatenate unescaped user input into URIs. Do not swallow `InterruptedException`.

### Command-Line, Processes, and OS Interaction — args, environment, `ProcessBuilder`

Java can interact with command-line arguments, environment variables, system properties, and subprocesses. These are OS/process boundaries and should be parsed and validated like any other external input.

| Task                 | Standard API           | Use                 | Caveat                         |
| -------------------- | ---------------------- | ------------------- | ------------------------------ |
| Read CLI args        | `String[] args`        | entry point input   | parse/validate                 |
| Read environment     | `System.getenv`        | process config      | string-only, external          |
| Read system property | `System.getProperty`   | JVM config          | string-only                    |
| Start subprocess     | `ProcessBuilder`       | external command    | injection, deadlock, exit code |
| Inspect process      | `ProcessHandle`        | process metadata    | platform differences           |
| Exit process         | `System.exit`          | CLI/app termination | abrupt shutdown                |
| Temporary files      | `Files.createTempFile` | temp data           | cleanup                        |

CLI parsing by hand:

```java
public static void main(String[] args) {
    if (args.length != 2) {
        System.err.println("usage: app <input> <output>");
        System.exit(2);
    }

    Path input = Path.of(args[0]);
    Path output = Path.of(args[1]);

    run(input, output);
}
```

For serious CLIs, ecosystem libraries such as `picocli` are often preferable, but the same boundary rule applies: parse external strings into typed commands.

Environment config:

```java
String rawPort = System.getenv("PORT");

Port port = Port.parse(rawPort)
        .orElseThrow(() -> new IllegalArgumentException("invalid PORT"));
```

Subprocess:

```java
ProcessBuilder builder = new ProcessBuilder("git", "status", "--short");
builder.redirectErrorStream(true);

Process process = builder.start();

String output;
try (InputStream in = process.getInputStream()) {
    output = new String(in.readAllBytes(), StandardCharsets.UTF_8);
}

int exitCode = process.waitFor();
if (exitCode != 0) {
    throw new IllegalStateException("command failed: " + exitCode);
}
```

For large outputs, do not use `readAllBytes` casually. Stream or redirect output.

| Subprocess concern   | Rule                                             |
| -------------------- | ------------------------------------------------ |
| command construction | pass arguments separately, avoid shell injection |
| output size          | stream or bound                                  |
| stderr/stdout        | consume both or redirect                         |
| exit code            | check it                                         |
| timeout              | enforce for long-running commands                |
| environment          | set explicitly if needed                         |
| working directory    | set intentionally                                |
| interruption         | preserve interrupt status                        |
| secrets              | avoid command-line secret exposure               |

**Tempting but wrong mental model:** “Running a subprocess is like calling a function.”

**Surprising behavior or bug:** The process hangs because output streams are not consumed, or command injection occurs through shell string construction.

**Correct semantic explanation:** A subprocess is an external OS-level effect with independent execution, output streams, exit status, environment, and failure modes.

**Professional rule of thumb:** Use `ProcessBuilder` with argument lists, check exit codes, bound execution, and handle streams carefully.

**Common Pitfalls:**
Do not build shell command strings from untrusted input. Do not ignore process output streams. Do not assume environment variables exist. Do not call `System.exit` deep inside library code.
### Configuration — properties, environment variables, typed config, validation

Configuration is external input. It may come from properties files, environment variables, command-line flags, system properties, secrets managers, framework config, or deployment platforms. The central rule is: **do not let raw strings spread through the application**.

| Configuration source | Java/API form             | Best use                | Caveat                       |
| -------------------- | ------------------------- | ----------------------- | ---------------------------- |
| System property      | `System.getProperty`      | JVM/application flags   | stringly typed               |
| Environment variable | `System.getenv`           | deployment config       | missing/malformed values     |
| Properties file      | `java.util.Properties`    | simple key-value config | flat string model            |
| Command-line args    | `String[] args`           | CLI configuration       | parsing burden               |
| Framework config     | Spring/MicroProfile/etc.  | enterprise applications | framework-specific semantics |
| Secrets manager      | ecosystem/cloud API       | credentials/secrets     | lifecycle/security           |
| Build config         | Maven/Gradle properties   | build-time behavior     | not runtime config           |
| Resource file        | classpath/module resource | packaged defaults       | environment override needed  |

Weak configuration handling:

```java
String port = System.getenv("PORT");
server.start(Integer.parseInt(port));
```

Stronger typed configuration:

```java
public record ServerConfig(Host host, Port port, Duration timeout) {
    public ServerConfig {
        Objects.requireNonNull(host);
        Objects.requireNonNull(port);
        Objects.requireNonNull(timeout);

        if (timeout.isNegative() || timeout.isZero()) {
            throw new IllegalArgumentException("timeout must be positive");
        }
    }
}
```

Load and validate once:

```java
public final class ServerConfigLoader {
    public ServerConfig load(Map<String, String> env) {
        Host host = Host.parse(env.getOrDefault("HOST", "localhost"))
                .orElseThrow(() -> new IllegalArgumentException("invalid HOST"));

        Port port = Port.parse(env.getOrDefault("PORT", "8080"))
                .orElseThrow(() -> new IllegalArgumentException("invalid PORT"));

        Duration timeout = parseDuration(env.getOrDefault("TIMEOUT_SECONDS", "30"));

        return new ServerConfig(host, port, timeout);
    }

    private Duration parseDuration(String rawSeconds) {
        try {
            long seconds = Long.parseLong(rawSeconds);
            return Duration.ofSeconds(seconds);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("invalid TIMEOUT_SECONDS", e);
        }
    }
}
```

`Properties` example:

```java
Properties properties = new Properties();

try (Reader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
    properties.load(reader);
}

String host = properties.getProperty("host", "localhost");
String rawPort = properties.getProperty("port", "8080");
```

Then translate to domain config:

```java
ServerConfig config = new ServerConfig(
        new Host(host),
        Port.parse(rawPort).orElseThrow(),
        Duration.ofSeconds(30)
);
```

| Config concern              | Better practice                              |
| --------------------------- | -------------------------------------------- |
| Missing value               | default intentionally or fail early          |
| Malformed value             | parse and reject at startup                  |
| Secret value                | do not log                                   |
| Numeric value               | encode units in name or type                 |
| Boolean flag                | parse strictly                               |
| Time duration               | use `Duration`, not raw `long`               |
| Path                        | use `Path`, validate access                  |
| Feature flag                | define explicit enum/boolean config          |
| Environment-specific config | load at boundary, not throughout domain code |

**Tempting but wrong mental model:** “Configuration is just strings.”

**Surprising behavior or bug:** `"30"` is interpreted as milliseconds in one place, seconds in another, and minutes in documentation.

**Correct semantic explanation:** Configuration strings are external data. They require parsing, unit interpretation, validation, and typed representation.

**Professional rule of thumb:** Load configuration at startup or boundary, validate it once, and pass typed config objects inward.

**Common Pitfalls:**
Do not call `System.getenv` throughout business logic. Do not log secrets. Do not store timeouts as naked integers. Do not let configuration parsing fail deep inside request handling when it could fail at startup.

### Logging and Observability — logging APIs, structured context, metrics, tracing, JFR

Java has standard logging APIs, but professional code often uses ecosystem logging abstractions and observability tools. Logging is not just printing; it is part of failure diagnosis, production operation, security, and performance analysis.

| Task                   | Standard / ecosystem API         | Purpose                          | Caveat                              |
| ---------------------- | -------------------------------- | -------------------------------- | ----------------------------------- |
| Basic standard logging | `java.util.logging`              | JDK logging                      | less common in many enterprise apps |
| Logging abstraction    | SLF4J                            | decouple API from implementation | implementation required             |
| Logging implementation | Logback, Log4j                   | actual logging backend           | config/security matters             |
| Metrics                | Micrometer, MicroProfile Metrics | counters, timers, gauges         | cardinality risk                    |
| Tracing                | OpenTelemetry                    | distributed request flow         | context propagation                 |
| Runtime events         | JFR                              | JVM/application profiling events | requires interpretation             |
| Management             | JMX, management APIs             | runtime inspection               | security/configuration              |
| Diagnostics commands   | `jcmd`, heap/thread dumps        | production debugging             | operational access needed           |

Typical logging style with an ecosystem logger:

```java
private static final Logger logger =
        LoggerFactory.getLogger(UserService.class);

public void createUser(CreateUserCommand command) {
    logger.info("creating user email={}", command.email().redacted());

    User user = User.create(command.email(), command.displayName());
    repository.save(user);

    logger.info("created user id={}", user.id());
}
```

Use parameterized logging rather than string concatenation:

```java
logger.debug("loaded {} users for account {}", users.size(), accountId);
```

Avoid:

```java
logger.debug("loaded " + users.size() + " users for account " + accountId);
```

The latter eagerly builds the string even if debug logging is disabled.

| Log level                | Usual meaning                               | Bad use                    |
| ------------------------ | ------------------------------------------- | -------------------------- |
| `TRACE`                  | very detailed diagnostic flow               | always-on high-volume logs |
| `DEBUG`                  | developer/operator debugging                | business-critical events   |
| `INFO`                   | normal significant lifecycle/business event | logging every tiny step    |
| `WARN`                   | unexpected but recoverable issue            | routine expected failures  |
| `ERROR`                  | failure requiring attention                 | every validation error     |
| fatal/severe equivalents | serious termination-level failure           | ordinary exceptions        |

Logging should avoid sensitive data:

| Sensitive category     | Avoid logging                           |
| ---------------------- | --------------------------------------- |
| Passwords              | raw password, hash depending context    |
| Tokens                 | access token, refresh token, session ID |
| Payment data           | full card number, CVV                   |
| Personal data          | unnecessary PII                         |
| Secrets                | API keys, private keys                  |
| Raw payloads           | large/untrusted request bodies          |
| Internal security data | authorization headers                   |

Metrics are different from logs. A log records an event; a metric aggregates behavior.

```java
timer.record(() -> service.process(command));
counter.increment();
```

Tracing records cross-service causality. In distributed systems, trace context must propagate across HTTP, messaging, and async boundaries.

JFR is a JVM-level observability tool useful for allocation, CPU, GC, lock contention, thread behavior, file/network events, and application-specific events when instrumented.

| Observability question          | Better tool                      |
| ------------------------------- | -------------------------------- |
| What happened for this request? | logs + trace                     |
| How often does it happen?       | metrics                          |
| Why is latency high?            | metrics + trace + profiler/JFR   |
| Why is memory growing?          | heap dump + allocation profiling |
| Why are threads blocked?        | thread dump + JFR                |
| Which dependency fails?         | logs + metrics + tracing         |
| What changed after deployment?  | metrics and release markers      |

**Tempting but wrong mental model:** “Logging more means better observability.”

**Surprising behavior or bug:** Excessive logs hide the important failure, leak secrets, increase cost, or degrade performance.

**Correct semantic explanation:** Observability is structured evidence about system behavior. Logs are only one signal.

**Professional rule of thumb:** Log meaningful boundary events and failures; measure aggregate behavior with metrics; diagnose runtime behavior with traces, JFR, dumps, and profilers.

**Common Pitfalls:**
Do not log secrets. Do not log and rethrow the same exception at every layer. Do not use logs as the only metric source. Do not put high-cardinality unbounded values into metric labels. Do not ignore JVM-level observability when diagnosing Java performance.

### Testing — JUnit, assertions, fixtures, mocks, integration tests

Java has the `assert` keyword, but professional testing usually relies on JUnit and ecosystem tools. Testing should verify behavior, boundaries, invariants, and integration assumptions.

| Testing task        | Common tool/API                           | Best use                           | Caveat                                     |
| ------------------- | ----------------------------------------- | ---------------------------------- | ------------------------------------------ |
| Unit tests          | JUnit 5                                   | local behavior                     | do not overmock                            |
| Assertions          | JUnit assertions, AssertJ                 | readable expectations              | assertion quality matters                  |
| Mocking             | Mockito or similar                        | external collaborator substitution | brittle interaction tests                  |
| Integration tests   | JUnit + real dependencies/test containers | database/API/framework behavior    | slower                                     |
| Parameterized tests | JUnit parameterized tests                 | input matrix                       | avoid unreadable test data                 |
| Temporary files     | JUnit temp dir support / `Files`          | filesystem tests                   | cleanup                                    |
| Time control        | `Clock`                                   | deterministic time behavior        | inject time source                         |
| Exception testing   | `assertThrows`                            | failure contract                   | check meaningful message/cause when useful |
| Concurrency tests   | specialized tools / repeated tests        | race-prone behavior                | hard to prove absence of race              |
| Build integration   | Maven/Gradle test tasks                   | automated execution                | test categorization needed                 |

JUnit-style test:

```java
class UserIdTest {
    @Test
    void rejectsBlankValue() {
        assertThrows(IllegalArgumentException.class, () -> new UserId(""));
    }

    @Test
    void acceptsNonBlankValue() {
        UserId id = new UserId("u-001");

        assertEquals("u-001", id.value());
    }
}
```

Test domain logic directly:

```java
class OrderTest {
    @Test
    void shippedOrderCannotBeCancelled() {
        Order order = Order.shipped();

        assertThrows(IllegalStateException.class, order::cancel);
    }
}
```

Use mocks for true boundaries:

```java
class CheckoutServiceTest {
    @Test
    void chargesPaymentGateway() {
        PaymentGateway gateway = mock(PaymentGateway.class);
        OrderRepository orders = new InMemoryOrderRepository();

        CheckoutService service = new CheckoutService(orders, gateway);

        // test behavior
    }
}
```

Do not mock value objects:

```java
// Bad idea in most cases:
UserId id = mock(UserId.class);
```

Use real simple values.

| Test type          | Verifies                   | Should not replace           |
| ------------------ | -------------------------- | ---------------------------- |
| Unit test          | local rules and behavior   | integration tests            |
| Integration test   | real component interaction | precise unit tests           |
| Contract test      | API/provider expectations  | full end-to-end tests        |
| End-to-end test    | complete workflow          | targeted failure diagnosis   |
| Property-like test | many input cases           | domain examples              |
| Regression test    | specific fixed bug         | broader design review        |
| Performance test   | cost/latency behavior      | functional correctness tests |

Test fixture pattern:

```java
final class TestUsers {
    static User activeUser() {
        return new User(
                new UserId("u-001"),
                new EmailAddress("ada@example.com"),
                UserStatus.ACTIVE
        );
    }
}
```

Fixture helpers are useful when they clarify. They are harmful when they hide important setup.

| Testing smell                    | Why it is bad                          | Better practice                               |
| -------------------------------- | -------------------------------------- | --------------------------------------------- |
| Many mocks per test              | design too coupled or test too brittle | test domain directly, isolate true boundaries |
| Testing private methods          | testing implementation detail          | test observable behavior                      |
| Sleep-based async tests          | slow/flaky                             | use synchronization/time control              |
| Random test data without meaning | hard to debug                          | named examples or controlled generators       |
| Only happy-path tests            | missing failure contracts              | test boundary/failure cases                   |
| Assertions too broad             | false confidence                       | assert specific behavior                      |
| Tests depend on order            | flaky                                  | isolate state                                 |
| Real network in unit test        | slow/flaky                             | fake gateway or integration test category     |

**Tempting but wrong mental model:** “A unit test should mock all collaborators.”

**Surprising behavior or bug:** Tests pass while the actual domain behavior is wrong, because the test verifies mock interactions rather than state and outcomes.

**Correct semantic explanation:** Tests should verify observable behavior at the right boundary. Mocking is a tool for replacing external or difficult collaborators, not a universal testing style.

**Professional rule of thumb:** Test pure domain behavior with real objects. Mock external boundaries. Use integration tests for frameworks, persistence, networking, and configuration.

**Common Pitfalls:**
Do not mock simple values. Do not test private methods directly unless forced by legacy constraints. Do not use `Thread.sleep` as synchronization. Do not let tests rely on global mutable state. Do not ignore failure cases.

### Debugging and Profiling — debugger, stack traces, JFR, heap dumps, thread dumps

Java offers strong runtime diagnostics. Professional debugging requires reading stack traces, understanding exception chains, inspecting heap/thread state, and distinguishing source-level bugs from runtime/environment failures.

| Diagnostic task         | Tool/API                      | Use                          |
| ----------------------- | ----------------------------- | ---------------------------- |
| Step through code       | IDE debugger                  | local logic debugging        |
| Understand failure      | stack trace                   | exception path               |
| Preserve cause          | exception chaining            | root-cause analysis          |
| Inspect threads         | thread dump, `jstack`, `jcmd` | deadlocks/blocking           |
| Inspect heap            | heap dump                     | memory retention             |
| Profile runtime         | JFR/profiler                  | CPU, allocation, locks, I/O  |
| Inspect JVM             | `jcmd`, JMX                   | runtime diagnostics          |
| Detect dependency issue | stack trace + build tree      | classpath/version conflicts  |
| Benchmark               | JMH                           | controlled microbenchmarking |
| Log context             | structured logs               | production diagnosis         |

Exception chaining:

```java
try {
    client.call();
} catch (IOException e) {
    throw new ExternalServiceException("failed to call user service", e);
}
```

Do not discard the cause:

```java
throw new ExternalServiceException("failed"); // poor if original exception existed
```

A stack trace is read from the thrown exception downward through call frames. The top frames usually show where the exception occurred; lower frames show how execution arrived there. The root cause may be nested under `Caused by`.

| Runtime symptom          | Likely diagnostic                           |
| ------------------------ | ------------------------------------------- |
| `NullPointerException`   | inspect null-producing path and contract    |
| `ClassCastException`     | inspect dynamic type boundary/cast          |
| `NoSuchMethodError`      | dependency version mismatch                 |
| `ClassNotFoundException` | missing runtime dependency                  |
| `OutOfMemoryError`       | heap dump, allocation/retention analysis    |
| high CPU                 | CPU profiler/JFR                            |
| high allocation          | allocation profiler/JFR                     |
| deadlock                 | thread dump                                 |
| request latency          | traces, metrics, JFR                        |
| GC pauses                | GC logs/JFR                                 |
| slow startup             | class loading, framework, JIT, I/O analysis |

Thread dump diagnosis:

| Thread state    | Possible meaning                        |
| --------------- | --------------------------------------- |
| `RUNNABLE`      | running or waiting in native/OS context |
| `BLOCKED`       | waiting for monitor lock                |
| `WAITING`       | waiting indefinitely                    |
| `TIMED_WAITING` | sleeping/timed wait                     |
| deadlock report | monitor cycle detected                  |

Heap dump diagnosis focuses on what retains memory, not merely what allocates memory. A memory leak in Java usually means objects remain reachable longer than intended.

| Java memory issue         | Meaning                        |
| ------------------------- | ------------------------------ |
| high allocation rate      | many objects created           |
| retention leak            | objects remain reachable       |
| cache growth              | unbounded map/cache            |
| listener leak             | references not removed         |
| classloader leak          | old app classes retained       |
| thread leak               | threads keep objects reachable |
| direct/native memory leak | off-heap resource not closed   |

Microbenchmarking should use JMH rather than ad hoc loops because JIT warmup, dead-code elimination, inlining, and runtime profiling can mislead ordinary timing code.

Bad benchmark:

```java
long start = System.nanoTime();

for (int i = 0; i < 1_000_000; i++) {
    methodUnderTest();
}

long elapsed = System.nanoTime() - start;
```

This can be misleading. Use JMH for serious microbenchmarks.

**Tempting but wrong mental model:** “A stack trace tells the whole cause.”

**Surprising behavior or bug:** The visible exception is only a wrapper; the real cause is nested, or the source failure is a dependency/runtime mismatch.

**Correct semantic explanation:** Java failures often involve source code, exception translation, dependency versions, class loading, threads, GC, or framework proxies.

**Professional rule of thumb:** Preserve causes, read full stack traces, use JVM diagnostics for runtime symptoms, and benchmark with tools designed for JVM behavior.

**Common Pitfalls:**
Do not catch and rethrow without cause. Do not diagnose memory leaks by allocation alone. Do not trust naive microbenchmarks. Do not ignore `NoSuchMethodError` as a coding typo; it often indicates dependency mismatch.

### Concurrency and Async Utilities — threads, executors, futures, atomics, locks, concurrent collections

Java’s standard concurrency ecosystem is rich. It includes platform threads, virtual threads, executors, futures, locks, atomics, concurrent collections, synchronizers, and memory-visibility mechanisms.

| Task                | Standard API                                | Best use                    | Caveat                               |
| ------------------- | ------------------------------------------- | --------------------------- | ------------------------------------ |
| Run thread          | `Thread`                                    | low-level task execution    | lifecycle management                 |
| Many blocking tasks | virtual threads / virtual-thread executor   | I/O-heavy concurrency       | resource limits still matter         |
| Task execution      | `ExecutorService`                           | manage task submission      | shutdown required                    |
| Future result       | `Future<T>`                                 | blocking retrieval          | limited composition                  |
| Async composition   | `CompletableFuture<T>`                      | compose async stages        | executor/exception complexity        |
| Scheduled task      | `ScheduledExecutorService`                  | delayed/periodic execution  | drift and failure handling           |
| Mutual exclusion    | `synchronized`, `Lock`                      | protect shared state        | deadlocks/contention                 |
| Visibility flag     | `volatile`                                  | simple visibility           | not compound atomicity               |
| Atomic state        | `AtomicInteger`, `AtomicReference`          | simple atomic updates       | complex invariants need more         |
| Concurrent map      | `ConcurrentHashMap`                         | concurrent key-value access | compound workflows still need design |
| Blocking queue      | `BlockingQueue`                             | producer-consumer           | backpressure/capacity                |
| Latches/barriers    | `CountDownLatch`, `CyclicBarrier`, `Phaser` | coordination                | misuse can deadlock                  |
| Semaphore           | `Semaphore`                                 | limit concurrency           | permit leaks                         |

Executor lifecycle:

```java
ExecutorService executor = Executors.newFixedThreadPool(4);

try {
    Future<Result> future = executor.submit(this::compute);
    Result result = future.get();
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
    throw new RuntimeException("interrupted", e);
} catch (ExecutionException e) {
    throw new RuntimeException("task failed", e.getCause());
} finally {
    executor.shutdown();
}
```

Virtual-thread executor:

```java
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<User> user = executor.submit(() -> userClient.load(userId));
    Future<Account> account = executor.submit(() -> accountClient.load(accountId));

    return new UserAccount(user.get(), account.get());
}
```

Blocking queue:

```java
BlockingQueue<Job> queue = new ArrayBlockingQueue<>(1_000);

public void submit(Job job) throws InterruptedException {
    queue.put(job);
}

public Job take() throws InterruptedException {
    return queue.take();
}
```

Atomic counter:

```java
AtomicInteger count = new AtomicInteger();

int next = count.incrementAndGet();
```

Concurrent map:

```java
ConcurrentHashMap<UserId, UserSession> sessions = new ConcurrentHashMap<>();

UserSession session = sessions.computeIfAbsent(userId, this::createSession);
```

Be cautious if `createSession` performs expensive or blocking work.

| Concurrency problem           | Better tool                                     |
| ----------------------------- | ----------------------------------------------- |
| protect multi-field invariant | lock/synchronized                               |
| simple counter                | atomic                                          |
| producer-consumer             | blocking queue                                  |
| concurrent lookup/update      | concurrent map                                  |
| limit concurrency             | semaphore                                       |
| wait for tasks                | futures/latches                                 |
| run many blocking I/O tasks   | virtual threads                                 |
| compose async pipeline        | `CompletableFuture`                             |
| periodic task                 | scheduled executor                              |
| immutable sharing             | records/value objects with immutable components |

**Tempting but wrong mental model:** “Concurrent collection means the whole workflow is thread-safe.”

**Surprising behavior or bug:** Individual map operations are thread-safe, but a check-then-act sequence races.

**Correct semantic explanation:** Concurrent collections protect their own operations. They do not automatically make external multi-step invariants atomic.

**Professional rule of thumb:** Choose the concurrency utility that matches the coordination problem: state protection, task execution, message passing, atomic update, or resource limiting.

**Common Pitfalls:**
Do not ignore `InterruptedException`. Do not create executors without shutting them down. Do not use unbounded queues casually. Do not assume virtual threads remove backpressure needs. Do not protect complex invariants with multiple independent atomics.

### Package and Dependency Workflows — Maven, Gradle, repositories, BOMs, scopes

Java dependency management is mostly ecosystem-driven. Maven and Gradle are the dominant build/dependency tools. A professional Java learner should understand not only commands, but what the tools are managing: source sets, compilation, tests, resources, packaging, plugins, transitive dependencies, scopes, and version alignment.

| Task               | Maven concept                      | Gradle concept            | Meaning                        |
| ------------------ | ---------------------------------- | ------------------------- | ------------------------------ |
| Build project      | lifecycle phases                   | tasks                     | compile/test/package actions   |
| Declare dependency | `<dependency>`                     | `dependencies {}`         | external library               |
| Dependency scope   | `compile`, `test`, `runtime`, etc. | configurations            | where dependency is visible    |
| Version alignment  | BOM / dependency management        | platform/version catalogs | consistent dependency versions |
| Plugin             | build plugin                       | plugin                    | build behavior extension       |
| Test execution     | Surefire/Failsafe                  | test tasks                | unit/integration test control  |
| Artifact           | JAR/WAR/etc.                       | archive tasks             | build output                   |
| Repository         | Maven repository                   | repository block          | dependency source              |

Maven-style dependency:

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
</dependency>
```

Gradle-style dependency:

```groovy
dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.0")
}
```

Dependency scope matters:

| Scope/configuration  | Meaning                                                             |
| -------------------- | ------------------------------------------------------------------- |
| compile/API          | needed to compile main code                                         |
| implementation       | needed internally, not exposed as API in Gradle Java Library plugin |
| runtime              | needed at runtime                                                   |
| test                 | needed for tests                                                    |
| annotation processor | needed for code generation/analysis                                 |
| provided/compileOnly | needed to compile, supplied by runtime environment                  |

Transitive dependencies can create runtime problems:

| Problem                              | Symptom                          | Response                                |
| ------------------------------------ | -------------------------------- | --------------------------------------- |
| conflicting versions                 | `NoSuchMethodError`              | inspect dependency tree, align versions |
| missing runtime dependency           | `ClassNotFoundException`         | correct scope/runtime dependency        |
| duplicate libraries                  | unpredictable behavior           | exclude/align                           |
| incompatible framework versions      | startup/runtime failure          | use BOM/compatibility matrix            |
| dependency brings vulnerable library | security issue                   | update/exclude/override                 |
| dependency too broad                 | large attack/performance surface | choose narrower library                 |

A BOM helps align versions across related artifacts:

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>example-bom</artifactId>
            <version>1.2.3</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

| Dependency decision           | Professional rule                                  |
| ----------------------------- | -------------------------------------------------- |
| Add library                   | justify capability, maintenance, license, security |
| Upgrade library               | check compatibility and transitive changes         |
| Exclude transitive dependency | know why it was included                           |
| Use snapshot/dynamic version  | avoid in production release builds                 |
| Use BOM                       | align framework/library families                   |
| Use annotation processor      | understand generated code boundary                 |
| Shade dependency              | avoid conflicts but audit relocation               |
| Depend on implementation type | avoid if API abstraction exists                    |

**Tempting but wrong mental model:** “Dependency management is just downloading JARs.”

**Surprising behavior or bug:** Code compiles but fails at runtime because the wrong transitive version is loaded.

**Correct semantic explanation:** Java dependency management controls compile-time class visibility, runtime class availability, version alignment, plugin behavior, and artifact packaging.

**Professional rule of thumb:** Treat dependencies as part of architecture. Inspect dependency trees, align versions, avoid unnecessary libraries, and distinguish API dependencies from implementation dependencies.

**Common Pitfalls:**
Do not add dependencies for trivial utilities. Do not ignore transitive conflicts. Do not use dynamic versions in reproducible builds. Do not confuse test dependency scope with runtime availability.

### Build, Packaging, and Distribution — `javac`, JARs, `jar`, `jlink`, `jpackage`, target release

Java build outputs can be class files, JARs, modular JARs, runtime images, installers, containers, or framework-specific packages. The JDK includes tools, while Maven/Gradle orchestrate them in real projects.

| Task                              | Tool/API     | Purpose                             |
| --------------------------------- | ------------ | ----------------------------------- |
| Compile                           | `javac`      | source to class files               |
| Run                               | `java`       | launch JVM application              |
| Archive                           | `jar`        | package classes/resources           |
| Document                          | `javadoc`    | generate API docs                   |
| Analyze dependencies              | `jdeps`      | inspect module/package dependencies |
| Create runtime image              | `jlink`      | custom JVM runtime image            |
| Create native package/installable | `jpackage`   | package application                 |
| Compile with target               | `--release`  | target Java platform API/version    |
| Build lifecycle                   | Maven/Gradle | project automation                  |

Simple compile/run:

```bash
javac Main.java
java Main
```

Compile with target release:

```bash
javac --release 21 Main.java
```

`--release` is important because it constrains both language/API availability for the target platform. Setting only source/target levels historically could still accidentally use newer APIs.

Create JAR:

```bash
jar --create --file app.jar -C out .
```

Run JAR with main manifest or explicit classpath depending packaging.

Runtime image with `jlink` is relevant for modular applications:

```bash
jlink --module-path mods:$JAVA_HOME/jmods \
      --add-modules com.example.app \
      --output image
```

Packaging choices:

| Distribution form                 | Best use                        | Caveat                               |
| --------------------------------- | ------------------------------- | ------------------------------------ |
| Plain class files                 | learning/simple local use       | not production packaging             |
| JAR                               | libraries and applications      | dependency handling                  |
| Fat/uber JAR                      | self-contained app artifact     | dependency conflicts/shading         |
| WAR                               | traditional servlet containers  | framework/container-specific         |
| Modular JAR                       | JPMS-aware library/app          | module discipline                    |
| Custom runtime image              | controlled runtime distribution | module path required                 |
| Installer/package                 | desktop/server install          | platform-specific                    |
| Container image                   | cloud/server deployment         | image size, JVM/container config     |
| Native-image-style ecosystem tool | startup/footprint goals         | compatibility/reflection constraints |

| Build concern        | Rule                                     |
| -------------------- | ---------------------------------------- |
| reproducibility      | pin versions and plugins                 |
| target JDK           | use `--release` or build-tool equivalent |
| dependency packaging | know classpath vs bundled dependencies   |
| resources            | verify they are included in artifact     |
| generated code       | ensure build order is correct            |
| tests                | separate unit/integration phases         |
| modularity           | distinguish classpath and module path    |
| deployment JVM       | match supported runtime version          |
| startup/memory       | tune runtime and packaging form          |

**Tempting but wrong mental model:** “If it runs in the IDE, the build is correct.”

**Surprising behavior or bug:** Packaged application misses resources, uses wrong dependency versions, or runs on an unsupported JDK.

**Correct semantic explanation:** IDE execution is one environment. Build artifacts and deployment runtime define the real distribution boundary.

**Professional rule of thumb:** Verify builds through command-line Maven/Gradle/JDK tools, target the intended Java release, and test the packaged artifact.

**Common Pitfalls:**
Do not rely only on IDE classpaths. Do not compile against a newer API when deploying to an older runtime. Do not assume resources are packaged. Do not ignore the difference between classpath and module path.

### Documentation Tools and API Reference — Javadoc, generated docs, contracts

Java’s documentation culture is tied to public APIs. Javadoc is not only explanatory text; it can define behavior that signatures cannot express.

| Documentation task | Tool/form                  | Best use                              |
| ------------------ | -------------------------- | ------------------------------------- |
| Public API docs    | Javadoc                    | libraries and reusable modules        |
| Method contract    | Javadoc comments           | null policy, side effects, exceptions |
| Build docs         | Maven/Gradle docs/tasks    | build usage                           |
| Architecture notes | README/design docs         | boundary and dependency rationale     |
| Generated docs     | annotation/framework tools | REST APIs, schemas                    |
| Deprecation docs   | `@Deprecated`, Javadoc     | migration guidance                    |

Example:

```java
/**
 * Finds a user by stable identifier.
 *
 * @param id non-null user identifier
 * @return the matching user, or empty if no user exists
 * @throws UserDirectoryException if the backing directory cannot be queried
 */
Optional<User> findById(UserId id);
```

This documents null policy, absence policy, and failure boundary.

| Contract not fully expressed by type | Document how                            |
| ------------------------------------ | --------------------------------------- |
| null acceptance                      | `@param`, annotations, explicit wording |
| mutability of returned collection    | `@return unmodifiable list`             |
| thread safety                        | class-level docs                        |
| blocking behavior                    | method docs                             |
| side effects                         | method docs and naming                  |
| ownership/lifecycle                  | docs near resource-returning API        |
| performance complexity               | docs when relevant                      |
| compatibility/deprecation            | `@Deprecated` plus migration path       |

Deprecation:

```java
/**
 * @deprecated Use {@link #findById(UserId)} instead.
 */
@Deprecated(since = "2.0", forRemoval = false)
public User getUser(String id) {
    return findById(new UserId(id)).orElse(null);
}
```

**Tempting but wrong mental model:** “Types make documentation unnecessary.”

**Surprising behavior or bug:** Callers misuse APIs because null, mutability, blocking, thread-safety, or side-effect behavior is not visible in the type.

**Correct semantic explanation:** Java types express many constraints, but public API contracts often include behavior beyond type signatures.

**Professional rule of thumb:** Document public contracts where the type system stops: nullability, mutability, side effects, resources, threading, performance, and migration.

**Common Pitfalls:**
Do not write Javadoc that repeats the method name. Do not document behavior that implementation does not guarantee. Do not deprecate without a replacement or migration rule when one exists.

### Standard Library vs Ecosystem Alternative — decision rules

Java’s standard library is broad but not always the best tool for every professional task. Ecosystem libraries often provide better ergonomics, framework integration, or specialized capability. But every dependency adds maintenance, security, and compatibility cost.

| Task             | Standard library option  | Ecosystem alternative               | Decision rule                                         |
| ---------------- | ------------------------ | ----------------------------------- | ----------------------------------------------------- |
| Collections      | `java.util`              | Guava, Eclipse Collections          | standard first; external for specialized needs        |
| JSON             | limited standard support | Jackson, Gson, JSON-B               | use ecosystem/framework standard                      |
| HTTP client      | `java.net.http`          | OkHttp, Apache HttpClient, Netty    | standard for general use; external for advanced needs |
| Logging          | `java.util.logging`      | SLF4J + backend                     | ecosystem common in enterprise                        |
| Testing          | limited JDK assertions   | JUnit, AssertJ, Mockito             | ecosystem standard                                    |
| CLI parsing      | manual args              | picocli, Commons CLI                | external for nontrivial CLI                           |
| File utilities   | `Files`                  | Commons IO                          | standard first                                        |
| Text utilities   | `String`, regex          | Commons Text, ICU4J                 | external for advanced text/i18n                       |
| Config           | `Properties`, env        | Spring/MicroProfile/Typesafe Config | depends on app/framework                              |
| Metrics/tracing  | JMX/JFR basics           | Micrometer, OpenTelemetry           | ecosystem for production observability                |
| Dependency/build | JDK tools                | Maven, Gradle                       | ecosystem standard for real projects                  |

Dependency decision checklist:

| Question         | Add dependency if                     | Avoid dependency if             |
| ---------------- | ------------------------------------- | ------------------------------- |
| Capability       | standard library lacks needed feature | standard API is enough          |
| Maintenance      | library is active/stable              | library is abandoned            |
| Security         | vulnerability posture acceptable      | history or current risk is poor |
| Size             | cost acceptable                       | trivial helper dependency       |
| Compatibility    | fits JDK/framework versions           | causes version conflicts        |
| License          | acceptable                            | incompatible license            |
| Team familiarity | maintainers can use it                | obscure tool for simple problem |
| Replacement cost | hard functionality                    | easy to write safely            |

**Tempting but wrong mental model:** “Standard library is always inferior to ecosystem libraries.”

**Surprising behavior or bug:** A small external dependency introduces transitive conflicts, vulnerabilities, or runtime incompatibilities.

**Correct semantic explanation:** Libraries trade implementation effort for dependency risk. The standard library trades feature depth for stability and portability.

**Professional rule of thumb:** Use the standard library by default for common tasks it handles well. Add dependencies when they provide substantial, maintained, well-understood value.

**Common Pitfalls:**
Do not add libraries for one-line helpers. Do not reimplement complex, security-sensitive functionality casually. Do not ignore transitive dependencies. Do not choose libraries solely by popularity without compatibility and maintenance review.

### Task-Oriented Standard Library Reference — compact map

| Task                            | Standard library / tool                   | Canonical use                      | Caveat                             |
| ------------------------------- | ----------------------------------------- | ---------------------------------- | ---------------------------------- |
| Null checks                     | `Objects.requireNonNull`                  | constructor/API boundary           | not full validation                |
| Equality                        | `Objects.equals`, records                 | null-safe/component equality       | design equality intentionally      |
| Collections                     | `List`, `Set`, `Map`, `Queue`             | data contracts                     | mutability and equality matter     |
| Immutable-ish collection result | `List.copyOf`, `Set.copyOf`, `Map.copyOf` | boundary copies                    | shallow immutability               |
| Text building                   | `StringBuilder`                           | repeated concatenation             | not thread-safe                    |
| Regex                           | `Pattern`, `Matcher`                      | reusable regex matching            | escaping and performance           |
| Time                            | `java.time`                               | `Instant`, `LocalDate`, `Duration` | choose correct time concept        |
| Testable time                   | `Clock`                                   | inject current time                | do not call `now()` everywhere     |
| Paths/files                     | `Path`, `Files`                           | file operations                    | charset/resource/security          |
| Stream I/O                      | `InputStream`, `Reader`, NIO              | streaming data                     | close resources                    |
| Properties                      | `Properties`                              | simple config                      | strings only                       |
| HTTP                            | `HttpClient`                              | standard HTTP calls                | timeouts/status/errors             |
| URI                             | `URI`                                     | parsed resource identifier         | construction/escaping              |
| Processes                       | `ProcessBuilder`                          | subprocess execution               | stream/exit/timeout                |
| Base64                          | `Base64`                                  | binary-text encoding               | not encryption                     |
| ZIP/GZIP                        | `java.util.zip`                           | compression                        | zip-slip/resource limits           |
| Concurrency                     | `ExecutorService`, `CompletableFuture`    | task execution                     | lifecycle/error handling           |
| Concurrent data                 | `ConcurrentHashMap`, atomics              | shared state tools                 | compound invariants                |
| Diagnostics                     | JFR, `jcmd`, management APIs              | runtime analysis                   | requires operational knowledge     |
| Compile/package                 | `javac`, `jar`, `jlink`                   | build/distribute                   | usually orchestrated by build tool |
| Documentation                   | `javadoc`                                 | API docs                           | contract accuracy                  |

### Core Ecosystem Reference — compact professional map

| Task                         | Common ecosystem tool            | Role                                         | Common misuse                                   |
| ---------------------------- | -------------------------------- | -------------------------------------------- | ----------------------------------------------- |
| Build/dependencies           | Maven                            | standard lifecycle and dependency management | treating dependency conflicts as random         |
| Build/dependencies           | Gradle                           | flexible build automation                    | overcomplicated custom build logic              |
| Testing                      | JUnit 5                          | unit/integration test framework              | tests without meaningful assertions             |
| Assertions                   | AssertJ                          | fluent assertions                            | overly broad assertions                         |
| Mocking                      | Mockito                          | boundary substitution                        | mocking value/domain objects                    |
| JSON                         | Jackson                          | common JSON binding                          | exposing domain objects directly                |
| Logging abstraction          | SLF4J                            | logging API                                  | missing/incorrect backend                       |
| Logging backend              | Logback/Log4j                    | log implementation                           | secret leakage, noisy logs                      |
| Metrics                      | Micrometer                       | application metrics                          | high-cardinality labels                         |
| Tracing                      | OpenTelemetry                    | distributed tracing                          | missing context propagation                     |
| Containers/integration tests | Testcontainers                   | real dependency testing                      | slow tests without categorization               |
| CLI                          | picocli                          | robust command parsing                       | using for trivial args                          |
| Utility libraries            | Guava/Commons                    | collections/text/I/O helpers                 | dependency for trivial functionality            |
| Enterprise frameworks        | Spring/Jakarta/Micronaut/Quarkus | application frameworks                       | confusing framework behavior with Java language |
| Persistence                  | JPA/Hibernate/jOOQ/etc.          | database access                              | leaking persistence model into domain/API       |

### Standard Library Cost Model — common hidden costs

| Operation or pattern         | Usual cost                       | Hidden cost                                   | How to detect it          | When it matters                 | When not to optimize prematurely |
| ---------------------------- | -------------------------------- | --------------------------------------------- | ------------------------- | ------------------------------- | -------------------------------- |
| Object allocation            | cheap individually               | GC pressure at high volume                    | allocation profiler/JFR   | hot loops, large services       | ordinary domain objects          |
| Boxing/unboxing              | wrapper allocation or null risk  | GC and `NullPointerException`                 | profiler, code inspection | numeric-heavy paths             | normal collections/API use       |
| String concatenation in loop | repeated copying/allocation      | many intermediate strings                     | profiler/code review      | large loops                     | few strings                      |
| Regex compilation            | pattern compilation              | repeated cost                                 | code review/profiler      | hot path regex                  | one-off validation               |
| `List.copyOf`                | shallow copy                     | allocation proportional to size               | profiler                  | large frequent copies           | API boundary safety              |
| Streams                      | pipeline objects/lambdas         | allocation/debug complexity                   | profiler/JFR              | hot paths, primitive-heavy code | clear transformations            |
| Parallel streams             | task scheduling                  | contention, wrong pool, side effects          | profiler/thread analysis  | CPU-bound pure work             | I/O or small collections         |
| Reflection                   | dynamic lookup/invocation        | slower and less type-safe                     | profiler/stack traces     | framework hot paths             | startup/config use               |
| `HashMap` lookup             | near constant average            | bad hash/equality, resizing                   | profiling, logs           | large maps/hot paths            | small maps                       |
| File whole read              | memory proportional to file size | OOM/latency                                   | heap/profile              | large files                     | small configs                    |
| HTTP call                    | network latency                  | timeout/retry/resource cost                   | traces/metrics            | production services             | local mock/test                  |
| Executor creation            | thread/lifecycle cost            | thread leaks                                  | thread dumps              | repeated creation               | app-level executor               |
| Virtual threads              | low per-thread cost              | still consumes memory and downstream capacity | metrics/JFR               | many blocking tasks             | small concurrency                |
| Logging                      | usually moderate                 | formatting, I/O, volume                       | log metrics/profiler      | high-volume paths               | normal boundary logs             |
| Dependency addition          | no runtime syntax cost           | transitive conflicts/security                 | dependency tree/scanner   | production artifacts            | well-maintained essential libs   |

### Library and Ecosystem Failure Mode Index

| Failure mode              | Symptom                               | Root cause                               | Correction                                                  |
| ------------------------- | ------------------------------------- | ---------------------------------------- | ----------------------------------------------------------- |
| Wrong collection contract | duplicates/order bugs                 | `List` used for all groups               | choose `Set`, `Map`, `Queue`, etc.                          |
| Mutable return leak       | caller mutates internals              | collection exposed directly              | defensive copy/unmodifiable return                          |
| Charset bug               | garbled text                          | default encoding assumed                 | specify `StandardCharsets.UTF_8` or required charset        |
| Time-zone bug             | wrong event time                      | wrong `java.time` type                   | choose `Instant`, `LocalDate`, `ZonedDateTime` deliberately |
| Resource leak             | file/connection exhaustion            | stream not closed                        | `try-with-resources`                                        |
| HTTP hang                 | request never returns                 | missing timeout                          | set timeouts                                                |
| Lost interruption         | thread cancellation fails             | swallowed `InterruptedException`         | restore interrupt                                           |
| Dependency conflict       | `NoSuchMethodError`                   | transitive version mismatch              | dependency tree/version alignment                           |
| Over-mocking              | brittle tests                         | mock used for everything                 | test domain with real objects                               |
| Naive benchmark           | misleading performance result         | JIT/GC ignored                           | JMH/profiler                                                |
| Logging secrets           | security incident                     | raw data logged                          | redaction and policy                                        |
| Framework confusion       | annotation not applied                | object not framework-managed/proxy issue | understand lifecycle and test integration                   |
| JSON/domain coupling      | API changes break domain or leak data | domain object serialized directly        | DTO boundary                                                |
| Process deadlock          | subprocess hangs                      | stdout/stderr not consumed               | handle streams and timeout                                  |
| Config drift              | runtime failure                       | raw config parsed late                   | typed startup validation                                    |
## PART 7 — Semantics, Runtime, Memory, Concurrency, and Implementation Model

### Orientation — source semantics, JVM execution, runtime behavior, implementation strategy

Java must be understood at two levels at once.

At the **language level**, Java defines what source code means: variables, expressions, statements, classes, interfaces, arrays, exceptions, initialization, generics, lambdas, modules, and the Java Memory Model.

At the **runtime level**, Java programs execute on a JVM. Source is compiled into class files; class files are loaded, linked, verified, initialized, interpreted or JIT-compiled, and executed under a managed memory and threading model. The Java SE 25 JVM specification explicitly organizes topics such as class-file format, runtime data areas, frames, object representation, instruction sets, class loading/linking/initialization, verification, modules, access control, method overriding, and method selection. ([Oracle Documentation][1])

| Layer                | Question answered                     | Example                                                      |
| -------------------- | ------------------------------------- | ------------------------------------------------------------ |
| Java syntax          | What source forms are legal?          | `if`, `switch`, `record`, `class`, `try`                     |
| Java semantics       | What does legal source mean?          | evaluation order, overload resolution, exception propagation |
| Java type system     | What is checked statically?           | assignment compatibility, generics, checked exceptions       |
| JVM class-file model | What does compiled code look like?    | constant pool, methods, fields, attributes                   |
| JVM execution model  | How does runtime execute class files? | frames, operand stack, heap, method area                     |
| JVM linking model    | How are symbolic references resolved? | class loading, verification, preparation, resolution         |
| JVM implementation   | How does a concrete JVM optimize?     | JIT compilation, GC, profiling, deoptimization               |
| JDK tooling          | How is code built/diagnosed?          | `javac`, `java`, `jcmd`, JFR, heap dumps                     |
| Ecosystem runtime    | How do frameworks alter execution?    | proxies, reflection, generated code, dependency injection    |

This part is not a replacement for the Java Language Specification or the JVM Specification. It is a semantic and runtime guide for professional reasoning: why Java code behaves as it does, where the language guarantee stops, and where JVM/runtime implementation begins.

### Syntax vs Semantics — source form, meaning, execution, specification boundary

Syntax is the shape of code. Semantics is its meaning. Runtime behavior is what happens when the program executes. Implementation strategy is how a particular JVM makes that execution efficient.

```java
int x = a + b;
```

This source line has several layers:

| Layer                   | Interpretation                                                       |
| ----------------------- | -------------------------------------------------------------------- |
| Syntax                  | local variable declaration with initializer                          |
| Static typing           | `a + b` must be type-compatible with `int`                           |
| Evaluation semantics    | operands are evaluated, numeric operation performed, result assigned |
| Runtime behavior        | values loaded, operation executed, local variable slot updated       |
| Implementation strategy | JVM may interpret, compile, inline, or optimize depending on context |

The Java Language Specification includes detailed sections for expressions, evaluation order, statements, exceptions, execution, definite assignment, and the memory model; the SE 25 specification index explicitly includes evaluation-order examples and Java Memory Model examples such as happens-before consistency and final-field behavior. ([Oracle Documentation][2])

| Confusion                                                 | Correct separation                                                                                                    |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| “Java is compiled, so runtime does not matter.”           | Java source is compiled, but the JVM runtime deeply shapes performance and diagnostics.                               |
| “JIT behavior is Java semantics.”                         | JIT is implementation strategy, not source-level meaning.                                                             |
| “Garbage collection makes objects disappear immediately.” | GC is runtime memory management, not deterministic object lifetime.                                                   |
| “Imports load classes.”                                   | Imports affect source-name resolution; class loading happens at runtime.                                              |
| “Generics exist fully at runtime.”                        | Java generics mostly enforce compile-time type constraints and are erased for ordinary runtime type identity.         |
| “A method call is just a direct function call.”           | Method invocation may involve overload resolution, dynamic dispatch, reflection, proxy interception, or JIT inlining. |

**Tempting but wrong mental model:** “The source code is the runtime behavior.”

**Surprising behavior or bug:** Source looks simple, but runtime includes class loading, dynamic dispatch, proxy interception, JIT warmup, allocation, GC, synchronization, or reflection.

**Correct semantic explanation:** Java source semantics are specified independently of many JVM implementation strategies. Runtime behavior must be understood as the interaction between specified semantics, JVM execution, and concrete implementation.

**Professional rule of thumb:** Use the language specification to reason about correctness; use JVM/runtime diagnostics to reason about performance and production behavior.

**Boundary where the rule changes:** Some source-visible behavior directly reflects runtime rules, such as `ClassCastException`, `NullPointerException`, `ArrayStoreException`, dynamic dispatch, and exception propagation.

### Expression and Statement Semantics — evaluation order, side effects, abrupt completion

Java expressions and statements have precise evaluation rules. Unlike C and C++, Java gives strong left-to-right evaluation guarantees for many expression forms. The Java SE 25 JLS index includes examples for left-hand operand evaluation first, operand evaluation before operation, method invocation evaluation order, array-reference evaluation, compound assignment behavior, string concatenation, and definite assignment. ([Oracle Documentation][2])

| Semantic area           | Java behavior                                                        | Practical consequence                             |                          |                                   |
| ----------------------- | -------------------------------------------------------------------- | ------------------------------------------------- | ------------------------ | --------------------------------- |
| Operand evaluation      | operands are evaluated before the operation                          | side effects occur before operation result        |                          |                                   |
| Method invocation       | target and arguments are evaluated before invocation                 | argument side effects happen before method body   |                          |                                   |
| Short-circuit operators | `&&` and `                                                           |                                                   | ` may skip right operand | useful for null checks and guards |
| Assignment expression   | assignment stores value and produces assigned value                  | can be used in expressions but may reduce clarity |                          |                                   |
| Compound assignment     | left-hand side evaluated in specific order; implicit cast may occur  | can hide narrowing                                |                          |                                   |
| Abrupt completion       | exceptions, `return`, `break`, `continue`, `throw` alter normal flow | cleanup and control transfer matter               |                          |                                   |
| Definite assignment     | compiler checks variable assignment structurally                     | local variables must be assigned before read      |                          |                                   |
| String concatenation    | `+` has string-specific behavior                                     | can hide allocation/cost                          |                          |                                   |

Example of evaluation order:

```java
int a = 1;

int result = a++ + a++;

System.out.println(result); // 3
System.out.println(a);      // 3
```

This is legal, but professional code should avoid such expressions because the side effects are too dense. Java defines the evaluation order, but defined does not mean readable.

Short-circuiting:

```java
if (user != null && user.isActive()) {
    send(user);
}
```

The right side is evaluated only if the left side is true.

Non-short-circuit operator:

```java
if (user != null & user.isActive()) {
    send(user);
}
```

Here both sides are evaluated, so `user.isActive()` can throw `NullPointerException`.

Abrupt completion:

```java
public String label(User user) {
    if (user == null) {
        throw new IllegalArgumentException("user");
    }

    if (!user.isActive()) {
        return "inactive";
    }

    return "active";
}
```

Execution may complete normally by returning a value, or abruptly by throwing an exception.

`finally` behavior:

```java
public void write(Path path, String text) throws IOException {
    BufferedWriter writer = Files.newBufferedWriter(path);

    try {
        writer.write(text);
    } finally {
        writer.close();
    }
}
```

This closes the writer whether the `try` block completes normally or abruptly. In modern Java, `try-with-resources` is preferred for closeable resources.

| Source pattern                       | Semantic caution                          |           |                    |
| ------------------------------------ | ----------------------------------------- | --------- | ------------------ |
| `a++ + a++`                          | defined but hard to read                  |           |                    |
| `x = y = z`                          | assignment expression; can obscure intent |           |                    |
| `condition && method()`              | method may not run                        |           |                    |
| `condition                           |                                           | method()` | method may not run |
| `return` inside `try` with `finally` | `finally` still executes                  |           |                    |
| `throw` inside `finally`             | may mask original exception               |           |                    |
| `break` / `continue` in nested loops | may not exit intended scope               |           |                    |
| assignment in condition              | legal, often suspicious                   |           |                    |

**Tempting but wrong mental model:** “If Java defines evaluation order, complex expressions are fine.”

**Surprising behavior or bug:** Code with increments, assignments, method calls, and short-circuiting is technically defined but misread by maintainers.

**Correct semantic explanation:** Java’s evaluation order prevents some undefined behavior, but semantic clarity still depends on limiting side effects inside expressions.

**Professional rule of thumb:** Keep side-effecting expressions simple. Use statements for mutation and control flow; use expressions for values.

**Boundary where the rule changes:** Small idioms such as `while ((line = reader.readLine()) != null)` are common, but they should remain localized and recognizable.

**Common Pitfalls:**
Do not use clever increment expressions in production logic. Do not put resource cleanup in `finally` if `try-with-resources` is available. Do not throw from `finally` unless intentionally replacing the original failure. Do not confuse `&` with `&&`.

### Binding, Scope, and Lifetime Semantics — variables, fields, references, object reachability

A variable is a named storage location. Its **scope** is where the name can be used. Its **lifetime** is how long the storage exists. For reference variables, the variable’s lifetime is not the same as the referenced object’s lifetime.

```java
public User load(UserId id) {
    User user = repository.findById(id)
            .orElseThrow();

    return user;
}
```

The local variable `user` exists only during method execution. The object it references may live longer if returned and referenced elsewhere.

| Entity           | Scope                            | Lifetime                                           | Notes                            |
| ---------------- | -------------------------------- | -------------------------------------------------- | -------------------------------- |
| Local variable   | from declaration to end of block | during block execution                             | must be definitely assigned      |
| Parameter        | method/lambda/catch body         | during invocation                                  | value passed by value            |
| Instance field   | class body and qualified access  | as long as object is reachable                     | belongs to object                |
| Static field     | class-level access               | as long as class is loaded/reachable               | shared state                     |
| Pattern variable | flow-scoped region               | during matched control path                        | scope depends on pattern success |
| Object           | no lexical scope                 | until no longer reachable and eventually collected | GC-managed                       |
| Array            | object-like                      | until no longer reachable                          | fixed length                     |
| Resource         | object plus external handle      | until explicitly closed                            | GC is not resource lifecycle     |

Pass-by-value:

```java
static void replace(StringBuilder builder) {
    builder = new StringBuilder("new");
}

static void mutate(StringBuilder builder) {
    builder.append(" updated");
}
```

`replace` changes only the local parameter variable. `mutate` changes the object that the caller also references.

Object reachability:

```java
List<byte[]> cache = new ArrayList<>();

public void add(byte[] data) {
    cache.add(data);
}
```

As long as `cache` remains reachable and holds the arrays, those arrays cannot be garbage-collected. Java memory leaks are usually **retention leaks**, not “forgot to free” leaks.

Static fields extend reachability:

```java
public final class Registry {
    private static final Map<String, Object> VALUES = new HashMap<>();
}
```

Objects placed in `VALUES` may live for the lifetime of the class loader unless removed.

**Tempting but wrong mental model:** “When a method returns, all objects created inside it disappear.”

**Surprising behavior or bug:** An object created inside a method remains alive because it was returned, stored in a field, captured by a lambda, added to a collection, registered as a listener, or referenced by a static cache.

**Correct semantic explanation:** Local variables disappear when their scope/lifetime ends, but heap objects live while reachable from GC roots.

**Professional rule of thumb:** Track references, not construction sites. For memory leaks, ask “what still points to this object?”

**Boundary where the rule changes:** Some JVM optimizations may eliminate allocation or allocate differently when escape analysis proves safety, but this does not change Java-level semantics.

**Common Pitfalls:**
Do not confuse variable lifetime with object lifetime. Do not use static collections as unbounded registries. Do not forget to unregister listeners/callbacks. Do not assume setting a local variable to `null` is useful unless it shortens reachability in a long-lived scope.

### Call Strategy — pass-by-value, object references, aliasing, mutation

Java is pass-by-value. This phrase is often misunderstood because Java values include object references.

```java
public static void main(String[] args) {
    List<String> names = new ArrayList<>();

    addName(names);
    replaceList(names);

    System.out.println(names); // [Ada]
}

static void addName(List<String> list) {
    list.add("Ada");
}

static void replaceList(List<String> list) {
    list = new ArrayList<>();
    list.add("Grace");
}
```

`addName` mutates the object referenced by both caller and callee. `replaceList` reassigns only the local parameter.

| Operation                | What changes?                   |              Caller observes? |
| ------------------------ | ------------------------------- | ----------------------------: |
| mutate referenced object | object state                    | yes, if same object is shared |
| reassign parameter       | callee local variable           |                            no |
| mutate array element     | array object                    |                           yes |
| reassign local variable  | local binding                   |                            no |
| mutate immutable object  | impossible through ordinary API |                            no |
| return new object        | caller may choose to store it   |         only if assigned/used |

Aliasing means multiple references point to the same object:

```java
List<String> a = new ArrayList<>();
List<String> b = a;

b.add("Ada");

System.out.println(a); // [Ada]
```

Aliasing is central to Java’s object model. It enables sharing and polymorphism, but it creates mutation and concurrency hazards.

Defensive copy:

```java
public final class Group {
    private final List<UserId> members;

    public Group(List<UserId> members) {
        this.members = List.copyOf(members);
    }

    public List<UserId> members() {
        return members;
    }
}
```

Without the copy, callers could mutate the internal list.

| Design goal                     | Strategy                                         |
| ------------------------------- | ------------------------------------------------ |
| avoid aliasing                  | copy                                             |
| allow shared read-only data     | immutable/unmodifiable representation            |
| allow controlled mutation       | encapsulate in methods                           |
| allow high-performance mutation | document ownership/confinement                   |
| share across threads            | immutable, synchronized, concurrent, or confined |
| avoid mutation entirely         | return new value objects                         |

**Tempting but wrong mental model:** “Java passes objects by reference.”

**Surprising behavior or bug:** Reassigning a parameter does not affect the caller’s variable.

**Correct semantic explanation:** Java passes values. For reference types, the value is a reference. The referenced object may be shared and mutable.

**Professional rule of thumb:** Distinguish reassignment from mutation. Say “this method mutates the object” rather than “changes the reference.”

**Boundary where the rule changes:** Holder objects, arrays, atomics, and mutable wrappers can simulate out-parameters, but this is explicit object mutation, not different call semantics.

**Common Pitfalls:**
Do not expose mutable internal collections. Do not assume passing a collection is safe because the parameter is `final`. Do not use single-element arrays as out-parameters unless forced by legacy constraints.

### Object Layout and Runtime Representation — references, headers, fields, arrays, implementation caveats

At the Java language level, an object has identity, fields, methods through its class, and monitor behavior. At the JVM implementation level, an object has a representation chosen by the JVM: headers, field layout, alignment, compressed references, class metadata links, and GC information. The JVM specification includes object representation as a topic but does not force every implementation to use one concrete physical layout. ([Oracle Documentation][1])

| Concept         | Language-level view                     | Runtime/implementation view                        |
| --------------- | --------------------------------------- | -------------------------------------------------- |
| object          | instance of a class                     | heap allocation with implementation-defined layout |
| reference       | value referring to object/array or null | machine word or compressed reference depending JVM |
| field           | named member                            | offset/layout decided by JVM                       |
| array           | object with length and elements         | contiguous or implementation-specific layout       |
| object identity | `==`, identity hash, monitor            | header/metadata may support identity operations    |
| class metadata  | `Class<?>` and runtime type             | method area/metaspace-like implementation          |
| monitor         | synchronization target                  | lock state/monitor implementation                  |
| string          | immutable object                        | internal representation optimized by JVM/JDK       |

Java programmers should not write ordinary code that depends on object layout. But they should understand that layout affects memory footprint, cache behavior, false sharing, and performance.

Primitive vs wrapper:

```java
int x = 42;
Integer y = 42;
```

`x` is a primitive value. `y` is a reference to an `Integer` object, except that boxing caches and JIT optimizations may affect observed allocation/performance.

Array of primitives vs array of wrappers:

```java
int[] primitiveValues = new int[1_000_000];
Integer[] boxedValues = new Integer[1_000_000];
```

The primitive array stores primitive elements. The wrapper array stores references to `Integer` objects. This has major memory and locality implications.

| Data shape                   | Memory/performance tendency              |
| ---------------------------- | ---------------------------------------- |
| `int[]`                      | compact primitive storage                |
| `Integer[]`                  | references plus wrapper objects          |
| `List<Integer>`              | wrapper objects and collection overhead  |
| `ArrayList<T>`               | backing object array                     |
| `LinkedList<T>`              | per-node allocation, poor locality       |
| record with primitive fields | object allocation unless optimized       |
| many tiny objects            | allocation/GC pressure                   |
| large object graph           | pointer chasing and retention complexity |

**Tempting but wrong mental model:** “Objects are free because Java has a fast JVM.”

**Surprising behavior or bug:** Code with millions of boxed values or linked nodes uses far more memory and performs worse than expected.

**Correct semantic explanation:** Java abstracts memory layout, but object allocation, references, boxing, and object graphs still have runtime cost.

**Professional rule of thumb:** Model cleanly first, then profile. For large or hot data paths, consider primitive arrays, specialized collections, compact representations, and allocation patterns.

**Boundary where the rule changes:** JVM optimizations such as scalar replacement may remove some allocations, but only when the optimizer can prove safety. Do not rely on it blindly.

**Common Pitfalls:**
Do not use `Integer` where `int` is enough in numeric hot paths. Do not assume `LinkedList` is faster for insertion-heavy code. Do not create huge object graphs without considering memory locality and GC.

### Compilation Pipeline — source, `javac`, class files, bytecode, verification

Java source is usually compiled by `javac` into `.class` files. The JVM executes class files, not Java source directly. The JVM specification includes chapters on compiling for the JVM, class-file format, bytecode instructions, verification, loading, linking, and initialization. ([Oracle Documentation][1])

A simplified pipeline:

```text
.java source
   ↓ javac
.class files
   ↓ class loading
verification + linking + initialization
   ↓ execution
interpretation / JIT compilation
   ↓
machine execution under JVM management
```

| Stage              | What happens                                | Failure examples                            |
| ------------------ | ------------------------------------------- | ------------------------------------------- |
| Source compilation | parse, type-check, compile to class file    | syntax error, type error                    |
| Class loading      | locate binary class representation          | `ClassNotFoundException`                    |
| Verification       | ensure class file obeys safety rules        | `VerifyError`                               |
| Preparation        | allocate/initialize static storage defaults | linkage errors                              |
| Resolution         | resolve symbolic references                 | `NoSuchMethodError`, `NoClassDefFoundError` |
| Initialization     | run class initialization                    | `ExceptionInInitializerError`               |
| Execution          | run methods                                 | ordinary exceptions, runtime behavior       |
| JIT optimization   | compile hot code                            | performance changes, deoptimization         |

Java bytecode is not merely “Java source compressed.” It is an instruction set over local variables, operand stacks, constant pools, method invocation instructions, object creation, branches, exceptions, and synchronization.

| Source construct      | JVM-level idea                                                |
| --------------------- | ------------------------------------------------------------- |
| local variable        | local variable slot                                           |
| expression evaluation | operand stack operations                                      |
| method call           | invocation instruction                                        |
| `new`                 | object creation + constructor invocation                      |
| field access          | get/put field instructions                                    |
| `try/catch`           | exception table entries                                       |
| `synchronized`        | monitor enter/exit                                            |
| lambda                | invokedynamic/metafactory-based implementation in modern Java |
| generics              | signatures/checkcasts plus erasure-related metadata           |

Class file format contains fields, methods, attributes, and a constant pool. The JVMS chapter table explicitly lists the constant pool, field/method descriptors, the `Code` attribute, `StackMapTable`, `Exceptions`, `Signature`, `RuntimeVisibleAnnotations`, `BootstrapMethods`, `Record`, and other attributes. ([Oracle Documentation][1])

**Tempting but wrong mental model:** “Java source is directly interpreted.”

**Surprising behavior or bug:** A program compiles but fails at runtime because a class, method, or dependency is missing or incompatible.

**Correct semantic explanation:** Compilation and runtime linking are separate. The compiler checks source against compile-time dependencies; the JVM links against runtime dependencies.

**Professional rule of thumb:** Treat `NoSuchMethodError`, `NoClassDefFoundError`, and similar errors as classpath/module/dependency boundary problems until proven otherwise.

**Boundary where the rule changes:** Some tools can run source files directly for convenience, but they still compile/execute under Java’s compiler/runtime model.

**Common Pitfalls:**
Do not confuse `import` with runtime dependency availability. Do not assume compile-time and runtime dependency versions match. Do not ignore bytecode-level tools when diagnosing linkage or framework issues.

### Class Loading, Linking, and Initialization — when classes become active

Java classes are loaded and initialized lazily in many ordinary situations. The JVMS specifies loading, linking, and initialization as a major runtime topic. Linking includes verification, preparation, and resolution; initialization runs class initialization logic when required. ([Oracle Documentation][1])

| Phase          | Meaning                                                   | Example concern                    |
| -------------- | --------------------------------------------------------- | ---------------------------------- |
| Loading        | find and create class/interface representation            | classpath/module path/class loader |
| Verification   | validate class-file safety                                | invalid/generated bytecode         |
| Preparation    | prepare static fields with default values                 | before explicit initialization     |
| Resolution     | resolve symbolic references                               | missing method/field/class         |
| Initialization | execute static initializers and static field initializers | side effects and failures          |

Static initialization:

```java
public final class Settings {
    static final String MODE = loadMode();

    static {
        System.out.println("Settings initialized");
    }

    private static String loadMode() {
        return System.getenv().getOrDefault("MODE", "dev");
    }
}
```

Initialization happens when the class is actively used in specified ways, not necessarily when the source file is present.

Initialization failure:

```java
public final class BrokenConfig {
    static final int PORT = Integer.parseInt(System.getenv("PORT"));
}
```

If `PORT` is absent or malformed, class initialization can fail with `ExceptionInInitializerError`.

Initialization order matters:

```java
public class Base {
    static {
        System.out.println("Base");
    }
}

public class Child extends Base {
    static {
        System.out.println("Child");
    }
}
```

Superclass initialization precedes subclass initialization in relevant cases; the JLS examples include superclass initialization before subclass initialization. ([Oracle Documentation][2])

Class loaders also define type identity. The same binary class name loaded by different class loaders can be treated as different runtime classes. This matters in application servers, plugins, agents, test frameworks, and hot-reload systems.

| Class-loading issue          | Symptom                                         |
| ---------------------------- | ----------------------------------------------- |
| missing dependency           | `ClassNotFoundException`                        |
| compile/runtime mismatch     | `NoSuchMethodError`                             |
| class initialization failure | `ExceptionInInitializerError`                   |
| duplicate class versions     | unpredictable linkage/behavior                  |
| class loader mismatch        | `ClassCastException` between same-named classes |
| module export issue          | illegal access                                  |
| reflection not opened        | reflective access failure                       |

**Tempting but wrong mental model:** “A class is loaded when the program starts.”

**Surprising behavior or bug:** A static initializer fails only when a class is first actively used.

**Correct semantic explanation:** Class loading and initialization are runtime processes triggered by use, dependency resolution, class loaders, and module rules.

**Professional rule of thumb:** Avoid heavy, failure-prone work in static initialization. Prefer explicit startup configuration and validation.

**Boundary where the rule changes:** Constants and simple static final fields are usually harmless. Frameworks may deliberately use class loading and reflection as part of startup scanning.

**Common Pitfalls:**
Do not read required configuration in static initializers without a controlled failure path. Do not create hidden side effects during class initialization. Do not ignore class-loader differences in plugin/container environments.

### Method Invocation and Dispatch — overload resolution, overriding, static binding, dynamic dispatch

Java method calls have multiple semantic layers: overload resolution at compile time, overriding and dynamic dispatch at runtime, and possible JIT optimization at implementation time.

```java
interface Formatter {
    String format(Object value);
}

final class JsonFormatter implements Formatter {
    @Override
    public String format(Object value) {
        return "{}";
    }
}

Formatter formatter = new JsonFormatter();
formatter.format(new Object());
```

The variable’s declared type is `Formatter`, but the runtime object is `JsonFormatter`. Instance method invocation dispatches to the overriding implementation.

| Mechanism          | Resolved when                                       | Example                                        |
| ------------------ | --------------------------------------------------- | ---------------------------------------------- |
| Overload selection | compile time                                        | `print(String)` vs `print(Object)`             |
| Override dispatch  | runtime                                             | interface variable calls implementation method |
| Static method call | compile-time reference type                         | not dynamically overridden                     |
| Field access       | based on declared type, not polymorphic in same way | hidden fields                                  |
| Private method     | not overridden                                      | class-local behavior                           |
| Constructor call   | object creation and initialization                  | no dynamic dispatch for constructor itself     |
| Reflection call    | runtime lookup/invocation                           | framework/dynamic behavior                     |
| Proxy call         | runtime interception                                | transactions/security/caching                  |
| JIT inlining       | implementation optimization                         | does not change semantics                      |

Overloading:

```java
void print(Object value) {
    System.out.println("object");
}

void print(String value) {
    System.out.println("string");
}

print("x"); // string
```

Ambiguous or surprising overloads:

```java
void process(Integer value) {}
void process(Long value) {}

// process(null); // ambiguous
```

Overriding:

```java
class Animal {
    String sound() {
        return "?";
    }
}

class Dog extends Animal {
    @Override
    String sound() {
        return "woof";
    }
}

Animal animal = new Dog();
System.out.println(animal.sound()); // woof
```

Static method hiding:

```java
class Base {
    static String name() {
        return "base";
    }
}

class Child extends Base {
    static String name() {
        return "child";
    }
}

Base value = new Child();
System.out.println(value.name()); // base
```

This is why static methods should not be used for polymorphic behavior.

Field hiding:

```java
class Base {
    String label = "base";
}

class Child extends Base {
    String label = "child";
}

Base value = new Child();
System.out.println(value.label); // base
```

Fields are not dynamically dispatched like instance methods.

The JLS index includes examples for method applicability, choosing the most specific method, target references and static methods, evaluation order during invocation, overriding and method invocation, and field access binding. ([Oracle Documentation][2])

**Tempting but wrong mental model:** “The runtime type always decides what member is used.”

**Surprising behavior or bug:** Instance methods are dynamically dispatched, but fields and static methods are not.

**Correct semantic explanation:** Java uses dynamic dispatch for overridable instance methods. Overloading is compile-time selection. Static methods and fields are resolved differently.

**Professional rule of thumb:** Use instance methods/interfaces for polymorphism. Avoid field hiding and static-method hiding.

**Boundary where the rule changes:** JIT may inline dynamic calls after profiling, but it must preserve Java dispatch semantics and may deoptimize if assumptions change.

**Common Pitfalls:**
Do not overload methods in ways that make `null`, boxing, varargs, or generics confusing. Do not rely on static methods for polymorphic behavior. Do not hide fields in subclasses.

### Exception Semantics — throw, stack unwinding, handlers, checked analysis, finally

Exceptions are objects, but exception handling is also a control-flow mechanism. When an exception is thrown, normal execution stops, the stack unwinds, and matching handlers are searched.

| Exception concept    | Meaning                                        |
| -------------------- | ---------------------------------------------- |
| `throw`              | begin abrupt completion with exception object  |
| `catch`              | handle matching exception type                 |
| `finally`            | run cleanup code during exit                   |
| `throws`             | declare checked exception obligation           |
| checked exception    | compile-time handling requirement              |
| unchecked exception  | no compile-time handling requirement           |
| stack trace          | recorded execution path                        |
| cause                | nested underlying failure                      |
| suppressed exception | secondary exception, often from resource close |
| uncaught exception   | reaches thread boundary                        |

Checked exception analysis is part of Java compile-time semantics. The JLS includes sections for kinds and causes of exceptions, compile-time checking of exceptions, and runtime handling of an exception; it also notes examples for catching checked exceptions and throwing/catching exceptions. ([Oracle Documentation][3])

Basic propagation:

```java
public String read(Path path) throws IOException {
    return Files.readString(path);
}
```

Wrapping with cause:

```java
public Config load(Path path) {
    try {
        return parse(Files.readString(path));
    } catch (IOException e) {
        throw new ConfigLoadException("failed to read config: " + path, e);
    }
}
```

`finally` masking danger:

```java
try {
    throw new IllegalStateException("primary");
} finally {
    throw new RuntimeException("cleanup");
}
```

The cleanup exception can obscure the primary exception. `try-with-resources` handles this better by using suppressed exceptions.

Try-with-resources:

```java
try (BufferedReader reader = Files.newBufferedReader(path)) {
    return reader.readLine();
}
```

| Exception pattern   | Use                                  | Risk                       |
| ------------------- | ------------------------------------ | -------------------------- |
| catch and recover   | real fallback/retry                  | false recovery             |
| catch and translate | boundary abstraction                 | losing cause               |
| catch and log       | top-level boundary                   | duplicate logging          |
| catch and ignore    | rare and documented                  | hidden failure             |
| throw checked       | caller must handle/declare           | API pollution              |
| throw unchecked     | propagate contract violation/failure | invisible failure contract |
| result type         | ordinary workflow outcome            | ceremony                   |
| `finally` cleanup   | non-closeable cleanup                | masking exception          |

**Tempting but wrong mental model:** “Catching an exception means the failure is handled.”

**Surprising behavior or bug:** Code catches an exception and continues with corrupted state.

**Correct semantic explanation:** A catch block intercepts control flow. It only handles the failure if it restores a valid state, translates it meaningfully, or reports it at an appropriate boundary.

**Professional rule of thumb:** Catch exceptions where a decision can be made. Preserve causes. Use `try-with-resources` for closeable resources.

**Boundary where the rule changes:** Very low-level adapters may catch exceptions to normalize external APIs; top-level boundaries may catch broadly to log/respond/terminate.

**Common Pitfalls:**
Do not catch `Exception` casually. Do not lose the original cause. Do not throw from `finally` unless intentional. Do not swallow `InterruptedException`.

### Stack, Heap, Frames, and Runtime Data Areas — local variables, operand stack, heap objects

At the JVM level, execution uses runtime data areas including per-thread program-counter registers, Java Virtual Machine stacks, heap, method area, runtime constant pool, native method stacks, and frames. The JVMS table of contents lists these runtime data areas and frame components such as local variables, operand stacks, and dynamic linking. ([Oracle Documentation][1])

| Runtime area           | Rough role                            | Java-level intuition              |
| ---------------------- | ------------------------------------- | --------------------------------- |
| JVM stack              | per-thread stack of frames            | method calls and local execution  |
| Frame                  | one method invocation context         | local variables and operand stack |
| Local variables array  | stores local values/references        | method locals and parameters      |
| Operand stack          | temporary computation stack           | expression evaluation             |
| Heap                   | shared object/array allocation area   | objects and arrays                |
| Method area / metadata | class-level runtime data              | loaded classes, metadata          |
| Runtime constant pool  | constants and symbolic references     | class-file constants/resolution   |
| Native method stack    | native execution support              | JNI/native calls                  |
| PC register            | current execution position per thread | instruction tracking              |

Java source does not expose these areas directly, but understanding them helps explain recursion, stack overflow, heap memory, object reachability, method invocation, and bytecode execution.

Recursion and stack:

```java
public int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
```

Each recursive call creates a new frame. Deep recursion can cause `StackOverflowError`.

Heap allocation:

```java
User user = new User(id, email);
```

The object is allocated on the heap in Java-level reasoning, though JVM optimizations may eliminate or scalar-replace some allocations if safe.

Object graph retention:

```java
Map<UserId, User> cache = new HashMap<>();
cache.put(user.id(), user);
```

The map retains references to keys and values, so the objects remain reachable.

| Symptom                             | Likely runtime area                       |
| ----------------------------------- | ----------------------------------------- |
| `StackOverflowError`                | JVM stack frames                          |
| `OutOfMemoryError: Java heap space` | heap                                      |
| class metadata leak                 | method area/metaspace-like implementation |
| native memory growth                | native/off-heap memory                    |
| too many threads                    | stacks and thread resources               |
| high allocation rate                | heap allocation pressure                  |
| many loaded classes                 | class metadata/class loaders              |
| deadlock                            | monitors/locks/threads                    |

**Tempting but wrong mental model:** “All memory problems are heap problems.”

**Surprising behavior or bug:** Memory pressure may come from heap objects, thread stacks, direct buffers, native libraries, class metadata, or class loader retention.

**Correct semantic explanation:** The JVM has multiple runtime data areas and may use both managed heap and native/off-heap resources.

**Professional rule of thumb:** Diagnose memory problems by evidence: heap dumps, native memory tracking, thread counts, class loader analysis, GC logs, and JFR.

**Boundary where the rule changes:** The exact implementation names and layouts vary across JVMs. HotSpot-specific terms should not be treated as universal JVM specification terms.

**Common Pitfalls:**
Do not assume every `OutOfMemoryError` has the same cause. Do not use recursion deeply unless bounded. Do not ignore class loader leaks in plugin/container systems.

### Garbage Collection and Reachability — managed memory, retention, finalization, resource distinction

Java uses garbage collection for heap memory. GC reclaims objects that are no longer reachable. It does not guarantee immediate reclamation, deterministic object destruction, or external-resource cleanup.

| Concept                      | Meaning                                                             |
| ---------------------------- | ------------------------------------------------------------------- |
| reachable object             | object accessible from GC roots through references                  |
| unreachable object           | eligible for garbage collection                                     |
| GC root                      | starting point such as thread stacks, static fields, JNI refs, etc. |
| retention                    | object remains reachable longer than intended                       |
| allocation rate              | speed of object creation                                            |
| live set                     | objects that remain reachable after collection                      |
| pause                        | time during which application progress may be affected              |
| throughput                   | useful work vs GC work                                              |
| latency                      | responsiveness/pause sensitivity                                    |
| finalization                 | obsolete/dangerous cleanup mechanism                                |
| cleaner/reference mechanisms | specialized fallback cleanup tools                                  |

A Java memory leak:

```java
public final class EventBus {
    private final List<Listener> listeners = new ArrayList<>();

    public void register(Listener listener) {
        listeners.add(listener);
    }
}
```

If listeners are never removed, they remain reachable through the bus.

Resource leak:

```java
InputStream in = Files.newInputStream(path);
// no close
```

Even if the stream object becomes unreachable later, the file descriptor should not be left to delayed cleanup. Use `try-with-resources`.

| Memory/resource issue        |                                        GC helps? | Correct tool                        |
| ---------------------------- | -----------------------------------------------: | ----------------------------------- |
| unreachable ordinary objects |                                              yes | GC                                  |
| reachable but unused objects |                                               no | remove references/cache policy      |
| open file descriptor         |                                     not reliably | `close` / try-with-resources        |
| database connection          |                                               no | close/return to pool                |
| native memory                | maybe through wrapper if designed, not automatic | explicit lifecycle                  |
| thread leak                  |                                               no | shutdown/cancellation               |
| classloader leak             |                not until classloader unreachable | remove references                   |
| listener leak                |                                               no | unregister/weak refs if appropriate |

Allocation examples:

```java
for (int i = 0; i < 1_000_000; i++) {
    String value = "user-" + i;
    process(value);
}
```

This may allocate many strings. Whether it matters depends on hotness, object lifetime, GC, and workload.

Boxing allocation risk:

```java
List<Integer> values = new ArrayList<>();

for (int i = 0; i < 1_000_000; i++) {
    values.add(i);
}
```

This stores boxed `Integer` objects, not primitive `int` values.

| GC-related design choice     | Benefit                         | Cost                               |
| ---------------------------- | ------------------------------- | ---------------------------------- |
| many small immutable objects | clean modeling                  | allocation pressure                |
| object pooling               | fewer allocations in some cases | complexity, retention, often worse |
| unbounded cache              | faster lookup                   | memory leak risk                   |
| weak references              | avoid retention                 | complexity and unpredictability    |
| primitive arrays             | compact storage                 | lower abstraction                  |
| immutable snapshots          | safety                          | copy allocation                    |
| reuse mutable buffer         | lower allocation                | aliasing/concurrency risk          |

**Tempting but wrong mental model:** “Java has GC, so memory management is not a concern.”

**Surprising behavior or bug:** Application runs out of memory because caches, listeners, static fields, or queues retain objects indefinitely.

**Correct semantic explanation:** GC reclaims unreachable objects. It does not decide which reachable objects are semantically no longer needed.

**Professional rule of thumb:** Manage reachability and resource ownership explicitly. Use GC as memory reclamation, not lifecycle design.

**Boundary where the rule changes:** Short-lived object allocation can be very cheap on modern JVMs. Optimize allocation only when profiling shows it matters.

**Common Pitfalls:**
Do not build unbounded caches. Do not rely on finalizers. Do not keep unnecessary references in static fields. Do not pool ordinary objects without evidence. Do not forget that `ThreadLocal` values can cause retention problems.

### JIT Compilation and Runtime Optimization — warmup, profiling, inlining, deoptimization

A HotSpot-class JVM can interpret code first, profile execution, compile hot methods to machine code, inline calls, optimize allocations, and deoptimize if assumptions become invalid. These implementation strategies do not change Java semantics, but they strongly affect performance.

| Runtime optimization concept | Meaning                                        | Practical consequence           |
| ---------------------------- | ---------------------------------------------- | ------------------------------- |
| interpretation               | execute bytecode without compiled machine code | startup path                    |
| profiling                    | collect runtime type/branch/hotness data       | guides optimization             |
| JIT compilation              | compile hot code to machine code               | warmup matters                  |
| inlining                     | replace call with callee body                  | reduces dispatch overhead       |
| escape analysis              | prove object does not escape                   | allocation may be optimized     |
| scalar replacement           | replace object with fields/registers           | allocation may disappear        |
| deoptimization               | revert optimized code when assumptions fail    | performance may shift           |
| tiered compilation           | multiple compilation levels                    | warmup profile changes          |
| safepoint                    | runtime coordination point                     | GC/profiling/deopt coordination |

Bad benchmark pattern:

```java
long start = System.nanoTime();

for (int i = 0; i < 1_000_000; i++) {
    methodUnderTest();
}

long elapsed = System.nanoTime() - start;
```

This may measure warmup, dead-code elimination artifacts, or unrelated runtime effects. Use JMH for serious microbenchmarks.

Source-level performance myths:

| Myth                                   | Better model                                                  |
| -------------------------------------- | ------------------------------------------------------------- |
| method call is always expensive        | JIT may inline hot calls                                      |
| object allocation is always expensive  | short-lived allocation can be cheap, sometimes optimized away |
| streams are always slow                | depends on pipeline, allocation, boxing, hotness              |
| reflection is always unacceptable      | often fine at startup/config; problematic in hot paths        |
| `final` always improves performance    | may help design; JIT often infers enough                      |
| virtual dispatch prevents optimization | JIT can inline monomorphic/hot call sites                     |
| Java performance is fixed at startup   | runtime profile changes matter                                |

JIT performance is workload-specific. A method may be slow during startup and fast after warmup. A benchmark may change after different inputs, class loading, GC behavior, or CPU conditions.

**Tempting but wrong mental model:** “Java performance can be inferred from source code alone.”

**Surprising behavior or bug:** Code becomes faster after warmup, slower after a dependency change, or behaves differently under production traffic than in a naive benchmark.

**Correct semantic explanation:** Java performance is shaped by source semantics, library choices, JVM profiling, JIT compilation, GC, CPU, memory, I/O, and workload.

**Professional rule of thumb:** Use profiling and realistic benchmarks. Optimize hot paths based on evidence, not stereotypes.

**Boundary where the rule changes:** Some costs are obvious enough to avoid without profiling: unbounded I/O, unclosed resources, quadratic algorithms, blocking inside global locks, and unnecessary large object retention.

**Common Pitfalls:**
Do not trust naive microbenchmarks. Do not optimize cold code. Do not assume JIT will fix bad algorithms. Do not interpret one JVM/version/workload result as universal.

### Generics and Type Erasure — compile-time safety, runtime limits, heap pollution

Java generics are mostly a compile-time type-safety mechanism. They allow APIs such as `List<String>` and `Map<UserId, User>` to express type relationships, but ordinary runtime objects do not carry complete generic type arguments in the way many learners expect.

```java
List<String> names = new ArrayList<>();
names.add("Ada");

// names.add(42); // compile-time error
```

At runtime, `ArrayList<String>` and `ArrayList<Integer>` are not distinct runtime classes in the ordinary sense. The generic type arguments are mostly erased.

| Source-level form        | Compile-time meaning                                   | Runtime caveat                                       |
| ------------------------ | ------------------------------------------------------ | ---------------------------------------------------- |
| `List<String>`           | list whose elements are statically treated as `String` | runtime object is an `ArrayList`/list implementation |
| `Map<UserId, User>`      | keys and values constrained statically                 | type arguments mostly unavailable at runtime         |
| `<T> T first(List<T>)`   | input and output type linked                           | no direct `T.class`                                  |
| `List<?>`                | list of unknown element type                           | elements read as `Object`                            |
| `List<? extends Number>` | producer of `Number` values                            | cannot add arbitrary `Number`                        |
| `List<? super Integer>`  | consumer of `Integer` values                           | reads only as `Object` safely                        |
| raw `List`               | generic checking disabled                              | unsafe legacy compatibility                          |

Erasure explains why this is not allowed:

```java
public final class Box<T> {
    // public T create() {
    //     return new T(); // impossible
    // }
}
```

The runtime does not know what `T` is as a constructible class. Pass a type token or factory:

```java
public final class BoxFactory<T> {
    private final Supplier<T> supplier;

    public BoxFactory(Supplier<T> supplier) {
        this.supplier = Objects.requireNonNull(supplier);
    }

    public T create() {
        return supplier.get();
    }
}
```

Or when a runtime class object is enough:

```java
public final class Parser<T> {
    private final Class<T> type;

    public Parser(Class<T> type) {
        this.type = Objects.requireNonNull(type);
    }

    public T cast(Object value) {
        return type.cast(value);
    }
}
```

But `Class<T>` is not enough for full nested generic information such as `List<String>`.

Unchecked cast:

```java
Object value = List.of("Ada", "Grace");

@SuppressWarnings("unchecked")
List<String> names = (List<String>) value;
```

This warning means the compiler cannot verify the generic element type. The cast checks whether the object is a `List`, but not whether every element is a `String`.

Heap pollution example:

```java
List<String> strings = new ArrayList<>();

@SuppressWarnings({"rawtypes", "unchecked"})
List raw = strings;

raw.add(42);

String first = strings.get(0); // ClassCastException later
```

The failure appears far from the unsafe operation.

| Erasure consequence                             | Practical effect                                             |
| ----------------------------------------------- | ------------------------------------------------------------ |
| no `new T()`                                    | use supplier/factory                                         |
| no `T.class`                                    | pass `Class<T>` when enough                                  |
| no `instanceof List<String>`                    | use `instanceof List<?>` then validate elements              |
| raw types bypass safety                         | avoid except legacy adapters                                 |
| unchecked warnings matter                       | isolate and justify                                          |
| generic arrays problematic                      | prefer collections                                           |
| bridge methods may appear in bytecode           | implementation detail of generics/overriding                 |
| runtime reflection has partial generic metadata | declarations may expose signatures, instances usually do not |

**Tempting but wrong mental model:** “Generics make Java types fully available at runtime.”

**Surprising behavior or bug:** `instanceof List<String>` is not valid, unchecked casts compile with warnings, and wrong element types fail later.

**Correct semantic explanation:** Java generics mostly enforce compile-time constraints. Runtime type identity is shaped by erased classes and casts.

**Professional rule of thumb:** Treat unchecked warnings as type-safety boundary alarms. Keep them small, validated, and documented.

**Boundary where the rule changes:** Reflection can inspect some generic declarations, such as field or method signatures, but this is not the same as every object carrying complete runtime generic type arguments.

**Common Pitfalls:**
Do not use raw types in new code. Do not suppress unchecked warnings broadly. Do not cast whole generic collections without validating elements. Do not design APIs that require runtime access to erased type parameters unless a type-token strategy is supplied.

### Arrays vs Generics — reification, covariance, runtime store checks

Arrays and generics are a classic Java semantic mismatch. Arrays are reified and covariant; generics are erased and mostly invariant.

```java
String[] strings = new String[1];
Object[] objects = strings;

objects[0] = 42; // ArrayStoreException
```

This compiles because arrays are covariant: `String[]` is a subtype of `Object[]`. It fails at runtime because the actual array knows its component type is `String`.

Generic collections reject the analogous assignment:

```java
List<String> strings = new ArrayList<>();

// List<Object> objects = strings; // compile-time error
```

| Feature                     | Arrays                    | Generics                        |
| --------------------------- | ------------------------- | ------------------------------- |
| Runtime component/type info | reified                   | mostly erased                   |
| Variance                    | covariant                 | invariant by default            |
| Store check                 | runtime                   | compile-time generic checks     |
| Primitive support           | yes, `int[]`              | no `List<int>` in ordinary Java |
| Size                        | fixed                     | collection-dependent            |
| API richness                | low                       | high                            |
| Common domain use           | buffers, interop, varargs | most collections                |
| Main sharp edge             | `ArrayStoreException`     | unchecked casts/heap pollution  |

Generic arrays are restricted:

```java
// List<String>[] array = new List<String>[10]; // not allowed
```

Because arrays need runtime component-type checks, but `List<String>` is erased.

Varargs and generics can interact dangerously:

```java
@SafeVarargs
public static <T> List<T> listOf(T... values) {
    return List.of(values);
}
```

`@SafeVarargs` is a promise that the method does not perform unsafe operations on the varargs array. It should not be used casually.

| Use arrays when               | Use collections when             |
| ----------------------------- | -------------------------------- |
| primitive storage matters     | domain-level group of objects    |
| fixed size is natural         | size changes                     |
| interop API requires array    | API should expose abstraction    |
| varargs are appropriate       | collection ownership matters     |
| performance profile is proven | readability and contracts matter |
| low-level buffer logic        | business/domain modeling         |

**Tempting but wrong mental model:** “Arrays are just older lists.”

**Surprising behavior or bug:** Arrays allow assignments that later fail with `ArrayStoreException`; generic lists reject the unsafe assignment at compile time.

**Correct semantic explanation:** Arrays carry runtime component type and are covariant. Generic collections are erased and invariant to preserve compile-time safety.

**Professional rule of thumb:** Use collections for most object-domain data. Use arrays for primitive buffers, fixed-size low-level data, varargs, and interop.

**Boundary where the rule changes:** Performance-sensitive numeric or binary data often benefits from primitive arrays, but this should be a deliberate representation choice.

**Common Pitfalls:**
Do not expose internal arrays directly. Do not use arrays where collection contracts matter. Do not assume arrays compare by content. Do not mix generic varargs with unsafe writes.

### Reflection, Method Handles, and Runtime Metadata — dynamic access, class objects, framework power

Java has rich runtime metadata. Every object has a runtime class, and classes can be inspected through `Class<?>`, reflection APIs, annotations, method handles, and framework mechanisms.

```java
Class<?> type = String.class;

System.out.println(type.getName());
System.out.println(type.getDeclaredMethods().length);
```

Reflection can inspect and invoke members:

```java
Method method = User.class.getDeclaredMethod("displayName");

Object result = method.invoke(user);
```

This is powerful but weaker than ordinary static calls. It can fail at runtime due to missing methods, access restrictions, wrong arguments, module openness, security constraints, or invoked method exceptions.

| Mechanism                                     | Use                                  | Caveat                            |
| --------------------------------------------- | ------------------------------------ | --------------------------------- |
| `Class<?>`                                    | runtime type token                   | limited generic info              |
| Reflection `Method` / `Field` / `Constructor` | dynamic inspection/invocation        | runtime failure and access issues |
| Annotations                                   | metadata                             | requires consumer                 |
| Method handles                                | lower-level typed dynamic invocation | more complex                      |
| Dynamic proxy                                 | runtime implementation of interface  | behavior hidden behind proxy      |
| Annotation processor                          | compile-time metadata processing     | generated code boundary           |
| Framework scanning                            | runtime or build-time discovery      | startup and access cost           |
| Module `opens`                                | permits deep reflection              | weakens encapsulation             |

Reflection exception pattern:

```java
try {
    Method method = target.getClass().getMethod("run");
    method.invoke(target);
} catch (NoSuchMethodException e) {
    throw new IllegalStateException("missing run method", e);
} catch (IllegalAccessException e) {
    throw new IllegalStateException("run method not accessible", e);
} catch (InvocationTargetException e) {
    throw new RuntimeException("run method failed", e.getCause());
}
```

Annotations:

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Audited {
    String value();
}
```

Runtime-visible annotations can be inspected reflectively, but only if retention policy permits it and some code actually reads them.

Framework proxy example conceptually:

```java
PaymentService service = framework.get(PaymentService.class);

service.charge(request); // may pass through proxy/interceptor
```

The source call looks ordinary, but runtime behavior may include transactions, security, caching, validation, metrics, or lazy loading.

| Reflection/framework issue     | Practical consequence                                                  |
| ------------------------------ | ---------------------------------------------------------------------- |
| private access                 | may require `setAccessible` or module `opens`                          |
| module system                  | public member may still be inaccessible if package not exported/opened |
| generic info                   | partial and declaration-based                                          |
| performance                    | often acceptable at startup, risky in hot paths                        |
| exception wrapping             | invoked method failure wrapped                                         |
| hidden behavior                | harder debugging                                                       |
| constructor bypass             | invariants may be skipped in some serialization/framework flows        |
| native image / AOT constraints | reflection may need configuration                                      |

**Tempting but wrong mental model:** “Reflection is just slower normal Java.”

**Surprising behavior or bug:** Reflective code bypasses ordinary compile-time checks, fails under module access rules, or triggers framework behavior not visible in source.

**Correct semantic explanation:** Reflection is dynamic metadata access and invocation. It moves errors from compile time to runtime and may cross encapsulation boundaries.

**Professional rule of thumb:** Keep reflection in infrastructure, adapters, frameworks, or small utilities. Expose typed APIs to ordinary application code.

**Boundary where the rule changes:** Frameworks, serializers, DI containers, test tools, and ORMs legitimately depend on reflection or generated metadata. Application developers still need to understand the boundary.

**Common Pitfalls:**
Do not spread reflection through domain logic. Do not assume annotations do anything without a processor/framework. Do not broadly open modules for reflection. Do not ignore `InvocationTargetException.getCause()`.

### Strings, Interning, and Value-Based Intuition — immutable text, identity traps, compact representation

`String` is immutable and central to Java. But string behavior combines language syntax, standard-library contracts, and JVM/JDK implementation details.

```java
String a = "java";
String b = "java";

System.out.println(a == b);      // often true for same interned literal
System.out.println(a.equals(b)); // true
```

String literals are interned. But this should not lead to using `==` for string content.

```java
String a = new String("java");
String b = new String("java");

System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true
```

| String concept             | Meaning                           | Practical consequence               |
| -------------------------- | --------------------------------- | ----------------------------------- |
| immutability               | string contents cannot be changed | safe sharing                        |
| literal interning          | same literal may share object     | identity can mislead                |
| `equals`                   | content equality                  | use for value comparison            |
| `hashCode`                 | content-based                     | strings work well as map keys       |
| concatenation              | may allocate/build strings        | loops need care                     |
| text blocks                | multi-line string literal         | useful for SQL/JSON/templates       |
| charset conversion         | string ↔ bytes                    | specify charset                     |
| UTF-16 representation      | string length counts code units   | Unicode complexity                  |
| implementation compactness | JDK may optimize storage          | not language-level semantic promise |

String builder:

```java
StringBuilder builder = new StringBuilder();

for (String part : parts) {
    builder.append(part);
}

String result = builder.toString();
```

Text blocks:

```java
String json = """
        {
          "name": "Ada",
          "active": true
        }
        """;
```

String equality in maps:

```java
Map<String, User> usersByEmail = new HashMap<>();
```

This is valid because `String.equals` and `String.hashCode` are content-based and stable.

**Tempting but wrong mental model:** “String interning means `==` works for strings.”

**Surprising behavior or bug:** Two strings with the same content may not be the same object.

**Correct semantic explanation:** Interning affects some string identities; `equals` defines content equality.

**Professional rule of thumb:** Always use `equals` for string content. Use `==` only for identity checks and enums.

**Boundary where the rule changes:** Comparing to a known literal can be null-safe as `"literal".equals(value)`, but `Objects.equals(value, "literal")` is often clearer in nullable contexts.

**Common Pitfalls:**
Do not use `==` for string content. Do not build large strings repeatedly with `+=` in loops. Do not assume `String.length()` equals human-visible character count. Do not rely on string implementation details for correctness.

### Value Semantics vs Reference Semantics — objects, records, value-like classes, identity

Java objects have reference identity by default. Some objects are designed to behave like values: records, wrappers, `String`, `BigDecimal`, `LocalDate`, `Instant`, `UUID`, and many domain value objects.

| Type style                | Equality tendency                   | Mutation tendency   | Example              |
| ------------------------- | ----------------------------------- | ------------------- | -------------------- |
| primitive                 | value equality by `==`              | immutable value     | `int`                |
| ordinary object           | identity unless `equals` overridden | may be mutable      | `Object`             |
| record                    | component equality                  | shallowly immutable | `UserId`             |
| enum                      | identity by constant                | immutable constants | `Status.ACTIVE`      |
| value-based library class | value equality                      | immutable           | `LocalDate`          |
| entity                    | identity by ID or object identity   | mutable lifecycle   | `User`, `Order`      |
| array                     | identity equality by default        | mutable elements    | `int[]`              |
| collection                | content equality by contract        | often mutable       | `List`, `Set`, `Map` |

Record value behavior:

```java
record Point(int x, int y) {}

Point a = new Point(1, 2);
Point b = new Point(1, 2);

System.out.println(a.equals(b)); // true
System.out.println(a == b);      // false
```

Entity behavior:

```java
public final class User {
    private final UserId id;
    private DisplayName displayName;

    // equality may be based on id, or not overridden at all
}
```

The key question is whether the object represents **a value** or **an entity with lifecycle identity**.

| Design question                         | Value object       | Entity                |
| --------------------------------------- | ------------------ | --------------------- |
| Does identity depend on all components? | usually yes        | usually no            |
| Can state change?                       | usually no         | often yes             |
| Is replacement equivalent?              | yes, if same value | no, lifecycle matters |
| Good map key?                           | yes if immutable   | risky if mutable      |
| Record suitable?                        | often              | often not             |
| Equality generated automatically?       | useful             | may be wrong          |

**Tempting but wrong mental model:** “Records are always better because they generate equality.”

**Surprising behavior or bug:** A record entity compares unequal after a mutable field changes or equal when lifecycle identity should differ.

**Correct semantic explanation:** Records express transparent component-based value semantics. Entity identity is a separate modeling concept.

**Professional rule of thumb:** Use records for values; classes for lifecycle entities; design `equals` and `hashCode` deliberately.

**Boundary where the rule changes:** Some persistence frameworks and proxy systems complicate equality. Entity equality may require framework-specific conventions.

**Common Pitfalls:**
Do not use records for every data object. Do not use mutable objects as hash keys. Do not confuse object identity with domain identity. Do not let generated equality decide domain semantics accidentally.

### Resource Lifetimes and Finalization — deterministic cleanup, `AutoCloseable`, cleaners

Java heap memory is managed, but external resources need deterministic cleanup. The lifecycle of a resource should be tied to an explicit owner and scope.

```java
try (InputStream input = Files.newInputStream(path)) {
    return input.readAllBytes();
}
```

`try-with-resources` calls `close()` automatically when the block exits.

| Resource lifetime style    | Example                 | Good use             | Risk                             |
| -------------------------- | ----------------------- | -------------------- | -------------------------------- |
| local scoped resource      | `try-with-resources`    | files, streams, JDBC | returning resource-backed object |
| application lifecycle      | shared HTTP client/pool | long-lived services  | forgotten shutdown               |
| borrowed resource          | connection pool         | database operations  | not returned to pool             |
| lock scope                 | `try/finally`           | critical section     | missing unlock                   |
| native/off-heap session    | FFM/native APIs         | native interop       | memory leak                      |
| framework-managed          | DI container lifecycle  | clients/services     | hidden lifecycle                 |
| finalizer/cleaner fallback | last resort             | safety net           | non-deterministic                |

Executor lifecycle:

```java
ExecutorService executor = Executors.newFixedThreadPool(4);

try {
    // submit tasks
} finally {
    executor.shutdown();
}
```

Locks:

```java
lock.lock();
try {
    update();
} finally {
    lock.unlock();
}
```

Finalization is not a reliable cleanup strategy. Cleanup should be explicit.

Cleaner-like mechanisms may be useful as safety nets for native resources, but they should not be primary lifecycle management.

| Mistake                                                              | Consequence        |
| -------------------------------------------------------------------- | ------------------ |
| relying on GC to close files                                         | descriptor leak    |
| not closing JDBC resources                                           | pool exhaustion    |
| returning `Stream<String>` from `Files.lines` without ownership docs | leaked file handle |
| not shutting down executor                                           | thread leak        |
| holding lock during blocking I/O                                     | deadlock/latency   |
| forgetting native memory/session close                               | off-heap leak      |

**Tempting but wrong mental model:** “Object lifetime equals resource lifetime.”

**Surprising behavior or bug:** The Java object is still reachable or not promptly collected, so external resources remain open.

**Correct semantic explanation:** Resource lifetime is a program protocol. Heap reachability and garbage collection are not deterministic cleanup.

**Professional rule of thumb:** Make resource ownership explicit. Close in the same scope where possible. Use `try-with-resources` for `AutoCloseable`.

**Boundary where the rule changes:** Long-lived resources can be owned by application/container lifecycle, but they still need explicit startup/shutdown management.

**Common Pitfalls:**
Do not rely on finalizers. Do not return open resource-backed streams casually. Do not create executors repeatedly without shutdown. Do not hide resource ownership inside vague helper methods.

### Java Memory Model — visibility, ordering, data races, happens-before

The Java Memory Model, often abbreviated `JMM`, defines how actions in different threads relate to visibility and ordering. It is one of the most important advanced Java semantics topics. It explains why code that appears correct in a single-threaded mental model can fail under concurrency.

| Concept            | Meaning                                              | Practical consequence                 |
| ------------------ | ---------------------------------------------------- | ------------------------------------- |
| data race          | unsynchronized conflicting access to shared variable | behavior may be surprising            |
| visibility         | whether one thread sees another thread’s write       | stale reads possible                  |
| ordering           | whether actions are observed in intended order       | reordering can be legal               |
| happens-before     | formal ordering relation                             | key correctness tool                  |
| synchronization    | lock/unlock creates ordering                         | protects guarded state                |
| `volatile`         | visibility/order for a variable                      | not full lock for compound invariants |
| final fields       | special initialization safety properties             | helps immutable objects               |
| safe publication   | object made visible correctly                        | prevents partially visible state      |
| atomicity          | indivisible operation                                | not same as visibility                |
| thread confinement | object used by one thread                            | avoids sharing problem                |

Broken shared flag:

```java
final class StopFlag {
    private boolean stopped;

    void stop() {
        stopped = true;
    }

    void run() {
        while (!stopped) {
            doWork();
        }
    }
}
```

Another thread may call `stop`, but the running thread is not guaranteed to observe the write promptly or at all under the needed semantics.

Use `volatile` for a simple visibility flag:

```java
final class StopFlag {
    private volatile boolean stopped;

    void stop() {
        stopped = true;
    }

    void run() {
        while (!stopped) {
            doWork();
        }
    }
}
```

But `volatile` does not make compound operations atomic:

```java
volatile int count;

void increment() {
    count++; // read, add, write; not atomic as a whole
}
```

Use `AtomicInteger` or synchronization:

```java
AtomicInteger count = new AtomicInteger();

void increment() {
    count.incrementAndGet();
}
```

Synchronized state:

```java
public final class Counter {
    private int value;

    public synchronized void increment() {
        value++;
    }

    public synchronized int value() {
        return value;
    }
}
```

Safe publication through final fields:

```java
public final class UserSnapshot {
    private final UserId id;
    private final EmailAddress email;

    public UserSnapshot(UserId id, EmailAddress email) {
        this.id = Objects.requireNonNull(id);
        this.email = Objects.requireNonNull(email);
    }
}
```

Final fields help with initialization safety, assuming `this` does not escape during construction and referenced objects are properly handled.

Unsafe publication:

```java
public class Holder {
    static UserSnapshot snapshot;

    public static void publish(UserSnapshot value) {
        snapshot = value; // not safely published if accessed concurrently without synchronization
    }
}
```

Better use volatile, synchronization, immutable initialization before thread start, concurrent collections, or other safe-publication mechanisms.

| Shared-state task         | Correct mechanism                                         |
| ------------------------- | --------------------------------------------------------- |
| simple stop flag          | `volatile boolean`                                        |
| simple counter            | `AtomicInteger` / `LongAdder`                             |
| compound invariant        | lock/synchronized                                         |
| immutable data sharing    | final fields + safe publication                           |
| concurrent map operations | `ConcurrentHashMap`                                       |
| producer-consumer         | `BlockingQueue`                                           |
| one-time handoff          | `CompletableFuture`, latch, queue                         |
| lazy initialization       | initialization holder, volatile, synchronized, or library |

**Tempting but wrong mental model:** “If one thread writes a field, another thread will naturally see it.”

**Surprising behavior or bug:** A loop never stops, a partially initialized object is observed, or a counter loses updates.

**Correct semantic explanation:** Cross-thread visibility and ordering require happens-before relationships through synchronization, volatile, thread start/join, concurrent utilities, or other specified mechanisms.

**Professional rule of thumb:** Shared mutable state must have an explicit concurrency policy: immutable, confined, synchronized, volatile, atomic, concurrent collection, or message passing.

**Boundary where the rule changes:** If an object never crosses thread boundaries, ordinary mutable state is often fine. The problem begins when sharing begins.

**Common Pitfalls:**
Do not use `volatile` for compound invariants. Do not publish mutable objects unsafely. Do not let `this` escape during construction. Do not assume unit tests will reliably expose data races.

### Threads, Platform Threads, Virtual Threads — execution units, blocking, scheduling

Java has long supported platform threads. Modern Java also supports virtual threads, which are lightweight threads intended to make blocking-style concurrent code scale better for many I/O-heavy workloads.

| Thread type             | Rough model                                       | Best use                        | Caveat                                        |
| ----------------------- | ------------------------------------------------- | ------------------------------- | --------------------------------------------- |
| Platform thread         | OS-backed Java thread                             | CPU work, traditional execution | expensive at very large counts                |
| Virtual thread          | lightweight JVM-managed thread                    | many blocking I/O tasks         | not unlimited downstream capacity             |
| Carrier thread          | platform thread carrying virtual thread execution | implementation detail           | blocking/pinning caveats matter in some cases |
| Executor-managed thread | task execution abstraction                        | lifecycle and pooling           | shutdown/backpressure                         |
| ForkJoin worker         | work-stealing pool                                | parallel computation            | blocking can harm pool                        |
| Framework event loop    | small number of event threads                     | nonblocking frameworks          | blocking is dangerous                         |

Virtual-thread example:

```java
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<Response>> futures = requests.stream()
            .map(request -> executor.submit(() -> client.send(request)))
            .toList();

    for (Future<Response> future : futures) {
        handle(future.get());
    }
}
```

This style is attractive because it preserves straightforward blocking code. But external resources still need limits.

| Concern                       | Still matters with virtual threads? |
| ----------------------------- | ----------------------------------: |
| database connection pool size |                                 yes |
| remote service rate limit     |                                 yes |
| memory per task               |                                 yes |
| synchronized shared state     |                                 yes |
| cancellation/interruption     |                                 yes |
| timeouts                      |                                 yes |
| backpressure                  |                                 yes |
| CPU saturation                |                                 yes |
| logging/metrics volume        |                                 yes |

Platform thread pool:

```java
ExecutorService pool = Executors.newFixedThreadPool(8);
```

Use bounded pools for CPU-heavy or resource-bound work.

Virtual threads are not a reason to launch unbounded external calls:

```java
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (Request request : millionsOfRequests) {
        executor.submit(() -> callExternalService(request));
    }
}
```

This can overwhelm the external service, memory, network, or database pool.

Use semaphores or bounded submission when needed:

```java
Semaphore permits = new Semaphore(100);

try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (Request request : requests) {
        executor.submit(() -> {
            permits.acquire();
            try {
                return callExternalService(request);
            } finally {
                permits.release();
            }
        });
    }
}
```

This example must also handle `InterruptedException` properly in real code.

**Tempting but wrong mental model:** “Virtual threads make concurrency free.”

**Surprising behavior or bug:** The application overwhelms a database pool or downstream API because it can now create more concurrent blocking work.

**Correct semantic explanation:** Virtual threads reduce the cost of waiting threads. They do not remove resource limits, synchronization rules, or failure coordination.

**Professional rule of thumb:** Use virtual threads for clear blocking-style I/O concurrency, but keep explicit limits, timeouts, cancellation, and shared-state discipline.

**Boundary where the rule changes:** CPU-bound parallelism should still be limited roughly by available CPU and workload characteristics; virtual threads are not a CPU parallelism multiplier.

**Common Pitfalls:**
Do not use virtual threads to hide unbounded concurrency. Do not ignore interruption. Do not hold locks during slow blocking operations. Do not assume every library behaves ideally under virtual threads.

### Locks, Monitors, Atomics, and Concurrent Collections — synchronization mechanisms

Java offers several synchronization mechanisms. They solve different problems and are not interchangeable.

| Mechanism                   | Best use                               | Main caveat                     |
| --------------------------- | -------------------------------------- | ------------------------------- |
| `synchronized` method/block | simple mutual exclusion and visibility | coarse lock, deadlock risk      |
| `ReentrantLock`             | explicit lock control                  | must unlock in `finally`        |
| `ReadWriteLock`             | many readers/few writers               | complexity and contention       |
| `StampedLock`               | advanced optimistic/read-write locking | difficult correctness           |
| `volatile`                  | simple visibility/order flag           | not compound atomicity          |
| `AtomicInteger`, etc.       | simple atomic updates                  | not multi-field invariant       |
| `LongAdder`                 | high-contention counters               | not exact snapshot in same way  |
| `ConcurrentHashMap`         | concurrent map operations              | compound logic still needs care |
| `BlockingQueue`             | producer-consumer                      | capacity/backpressure           |
| `Semaphore`                 | limit permits                          | release discipline              |
| `CountDownLatch`            | one-time waiting                       | not reusable                    |
| `CyclicBarrier` / `Phaser`  | coordinated phases                     | complexity                      |

Synchronized block:

```java
private final Object lock = new Object();
private int value;

public void increment() {
    synchronized (lock) {
        value++;
    }
}

public int value() {
    synchronized (lock) {
        return value;
    }
}
```

Explicit lock:

```java
private final Lock lock = new ReentrantLock();

public void update() {
    lock.lock();
    try {
        mutateState();
    } finally {
        lock.unlock();
    }
}
```

Atomic compare-and-set:

```java
AtomicReference<State> state = new AtomicReference<>(initialState);

public void update(UnaryOperator<State> change) {
    while (true) {
        State current = state.get();
        State next = change.apply(current);

        if (state.compareAndSet(current, next)) {
            return;
        }
    }
}
```

Concurrent map compound operation:

```java
sessions.computeIfAbsent(userId, this::createSession);
```

This is better than check-then-act:

```java
if (!sessions.containsKey(userId)) {
    sessions.put(userId, createSession(userId));
}
```

But even `computeIfAbsent` has constraints: the mapping function should not create surprising recursive updates or long blocking behavior without understanding consequences.

| Problem                            | Bad tool                  | Better tool                           |
| ---------------------------------- | ------------------------- | ------------------------------------- |
| increment counter under contention | `volatile int++`          | `AtomicInteger` / `LongAdder`         |
| protect two related fields         | two atomics               | lock or immutable state swap          |
| producer-consumer handoff          | shared list               | `BlockingQueue`                       |
| rate limit concurrent calls        | unbounded executor        | `Semaphore` / bounded pool            |
| one-time signal                    | busy wait                 | `CountDownLatch` / future             |
| shared mutable map                 | `HashMap`                 | `ConcurrentHashMap`                   |
| visibility flag                    | plain boolean             | `volatile boolean` or atomic          |
| complex transactional update       | scattered synchronization | single lock or transactional boundary |

**Tempting but wrong mental model:** “Atomic means thread-safe.”

**Surprising behavior or bug:** Several atomic variables individually update safely but the combined invariant becomes inconsistent.

**Correct semantic explanation:** Atomic variables make individual operations atomic. They do not automatically protect relationships among multiple values.

**Professional rule of thumb:** Use the simplest mechanism that protects the actual invariant. For multi-field state, prefer one lock or immutable state replacement.

**Boundary where the rule changes:** High-performance lock-free algorithms can use atomics for complex invariants, but they require specialized expertise and careful proof/testing.

**Common Pitfalls:**
Do not use `volatile` for `count++`. Do not forget `unlock` in `finally`. Do not synchronize on publicly accessible objects. Do not assume concurrent collections make surrounding workflows atomic. Do not create deadlocks by acquiring locks in inconsistent order.

### Concurrency vs Parallelism vs Asynchrony — different goals, different costs

Concurrency, parallelism, and asynchrony are related but not the same.

| Concept                      | Meaning                                | Java examples                         | Primary goal                  |
| ---------------------------- | -------------------------------------- | ------------------------------------- | ----------------------------- |
| concurrency                  | multiple tasks in progress             | threads, executors, virtual threads   | structure many tasks          |
| parallelism                  | tasks execute simultaneously           | CPU-bound fork/join, parallel streams | use multiple cores            |
| asynchrony                   | caller does not block waiting directly | `CompletableFuture`, callbacks        | decouple waiting              |
| nonblocking I/O              | operations do not block thread         | NIO, event-loop frameworks            | scale I/O with few threads    |
| blocking I/O                 | thread waits for operation             | ordinary socket/file/db call          | simple control flow           |
| reactive style               | stream of events/backpressure          | ecosystem frameworks                  | async data flow               |
| structured concurrency style | task lifetime scoped                   | modern concurrency design             | clearer cancellation/lifetime |

CPU-bound work:

```java
ExecutorService pool = Executors.newFixedThreadPool(
        Runtime.getRuntime().availableProcessors()
);
```

I/O-bound work with virtual threads:

```java
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<Response> response = executor.submit(() -> httpClient.call(request));
    return response.get();
}
```

Asynchronous composition:

```java
CompletableFuture<User> user =
        CompletableFuture.supplyAsync(() -> userClient.load(userId), executor);

CompletableFuture<Account> account =
        CompletableFuture.supplyAsync(() -> accountClient.load(accountId), executor);

CompletableFuture<UserAccount> combined =
        user.thenCombine(account, UserAccount::new);
```

Parallel stream:

```java
long count = values.parallelStream()
        .filter(this::expensivePurePredicate)
        .count();
```

This may be appropriate for CPU-heavy pure operations on large data, but not for arbitrary side effects.

| Workload                             | Better model                                         |
| ------------------------------------ | ---------------------------------------------------- |
| CPU-bound independent computation    | bounded platform-thread pool, fork/join, parallelism |
| many blocking I/O calls              | virtual threads with resource limits                 |
| event-loop framework integration     | nonblocking/reactive style                           |
| dependency on multiple async results | `CompletableFuture` or structured task approach      |
| producer-consumer pipeline           | blocking queue or reactive stream                    |
| shared mutable state                 | synchronization/immutability/confinement             |
| periodic task                        | scheduled executor                                   |
| UI/event handling                    | event-thread discipline                              |

**Tempting but wrong mental model:** “Async makes code faster.”

**Surprising behavior or bug:** Async code adds overhead, loses context, mishandles exceptions, saturates executors, or overwhelms downstream services.

**Correct semantic explanation:** Asynchrony changes waiting and coordination. Parallelism uses hardware cores. Concurrency structures multiple tasks. They solve different problems.

**Professional rule of thumb:** Choose the model based on the bottleneck: CPU, I/O wait, latency composition, resource limits, or state coordination.

**Boundary where the rule changes:** Framework conventions may dictate a concurrency style. For example, event-loop frameworks punish blocking; virtual-thread-based services may favor direct blocking code.

**Common Pitfalls:**
Do not block event-loop threads. Do not use parallel streams for I/O-heavy work by default. Do not ignore executor ownership. Do not lose exceptions in async chains. Do not treat concurrency as a substitute for efficient algorithms.

### Final Fields, Immutability, and Safe Publication — stable objects under concurrency

Immutability is one of the strongest techniques for Java concurrency and semantic clarity. But Java immutability is not automatic.

```java
public final class UserSnapshot {
    private final UserId id;
    private final EmailAddress email;
    private final List<Role> roles;

    public UserSnapshot(UserId id, EmailAddress email, List<Role> roles) {
        this.id = Objects.requireNonNull(id);
        this.email = Objects.requireNonNull(email);
        this.roles = List.copyOf(roles);
    }

    public List<Role> roles() {
        return roles;
    }
}
```

This class is immutable if `UserId`, `EmailAddress`, and `Role` are immutable and the roles list is not externally mutable.

| Immutability ingredient                 | Purpose                                    |
| --------------------------------------- | ------------------------------------------ |
| `final` class or controlled subclassing | prevent subclass mutation surprises        |
| `private final` fields                  | stable field references after construction |
| constructor validation                  | valid initial state                        |
| defensive copies                        | prevent external mutation                  |
| immutable components                    | deep stability                             |
| no mutating methods                     | state cannot change                        |
| safe publication                        | other threads see constructed state        |
| no `this` escape during construction    | final-field guarantees preserved           |

Bad constructor escape:

```java
public final class UnsafeListener {
    private final String name;

    public UnsafeListener(EventBus bus, String name) {
        bus.register(this); // this escapes before construction completes
        this.name = name;
    }
}
```

Another thread may observe the object before it is fully constructed.

Better:

```java
public final class SafeListener {
    private final String name;

    public SafeListener(String name) {
        this.name = Objects.requireNonNull(name);
    }

    public void register(EventBus bus) {
        bus.register(this);
    }
}
```

Record with mutable component hazard:

```java
public record BadSnapshot(List<String> names) {
}
```

Better:

```java
public record Snapshot(List<String> names) {
    public Snapshot {
        names = List.copyOf(names);
    }
}
```

| Type                            |                Immutable? | Why                             |
| ------------------------------- | ------------------------: | ------------------------------- |
| `String`                        |                       yes | immutable class                 |
| `LocalDate`                     |                       yes | immutable value-based API class |
| `List.of(...)` result           | structurally unmodifiable | elements may be mutable         |
| `record User(List<Role> roles)` |           not necessarily | list may be mutable             |
| `final List<Role> roles`        |           not necessarily | final reference only            |
| `AtomicInteger`                 |                        no | mutable atomic state            |
| `int[]`                         |                        no | mutable array                   |
| `enum` constant                 |        effectively stable | constants are fixed             |

**Tempting but wrong mental model:** “`final` means thread-safe.”

**Surprising behavior or bug:** A `final List<T>` is mutated by another thread.

**Correct semantic explanation:** `final` stabilizes a variable/field assignment. It does not freeze the referenced object.

**Professional rule of thumb:** Build immutable objects with final fields, immutable components, defensive copies, and no construction escape. Publish them safely.

**Boundary where the rule changes:** Controlled mutable objects can be safe under confinement or synchronization. Immutability is a strong default, not the only valid strategy.

**Common Pitfalls:**
Do not expose mutable arrays or collections. Do not let `this` escape during construction. Do not mistake unmodifiable wrappers for deep immutability. Do not rely on final fields to protect mutable components.

### Runtime Cost Model — allocation, dispatch, boxing, synchronization, I/O, boundaries

Java performance reasoning should use a cost model, not folklore. The JVM can optimize aggressively, but program structure still matters.

| Operation or pattern | Usual cost                 | Hidden cost                         | How to detect               | When it matters                | When not to optimize prematurely |
| -------------------- | -------------------------- | ----------------------------------- | --------------------------- | ------------------------------ | -------------------------------- |
| Object allocation    | often cheap                | GC pressure and retention           | allocation profiling/JFR    | hot paths, large volume        | ordinary domain modeling         |
| Primitive array      | compact                    | lower abstraction                   | memory profiling            | large numeric/binary data      | small collections                |
| Boxing               | wrapper creation/null risk | allocation and unboxing failure     | profiler/code review        | numeric-heavy code             | ordinary API boundaries          |
| Virtual dispatch     | usually cheap              | polymorphic call may block inlining | profiler/JIT logs           | hot call sites                 | most business methods            |
| Interface call       | often optimized            | megamorphic dispatch                | profiler                    | hot generic code               | normal APIs                      |
| Reflection           | higher overhead            | runtime failure, access checks      | profiler                    | hot paths                      | startup/config                   |
| Lambda               | often cheap                | capture allocation possible         | profiler                    | hot stream/callback loops      | small local use                  |
| Stream pipeline      | abstraction cost           | boxing, allocation, poor debugging  | profiler                    | large/hot transformations      | clear non-hot code               |
| Synchronization      | low to high                | contention, blocking                | JFR/thread dumps            | shared hot locks               | uncontended simple code          |
| Volatile access      | memory-ordering cost       | not compound atomic                 | profiler/hardware-sensitive | hot shared flags               | rare config flags                |
| Atomic operation     | CAS/retry cost             | contention                          | profiler                    | high-contention counters       | simple state                     |
| I/O                  | high latency               | blocking and failure                | tracing/metrics             | almost always                  | never ignore                     |
| Network call         | very high/variable         | timeout/retry/security              | tracing                     | service boundaries             | never treat as local             |
| Logging              | low to high                | formatting and volume               | profiler/log metrics        | hot loops, high volume         | boundary events                  |
| Class loading        | startup cost               | reflection/framework scanning       | startup profiling           | app startup                    | long-running steady state        |
| GC                   | workload-dependent         | pauses/CPU/memory                   | GC logs/JFR                 | high allocation/large live set | low allocation apps              |
| Dependency boundary  | no syntax cost             | version/linkage failure             | dependency tree             | production builds              | trivial local code               |

A performance issue should be diagnosed by category:

| Symptom                  | Likely investigation             |
| ------------------------ | -------------------------------- |
| high CPU                 | CPU profiler/JFR                 |
| high allocation          | allocation profiler              |
| memory growth            | heap dump/retention graph        |
| long GC pauses           | GC logs/JFR/live set             |
| slow startup             | class loading/framework scanning |
| thread contention        | JFR/thread dumps                 |
| blocked requests         | traces/thread dumps              |
| slow database/API        | metrics/tracing                  |
| dependency runtime error | dependency tree/classpath        |
| poor microbenchmark      | JMH                              |

**Tempting but wrong mental model:** “Java abstractions are either free or always expensive.”

**Surprising behavior or bug:** A clean abstraction is optimized away in one context but becomes expensive in another due to allocation, megamorphic dispatch, boxing, or reflection.

**Correct semantic explanation:** Java costs are workload-, runtime-, and implementation-dependent. Some abstractions optimize well; some do not.

**Professional rule of thumb:** Optimize by evidence. Know common cost sources, but do not destroy design for unmeasured micro-optimizations.

**Boundary where the rule changes:** Avoid obviously bad asymptotic algorithms, unbounded resource use, and hidden network/I/O costs even before profiling.

### Implementation Detail vs Language-Level Impact — what to rely on

Not every observed JVM behavior is a Java guarantee. Professional Java reasoning must distinguish language guarantee, JVM specification rule, standard library contract, and implementation detail.

| Observation                                                |                   Can rely on for correctness? | Category                                         |
| ---------------------------------------------------------- | ---------------------------------------------: | ------------------------------------------------ |
| `String.equals` compares content                           |                                            yes | standard library contract                        |
| `==` on references compares identity                       |                                            yes | language semantics                               |
| local variables must be assigned before read               |                                            yes | language rule                                    |
| generic type arguments erased in ordinary runtime identity |                                    broadly yes | language/JVM design                              |
| HotSpot uses a specific object header layout               |                    no for portable correctness | implementation detail                            |
| JIT may inline a method                                    |                                             no | implementation optimization                      |
| GC algorithm choice affects pauses                         |                  no for semantics, yes for ops | implementation/config                            |
| `HashMap` iteration order                                  |                                             no | implementation detail unless specified otherwise |
| `LinkedHashMap` iteration order                            |                               yes, by contract | library contract                                 |
| `List.of` returns unmodifiable list                        |                                            yes | library contract                                 |
| exact class of `List.of` result                            |                                             no | implementation detail                            |
| string literals are interned                               |                  yes at language/library level | specified behavior                               |
| small `Integer` boxing cache behavior                      | limited specified range; avoid relying broadly | library/runtime detail                           |
| reflection access under modules                            |               yes, follows module/access rules | language/platform rule                           |
| virtual threads are lightweight                            |   yes as design/API expectation, not zero-cost | runtime/API behavior                             |

Example:

```java
List<String> names = List.of("Ada", "Grace");
```

It is valid to rely on the result being unmodifiable. It is not valid to rely on the concrete implementation class.

```java
if (names.getClass().getName().contains("Immutable")) {
    // bad design
}
```

HashMap order:

```java
Map<String, Integer> map = new HashMap<>();
```

Do not rely on iteration order. Use `LinkedHashMap` if insertion order matters.

```java
Map<String, Integer> ordered = new LinkedHashMap<>();
```

**Tempting but wrong mental model:** “If it works on my JVM, it is Java behavior.”

**Surprising behavior or bug:** Code breaks after a JDK update, different vendor JVM, changed GC, modular runtime, or dependency version.

**Correct semantic explanation:** Portable Java correctness relies on specified language, JVM, and library contracts, not incidental implementation behavior.

**Professional rule of thumb:** Depend on specifications and documented contracts. Treat observed implementation behavior as diagnostic/performance knowledge, not correctness foundation.

**Boundary where the rule changes:** Performance engineering often depends on implementation details, but those assumptions should be measured, documented, and revisited across JDK/runtime changes.

**Common Pitfalls:**
Do not rely on `HashMap` order. Do not inspect concrete collection classes returned by factories. Do not write correctness logic around JIT or GC behavior. Do not assume all JVM vendors expose identical diagnostics or performance profiles.

### Runtime and Semantics Decision Table — model, guarantee, risk

| Topic                      | Correct mental model                       | Java guarantee                        | Main risk                           |
| -------------------------- | ------------------------------------------ | ------------------------------------- | ----------------------------------- |
| Variables                  | store primitive values or reference values | pass-by-value                         | confusing reassignment and mutation |
| Objects                    | heap-managed identity/state                | object identity and fields            | aliasing and retention              |
| Records                    | transparent value-like carriers            | generated component equality          | shallow immutability                |
| Arrays                     | reified fixed-size objects                 | runtime component checks              | covariance traps                    |
| Generics                   | compile-time type relationships            | erased runtime model                  | unchecked warnings                  |
| Methods                    | overload compile-time, override runtime    | dynamic dispatch for instance methods | static/field hiding confusion       |
| Exceptions                 | abrupt control flow with objects           | stack unwinding and handlers          | poor recovery boundaries            |
| Class loading              | runtime resolution process                 | specified loading/linking/init phases | dependency mismatch                 |
| GC                         | reclaim unreachable heap objects           | managed memory                        | resource/lifecycle confusion        |
| JIT                        | runtime optimization                       | semantics preserved                   | naive performance assumptions       |
| Reflection                 | dynamic metadata/invocation                | runtime access rules                  | lost type safety                    |
| `volatile`                 | visibility/order for field                 | happens-before effects                | not atomic compound state           |
| locks                      | mutual exclusion and visibility            | monitor/lock semantics                | deadlock/contention                 |
| virtual threads            | lightweight thread abstraction             | Java thread semantics                 | unbounded resource use              |
| standard library contracts | documented API behavior                    | portable behavior                     | relying on implementation class     |

### Semantics and Runtime Failure Mode Index — professional debugging cues

| Failure mode                    | Symptom                                    | Semantic/runtime cause              | Debugging cue                           |
| ------------------------------- | ------------------------------------------ | ----------------------------------- | --------------------------------------- |
| pass-by-reference misconception | method reassignment does not affect caller | Java passes values                  | distinguish reference value from object |
| aliasing bug                    | mutation appears through another variable  | shared object reference             | inspect ownership/copies                |
| null dereference                | `NullPointerException`                     | nullable reference used as object   | find null boundary                      |
| equality bug                    | map/set lookup fails                       | broken/mutable `equals`/`hashCode`  | inspect equality fields                 |
| array store failure             | `ArrayStoreException`                      | array covariance + runtime check    | inspect actual array type               |
| generic cast failure            | delayed `ClassCastException`               | heap pollution/unchecked cast       | trace unchecked boundary                |
| missing method at runtime       | `NoSuchMethodError`                        | dependency mismatch                 | inspect runtime classpath               |
| class init failure              | `ExceptionInInitializerError`              | static initializer failed           | inspect static init path                |
| memory leak                     | heap growth                                | retained reachable objects          | heap dump dominators                    |
| resource leak                   | file/connection/thread exhaustion          | missing close/shutdown              | inspect lifecycle owner                 |
| race condition                  | stale/lost/inconsistent state              | missing happens-before              | inspect sharing policy                  |
| deadlock                        | stuck threads                              | lock cycle                          | thread dump                             |
| high GC                         | pause/CPU/memory pressure                  | allocation/live set                 | JFR/GC logs                             |
| slow warmup                     | early latency                              | JIT/class loading/framework startup | startup profile                         |
| reflection failure              | runtime access/invoke error                | dynamic access boundary             | inspect module/access/annotation        |
| virtual-thread overload         | downstream exhaustion                      | unbounded concurrency               | metrics/semaphores/pools                |
| async exception loss            | task silently fails                        | future/callback not observed        | inspect future handling                 |
## PART 8 — Historical Evolution, Modern Java, and Trend Context

### Orientation — why Java’s history matters for present-day code

Java is a compatibility-preserving language. Its current design cannot be understood only by looking at the latest syntax. Modern Java contains several historical layers at once:

| Historical layer            | Still visible in modern Java                                             | Why it matters                                                               |
| --------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Early Java object model     | classes, interfaces, packages, checked exceptions, applet/server history | explains Java’s explicit, nominal, class-centered style                      |
| Enterprise Java era         | containers, reflection, annotations, frameworks, dependency injection    | explains annotation-heavy and framework-mediated code                        |
| Java 5 era                  | generics, enums, annotations, enhanced `for`, autoboxing                 | explains many core APIs and several sharp edges                              |
| Java 8 era                  | lambdas, streams, `Optional`, default methods, `java.time`               | explains functional-style Java and modern collection processing              |
| Java 9+ modular era         | JPMS, `var`, collection factories, improved tooling                      | explains module boundaries and newer library idioms                          |
| Data-oriented modern Java   | records, sealed types, pattern matching, switch expressions              | explains Java’s move toward concise domain modeling                          |
| Concurrency modernization   | completable futures, reactive ecosystems, virtual threads                | explains current choices between blocking, async, and structured task design |
| Production/runtime maturity | JFR, modern GC, containers, observability                                | explains why JVM knowledge is part of professional Java                      |

Java evolves by **adding new mechanisms while preserving older ones**. Therefore modern Java codebases may contain `Vector`, raw types, `Date`, XML-era enterprise APIs, Java 8 streams, records, sealed classes, virtual threads, and framework proxies in the same system.

The professional skill is not merely knowing the newest feature. It is knowing **which historical layer a construct belongs to**, whether it remains appropriate, and how to migrate without breaking compatibility.

### Java’s Core Historical Identity — from portable OOP language to managed platform

Java was designed as a portable, object-oriented, managed-runtime language. The early identity centered on:

| Original design pressure      | Java response                                      | Long-term effect                  |
| ----------------------------- | -------------------------------------------------- | --------------------------------- |
| Platform fragmentation        | JVM bytecode and standard APIs                     | portability through runtime       |
| C/C++ memory hazards          | garbage collection, no ordinary pointer arithmetic | safer mainstream programming      |
| Large application structure   | classes, interfaces, packages                      | explicit APIs and tooling         |
| Networked/distributed systems | standard libraries and security model              | enterprise/server adoption        |
| Tooling and documentation     | regular syntax, Javadoc, static types              | strong IDE and API ecosystem      |
| Runtime safety                | class loading, verification, managed execution     | reflective/framework capabilities |

This early design created the Java still visible today: nominal types, explicit declarations, object identity, checked exceptions, class-based APIs, and managed runtime behavior.

The early Java worldview can be summarized as:

| Design value      | Java’s expression                  |
| ----------------- | ---------------------------------- |
| portability       | JVM and standard library           |
| safety            | managed memory and verification    |
| structure         | classes, interfaces, packages      |
| maintainability   | static types and stable APIs       |
| compatibility     | conservative evolution             |
| tooling           | regular syntax and metadata        |
| runtime mediation | class loading, reflection, GC, JIT |

**Tempting but wrong mental model:** “Old Java was just verbose; modern Java replaced it.”

**Correct historical reading:** Modern Java is layered on top of old Java. The old object model, JVM model, class loading, exceptions, and APIs remain foundational.

**Professional rule of thumb:** Learn modern Java features, but do not treat them as a separate language. They coexist with older constructs and compatibility constraints.

### Java 5 as a Major Turning Point — generics, enums, annotations, autoboxing

Java 5 was one of the most important historical upgrades. It introduced several features that still define Java’s daily programming model.

| Feature             | What it added                          | Why it still matters                         |
| ------------------- | -------------------------------------- | -------------------------------------------- |
| Generics            | `List<String>`, `Map<K,V>`             | type-safe collections and APIs               |
| Enums               | type-safe finite constants             | better state/category modeling               |
| Annotations         | metadata on declarations               | frameworks, validation, DI, testing          |
| Enhanced `for`      | simpler iteration                      | everyday collection traversal                |
| Autoboxing/unboxing | automatic primitive-wrapper conversion | convenience plus hidden costs                |
| Varargs             | variable-length argument lists         | APIs like `printf`, builders, helpers        |
| Static imports      | import static members                  | fluent tests/utilities, but readability risk |

Generics changed Java APIs permanently:

```java
List<String> names = new ArrayList<>();
names.add("Ada");

// names.add(42); // compile-time error
```

But because generics were added for backward compatibility, Java uses erasure. This historical compromise explains many sharp edges:

| Erasure consequence                  | Modern effect                           |
| ------------------------------------ | --------------------------------------- |
| old raw collections still exist      | raw types appear in legacy code         |
| generic type arguments mostly erased | runtime generic checks are limited      |
| no `new T()`                         | factories/type tokens needed            |
| no `instanceof List<String>`         | validate elements manually              |
| unchecked warnings exist             | type-safety boundaries must be isolated |

Enums replaced integer/string constants for closed categories:

```java
public enum OrderStatus {
    CREATED,
    PAID,
    SHIPPED,
    CANCELLED
}
```

Annotations opened the path to modern enterprise Java:

```java
@Override
public String toString() {
    return "User";
}
```

Later frameworks extended annotations far beyond compiler checks: routing, validation, dependency injection, transactions, persistence, serialization, testing, and observability.

Autoboxing made code convenient:

```java
List<Integer> values = new ArrayList<>();
values.add(1);
```

But it also introduced hidden allocation, null-unboxing risk, and performance traps.

```java
Integer value = null;
// int x = value; // NullPointerException
```

**Tempting but wrong mental model:** “Generics made Java fully runtime-generic.”

**Correct historical reading:** Generics were added under backward-compatibility constraints. Erasure is a deliberate compatibility tradeoff, not an accidental bug.

**Professional rule of thumb:** Treat Java 5 features as modern core Java, but remember their compromises: erased generics, annotation-driven indirection, boxing costs, and varargs/generic heap-pollution risks.

### Java 8 as a Major Turning Point — lambdas, streams, `Optional`, `java.time`

Java 8 changed Java’s programming style. It did not make Java a functional language in the same sense as Haskell, Scala, OCaml, or F#. It added functional-style tools into Java’s nominal, class-based ecosystem.

| Feature                   | What it added                          | Why it matters                           |
| ------------------------- | -------------------------------------- | ---------------------------------------- |
| Lambdas                   | inline behavior values                 | callbacks, filters, transformations      |
| Method references         | concise references to existing methods | stream and API readability               |
| Functional interfaces     | nominal target types for lambdas       | Java’s function-like abstraction model   |
| Streams                   | lazy data-processing pipelines         | collection transformation idioms         |
| Default interface methods | interface evolution                    | API compatibility and behavior           |
| `Optional`                | explicit maybe-result wrapper          | absence modeling                         |
| `java.time`               | modern date/time API                   | replacement for legacy `Date`/`Calendar` |

Lambda:

```java
Predicate<User> active = User::isActive;
```

Stream:

```java
List<EmailAddress> emails = users.stream()
        .filter(User::isActive)
        .map(User::email)
        .toList();
```

This style improved many data-processing tasks. But it also created new mistakes:

| Java 8 feature   | Useful when                | Misused when                                |
| ---------------- | -------------------------- | ------------------------------------------- |
| Lambda           | small behavior parameter   | large hidden control flow                   |
| Method reference | method name is clear       | parameter flow becomes obscure              |
| Stream           | pure-ish transformation    | side-effect-heavy workflow                  |
| Parallel stream  | CPU-bound pure computation | blocking I/O or shared mutation             |
| `Optional`       | maybe-return value         | field/parameter/null replacement everywhere |
| Default method   | interface evolution        | interface becomes hidden base class         |
| `java.time`      | correct time modeling      | wrong type chosen for time concept          |

`Optional`:

```java
public Optional<User> findUser(UserId id) {
    return Optional.ofNullable(users.get(id));
}
```

This is good for lookup absence. It is not a universal null-safety system.

`java.time`:

```java
Instant createdAt = clock.instant();
LocalDate birthday = LocalDate.of(1815, 12, 10);
Duration timeout = Duration.ofSeconds(30);
```

The historical importance of `java.time` is that it corrected many design problems of older date/time APIs and gave Java a precise vocabulary for time concepts.

**Tempting but wrong mental model:** “Java 8 made Java functional.”

**Correct historical reading:** Java 8 added functional-style composition to a nominal OOP language. Lambdas are target-typed functional-interface instances, not free-standing structural functions.

**Professional rule of thumb:** Use Java 8 features for clarity, not fashion. Streams and lambdas should make data flow clearer; otherwise a loop or named method is better.

### Java 9 and the Modular Era — JPMS, runtime images, APIs, collection factories

Java 9 introduced the Java Platform Module System, usually called `JPMS`. This was a major architectural change, even though many applications still use classpath-based workflows.

| Feature/theme                | What changed                                       | Why it matters                                  |
| ---------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| Modules                      | `module-info.java`, `requires`, `exports`, `opens` | stronger boundaries                             |
| JDK modularization           | JDK itself split into modules                      | smaller runtime images and clearer dependencies |
| `jlink`                      | custom runtime images                              | deployment control                              |
| Collection factories         | `List.of`, `Set.of`, `Map.of`                      | concise unmodifiable collections                |
| JShell                       | interactive Java shell                             | learning/prototyping                            |
| Stronger encapsulation trend | internal APIs less casually accessible             | framework/reflection impact                     |

Module descriptor:

```java
module com.example.billing {
    requires java.sql;
    exports com.example.billing.api;
}
```

Collection factories:

```java
List<String> names = List.of("Ada", "Grace");
Set<Role> roles = Set.of(Role.ADMIN, Role.MEMBER);
Map<String, Integer> scores = Map.of("Ada", 100, "Grace", 95);
```

These collections are unmodifiable. That is a library contract; the concrete implementation class should not be relied on.

The module system changed the meaning of access. A class may be `public`, but if its package is not exported by the module, it is not part of the module’s public API to other modules.

| Classpath world                                | Module path world                    |
| ---------------------------------------------- | ------------------------------------ |
| public classes broadly visible if on classpath | modules must read required modules   |
| package naming often convention-only           | exports/opens can enforce boundaries |
| reflection often broad                         | reflection may require `opens`       |
| dependency conflicts common                    | module resolution adds structure     |
| many apps still use this mode                  | stricter but more explicit           |

`opens` matters for reflection:

```java
module com.example.app {
    opens com.example.app.model to com.fasterxml.jackson.databind;
}
```

This permits a specific framework to use reflection on the package. Broadly opening everything weakens encapsulation.

**Tempting but wrong mental model:** “Modules are just packages with another name.”

**Correct historical reading:** Packages are namespaces and access groups; modules are dependency/readability/export boundaries.

**Professional rule of thumb:** Even if a project does not use JPMS strictly, learn the module concepts because they explain modern JDK encapsulation, reflection access, runtime images, and library boundary design.

### Modern Concision — `var`, switch expressions, text blocks, compact source forms

Modern Java has added several features to reduce ceremony without abandoning static typing.

| Feature              | Main benefit                      | Main caution                                   |
| -------------------- | --------------------------------- | ---------------------------------------------- |
| `var`                | local type inference              | can hide important abstraction type            |
| switch expressions   | expression-oriented branching     | must understand exhaustiveness/default         |
| arrow switch labels  | reduce fall-through bugs          | not all switch styles equivalent               |
| text blocks          | readable multi-line strings       | indentation and escaping rules                 |
| collection factories | concise unmodifiable data         | shallow immutability                           |
| records              | concise transparent data carriers | not deep immutability                          |
| compact source forms | easier entry-level code           | not replacement for full application structure |

`var`:

```java
var path = Path.of("data", "users.json");
var users = repository.findActiveUsers();
```

`var` preserves static typing. It does not make Java dynamic.

Switch expression:

```java
String label = switch (status) {
    case ACTIVE -> "Active";
    case SUSPENDED -> "Suspended";
    case DELETED -> "Deleted";
};
```

Text block:

```java
String query = """
        SELECT id, email
        FROM users
        WHERE active = true
        """;
```

These features make Java more readable in many cases, but they should not be mistaken for a new language identity. Java remains statically typed, nominal, class-based, and JVM-executed.

| Concision feature | Good use                             | Bad use                           |
| ----------------- | ------------------------------------ | --------------------------------- |
| `var`             | obvious local initializer            | hiding complex generic type       |
| switch expression | finite value-to-result mapping       | complex side-effect workflow      |
| text block        | SQL/JSON/templates                   | embedding large unvalidated logic |
| `List.of`         | stable small unmodifiable collection | expecting mutability              |
| records           | value-like data                      | mutable lifecycle entity          |
| compact syntax    | learning/simple scripts              | serious app architecture          |

**Tempting but wrong mental model:** “Modern Java is trying to become Python/JavaScript.”

**Correct historical reading:** Modern Java is reducing unnecessary ceremony while preserving static typing, nominal contracts, and compatibility.

**Professional rule of thumb:** Use concision where it improves signal-to-noise. Do not use it to hide important types, effects, mutability, or lifecycle.

### Data-Oriented Java — records, sealed types, pattern matching, switch

Modern Java is moving toward **data-oriented programming** within a nominal, class-based system. This is not a rejection of objects. It is a recognition that many programs model data variants, value aggregates, and transformations.

| Feature                | Data-modeling role            |
| ---------------------- | ----------------------------- |
| Record                 | transparent value aggregate   |
| Sealed class/interface | closed variant family         |
| Pattern matching       | safe type/value decomposition |
| Switch expression      | expression-level branching    |
| Enum                   | closed symbolic state         |
| `Optional`             | possible absence              |
| Collection factories   | stable small aggregates       |
| `java.time`            | semantic value types          |

Example:

```java
public sealed interface PaymentEvent
        permits PaymentStarted, PaymentSucceeded, PaymentFailed {
}

public record PaymentStarted(PaymentId id) implements PaymentEvent {
}

public record PaymentSucceeded(PaymentId id, String transactionId) implements PaymentEvent {
}

public record PaymentFailed(PaymentId id, String reason) implements PaymentEvent {
}
```

Branching:

```java
public String describe(PaymentEvent event) {
    return switch (event) {
        case PaymentStarted started ->
                "Payment started: " + started.id();
        case PaymentSucceeded succeeded ->
                "Payment succeeded: " + succeeded.transactionId();
        case PaymentFailed failed ->
                "Payment failed: " + failed.reason();
    };
}
```

This style is useful when the domain is naturally a closed set of variants.

| Use data-oriented style when   | Prefer classic object behavior when |
| ------------------------------ | ----------------------------------- |
| variants are finite and known  | hierarchy should remain open        |
| data shape matters             | behavior belongs inside object      |
| exhaustive handling is useful  | callers should not branch by type   |
| records model values well      | state has lifecycle/mutation        |
| boundary translation is common | polymorphic behavior is stable      |

Data-oriented Java also reduces primitive obsession:

```java
public record UserId(String value) {
    public UserId {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("blank user id");
        }
    }
}
```

**Tempting but wrong mental model:** “Records and sealed types replace classes and interfaces.”

**Correct historical reading:** Records and sealed types fill gaps in Java’s modeling toolkit. Classes and interfaces remain essential for behavior, lifecycle, services, and open polymorphism.

**Professional rule of thumb:** Use records for transparent values, sealed types for closed alternatives, classes for encapsulated state/lifecycle, and interfaces for open behavior contracts.

### Concurrency Modernization — from threads and executors to virtual threads

Java’s early concurrency model centered on threads, monitors, `synchronized`, `wait`, `notify`, and later the `java.util.concurrent` package. Over time, Java added executors, futures, concurrent collections, atomics, fork/join, completable futures, and virtual threads.

| Concurrency era/style  | Main mechanism                         |              Still relevant? | Main caution                  |
| ---------------------- | -------------------------------------- | ---------------------------: | ----------------------------- |
| Raw threads            | `new Thread(...)`                      | yes, but less often directly | lifecycle management          |
| Intrinsic locks        | `synchronized`                         |                          yes | deadlock/contention           |
| Wait/notify            | `wait`, `notify`                       |             legacy/low-level | easy to misuse                |
| Executors              | `ExecutorService`                      |                          yes | shutdown/backpressure         |
| Concurrent collections | `ConcurrentHashMap`, queues            |                          yes | compound invariants           |
| Atomics                | `AtomicInteger`, etc.                  |                          yes | multi-field invariants        |
| Fork/join              | parallel computation                   |                          yes | blocking caveats              |
| CompletableFuture      | async composition                      |                          yes | executor/exception complexity |
| Reactive frameworks    | nonblocking streams                    |           ecosystem-specific | steep model                   |
| Virtual threads        | lightweight blocking-style concurrency |                  modern core | resource limits remain        |

Virtual threads are historically important because they make direct blocking code viable for many high-concurrency I/O workloads.

```java
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<User> user = executor.submit(() -> userClient.load(userId));
    Future<Account> account = executor.submit(() -> accountClient.load(accountId));

    return new UserAccount(user.get(), account.get());
}
```

This can be clearer than callback-heavy async code. But it does not eliminate the Java Memory Model, shared-state hazards, external resource limits, or cancellation concerns.

| Virtual threads improve                 | Virtual threads do not solve |
| --------------------------------------- | ---------------------------- |
| cost of many blocking waits             | data races                   |
| readability of I/O concurrency          | downstream rate limits       |
| thread-per-task style                   | database pool exhaustion     |
| debugging compared with callback chains | transaction semantics        |
| integration with ordinary blocking APIs | cancellation policy          |
| simpler server request handling         | CPU-bound parallelism limits |

**Tempting but wrong mental model:** “Virtual threads replace all async/reactive designs.”

**Correct historical reading:** Virtual threads reduce the cost of blocking-style concurrency. Nonblocking/reactive designs may still be appropriate for specific frameworks, streaming models, backpressure semantics, or ecosystem constraints.

**Professional rule of thumb:** Prefer simple blocking code on virtual threads when it matches the workload, but design resource limits, timeouts, cancellation, and shared-state safety explicitly.

### Enterprise and Framework Evolution — from containers to annotation-driven and cloud-native Java

Java’s enterprise ecosystem has evolved from heavyweight application-server models to annotation-driven frameworks, dependency injection, microservices, cloud-native runtimes, and increasingly build-time or ahead-of-time optimization in some frameworks.

| Enterprise pattern       | Why it appeared                         | Modern caution                           |
| ------------------------ | --------------------------------------- | ---------------------------------------- |
| Application servers      | centralized deployment/runtime services | heavyweight coupling                     |
| Servlets/JSP era         | web application standardization         | legacy code shape                        |
| EJB-style components     | enterprise transactions/remoting        | overcomplexity in older systems          |
| Dependency injection     | decouple construction and dependencies  | interface/proxy proliferation            |
| Annotation configuration | reduce XML/manual wiring                | hidden behavior                          |
| ORMs                     | map objects to databases                | lazy loading and entity/domain confusion |
| Microservices            | independent deployment and scaling      | distributed-system complexity            |
| Cloud-native frameworks  | faster startup, containers, config      | framework-specific runtime model         |
| Observability tooling    | production diagnosis                    | metrics/log/tracing discipline           |
| Security frameworks      | authentication/authorization            | annotation and proxy boundaries          |

Modern Java framework code may look simple:

```java
@Transactional
public void cancelOrder(OrderId id) {
    Order order = orders.require(id);
    order.cancel();
    orders.save(order);
}
```

But the real behavior may involve dependency injection, transaction proxies, persistence context, lazy loading, validation, security, logging, caching, and exception translation.

| Framework mechanism       | Hidden effect                      |
| ------------------------- | ---------------------------------- |
| `@Transactional`          | transaction boundary               |
| validation annotation     | validator must execute             |
| ORM entity annotation     | persistence mapping                |
| lazy relation             | database access may happen later   |
| DI annotation             | container controls construction    |
| cache annotation          | result may not execute method body |
| security annotation       | access check before method body    |
| event listener annotation | method invoked by framework        |

**Tempting but wrong mental model:** “Framework Java is just Java with annotations.”

**Correct historical reading:** Framework Java often changes object lifecycle, method invocation, class loading, reflection access, transactions, and runtime behavior through containers and proxies.

**Professional rule of thumb:** Separate Java language knowledge from framework behavior. Know when code is plain Java and when it is container-mediated Java.

### Legacy APIs and Migration — what to recognize, what to replace, what to isolate

Modern Java codebases often contain legacy APIs and styles. The goal is not to rewrite everything immediately, but to recognize risk and isolate old constructs.

| Legacy construct/style               | Modern preference                                 | Migration strategy                |
| ------------------------------------ | ------------------------------------------------- | --------------------------------- |
| raw collections                      | generics                                          | add type parameters at boundaries |
| `Date` / `Calendar`                  | `java.time`                                       | convert at boundary               |
| `Vector` / `Hashtable`               | modern collections/concurrent collections         | replace when safe                 |
| `Stack`                              | `Deque` / `ArrayDeque`                            | migrate stack behavior            |
| manual resource cleanup              | `try-with-resources`                              | local refactor                    |
| string/integer constants             | enum                                              | convert state model               |
| XML-heavy config                     | annotations/code/config classes depending context | gradual framework migration       |
| built-in Java serialization          | explicit DTO/schema                               | isolate and replace               |
| `Thread` directly everywhere         | executors/virtual threads                         | centralize execution              |
| `wait`/`notify`                      | concurrency utilities                             | replace with queue/latch/lock     |
| `System.currentTimeMillis` for logic | `Clock`/`Instant`                                 | inject time source                |
| nullable returns                     | `Optional` or explicit result                     | API migration carefully           |
| public mutable fields                | encapsulated class/record                         | refactor with accessors           |

Legacy raw collection:

```java
List users = legacyApi.loadUsers();
```

Adapter:

```java
List<User> users = new ArrayList<>();

for (Object value : legacyApi.loadUsers()) {
    if (!(value instanceof User user)) {
        throw new IllegalStateException("legacy API returned non-User");
    }
    users.add(user);
}

return List.copyOf(users);
```

Legacy date boundary:

```java
Date legacy = legacyApi.createdAt();
Instant createdAt = legacy.toInstant();
```

Legacy code should be isolated:

| Legacy handling option | Use when                             |
| ---------------------- | ------------------------------------ |
| leave in place         | stable, low-risk, not worth touching |
| wrap with adapter      | unsafe boundary affects modern code  |
| migrate locally        | small safe refactor                  |
| migrate by module      | subsystem modernization              |
| rewrite                | old code blocks critical evolution   |
| document risk          | migration deferred deliberately      |

**Tempting but wrong mental model:** “Modernization means replacing every old API immediately.”

**Correct historical reading:** Modernization should reduce risk. Some legacy code is stable and should be wrapped rather than aggressively rewritten.

**Professional rule of thumb:** Migrate boundaries first: raw types, date/time, resources, nulls, public mutable state, and unsafe serialization.

### Java’s Current Direction — concise, data-oriented, concurrent, observable, compatible

Java’s current trajectory can be summarized as **modernization under compatibility constraints**.

| Direction                     | Representative mechanisms                                  | Meaning                                  |
| ----------------------------- | ---------------------------------------------------------- | ---------------------------------------- |
| Less boilerplate              | records, `var`, switch expressions, text blocks            | reduce ceremony                          |
| Better data modeling          | records, sealed types, pattern matching                    | model values and variants                |
| Safer branching               | switch expressions, patterns, exhaustiveness               | reduce error-prone conditionals          |
| Better concurrency            | virtual threads, structured task ideas, improved executors | make concurrent code clearer             |
| Stronger boundaries           | modules, encapsulation, runtime images                     | clarify dependency and reflection access |
| Better runtime diagnostics    | JFR, modern GC, JVM tooling                                | production Java as observable platform   |
| Compatibility preservation    | conservative evolution                                     | old code remains relevant                |
| Framework/runtime integration | annotations, build-time processing, proxies                | ecosystem remains central                |

Java is not moving toward one single paradigm. It is becoming more capable in several directions while keeping its original commitments:

| Original Java identity   | Modern extension                             |
| ------------------------ | -------------------------------------------- |
| class-based OOP          | records and sealed types                     |
| explicit nominal types   | pattern matching and type inference          |
| managed runtime          | better diagnostics and GC                    |
| thread-based concurrency | virtual threads and richer concurrency tools |
| static typing            | more expressive modeling                     |
| enterprise tooling       | cloud-native and container-aware workflows   |
| compatibility            | gradual feature layering                     |

**Tempting but wrong mental model:** “Modern Java is becoming a different language.”

**Correct historical reading:** Modern Java is still Java: statically typed, nominal, JVM-based, compatibility-preserving, and ecosystem-heavy. The new features reduce friction and improve modeling, but they do not erase the old model.

**Professional rule of thumb:** Write modern Java where it clarifies code, but maintain fluency in older Java because production systems preserve history.

### Feature Adoption Strategy — when to use new features in real systems

New Java features should be adopted based on clarity, runtime support, team familiarity, library compatibility, and deployment baseline.

| Feature              | Adopt when                           | Avoid or delay when                    |
| -------------------- | ------------------------------------ | -------------------------------------- |
| Records              | value-like data is transparent       | entity/lifecycle identity matters      |
| Sealed types         | variant set is closed                | third-party extension needed           |
| Pattern matching     | type/value decomposition is clearer  | polymorphism is better                 |
| Switch expressions   | mapping value to result              | side-effect-heavy workflow             |
| `var`                | local initializer is obvious         | abstraction type matters               |
| Text blocks          | multi-line text improves readability | dynamic templating/security issues     |
| Virtual threads      | many blocking I/O tasks              | CPU-bound work or unbounded downstream |
| Modules              | boundary enforcement matters         | app not ready for JPMS complexity      |
| Collection factories | small unmodifiable data              | callers must mutate                    |
| `Optional`           | maybe-return result                  | fields/parameters by default           |

Adoption checklist:

| Question                           | Why it matters                 |
| ---------------------------------- | ------------------------------ |
| Is the deployment JDK compatible?  | feature availability           |
| Is the feature final or preview?   | stability and compiler flags   |
| Does it improve clarity?           | avoids novelty-driven use      |
| Does the team understand it?       | maintainability                |
| Does it affect public API?         | compatibility                  |
| Does it affect serialization?      | protocol stability             |
| Does it affect framework behavior? | reflection/proxy compatibility |
| Does it affect performance?        | profiling may be needed        |
| Can older code interoperate?       | migration safety               |

Example: record adoption.

Good:

```java
public record UserId(String value) {
    public UserId {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("blank user id");
        }
    }
}
```

Risky:

```java
public record UserEntity(UserId id, String displayName, List<Order> orders) {
}
```

If `UserEntity` is a mutable persistence entity with lazy-loaded orders, lifecycle identity, and framework requirements, a record may be a poor fit.

Example: sealed type adoption.

Good:

```java
public sealed interface ImportOutcome
        permits ImportSucceeded, ImportFailed {
}
```

Bad if plugins need to define new outcomes externally.

**Tempting but wrong mental model:** “Use the newest feature wherever possible.”

**Correct historical reading:** Java evolves conservatively because compatibility matters. Feature adoption should also be conservative in public APIs and production systems.

**Professional rule of thumb:** Adopt features when they make code more precise, not merely more recent.

### Historical Layer Recognition Table — reading real Java code

| Code pattern             | Historical layer               | How to read it                | Modern response                        |
| ------------------------ | ------------------------------ | ----------------------------- | -------------------------------------- |
| raw `List`               | pre-generics/legacy            | type safety missing           | isolate and genericize                 |
| `Date` / `Calendar`      | legacy time API                | old date/time model           | convert to `java.time`                 |
| `Vector` / `Hashtable`   | early synchronized collections | legacy thread-safety idea     | use modern collections                 |
| anonymous class          | pre-lambda behavior object     | callback/strategy             | lambda if simpler                      |
| `Thread` direct creation | low-level concurrency          | manual lifecycle              | executor/virtual thread if appropriate |
| `wait` / `notify`        | low-level monitor coordination | fragile concurrency           | use concurrency utilities              |
| XML config               | older framework configuration  | external wiring               | keep or migrate carefully              |
| heavy annotations        | framework era                  | metadata-driven behavior      | understand consumer/proxy              |
| stream pipelines         | Java 8 functional style        | data transformation           | check side effects                     |
| `Optional` return        | Java 8 absence modeling        | maybe-result                  | avoid misuse                           |
| `var`                    | modern local inference         | type inferred                 | verify readability                     |
| record                   | modern data carrier            | component equality            | check immutability/entity fit          |
| sealed type              | modern closed variants         | finite alternatives           | check extension needs                  |
| pattern switch           | modern branching               | data/type decomposition       | check preview/final baseline           |
| virtual-thread executor  | modern concurrency             | blocking-style scalable tasks | enforce resource limits                |

### Java Evolution Tradeoff Table — benefit and cost of modernization

| Modernization theme          | Benefit                                | Cost                                          |
| ---------------------------- | -------------------------------------- | --------------------------------------------- |
| Records                      | reduce boilerplate for values          | can expose representation too strongly        |
| Sealed types                 | stronger finite modeling               | less extension flexibility                    |
| Pattern matching             | safer decomposition                    | can encourage type-case overuse               |
| Switch expressions           | clearer value mapping                  | requires exhaustiveness/default care          |
| `var`                        | less repetition                        | can hide important type                       |
| Text blocks                  | readable multi-line literals           | still not safe templating by itself           |
| Virtual threads              | simpler high-concurrency blocking code | resource limits still required                |
| Modules                      | stronger boundaries                    | migration complexity                          |
| Collection factories         | concise unmodifiable values            | shallow immutability and mutability surprises |
| Functional style             | concise transformations                | side-effect/debugging traps                   |
| Annotation-driven frameworks | less boilerplate                       | hidden behavior and proxy complexity          |
| Runtime diagnostics          | better production insight              | requires operational literacy                 |

### Historical and Trend Failure Mode Index

| Failure mode                  | Historical cause               | Symptom                          | Correction                                   |
| ----------------------------- | ------------------------------ | -------------------------------- | -------------------------------------------- |
| Treating Java as C++ with GC  | C-family syntax similarity     | wrong memory/value assumptions   | learn reference/value/pass-by-value model    |
| Raw type leakage              | generics added later           | unchecked warnings               | adapter and generic APIs                     |
| Boxing surprise               | Java 5 convenience feature     | allocation or null-unboxing      | use primitives/specialized APIs where needed |
| Annotation magic              | framework era                  | behavior invisible in source     | identify annotation consumer                 |
| Stream abuse                  | Java 8 style adoption          | unreadable side-effect pipelines | use loops when clearer                       |
| `Optional` overuse            | absence modeling misunderstood | awkward fields/parameters        | use primarily for return absence             |
| Legacy date bugs              | old API remains visible        | wrong time zones/mutable dates   | migrate to `java.time`                       |
| Module access failures        | stronger encapsulation         | reflection/linkage errors        | export/open intentionally                    |
| Record misuse                 | concision over modeling        | entity equality bugs             | use classes for lifecycle identity           |
| Sealed overuse                | closed modeling overapplied    | extension blocked                | use interface when open                      |
| Virtual-thread overconfidence | concurrency cost model changed | downstream exhaustion            | bound resources and design cancellation      |
| Framework/domain confusion    | enterprise Java history        | persistence/API/domain tangled   | isolate DTO/entity/domain                    |
| Compatibility break           | Java culture underestimated    | clients fail after change        | track source/binary/semantic compatibility   |
| Novelty-driven adoption       | modern feature enthusiasm      | inconsistent codebase            | adopt by clarity and baseline                |
## PART 9 — Professional Java Engineering, Tooling, Architecture, and Practice

### Orientation — from language knowledge to production Java competence

Professional Java competence is not only the ability to write valid Java syntax. It is the ability to build, test, debug, package, deploy, operate, and evolve Java systems under real constraints.

A Java professional must manage several simultaneous layers:

| Layer         | Professional question                                            |
| ------------- | ---------------------------------------------------------------- |
| Language      | Is the code semantically correct and readable?                   |
| Type system   | Are invalid states and invalid calls hard to express?            |
| JVM           | Does runtime behavior match performance and memory expectations? |
| Library/API   | Are standard APIs used correctly?                                |
| Build system  | Are dependencies, plugins, tests, and artifacts reproducible?    |
| Architecture  | Are boundaries, responsibilities, and dependencies controlled?   |
| Testing       | Are core behavior, boundaries, and integrations verified?        |
| Observability | Can failures be diagnosed in production?                         |
| Operations    | Can the system be deployed, configured, scaled, and upgraded?    |
| Maintenance   | Can future developers safely change it?                          |

The professional Java mindset is therefore:

| Amateur focus                       | Professional focus                                      |
| ----------------------------------- | ------------------------------------------------------- |
| “Does it compile?”                  | “Is the contract correct?”                              |
| “Does it work for this input?”      | “What are the invariants and failure modes?”            |
| “Can I use a library?”              | “What dependency and compatibility burden does it add?” |
| “Can I make it faster?”             | “Where is the measured bottleneck?”                     |
| “Can I catch the exception?”        | “Where is the right recovery boundary?”                 |
| “Can I expose this method?”         | “Am I creating a long-term API obligation?”             |
| “Can I use a framework annotation?” | “What runtime behavior does this annotation trigger?”   |

### Project Structure — source sets, packages, modules, tests, resources

A professional Java project should make code location, dependency direction, and build responsibility visible.

A typical application layout:

```text
project/
  build.gradle or pom.xml
  src/
    main/
      java/
        com/example/app/
      resources/
        application.properties
    test/
      java/
        com/example/app/
      resources/
        test-data.json
```

A modular or library-oriented layout may include:

```text
src/main/java/module-info.java
src/main/java/com/example/billing/api/
src/main/java/com/example/billing/internal/
src/test/java/com/example/billing/
```

| Area                 | Role                              | Common mistake                         |
| -------------------- | --------------------------------- | -------------------------------------- |
| `src/main/java`      | production source                 | mixing test helpers into production    |
| `src/main/resources` | production resources              | assuming file-system paths             |
| `src/test/java`      | test source                       | testing only happy paths               |
| `src/test/resources` | test fixtures                     | relying on production config           |
| generated sources    | code produced by tools            | editing generated files manually       |
| build file           | dependency and plugin declaration | unmanaged version drift                |
| module descriptor    | JPMS boundary                     | exporting too much                     |
| package structure    | architecture and visibility       | package names without boundary meaning |

A useful package split for a medium-sized service:

```text
com.example.billing.api
com.example.billing.application
com.example.billing.domain
com.example.billing.persistence
com.example.billing.integration
com.example.billing.config
com.example.billing.internal
```

| Package       | Typical content                                       |
| ------------- | ----------------------------------------------------- |
| `api`         | public DTOs, interfaces, externally visible contracts |
| `application` | use-case orchestration, transaction boundaries        |
| `domain`      | domain model, value objects, invariants               |
| `persistence` | repositories, database mapping, storage adapters      |
| `integration` | external clients, gateways, protocol adapters         |
| `config`      | framework/build/runtime wiring                        |
| `internal`    | implementation not intended as API                    |

This is not a universal template. A small tool should not imitate a large enterprise service. A library may need stronger `api/internal/spi` boundaries. A framework application may use conventional package layouts.

| Project scale                | Better structure                                                      |
| ---------------------------- | --------------------------------------------------------------------- |
| single-file learning example | minimal class/source file                                             |
| small CLI                    | command parser, domain logic, I/O boundary                            |
| library                      | public API, internal implementation, tests                            |
| web service                  | API/controller, application service, domain, persistence, integration |
| enterprise platform          | modules, stable APIs, SPI, dependency constraints                     |
| plugin system                | API/SPI separation, class-loading discipline                          |

**Tempting but wrong mental model:** “A standard folder structure makes architecture good.”

**Correct professional reading:** Folder structure supports architecture, but dependency direction, visibility, type design, tests, and runtime boundaries determine whether architecture is real.

**Professional rule of thumb:** Let structure reveal responsibility and boundary. Avoid both flat chaos and ceremonial nesting.

### Build and Dependency Discipline — Maven, Gradle, reproducibility, dependency graphs

Java build tools manage compilation, testing, resources, dependencies, plugins, packaging, and sometimes deployment. A professional Java developer should understand build behavior, not merely run `mvn test` or `gradle build`.

| Build concern           | Professional requirement                 |
| ----------------------- | ---------------------------------------- |
| JDK version             | explicit toolchain or release target     |
| dependency versions     | pinned, aligned, auditable               |
| transitive dependencies | inspected and controlled                 |
| plugin versions         | explicit and reproducible                |
| test phases             | unit/integration separation where needed |
| generated code          | predictable source generation            |
| artifact output         | known packaging format                   |
| resource inclusion      | verified in artifact                     |
| CI build                | same as local build where possible       |
| dependency security     | scanned and updated deliberately         |

Maven dependency example:

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
</dependency>
```

Gradle dependency example:

```groovy
dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.0")
}
```

The professional question is not only “what dependency do I need?” but:

| Dependency question                       | Why it matters                       |
| ----------------------------------------- | ------------------------------------ |
| Is it needed?                             | dependency surface grows             |
| Is it maintained?                         | security and compatibility           |
| What transitive dependencies enter?       | version conflicts                    |
| What license applies?                     | legal/project constraints            |
| What runtime footprint is added?          | artifact size/startup                |
| Does it conflict with framework versions? | runtime linkage errors               |
| Is it API or implementation dependency?   | downstream exposure                  |
| Does it require annotation processing?    | generated-code boundary              |
| Does it require reflection config?        | modules/AOT/native-image constraints |

Dependency conflict symptoms:

| Symptom                             | Likely cause                                                  |
| ----------------------------------- | ------------------------------------------------------------- |
| `NoSuchMethodError`                 | runtime library version differs from compile-time expectation |
| `ClassNotFoundException`            | missing runtime dependency                                    |
| `NoClassDefFoundError`              | class unavailable or failed during initialization             |
| duplicate logging implementations   | dependency collision                                          |
| framework startup failure           | incompatible versions                                         |
| test passes locally but fails in CI | environment or dependency mismatch                            |

Dependency hygiene:

```text
- inspect dependency tree
- align versions through BOM/platform where appropriate
- avoid dynamic versions in production builds
- keep test dependencies out of runtime
- avoid depending on internal implementation artifacts
- document exclusions
- update dependencies deliberately
```

**Tempting but wrong mental model:** “Dependency problems are build-tool problems.”

**Correct professional reading:** Dependency problems are architecture and runtime problems expressed through the build system.

**Professional rule of thumb:** Treat dependencies as part of the design. Every dependency is code that enters the system’s compatibility, security, and runtime surface.

### Testing Strategy — unit, integration, contract, end-to-end, performance

Java testing should be layered. Different test types answer different questions.

| Test type          | Main question                                | Typical tools                               | Common misuse               |
| ------------------ | -------------------------------------------- | ------------------------------------------- | --------------------------- |
| Unit test          | Does local behavior satisfy rules?           | JUnit, AssertJ                              | overmocking                 |
| Integration test   | Do real components work together?            | JUnit, Testcontainers, framework test tools | too slow/unfocused          |
| Contract test      | Does provider/consumer API expectation hold? | contract tools/custom tests                 | treating as full E2E        |
| End-to-end test    | Does full workflow work?                     | app-level test stack                        | too many brittle cases      |
| Property-like test | Does rule hold across many inputs?           | generators/custom loops                     | unreadable random cases     |
| Regression test    | Is known bug fixed permanently?              | focused test                                | no broader coverage         |
| Performance test   | Is latency/throughput acceptable?            | JMH, load tests, profilers                  | naive timing loops          |
| Smoke test         | Does deployment basically start/work?        | CI/CD checks                                | too shallow for correctness |

A good unit test is specific:

```java
class MoneyTest {
    @Test
    void rejectsCurrencyMismatchWhenAdding() {
        Money usd = new Money(new BigDecimal("10.00"), Currency.getInstance("USD"));
        Money eur = new Money(new BigDecimal("5.00"), Currency.getInstance("EUR"));

        assertThrows(IllegalArgumentException.class, () -> usd.plus(eur));
    }
}
```

A good integration test checks a real boundary:

```java
class UserRepositoryIntegrationTest {
    @Test
    void savesAndLoadsUser() {
        UserRepository repository = realRepository();

        User user = new User(new UserId("u-001"), new EmailAddress("ada@example.com"));
        repository.save(user);

        assertEquals(Optional.of(user), repository.findById(user.id()));
    }
}
```

A poor unit test often verifies implementation rather than behavior:

```java
@Test
void callsThreeInternalMethods() {
    // brittle interaction test
}
```

Testable design often requires:

| Hard-to-test dependency | Better seam                             |
| ----------------------- | --------------------------------------- |
| current time            | `Clock`                                 |
| random values           | injected generator                      |
| external HTTP           | client/gateway interface                |
| database                | repository boundary                     |
| filesystem              | `Path` parameter or storage abstraction |
| environment variables   | typed config object                     |
| thread execution        | executor abstraction                    |
| static global state     | explicit dependency                     |

Testing does not require every class to have an interface. It requires clear seams around nondeterminism, I/O, external systems, and policies.

| Good test quality             | Bad test quality                                           |
| ----------------------------- | ---------------------------------------------------------- |
| asserts behavior and outcome  | asserts irrelevant implementation details                  |
| uses real value objects       | mocks everything                                           |
| tests failures and boundaries | only tests happy path                                      |
| deterministic                 | depends on sleep/time/order                                |
| isolated state                | leaks global state                                         |
| readable fixtures             | magic data                                                 |
| fast unit layer               | all tests require full app                                 |
| integration where needed      | mocks persistence/framework behavior that should be tested |

**Tempting but wrong mental model:** “More mocks mean more unit testing.”

**Correct professional reading:** Mocks replace boundaries; they should not replace the domain model.

**Professional rule of thumb:** Test domain rules with real objects, boundaries with controlled substitutes, and framework/persistence/network behavior with integration tests.

### Code Review — correctness, contracts, boundaries, maintainability

Java code review should not be limited to style. It should check semantic correctness, API contracts, null policy, type modeling, resource handling, concurrency, error boundaries, dependency impact, and observability.

| Review dimension   | Questions                                              |
| ------------------ | ------------------------------------------------------ |
| Types and modeling | Are domain concepts represented precisely?             |
| Nullability        | Can `null` enter? Is absence modeled clearly?          |
| Equality           | Are `equals`/`hashCode` correct and stable?            |
| Mutability         | Are mutable internals exposed?                         |
| API design         | Are signatures clear and hard to misuse?               |
| Visibility         | Is anything public unnecessarily?                      |
| Error handling     | Are failures handled at the right boundary?            |
| Resources          | Are resources closed?                                  |
| Concurrency        | Is shared mutable state protected?                     |
| Dependencies       | Is the new dependency justified?                       |
| Tests              | Do tests cover core behavior and failures?             |
| Observability      | Are important failures/logs/metrics present?           |
| Performance        | Any obvious hot-path or asymptotic issue?              |
| Framework behavior | Are annotations/proxies/lifecycle assumptions correct? |

Review examples:

| Code smell                        | Review response                                       |
| --------------------------------- | ----------------------------------------------------- |
| `public` on every class           | reduce visibility                                     |
| `String status`                   | use enum or parser                                    |
| returning internal `List`         | defensive copy or unmodifiable representation         |
| `catch (Exception e) {}`          | define recovery or propagate                          |
| `throws Exception`                | use specific exception                                |
| `System.getenv` in business logic | typed config boundary                                 |
| raw `List`                        | use generics or adapter                               |
| `Thread.sleep` in test            | use synchronization/test clock                        |
| `new RealClient()` in service     | inject boundary                                       |
| `HashMap` static cache            | define bounds/lifecycle                               |
| `parallelStream` with I/O         | use explicit executor/virtual threads/resource limits |
| annotation without test           | verify framework behavior                             |

A useful review posture:

```text
- What invalid state can this code express?
- What failure can happen here?
- What resource is acquired and who releases it?
- What public contract is being created?
- What happens under concurrency?
- What changes if this dependency/version/runtime changes?
- Can production diagnose failure here?
```

**Tempting but wrong mental model:** “Review is mainly formatting and naming.”

**Correct professional reading:** Formatting can be automated. Human review should focus on contracts, boundaries, invariants, effects, failure modes, and maintainability.

**Professional rule of thumb:** Review Java code as a system of contracts and boundaries, not as isolated syntax.

### Refactoring Java Code — safe change, migration, compatibility, tests

Refactoring Java is often tool-friendly because of static types and IDE support. But not every change is safe merely because the IDE performs it.

| Refactoring                          | Usually safe when          | Risk                                     |
| ------------------------------------ | -------------------------- | ---------------------------------------- |
| rename method/class                  | all references known       | reflection, serialization, external APIs |
| extract method                       | behavior unchanged         | hidden state/control flow                |
| extract interface                    | real boundary exists       | accidental abstraction                   |
| convert class to record              | value semantics correct    | equality/API changes                     |
| replace string status with enum      | boundary parsing handled   | protocol compatibility                   |
| change collection type               | contract preserved         | ordering/mutability changes              |
| make method private                  | no external use            | reflection/framework use                 |
| introduce `Optional`                 | absence semantics clear    | API break                                |
| add module descriptor                | dependencies understood    | reflection/access failures               |
| replace legacy date with `java.time` | conversion semantics clear | timezone behavior changes                |

Safe refactoring workflow:

```text
1. characterize current behavior with tests
2. identify public/API/protocol boundaries
3. change internal representation first
4. preserve external contract or version it
5. run unit and integration tests
6. check serialization/config/framework effects
7. inspect dependency/runtime behavior
```

Example: migrating raw string status to enum.

Before:

```java
public void updateStatus(String status) {
    if ("ACTIVE".equals(status)) {
        // ...
    }
}
```

After boundary parser:

```java
public enum UserStatus {
    ACTIVE,
    SUSPENDED
}

public void updateStatus(UserStatus status) {
    switch (status) {
        case ACTIVE -> activate();
        case SUSPENDED -> suspend();
    }
}

public void updateStatusFromExternal(String rawStatus) {
    UserStatus status = parseStatus(rawStatus)
            .orElseThrow(() -> new InvalidRequestException("invalid status"));

    updateStatus(status);
}
```

This preserves external input while strengthening internal representation.

Compatibility-sensitive refactoring:

| Change                       | Hidden risk                                |
| ---------------------------- | ------------------------------------------ |
| method rename                | external callers, reflection, JSON binding |
| field rename                 | serialization, ORM, reflection             |
| constructor change           | frameworks, tests, API clients             |
| package move                 | imports, reflection, module exports        |
| return type change           | binary/source compatibility                |
| enum constant rename         | stored data, JSON, switches                |
| record component rename      | accessor name and serialization            |
| exception change             | caller handling                            |
| collection mutability change | caller behavior                            |

**Tempting but wrong mental model:** “Static typing makes refactoring automatically safe.”

**Correct professional reading:** Static typing helps source refactoring, but reflection, frameworks, serialization, protocols, binary compatibility, and semantic contracts can still break.

**Professional rule of thumb:** Refactor internal code aggressively when protected by tests; refactor public/protocol/framework boundaries conservatively.

### Architecture — layers, hexagonal boundaries, domain model, services

Java architecture often uses layered or hexagonal structures. The exact pattern matters less than the control of dependencies and boundaries.

A simple layered model:

```text
API/controller
  ↓
application service
  ↓
domain model
  ↓
repository/gateway interfaces
  ↓
persistence/external adapters
```

A hexagonal model:

```text
external drivers → application core → driven adapters
HTTP/CLI/MQ       domain/use cases    DB/payment/email
```

| Architectural element | Role                                  | Common failure              |
| --------------------- | ------------------------------------- | --------------------------- |
| Controller/handler    | translate external request/response   | business logic here         |
| Application service   | orchestrate use case and transactions | god service                 |
| Domain model          | enforce core rules                    | anemic getters/setters only |
| Repository interface  | persistence boundary                  | leaking ORM details         |
| Gateway/client        | external system boundary              | raw HTTP types in domain    |
| DTO                   | external shape                        | used as domain model        |
| Mapper/adapter        | boundary translation                  | scattered conversions       |
| Policy/strategy       | replaceable rule                      | unnecessary interface       |
| Config/wiring         | object construction                   | hidden business behavior    |

Example:

```java
public final class RegisterUserService {
    private final UserRepository users;
    private final PasswordHasher passwordHasher;
    private final EventPublisher events;

    public RegisterUserService(
            UserRepository users,
            PasswordHasher passwordHasher,
            EventPublisher events
    ) {
        this.users = Objects.requireNonNull(users);
        this.passwordHasher = Objects.requireNonNull(passwordHasher);
        this.events = Objects.requireNonNull(events);
    }

    public UserId register(RegisterUserCommand command) {
        EmailAddress email = command.email();

        if (users.existsByEmail(email)) {
            throw new DuplicateUserException(email);
        }

        User user = User.register(
                email,
                passwordHasher.hash(command.rawPassword())
        );

        users.save(user);
        events.publish(new UserRegistered(user.id()));

        return user.id();
    }
}
```

This service coordinates boundaries. The `User` domain object should still own user-specific invariants and state transitions.

| Good architecture                                           | Bad architecture                           |
| ----------------------------------------------------------- | ------------------------------------------ |
| dependencies point inward or deliberately across boundaries | everything depends on everything           |
| domain types used internally                                | raw DTOs everywhere                        |
| external systems behind adapters                            | HTTP/SQL/framework types in domain         |
| explicit transaction/use-case boundaries                    | hidden writes inside helpers               |
| packages reflect responsibility                             | package names mirror arbitrary layers only |
| public API small                                            | implementation exposed                     |
| tests cover domain and boundaries                           | only end-to-end tests                      |

**Tempting but wrong mental model:** “Architecture is choosing a pattern name.”

**Correct professional reading:** Architecture is controlling dependency direction, boundary translation, invariants, effects, and change.

**Professional rule of thumb:** Keep the domain and application core independent of external protocols and framework details where practical.

### Framework Use — Spring, Jakarta, persistence, dependency injection, transaction boundaries

Frameworks can be productive, but they add runtime behavior not visible in plain Java syntax. Professional Java requires knowing when code is ordinary Java and when it is framework-mediated Java.

| Framework feature      | Benefit                         | Risk                                  |
| ---------------------- | ------------------------------- | ------------------------------------- |
| dependency injection   | explicit collaborator wiring    | hidden lifecycle                      |
| transaction annotation | concise transaction boundary    | proxy/self-invocation traps           |
| ORM                    | reduces persistence boilerplate | lazy loading, entity/domain confusion |
| validation annotations | declarative input constraints   | validator must run                    |
| web annotations        | routing and binding             | raw DTO into domain                   |
| security annotations   | access control                  | unclear enforcement point             |
| caching annotations    | easy caching                    | stale data and hidden execution       |
| configuration binding  | typed config                    | late failure if not validated         |

Constructor injection:

```java
public final class OrderService {
    private final OrderRepository orders;

    public OrderService(OrderRepository orders) {
        this.orders = Objects.requireNonNull(orders);
    }
}
```

This is good Java design independent of framework use.

Transaction boundary:

```java
@Transactional
public void pay(OrderId id, PaymentMethod method) {
    Order order = orders.require(id);
    paymentGateway.charge(order.total(), method);
    order.markPaid();
    orders.save(order);
}
```

This code must be read with framework semantics: transaction start/commit/rollback, proxy interception, exception policy, persistence context, and possible lazy loading.

Framework boundary checklist:

| Question                                                 | Why it matters                     |
| -------------------------------------------------------- | ---------------------------------- |
| Who constructs this object?                              | lifecycle and dependency injection |
| Is this object proxied?                                  | method interception                |
| Does self-invocation bypass behavior?                    | transaction/security/caching       |
| Are annotations runtime, compile-time, or documentation? | enforcement                        |
| Are entities lazy-loaded?                                | hidden database calls              |
| Are exceptions translated?                               | error contract                     |
| Is validation automatically invoked?                     | input safety                       |
| Does the framework require no-arg constructors?          | domain model compromise            |
| Does reflection require module `opens`?                  | JPMS compatibility                 |

**Tempting but wrong mental model:** “Framework annotations are just convenient syntax.”

**Correct professional reading:** Framework annotations can change object construction, method invocation, transaction behavior, validation, caching, persistence, and security.

**Professional rule of thumb:** Keep framework-specific behavior near boundaries and configuration. Do not let framework convenience erase domain design.

### Security Engineering Basics — input, output, dependencies, secrets, deserialization

Java security is not only cryptography. Most security problems come from boundaries: input validation, authorization, serialization, logging, dependencies, secrets, file paths, SQL, templates, and network trust.

| Security concern         | Java-specific practice                            |
| ------------------------ | ------------------------------------------------- |
| input validation         | parse and validate at boundary                    |
| authorization            | check actor/action/resource                       |
| SQL injection            | parameterized queries                             |
| path traversal           | normalize and constrain paths                     |
| deserialization          | avoid unsafe untrusted deserialization            |
| secrets                  | do not log or hard-code                           |
| dependency risk          | scan/update dependencies                          |
| TLS/certificates         | do not disable validation casually                |
| logging                  | redact sensitive data                             |
| reflection/native access | restrict and isolate                              |
| XML parsing              | disable unsafe external entities where applicable |
| command execution        | use `ProcessBuilder` args, avoid shell injection  |

Path boundary:

```java
public Path resolveUserFile(Path base, String userInput) {
    Path resolved = base.resolve(userInput).normalize();

    if (!resolved.startsWith(base.normalize())) {
        throw new SecurityException("path escapes base directory");
    }

    return resolved;
}
```

SQL boundary, conceptually:

```java
// Prefer prepared statements / parameter binding.
// Do not concatenate user input into SQL strings.
```

Secret logging problem:

```java
logger.info("login request password={}", password); // never
```

Better:

```java
logger.info("login request user={}", username);
```

Dependency security:

| Dependency risk               | Response                   |
| ----------------------------- | -------------------------- |
| known vulnerability           | upgrade or remove          |
| abandoned library             | replace or isolate         |
| large transitive tree         | audit and minimize         |
| untrusted repository          | avoid                      |
| dynamic version               | pin                        |
| bundled vulnerable transitive | exclude/override carefully |

**Tempting but wrong mental model:** “Security is handled by the framework.”

**Correct professional reading:** Frameworks help, but application code still controls data flow, authorization decisions, logging, dependencies, and boundary translation.

**Professional rule of thumb:** Treat all external input as untrusted, all secrets as toxic to logs, and all dependencies as part of the attack surface.

### Performance Engineering — measure, profile, reason, optimize

Java performance work should be evidence-driven. The JVM is adaptive, so source-level guesses are often wrong.

Performance workflow:

```text
1. define the performance question
2. reproduce realistic workload
3. measure baseline
4. identify bottleneck with profiler/JFR/metrics
5. change one thing
6. compare
7. keep readability unless measured gain matters
```

| Performance concern | Tool                                     |
| ------------------- | ---------------------------------------- |
| CPU hotspot         | profiler/JFR                             |
| allocation pressure | allocation profiler/JFR                  |
| GC pause            | GC logs/JFR                              |
| memory retention    | heap dump                                |
| lock contention     | JFR/thread dump                          |
| slow I/O            | tracing/metrics                          |
| slow database       | query metrics/profiling                  |
| startup             | startup profiling/class loading analysis |
| microbenchmark      | JMH                                      |
| dependency bloat    | dependency analysis                      |

Common Java performance errors:

| Error                                 | Better response                 |
| ------------------------------------- | ------------------------------- |
| optimizing cold code                  | find hot path first             |
| trusting naive benchmark              | use JMH                         |
| blaming GC first                      | inspect allocation and live set |
| using `LinkedList` for speed          | benchmark and consider locality |
| avoiding all objects                  | preserve modeling unless hot    |
| replacing clear code with clever code | prove performance need          |
| ignoring I/O latency                  | instrument boundaries           |
| unbounded concurrency                 | limit resources                 |
| excessive logging                     | sample/reduce/change level      |

Example of better benchmarking posture:

```text
Bad: “This loop took 12 ms once.”
Better: “JMH benchmark under representative data shows allocation rate and throughput difference after warmup.”
```

**Tempting but wrong mental model:** “Performance is mostly choosing faster syntax.”

**Correct professional reading:** Java performance is shaped by algorithms, data structures, allocation, JIT, GC, synchronization, I/O, dependencies, and workload.

**Professional rule of thumb:** Optimize by measurement. Keep code clear until evidence justifies complexity.

### Deployment and Operations — artifacts, runtime, configuration, observability

A Java application must run outside the IDE. Deployment requires artifact, runtime, configuration, logging, metrics, health checks, dependency versions, and failure handling.

| Deployment concern | Professional check                          |
| ------------------ | ------------------------------------------- |
| artifact           | JAR/container/image/runtime image verified  |
| JDK version        | supported and explicit                      |
| configuration      | typed and validated at startup              |
| secrets            | provided securely, not logged               |
| logging            | correct level and destination               |
| metrics            | key service indicators exposed              |
| health checks      | startup/readiness/liveness defined          |
| dependencies       | packaged and version-aligned                |
| memory             | heap/container settings understood          |
| threads            | executor/virtual-thread behavior understood |
| shutdown           | graceful cleanup                            |
| timeouts           | external calls bounded                      |
| migrations         | database/schema compatibility               |
| rollback           | artifact/config/version plan                |

Graceful shutdown concerns:

```text
- stop accepting new work
- cancel or complete in-flight work
- close external clients
- flush logs/metrics if needed
- shut down executors
- release database/file/native resources
```

Runtime configuration should fail early:

```java
public static void main(String[] args) {
    AppConfig config = AppConfigLoader.loadOrThrow();
    Application app = Application.create(config);
    app.start();
}
```

This is better than discovering malformed configuration after the first production request.

**Tempting but wrong mental model:** “Deployment is separate from Java programming.”

**Correct professional reading:** Java code must be written with runtime configuration, shutdown, observability, dependencies, and resource ownership in mind.

**Professional rule of thumb:** Treat production runtime behavior as part of the program’s design.

### Professional Java Checklist — before code is considered mature

| Area          | Checklist                                    |
| ------------- | -------------------------------------------- |
| Types         | domain concepts represented where it matters |
| Nullability   | absence policy explicit                      |
| Equality      | `equals`/`hashCode` deliberate               |
| Mutability    | ownership and copies clear                   |
| Collections   | correct contract chosen                      |
| Errors        | failure mechanism matches recovery boundary  |
| Resources     | close/shutdown policy clear                  |
| Concurrency   | shared state policy explicit                 |
| APIs          | public surface minimal and documented        |
| Dependencies  | justified and version-aligned                |
| Tests         | unit and boundary coverage present           |
| Observability | logs/metrics/traces useful and safe          |
| Performance   | no obvious asymptotic/resource issue         |
| Security      | external input and secrets handled           |
| Frameworks    | lifecycle/proxy behavior understood          |
| Build         | reproducible and CI-compatible               |
| Deployment    | artifact and runtime verified                |
| Compatibility | public/protocol changes reviewed             |

### Professional Failure Mode Index

| Failure mode              | Symptom                                  | Root cause                          | Correction                               |
| ------------------------- | ---------------------------------------- | ----------------------------------- | ---------------------------------------- |
| IDE-only success          | works locally, fails in build/deploy     | build/runtime mismatch              | command-line build and artifact test     |
| dependency drift          | runtime linkage errors                   | unmanaged transitive versions       | dependency tree and version alignment    |
| anemic domain             | services contain all rules               | behavior not placed with invariants | move rules into domain where appropriate |
| framework leakage         | domain depends on controllers/entities   | no boundary translation             | DTO/entity/domain separation             |
| overmocked tests          | brittle tests                            | testing implementation interactions | test behavior and real value objects     |
| missing integration tests | framework/database bugs reach production | only unit tests                     | add boundary integration tests           |
| exception swallowing      | silent failure                           | no recovery policy                  | handle at decision boundary              |
| hidden side effects       | methods unexpectedly call I/O            | poor naming/boundaries              | expose effects in API                    |
| resource leaks            | connection/file/thread exhaustion        | missing lifecycle owner             | try-with-resources/shutdown              |
| unbounded concurrency     | overloads downstream system              | no backpressure/resource limit      | bounded executor/semaphore/pool          |
| logging secrets           | security exposure                        | careless observability              | redaction policy                         |
| public API sprawl         | hard to change code                      | excessive visibility                | minimize surface                         |
| migration break           | clients fail after update                | semantic compatibility ignored      | version and document changes             |
| performance folklore      | complex code, no gain                    | unmeasured optimization             | profile and benchmark                    |
| config failure late       | production request fails                 | raw config parsed deep inside app   | typed startup validation                 |
## PART 10 — Sharp Edges, Anti-Patterns, Decision Frameworks, and Mastery Index

### Orientation — what separates fluent Java from professional Java

Java fluency means the code can be written. Professional Java mastery means the code can be trusted, evolved, diagnosed, and operated.

The difficult parts of Java are rarely isolated syntax rules. They are usually interactions:

| Interaction                 | Typical failure                                     |
| --------------------------- | --------------------------------------------------- |
| references + mutability     | aliasing bugs                                       |
| `equals` + collections      | broken map/set behavior                             |
| generics + erasure          | unchecked warnings and delayed `ClassCastException` |
| exceptions + resources      | leaks or masked failures                            |
| frameworks + annotations    | hidden runtime behavior                             |
| modules + reflection        | access failures                                     |
| concurrency + mutable state | data races                                          |
| streams + side effects      | unreadable or unsafe pipelines                      |
| public APIs + compatibility | changes become breaking                             |
| dependencies + runtime      | linkage errors                                      |
| time + time zones           | wrong date/time semantics                           |
| configuration + strings     | invalid runtime state                               |

A professional Java guide should therefore end not with more syntax, but with **decision frameworks** and **failure recognition**.

### Master Decision Matrix — common task to best Java construct

| Task                                   | Strong default                                     | Alternative                                 | Avoid                                |
| -------------------------------------- | -------------------------------------------------- | ------------------------------------------- | ------------------------------------ |
| Model a domain identifier              | `record UserId(String value)` with validation      | final class                                 | raw `String` everywhere              |
| Model simple finite state              | `enum`                                             | sealed type if data differs by variant      | raw string/integer constants         |
| Model variants with different payloads | sealed interface + records/classes                 | polymorphic interface if open               | flags and casts                      |
| Model lifecycle entity                 | class                                              | ORM/entity-specific class                   | record with mutable lifecycle state  |
| Return maybe-one value                 | `Optional<T>`                                      | exception if absence is failure             | nullable return                      |
| Return zero-or-more values             | empty collection                                   | stream if lazy ownership is clear           | `null` collection                    |
| Group ordered items                    | `List<T>`                                          | array for low-level/fixed/primitive cases   | `Set` if order matters               |
| Ensure uniqueness                      | `Set<T>`                                           | `Map<K,V>` if key lookup matters            | manual duplicate checks in `List`    |
| Lookup by key                          | `Map<K,V>`                                         | repository/cache abstraction                | repeated linear list search          |
| Process side-effect-heavy collection   | loop                                               | carefully named helper                      | stream with hidden side effects      |
| Transform data clearly                 | stream pipeline                                    | loop                                        | over-complex collector puzzle        |
| Represent replaceable behavior         | interface/strategy                                 | functional interface                        | boolean flag or inheritance          |
| Reuse implementation                   | composition                                        | abstract class if template is real          | inheritance for convenience          |
| Create object with invariants          | constructor/factory                                | builder for many options                    | public fields/setters                |
| Validate external data                 | parser/value object/DTO translator                 | framework validation plus domain validation | raw DTO in core logic                |
| Manage resource                        | `try-with-resources`                               | `finally` for locks/non-closeables          | relying on GC                        |
| Protect shared mutable state           | lock/synchronized or concurrent utility            | immutability/message passing                | plain unsynchronized fields          |
| Publish immutable data                 | final fields + defensive copies + safe publication | records with immutable components           | final mutable collections            |
| Configure app                          | typed config object                                | framework config binding                    | `System.getenv` scattered everywhere |
| Expose public API                      | narrow typed contract                              | interface/SPI                               | public implementation leakage        |
| Add dependency                         | maintained library with clear value                | small internal helper                       | dependency for trivial one-liner     |

### Type Modeling Anti-Patterns — symptoms and corrections

| Anti-pattern                | Symptom                                                     | Why it is harmful                  | Better form                          |
| --------------------------- | ----------------------------------------------------------- | ---------------------------------- | ------------------------------------ |
| Primitive obsession         | many `String`, `int`, `long` parameters with domain meaning | compiler cannot distinguish roles  | domain records/value objects         |
| Stringly typed state        | `"ACTIVE"`, `"SUSPENDED"` checks everywhere                 | invalid states compile             | enum or sealed type                  |
| Boolean parameter mode      | `send(user, true)`                                          | call-site meaning hidden           | enum, separate method, strategy      |
| Data bag class              | public fields or only getters/setters                       | invariants not protected           | encapsulated class or record         |
| Record entity               | record used for mutable lifecycle object                    | generated equality may be wrong    | class with identity policy           |
| Mutable hash key            | key fields can change after insertion                       | `HashMap`/`HashSet` lookup breaks  | immutable key/value object           |
| Universal `Object`          | `Object process(Object input)`                              | type safety lost                   | generics or domain result            |
| `Map<String,Object>` domain | core logic uses dynamic maps                                | scattered casts and weak contracts | DTO/parser/domain type               |
| Optional everywhere         | `Optional` fields/parameters everywhere                     | noisy and awkward design           | `Optional` mainly for return absence |
| Null-as-state               | `null` means many things                                    | ambiguity and NPE risk             | explicit state/result/optional       |

Example correction:

```java
// Weak
public void transfer(String from, String to, BigDecimal amount) {
}

// Stronger
public void transfer(AccountId from, AccountId to, Money amount) {
}
```

The stronger version does not merely look cleaner. It prevents accidental role confusion and centralizes validation.

### API Design Anti-Patterns — public contracts that become liabilities

| Anti-pattern                 | Example                                           | Problem                                    | Correction                                |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------ | ----------------------------------------- |
| Public by default            | every class/method is `public`                    | accidental API commitment                  | minimal visibility                        |
| Concrete collection exposure | `public ArrayList<User> users()`                  | implementation frozen                      | return `List<User>`                       |
| Mutable internal return      | returns field list directly                       | caller corrupts state                      | `List.copyOf` or immutable internal state |
| Broad exception              | `throws Exception`                                | caller learns nothing                      | specific exception/result                 |
| Nullable ambiguity           | `User find(id)` may return `null`                 | absence unclear                            | `Optional<User>` or `requireUser`         |
| Overload maze                | many overloads with boxing/varargs                | ambiguous calls                            | parameter object or clearer names         |
| Framework type leakage       | API returns ORM/HTTP type                         | implementation dependency becomes contract | DTO/domain/API type                       |
| No null policy               | accepts or rejects null inconsistently            | unstable behavior                          | validate/document                         |
| Hidden side effect           | `getUser()` calls remote API and writes audit log | caller misuses as cheap query              | `fetchUser`, `loadUser`, explicit service |
| Unstable serialization shape | directly serialize domain object                  | field changes break clients                | explicit DTO/versioned schema             |

A mature Java API should make the correct call easy and the incorrect call difficult.

```java
public Optional<User> findById(UserId id);

public User requireById(UserId id) {
    return findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
}
```

This separates expected absence from required presence.

### Collections and Equality Sharp Edges

Collections are not interchangeable containers. They rely on contracts.

| Sharp edge                                 | Example                               | Failure                         |
| ------------------------------------------ | ------------------------------------- | ------------------------------- |
| `HashSet` requires stable equality         | mutable object in set                 | object becomes unfindable       |
| arrays use identity equality               | `array1.equals(array2)`               | content comparison fails        |
| `List.of` is unmodifiable                  | `List.of("a").add("b")`               | `UnsupportedOperationException` |
| unmodifiable view is not snapshot          | `Collections.unmodifiableList(list)`  | backing list may still change   |
| `Map.get` null ambiguity                   | missing key vs mapped-to-null         | wrong absence logic             |
| `TreeSet` uses comparator consistency      | comparator inconsistent with equality | lost/merged elements            |
| concurrent map operation safety is local   | check-then-put sequence               | race                            |
| stream is one-shot                         | reuse stream                          | illegal state                   |
| `Collectors.toList` mutability assumptions | expecting specific list type          | unstable contract               |
| `LinkedList` performance myth              | used for speed                        | poor locality and overhead      |

Correction examples:

```java
// Array content equality
Arrays.equals(left, right);

// Stable API boundary
return List.copyOf(users);

// Null-safe map lookup when null values are not allowed
return Optional.ofNullable(usersById.get(id));
```

If null values are allowed in the map, use `containsKey` or redesign the map policy.

### Generics, Erasure, and Runtime Type Sharp Edges

| Sharp edge                   | Example                                  | Correction                                |
| ---------------------------- | ---------------------------------------- | ----------------------------------------- |
| raw type                     | `List values`                            | `List<?>` or `List<T>`                    |
| unchecked cast               | `(List<String>) value`                   | validate elements                         |
| no `new T()`                 | generic factory tries to instantiate `T` | pass `Supplier<T>`                        |
| no `T.class`                 | runtime type needed                      | pass `Class<T>` when enough               |
| no `instanceof List<String>` | erased generic type                      | `instanceof List<?>` + element validation |
| wildcard confusion           | `List<Object>` vs `List<?>`              | use variance intentionally                |
| generic array creation       | `new List<String>[10]`                   | use collection                            |
| heap pollution               | raw list adds wrong type                 | isolate legacy adapter                    |
| `@SafeVarargs` misuse        | unsafe generic varargs                   | use only when truly safe                  |
| erased runtime identity      | expecting `List<String>` runtime class   | design type-token strategy                |

Safe validation pattern:

```java
public static Optional<List<String>> asStringList(Object value) {
    if (!(value instanceof List<?> raw)) {
        return Optional.empty();
    }

    List<String> result = new ArrayList<>();
    for (Object item : raw) {
        if (!(item instanceof String s)) {
            return Optional.empty();
        }
        result.add(s);
    }

    return Optional.of(List.copyOf(result));
}
```

Unchecked operations should be small, local, and justified. A project with widespread unchecked warnings has a type-boundary problem.

### Exception and Failure Anti-Patterns

| Anti-pattern                              | Symptom                                         | Better design                                |
| ----------------------------------------- | ----------------------------------------------- | -------------------------------------------- |
| swallow exception                         | empty `catch`                                   | handle, translate, or propagate              |
| catch too broadly                         | `catch (Exception e)` everywhere                | catch specific failures at decision boundary |
| log and rethrow everywhere                | repeated noisy logs                             | log once at meaningful boundary              |
| lose cause                                | `throw new X("failed")`                         | `throw new X("failed", e)`                   |
| use exception for ordinary lookup absence | `findUser` throws for no user                   | `Optional<User>`                             |
| use `Optional` for real failure           | parse failure reason lost                       | result type or exception                     |
| throw broad `RuntimeException`            | no domain meaning                               | specific unchecked/domain exception          |
| checked exception pollution               | low-level checked exceptions through all layers | translate at boundary                        |
| `finally` throws                          | primary exception masked                        | use `try-with-resources`                     |
| ignore interruption                       | catch `InterruptedException` and continue       | restore interrupt and propagate/handle       |

Interruption correction:

```java
try {
    future.get();
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
    throw new RuntimeException("interrupted", e);
}
```

The rule is not “always catch.” The rule is: catch only where there is enough context to decide.

### Resource and Lifecycle Anti-Patterns

| Anti-pattern                       | Failure                           | Correction                                           |
| ---------------------------------- | --------------------------------- | ---------------------------------------------------- |
| relying on GC for resources        | file/socket/connection leak       | `try-with-resources`                                 |
| returning resource-backed stream   | caller forgets close              | consume locally or document ownership                |
| creating executor per request      | thread/resource leak              | app-level executor or scoped virtual-thread executor |
| not shutting down executor         | process never exits / thread leak | explicit lifecycle                                   |
| locking without finally            | lock not released                 | `try/finally`                                        |
| doing slow I/O under lock          | contention/deadlock               | reduce lock scope                                    |
| unbounded cache                    | memory leak                       | size/time eviction                                   |
| static registry                    | permanent retention               | lifecycle and removal                                |
| listener not unregistered          | object retention                  | unregister/weak strategy                             |
| static initializer does heavy work | startup/failure surprise          | explicit startup loading                             |

Correct file handling:

```java
try (BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
    return reader.readLine();
}
```

Correct lock handling:

```java
lock.lock();
try {
    updateState();
} finally {
    lock.unlock();
}
```

### Concurrency Anti-Patterns

| Anti-pattern                           | Why it fails                             | Better approach                      |
| -------------------------------------- | ---------------------------------------- | ------------------------------------ |
| plain shared flag                      | visibility not guaranteed                | `volatile`, atomic, lock             |
| `volatile count++`                     | not atomic                               | `AtomicInteger`, lock                |
| multiple atomics for invariant         | state can become inconsistent            | one lock or immutable state object   |
| unsafely published object              | other thread may see stale/partial state | safe publication                     |
| mutable static state                   | global race and test pollution           | dependency/lifecycle control         |
| concurrent collection as full solution | workflow still races                     | atomic collection methods or lock    |
| `parallelStream` for blocking I/O      | wrong pool/resource behavior             | executor/virtual threads with limits |
| unbounded virtual threads              | downstream overload                      | semaphore/pool/backpressure          |
| swallowed interruption                 | cancellation broken                      | restore interrupt                    |
| `Thread.sleep` for coordination        | flaky tests/code                         | latches/futures/conditions           |
| locking public object                  | external code can interfere              | private lock object                  |
| inconsistent lock order                | deadlock                                 | fixed lock ordering                  |

Shared flag correction:

```java
private volatile boolean stopped;

public void stop() {
    stopped = true;
}

public void run() {
    while (!stopped) {
        doWork();
    }
}
```

For compound state, prefer a lock:

```java
private final Object lock = new Object();
private int balance;

public void withdraw(int amount) {
    synchronized (lock) {
        if (balance < amount) {
            throw new IllegalStateException("insufficient funds");
        }
        balance -= amount;
    }
}
```

### Stream and Lambda Anti-Patterns

| Anti-pattern                  | Example                             | Better form                                  |
| ----------------------------- | ----------------------------------- | -------------------------------------------- |
| large lambda                  | multi-branch block in `map`         | named method or loop                         |
| side effects in `filter`      | logging/mutation inside predicate   | loop or explicit `peek` only for diagnostics |
| external mutable accumulation | `forEach(list::add)`                | `map(...).toList()`                          |
| parallel stream with mutation | shared list/map updates             | collector or concurrent design               |
| hiding checked exceptions     | wrap awkwardly inside lambda        | loop or boundary helper                      |
| method reference opacity      | `this::process` with unclear effect | lambda or named explicit method              |
| stream reuse                  | use same stream twice               | recreate stream                              |
| `Optional.get()` in pipeline  | unsafe presence assumption          | `map`, `orElse`, `orElseThrow`               |
| clever collectors             | unreadable grouping/reduction       | loop or split into named steps               |
| stream for index logic        | awkward hacks                       | classic `for` loop                           |

Bad:

```java
List<EmailAddress> emails = new ArrayList<>();

users.stream()
        .filter(user -> {
            audit(user);
            return user.isActive();
        })
        .forEach(user -> emails.add(user.email()));
```

Better:

```java
List<EmailAddress> emails = new ArrayList<>();

for (User user : users) {
    audit(user);
    if (user.isActive()) {
        emails.add(user.email());
    }
}

return List.copyOf(emails);
```

Streams are best when they describe transformation. Loops are best when they describe control flow.

### Framework and Annotation Anti-Patterns

| Anti-pattern                               | Failure                                     | Correction                                 |
| ------------------------------------------ | ------------------------------------------- | ------------------------------------------ |
| assuming annotation always runs            | validation/transaction/security missing     | understand framework lifecycle             |
| self-invocation of proxied method          | annotation not applied in many proxy models | call through proper boundary or refactor   |
| entity used as API DTO                     | persistence leaks to API                    | DTO/domain/entity separation               |
| lazy-loaded field in `toString`            | hidden database call                        | avoid lazy access in logging               |
| framework object manually constructed      | dependencies/proxies missing                | use container or plain class intentionally |
| field injection everywhere                 | hidden required dependencies                | constructor injection                      |
| business logic in controller               | boundary and domain mixed                   | application service/domain                 |
| domain polluted with framework annotations | hard to reuse/test                          | isolate where practical                    |
| broad reflective `opens`                   | weak encapsulation                          | narrow `opens ... to`                      |
| relying on generated magic without tests   | runtime surprise                            | integration tests                          |

Framework Java must be read in two passes:

```text
1. Plain Java meaning.
2. Framework-mediated meaning: proxy, lifecycle, transaction, validation, persistence, security.
```

A method with `@Transactional`, lazy ORM entities, validation annotations, and injected dependencies is not just an ordinary method body. It participates in a runtime system.

### Dependency and Build Anti-Patterns

| Anti-pattern                                     | Symptom                     | Correction                                       |
| ------------------------------------------------ | --------------------------- | ------------------------------------------------ |
| dynamic versions                                 | non-reproducible builds     | pin versions                                     |
| unmanaged transitive conflicts                   | `NoSuchMethodError`         | dependency tree and BOM/platform                 |
| dependency for trivial helper                    | bloated surface             | write small helper                               |
| test dependency in runtime                       | unnecessary artifact growth | correct scope                                    |
| runtime dependency only in compile scope mistake | missing class at runtime    | correct configuration                            |
| undocumented exclusions                          | future breakage             | document why excluded                            |
| plugin version drift                             | build changes unexpectedly  | pin plugin versions                              |
| IDE-only build confidence                        | packaged artifact fails     | CI/command-line build                            |
| generated code not understood                    | build/debug confusion       | separate generated source and document processor |
| ignoring security advisories                     | vulnerable runtime          | scan/update dependencies                         |

Professional dependency review asks:

```text
- What does this library solve?
- What transitive dependencies enter?
- Is it maintained?
- Is it compatible with the current JDK and framework?
- Is the license acceptable?
- Does it affect public API?
- Is there a standard-library alternative?
```

### Performance Anti-Patterns

| Anti-pattern                                  | Why it is wrong                       | Correction                     |
| --------------------------------------------- | ------------------------------------- | ------------------------------ |
| optimizing without profiling                  | may optimize non-bottleneck           | measure first                  |
| naive microbenchmark                          | JIT/GC distort result                 | use JMH                        |
| assuming streams are always slow              | workload-dependent                    | profile                        |
| assuming streams are always better            | readability/performance may suffer    | choose by clarity              |
| using `LinkedList` for performance by default | poor locality/overhead                | `ArrayList` unless proven      |
| object pooling ordinary objects               | retention/complexity                  | trust allocation unless proven |
| avoiding all abstraction                      | harms maintainability                 | optimize hot path only         |
| ignoring I/O                                  | biggest latency source often external | instrument boundaries          |
| unbounded logging                             | cost and noise                        | levels/sampling/structure      |
| unbounded concurrency                         | overload and collapse                 | backpressure and limits        |
| using `double` for money                      | precision error                       | `BigDecimal`/Money type        |
| whole-file read for large input               | memory spike                          | stream/bound input             |

Performance review should start with:

```text
- Is the algorithm appropriate?
- Is the data structure appropriate?
- Is the bottleneck CPU, allocation, lock, GC, I/O, or dependency?
- Is this path hot?
- Is the measurement realistic?
```

### Security Anti-Patterns

| Anti-pattern                       | Risk                            | Correction                             |
| ---------------------------------- | ------------------------------- | -------------------------------------- |
| raw SQL concatenation              | SQL injection                   | parameterized queries                  |
| path concatenation from user input | path traversal                  | normalize and constrain                |
| logging secrets                    | credential leakage              | redaction                              |
| unsafe deserialization             | code execution/data compromise  | avoid or restrict strongly             |
| disabled TLS validation            | MITM                            | proper trust configuration             |
| command string execution           | command injection               | `ProcessBuilder` argument list         |
| trusting client-side checks        | authorization bypass            | server-side validation/authorization   |
| storing raw passwords              | credential compromise           | password hashing with proper algorithm |
| broad reflection/native access     | encapsulation/security risk     | narrow access                          |
| dependency neglect                 | vulnerable transitive libraries | dependency scanning and updates        |
| exposing stack traces to users     | information leakage             | safe error responses                   |
| using Base64 as encryption         | no confidentiality              | actual cryptography APIs/policies      |

Security is a boundary discipline. The most important secure Java code is often ordinary-looking code that validates, authorizes, avoids leaks, and uses APIs correctly.

### Migration Decision Framework

Java codebases often need migration from old APIs or old styles. Migration should reduce risk, not merely modernize syntax.

| Migration                                  | High-value target      | Risk                            |
| ------------------------------------------ | ---------------------- | ------------------------------- |
| raw types → generics                       | type safety            | unchecked boundary work         |
| `Date`/`Calendar` → `java.time`            | correct time modeling  | timezone semantics              |
| nullable returns → `Optional`              | clearer absence        | API break                       |
| public fields → encapsulation              | invariant control      | serialization/framework effects |
| string state → enum/sealed type            | state safety           | external protocol mapping       |
| manual close → try-with-resources          | resource safety        | ownership changes               |
| direct threads → executors/virtual threads | lifecycle control      | behavior changes                |
| utility logic → domain/service             | responsibility clarity | over-refactoring                |
| domain object serialization → DTOs         | compatibility/security | mapping work                    |
| monolith package → modules                 | boundaries             | reflection/dependency failures  |

Migration steps:

```text
1. identify boundary and risk
2. add tests around current behavior
3. introduce new type/API internally
4. adapt old boundary to new internal model
5. migrate callers gradually
6. preserve or version public protocol
7. remove old path when safe
```

Example:

```java
// External boundary remains string-based
public void updateStatusFromRequest(String rawStatus) {
    UserStatus status = UserStatusParser.parse(rawStatus)
            .orElseThrow(() -> new InvalidRequestException("invalid status"));

    updateStatus(status);
}

// Internal core becomes typed
public void updateStatus(UserStatus status) {
    // typed logic
}
```

### Java Mastery Diagnostic — self-check by failure recognition

A learner has moved beyond syntax when these questions are natural:

| Question                                         | Mastery area                |
| ------------------------------------------------ | --------------------------- |
| Is this value nullable?                          | null and absence modeling   |
| Is this object mutable or shared?                | aliasing and mutability     |
| Does equality match domain identity?             | equality semantics          |
| Is this collection contract correct?             | data structure design       |
| What happens if this dependency version changes? | build/runtime compatibility |
| Where is this resource closed?                   | lifecycle management        |
| What happens under concurrent access?            | Java Memory Model           |
| Is this method pure, mutating, or I/O-bound?     | effect design               |
| Who handles this exception meaningfully?         | error boundary              |
| Does this annotation actually run?               | framework semantics         |
| Is this public API stable?                       | compatibility               |
| Is this external input validated and authorized? | security boundary           |
| Can production diagnose failure here?            | observability               |
| Is performance concern measured?                 | runtime engineering         |
| Is this abstraction solving real variation?      | architecture                |

### Final Master Reference Table — Java concept to professional interpretation

| Java concept | Beginner interpretation  | Professional interpretation                            |
| ------------ | ------------------------ | ------------------------------------------------------ |
| class        | blueprint for objects    | representation, invariants, behavior, lifecycle        |
| record       | shorter class            | transparent value carrier with component equality      |
| interface    | required for every class | behavior boundary for substitution                     |
| enum         | list of constants        | finite typed state space                               |
| sealed type  | restricted inheritance   | closed domain variant family                           |
| `String`     | text                     | immutable UTF-16 text object with encoding boundaries  |
| primitive    | simple value             | representation with overflow/precision rules           |
| `var`        | dynamic typing           | local static type inference                            |
| `Optional`   | non-null wrapper         | maybe-result return contract                           |
| exception    | error                    | abrupt control flow and recovery boundary              |
| `List`       | container                | ordered duplicate-allowing sequence                    |
| `Set`        | container                | uniqueness by equality                                 |
| `Map`        | dictionary               | key identity/equality contract                         |
| stream       | fancy loop               | lazy one-shot transformation pipeline                  |
| lambda       | function                 | target-typed functional-interface instance             |
| annotation   | magic                    | metadata consumed by compiler/tool/framework           |
| module       | package group            | dependency/export/reflection boundary                  |
| `final`      | immutable                | no reassignment/inheritance/override depending context |
| `volatile`   | thread-safe              | visibility/order, not compound atomicity               |
| synchronized | lock keyword             | mutual exclusion plus happens-before                   |
| GC           | memory solved            | unreachable heap reclamation, not resource cleanup     |
| JIT          | makes Java fast          | adaptive optimization preserving semantics             |
| dependency   | downloaded library       | compatibility/security/runtime surface                 |
| framework    | convenient library       | lifecycle/proxy/reflection/runtime model               |

### Closing Synthesis — the Java professional mental model

Java is best understood as a **typed, nominal, managed-runtime, compatibility-preserving, ecosystem-centered language**.

Its strengths are:

| Strength                 | Practical value                                  |
| ------------------------ | ------------------------------------------------ |
| static typing            | early error detection and refactoring            |
| nominal APIs             | stable contracts and tooling                     |
| managed runtime          | memory safety and optimization                   |
| rich standard library    | portable baseline capabilities                   |
| mature ecosystem         | build, test, enterprise, observability           |
| compatibility culture    | long-lived systems                               |
| modern modeling features | records, sealed types, pattern matching          |
| modern concurrency       | virtual threads and strong concurrency utilities |

Its recurring risks are:

| Risk                   | Professional countermeasure                                      |
| ---------------------- | ---------------------------------------------------------------- |
| verbosity              | use modern features where they clarify                           |
| accidental abstraction | abstract only around real variation                              |
| mutable aliasing       | copy, encapsulate, or make immutable                             |
| null ambiguity         | model absence explicitly                                         |
| framework opacity      | understand lifecycle and proxy behavior                          |
| generic erasure        | isolate unchecked boundaries                                     |
| public API sprawl      | minimize and document contracts                                  |
| dependency conflict    | manage versions and runtime artifacts                            |
| concurrency bugs       | explicit sharing policy                                          |
| resource leaks         | deterministic lifecycle                                          |
| performance folklore   | measure and profile                                              |
| compatibility traps    | distinguish source, binary, semantic, and protocol compatibility |

The final professional rule is simple but demanding:

**Write Java so that correctness, ownership, failure, effects, and boundaries are visible.**

That principle connects nearly every topic in this guide: types, records, enums, methods, exceptions, resources, modules, collections, concurrency, testing, frameworks, and production operations.

## Reference

[The Java® Language Specification, Java SE 25 Edition](https://docs.oracle.com/javase/specs/jls/se25/html/index.html): The highest-authority specification for the Java language itself. Use it to verify syntax, type-system rules, expression evaluation order, statement semantics, exceptions, generics, classes, interfaces, arrays, modules, and the `Java Memory Model`. Whenever the question is “Does Java really specify this behavior?”, this should be the first source to consult.

[The Java® Virtual Machine Specification, Java SE 25 Edition](https://docs.oracle.com/javase/specs/jvms/se25/html/index.html): The formal specification of the JVM. It explains class files, bytecode, runtime data areas, class loading, linking, initialization, verification, method invocation, and access control. It is essential for the runtime, bytecode, class-loading, and JVM execution-model sections of this guide.

[Java SE 25 & JDK 25 API Specification](https://docs.oracle.com/en/java/javase/25/docs/api/index.html): The main official reference for the Java standard library and JDK APIs. Use it for `java.lang`, `java.util`, `java.time`, `java.nio.file`, `java.net.http`, `java.util.concurrent`, `jdk.jfr`, `jdk.jlink`, `jdk.jpackage`, and other platform APIs. This is the most important reference for the standard-library parts of the guide.

[JDK 25 Documentation](https://docs.oracle.com/en/java/javase/25/): The official documentation portal for JDK 25. It includes API documentation, guides, tool specifications, release notes, and related platform resources. It is useful as the general entry point for deeper follow-up reading.

[Java Development Kit Version 25 Tool Specifications](https://docs.oracle.com/en/java/javase/25/docs/specs/man/index.html): The official command reference for JDK tools, including `java`, `javac`, `jar`, `javadoc`, `javap`, `jlink`, `jpackage`, and `jshell`. It supports the guide’s sections on compilation, execution, packaging, documentation generation, bytecode inspection, and runtime-image construction.

[The javac Command](https://docs.oracle.com/en/java/javase/25/docs/specs/man/javac.html): The official reference for `javac`. It is especially useful for `--release`, source paths, class paths, module paths, and annotation processing. It supports topics such as target Java versions, why IDE execution can differ from command-line builds, and how source compatibility differs from runtime compatibility.

[Java Language Changes Summary](https://docs.oracle.com/en/java/javase/25/language/java-language-changes-summary.html): Oracle’s official summary of Java language changes since Java SE 9. Use it to check when features such as `var`, records, sealed classes, pattern matching, switch expressions, text blocks, and other modern Java features were introduced and whether they are final, preview, or otherwise version-dependent.

[JEP 0: JEP Index](https://openjdk.org/jeps/0): The main OpenJDK index for Java Enhancement Proposals. JEPs are the best source for understanding the motivation, goals, non-goals, compatibility concerns, and design rationale behind newer Java features. This is especially useful for historical evolution, modern Java, preview features, and trend analysis.

[dev.java — Learn Java](https://dev.java/learn/): Oracle’s modern official learning portal for Java developers. It is more current than the older Java Tutorials and is useful for language basics, collections, streams, lambdas, virtual threads, and modern Java learning paths. It is a good follow-up resource for readers after this guide.

[The Java™ Tutorials](https://docs.oracle.com/javase/tutorial/): Oracle’s older but still valuable Java tutorial collection. It should not replace the JLS, JVMS, or API documentation, but it provides many examples for object-oriented programming, collections, I/O, concurrency, and other foundational topics.

[JDK 25 Release Notes](https://www.oracle.com/java/technologies/javase/25-relnote-issues.html): The official release notes for JDK 25. They record important changes, enhancements, removals, deprecations, and compatibility issues. Use this when checking migration concerns, version differences, or changes in platform behavior.

[Package `jdk.jfr`](https://docs.oracle.com/en/java/javase/25/docs/api/jdk.jfr/jdk/jfr/package-summary.html): The official API documentation for Java Flight Recorder. It supports topics such as runtime diagnostics, profiling, production observability, JVM events, and performance analysis. JFR is one of the most important official tools for understanding modern Java runtime behavior.

[OpenJDK JMH](https://openjdk.org/projects/code-tools/jmh/): JMH is the OpenJDK Java Microbenchmark Harness. It is the proper tool for serious JVM microbenchmarking. It supports the guide’s point that ordinary `System.nanoTime()` loops are not reliable for measuring Java performance because of JIT warmup, dead-code elimination, allocation effects, and runtime profiling.

[Secure Coding Guidelines for Java SE](https://www.oracle.com/java/technologies/javase/seccodeguide.html): Oracle’s secure coding guide for Java SE. It is useful for input validation, deserialization risks, privilege boundaries, sensitive data handling, exception safety, and secure API usage. It is a stronger long-term reference than ordinary security blog posts.

[Apache Maven — Introduction to the Dependency Mechanism](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html): Maven’s official explanation of dependency management. It covers dependency scopes, transitive dependencies, dependency management, version mediation, and classpath construction. It supports the guide’s sections on Maven, BOMs, dependency conflicts, and runtime errors such as `NoSuchMethodError`.

[Gradle — Managing Dependencies of JVM Projects](https://docs.gradle.org/current/userguide/dependency_management_for_java_projects.html): Gradle’s official documentation for JVM dependency management. It is useful for `implementation`, `api`, `testImplementation`, repositories, publishing, Java Library plugin behavior, and modern Gradle Java project structure.

[Gradle User Manual](https://docs.gradle.org/): The official Gradle manual. Use it for tasks, plugins, wrappers, Java projects, dependency management, configuration cache, toolchains, publishing, and build automation. It is the main Gradle-side reference for the engineering sections of this guide.

[JUnit 5 User Guide](https://docs.junit.org/5.10.2/user-guide/index.html): The official JUnit 5 guide. It covers test classes, test methods, assertions, lifecycle methods, parameterized tests, extensions, test engines, and build-tool integration. It is the main reference for the guide’s sections on unit testing, integration testing, exception testing, fixtures, and test design.

[SLF4J Manual](https://www.slf4j.org/manual.html): The official manual for SLF4J, a widely used Java logging facade. It is useful for understanding logging abstractions, decoupling application code from logging backends, parameterized logging, and deployment-time backend selection.

[Jackson Project Documentation](https://github.com/FasterXML/jackson/blob/master/README.md): The official Jackson project entry point. It explains the relationship among `jackson-core`, `jackson-annotations`, and `jackson-databind`. It is useful for JSON serialization/deserialization, DTO boundaries, `ObjectMapper`, and the separation between domain objects and external API representations.

[Spring Framework Documentation](https://docs.spring.io/spring-framework/reference/index.html): The official Spring Framework reference documentation. It covers the IoC container, validation, data binding, AOP, transactions, data access, Spring MVC, WebFlux, and testing. It is relevant only when discussing enterprise Java, dependency injection, transactions, framework proxies, and annotation-driven behavior; it should not be treated as a Java language reference.

[Micrometer Documentation](https://docs.micrometer.io/micrometer/reference/index.html): The official Micrometer documentation. It is useful for metrics, application observability, JVM/application instrumentation, and the Spring Boot monitoring ecosystem. It is not core Java, but it is valuable for production Java engineering.

[OpenTelemetry Java Documentation](https://opentelemetry.io/docs/languages/java/): The official OpenTelemetry Java documentation. It covers traces, metrics, logs, APIs, SDKs, instrumentation, and Java agents. It is useful for distributed tracing, observability, context propagation, and production diagnostics in modern Java systems.
