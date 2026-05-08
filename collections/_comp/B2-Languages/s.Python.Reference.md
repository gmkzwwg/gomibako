---
title: Python - Quick Reference
abbreviation: Python
categories: Sheet
subclass: Languages
---

## PART 1 — Language Identity, Design Philosophy, and Problem Space

### Scope, Version, and Runtime Assumptions — Python 3.14, CPython, professional baseline, compatibility

This guide treats **Python** as a coherent design system, not as a list of convenient syntax. It follows the uploaded specification’s requirement to combine language-design analysis, syntax/reference coverage, task-pattern reference, runtime explanation, ecosystem guidance, historical interpretation, and practical mastery guidance. 

**Target baseline:** Python **3.14**, CPython-first. Python.org currently lists Python 3.14.4 as a current stable release, while the Python Developer’s Guide lists Python 3.14 and 3.13 as `bugfix` branches and Python 3.12 as a `security` branch. Therefore, the professional target for this tutorial is Python 3.14, with compatibility notes for still-common Python 3.13 and Python 3.12 deployments. ([Python.org][1])

**Implementation assumption:** the default runtime is **CPython**, not because Python as a language equals CPython, but because CPython dominates professional deployment, packaging, C-extension compatibility, performance expectations, and most real-world debugging assumptions. Alternative implementations such as PyPy, MicroPython, and GraalPy matter in specific domains, but they are not the default mental model for this guide.

**Concurrency assumption:** classic CPython still requires a `GIL`-aware mental model. Since Python 3.13, CPython has supported an optional free-threaded build that can disable the `GIL`, but the official documentation still describes this as a special build mode rather than the default execution model. Python 3.14 improves free-threaded execution, but professional Python code still needs to distinguish default CPython behavior from free-threaded behavior. ([Python documentation][2])

**Density strategy:** adaptive — Python has a small-looking syntax but a deep object model, dynamic runtime, protocol system, packaging ecosystem, gradually typed tooling layer, and CPython-specific performance boundary.

### What Python Is — high-level language, dynamic object model, readability, ecosystem-centered practice

Python is a **high-level, dynamically typed, strongly typed, object-centered, multi-paradigm programming language** whose practical identity is shaped by readability, rapid development, interactive use, library breadth, and runtime flexibility.

This sentence needs unpacking because each adjective is frequently misunderstood.

| Description        | What it means in Python                                                                                                                          | What it does not mean                                           | Practical consequence                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| High-level         | Python abstracts away manual memory management, machine registers, explicit allocation/free patterns, and most low-level representation details. | It does not mean Python has no cost model.                      | Code is concise, but performance-sensitive code requires understanding object overhead, allocation, dispatch, and C-extension boundaries. |
| Dynamically typed  | Type checks primarily occur at runtime; names do not have fixed declared types at the language level.                                            | It does not mean Python is “untyped.”                           | Objects have runtime types; mistakes may surface only when a code path executes.                                                          |
| Strongly typed     | Python usually does not silently reinterpret unrelated types.                                                                                    | It does not mean all type mistakes are caught before execution. | `1 + "2"` fails rather than silently coercing; explicit conversion is preferred.                                                          |
| Object-centered    | Values, functions, classes, modules, exceptions, and methods are objects.                                                                        | It does not mean all good Python design should be class-heavy.  | Introspection, first-class functions, decorators, protocols, and dynamic attributes are natural.                                          |
| Multi-paradigm     | Python supports procedural, object-oriented, functional-adjacent, declarative, and metaprogramming styles.                                       | It does not mean every paradigm is equally idiomatic.           | Good Python often uses simple functions, data structures, context managers, and protocols before heavy abstraction.                       |
| Ecosystem-centered | Python’s value comes heavily from libraries, packaging, tooling, and C/Fortran/Rust/C++ integration.                                             | It does not mean the language core is unimportant.              | Professional competence requires both language semantics and ecosystem judgment.                                                          |

Python’s central design promise is not maximum performance, maximum static safety, or maximum formal purity. Its promise is **expressive, readable, interoperable programming with a low ceremony cost**. The cost is that many correctness, architecture, type, performance, and boundary decisions remain matters of programmer discipline or external tooling.

### Why Python Exists — scripting, glue code, readability, extensibility, human-scale abstraction

Python emerged to solve a practical problem: programmers needed a language that was more expressive and maintainable than shell scripting, less ceremonious than C/C++/Java, easier to read than many scripting alternatives, and capable of connecting existing systems.

Its historical niche can be summarized as **executable pseudocode plus real-world integration**. Python made it easy to write scripts, automate workflows, prototype ideas, manipulate files and text, connect systems, and later build web services, scientific software, data workflows, test infrastructure, automation tools, machine learning pipelines, and production applications.

The design pressure behind Python was not merely “make programming easier.” It was more specific:

| Historical pressure                                                   | Python’s design response                                                                   | Lasting consequence                                                                                |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Shell scripts became too fragile for larger logic.                    | Provide readable structured programming, functions, modules, exceptions, and libraries.    | Python became a natural automation and infrastructure language.                                    |
| C/C++ were powerful but slow to write and risky for high-level tasks. | Offer high-level objects, managed memory, dynamic typing, and extension mechanisms.        | Python became strong as a “glue language” around native libraries.                                 |
| Early scripting languages could be terse or irregular.                | Emphasize readability, indentation, simple syntax, and a relatively uniform object model.  | Python code is often optimized for source readability over minimal character count.                |
| Software needed libraries more than isolated language features.       | Provide a broad standard library and later a large package ecosystem.                      | Python competence became inseparable from library and environment competence.                      |
| Interactive exploration mattered.                                     | Support REPL-driven development, notebooks, dynamic inspection, and runtime introspection. | Python became dominant in education, scientific computing, data work, and exploratory programming. |

Python’s success comes from a tradeoff: it **reduces local friction** at the cost of requiring stronger discipline at scale.

### Python’s Language Personality — dynamic, strong, object-centered, protocol-oriented, gradually typed

Python’s personality is not reducible to “easy syntax.” It is a cluster of design choices that reinforce each other.

| Design dimension     | Python’s choice                                                      | Capability gained                                            | Cost introduced                                          | Practical rule                                                                 |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Typing time          | Dynamic by default                                                   | Fast iteration, flexible APIs, interactive exploration       | Later error discovery, weaker whole-program guarantees   | Use tests, type checkers, validation, and simple designs for larger codebases. |
| Type strength        | Mostly strong                                                        | Fewer accidental coercions than weakly typed languages       | Explicit conversions can feel verbose                    | Convert deliberately at boundaries.                                            |
| Object model         | Nearly everything is an object                                       | Uniform introspection, first-class functions/classes/modules | Runtime overhead and dynamic lookup costs                | Think in terms of objects, names, attributes, and protocols.                   |
| Abstraction style    | Protocol-friendly duck typing                                        | Flexible APIs that work with many object types               | Accidental compatibility and late failure                | Ask “what operation is required?” before asking “what class is this?”          |
| Type annotations     | Optional gradual typing                                              | Better tooling, documentation, refactoring support           | False confidence if mistaken for runtime enforcement     | Treat annotations as static/tooling contracts unless validation is explicit.   |
| Memory management    | Managed, CPython uses reference counting plus cyclic GC              | No manual `free`, fewer lifetime errors                      | Object overhead, finalization caveats, GC behavior       | Manage external resources with `with`, not object destruction assumptions.     |
| Error model          | Exceptions                                                           | Clear non-local failure propagation                          | Overbroad catching, hidden control flow                  | Catch specific exceptions at meaningful recovery boundaries.                   |
| Concurrency model    | Threads, processes, `asyncio`, external native parallelism           | Multiple models for I/O, CPU work, orchestration             | Model confusion, `GIL` constraints, async misuse         | Choose concurrency by workload: I/O-bound, CPU-bound, or coordination-bound.   |
| Metaprogramming      | Reflection, decorators, descriptors, dynamic attributes, metaclasses | Powerful framework construction                              | Reduced static analyzability and maintainability         | Use dynamic features behind clear APIs, not as ordinary control flow.          |
| Ecosystem philosophy | Standard library plus package ecosystem                              | Broad practical coverage                                     | Dependency, packaging, compatibility, and security risks | Treat environment management as part of programming.                           |

The important point is that Python’s strengths and weaknesses are paired. The same dynamic object model that makes Python expressive also makes large systems harder to analyze. The same ecosystem that makes Python powerful also creates dependency management and trust-boundary problems. The same optional typing that improves maintainability can mislead teams if they assume annotations enforce runtime safety.

### The Central Mental Model — names bind to objects, objects expose behavior, protocols organize use

The first deep mental model for Python is:

**Names do not contain values. Names bind to objects. Objects have identity, type, state, and behavior. Code works by sending operations to objects, often through protocols.**

This model explains much of Python.

```python
a = [1, 2, 3]
b = a
b.append(4)

print(a)  # [1, 2, 3, 4]
```

The tempting but wrong mental model is: `b = a` copies the list. The correct model is: both names now bind to the same list object. Mutation through one name is visible through the other.

This is not a small beginner detail. It affects API design, default arguments, object state, caching, data modeling, testing, concurrency, and debugging.

| Concept     | Python meaning                            | Common wrong model          | Correct professional model                                             |
| ----------- | ----------------------------------------- | --------------------------- | ---------------------------------------------------------------------- |
| Variable    | A name bound to an object                 | A box containing a value    | A reference-like binding to an object                                  |
| Assignment  | Rebinding a name                          | Copying data                | Binding a name to an object                                            |
| Mutation    | Changing an object                        | Changing a variable         | State change visible through all aliases                               |
| Type        | Runtime property of object                | Static property of variable | Objects have types; names do not have fixed language-level types       |
| Method call | Attribute lookup plus callable invocation | Special class syntax only   | Protocol-mediated behavior through object attributes                   |
| Duck typing | Use by behavior                           | No typing at all            | Runtime structural compatibility through supported operations          |
| Type hint   | Static/tooling annotation                 | Runtime guarantee           | Optional contract checked by external tools unless enforced separately |

Python rewards programmers who internalize this object-and-binding model. It punishes programmers who import a simplistic variable-as-box model from other languages.

### Dynamic Object Model Lens — attributes, methods, classes, modules, functions, dunder protocols

Python’s dynamic object model is the deepest explanatory lens for the language.

Objects in Python are not just passive data containers. They participate in runtime behavior through attributes, methods, special methods, descriptors, class relationships, and protocols. Functions are objects. Classes are objects. Modules are objects. Exceptions are objects. Methods are objects produced by descriptor behavior. Many constructs that look syntactic are actually protocol hooks into object behavior.

| Mechanism            | Object-model interpretation       | Practical consequence                                                                     |
| -------------------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| `x.y`                | Attribute lookup on object `x`    | Attribute access can invoke descriptors, properties, dynamic lookup, or fallback methods. |
| `obj()`              | Call protocol via `__call__`      | Functions, classes, and custom callable objects share a common invocation shape.          |
| `for x in obj`       | Iteration protocol                | Any object implementing iteration behavior can be used in loops.                          |
| `with resource as r` | Context manager protocol          | Resource safety is expressed by object protocol, not special resource types.              |
| `len(obj)`           | Size protocol                     | Built-in functions often delegate to dunder methods.                                      |
| `a + b`              | Numeric or sequence protocol      | Operators are syntax over method dispatch.                                                |
| `class C:`           | Class object creation             | Classes are runtime objects, not only static declarations.                                |
| `import m`           | Module object loading and binding | Modules are singleton-like runtime objects cached by the import system.                   |
| `@decorator`         | Function/class transformation     | Decorators are ordinary callables applied at definition time.                             |

**Problem solved:** Python’s object model gives a compact way to make user-defined objects participate in language syntax.

**Capability gained:** custom objects can behave like containers, iterators, context managers, functions, numbers, descriptors, and more.

**Cost introduced:** behavior may be hidden behind dynamic lookup and special methods, making static analysis and debugging harder.

**Misuse encouraged:** overuse of magic methods, monkey patching, dynamic attributes, and reflection can produce clever but opaque code.

**Programs that benefit:** frameworks, ORMs, testing tools, decorators, data models, DSL-like APIs, plugin systems, scientific libraries.

**Programs that suffer:** safety-critical systems, highly constrained embedded systems, large codebases without tests/type checking, performance-critical inner loops written naively in pure Python.

### Protocol-Oriented Design Lens — behavior over ancestry, interfaces without ceremony, structural compatibility

Python often prefers **protocol-oriented design** over rigid inheritance-first design. A protocol is an expected set of operations. For example, an iterable is something that can produce an iterator; a context manager is something that can enter and exit a managed block; a mapping is something that behaves like key-value access.

This explains why Python APIs frequently care less about the exact class and more about what the object can do.

```python
def total_length(items):
    return sum(len(item) for item in items)
```

This function does not require `items` to be a `list`. It requires `items` to be iterable, and each element must support `len()`. That is a behavioral contract.

| Design choice       | Inheritance-first style                     | Pythonic protocol style                              |
| ------------------- | ------------------------------------------- | ---------------------------------------------------- |
| Core question       | “Is this object an instance of this class?” | “Does this object support the needed operation?”     |
| Coupling            | Higher                                      | Lower                                                |
| Static clarity      | Often stronger                              | Depends on annotations and tooling                   |
| Runtime flexibility | Lower                                       | Higher                                               |
| Typical Python tool | ABCs, base classes                          | Dunder methods, `collections.abc`, `typing.Protocol` |
| Failure mode        | Overbuilt class hierarchy                   | Late runtime failure or accidental compatibility     |

Protocol-oriented design is not the same as “anything goes.” Good Python APIs should still make their behavioral expectations clear through naming, documentation, type hints, tests, and validation at external boundaries.

**Professional rule:** use protocols when the abstraction is behavioral; use concrete classes when construction, invariants, state ownership, or lifecycle matter.

### Gradual Typing Lens — annotations, static tooling, runtime limits, validation boundary

Modern Python is not simply “dynamically typed.” It is better described as **dynamically typed at runtime with an optional gradually typed tooling layer**.

Type annotations help humans and tools reason about code:

```python
def normalize_name(name: str) -> str:
    return name.strip().casefold()
```

But Python does not enforce this annotation at runtime by default:

```python
normalize_name(123)  # Runtime failure only when .strip() is attempted
```

The annotation communicates a contract to readers and tools such as mypy or pyright. It is not a runtime guard unless some validation layer explicitly checks it.

| Typing concept          | Python role                       | Practical benefit                        | Common failure mode                               |
| ----------------------- | --------------------------------- | ---------------------------------------- | ------------------------------------------------- |
| `str`, `int`, `list[T]` | Annotation vocabulary             | Improves readability and static checking | Assuming runtime enforcement                      |
| `Any`                   | Escape hatch from static checking | Useful at dynamic boundaries             | Silently disables useful guarantees               |
| `Protocol`              | Structural behavioral contract    | Expresses duck typing statically         | Overcomplicated protocols for simple code         |
| `TypeVar`, `Generic`    | Reusable type relationships       | Better helper and container APIs         | Type-level complexity without payoff              |
| `TypedDict`             | Typed dictionary shape            | Useful for JSON-like records             | Mistaking it for runtime validation               |
| `Literal`               | Finite accepted values            | Better API precision                     | Using it where `Enum` or validation is clearer    |
| `Self`                  | Method returns current class type | Cleaner fluent APIs                      | Overuse in non-fluent design                      |
| Runtime validator       | Explicit data checking            | Protects external boundaries             | Confusing validation libraries with type checkers |

**Problem solved:** gradual typing lets Python scale into larger systems without abandoning dynamic runtime semantics.

**Capability gained:** better editor support, refactoring, API documentation, earlier error detection, and clearer contracts.

**Cost introduced:** two worlds now coexist: runtime behavior and static-tool interpretation. They overlap but are not identical.

**Misuse encouraged:** treating type hints as security, validation, or runtime safety.

**Professional rule:** type hints are excellent for internal program structure; external data still needs parsing and validation.

### CPython Runtime Boundary Lens — semantics, implementation details, performance reality

A professional Python programmer must separate three things:

| Layer                           | Example                                                                                 | Why it matters                                                |
| ------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Python language semantics       | Assignment binds names; exceptions propagate; attribute lookup has defined behavior.    | Portable across compliant implementations.                    |
| CPython implementation behavior | Reference counting, bytecode interpreter, object headers, many C-extension assumptions. | Dominates real performance, memory, and debugging practice.   |
| Ecosystem/tool behavior         | mypy rules, pyright rules, packaging tools, `pytest`, framework conventions.            | Shapes professional workflows but is not the language itself. |

CPython matters because most Python packages, performance advice, stack traces, profiling behavior, extension modules, and deployment assumptions are CPython-centered. But CPython details must not be mislabeled as universal Python semantics.

For example, CPython reference counting often destroys objects promptly when references disappear. But relying on immediate destruction for resource cleanup is bad Python design. The language-level resource-management idiom is `with`, not “hope the destructor runs now.”

```python
with open("data.txt", "r", encoding="utf-8") as file:
    text = file.read()
```

**Problem solved:** CPython gives Python a practical, stable, widely supported runtime and extension ecosystem.

**Capability gained:** massive compatibility, native extension support, predictable mainstream behavior, extensive tooling.

**Cost introduced:** object overhead, interpreter overhead, `GIL` constraints in default builds, C-extension compatibility constraints.

**Misuse encouraged:** making universal claims about Python based on CPython-only behavior.

**Professional rule:** optimize and debug with CPython reality in mind, but explain semantics at the language level whenever portability matters.

### What Python Makes Easy — expression, integration, iteration, automation, data work, APIs

Python makes certain tasks unusually cheap in cognitive and syntactic overhead.

| Python makes easy                        | Why                                                    | Cost or caveat                                                                |
| ---------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Reading and writing straightforward code | Indentation, clear syntax, rich built-ins              | Readability still depends on naming and architecture.                         |
| Automating workflows                     | Files, paths, subprocesses, JSON, CSV, HTTP ecosystem  | Scripts can become unstructured systems if not modularized.                   |
| Working with collections                 | Lists, dicts, sets, comprehensions, iteration protocol | Mutability and aliasing need discipline.                                      |
| Writing small functions                  | Low ceremony, first-class functions                    | Too many tiny dynamic helpers can obscure data flow.                          |
| Building APIs quickly                    | Dynamic typing, flexible parameters, decorators        | Public contracts require documentation, types, tests, and validation.         |
| Using libraries                          | Huge standard library and package ecosystem            | Dependency quality, security, compatibility, and packaging complexity matter. |
| Interactive exploration                  | REPL, notebooks, introspection                         | Exploratory code often needs refactoring before production.                   |
| Interoperating with native code          | C extensions, scientific stack, FFI routes             | Debugging crosses runtime/language boundaries.                                |
| Expressing protocols                     | Iterators, context managers, callables, mappings       | Protocol misuse can create surprising behavior.                               |

Python’s ease is real, but it is front-loaded. It reduces the cost of getting working code. It does not eliminate the cost of maintaining correct code.

### What Python Makes Hard — static guarantees, local reasoning, performance predictability, large-scale boundaries

Python makes some things harder precisely because it makes other things flexible.

| Python makes hard                        | Root cause                                                    | Professional mitigation                                                    |
| ---------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Whole-program static guarantees          | Dynamic typing and runtime object mutation                    | Type checking, tests, contracts, smaller modules                           |
| Predictable performance                  | Interpreter overhead, object allocation, dynamic dispatch     | Profiling, vectorized/native libraries, algorithmic care                   |
| Large-scale refactoring                  | Dynamic imports, reflection, monkey patching, weak boundaries | Type hints, linters, architecture rules, code search, tests                |
| Strict encapsulation                     | Privacy is mostly conventional                                | Public/private naming discipline, documentation, review                    |
| Safe external data handling              | Type hints do not validate runtime input                      | Explicit parsers, validators, schemas                                      |
| CPU-bound parallelism in default CPython | `GIL` constraints                                             | Multiprocessing, native extensions, free-threaded builds where appropriate |
| Dependency control                       | Large package ecosystem                                       | Lockfiles, audits, reproducible environments, conservative dependencies    |
| Avoiding accidental shared state         | Mutable objects and name binding                              | Immutability where useful, copying discipline, clear ownership conventions |

The expert Python mindset is not “Python is easy.” It is: **Python is easy to start, flexible to extend, and demanding to scale responsibly.**

### What Python Discourages or Prevents — ceremony, manual memory management, rigid privacy, excessive static structure

Python deliberately avoids or weakens some mechanisms common in other languages.

| Mechanism                         | Python’s stance                                          | Design reason                                             | Consequence                                                    |
| --------------------------------- | -------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Mandatory type declarations       | Optional annotations only                                | Preserve dynamic flexibility and low ceremony             | Static guarantees require external tools.                      |
| Manual memory management          | Managed memory                                           | Reduce lifetime errors and development overhead           | Less control over layout, allocation, and deallocation timing. |
| Enforced private fields           | Naming conventions, name mangling only for limited cases | Favor practicality and introspection                      | Encapsulation depends on discipline.                           |
| Checked exceptions                | No checked exception system                              | Avoid heavy function signatures and exception bureaucracy | Failure contracts often need documentation/tests.              |
| Deep compile-time metaprogramming | Runtime metaprogramming instead                          | Keep language flexible and runtime-oriented               | Dynamic magic can become opaque.                               |
| Rigid interface declarations      | Protocols and duck typing                                | Support flexible interoperability                         | Contracts may be implicit unless documented or typed.          |
| Heavy syntactic ceremony          | Compact blocks, simple definitions                       | Improve readability and speed of expression               | Some implicit behavior requires semantic understanding.        |

This does not mean Python is anti-engineering. It means Python often shifts engineering discipline from the compiler into tests, types, tooling, conventions, and code review.

### What Python Leaves to Programmer Discipline — architecture, boundaries, validation, performance, dependency risk

Python’s design leaves many important questions open.

| Responsibility left to programmer discipline | Why Python leaves it open                                           | Failure mode when ignored                                   |
| -------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- |
| Module boundaries                            | Runtime imports and flexible modules are simple and powerful.       | Circular imports, import side effects, unstable public APIs |
| Runtime validation                           | Type hints are not enforcement.                                     | Invalid external data enters core logic                     |
| Mutability control                           | Mutable containers are convenient and idiomatic.                    | Shared-state bugs and unexpected aliasing                   |
| Abstraction level                            | Functions, classes, protocols, decorators, descriptors all coexist. | Over-engineered frameworks or under-structured scripts      |
| Error boundaries                             | Exceptions are flexible and unchecked.                              | Broad `except`, swallowed failures, unclear recovery        |
| Concurrency model                            | Multiple models exist for different workloads.                      | Async misuse, thread/process confusion                      |
| Performance strategy                         | Python encourages clear code first.                                 | Slow pure-Python hot loops, premature micro-optimization    |
| Dependency trust                             | Ecosystem is open and large.                                        | Supply-chain exposure and compatibility breakage            |
| Dynamic features                             | Reflection and monkey patching are possible.                        | Code becomes hard to reason about statically                |

Python’s philosophy is permissive, not careless. It assumes programmers can use freedom responsibly, especially when supported by tools and conventions.

### Strengths and Costs — flexibility, readability, ecosystem, productivity, runtime tradeoffs

Python’s advantages are also its liabilities under different constraints.

| Strength                       | Why it is valuable                                      | Cost introduced                             | Best use                                      | Poor fit                                            |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------- | --------------------------------------------- | --------------------------------------------------- |
| Readability                    | Code often resembles structured pseudocode.             | Readability can hide dynamic complexity.    | Team code, automation, teaching, APIs         | Obfuscated metaprogramming-heavy systems            |
| Dynamic flexibility            | Objects can be inspected, adapted, composed at runtime. | Weaker static analyzability.                | Frameworks, plugins, scripting, tests         | Hard real-time or strict safety systems             |
| Rich ecosystem                 | Libraries exist for many domains.                       | Dependency and compatibility management.    | Web, data, ML, automation, DevOps             | Minimal, dependency-free constrained systems        |
| Fast development               | Low ceremony and interactive workflow.                  | Large systems need deliberate architecture. | Prototyping, internal tools, exploratory work | Systems requiring compile-time proofs of invariants |
| Native extension compatibility | Heavy computation can move to C/C++/Rust/Fortran.       | Boundary complexity and packaging issues.   | Scientific computing, ML, performance kernels | Pure-Python CPU-bound computation                   |
| Protocol orientation           | APIs can accept many compatible objects.                | Behavior contracts can be implicit.         | Library design, reusable utilities            | Highly regulated APIs needing rigid schemas         |
| Gradual typing                 | Static tooling can be adopted incrementally.            | Partial types can create false confidence.  | Large Python services and libraries           | Codebases that treat `Any` as default               |

A serious Python tutorial must teach both sides. Python is not powerful despite its tradeoffs; it is powerful because it chose a specific set of tradeoffs.

### Adjacent Language Transfer Map — Java, C/C++, JavaScript, TypeScript, Ruby, Go, Rust

Python is easy to approach from other languages, but false transfer creates subtle bugs.

| Source-language habit or concept | How it appears in Python                                           | What transfers                                         | What changes                                                                      | Common failure mode                                  | Better mental model                                                     |
| -------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------- |
| Java class-based OOP             | Python has classes and inheritance.                                | Encapsulation, methods, polymorphism                   | Privacy is conventional; protocols often replace interfaces.                      | Overusing inheritance and getters/setters            | Prefer simple objects, dataclasses, composition, and protocols.         |
| C/C++ variables and memory       | Python has names and objects.                                      | Identity and mutation still matter                     | No manual stack/heap control in ordinary Python                                   | Thinking assignment copies data                      | Names bind to objects; mutation affects shared objects.                 |
| JavaScript dynamic objects       | Python objects also have dynamic attributes.                       | Dynamic runtime thinking transfers                     | Python has stronger type behavior and different prototype/class model             | Expecting JS-style coercion or prototypes            | Python uses class-based objects plus dynamic lookup and descriptors.    |
| TypeScript types                 | Python has type hints.                                             | Gradual typing and structural thinking partly transfer | Python annotations are not runtime checks and have different inference/tool rules | Assuming annotations validate JSON or API input      | Type hints guide tools; validation is separate.                         |
| Ruby duck typing                 | Python also uses duck typing.                                      | Behavioral APIs transfer well                          | Python has different data model, descriptors, and type-hint ecosystem             | Overusing runtime magic                              | Use protocols clearly and keep dynamic behavior inspectable.            |
| Go interfaces                    | `typing.Protocol` resembles structural contracts.                  | Behavior-based abstraction transfers                   | Python protocols may be runtime or static-tool concepts depending on use          | Confusing static `Protocol` with runtime enforcement | Separate runtime capability checks from static protocol annotations.    |
| Rust ownership                   | Python has object identity and mutation, but no ownership checker. | Thinking about aliasing is useful                      | Borrowing/lifetime guarantees do not exist                                        | Assuming the language prevents shared mutation bugs  | Use discipline, immutability, copying, and clear ownership conventions. |
| Functional programming           | Python supports higher-order functions and comprehensions.         | Pure functions and composition are useful              | Python is not lazy-by-default or purity-enforcing                                 | Forcing monadic or point-free style                  | Use functional style when it improves clarity, not as ideology.         |

The best transfer into Python is conceptual flexibility plus disciplined simplicity. The worst transfer is importing another language’s architecture as if Python had the same enforcement mechanisms.

### Python and Paradigms — procedural, object-oriented, functional-adjacent, declarative, metaprogramming

Python is multi-paradigm, but not paradigm-neutral. It encourages some forms more naturally than others.

| Paradigm            | Python support   | Idiomatic use                                                        | Risk                                                      |
| ------------------- | ---------------- | -------------------------------------------------------------------- | --------------------------------------------------------- |
| Procedural          | Very strong      | Scripts, workflows, data transformations, orchestration              | Long scripts with hidden global state                     |
| Object-oriented     | Strong           | Domain objects, stateful services, protocols, framework APIs         | Deep inheritance and unnecessary class hierarchies        |
| Functional-adjacent | Moderate         | Pure helpers, comprehensions, generators, higher-order functions     | Overly abstract functional style alien to ordinary Python |
| Declarative         | Domain-dependent | Config, ORM models, data schemas, decorators, framework declarations | Hidden magic and weak traceability                        |
| Metaprogramming     | Powerful         | Decorators, descriptors, class creation hooks, frameworks            | Opaque runtime behavior                                   |
| Protocol-oriented   | Very strong      | Iterables, context managers, mappings, callables, `Protocol`         | Informal contracts without tests or types                 |

Python’s idiomatic center is usually **simple procedural code plus lightweight objects plus protocol-aware APIs**. Heavy class hierarchies, excessive decorators, and clever dynamic dispatch should be justified by real complexity, not style preference.

### Interdisciplinary Foundations — type theory, PL design, systems, HCI, security, ecosystem analysis

Python benefits from several explanatory lenses, but each lens has limits. The goal is not to turn Python into a theory textbook; the goal is to use theory where it improves programming judgment.

| Lens or external field            | Core idea                                                                                                   | Language features clarified                                                         | Practical programming consequence                           | Where it appears in the guide | Limit of the lens                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------- |
| Programming language design       | Language features encode tradeoffs among expressiveness, safety, performance, simplicity, and tooling.      | Dynamic typing, object model, exceptions, modules, protocols                        | Avoid judging features as simply “good” or “bad.”           | PART 1, PART 8, PART 10       | Does not replace concrete syntax and API knowledge.             |
| Type theory                       | Types express constraints and relationships among values and operations.                                    | Gradual typing, `Any`, generics, protocols, unions, narrowing                       | Clarifies what type checkers can and cannot guarantee.      | PART 3, PART 9                | Python’s runtime is not governed by a fully static type system. |
| Runtime systems                   | Execution depends on interpreter, memory model, object representation, dispatch, and concurrency machinery. | CPython, bytecode, reference counting, GC, `GIL`, C extensions                      | Prevents false performance and portability claims.          | PART 7, PART 9                | CPython details are not always Python language semantics.       |
| Software engineering              | Large programs require boundaries, contracts, tests, maintainability, and dependency control.               | Modules, packaging, API design, testing, typing, logging                            | Turns Python from scripting into sustainable engineering.   | PART 5, PART 6, PART 9        | Good engineering practice still depends on domain constraints.  |
| Security engineering              | Trust boundaries must be explicit; dynamic code and dependencies create attack surfaces.                    | Deserialization, subprocess, paths, `eval`, plugins, packages                       | Prevents treating dynamic convenience as harmless.          | PART 5, PART 6, PART 9        | Security cannot be solved by language rules alone.              |
| Human-computer interaction        | Readability and cognitive load affect correctness.                                                          | Indentation, naming, simple syntax, explicitness, error messages                    | Explains why Python favors source clarity and low ceremony. | PART 1, PART 2, PART 4        | Readability is not the same as semantic simplicity.             |
| Ecosystem and governance analysis | A language’s practice is shaped by releases, packaging, libraries, tools, and community norms.              | PyPI, packaging, virtual environments, type checkers, formatters, version migration | Explains why Python competence is ecosystem competence.     | PART 6, PART 8, PART 9        | Ecosystem convention is not language semantics.                 |

These lenses will be used selectively. A lens appears only when it explains a concrete Python mechanism, tradeoff, misconception, or professional decision.

### Mature Trends, Emerging Trends, and Overhyped Trends — typing, packaging, performance, async, free-threading, AI ecosystem

Python’s current trajectory is shaped by scale. The language began as an approachable scripting and glue language, but modern Python is now also a large-system, data, ML, infrastructure, and service-development language.

| Trend type          | Trend                                                    | Status                         | Driving pressure                               | Caveat                                                                  |
| ------------------- | -------------------------------------------------------- | ------------------------------ | ---------------------------------------------- | ----------------------------------------------------------------------- |
| Mature              | Type annotations                                         | Mainstream in larger codebases | Maintainability, editor support, API clarity   | Not runtime validation                                                  |
| Mature              | Formatters and linters                                   | Mainstream                     | Consistency and review efficiency              | Tool choice must match team needs                                       |
| Mature              | Virtual environments and lock-based dependency workflows | Essential                      | Reproducibility                                | Tooling fragmentation remains                                           |
| Mature              | `pytest`-style testing culture                           | Common professional practice   | Reliable refactoring and behavior checks       | Poor tests can still encode weak contracts                              |
| Mature              | `async`/`await` for I/O concurrency                      | Established                    | High-throughput I/O services and clients       | Not a general CPU parallelism solution                                  |
| Emerging            | Free-threaded CPython                                    | Important but transitional     | Multi-core CPU utilization                     | Compatibility and ecosystem readiness matter                            |
| Emerging            | Faster CPython implementation work                       | Ongoing                        | Performance pressure without abandoning Python | Does not remove algorithmic or object-model costs                       |
| Emerging            | Stronger static tooling                                  | Increasing                     | Large codebase maintenance                     | Different tools may disagree on edge cases                              |
| Emerging            | Modern packaging workflows                               | Active                         | Reproducibility, deployment, project metadata  | Packaging remains one of Python’s hardest practical areas               |
| Overhyped           | “Type hints make Python statically typed”                | Misleading                     | Desire for safety                              | Runtime remains dynamic unless validation is added                      |
| Overhyped           | “Async makes Python faster”                              | Misleading                     | Concurrency confusion                          | Async improves I/O concurrency, not raw CPU speed                       |
| Overhyped           | “Python is too slow for serious systems”                 | Overgeneralized                | Interpreter overhead is real                   | Native extensions, architecture, I/O, and libraries change the equation |
| Overhyped           | “Free-threading automatically solves Python performance” | Premature                      | Multi-core pressure                            | Code, dependencies, C extensions, and workload shape results            |
| Declining or legacy | Python 2 habits                                          | Obsolete                       | Historical inertia                             | Modern Python requires Python 3 semantics and tooling                   |
| Declining or legacy | Unstructured scripts as production systems               | Still common but risky         | Fast initial development                       | Needs packaging, tests, logging, configuration, boundaries              |

The most important modern shift is not one feature. It is the movement from **small dynamic scripts** toward **large dynamically executed but statically assisted systems**.

### Python’s Mature Design Tradeoff — local simplicity versus global discipline

Python’s deepest design tradeoff can be summarized this way:

**Python minimizes local ceremony and maximizes runtime flexibility; therefore, large-scale correctness depends on explicit engineering discipline.**

This appears everywhere.

| Local simplicity                      | Global discipline required                                     |
| ------------------------------------- | -------------------------------------------------------------- |
| No mandatory type declarations        | Add type hints where contracts matter.                         |
| Flexible function arguments           | Design signatures carefully and avoid ambiguous APIs.          |
| Mutable built-in containers           | Control ownership, copying, and mutation.                      |
| Dynamic imports                       | Keep import side effects small and boundaries clear.           |
| Exceptions are unchecked              | Document and test failure modes.                               |
| Runtime attributes                    | Avoid accidental attribute creation and hidden state mutation. |
| Decorators are easy                   | Keep transformed behavior inspectable.                         |
| External packages are easy to install | Pin, audit, and isolate dependencies.                          |
| Threads/processes/async all exist     | Choose the model based on workload.                            |
| Native extensions can accelerate work | Understand the runtime boundary and packaging impact.          |

This is why Python can feel simple in small examples and complex in professional systems. The language does not become inconsistent; the scale reveals responsibilities that were always present.

### Failure-First Overview — wrong mental models that this tutorial will correct

This guide will repeatedly use failure-driven explanation because Python’s common bugs often come from plausible but wrong mental models.

| Tempting but wrong mental model            | Surprising behavior or bug                                 | Correct semantic explanation                           | Professional rule of thumb                                                | Boundary where rule changes                                                    |
| ------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| “Variables store values.”                  | Assignment does not copy a list.                           | Names bind to objects.                                 | Think in names, objects, identity, and mutation.                          | Immutable objects reduce visible aliasing but do not change binding semantics. |
| “Type hints check values at runtime.”      | Bad input passes until an operation fails.                 | Annotations guide tools unless validation is explicit. | Validate external data separately.                                        | Frameworks or libraries may enforce annotations explicitly.                    |
| “Duck typing means no contracts.”          | APIs fail late and unclearly.                              | Duck typing is behavioral compatibility.               | Document required operations or express them with `Protocol`.             | Highly dynamic plugin APIs may require runtime checks.                         |
| “Async means parallel.”                    | CPU-bound async code does not speed up.                    | Async coordinates waiting, mostly for I/O.             | Use async for many waiting tasks; use processes/native code for CPU work. | Free-threaded builds and native extensions change some constraints.            |
| “Private names are inaccessible.”          | Attributes can still be accessed.                          | Privacy is conventional, with limited name mangling.   | Treat `_name` as non-public by convention.                                | Security boundaries need real isolation, not naming.                           |
| “CPython behavior is Python semantics.”    | Code relies on destructor timing or implementation quirks. | CPython is dominant but not the language definition.   | Use language-level guarantees for correctness.                            | Performance tuning may intentionally target CPython.                           |
| “Inheritance is the default abstraction.”  | Class hierarchies become brittle.                          | Python often favors composition and protocols.         | Start with functions, data, and composition.                              | Framework integration may require inheritance.                                 |
| “Installing a package solves the problem.” | Dependency conflicts, security issues, deployment failure. | Ecosystem use is an engineering decision.              | Minimize, pin, audit, and isolate dependencies.                           | Experimental scripts can tolerate more looseness than production systems.      |

These failures are not beginner trivia. They are the conceptual roots of many professional Python bugs.

### Python’s Relationship to Safety — memory safety, type safety, resource safety, operational safety

The word “safe” is ambiguous. Python has some safety properties and lacks others.

