---
title: Web Development Principles and Practical Skills
categories: Notes
subclass: Webdev
todos: 给出技术趋势和技术栈的解析，如为什么ts代替js
---

## Overall Stratification of a Web System

*What are the seven layers of a Web system?*
  1. Presentation layer
  2. Interaction layer
  3. Communication layer
  4. Service layer
  5. Data layer
  6. Engineering layer
  7. Infrastructure layer

1. Why divide the Web system this way?

Because different problems belong to different levels of abstraction.

The presentation layer asks: what does the user see?
The interaction layer asks: what does the client do?
The communication layer asks: how does data move?
The service layer asks: what does the business logic decide?
The data layer asks: how is state stored and queried?
The engineering layer asks: how is software built and changed safely?
The infrastructure layer asks: where and how does it run?

Without this separation, technical discussion becomes confused. A rendering problem may be mistaken for a state problem. A slow page may be blamed on frontend code when the real cause is database latency. A deployment failure may be treated as an application bug.

This layered view helps with three things:

* diagnosis
* ownership
* optimization

1. Why is this layering useful for diagnosis?

Because production failures rarely stay inside one layer.

For example, a page feels slow. That may come from:

* presentation layer: expensive layout and paint
* interaction layer: too many renders
* communication layer: slow API round trips
* service layer: slow business processing
* data layer: inefficient query
* engineering layer: debug build accidentally deployed
* infrastructure layer: overloaded container or bad routing

The layers help isolate where the real bottleneck is.

1. Why is this layering useful for ownership?

Because teams often divide responsibility across these boundaries.

Frontend engineers mainly work in presentation and interaction.
Platform or full-stack engineers often work across communication and service.
Backend and data engineers focus on service and data.
DevOps or platform teams focus on engineering and infrastructure.

The model does not force team structure, but it makes ownership clearer.

1. Why is this layering useful for optimization?

Because each layer requires different optimization methods.

You do not solve layout thrashing with a database index.
You do not solve lock contention with CSS refactoring.
You do not solve flaky deployment pipelines with React memoization.

Layering prevents category mistakes.

1. What bottleneck appears most often across layers?

The most common cross-layer bottleneck is mismatch of assumptions.

Examples:

* The UI assumes data is immediate, but the network is slow
* The client assumes API fields are stable, but the backend changed them
* The service assumes the database query is cheap, but it is not
* The deployment pipeline assumes configuration is correct, but production differs
* The infrastructure scales horizontally, but the application keeps hidden local state

Many failures are not caused by one layer being weak, but by two layers making incompatible assumptions.

1. What kinds of problems usually appear between adjacent layers?

Between presentation and interaction:
The screen shows something that does not reflect actual application state.

Between interaction and communication:
The client sends too many requests, sends the wrong payload, or handles responses incorrectly.

Between communication and service:
The contract is unclear, so authentication, status codes, and data formats become unstable.

Between service and data:
Business rules and persistence strategy conflict, causing slow queries, inconsistency, or broken transactions.

Between data and engineering:
Schema changes, tests, migrations, and local development setups drift apart.

Between engineering and infrastructure:
Build artifacts, runtime configuration, observability, and rollout behavior do not align.

1. What kinds of problems appear across non-adjacent layers?

These are often the hardest to debug.

For example:

* A frontend re-render storm may overload APIs, which then overload the database
* A database slowdown may surface as a loading spinner problem in the browser
* A misconfigured CDN may appear as a JavaScript application bug
* A missing environment variable may appear as an authentication failure
* A cache invalidation bug may look like a UI state bug

So even though the system is layered, real incidents propagate across layers.

### Presentation Layer

The presentation layer is the visible structure and appearance of the application. It includes HTML, CSS, layout, typography, responsive design, accessibility, and visual rendering.

Its job is to decide how information is structured and displayed.

Its main bottlenecks are:

* Large or deeply nested DOM trees
* Expensive CSS selectors
* Layout recalculation
* Paint and compositing cost
* Accessibility and semantic mistakes that make the UI harder to use and maintain

The main problems between this layer and the interaction layer are:

* The UI structure may not match the state model
* DOM changes may be triggered too often by application logic
* Visual state and business state may drift apart
* Accessibility semantics may be broken by dynamic scripting

### Interaction Layer

The interaction layer handles behavior in the browser. It includes JavaScript or TypeScript logic, event handling, state management, routing, client-side validation, and component lifecycle.

Its job is to answer: when the user acts, what should happen?

Its main bottlenecks are:

* Main thread blocking
* Too many re-renders
* Inefficient state updates
* Memory leaks
* Event listener misuse
* Async race conditions
* Poor component boundaries