| Safety dimension   | Python’s position                                                   | Practical interpretation                                                                                      |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Memory safety      | Ordinary Python code avoids raw pointer arithmetic and manual free. | Many C-style memory errors are absent in pure Python.                                                         |
| Type safety        | Runtime operations usually reject incompatible types.               | Type errors may appear late, only when code paths execute.                                                    |
| Static safety      | Optional and tooling-dependent.                                     | Use mypy, pyright, linters, and tests for larger systems.                                                     |
| Resource safety    | Available through context managers.                                 | Use `with`; do not rely on destructor timing.                                                                 |
| Concurrency safety | Not automatically guaranteed.                                       | Shared mutable state, async cancellation, thread coordination, and process boundaries require care.           |
| Security safety    | Not automatic.                                                      | Dynamic execution, deserialization, subprocesses, file paths, and dependencies need explicit threat modeling. |
| API safety         | Mostly conventional.                                                | Stable APIs require documentation, tests, versioning, and compatibility discipline.                           |

Python is safer than C for ordinary memory use, less statically constrained than Rust or Haskell, less ceremonious than Java, and more explicit about many operations than JavaScript. None of those comparisons is absolute. The relevant question is always: **which guarantee is needed, and where does Python stop providing it by default?**

### Python’s Relationship to Performance — interpreter overhead, native acceleration, profiling-first discipline

Python performance cannot be understood by saying “Python is slow.” That statement is too crude.

Python code can be slow when it spends time in pure-Python loops, dynamic dispatch, repeated allocation, attribute lookup, small-object manipulation, or inefficient algorithms. Python code can also be very fast when it delegates heavy work to optimized libraries, native extensions, vectorized operations, databases, kernels, or external services.

| Performance situation              | Python’s usual behavior                                                    | Better judgment                                                                               |
| ---------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Small scripts                      | Usually fast enough                                                        | Prioritize clarity.                                                                           |
| I/O-bound automation               | Often excellent                                                            | Use good APIs and concurrency only when needed.                                               |
| CPU-bound pure Python loops        | Often poor                                                                 | Profile; consider better algorithms, native libraries, vectorization, or compiled extensions. |
| Data science numeric kernels       | Often fast through native libraries                                        | Avoid per-element Python loops.                                                               |
| Web services                       | Often adequate; bottlenecks are frequently I/O, DB, network, serialization | Measure before optimizing.                                                                    |
| High-frequency low-latency systems | Often not ideal                                                            | Consider lower-level languages or native components.                                          |
| Multi-core CPU work                | Default CPython threads are constrained by the `GIL`                       | Use multiprocessing, native code, or evaluate free-threaded builds carefully.                 |

The professional rule is: **write clear code first, measure real bottlenecks, then optimize at the right layer.**

### Python’s Relationship to Ecosystem — standard library, PyPI, native extensions, tooling, governance

Python is not just a language; it is an ecosystem. Much of Python’s power comes from the standard library and PyPI, but this also means Python development has an environmental dimension.

A Python program’s behavior depends on:

| Ecosystem layer        | Examples                                                        | Why it matters                                         |
| ---------------------- | --------------------------------------------------------------- | ------------------------------------------------------ |
| Language version       | Python 3.12, 3.13, 3.14                                         | Syntax, stdlib behavior, typing features, deprecations |
| Runtime implementation | CPython, PyPy, MicroPython                                      | Performance, extension compatibility, memory behavior  |
| Project metadata       | `pyproject.toml`, build backend                                 | Packaging and distribution                             |
| Environment            | `venv`, containers, system Python, pyenv-style workflows        | Reproducibility and isolation                          |
| Dependencies           | PyPI packages and transitive dependencies                       | Capability, security, compatibility                    |
| Tooling                | formatter, linter, type checker, test runner                    | Code quality and maintainability                       |
| Deployment target      | server, desktop, Lambda-like runtime, notebook, embedded system | Constraints and packaging strategy                     |

A professional Python tutorial must therefore teach not only syntax and semantics, but also project structure, environments, packaging, dependency management, testing, logging, profiling, and compatibility.

### What Python Rewards — clarity, small abstractions, protocol awareness, explicit boundaries

Python rewards code that is simple on the surface and disciplined underneath.

| Python rewards                | What it looks like                                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Clear names                   | Functions and variables describe intent without excessive comments.                                                     |
| Small functions               | Logic is decomposed without creating artificial class hierarchies.                                                      |
| Simple data modeling          | Use built-ins, dataclasses, enums, and typed records appropriately.                                                     |
| Protocol awareness            | APIs accept behavioral capabilities rather than unnecessary concrete classes.                                           |
| Explicit resource management  | Files, locks, sessions, and transactions use `with`.                                                                    |
| Boundary validation           | External input is parsed before entering core logic.                                                                    |
| Specific exception handling   | Errors are caught where recovery is meaningful.                                                                         |
| Tool-assisted maintainability | Formatting, linting, typing, testing, and profiling are normal.                                                         |
| Measured optimization         | Performance work follows profiling, not folklore.                                                                       |
| Conservative dynamic magic    | Reflection, monkey patching, descriptors, and metaclasses are used only when they clarify or enable a real abstraction. |

Good Python often looks almost boring. Its sophistication is in the appropriateness of the boundaries, not in the density of clever constructs.

### What Python Punishes — hidden mutation, clever magic, weak boundaries, unmeasured assumptions

Python punishes certain habits severely at scale.

| Habit Python punishes              | Why it fails                                                      |
| ---------------------------------- | ----------------------------------------------------------------- |
| Hidden shared mutation             | Aliasing makes state changes propagate unexpectedly.              |
| Mutable default arguments          | Defaults are evaluated once, not per call.                        |
| Broad `except` blocks              | Real failures are swallowed or misclassified.                     |
| Import-time side effects           | Imports become order-sensitive and hard to test.                  |
| Overuse of globals                 | State becomes implicit and difficult to isolate.                  |
| Excessive inheritance              | Fragile hierarchies fight Python’s flexible composition model.    |
| Unbounded `Any`                    | Static checking loses value.                                      |
| Reflection overuse                 | Code becomes hard for humans and tools to analyze.                |
| Monkey patching without boundaries | Behavior depends on invisible runtime mutation.                   |
| Async everywhere                   | Control flow becomes complex without solving the real bottleneck. |
| Performance folklore               | Optimization targets the wrong layer.                             |
| Dependency sprawl                  | Supply-chain, compatibility, and deployment risks increase.       |

Most Python anti-patterns are not caused by ignorance of syntax. They are caused by weak semantic models and poor boundary discipline.

### High-Level Map of the Rest of the Guide — from identity to expert judgment

This part establishes the macro-level mental model. The rest of the guide will turn that model into operational skill.

| Later part | Role in the tutorial                                    | Main Python-specific concern                                                                                    |
| ---------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| PART 2     | Core syntax and primitive semantics                     | Reading Python code accurately: binding, scope, literals, control flow, functions, classes, imports, exceptions |
| PART 3     | Data, types, and modeling by task pattern               | Choosing between built-ins, dataclasses, classes, enums, `TypedDict`, protocols, generics, validation           |
| PART 4     | Control flow, functions, abstraction, and composition   | Designing behavior with functions, closures, decorators, generators, classes, composition, descriptors          |
| PART 5     | Modules, errors, effects, resources, and boundaries     | Managing imports, packages, public APIs, exceptions, context managers, trust boundaries                         |
| PART 6     | Standard library and ecosystem reference                | Using Python’s libraries and external tools by task, not by memorized lists                                     |
| PART 7     | Semantics, runtime, memory, concurrency, implementation | Understanding why Python behaves as it does under CPython and where implementation details matter               |
| PART 8     | Historical evolution and current trends                 | Explaining Python’s movement from scripting to large-scale typed/tool-assisted systems                          |
| PART 9     | Professional workflow and mastery path                  | Turning Python knowledge into maintainable professional practice                                                |
| PART 10    | Beyond the tutorial                                     | Using language-specific indexes and real-system experience to move toward expert judgment                       |

The core thesis of the guide is:

**Python mastery is not memorizing syntax. It is learning how Python’s dynamic object model, protocol system, runtime behavior, gradual typing layer, and ecosystem conventions interact under real software constraints.**

## PART 2 — Core Syntax and Semantic Primitives Reference

### Lexical Structure and Source Form — indentation, tokens, comments, docstrings, encoding, layout

Python’s surface syntax is deliberately small, but its layout rules are semantically important. Unlike C, Java, JavaScript, or Rust, Python does not use braces to delimit ordinary blocks. It uses indentation. This is not just formatting convention; it is part of the grammar.

A Python file is a sequence of logical lines. Logical lines are formed from physical lines, sometimes joined explicitly with backslash or implicitly inside parentheses, brackets, and braces. Blocks are introduced by a colon and then represented by an indented suite.

```python
def classify_score(score: int) -> str:
    if score >= 90:
        return "excellent"
    if score >= 70:
        return "pass"
    return "review"
```

The indentation after `def` and `if` is not cosmetic. It defines the nested block structure.

| Construct            | Meaning                                      | Syntax                                   | Canonical example               | Design meaning                         | Practical consequence                              | Common pitfall                                             |
| -------------------- | -------------------------------------------- | ---------------------------------------- | ------------------------------- | -------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| Physical line        | One line in the source file                  | newline-delimited text                   | `x = 1`                         | Human-readable source organization     | Most statements occupy one line                    | Trying to use semicolons as normal style                   |
| Logical line         | One complete statement after line joining    | implicit or explicit continuation        | `total = (a + b + c)`           | Allows readable multiline expressions  | Prefer parentheses for multiline expressions       | Using backslash continuation unnecessarily                 |
| Indentation          | Block structure                              | consistent leading whitespace            | `if ok:\n    run()`             | Layout is syntax                       | Formatting errors are syntax errors                | Mixing tabs and spaces                                     |
| Colon                | Introduces a suite                           | `if condition:`                          | `for item in items:`            | Signals a nested block                 | Many compound statements require it                | Forgetting colon after `if`, `def`, `class`, `try`, `with` |
| Comment              | Ignored explanatory text                     | `# comment`                              | `# normalize before comparison` | Comments are not documentation objects | Good for local rationale                           | Repeating what the code says                               |
| Docstring            | Runtime string literal used as documentation | first statement in module/class/function | `"""Return normalized name."""` | Documentation is attached to objects   | Used by `help()`, tools, IDEs                      | Treating any string as a docstring                         |
| Encoding declaration | Source encoding metadata                     | usually unnecessary in modern Python     | `# -*- coding: utf-8 -*-`       | Historical compatibility               | UTF-8 is standard in modern Python source practice | Adding encoding comments without need                      |

Python comments are simple: `#` begins a comment that runs to the end of the physical line. Python does not have block comments. Triple-quoted strings are sometimes used to “comment out” blocks, but that is not the same thing. A triple-quoted string is still a string literal; when placed as the first statement of a module, class, or function, it becomes a docstring.

```python
def parse_user_id(raw: str) -> int:
    """Parse a decimal user identifier from external text."""
    return int(raw)
```

A docstring is part of Python’s object-centered design. Functions, classes, and modules are runtime objects, and documentation can be attached to those objects through their `__doc__` attribute.

**Failure-first explanation.**

The tempting but wrong mental model is: indentation is style, like in C or Java. The surprising behavior is that moving a line changes program structure or creates a syntax error. The correct semantic explanation is that indentation defines suites. The professional rule of thumb is: use indentation to make structure explicit, and let a formatter enforce consistency. The boundary where the rule changes is generated code or intentionally compact REPL snippets, where readability constraints may be different but syntax rules remain the same.

**Common Pitfalls.** Avoid mixing tabs and spaces. Avoid explicit backslash continuation except when unavoidable. Avoid semicolon-separated statements in normal code. Avoid using triple-quoted strings as general block comments, especially inside functions, because they may create unused string objects or confuse readers about documentation intent.

### Naming Conventions and Identifiers — names, bindings, readability, public/private convention

Python identifiers name objects indirectly through bindings. An identifier is not a storage location in the C sense, nor a statically declared variable in the Java sense. It is a name in a namespace bound to an object.

```python
count = 3
count = "three"
```

This is legal because the name `count` is rebound from one object to another. The objects themselves have types; the name does not have a fixed language-level type.

Naming conventions are therefore not merely aesthetic. Since Python has limited enforced visibility and a dynamic object model, naming carries API information.

| Naming form        | Typical meaning                              | Example                      | Enforcement level               | Practical consequence                           | Common pitfall                                       |
| ------------------ | -------------------------------------------- | ---------------------------- | ------------------------------- | ----------------------------------------------- | ---------------------------------------------------- |
| `lower_snake_case` | Variables, functions, methods                | `user_count`, `parse_name()` | Convention                      | Standard readable Python style                  | Using Java-style `camelCase` in ordinary Python APIs |
| `UpperCamelCase`   | Classes, exceptions                          | `UserProfile`, `ParseError`  | Convention                      | Distinguishes type-like objects                 | Naming ordinary functions like classes               |
| `UPPER_SNAKE_CASE` | Constants                                    | `MAX_RETRIES`                | Convention only                 | Signals “do not mutate/rebind”                  | Assuming constants are enforced                      |
| `_name`            | Non-public implementation detail             | `_cache`, `_normalize()`     | Convention                      | Signals internal API                            | Treating it as security/privacy                      |
| `__name`           | Name-mangled class attribute                 | `self.__token`               | Partial compiler transformation | Avoids accidental subclass collision            | Using it for ordinary privacy                        |
| `__dunder__`       | Special protocol or interpreter-defined name | `__iter__`, `__enter__`      | Language/data-model convention  | Hooks into Python behavior                      | Inventing arbitrary dunder names                     |
| `name_`            | Avoid keyword conflict                       | `class_`, `from_`            | Convention                      | Keeps readable names without shadowing keywords | Overusing suffixes unnecessarily                     |
| `_`                | Throwaway or conventional placeholder        | `for _ in range(3):`         | Convention                      | Signals ignored value                           | Reusing `_` when value is actually needed            |

Python’s privacy model is convention-heavy. A leading underscore means “internal; do not depend on this from outside the module/class.” It does not prevent access.

```python
class Client:
    def __init__(self, token: str) -> None:
        self._token = token
```

The attribute `_token` is accessible. The underscore communicates API status, not access control.

Name mangling with double leading underscores is narrower than many programmers assume.

```python
class Base:
    def __init__(self) -> None:
        self.__state = "base"
```

Inside the class body, `__state` is transformed to something like `_Base__state`. This reduces accidental collision in subclasses. It is not a security boundary.

**Language-design note.** Python’s naming conventions reflect a preference for practical readability and social contracts over strict access modifiers. This reduces ceremony and supports introspection, testing, debugging, and dynamic frameworks. The cost is that API boundaries must be maintained by discipline, documentation, review, and compatibility policy.

**Failure-first explanation.**

The tempting but wrong mental model is: `_private` is like `private` in Java or C++. The surprising behavior is that external code can still access it. The correct semantic explanation is that Python uses naming conventions to communicate public API status. The professional rule of thumb is: treat underscore-prefixed names as non-public even though the runtime permits access. The boundary where the rule changes is debugging, testing internals, framework integration, or controlled migration work, where temporary internal access may be acceptable but should not become public dependency.

**Common Pitfalls.** Do not shadow built-ins such as `list`, `dict`, `str`, `id`, `type`, `file`, `sum`, or `input` in broad scopes. Do not invent new dunder names. Do not use double-underscore attributes as a default privacy mechanism. Do not rely on uppercase names as real constants.

### Literals and Built-In Scalar Values — numbers, strings, bytes, booleans, None

Python literals create objects. Even small scalar-looking values participate in the object model. Integers, floats, booleans, strings, bytes, and `None` are all objects.

| Literal category | Syntax                      | Runtime type | Canonical example      | Design meaning                         | Practical consequence                         | Common pitfall                                 |
| ---------------- | --------------------------- | ------------ | ---------------------- | -------------------------------------- | --------------------------------------------- | ---------------------------------------------- |
| Integer          | decimal, binary, octal, hex | `int`        | `42`, `0b1010`, `0xff` | Arbitrary-precision integer object     | No fixed-width overflow in normal Python ints | Assuming C-like integer overflow               |
| Float            | decimal/exponent            | `float`      | `3.14`, `1e-9`         | IEEE-754-style binary floating point   | Fast but approximate                          | Expecting exact decimal arithmetic             |
| Complex          | real plus imaginary         | `complex`    | `3 + 4j`               | Numeric tower includes complex numbers | Useful in scientific contexts                 | Forgetting `j` syntax                          |
| Boolean          | keywords                    | `bool`       | `True`, `False`        | `bool` is a subclass of `int`          | Works in truth contexts                       | Confusing truthiness with strict boolean type  |
| None             | singleton keyword           | `NoneType`   | `None`                 | Absence/null-like sentinel             | Use `is None`, not `== None`                  | Treating all falsey values as absent           |
| String           | quoted text                 | `str`        | `"hello"`, `'hello'`   | Unicode text                           | Text is not bytes                             | Mixing `str` and `bytes`                       |
| Bytes            | byte sequence               | `bytes`      | `b"abc"`               | Raw binary data                        | Required for binary protocols                 | Treating bytes as text                         |
| Formatted string | f-string                    | `str`        | `f"user={name}"`       | Expression interpolation               | Readable formatting                           | Putting complex logic inside f-strings         |
| Raw string       | backslash-literal-ish text  | `str`        | `r"\d+\s+"`            | Useful for regex/path-like patterns    | Backslashes are less magical                  | Raw strings cannot end with a single backslash |

Python integers are arbitrary precision.

```python
value = 10 ** 100
```

This does not overflow like a fixed-width `int32` or `int64`. The cost is that very large integers allocate memory and have arithmetic costs proportional to size.

Python floats are binary floating-point numbers.

```python
0.1 + 0.2 == 0.3  # False
```

The problem is not Python-specific sloppiness. It follows from binary floating-point representation. For exact decimal financial calculations, use `decimal.Decimal`, not `float`.

Python strings are Unicode text.

```python
name = "naïve"
data = name.encode("utf-8")
restored = data.decode("utf-8")
```

`str` and `bytes` are different types because text and binary data are different domains. This distinction prevents many accidental encoding bugs but forces explicit boundary handling.

`None` is Python’s standard absence value.

```python
user_id = None

if user_id is None:
    print("missing")
```

Use `is None` because `None` is a singleton object and identity is the intended check.

**Language-design note.** Python’s literals reinforce the principle that values are objects with behavior. Numeric operations, string formatting, truthiness, hashing, comparison, and representation all connect back to protocols and methods. Literal syntax is only the surface.

**Failure-first explanation.**

The tempting but wrong mental model is: `None`, `0`, `False`, `""`, and `[]` are all basically the same because they are false in conditions. The surprising behavior is that treating them as equivalent destroys meaning: a missing value is not the same as zero, an empty string, or an empty collection. The correct semantic explanation is that Python has truthiness, but truthiness is not semantic equality. The professional rule of thumb is: use `is None` when testing absence; use truthiness only when emptiness or false condition is genuinely what is meant. The boundary where the rule changes is APIs that intentionally accept all falsey values as equivalent, which should be rare and documented.

**Common Pitfalls.** Do not use `float` for exact money arithmetic. Do not compare to `None` using `==` in ordinary code. Do not mix `str` and `bytes` without explicit encoding/decoding. Do not use truthiness when the difference between missing, empty, zero, and false matters.

### Collection Literals — list, tuple, dict, set, comprehensions, mutability

Python’s built-in collection literals are central to everyday programming. They are not just syntax conveniences; they express important modeling choices.

| Collection  | Literal syntax           | Mutability | Ordered?                                | Typical use                                     | Common pitfall                                 |
| ----------- | ------------------------ | ---------- | --------------------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| `list`      | `[1, 2, 3]`              | Mutable    | Yes                                     | Variable-length sequence                        | Accidental shared mutation                     |
| `tuple`     | `(1, 2, 3)` or `1, 2, 3` | Immutable  | Yes                                     | Fixed grouping, records, multiple return values | Thinking parentheses define tuple in all cases |
| `dict`      | `{"a": 1}`               | Mutable    | Yes, insertion-ordered in modern Python | Key-value mapping                               | Assuming keys can be mutable                   |
| `set`       | `{1, 2, 3}`              | Mutable    | No stable semantic order                | Membership and uniqueness                       | Confusing `{}` with empty set                  |
| `frozenset` | `frozenset({1, 2})`      | Immutable  | No stable semantic order                | Hashable set-like value                         | Forgetting it lacks literal syntax             |
| Empty list  | `[]`                     | Mutable    | Yes                                     | New empty sequence                              | Reusing shared default list                    |
| Empty tuple | `()`                     | Immutable  | Yes                                     | Empty fixed grouping                            | Rarely a modeling need                         |
| Empty dict  | `{}`                     | Mutable    | Yes                                     | New empty mapping                               | Mistaking it for set                           |
| Empty set   | `set()`                  | Mutable    | No                                      | New empty set                                   | Writing `{}`                                   |

A tuple is created by the comma, not by parentheses alone.

```python
single = (1,)      # tuple with one item
not_tuple = (1)    # integer
also_tuple = 1, 2  # tuple
```

This matters because tuple syntax often appears in return values, unpacking, pattern matching, and data grouping.

```python
def bounds(values: list[int]) -> tuple[int, int]:
    return min(values), max(values)
```

Dictionary literals express mappings. In modern Python, dictionaries preserve insertion order as part of the language guarantee, but they are still conceptually mappings, not sequences.

```python
status_codes = {
    "ok": 200,
    "not_found": 404,
    "server_error": 500,
}
```

Set literals express uniqueness and membership.

```python
allowed_roles = {"admin", "editor", "viewer"}

if role in allowed_roles:
    grant_access(role)
```

Comprehensions create collections from iteration.

```python
squares = [n * n for n in range(10)]
unique_names = {name.casefold() for name in names}
name_to_id = {user.name: user.id for user in users}
```

Comprehensions are expressions, not statements. They are excellent when the transformation is direct. They become harmful when they hide complex branching, side effects, or exception-prone operations.

| Comprehension form   | Produces           | Example                    | Best use                   | Pitfall                            |
| -------------------- | ------------------ | -------------------------- | -------------------------- | ---------------------------------- |
| List comprehension   | `list`             | `[f(x) for x in xs]`       | Eager transformed sequence | Building huge lists unnecessarily  |
| Set comprehension    | `set`              | `{f(x) for x in xs}`       | Unique transformed values  | Losing duplicates unintentionally  |
| Dict comprehension   | `dict`             | `{k(x): v(x) for x in xs}` | Derived mappings           | Silent overwrite of duplicate keys |
| Generator expression | generator iterator | `(f(x) for x in xs)`       | Lazy iteration             | Reusing exhausted generator        |

**Language-design note.** Python’s collection literals encode a preference for high-level data manipulation. Lists, dictionaries, sets, and comprehensions are not secondary conveniences; they are the everyday substrate of Python programming. The cost is that collection choice carries semantic meaning: mutability, ordering, hashability, uniqueness, and aliasing all matter.

**Failure-first explanation.**

The tempting but wrong mental model is: `[x for x in xs]` is always better because it is compact. The surprising behavior is that compact comprehensions can allocate large intermediate lists, hide duplicate key overwrites, or obscure side effects. The correct semantic explanation is that a comprehension is an expression for constructing a collection or generator. The professional rule of thumb is: use comprehensions for direct transformations and filters; use ordinary loops when the logic has multiple steps, side effects, error handling, or needs names for clarity. The boundary where the rule changes is performance-sensitive code, where generator expressions or specialized libraries may be better than eager containers.

**Common Pitfalls.** Do not use `{}` for an empty set. Do not forget the comma in a one-element tuple. Do not use mutable objects as dictionary keys. Do not rely on set order. Do not write side-effect-heavy comprehensions. Do not forget that duplicate dictionary keys overwrite earlier values.

### Variables, Binding, and Assignment — names, objects, rebinding, aliasing, unpacking

Assignment in Python binds names to objects. It does not declare storage, does not copy by default, and does not attach a permanent type to a name.

```python
x = [1, 2]
y = x
x = [3, 4]
```

After this code, `y` still refers to the original list `[1, 2]`; `x` has been rebound to a different list `[3, 4]`.

| Assignment form      | Meaning                                       | Example                    | Design meaning                            | Practical consequence                | Common pitfall                            |
| -------------------- | --------------------------------------------- | -------------------------- | ----------------------------------------- | ------------------------------------ | ----------------------------------------- |
| Simple assignment    | Bind name to object                           | `x = value`                | Names are bindings                        | Rebinding does not mutate old object | Thinking assignment copies                |
| Chained assignment   | Bind several names to same object             | `a = b = []`               | Shared object binding                     | Useful for immutable values          | Dangerous with mutables                   |
| Augmented assignment | Update or rebind depending on object/protocol | `x += y`                   | Delegates to in-place or normal operation | May mutate object or create new one  | Assuming always equivalent to `x = x + y` |
| Attribute assignment | Set attribute on object                       | `obj.name = value`         | Object state mutation                     | May invoke descriptors/properties    | Accidental attribute creation             |
| Item assignment      | Mutate container slot                         | `items[0] = value`         | Container protocol                        | Changes object state                 | Fails on immutable containers             |
| Unpacking assignment | Bind multiple names from iterable             | `a, b = pair`              | Structural binding                        | Clear decomposition                  | Mismatch in number of values              |
| Starred unpacking    | Capture variable-length remainder             | `head, *middle, tail = xs` | Flexible sequence decomposition           | Useful but can allocate              | Overusing in unclear patterns             |
| Walrus operator      | Assignment expression                         | `if (n := len(xs)) > 0:`   | Bind within expression                    | Avoids repeated work                 | Reducing readability                      |

Unpacking is common and idiomatic.

```python
name, age = row
first, *rest = values
```

It works through iteration. That means custom iterable objects can participate.

The walrus operator `:=` binds inside an expression.

```python
if (match := pattern.search(text)) is not None:
    return match.group(1)
```

This is useful when it avoids duplicated computation and keeps the scope local to the nearby logic. It is not a license to write dense expression-oriented code everywhere.

Augmented assignment deserves special attention.

```python
items = [1, 2]
alias = items
items += [3]
print(alias)  # [1, 2, 3]
```

For lists, `+=` mutates in place. For integers, it creates a new object and rebinds.

```python
n = 1
n += 1
```

This difference follows from object mutability and special method behavior.

**Language-design note.** Python’s assignment model is simple once understood: names bind, objects may mutate, and operations dispatch through object protocols. The complexity comes from aliasing, mutability, and dynamic behavior, not from assignment syntax itself.

**Failure-first explanation.**

The tempting but wrong mental model is: assignment behaves like copying a value into a variable. The surprising behavior is that two names can observe the same mutated object. The correct semantic explanation is that assignment creates or changes bindings from names to objects. The professional rule of thumb is: when assigning mutable objects, ask whether the new name should share or own independent state. The boundary where the rule changes is immutable objects, where sharing is usually harmless because visible mutation is impossible.

**Common Pitfalls.** Do not write `a = b = []` unless shared mutation is intended. Do not assume `+=` has identical aliasing behavior for all types. Do not use assignment expressions when they obscure control flow. Do not confuse rebinding a name with mutating an object.

### Identity, Equality, and Hashing — `is`, `==`, `id`, hashability, dictionary keys

Python distinguishes identity from equality.

Identity asks whether two references point to the same object. Equality asks whether two objects compare as equivalent according to their type’s equality behavior.

```python
a = [1, 2]
b = [1, 2]
c = a

a == b  # True
a is b  # False
a is c  # True
```

| Concept                 | Operator/API                      | Meaning                                               | Canonical use                 | Common pitfall                         |
| ----------------------- | --------------------------------- | ----------------------------------------------------- | ----------------------------- | -------------------------------------- |
| Identity                | `is`, `is not`                    | Same object                                           | `x is None`                   | Using `is` for numeric/string equality |
| Equality                | `==`, `!=`                        | Equivalent value by type-defined comparison           | `name == "admin"`             | Assuming equality means same object    |
| Object identity integer | `id(obj)`                         | Implementation-defined identity value during lifetime | Debugging identity/aliasing   | Treating it as memory address portably |
| Hash                    | `hash(obj)`                       | Integer used by hash tables                           | Dictionary keys, set elements | Making mutable hashable objects        |
| Hashability             | object can be hashed consistently | immutable built-ins usually hashable                  | `dict` keys, `set` members    | Putting lists/dicts into sets          |

Use `is` for singleton identity checks, especially `None`.

```python
if result is None:
    handle_missing()
```

Use `==` for value equality.

```python
if status == "ok":
    proceed()
```

Hashing matters because dictionaries and sets depend on hash values. An object used as a dictionary key must have a stable hash and equality behavior. Mutable containers such as lists and dictionaries are not hashable because their contents can change.

```python
seen = {(1, 2), (3, 4)}  # tuples are hashable if their elements are hashable
```

Custom classes can define equality and hashing through `__eq__` and `__hash__`, but this must be done carefully. If equality depends on mutable state, hashing becomes dangerous.

**Language-design note.** Identity, equality, and hashing reveal Python’s object model directly. Objects have identity. Types define equality behavior. Hash-based collections require consistency between equality and hash. This design enables powerful containers but imposes invariants on custom objects.

**Failure-first explanation.**

The tempting but wrong mental model is: `is` is a faster or stricter version of `==`. The surprising behavior is that `a is b` may be false for equal objects and may appear true for some small implementation-cached values in ways that should not be relied upon. The correct semantic explanation is that `is` checks object identity; `==` dispatches equality comparison. The professional rule of thumb is: use `is` for `None` and singleton sentinels; use `==` for value comparison. The boundary where the rule changes is explicit identity-sensitive code such as cache sentinels, object graph algorithms, or aliasing diagnostics.

**Common Pitfalls.** Do not compare strings or numbers with `is`. Do not define `__eq__` without considering `__hash__`. Do not use mutable objects as dictionary keys. Do not rely on implementation interning or object caching for correctness.

### Truthiness and Boolean Contexts — `bool`, falsey values, condition design

Python conditions do not require values to have type `bool`. They use truthiness. Any object can be tested in a boolean context.

```python
if items:
    process(items)
```

This means “if the collection is non-empty,” not necessarily “if `items == True`.”

| Value or object      | Truthiness                            | Typical meaning in conditions | Pitfall                                      |
| -------------------- | ------------------------------------- | ----------------------------- | -------------------------------------------- |
| `False`              | false                                 | Boolean false                 | None                                         |
| `None`               | false                                 | Missing/absent                | Confusing with empty or zero                 |
| `0`, `0.0`           | false                                 | Numeric zero                  | Confusing zero with missing                  |
| `""`                 | false                                 | Empty string                  | Rejecting valid empty input accidentally     |
| `[]`, `{}`, `set()`  | false                                 | Empty collection              | Confusing empty with absent                  |
| Non-empty collection | true                                  | Has elements                  | None                                         |
| Most objects         | true by default                       | Object exists                 | Assuming all objects define meaningful truth |
| Custom object        | determined by `__bool__` or `__len__` | Domain-specific truth         | Surprising implicit behavior                 |

Truthiness is idiomatic when testing emptiness.

```python
if not errors:
    return "ok"
```

But it is dangerous when absence, emptiness, zero, and false are semantically different.

```python
def retry(count: int | None) -> None:
    if count is None:
        count = 3
```

This is better than:

```python
def retry(count: int | None) -> None:
    if not count:
        count = 3
```

The second version treats `0` as missing, which may be wrong if `0` means “do not retry.”

Boolean operators `and` and `or` return one of their operands, not necessarily a `bool`.

```python
name = provided_name or "anonymous"
```

This is idiomatic for fallback values only when all falsey values should trigger the fallback. If an empty string is a valid explicit value, this is wrong.

**Language-design note.** Truthiness reduces ceremony and makes collection checks readable. The cost is semantic compression: many distinct states collapse into false. Professional Python code uses truthiness when that collapse is intended and explicit checks when distinctions matter.

**Failure-first explanation.**

The tempting but wrong mental model is: `if x` means `if x == True`. The surprising behavior is that empty containers, zero, empty strings, and `None` all fail the condition. The correct semantic explanation is that Python asks for the object’s truth value, usually via `__bool__` or `__len__`. The professional rule of thumb is: use truthiness for emptiness and general presence only when falsey values are semantically equivalent. The boundary where the rule changes is external input, configuration, numeric parameters, and optional values, where explicit checks are safer.

**Common Pitfalls.** Do not use `if x` when `0`, `""`, `False`, and `None` mean different things. Do not use `a or default` if falsey explicit values are valid. Do not assume boolean operators return actual booleans. Do not define surprising truthiness for custom objects.

### Operators and Expressions — arithmetic, comparison, membership, logical operators, precedence

Python expressions compute objects. Operators are usually syntax over method dispatch, not primitive machine operations. For example, `a + b` may call `a.__add__(b)` or related fallback methods depending on the objects involved.

| Operator category      | Syntax                              | Meaning                                             | Example                                   | Common pitfall                                             |                                   |
| ---------------------- | ----------------------------------- | --------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------- | --------------------------------- |
| Arithmetic             | `+`, `-`, `*`, `/`, `//`, `%`, `**` | Numeric or overloaded operation                     | `total / count`                           | Confusing `/` with integer division                        |                                   |
| Matrix multiplication  | `@`                                 | Type-defined matrix-like operation                  | `a @ b`                                   | Expecting built-in lists to support it                     |                                   |
| Comparison             | `<`, `<=`, `>`, `>=`, `==`, `!=`    | Type-defined comparison                             | `x < y`                                   | Comparing unrelated types                                  |                                   |
| Chained comparison     | `a < b < c`                         | Combined comparison                                 | `0 <= score <= 100`                       | Assuming `b` evaluated twice                               |                                   |
| Identity               | `is`, `is not`                      | Same object                                         | `x is None`                               | Using for value equality                                   |                                   |
| Membership             | `in`, `not in`                      | Container/protocol membership                       | `name in users`                           | Assuming list membership and set membership have same cost |                                   |
| Boolean                | `and`, `or`, `not`                  | Truth-value logic returning operands for `and`/`or` | `x and x.name`                            | Expecting `and`/`or` to always return `bool`               |                                   |
| Bitwise                | `&`, `                              | `, `^`, `~`, `<<`, `>>`                             | Integer bitwise or type-defined operation | `flags & mask`                                             | Confusing with boolean `and`/`or` |
| Conditional expression | `a if cond else b`                  | Expression-level branch                             | `label = "ok" if valid else "bad"`        | Nesting into unreadability                                 |                                   |

Division is a common transfer point.

```python
5 / 2   # 2.5
5 // 2  # 2
```

`/` performs true division. `//` performs floor division, which matters for negative numbers.

```python
-5 // 2  # -3
```

This is floor division, not truncation toward zero.

Chained comparisons are idiomatic and do not duplicate the middle expression.

```python
if 0 <= score <= 100:
    accept(score)
```

Membership depends heavily on container type. `x in list` is generally linear. `x in set` and `x in dict` are hash-table membership checks on average.

```python
allowed = {"read", "write", "admin"}

if permission in allowed:
    grant(permission)
```

**Language-design note.** Operators participate in Python’s protocol system. This allows built-in syntax to work with user-defined objects, but it also means operators can have domain-specific behavior. Readability depends on using overloaded operators only where their meaning is conventional.

**Failure-first explanation.**

The tempting but wrong mental model is: operators have fixed primitive meanings. The surprising behavior is that `+` concatenates lists, adds numbers, combines strings, and may do custom work for user-defined objects. The correct semantic explanation is that many operators dispatch to special methods. The professional rule of thumb is: rely on operator overloading only where the operation has an obvious domain meaning. The boundary where the rule changes is DSL-like libraries, numerical libraries, and framework code, where operators may intentionally encode domain operations.

**Common Pitfalls.** Do not confuse `/` and `//`. Do not use `&` and `|` as boolean operators in ordinary conditions. Do not assume membership has the same cost for all containers. Do not write deeply nested conditional expressions. Do not overload operators with surprising semantics.

### Basic Control Flow — `if`, `for`, `while`, `break`, `continue`, `else`, `pass`

Python’s basic control flow is statement-oriented and indentation-delimited. The syntax is small, but there are important semantic details.

| Construct   | Meaning                       | Syntax               | Canonical example             | Design meaning              | Practical consequence            | Common pitfall                              |
| ----------- | ----------------------------- | -------------------- | ----------------------------- | --------------------------- | -------------------------------- | ------------------------------------------- |
| `if`        | Conditional branch            | `if cond:`           | `if user is None:`            | Truthiness-driven branch    | Conditions accept any object     | Confusing falsey values                     |
| `elif`      | Else-if branch                | `elif cond:`         | `elif status == "pending":`   | Sequential decision chain   | First true branch wins           | Overlong chains instead of mapping/dispatch |
| `else`      | Fallback branch               | `else:`              | `else: raise ValueError(...)` | Exhaustive fallback         | Clarifies default behavior       | Using when explicit failure is better       |
| `for`       | Iterate over iterable         | `for x in xs:`       | `for line in file:`           | Protocol-based iteration    | Works with any iterable          | Mutating collection while iterating         |
| `while`     | Repeat while condition truthy | `while pending:`     | `while queue:`                | Condition-driven loop       | Good for unknown iteration count | Infinite loops                              |
| `break`     | Exit nearest loop             | `break`              | stop after found              | Local loop control          | Useful for search                | Hidden exit in complex loops                |
| `continue`  | Skip to next iteration        | `continue`           | skip invalid item             | Local loop control          | Reduces nesting                  | Overuse harms readability                   |
| Loop `else` | Runs if loop did not `break`  | `for ...: ... else:` | search-not-found logic        | Encodes no-break completion | Rare but expressive              | Misreading as ordinary if-else              |
| `pass`      | Empty statement               | `pass`               | placeholder block             | Syntax placeholder          | Useful in stubs                  | Leaving accidental no-op code               |

The `for` loop is based on the iteration protocol, not numeric indexing.

```python
for user in users:
    send_notification(user)
```

Index-based loops are sometimes needed, but they are not the default.

```python
for index, user in enumerate(users):
    print(index, user.name)
```

Loop `else` is one of Python’s most misunderstood constructs. It runs when the loop completes normally, not when the loop condition is false in an `if` sense.

```python
for user in users:
    if user.email == target:
        found = user
        break
else:
    found = None
```

Here, `else` means “no `break` occurred.”

For many cases, helper functions or built-ins are clearer.

```python
found = next((user for user in users if user.email == target), None)
```

This is compact, but it should only be used when the expression remains readable.

**Language-design note.** Python’s control flow favors readable structured blocks and protocol-based iteration. `for` is not “counting loop syntax”; it is a generic iteration construct. This makes Python excellent for collection processing but requires understanding iterables, iterators, and generator exhaustion later.

**Failure-first explanation.**

The tempting but wrong mental model is: `for i in range(len(items))` is the normal way to loop because that is how many C-like languages work. The surprising behavior is that Python code written this way is often less readable and more error-prone than direct iteration. The correct semantic explanation is that Python’s `for` consumes iterables directly. The professional rule of thumb is: iterate over objects directly; use `enumerate()` when the index is also needed; use `zip()` when iterating in parallel. The boundary where the rule changes is mutation by index, low-level algorithms, or when the index itself is the primary data.

**Common Pitfalls.** Do not mutate a list structurally while iterating over it unless the behavior is carefully controlled. Do not overuse `range(len(...))`. Do not misread loop `else`. Do not hide complex search behavior in dense generator expressions when a loop is clearer. Do not leave `pass` placeholders in production code without intent.

### Structural Pattern Matching — `match`, `case`, patterns, guards, destructuring

Python’s `match`/`case` syntax supports structural pattern matching. It is not a switch statement in the C sense, although it can replace some switch-like chains.

```python
def describe(command: object) -> str:
    match command:
        case {"action": "quit"}:
            return "exit"
        case {"action": "open", "path": str(path)}:
            return f"open {path}"
        case _:
            return "unknown"
```

Pattern matching checks whether a subject value fits a pattern and may bind names as part of the match.

| Pattern form     | Meaning                           | Example                | Best use                        | Common pitfall                             |                            |
| ---------------- | --------------------------------- | ---------------------- | ------------------------------- | ------------------------------------------ | -------------------------- |
| Literal pattern  | Match specific literal-like value | `case 0:`              | Finite known values             | Expecting arbitrary expressions            |                            |
| Capture pattern  | Bind a name                       | `case name:`           | Capture subject or subpart      | Accidentally matching everything           |                            |
| Wildcard         | Ignore value                      | `case _:`              | Default/fallback                | Putting it too early                       |                            |
| Sequence pattern | Match sequence shape              | `case [x, y]:`         | Structured list/tuple-like data | Confusing with list construction           |                            |
| Mapping pattern  | Match mapping keys/values         | `case {"id": id_}:`    | JSON-like dictionaries          | Assuming it rejects extra keys by default  |                            |
| Class pattern    | Match class and attributes        | `case Point(x, y):`    | Domain objects                  | Depending on `__match_args__` accidentally |                            |
| OR pattern       | Alternative patterns              | `case "y"              | "yes":`                         | Equivalent cases                           | Binding inconsistent names |
| Guard            | Additional condition              | `case x if x > 0:`     | Refine match                    | Putting too much logic in guard            |                            |
| As pattern       | Bind matched value                | `case [x, y] as pair:` | Keep whole and parts            | Overcomplicating simple cases              |                            |

A major pitfall is capture patterns.

```python
match status:
    case ok:
        print(ok)
```

This does not mean “match the value of variable `ok`.” It captures anything and binds it to the name `ok`. To match a constant, use literals, enums, qualified names, or guards appropriately.

Pattern matching is powerful for structured data, command parsing, AST-like values, token streams, and discriminated object shapes. It is less appropriate when an ordinary dictionary dispatch, polymorphic method call, or simple `if` chain is clearer.

**Language-design note.** Pattern matching adds a declarative structural branch mechanism to Python. It connects to Python’s object model through sequence, mapping, and class patterns. The cost is that pattern syntax has different binding rules from expression syntax, so readers must learn it as its own sublanguage.

**Failure-first explanation.**

The tempting but wrong mental model is: `match` is just `switch`. The surprising behavior is that names in patterns often bind new values rather than compare against existing variables. The correct semantic explanation is that `case` contains patterns, not ordinary expressions. The professional rule of thumb is: use `match` when structural shape is the main decision criterion; use `if`/`elif`, dictionary dispatch, or polymorphism when they express the decision more directly. The boundary where the rule changes is parser-like, protocol-like, or algebraic-data-style code, where structural matching can be clearer than nested conditionals.

**Common Pitfalls.** Do not treat capture names as existing-value comparisons. Do not place wildcard or broad capture cases before specific cases. Do not use `match` merely to imitate a switch if a mapping or method dispatch is simpler. Do not hide complex business logic inside guards.
### Function Definition Basics — `def`, parameters, defaults, return values, annotations

Functions are first-class objects in Python. A `def` statement creates a function object and binds it to a name in the current namespace.

```python
def normalize_name(name: str) -> str:
    return name.strip().casefold()
```

This code does not merely declare a function for a compiler. At runtime, Python executes the `def` statement, creates a function object, attaches metadata such as `__name__`, `__doc__`, `__annotations__`, and binds the name `normalize_name` to that function object.

| Construct                 | Meaning                                 | Syntax            | Canonical example                | Design meaning                        | Practical consequence                        | Common pitfall                              |
| ------------------------- | --------------------------------------- | ----------------- | -------------------------------- | ------------------------------------- | -------------------------------------------- | ------------------------------------------- |
| Function definition       | Create and bind function object         | `def name(...):`  | `def parse(raw): ...`            | Functions are runtime objects         | Can pass, store, decorate, inspect functions | Thinking `def` is only static declaration   |
| Return statement          | Exit function with value                | `return value`    | `return user.id`                 | Functions produce objects             | Missing return gives `None`                  | Forgetting implicit `None`                  |
| Positional parameter      | Argument matched by position            | `def f(x):`       | `f(3)`                           | Simple call interface                 | Concise for obvious arguments                | Ambiguous long signatures                   |
| Keyword parameter         | Argument matched by name                | `f(x=3)`          | `open(path, encoding="utf-8")`   | Call-site clarity                     | Good for optional/configuration parameters   | Using positional calls for unclear booleans |
| Default parameter         | Default object bound at definition time | `def f(x=0):`     | `def retry(n=3):`                | Defaults are evaluated once           | Efficient and simple for immutables          | Mutable default bug                         |
| Type annotation           | Metadata for tools/readers              | `x: int -> str`   | `def f(x: int) -> str:`          | Static/tooling contract               | Improves checking and docs                   | Assuming runtime enforcement                |
| Variadic positional       | Collect extra positional args           | `*args`           | `def log(*parts):`               | Flexible call shape                   | Useful for wrappers                          | Overusing flexible signatures               |
| Variadic keyword          | Collect extra keyword args              | `**kwargs`        | `def configure(**options):`      | Dynamic named options                 | Useful for forwarding                        | Hiding accepted parameters                  |
| Keyword-only parameter    | Must be passed by name                  | `def f(x, *, y):` | `def connect(host, *, timeout):` | Improves call-site clarity            | Excellent for options                        | Forgetting `*` marker                       |
| Positional-only parameter | Cannot be passed by name                | `def f(x, /):`    | used in some APIs                | Allows API flexibility/internal names | Useful for low-level or compatibility APIs   | Overusing in ordinary code                  |

Default arguments are one of Python’s most important failure points.

```python
def add_item(item, items=[]):
    items.append(item)
    return items
```

This is usually wrong because the list object is created once, when the function is defined, and reused across calls.

```python
print(add_item("a"))  # ['a']
print(add_item("b"))  # ['a', 'b']
```

The usual safe pattern is:

```python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

This is not a special exception to Python’s rules. It follows from the general object model: default values are objects attached to the function object.

Keyword-only parameters are underused in many codebases. They are valuable when a parameter is optional, boolean, policy-like, or otherwise unclear at the call site.

```python
def fetch_user(user_id: int, *, include_inactive: bool = False) -> dict:
    ...
```

This call is readable:

```python
fetch_user(42, include_inactive=True)
```

This is less readable:

```python
fetch_user(42, True)
```

Function annotations are stored as metadata and interpreted by tools, not enforced by Python by default.

```python
def square(n: int) -> int:
    return n * n

square("x")  # returns "xx" at runtime
```

A type checker may reject this call, but the runtime executes according to object behavior.

**Language-design note.** Python functions combine low ceremony with high runtime flexibility. This supports scripting, callbacks, decorators, higher-order functions, and dynamic framework APIs. The cost is that function contracts are not enforced unless expressed through validation, tests, type checking, or explicit runtime checks.

**Failure-first explanation.**

The tempting but wrong mental model is: default arguments are evaluated each time the function is called. The surprising behavior is that mutable defaults retain state across calls. The correct semantic explanation is that defaults are evaluated when the `def` statement executes and are stored on the function object. The professional rule of thumb is: use immutable defaults directly; use `None` plus internal initialization for mutable defaults. The boundary where the rule changes is intentional persistent function-local cache state, which should be explicit and documented.

**Common Pitfalls.** Do not use mutable default arguments unless shared state is intentional. Do not rely on annotations for runtime validation. Do not design public functions with long positional parameter lists. Do not overuse `*args` and `**kwargs` when explicit signatures would communicate the API better. Do not forget that a function without `return` returns `None`.

### Lambda Expressions and Callable Objects — anonymous functions, call protocol, small callbacks

`lambda` creates an anonymous function expression.

```python
key = lambda user: user.last_login
```

This is equivalent in behavior to a small function object, but with expression-only syntax.

```python
def key(user):
    return user.last_login
```

| Callable form     | Syntax                 | Best use                      | Strength                      | Common pitfall                     |
| ----------------- | ---------------------- | ----------------------------- | ----------------------------- | ---------------------------------- |
| Named function    | `def f(...): ...`      | Most reusable behavior        | Clear, testable, documentable | Creating too many trivial wrappers |
| Lambda            | `lambda x: expr`       | Very small local callback     | Compact expression            | Hiding complex logic               |
| Callable object   | class with `__call__`  | Stateful callable behavior    | Encapsulates configuration    | Overengineering simple functions   |
| Bound method      | `obj.method`           | Behavior tied to object state | Natural OOP interface         | Forgetting it carries `self`       |
| Built-in callable | `len`, `str`, `sorted` | Common operations             | Fast and idiomatic            | Wrapping unnecessarily             |

Lambdas are useful for small key functions:

```python
users = sorted(users, key=lambda user: user.last_login)
```

They are poor for complex logic:

```python
# Usually too dense
users = sorted(users, key=lambda user: (user.group.priority, -user.score, user.name.casefold()))
```

A named helper may be clearer:

```python
def user_sort_key(user):
    return user.group.priority, -user.score, user.name.casefold()

users = sorted(users, key=user_sort_key)
```

Callable objects implement the call protocol through `__call__`.

```python
class PrefixMatcher:
    def __init__(self, prefix: str) -> None:
        self.prefix = prefix

    def __call__(self, value: str) -> bool:
        return value.startswith(self.prefix)
```

This object can be used where a function-like callable is expected:

```python
is_internal = PrefixMatcher("internal:")
```

**Language-design note.** Python treats callability as a protocol. A function is not the only callable thing. Classes, bound methods, objects with `__call__`, and many built-ins participate in the same invocation syntax. This supports flexible APIs but requires careful naming and documentation.

**Failure-first explanation.**

The tempting but wrong mental model is: lambda is Python’s general-purpose lightweight function syntax. The surprising behavior is that lambdas are expression-only and quickly become unreadable when used for real logic. The correct semantic explanation is that `lambda` exists for small inline function objects, not for replacing `def`. The professional rule of thumb is: use `lambda` for short local callbacks; use `def` when the behavior deserves a name, documentation, testing, or multiple expressions. The boundary where the rule changes is highly local functional-style code where a short expression is genuinely clearer than a named helper.

**Common Pitfalls.** Do not put complex logic in lambdas. Do not wrap existing callables unnecessarily, such as `lambda x: len(x)` instead of `len`. Do not use callable objects when a closure or function is simpler. Do not assume every callable is a function object.

### Scope and Namespaces — local, enclosing, global, builtins, `global`, `nonlocal`

Python resolves names using the `LEGB` rule: Local, Enclosing, Global, Builtins.

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        return x

    return inner()
```

The `inner` function returns `"local"` because local scope wins.

| Scope level | Meaning                                | Example                   | Practical consequence            | Common pitfall                                          |
| ----------- | -------------------------------------- | ------------------------- | -------------------------------- | ------------------------------------------------------- |
| Local       | Names assigned inside current function | `x = 1` inside function   | Fastest conceptual lookup        | Assignment makes a name local unless declared otherwise |
| Enclosing   | Scopes of outer functions              | closure variables         | Enables closures                 | Late binding surprises                                  |
| Global      | Module namespace                       | top-level names           | Modules are namespaces           | Overusing global mutable state                          |
| Builtins    | Built-in namespace                     | `len`, `str`, `Exception` | Always available unless shadowed | Shadowing built-ins                                     |

Assignment inside a function makes a name local unless marked `global` or `nonlocal`.

```python
count = 0

def increment():
    count += 1
```

This fails with `UnboundLocalError`, because `count += 1` is treated as assignment to a local name, but the local value is read before assignment.

One fix is `global`, but it should be used sparingly.

```python
count = 0

def increment():
    global count
    count += 1
```

For nested functions, use `nonlocal` to rebind an enclosing function variable.

```python
def make_counter():
    count = 0

    def increment():
        nonlocal count
        count += 1
        return count

    return increment
```

Closures capture variables by reference-like binding, not by freezing their value at function creation in the way many beginners expect.

```python
funcs = []

for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])  # [2, 2, 2]
```

Each lambda refers to the same loop variable `i`, whose final value is `2`.

A common fix is binding the current value as a default argument:

```python
funcs = []

for i in range(3):
    funcs.append(lambda i=i: i)

print([f() for f in funcs])  # [0, 1, 2]
```

**Language-design note.** Python’s namespace model is simple but dynamic. Modules, classes, functions, and objects all introduce or use namespaces. This gives Python flexible runtime behavior, but it makes name binding and rebinding central to semantic reasoning.

**Failure-first explanation.**

The tempting but wrong mental model is: closures capture the current value immediately. The surprising behavior is that loop-created lambdas may all see the final loop value. The correct semantic explanation is that closures capture variables/bindings, not snapshots of values. The professional rule of thumb is: when creating closures in loops, bind the current value explicitly if each closure needs its own value. The boundary where the rule changes is when the closure should intentionally observe later changes to the enclosed variable.

**Common Pitfalls.** Do not shadow built-ins in broad scopes. Do not use `global` as an ordinary state-management tool. Do not forget late binding in closures. Do not assume assignment inside a function modifies a global name. Do not hide important state in nested closures when a small class would be clearer.

### Basic Class and Object Syntax — `class`, instances, attributes, methods, `self`

A `class` statement creates a class object and binds it to a name. Classes are runtime objects in Python.

```python
class User:
    def __init__(self, name: str) -> None:
        self.name = name

    def display_name(self) -> str:
        return self.name.casefold()
```

Creating an instance calls the class object:

```python
user = User("Ada")
```

The class call usually invokes object construction through `__new__` and initialization through `__init__`, but ordinary class usage mostly concerns `__init__`.

| Construct          | Meaning                            | Syntax               | Canonical example           | Design meaning                           | Practical consequence                     | Common pitfall                            |
| ------------------ | ---------------------------------- | -------------------- | --------------------------- | ---------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| Class statement    | Create class object                | `class User:`        | domain object               | Classes are runtime objects              | Can inspect, pass, decorate classes       | Treating class as only static declaration |
| Constructor call   | Create instance                    | `User("Ada")`        | object creation             | Class object is callable                 | Initialization can validate state         | Putting too much work in constructor      |
| Instance attribute | Data stored on instance            | `self.name = name`   | per-object state            | Attributes are dynamic                   | Easy modeling                             | Accidental attribute creation             |
| Method             | Function accessed through instance | `def method(self):`  | behavior using object state | Descriptor binding supplies `self`       | First parameter is explicit in definition | Forgetting `self`                         |
| Class attribute    | Attribute stored on class          | `kind = "user"`      | shared class-level data     | Lookup falls back from instance to class | Useful for constants/shared config        | Mutable class attribute bug               |
| Inheritance        | Derive from base class             | `class Admin(User):` | subtype or reuse            | Method resolution order                  | Framework integration, polymorphism       | Overusing inheritance                     |
| `super()`          | Delegate to next class in MRO      | `super().__init__()` | cooperative inheritance     | Supports MRO-aware calls                 | Important in inheritance                  | Misusing in complex hierarchies           |

Instance attributes are usually created by assignment to `self`.

```python
class Counter:
    def __init__(self) -> None:
        self.value = 0

    def increment(self) -> int:
        self.value += 1
        return self.value
```

Class attributes are shared through the class.

```python
class Role:
    allowed = {"admin", "editor", "viewer"}
```

The mutable class attribute trap appears when shared mutable state was not intended.

```python
class BadBasket:
    items = []

    def add(self, item):
        self.items.append(item)
```

All instances share the same `items` list unless an instance attribute shadows it.

Better:

```python
class Basket:
    def __init__(self) -> None:
        self.items = []

    def add(self, item) -> None:
        self.items.append(item)
```

For simple data containers, `dataclass` is often better than manual boilerplate, though full data modeling belongs in PART 3.

```python
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str
```

`self` is not a keyword. It is a convention. But it is a very strong convention and should not be violated in ordinary code.

**Language-design note.** Python classes are flexible runtime objects with dynamic attributes, descriptor-based method binding, and protocol integration. This makes classes powerful but also means they are not the only or always-best abstraction. Functions, dataclasses, dictionaries, tuples, protocols, and modules often model simpler situations better.

**Failure-first explanation.**

The tempting but wrong mental model is: class attributes are like per-instance fields declared in a class body. The surprising behavior is that mutable class attributes are shared by all instances. The correct semantic explanation is that attributes written in the class body belong to the class object; instance attributes belong to each instance. The professional rule of thumb is: put per-instance mutable state in `__init__`, not as a mutable class attribute. The boundary where the rule changes is intentional shared class-level state, constants, registries, or descriptors, which should be explicit.

**Common Pitfalls.** Do not forget `self` in instance methods. Do not put accidental mutable instance state at class level. Do not create deep inheritance hierarchies before considering composition. Do not use classes for everything when a function or dataclass would be clearer. Do not rely on accidental dynamic attribute creation in large codebases.

### Attribute Access and Object State — lookup, instance dictionaries, properties, dynamic attributes

Attribute access is one of Python’s most important operations.

```python
value = obj.name
obj.name = value
```

This looks simple, but it participates in Python’s object model. Attribute access may involve instance dictionaries, class attributes, descriptors, properties, `__getattr__`, `__getattribute__`, and inheritance lookup.

At the basic level:

```python
class User:
    role = "reader"

    def __init__(self, name: str) -> None:
        self.name = name
```

`user.name` is found on the instance. `user.role` may be found on the class if not present on the instance.

| Attribute mechanism | Basic meaning                     | Example               | Practical consequence                             | Common pitfall                            |
| ------------------- | --------------------------------- | --------------------- | ------------------------------------------------- | ----------------------------------------- |
| Instance attribute  | Stored on object instance         | `self.name = name`    | Per-object state                                  | Typo creates new attribute                |
| Class attribute     | Stored on class object            | `User.kind = "human"` | Shared/default behavior                           | Mutable shared state                      |
| Method lookup       | Function becomes bound method     | `user.display_name()` | `self` supplied automatically                     | Forgetting method binding behavior        |
| Property            | Method-like managed attribute     | `@property`           | Controls access while preserving attribute syntax | Hiding expensive work as simple attribute |
| Dynamic fallback    | Custom missing-attribute behavior | `__getattr__`         | Useful for proxies/adapters                       | Making objects hard to inspect            |
| Full interception   | Control all attribute lookup      | `__getattribute__`    | Very powerful                                     | Easy to break object behavior             |

Properties let an API expose attribute syntax while computing or validating behind the scenes.

```python
class Temperature:
    def __init__(self, celsius: float) -> None:
        self._celsius = celsius

    @property
    def fahrenheit(self) -> float:
        return self._celsius * 9 / 5 + 32
```

Properties are useful when attribute-like access is semantically appropriate. They should not hide surprising I/O, expensive computation, or failure-prone behavior unless clearly documented.

Dynamic attribute access is powerful but dangerous.

```python
class Config:
    def __getattr__(self, name: str):
        return load_config_value(name)
```

This may be convenient, but it weakens editor support, static analysis, discoverability, and error clarity.

**Language-design note.** Attribute access is where Python’s object model becomes practical. It supports natural APIs and powerful frameworks, but it also reduces static analyzability. Attribute discipline is therefore central in professional Python.

**Failure-first explanation.**

The tempting but wrong mental model is: assigning `obj.nmae = "Ada"` will fail if `name` was intended. The surprising behavior is that Python may simply create a new attribute `nmae`. The correct semantic explanation is that ordinary Python objects often allow dynamic attribute creation. The professional rule of thumb is: in larger codebases, use dataclasses, slots, type checkers, tests, and careful constructors to catch accidental attributes. The boundary where the rule changes is intentionally dynamic objects, proxies, framework models, or exploratory scripts.

**Common Pitfalls.** Do not hide expensive operations behind innocent-looking properties without documentation. Do not overuse `__getattr__` or `__getattribute__`. Do not assume attributes are declared before use. Do not rely on dynamic attributes in APIs that need strong maintainability.

### Imports and Module Basics — modules, packages, namespaces, `import`, `from`, aliases

Python’s module system is both a code organization mechanism and a runtime object system. A module is an object. Importing loads or retrieves a module object and binds names.

```python
import pathlib

path = pathlib.Path("data.txt")
```

This binds the name `pathlib` to the module object.

```python
from pathlib import Path

path = Path("data.txt")
```

This binds the name `Path` directly in the current namespace.

| Import form                        | Meaning                       | Example                                     | Best use                                | Common pitfall                      |
| ---------------------------------- | ----------------------------- | ------------------------------------------- | --------------------------------------- | ----------------------------------- |
| `import module`                    | Bind module name              | `import os`                                 | Clear namespace ownership               | Verbose for frequent names          |
| `import package.module`            | Bind top-level package name   | `import email.message`                      | Access through package path             | Misunderstanding what name is bound |
| `import module as alias`           | Bind module to alias          | `import numpy as np`                        | Conventional aliases                    | Cryptic aliases                     |
| `from module import name`          | Bind object from module       | `from pathlib import Path`                  | Frequently used names                   | Namespace ambiguity                 |
| `from module import name as alias` | Bind imported object to alias | `from datetime import datetime as DateTime` | Avoid conflict                          | Too many aliases                    |
| `from module import *`             | Import public names           | rarely appropriate                          | Interactive use or controlled re-export | Namespace pollution                 |
| Relative import                    | Import within package         | `from .utils import parse`                  | Package-internal references             | Running modules incorrectly         |

Imports execute module top-level code the first time the module is loaded in a process. This is crucial.

```python
# config.py
print("loading config")
```

```python
import config  # prints when first imported
```

Because import executes top-level code, modules should avoid heavy side effects at import time. Define functions, classes, constants, and lightweight setup. Put executable script behavior under:

```python
if __name__ == "__main__":
    main()
```

This pattern means: run `main()` only when the file is executed as a script, not when imported as a module.

Python caches imported modules in `sys.modules`. Re-importing usually retrieves the existing module object rather than executing the file again.

**Language-design note.** Python imports are dynamic runtime operations, not mere static include directives. This makes imports flexible and interactive, but also creates failure modes: circular imports, import-time side effects, environment-dependent paths, and ambiguous module names.

**Failure-first explanation.**

The tempting but wrong mental model is: import only makes names available, like a header include or static declaration. The surprising behavior is that importing a module runs its top-level code. The correct semantic explanation is that import loads, executes, caches, and binds module objects. The professional rule of thumb is: keep import-time behavior lightweight and deterministic; put executable behavior in functions and guard script entry points with `if __name__ == "__main__"`. The boundary where the rule changes is intentional plugin registration or framework initialization, which should be explicit and documented.

**Common Pitfalls.** Do not put heavy I/O, network calls, or process-starting behavior at import time. Do not use wildcard imports in normal modules. Do not create circular imports through poorly separated modules. Do not name local files after standard library modules such as `json.py`, `typing.py`, or `email.py`. Do not confuse package-relative imports with filesystem paths.

### Basic Exception Syntax — `try`, `except`, `else`, `finally`, `raise`

Python uses exceptions for error propagation. Exceptions are objects, and raising an exception interrupts normal control flow until a matching handler is found.

```python
def parse_user_id(raw: str) -> int:
    try:
        return int(raw)
    except ValueError as error:
        raise ValueError(f"invalid user id: {raw!r}") from error
```

| Construct          | Meaning                   | Syntax                           | Canonical example          | Design meaning                              | Practical consequence       | Common pitfall                       |
| ------------------ | ------------------------- | -------------------------------- | -------------------------- | ------------------------------------------- | --------------------------- | ------------------------------------ |
| `raise`            | Raise exception           | `raise ValueError(...)`          | invalid input              | Non-local failure                           | Clear failure signaling     | Raising vague exceptions             |
| `try`              | Protected block           | `try: ...`                       | parse/IO section           | Separates normal path from failure handling | Keeps recovery local        | Wrapping too much code               |
| `except`           | Handle matching exception | `except ValueError:`             | recover from parse failure | Type-based handling                         | Specific recovery           | Bare or broad `except`               |
| `except ... as e`  | Bind exception object     | `except OSError as e:`           | inspect failure            | Exceptions are objects                      | Access details              | Using exception outside needed scope |
| `else`             | Run if no exception       | `else: ...`                      | success-only follow-up     | Separates success path                      | Avoids catching too much    | Rarely used because misunderstood    |
| `finally`          | Always run cleanup        | `finally: ...`                   | release resource           | Cleanup guarantee                           | Runs during success/failure | Suppressing exceptions accidentally  |
| Exception chaining | Preserve cause            | `raise NewError(...) from error` | wrap lower-level error     | Maintains traceback context                 | Better diagnostics          | Losing root cause                    |

Catch specific exceptions at the boundary where recovery is meaningful.

```python
try:
    count = int(raw_count)
except ValueError:
    count = 0
```

Avoid broad catching:

```python
try:
    process()
except Exception:
    pass
```

This hides real failures.

`else` is useful when code should run only if the `try` block succeeded, without accidentally catching exceptions from the success code.

```python
try:
    value = parse(raw)
except ParseError as error:
    log_bad_input(error)
else:
    store(value)
```

`finally` is for cleanup, but context managers are usually better for resource management.

```python
file = open("data.txt", "r", encoding="utf-8")
try:
    text = file.read()
finally:
    file.close()
```

Prefer:

```python
with open("data.txt", "r", encoding="utf-8") as file:
    text = file.read()
```

**Language-design note.** Python’s exception model is flexible and pervasive. It avoids checked-exception ceremony but shifts responsibility to API design, documentation, tests, and careful handler placement. Exceptions should represent exceptional or failure conditions, not ordinary hidden control flow when a clearer return value would suffice.

**Failure-first explanation.**

The tempting but wrong mental model is: catching `Exception` makes code robust. The surprising behavior is that it often makes code less reliable by hiding programming errors, failed assumptions, bad state, and operational failures. The correct semantic explanation is that exception handling is a recovery boundary, not a blanket failure eraser. The professional rule of thumb is: catch the narrowest exception you can recover from, at the level where recovery makes sense. The boundary where the rule changes is process-level supervision, logging, test harnesses, or server request boundaries, where broad catching may be acceptable if it logs, isolates, and preserves diagnostic information.

**Common Pitfalls.** Do not use bare `except:` in ordinary application logic. Do not catch exceptions too early. Do not wrap too much code in one `try` block. Do not lose the original cause when re-raising; use `raise ... from error` when translating exceptions. Do not use exceptions as a substitute for ordinary validation flow when explicit checks are clearer.

### Context Manager Syntax — `with`, resource lifetime, cleanup protocol

The `with` statement manages setup and cleanup through the context manager protocol.

```python
with open("data.txt", "r", encoding="utf-8") as file:
    text = file.read()
```

This is roughly equivalent to entering a resource, executing the block, and guaranteeing exit behavior afterward, including when exceptions occur.

| Construct          | Meaning                           | Syntax                     | Canonical example    | Design meaning                           | Practical consequence           | Common pitfall                            |
| ------------------ | --------------------------------- | -------------------------- | -------------------- | ---------------------------------------- | ------------------------------- | ----------------------------------------- |
| `with`             | Enter managed context             | `with resource as name:`   | file handling        | Resource protocol                        | Cleanup is structured           | Forgetting context managers for resources |
| Context expression | Object providing manager behavior | `open(...)`                | file object          | Uses `__enter__`, `__exit__`             | Any object can manage resources | Assuming only files use `with`            |
| `as` target        | Value returned by `__enter__`     | `as file`                  | bound managed object | Entered value may differ from manager    | Clear local resource name       | Misunderstanding what is bound            |
| Multiple managers  | Nested resource management        | `with a() as x, b() as y:` | several resources    | Structured composition                   | Clean exit order                | Overlong `with` headers                   |
| Suppression        | `__exit__` may suppress exception | context-dependent          | rare                 | Protocol can control failure propagation | Powerful but dangerous          | Hiding errors unexpectedly                |

Context managers are used for files, locks, temporary directories, database transactions, decimal contexts, warning filters, tracing, and test utilities.

```python
from threading import Lock

lock = Lock()

with lock:
    update_shared_state()
```

The context manager protocol is one of Python’s most important examples of protocol-oriented design. The object does not need to inherit from a particular base class to be usable with `with`; it needs to provide the required behavior.

**Language-design note.** Python’s `with` statement gives resource management a language-level syntactic form while still using object protocols. It avoids relying on deterministic destruction as the normal cleanup model and makes resource lifetime visible in source structure.

**Failure-first explanation.**

The tempting but wrong mental model is: files close automatically when the function ends, so explicit resource management is optional. The surprising behavior is that resource release timing can vary across implementations or in the presence of reference cycles, exceptions, or long-lived objects. The correct semantic explanation is that cleanup should be tied to an explicit context manager, not assumed object destruction. The professional rule of thumb is: use `with` for files, locks, transactions, temporary resources, and any object with a meaningful acquire/release lifetime. The boundary where the rule changes is objects whose lifetime is intentionally managed by a larger owner, such as application-wide clients or pools.

**Common Pitfalls.** Do not rely on object destruction to close external resources. Do not write context managers that silently suppress exceptions unless that is the explicit API purpose. Do not place unrelated logic inside a `with` block after the resource is no longer needed. Do not forget that `as name` binds the value returned by `__enter__`, not necessarily the original manager object.

### Basic Iteration Primitives — iterables, iterators, `range`, `enumerate`, `zip`

Python iteration is protocol-based. A `for` loop asks an object for an iterator and repeatedly requests values until exhaustion.

```python
for line in file:
    process(line)
```

This works because file objects are iterable.

| Primitive                  | Meaning                             | Example                         | Best use                   | Common pitfall                        |
| -------------------------- | ----------------------------------- | ------------------------------- | -------------------------- | ------------------------------------- |
| Iterable                   | Object that can produce an iterator | `list`, `dict`, file, generator | Source of values           | Assuming all iterables can be reused  |
| Iterator                   | Object that produces next values    | `iter(items)`                   | Stateful traversal         | Reusing exhausted iterator            |
| `range`                    | Lazy integer sequence-like object   | `range(10)`                     | Counting loops             | Thinking it creates a list            |
| `enumerate`                | Pair index with values              | `enumerate(items)`              | Need index and item        | Manual index counters                 |
| `zip`                      | Parallel iteration                  | `zip(names, scores)`            | Pair corresponding values  | Silent truncation to shortest input   |
| `reversed`                 | Reverse iteration if supported      | `reversed(items)`               | Reverse traversal          | Assuming all iterables are reversible |
| `sorted`                   | Create sorted list                  | `sorted(items)`                 | Non-mutating sort          | Confusing with list `.sort()`         |
| `iter(callable, sentinel)` | Repeated call until sentinel        | `iter(file.readline, "")`       | Special streaming patterns | Obscure if overused                   |

Use direct iteration by default.

```python
for user in users:
    send_email(user)
```

Use `enumerate()` when index is needed.

```python
for index, user in enumerate(users, start=1):
    print(index, user.name)
```

Use `zip()` for parallel traversal.

```python
for name, score in zip(names, scores):
    print(name, score)
```

Be aware that `zip()` stops at the shortest iterable. In Python 3.10+, `zip(..., strict=True)` can detect mismatched lengths.

```python
for name, score in zip(names, scores, strict=True):
    print(name, score)
```

Iterators are consumable.

```python
it = iter([1, 2, 3])
list(it)  # [1, 2, 3]
list(it)  # []
```

This matters for generators, files, database cursors, streams, and many lazy APIs.

**Language-design note.** Iteration is one of Python’s core protocols. It allows loops, comprehensions, generator expressions, unpacking, `sum`, `list`, `tuple`, `any`, `all`, and many library functions to operate uniformly over many object types. The cost is that programmers must distinguish reusable containers from one-shot iterators.

**Failure-first explanation.**

The tempting but wrong mental model is: anything used in a `for` loop is like a list. The surprising behavior is that some iterables are one-shot and become exhausted. The correct semantic explanation is that iteration consumes an iterator, and some iterable objects return themselves as their own iterator. The professional rule of thumb is: if values must be traversed multiple times, know whether the object is a reusable collection or a consumable iterator; materialize with `list()` only when the size and memory cost are acceptable. The boundary where the rule changes is streaming code, where one-shot consumption is exactly the intended design.

**Common Pitfalls.** Do not use `range(len(items))` when direct iteration or `enumerate()` is clearer. Do not assume `zip()` validates equal lengths unless `strict=True` is used. Do not reuse exhausted iterators accidentally. Do not materialize large iterables into lists without considering memory. Do not mutate collections structurally while iterating unless deliberately controlled.

### Basic Data Conversion and Parsing — constructors, explicit conversion, coercion boundaries

Python generally prefers explicit conversion over silent coercion.

```python
count = int(raw_count)
price = float(raw_price)
label = str(value)
```

| Conversion | Meaning                            | Example           | Failure mode                   | Common pitfall                                       |
| ---------- | ---------------------------------- | ----------------- | ------------------------------ | ---------------------------------------------------- |
| `int(x)`   | Convert to integer                 | `int("42")`       | `ValueError`, `TypeError`      | Assuming all numeric-looking strings parse           |
| `float(x)` | Convert to float                   | `float("3.14")`   | `ValueError`, `TypeError`      | Using for exact decimal values                       |
| `str(x)`   | Text representation                | `str(42)`         | Rare, but custom code may fail | Confusing user-facing text with debug representation |
| `bool(x)`  | Truth-value conversion             | `bool([])`        | Usually no exception           | Treating as semantic validation                      |
| `list(x)`  | Materialize iterable               | `list(range(3))`  | `TypeError` if not iterable    | Materializing huge streams                           |
| `tuple(x)` | Immutable sequence materialization | `tuple(items)`    | `TypeError`                    | Assuming deep immutability                           |
| `set(x)`   | Unique elements                    | `set(items)`      | unhashable elements            | Losing order and duplicates                          |
| `dict(x)`  | Mapping construction               | `dict(pairs)`     | malformed pairs                | Silent key overwrite                                 |
| `bytes(x)` | Binary construction                | context-dependent | type-specific                  | Confusing text encoding with bytes construction      |

Parsing external data is not the same as converting trusted internal values.

```python
def parse_count(raw: str) -> int:
    try:
        value = int(raw)
    except ValueError as error:
        raise ValueError(f"invalid count: {raw!r}") from error

    if value < 0:
        raise ValueError("count must be non-negative")

    return value
```

This function both converts and validates.

Python’s strong typing prevents many implicit mixed-type operations:

```python
"count: " + 3  # TypeError
```

Use explicit conversion or formatting:

```python
f"count: {3}"
```

**Language-design note.** Python’s conversion model supports readability and avoids many weak-typing surprises. But it does not automatically validate domain correctness. Converting `"0"` to `0` is not the same as proving that `0` is acceptable in the domain.

**Failure-first explanation.**

The tempting but wrong mental model is: if `int(raw)` succeeds, the input is valid. The surprising behavior is that syntactic conversion may still produce a semantically invalid value, such as a negative age or unsupported enum code. The correct semantic explanation is that parsing and validation are separate tasks. The professional rule of thumb is: parse external representation into internal type, then validate domain constraints before using it in core logic. The boundary where the rule changes is trusted internal conversions, where full validation may be unnecessary.

**Common Pitfalls.** Do not use `bool("False")` expecting `False`; non-empty strings are truthy. Do not use `float` for exact decimal domains. Do not materialize iterables blindly. Do not treat conversion as complete validation. Do not silently coerce input at deep internal layers when the boundary should have rejected it earlier.

### String Formatting and Representation — f-strings, `repr`, `str`, formatting mini-language

String formatting is a common surface syntax feature with deeper object-model implications. Objects define how they become strings through representation protocols.

```python
name = "Ada"
count = 3
message = f"{name} has {count} messages"
```