The main problems between this layer and the communication layer are:

* UI assumes network success when the request may fail
* Duplicate requests caused by repeated user actions
* Inconsistent loading, error, and retry logic
* Stale client state after server updates
* Poor cancellation handling for in-flight requests

### Communication Layer

The communication layer manages the exchange of data between browser and server. It includes HTTP, HTTPS, WebSocket, request and response formats, caching headers, cookies, tokens, CORS, and API contracts.

Its job is to move data reliably and securely across the network.

Its main bottlenecks are:

* Network latency
* Bandwidth limits
* Large payloads
* Chatty APIs with too many round trips
* TLS overhead
* Serialization and deserialization cost
* Unclear API contracts

The main problems between this layer and the service layer are:

* Frontend and backend disagree on request or response structure
* Status codes are used inconsistently
* Authentication and authorization semantics are unclear
* Versioning changes break clients
* Retry behavior may accidentally trigger duplicate writes

### Service Layer

The service layer is the backend application logic. It includes controllers, domain services, business rules, authentication, authorization, orchestration, validation, and error handling.

Its job is to decide what the system should do with a request.

Its main bottlenecks are:

* Complex business logic
* Synchronous dependency chains
* CPU-heavy processing
* Poor service boundaries
* Repeated validation
* Hard-to-debug authorization logic
* Tight coupling between modules

The main problems between this layer and the data layer are:

* Business logic may not match the data model
* Transaction boundaries may be unclear
* Read and write patterns may overload the database
* N+1 query patterns may appear
* Caching may hide stale or inconsistent data
* Domain invariants may not be enforced at persistence time

### Data Layer

The data layer stores, retrieves, and organizes data. It includes relational databases, NoSQL stores, caches, search systems, message queues, and file storage.

Its job is to preserve system state and make it queryable.

Its main bottlenecks are:

* Slow queries
* Missing or bad indexes
* Lock contention
* High write amplification
* Cache misses
* Replication lag
* Storage growth
* Data consistency problems across multiple systems

The main problems between this layer and the engineering layer are:

* Schema changes may not be safely deployed
* Test data may not reflect production complexity
* Migrations may fail or be irreversible
* Observability may be too weak to diagnose data issues
* Local development environments may diverge from production behavior

### Engineering Layer

The engineering layer supports how software is built and maintained. It includes source control, package management, build systems, testing, static analysis, CI/CD, code review, observability hooks, and release processes.

Its job is to make development reliable, repeatable, and safe.

Its main bottlenecks are:

* Slow builds
* Fragile test suites
* Poor deployment pipelines
* Weak code review practices
* Inconsistent environments
* Lack of automated checks
* Low release confidence

The main problems between this layer and the infrastructure layer are:

* Build output may not match runtime expectations
* Environment variables may be misconfigured
* Deployment artifacts may not be reproducible
* Logs, metrics, and tracing may be missing or inconsistent
* Rollback procedures may be unsafe or incomplete

### Infrastructure Layer

The infrastructure layer is the runtime environment. It includes servers, containers, orchestration, reverse proxies, CDNs, load balancers, DNS, cloud services, storage systems, and runtime monitoring.

Its job is to run the system in a stable, scalable, and secure way.

Its main bottlenecks are:

* CPU and memory limits
* Disk I/O
* Network throughput
* Autoscaling lag
* Cold starts
* Misconfigured load balancing
* Regional outages
* Weak monitoring and alerting

The main problems between this layer and all upper layers are:

* The application assumes resources that do not exist
* Timeouts are inconsistent across services
* Network topology changes break assumptions
* Security rules block valid traffic
* Scaling behavior exposes hidden concurrency bugs
* Deployment succeeds technically but fails operationally


### deeper reason this model matters for a senior Web engineer?

Because senior engineering work is usually about boundaries, not isolated code.

A junior engineer often asks:
How do I write this component?
How do I call this API?

A senior engineer asks:
Which layer should own this logic?
Where is the real bottleneck?
Which boundary is leaking?
What assumption will fail at scale?
What coupling here will become expensive later?

That is why this seven-layer model is useful. It is less a taxonomy than a way of thinking.

Common mistakes and easily confused points

1. The layers are analytical, not rigid physical boxes.
   One file or one service may involve several layers at once.

2. The communication layer is not the same as the service layer.
   Transport concerns and business logic should not be mixed casually.

3. The data layer is not just “the database.”
   Caches, search indexes, queues, and object storage also belong here.

4. The engineering layer is not optional tooling.
   Without it, reliability, testing, and safe delivery collapse.

5. The infrastructure layer is not only “ops work.”
   Runtime behavior directly shapes application correctness, latency, and failure modes.