| Mechanism       | Meaning                        | Example          | Best use                    | Common pitfall                           |
| --------------- | ------------------------------ | ---------------- | --------------------------- | ---------------------------------------- |
| f-string        | Inline expression formatting   | `f"{name=}"`     | Most modern formatting      | Complex expressions inside strings       |
| `str(obj)`      | User-facing text form          | `str(value)`     | Display                     | Assuming all objects have helpful `str`  |
| `repr(obj)`     | Debug/developer representation | `repr(value)`    | Logs, debugging             | Using `str` when `repr` shows ambiguity  |
| `!r` conversion | Use `repr` in f-string         | `f"{value!r}"`   | Diagnostics                 | Overusing in user-facing text            |
| Format spec     | Control presentation           | `f"{price:.2f}"` | Numbers, alignment, dates   | Formatting before preserving real value  |
| `.format()`     | Older flexible method          | `"{}".format(x)` | Legacy or dynamic templates | More verbose than f-strings              |
| `%` formatting  | Legacy formatting              | `"%s" % name`    | Logging internals, old code | Using in new ordinary code unnecessarily |

`repr` is often better for diagnostics because it reveals quotes and escapes.

```python
value = ""
print(f"value={value}")    # value=
print(f"value={value!r}")  # value=''
```

The f-string debug syntax is useful:

```python
count = 3
print(f"{count=}")  # count=3
```

Avoid placing complex logic inside f-strings.

```python
# Too much hidden work
message = f"{sorted(user.name.casefold() for user in users if user.active)[:10]}"
```

Prefer naming the computation:

```python
active_names = sorted(user.name.casefold() for user in users if user.active)
message = f"{active_names[:10]}"
```

**Language-design note.** String formatting delegates representation to objects. This reflects Python’s protocol design: display, debugging, logging, and formatting are object behaviors, not merely string operations.

**Failure-first explanation.**

The tempting but wrong mental model is: `str()` and `repr()` are interchangeable. The surprising behavior is that `str("")` is invisible while `repr("")` shows `''`; dates, paths, bytes, and custom objects may also differ. The correct semantic explanation is that `str` aims at readable display, while `repr` aims at unambiguous developer representation. The professional rule of thumb is: use `str` for user-facing output and `repr` or `!r` for debugging/logging ambiguous values. The boundary where the rule changes is custom classes whose `__str__` and `__repr__` are intentionally designed for domain-specific output.

**Common Pitfalls.** Do not put expensive or side-effecting expressions inside f-strings. Do not use user-facing formatting as stored data representation. Do not log ambiguous values without `repr`. Do not confuse formatting precision with numeric precision.

### Basic Annotations Syntax — variables, functions, classes, runtime metadata

Annotations are syntax for attaching type-like metadata to names, function parameters, return values, and class attributes.

```python
name: str = "Ada"
count: int
```

In functions:

```python
def repeat(text: str, times: int) -> str:
    return text * times
```

In classes:

```python
class User:
    id: int
    name: str
```

Annotations are important for modern Python, but their semantic status must be understood precisely.

| Annotation site   | Syntax                                               | Primary role                 | Runtime effect by default                 | Common pitfall                                         |
| ----------------- | ---------------------------------------------------- | ---------------------------- | ----------------------------------------- | ------------------------------------------------------ |
| Variable          | `x: int = 1`                                         | Tooling/readability          | Does not enforce type                     | Assuming assignment is checked                         |
| Parameter         | `name: str`                                          | Function contract            | Stored as metadata                        | Assuming calls are validated                           |
| Return            | `-> str`                                             | Return contract              | Stored as metadata                        | Returning wrong type without runtime error unless used |
| Class attribute   | `name: str`                                          | Data model/type checker hint | May affect libraries like `dataclasses`   | Confusing annotation with initialization               |
| Type alias        | `UserId = int` or newer alias syntax where supported | Naming type concepts         | Tooling-level meaning                     | Thinking alias creates new runtime type                |
| Forward reference | quoted or deferred annotation                        | Refer to later-defined type  | Tool-dependent/runtime-dependent behavior | Runtime introspection surprises                        |

An annotation alone does not assign a value.

```python
count: int
print(count)  # NameError if no binding exists
```

This declares an annotation in the local or module namespace but does not bind `count` to an integer object.

Annotations can be consumed by tools and libraries. For example, `dataclasses` uses class annotations to identify fields.

```python
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str
```

Here, annotations matter because the `@dataclass` decorator inspects them and generates methods.

**Language-design note.** Python annotations are deliberately layered on top of a dynamic runtime. This allows gradual adoption and ecosystem experimentation, but creates a sharp boundary: annotations are not enforcement unless a tool or library interprets them.

**Failure-first explanation.**

The tempting but wrong mental model is: `x: int` creates an integer variable. The surprising behavior is that `x: int` without a value may not bind `x` at all, and `x: int = "wrong"` still executes at runtime. The correct semantic explanation is that annotations attach metadata; they do not impose runtime storage or type enforcement by default. The professional rule of thumb is: use annotations to communicate and check intent with tools, but use explicit validation for runtime boundaries. The boundary where the rule changes is frameworks or decorators that intentionally read annotations and enforce or transform behavior.

**Common Pitfalls.** Do not treat annotations as runtime validation. Do not annotate everything mechanically if the annotation adds no information. Do not use `Any` as a default escape hatch. Do not confuse class attribute annotations with initialized instance attributes. Do not assume all type checkers interpret every advanced annotation identically.

### Basic Module Execution and Script Entry Points — top-level code, `__name__`, `main`

A Python file can be imported as a module or executed as a script. The same file behaves differently depending on execution context.

```python
def main() -> None:
    print("running")

if __name__ == "__main__":
    main()
```

When the file is executed directly, `__name__` is `"__main__"`. When imported, `__name__` is the module’s import name.

| Pattern                     | Meaning                           | Example               | Best use                  | Common pitfall                                |
| --------------------------- | --------------------------------- | --------------------- | ------------------------- | --------------------------------------------- |
| Top-level constants         | Define module-level configuration | `DEFAULT_TIMEOUT = 5` | Lightweight definitions   | Computed from external systems at import time |
| Top-level functions/classes | Define reusable API               | `def parse(...):`     | Normal module structure   | None                                          |
| Top-level executable code   | Runs during import                | `print("start")`      | Rare, small scripts       | Import side effects                           |
| `main()` function           | Script entry logic                | `def main(): ...`     | Testable script structure | Putting all logic directly under guard        |
| `if __name__ == "__main__"` | Direct-execution guard            | call `main()`         | Avoid import execution    | Forgetting it in script-like modules          |

The `main()` pattern makes code easier to test.

```python
def main(argv: list[str] | None = None) -> int:
    ...

if __name__ == "__main__":
    raise SystemExit(main())
```

Returning an exit code and using `SystemExit` is common in command-line programs.

**Language-design note.** Python’s module system allows files to serve as both reusable modules and executable scripts. This is convenient, but it makes top-level code significant. Professional modules should be import-safe unless explicitly designed otherwise.

**Failure-first explanation.**

The tempting but wrong mental model is: code at the top of a Python file only runs when the file is the main program. The surprising behavior is that top-level code runs during import. The correct semantic explanation is that import executes the module body to create the module object. The professional rule of thumb is: keep import-time code declarative and lightweight; put executable behavior in `main()` behind the `__name__` guard. The boundary where the rule changes is intentional module initialization, such as registering plugins, defining constants, or configuring package-level APIs.

**Common Pitfalls.** Do not parse command-line arguments at import time. Do not start threads, connect to databases, or perform network calls merely because a module was imported. Do not make reusable modules print output at import time. Do not bury testable logic directly inside the `if __name__ == "__main__"` block.

### Minimal Built-in Function Reference — reading common Python source

A reader of Python code needs immediate recognition of common built-ins. Full standard-library coverage belongs in PART 6, but these built-ins are core source-reading vocabulary.

| Built-in       | Core meaning                 | Example                     | Design meaning                     | Common pitfall                                |
| -------------- | ---------------------------- | --------------------------- | ---------------------------------- | --------------------------------------------- |
| `len`          | Size protocol                | `len(items)`                | Delegates to object behavior       | Assuming constant cost for all objects        |
| `range`        | Integer range object         | `range(10)`                 | Lazy sequence-like object          | Thinking it creates a list                    |
| `enumerate`    | Index-value iteration        | `enumerate(items)`          | Iteration helper                   | Manual counters                               |
| `zip`          | Parallel iteration           | `zip(a, b)`                 | Iteration composition              | Silent truncation without `strict=True`       |
| `sum`          | Add values                   | `sum(values)`               | Aggregation                        | Using for string concatenation                |
| `min`, `max`   | Extremes                     | `min(values)`               | Ordering/key protocol              | Empty iterable without default                |
| `any`, `all`   | Boolean aggregation          | `any(flags)`                | Short-circuit truthiness           | Confusing values with booleans                |
| `sorted`       | Return sorted list           | `sorted(items)`             | Non-mutating ordering              | Confusing with `.sort()`                      |
| `reversed`     | Reverse iterator             | `reversed(seq)`             | Reverse protocol                   | Not all iterables reversible                  |
| `isinstance`   | Runtime type check           | `isinstance(x, str)`        | Nominal/ABC runtime check          | Overusing instead of protocols                |
| `issubclass`   | Class relationship check     | `issubclass(C, Base)`       | Runtime class relation             | Misusing with non-class objects               |
| `callable`     | Supports call syntax         | `callable(obj)`             | Call protocol                      | Does not prove call will succeed semantically |
| `getattr`      | Dynamic attribute access     | `getattr(obj, name)`        | Reflection                         | Hiding normal attribute access                |
| `setattr`      | Dynamic attribute assignment | `setattr(obj, name, value)` | Runtime mutation                   | Breaking static analyzability                 |
| `hasattr`      | Attribute existence check    | `hasattr(obj, name)`        | Reflection with exception behavior | Masking property errors                       |
| `iter`, `next` | Iterator protocol            | `next(iterator)`            | Manual iteration                   | Forgetting `StopIteration`                    |
| `open`         | Open file/resource           | `open(path)`                | Context manager source             | Not using `with`                              |
| `print`        | Text output to stream        | `print(value)`              | Debug/simple CLI output            | Using instead of logging in applications      |
| `repr`         | Developer representation     | `repr(value)`               | Representation protocol            | Confusing with user-facing string             |

These built-ins work by using protocols. For example, `len(obj)` calls the size protocol, `iter(obj)` calls the iteration protocol, and `repr(obj)` calls the representation protocol. This is why Python often uses functions like `len(x)` rather than methods like `x.length()`.

**Language-design note.** Python built-ins are not random global utilities. Many are canonical protocol front doors. They give the language a uniform vocabulary across built-in and user-defined objects.

**Failure-first explanation.**

The tempting but wrong mental model is: built-ins are just convenience functions. The surprising behavior is that custom objects can participate in `len`, `iter`, `repr`, `sorted`, `in`, and other operations by implementing protocols. The correct semantic explanation is that built-ins often delegate to special methods. The professional rule of thumb is: prefer canonical built-ins when they express a standard protocol; define protocol methods on custom objects when integration with Python syntax genuinely improves clarity. The boundary where the rule changes is domain-specific APIs where explicit methods communicate intent better than generic protocol participation.

**Common Pitfalls.** Do not shadow built-ins. Do not use `print` as application logging. Do not overuse reflection built-ins for ordinary static attribute access. Do not assume `isinstance` is always better than behavioral design. Do not forget that `sorted()` returns a new list while `list.sort()` mutates in place.

### Primitive Semantic Cross-Reference — how the basics connect

Python’s primitive syntax is unified by a few semantic ideas: binding, object identity, protocol dispatch, dynamic lookup, truthiness, exceptions, and namespace execution.

| Surface feature        | Underlying semantic idea                         | Later deep treatment |
| ---------------------- | ------------------------------------------------ | -------------------- |
| Assignment             | Name-object binding                              | PART 7               |
| List/dict/set mutation | Object state and aliasing                        | PART 3, PART 7       |
| `is`                   | Object identity                                  | PART 3, PART 7       |
| `==`                   | Equality protocol                                | PART 3, PART 7       |
| `if x`                 | Truthiness protocol                              | PART 3, PART 7       |
| `for x in xs`          | Iteration protocol                               | PART 4, PART 7       |
| `with x as y`          | Context manager protocol                         | PART 5, PART 7       |
| Function call          | Callable protocol and frame execution            | PART 4, PART 7       |
| Method call            | Attribute lookup and descriptor binding          | PART 4, PART 7       |
| Class definition       | Runtime class object creation                    | PART 4, PART 7       |
| Import                 | Module execution, caching, namespace binding     | PART 5, PART 7       |
| Exception handling     | Non-local control flow with exception objects    | PART 5, PART 7       |
| Annotation             | Runtime metadata plus static-tool interpretation | PART 3, PART 9       |
| Pattern matching       | Structural pattern semantics                     | PART 4, PART 7       |

This table is not a summary in the sense of closing the topic; it is a map of dependencies. The constructs introduced in PART 2 will be reinterpreted later through data modeling, abstraction design, boundary management, standard-library practice, runtime semantics, and professional workflow.

### Common Primitive Anti-Patterns — syntax-level habits that scale badly

Some mistakes begin as small syntax choices but become design failures in larger systems.

| Anti-pattern                   | Looks like                                        | Why it fails                               | Better pattern                                                      |
| ------------------------------ | ------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Mutable default argument       | `def f(xs=[]):`                                   | Shared state across calls                  | `None` sentinel plus internal creation                              |
| Broad exception swallowing     | `except Exception: pass`                          | Hides real failure                         | Catch specific exceptions and log or recover                        |
| Import-time execution          | network call at module top level                  | Makes import unsafe and order-dependent    | Put execution in `main()` or explicit initializer                   |
| Built-in shadowing             | `list = []`                                       | Breaks later calls and reader expectations | Use domain-specific names                                           |
| Overdense comprehension        | nested filtering/transformation with side effects | Hard to debug and read                     | Use explicit loop or named helper                                   |
| Truthiness abuse               | `if value:` for optional numeric input            | Collapses distinct states                  | Use `is None` or explicit comparison                                |
| Identity comparison for values | `x is "ok"`                                       | Relies on object identity, not value       | `x == "ok"`                                                         |
| Accidental class shared state  | mutable class attribute                           | Shared across instances                    | Initialize mutable instance state in `__init__`                     |
| Wildcard imports               | `from module import *`                            | Pollutes namespace and hides origin        | Import module or explicit names                                     |
| Reflection overuse             | `getattr(obj, name)` everywhere                   | Weakens readability/tooling                | Prefer explicit attribute access unless dynamic access is essential |
| Annotation-as-validation       | trusting `x: int` for external input              | No runtime enforcement                     | Parse and validate input explicitly                                 |

These are not style nitpicks. They follow directly from Python’s design: dynamic binding, runtime execution, object mutability, protocol dispatch, and convention-based boundaries.
## PART 3 — Data, Types, and Modeling Reference by Task Pattern

### Modeling First: Python Data Design as Representation Choice — values, objects, records, protocols, validation

Python data modeling is not primarily about choosing syntax. It is about choosing the right **representation** for a domain concept under Python’s dynamic object model, mutable containers, protocol-oriented APIs, optional static typing, and runtime validation boundaries.

A Python value may be represented as a scalar, tuple, dictionary, dataclass, class instance, enum, typed dictionary, protocol, collection, external schema object, or library model. Each choice expresses a different tradeoff among simplicity, safety, mutability, readability, validation, API stability, runtime cost, and tooling support.

| Modeling need                | Common Python representation          | Why it fits                                  | Cost introduced                    | Typical pitfall                              |                                   |
| ---------------------------- | ------------------------------------- | -------------------------------------------- | ---------------------------------- | -------------------------------------------- | --------------------------------- |
| Single primitive value       | `str`, `int`, `float`, `bool`, `None` | Simple and direct                            | Weak domain distinction            | Confusing raw type with domain concept       |                                   |
| Small fixed grouping         | `tuple` or `NamedTuple`               | Lightweight, immutable-ish grouping          | Positional meaning can be unclear  | Using bare tuples for complex domain records |                                   |
| Flexible key-value data      | `dict`                                | Natural for JSON-like or dynamic data        | Weak structure and typo risk       | Passing raw dicts deep into core logic       |                                   |
| Structured plain data        | `dataclass`                           | Low-boilerplate named fields                 | Runtime validation not automatic   | Assuming annotations enforce invariants      |                                   |
| Runtime domain object        | Custom class                          | Encapsulates behavior, invariants, lifecycle | More design responsibility         | Overengineering simple records               |                                   |
| Finite set of states         | `Enum`, `Literal`, strings            | Constrains vocabulary                        | Different runtime/static tradeoffs | Using raw strings everywhere                 |                                   |
| Optional value               | `T                                    | None`                                        | Standard absence model             | Must handle explicitly                       | Treating falsey values as missing |
| External/untrusted data      | Parser/validator layer                | Separates boundary from core model           | Extra code/tooling                 | Trusting annotations or JSON shape           |                                   |
| Behavioral abstraction       | `Protocol`, ABC, duck typing          | Models capability rather than ancestry       | Contracts may be implicit          | Overusing inheritance                        |                                   |
| Large homogeneous collection | `list[T]`, `set[T]`, `dict[K, V]`     | Built-in, idiomatic                          | Mutation and aliasing              | Exposing mutable internals                   |                                   |

Python’s central data-modeling question is often:

**Is this data still external representation, or has it been parsed into trusted internal domain form?**

This distinction matters more than many surface type choices. A `dict[str, object]` loaded from JSON is not the same thing as a validated `UserConfig` dataclass, even if both contain similar information.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class UserConfig:
    user_id: int
    display_name: str
    active: bool
```

The dataclass above expresses an internal model. It does not by itself validate arbitrary external data. It gives structure once construction is trusted or guarded.

**Language-design meaning.** Python gives many lightweight representation options. That flexibility is a strength for incremental modeling, but it also means the language will not force a clean boundary between raw input, parsed data, validated domain state, and public API contracts. Professional code must create those boundaries deliberately.

**Common Pitfalls.** Do not let raw dictionaries from JSON, CLI input, environment variables, databases, or HTTP requests spread through core logic. Do not assume type annotations validate constructor arguments. Do not create custom classes before confirming that a dataclass, tuple, enum, or simple function would not be clearer. Do not represent every domain distinction as a bare `str` or `int` when mistakes would be costly.

### Choosing the Right Collection — list, tuple, dict, set, deque, Counter, defaultdict

Python’s built-in collections are central data-modeling tools. Choosing among them is a semantic decision, not merely a performance decision.

| Task                             | Construct/API                  | When to use                           | Design meaning                        | Practical consequence                          | Common pitfall                                    |
| -------------------------------- | ------------------------------ | ------------------------------------- | ------------------------------------- | ---------------------------------------------- | ------------------------------------------------- |
| Ordered variable-length sequence | `list[T]`                      | Items have order and may change       | Mutable sequence                      | Simple and flexible                            | Shared mutation and accidental modification       |
| Fixed-size grouping              | `tuple[T, ...]` or fixed tuple | Values belong together structurally   | Immutable sequence-like grouping      | Hashable if elements are hashable              | Positional fields become unclear                  |
| Key-value lookup                 | `dict[K, V]`                   | Need mapping from keys to values      | Hash table mapping                    | Fast average lookup                            | Missing-key handling and key mutability           |
| Unique membership                | `set[T]`                       | Need uniqueness or membership testing | Hash table set                        | Fast average membership                        | Losing order and duplicates                       |
| Immutable set                    | `frozenset[T]`                 | Need hashable set-like value          | Immutable membership group            | Can be dict key/set member                     | Less ergonomic construction                       |
| Queue/deque                      | `collections.deque[T]`         | Efficient append/pop at both ends     | Double-ended queue                    | Good for BFS, queues, buffers                  | Using list `pop(0)` repeatedly                    |
| Counting                         | `collections.Counter[T]`       | Count occurrences                     | Multiset-like mapping                 | Clear frequency logic                          | Treating missing counts like normal dict mistakes |
| Grouping/default containers      | `collections.defaultdict`      | Build containers by key               | Mapping with factory                  | Removes repetitive missing-key code            | Accidental key creation on read                   |
| Ordered specialized mapping      | `dict` usually enough          | Modern dict preserves insertion order | Ordered mapping by language guarantee | `OrderedDict` needed only for special behavior | Using `OrderedDict` by outdated habit             |

Basic collection choice:

```python
users: list[str] = ["ada", "grace", "linus"]
allowed_roles: set[str] = {"admin", "editor", "viewer"}
user_email: dict[int, str] = {1: "ada@example.com"}
point: tuple[int, int] = (10, 20)
```

Use `list` when order and mutation are natural. Use `tuple` when the grouping is fixed and positional. Use `dict` when lookup by key is primary. Use `set` when membership or uniqueness is primary.

A common performance and semantics mistake is using a list for membership checks where a set is intended.

```python
blocked_ids = {1001, 1002, 1003}

if user_id in blocked_ids:
    reject(user_id)
```

This expresses the domain more clearly and is usually faster than scanning a list.

For queue-like operations, prefer `deque`:

```python
from collections import deque

queue: deque[str] = deque(["root"])

while queue:
    node = queue.popleft()
```

Using `list.pop(0)` repeatedly shifts elements and is inefficient.

For counting:

```python
from collections import Counter

counts = Counter(words)
most_common = counts.most_common(10)
```

For grouping:

```python
from collections import defaultdict

groups: defaultdict[str, list[str]] = defaultdict(list)

for user in users:
    groups[user.team].append(user.name)
```

`defaultdict` is useful, but it can create keys simply by reading them.

```python
groups["missing"]  # creates "missing": [] if absent
```

If accidental key creation is a problem, use normal `dict` with `.get()` or explicit checks.

**Data modeling option × strength × cost.**

| Option        | Strength                        | Cost                            | Best use                               |
| ------------- | ------------------------------- | ------------------------------- | -------------------------------------- |
| `list`        | Simple ordered mutable sequence | Aliasing and mutation risk      | Ordered collections that change        |
| `tuple`       | Lightweight fixed grouping      | Weak field names unless obvious | Small structural return values         |
| `dict`        | Flexible mapping                | Shape not enforced              | Lookup tables, JSON-like boundary data |
| `set`         | Uniqueness and fast membership  | Unordered semantics             | Membership filters, deduplication      |
| `deque`       | Efficient end operations        | Less general than list          | Queues, BFS, sliding windows           |
| `Counter`     | Frequency modeling              | Specialized mapping behavior    | Counts, histograms, multisets          |
| `defaultdict` | Concise grouping/aggregation    | Accidental key creation         | Building maps incrementally            |

**Failure-first explanation.**

The tempting but wrong mental model is: lists are Python’s default collection for everything. The surprising behavior is that list-based membership, queue operations, deduplication, and grouping can become inefficient or semantically unclear. The correct semantic explanation is that each collection encodes a different protocol and cost model. The professional rule of thumb is: choose the collection whose operations express the domain: sequence, mapping, set membership, queue, count, or group. The boundary where the rule changes is very small code or one-off scripts, where simplicity may matter more than perfect representation.

**Common Pitfalls.** Do not use lists for large repeated membership checks. Do not use `list.pop(0)` for queues. Do not use bare tuples for records whose fields are not obvious. Do not let `defaultdict` create keys accidentally in code paths that are supposed to be read-only. Do not assume dictionaries reject duplicate keys; later values overwrite earlier ones.

### Representing Optional or Missing Values — `None`, sentinels, defaults, nullable fields

Python’s standard absence value is `None`. In modern annotations, an optional value is written as `T | None`.

```python
def find_user(user_id: int) -> User | None:
    ...
```

This means the function may return a `User`, or it may return `None`.

| Absence pattern               | Construct                         | When to use                                    | Design meaning                        | Pitfall                                  |                             |
| ----------------------------- | --------------------------------- | ---------------------------------------------- | ------------------------------------- | ---------------------------------------- | --------------------------- |
| Standard absence              | `None`                            | Ordinary missing value                         | Explicit null-like singleton          | Confusing with falsey values             |                             |
| Optional annotation           | `T                                | None`                                          | Static expression of possible absence | Tool-visible nullable contract           | Forgetting to handle `None` |
| Default fallback              | `x if x is not None else default` | Only `None` means missing                      | Preserves falsey valid values         | Using `x or default` incorrectly         |                             |
| Custom sentinel               | `MISSING = object()`              | Need distinguish omitted from `None`           | Unique identity marker                | Exposing sentinel accidentally           |                             |
| Exception instead of optional | `raise NotFoundError`             | Missing is exceptional or requires explanation | Non-local failure                     | Using exceptions for normal lookup noise |                             |
| Empty collection              | `[]`, `{}`, `set()`               | No elements, not missing                       | Known empty result                    | Treating empty as absent                 |                             |
| `dict.get()`                  | Optional mapping lookup           | Missing key may return default                 | Compact lookup                        | Ambiguous when value may be `None`       |                             |

Use `is None`, not truthiness, when absence specifically matters.

```python
def display_name(name: str | None) -> str:
    if name is None:
        return "anonymous"
    return name
```

This preserves empty string as an explicit value.

```python
display_name("")  # ""
```

The common fallback idiom:

```python
name = provided_name or "anonymous"
```

is correct only if every falsey value should trigger the default. It treats `""` as missing.

When `None` is a valid explicit value or when a function must distinguish omitted from provided, use a sentinel.

```python
MISSING = object()

def update_name(user_id: int, name: str | None | object = MISSING) -> None:
    if name is MISSING:
        return
    # name was explicitly provided, possibly as None
```

A cleaner public version may hide the sentinel in an internal implementation, because sentinel-heavy signatures can be awkward for users and type checkers.

`dict.get()` also needs care.

```python
value = settings.get("timeout")
```

This cannot distinguish a missing key from a key explicitly mapped to `None`. Use an explicit sentinel if the distinction matters.

```python
MISSING = object()
value = settings.get("timeout", MISSING)

if value is MISSING:
    ...
```

**Design meaning.** Python does not have a separate `Option` or `Maybe` type in the standard language core. It uses `None`, exceptions, sentinels, and conventions. Static typing can express optionality, but runtime handling remains explicit programmer responsibility.

**Failure-first explanation.**

The tempting but wrong mental model is: `if not value` is a good missing-value check. The surprising behavior is that `0`, `False`, `""`, `[]`, `{}`, and `None` all pass the same falsey test. The correct semantic explanation is that truthiness collapses many distinct states. The professional rule of thumb is: use `is None` for absence, use truthiness for emptiness only when all falsey values are semantically equivalent. The boundary where the rule changes is APIs intentionally designed around falsey fallback semantics, such as simple display defaults.

**Common Pitfalls.** Do not use `x or default` when `0`, `False`, or `""` are valid values. Do not return `None` for many unrelated failure reasons without documenting them. Do not use a public sentinel unless the API genuinely needs it. Do not confuse an empty collection with a missing result. Do not forget that type checkers require explicit narrowing before treating `T | None` as `T`.

### Modeling Structured Data — `dict`, `tuple`, `NamedTuple`, `dataclass`, class, attrs/Pydantic-style models

Structured data is where Python’s flexibility becomes both useful and dangerous. The same domain record can be represented in several ways.

Assume a user record with an identifier, email, and active flag.

```python
raw_user = {"id": 1, "email": "ada@example.com", "active": True}
```

A dictionary is convenient, but weakly structured. A typo may silently create a new key or fail late.

```python
raw_user["emial"]  # KeyError, possibly far from input boundary
```

A dataclass gives named fields and a more explicit internal representation.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class User:
    id: int
    email: str
    active: bool
```

Now the structure is visible in code, tools can reason about it, and object construction is explicit.

| Representation             | When to use                                           | Strength                              | Cost                           | Common failure mode                        |
| -------------------------- | ----------------------------------------------------- | ------------------------------------- | ------------------------------ | ------------------------------------------ |
| `dict`                     | External data, dynamic mappings, JSON-like boundaries | Flexible and direct                   | Weak schema, typo risk         | Raw dictionaries spread through core logic |
| Bare `tuple`               | Tiny obvious grouping                                 | Lightweight                           | Positional ambiguity           | Misordered fields                          |
| `NamedTuple`               | Immutable record with tuple compatibility             | Field names plus tuple behavior       | Still tuple-like               | Overusing when dataclass is clearer        |
| `dataclass`                | Ordinary structured data                              | Low boilerplate, readable fields      | Validation not automatic       | Assuming annotations enforce runtime types |
| `dataclass(frozen=True)`   | Immutable-style record                                | Reduces accidental mutation           | Not deep immutability          | Mutating nested mutable fields             |
| Custom class               | Behavior, invariants, lifecycle                       | Encapsulation and methods             | More boilerplate/design        | Overengineering passive data               |
| `TypedDict`                | Typed shape for dictionaries                          | Static checking for dict-like records | Runtime is still dict          | Treating it as validation                  |
| attrs/Pydantic-style model | Rich validation/conversion/features                   | Stronger boundary modeling            | External dependency/complexity | Using framework models everywhere          |

A bare tuple can be appropriate when the structure is conventional and local:

```python
def bounds(values: list[int]) -> tuple[int, int]:
    return min(values), max(values)
```

But for non-obvious fields, prefer named structure.

```python
from typing import NamedTuple

class Bounds(NamedTuple):
    lower: int
    upper: int
```

For most ordinary application data, `dataclass` is a strong default.

```python
from dataclasses import dataclass

@dataclass
class OrderLine:
    sku: str
    quantity: int
    unit_price: int
```

But a dataclass is not a validator.

```python
line = OrderLine(sku=123, quantity="many", unit_price=None)
```

This may execute unless additional validation or tooling is used. Type checkers may reject it statically, but runtime Python does not enforce annotations.

Use a custom class when invariants and behavior are central.

```python
class Quantity:
    def __init__(self, value: int) -> None:
        if value <= 0:
            raise ValueError("quantity must be positive")
        self.value = value
```

For many systems, a better design is to validate at boundaries and keep internal dataclasses simple. For domains with complex external data, dedicated validation libraries may be appropriate, but they should not replace clear domain modeling.

**Task-pattern decision table.**

| Task                                | Best starting point             | Move to stronger model when          | Avoid                                          |
| ----------------------------------- | ------------------------------- | ------------------------------------ | ---------------------------------------------- |
| Pass around raw JSON                | `dict[str, object]` at boundary | Data enters core logic               | Deep raw dict access                           |
| Return two obvious values           | `tuple`                         | Fields need names                    | Magic positional tuples                        |
| Represent passive domain record     | `dataclass`                     | Need validation/lifecycle            | Manual boilerplate class too early             |
| Represent immutable internal record | `dataclass(frozen=True)`        | Need hashability or mutation control | Assuming deep immutability                     |
| Represent behavior-rich concept     | Custom class                    | Invariants and methods matter        | Anemic class wrapping one field without reason |
| Type a dict shape                   | `TypedDict`                     | Runtime validation is separate       | Treating it as a runtime schema                |
| Parse untrusted data                | Validation layer/model          | Boundary is complex                  | Trusting annotations                           |

**Failure-first explanation.**

The tempting but wrong mental model is: a dataclass is like a statically checked struct. The surprising behavior is that runtime construction may accept values with the wrong types. The correct semantic explanation is that `dataclass` generates methods from annotations; it does not enforce those annotations as runtime type checks by default. The professional rule of thumb is: use dataclasses for internal structure; use type checkers for static consistency; use validators/parsers at external boundaries. The boundary where the rule changes is when a library or custom `__post_init__` explicitly performs runtime validation.

**Common Pitfalls.** Do not pass raw dictionaries throughout the application after parsing. Do not use positional tuples for domain data with unclear field meaning. Do not assume `frozen=True` makes nested objects immutable. Do not confuse `TypedDict` with runtime validation. Do not create heavy custom classes for simple passive records unless invariants or behavior justify them.

### Modeling Finite States and Variants — `Enum`, `Literal`, tagged data, pattern matching

Finite states appear in statuses, modes, commands, roles, event types, protocol messages, and domain workflows. Python offers several representation options, each with different runtime and static tradeoffs.

| Representation     | Example                          | Best use                          | Strength                            | Pitfall                             |
| ------------------ | -------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------- |
| Raw string         | `"pending"`                      | Very small/local code             | Simple, serializable                | Typos and invalid states            |
| Constants          | `PENDING = "pending"`            | Small modules/APIs                | Central names                       | Still raw strings                   |
| `Literal`          | `Literal["pending", "done"]`     | Static API precision              | Type-checker-visible finite values  | No runtime enforcement              |
| `Enum`             | `Status.PENDING`                 | Runtime finite domain             | Explicit members, safer comparisons | Serialization friction              |
| `StrEnum`          | string-like enum                 | APIs needing string compatibility | Better interop with string domains  | Still needs clear boundary handling |
| Tagged dict        | `{"type": "open", ...}`          | JSON-like variant data            | Natural external representation     | Runtime shape not enforced          |
| Dataclass variants | subclasses or tagged dataclasses | Internal structured variants      | Clear domain modeling               | More code                           |
| Pattern matching   | `match event:`                   | Branch by structure               | Declarative structural handling     | Capture-pattern mistakes            |

For runtime finite states, `Enum` is often clearer than raw strings.

```python
from enum import Enum

class Status(Enum):
    PENDING = "pending"
    ACTIVE = "active"
    DISABLED = "disabled"
```

Use it like this:

```python
def can_login(status: Status) -> bool:
    return status is Status.ACTIVE
```

For string interoperability, modern Python provides string-oriented enum support.

```python
from enum import StrEnum

class Role(StrEnum):
    ADMIN = "admin"
    EDITOR = "editor"
    VIEWER = "viewer"
```

`Literal` is useful for static precision without creating a runtime enum.

```python
from typing import Literal

Mode = Literal["read", "write", "append"]

def open_resource(path: str, mode: Mode) -> None:
    ...
```

But `Literal` does not prevent bad runtime calls by itself.

```python
open_resource("data.txt", "destroy")  # runtime call still happens unless checked
```

A common modeling task is representing variants. For external JSON-like events:

```python
event = {"type": "user_created", "id": 42, "email": "ada@example.com"}
```

For internal structured events, dataclasses are clearer:

```python
from dataclasses import dataclass
from typing import Union

@dataclass(frozen=True)
class UserCreated:
    id: int
    email: str

@dataclass(frozen=True)
class UserDisabled:
    id: int
    reason: str

UserEvent = UserCreated | UserDisabled
```

Then pattern matching can express structure:

```python
def describe_event(event: UserEvent) -> str:
    match event:
        case UserCreated(id=user_id, email=email):
            return f"created {user_id}: {email}"
        case UserDisabled(id=user_id, reason=reason):
            return f"disabled {user_id}: {reason}"
```

Python does not provide Rust/Haskell-style algebraic data types as a core enforced system. It provides classes, unions in annotations, dataclasses, enums, and pattern matching. Exhaustiveness checking depends on tools and is not a universal runtime guarantee.

**Failure-first explanation.**

The tempting but wrong mental model is: raw strings are enough for statuses because they are simple. The surprising behavior is that typos, unsupported states, and inconsistent capitalization spread through the system. The correct semantic explanation is that a finite domain should usually be represented by a finite vocabulary, not arbitrary text. The professional rule of thumb is: use raw strings at external boundaries, `Literal` for small statically checked APIs, and `Enum` or structured variants when the state is a domain concept. The boundary where the rule changes is thin glue code or one-off scripts where extra modeling would add noise.

**Common Pitfalls.** Do not represent important domain states as unconstrained strings across a large codebase. Do not assume `Literal` validates runtime values. Do not compare enum members accidentally to raw strings unless using a string-compatible design intentionally. Do not expect Python pattern matching to provide complete exhaustiveness guarantees by default. Do not use `Enum` when a simple boolean or small local constant would be clearer.

### Modeling Domain Concepts — primitive obsession, newtypes by convention, value objects

Python makes it easy to pass around raw primitives. That is productive at first, but it can lead to **primitive obsession**: representing domain concepts as plain `str`, `int`, or `float` even when the domain distinction matters.

```python
def transfer(from_account: str, to_account: str, amount: int) -> None:
    ...
```

This is simple, but all three values are weakly distinguished. The function cannot tell whether `from_account` and `to_account` are swapped, whether `amount` is in cents or dollars, or whether the account string is validated.

A stronger model introduces domain names and validation.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class AccountId:
    value: str

@dataclass(frozen=True)
class Money:
    cents: int

    def __post_init__(self) -> None:
        if self.cents < 0:
            raise ValueError("money cannot be negative")
```

Then:

```python
def transfer(from_account: AccountId, to_account: AccountId, amount: Money) -> None:
    ...
```

This is more code, but the meaning is clearer.

| Domain modeling option        | Use when                                       | Strength                    | Cost                              | Failure mode                         |
| ----------------------------- | ---------------------------------------------- | --------------------------- | --------------------------------- | ------------------------------------ |
| Raw primitive                 | Concept is obvious/local/low-risk              | Minimal overhead            | Weak distinction                  | Swapped values, invalid states       |
| Type alias                    | Need readability only                          | Cheap documentation         | No runtime distinction            | False sense of safety                |
| `NewType`                     | Need static distinction over same runtime type | Type checker catches mixups | Runtime is still underlying value | Assuming runtime wrapper             |
| Frozen dataclass value object | Need runtime distinction/invariants            | Clear domain object         | More code/object overhead         | Overmodeling trivial values          |
| Custom class                  | Need behavior and invariants                   | Strong encapsulation        | Boilerplate/design cost           | Excess abstraction                   |
| Validation function           | Need boundary checks without new type          | Simple                      | Discipline required               | Validated and unvalidated values mix |

`typing.NewType` can distinguish concepts statically while remaining cheap at runtime.

```python
from typing import NewType

UserId = NewType("UserId", int)
OrderId = NewType("OrderId", int)

def load_user(user_id: UserId) -> None:
    ...
```

A type checker can distinguish `UserId` from `OrderId`, but at runtime the value behaves like the underlying `int`.

Use `NewType` when static distinction is valuable and runtime behavior does not need to change. Use a value object when runtime validation, methods, or representation matter.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class EmailAddress:
    value: str

    def __post_init__(self) -> None:
        if "@" not in self.value:
            raise ValueError("invalid email address")
```

This is still a simplified validator; real email validation may be more complex. The point is modeling: once an `EmailAddress` exists, the rest of the program can treat it as more trustworthy than an arbitrary string.

**Design meaning.** Python does not force domain modeling. It makes raw primitives easy and domain objects optional. This is excellent for scripts and exploratory work, but large systems need deliberate representation choices.

**Failure-first explanation.**

The tempting but wrong mental model is: since Python is dynamic, domain-specific wrappers are unnecessary. The surprising behavior is that large codebases accumulate swapped IDs, invalid strings, unit mistakes, and unclear APIs. The correct semantic explanation is that dynamic typing reduces ceremony but does not remove domain distinctions. The professional rule of thumb is: model concepts explicitly when invalid states are common, mistakes are costly, or APIs are public. The boundary where the rule changes is small local code where a wrapper adds more noise than safety.

**Common Pitfalls.** Do not wrap every primitive automatically. Do not use type aliases as if they create runtime distinctions. Do not use `NewType` when runtime validation is needed. Do not create domain objects without clear invariants or behavioral payoff. Do not mix validated and unvalidated primitive values under the same name.

### Constraining Input — parsing, validation, normalization, internal invariants

Input constraints are not the same as type annotations. Python requires explicit parsing and validation when values come from outside trusted code.

External input includes command-line arguments, environment variables, JSON, YAML, HTTP requests, forms, files, databases, message queues, subprocess output, user input, and plugin data.

| Boundary             | Raw type often seen           | Required work                                    | Common pitfall                                               |                                                           |
| -------------------- | ----------------------------- | ------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------------- |
| CLI argument         | `str`                         | parse, validate, normalize                       | Assuming argument parser type conversion covers domain rules |                                                           |
| Environment variable | `str                          | None`                                            | handle missing, parse, validate                              | Treating empty string and missing as same unintentionally |
| JSON                 | `dict`, `list`, scalar values | shape validation, type checks, domain validation | Trusting JSON shape                                          |                                                           |
| Database row         | driver-specific values        | map to domain model                              | Letting persistence schema leak everywhere                   |                                                           |
| HTTP request         | strings, bytes, JSON          | parse, authenticate, validate, authorize         | Mixing parsing with business logic                           |                                                           |
| File path            | `str` or `Path`               | normalize, permission/security checks            | Path traversal or wrong base directory                       |                                                           |
| Subprocess output    | `bytes` or `str`              | decode, parse, check exit status                 | Ignoring return code                                         |                                                           |
| Plugin object        | arbitrary object              | capability checks, sandbox/trust policy          | Trusting dynamic attributes                                  |                                                           |

A good boundary function converts external representation into an internal model.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class RetryPolicy:
    attempts: int
    delay_seconds: float

def parse_retry_policy(data: dict[str, object]) -> RetryPolicy:
    attempts = data.get("attempts")
    delay = data.get("delay_seconds")

    if not isinstance(attempts, int):
        raise ValueError("attempts must be an integer")
    if attempts < 0:
        raise ValueError("attempts must be non-negative")

    if not isinstance(delay, (int, float)):
        raise ValueError("delay_seconds must be numeric")
    if delay < 0:
        raise ValueError("delay_seconds must be non-negative")

    return RetryPolicy(attempts=attempts, delay_seconds=float(delay))
```

This code is verbose because boundary code is often verbose. That is not a failure of Python; it is the cost of turning untrusted data into trusted state.

Normalization is also part of input handling.

```python
def normalize_email(raw: str) -> str:
    return raw.strip().casefold()
```

But normalization must be domain-specific. Blind lowercasing, trimming, Unicode normalization, path normalization, or timezone conversion can be wrong depending on the domain.

Internal invariants should be maintained after construction.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class PageRange:
    start: int
    end: int

    def __post_init__(self) -> None:
        if self.start < 1:
            raise ValueError("start must be positive")
        if self.end < self.start:
            raise ValueError("end must be greater than or equal to start")
```

`__post_init__` can enforce simple dataclass invariants. It should not become a dumping ground for complex application logic.

**Validation strategy table.**

| Strategy                  | Best use                    | Strength                              | Cost                                | Risk                                 |
| ------------------------- | --------------------------- | ------------------------------------- | ----------------------------------- | ------------------------------------ |
| Inline checks             | Small local boundary        | No dependency                         | Repetition                          | Inconsistent rules                   |
| Helper parser functions   | Reused simple constraints   | Clear and testable                    | More functions                      | Poor naming can hide policy          |
| Dataclass `__post_init__` | Internal invariants         | Keeps object valid after construction | Limited conversion ergonomics       | Complex validation in constructor    |
| Type checker              | Internal static consistency | Early feedback                        | No runtime validation               | False security at boundaries         |
| Validation library        | Complex external schemas    | Rich errors and conversions           | Dependency and framework coupling   | Model layer becomes tool-specific    |
| Database constraints      | Persistence integrity       | Strong storage-level protection       | Late feedback relative to app logic | Not enough for API/domain validation |

**Failure-first explanation.**

The tempting but wrong mental model is: a function annotated as `def f(data: dict[str, object]) -> Config` is enough to make data safe once it returns. The surprising behavior is that bad runtime values can pass through if no checks are performed. The correct semantic explanation is that annotations describe intended types; validation proves or constructs acceptable runtime values. The professional rule of thumb is: validate at the boundary, convert into internal models, then avoid repeating defensive checks everywhere. The boundary where the rule changes is highly defensive library code, where public functions may need repeated validation because callers are unknown.

**Common Pitfalls.** Do not let untrusted data enter core logic as raw dictionaries. Do not confuse parsing with validation. Do not normalize data without understanding domain rules. Do not rely solely on type checkers at I/O boundaries. Do not scatter validation logic across many unrelated call sites when a boundary parser would be clearer.
### Handling Unknown or Untrusted Data — `object`, `Any`, `unknown shape`, defensive boundaries

Python programs often receive data whose shape is not known at the point of entry. The professional task is not merely to “type” such data, but to decide where uncertainty is allowed and where it must be eliminated.

There are three different concepts that are often confused:

| Concept                    | Python typing form                            | Meaning                                               | Appropriate use                                 | Common mistake                                 |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| Unknown runtime value      | `object`                                      | Some object exists, but few operations are known safe | Safe static boundary for unknown values         | Trying to use it without narrowing             |
| Static escape hatch        | `Any`                                         | Type checker stops enforcing useful constraints       | Interop, gradual migration, highly dynamic APIs | Letting `Any` leak into core logic             |
| Untrusted external data    | Often `object`, `dict[str, object]`, raw JSON | Runtime value may be malformed or malicious           | Boundary parsing and validation                 | Treating annotation as trust                   |
| Dynamically shaped mapping | `dict[str, object]`                           | Keys and values are not statically precise            | Initial decoded JSON-like data                  | Deep unvalidated indexing                      |
| Validated internal model   | dataclass/class/typed structure               | Trusted representation after parsing                  | Core application logic                          | Revalidating everywhere instead of at boundary |

`object` is safer than `Any` when the value is truly unknown.

```python
def handle(value: object) -> str:
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, int):
        return str(value)
    raise TypeError("expected str or int")
```

The type checker forces narrowing before operations. That is useful.

By contrast:

```python
from typing import Any

def handle(value: Any) -> str:
    return value.strip()
```

This may pass static checking, but it can fail at runtime if `value` is not string-like. `Any` is useful during gradual typing or at dynamic interop boundaries, but it should be treated as radioactive: once it enters core logic, it weakens nearby type information.

For JSON-like input, a realistic boundary shape may be:

```python
import json

raw: object = json.loads(payload)
```

Then narrow:

```python
def parse_user(data: object) -> User:
    if not isinstance(data, dict):
        raise ValueError("user must be an object")

    user_id = data.get("id")
    email = data.get("email")

    if not isinstance(user_id, int):
        raise ValueError("id must be an integer")
    if not isinstance(email, str):
        raise ValueError("email must be a string")

    return User(id=user_id, email=email)
```

This is intentionally explicit. Static types cannot know the shape of data received from a network, file, database, or untrusted plugin unless runtime code proves it.

| Boundary strategy          | Use when                                            | Static effect              | Runtime effect              | Risk                              |
| -------------------------- | --------------------------------------------------- | -------------------------- | --------------------------- | --------------------------------- |
| Accept `Any`               | Migrating old code or wrapping dynamic libraries    | Suppresses checking        | No validation               | Errors move deeper                |
| Accept `object`            | Unknown data must be narrowed                       | Forces checks before use   | No validation by itself     | Verbose                           |
| Accept `dict[str, object]` | JSON-like mapping already known to be object-shaped | Allows key access          | Shape still unchecked       | Nested uncertainty                |
| Parse into dataclass       | Internal code needs stable fields                   | Stronger static model      | Only valid if parser checks | False trust if parser is weak     |
| Use validation library     | Complex schemas or rich errors                      | Often provides typed model | Performs runtime checks     | Dependency and framework coupling |
| Reject early               | Boundary cannot prove safety                        | Simplifies core logic      | Strong fail-fast behavior   | May need good error reporting     |

**Design meaning.** Python’s dynamic runtime makes it easy to accept anything. Gradual typing gives a vocabulary for expressing uncertainty, but it does not remove runtime uncertainty. The professional design move is to keep unknown values near the boundary, prove their shape, then convert them into internal models.

**Failure-first explanation.**

The tempting but wrong mental model is: `Any` means “flexible but still type checked somehow.” The surprising behavior is that operations on `Any` are largely trusted by the type checker and may fail only at runtime. The correct semantic explanation is that `Any` is a gradual typing escape hatch. The professional rule of thumb is: prefer `object` for unknown values that must be narrowed, reserve `Any` for unavoidable dynamic interop, and prevent `Any` from spreading. The boundary where the rule changes is low-level adapter code whose job is precisely to mediate between typed and untyped worlds.

**Common Pitfalls.** Do not annotate untrusted data as a precise internal type before validation. Do not use `Any` merely to silence type checker errors. Do not pass raw decoded JSON through multiple layers. Do not treat `dict[str, object]` as a schema. Do not narrow with `isinstance` in one branch and then ignore the narrowed result later.

### Conversion, Narrowing, Parsing, and Casting — explicit transformation versus static assertion

Python code often needs to move a value from one representation to another. Four operations must be distinguished: conversion, parsing, narrowing, and casting.

| Operation  | Meaning                                               | Example                | Runtime effect                              | Static effect                       | Failure mode                            |
| ---------- | ----------------------------------------------------- | ---------------------- | ------------------------------------------- | ----------------------------------- | --------------------------------------- |
| Conversion | Produce a new value in another type/form              | `int(x)`, `str(x)`     | Yes                                         | Type checker may infer result       | Conversion may fail or lose information |
| Parsing    | Interpret external representation into internal value | `parse_date(raw)`      | Yes                                         | Depends on function signature       | Bad input, partial validation           |
| Narrowing  | Prove a broad type is a narrower type                 | `isinstance(x, str)`   | Yes, by condition                           | Type checker narrows branch         | Incomplete checks                       |
| Cast       | Tell type checker to treat value as type              | `cast(User, x)`        | Usually no runtime check                    | Static only                         | False assertion                         |
| Assertion  | Runtime check and static narrowing                    | `assert x is not None` | Yes, unless optimized away in some contexts | Narrows in tools                    | Misusing for validation                 |
| Validation | Prove domain constraints                              | `if age < 0: raise`    | Yes                                         | May or may not affect static typing | Missing domain rule                     |

Explicit conversion:

```python
count = int(raw_count)
```

This creates an integer from another representation. It may raise `ValueError` or `TypeError`.

Parsing is usually domain-specific:

```python
from datetime import date

def parse_iso_date(raw: str) -> date:
    return date.fromisoformat(raw)
```

Parsing should often be wrapped to produce domain-specific error messages:

```python
def parse_birth_date(raw: str) -> date:
    try:
        value = date.fromisoformat(raw)
    except ValueError as error:
        raise ValueError(f"invalid birth date: {raw!r}") from error

    if value.year < 1900:
        raise ValueError("birth date is outside supported range")

    return value
```

Narrowing uses runtime checks to justify operations.

```python
def normalize(value: object) -> str:
    if isinstance(value, str):
        return value.strip()
    raise TypeError("expected string")
```

Casting is different:

```python
from typing import cast

value = cast(str, unknown)
```

This does not convert `unknown` into a string. It tells the type checker to treat `unknown` as a `str`. If the assertion is false, the program may fail later.

Casts are acceptable when the programmer knows a fact that the type checker cannot infer. They are dangerous when used to avoid doing the actual proof.

A common pattern is narrowing optional values:

```python
def send_email(address: str | None) -> None:
    if address is None:
        raise ValueError("missing email address")

    deliver(address)
```

After the `None` check, type checkers can treat `address` as `str`.

Avoid this:

```python
from typing import cast

def send_email(address: str | None) -> None:
    deliver(cast(str, address))
```

This silences the type checker but does not handle the missing case.

**Conversion mechanism × safety level × failure mode.**

| Mechanism                          | Safety level                      | Good use                | Bad use                              | Failure mode                     |
| ---------------------------------- | --------------------------------- | ----------------------- | ------------------------------------ | -------------------------------- |
| `int`, `float`, `str` constructors | Runtime transformation            | Basic conversion        | Treating as domain validation        | Bad parse or semantic invalidity |
| Domain parser                      | High when tested                  | External data boundary  | Scattered ad hoc parsing             | Inconsistent rules               |
| `isinstance` narrowing             | Good for runtime type distinction | Unknown object handling | Replacing protocol design everywhere | Too nominal or incomplete        |
| `cast()`                           | Static assertion only             | Type checker limitation | Avoiding checks                      | Runtime failure later            |
| `assert`                           | Runtime check in normal execution | Internal invariant      | User input validation                | May be disabled; poor user error |
| Validation library                 | High at boundaries                | Complex schemas         | Overcoupling internal domain to tool | Tool-specific model leakage      |

**Design meaning.** Python makes runtime conversion explicit but static casting optional and unenforced. This is a major difference from languages where casts may perform runtime checks or low-level reinterpretation. In Python, `typing.cast()` is for the type checker, not for the object.

**Failure-first explanation.**

The tempting but wrong mental model is: `cast(str, x)` makes `x` a string. The surprising behavior is that nothing happens at runtime. The correct semantic explanation is that `typing.cast` returns the original object unchanged and changes only static type-checker interpretation. The professional rule of thumb is: use casts only after a real proof exists but the checker cannot see it; use parsing, conversion, or validation when the runtime value must actually change or be checked. The boundary where the rule changes is narrow adapter code around dynamic libraries, where casts may be localized and justified by external guarantees.

**Common Pitfalls.** Do not use `cast()` as a substitute for validation. Do not use `assert` for external input checks. Do not parse and validate in multiple inconsistent ways across a codebase. Do not treat `isinstance` as the only form of design safety; protocols may be better. Do not confuse syntactic conversion with domain correctness.

### Type-System Properties in Practice — dynamic typing, strong typing, nominal and structural typing

Python’s type story has multiple layers. Runtime Python is dynamically typed and mostly strongly typed. Static Python tooling supports nominal and structural reasoning through annotations, ABCs, and protocols.

| Type-system property             | Python meaning                                                                | Practical consequence                         | Common misunderstanding                             |
| -------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------- |
| Dynamic typing                   | Runtime objects have types; names are not statically declared by the language | Errors may appear when code executes          | “Python has no types”                               |
| Strong typing                    | Operations usually reject incompatible types instead of silently coercing     | Fewer weak-coercion surprises                 | “Strong means statically checked”                   |
| Nominal typing                   | Class identity and inheritance matter for `isinstance` and normal classes     | Useful for concrete domain objects            | “All Python typing is duck typing”                  |
| Structural typing                | Compatibility can be based on supported operations                            | Useful for protocols and duck typing          | “Any object with same fields is always safe”        |
| Gradual typing                   | Static annotations can be added incrementally                                 | Large codebases can improve without rewriting | “Typed Python becomes a different runtime language” |
| Type erasure-like behavior       | Many annotations are not enforced at runtime                                  | Runtime checks need explicit code             | “`list[int]` prevents non-int elements at runtime”  |
| Invariance of mutable containers | `list[Dog]` is not safely a `list[Animal]` in static typing                   | Prevents unsafe mutation through broader type | “Subtyping should always follow element subtyping”  |

Runtime type:

```python
x = 1
x = "one"
```

The name `x` can be rebound. The objects `1` and `"one"` have different runtime types.

Strong typing:

```python
1 + "2"  # TypeError
```

Python does not silently turn `"2"` into `2` or `1` into `"1"` for addition.

Nominal runtime checking:

```python
isinstance(value, str)
```

This asks whether the object is an instance of `str` or a subclass.

Structural static checking:

```python
from typing import Protocol

class SupportsClose(Protocol):
    def close(self) -> None:
        ...
```

Any statically compatible object with a `close() -> None` method may satisfy this protocol for type-checking purposes.

Mutable generic containers create important subtyping constraints. Suppose `Dog` is a subtype of `Animal`. A `list[Dog]` should not be treated as a `list[Animal]`, because then someone could append a `Cat` to a list that was supposed to contain only dogs.

```python
class Animal:
    pass

class Dog(Animal):
    pass

class Cat(Animal):
    pass
```

Conceptually unsafe:

```python
dogs: list[Dog] = [Dog()]
animals: list[Animal] = dogs  # rejected by static type checkers
animals.append(Cat())
```

This is why mutable containers are commonly invariant in static type systems.

**Design meaning.** Python’s runtime and static typing layers do different jobs. Runtime typing controls actual object behavior. Static typing approximates program correctness before execution. Structural typing helps express Pythonic duck typing in static form, but it does not turn runtime Python into a fully statically checked language.

**Failure-first explanation.**

The tempting but wrong mental model is: because Python is dynamically typed, type theory and type-system distinctions are irrelevant. The surprising behavior is that modern Python type checkers enforce important distinctions such as optionality, generic relationships, protocol compatibility, and mutable-container invariance. The correct semantic explanation is that Python has runtime types and an optional static reasoning layer. The professional rule of thumb is: write code that is valid Python first, then use type annotations to express and check design intent. The boundary where the rule changes is highly dynamic metaprogramming, where static typing may provide less value or require carefully designed stubs/protocols.

**Common Pitfalls.** Do not say Python is “untyped.” Do not say type hints make Python runtime-statically typed. Do not use `Any` when `object` plus narrowing is better. Do not ignore invariance errors by casting blindly. Do not use nominal `isinstance` checks when a behavioral protocol is the real requirement.

### Expressing Behavioral Contracts — duck typing, `collections.abc`, `typing.Protocol`

A behavioral contract specifies what an object must be able to do. Python has always supported this through duck typing. Modern Python can also express it statically through `Protocol`.

A simple duck-typed function:

```python
def first_line(source) -> str:
    return next(iter(source)).strip()
```

This function expects `source` to be iterable and its items to support `.strip()`. That contract is real, but implicit.

A clearer version with types:

```python
from collections.abc import Iterable

def first_line(source: Iterable[str]) -> str:
    return next(iter(source)).strip()
```

For custom behavior, use `Protocol`.

```python
from typing import Protocol

class SupportsRead(Protocol):
    def read(self, size: int = -1) -> str:
        ...

def load_text(source: SupportsRead) -> str:
    return source.read()
```

Any object with a compatible `read` method can satisfy this protocol in static checking.

| Contract style       | Example                              | Best use                            | Strength                      | Cost                       |
| -------------------- | ------------------------------------ | ----------------------------------- | ----------------------------- | -------------------------- |
| Informal duck typing | Call needed methods directly         | Small/local code                    | Minimal ceremony              | Hidden expectations        |
| `collections.abc`    | `Iterable[str]`, `Mapping[str, int]` | Standard container behavior         | Recognized vocabulary         | May be too broad or narrow |
| `typing.Protocol`    | Custom method/property contract      | Library and API boundaries          | Expresses structural behavior | More type design work      |
| Abstract base class  | Inheritance/registration contract    | Runtime checks, framework hooks     | Nominal clarity               | More coupling              |
| Concrete class       | Exact implementation required        | Construction/state/lifecycle matter | Strong specificity            | Less flexible              |

Use `collections.abc` for standard protocols:

```python
from collections.abc import Mapping

def get_timeout(config: Mapping[str, object]) -> int:
    raw = config.get("timeout", 30)
    if not isinstance(raw, int):
        raise ValueError("timeout must be an integer")
    return raw
```

Prefer `Mapping` over `dict` when the function only needs read-only mapping behavior. This makes the API more flexible and communicates intent.

Use `Sequence` when indexed ordered access is required, not merely iteration.

```python
from collections.abc import Sequence

def median(values: Sequence[float]) -> float:
    ...
```

Use `Iterable` when only iteration is needed.

```python
from collections.abc import Iterable

def total(values: Iterable[int]) -> int:
    return sum(values)
```

This accepts lists, tuples, sets, generators, files, and other iterable objects.

**Protocol design rule.** A protocol should express the smallest meaningful behavior required by the function. Do not require `list` if `Iterable` is enough. Do not require `Iterable` if repeated indexing or length is needed. Do not invent a custom protocol if a standard ABC expresses the requirement.

**Design meaning.** Protocol-oriented design fits Python because many Python operations are already protocol-based: iteration, context management, callability, sizing, containment, mapping, sequence access, and representation. `typing.Protocol` gives static language to an idiom that already existed dynamically.

**Failure-first explanation.**

The tempting but wrong mental model is: to write safe code, functions should check exact classes. The surprising behavior is that exact-class checks often reject perfectly valid objects and make APIs less reusable. The correct semantic explanation is that Python APIs often require capabilities, not ancestry. The professional rule of thumb is: accept the weakest standard protocol that provides the operations needed; use concrete classes only when construction, invariants, or lifecycle matter. The boundary where the rule changes is security-sensitive or invariant-sensitive code, where exact types or explicit validators may be necessary.

**Common Pitfalls.** Do not annotate `list[T]` when `Iterable[T]` is enough. Do not annotate `dict[K, V]` when `Mapping[K, V]` is enough for read-only use. Do not create huge protocols that encode an entire class. Do not use `Protocol` to hide unclear design. Do not rely on static protocol conformance for runtime trust at external boundaries.

### Generic Helpers and Reusable Types — `TypeVar`, `Generic`, parameterized collections

Generics express relationships between input and output types. They are most useful when a function or class preserves, transforms, or relates types in a way that simple annotations cannot express.

A non-generic helper loses information:

```python
def first(items: list[object]) -> object:
    return items[0]
```

If the input is `list[str]`, the result is still typed as `object`, which is unnecessarily imprecise.

A generic version preserves the element type:

```python
from collections.abc import Sequence
from typing import TypeVar

T = TypeVar("T")

def first(items: Sequence[T]) -> T:
    return items[0]
```

Now `first(["a", "b"])` is understood as returning `str`, and `first([1, 2])` as returning `int`.

| Generic construct        | Meaning                                                  | Example                           | Best use                                | Common pitfall                               |
| ------------------------ | -------------------------------------------------------- | --------------------------------- | --------------------------------------- | -------------------------------------------- |
| `TypeVar`                | Type variable relating positions                         | `T = TypeVar("T")`                | Preserve type relationships             | Using when no relationship exists            |
| Parameterized collection | Collection element/key/value type                        | `list[str]`, `dict[str, int]`     | Standard containers                     | Assuming runtime enforcement                 |
| Generic function         | Function works over many types while preserving relation | `def first(xs: Sequence[T]) -> T` | Reusable helpers                        | Overcomplicating simple APIs                 |
| Generic class            | Class parameterized by contained type                    | `Box[T]`                          | Containers, repositories, wrappers      | Complex type APIs with little value          |
| Bounded TypeVar          | Type variable constrained by upper bound                 | `T: SupportsClose` conceptually   | Return same subtype                     | Wrongly using inheritance when protocol fits |
| Constrained TypeVar      | One of specific types                                    | selected advanced cases           | Preserve same choice among alternatives | Usually less clear than overloads            |
| `Self`                   | Current class return type                                | fluent APIs                       | Methods returning instance/class type   | Using in ordinary unrelated returns          |

Generic class example:

```python
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")

@dataclass
class Box(Generic[T]):
    value: T

    def get(self) -> T:
        return self.value
```

This is useful if `Box[int]` and `Box[str]` need to preserve their contained type.

Many functions do not need generics. This function has no type relationship to preserve beyond ordinary concrete types:

```python
def normalize_name(name: str) -> str:
    return name.strip().casefold()
```

Adding a `TypeVar` here would be noise.

Generic helpers should usually accept abstract collection protocols rather than concrete mutable containers when possible.

```python
from collections.abc import Iterable
from typing import TypeVar

T = TypeVar("T")

def unique_preserving_order(items: Iterable[T]) -> list[T]:
    seen: set[T] = set()
    result: list[T] = []

    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)

    return result
```

This version assumes `T` is hashable. The type system may need a bound or documentation depending on strictness and checker behavior. The runtime will fail if unhashable items appear.

**Design meaning.** Generics are not about making Python “more complicated.” They let type annotations express reusable relationships already present in code. The tradeoff is readability: generic annotations should clarify, not perform type-level acrobatics.

**Failure-first explanation.**

The tempting but wrong mental model is: advanced Python code should use `TypeVar` often. The surprising behavior is that unnecessary generics make APIs harder to read without increasing safety. The correct semantic explanation is that a type variable is useful only when the same unknown type appears in multiple places and the relationship matters. The professional rule of thumb is: use generics to preserve or relate types; use concrete annotations when behavior is concrete; use protocols when required operations matter. The boundary where the rule changes is library code, where precise generic APIs can significantly improve downstream type checking.

**Common Pitfalls.** Do not introduce `TypeVar` when no type relationship is expressed. Do not parameterize everything for aesthetic symmetry. Do not assume `list[int]` checks elements at runtime. Do not let complex type signatures become harder to understand than the code they describe. Do not ignore mutability when designing generic containers.

### Mutable Versus Immutable Modeling — aliasing, sharing, defensive copies, frozen dataclasses

Mutability is one of Python’s central modeling concerns. Python makes mutable containers easy, and this is productive. But mutable state interacts with aliasing, defaults, class attributes, caching, concurrency, and API boundaries.

| Representation   | Mutable?              | Example                   | Modeling meaning              | Pitfall                          |
| ---------------- | --------------------- | ------------------------- | ----------------------------- | -------------------------------- |
| `list`           | Yes                   | `[1, 2]`                  | Changeable ordered collection | Shared mutation                  |
| `dict`           | Yes                   | `{"a": 1}`                | Changeable mapping            | External mutation through alias  |
| `set`            | Yes                   | `{1, 2}`                  | Changeable membership set     | Hash instability if nested wrong |
| `tuple`          | No container mutation | `(1, 2)`                  | Fixed grouping                | Can contain mutable objects      |
| `str`            | No                    | `"abc"`                   | Immutable text                | Repeated concatenation in loops  |
| `bytes`          | No                    | `b"abc"`                  | Immutable binary data         | Confusing with `bytearray`       |
| `frozenset`      | No                    | `frozenset(xs)`           | Immutable set-like value      | Construction less ergonomic      |
| frozen dataclass | Shallow frozen        | `@dataclass(frozen=True)` | Prevent field rebinding       | Nested mutables may still mutate |

A tuple is immutable as a container, but not deeply immutable.

```python
items = ([1, 2], "ok")
items[0].append(3)
```

The tuple still points to the same list, but the list itself has changed.

Frozen dataclasses are also shallow.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Group:
    members: list[str]

group = Group(["ada"])
group.members.append("grace")
```

This mutates the nested list. To model deeper immutability, use immutable fields:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Group:
    members: tuple[str, ...]
```

Defensive copying is useful when an object should not share caller-owned mutable data.

```python
class Team:
    def __init__(self, members: list[str]) -> None:
        self._members = list(members)

    @property
    def members(self) -> tuple[str, ...]:
        return tuple(self._members)
```

This prevents callers from mutating internal state directly.

But copying has a cost. It should be used when ownership boundaries matter, not mechanically everywhere.

| API design choice        | Use when                                         | Benefit                     | Cost                                                    |
| ------------------------ | ------------------------------------------------ | --------------------------- | ------------------------------------------------------- |
| Store reference directly | Caller and callee intentionally share object     | Fast, simple                | External mutation affects internal state                |
| Shallow copy             | Need independent container, shared elements okay | Prevents top-level mutation | Nested objects still shared                             |
| Deep copy                | Need independent object graph                    | Stronger isolation          | Expensive, may break identity/shared-resource semantics |
| Immutable representation | Need safe sharing                                | Easier reasoning            | Conversion overhead, less ergonomic mutation            |
| Read-only view/property  | Need expose data safely                          | Protects internal state     | May need conversion or wrapper                          |

**Design meaning.** Python does not have ownership tracking like Rust or pervasive immutability like some functional languages. It gives mutable objects and expects programmers to design ownership and sharing boundaries. This is flexible but requires discipline.

**Failure-first explanation.**

The tempting but wrong mental model is: using a frozen dataclass makes the whole object immutable. The surprising behavior is that nested mutable fields can still be mutated. The correct semantic explanation is that `frozen=True` prevents attribute rebinding on the dataclass instance; it does not recursively freeze the object graph. The professional rule of thumb is: use immutable field types when deep immutability matters, and copy or validate mutable inputs at ownership boundaries. The boundary where the rule changes is performance-sensitive code where copying would be too expensive and shared mutation is intentionally managed.

**Common Pitfalls.** Do not expose internal mutable lists or dictionaries from public APIs unless mutation is intended. Do not assume tuple means deeply immutable. Do not assume `frozen=True` freezes nested objects. Do not deep-copy objects that contain handles, connections, locks, or identity-sensitive state without understanding consequences. Do not optimize away defensive copies before measuring and understanding ownership risk.

### Hashability and Key Design — dictionary keys, set elements, equality contracts

Python dictionaries and sets rely on hashing. An object is hashable if it has a hash value that remains stable during its lifetime and equality behavior compatible with hashing.

```python
lookup: dict[str, int] = {"ada": 1}
```

Strings are hashable. Lists are not.

```python
{[1, 2]: "value"}  # TypeError
```

| Key candidate         | Hashable?                                                | Good key? | Notes                                 |
| --------------------- | -------------------------------------------------------- | --------- | ------------------------------------- |
| `str`                 | Yes                                                      | Often     | Common for names, IDs, JSON-like keys |
| `int`                 | Yes                                                      | Often     | Common for numeric IDs                |
| `tuple`               | If all elements hashable                                 | Often     | Good composite key                    |
| `list`                | No                                                       | No        | Mutable                               |
| `dict`                | No                                                       | No        | Mutable                               |
| `set`                 | No                                                       | No        | Mutable                               |
| `frozenset`           | If elements hashable                                     | Sometimes | Unordered composite membership key    |
| frozen dataclass      | Usually if fields hashable and configured appropriately  | Often     | Good value-object key                 |
| mutable custom object | Usually identity-hash by default unless equality changed | Risky     | Equality/hash design matters          |

Composite keys are common:

```python
cache: dict[tuple[int, str], User] = {}

key = (user_id, region)
cache[key] = user
```

If a custom class defines equality, it must consider hashing. Dataclasses help, but their behavior depends on `frozen`, `eq`, and related options.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Coordinate:
    x: int
    y: int
```

This can work well as a dictionary key if fields are hashable.

The equality-hash contract is:

If `a == b`, then `hash(a) == hash(b)` must also hold.

The reverse is not required: two unequal objects may have the same hash due to collisions.

Do not base a hash on mutable state. If the state changes after insertion into a dictionary or set, lookup behavior can break.

**Design meaning.** Hashability connects identity, equality, mutability, and collection design. Python gives fast and ergonomic dictionaries/sets, but keys must respect object invariants.

**Failure-first explanation.**

The tempting but wrong mental model is: any object can be a dictionary key because Python variables just refer to objects. The surprising behavior is that mutable containers such as lists and dictionaries are rejected, and mutable custom equality can corrupt lookup logic. The correct semantic explanation is that hash-table keys require stable hash and equality behavior. The professional rule of thumb is: use immutable, value-like objects as keys; avoid mutable state in equality/hash definitions. The boundary where the rule changes is identity-based keys, where object identity rather than value equality is intentionally used.

**Common Pitfalls.** Do not use mutable objects as keys. Do not define `__eq__` casually without understanding `__hash__`. Do not mutate fields used for equality or hashing. Do not assume hash collisions are impossible. Do not use large complex objects as keys when a stable identifier would be clearer.

### Copying, Sharing, and Ownership Boundaries — assignment, shallow copy, deep copy

Python assignment shares object references through name binding. Copying must be explicit.

```python
a = [1, 2, 3]
b = a
b.append(4)
print(a)  # [1, 2, 3, 4]
```

A shallow copy creates a new outer container but shares contained objects.

```python
a = [[1], [2]]
b = list(a)
b.append([3])
b[0].append(99)

print(a)  # [[1, 99], [2]]
```

The outer list was copied; inner lists were shared.

A deep copy recursively copies objects where possible:

```python
from copy import deepcopy

b = deepcopy(a)
```

But deep copying is not always correct. Objects that represent files, sockets, database connections, locks, caches, identity-sensitive nodes, or external resources may not have meaningful deep copies.

| Operation         | Syntax/API                          | Copies outer container? | Copies nested objects?          | Best use                      |
| ----------------- | ----------------------------------- | ----------------------- | ------------------------------- | ----------------------------- |
| Assignment        | `b = a`                             | No                      | No                              | Intentional sharing           |
| List copy         | `list(a)`, `a.copy()`, `a[:]`       | Yes                     | No                              | Independent list structure    |
| Dict copy         | `dict(d)`, `d.copy()`               | Yes                     | No                              | Independent mapping structure |
| Set copy          | `set(s)`, `s.copy()`                | Yes                     | No                              | Independent set structure     |
| Dataclass replace | `dataclasses.replace(obj, field=x)` | New dataclass instance  | Shares unchanged fields         | Functional-style updates      |
| `copy.copy`       | shallow copy protocol               | Object-dependent        | No/dependent                    | Generic shallow copy          |
| `copy.deepcopy`   | deep copy protocol                  | Object-dependent        | Usually attempts recursive copy | Isolating nested plain data   |

Ownership boundaries should be explicit. If a class stores a mutable argument, decide whether it owns that object or observes caller-owned state.

```python
class Report:
    def __init__(self, rows: list[str]) -> None:
        self._rows = list(rows)
```

This class takes a shallow copy, so later changes to the caller’s list do not change `_rows`.

For public return values:

```python
class Report:
    def __init__(self, rows: list[str]) -> None:
        self._rows = list(rows)

    def rows(self) -> tuple[str, ...]:
        return tuple(self._rows)
```

Returning a tuple prevents the caller from mutating the internal list directly.

**Design meaning.** Python does not encode ownership in the type system. API design must decide whether objects are shared, copied, borrowed informally, or owned internally. This is one of the main places where Python requires professional discipline.

**Failure-first explanation.**

The tempting but wrong mental model is: copying a list copies everything in it. The surprising behavior is that nested mutable objects remain shared after a shallow copy. The correct semantic explanation is that ordinary collection copying duplicates the outer container, not the entire object graph. The professional rule of thumb is: use shallow copy for independent container structure; use deep copy only for plain nested data when full independence is needed and meaningful. The boundary where the rule changes is immutable nested data, where sharing is harmless, or resource-owning objects, where deep copying may be wrong.

**Common Pitfalls.** Do not assume assignment copies. Do not assume shallow copy protects against nested mutation. Do not deep-copy resource objects blindly. Do not expose mutable internals without intent. Do not ignore ownership semantics in constructors and public methods.

### Numeric and Text Domain Modeling — integers, floats, decimals, strings, bytes, paths

Python provides convenient numeric and text types, but domain modeling requires more than choosing the nearest primitive.

| Domain                | Common type              | Better type when needed     | Why                          | Pitfall                                |
| --------------------- | ------------------------ | --------------------------- | ---------------------------- | -------------------------------------- |
| Counts                | `int`                    | domain wrapper if critical  | Arbitrary precision, natural | Negative counts if not validated       |
| IDs                   | `int` or `str`           | `NewType`, value object     | Prevent mixups               | Treating all IDs as interchangeable    |
| Money                 | `int` cents or `Decimal` | value object                | Avoid binary float errors    | Using `float` for exact money          |
| Measurements          | `float`                  | domain wrapper/unit library | Continuous quantities        | Unit confusion                         |
| User-facing text      | `str`                    | normalized value object     | Unicode text                 | Encoding assumptions                   |
| Binary payload        | `bytes`                  | structured parser           | Raw bytes                    | Treating as text                       |
| Mutable binary buffer | `bytearray`              | specialized buffer          | In-place changes             | Passing where immutable bytes expected |
| Filesystem path       | `pathlib.Path`           | validated path wrapper      | Path operations              | Stringly path manipulation             |
| Regex pattern         | `re.Pattern`             | compiled pattern            | Reuse and clarity            | Escaping mistakes                      |

Money should usually not be represented as `float`.

```python
from decimal import Decimal

price = Decimal("19.99")
```

Alternatively, store minor units as integers:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Money:
    cents: int
```

Which choice is better depends on domain requirements, currency behavior, rounding rules, database representation, and external API formats.

Paths should usually use `pathlib.Path` for internal path manipulation.

```python
from pathlib import Path

data_dir = Path("data")
config_path = data_dir / "config.json"
```

This is clearer and safer than string concatenation.

Text and bytes must be separated.

```python
text = "hello"
payload = text.encode("utf-8")
restored = payload.decode("utf-8")
```

A `str` is Unicode text. `bytes` is binary data. External boundaries often require explicit encoding and decoding.

**Design meaning.** Python’s primitives are powerful, but they do not encode domain units, validation rules, normalization policy, or trust level. Professional modeling often wraps or validates primitives where mistakes are costly.

**Failure-first explanation.**

The tempting but wrong mental model is: `float` is the standard numeric type for any decimal-looking number. The surprising behavior is that decimal fractions such as `0.1` are not represented exactly in binary floating point. The correct semantic explanation is that Python `float` is a binary floating-point type. The professional rule of thumb is: use `float` for approximate continuous quantities; use integer minor units or `Decimal` for exact decimal domains such as money. The boundary where the rule changes is performance-oriented numerical computing, where arrays and specialized numeric libraries may control precision and representation differently.

**Common Pitfalls.** Do not use `float` for exact money. Do not mix bytes and text casually. Do not manipulate filesystem paths with fragile string concatenation. Do not store domain-critical IDs as interchangeable raw primitives without considering type distinctions. Do not ignore Unicode normalization when text equality matters.

### Dataclass Modeling Details — defaults, factories, frozen records, post-init invariants

`dataclass` is one of Python’s most important structured-data tools. It reduces boilerplate for classes that mostly store data.

```python
from dataclasses import dataclass

@dataclass
class User:
    id: int
    email: str
    active: bool = True
```

This generates methods such as `__init__`, `__repr__`, and equality behavior by default.

| Dataclass feature   | Syntax/API                         | Use                                               | Pitfall                            |
| ------------------- | ---------------------------------- | ------------------------------------------------- | ---------------------------------- |
| Basic field         | `name: str`                        | Required constructor field                        | Annotation alone does not validate |
| Default value       | `active: bool = True`              | Simple immutable default                          | Mutable default error              |
| Default factory     | `field(default_factory=list)`      | New mutable default per instance                  | Forgetting factory for mutables    |
| Frozen dataclass    | `@dataclass(frozen=True)`          | Prevent field rebinding                           | Not deep immutability              |
| Post-init           | `__post_init__`                    | Validate/derive after init                        | Too much logic in construction     |
| Ordering            | `order=True`                       | Comparable records                                | Accidental ordering semantics      |
| Slots               | `slots=True`                       | Reduce per-instance overhead, restrict attributes | Less dynamic flexibility           |
| Keyword-only fields | `kw_only=True` or field options    | Clear construction                                | More verbose calls                 |
| Excluded fields     | `field(repr=False, compare=False)` | Control generated behavior                        | Hiding important state             |

Mutable defaults require `default_factory`.

```python
from dataclasses import dataclass, field

@dataclass
class Team:
    members: list[str] = field(default_factory=list)
```

This creates a new list for each instance.

Do not write:

```python
@dataclass
class Team:
    members: list[str] = []
```

Dataclasses reject many mutable defaults directly, but the underlying semantic issue is the same as function defaults: shared mutable objects are dangerous.

Use `__post_init__` for local invariants:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Percentage:
    value: float

    def __post_init__(self) -> None:
        if not 0 <= self.value <= 100:
            raise ValueError("percentage must be between 0 and 100")
```

For frozen dataclasses, more advanced initialization sometimes requires `object.__setattr__`, but this should be used carefully and locally.

Slots can reduce memory overhead and prevent accidental dynamic attributes.

```python
from dataclasses import dataclass

@dataclass(slots=True)
class Point:
    x: float
    y: float
```

This is useful for many instances or stricter attribute discipline, but it reduces Python’s usual dynamic attribute flexibility.

**Design meaning.** Dataclasses occupy a middle ground between raw dictionaries and fully hand-written classes. They are excellent for structured internal data. They are not complete validation frameworks, not automatic deep immutability tools, and not always the right abstraction for behavior-heavy objects.

**Failure-first explanation.**

The tempting but wrong mental model is: `field(default_factory=list)` is just a stylistic alternative to `[]`. The surprising behavior is that a plain mutable default would be shared, while a factory creates a fresh object per instance. The correct semantic explanation is that defaults are objects, but factories are called during instance construction. The professional rule of thumb is: use direct defaults for immutable values; use `default_factory` for mutable per-instance defaults. The boundary where the rule changes is intentional shared state, which should usually be a class variable and clearly annotated/documented.

**Common Pitfalls.** Do not assume dataclass annotations validate runtime types. Do not put mutable defaults directly in fields. Do not use `order=True` unless ordering has domain meaning. Do not use `frozen=True` as a substitute for deep immutability. Do not turn dataclasses into large behavior-heavy service objects.

### `TypedDict` and Dictionary-Shaped Data — static shape without runtime enforcement

`TypedDict` expresses the expected shape of a dictionary to static type checkers.

```python
from typing import TypedDict

class UserPayload(TypedDict):
    id: int
    email: str
    active: bool
```

A value of this type is still a normal dictionary at runtime.

```python
payload: UserPayload = {"id": 1, "email": "ada@example.com", "active": True}
```

`TypedDict` is useful when dictionary shape is part of an API, especially for JSON-like data, but the code intentionally remains dictionary-based.

| Use case                        | `TypedDict` fit?                    | Reason                                              |
| ------------------------------- | ----------------------------------- | --------------------------------------------------- |
| JSON-like payload near boundary | Good                                | Matches dictionary representation                   |
| Internal domain object          | Sometimes                           | Better as dataclass if behavior/structure is stable |
| Public API returning dicts      | Good when dict shape is intentional | Documents keys statically                           |
| Runtime validation              | Not sufficient                      | `TypedDict` does not check values at runtime        |
| Dynamic arbitrary mapping       | Poor                                | Shape is not known                                  |
| Behavior-rich object            | Poor                                | Use class/dataclass/protocol                        |

Example:

```python
from typing import TypedDict

class CreateUserRequest(TypedDict):
    email: str
    display_name: str

def handle_create_user(data: CreateUserRequest) -> None:
    ...
```

This helps static tools detect misspelled keys:

```python
email = data["emial"]  # type checker can flag this
```

But if data comes from JSON, this annotation alone is not enough:

```python
import json

data = json.loads(payload)
handle_create_user(data)
```

The runtime does not know that `data` satisfies `CreateUserRequest`. A parser or validator is still needed.

Some dictionary keys may be optional depending on `TypedDict` configuration and typing features. This is useful, but it can become complicated. If a dictionary shape has many optional keys, variants, or invariants, a validation model or dataclass may be clearer.

**Design meaning.** `TypedDict` is a bridge between Python’s dictionary-heavy style and static checking. It is a static description of shape, not a runtime schema.

**Failure-first explanation.**

The tempting but wrong mental model is: `TypedDict` turns a dictionary into a checked record. The surprising behavior is that at runtime it is just a `dict`, and malformed data can still appear. The correct semantic explanation is that `TypedDict` exists for static type checking and documentation of dictionary shape. The professional rule of thumb is: use `TypedDict` for dictionary-shaped APIs; use validation at boundaries; use dataclasses or classes when the data is a stable internal domain object. The boundary where the rule changes is pure internal code already checked by a strict type checker and protected by tests, where additional runtime validation may be unnecessary.

**Common Pitfalls.** Do not treat `TypedDict` as runtime validation. Do not use it for complex domain behavior. Do not let large `TypedDict` structures replace clearer domain models. Do not ignore optional-key handling. Do not assume all type checkers behave identically on advanced `TypedDict` cases.

### Modeling APIs with Input and Output Types — public contracts, stability, compatibility

A function signature is part of a Python API’s data model. Parameters, return types, defaults, exceptions, mutability expectations, and accepted protocols all define the contract.

```python
from collections.abc import Iterable

def average(values: Iterable[float]) -> float:
    total = 0.0
    count = 0

    for value in values:
        total += value
        count += 1

    if count == 0:
        raise ValueError("average requires at least one value")

    return total / count
```

This function accepts any iterable of floats, not only lists. It raises for empty input. That is part of its contract.

| API modeling choice      | Example                               | Consequence                   | Pitfall                                 |                        |
| ------------------------ | ------------------------------------- | ----------------------------- | --------------------------------------- | ---------------------- |
| Accept concrete type     | `list[str]`                           | Caller must provide list      | Rejects tuples/generators unnecessarily |                        |
| Accept protocol          | `Iterable[str]`                       | More flexible                 | One-shot iterables may surprise         |                        |
| Return concrete type     | `list[str]`                           | Caller knows capabilities     | May expose mutability                   |                        |
| Return protocol          | `Sequence[str]`                       | Hides implementation          | May be less convenient                  |                        |
| Return optional          | `User                                 | None`                         | Caller must handle absence              | Missing reason unclear |
| Raise exception          | `raise NotFoundError`                 | Failure is explicit/non-local | Must document recovery                  |                        |
| Mutate argument          | `def fill(buffer: list[str]) -> None` | Efficient/in-place            | Caller-visible side effect              |                        |
| Return new value         | `def normalized(xs) -> list[str]`     | Clear ownership               | Allocation cost                         |                        |
| Use keyword-only options | `*, strict: bool`                     | Clear call sites              | Slight verbosity                        |                        |
| Accept `Any`             | Dynamic openness                      | Maximum flexibility           | Static contract loss                    |                        |

API input should be as general as the function genuinely supports, but no more general.

```python
from collections.abc import Iterable

def join_lines(lines: Iterable[str]) -> str:
    return "\n".join(lines)
```

`Iterable[str]` is appropriate because `join` can consume any iterable of strings.

But if the function needs length and repeated indexing:

```python
from collections.abc import Sequence

def middle(values: Sequence[int]) -> int:
    return values[len(values) // 2]
```

`Sequence[int]` is more accurate than `Iterable[int]`.

Return types should consider ownership. Returning an internal mutable list exposes state.

```python
class Group:
    def __init__(self) -> None:
        self._members: list[str] = []

    def members(self) -> list[str]:
        return self._members
```

A caller can mutate the group accidentally. A safer return may be:

```python
class Group:
    def __init__(self) -> None:
        self._members: list[str] = []

    def members(self) -> tuple[str, ...]:
        return tuple(self._members)
```

**Design meaning.** Python’s dynamic runtime does not force API contracts to be precise. Type annotations, naming, exceptions, documentation, mutability choices, and tests together form the real contract.

**Failure-first explanation.**

The tempting but wrong mental model is: accepting broader types is always better. The surprising behavior is that accepting `Iterable` when repeated traversal is needed causes bugs with generators and one-shot streams. The correct semantic explanation is that protocols express capabilities; choosing too weak or too broad a protocol misstates the required behavior. The professional rule of thumb is: accept the weakest protocol that actually provides all required operations, and document consumption/mutation behavior. The boundary where the rule changes is internal code with tightly controlled callers, where simpler concrete annotations may be adequate.

**Common Pitfalls.** Do not annotate every collection parameter as `list`. Do not annotate one-shot consumed inputs as reusable sequences. Do not expose internal mutable collections by accident. Do not return `None` for failure without making absence part of the contract. Do not hide mutation side effects in functions that look like pure transformations.

### Type Safety Boundaries — where Python can help, where it stops

Python offers several layers of safety, but each stops at a different boundary.

| Boundary             | Python/tool support              | What is guaranteed                        | What is not guaranteed              |
| -------------------- | -------------------------------- | ----------------------------------------- | ----------------------------------- |
| Runtime operation    | Python object model              | Invalid operations often raise exceptions | All errors found before execution   |
| Static type checking | mypy/pyright/etc.                | Many type inconsistencies before runtime  | Runtime input validity              |
| Dataclass structure  | `dataclasses`                    | Generated methods, field names            | Field type enforcement              |
| `TypedDict`          | Type checker                     | Key/value shape in checked code           | Runtime dictionary validity         |
| `Protocol`           | Type checker                     | Structural compatibility in checked code  | Runtime object trust                |
| `Enum`               | Runtime finite members           | Named finite values                       | External input automatically parsed |
| `assert`             | Runtime condition in normal mode | Internal invariant check                  | User-facing validation robustness   |
| Validation library   | Library-specific                 | Runtime schema checks                     | Whole-program correctness           |
| Tests                | Test runner                      | Checked examples/scenarios                | Exhaustive correctness              |
| Linters              | Tooling                          | Style and some bug patterns               | Semantic correctness                |

Type safety in Python is layered and partial. A strong professional approach uses multiple layers deliberately:

```python
from dataclasses import dataclass
from typing import TypedDict

class RawUser(TypedDict):
    id: int
    email: str

@dataclass(frozen=True)
class User:
    id: int
    email: str

def parse_user(raw: object) -> User:
    if not isinstance(raw, dict):
        raise ValueError("user must be an object")

    user_id = raw.get("id")
    email = raw.get("email")

    if not isinstance(user_id, int):
        raise ValueError("id must be int")
    if not isinstance(email, str):
        raise ValueError("email must be str")

    return User(id=user_id, email=email)
```

This code uses runtime checks to construct a typed internal model. Type checkers help after that point, but runtime validation is what crosses the trust boundary.

| Design question                                    | Python-specific answer                                       |
| -------------------------------------------------- | ------------------------------------------------------------ |
| Can annotations prevent bad JSON from entering?    | No.                                                          |
| Can annotations help prevent misuse after parsing? | Yes, with type checking.                                     |
| Can dataclasses enforce field types?               | Not by default.                                              |
| Can validators enforce field types?                | Yes, if explicitly used.                                     |
| Can protocols guarantee a runtime object is safe?  | No; they express expected behavior for tools and design.     |
| Can tests replace type checking?                   | No; they catch examples, not all structural inconsistencies. |
| Can type checking replace tests?                   | No; behavior and runtime boundaries still need tests.        |

**Design meaning.** Python’s type safety is not a single mechanism. It is a layered practice combining runtime semantics, annotations, static tools, parsers, validators, tests, and code review. The language intentionally allows code to run without most static guarantees.

**Failure-first explanation.**

The tempting but wrong mental model is: once code passes a type checker, data modeling is safe. The surprising behavior is that malformed runtime input, incorrect validation, bad casts, monkey patching, dynamic attributes, and framework behavior can still violate expectations. The correct semantic explanation is that type checking reasons about annotated code under assumptions; it does not prove the external world. The professional rule of thumb is: use type checking to protect internal structure, use validation to protect boundaries, and use tests to protect behavior. The boundary where the rule changes is formally verified or generated systems, which are outside ordinary Python practice.

**Common Pitfalls.** Do not use passing type checks as proof of runtime data validity. Do not silence checker errors with `Any` or `cast` without a real invariant. Do not assume dataclass construction is validation. Do not trust plugin or external objects merely because they satisfy an expected shape. Do not skip behavior tests because annotations look precise.

### Data Modeling Decision Table — choosing representations under real constraints

Python data modeling becomes clearer when representation is chosen by task, not by habit.

| Task pattern                    | Preferred starting point                         | Use stronger option when                  | Avoid                                  |                 |
| ------------------------------- | ------------------------------------------------ | ----------------------------------------- | -------------------------------------- | --------------- |
| Temporary local grouping        | Tuple or small dict                              | Meaning escapes local context             | Large positional tuples                |                 |
| Stable passive record           | `dataclass`                                      | Need validation, immutability, or methods | Raw dicts across core logic            |                 |
| Public JSON-like shape          | `TypedDict` plus validation                      | Shape is complex or domain-rich           | Treating `TypedDict` as runtime schema |                 |
| Domain value with invariants    | Frozen dataclass or custom class                 | Invalid values are costly                 | Raw primitive obsession                |                 |
| Finite status/mode              | `Enum`, `StrEnum`, or `Literal`                  | Public/runtime domain state matters       | Unconstrained strings everywhere       |                 |
| Optional result                 | `T                                               | None`                                     | Need failure reason                    | Falsey fallback |
| Exceptional failure             | Custom exception                                 | Caller must distinguish failure cause     | Returning `None` for many failures     |                 |
| Collection input                | `Iterable`, `Sequence`, `Mapping` as needed      | Mutation or concrete methods required     | Over-specific `list`/`dict`            |                 |
| Mutable internal state          | Private mutable container                        | Public read access needed                 | Returning internal mutable object      |                 |
| Shared read-only data           | Tuple, frozenset, mapping view, frozen dataclass | Nested mutation matters                   | Assuming shallow immutability          |                 |
| External untrusted data         | `object` or raw decoded form at boundary         | After validation                          | Annotating raw data as trusted model   |                 |
| Reusable helper                 | Generic with `TypeVar` only if relation matters  | Library API needs precision               | Decorative generics                    |                 |
| Behavioral requirement          | `Protocol` or standard ABC                       | Exact class/lifecycle matters             | Overusing `isinstance`                 |                 |
| Performance-sensitive bulk data | Specialized arrays/native libraries              | Pure Python object overhead dominates     | Premature custom optimization          |                 |

The central practical rule is:

**Use the simplest representation that preserves the domain distinction, ownership rule, validation boundary, and operations that matter.**

That rule prevents two opposite failures: weak modeling that lets invalid states spread, and overmodeling that creates ceremony without safety.

### Interdisciplinary Lens: Type Theory — static descriptions versus runtime inhabitants

**What it clarifies:** Python annotations describe expected sets of values and relationships between operations, but runtime Python still executes object behavior dynamically.

**Language feature involved:** `T | None`, `Protocol`, `TypeVar`, `Generic`, `TypedDict`, `Literal`, `Any`, `object`.

**Practical consequence:** type annotations are most useful when they express real relationships: optionality, container element types, protocol capabilities, domain distinctions, and generic preservation. They become harmful when used as decoration or as false runtime guarantees.

**Limit of the lens:** Python’s type system is gradual and tool-mediated. It is not a sound, fully enforced static type system in the way a language like Haskell or Rust aims to be. Type-theoretic vocabulary helps explain constraints, but it must not obscure Python’s dynamic runtime.

### Interdisciplinary Lens: Software Engineering — data boundaries as architecture

**What it clarifies:** data modeling is architectural boundary design. The difference between raw input, parsed input, validated domain data, persistence models, API payloads, and view models matters.

**Language feature involved:** dataclasses, dictionaries, `TypedDict`, validation functions, exceptions, modules, type annotations.

**Practical consequence:** large Python systems should prevent external data shapes from leaking into core logic. Good architecture often means converting early into explicit internal representations.

**Limit of the lens:** not every script needs layered architecture. For small automation tasks, direct dictionaries and simple conversions may be correct.

### Interdisciplinary Lens: Runtime Systems — objects have cost

**What it clarifies:** every Python value is an object with runtime representation, identity, type information, and overhead. Modeling choices have memory and performance implications.

**Language feature involved:** dataclasses, classes, dictionaries, tuples, lists, enums, wrappers, object allocation.

**Practical consequence:** domain wrappers, dataclasses, and rich objects improve correctness but may increase allocation and indirection. In ordinary application code, clarity usually wins. In performance-sensitive code, measurement is required.

**Limit of the lens:** object overhead should not cause premature optimization. Python’s performance bottlenecks often come from algorithmic choices, I/O, database access, or pure-Python loops rather than a single dataclass.
## PART 4 — Control Flow, Functions, Abstraction, and Composition by Task Pattern

### Behavior Design in Python — functions first, objects when state or protocol matters

Python behavior design begins with a simple question:

**Is the behavior primarily a transformation, a procedure, a stateful operation, or a protocol implementation?**

Python supports all of these, but it does not force one dominant abstraction style. Good Python code often starts with ordinary functions and only moves toward classes, decorators, descriptors, protocols, or metaprogramming when the problem actually requires them.

| Behavioral task                  | Good starting construct                        | Move to stronger abstraction when                                             | Common overuse                       |
| -------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------ |
| Transform one value into another | Function                                       | Need reusable configuration or polymorphism                                   | Class with one trivial method        |
| Perform a sequence of steps      | Function or module-level procedure             | Need shared state, lifecycle, or dependency injection                         | Framework-like class hierarchy       |
| Maintain state over time         | Class, closure, generator, object with methods | State has invariants or lifecycle                                             | Global variables                     |
| Iterate lazily                   | Generator function or iterator object          | Need complex state machine or multiple methods                                | Eager list construction              |
| Customize built-in syntax        | Dunder protocol methods                        | Object should naturally behave like collection, number, context manager, etc. | Clever operator overloading          |
| Wrap behavior                    | Decorator or higher-order function             | Cross-cutting concern is reusable                                             | Decorator hiding business logic      |
| Express capability contract      | Protocol or standard ABC                       | Public API depends on behavior, not concrete type                             | Exact-class checking                 |
| Organize related operations      | Module or class                                | State/invariants bind operations together                                     | Utility class full of static methods |

Python’s design favors **low ceremony first**. A function is not a lesser abstraction. In many Python programs, a well-named function is the clearest, most testable, and most maintainable unit of behavior.

```python
def normalize_email(raw: str) -> str:
    return raw.strip().casefold()
```

A class becomes justified when there is meaningful state, invariant, lifecycle, protocol participation, or multiple operations that naturally belong to the same object.

```python
class EmailNormalizer:
    def __init__(self, allowed_domains: set[str]) -> None:
        self.allowed_domains = set(allowed_domains)

    def normalize(self, raw: str) -> str:
        email = raw.strip().casefold()
        domain = email.rsplit("@", 1)[-1]
        if domain not in self.allowed_domains:
            raise ValueError(f"unsupported domain: {domain}")
        return email
```

The class is justified because it carries configuration and enforces a policy over repeated calls.

**Design meaning.** Python’s first-class functions, dynamic object model, and protocol system make abstraction cheap. The danger is not lack of abstraction; it is premature abstraction. Python punishes designs that import heavy class hierarchies from Java-like habits or dense functional idioms from languages where the surrounding type system supports them more strongly.

**Failure-first explanation.**

The tempting but wrong mental model is: professional code should turn most behavior into classes. The surprising result is a codebase full of small objects with unclear state, unnecessary indirection, and weak data flow. The correct semantic explanation is that Python functions are full runtime objects and can already be passed, composed, decorated, tested, and stored. The professional rule of thumb is: start with functions for stateless behavior, use classes when state/invariants/lifecycle/protocol behavior matter, and use modules to group related functions. The boundary where the rule changes is framework integration or domain modeling where object identity and lifecycle are central.

**Common Pitfalls.** Do not create a class merely to hold one stateless function. Do not use global state as a substitute for explicit objects. Do not use inheritance before testing whether composition or a function parameter would be clearer. Do not hide simple data transformations behind opaque framework abstractions.

### Choosing Control Flow — direct branch, lookup table, polymorphism, pattern matching

Python has multiple ways to express branching. The right one depends on whether the decision is based on a condition, a finite value, object behavior, or data structure.

| Task                      | Construct                | When to use                                | Tradeoff                   | Common pitfall                          |
| ------------------------- | ------------------------ | ------------------------------------------ | -------------------------- | --------------------------------------- |
| Simple condition          | `if` / `elif` / `else`   | Few branches, conditions are clear         | Direct and readable        | Long chains with repeated structure     |
| Branch by finite key      | Dictionary dispatch      | Many simple value-to-function cases        | Compact and extensible     | Hiding complex validation               |
| Branch by object behavior | Polymorphism or protocol | Behavior belongs to object type/capability | Reduces central branching  | Overbuilt inheritance                   |
| Branch by data shape      | `match` / `case`         | Structural alternatives are central        | Declarative shape handling | Treating `match` as ordinary switch     |
| Branch by predicate list  | Ordered rule table       | Configurable or data-driven rules          | Flexible                   | Hard to debug if rules are opaque       |
| Branch with early returns | Guard clauses            | Invalid/special cases first                | Reduces nesting            | Too many scattered exits                |
| Branch by exception       | `try` / `except`         | Operation naturally fails by exception     | Clear boundary for failure | Using exceptions for ordinary selection |

Simple branching should remain simple.

```python
def shipping_label(country: str) -> str:
    if country == "JP":
        return "domestic"
    if country in {"US", "CA", "GB", "FR"}:
        return "international"
    return "manual-review"
```

When mapping values to behavior, dictionary dispatch may be clearer.

```python
def handle_create(payload: dict[str, object]) -> None:
    ...

def handle_delete(payload: dict[str, object]) -> None:
    ...

HANDLERS = {
    "create": handle_create,
    "delete": handle_delete,
}

def handle_event(event: dict[str, object]) -> None:
    kind = event.get("type")
    handler = HANDLERS.get(kind)

    if handler is None:
        raise ValueError(f"unknown event type: {kind!r}")

    handler(event)
```

Dictionary dispatch works best when each branch delegates to a named function. It becomes obscure when lambdas, nested expressions, and side effects are embedded directly in the table.

Structural pattern matching is better when shape matters.

```python
def describe_command(command: object) -> str:
    match command:
        case {"action": "open", "path": str(path)}:
            return f"open {path}"
        case {"action": "close"}:
            return "close"
        case ["echo", *words]:
            return " ".join(words)
        case _:
            return "unknown command"
```

Polymorphism is better when behavior belongs to the object.

```python
class Notification:
    def send(self) -> None:
        raise NotImplementedError

class EmailNotification(Notification):
    def send(self) -> None:
        ...

class SmsNotification(Notification):
    def send(self) -> None:
        ...

def send_all(notifications: list[Notification]) -> None:
    for notification in notifications:
        notification.send()
```

In Python, this does not always require inheritance. A protocol may be enough.

```python
from typing import Protocol

class Sendable(Protocol):
    def send(self) -> None:
        ...

def send_all(notifications: list[Sendable]) -> None:
    for notification in notifications:
        notification.send()
```

This expresses the behavioral requirement without forcing a shared base class.

**API design choice × readability × safety × flexibility.**

| Choice              | Readability                          | Safety                             | Flexibility     | Best use                        |
| ------------------- | ------------------------------------ | ---------------------------------- | --------------- | ------------------------------- |
| `if` / `elif`       | High for few cases                   | Depends on conditions              | Moderate        | Local direct decisions          |
| Dispatch dictionary | High when handlers are named         | Good if keys validated             | High            | Command/event dispatch          |
| `match`             | High for structural data             | Depends on coverage and validation | High for shapes | Parsers, commands, variant data |
| Polymorphism        | High when behavior belongs to object | Good with protocol/tests/types     | High            | Domain behaviors                |
| Rule list           | Moderate                             | Depends on rule design             | Very high       | Configurable policy engines     |
| Exception flow      | High for failure boundaries          | Good if specific                   | Moderate        | Parse/fail/recover flows        |

**Design meaning.** Python does not privilege one branching mechanism. It provides direct control flow, first-class functions, object dispatch, and structural matching. This supports expressive design but requires judgment: the form of control flow should reflect the reason for the decision.

**Failure-first explanation.**

The tempting but wrong mental model is: `match` should replace all long `if` chains. The surprising result is pattern matching used for ordinary boolean logic, making code less familiar and sometimes semantically wrong because patterns are not normal expressions. The correct semantic explanation is that `match` is for structural patterns, not general condition dispatch. The professional rule of thumb is: use `if` for conditions, dispatch tables for value-to-handler mapping, protocols/polymorphism for object-owned behavior, and `match` for shape-based branching. The boundary where the rule changes is parser-like or interpreter-like code, where shape and value often combine.

**Common Pitfalls.** Do not use `match` merely because it looks modern. Do not build a dictionary dispatch table full of anonymous complex lambdas. Do not replace clear object behavior with central type-checking branches. Do not hide security or validation decisions inside generic dispatch. Do not use broad exception handling as a branch mechanism.

### Guard Clauses and Early Returns — reducing nesting, making invalid states explicit

Python code often becomes clearer when special or invalid cases are handled early.

```python
def calculate_discount(price: int, member: bool) -> int:
    if price < 0:
        raise ValueError("price cannot be negative")

    if not member:
        return 0

    if price >= 10_000:
        return 2_000

    return 500
```

This avoids deep nesting.

Compare:

```python
def calculate_discount(price: int, member: bool) -> int:
    if price >= 0:
        if member:
            if price >= 10_000:
                return 2_000
            else:
                return 500
        else:
            return 0
    else:
        raise ValueError("price cannot be negative")
```

The second version makes the main path harder to see.

| Pattern                       | Use when                                     | Benefit                        | Risk                                    |
| ----------------------------- | -------------------------------------------- | ------------------------------ | --------------------------------------- |
| Validate then continue        | Inputs have preconditions                    | Core logic assumes valid state | Too much validation repeated internally |
| Return early for trivial case | Special case is simple                       | Reduces indentation            | Multiple returns may obscure lifecycle  |
| Raise early for invalid state | Caller violated contract or boundary invalid | Fail-fast behavior             | Wrong exception type or poor message    |
| Continue early in loop        | Skip invalid/unneeded item                   | Avoids nested loop body        | Too many skip conditions                |
| Break after success           | Search or first-match logic                  | Stops unnecessary work         | Hidden loop exit in complex code        |

Loop guard clauses are also useful.

```python
def active_emails(users: list[User]) -> list[str]:
    result: list[str] = []

    for user in users:
        if not user.active:
            continue
        if user.email is None:
            continue

        result.append(user.email)

    return result
```

This is clearer than nesting the main action under multiple conditions.

Early returns should not disrupt cleanup. When resources are involved, use context managers.

```python
def read_first_line(path: Path) -> str | None:
    with path.open(encoding="utf-8") as file:
        for line in file:
            if line.strip():
                return line.strip()

    return None
```

The `with` block still exits correctly even if the function returns early.

**Design meaning.** Guard clauses fit Python’s readability-oriented style. They make preconditions and edge cases explicit, then leave the main path less indented. But they are still control flow; overuse can fragment reasoning if a function has many exit points with side effects.

**Failure-first explanation.**

The tempting but wrong mental model is: a function should have exactly one return at the end. The surprising result is deeply nested Python code where error cases obscure the normal path. The correct semantic explanation is that Python’s structured blocks and exceptions make early returns safe when resource cleanup is handled correctly. The professional rule of thumb is: use early returns for validation and simple special cases; use `with` for cleanup; avoid many scattered returns in stateful procedures where lifecycle is hard to see. The boundary where the rule changes is code with complex transactions or multi-step state mutation, where a single controlled exit path may be clearer.

**Common Pitfalls.** Do not use early returns to avoid designing clear error boundaries. Do not return silently from invalid states that should raise. Do not scatter returns through a function that mutates several objects unless invariants remain obvious. Do not replace simple boolean expressions with excessive guard clauses.

### Iterating and Transforming Data — loops, comprehensions, generator expressions, built-ins

Python’s data transformation style centers on iteration. The main options are explicit loops, comprehensions, generator expressions, and built-in higher-order operations.

| Task                         | Construct                         | Best use                                     | Tradeoff                 | Common pitfall                         |
| ---------------------------- | --------------------------------- | -------------------------------------------- | ------------------------ | -------------------------------------- |
| Transform every item eagerly | List comprehension                | Direct expression transformation             | Compact and readable     | Too much logic in expression           |
| Filter items eagerly         | List comprehension with `if`      | Simple predicate                             | Clear for simple filters | Multiple complex filters become dense  |
| Build mapping                | Dict comprehension                | Key/value derivation                         | Compact                  | Silent duplicate key overwrite         |
| Build unique set             | Set comprehension                 | Deduplication or membership set              | Clear uniqueness         | Losing order or duplicates             |
| Lazy transformation          | Generator expression              | Streaming into consumer                      | Memory efficient         | Reusing exhausted generator            |
| Multi-step logic             | Explicit loop                     | Complex transformation, errors, side effects | Verbose but clear        | Writing loops for trivial expressions  |
| Aggregate                    | `sum`, `any`, `all`, `min`, `max` | Standard reductions                          | Idiomatic                | Wrong default/empty behavior           |
| Pairwise traversal           | `zip`                             | Parallel iterables                           | Clear                    | Silent truncation unless `strict=True` |
| Indexed traversal            | `enumerate`                       | Need item and index                          | Avoids manual counter    | Using index unnecessarily              |

A direct list transformation:

```python
names = [user.name.casefold() for user in users]
```

A filtered transformation:

```python
active_names = [user.name for user in users if user.active]
```

A generator expression for lazy consumption:

```python
total = sum(order.total for order in orders)
```

This avoids building an intermediate list.

Use an explicit loop when logic has multiple steps.

```python
def valid_emails(users: list[User]) -> list[str]:
    result: list[str] = []

    for user in users:
        if not user.active:
            continue

        email = user.email
        if email is None:
            continue

        normalized = email.strip().casefold()
        if "@" not in normalized:
            continue

        result.append(normalized)

    return result
```

This is more verbose than a comprehension but easier to inspect, debug, and modify.

Dictionary comprehensions can overwrite duplicate keys.

```python
email_by_id = {user.id: user.email for user in users}
```

If duplicate `user.id` values appear, the later value wins. That may be correct, but it should be intentional. If duplicates are invalid, check explicitly.

```python
def index_users(users: list[User]) -> dict[int, User]:
    result: dict[int, User] = {}

    for user in users:
        if user.id in result:
            raise ValueError(f"duplicate user id: {user.id}")
        result[user.id] = user

    return result
```

`any` and `all` short-circuit.

```python
has_admin = any(user.role == "admin" for user in users)
all_active = all(user.active for user in users)
```

These are idiomatic when the predicate is simple.

**Composition option × coupling × maintainability impact.**

| Option                                   | Coupling                   | Maintainability impact                            |
| ---------------------------------------- | -------------------------- | ------------------------------------------------- |
| Comprehension                            | Low for simple expressions | Excellent when direct, poor when dense            |
| Explicit loop                            | Low to moderate            | Excellent for multi-step logic                    |
| Built-in reduction                       | Low                        | Excellent for known patterns                      |
| Chained generator expressions            | Moderate                   | Good for pipelines, poor when debugging is needed |
| Custom helper function                   | Low                        | Good when operation has a domain name             |
| Framework/dataframe/vectorized operation | Higher ecosystem coupling  | Excellent for bulk data when domain fits          |

**Design meaning.** Python makes data transformation concise but not magically simple. The main professional judgment is when to stop compressing logic. Dense comprehensions are not more Pythonic if they hide policy, validation, exception handling, or duplicate behavior.

**Failure-first explanation.**

The tempting but wrong mental model is: comprehensions are always more idiomatic than loops. The surprising result is unreadable one-liners with hidden side effects or repeated expensive work. The correct semantic explanation is that comprehensions are collection-construction expressions, not a replacement for all iteration. The professional rule of thumb is: use comprehensions for direct mapping/filtering; use loops for multi-step, stateful, effectful, or failure-sensitive logic. The boundary where the rule changes is performance-sensitive numeric/data processing, where specialized libraries may be more appropriate than either pure-Python loops or comprehensions.

**Common Pitfalls.** Do not use comprehensions for side effects. Do not hide duplicate-key policy in dict comprehensions. Do not materialize large lists when a generator is enough. Do not reuse exhausted generators. Do not use `map` and `filter` mechanically when comprehensions are clearer. Do not chain transformations so densely that intermediate states cannot be named.

### Designing Function Signatures — positional, keyword-only, defaults, variadic parameters

A Python function signature is a public interface. It communicates required data, optional policy, ownership expectations, and compatibility constraints.

```python
def connect(host: str, port: int, *, timeout: float = 5.0, use_tls: bool = True) -> Connection:
    ...
```

Here, `host` and `port` are positional because they are central required arguments. `timeout` and `use_tls` are keyword-only because they are options whose meaning is clearer at the call site.

| Signature feature         | Use when                                      | Example              | Benefit                                 | Pitfall                                |                      |
| ------------------------- | --------------------------------------------- | -------------------- | --------------------------------------- | -------------------------------------- | -------------------- |
| Positional parameter      | Meaning is obvious and required               | `open(path)`         | Concise calls                           | Ambiguous long argument lists          |                      |
| Keyword argument          | Meaning benefits from name                    | `timeout=5.0`        | Clear call sites                        | Overly verbose for obvious values      |                      |
| Keyword-only parameter    | Option/policy/boolean                         | `*, strict=True`     | Prevents unreadable positional booleans | Too many options indicate design smell |                      |
| Positional-only parameter | Low-level API or name flexibility             | `def f(x, /):`       | Allows internal rename                  | Unusual in ordinary application code   |                      |
| Default value             | Truly optional parameter                      | `limit=100`          | Simple API                              | Mutable default bug                    |                      |
| `*args`                   | Arbitrary positional forwarding               | wrapper functions    | Flexible                                | Hides accepted API                     |                      |
| `**kwargs`                | Arbitrary named forwarding                    | decorators, adapters | Flexible                                | Silences mistakes                      |                      |
| `None` default            | Missing value or deferred construction        | `timeout: float      | None = None`                            | Distinguishes omitted policy           | Overloaded semantics |
| Sentinel default          | Need distinguish omitted from explicit `None` | internal `MISSING`   | Precise API                             | More complex typing                    |                      |

Boolean parameters often deserve keyword-only syntax.

```python
def render_report(report: Report, *, include_archived: bool = False) -> str:
    ...
```

This call is self-explanatory:

```python
render_report(report, include_archived=True)
```

This is not:

```python
render_report(report, True)
```

Avoid long positional signatures.

```python
# Poor API
create_user("ada", "ada@example.com", True, False, 3, "admin")
```

Prefer named options, dataclasses, or configuration objects when the parameter set becomes large.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class CreateUserOptions:
    send_welcome_email: bool = True
    require_password_reset: bool = False
    retry_count: int = 3
    role: str = "user"

def create_user(name: str, email: str, *, options: CreateUserOptions = CreateUserOptions()) -> User:
    ...
```

Be careful: using a dataclass instance as a default is safe only if it is immutable or treated as immutable. If the options object is mutable, use `None` plus construction.

Variadic arguments are useful for wrappers:

```python
from collections.abc import Callable
from typing import TypeVar, ParamSpec

P = ParamSpec("P")
R = TypeVar("R")

def traced(function: Callable[P, R]) -> Callable[P, R]:
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        print(f"calling {function.__name__}")
        return function(*args, **kwargs)

    return wrapper
```

This is advanced typing, but the design issue is simple: wrappers should preserve the original callable’s interface when possible.

Avoid `**kwargs` as a substitute for explicit design:

```python
def configure(**kwargs):
    ...
```

This gives callers little help unless the accepted keys are documented, validated, and tested.

**API design choice × readability × safety × flexibility.**

| Choice                            | Readability                           | Safety                | Flexibility    |
| --------------------------------- | ------------------------------------- | --------------------- | -------------- |
| Explicit positional required args | High for core values                  | Good                  | Moderate       |
| Keyword-only options              | High                                  | Good                  | High           |
| Many optional parameters          | Declines as count grows               | Moderate              | High but noisy |
| Options dataclass                 | High for grouped policy               | Good                  | High           |
| `**kwargs`                        | Low unless documented                 | Low by default        | Very high      |
| Sentinel-based omission           | Moderate                              | High for precise APIs | Moderate       |
| Overloaded signatures             | High for type checkers when done well | Static only           | Moderate       |

**Design meaning.** Python’s flexible call syntax supports clean APIs, but it also makes vague APIs easy. Professional function signatures should reduce ambiguity at call sites, express optionality precisely, and avoid accepting more shapes than the function can responsibly handle.

**Failure-first explanation.**

The tempting but wrong mental model is: flexible signatures are user-friendly. The surprising result is that `*args` and `**kwargs` hide mistakes, weaken editor support, and make refactoring harder. The correct semantic explanation is that a function signature is a contract; excessive flexibility weakens that contract. The professional rule of thumb is: make ordinary APIs explicit; reserve variadic signatures for wrappers, decorators, dispatch layers, and genuinely open-ended interfaces. The boundary where the rule changes is framework code, where accepting and forwarding flexible arguments may be the central purpose.

**Common Pitfalls.** Do not use positional booleans in public APIs when keyword-only flags are clearer. Do not use mutable defaults. Do not accept `**kwargs` without validation. Do not overload a single function with many unrelated meanings. Do not make parameters optional merely because a default is easy to provide.

### Returning Values and Modeling Failure — return value, `None`, exception, result object

A function’s return design should communicate what the caller can expect and how failure is represented.

| Task                      | Return strategy                | Use when                                      | Pitfall                                     |                     |
| ------------------------- | ------------------------------ | --------------------------------------------- | ------------------------------------------- | ------------------- |
| Always produce value      | Return `T`                     | Function can fulfill contract or raise on bug | Hidden sentinel values                      |                     |
| Optional result           | Return `T                      | None`                                         | Missing is normal and simple                | Missing reason lost |
| Failure with explanation  | Raise exception                | Caller cannot proceed normally                | Overusing exceptions for ordinary branching |                     |
| Multiple outputs          | Return tuple/dataclass         | Values belong together                        | Positional ambiguity                        |                     |
| Status plus value         | Return result object/dataclass | Need explicit success/failure data            | Reinventing exceptions poorly               |                     |
| Mutate and return nothing | Return `None`                  | Operation is side effect                      | Confusing command/query behavior            |                     |
| Fluent return             | Return `self`                  | Builder-like API                              | Encouraging mutation chains                 |                     |

Optional return:

```python
def find_user(users: list[User], email: str) -> User | None:
    for user in users:
        if user.email == email:
            return user
    return None
```

This is fine when absence is normal and no explanation is needed.

Raise an exception when absence violates the expected contract.

```python
def require_user(users: list[User], email: str) -> User:
    user = find_user(users, email)
    if user is None:
        raise LookupError(f"user not found: {email}")
    return user
```

Return a structured object when success/failure is data that must be handled explicitly.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class ImportResult:
    imported: int
    skipped: int
    errors: tuple[str, ...]

def import_rows(rows: list[dict[str, object]]) -> ImportResult:
    ...
```

Avoid returning `None` for many unrelated reasons.

```python
def parse_user(raw: object) -> User | None:
    ...
```

If `None` can mean wrong shape, missing field, invalid email, unsupported status, or permission failure, the caller has too little information. Raise a specific exception or return a structured result.

Command-query separation is useful in Python even though the language does not enforce it. A function that mutates state should usually not also return a surprising value.

```python
users.sort()          # mutates list, returns None
sorted_users = sorted(users)  # returns new list
```

This standard-library distinction is instructive: mutating methods often return `None` to avoid confusion.

**Design meaning.** Python gives no checked exception system and no standard `Result` type. Function return design is therefore a matter of API discipline. The right choice depends on whether failure is ordinary absence, contract violation, recoverable error, or accumulated diagnostic data.

**Failure-first explanation.**

The tempting but wrong mental model is: returning `None` is the simplest way to signal any problem. The surprising result is that callers cannot distinguish missing data from invalid data, permission failure, parse failure, or internal bugs. The correct semantic explanation is that `None` represents absence, not arbitrary failure explanation. The professional rule of thumb is: use `T | None` for ordinary absence, exceptions for failed contracts or recovery boundaries, and structured results when the caller needs detailed non-exceptional diagnostics. The boundary where the rule changes is performance-sensitive or low-level code where exception overhead or control-flow style may justify explicit status objects.

**Common Pitfalls.** Do not return `None` for unrelated failure modes. Do not both mutate and return a value unless the API convention is clear. Do not raise generic `Exception`. Do not force callers to parse error strings. Do not use exceptions for expected high-volume negative lookups if optional return is clearer.

### Closures and State — enclosed variables, late binding, factories, small stateful behavior

A closure is a function that refers to variables from an enclosing function scope.

```python
def make_multiplier(factor: int):
    def multiply(value: int) -> int:
        return value * factor

    return multiply
```

Here, `multiply` closes over `factor`.

Closures are useful for small configured behavior.

```python
double = make_multiplier(2)
triple = make_multiplier(3)
```

| Task                          | Closure fit | Alternative                       | Tradeoff                                          |
| ----------------------------- | ----------- | --------------------------------- | ------------------------------------------------- |
| Small configured function     | Good        | Callable class                    | Closure is concise, class is inspectable          |
| Stateful counter              | Sometimes   | Small class                       | Closure hides state, class names it               |
| Decorator implementation      | Very good   | Class decorator                   | Closure naturally captures wrapped function       |
| Complex lifecycle             | Poor        | Class/context manager             | Closure becomes opaque                            |
| Multiple related methods      | Poor        | Class                             | Closure cannot expose cohesive method set cleanly |
| Callback with captured values | Good        | `functools.partial`, small object | Closure is flexible                               |

Stateful closure:

```python
def make_counter():
    count = 0

    def next_count() -> int:
        nonlocal count
        count += 1
        return count

    return next_count
```

This works, but for richer state a class is clearer.

```python
class Counter:
    def __init__(self) -> None:
        self.count = 0

    def next_count(self) -> int:
        self.count += 1
        return self.count
```

Closures have late binding behavior.

```python
functions = []

for i in range(3):
    functions.append(lambda: i)

[f() for f in functions]  # [2, 2, 2]
```

Each lambda refers to the same variable `i`, whose final value is `2`.

Bind current values explicitly if needed:

```python
functions = []

for i in range(3):
    functions.append(lambda i=i: i)

[f() for f in functions]  # [0, 1, 2]
```

`functools.partial` is sometimes clearer than a closure for argument binding.

```python
from functools import partial

def multiply(factor: int, value: int) -> int:
    return factor * value

double = partial(multiply, 2)
```

**Design meaning.** Closures exist because functions are first-class objects and scopes can outlive their original call. This makes Python expressive for callbacks, decorators, factories, and lightweight configuration. The cost is hidden state and late-binding surprises.

**Failure-first explanation.**

The tempting but wrong mental model is: a closure captures the value a variable had when the function was created. The surprising behavior is that loop-created closures often all observe the final loop value. The correct semantic explanation is that closures capture bindings, not frozen values. The professional rule of thumb is: bind current values explicitly in loop-created closures, and use a class when state needs a clear name, multiple operations, or lifecycle management. The boundary where the rule changes is intentional shared closure state, where observing later mutation is the point.

**Common Pitfalls.** Do not create closures in loops without understanding late binding. Do not hide complex mutable state inside nested functions. Do not use `nonlocal` heavily when a small class would be clearer. Do not use closures to avoid designing a real object lifecycle. Do not assume closures are automatically more functional or safer than classes.

### Generators and Lazy Control Flow — `yield`, generator expressions, streaming, backpressure

Generators express lazy production of values. A generator function contains `yield`; calling it returns a generator object rather than executing the body immediately.

```python
def read_nonempty_lines(path: Path):
    with path.open(encoding="utf-8") as file:
        for line in file:
            stripped = line.strip()
            if stripped:
                yield stripped
```

The function body runs as the generator is consumed.

```python
for line in read_nonempty_lines(Path("data.txt")):
    process(line)
```

| Task                              | Construct                    | When to use                       | Tradeoff                           | Common pitfall                             |
| --------------------------------- | ---------------------------- | --------------------------------- | ---------------------------------- | ------------------------------------------ |
| Produce values lazily             | Generator function           | Sequence may be large or infinite | Memory efficient                   | Generator is one-shot                      |
| Transform lazily                  | Generator expression         | Simple pipeline into consumer     | Compact                            | Hard to inspect intermediate states        |
| Encapsulate iteration logic       | Generator function           | Multi-step production             | Clearer than custom iterator class | Hidden resource lifetime if misused        |
| Maintain iteration state          | Generator or iterator object | State evolves per item            | Concise state machine              | Cannot easily expose multiple methods      |
| Stream file/database/network data | Generator                    | Avoid loading all data            | Efficient memory use               | Resource must remain open during iteration |
| Precompute all values             | List comprehension           | Data small and reused             | Easy repeated traversal            | Wasteful for large streams                 |

Generator functions are ideal for streaming transformations.

```python
def parse_ints(lines: Iterable[str]) -> Iterator[int]:
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        yield int(stripped)
```

This does not allocate a full list. It produces each integer as requested.

Generator expressions are useful when the transformation is simple and immediately consumed.

```python
total = sum(order.total for order in orders)
```

The expression produces values lazily into `sum`.

But generators are one-shot.

```python
values = (n * n for n in range(3))

list(values)  # [0, 1, 4]
list(values)  # []
```

This behavior is correct: a generator is an iterator with internal state. Once exhausted, it does not restart.

Resource lifetime deserves special care. This is safe:

```python
def lines(path: Path) -> Iterator[str]:
    with path.open(encoding="utf-8") as file:
        for line in file:
            yield line
```

The file remains open while the generator is being consumed and closes when the generator finishes or is closed. But if callers store the generator without consuming it, resource lifetime can become less obvious. For simple file processing, a context manager plus direct loop may be clearer.

Generators can also receive values through `.send()` and participate in coroutine-like patterns, but modern application-level asynchronous programming usually uses `async`/`await` rather than generator-based coroutine protocols.

**Design meaning.** Generators are Python’s lightweight mechanism for lazy sequences and resumable execution. They turn control flow into an object that can be passed around and consumed. This is powerful for streaming and pipelines, but it introduces statefulness and exhaustion.

**Failure-first explanation.**

The tempting but wrong mental model is: a generator is just a compact list. The surprising behavior is that it does not store all values and cannot be reused after exhaustion. The correct semantic explanation is that a generator is a stateful iterator that resumes execution at each `yield`. The professional rule of thumb is: use generators for single-pass streams and large transformations; materialize to `list` only when repeated traversal, indexing, sorting, or stable snapshot semantics are needed. The boundary where the rule changes is small data, where list comprehensions may be clearer and the memory cost irrelevant.

**Common Pitfalls.** Do not reuse exhausted generators. Do not hide resource ownership in generators without documenting consumption expectations. Do not convert huge generators to lists accidentally. Do not use generator expressions when intermediate names would make logic clearer. Do not assume laziness improves performance if the bottleneck is elsewhere.

### Higher-Order Functions and Function Composition — callbacks, `map`, `filter`, `sorted`, `partial`

Python functions are first-class objects. They can be passed as arguments, returned from functions, stored in collections, decorated, and called dynamically.

```python
def apply_discount(price: int, rule: Callable[[int], int]) -> int:
    return rule(price)
```

Higher-order functions are common in Python, but Python is not optimized around a dense point-free functional style. The best style is usually explicit and named.

| Task                 | Construct/API                     | Best use                           | Tradeoff                   | Common pitfall                               |
| -------------------- | --------------------------------- | ---------------------------------- | -------------------------- | -------------------------------------------- |
| Sort by derived key  | `sorted(items, key=function)`     | Ordering by field/computation      | Clear and efficient        | Complex inline lambda                        |
| Transform collection | Comprehension or `map`            | Comprehension usually clearer      | `map` is lazy              | Using `map` where comprehension reads better |
| Filter collection    | Comprehension or `filter`         | Comprehension usually clearer      | `filter` is lazy           | Predicate hidden behind unclear function     |
| Bind some arguments  | `functools.partial`               | Configure callable                 | Avoids closure boilerplate | Obscure partial chains                       |
| Combine predicates   | Named helper functions            | Business rules                     | Testable                   | Anonymous nested lambdas                     |
| Callback API         | Function, method, callable object | Event hooks, sorting, retry policy | Flexible                   | Callback signature undocumented              |
| Decorate behavior    | Decorator                         | Cross-cutting wrapper              | Reusable                   | Hidden control flow                          |

Sorting with a key function is one of the most idiomatic uses.

```python
users = sorted(users, key=lambda user: user.last_login)
```

If the key is more complex, name it.

```python
def user_sort_key(user: User) -> tuple[int, str]:
    return user.priority, user.name.casefold()

users = sorted(users, key=user_sort_key)
```

`map` and `filter` are valid Python, but comprehensions are often more readable.

```python
names = [user.name for user in users]
active_users = [user for user in users if user.active]
```

A `map` version may be appropriate when the function already exists and the result is consumed lazily:

```python
normalized = map(normalize_email, raw_emails)
```

`functools.partial` creates a callable with some arguments pre-filled.

```python
from functools import partial

def send(template: str, user: User) -> None:
    ...

send_welcome = partial(send, "welcome")
```

This is clear when the resulting callable has a meaningful name. It becomes difficult when partials are nested or used without naming.

Callback signatures should be explicit. A function accepting a callback should document what arguments are passed and what return value means.

```python
from collections.abc import Callable

def retry(operation: Callable[[], T], *, attempts: int) -> T:
    last_error: Exception | None = None

    for _ in range(attempts):
        try:
            return operation()
        except Exception as error:
            last_error = error

    assert last_error is not None
    raise last_error
```

This example is simplified; real retry logic should avoid catching overly broad exceptions unless the boundary is deliberate. The type shape matters: `operation` takes no arguments and returns `T`.

**Design meaning.** Higher-order functions fit Python because functions are objects and behavior can be passed directly. But Python’s readability culture usually favors named helpers over dense chains of anonymous transformations.

**Failure-first explanation.**

The tempting but wrong mental model is: more functional composition means more elegant Python. The surprising result is code where the data path is hidden inside nested lambdas, `map`, `filter`, `partial`, and decorators. The correct semantic explanation is that Python supports higher-order functions but does not require functional compression. The professional rule of thumb is: pass functions when behavior is truly variable; name nontrivial behavior; prefer comprehensions and loops when they reveal intent better. The boundary where the rule changes is library or framework code where callbacks are the natural extension point.

**Common Pitfalls.** Do not wrap existing callables unnecessarily. Do not write complex lambdas where a named function would be clearer. Do not use `map`/`filter` for side effects. Do not design callback APIs without documenting signatures and exception behavior. Do not hide business rules inside anonymous callables that cannot be tested directly.

### Decorators — wrapping functions, metadata preservation, cross-cutting behavior

A decorator is a callable applied to a function or class at definition time. The common case is a function decorator that returns a replacement function.

```python
def traced(function):
    def wrapper(*args, **kwargs):
        print(f"calling {function.__name__}")
        return function(*args, **kwargs)

    return wrapper

@traced
def greet(name: str) -> str:
    return f"hello {name}"
```

This is equivalent to:

```python
def greet(name: str) -> str:
    return f"hello {name}"

greet = traced(greet)
```

Decorators are ordinary Python object transformations, not compiler magic.

| Decorator use        | Appropriate when                       | Benefit                      | Risk                                    |
| -------------------- | -------------------------------------- | ---------------------------- | --------------------------------------- |
| Logging/tracing      | Cross-cutting diagnostics              | Removes repeated boilerplate | Noisy or leaks sensitive data           |
| Timing/profiling     | Measure function duration              | Local observability          | Misleading benchmarks                   |
| Caching              | Pure or mostly pure expensive function | Performance                  | Stale data, memory growth               |
| Validation           | Repeated boundary checks               | Centralized checks           | Hidden control flow                     |
| Authorization        | Framework request boundaries           | Policy reuse                 | Security hidden behind decoration       |
| Registration         | Plugin/route/test registration         | Declarative integration      | Import-time side effects                |
| Retry                | External flaky operations              | Reusable resilience          | Repeating non-idempotent operations     |
| Class transformation | Dataclasses, frameworks                | Reduces boilerplate          | Generated behavior may be misunderstood |

A professional decorator should usually preserve function metadata with `functools.wraps`.

```python
from functools import wraps
from collections.abc import Callable
from typing import TypeVar, ParamSpec

P = ParamSpec("P")
R = TypeVar("R")

def traced(function: Callable[P, R]) -> Callable[P, R]:
    @wraps(function)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        print(f"calling {function.__name__}")
        return function(*args, **kwargs)

    return wrapper
```

Without `wraps`, the decorated function may lose useful metadata such as name, docstring, annotations, and introspection behavior.

Decorators can be parameterized.

```python
from functools import wraps
from collections.abc import Callable
from typing import TypeVar, ParamSpec

P = ParamSpec("P")
R = TypeVar("R")

def retry(*, attempts: int) -> Callable[[Callable[P, R]], Callable[P, R]]:
    def decorate(function: Callable[P, R]) -> Callable[P, R]:
        @wraps(function)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
            last_error: Exception | None = None

            for _ in range(attempts):
                try:
                    return function(*args, **kwargs)
                except Exception as error:
                    last_error = error

            assert last_error is not None
            raise last_error

        return wrapper

    return decorate
```

Usage:

```python
@retry(attempts=3)
def fetch_profile(user_id: int) -> Profile:
    ...
```

This simplified retry decorator catches broad exceptions, which may be wrong in real code. A production retry decorator should specify which exceptions are retryable and consider idempotency.

Decorators can obscure control flow. A decorated function may cache, retry, authorize, validate, register, convert, or suppress behavior that is not visible in the function body.

**Design meaning.** Decorators embody Python’s runtime object model: functions and classes are objects that can be transformed. They are excellent for reusable cross-cutting behavior, but they can also hide important semantics behind a small marker.

**Failure-first explanation.**

The tempting but wrong mental model is: decorators are harmless annotations. The surprising behavior is that a decorator can replace the function entirely, change its signature, alter its return value, catch exceptions, register it globally, or run code at import time. The correct semantic explanation is that decorator syntax applies a callable transformation at definition time. The professional rule of thumb is: use decorators for behavior that is genuinely cross-cutting and stable; preserve metadata; keep security, retry, caching, and transaction semantics explicit in documentation. The boundary where the rule changes is framework code, where decorators are often the intended public API.

**Common Pitfalls.** Do not write decorators without `functools.wraps` unless metadata loss is intended. Do not hide business-critical control flow behind decorative-looking syntax. Do not catch broad exceptions in decorators without a clear boundary. Do not perform heavy registration or I/O at import time unintentionally. Do not stack many decorators when the resulting behavior becomes unreadable.

### Recursion and Recursive Data Processing — trees, nested structures, limits

Python supports recursion, but it is not optimized around deep recursive programming. There is no general tail-call optimization, and recursion depth is limited.

Recursion is appropriate when the data is naturally recursive: trees, nested expressions, directories, JSON-like structures, syntax trees, and graph traversal with visited-state management.

```python
def count_nodes(node: Node) -> int:
    return 1 + sum(count_nodes(child) for child in node.children)
```

| Task                  | Recursion fit           | Alternative                           | Tradeoff                                  |
| --------------------- | ----------------------- | ------------------------------------- | ----------------------------------------- |
| Tree traversal        | Good                    | Explicit stack                        | Recursion is clear; stack depth may limit |
| Nested JSON-like data | Good for moderate depth | Iterative traversal                   | Recursive code is direct                  |
| Graph traversal       | Possible                | Explicit stack/queue plus visited set | Must avoid cycles                         |
| Numeric loops         | Usually poor            | `for`/`while`                         | Recursion adds overhead                   |
| Very deep data        | Poor                    | Explicit stack                        | Avoid recursion limit                     |
| Parser/evaluator      | Often good              | Parser library/iterative parser       | Recursion maps to grammar                 |

A recursive function over nested lists:

```python
def flatten(values: list[object]) -> list[object]:
    result: list[object] = []

    for value in values:
        if isinstance(value, list):
            result.extend(flatten(value))
        else:
            result.append(value)

    return result
```

This is clear for moderate nesting. For very deep structures, it can hit recursion limits.

Python’s recursion limit exists to prevent uncontrolled C stack overflow in the interpreter. Raising it casually is usually not the right fix.

For deep traversal, use an explicit stack.

```python
def flatten_iterative(values: list[object]) -> list[object]:
    result: list[object] = []
    stack = list(reversed(values))

    while stack:
        value = stack.pop()
        if isinstance(value, list):
            stack.extend(reversed(value))
        else:
            result.append(value)

    return result
```

This is more verbose but avoids recursive call depth.

**Design meaning.** Python allows recursion as a clear expression of recursive structure, but its runtime model favors iteration for deep or performance-sensitive loops. Unlike some functional languages, Python does not treat recursion as the primary looping abstraction.

**Failure-first explanation.**

The tempting but wrong mental model is: tail-recursive Python will be optimized like in some functional languages. The surprising behavior is that recursive calls still consume stack frames and can hit recursion limits. The correct semantic explanation is that Python does not generally perform tail-call optimization. The professional rule of thumb is: use recursion when it directly mirrors moderately deep recursive data; use explicit stacks or loops for deep, large, or performance-sensitive traversal. The boundary where the rule changes is educational code, small tree algorithms, and domain structures with bounded depth.

**Common Pitfalls.** Do not use recursion for ordinary counting loops. Do not assume tail-call optimization. Do not process arbitrary-depth untrusted nested input recursively without safeguards. Do not traverse graphs recursively without cycle detection. Do not raise recursion limits as a first response to poor traversal design.

### Object-Oriented Abstraction — classes, state, invariants, lifecycle

Classes are appropriate when behavior and state belong together. A good Python class usually represents a concept with identity, invariants, lifecycle, or protocol behavior.

```python
class RateLimiter:
    def __init__(self, *, limit: int) -> None:
        if limit <= 0:
            raise ValueError("limit must be positive")
        self._limit = limit
        self._used = 0

    def allow(self) -> bool:
        if self._used >= self._limit:
            return False

        self._used += 1
        return True
```

This class is justified because it owns evolving state and enforces a rule.

| Class is appropriate when     | Example                               | Why                                               |
| ----------------------------- | ------------------------------------- | ------------------------------------------------- |
| Object has state over time    | `RateLimiter`, `Cache`, `Session`     | Functions alone would need explicit state passing |
| Invariants must be maintained | `Money`, `PageRange`                  | Constructor/methods can protect validity          |
| Resource lifecycle matters    | client, connection, transaction       | Object can manage setup/teardown                  |
| Multiple methods share state  | parser, builder, service object       | Cohesion around state                             |
| Object implements protocol    | iterator, context manager, descriptor | Integrates with Python syntax                     |
| Framework expects class       | ORM model, view class, plugin         | Ecosystem convention                              |

Classes are not appropriate merely because code is “professional.”

```python
class StringUtils:
    @staticmethod
    def normalize_email(raw: str) -> str:
        return raw.strip().casefold()
```

In ordinary Python, this is usually worse than:

```python
def normalize_email(raw: str) -> str:
    return raw.strip().casefold()
```

A class with only static methods is often a module in disguise.

Encapsulation in Python is convention-based. Use `_internal` names to communicate non-public implementation details.

```python
class TokenStore:
    def __init__(self) -> None:
        self._tokens: dict[str, str] = {}

    def add(self, user_id: str, token: str) -> None:
        self._tokens[user_id] = token
```

This does not make `_tokens` inaccessible. It signals that external code should not depend on it.

**Design meaning.** Python’s OOP model is flexible and dynamic. It supports classes, inheritance, descriptors, properties, dynamic attributes, and metaclasses. But idiomatic Python does not require class-heavy design. Objects should earn their existence by clarifying state, behavior, or protocol integration.

**Failure-first explanation.**

The tempting but wrong mental model is: a class is the default unit of code organization. The surprising result is utility classes, artificial managers, and inheritance hierarchies that add indirection without invariants. The correct semantic explanation is that Python modules already organize functions and constants, while functions are first-class. The professional rule of thumb is: use classes when state, invariants, lifecycle, or protocol behavior matter; otherwise use functions and modules. The boundary where the rule changes is framework code whose extension mechanism is class-based.

**Common Pitfalls.** Do not write static-method utility classes as a Java habit. Do not expose mutable internals casually. Do not create classes with vague names such as `Manager` or `Processor` unless the responsibility is precise. Do not put heavy I/O in constructors without clear lifecycle semantics. Do not use properties to hide operations that are expensive, asynchronous, or failure-prone.

### Inheritance, Composition, and Protocols — choosing reuse and polymorphism mechanisms

Python supports inheritance, but inheritance is only one abstraction mechanism. Composition and protocols are often better.

| Task                                  | Best mechanism                 | Why                        | Failure mode                    |
| ------------------------------------- | ------------------------------ | -------------------------- | ------------------------------- |
| Reuse implementation detail           | Composition or helper function | Lower coupling             | Inheritance exposes too much    |
| Express substitutable behavior        | Protocol or ABC                | Captures capability        | Exact base class unnecessary    |
| Share stable base behavior            | Inheritance                    | Common algorithm/state     | Fragile base class              |
| Extend framework hook                 | Inheritance                    | Framework expects subclass | Fighting framework model        |
| Add optional behavior                 | Composition/delegation         | Flexible assembly          | Multiple inheritance complexity |
| Adapt external object                 | Wrapper/adapter                | Clear boundary             | Monkey patching external class  |
| Provide default methods with contract | ABC                            | Runtime/nominal clarity    | Overcoupled hierarchy           |

Inheritance example:

```python
class Storage:
    def save(self, key: str, value: bytes) -> None:
        raise NotImplementedError

class MemoryStorage(Storage):
    def __init__(self) -> None:
        self._data: dict[str, bytes] = {}

    def save(self, key: str, value: bytes) -> None:
        self._data[key] = value
```

Protocol alternative:

```python
from typing import Protocol

class Storage(Protocol):
    def save(self, key: str, value: bytes) -> None:
        ...

class MemoryStorage:
    def __init__(self) -> None:
        self._data: dict[str, bytes] = {}

    def save(self, key: str, value: bytes) -> None:
        self._data[key] = value
```

The protocol version avoids forcing inheritance. It says: any object with compatible `save` behavior can be used.

Composition example:

```python
class CachedStorage:
    def __init__(self, storage: Storage) -> None:
        self._storage = storage
        self._cache: dict[str, bytes] = {}

    def save(self, key: str, value: bytes) -> None:
        self._cache[key] = value
        self._storage.save(key, value)
```

This wraps another object rather than subclassing it. It is often clearer and more flexible.

Inheritance has legitimate uses: framework integration, shared algorithm skeletons, exception hierarchies, domain hierarchies with stable substitution, and cases where base-class behavior is genuinely part of the contract.

Multiple inheritance exists in Python and is used in some frameworks and mixin designs. It requires understanding method resolution order `MRO` and cooperative `super()`. It should be used deliberately, not casually.

**Abstraction mechanism × best use × failure mode.**

| Mechanism   | Best use                                        | Failure mode                                    |
| ----------- | ----------------------------------------------- | ----------------------------------------------- |
| Function    | Stateless behavior                              | Too many parameters when state is really needed |
| Module      | Related functions/constants                     | Global mutable state                            |
| Class       | Stateful concept/invariants                     | Artificial object wrappers                      |
| Composition | Combine capabilities                            | Boilerplate delegation                          |
| Inheritance | Framework/substitutability/shared base behavior | Fragile hierarchy                               |
| Mixin       | Small reusable behavior fragment                | MRO confusion and hidden requirements           |
| Protocol    | Behavioral contract                             | Oversized implicit interface                    |
| ABC         | Runtime nominal contract                        | Unnecessary coupling                            |
| Decorator   | Cross-cutting wrapping                          | Hidden control flow                             |

**Design meaning.** Python’s duck typing and protocol system reduce the need for inheritance as an interface mechanism. Inheritance remains useful for implementation sharing and framework contracts, but composition and protocols often produce more maintainable code.

**Failure-first explanation.**

The tempting but wrong mental model is: polymorphism requires inheritance. The surprising behavior is that Python functions can work with any object that provides the needed behavior, and static tools can express that with `Protocol`. The correct semantic explanation is that Python supports both nominal and structural abstraction. The professional rule of thumb is: use protocols for behavioral requirements, composition for assembling behavior, and inheritance only when substitutability, framework design, or shared base behavior is genuinely intended. The boundary where the rule changes is frameworks that explicitly require subclassing.

**Common Pitfalls.** Do not use inheritance merely for code reuse. Do not design deep hierarchies before the domain is stable. Do not use mixins with undocumented required attributes. Do not ignore `super()` and MRO in multiple inheritance. Do not use protocols so broad that they become informal base classes.

### Public API Design — names, signatures, mutability, errors, compatibility

A Python public API is not defined only by exported names. It includes call signatures, accepted protocols, return types, exceptions, side effects, mutability, import paths, and documented behavior.

| API surface           | Design question                | Good practice                       | Common pitfall                                    |
| --------------------- | ------------------------------ | ----------------------------------- | ------------------------------------------------- |
| Name                  | What concept does this expose? | Clear domain vocabulary             | Generic names like `handle`, `process` everywhere |
| Parameter type        | What capability is required?   | Use protocols/ABCs where useful     | Over-specific concrete types                      |
| Return type           | Who owns the result?           | Avoid exposing internal mutables    | Returning internal list/dict                      |
| Exceptions            | What can fail and where?       | Specific exceptions at boundaries   | Broad undocumented failure                        |
| Defaults              | What policy is assumed?        | Safe immutable defaults             | Mutable defaults                                  |
| Side effects          | What changes?                  | Make mutation explicit in name/docs | Hidden mutation                                   |
| Import path           | How will users depend on it?   | Stable public modules               | Re-export confusion                               |
| Visibility            | Is this public?                | `_internal` for non-public          | Breaking users who relied on internals            |
| Version compatibility | Can behavior change?           | Document and deprecate              | Silent breaking changes                           |
| Typing                | What should tools know?        | Useful annotations                  | Overuse of `Any`                                  |

API names should distinguish commands from queries where practical.

```python
def get_user(user_id: int) -> User | None:
    ...

def delete_user(user_id: int) -> None:
    ...
```

A function named `get_user` should not unexpectedly delete or create a user.

Mutation should be explicit.

```python
def normalize_names(names: Iterable[str]) -> list[str]:
    return [name.strip().casefold() for name in names]
```

This returns a new list.

If mutation is intended:

```python
def normalize_names_in_place(names: list[str]) -> None:
    for index, name in enumerate(names):
        names[index] = name.strip().casefold()
```

The name communicates side effects.

Public APIs should avoid exposing internal mutable state.

```python
class Registry:
    def __init__(self) -> None:
        self._names: list[str] = []

    def names(self) -> tuple[str, ...]:
        return tuple(self._names)
```

If the public API returns a mutable list, callers may rely on mutating it. Once public, behavior is difficult to change without breaking users.

Exceptions are part of the API. A function that raises `ValueError` for invalid user input and `ConnectionError` for network failure communicates different recovery possibilities.

**Design meaning.** Python’s dynamic nature makes API boundaries socially and technically important. Since the compiler does not enforce many boundaries, public API design must be explicit through naming, signatures, exceptions, typing, documentation, and tests.

**Failure-first explanation.**

The tempting but wrong mental model is: public API compatibility means the function name still exists. The surprising behavior is that changing accepted argument shapes, mutability, exceptions, return ownership, or import paths can break users even if the name remains. The correct semantic explanation is that an API is a behavioral contract, not only a symbol. The professional rule of thumb is: design public APIs conservatively, expose less mutable state, document failure behavior, and treat import paths and return types as compatibility commitments. The boundary where the rule changes is internal code with controlled callers, where refactoring can be more aggressive.

**Common Pitfalls.** Do not expose internal mutable containers unintentionally. Do not change exception behavior silently in public APIs. Do not make public callers depend on `_internal` modules. Do not accept `Any` in public APIs when a protocol or concrete model would communicate the contract. Do not create functions whose names hide side effects.

### Metaprogramming Boundaries — decorators, descriptors, dynamic attributes, metaclasses

Python has powerful metaprogramming tools. Most application code should use them sparingly.

| Mechanism           | What it does                                                         | Good use                                                     | Risk                              |
| ------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------- |
| Decorator           | Transforms function/class at definition time                         | Logging, caching, registration, dataclasses, framework hooks | Hidden behavior                   |
| Descriptor          | Controls attribute access through `__get__`, `__set__`, `__delete__` | Properties, methods, ORM fields, validation fields           | Hard-to-debug lookup behavior     |
| `__getattr__`       | Handles missing attributes                                           | Proxies, adapters, lazy loading                              | Poor introspection/tooling        |
| `__getattribute__`  | Intercepts all attribute lookup                                      | Rare framework/proxy internals                               | Very easy to break objects        |
| `setattr`/`getattr` | Dynamic attribute access                                             | Serialization, adapters, framework code                      | Weak static analyzability         |
| Monkey patching     | Runtime modification of objects/modules/classes                      | Tests, emergency patches, plugins with care                  | Global invisible behavior changes |
| Metaclass           | Controls class creation                                              | ORMs, frameworks, advanced registries                        | Excessive complexity              |
| Class decorator     | Transforms class object                                              | Dataclasses, registration                                    | Generated behavior hidden         |
| `__init_subclass__` | Hook subclass creation                                               | Plugin registration, subclass validation                     | Import-time side effects          |

Descriptors are central to Python even if not usually written by application programmers. Methods, `property`, `staticmethod`, and `classmethod` all rely on descriptor behavior.

```python
class User:
    def __init__(self, name: str) -> None:
        self._name = name

    @property
    def name(self) -> str:
        return self._name
```

The `property` object controls attribute access. This is a descriptor-based abstraction.

Metaclasses are more advanced. They control class creation itself.

```python
class Meta(type):
    def __new__(mcls, name, bases, namespace):
        namespace["created_by_meta"] = True
        return super().__new__(mcls, name, bases, namespace)

class Example(metaclass=Meta):
    pass
```

This is powerful but rarely needed in ordinary application code. Many use cases that once required metaclasses can be solved with class decorators, `__init_subclass__`, descriptors, or simpler registration functions.

Monkey patching can be useful in tests:

```python
def fake_now() -> datetime:
    ...

module.now = fake_now
```

But in production code it can make behavior depend on invisible runtime mutation.

**Design meaning.** Python’s metaprogramming is a direct consequence of its dynamic object model. Classes, functions, modules, and attributes are runtime objects, so they can be transformed. This enables rich frameworks, but it also weakens local reasoning and static analysis.

**Failure-first explanation.**

The tempting but wrong mental model is: metaprogramming is expert Python and therefore better abstraction. The surprising result is code that tools cannot understand, readers cannot trace, and tests only partially cover. The correct semantic explanation is that metaprogramming changes the rules by which ordinary-looking code behaves. The professional rule of thumb is: use metaprogramming to remove real repeated structure or implement a stable framework boundary; avoid it for ordinary business logic. The boundary where the rule changes is framework, library, ORM, serialization, testing, or compatibility code where dynamic behavior is the point.

**Common Pitfalls.** Do not write metaclasses when a decorator or function is enough. Do not use dynamic attributes to avoid clear data models. Do not monkey patch globally without strict scope and rollback. Do not hide I/O, authorization, or transactions behind innocent-looking descriptors. Do not make code clever at the cost of inspectability.

### Over-Abstraction and Under-Abstraction — recognizing the failure modes

Python’s flexibility creates two opposite risks. Under-abstraction produces scripts that become unmaintainable. Over-abstraction produces frameworks where simple logic is buried under indirection.

| Failure mode            | Looks like                                  | Why it fails                    | Better move                       |
| ----------------------- | ------------------------------------------- | ------------------------------- | --------------------------------- |
| Long procedural script  | Hundreds of lines of top-level code         | No reusable boundaries          | Extract functions and `main()`    |
| Global state web        | Module variables mutated everywhere         | Hidden dependencies             | Pass dependencies or use objects  |
| Raw dict everywhere     | Deep string-key access                      | Weak structure and typo risk    | Parse into dataclasses/models     |
| Primitive obsession     | IDs, money, states all as raw strings/ints  | Domain mistakes                 | Use wrappers/enums where valuable |
| Utility class           | Class with only static methods              | Java habit, no object value     | Use module functions              |
| Manager object          | Vague class controlling everything          | Low cohesion                    | Split by responsibility           |
| Deep inheritance        | Many base classes and overrides             | Fragile behavior                | Composition/protocols             |
| Decorator stack         | Many invisible transformations              | Hard to trace                   | Make behavior explicit            |
| Generic type acrobatics | Complex annotations exceed logic complexity | Type layer becomes unreadable   | Simplify API or split function    |
| Framework imitation     | Local code mimics large framework patterns  | Complexity without scale payoff | Use direct functions/classes      |

A good abstraction has at least one of these properties:

| Good abstraction property   | Meaning                                                                 |
| --------------------------- | ----------------------------------------------------------------------- |
| Names a real domain concept | The abstraction reflects vocabulary used by the problem domain.         |
| Protects an invariant       | It prevents invalid states or invalid transitions.                      |
| Reduces repeated policy     | It centralizes logic that would otherwise be duplicated.                |
| Clarifies ownership         | It makes mutation, resource lifetime, or dependency ownership explicit. |
| Exposes a stable protocol   | It lets multiple implementations share a meaningful interface.          |
| Improves testability        | It gives behavior a small, isolated surface.                            |
| Hides accidental complexity | It hides mechanism without hiding essential policy.                     |

A weak abstraction usually has one of these properties:

| Weak abstraction smell                       | Meaning                                                       |
| -------------------------------------------- | ------------------------------------------------------------- |
| Name is generic                              | `Manager`, `Processor`, `Helper`, `Util` without precise role |
| Only forwards calls                          | Adds indirection without policy                               |
| Has too many responsibilities                | No clear cohesion                                             |
| Requires reading many files to know behavior | Indirection exceeds value                                     |
| Uses dynamic magic to avoid simple code      | Cleverness replaces clarity                                   |
| Exists only for anticipated future need      | No current payoff                                             |
| Makes invalid states easier, not harder      | Abstraction hides checks rather than enforcing them           |

**Design meaning.** Python’s low ceremony makes both extraction and indirection easy. Professional design requires pressure-sensitive abstraction: extract when repetition, invariants, or boundaries demand it; resist abstraction when it merely imitates enterprise architecture.

**Failure-first explanation.**

The tempting but wrong mental model is: abstraction is always improvement. The surprising result is Python code that is harder to read than the direct version. The correct semantic explanation is that every abstraction introduces a new concept, dependency, and failure mode. The professional rule of thumb is: abstraction should pay rent by naming a concept, protecting an invariant, reducing duplication, clarifying ownership, or stabilizing a boundary. The boundary where the rule changes is library/framework design, where abstraction may be valuable before all concrete uses are visible, but even there it must be justified by extension points.

**Common Pitfalls.** Do not extract abstractions from one example too early. Do not let duplicated code persist after its policy stabilizes. Do not hide domain rules inside generic helpers. Do not build inheritance trees for variation that could be data or composition. Do not mistake clever compression for good design.

### Task-Pattern Reference: Behavior and Abstraction Decisions

| Task                       | Relevant constructs                        | When to use each option                                                                                  | Language-design meaning                 | Practical consequence                      | Common pitfall                   |
| -------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------ | -------------------------------- |
| Transform data             | Function, comprehension, generator         | Function for named behavior; comprehension for direct collection construction; generator for lazy stream | Functions and iterables are first-class | Clear pipelines with controlled allocation | Dense one-liners                 |
| Validate preconditions     | Guard clauses, exceptions                  | Guard early when invalid state should stop execution                                                     | Exceptions express non-local failure    | Main path stays readable                   | Silent returns for invalid data  |
| Dispatch by command        | `if`, dict dispatch, `match`, polymorphism | Choose by condition, value, shape, or object behavior                                                    | Multiple control abstractions coexist   | Branching reflects domain                  | Using one mechanism everywhere   |
| Preserve state             | Class, closure, generator                  | Class for named state/lifecycle; closure for small captured config; generator for iteration state        | State can live in objects or frames     | Flexible state modeling                    | Hidden mutable closure state     |
| Add cross-cutting behavior | Decorator, wrapper, context manager        | Decorator for function transformation; context manager for scoped resource/effect                        | Functions/classes are runtime objects   | Reusable instrumentation/policy            | Invisible control flow           |
| Accept variable behavior   | Callback, protocol, strategy object        | Callback for simple variation; protocol/object for richer capability                                     | Behavior can be passed directly         | Extensible APIs                            | Undocumented callback contract   |
| Share implementation       | Helper function, composition, inheritance  | Helper for common code; composition for assembled behavior; inheritance for true subtype/framework       | Inheritance is optional                 | Lower coupling when composed               | Inheritance for reuse only       |
| Represent public behavior  | Signature, annotations, exceptions, docs   | Combine syntax and convention                                                                            | API is behavioral contract              | Better compatibility                       | Treating names as whole API      |
| Control resource lifetime  | `with`, context manager object             | Use when setup/cleanup must be paired                                                                    | Protocol-based cleanup                  | Safer early returns/errors                 | Relying on destructor timing     |
| Tune abstraction level     | Function, module, class, protocol          | Pick smallest construct that preserves meaning                                                           | Python supports gradual abstraction     | Maintains readability                      | Overengineering or script sprawl |

### Interdisciplinary Lens: Lambda Calculus and First-Class Functions — useful but bounded

**What it clarifies:** Python functions are values. They can be passed, returned, stored, wrapped, and composed. This explains callbacks, decorators, closures, and higher-order functions.

**Language feature involved:** `def`, `lambda`, closures, decorators, `Callable`, `partial`, higher-order APIs.

**Practical consequence:** many designs that would require interfaces or classes in other languages can be expressed as simple function parameters in Python.

**Limit of the lens:** Python is not a pure lambda-calculus-based language. It has statements, mutation, exceptions, object identity, dynamic attributes, modules, and side effects. Functional ideas are useful when they improve clarity, but forcing purely functional style can make Python less idiomatic.

### Interdisciplinary Lens: Object-Oriented Design — identity, state, responsibility

**What it clarifies:** classes are most useful when they bind state, behavior, invariants, and lifecycle into a coherent object.

**Language feature involved:** classes, methods, attributes, properties, inheritance, composition, protocols.

**Practical consequence:** good Python OOP is responsibility-centered, not class-count-centered. A class should clarify ownership or behavior, not merely organize functions.

**Limit of the lens:** classical inheritance-heavy OOP does not map cleanly onto idiomatic Python. Python’s modules, functions, protocols, and dataclasses often replace patterns that would be classes in Java-like languages.

### Interdisciplinary Lens: Software Architecture — abstraction as boundary design

**What it clarifies:** functions, classes, modules, protocols, decorators, and context managers are boundary mechanisms. They define who knows what, who owns state, who handles failure, and where policy lives.

**Language feature involved:** signatures, public APIs, exceptions, composition, modules, protocols, decorators.

**Practical consequence:** abstraction decisions should be made around change boundaries, invariants, and dependency direction, not around syntax preference.

**Limit of the lens:** architectural thinking can overbuild small Python programs. The right amount of structure depends on lifespan, team size, risk, and change frequency.
## PART 5 — Modules, Errors, Effects, Resources, and Boundaries by Task Pattern

### Boundary Design in Python — modules, exceptions, resources, effects, trust

Python makes it easy to write code without explicit boundaries. A script can start as top-level statements, import anything from anywhere, mutate global objects, catch broad exceptions, read environment variables directly, and pass raw dictionaries across the program. That ease is useful for short scripts but dangerous for long-lived systems.

This part treats boundaries as a central Python skill.

A boundary answers questions such as:

| Boundary question                  | Python mechanism                                            | Professional concern                 |
| ---------------------------------- | ----------------------------------------------------------- | ------------------------------------ |
| What code belongs together?        | Module, package, class, function                            | Cohesion and import clarity          |
| What is public?                    | Naming convention, `__all__`, documentation, package layout | API stability                        |
| What is internal?                  | `_name`, internal modules, private package structure        | Refactoring freedom                  |
| What can fail?                     | Exceptions, return values, result objects                   | Recovery and observability           |
| Who owns cleanup?                  | `with`, context managers, `try/finally`                     | Resource lifetime                    |
| Where do side effects happen?      | I/O functions, services, adapters, explicit calls           | Testability and predictability       |
| What data is trusted?              | Parsers, validators, domain models                          | Security and correctness             |
| What dynamic behavior is isolated? | Wrappers, adapters, plugins, protocols                      | Static reasoning and maintainability |
| What compatibility is promised?    | Public API, semantic versioning, deprecation                | User trust and maintenance           |

In Python, these boundaries are rarely enforced by the compiler. They are expressed through structure, naming, tests, documentation, type hints, import discipline, runtime checks, and conventions.

**Design meaning.** Python’s dynamic runtime and permissive module system make boundary design more important, not less important. The language gives freedom; professional code supplies structure.

**Failure-first explanation.**

The tempting but wrong mental model is: if Python lets one module import or mutate something, then the dependency is acceptable. The surprising result is circular imports, hidden side effects, untestable code, global state, fragile public APIs, and runtime failures far from the cause. The correct semantic explanation is that Python’s runtime permits many dependencies that are architecturally poor. The professional rule of thumb is: design boundaries around responsibility, stability, trust, and direction of dependency; do not use import permissiveness as an architecture principle. The boundary where the rule changes is small one-file scripts or exploratory notebooks, where architectural overhead may not pay off.

**Common Pitfalls.** Do not confuse “accessible” with “public.” Do not let import paths define architecture accidentally. Do not hide side effects at import time. Do not pass untrusted data beyond the boundary where it should have been parsed. Do not let exception handling become a substitute for clear failure design.

### Organizing Files and Packages — modules, packages, `__init__.py`, public surface

A Python module is usually a `.py` file. A package is a directory of modules, usually with an `__init__.py` file, though namespace packages can exist without one. Professional organization should make dependency direction, public APIs, and testability clear.

A simple package layout:

```text
project_name/
    pyproject.toml
    src/
        inventory/
            __init__.py
            models.py
            service.py
            repository.py
            errors.py
    tests/
        test_service.py
        test_repository.py
```

This is not the only possible layout, but it illustrates separation:

| File or directory | Role                                  | Boundary meaning                     |
| ----------------- | ------------------------------------- | ------------------------------------ |
| `pyproject.toml`  | Project metadata/build/tool config    | Packaging and tool boundary          |
| `src/inventory/`  | Importable package                    | Public package namespace             |
| `__init__.py`     | Package initialization/export surface | Controls what package import exposes |
| `models.py`       | Domain data structures                | Internal domain vocabulary           |
| `service.py`      | Application behavior                  | Coordinates domain operations        |
| `repository.py`   | Persistence boundary                  | Isolates storage details             |
| `errors.py`       | Domain-specific exceptions            | Stable failure vocabulary            |
| `tests/`          | Test suite                            | Behavioral contract                  |

A module should have a coherent responsibility. If `utils.py` becomes a dumping ground for unrelated helpers, it usually signals weak boundaries.

| Module type     | Good responsibility                      | Smell                                             |
| --------------- | ---------------------------------------- | ------------------------------------------------- |
| `models.py`     | Data structures and domain value objects | Contains database access, HTTP calls, CLI parsing |
| `errors.py`     | Custom exceptions                        | Too many vague exception classes                  |
| `service.py`    | Application use cases                    | Knows every infrastructure detail                 |
| `repository.py` | Persistence abstraction                  | Contains business rules                           |
| `api.py`        | External interface layer                 | Raw request data leaks into domain logic          |
| `config.py`     | Configuration parsing/model              | Reads environment at import time unpredictably    |
| `utils.py`      | Small stable cross-cutting helpers       | Unrelated functions with no cohesion              |
| `constants.py`  | Stable shared constants                  | Mutable global configuration                      |

`__init__.py` should usually be lightweight. It can expose selected public names:

```python
from .models import Product, StockLevel
from .service import reserve_stock
from .errors import InventoryError, OutOfStockError

__all__ = [
    "Product",
    "StockLevel",
    "reserve_stock",
    "InventoryError",
    "OutOfStockError",
]
```

This makes the package’s public surface clearer. But `__init__.py` should avoid heavy imports if they create expensive startup, circular imports, or optional dependency problems.

A package can expose a stable public API while reorganizing internals. For example, external code may import:

```python
from inventory import Product, reserve_stock
```

while internal files remain free to move, as long as `inventory.__init__` preserves the public names.

**Module boundary option × coupling × maintenance consequence.**

| Boundary option               | Coupling     | Maintenance consequence                |
| ----------------------------- | ------------ | -------------------------------------- |
| Direct internal module import | High         | Callers depend on file layout          |
| Package-level re-export       | Moderate     | Package controls stable public surface |
| Explicit service interface    | Lower        | Internals can change behind API        |
| Protocol-based dependency     | Lower        | Implementation can vary                |
| Plugin/import discovery       | Variable     | Powerful but harder to trace           |
| Wildcard export               | High/unclear | Public surface becomes ambiguous       |

**Design meaning.** Python packages are runtime namespaces and distribution units. A clean package layout is not just aesthetic; it controls import behavior, public API stability, optional dependencies, and test boundaries.

**Failure-first explanation.**

The tempting but wrong mental model is: any function can live anywhere as long as imports work. The surprising result is a package that cannot be imported without side effects, has circular imports, exposes unstable internals, and becomes impossible to refactor. The correct semantic explanation is that module layout creates dependency paths and public names. The professional rule of thumb is: keep modules cohesive, keep package initialization light, expose public APIs deliberately, and avoid depending on internal file layout from outside the package. The boundary where the rule changes is small single-purpose scripts, where a flat file can be clearer than premature package structure.

**Common Pitfalls.** Do not put heavy logic in `__init__.py`. Do not use `utils.py` as a substitute for naming real responsibilities. Do not make external users import deep internal modules if compatibility matters. Do not let module imports perform network calls, parse CLI arguments, or mutate global application state. Do not use wildcard exports to avoid designing a public surface.

### Import System Boundaries — loading, caching, side effects, circular imports, relative imports

Python import is runtime execution. Importing a module can load the file, execute its top-level code, create a module object, cache it, and bind one or more names.

```python
import json
```

This binds the name `json` to the module object.

```python
from pathlib import Path
```

This imports the module and binds `Path` directly in the current namespace.

| Import behavior        | Meaning                                            | Practical consequence                         | Common pitfall                        |
| ---------------------- | -------------------------------------------------- | --------------------------------------------- | ------------------------------------- |
| Module execution       | Top-level module body runs on first import         | Import can have side effects                  | Heavy work at import time             |
| Module caching         | Loaded modules stored in `sys.modules`             | Re-import usually reuses module object        | Expecting import to rerun code        |
| Name binding           | Import binds names in current namespace            | Different import forms expose different names | Confusing imported object with module |
| Search path            | Import resolution depends on path/environment      | Local names can shadow stdlib/package names   | Naming file `json.py`                 |
| Package initialization | Package `__init__.py` runs                         | Parent package may execute before submodule   | Heavy package imports                 |
| Relative import        | Import by package position                         | Good inside packages                          | Fails when running module incorrectly |
| Circular import        | Modules depend on each other during initialization | Partially initialized modules                 | Poor dependency direction             |

A circular import often appears when two modules know too much about each other.

```python
# users.py
from orders import Order

class User:
    ...
```

```python
# orders.py
from users import User

class Order:
    ...
```

This can fail because one module is only partially initialized when the other tries to access it.

Better options include:

| Circular import cause            | Better design                                        |
| -------------------------------- | ---------------------------------------------------- |
| Type annotations only            | Use postponed annotations or `typing.TYPE_CHECKING`  |
| Shared domain concepts           | Move shared concept to a third module                |
| Bidirectional service dependency | Introduce interface/protocol or dependency injection |
| Import for runtime helper        | Move helper to lower-level module                    |
| Top-level registration           | Delay registration until explicit setup              |
| Overloaded module responsibility | Split module by responsibility                       |

For type-only imports:

```python
from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from orders import Order

class User:
    def orders(self) -> list[Order]:
        ...
```

This keeps runtime imports lighter while preserving type-checker knowledge.

Relative imports are appropriate inside packages:

```python
from .models import Product
from .errors import OutOfStockError
```

They express package-internal dependency. They also require the module to be executed as part of a package, not as an isolated file path.

For script entry points inside packages, prefer:

```bash
python -m package.module
```

rather than running a package file directly by path.

**Import-time side effects** are a major Python boundary hazard.

Bad:

```python
# client.py
connection = connect_to_database()
```

This connects merely because the module was imported.

Better:

```python
# client.py
def create_connection() -> Connection:
    return connect_to_database()
```

or explicit application setup.

**Design meaning.** Python imports are dynamic runtime operations, not static declarations. This enables flexible module loading and interactive development, but it makes import-time behavior part of the program’s execution model.

**Failure-first explanation.**

The tempting but wrong mental model is: importing is harmless and declarative. The surprising behavior is that imports execute code, can fail due to environment, can trigger circular dependencies, and can start side effects. The correct semantic explanation is that import initializes module objects at runtime and caches them. The professional rule of thumb is: keep imports lightweight, deterministic, and mostly side-effect-free; move setup into explicit functions. The boundary where the rule changes is deliberate plugin registration or framework discovery, where import-time side effects may be the intended mechanism and should be documented.

**Common Pitfalls.** Do not run application setup at import time. Do not create circular imports by mixing domain, service, and infrastructure layers. Do not rely on import order for correctness. Do not shadow standard library names with local files. Do not use relative imports outside package context. Do not place optional heavy dependencies in top-level imports if most users do not need them.

### Controlling Visibility and Public API — underscores, `__all__`, internal modules, compatibility

Python visibility is mostly conventional. The language does not enforce private modules, functions, or attributes in the way Java, C++, or Rust enforce visibility modifiers. This means public API design must be explicit.

| Mechanism                          | Meaning                                                           | Enforcement            | Use                            |
| ---------------------------------- | ----------------------------------------------------------------- | ---------------------- | ------------------------------ |
| No underscore                      | Public by default                                                 | Convention             | Stable external use            |
| Leading underscore                 | Non-public/internal                                               | Convention             | Refactoring freedom            |
| Double leading underscore in class | Name-mangling                                                     | Partial transformation | Avoid subclass collisions      |
| `__all__`                          | Names exported by `from module import *` and documentation signal | Runtime list           | Public surface declaration     |
| Internal module name               | `_parser.py`, `_compat.py`                                        | Convention             | Package-private implementation |
| Documentation                      | Public contract                                                   | Social/tooling         | API stability                  |
| Type stubs                         | Static public contract                                            | Tooling                | Library typing boundary        |
| Deprecation warnings               | Migration path                                                    | Runtime/tooling        | Compatibility management       |

Example module:

```python
__all__ = ["parse_config", "ConfigError"]

class ConfigError(Exception):
    pass

def parse_config(text: str) -> Config:
    return _parse_config_impl(text)

def _parse_config_impl(text: str) -> Config:
    ...
```

Here, `parse_config` and `ConfigError` are public. `_parse_config_impl` is internal.

The underscore does not prevent access:

```python
from config import _parse_config_impl
```

This works, but it violates the public contract. If external code depends on it, it accepts breakage risk.

Public API should be smaller than internal implementation. A narrow public surface helps compatibility.

```python
from inventory import reserve_stock
```

is more stable than:

```python
from inventory.service.reservation.engine import reserve_stock
```

If external users import deep internals, the project becomes harder to refactor.

Deprecation is a boundary process. Instead of silently removing public behavior, provide warnings and alternatives.

```python
import warnings

def old_parse_config(text: str) -> Config:
    warnings.warn(
        "old_parse_config() is deprecated; use parse_config() instead",
        DeprecationWarning,
        stacklevel=2,
    )
    return parse_config(text)
```

**Boundary task × construct/API × professional use × pitfall.**

| Boundary task             | Construct/API                            | Professional use               | Pitfall                            |
| ------------------------- | ---------------------------------------- | ------------------------------ | ---------------------------------- |
| Mark internal helper      | `_helper`                                | Communicates non-public status | Thinking it enforces privacy       |
| Avoid subclass collision  | `__name`                                 | Rare base-class internals      | Using it as ordinary privacy       |
| Define export surface     | `__all__`                                | Clarifies public names         | Assuming it blocks direct import   |
| Separate internal module  | `_internal.py`                           | Refactoring boundary           | External users may still import it |
| Deprecate public function | `warnings.warn(..., DeprecationWarning)` | Migration path                 | Removing without transition        |
| Hide optional dependency  | Local import inside function             | Avoid required import cost     | Repeated imports or unclear errors |
| Expose stable facade      | package `__init__.py`                    | Public API stability           | Heavy facade imports               |

**Design meaning.** Python’s visibility model favors openness, introspection, and flexibility. The cost is that compatibility relies on conventions and documentation. Public API discipline is especially important for libraries but also matters inside large applications.

**Failure-first explanation.**

The tempting but wrong mental model is: if a name starts with `_`, users cannot access it. The surprising behavior is that they can. The correct semantic explanation is that underscores signal intended API status; they are not access control. The professional rule of thumb is: treat underscore names as internal, avoid depending on them externally, and preserve compatibility only for documented public names. The boundary where the rule changes is debugging, tests, or migration tooling, where temporary internal access may be acceptable.

**Common Pitfalls.** Do not expose too many names as public by accident. Do not rely on `__all__` as a security mechanism. Do not use double-underscore names for routine privacy. Do not break public APIs silently. Do not make internal modules part of external documentation unless they are truly stable.

### Dependency Direction and Layering — avoiding circularity, isolating infrastructure

Python does not impose architectural layers, but mature codebases benefit from dependency direction. A useful rule is:

**High-level policy should not depend on low-level details more than necessary; low-level adapters should not leak into domain logic.**

Example layering:

| Layer                  | Role                                         | May depend on                        | Should avoid depending on              |
| ---------------------- | -------------------------------------------- | ------------------------------------ | -------------------------------------- |
| Domain model           | Core concepts and invariants                 | Standard library, small shared types | Database, HTTP, CLI, framework         |
| Application service    | Use-case coordination                        | Domain, protocols, errors            | Concrete infrastructure when avoidable |
| Infrastructure adapter | Database, filesystem, network, external APIs | Domain/protocols as needed           | Business policy ownership              |
| Interface layer        | CLI, HTTP, workers                           | Application services, parsers        | Deep domain internals                  |
| Composition root       | Wires concrete dependencies                  | Everything needed for setup          | Being imported by core modules         |

A protocol can invert dependency from concrete infrastructure to capability.

```python
from typing import Protocol

class UserRepository(Protocol):
    def get_by_id(self, user_id: int) -> User | None:
        ...

def deactivate_user(user_id: int, repository: UserRepository) -> None:
    user = repository.get_by_id(user_id)
    if user is None:
        raise UserNotFoundError(user_id)

    user.deactivate()
```

The application service depends on the repository protocol, not a concrete database implementation.

Concrete adapter:

```python
class SqlUserRepository:
    def __init__(self, connection: Connection) -> None:
        self._connection = connection

    def get_by_id(self, user_id: int) -> User | None:
        ...
```

The composition root wires them:

```python
repository = SqlUserRepository(connection)
deactivate_user(user_id, repository)
```

This improves testability because tests can provide a fake repository.

```python
class FakeUserRepository:
    def __init__(self, users: dict[int, User]) -> None:
        self._users = users

    def get_by_id(self, user_id: int) -> User | None:
        return self._users.get(user_id)
```

Layering can be overdone. For a small script, a repository protocol may be unnecessary. But for a long-lived system, dependency direction prevents raw database, HTTP, or framework details from spreading everywhere.

**Design meaning.** Python’s protocol-oriented design makes dependency inversion lightweight. Unlike languages requiring formal interfaces everywhere, Python can express boundaries through protocols, callables, or simple objects. This supports testability without heavy architecture.

**Failure-first explanation.**

The tempting but wrong mental model is: because Python imports are flexible, modules can depend on each other freely. The surprising result is circular imports, untestable code, framework lock-in, and domain logic that cannot run without infrastructure. The correct semantic explanation is that import permissiveness does not imply architectural independence. The professional rule of thumb is: keep domain concepts stable, isolate infrastructure behind protocols or adapters when the system is long-lived, and let the composition root wire concrete dependencies. The boundary where the rule changes is small programs where direct use of concrete libraries is clearer than abstract layering.

**Common Pitfalls.** Do not create abstract layers for every dependency in small scripts. Do not let database rows or HTTP request objects become domain models by accident. Do not import application startup code from domain modules. Do not solve circular imports by moving imports inside functions without fixing the dependency design unless it is a narrow pragmatic patch. Do not confuse dependency injection with large frameworks; passing an object or function is often enough.

### Error Design in Python — exceptions, optional returns, result objects, failure vocabulary

Python’s primary error mechanism is exceptions. But not every negative outcome should be an exception, and not every exception should be handled immediately.

A good error design answers:

| Question                                               | Design implication                                                       |                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------ | -------------------------- |
| Is this absence normal?                                | Return `T                                                                | None` or empty collection. |
| Is this failure exceptional for the caller’s contract? | Raise a specific exception.                                              |                            |
| Does the caller need multiple diagnostics?             | Return a result object or collect errors.                                |                            |
| Is the failure from external input?                    | Raise validation/parse error with context.                               |                            |
| Is the failure from infrastructure?                    | Preserve original cause and add boundary context.                        |                            |
| Can the caller recover?                                | Catch at recovery boundary, not deep inside helper.                      |                            |
| Is this a programmer bug?                              | Let it fail or raise assertion/internal error, not user-facing fallback. |                            |

| Error mechanism          | When to use                         | Strength                        | Cost                                         | Common misuse                    |
| ------------------------ | ----------------------------------- | ------------------------------- | -------------------------------------------- | -------------------------------- |
| Return `None`            | Normal absence, one obvious reason  | Simple                          | Loses explanation                            | Many unrelated failure causes    |
| Return empty collection  | No results is normal                | Convenient                      | Cannot distinguish no data from failed query | Hiding failure                   |
| Raise built-in exception | Standard invalid operation          | Familiar                        | May be too generic                           | Raising `Exception`              |
| Raise custom exception   | Domain-specific recoverable failure | Clear API vocabulary            | More classes                                 | Over-specific exception taxonomy |
| Result dataclass         | Batch or multi-error outcome        | Explicit diagnostics            | More handling code                           | Reinventing exception flow badly |
| Logging and re-raise     | Boundary observability              | Preserves failure               | Duplicate logs if overused                   | Logging everywhere               |
| Exception chaining       | Translate with cause                | Debuggable abstraction boundary | Verbose                                      | Losing root cause                |

Optional return for normal lookup:

```python
def find_user(user_id: int) -> User | None:
    ...
```

Exception for required lookup:

```python
class UserNotFoundError(LookupError):
    def __init__(self, user_id: int) -> None:
        super().__init__(f"user not found: {user_id}")
        self.user_id = user_id

def require_user(user_id: int) -> User:
    user = find_user(user_id)
    if user is None:
        raise UserNotFoundError(user_id)
    return user
```

Result object for batch operation:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class ImportErrorInfo:
    row_number: int
    message: str

@dataclass(frozen=True)
class ImportResult:
    imported_count: int
    errors: tuple[ImportErrorInfo, ...]
```

This is better than raising on the first bad row when the task is to import as much as possible and report all failures.

**Design meaning.** Python has unchecked exceptions and no standard `Result` type. That makes failure design flexible but also easy to make vague. A mature Python API uses absence, exceptions, and result objects for different failure shapes.

**Failure-first explanation.**

The tempting but wrong mental model is: exceptions are bad for control flow, so return `None` for failures. The surprising result is callers that cannot tell whether data is missing, invalid, unauthorized, unavailable, or broken. The correct semantic explanation is that exceptions are Python’s standard non-local failure mechanism; `None` is best for simple absence. The professional rule of thumb is: use `None` for expected absence, exceptions for failed contracts or recovery boundaries, and structured results for batch diagnostics. The boundary where the rule changes is high-volume negative checks, where optional returns may be clearer and cheaper than frequent exceptions.

**Common Pitfalls.** Do not return `None` for multiple unrelated failures. Do not raise bare `Exception`. Do not create dozens of custom exception classes without distinct recovery behavior. Do not log and swallow exceptions silently. Do not catch exceptions at a level that cannot recover.

### Exception Taxonomy — built-ins, custom exceptions, hierarchy design

Python has a rich built-in exception hierarchy. Custom exceptions should extend it where meaningful and create a clear domain vocabulary.

| Exception type        | Common use                             | Example                            |
| --------------------- | -------------------------------------- | ---------------------------------- |
| `ValueError`          | Correct type, invalid value            | negative count, bad enum string    |
| `TypeError`           | Wrong type or unsupported operation    | expected path-like object, got int |
| `KeyError`            | Missing mapping key                    | required config key absent         |
| `IndexError`          | Sequence index out of range            | invalid list index                 |
| `LookupError`         | Base for lookup failures               | custom not-found error             |
| `OSError`             | OS/filesystem/process-level failure    | file not accessible                |
| `RuntimeError`        | State invalid or generic runtime issue | operation called after close       |
| `NotImplementedError` | Abstract method not implemented        | base class method                  |
| `AssertionError`      | Internal assertion failed              | invariant violation                |
| `PermissionError`     | Permission failure                     | access denied                      |
| `TimeoutError`        | Operation timed out                    | network/file/process timeout       |

Use standard exceptions when they already communicate the failure well.

```python
def set_limit(limit: int) -> None:
    if limit <= 0:
        raise ValueError("limit must be positive")
```

Use custom exceptions for domain-level recovery or public API clarity.

```python
class InventoryError(Exception):
    """Base class for inventory failures."""

class OutOfStockError(InventoryError):
    def __init__(self, sku: str, requested: int, available: int) -> None:
        super().__init__(
            f"out of stock for {sku}: requested {requested}, available {available}"
        )
        self.sku = sku
        self.requested = requested
        self.available = available
```

A small hierarchy is usually enough.

```text
InventoryError
    OutOfStockError
    UnknownProductError
    ReservationConflictError
```

Do not create a custom exception class for every line of code. Exception classes are useful when callers can catch and handle them differently, or when they provide clear semantic documentation.

Exception attributes are useful for structured handling.

```python
try:
    reserve_stock(sku, quantity)
except OutOfStockError as error:
    suggest_alternative(error.sku, error.available)
```

This is better than parsing the exception message.

**Error mechanism × when to use × failure mode.**

| Mechanism                 | When to use                                   | Failure mode if misused                     |
| ------------------------- | --------------------------------------------- | ------------------------------------------- |
| Standard exception        | Generic programming error or invalid argument | Too vague at domain boundary                |
| Domain base exception     | Group related domain failures                 | Catching too broadly hides distinctions     |
| Specific custom exception | Caller may recover specifically               | Taxonomy explosion                          |
| Exception attributes      | Handler needs structured data                 | Attributes become unstable undocumented API |
| Error message only        | Human diagnostics                             | Machines parse fragile text                 |
| Exception wrapping        | Add boundary context                          | Root cause lost if not chained              |

**Design meaning.** Exceptions are objects. They can carry structured data, form hierarchies, and express API contracts. This object model makes Python exceptions more than strings, but it also requires careful taxonomy design.

**Failure-first explanation.**

The tempting but wrong mental model is: custom exceptions are more professional than built-ins. The surprising result is bloated hierarchies where every failure has a class but no distinct recovery behavior. The correct semantic explanation is that exception classes are part of the API vocabulary. The professional rule of thumb is: use built-ins for ordinary invalid operations; use custom exceptions when the domain meaning or recovery behavior deserves a stable name. The boundary where the rule changes is public library design, where explicit exception taxonomy may be more valuable than in internal application code.

**Common Pitfalls.** Do not raise `Exception` directly in public APIs. Do not catch a domain base exception if only one subtype is recoverable. Do not create custom exceptions without recovery or clarity payoff. Do not force callers to inspect message strings. Do not expose sensitive information in exception messages.

### Exception Chaining and Translation — preserving causes across boundaries

When a low-level failure crosses a boundary, it is often useful to translate it into a domain-specific exception while preserving the original cause.

```python
class ConfigError(Exception):
    pass

def load_config(path: Path) -> Config:
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as error:
        raise ConfigError(f"could not read config file: {path}") from error

    try:
        return parse_config(text)
    except ValueError as error:
        raise ConfigError(f"invalid config file: {path}") from error
```

The `from error` syntax creates explicit exception chaining. The traceback preserves both the high-level context and the original cause.

| Pattern                 | Syntax                                    | Use                                      | Pitfall                                        |
| ----------------------- | ----------------------------------------- | ---------------------------------------- | ---------------------------------------------- |
| Re-raise same exception | `raise`                                   | Preserve current exception unchanged     | Using `raise error` changes traceback behavior |
| Translate with cause    | `raise NewError(...) from error`          | Add boundary context                     | Omitting cause loses diagnostics               |
| Suppress cause          | `raise NewError(...) from None`           | Hide noisy internal detail intentionally | Overused; makes debugging harder               |
| Add note                | exception note mechanisms where available | Add diagnostic context                   | Tooling/compatibility awareness needed         |
| Log then re-raise       | `logger.exception(...); raise`            | Boundary observability                   | Duplicate logs at many layers                  |

Use translation when the lower-level exception exposes the wrong abstraction.

A config loader should not force callers to know whether the failure was `FileNotFoundError`, `PermissionError`, `UnicodeDecodeError`, or `ValueError` unless those distinctions matter. It can expose `ConfigError` while preserving the cause for debugging.

But do not translate exceptions at every layer. Excessive wrapping creates noisy tracebacks and vague error handling.

Good boundary translation:

```python
try:
    user = repository.load(user_id)
except DatabaseError as error:
    raise UserServiceError(f"could not load user: {user_id}") from error
```

Poor excessive translation:

```python
try:
    return normalize(name)
except ValueError as error:
    raise NameErrorWrapper("name failed") from error
```

If no abstraction boundary is crossed, let the original exception stand.

**Design meaning.** Exception chaining supports layered architecture. It allows a low-level cause to be preserved while exposing a high-level failure vocabulary. This is especially important in Python because exceptions are unchecked and may travel across many dynamic layers.

**Failure-first explanation.**

The tempting but wrong mental model is: catching and raising a new exception makes errors cleaner. The surprising result is loss of original traceback or overwrapped failures that are harder to debug. The correct semantic explanation is that exception translation should happen at abstraction boundaries, and `raise ... from error` preserves causality. The professional rule of thumb is: translate when crossing from infrastructure to domain or from internal detail to public API; otherwise let exceptions propagate. The boundary where the rule changes is security-sensitive code, where suppressing internal details may be appropriate for external messages while preserving logs internally.

**Common Pitfalls.** Do not use `raise error` when plain `raise` is intended. Do not lose root causes when wrapping exceptions. Do not translate every exception mechanically. Do not expose internal paths, secrets, SQL, tokens, or credentials in public error messages. Do not log the same exception at every layer.

### Catching Exceptions at the Right Level — recovery boundaries, observability, cleanup

An exception should be caught where the program can do something meaningful: recover, retry, translate, add context, clean up, report, or isolate failure.

| Catching level       | Good reason to catch                               | Bad reason to catch                     |
| -------------------- | -------------------------------------------------- | --------------------------------------- |
| Low-level helper     | Add precise context or clean local resource        | Hide failure from caller                |
| Parser/validator     | Convert library error into domain validation error | Treat all errors as invalid input       |
| Service boundary     | Translate infrastructure failure                   | Swallow and continue with corrupt state |
| Request/CLI boundary | Report user-facing error                           | Hide programming bugs                   |
| Worker/task boundary | Isolate one task failure                           | Lose diagnostics                        |
| Process supervisor   | Log and exit/restart                               | Pretend system is healthy               |
| Test boundary        | Assert expected failure                            | Catch broad exceptions accidentally     |

Bad:

```python
def load_user(user_id: int) -> User | None:
    try:
        return database.fetch_user(user_id)
    except Exception:
        return None
```

This hides database outages, programmer errors, serialization failures, and missing users under the same `None`.

Better:

```python
def load_user(user_id: int) -> User | None:
    try:
        return database.fetch_user(user_id)
    except UserRowNotFound:
        return None
    except DatabaseError as error:
        raise UserRepositoryError(f"could not load user {user_id}") from error
```

At a CLI boundary:

```python
def main(argv: list[str] | None = None) -> int:
    try:
        run(argv)
    except ConfigError as error:
        print(f"configuration error: {error}")
        return 2
    except UserFacingError as error:
        print(f"error: {error}")
        return 1

    return 0
```

This is a meaningful recovery/reporting boundary. It converts known failures into exit codes. It should not necessarily catch all exceptions, because unexpected exceptions may indicate bugs that should produce tracebacks during development or be logged by a process supervisor in production.

For server request boundaries, broad catch-and-log may be appropriate to isolate one request from the whole process, but it must preserve diagnostics and return a safe response.

**Design meaning.** Exception handling is boundary handling. Catching too low hides information. Catching too high may miss context. Good Python code lets exceptions travel until a layer knows what they mean.

**Failure-first explanation.**

The tempting but wrong mental model is: robust code catches exceptions as close as possible to where they occur. The surprising result is that deep helpers swallow failures and leave callers with corrupted assumptions. The correct semantic explanation is that the right catch location is the recovery boundary, not necessarily the throw site. The professional rule of thumb is: catch specific exceptions where recovery, translation, or reporting is possible; otherwise let them propagate. The boundary where the rule changes is cleanup, where `finally` or context managers may act locally without deciding recovery.

**Common Pitfalls.** Do not catch `Exception` in low-level helpers unless re-raising or isolating deliberately. Do not convert infrastructure failure into ordinary absence. Do not catch and log without changing control flow if an upper layer will log again. Do not suppress unexpected exceptions in development. Do not write handlers that continue after invariants may be broken.
