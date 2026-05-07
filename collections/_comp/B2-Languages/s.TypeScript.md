---
title: TypeScript - Quick Reference
abbreviation: TypeScript
categories: Notes
subclass: Languages
---

## Part 1 — Mental Model: Value Level, Type Level, Erasure, JavaScript Runtime 

### Core Model

TypeScript is **JavaScript with static type syntax**. The runtime language is still JavaScript. A TypeScript program is authored, checked, and transformed before execution; the emitted program is JavaScript, and that emitted JavaScript is what Node.js, browsers, workers, test runners, and JavaScript engines execute.

The central boundary is this:

```ts
type User = {
  id: string;
  email: string;
};

const user: User = JSON.parse(input);
```

The annotation `: User` changes the compiler’s understanding of `user`. It does not validate `input`, does not parse a safer value, does not throw if the shape is wrong, and does not exist in the emitted JavaScript.

A safer trust-boundary model is:

```ts
type User = {
  id: string;
  email: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    typeof value.id === "string" &&
    typeof value.email === "string"
  );
}

const raw: unknown = JSON.parse(input);

if (!isUser(raw)) {
  throw new Error("Invalid user payload");
}

const user = raw;
```

**Design meaning:** TypeScript helps describe and check code before execution. JavaScript behavior remains JavaScript behavior. Runtime guarantees must come from runtime code.

**Practical consequence:** TypeScript can prevent many authoring mistakes, improve refactoring, document program shapes, and power tooling. It does not replace validation, parsing, authorization, database constraints, or tests.

### TypeScript as a Static Authoring Layer

TypeScript should be understood as a **development-time safety and tooling layer over JavaScript**, not as a separate runtime platform.

| Concept                | Meaning                                                                                               | Practical consequence                                                | Common pitfall                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Type checking          | The compiler checks whether code is consistent with declared and inferred types.                      | Many invalid operations are caught before execution.                 | Assuming checked code cannot fail at runtime.                                       |
| Type erasure           | Most type syntax is removed before JavaScript execution.                                              | Types guide authoring but do not exist at runtime.                   | Expecting `type`, `interface`, `as`, or `satisfies` to validate values.             |
| JavaScript runtime     | Emitted JavaScript runs in Node.js, browsers, workers, or another JS host.                            | Runtime behavior depends on JavaScript semantics and host APIs.      | Blaming TypeScript for behavior caused by Node, the DOM, a bundler, or a framework. |
| Compiler configuration | `tsconfig.json` controls strictness, emitted JavaScript, module behavior, and type library inclusion. | The same code can be safer or weaker depending on config.            | Treating TypeScript behavior as fixed across projects.                              |
| Type libraries         | DOM, Node.js, framework, and test globals come from configured libraries and declaration packages.    | A name can type-check only when its environment types are available. | Assuming missing globals mean the language does not support them.                   |

### Value Level vs Type Level

TypeScript operates on two related but distinct levels.

| Level       | What lives there                                                                | Checked by TypeScript? |                                Exists at runtime? | Example                      |
| ----------- | ------------------------------------------------------------------------------- | ---------------------: | ------------------------------------------------: | ---------------------------- |
| Value level | JavaScript values, variables, functions, classes, objects, arrays               |                    Yes |                                               Yes | `const user = { id: "u1" }`  |
| Type level  | Type aliases, interfaces, type operators, generic parameters, conditional types |                    Yes | No, except when tied to value-emitting constructs | `type User = { id: string }` |

The same identifier can sometimes exist in both spaces:

```ts
class User {
  constructor(public id: string) {}
}

const user = new User("u1");

function serialize(value: User): string {
  return JSON.stringify(value);
}
```

Here `User` is both:

| Use              | Meaning                   |
| ---------------- | ------------------------- |
| `new User("u1")` | Runtime constructor value |
| `value: User`    | Static instance type      |

This duality is especially important for `class`, `enum`, and `namespace`. It does not apply to ordinary `type` aliases or `interface` declarations, which are type-level only.

### Erasure and Emitted JavaScript

Most TypeScript-specific syntax disappears during compilation.

```ts
type Id = string;

interface User {
  id: Id;
  email: string;
}

const user = {
  id: "u1",
  email: "a@example.com",
} satisfies User;
```

The emitted JavaScript is conceptually close to:

```ts
const user = {
  id: "u1",
  email: "a@example.com",
};
```

The following constructs are erased or mostly erased:

| Construct               |   Runtime output? | Notes                                             |
| ----------------------- | ----------------: | ------------------------------------------------- |
| `type`                  |                No | Purely type-level.                                |
| `interface`             |                No | Purely type-level.                                |
| Type annotations        |                No | `const x: string` emits as `const x`.             |
| `as` assertions         |                No | Changes compiler view only.                       |
| `satisfies`             |                No | Checks compatibility only.                        |
| `import type`           | No runtime import | Ensures the import is type-only.                  |
| Generic type parameters |                No | `function f<T>(x: T)` emits as a normal function. |

Some TypeScript constructs do produce JavaScript:

| Construct            | Runtime output? | Notes                                                                  |
| -------------------- | --------------: | ---------------------------------------------------------------------- |
| `class`              |             Yes | JavaScript class output, depending on `target`.                        |
| Regular `enum`       |             Yes | Emits a runtime object.                                                |
| `namespace`          |     Usually yes | Emits JavaScript unless used only in declarations or ambient contexts. |
| Parameter properties |             Yes | Emit property initialization in classes.                               |

`const enum` is special. It is usually inlined and erased, but behavior depends on compiler options and toolchain support. In projects using `isolatedModules`, Babel, SWC, or mixed transpilation, `const enum` can cause portability problems unless configured carefully.

### Runtime Validation Boundary

TypeScript does not validate runtime data.

This code is unsafe:

```ts
type Settings = {
  retries: number;
};

const settings = JSON.parse(rawJson) as Settings;

settings.retries.toFixed();
```

The assertion `as Settings` does not check that `retries` exists or is a number. If the JSON contains `{ "retries": "three" }`, the code can still fail at runtime.

A better boundary pattern is:

```ts
type Settings = {
  retries: number;
};

function parseSettings(value: unknown): Settings {
  if (
    typeof value === "object" &&
    value !== null &&
    "retries" in value &&
    typeof value.retries === "number"
  ) {
    return value;
  }

  throw new Error("Invalid settings");
}

const settings = parseSettings(JSON.parse(rawJson));
```

| Boundary               | Start with                                        | Then use                             | Avoid                                         |
| ---------------------- | ------------------------------------------------- | ------------------------------------ | --------------------------------------------- |
| `JSON.parse`           | `unknown`                                         | Parser, schema validator, type guard | `as SomeType` without validation              |
| HTTP response          | `unknown`                                         | Runtime validation                   | Trusting generated or handwritten types alone |
| `localStorage`         | `string \| null` then parsed `unknown`            | Null check and parser                | Assuming a stored string is current and valid |
| Environment variables  | `string \| undefined`                             | Required-variable parser             | Treating env vars as typed config             |
| DOM query              | `Element \| null` or specific element after check | Null and instance checks             | Blind non-null assertion                      |
| Third-party JavaScript | `unknown` or declared API types                   | Wrapper boundary                     | Letting `any` spread through the codebase     |

### Structural Typing

TypeScript uses **structural typing**. Compatibility is based on shape, not nominal declaration identity.

```ts
type User = {
  id: string;
};

type Account = {
  id: string;
};

const account: Account = { id: "a1" };
const user: User = account;
```

This is valid because `Account` and `User` have compatible structure.

| Typing model      | Compatibility rule                             | TypeScript behavior         |
| ----------------- | ---------------------------------------------- | --------------------------- |
| Nominal typing    | Names or declarations determine compatibility. | Not the default model.      |
| Structural typing | Members determine compatibility.               | TypeScript’s default model. |

Structural typing is pragmatic for JavaScript because JavaScript objects are shape-based at runtime. It also means that two types with the same structure are interchangeable unless extra branding or private class members create nominal-like behavior.

A nominal-like pattern can be created with a brand:

```ts
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };

function getUser(id: UserId) {
  return { id };
}

const raw = "u1";

// Requires a deliberate boundary conversion.
const userId = raw as UserId;

getUser(userId);
```

**Common pitfall:** A type name does not create a runtime or nominal distinction. `type UserId = string` is still just `string` for assignability.

### Gradual Typing

TypeScript supports **gradual typing**. A codebase can contain highly precise types, weakly typed areas, JavaScript files, declaration files, and explicit escape hatches.

| Feature           | Purpose                                          | Practical consequence                 | Risk                                         |
| ----------------- | ------------------------------------------------ | ------------------------------------- | -------------------------------------------- |
| `any`             | Disable type checking for a value                | Enables interop and migration         | Unsoundness spreads quickly                  |
| `unknown`         | Represent a value whose type is not yet known    | Forces narrowing before use           | Requires validation or checks                |
| Type assertions   | Override compiler inference                      | Useful at trusted boundaries          | Can lie to the compiler                      |
| `allowJs`         | Include JavaScript files in a TypeScript project | Supports incremental migration        | JS files may remain weakly checked           |
| `checkJs`         | Type-check JavaScript with JSDoc                 | Improves JS safety without conversion | Less expressive than `.ts` for complex types |
| Declaration files | Describe external JavaScript APIs                | Enables typed interop                 | Declarations can be inaccurate               |

**Practical rule:** Prefer `unknown` at trust boundaries, precise types in application logic, and small, isolated uses of `any` only when there is no practical alternative.

### Type Inference

TypeScript is inference-heavy. Good TypeScript code does not require annotating everything.

```ts
const user = {
  id: "u1",
  email: "a@example.com",
};

function getEmail(domainUser: typeof user) {
  return domainUser.email;
}
```

The compiler infers:

```ts
const user: {
  id: string;
  email: string;
};
```

Inference can be widened or narrowed depending on declaration style.

| Code                                    | Inferred type                | Meaning                                     |
| --------------------------------------- | ---------------------------- | ------------------------------------------- |
| `let status = "idle"`                   | `string`                     | Mutable variable may later hold any string. |
| `const status = "idle"`                 | `"idle"`                     | Constant binding preserves the literal.     |
| `const xs = ["read", "write"]`          | `string[]`                   | Mutable array of strings.                   |
| `const xs = ["read", "write"] as const` | `readonly ["read", "write"]` | Readonly tuple with literal elements.       |

Literal-preserving inference is central to precise modeling:

```ts
const roles = ["admin", "editor", "viewer"] as const;

type Role = (typeof roles)[number];

function canPublish(role: Role) {
  return role === "admin" || role === "editor";
}
```

Here `Role` becomes:

```ts
type Role = "admin" | "editor" | "viewer";
```

### Deliberate Unsoundness

TypeScript is not a formally sound type system. It deliberately accepts some unsoundness to remain practical for JavaScript.

| Area                                            | Why TypeScript permits it                                                  | Practical risk                                      | Safer pattern                                         |
| ----------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------- |
| `any`                                           | JavaScript interop and migration                                           | Invalid operations pass checking                    | Use `unknown` and narrow                              |
| Type assertions                                 | Developer sometimes knows more than compiler                               | Assertion can be false                              | Validate or isolate assertion                         |
| Array covariance                                | Common JS patterns                                                         | Mutable arrays can be corrupted through wider types | Prefer readonly arrays for shared data                |
| Function parameter bivariance in some positions | Backward compatibility, especially callbacks in object types               | Callback assignability may be looser than expected  | Use strict function types and explicit callback types |
| Indexed access                                  | JavaScript allows missing keys                                             | `obj[key]` may be `undefined` at runtime            | Enable `noUncheckedIndexedAccess`                     |
| Optional properties                             | JS distinguishes missing property from present `undefined` only at runtime | Semantics vary with `exactOptionalPropertyTypes`    | Model absence deliberately                            |

Example of indexed access risk:

```ts
const scores: Record<string, number> = {};

const score = scores["missing"];

score.toFixed();
```

Without stricter configuration, this may type-check as if `score` is `number`, but the runtime value is `undefined`. With `noUncheckedIndexedAccess`, the type becomes `number | undefined`, forcing a check.

### Value-Level and Type-Level Reference Table

| Item          |                              Value level? |                               Type level? |                                      Exists at runtime? | Example                                                 | Common pitfall                                                                        |
| ------------- | ----------------------------------------: | ----------------------------------------: | ------------------------------------------------------: | ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `const`       |                                       Yes |                                        No |                                                     Yes | `const x = 1`                                           | Believing `const` makes object contents deeply immutable. It only prevents rebinding. |
| `let`         |                                       Yes |                                        No |                                                     Yes | `let count = 0`                                         | Forgetting `let x = "a"` widens to `string`, not the literal `"a"`.                   |
| `function`    |                                       Yes | Often creates an associated function type |                                                     Yes | `function parse(s: string): number`                     | Confusing the runtime function with helper types such as `ReturnType<typeof parse>`.  |
| `class`       |                                       Yes |                                       Yes |                                                     Yes | `class User {}`                                         | Forgetting `implements` checks the instance side, not static members.                 |
| `type`        |                                        No |                                       Yes |                                                      No | `type Id = string`                                      | Expecting a type alias to validate, transform, or brand a runtime value by itself.    |
| `interface`   |                                        No |                                       Yes |                                                      No | `interface User { id: string }`                         | Assuming interfaces exist at runtime or can be checked with `instanceof`.             |
| `enum`        |                                       Yes |                                       Yes |                                                     Yes | `enum Status { Ready }`                                 | Forgetting normal enums emit runtime JavaScript objects.                              |
| `const enum`  | Usually no value object after compilation |                                       Yes |                       Usually inlined, config-dependent | `const enum Mode { Fast }`                              | Using it in toolchains that do not support safe inlining.                             |
| `namespace`   |              Usually yes when non-ambient |                                       Yes |                                               Often yes | `namespace App { export const name = "x" }`             | Using namespaces where ESM modules are the better modern boundary.                    |
| `typeof`      |                        Yes in expressions |                       Yes in type queries | Runtime operator in expressions; erased in type queries | `typeof value === "string"` and `type T = typeof value` | Confusing runtime `typeof` with type-level `typeof`.                                  |
| `keyof`       |                                        No |                                       Yes |                                                      No | `type K = keyof User`                                   | Expecting `keyof` to enumerate runtime object keys.                                   |
| `as`          |                 No runtime value behavior |                                       Yes |                                                      No | `value as User`                                         | Treating assertion as conversion or validation.                                       |
| `as const`    |                 No runtime value behavior |                                       Yes |                                                      No | `{ role: "admin" } as const`                            | Forgetting it affects compile-time readonly/literal inference, not runtime freezing.  |
| `satisfies`   |                 No runtime value behavior |                                       Yes |                                                      No | `config satisfies Config`                               | Expecting it to change the inferred variable type to exactly `Config`.                |
| `import type` |                                        No |                                       Yes |                                       No runtime import | `import type { User } from "./types"`                   | Importing a value with `import type` and then trying to use it at runtime.            |
| `.d.ts`       |                                        No |                                       Yes |                                                      No | `declare module "legacy-lib"`                           | Assuming declarations prove the implementation is correct.                            |

### TypeScript Design Profile

| Design property                    | TypeScript’s choice                                                          | Practical consequence                                           | Tradeoff                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Static typing over JavaScript      | TypeScript checks JavaScript programs plus type syntax.                      | Existing JS patterns can be typed incrementally.                | The type system inherits JavaScript’s dynamic and irregular edges.                           |
| Structural typing                  | Compatibility is based on shape.                                             | Object literals, plain objects, and duck typing work naturally. | Types with the same structure are interchangeable unless branded or otherwise distinguished. |
| Type erasure                       | Most types disappear before execution.                                       | Runtime output stays close to JavaScript.                       | Types do not validate or protect runtime data.                                               |
| Gradual typing                     | `any`, JS interop, declaration files, and partial annotations are allowed.   | Large codebases can migrate gradually.                          | Weakly typed regions can undermine soundness.                                                |
| Inference-heavy style              | Compiler infers many types from values and control flow.                     | Code can stay concise while remaining strongly checked.         | Inference may widen or narrow differently than expected.                                     |
| JavaScript compatibility           | Runtime semantics follow JavaScript.                                         | Existing libraries and idioms remain usable.                    | Some unsound behavior is accepted for compatibility.                                         |
| Runtime validation not built in    | Validation must be written or delegated to runtime libraries.                | Trust boundaries are explicit architectural decisions.          | False confidence is easy when external data is simply asserted.                              |
| Escape hatches                     | `any`, assertions, non-null assertion, declaration overrides                 | Enables practical interop and unblockers.                       | These can silence real errors.                                                               |
| Powerful type-level computation    | Conditional, mapped, indexed access, template literal, and infer-based types | APIs can derive precise types from source models.               | Overengineering can make types unreadable and slow.                                          |
| Configuration-dependent strictness | `tsconfig.json` controls major safety behaviors.                             | Teams can choose migration and strictness levels.               | “TypeScript caught it” depends heavily on project configuration.                             |

### TypeScript Is Not a Runtime

A useful rule is:

> TypeScript checks what can be known from source code and declared types. JavaScript determines what happens when the program runs.

This distinction matters in several common situations.

| Situation             | TypeScript can help with                             | TypeScript cannot do by itself                                   |
| --------------------- | ---------------------------------------------------- | ---------------------------------------------------------------- |
| Calling a function    | Check argument and return types against declarations | Guarantee the function implementation is correct                 |
| Parsing JSON          | Represent the expected output type                   | Prove the JSON actually matches that type                        |
| DOM access            | Type known DOM APIs and element classes              | Guarantee an element exists in the document                      |
| Environment variables | Represent possible `undefined` values                | Guarantee deployment configuration is valid                      |
| Third-party libraries | Use declaration files for API shape                  | Guarantee declarations match runtime behavior                    |
| Module imports        | Type-check import/export relationships               | Guarantee runtime resolution works under every bundler or loader |

### Practical Mental Rules

| Rule                                           | Meaning                                                                                                    | Example                                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Types are not values.                          | A `type` or `interface` cannot be read, called, checked with `instanceof`, or imported as a runtime value. | `interface User {}` cannot be used as `value instanceof User`.                  |
| Values can inform types.                       | `typeof`, `as const`, and indexed access can derive types from runtime declarations.                       | `type Role = (typeof roles)[number]`.                                           |
| Runtime checks can narrow types.               | `typeof`, `in`, `instanceof`, discriminants, and custom guards refine static types.                        | `if (typeof x === "string") x.toUpperCase()`.                                   |
| Assertions do not check.                       | `as T` changes the compiler’s view only.                                                                   | `JSON.parse(s) as User` is not validation.                                      |
| Configuration matters.                         | Strictness options change what the compiler reports.                                                       | `strictNullChecks` changes whether `null` and `undefined` must be handled.      |
| External data should start as `unknown`.       | Values from outside the program need validation.                                                           | HTTP response bodies, JSON, env vars, form input.                               |
| Prefer precise models over broad dictionaries. | Fixed shapes, literal unions, and discriminated unions catch more errors.                                  | Use `type State = Loading \| Success \| Failure`, not a bag of optional fields. |
| Keep unsoundness local.                        | If `any` or assertions are necessary, isolate them at boundaries.                                          | Wrap legacy JS calls in a typed adapter.                                        |

### Canonical Boundary Example

Unsafe version:

```ts
type ApiUser = {
  id: string;
  name: string;
};

async function loadUser(url: string): Promise<ApiUser> {
  const response = await fetch(url);
  return response.json() as Promise<ApiUser>;
}
```

The problem is that the type says `Promise<ApiUser>`, but the runtime data has not been validated.

Safer version:

```ts
type ApiUser = {
  id: string;
  name: string;
};

function isApiUser(value: unknown): value is ApiUser {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof value.id === "string" &&
    typeof value.name === "string"
  );
}

async function loadUser(url: string): Promise<ApiUser> {
  const response = await fetch(url);
  const data: unknown = await response.json();

  if (!isApiUser(data)) {
    throw new Error("Invalid API user");
  }

  return data;
}
```

**Design meaning:** `unknown` marks the trust boundary. The type guard bridges runtime evidence into static narrowing.

**Practical consequence:** After validation, downstream application code can use `ApiUser` normally without spreading unsafe assumptions.

**Common pitfall:** Replacing the guard with `as ApiUser` makes the compiler quiet but does not make the program safer.

### Canonical Structural Modeling Example

```ts
type InvoiceDraft = {
  customerId: string;
  lineItems: Array<{
    sku: string;
    quantity: number;
  }>;
};

function submitInvoice(invoice: InvoiceDraft) {
  return invoice.lineItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

const draft = {
  customerId: "c1",
  lineItems: [
    { sku: "book", quantity: 2 },
  ],
  internalNote: "priority customer",
};

submitInvoice(draft);
```

This works because `draft` has at least the structure required by `InvoiceDraft`. The extra property does not matter when assigning through an intermediate variable.

However, a fresh object literal receives stricter checking:

```ts
submitInvoice({
  customerId: "c1",
  lineItems: [
    { sku: "book", quantity: 2 },
  ],
  internalNote: "priority customer",
});
```

This can produce an excess property error because fresh object literals are checked more aggressively to catch likely mistakes.

**Design meaning:** TypeScript is structural, but object literal freshness adds a targeted usability check.

**Practical consequence:** Excess property checks are not a general exact-object guarantee. They are a special check for fresh literals.

### Summary Mental Model

TypeScript’s practical essence is **type-level modeling over JavaScript runtime behavior**.

| Mental model           | Use this interpretation                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| TypeScript program     | JavaScript program plus static type information.                                                               |
| Type checker           | Development-time analyzer.                                                                                     |
| Compiler output        | JavaScript, subject to `target`, `module`, and toolchain configuration.                                        |
| Type annotation        | A static claim checked by the compiler.                                                                        |
| Type assertion         | A compiler override, not a runtime conversion.                                                                 |
| `satisfies`            | A compatibility check that preserves precise inference.                                                        |
| Runtime data           | Untrusted until checked by JavaScript code or a validation library.                                            |
| Good TypeScript design | Precise static models, explicit trust boundaries, minimal escape hatches, and configuration-aware assumptions. |

## Part 2 — Core Syntax and Type Reference: Primitives, Objects, Functions, Unions, Classes 

### Primitive, Literal, Top, and Bottom Types

TypeScript’s primitive types describe JavaScript primitive values. TypeScript adds static distinctions, literal types, top types such as `unknown` and `any`, and the bottom type `never`.

| Type         | Value examples                 | Design meaning                                      | Practical use                                            | Common pitfall                                           |
| ------------ | ------------------------------ | --------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `string`     | `"ok"`, `"user-1"`             | Any JavaScript string                               | Text, IDs, enum-like values when not literal-constrained | Using broad `string` when only specific values are valid |
| `number`     | `1`, `3.14`, `NaN`, `Infinity` | JavaScript number, including special numeric values | Counts, timestamps, measurements                         | Forgetting `NaN` and `Infinity` are still `number`       |
| `boolean`    | `true`, `false`                | Boolean primitive                                   | Flags and predicates                                     | Overusing booleans where a state union is clearer        |
| `bigint`     | `1n`, `9007199254740993n`      | Arbitrary-size integer primitive                    | Large integer domains                                    | Cannot mix directly with `number` arithmetic             |
| `symbol`     | `Symbol("id")`                 | Unique primitive key-like value                     | Rare; metadata keys, advanced libraries                  | Confusing `symbol` with string keys                      |
| `null`       | `null`                         | Intentional absence                                 | Explicit empty value                                     | Only meaningful as distinct under `strictNullChecks`     |
| `undefined`  | `undefined`                    | Missing or uninitialized value                      | Optional fields, omitted parameters                      | Confusing omitted property with present `undefined`      |
| Literal type | `"idle"`, `42`, `true`         | One exact value                                     | Finite states, discriminants, configuration keys         | Accidentally widening to `string` or `number`            |
| `unknown`    | Any value                      | Safe top type                                       | External data, catch variables, untrusted values         | Trying to use it without narrowing                       |
| `any`        | Any value                      | Unsafe top-like escape hatch                        | Legacy interop, temporary migration                      | Lets invalid operations pass silently                    |
| `void`       | Usually `undefined` return     | Return value intentionally ignored                  | Functions called for side effects                        | Using it as a general “empty” data type                  |
| `never`      | No possible value              | Impossible state or non-returning code              | Exhaustiveness, functions that throw                     | Not using it to catch unhandled union cases              |

Primitive examples:

```ts
const name: string = "Ada";
const count: number = 3;
const active: boolean = true;
const large: bigint = 9007199254740993n;
const key: symbol = Symbol("cache-key");

const missing: undefined = undefined;
const empty: null = null;
```

Literal types are exact-value types:

```ts
type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

function request(method: RequestMethod, url: string) {
  return fetch(url, { method });
}

request("GET", "/api/users");
// request("TRACE", "/api/users"); // Error
```

**Design meaning:** Literal types are the basis of precise domain modeling. They let the compiler distinguish valid finite values from arbitrary strings, numbers, or booleans.

**Practical consequence:** Prefer literal unions over broad primitives when the valid set is known.

```ts
type Theme = "light" | "dark" | "system";

type UserPreferences = {
  theme: Theme;
};
```

`unknown` is safer than `any`:

```ts
function handleUnsafe(value: any) {
  value.toUpperCase();
  value.not.real.method();
}

function handleSafe(value: unknown) {
  if (typeof value === "string") {
    value.toUpperCase();
  }
}
```

| Type      | Can receive any value? | Can be used without checking? | Safety profile            |
| --------- | ---------------------: | ----------------------------: | ------------------------- |
| `any`     |                    Yes |                           Yes | Unsafe; disables checking |
| `unknown` |                    Yes |                            No | Safe; requires narrowing  |

`never` is essential for exhaustive branching:

```ts
type PaymentStatus =
  | { kind: "pending" }
  | { kind: "paid"; receiptId: string }
  | { kind: "failed"; reason: string };

function describeStatus(status: PaymentStatus): string {
  switch (status.kind) {
    case "pending":
      return "Payment pending";
    case "paid":
      return `Paid: ${status.receiptId}`;
    case "failed":
      return `Failed: ${status.reason}`;
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}
```

If a new variant is added to `PaymentStatus`, the `never` assignment catches the missing branch.

### Arrays, Tuples, and Readonly

Arrays describe lists of values with the same element type. Tuples describe arrays with known positions and often known length.

| Syntax             | Meaning                     | Example                     | Common use                                 |
| ------------------ | --------------------------- | --------------------------- | ------------------------------------------ |
| `T[]`              | Mutable array of `T`        | `string[]`                  | Most common array syntax                   |
| `Array<T>`         | Mutable array of `T`        | `Array<string>`             | Useful with complex generic expressions    |
| `[A, B]`           | Tuple with fixed positions  | `[string, number]`          | Pairs, return tuples, coordinate-like data |
| `[A, B?]`          | Tuple with optional element | `[string, number?]`         | Compact optional positional data           |
| `[A, ...B[]]`      | Tuple with rest elements    | `[string, ...number[]]`     | Head element plus variable tail            |
| `readonly T[]`     | Readonly array of `T`       | `readonly string[]`         | Inputs that should not be mutated          |
| `ReadonlyArray<T>` | Readonly array of `T`       | `ReadonlyArray<string>`     | Generic readonly array form                |
| `readonly [A, B]`  | Readonly tuple              | `readonly [string, number]` | Literal tuples and safe shared data        |

Array examples:

```ts
const ids: string[] = ["u1", "u2"];
const scores: Array<number> = [10, 20, 30];

ids.push("u3");
scores.map((score) => score * 2);
```

Tuple examples:

```ts
type Point = [x: number, y: number];

const origin: Point = [0, 0];

function move([x, y]: Point, dx: number, dy: number): Point {
  return [x + dx, y + dy];
}
```

Named tuple elements improve readability but do not create object properties:

```ts
type DateRange = [start: Date, end: Date];

function duration([start, end]: DateRange) {
  return end.getTime() - start.getTime();
}
```

Optional and rest tuple elements:

```ts
type LogEntry = [message: string, level?: "info" | "warn" | "error"];

type Command = [
  name: string,
  ...args: string[]
];

const entry: LogEntry = ["Started", "info"];
const command: Command = ["deploy", "--env", "prod"];
```

Readonly arrays prevent mutation through that reference:

```ts
function total(values: readonly number[]) {
  // values.push(1); // Error
  return values.reduce((sum, value) => sum + value, 0);
}

const numbers = [1, 2, 3];

total(numbers);
```

Readonly is shallow:

```ts
type User = {
  id: string;
  profile: {
    displayName: string;
  };
};

const users: readonly User[] = [
  { id: "u1", profile: { displayName: "Ada" } },
];

// users.push({ id: "u2", profile: { displayName: "Grace" } }); // Error

users[0].profile.displayName = "Ada Lovelace"; // Allowed
```

| Readonly construct | Prevents                                                                            | Does not prevent                     |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------ |
| `readonly T[]`     | Adding, removing, replacing array elements through that reference                   | Mutation of nested objects           |
| `readonly [A, B]`  | Reassigning tuple positions through that reference                                  | Mutation inside object elements      |
| `Readonly<T>`      | Reassigning top-level object properties                                             | Deep mutation                        |
| `as const`         | Literal widening and top-level mutable operations on the inferred literal structure | Runtime mutation by other references |

Literal array to union:

```ts
const permissions = ["read", "write", "delete"] as const;

type Permission = (typeof permissions)[number];

function hasPermission(permission: Permission) {
  return permissions.includes(permission);
}
```

**Design meaning:** `as const` asks TypeScript to infer the most specific readonly literal shape.

**Practical consequence:** This pattern keeps runtime data and type-level unions synchronized.

**Common pitfall:** `as const` is not `Object.freeze`. It does not freeze runtime data.

### Object Types, Optional Properties, and Index Signatures

Object types describe JavaScript object shapes.

| Syntax                      | Meaning                                   | Example                                     |
| --------------------------- | ----------------------------------------- | ------------------------------------------- |
| `{ id: string }`            | Object with required `id`                 | `{ id: "u1" }`                              |
| `{ name?: string }`         | Optional property                         | `{}` or `{ name: "Ada" }`                   |
| `{ readonly id: string }`   | Readonly property through typed reference | `{ readonly id: string }`                   |
| `{ [key: string]: number }` | String index signature                    | Dynamic string-key dictionary               |
| `Record<K, V>`              | Object type with keys `K` and values `V`  | `Record<string, number>`                    |
| `object`                    | Non-primitive object value                | Rarely enough detail for application models |
| `{}`                        | Any non-nullish value under many settings | Usually too broad                           |

Stable object shape:

```ts
type User = {
  id: string;
  email: string;
  displayName?: string;
  readonly createdAt: Date;
};

const user: User = {
  id: "u1",
  email: "a@example.com",
  createdAt: new Date(),
};

// user.createdAt = new Date(); // Error
```

Optional properties mean the property may be absent:

```ts
type SearchOptions = {
  query: string;
  limit?: number;
};

function search(options: SearchOptions) {
  const limit = options.limit ?? 20;
  return { query: options.query, limit };
}
```

`readonly` is checked statically through the typed reference:

```ts
type Account = {
  readonly id: string;
  balance: number;
};

const account: Account = {
  id: "a1",
  balance: 100,
};

// account.id = "a2"; // Error
account.balance += 50;
```

It is not runtime immutability:

```ts
const mutable = { id: "a1", balance: 100 };

const readonlyView: Readonly<typeof mutable> = mutable;

// readonlyView.balance = 200; // Error
mutable.balance = 200; // Allowed
```

Dynamic dictionary:

```ts
type Counters = Record<string, number>;

const counters: Counters = {
  views: 10,
  clicks: 3,
};

counters.signups = 1;
```

Index signature form:

```ts
type Headers = {
  [name: string]: string;
};

const headers: Headers = {
  "content-type": "application/json",
};
```

When keys are finite, prefer a literal-key union over broad `string`:

```ts
type MetricName = "views" | "clicks" | "signups";

type Metrics = Record<MetricName, number>;

const metrics: Metrics = {
  views: 10,
  clicks: 3,
  signups: 1,
};
```

| Shape                        | Best type                                   | Reason                                                |
| ---------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| Known fields                 | Object type or `interface`                  | Strong property checking                              |
| Known finite keys            | `Record<Union, V>`                          | Requires all expected keys                            |
| Unknown arbitrary keys       | `Record<string, V>` or index signature      | Models dynamic dictionary                             |
| External untrusted object    | `unknown` first                             | Requires validation                                   |
| Mixed fixed and dynamic keys | Object type plus index signature, carefully | Index signature constrains compatible property values |

Excess property checks apply strongly to fresh object literals:

```ts
type CreateUserInput = {
  email: string;
  role: "admin" | "member";
};

function createUser(input: CreateUserInput) {
  return input;
}

createUser({
  email: "a@example.com",
  role: "member",
  // roel: "admin", // Error: likely typo
});
```

But intermediate variables are checked structurally:

```ts
const input = {
  email: "a@example.com",
  role: "member",
  extra: true,
};

createUser(input); // May error because role widened to string
```

The above can fail not because of `extra`, but because `role` may be inferred as `string` rather than `"member"`.

Useful fixes:

```ts
const inputA: CreateUserInput = {
  email: "a@example.com",
  role: "member",
};

const inputB = {
  email: "a@example.com",
  role: "member",
  extra: true,
} satisfies CreateUserInput & { extra: boolean };

const inputC = {
  email: "a@example.com",
  role: "member",
} as const;

createUser(inputA);
createUser(inputC);
```

**Common pitfall:** Excess property checks are not exact object types. They are a special check for fresh object literals.

### `type` vs `interface`

Both `type` aliases and `interface` declarations can describe object contracts. They differ in extension behavior, declaration merging, and expressiveness.

| Capability                  |                 `interface` |              `type` |
| --------------------------- | --------------------------: | ------------------: |
| Object shape                |                         Yes |                 Yes |
| Function shape              |                         Yes |                 Yes |
| Class `implements`          |                         Yes | Yes, if object-like |
| Extending object contracts  |                   `extends` |    Intersection `&` |
| Declaration merging         |                         Yes |                  No |
| Union types                 |                          No |                 Yes |
| Tuple types                 | No direct tuple declaration |                 Yes |
| Primitive aliases           |                          No |                 Yes |
| Mapped types                |                          No |                 Yes |
| Conditional types           |                          No |                 Yes |
| Template literal types      |                          No |                 Yes |
| Complex type expressions    |                     Limited |              Strong |
| Public library augmentation |                      Strong |             Limited |
| API object contract style   |                      Strong |                Good |
| Derived type programming    |                     Limited |              Strong |

Interface object contract:

```ts
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

type User = {
  id: string;
  email: string;
};
```

Type alias for unions and derived types:

```ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

type UserId = string;

type ReadonlyUser = Readonly<User>;
```

Interface extension:

```ts
interface Entity {
  id: string;
}

interface User extends Entity {
  email: string;
}
```

Type intersection:

```ts
type Entity = {
  id: string;
};

type User = Entity & {
  email: string;
};
```

Declaration merging:

```ts
interface Window {
  appVersion: string;
}

window.appVersion;
```

This is useful for augmenting global or library-provided types. A `type` alias cannot be reopened this way.

Class implementation:

```ts
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}
```

A class can also implement a compatible type alias:

```ts
type Clock = {
  now(): Date;
};

class SystemClock implements Clock {
  now() {
    return new Date();
  }
}
```

| Situation                                     | Prefer      | Reason                                                                            |
| --------------------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| Public object contract intended for extension | `interface` | Clear contract style and declaration merging                                      |
| Library API surface with augmentation hooks   | `interface` | Consumers can merge or augment                                                    |
| Union of variants                             | `type`      | Interfaces cannot directly express unions                                         |
| Mapped or conditional transformation          | `type`      | Required for type-level computation                                               |
| Tuple or primitive alias                      | `type`      | Interfaces do not model these directly                                            |
| Application DTO or domain object              | Either      | Consistency matters more than dogma                                               |
| React props                                   | Either      | `type` often better for unions/composition; `interface` fine for simple contracts |

Practical rule:

Use `interface` for extendable object contracts when declaration merging or object-contract style matters.

Use `type` for unions, mapped types, conditional types, tuples, primitives, and composed type expressions.

**Common pitfall:** Treating `type` and `interface` as runtime constructs. Both are erased.

### Union, Intersection, and Discriminated Unions

A union means one of several possibilities. An intersection means a value must satisfy multiple type requirements at once.

| Construct           | Meaning                                | Example                              | Mental model                   |
| ------------------- | -------------------------------------- | ------------------------------------ | ------------------------------ |
| `A \| B`            | Either `A` or `B`                      | `string \| number`                   | One of several possibilities   |
| `A & B`             | Both `A` and `B`                       | `{ id: string } & { email: string }` | Combined requirements          |
| Discriminated union | Union distinguished by a literal field | `{ kind: "a" } \| { kind: "b" }`     | State machine or variant model |

Basic union:

```ts
function formatId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase();
  }

  return id.toFixed(0);
}
```

A union does not mean all members are available:

```ts
type EmailContact = {
  email: string;
};

type PhoneContact = {
  phone: string;
};

function send(contact: EmailContact | PhoneContact) {
  // contact.email; // Error
  // contact.phone; // Error

  if ("email" in contact) {
    return `Email ${contact.email}`;
  }

  return `Call ${contact.phone}`;
}
```

Intersection:

```ts
type Entity = {
  id: string;
};

type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type User = Entity & Timestamped & {
  email: string;
};

const user: User = {
  id: "u1",
  email: "a@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

Discriminated unions are one of TypeScript’s most important business-code patterns.

```ts
type InvoiceState =
  | { status: "draft"; editable: true }
  | { status: "sent"; sentAt: Date }
  | { status: "paid"; paidAt: Date; receiptId: string }
  | { status: "void"; reason: string };

function getInvoiceLabel(state: InvoiceState): string {
  switch (state.status) {
    case "draft":
      return "Draft";
    case "sent":
      return `Sent at ${state.sentAt.toISOString()}`;
    case "paid":
      return `Paid: ${state.receiptId}`;
    case "void":
      return `Void: ${state.reason}`;
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}
```

| Pattern           | Poor model                                       | Better model                                         |
| ----------------- | ------------------------------------------------ | ---------------------------------------------------- |
| Async loading     | `{ loading?: boolean; data?: T; error?: Error }` | Discriminated union                                  |
| Payment lifecycle | Many booleans                                    | Literal `status` variants                            |
| Form mode         | `isCreate`, `isEdit`, optional ID                | `{ mode: "create" } \| { mode: "edit"; id: string }` |
| API result        | Nullable data plus nullable error                | `{ ok: true; data: T } \| { ok: false; error: E }`   |

Async request state:

```ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function renderUser(state: RequestState<User>) {
  switch (state.status) {
    case "idle":
      return "Not started";
    case "loading":
      return "Loading";
    case "success":
      return state.data.email;
    case "error":
      return state.error.message;
  }
}
```

**Design meaning:** The discriminant field gives the compiler a runtime-checkable fact that narrows the variant.

**Practical consequence:** Invalid state combinations become unrepresentable.

Compare:

```ts
type WeakState<T> = {
  loading?: boolean;
  data?: T;
  error?: Error;
};
```

This permits invalid combinations:

```ts
const bad: WeakState<User> = {
  loading: true,
  data: { id: "u1", email: "a@example.com" },
  error: new Error("Failed"),
};
```

A discriminated union prevents such combinations.

Common sharp edges:

| Mistake                                        | Why it happens                               | Better pattern                           |
| ---------------------------------------------- | -------------------------------------------- | ---------------------------------------- |
| Thinking `A \| B` means both `A` and `B`       | Natural-language “or” ambiguity              | Access only common fields until narrowed |
| Using optional bags for state                  | Seems simpler initially                      | Use discriminated unions                 |
| Forgetting exhaustive checks                   | Switch handles current variants only         | Assign default branch to `never`         |
| Overusing intersections for domain composition | `&` can create impossible or confusing types | Compose object types deliberately        |
| Intersecting incompatible primitives           | Produces `never` or unusable types           | Use branded primitives only with care    |

### Functions, Overloads, and Call Signatures

Functions are values at runtime and function types at compile time. TypeScript checks parameters, return values, overloads, callbacks, and callable object shapes.

| Syntax               | Meaning                      | Example                        |
| -------------------- | ---------------------------- | ------------------------------ |
| Parameter annotation | Type for a parameter         | `function f(x: string)`        |
| Return annotation    | Type for returned value      | `function f(): number`         |
| Optional parameter   | Parameter may be omitted     | `limit?: number`               |
| Default parameter    | Runtime default value        | `limit = 20`                   |
| Rest parameter       | Variable number of arguments | `...ids: string[]`             |
| Function type        | Type of callable value       | `(id: string) => User`         |
| Call signature       | Callable object type         | `{ (input: string): number }`  |
| Overload             | Multiple call forms          | `function parse(x: string): A` |
| Generic function     | Type parameterized function  | `function id<T>(x: T): T`      |

Basic function:

```ts
function formatUser(id: string, email: string): string {
  return `${id}: ${email}`;
}
```

Return types can often be inferred, but explicit return types are useful for public APIs:

```ts
export function parsePort(value: string): number {
  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("Invalid port");
  }

  return port;
}
```

Optional parameter:

```ts
function listUsers(limit?: number) {
  const actualLimit = limit ?? 50;
  return actualLimit;
}
```

Default parameter:

```ts
function listUsersWithDefault(limit = 50) {
  return limit;
}
```

| Form                         | Type inside function  | Runtime behavior                                               |
| ---------------------------- | --------------------- | -------------------------------------------------------------- |
| `limit?: number`             | `number \| undefined` | Caller may omit argument                                       |
| `limit = 50`                 | Usually `number`      | Uses default when argument is `undefined`                      |
| `limit: number \| undefined` | `number \| undefined` | Caller must pass an argument unless parameter is also optional |

Rest parameter:

```ts
function joinPath(base: string, ...segments: string[]) {
  return [base, ...segments].join("/");
}

joinPath("/api", "users", "u1");
```

Function type alias:

```ts
type Predicate<T> = (value: T) => boolean;

const isNonEmpty: Predicate<string> = (value) => value.length > 0;
```

Call signature:

```ts
type Parser<T> = {
  (input: string): T;
  description: string;
};

const numberParser: Parser<number> = Object.assign(
  (input: string) => Number(input),
  { description: "Parses a number" }
);
```

Overloads:

```ts
function getValue(key: "port"): number;
function getValue(key: "host"): string;
function getValue(key: "debug"): boolean;
function getValue(key: "port" | "host" | "debug") {
  switch (key) {
    case "port":
      return 3000;
    case "host":
      return "localhost";
    case "debug":
      return false;
  }
}

const port = getValue("port");
const host = getValue("host");
```

Overload implementation must be compatible with all overload signatures.

Prefer unions over overloads when the return type does not vary by input:

```ts
function normalize(value: string | string[]): string[] {
  return Array.isArray(value) ? value : [value];
}
```

Use overloads when different input forms produce meaningfully different return types:

```ts
function select(selector: string): Element | null;
function select(selector: string, all: true): NodeListOf<Element>;
function select(selector: string, all?: true) {
  return all
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
}
```

Common function pitfalls:

| Mistake                                  | Why it happens                                      | Better pattern                                           |
| ---------------------------------------- | --------------------------------------------------- | -------------------------------------------------------- |
| Annotating every local callback manually | Underusing contextual inference                     | Let callback parameters infer from array/library methods |
| Using overloads for simple unions        | Overloads look formal                               | Prefer unions when return type is stable                 |
| Forgetting optional means `undefined`    | Optional parameter may be omitted                   | Use `??` or explicit checks                              |
| Assuming default handles `null`          | Default parameters apply to `undefined`, not `null` | Use nullish checks when accepting `null`                 |
| Returning inconsistent shapes            | Inference creates broad unions                      | Add explicit return type or discriminated union          |
| Using `Function` type                    | Too broad and unsafe                                | Use explicit call signatures                             |

### Classes, Interfaces, and `implements`

Classes exist at runtime and also create instance types.

| Feature            | Syntax                           |          Runtime effect? | Notes                                                      |
| ------------------ | -------------------------------- | -----------------------: | ---------------------------------------------------------- |
| Class declaration  | `class User {}`                  |                      Yes | Creates constructor value                                  |
| Constructor        | `constructor(...)`               |                      Yes | Initializes instances                                      |
| Parameter property | `constructor(public id: string)` |                      Yes | Emits property assignment                                  |
| `public`           | `public name: string`            | No meaningful JS privacy | Default visibility                                         |
| `private`          | `private token: string`          |  TypeScript-private only | Runtime visibility depends on emit; not same as `#private` |
| `protected`        | `protected value: string`        |         TypeScript check | Accessible in subclasses                                   |
| `readonly`         | `readonly id: string`            |      No runtime freezing | Prevents assignment after initialization                   |
| `abstract`         | `abstract class Base`            |         TypeScript check | Cannot instantiate in TS                                   |
| `implements`       | `class X implements Y`           |                       No | Checks instance-side shape                                 |
| `static`           | `static create()`                |                      Yes | Member on constructor, not instance                        |
| `#private`         | `#secret`                        |                      Yes | JavaScript private field                                   |

Class example:

```ts
interface Clock {
  now(): Date;
}

class SystemClock implements Clock {
  now(): Date {
    return new Date();
  }
}
```

Constructor parameter properties:

```ts
class User {
  constructor(
    public readonly id: string,
    public email: string,
    private passwordHash: string
  ) {}

  verifyPassword(hash: string) {
    return this.passwordHash === hash;
  }
}
```

This is shorthand for declaring and assigning properties in the constructor.

`implements` checks the instance side:

```ts
interface Serializable {
  serialize(): string;
}

class Session implements Serializable {
  constructor(public readonly id: string) {}

  serialize() {
    return JSON.stringify({ id: this.id });
  }

  static fromJson(json: string) {
    const data = JSON.parse(json);
    return new Session(data.id);
  }
}
```

The `static fromJson` member is not part of the `Serializable` check.

Class as value and type:

```ts
class User {
  constructor(public id: string) {}
}

type UserInstance = User;
type UserConstructor = typeof User;

const Constructor: UserConstructor = User;
const user: UserInstance = new Constructor("u1");
```

| Name usage                       | Meaning                       |
| -------------------------------- | ----------------------------- |
| `User` in `new User()`           | Runtime constructor value     |
| `User` in `const user: User`     | Instance type                 |
| `typeof User` in a type position | Type of the constructor value |

Abstract class:

```ts
abstract class Repository<T> {
  abstract findById(id: string): Promise<T | null>;

  async requireById(id: string): Promise<T> {
    const value = await this.findById(id);

    if (!value) {
      throw new Error("Not found");
    }

    return value;
  }
}
```

Classes are most useful when runtime behavior and instance identity matter. For plain data, object types are often simpler.

| Need                             | Prefer                              |
| -------------------------------- | ----------------------------------- |
| Plain data shape                 | `type` or `interface`               |
| Runtime methods and construction | `class`                             |
| Inheritance with shared behavior | `abstract class` or composition     |
| External object contract         | `interface` or object type          |
| Runtime private state            | `#private` fields                   |
| Type-only privacy                | TypeScript `private` or `protected` |

Common class pitfalls:

| Mistake                                     | Why it happens             | Better pattern                                                            |
| ------------------------------------------- | -------------------------- | ------------------------------------------------------------------------- |
| Expecting `interface` to exist at runtime   | Interfaces are erased      | Use classes or runtime validators for runtime checks                      |
| Assuming `implements` checks static methods | It checks instance members | Type the constructor separately                                           |
| Overusing classes for DTOs                  | Java/C# habit              | Use plain object types for data                                           |
| Confusing `private` with JS `#private`      | Similar names              | Use `#private` for runtime privacy                                        |
| Assuming `readonly` freezes objects         | It is compile-time only    | Use `Object.freeze` or immutable design when runtime immutability matters |

### Narrowing and Type Guards

Narrowing is how runtime checks inform TypeScript’s static understanding.

| Narrowing form     | Example                      | Narrows by                         |
| ------------------ | ---------------------------- | ---------------------------------- |
| `typeof`           | `typeof value === "string"`  | Primitive runtime type             |
| `instanceof`       | `value instanceof Date`      | Constructor prototype relationship |
| `in`               | `"id" in value`              | Property existence                 |
| Equality           | `value === "success"`        | Literal comparison                 |
| Truthiness         | `if (value)`                 | Removes some falsy values          |
| Discriminant       | `state.status === "success"` | Literal field in union             |
| Custom type guard  | `isUser(value)`              | Function returning `value is T`    |
| Assertion function | `assertUser(value)`          | Throws or narrows after call       |

`typeof` narrowing:

```ts
function normalizeId(id: string | number) {
  if (typeof id === "string") {
    return id.trim();
  }

  return id.toString();
}
```

`instanceof` narrowing:

```ts
function formatDate(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return new Date(value).toISOString();
}
```

`in` narrowing:

```ts
type ApiError = {
  error: string;
};

type ApiSuccess = {
  data: string[];
};

function handleResponse(response: ApiError | ApiSuccess) {
  if ("error" in response) {
    return response.error;
  }

  return response.data.join(", ");
}
```

Discriminant narrowing:

```ts
type Job =
  | { status: "queued"; id: string }
  | { status: "running"; id: string; startedAt: Date }
  | { status: "failed"; id: string; error: Error }
  | { status: "completed"; id: string; resultUrl: string };

function describeJob(job: Job) {
  switch (job.status) {
    case "queued":
      return `Queued ${job.id}`;
    case "running":
      return `Running since ${job.startedAt.toISOString()}`;
    case "failed":
      return job.error.message;
    case "completed":
      return job.resultUrl;
  }
}
```

Custom type guard:

```ts
type User = {
  id: string;
  email: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    typeof value.id === "string" &&
    typeof value.email === "string"
  );
}

function handle(value: unknown) {
  if (isUser(value)) {
    return value.email;
  }

  return null;
}
```

Assertion function:

```ts
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error("Expected User");
  }
}

const value: unknown = JSON.parse(raw);
assertUser(value);

value.email;
```

Truthiness narrowing should be used carefully:

```ts
function printName(name: string | null | undefined) {
  if (name) {
    console.log(name.toUpperCase());
  }
}
```

This excludes `null`, `undefined`, and also the empty string `""`.

Safer when empty string is valid:

```ts
function printName(name: string | null | undefined) {
  if (name != null) {
    console.log(name.toUpperCase());
  }
}
```

Common narrowing pitfalls:

| Mistake                                            | Why it happens                                  | Better pattern                                    |
| -------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| Using truthiness when empty string or `0` is valid | `if (value)` removes all falsy values           | Use `value != null` for nullish checks            |
| Using `typeof value === "object"` alone            | `null` is also object by JavaScript semantics   | Check `value !== null`                            |
| Expecting `in` to prove value type deeply          | It only proves property existence               | Validate property type too                        |
| Writing unsound type guards                        | Compiler trusts the predicate                   | Keep guards small and test them                   |
| Forgetting arrays are objects                      | `typeof [] === "object"`                        | Use `Array.isArray`                               |
| Using `instanceof` across realms                   | Different JS realms have different constructors | Prefer structural validation for cross-realm data |

### Nullability and Optional Values

Nullability is controlled heavily by `strictNullChecks`. In strict TypeScript, `null` and `undefined` are distinct from ordinary values.

| Form                     | Meaning                             | Example                       |
| ------------------------ | ----------------------------------- | ----------------------------- |
| `T \| undefined`         | Value may be explicitly `undefined` | `number \| undefined`         |
| `T \| null`              | Value may be explicitly `null`      | `User \| null`                |
| `T \| null \| undefined` | Value may be nullish either way     | `string \| null \| undefined` |
| `prop?: T`               | Property may be absent              | `{ limit?: number }`          |
| `param?: T`              | Argument may be omitted             | `function f(limit?: number)`  |
| `NonNullable<T>`         | Removes `null` and `undefined`      | `NonNullable<string \| null>` |
| `?.`                     | Optional chaining                   | `user.profile?.name`          |
| `??`                     | Nullish coalescing                  | `value ?? fallback`           |
| `!`                      | Non-null assertion                  | `value!.id`                   |

Comparison table:

| Form                                | Allows missing property? |                       Allows explicit `undefined`? | Allows `null`? | Best use                                   |
| ----------------------------------- | -----------------------: | -------------------------------------------------: | -------------: | ------------------------------------------ |
| `name?: string`                     |                      Yes | Config-dependent with `exactOptionalPropertyTypes` |             No | Property may be absent                     |
| `name: string \| undefined`         |                       No |                                                Yes |             No | Property exists but value may be undefined |
| `name: string \| null`              |                       No |                                                 No |            Yes | Explicit empty value                       |
| `name: string \| null \| undefined` |                       No |                                                Yes |            Yes | Interop with mixed nullish APIs            |

Optional property:

```ts
type Options = {
  timeoutMs?: number;
};

function connect(options: Options) {
  const timeoutMs = options.timeoutMs ?? 5000;
  return timeoutMs;
}
```

Explicit `undefined` property:

```ts
type CacheEntry<T> = {
  value: T | undefined;
  expiresAt: Date;
};
```

Explicit `null`:

```ts
type CurrentUser = User | null;

function getDisplayName(user: CurrentUser) {
  return user?.email ?? "Guest";
}
```

Optional chaining:

```ts
type Profile = {
  name?: string;
};

type User = {
  profile?: Profile;
};

function getName(user: User) {
  return user.profile?.name ?? "Anonymous";
}
```

Nullish coalescing is often safer than logical-or:

```ts
const configuredLimit = 0;

const a = configuredLimit || 20; // 20
const b = configuredLimit ?? 20; // 0
```

| Operator | Falls back on                                                   | Problem                  |
| -------- | --------------------------------------------------------------- | ------------------------ |
| `\|\|`   | Any falsy value: `0`, `""`, `false`, `null`, `undefined`, `NaN` | Can replace valid values |
| `??`     | Only `null` or `undefined`                                      | Better for defaults      |

Non-null assertion:

```ts
const element = document.querySelector("#app")!;

element.textContent = "Loaded";
```

This tells the compiler that `element` is not `null`. It does not check at runtime.

Safer version:

```ts
const element = document.querySelector("#app");

if (!element) {
  throw new Error("Missing #app element");
}

element.textContent = "Loaded";
```

`NonNullable<T>`:

```ts
type MaybeUser = User | null | undefined;

type PresentUser = NonNullable<MaybeUser>;
```

Common nullability pitfalls:

| Mistake                                         | Why it happens                            | Better pattern                                   |
| ----------------------------------------------- | ----------------------------------------- | ------------------------------------------------ |
| Turning off `strictNullChecks`                  | Easier migration                          | Enable it for real safety                        |
| Using `!` to silence errors                     | Fast but unsafe                           | Check, throw, return early, or redesign          |
| Using `\|\|` for defaults                       | Familiar JavaScript idiom                 | Use `??` for nullish fallback                    |
| Treating optional and `undefined` as identical  | They overlap but are not always identical | Choose absent vs present-but-empty intentionally |
| Forgetting DOM queries can return `null`        | DOM is dynamic                            | Check query result                               |
| Returning `null` and `undefined` inconsistently | API drift                                 | Pick one absence convention per boundary         |
## Part 3 — Type Operators and Type-Level Programming: `keyof`, `typeof`, Mapped Types, Conditional Types 

### Type-Level Programming Frame

TypeScript’s type-level programming tools let code derive types from other types and, in limited ways, from runtime declarations. The purpose is not to compute runtime values. The purpose is to make static models stay synchronized with implementation shapes.

| Tool family            | Operates on                             | Produces                   | Runtime effect? | Main use                                        |
| ---------------------- | --------------------------------------- | -------------------------- | --------------: | ----------------------------------------------- |
| `keyof`                | Type                                    | Union of property keys     |              No | Constrain property access                       |
| Type-level `typeof`    | Runtime value declaration               | Type of that value         |              No | Derive types from constants, functions, classes |
| Indexed access         | Type and key                            | Property value type        |              No | Extract member types                            |
| Generics               | Types supplied or inferred at use sites | Reusable typed abstraction |              No | Functions, containers, APIs                     |
| Conditional types      | Type relationship                       | Branch-selected type       |              No | Type transformation                             |
| `infer`                | Type pattern                            | Captured inner type        |              No | Extract return, element, promise value types    |
| Mapped types           | Key union                               | New object type            |              No | Transform object properties                     |
| Template literal types | String-like literal types               | New string literal types   |              No | Typed event names, route patterns, keys         |
| Utility types          | Existing types                          | Common derived types       |              No | Standard transformations                        |

**Design meaning:** Type-level programming is a static modeling mechanism. It should reduce duplication and encode stable invariants.

**Practical consequence:** Use type-level computation to derive types from source-of-truth models. Avoid building a second programming language inside the type system when plain explicit types would be clearer.

### `keyof`

`keyof T` produces a union of known property keys of `T`.

```ts
type User = {
  id: string;
  email: string;
  active: boolean;
};

type UserKey = keyof User;
// "id" | "email" | "active"
```

| Expression           | Meaning                                 |
| -------------------- | --------------------------------------- |
| `keyof User`         | Union of property names in `User`       |
| `K extends keyof T`  | `K` must be a valid key of `T`          |
| `T[K]`               | Value type at property key `K`          |
| `keyof typeof value` | Keys of a runtime value’s inferred type |

Safe generic property getter:

```ts
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = {
  id: "u1",
  email: "a@example.com",
  active: true,
};

const email = getProperty(user, "email");
// string

const active = getProperty(user, "active");
// boolean
```

**Design meaning:** `keyof` connects object property names with type-safe access.

**Practical consequence:** It prevents misspelled or invalid property access in generic helpers.

**Common pitfall:** `keyof` is type-level. It does not enumerate runtime keys.

```ts
type UserKeys = keyof User;

// No runtime array exists from UserKeys.
```

Runtime key enumeration still requires JavaScript:

```ts
const keys = Object.keys(user);
```

But `Object.keys` returns `string[]`, not automatically `(keyof T)[]`, because JavaScript objects may contain dynamic keys and TypeScript cannot generally prove exactness.

A carefully scoped helper may use an assertion:

```ts
function typedKeys<T extends object>(object: T): Array<keyof T> {
  return Object.keys(object) as Array<keyof T>;
}
```

This helper is convenient but not perfectly sound. It assumes the object’s runtime enumerable keys match the static type closely enough.

### Type-Level `typeof`

TypeScript has two different `typeof` forms.

| Form                | Level       | Example                     | Meaning                         |
| ------------------- | ----------- | --------------------------- | ------------------------------- |
| Runtime `typeof`    | Value level | `typeof value === "string"` | JavaScript runtime type check   |
| Type query `typeof` | Type level  | `type T = typeof value`     | Static type of a declared value |

Runtime `typeof`:

```ts
function normalize(value: string | number) {
  if (typeof value === "string") {
    return value.trim();
  }

  return value.toString();
}
```

Type-level `typeof`:

```ts
const defaultConfig = {
  retries: 3,
  mode: "safe",
};

type Config = typeof defaultConfig;
// {
//   retries: number;
//   mode: string;
// }
```

Literal preservation with `as const`:

```ts
const defaultConfig = {
  retries: 3,
  mode: "safe",
} as const;

type Config = typeof defaultConfig;
// {
//   readonly retries: 3;
//   readonly mode: "safe";
// }
```

Derive from function value:

```ts
function createUser(email: string) {
  return {
    id: crypto.randomUUID(),
    email,
    active: true,
  };
}

type CreateUser = typeof createUser;
type CreatedUser = ReturnType<typeof createUser>;
```

Derive from class value:

```ts
class User {
  constructor(public readonly id: string) {}
}

type UserInstance = User;
type UserConstructor = typeof User;
```

| Type          | Meaning                |
| ------------- | ---------------------- |
| `User`        | Instance type          |
| `typeof User` | Constructor value type |

**Common pitfall:** Type-level `typeof` can only refer to values that exist in code. It does not inspect arbitrary type aliases.

```ts
type User = {
  id: string;
};

// type T = typeof User; // Error: User is not a runtime value
```

### Indexed Access Types

Indexed access types extract property types from object, tuple, and array types.

```ts
type User = {
  id: string;
  profile: {
    displayName: string;
    timezone: string;
  };
};

type UserId = User["id"];
// string

type UserProfile = User["profile"];
// { displayName: string; timezone: string }

type Timezone = User["profile"]["timezone"];
// string
```

Array element extraction:

```ts
type Users = Array<{
  id: string;
  email: string;
}>;

type User = Users[number];
// { id: string; email: string }
```

Tuple element extraction:

```ts
type Result = [status: "ok", value: number];

type Status = Result[0];
// "ok"

type Value = Result[1];
// number
```

Use with `keyof`:

```ts
type ValueOf<T> = T[keyof T];

type StatusLabels = {
  draft: "Draft";
  sent: "Sent";
  paid: "Paid";
};

type Label = ValueOf<StatusLabels>;
// "Draft" | "Sent" | "Paid"
```

| Pattern       | Meaning                            | Example                       |
| ------------- | ---------------------------------- | ----------------------------- |
| `T["key"]`    | Type of property `key`             | `User["id"]`                  |
| `T[K]`        | Type of property or properties `K` | `User[keyof User]`            |
| `T[number]`   | Element type of array or tuple     | `(typeof roles)[number]`      |
| `T["a"]["b"]` | Nested property extraction         | `User["profile"]["timezone"]` |

**Common pitfall:** Indexed access types are static. They do not perform runtime property access.

### Deriving Unions from Runtime Values

A common professional pattern is to define a runtime list once and derive a type union from it.

```ts
const roles = ["admin", "editor", "viewer"] as const;

type Role = (typeof roles)[number];
// "admin" | "editor" | "viewer"
```

Use it in APIs:

```ts
function canManageUsers(role: Role) {
  return role === "admin";
}

canManageUsers("admin");
// canManageUsers("guest"); // Error
```

Object version:

```ts
const statusLabels = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
} as const;

type InvoiceStatus = keyof typeof statusLabels;
// "draft" | "sent" | "paid"

type InvoiceStatusLabel = (typeof statusLabels)[InvoiceStatus];
// "Draft" | "Sent" | "Paid"
```

| Goal                             | Pattern                                |
| -------------------------------- | -------------------------------------- |
| Union from constant array        | `(typeof array)[number]`               |
| Key union from constant object   | `keyof typeof object`                  |
| Value union from constant object | `(typeof object)[keyof typeof object]` |
| Preserve literal values          | `as const`                             |

**Common pitfall:** Without `as const`, arrays and object values often widen.

```ts
const roles = ["admin", "editor", "viewer"];

type Role = (typeof roles)[number];
// string
```

### Generics

Generics allow a declaration to work over different types while preserving relationships between input and output.

```ts
function identity<T>(value: T): T {
  return value;
}

const id = identity("u1");
// string
```

The important part is not that the function accepts any value. The important part is that the return type is connected to the input type.

```ts
function first<T>(values: readonly T[]): T | undefined {
  return values[0];
}

const firstNumber = first([1, 2, 3]);
// number | undefined

const firstName = first(["Ada", "Grace"]);
// string | undefined
```

Generic object wrapper:

```ts
type ApiResponse<T> = {
  data: T;
  requestId: string;
};

type UserResponse = ApiResponse<{
  id: string;
  email: string;
}>;
```

Generic function with multiple type parameters:

```ts
function mapValues<T, U>(
  values: readonly T[],
  mapper: (value: T) => U
): U[] {
  return values.map(mapper);
}

const lengths = mapValues(["a", "abc"], (value) => value.length);
// number[]
```

| Generic form             | Meaning                      | Example                      |
| ------------------------ | ---------------------------- | ---------------------------- |
| `<T>`                    | Type parameter               | `function id<T>(x: T): T`    |
| `<T, U>`                 | Multiple type parameters     | `map<T, U>`                  |
| `<T extends Constraint>` | Constrained type parameter   | `K extends keyof T`          |
| `<T = Default>`          | Default type parameter       | `Response<T = unknown>`      |
| `readonly T[]`           | Generic readonly array input | `first<T>(xs: readonly T[])` |

**Design meaning:** Generics express type relationships without hard-coding concrete types.

**Practical consequence:** Good generics preserve information; weak generics erase it.

Weak generic:

```ts
function parseJson<T>(input: string): T {
  return JSON.parse(input) as T;
}
```

This looks reusable but is unsafe because `T` is not validated.

Better boundary:

```ts
function parseJson(input: string): unknown {
  return JSON.parse(input);
}
```

Then validate separately.

### Generic Constraints

Constraints limit what a generic type may be.

```ts
function getId<T extends { id: string }>(value: T): string {
  return value.id;
}

getId({ id: "u1", email: "a@example.com" });
```

Key constraint:

```ts
function pick<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = {
  id: "u1",
  email: "a@example.com",
};

const id = pick(user, "id");
// string
```

Constraint with default:

```ts
type Repository<T extends { id: string } = { id: string }> = {
  findById(id: string): Promise<T | null>;
  save(value: T): Promise<void>;
};
```

| Constraint                                     | Meaning                              | Use case               |
| ---------------------------------------------- | ------------------------------------ | ---------------------- |
| `T extends object`                             | `T` must be non-primitive object-ish | Object helpers         |
| `T extends { id: string }`                     | `T` must have `id`                   | Entity helpers         |
| `K extends keyof T`                            | `K` must be key of `T`               | Property access        |
| `T extends (...args: any[]) => any`            | `T` must be function-like            | Function utility types |
| `T extends abstract new (...args: any) => any` | `T` must be constructor-like         | Class utility types    |

**Common pitfall:** `extends` in a generic constraint does not mean inheritance only. It means assignability.

```ts
function lengthOf<T extends { length: number }>(value: T) {
  return value.length;
}

lengthOf("abc");
lengthOf([1, 2, 3]);
lengthOf({ length: 10 });
```

### Conditional Types

A conditional type selects one type or another based on assignability.

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;
// true

type B = IsString<number>;
// false
```

Basic form:

```ts
type Conditional<T> = T extends Constraint ? WhenTrue : WhenFalse;
```

Useful example:

```ts
type MessageOf<T> = T extends { message: unknown }
  ? T["message"]
  : never;

type Email = {
  message: string;
};

type EmailMessage = MessageOf<Email>;
// string

type NoMessage = MessageOf<{ id: string }>;
// never
```

Conditional types distribute over unions when the checked type is a naked type parameter.

```ts
type ToArray<T> = T extends unknown ? T[] : never;

type A = ToArray<string | number>;
// string[] | number[]
```

Prevent distribution by wrapping in tuples:

```ts
type ToArrayNonDistributive<T> = [T] extends [unknown] ? T[] : never;

type B = ToArrayNonDistributive<string | number>;
// (string | number)[]
```

| Conditional type behavior | Example                         | Result                       |
| ------------------------- | ------------------------------- | ---------------------------- |
| Direct conditional        | `string extends string ? A : B` | `A`                          |
| Generic conditional       | `T extends string ? A : B`      | Depends on `T`               |
| Distributive over union   | `T extends U ? X : Y`           | Applied to each union member |
| Non-distributive          | `[T] extends [U] ? X : Y`       | Applied to union as a whole  |

**Common pitfall:** Accidental distribution can produce surprising unions.

### `infer`

`infer` captures part of a type inside a conditional type.

Extract array element type:

```ts
type ElementOf<T> = T extends readonly (infer U)[]
  ? U
  : never;

type A = ElementOf<string[]>;
// string

type B = ElementOf<readonly [1, 2, 3]>;
// 1 | 2 | 3
```

Extract promise value:

```ts
type UnwrapPromise<T> = T extends Promise<infer U>
  ? U
  : T;

type A = UnwrapPromise<Promise<string>>;
// string

type B = UnwrapPromise<number>;
// number
```

Extract function return type:

```ts
type MyReturnType<F> = F extends (...args: any[]) => infer R
  ? R
  : never;

function createUser() {
  return { id: "u1", email: "a@example.com" };
}

type User = MyReturnType<typeof createUser>;
```

Extract function parameters:

```ts
type MyParameters<F> = F extends (...args: infer P) => any
  ? P
  : never;

type Params = MyParameters<(id: string, active: boolean) => void>;
// [id: string, active: boolean]
```

| Extraction task      | Pattern                                                        |
| -------------------- | -------------------------------------------------------------- |
| Array element        | `T extends readonly (infer U)[] ? U : never`                   |
| Promise value        | `T extends Promise<infer U> ? U : T`                           |
| Function return      | `F extends (...args: any[]) => infer R ? R : never`            |
| Function parameters  | `F extends (...args: infer P) => any ? P : never`              |
| Constructor instance | `C extends abstract new (...args: any) => infer I ? I : never` |

**Common pitfall:** `infer` only works inside the `extends` clause of a conditional type.

### Mapped Types

Mapped types create object types by iterating over a key union.

```ts
type Flags<T> = {
  [K in keyof T]: boolean;
};

type User = {
  id: string;
  email: string;
};

type UserFlags = Flags<User>;
// {
//   id: boolean;
//   email: boolean;
// }
```

Core syntax:

```ts
type Mapped<T> = {
  [K in keyof T]: T[K];
};
```

Property modifiers:

```ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type Concrete<T> = {
  [K in keyof T]-?: T[K];
};
```

| Modifier    | Meaning         |
| ----------- | --------------- |
| `readonly`  | Add readonly    |
| `-readonly` | Remove readonly |
| `?`         | Add optional    |
| `-?`        | Remove optional |

Example:

```ts
type Draft<T> = {
  -readonly [K in keyof T]: T[K];
};

type RequiredUserInput<T> = {
  [K in keyof T]-?: T[K];
};
```

Key remapping with `as`:

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type User = {
  id: string;
  email: string;
};

type UserGetters = Getters<User>;
// {
//   getId: () => string;
//   getEmail: () => string;
// }
```

Filter keys by mapping some keys to `never`:

```ts
type OnlyStringProperties<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type User = {
  id: string;
  email: string;
  active: boolean;
};

type UserStrings = OnlyStringProperties<User>;
// {
//   id: string;
//   email: string;
// }
```

**Design meaning:** Mapped types are the object-type transformation primitive.

**Practical consequence:** Most utility types, including `Partial`, `Readonly`, `Pick`, and `Record`, are built from mapped types.

**Common pitfall:** Deep transformations require recursive mapped types, which can become expensive and hard to understand. Prefer shallow transformations unless there is a strong reason.

### Template Literal Types

Template literal types create string literal types from other literal types.

```ts
type Method = "GET" | "POST";
type Resource = "users" | "orders";

type RouteName = `${Method} /${Resource}`;
// "GET /users" | "GET /orders" | "POST /users" | "POST /orders"
```

Typed event names:

```ts
type User = {
  id: string;
  email: string;
};

type UserEvent = `${keyof User & string}Changed`;
// "idChanged" | "emailChanged"
```

Use with mapped types:

```ts
type ChangeHandlers<T> = {
  [K in keyof T as `${string & K}Changed`]: (value: T[K]) => void;
};

type UserHandlers = ChangeHandlers<User>;
// {
//   idChanged: (value: string) => void;
//   emailChanged: (value: string) => void;
// }
```

String manipulation utility types:

| Utility           | Meaning                      | Example                           |
| ----------------- | ---------------------------- | --------------------------------- |
| `Uppercase<S>`    | Uppercase string literal     | `Uppercase<"get">` → `"GET"`      |
| `Lowercase<S>`    | Lowercase string literal     | `Lowercase<"GET">` → `"get"`      |
| `Capitalize<S>`   | Capitalize first character   | `Capitalize<"user">` → `"User"`   |
| `Uncapitalize<S>` | Uncapitalize first character | `Uncapitalize<"User">` → `"user"` |

Example:

```ts
type AccessorName<K extends string> = `get${Capitalize<K>}`;

type NameAccessor = AccessorName<"email">;
// "getEmail"
```

**Common pitfall:** Template literal types are powerful for APIs with real naming conventions. They are often overused for cleverness where explicit types are easier to maintain.

### Utility Types

TypeScript includes standard utility types for common type transformations.

### Object Shape Utilities

| Utility        | Meaning                             | Example result                    | Common use               |
| -------------- | ----------------------------------- | --------------------------------- | ------------------------ |
| `Partial<T>`   | Makes all properties optional       | `{ id?: string; email?: string }` | Patch/update input       |
| `Required<T>`  | Makes all properties required       | `{ id: string; email: string }`   | Normalize after defaults |
| `Readonly<T>`  | Makes properties readonly           | `{ readonly id: string }`         | Immutable view           |
| `Pick<T, K>`   | Keeps selected keys                 | `Pick<User, "id">`                | API projections          |
| `Omit<T, K>`   | Removes selected keys               | `Omit<User, "passwordHash">`      | Public DTOs              |
| `Record<K, V>` | Object with keys `K` and values `V` | `Record<Role, boolean>`           | Keyed maps               |

Examples:

```ts
type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

type UserPatch = Partial<Pick<User, "email" | "passwordHash">>;

type PublicUser = Omit<User, "passwordHash">;

type UserPreview = Pick<User, "id" | "email">;

type ReadonlyUser = Readonly<User>;

type Role = "admin" | "editor" | "viewer";

type RolePermissions = Record<Role, boolean>;
```

| Task                                     | Preferred utility                     |
| ---------------------------------------- | ------------------------------------- |
| Update input where fields may be omitted | `Partial<T>` or `Partial<Pick<T, K>>` |
| Public response without sensitive fields | `Omit<T, K>`                          |
| Small projection from a larger model     | `Pick<T, K>`                          |
| Finite key map                           | `Record<K, V>`                        |
| Immutable view of top-level object       | `Readonly<T>`                         |
| Require fields after normalization       | `Required<T>`                         |

**Common pitfall:** `Partial<T>` and `Readonly<T>` are shallow.

```ts
type Config = {
  database: {
    url: string;
  };
};

type ReadonlyConfig = Readonly<Config>;

const config: ReadonlyConfig = {
  database: { url: "postgres://localhost" },
};

config.database.url = "postgres://prod"; // Allowed
```

### Union Utilities

| Utility          | Meaning                                | Example                                  |
| ---------------- | -------------------------------------- | ---------------------------------------- |
| `Exclude<T, U>`  | Remove union members assignable to `U` | `Exclude<"a" \| "b", "a">` → `"b"`       |
| `Extract<T, U>`  | Keep union members assignable to `U`   | `Extract<"a" \| "b", "a">` → `"a"`       |
| `NonNullable<T>` | Remove `null` and `undefined`          | `NonNullable<string \| null>` → `string` |

Examples:

```ts
type Status = "draft" | "sent" | "paid" | "void";

type ActiveStatus = Exclude<Status, "void">;
// "draft" | "sent" | "paid"

type TerminalStatus = Extract<Status, "paid" | "void">;
// "paid" | "void"

type MaybeUser = User | null | undefined;

type PresentUser = NonNullable<MaybeUser>;
// User
```

Use with discriminated unions:

```ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

type SuccessState<T> = Extract<
  RequestState<T>,
  { status: "success" }
>;

type ErrorState<T> = Extract<
  RequestState<T>,
  { status: "error" }
>;
```

**Common pitfall:** `Extract` and `Exclude` use assignability, not textual equality.

### Function and Constructor Utilities

| Utility                    | Meaning                                        | Example                               |
| -------------------------- | ---------------------------------------------- | ------------------------------------- |
| `ReturnType<F>`            | Return type of function `F`                    | `ReturnType<typeof createUser>`       |
| `Parameters<F>`            | Parameter tuple of function `F`                | `Parameters<typeof fetchUser>`        |
| `ConstructorParameters<C>` | Constructor parameter tuple                    | `ConstructorParameters<typeof User>`  |
| `InstanceType<C>`          | Instance type constructed by class constructor | `InstanceType<typeof User>`           |
| `Awaited<T>`               | Recursively unwraps promise-like values        | `Awaited<Promise<string>>` → `string` |

Examples:

```ts
function createUser(email: string) {
  return {
    id: crypto.randomUUID(),
    email,
    active: true,
  };
}

type CreatedUser = ReturnType<typeof createUser>;
// { id: string; email: string; active: boolean }

type CreateUserArgs = Parameters<typeof createUser>;
// [email: string]
```

Constructor utilities:

```ts
class User {
  constructor(
    public readonly id: string,
    public email: string
  ) {}
}

type UserConstructorArgs = ConstructorParameters<typeof User>;
// [id: string, email: string]

type UserInstance = InstanceType<typeof User>;
// User
```

`Awaited<T>`:

```ts
async function loadUser() {
  return {
    id: "u1",
    email: "a@example.com",
  };
}

type LoadedUser = Awaited<ReturnType<typeof loadUser>>;
// { id: string; email: string }
```

Nested promise unwrapping:

```ts
type A = Awaited<Promise<Promise<string>>>;
// string
```

**Common pitfall:** `ReturnType` on overloaded functions usually reflects the implementation or last overload behavior in ways that may not match a specific call. Prefer explicit exported result types for complex overloaded APIs.

### Annotation vs Assertion vs `as const` vs `satisfies`

These four tools are often confused. They do different things.

| Tool             |              Checks compatibility? |          Preserves literal precision? | Runtime effect? | Safety level  | Best use                                  | Common pitfall                                       |
| ---------------- | ---------------------------------: | ------------------------------------: | --------------: | ------------- | ----------------------------------------- | ---------------------------------------------------- |
| Annotation       |                                Yes | Often no; may widen to annotated type |              No | High          | Define intended variable or API type      | Losing useful literal detail                         |
| Assertion `as T` | Weakly; can override compiler view |              Depends on asserted type |              No | Low to medium | Boundary escape when externally justified | Treating it as validation                            |
| `as const`       |  No compatibility target by itself |                         Yes, strongly |              No | Medium        | Derive literal unions from values         | Assuming runtime freezing                            |
| `satisfies`      |                                Yes |             Yes, more than annotation |              No | High          | Validate shape while preserving inference | Expecting variable type to become exactly the target |

Annotation:

```ts
type Config = {
  mode: "development" | "production";
  retries: number;
};

const config: Config = {
  mode: "production",
  retries: 3,
};

config.mode;
// "development" | "production"
```

The variable is typed as `Config`, so `mode` is the broader union.

Assertion:

```ts
const config = {
  mode: "production",
  retries: 3,
} as Config;
```

This can silence useful errors and should be used carefully.

`as const`:

```ts
const config = {
  mode: "production",
  retries: 3,
} as const;

config.mode;
// "production"
```

This preserves literal precision and adds readonly inference.

`satisfies`:

```ts
type Config = {
  mode: "development" | "production";
  retries: number;
};

const config = {
  mode: "production",
  retries: 3,
} satisfies Config;

config.mode;
// "production"
```

`satisfies` checks that the object is compatible with `Config`, while preserving the more precise inferred type of the expression.

Useful with route tables:

```ts
type RouteConfig = {
  method: "GET" | "POST";
  path: string;
  auth: boolean;
};

const routes = {
  listUsers: {
    method: "GET",
    path: "/users",
    auth: true,
  },
  createUser: {
    method: "POST",
    path: "/users",
    auth: true,
  },
} satisfies Record<string, RouteConfig>;

type RouteName = keyof typeof routes;
// "listUsers" | "createUser"

type CreateUserMethod = typeof routes.createUser.method;
// "POST"
```

With annotation, some precision may be lost:

```ts
const routesAnnotated: Record<string, RouteConfig> = {
  listUsers: {
    method: "GET",
    path: "/users",
    auth: true,
  },
};

type RouteName = keyof typeof routesAnnotated;
// string
```

**Practical rule:** Use `satisfies` for configuration objects when the object must match a contract but still needs precise literal inference.

### Variance and Assignability Caveats

Variance describes how type compatibility behaves when generic types contain related types.

Consider:

```ts
type Animal = {
  name: string;
};

type Dog = Animal & {
  bark(): void;
};
```

| Variance kind  | Meaning                                                            | Informal example                              |
| -------------- | ------------------------------------------------------------------ | --------------------------------------------- |
| Covariance     | `Container<Dog>` can be used where `Container<Animal>` is expected | Reading values is usually safe                |
| Contravariance | `Handler<Animal>` can be used where `Handler<Dog>` is expected     | Accepting broader inputs is safe              |
| Invariance     | Exact type relationship required                                   | Mutable read/write containers often need this |
| Bivariance     | Both directions allowed                                            | Convenient but can be unsound                 |

Readonly arrays are easier to type safely because they are read-only:

```ts
const dogs: readonly Dog[] = [
  { name: "Rex", bark: () => undefined },
];

const animals: readonly Animal[] = dogs;
```

This is safe because `animals` cannot be used to insert a non-dog into `dogs`.

Mutable arrays are more dangerous:

```ts
const dogs: Dog[] = [
  { name: "Rex", bark: () => undefined },
];

const animals: Animal[] = dogs;

animals.push({ name: "Cat" });

dogs[1].bark(); // Runtime failure
```

TypeScript permits many array assignments for JavaScript compatibility, but this is one reason `readonly` inputs are safer.

Function parameter variance:

```ts
type Handler<T> = (value: T) => void;

const handleAnimal: Handler<Animal> = (animal) => {
  console.log(animal.name);
};

const handleDog: Handler<Dog> = (dog) => {
  dog.bark();
};
```

A handler that accepts any `Animal` can safely handle a `Dog`.

```ts
const dogHandler: Handler<Dog> = handleAnimal;
```

But a handler that requires a `Dog` cannot safely handle any `Animal`.

```ts
// const animalHandler: Handler<Animal> = handleDog; // Unsafe under strict function types
```

Callback positions inside object types may have bivariance-related caveats depending on syntax and compiler settings, especially for historical compatibility.

Safer callback modeling:

```ts
type EventHandler<T> = (event: T) => void;

type ButtonProps = {
  onClick: EventHandler<MouseEvent>;
};
```

Prefer explicit function-property types when strict callback checking matters.

| Area                       | Safer style                                 | Reason                                      |
| -------------------------- | ------------------------------------------- | ------------------------------------------- |
| Shared collections         | `readonly T[]`                              | Prevents mutation through wider aliases     |
| Function inputs            | Accept the broadest type actually supported | Improves assignability                      |
| Function outputs           | Return the most precise useful type         | Preserves information                       |
| Callback props             | Explicit function-property types            | Clearer variance behavior                   |
| Mutable generic containers | Be conservative                             | Read/write positions often imply invariance |

**Common pitfall:** Assignability is not inheritance. TypeScript checks whether a value can be used as another type based on structure and position.

### Type-Level Programming Patterns

### Pattern: Derive Type from Configuration Object

Use when a runtime configuration object is the source of truth.

```ts
const features = {
  search: {
    enabled: true,
    rollout: 0.5,
  },
  billing: {
    enabled: false,
    rollout: 0,
  },
} as const;

type FeatureName = keyof typeof features;
// "search" | "billing"

type FeatureConfig = (typeof features)[FeatureName];
// { readonly enabled: true; readonly rollout: 0.5 }
// | { readonly enabled: false; readonly rollout: 0 }
```

When the object must also match a contract, add `satisfies`:

```ts
type FeatureDefinition = {
  enabled: boolean;
  rollout: number;
};

const features = {
  search: {
    enabled: true,
    rollout: 0.5,
  },
  billing: {
    enabled: false,
    rollout: 0,
  },
} satisfies Record<string, FeatureDefinition>;

type FeatureName = keyof typeof features;
// "search" | "billing"
```

**Pitfall:** Annotation as `Record<string, FeatureDefinition>` loses the finite key union.

### Pattern: Derive Union from Constant Array

Use for finite sets that also need runtime iteration.

```ts
const invoiceStatuses = ["draft", "sent", "paid", "void"] as const;

type InvoiceStatus = (typeof invoiceStatuses)[number];

function isInvoiceStatus(value: string): value is InvoiceStatus {
  return invoiceStatuses.includes(value as InvoiceStatus);
}
```

**Pitfall:** The `includes` call may need a small assertion because the array is a narrow readonly tuple. This assertion should be local to the guard.

### Pattern: Extract API Result Type

Use when a function is the source of truth for a result shape.

```ts
async function fetchCurrentUser() {
  const response = await fetch("/api/me");
  const data: unknown = await response.json();

  assertUser(data);

  return data;
}

type CurrentUser = Awaited<ReturnType<typeof fetchCurrentUser>>;
```

**Pitfall:** This derives the declared return type. It does not validate the runtime response unless the function itself validates.

### Pattern: Transform Existing Types

Use when input/output models are closely related.

```ts
type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

type CreateUserInput = Pick<User, "email"> & {
  password: string;
};

type PublicUser = Omit<User, "passwordHash">;

type UpdateUserInput = Partial<Pick<User, "email">>;
```

**Pitfall:** Derived types should express real API semantics. Do not derive mechanically if the resulting type misrepresents the boundary.

### Pattern: Keep Types Synchronized with Event Names

Use when event names are generated from property names.

```ts
type Watchable<T> = {
  on<K extends keyof T & string>(
    event: `${K}Changed`,
    handler: (value: T[K]) => void
  ): void;
};

type User = {
  email: string;
  active: boolean;
};

declare const userEvents: Watchable<User>;

userEvents.on("emailChanged", (email) => {
  email.toUpperCase();
});

userEvents.on("activeChanged", (active) => {
  active.valueOf();
});
```

**Pitfall:** Template literal types should match a real runtime convention. The type does not implement the event system.

### Pattern: Typed Function Wrapper

Use when wrapping a function without losing its parameter and return types.

```ts
function withLogging<F extends (...args: any[]) => any>(fn: F) {
  return (...args: Parameters<F>): ReturnType<F> => {
    console.log("Calling function");
    return fn(...args);
  };
}

function add(a: number, b: number) {
  return a + b;
}

const loggedAdd = withLogging(add);

loggedAdd(1, 2);
// number
```

For async functions, use `Awaited<ReturnType<F>>` when modeling resolved values:

```ts
async function measureAsync<F extends (...args: any[]) => Promise<any>>(
  fn: F,
  ...args: Parameters<F>
): Promise<Awaited<ReturnType<F>>> {
  const start = performance.now();

  try {
    return await fn(...args);
  } finally {
    console.log(performance.now() - start);
  }
}
```

**Pitfall:** Wrappers can easily lose `this` typing, overloads, or generic behavior. For heavily overloaded functions, explicit wrapper signatures are often clearer.

### Pattern: Type-Safe Dictionary with Finite Keys

Use `Record<K, V>` when all keys are known and required.

```ts
type Locale = "en" | "fr" | "ja";

const labels: Record<Locale, string> = {
  en: "Settings",
  fr: "Paramètres",
  ja: "設定",
};
```

Missing keys are caught:

```ts
const incompleteLabels: Record<Locale, string> = {
  en: "Settings",
  fr: "Paramètres",
  // ja missing
};
```

For partial maps:

```ts
const translatedLabels: Partial<Record<Locale, string>> = {
  en: "Settings",
};
```

**Pitfall:** `Record<string, T>` implies arbitrary string keys. For finite domains, use a literal union key.

### Sharp Edges in Type-Level Programming

| Sharp edge                                   | Why it happens                                   | Better approach                                   |
| -------------------------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| Overusing `as`                               | Assertions are quick and silence errors          | Prefer annotations, guards, or `satisfies`        |
| Deep recursive types                         | TypeScript supports powerful computation         | Keep transformations shallow unless necessary     |
| Accidental conditional distribution          | Naked type parameters distribute over unions     | Wrap in tuples for non-distributive behavior      |
| Losing literal keys with `Record<string, T>` | Broad string index hides finite keys             | Use `satisfies Record<string, T>`                 |
| Treating `keyof` as runtime keys             | `keyof` is erased                                | Use `Object.keys` at runtime                      |
| Expecting utility types to be deep           | Standard utilities are shallow                   | Write explicit deep utilities only if needed      |
| Wrapping overloaded functions                | Utility types may not preserve overload behavior | Write explicit overloads or avoid generic wrapper |
| Misusing generics for validation             | Type parameters are erased                       | Validate unknown data at runtime                  |
| Excessive template literal types             | Clever static strings can become unreadable      | Use only where naming convention is stable        |
| Mutable variance surprises                   | Read/write positions are harder to reason about  | Prefer readonly inputs and immutable data flow    |

### Minimal Type-Level Toolkit to Memorize

| Need                        | Pattern                                |
| --------------------------- | -------------------------------------- |
| Valid property name         | `K extends keyof T`                    |
| Property value type         | `T[K]`                                 |
| Type from value             | `typeof value`                         |
| Union from constant array   | `(typeof values)[number]`              |
| Keys from constant object   | `keyof typeof object`                  |
| Values from constant object | `(typeof object)[keyof typeof object]` |
| Generic wrapper             | `type Box<T> = { value: T }`           |
| Constrained generic         | `<T extends { id: string }>`           |
| Optional update input       | `Partial<Pick<T, K>>`                  |
| Public DTO                  | `Omit<T, "secret">`                    |
| Variant extraction          | `Extract<Union, { kind: "x" }>`        |
| Promise result              | `Awaited<ReturnType<typeof fn>>`       |
| Function arguments          | `Parameters<typeof fn>`                |
| Config object contract      | `const x = {...} satisfies Contract`   |
| Literal source of truth     | `as const`                             |
| Trust boundary              | `unknown` plus guard or parser         |
## Part 4 — TypeScript by Task Pattern: Data Modeling, State, Validation, Derivation, APIs 

### Task-Pattern Frame

This part is organized by practical modeling tasks rather than syntax. The central question is: given a real coding problem, which TypeScript pattern should be used?

| Task family                  | Preferred TypeScript pattern         | Why it works                                       |
| ---------------------------- | ------------------------------------ | -------------------------------------------------- |
| Stable object data           | `type` or `interface` object shape   | Models known fields directly                       |
| Dynamic keyed data           | `Record<K, V>` or index signature    | Models key-value maps                              |
| Finite allowed values        | Literal union                        | Prevents arbitrary strings or numbers              |
| Variant state                | Discriminated union                  | Makes invalid combinations unrepresentable         |
| Runtime-to-type derivation   | `typeof`, `as const`, indexed access | Keeps runtime source and static type synchronized  |
| Safe generic reuse           | Generics with constraints            | Preserves relationships between inputs and outputs |
| Existing type transformation | Utility types                        | Avoids duplicate type declarations                 |
| External data                | `unknown` plus validation            | Respects runtime trust boundaries                  |
| API boundaries               | Explicit input/output types          | Stabilizes contracts between modules               |

**Design rule:** TypeScript types should model facts that are stable, useful, and checkable at development time. Runtime facts from untrusted data must be established by runtime code.

### Define a Stable Object Shape

Use a stable object shape when the program expects known fields with known value types.

```ts
type User = {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
};

function sendWelcomeEmail(user: User) {
  return `Welcome ${user.displayName} <${user.email}>`;
}
```

| Need                    | Pattern             | Example                            |
| ----------------------- | ------------------- | ---------------------------------- |
| Known required fields   | Object type         | `{ id: string; email: string }`    |
| Known optional field    | Optional property   | `{ displayName?: string }`         |
| Immutable field by type | `readonly` property | `{ readonly id: string }`          |
| Public object contract  | `interface`         | `interface UserRepository { ... }` |
| Derived DTO             | Utility type        | `Pick<User, "id" \| "email">`      |

Interface version:

```ts
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
```

**Why it works:** TypeScript uses structural typing, so any object with the required fields is compatible.

```ts
const userLike = {
  id: "u1",
  email: "a@example.com",
  displayName: "Ada",
  createdAt: new Date(),
  internalNote: "VIP",
};

sendWelcomeEmail(userLike);
```

The extra `internalNote` does not matter when the object is assigned through an intermediate variable.

**Common pitfall:** Do not use a broad dictionary type for a stable object shape.

Poor model:

```ts
type User = Record<string, string>;
```

Better model:

```ts
type User = {
  id: string;
  email: string;
  displayName: string;
};
```

The better model catches misspellings, missing fields, and wrong value types.

### Define a Dictionary or Dynamic-Key Map

Use a dictionary when keys are dynamic or when the set of keys is not known at authoring time.

```ts
type Counters = Record<string, number>;

const counters: Counters = {};

counters.views = 1;
counters["button:signup"] = 3;
```

Equivalent index signature:

```ts
type Counters = {
  [key: string]: number;
};
```

| Situation                      | Pattern                          | Example                           |
| ------------------------------ | -------------------------------- | --------------------------------- |
| Arbitrary string keys          | `Record<string, V>`              | `Record<string, number>`          |
| Finite known keys              | `Record<K, V>`                   | `Record<"en" \| "fr", string>`    |
| Optional finite keys           | `Partial<Record<K, V>>`          | `Partial<Record<Locale, string>>` |
| Numeric indexes                | Array or `Record<number, V>`     | `Record<number, User>`            |
| Mixed fixed and dynamic fields | Object type plus index signature | Use carefully                     |

Finite-key map:

```ts
type Locale = "en" | "fr" | "ja";

const labels: Record<Locale, string> = {
  en: "Settings",
  fr: "Paramètres",
  ja: "設定",
};
```

Partial finite-key map:

```ts
type Locale = "en" | "fr" | "ja";

const optionalLabels: Partial<Record<Locale, string>> = {
  en: "Settings",
};
```

**Why it works:** `Record<K, V>` maps every key in `K` to value type `V`.

**Common pitfall:** `Record<string, T>` is often too broad.

```ts
type UserById = Record<string, User>;

const users: UserById = {};

const user = users["missing"];
```

Depending on `tsconfig`, `user` may be treated as `User`, even though the runtime value is `undefined`. Safer options include enabling `noUncheckedIndexedAccess` or explicitly modeling absence:

```ts
type UserById = Record<string, User | undefined>;

const user = users["missing"];

if (user) {
  user.email;
}
```

### Model a Finite Set of Allowed Values

Use a literal union when a value must be one of a known set.

```ts
type UserRole = "admin" | "editor" | "viewer";

function canDeleteUsers(role: UserRole) {
  return role === "admin";
}
```

| Poor model                         | Better model                             | Reason                       |
| ---------------------------------- | ---------------------------------------- | ---------------------------- |
| `role: string`                     | `role: "admin" \| "editor" \| "viewer"`  | Rejects invalid roles        |
| `status: number`                   | `status: 200 \| 400 \| 404 \| 500`       | Models known protocol values |
| `enabled: boolean` for multi-state | `"enabled" \| "disabled" \| "inherited"` | Avoids ambiguous booleans    |

Runtime array plus derived union:

```ts
const roles = ["admin", "editor", "viewer"] as const;

type UserRole = (typeof roles)[number];

function isUserRole(value: string): value is UserRole {
  return roles.includes(value as UserRole);
}
```

**Why it works:** The runtime array is the source of truth; `as const` preserves literal element types; indexed access extracts the union.

**Common pitfall:** Without `as const`, TypeScript widens the array to `string[]`.

```ts
const roles = ["admin", "editor", "viewer"];

type UserRole = (typeof roles)[number];
// string
```

### Model One of Several Shapes

Use a discriminated union when a value may have one of several object shapes.

```ts
type Payment =
  | { kind: "card"; last4: string; brand: string }
  | { kind: "bank"; accountId: string }
  | { kind: "wallet"; provider: "apple" | "google" };

function describePayment(payment: Payment) {
  switch (payment.kind) {
    case "card":
      return `${payment.brand} ending in ${payment.last4}`;
    case "bank":
      return `Bank account ${payment.accountId}`;
    case "wallet":
      return `${payment.provider} wallet`;
  }
}
```

| Modeling need  | Discriminant field | Example variants                              |
| -------------- | ------------------ | --------------------------------------------- |
| Payment method | `kind`             | `"card"`, `"bank"`, `"wallet"`                |
| Request state  | `status`           | `"idle"`, `"loading"`, `"success"`, `"error"` |
| UI mode        | `mode`             | `"create"`, `"edit"`, `"readonly"`            |
| Domain event   | `type`             | `"user.created"`, `"user.deleted"`            |
| Parser result  | `ok`               | `true`, `false`                               |

**Why it works:** A shared literal field lets TypeScript narrow the union after a runtime check.

**Common pitfall:** Avoid modeling variants as one object with many optional properties.

Poor model:

```ts
type Payment = {
  kind: "card" | "bank" | "wallet";
  last4?: string;
  brand?: string;
  accountId?: string;
  provider?: "apple" | "google";
};
```

This permits invalid combinations:

```ts
const invalid: Payment = {
  kind: "card",
  accountId: "bank-1",
};
```

The discriminated union prevents this.

### Model Async Request State

Use a discriminated union for async state instead of nullable fields and booleans.

```ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

type User = {
  id: string;
  email: string;
};

function renderUser(state: RequestState<User>) {
  switch (state.status) {
    case "idle":
      return "Not started";
    case "loading":
      return "Loading";
    case "success":
      return state.data.email;
    case "error":
      return state.error.message;
  }
}
```

| State       | Available fields  | Unavailable fields |
| ----------- | ----------------- | ------------------ |
| `"idle"`    | `status`          | `data`, `error`    |
| `"loading"` | `status`          | `data`, `error`    |
| `"success"` | `status`, `data`  | `error`            |
| `"error"`   | `status`, `error` | `data`             |

**Why it works:** Each state has exactly the fields valid for that state.

**Common pitfall:** Boolean state models produce impossible states.

```ts
type WeakRequestState<T> = {
  loading: boolean;
  data?: T;
  error?: Error;
};

const impossible: WeakRequestState<User> = {
  loading: true,
  data: { id: "u1", email: "a@example.com" },
  error: new Error("Failed"),
};
```

### Enforce Exhaustive Branching

Use `never` to ensure every variant has been handled.

```ts
type InvoiceStatus =
  | { status: "draft" }
  | { status: "sent"; sentAt: Date }
  | { status: "paid"; paidAt: Date }
  | { status: "void"; reason: string };

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

function labelInvoice(status: InvoiceStatus): string {
  switch (status.status) {
    case "draft":
      return "Draft";
    case "sent":
      return `Sent at ${status.sentAt.toISOString()}`;
    case "paid":
      return `Paid at ${status.paidAt.toISOString()}`;
    case "void":
      return `Void: ${status.reason}`;
    default:
      return assertNever(status);
  }
}
```

| Pattern                           | Purpose                               |
| --------------------------------- | ------------------------------------- |
| `const x: never = value`          | Compile-time exhaustiveness check     |
| `assertNever(value)`              | Compile-time check plus runtime error |
| `switch` on discriminant          | Most readable exhaustive branching    |
| No default until exhaustive check | Lets compiler detect missing cases    |

**Why it works:** After all known variants have been handled, the remaining type should be `never`. If it is not, a variant was missed.

**Common pitfall:** A broad `default` branch can hide missing cases.

```ts
function labelInvoice(status: InvoiceStatus): string {
  switch (status.status) {
    case "draft":
      return "Draft";
    default:
      return "Other";
  }
}
```

This compiles but loses exhaustiveness.

### Derive a Type from a Runtime Value

Use type-level `typeof` when a runtime value is the source of truth.

```ts
const defaultSettings = {
  retries: 3,
  timeoutMs: 5000,
  mode: "safe",
};

type Settings = typeof defaultSettings;
```

The inferred type is:

```ts
type Settings = {
  retries: number;
  timeoutMs: number;
  mode: string;
};
```

For literal precision:

```ts
const defaultSettings = {
  retries: 3,
  timeoutMs: 5000,
  mode: "safe",
} as const;

type Settings = typeof defaultSettings;
```

Now the inferred type preserves literal and readonly information.

| Goal                      | Pattern                                    |
| ------------------------- | ------------------------------------------ |
| Type of runtime object    | `typeof object`                            |
| Type of function          | `typeof functionName`                      |
| Return type of function   | `ReturnType<typeof functionName>`          |
| Awaited async return type | `Awaited<ReturnType<typeof functionName>>` |
| Constructor type          | `typeof ClassName`                         |
| Instance type             | `InstanceType<typeof ClassName>`           |

Function-derived type:

```ts
function createUser(email: string) {
  return {
    id: crypto.randomUUID(),
    email,
    active: true,
  };
}

type CreatedUser = ReturnType<typeof createUser>;
```

Async function-derived type:

```ts
async function loadUser() {
  return createUser("a@example.com");
}

type LoadedUser = Awaited<ReturnType<typeof loadUser>>;
```

**Why it works:** `typeof` in a type position asks TypeScript for the static type of a value declaration.

**Common pitfall:** `typeof` cannot inspect a type alias as if it were a runtime value.

```ts
type User = {
  id: string;
};

// type X = typeof User; // Error
```

### Derive a Union from a Constant Array

Use `as const` plus indexed access when a runtime list defines allowed values.

```ts
const allowedMethods = ["GET", "POST", "PATCH", "DELETE"] as const;

type HttpMethod = (typeof allowedMethods)[number];

function request(method: HttpMethod, url: string) {
  return fetch(url, { method });
}
```

Runtime validation helper:

```ts
function isHttpMethod(value: string): value is HttpMethod {
  return allowedMethods.includes(value as HttpMethod);
}

const methodFromInput = "POST";

if (isHttpMethod(methodFromInput)) {
  request(methodFromInput, "/api/users");
}
```

| Step              | Code                              | Meaning                              |
| ----------------- | --------------------------------- | ------------------------------------ |
| Preserve literals | `as const`                        | Makes array a readonly literal tuple |
| Get array type    | `typeof allowedMethods`           | Static type of runtime array         |
| Get element union | `(typeof allowedMethods)[number]` | Union of tuple element types         |

**Why it works:** Tuple element access with `[number]` extracts all possible element types.

**Common pitfall:** This pattern derives a compile-time type from a runtime declaration, but it does not automatically validate arbitrary strings. A guard is still needed for external input.

### Write a Safe Generic Property Getter

Use `K extends keyof T` and `T[K]`.

```ts
function get<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = {
  id: "u1",
  email: "a@example.com",
  active: true,
};

const email = get(user, "email");
// string

const active = get(user, "active");
// boolean
```

| Type part           | Meaning                    |
| ------------------- | -------------------------- |
| `T`                 | Object type                |
| `K`                 | Selected key               |
| `K extends keyof T` | Key must exist on object   |
| `T[K]`              | Value type at selected key |

**Why it works:** The key and returned value are linked. Passing `"email"` returns the email property type; passing `"active"` returns the active property type.

**Common pitfall:** Weakly typed getters lose the relationship.

```ts
function weakGet(object: Record<string, unknown>, key: string): unknown {
  return object[key];
}
```

This is acceptable for unknown dynamic dictionaries, but it is worse for known object shapes.

### Create a Reusable Generic Wrapper

Use a generic type when the same container structure holds different data types.

```ts
type ApiResponse<T> = {
  data: T;
  requestId: string;
  receivedAt: string;
};

type User = {
  id: string;
  email: string;
};

type UserResponse = ApiResponse<User>;
```

Generic result wrapper:

```ts
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseNumber(input: string): Result<number> {
  const value = Number(input);

  if (Number.isNaN(value)) {
    return { ok: false, error: new Error("Invalid number") };
  }

  return { ok: true, value };
}
```

| Wrapper                    | Use case                |
| -------------------------- | ----------------------- |
| `ApiResponse<T>`           | API response envelope   |
| `Result<T, E>`             | Fallible operation      |
| `Page<T>`                  | Paginated data          |
| `Option<T>` or `T \| null` | Optional result         |
| `Repository<T>`            | Data access abstraction |

Pagination example:

```ts
type Page<T> = {
  items: T[];
  nextCursor: string | null;
};

async function listUsers(): Promise<Page<User>> {
  return {
    items: [],
    nextCursor: null,
  };
}
```

**Why it works:** The wrapper keeps structure constant while preserving the inner type.

**Common pitfall:** Do not use generic type parameters that are not connected to any value or property.

Weak generic:

```ts
function makeEmpty<T>() {
  return {};
}
```

The type parameter `T` has no evidence. It gives a false sense of type safety.

### Constrain a Generic

Use constraints when the function needs certain properties or capabilities.

```ts
function getEntityId<T extends { id: string }>(entity: T): string {
  return entity.id;
}

getEntityId({ id: "u1", email: "a@example.com" });
```

Constraint for collections:

```ts
function first<T>(values: readonly T[]): T | undefined {
  return values[0];
}
```

Constraint for keys:

```ts
function pluck<T, K extends keyof T>(
  values: readonly T[],
  key: K
): Array<T[K]> {
  return values.map((value) => value[key]);
}

const users = [
  { id: "u1", email: "a@example.com" },
  { id: "u2", email: "b@example.com" },
];

const emails = pluck(users, "email");
// string[]
```

| Constraint                          | Use when                               |
| ----------------------------------- | -------------------------------------- |
| `T extends object`                  | Value must be object-like              |
| `T extends { id: string }`          | Value must have an ID                  |
| `K extends keyof T`                 | Key must be valid for object           |
| `T extends readonly unknown[]`      | Value must be array-like or tuple-like |
| `F extends (...args: any[]) => any` | Value must be function-like            |

**Why it works:** The constraint gives the function enough static knowledge to safely access required members.

**Common pitfall:** `T extends object` does not mean a plain record with arbitrary keys. It only excludes primitives.

```ts
function values<T extends object>(object: T) {
  return Object.values(object);
}
```

This may accept arrays, functions, dates, and class instances. Use a more specific constraint if needed.

### Transform Existing Types

Use utility types when a new type is mechanically related to an existing one.

```ts
type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

type PublicUser = Omit<User, "passwordHash">;

type UserPreview = Pick<User, "id" | "email">;

type UserUpdate = Partial<Pick<User, "email">>;
```

| Task                     | Pattern               | Example                        |
| ------------------------ | --------------------- | ------------------------------ |
| Remove sensitive fields  | `Omit<T, K>`          | `Omit<User, "passwordHash">`   |
| Keep specific fields     | `Pick<T, K>`          | `Pick<User, "id" \| "email">`  |
| Make update input        | `Partial<Pick<T, K>>` | `Partial<Pick<User, "email">>` |
| Make all fields required | `Required<T>`         | `Required<Options>`            |
| Make readonly view       | `Readonly<T>`         | `Readonly<User>`               |
| Remove nullish           | `NonNullable<T>`      | `NonNullable<User \| null>`    |

Mapped custom transform:

```ts
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
```

**Why it works:** Transformations reduce duplicated declarations and keep related models synchronized.

**Common pitfall:** Do not derive types if the relationship is not truly mechanical.

For example, `CreateUserInput` usually should not be `Omit<User, "id" | "createdAt">` if it needs a plaintext password, invite token, CAPTCHA token, or other input-only fields.

Better:

```ts
type CreateUserInput = {
  email: string;
  password: string;
  inviteCode?: string;
};
```

### Keep or Remove Specific Fields

Use `Pick` and `Omit` for projections.

```ts
type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: "admin" | "member";
  createdAt: Date;
};

type UserListItem = Pick<User, "id" | "email" | "role">;

type SafeUser = Omit<User, "passwordHash">;
```

Use `Pick` when the kept list is shorter and semantically meaningful:

```ts
type UserIdentity = Pick<User, "id" | "email">;
```

Use `Omit` when the removed list is shorter and semantically meaningful:

```ts
type PublicUser = Omit<User, "passwordHash">;
```

| Decision                            | Prefer                |
| ----------------------------------- | --------------------- |
| Need two fields from a large type   | `Pick`                |
| Need all except one sensitive field | `Omit`                |
| Need update fields                  | `Partial<Pick<T, K>>` |
| Need type with different semantics  | Explicit type         |

**Why it works:** `Pick` and `Omit` create shallow projections of existing object types.

**Common pitfall:** Reusing domain types directly as API response types can leak internal fields.

```ts
function toPublicUser(user: User): SafeUser {
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}
```

The runtime transformation is still necessary. `Omit<User, "passwordHash">` only describes the return type; it does not remove the field at runtime.

### Type Unknown External Data Safely

Data crossing a trust boundary should usually begin as `unknown`.

```ts
type User = {
  id: string;
  email: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    typeof value.id === "string" &&
    typeof value.email === "string"
  );
}

async function loadUser(url: string): Promise<User> {
  const response = await fetch(url);
  const data: unknown = await response.json();

  if (!isUser(data)) {
    throw new Error("Invalid user payload");
  }

  return data;
}
```

| Boundary             | Recommended starting type                           | Validation strategy             |
| -------------------- | --------------------------------------------------- | ------------------------------- |
| `JSON.parse`         | `unknown`                                           | Type guard or schema parser     |
| HTTP response        | `unknown`                                           | Decode response body            |
| `localStorage`       | `string \| null`, then `unknown` after parse        | Null check and parse validation |
| Environment variable | `string \| undefined`                               | Config parser                   |
| Form input           | `string` or `FormDataEntryValue \| null`            | Field parser                    |
| Third-party JS       | `unknown` or narrow declaration                     | Wrapper adapter                 |
| Database result      | Driver-specific result or `unknown` at raw boundary | Query mapper or ORM validation  |

Schema-library style:

```ts
type Parser<T> = {
  parse(value: unknown): T;
};

function parseWith<T>(parser: Parser<T>, value: unknown): T {
  return parser.parse(value);
}
```

**Why it works:** `unknown` forces the program to establish evidence before using the data.

**Common pitfall:** Generic parsing without runtime validation is unsafe.

```ts
function parseJson<T>(input: string): T {
  return JSON.parse(input) as T;
}
```

This gives callers the ability to invent any result type.

Better:

```ts
function parseJson(input: string): unknown {
  return JSON.parse(input);
}
```

Then validate.

### Type Callbacks and Higher-Order Functions

Use function types to express callback inputs and outputs.

```ts
type Mapper<T, U> = (value: T, index: number) => U;

function mapItems<T, U>(
  items: readonly T[],
  mapper: Mapper<T, U>
): U[] {
  return items.map(mapper);
}

const lengths = mapItems(["a", "abc"], (value) => value.length);
```

| Callback type            | Meaning                       |
| ------------------------ | ----------------------------- |
| `(value: T) => void`     | Handler that consumes a value |
| `(value: T) => U`        | Mapper                        |
| `(value: T) => boolean`  | Predicate                     |
| `(error: Error) => void` | Error handler                 |
| `(...args: Args) => R`   | Generic callable form         |

Predicate example:

```ts
type Predicate<T> = (value: T) => boolean;

function filterItems<T>(
  items: readonly T[],
  predicate: Predicate<T>
): T[] {
  return items.filter(predicate);
}
```

Type guard callback:

```ts
function filterDefined<T>(
  values: readonly (T | null | undefined)[]
): T[] {
  return values.filter((value): value is T => value != null);
}
```

Higher-order wrapper:

```ts
function once<F extends (...args: any[]) => any>(fn: F): F {
  let called = false;
  let result: ReturnType<F>;

  return ((...args: Parameters<F>) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }

    return result;
  }) as F;
}
```

**Why it works:** Function type parameters preserve the relationship between arguments and return values.

**Common pitfall:** `Function` is almost always too broad.

Poor:

```ts
function run(fn: Function) {
  return fn();
}
```

Better:

```ts
function run<R>(fn: () => R): R {
  return fn();
}
```

### Extract Function Parameters or Return Types

Use standard utility types when another function is the source of truth.

```ts
function createOrder(input: {
  userId: string;
  sku: string;
  quantity: number;
}) {
  return {
    id: crypto.randomUUID(),
    ...input,
    status: "created" as const,
  };
}

type CreateOrderInput = Parameters<typeof createOrder>[0];

type CreatedOrder = ReturnType<typeof createOrder>;
```

Async return:

```ts
async function fetchOrder(id: string) {
  return {
    id,
    status: "created" as const,
  };
}

type FetchedOrder = Awaited<ReturnType<typeof fetchOrder>>;
```

| Utility                    | Use                            |
| -------------------------- | ------------------------------ |
| `Parameters<F>`            | Get function parameter tuple   |
| `Parameters<F>[0]`         | Get first argument type        |
| `ReturnType<F>`            | Get return type                |
| `Awaited<ReturnType<F>>`   | Get resolved async return type |
| `ConstructorParameters<C>` | Get class constructor args     |
| `InstanceType<C>`          | Get class instance type        |

**Why it works:** Utilities inspect declared function and constructor types.

**Common pitfall:** Extracting from overloaded functions can be surprising. For public APIs with complex overloads, an explicit named type is often clearer.

```ts
type CreateOrderInput = {
  userId: string;
  sku: string;
  quantity: number;
};

function createOrder(input: CreateOrderInput) {
  return {
    id: crypto.randomUUID(),
    ...input,
    status: "created" as const,
  };
}
```

### Type Modules and Type-Only Imports

Use `import type` and `export type` when importing or exporting declarations used only at the type level.

```ts
import type { User } from "./models/user";

export type { User };
```

Value import:

```ts
import { createUser } from "./models/user";

const user = createUser("a@example.com");
```

Mixed import:

```ts
import { createUser, type User } from "./models/user";
```

| Import/export form             | Runtime import/export? | Use                  |
| ------------------------------ | ---------------------: | -------------------- |
| `import { value } from "./x"`  |                    Yes | Runtime values       |
| `import type { T } from "./x"` |                     No | Types only           |
| `export { value } from "./x"`  |                    Yes | Re-export values     |
| `export type { T } from "./x"` |                     No | Re-export types only |

**Why it works:** Type-only imports make the value/type boundary explicit and help compilers, bundlers, and `isolatedModules` workflows.

**Common pitfall:** Importing a class with `import type` prevents using it as a runtime constructor.

```ts
import type { User } from "./user";

// new User("u1"); // Error if User is imported only as a type
```

If the class is needed at runtime:

```ts
import { User } from "./user";

const user = new User("u1");
```

### Add Types to JavaScript Libraries or Globals

Use declaration files when TypeScript needs static information about JavaScript that exists at runtime.

Module declaration:

```ts
declare module "legacy-formatter" {
  export function formatCurrency(value: number, currency: string): string;
}
```

Global declaration:

```ts
declare global {
  interface Window {
    appVersion: string;
  }
}

export {};
```

Ambient variable:

```ts
declare const __BUILD_ID__: string;
```

| Need                     | Pattern                                       |
| ------------------------ | --------------------------------------------- |
| Type untyped npm package | `declare module "package-name"`               |
| Add browser global       | `declare global { interface Window { ... } }` |
| Add build-time constant  | `declare const NAME: Type`                    |
| Publish library types    | `.d.ts` files or generated declarations       |
| Type JavaScript file     | JSDoc plus `checkJs`                          |

JSDoc in JavaScript:

```ts
/**
 * @param {string} email
 * @returns { { id: string, email: string } }
 */
export function createUser(email) {
  return {
    id: crypto.randomUUID(),
    email,
  };
}
```

**Why it works:** Declaration files describe existing runtime behavior to TypeScript.

**Common pitfall:** Declarations do not create runtime values.

```ts
declare const API_URL: string;

console.log(API_URL);
```

This type-checks only if something else actually provides `API_URL` at runtime.

### Choose Between Annotation, Assertion, and `satisfies`

Use the tool that matches the intent.

| Situation                                | Best tool                              | Example                                                |
| ---------------------------------------- | -------------------------------------- | ------------------------------------------------------ |
| Public variable or function contract     | Annotation                             | `const config: Config = ...`                           |
| Local config object needing precise keys | `satisfies`                            | `const routes = {...} satisfies Record<string, Route>` |
| Literal union source of truth            | `as const`                             | `const roles = [...] as const`                         |
| Trusted but compiler cannot know         | Assertion                              | `value as HTMLElement`                                 |
| Untrusted external data                  | Neither assertion nor annotation alone | `unknown` plus validation                              |

Annotation defines the variable’s type:

```ts
type Config = {
  mode: "dev" | "prod";
  retries: number;
};

const config: Config = {
  mode: "prod",
  retries: 3,
};
```

Assertion forces the compiler’s view:

```ts
const element = document.querySelector("#app") as HTMLElement;
```

Safer version:

```ts
const element = document.querySelector("#app");

if (!(element instanceof HTMLElement)) {
  throw new Error("Expected #app to be an HTMLElement");
}
```

`as const` preserves literals:

```ts
const statuses = ["draft", "sent", "paid"] as const;

type Status = (typeof statuses)[number];
```

`satisfies` checks compatibility while preserving precise inference:

```ts
type Route = {
  method: "GET" | "POST";
  path: string;
};

const routes = {
  listUsers: {
    method: "GET",
    path: "/users",
  },
  createUser: {
    method: "POST",
    path: "/users",
  },
} satisfies Record<string, Route>;

type RouteName = keyof typeof routes;
// "listUsers" | "createUser"
```

**Why it works:** Each tool affects a different relationship between expression inference and target type checking.

**Common pitfall:** `satisfies` does not change the variable’s type to the target type. It checks compatibility and keeps the expression’s inferred type.

### Type API Inputs and Outputs

Use explicit named types for module boundaries, service boundaries, and exported functions.

```ts
export type CreateUserInput = {
  email: string;
  password: string;
};

export type CreateUserOutput = {
  id: string;
  email: string;
};

export async function createUser(
  input: CreateUserInput
): Promise<CreateUserOutput> {
  return {
    id: crypto.randomUUID(),
    email: input.email,
  };
}
```

| Boundary           | Recommended style                   |
| ------------------ | ----------------------------------- |
| Exported function  | Explicit parameter and return types |
| Internal helper    | Inference usually acceptable        |
| API request DTO    | Named input type                    |
| API response DTO   | Named output type                   |
| Database model     | Separate from public DTO            |
| UI component props | Named `Props` type or interface     |

**Why it works:** Named boundary types document the contract and prevent accidental API drift.

**Common pitfall:** Reusing the same type for database rows, API responses, form inputs, and UI state creates coupling.

Better separation:

```ts
type UserRow = {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

type PublicUser = {
  id: string;
  email: string;
};

type CreateUserForm = {
  email: string;
  password: string;
};
```

### Type Configuration Objects

Use `satisfies` for configuration objects that need validation and literal precision.

```ts
type JobConfig = {
  schedule: string;
  retries: number;
  enabled: boolean;
};

const jobs = {
  sendDigest: {
    schedule: "0 8 * * *",
    retries: 3,
    enabled: true,
  },
  cleanupTempFiles: {
    schedule: "0 2 * * *",
    retries: 1,
    enabled: false,
  },
} satisfies Record<string, JobConfig>;

type JobName = keyof typeof jobs;
// "sendDigest" | "cleanupTempFiles"
```

| Need                                         | Tool                                                |
| -------------------------------------------- | --------------------------------------------------- |
| Ensure each config entry has required fields | `satisfies Record<string, Config>`                  |
| Preserve finite config keys                  | `satisfies`, not broad annotation                   |
| Preserve exact literal values                | `as const` if readonly literal precision is desired |
| Allow mutation                               | Avoid `as const`                                    |

With both `as const` and `satisfies`:

```ts
const jobs = {
  sendDigest: {
    schedule: "0 8 * * *",
    retries: 3,
    enabled: true,
  },
} as const satisfies Record<string, JobConfig>;
```

**Why it works:** `satisfies` validates the shape, while preserving inferred keys and often preserving useful literal information.

**Common pitfall:** Overusing `as const` can make values readonly when later mutation is intended.

### Type Events

Use discriminated unions for event payloads.

```ts
type DomainEvent =
  | {
      type: "user.created";
      userId: string;
      email: string;
    }
  | {
      type: "user.deleted";
      userId: string;
      deletedAt: Date;
    }
  | {
      type: "invoice.paid";
      invoiceId: string;
      paidAt: Date;
    };

function handleEvent(event: DomainEvent) {
  switch (event.type) {
    case "user.created":
      return event.email;
    case "user.deleted":
      return event.deletedAt;
    case "invoice.paid":
      return event.invoiceId;
  }
}
```

Extract one event by type:

```ts
type EventOf<T extends DomainEvent["type"]> = Extract<
  DomainEvent,
  { type: T }
>;

type UserCreatedEvent = EventOf<"user.created">;
```

Handler map:

```ts
type EventHandlers = {
  [E in DomainEvent as E["type"]]: (event: E) => void;
};

const handlers: EventHandlers = {
  "user.created": (event) => {
    event.email;
  },
  "user.deleted": (event) => {
    event.deletedAt;
  },
  "invoice.paid": (event) => {
    event.paidAt;
  },
};
```

**Why it works:** The event `type` field is a discriminant. Mapped types can build handler tables keyed by each event type.

**Common pitfall:** Do not type events as `{ type: string; payload: unknown }` inside trusted application logic unless the event is genuinely dynamic. Parse unknown external events at the boundary, then convert to a discriminated union.

### Type Form Input

Form values are runtime strings or file-like values. They should be parsed into domain types.

```ts
type SignupInput = {
  email: string;
  age: number;
  newsletter: boolean;
};

function parseSignupForm(formData: FormData): SignupInput {
  const email = formData.get("email");
  const age = formData.get("age");
  const newsletter = formData.get("newsletter");

  if (typeof email !== "string" || email.length === 0) {
    throw new Error("Email is required");
  }

  if (typeof age !== "string") {
    throw new Error("Age is required");
  }

  const parsedAge = Number(age);

  if (!Number.isInteger(parsedAge) || parsedAge < 0) {
    throw new Error("Invalid age");
  }

  return {
    email,
    age: parsedAge,
    newsletter: newsletter === "on",
  };
}
```

| Form value   | Runtime type                   | Parse to               |
| ------------ | ------------------------------ | ---------------------- |
| Text input   | `string` or `null`             | `string`               |
| Number input | `string` or `null`             | `number` after parsing |
| Checkbox     | Usually `"on"` or `null`       | `boolean`              |
| File input   | `File` or `null`               | `File` after check     |
| Multi-select | Multiple `FormDataEntryValue`s | Array after collection |

**Why it works:** Form data is an external boundary. The parser turns browser values into application values.

**Common pitfall:** HTML `<input type="number">` still produces a string at the JavaScript boundary.

### Type Environment Variables

Environment variables are strings at runtime and may be missing.

```ts
type AppConfig = {
  databaseUrl: string;
  port: number;
  nodeEnv: "development" | "test" | "production";
};

function readRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function readConfig(): AppConfig {
  const databaseUrl = readRequiredEnv("DATABASE_URL");
  const rawPort = readRequiredEnv("PORT");
  const rawNodeEnv = readRequiredEnv("NODE_ENV");

  const port = Number(rawPort);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT must be a positive integer");
  }

  if (
    rawNodeEnv !== "development" &&
    rawNodeEnv !== "test" &&
    rawNodeEnv !== "production"
  ) {
    throw new Error("Invalid NODE_ENV");
  }

  return {
    databaseUrl,
    port,
    nodeEnv: rawNodeEnv,
  };
}
```

| Raw env type          | Application type | Required step                           |
| --------------------- | ---------------- | --------------------------------------- |
| `string \| undefined` | `string`         | Presence check                          |
| `string \| undefined` | `number`         | Presence check plus numeric parse       |
| `string \| undefined` | `boolean`        | Presence check plus boolean parse       |
| `string \| undefined` | Literal union    | Presence check plus allowed-value check |

**Why it works:** The runtime boundary is parsed once into a typed config object.

**Common pitfall:** Declaration merging can make `process.env.X` appear typed, but it does not guarantee deployment has the variable. Runtime validation is still needed.

### Type DOM Queries

DOM queries can return `null` and broad element types.

```ts
const root = document.querySelector("#root");

if (!(root instanceof HTMLElement)) {
  throw new Error("Missing #root element");
}

root.dataset.ready = "true";
```

Generic selector helper:

```ts
function queryElement<E extends Element>(
  selector: string,
  constructor: { new (...args: any[]): E }
): E {
  const element = document.querySelector(selector);

  if (!(element instanceof constructor)) {
    throw new Error(`Expected ${selector}`);
  }

  return element;
}

const form = queryElement("#signup", HTMLFormElement);
const email = queryElement("#email", HTMLInputElement);
```

| DOM API                   | Typical type concern           |
| ------------------------- | ------------------------------ |
| `document.querySelector`  | `Element \| null`              |
| `document.getElementById` | `HTMLElement \| null`          |
| `form.elements`           | Broad or collection-like types |
| `event.target`            | `EventTarget \| null`          |
| `dataset`                 | String values or `undefined`   |

**Why it works:** Runtime `instanceof` checks narrow broad DOM types to specific element classes.

**Common pitfall:** Non-null assertions hide missing elements.

```ts
const root = document.querySelector("#root")!;
```

This compiles but can fail at runtime.

### Type Error Handling

In strict TypeScript, caught values should be treated as `unknown`.

```ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unknown error";
}

try {
  throw new Error("Failed");
} catch (error) {
  console.error(getErrorMessage(error));
}
```

| Thrown value  | Runtime reality           | Safe handling               |
| ------------- | ------------------------- | --------------------------- |
| `Error`       | Common but not guaranteed | `error instanceof Error`    |
| `string`      | Legal in JavaScript       | `typeof error === "string"` |
| object        | Legal in JavaScript       | Structural checks           |
| anything else | Legal in JavaScript       | Fallback                    |

**Why it works:** JavaScript can throw any value. `unknown` accurately represents that boundary.

**Common pitfall:** Assuming `catch (error)` is always an `Error`.

```ts
try {
  // ...
} catch (error) {
  // error.message may be unsafe unless narrowed
}
```

### Type Repository and Service Interfaces

Use interfaces or object types for stable service contracts.

```ts
type User = {
  id: string;
  email: string;
};

interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }
}
```

| Contract type    | Best use                                    |
| ---------------- | ------------------------------------------- |
| `interface`      | Extendable object/service contracts         |
| `type` object    | Local service contract or composed contract |
| `abstract class` | Shared runtime behavior plus contract       |
| Plain object     | Lightweight dependency injection            |

**Why it works:** Structural typing allows tests and alternate implementations to satisfy the same contract without inheritance.

**Common pitfall:** `implements` checks only the instance side of a class, not static factory methods.

### Type Class Constructors and Factories

When a function accepts a class, type the constructor value.

```ts
type Constructor<T> = {
  new (...args: any[]): T;
};

function createInstance<T>(ConstructorFn: Constructor<T>): T {
  return new ConstructorFn();
}

class Session {
  id = crypto.randomUUID();
}

const session = createInstance(Session);
```

Constructor with arguments:

```ts
type ConstructorWithArgs<T, Args extends readonly unknown[]> = {
  new (...args: Args): T;
};

function make<T, Args extends readonly unknown[]>(
  ConstructorFn: ConstructorWithArgs<T, Args>,
  ...args: Args
): T {
  return new ConstructorFn(...args);
}

class User {
  constructor(public id: string, public email: string) {}
}

const user = make(User, "u1", "a@example.com");
```

| Need                 | Type                                 |
| -------------------- | ------------------------------------ |
| Any constructor      | `new (...args: any[]) => T`          |
| Abstract constructor | `abstract new (...args: any[]) => T` |
| Constructor args     | `ConstructorParameters<typeof C>`    |
| Instance type        | `InstanceType<typeof C>`             |

**Why it works:** Classes are runtime constructor values and static instance types. Constructor typing must describe the value side.

**Common pitfall:** Using the instance type where the constructor type is required.

```ts
class User {
  constructor(public id: string) {}
}

type UserInstance = User;
type UserConstructor = typeof User;
```

### Type Module Boundaries

Use explicit exports for stable public APIs and type-only exports for type declarations.

```ts
export type User = {
  id: string;
  email: string;
};

export function createUser(email: string): User {
  return {
    id: crypto.randomUUID(),
    email,
  };
}
```

Consumer:

```ts
import { createUser, type User } from "./user";

const user: User = createUser("a@example.com");
```

| Boundary               | Recommendation                                           |
| ---------------------- | -------------------------------------------------------- |
| Library public API     | Explicit exported types                                  |
| Internal module helper | Inference acceptable                                     |
| Shared DTO             | Named exported type                                      |
| Runtime utility        | Value export                                             |
| Type-only helper       | `export type`                                            |
| Re-export barrel       | Separate `export` and `export type` when clarity matters |

**Why it works:** Type-only imports and exports prevent accidental runtime dependencies.

**Common pitfall:** TypeScript path aliases do not automatically make runtime paths work. The runtime, bundler, or loader must understand the same resolution scheme.

### Type Library APIs Without Losing Precision

Use generics and constraints to preserve relationships.

Poor API:

```ts
function groupBy(
  items: object[],
  key: string
): Record<string, object[]> {
  return {};
}
```

Better API:

```ts
function groupBy<T, K extends keyof T>(
  items: readonly T[],
  key: K
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const groupKey = String(item[key]);
    groups[groupKey] ??= [];
    groups[groupKey].push(item);
    return groups;
  }, {});
}

const users = [
  { id: "u1", role: "admin" },
  { id: "u2", role: "member" },
];

const byRole = groupBy(users, "role");
// Record<string, { id: string; role: string }[]>
```

More precise finite key grouping can be possible when the key value is a literal union:

```ts
function groupByFinite<
  T,
  K extends keyof T,
  V extends PropertyKey & T[K]
>(
  items: readonly T[],
  key: K
): Partial<Record<V, T[]>> {
  return items.reduce<Partial<Record<V, T[]>>>((groups, item) => {
    const groupKey = item[key] as V;
    groups[groupKey] ??= [];
    groups[groupKey]?.push(item);
    return groups;
  }, {});
}
```

**Why it works:** The key parameter is constrained to actual object keys, and return values preserve the item type.

**Common pitfall:** Library helpers often require a small internal assertion. Keep assertions inside the helper and expose a safe API.

### Type Immutable Inputs

Prefer readonly inputs when a function does not mutate data.

```ts
function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
```

Readonly object input:

```ts
type User = {
  id: string;
  email: string;
};

function serializeUser(user: Readonly<User>): string {
  return JSON.stringify(user);
}
```

Readonly array of objects is shallow:

```ts
type User = {
  id: string;
  profile: {
    name: string;
  };
};

function readUsers(users: readonly User[]) {
  users[0].profile.name = "Changed"; // Allowed
}
```

| Readonly pattern          | Use                                |
| ------------------------- | ---------------------------------- |
| `readonly T[]`            | Non-mutating array input           |
| `ReadonlyArray<T>`        | Generic readonly array style       |
| `readonly [A, B]`         | Non-mutating tuple                 |
| `Readonly<T>`             | Non-mutating top-level object view |
| Deep readonly custom type | Rare; immutable architecture       |

**Why it works:** Readonly types prevent mutation through the current reference and improve assignability safety.

**Common pitfall:** TypeScript readonly is compile-time only and usually shallow.

### Type Branded Identifiers

Use brands when structurally identical primitive types should not be mixed.

```ts
type Brand<T, Name extends string> = T & {
  readonly __brand: Name;
};

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function getUser(id: UserId) {
  return { id };
}

function makeUserId(value: string): UserId {
  if (!value.startsWith("user_")) {
    throw new Error("Invalid user id");
  }

  return value as UserId;
}

const userId = makeUserId("user_123");

getUser(userId);
```

| Need                                | Pattern                        |
| ----------------------------------- | ------------------------------ |
| Distinguish `UserId` from `OrderId` | Branded string                 |
| Distinguish cents from dollars      | Branded number                 |
| Mark validated data                 | Branded object after parser    |
| Runtime validation                  | Constructor or parser function |

**Why it works:** The brand makes the type structurally distinct at compile time.

**Common pitfall:** Brands are erased. The assertion must be isolated behind a runtime validation or construction function.

### Type Safe Lookup Tables

Use `satisfies` with `Record` for lookup tables.

```ts
type Status = "draft" | "sent" | "paid";

type StatusMetadata = {
  label: string;
  terminal: boolean;
};

const statusMetadata = {
  draft: {
    label: "Draft",
    terminal: false,
  },
  sent: {
    label: "Sent",
    terminal: false,
  },
  paid: {
    label: "Paid",
    terminal: true,
  },
} satisfies Record<Status, StatusMetadata>;

function getStatusLabel(status: Status) {
  return statusMetadata[status].label;
}
```

| Requirement               | Pattern                                  |
| ------------------------- | ---------------------------------------- |
| All statuses covered      | `satisfies Record<Status, Metadata>`     |
| No invalid metadata shape | Metadata contract                        |
| Preserve literal keys     | `satisfies` rather than broad annotation |
| Optional lookup table     | `Partial<Record<Status, Metadata>>`      |

**Why it works:** `Record<Status, Metadata>` requires every status key.

**Common pitfall:** If `Status` is `string`, the check becomes too broad. Keep finite domains as literal unions.

### Type Safe Reducers

Use discriminated unions for actions.

```ts
type CounterState = {
  count: number;
};

type CounterAction =
  | { type: "increment"; by: number }
  | { type: "decrement"; by: number }
  | { type: "reset" };

function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.by };
    case "decrement":
      return { count: state.count - action.by };
    case "reset":
      return { count: 0 };
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}
```

Action creator derivation:

```ts
const counterActions = {
  increment: (by: number) => ({ type: "increment" as const, by }),
  decrement: (by: number) => ({ type: "decrement" as const, by }),
  reset: () => ({ type: "reset" as const }),
};

type CounterAction = ReturnType<
  (typeof counterActions)[keyof typeof counterActions]
>;
```

**Why it works:** Each action has a literal `type` field; the reducer narrows by that field.

**Common pitfall:** Returning `{ type: "increment" }` without `as const` inside action creators may widen `type` to `string`.

### Type Safe API Client Methods

Use endpoint definitions to derive request and response types.

```ts
type Endpoint<Request, Response> = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  request: Request;
  response: Response;
};

type User = {
  id: string;
  email: string;
};

type CreateUserInput = {
  email: string;
};

const endpoints = {
  createUser: {
    method: "POST",
    path: "/users",
    request: {} as CreateUserInput,
    response: {} as User,
  },
  getUser: {
    method: "GET",
    path: "/users/:id",
    request: {} as { id: string },
    response: {} as User,
  },
} satisfies Record<string, Endpoint<unknown, unknown>>;
```

Helper types:

```ts
type EndpointName = keyof typeof endpoints;

type RequestOf<Name extends EndpointName> =
  (typeof endpoints)[Name]["request"];

type ResponseOf<Name extends EndpointName> =
  (typeof endpoints)[Name]["response"];

async function callEndpoint<Name extends EndpointName>(
  name: Name,
  request: RequestOf<Name>
): Promise<ResponseOf<Name>> {
  const endpoint = endpoints[name];

  throw new Error(`Implement ${endpoint.method} ${endpoint.path}`);
}
```

Usage:

```ts
const user = await callEndpoint("createUser", {
  email: "a@example.com",
});
```

**Why it works:** The endpoint name determines the request and response type through indexed access.

**Common pitfall:** Placeholder assertions like `{ } as User` are type-only. Real API clients still need runtime serialization and response validation.

### Task Pattern Decision Table

| Problem                        | Recommended pattern                                      | Avoid                                   |
| ------------------------------ | -------------------------------------------------------- | --------------------------------------- |
| Known object with fixed fields | `type` or `interface`                                    | `Record<string, unknown>`               |
| Arbitrary dynamic keys         | `Record<string, V>`                                      | Fake fixed object types                 |
| Known finite keys              | `Record<Union, V>`                                       | `Record<string, V>`                     |
| Fixed list of string values    | Literal union                                            | Plain `string`                          |
| Runtime list plus static union | `as const` plus `(typeof xs)[number]`                    | Duplicating array and union separately  |
| One of several shapes          | Discriminated union                                      | Bag of optional fields                  |
| Async request lifecycle        | `RequestState<T>` union                                  | `loading`, `data?`, `error?` together   |
| External data                  | `unknown` plus parser or guard                           | `as T` directly                         |
| Generic property access        | `K extends keyof T`, `T[K]`                              | `key: string`, return `unknown`         |
| API response envelope          | `ApiResponse<T>`                                         | Copying envelope for every model        |
| Update input                   | `Partial<Pick<T, K>>`                                    | `Partial<T>` if too broad               |
| Public DTO                     | `Omit<T, "secret">` plus runtime mapping                 | Returning internal object directly      |
| Config object                  | `satisfies Config` or `satisfies Record<string, Config>` | Broad annotation that loses keys        |
| Callback wrapper               | `Parameters<F>` and `ReturnType<F>`                      | `Function`                              |
| Exhaustive switch              | `never` check                                            | Broad `default` branch                  |
| Module type import             | `import type`                                            | Runtime import for type-only dependency |

### Common Pitfalls Across Task Patterns

| Pitfall                                       | Why it happens                      | Better pattern                               |
| --------------------------------------------- | ----------------------------------- | -------------------------------------------- |
| Treating `as` as validation                   | Assertions silence compiler errors  | Validate unknown data                        |
| Using `Record<string, T>` too often           | It feels flexible                   | Use fixed object types or finite-key records |
| Modeling states with booleans                 | Easy first draft                    | Use discriminated unions                     |
| Duplicating runtime constants and type unions | Manual synchronization              | Derive union from `as const` value           |
| Overusing `Partial<T>`                        | Convenient for updates              | Use `Partial<Pick<T, K>>`                    |
| Reusing database models as public DTOs        | Reduces declarations initially      | Separate internal and external models        |
| Making every helper generic                   | Looks reusable                      | Add generics only when relationships matter  |
| Ignoring runtime boundaries                   | Types feel authoritative            | Start external data as `unknown`             |
| Hiding missing DOM nodes with `!`             | Convenient                          | Runtime check and throw                      |
| Losing literal precision through annotations  | Broad target type widens expression | Use `satisfies` for config objects           |

### Minimal Task Patterns to Memorize

| Task                        | Pattern                                                               |
| --------------------------- | --------------------------------------------------------------------- |
| Fixed object shape          | `type User = { id: string; email: string }`                           |
| Finite literal union        | `type Role = "admin" \| "member"`                                     |
| Discriminated union         | `{ status: "success"; data: T } \| { status: "error"; error: Error }` |
| Type from value             | `type T = typeof value`                                               |
| Union from constant array   | `type T = (typeof values)[number]`                                    |
| Keys from object            | `type K = keyof typeof object`                                        |
| Property getter             | `<T, K extends keyof T>(obj: T, key: K): T[K]`                        |
| Generic wrapper             | `type Result<T, E = Error> = ...`                                     |
| Constrained generic         | `<T extends { id: string }>`                                          |
| Transform fields            | `Pick`, `Omit`, `Partial`, `Readonly`, `Record`                       |
| Trust boundary              | `unknown` plus guard or parser                                        |
| Exhaustiveness              | `const exhaustive: never = value`                                     |
| Config checking             | `const config = {...} satisfies Config`                               |
| Type-only module dependency | `import type { T } from "./x"`                                        |
## Part 5 — Project and Tooling Reference: `tsconfig`, Modules, Runtime Boundaries, Migration 

### Project-Level Mental Model

TypeScript’s practical safety depends heavily on project configuration. The same TypeScript code can be strict, loose, ESM-oriented, CommonJS-oriented, browser-oriented, Node-oriented, bundler-oriented, or framework-oriented depending on `tsconfig.json`, package metadata, runtime, and toolchain.

| Layer               | Controls                                   | Examples                               | Common pitfall                                                                                      |
| ------------------- | ------------------------------------------ | -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| TypeScript compiler | Type checking and optional JavaScript emit | `strict`, `target`, `module`, `lib`    | Assuming all TypeScript projects have the same safety level                                         |
| Runtime             | Executes emitted JavaScript                | Node.js, browser, worker, test runner  | Expecting TypeScript to change runtime behavior                                                     |
| Module system       | How imports and exports behave at runtime  | ESM, CommonJS, bundler modules         | Type-checking an import that runtime cannot resolve                                                 |
| Type libraries      | Ambient global types                       | DOM, Node, test runner globals         | Missing `document`, `process`, `describe`, or `expect` because environment types are not configured |
| Bundler/framework   | Transforms, resolves, and loads files      | Vite, Next.js, Webpack, SWC, Babel     | Treating framework conventions as TypeScript semantics                                              |
| Package metadata    | Runtime interpretation of files            | `"type": "module"`, `exports`, `types` | Ignoring `package.json` when debugging module behavior                                              |

**Design meaning:** TypeScript statically checks source code under a configured model of JavaScript, libraries, and modules. It does not by itself guarantee that the runtime loader, bundler, or deployment environment agrees with that model.

### Minimal `tsconfig.json` Shape

A typical application-oriented configuration looks like this:

```ts
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "useUnknownInCatchVariables": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

For a bundler-driven frontend application:

```ts
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

For a Node.js ESM project:

```ts
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "types": ["node"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

**Practical consequence:** A `tsconfig` should be designed for the actual runtime and build pipeline, not copied blindly.

### `tsconfig` Strictness Matrix

| Option                       | Meaning                                                                            | Recommended default                                        | Why it matters                                                    | Common pitfall                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `strict`                     | Enables the main strict type-checking family                                       | `true`                                                     | Establishes a safer baseline                                      | Believing TypeScript is strict when `strict` is off                              |
| `noImplicitAny`              | Reports parameters and declarations inferred as `any`                              | Usually via `strict: true`                                 | Prevents accidental untyped code                                  | Allowing implicit `any` to spread through APIs                                   |
| `strictNullChecks`           | Treats `null` and `undefined` as distinct values requiring handling                | Usually via `strict: true`                                 | Makes nullability explicit                                        | Turning it off makes `null` and `undefined` errors largely invisible             |
| `noUncheckedIndexedAccess`   | Adds `undefined` to indexed access results                                         | `true` for robust projects                                 | Models missing keys and array indexes accurately                  | Discovering `Record<string, T>` lookups may be absent only at runtime            |
| `exactOptionalPropertyTypes` | Distinguishes absent optional property from explicit `undefined` more precisely    | `true` for new strict projects                             | Clarifies optional-property semantics                             | Breaking older code that freely assigns `undefined` to optional fields           |
| `useUnknownInCatchVariables` | Types `catch` variables as `unknown` instead of `any`                              | Usually via `strict: true`; keep enabled                   | Reflects JavaScript reality that anything can be thrown           | Assuming caught values are always `Error`                                        |
| `noImplicitOverride`         | Requires `override` when overriding class members                                  | `true`                                                     | Catches accidental method shadowing and superclass API drift      | Forgetting it in inheritance-heavy codebases                                     |
| `module`                     | Controls emitted module format and module semantics                                | Runtime-dependent                                          | Must match Node, bundler, or framework expectations               | Using `CommonJS`, `ESNext`, or `NodeNext` without understanding runtime behavior |
| `moduleResolution`           | Controls how TypeScript resolves imports                                           | Match `module` and toolchain                               | Determines package `exports`, extension behavior, and path lookup | TypeScript resolves differently from the runtime or bundler                      |
| `target`                     | Controls JavaScript syntax level emitted by TypeScript                             | Modern target such as `ES2020` or later, runtime-dependent | Affects emitted syntax and available downlevel transforms         | Assuming `target` adds runtime polyfills                                         |
| `lib`                        | Declares built-in environment APIs available to the type checker                   | Runtime-dependent                                          | Adds types for `ES2022`, `DOM`, iterables, etc.                   | Including DOM types in non-browser code or omitting DOM types in browser code    |
| `types`                      | Limits included ambient type packages                                              | Explicit when needed                                       | Controls globals such as `node`, `jest`, `vitest`                 | Missing globals because the package is installed but not included                |
| `skipLibCheck`               | Skips type checking declaration files in dependencies                              | Often `true` in applications                               | Speeds builds and avoids dependency declaration conflicts         | Thinking it skips checking application code                                      |
| `isolatedModules`            | Ensures files can be transpiled independently                                      | `true` with Babel, SWC, esbuild, Vite, Next.js             | Prevents constructs unsafe for single-file transpilers            | Using `const enum` or namespace patterns incompatible with the build tool        |
| `verbatimModuleSyntax`       | Preserves import/export syntax more literally and requires clear type-only imports | `true` in modern projects                                  | Makes type/value import boundaries explicit                       | Forgetting `import type` for type-only imports                                   |
| `noEmit`                     | Type-checks without emitting JavaScript                                            | `true` when bundler emits                                  | Separates type checking from bundling                             | Expecting `tsc` to produce files when `noEmit` is enabled                        |
| `declaration`                | Emits `.d.ts` files                                                                | `true` for libraries                                       | Provides types to consumers                                       | Forgetting to emit declarations for published packages                           |
| `sourceMap`                  | Emits source maps                                                                  | Usually `true` for apps and libraries                      | Improves debugging                                                | Shipping source maps unintentionally if not desired                              |
| `outDir`                     | Output directory                                                                   | `dist` or build-specific                                   | Keeps emitted files separate                                      | Emitting JS beside TS unintentionally                                            |
| `rootDir`                    | Source root                                                                        | Usually `src`                                              | Stabilizes output layout                                          | Misconfigured paths causing unexpected `dist` structure                          |

**Practical rule:** A TypeScript project’s safety is not defined by “using TypeScript.” It is defined by TypeScript plus the project’s strictness configuration.

### High-Value Strict Options

Some strict options have especially large practical effects.

| Option                       | Problem it catches                                   | Example                                                           |
| ---------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------- |
| `strictNullChecks`           | Missing null/undefined handling                      | `document.querySelector("#app")` returns `Element \| null`        |
| `noUncheckedIndexedAccess`   | Missing dictionary or array entries                  | `map[key]` becomes `T \| undefined`                               |
| `exactOptionalPropertyTypes` | Confusion between missing and explicitly `undefined` | `{ x?: string }` is not identical to `{ x: string \| undefined }` |
| `useUnknownInCatchVariables` | Unsafe error handling                                | `catch (error)` requires narrowing                                |
| `noImplicitOverride`         | Accidental class API mismatch                        | Subclass method must declare `override`                           |

Example of `noUncheckedIndexedAccess`:

```ts
const usersById: Record<string, { email: string }> = {};

const user = usersById["missing"];

// With noUncheckedIndexedAccess:
// user is { email: string } | undefined

if (user) {
  user.email;
}
```

Example of `exactOptionalPropertyTypes`:

```ts
type Options = {
  timeoutMs?: number;
};

const a: Options = {};
const b: Options = { timeoutMs: 1000 };

// With exactOptionalPropertyTypes enabled:
// const c: Options = { timeoutMs: undefined }; // Usually not allowed
```

If explicit `undefined` is part of the intended model:

```ts
type Options = {
  timeoutMs?: number | undefined;
};
```

### `target`, `lib`, and Runtime Availability

`target` controls emitted JavaScript syntax. `lib` controls which built-in APIs TypeScript knows about. Neither one installs polyfills automatically.

| Concern                    | Controlled by               | Example                                                         | Common pitfall                                                     |
| -------------------------- | --------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| Syntax emitted by compiler | `target`                    | Class fields, async transforms, optional chaining transforms    | Assuming old runtimes support modern APIs because code type-checks |
| Built-in API types         | `lib`                       | `Promise`, `Map`, `Array.prototype.toSorted`, `document`        | Assuming `lib` adds runtime implementations                        |
| Runtime API availability   | Actual runtime or polyfills | Node version, browser version                                   | TypeScript accepts an API that the runtime lacks                   |
| DOM globals                | `lib: ["DOM"]`              | `document`, `HTMLElement`, `fetch` in browser-like environments | Adding DOM lib to Node code unintentionally                        |
| Node globals               | `types: ["node"]`           | `process`, `Buffer`, `__dirname` in CJS                         | Expecting Node globals without Node types                          |

Example:

```ts
const values = [3, 1, 2];

const sorted = values.toSorted();
```

This requires TypeScript library declarations that include `toSorted`, and a runtime that actually implements it or a polyfill.

**Practical rule:** `lib` tells TypeScript what APIs exist. Runtime or polyfills determine whether they actually exist during execution.

### Modules and Runtime Boundaries

TypeScript checks module syntax and resolves imports according to compiler options. Runtime resolution is performed by Node.js, the browser, a bundler, a test runner, or a framework.

| Module system       | Common context                          | TypeScript settings                                  | Runtime notes                                          |
| ------------------- | --------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------ |
| ESM                 | Modern browser, modern Node, bundlers   | `module: "ESNext"` or `NodeNext`                     | Uses `import` and `export`                             |
| CommonJS            | Older Node or legacy packages           | `module: "CommonJS"`                                 | Uses `require` and `module.exports`                    |
| Node ESM/CJS hybrid | Modern Node packages                    | `module: "NodeNext"`, `moduleResolution: "NodeNext"` | Respects `package.json` `"type"` and package `exports` |
| Bundler ESM         | Vite, Next.js, Webpack, Rollup, esbuild | `module: "ESNext"`, `moduleResolution: "Bundler"`    | Bundler resolves and emits final modules               |
| Type-only modules   | Any TS project                          | `import type`, `export type`                         | Removed from runtime output                            |

ESM import/export:

```ts
// user.ts
export type User = {
  id: string;
  email: string;
};

export function createUser(email: string): User {
  return {
    id: crypto.randomUUID(),
    email,
  };
}
```

```ts
// main.ts
import { createUser, type User } from "./user";

const user: User = createUser("a@example.com");
```

CommonJS interop depends on compiler settings, Node behavior, package shape, and bundler behavior. Do not assume all default imports from CommonJS packages behave identically across projects.

| Import form                    | Type/value behavior      | Notes                                                  |
| ------------------------------ | ------------------------ | ------------------------------------------------------ |
| `import { x } from "./m"`      | Runtime import           | Requires runtime export named `x`                      |
| `import x from "./m"`          | Runtime default import   | Default interop depends on module system and toolchain |
| `import * as m from "./m"`     | Runtime namespace import | Often safest for module object access                  |
| `import type { T } from "./m"` | Type-only import         | Erased from emitted JS                                 |
| `export type { T } from "./m"` | Type-only re-export      | No runtime re-export                                   |

**Critical boundary:** TypeScript resolving an import does not always mean the runtime can resolve it.

### `import type` and `export type`

Use type-only imports for declarations used only at compile time.

```ts
import type { User } from "./models/user";

export type { User };
```

Mixed import:

```ts
import { createUser, type User } from "./models/user";

const user: User = createUser("a@example.com");
```

| Situation                                | Use                         |
| ---------------------------------------- | --------------------------- |
| Importing interface or type alias        | `import type`               |
| Importing class only as an instance type | `import type` may be enough |
| Instantiating class                      | Runtime `import`            |
| Using enum value                         | Runtime `import`            |
| Using function or object                 | Runtime `import`            |
| Re-exporting DTOs                        | `export type`               |

Class caution:

```ts
import type { User } from "./user";

// const user = new User("u1"); // Error: type-only import cannot be used as value
```

If the class constructor is needed:

```ts
import { User } from "./user";

const user = new User("u1");
```

**Common pitfall:** Under modern module settings, unused imports and type-only imports can affect runtime output differently. `verbatimModuleSyntax` makes the boundary more explicit.

### Path Aliases and Runtime Resolution

TypeScript path aliases are configured through `baseUrl` and `paths`.

```ts
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/*"],
      "@domain/*": ["src/domain/*"]
    }
  }
}
```

Usage:

```ts
import { createUser } from "@domain/user";
```

| Layer                   |                                          Needs to understand alias? |
| ----------------------- | ------------------------------------------------------------------: |
| TypeScript type checker |                                                    Yes, via `paths` |
| Bundler                 |                                   Yes, via bundler config or plugin |
| Node.js runtime         | Yes, via loader, package imports, build rewrite, or avoided aliases |
| Test runner             |                                                Yes, via test config |
| IDE                     |                                            Usually reads `tsconfig` |

**Practical rule:** `paths` is not a universal runtime alias system. It helps TypeScript resolve imports. The runtime or bundler must also know how to resolve the same paths.

Common safer alternatives:

| Context                       | Safer approach                                            |
| ----------------------------- | --------------------------------------------------------- |
| Node package internal imports | Use package `imports` such as `#domain/*` where supported |
| Bundler app                   | Mirror aliases in bundler config                          |
| Library                       | Prefer relative imports or package exports                |
| Monorepo                      | Use workspaces and package-level imports                  |
| Tests                         | Configure test runner alias mapping                       |

### Runtime Import Extensions

In Node ESM-style projects, import specifiers may need file extensions in emitted JavaScript.

```ts
// source TypeScript in NodeNext projects may often use:
import { createUser } from "./user.js";
```

Even though the source file is `user.ts`, the import may point to the emitted JavaScript path `user.js`.

| Project type               | Import extension behavior                                      |
| -------------------------- | -------------------------------------------------------------- |
| Bundler projects           | Bundler often accepts extensionless imports                    |
| Node ESM with `NodeNext`   | Runtime-like extension rules matter                            |
| CommonJS TypeScript output | Extensionless often works through CommonJS resolution          |
| Published libraries        | Must be especially careful with emitted paths and declarations |

**Common pitfall:** Writing imports that type-check but fail after compilation because emitted JavaScript points to paths Node cannot load.

### Environment Type Libraries

TypeScript knows about global names through configured libraries and declaration packages.

| Environment       | Common globals                                      | Configuration source                                        |
| ----------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| Browser           | `window`, `document`, `HTMLElement`, `localStorage` | `lib: ["DOM"]`                                              |
| Modern JavaScript | `Promise`, `Map`, `Set`, `Array.prototype` methods  | `lib: ["ES2022"]`, etc.                                     |
| Node.js           | `process`, `Buffer`, `fs`, `path`                   | `@types/node` plus `types: ["node"]` or automatic inclusion |
| Test runner       | `describe`, `it`, `expect`, `vi`, `jest`            | `@types/jest`, Vitest globals, or runner-specific config    |
| Web worker        | `self`, worker APIs                                 | `lib: ["WebWorker"]`                                        |
| Framework         | JSX, route types, generated globals                 | Framework-specific type packages and generated files        |
| Custom global     | Build constants, injected globals                   | `.d.ts` declarations                                        |

Browser example:

```ts
const element = document.querySelector("#app");

if (element instanceof HTMLElement) {
  element.dataset.ready = "true";
}
```

Node example:

```ts
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL");
}
```

Custom global declaration:

```ts
// globals.d.ts
declare const __BUILD_VERSION__: string;
```

Usage:

```ts
console.log(__BUILD_VERSION__);
```

**Practical rule:** If TypeScript says a global name does not exist, check environment type configuration before blaming the language.

| Missing name          | Likely cause                             |
| --------------------- | ---------------------------------------- |
| `document`            | DOM lib not included                     |
| `process`             | Node types not installed or not included |
| `describe` / `it`     | Test runner types not configured         |
| `expect`              | Test assertion globals not configured    |
| `JSX`                 | Framework or JSX config missing          |
| Custom build constant | Missing `.d.ts` declaration              |

### DOM Types vs Node Types

Browser and Node environments overlap less than many codebases assume.

| API/global     |                    Browser |                     Node.js | Notes                          |
| -------------- | -------------------------: | --------------------------: | ------------------------------ |
| `document`     |                        Yes |                          No | Requires DOM runtime           |
| `window`       |                        Yes |                          No | Not available in ordinary Node |
| `process`      |                         No |                         Yes | Node-specific                  |
| `Buffer`       | No standard browser global |                         Yes | Bundlers may polyfill or not   |
| `fetch`        |     Yes in modern browsers | Yes in modern Node versions | Type source may vary           |
| `URL`          |                        Yes |                         Yes | Shared web platform API        |
| `localStorage` |                        Yes |                          No | Browser storage                |
| `fs`           |                         No |                         Yes | Node filesystem module         |

**Common pitfall:** Including both DOM and Node types can make code type-check while still not being valid in the actual runtime target.

Example: server-side code should not assume `document` exists just because DOM types are included.

### Runtime Validation Boundary

Data crossing a trust boundary should usually begin as `unknown`.

| Boundary               | Recommended TypeScript type                          | Validation strategy                                         | Pitfall                                                     |
| ---------------------- | ---------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `JSON.parse`           | `unknown`                                            | Parse then validate with guard or schema                    | `JSON.parse(raw) as T` does not validate                    |
| HTTP response          | `unknown`                                            | Validate response body before returning typed data          | Trusting API docs or generated types without runtime checks |
| `localStorage`         | `string \| null`, then parsed `unknown`              | Check null, parse, validate version/shape                   | Old stored data may not match current type                  |
| Environment variables  | `string \| undefined`                                | Required checks plus string-to-number/boolean/union parsing | Treating env vars as already typed                          |
| DOM query              | `Element \| null` or specific after check            | Null check and `instanceof` check                           | Using `!` and crashing when selector misses                 |
| Third-party JavaScript | `unknown`, narrow wrapper, or declaration type       | Adapter layer and runtime smoke tests                       | Incorrect `.d.ts` creates false confidence                  |
| Form input             | `FormDataEntryValue \| null` or `string` after check | Parse strings/files into domain values                      | Number/date inputs still arrive as strings                  |
| Database result        | Driver/ORM type or `unknown` at raw boundary         | Query mapper, schema validation, ORM model validation       | Assuming database rows match app DTOs exactly               |

Unsafe external data pattern:

```ts
type User = {
  id: string;
  email: string;
};

async function loadUser(url: string): Promise<User> {
  const response = await fetch(url);
  return response.json() as Promise<User>;
}
```

Safer boundary:

```ts
type User = {
  id: string;
  email: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    typeof value.id === "string" &&
    typeof value.email === "string"
  );
}

async function loadUser(url: string): Promise<User> {
  const response = await fetch(url);
  const data: unknown = await response.json();

  if (!isUser(data)) {
    throw new Error("Invalid user response");
  }

  return data;
}
```

**Rule:** Data crossing a trust boundary should usually begin as `unknown`.

### Runtime Validation Strategies

TypeScript does not include runtime validation. Use one of these strategies.

| Strategy                | Best use                            | Example                     | Tradeoff                                                             |
| ----------------------- | ----------------------------------- | --------------------------- | -------------------------------------------------------------------- |
| Manual type guard       | Small shapes, simple boundaries     | `isUser(value)`             | Can become verbose                                                   |
| Assertion function      | Required boundary that should throw | `assertUser(value)`         | Must be implemented correctly                                        |
| Schema library          | APIs, forms, configs, complex JSON  | Parser returns typed value  | Adds dependency and schema design                                    |
| Database/ORM validation | Persistence boundaries              | Model mapper                | Can still differ from public DTOs                                    |
| Framework validation    | Route handlers, forms               | Framework-specific parser   | May couple validation to framework                                   |
| Generated client        | Typed API clients                   | OpenAPI, GraphQL, RPC tools | Generated types still may not validate runtime unless decoder exists |

Manual assertion function:

```ts
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error("Expected User");
  }
}

const data: unknown = JSON.parse(raw);
assertUser(data);

data.email;
```

Parser style:

```ts
type Parser<T> = {
  parse(value: unknown): T;
};

function parseJsonWith<T>(raw: string, parser: Parser<T>): T {
  return parser.parse(JSON.parse(raw));
}
```

**Common pitfall:** A type annotation on a parser result is not the same as a parser.

```ts
const data: User = JSON.parse(raw);
```

This is only a static claim. It is not runtime validation.

### JavaScript Migration

TypeScript supports incremental migration. Avoid all-at-once rewrites unless the codebase is small and well-tested.

| Migration tool        | Meaning                                           | Use case                         | Pitfall                             |
| --------------------- | ------------------------------------------------- | -------------------------------- | ----------------------------------- |
| `allowJs`             | Includes `.js` files in the TS project            | Mixed JS/TS codebase             | JS may still be weakly checked      |
| `checkJs`             | Type-checks `.js` files using inference and JSDoc | Safer JS without renaming files  | Complex types can be awkward        |
| JSDoc types           | Adds type information in JS comments              | Gradual typing                   | Can become noisy for advanced types |
| `.d.ts` files         | Describe JS modules externally                    | Legacy libraries or globals      | Declarations can lie                |
| Rename `.js` to `.ts` | Converts implementation file                      | When file is ready for TS syntax | Can expose many latent errors       |
| `// @ts-check`        | Enables checking per JS file                      | Targeted migration               | Easy to apply inconsistently        |
| `// @ts-expect-error` | Documents expected error                          | Temporary migration escape       | Must be tracked and removed         |
| `// @ts-ignore`       | Silences next-line error                          | Last resort                      | Can hide fixed or changed errors    |

Incremental migration configuration:

```ts
// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

JSDoc example:

```ts
// user.js

/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} email
 */

/**
 * @param {string} email
 * @returns {User}
 */
export function createUser(email) {
  return {
    id: crypto.randomUUID(),
    email
  };
}
```

Declaration file for legacy JS:

```ts
// legacy-formatter.d.ts
declare module "legacy-formatter" {
  export function formatCurrency(value: number, currency: string): string;
}
```

**Migration strategy:**

| Step                                       | Action                                                | Goal                                 |
| ------------------------------------------ | ----------------------------------------------------- | ------------------------------------ |
| Establish project config                   | Add `tsconfig.json` with appropriate runtime settings | Make TypeScript aware of the project |
| Enable JS inclusion                        | Use `allowJs` if needed                               | Avoid all-at-once conversion         |
| Check JS gradually                         | Use `checkJs` or `// @ts-check`                       | Surface errors incrementally         |
| Add declarations                           | Type untyped modules or globals                       | Contain unsafe boundaries            |
| Convert leaf files first                   | Rename simple modules to `.ts`                        | Reduce dependency complexity         |
| Strengthen strictness                      | Enable stricter options progressively                 | Improve safety over time             |
| Replace `any` with `unknown` at boundaries | Force narrowing                                       | Prevent unsoundness spread           |
| Add runtime validation                     | Validate external inputs                              | Make types match runtime reality     |

**Common pitfall:** Migrating by adding `any` everywhere creates a TypeScript-shaped JavaScript codebase without much safety.

### Declaration Files

Declaration files describe runtime JavaScript to the TypeScript compiler.

| Declaration form           | Purpose                                       |
| -------------------------- | --------------------------------------------- |
| `declare module "x"`       | Describe an external module                   |
| `declare global`           | Add global names or augment global interfaces |
| `declare const X: T`       | Declare a global runtime constant             |
| `interface Window { ... }` | Add browser global properties                 |
| `.d.ts` emitted by library | Provide consumer-facing types                 |

Module declaration:

```ts
// types/legacy-lib.d.ts
declare module "legacy-lib" {
  export type LegacyUser = {
    id: string;
    email: string;
  };

  export function getUser(id: string): Promise<LegacyUser>;
}
```

Global augmentation:

```ts
// globals.d.ts
declare global {
  interface Window {
    analytics: {
      track(event: string, properties?: Record<string, unknown>): void;
    };
  }
}

export {};
```

Usage:

```ts
window.analytics.track("signup", {
  plan: "pro",
});
```

**Common pitfall:** Declaration files do not implement anything. They only tell TypeScript what is expected to exist at runtime.

### Library Authoring

For libraries, TypeScript configuration must support consumers.

| Library concern                          | Recommended practice                                          |
| ---------------------------------------- | ------------------------------------------------------------- |
| Emit declarations                        | Enable `declaration`                                          |
| Separate source and output               | Use `rootDir` and `outDir`                                    |
| Avoid leaking private types              | Export stable public types explicitly                         |
| Support ESM/CJS consumers                | Design package exports deliberately                           |
| Avoid runtime imports for types          | Use `import type`                                             |
| Test emitted package                     | Test from `dist` or packed package                            |
| Avoid unsafe `const enum` in public APIs | Prefer literal unions or regular objects                      |
| Keep public types readable               | Avoid exposing deeply complex conditional types unnecessarily |

Library-ish config:

```ts
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "declaration": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "verbatimModuleSyntax": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Public API example:

```ts
// src/index.ts
export type {
  CreateUserInput,
  User,
  UserRepository
} from "./user-types.js";

export {
  createUserService
} from "./user-service.js";
```

**Common pitfall:** A library can type-check internally but publish broken declarations or broken runtime import paths. Always test the emitted package shape.

### Compiler Commands

Install TypeScript as a development dependency:

```ts
// shell
npm install --save-dev typescript
```

Initialize a config:

```ts
// shell
npx tsc --init
```

Compile the project:

```ts
// shell
npx tsc
```

Type-check without emitting, if `noEmit` is not already configured:

```ts
// shell
npx tsc --noEmit
```

Watch mode:

```ts
// shell
npx tsc --watch
```

Compile a specific project config:

```ts
// shell
npx tsc --project tsconfig.build.json
```

Short form:

```ts
// shell
npx tsc -p tsconfig.build.json
```

Common package scripts:

```ts
// package.json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build": "tsc -p tsconfig.build.json",
    "dev:types": "tsc --watch --noEmit"
  }
}
```

**Important warning:** If files are passed directly to the compiler, project config behavior may differ from compiling the project.

```ts
// shell
npx tsc src/index.ts
```

This direct-file style can bypass or alter expected project-level behavior. Prefer project compilation:

```ts
// shell
npx tsc -p tsconfig.json
```

### `tsc` vs Transpilers vs Bundlers

TypeScript can type-check and emit JavaScript, but many modern stacks use faster transpilers or bundlers for emission.

| Tool              |                               Type-checks? |       Emits/bundles? | Common use                                     |
| ----------------- | -----------------------------------------: | -------------------: | ---------------------------------------------- |
| `tsc`             |                                        Yes | Yes, unless `noEmit` | Type checking, declaration emit, simple builds |
| Babel             |      No TypeScript type checking by itself |                  Yes | Syntax transform                               |
| SWC               |      No TypeScript type checking by itself |                  Yes | Fast transform                                 |
| esbuild           |      No TypeScript type checking by itself |                  Yes | Fast bundling/transpile                        |
| Vite              | Usually relies on esbuild for TS transpile |                  Yes | Frontend dev/build                             |
| Next.js           |                          Framework-managed |                  Yes | React framework builds                         |
| `ts-node` / `tsx` |               Runtime TS execution helpers |  Executes/transpiles | Development scripts                            |

**Practical rule:** If a tool transpiles TypeScript, it may not type-check TypeScript. Keep a separate `tsc --noEmit` typecheck step unless the framework already enforces it.

### `isolatedModules`

`isolatedModules` ensures each file can be safely transpiled independently. This matters for Babel, SWC, esbuild, Vite, Next.js, and similar tools.

| Issue             | Why `isolatedModules` matters                               |
| ----------------- | ----------------------------------------------------------- |
| Type-only exports | Single-file transpilers need to know what exists at runtime |
| `const enum`      | Requires cross-file inlining not always available           |
| Namespaces        | Some namespace patterns require TypeScript-specific emit    |
| Ambiguous imports | Type/value distinction must be explicit                     |

Example requiring explicit type-only export:

```ts
type User = {
  id: string;
};

export type { User };
```

**Common pitfall:** Code that compiles under full `tsc` may not be safe under single-file transpilation. `isolatedModules` catches many such issues earlier.

### `verbatimModuleSyntax`

`verbatimModuleSyntax` makes import/export behavior more explicit by preserving module syntax more directly and requiring developers to distinguish type imports from value imports.

```ts
import { createUser, type User } from "./user";

const user: User = createUser("a@example.com");
```

Type-only import:

```ts
import type { User } from "./user";
```

| Benefit                                     | Practical consequence                   |
| ------------------------------------------- | --------------------------------------- |
| Clear type/value boundary                   | Fewer accidental runtime imports        |
| More predictable emit                       | Import syntax stays closer to source    |
| Better compatibility with modern toolchains | Works well with `isolatedModules`       |
| Forces explicitness                         | Some older import patterns need changes |

**Common pitfall:** Forgetting that interfaces and type aliases are not runtime values. With stricter module syntax, this confusion appears earlier.

### `skipLibCheck`

`skipLibCheck` skips type checking declaration files, usually in dependencies.

| Setting               | Effect                                                |
| --------------------- | ----------------------------------------------------- |
| `skipLibCheck: true`  | Faster builds; fewer dependency declaration conflicts |
| `skipLibCheck: false` | More thorough checking of declaration files           |

**Practical use:** Many application projects use `skipLibCheck: true` because dependency declaration conflicts are common and often outside the app’s control.

**Common pitfall:** `skipLibCheck` does not skip checking your `.ts` source files. It also does not make incorrect library declarations correct at runtime.

### Monorepos and Project References

Large codebases often split TypeScript into multiple projects.

| Feature       | Purpose                                           |
| ------------- | ------------------------------------------------- |
| `composite`   | Enables project references and incremental builds |
| `references`  | Declares dependencies between TS projects         |
| `declaration` | Required for referenced projects                  |
| `incremental` | Stores build information for faster rebuilds      |
| `tsc -b`      | Builds project references                         |

Example root config:

```ts
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./packages/domain" },
    { "path": "./packages/api" },
    { "path": "./packages/web" }
  ]
}
```

Package config:

```ts
// packages/domain/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  },
  "include": ["src"]
}
```

Build:

```ts
// shell
npx tsc -b
```

**Common pitfall:** Monorepo path aliases can hide package boundary problems. Test package imports the way consumers will use them.

### Source Files, Declaration Files, and Emitted Files

| File kind | Purpose                                         |                            Runtime? |
| --------- | ----------------------------------------------- | ----------------------------------: |
| `.ts`     | TypeScript source without JSX                   | No direct runtime unless transpiled |
| `.tsx`    | TypeScript source with JSX                      | No direct runtime unless transpiled |
| `.js`     | JavaScript runtime/source file                  |                                 Yes |
| `.jsx`    | JavaScript with JSX                             |                     Needs transform |
| `.d.ts`   | Type declarations only                          |                                  No |
| `.mts`    | TypeScript file intended for ESM semantics      |                          After emit |
| `.cts`    | TypeScript file intended for CommonJS semantics |                          After emit |
| `.mjs`    | JavaScript ESM                                  |                                 Yes |
| `.cjs`    | JavaScript CommonJS                             |                                 Yes |

**Common pitfall:** `.d.ts` files do not contain implementation. They cannot fix missing runtime code.

### Framework and Bundler Conventions

Frameworks often add TypeScript behavior through generated types, plugins, route conventions, JSX settings, and environment declarations.

| Convention          | TypeScript boundary                              |
| ------------------- | ------------------------------------------------ |
| Next.js route types | Framework-generated or framework-provided types  |
| Vite env variables  | `vite/client` declarations and `import.meta.env` |
| React JSX           | `jsx` compiler option and React types            |
| Vue/Svelte files    | Framework compiler and language server plugins   |
| Test globals        | Test runner type configuration                   |
| CSS modules         | Declaration files or framework support           |
| Asset imports       | Declaration files or bundler-specific typing     |

Vite-style environment declaration example:

```ts
/// <reference types="vite/client" />
```

Custom asset declaration:

```ts
declare module "*.svg" {
  const src: string;
  export default src;
}
```

**Practical rule:** Tooling conventions are not language semantics. When behavior depends on a framework or bundler, state and configure that boundary explicitly.

### Common Project-Level Mistakes

| Mistake                                       | Why it happens                      | Safer mental model                            | Better pattern                              |
| --------------------------------------------- | ----------------------------------- | --------------------------------------------- | ------------------------------------------- |
| Assuming TypeScript validates runtime data    | Types look authoritative            | Types are erased                              | Validate trust boundaries                   |
| Believing `target` polyfills APIs             | `target` feels like runtime version | `target` controls emitted syntax              | Add polyfills or use supported APIs         |
| Ignoring `lib`                                | Globals appear magical              | `lib` declares ambient APIs                   | Configure runtime-specific libs             |
| Using DOM types in server code accidentally   | Broad shared config                 | Type availability is not runtime availability | Split configs by environment                |
| Using path aliases only in `tsconfig`         | IDE resolves them                   | Runtime also needs resolution                 | Configure bundler/test/runtime aliases      |
| Mixing ESM and CJS casually                   | Both can type-check                 | Runtime semantics differ                      | Choose module strategy deliberately         |
| Importing types as values                     | Type/value confusion                | Types are erased                              | Use `import type`                           |
| Using `const enum` in incompatible toolchains | Works in some `tsc` builds          | Requires careful inlining support             | Prefer literal unions or `as const` objects |
| Running transpiler without typecheck          | Fast tools feel complete            | Transpile is not type checking                | Add `tsc --noEmit`                          |
| Passing direct files to `tsc`                 | Quick command                       | Project config may differ                     | Use `tsc -p`                                |
| Publishing untested declarations              | Build succeeded                     | Consumer surface may differ                   | Test package output                         |
| Overusing `skipLibCheck` as diagnosis         | It hides dependency errors          | It is a build pragmatism option               | Fix app types separately                    |

### Practical Project Defaults

For a modern strict application, good defaults are:

| Concern                 | Default                                              |
| ----------------------- | ---------------------------------------------------- |
| Strictness              | `strict: true`                                       |
| Null safety             | Keep `strictNullChecks` enabled                      |
| Indexed access          | Enable `noUncheckedIndexedAccess`                    |
| Optional properties     | Enable `exactOptionalPropertyTypes` for new projects |
| Catch variables         | Keep `useUnknownInCatchVariables` enabled            |
| Overrides               | Enable `noImplicitOverride`                          |
| Type-only imports       | Enable `verbatimModuleSyntax` where feasible         |
| Single-file transpilers | Enable `isolatedModules`                             |
| Build separation        | Use `noEmit` when bundler emits                      |
| Runtime boundary        | Validate external data                               |
| Module strategy         | Match runtime or bundler deliberately                |

For a migration project, a more staged approach may be necessary:

| Stage                | Configuration posture                             |
| -------------------- | ------------------------------------------------- |
| Initial JS inclusion | `allowJs: true`                                   |
| JS checking          | `checkJs: true` selectively or globally           |
| Baseline TS          | `strict: false` may be temporary                  |
| Safety hardening     | Enable strict flags progressively                 |
| Boundary cleanup     | Replace broad `any` with `unknown` and validators |
| Final posture        | `strict: true` with selected high-value flags     |

### Project Configuration Checklist

| Question                                                                   | Check                                                                         |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Is this code executed by Node, browser, worker, test runner, or framework? | Configure `lib`, `types`, `module`, and runtime accordingly                   |
| Is JavaScript emitted by `tsc` or a bundler?                               | Set `noEmit`, `outDir`, and build scripts correctly                           |
| Is the module system ESM, CJS, or hybrid?                                  | Choose `module` and `moduleResolution` deliberately                           |
| Are path aliases used?                                                     | Configure TypeScript, bundler, tests, and runtime                             |
| Are globals missing?                                                       | Check `lib`, `types`, and declaration files                                   |
| Is external data trusted too early?                                        | Start as `unknown` and validate                                               |
| Are declaration files needed?                                              | Add `.d.ts` for globals or untyped modules                                    |
| Is this a library?                                                         | Emit declarations and test published output                                   |
| Is a fast transpiler used?                                                 | Add separate `tsc --noEmit`                                                   |
| Are strictness flags meaningful?                                           | Confirm `strict`, nullability, indexed access, and optional-property behavior |
## Part 6 — Common Mistakes and Sharp Edges: Unsoundness, `any`, Assertions, Runtime Confusion 

### Sharp-Edges Frame

TypeScript’s most common mistakes come from confusing four different layers:

| Layer              | What it controls                       |         Exists at runtime? | Example                                             |
| ------------------ | -------------------------------------- | -------------------------: | --------------------------------------------------- |
| Type-level model   | Static declarations and inferred types |                         No | `type User = { id: string }`                        |
| Compiler behavior  | Checking, diagnostics, emit choices    | Partly, through emitted JS | `strictNullChecks`, `target`, `module`              |
| JavaScript runtime | Actual execution semantics             |                        Yes | `JSON.parse`, `instanceof`, `Array.isArray`         |
| Tooling convention | Bundler/framework/test behavior        |       Yes, through tooling | Vite aliases, Next.js generated types, Jest globals |

**Core rule:** TypeScript improves authoring-time correctness. Runtime correctness still depends on JavaScript code, runtime validation, tests, infrastructure, and environment configuration.

### Common Mistakes and Better Patterns

| Mistake                                                 | Why it happens                                          | Safer mental model                                                                               | Better pattern                                                                          |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Value level vs type level confusion                     | Type names look like runtime names                      | Types are erased unless tied to value-emitting constructs                                        | Use `class` or runtime validators for runtime checks                                    |
| Assertion treated as runtime conversion                 | `as T` looks like casting in nominal languages          | Assertion changes the compiler’s view only                                                       | Validate, parse, or transform at runtime                                                |
| Overusing `any`                                         | It quickly unblocks errors                              | `any` disables useful checking and spreads unsoundness                                           | Use `unknown` at boundaries and narrow                                                  |
| Using `unknown` incorrectly                             | It feels inconvenient after `any`                       | `unknown` is a safe placeholder before proof                                                     | Add guards, parsers, or assertions after checks                                         |
| Trusting external data because it has a TypeScript type | API clients and DTOs look authoritative                 | External data is runtime data, not type-checked data                                             | Begin as `unknown`, then validate                                                       |
| Confusing `type` and `interface`                        | Both model object shapes                                | Both are erased; their differences are mostly type-system ergonomics                             | Use `interface` for extendable object contracts; `type` for unions and type computation |
| Misunderstanding structural typing                      | Names feel like nominal identities                      | Compatibility is based on shape                                                                  | Use brands when distinct identities matter                                              |
| Excess property checks surprise                         | Fresh literals are checked more strictly than variables | Excess property checks are targeted typo detection, not exact object types                       | Use annotations or `satisfies` deliberately                                             |
| Optional property vs `undefined`                        | Both involve missing-ish values                         | Absent property and present `undefined` can differ, especially with `exactOptionalPropertyTypes` | Model absence intentionally                                                             |
| Non-null assertion abuse                                | `!` is a fast way to silence errors                     | `!` does not check at runtime                                                                    | Check, throw, return early, or redesign                                                 |
| Enum vs `as const` object confusion                     | Both can represent finite values                        | Regular enums emit runtime objects; literal unions and `as const` objects are often lighter      | Prefer literal unions or `as const` objects unless enum runtime behavior is needed      |
| `Record<string, T>` overuse                             | It feels flexible                                       | Broad string dictionaries often hide missing-key bugs                                            | Use fixed object shapes or `Record<FiniteUnion, T>`                                     |
| Overload overuse                                        | Overloads look precise                                  | Overloads add maintenance cost and can complicate inference                                      | Prefer unions when return type does not vary meaningfully                               |
| Conditional, mapped, template type overengineering      | Type-level tools are powerful                           | Complex types are API surface and maintenance burden                                             | Use derived types only when they remove real duplication                                |
| Module resolution mismatch                              | IDE type-checks imports successfully                    | TypeScript resolution and runtime resolution may differ                                          | Align `module`, `moduleResolution`, bundler, test runner, and Node settings             |
| Believing TypeScript guarantees runtime correctness     | Static types feel like proof                            | Types are erased and can be unsound                                                              | Combine types with validation, tests, and runtime checks                                |
| Assuming tooling conventions are language semantics     | Frameworks hide configuration                           | Framework behavior is not TypeScript itself                                                      | Identify whether behavior comes from TS, runtime, bundler, or framework                 |

### Value Level vs Type Level Confusion

A `type` or `interface` cannot be used as a runtime value.

Incorrect:

```ts
interface User {
  id: string;
}

// if (value instanceof User) {
//   // Error: User is not a runtime value
// }
```

Correct with a runtime guard:

```ts
interface User {
  id: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string"
  );
}

if (isUser(value)) {
  value.id;
}
```

Correct with a class when runtime identity matters:

```ts
class User {
  constructor(public readonly id: string) {}
}

const value: unknown = new User("u1");

if (value instanceof User) {
  value.id;
}
```

| Need                     | Use                                      |
| ------------------------ | ---------------------------------------- |
| Static object contract   | `type` or `interface`                    |
| Runtime identity check   | `class` and `instanceof`                 |
| Runtime shape validation | Type guard or schema parser              |
| Finite runtime values    | Literal array/object, enum, or constants |

**Sharp edge:** A class creates both a runtime constructor value and an instance type. An interface creates only a type-level declaration.

### Assertion Treated as Runtime Conversion

A type assertion does not convert data.

Incorrect:

```ts
type User = {
  id: string;
};

const user = JSON.parse(raw) as User;

user.id.toUpperCase();
```

If `raw` is `{ "id": 123 }`, the assertion does not convert `123` to a string. The program can still fail.

Better:

```ts
type User = {
  id: string;
};

function parseUser(value: unknown): User {
  if (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string"
  ) {
    return value;
  }

  throw new Error("Invalid user");
}

const user = parseUser(JSON.parse(raw));
```

| Tool                 | Runtime validation? | Runtime conversion? | Static effect                                   |
| -------------------- | ------------------: | ------------------: | ----------------------------------------------- |
| `value as T`         |                  No |                  No | Overrides compiler view                         |
| `const x: T = value` |                  No |                  No | Checks assignment compatibility                 |
| `value satisfies T`  |                  No |                  No | Checks compatibility while preserving inference |
| Parser function      | Yes, if implemented | Yes, if implemented | Returns validated or transformed value          |
| Type guard           | Yes, if implemented |          Usually no | Narrows type after check                        |

**Sharp edge:** Assertion is sometimes necessary at API boundaries the compiler cannot understand, but it should be isolated and justified.

### Overusing `any`

`any` disables type checking for a value and allows unsound operations.

```ts
function handle(value: any) {
  value.missing.deep.property();
  value();
  value.toFixed().notReal();
}
```

All of these can type-check, even if they fail at runtime.

Prefer `unknown` for untrusted data:

```ts
function handle(value: unknown) {
  if (typeof value === "function") {
    value();
  }

  if (typeof value === "number") {
    value.toFixed();
  }
}
```

| Situation                        |           Use `any`? | Better default                      |
| -------------------------------- | -------------------: | ----------------------------------- |
| External JSON                    |                   No | `unknown`                           |
| Catch variable                   |                   No | `unknown`                           |
| Legacy library wrapper internals |            Sometimes | Isolated `any` inside adapter       |
| Generic function parameter       |               Rarely | Type parameter `T`                  |
| Function utility constraint      | Sometimes acceptable | `F extends (...args: any[]) => any` |
| Public API type                  |                Avoid | Precise type or `unknown`           |

Acceptable localized use:

```ts
function withLogging<F extends (...args: any[]) => any>(fn: F) {
  return (...args: Parameters<F>): ReturnType<F> => {
    console.log("calling");
    return fn(...args);
  };
}
```

Here `any` is used in a generic constraint to describe arbitrary callable shapes. The public behavior still preserves `Parameters<F>` and `ReturnType<F>`.

**Sharp edge:** The problem is not every occurrence of `any`; the problem is uncontained `any` flowing into application logic.

### Using `unknown` Incorrectly

`unknown` means the value can be anything, so it cannot be used until narrowed.

Incorrect:

```ts
function parse(value: unknown) {
  // return value.id; // Error
}
```

Correct:

```ts
function parse(value: unknown) {
  if (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string"
  ) {
    return value.id;
  }

  throw new Error("Missing id");
}
```

| Operation on `unknown`  | Allowed? | Required first              |
| ----------------------- | -------: | --------------------------- |
| Assign any value to it  |      Yes | Nothing                     |
| Read property           |       No | Object and property check   |
| Call it                 |       No | Function check              |
| Construct it            |       No | Constructor check           |
| Use as string           |       No | `typeof value === "string"` |
| Use as array            |       No | `Array.isArray(value)`      |
| Return as specific type |       No | Validation or assertion     |

**Sharp edge:** `unknown` is not a nuisance type. It marks a proof obligation.

### Trusting External Data Because It Has a Type

Generated API types, handwritten DTOs, and OpenAPI/GraphQL types describe expected shapes. They do not guarantee the runtime response actually matches.

Unsafe:

```ts
type ApiUser = {
  id: string;
  email: string;
};

async function getUser(): Promise<ApiUser> {
  const response = await fetch("/api/user");
  return response.json() as Promise<ApiUser>;
}
```

Safer:

```ts
async function getUser(): Promise<ApiUser> {
  const response = await fetch("/api/user");
  const data: unknown = await response.json();

  if (!isApiUser(data)) {
    throw new Error("Invalid API user");
  }

  return data;
}
```

| Boundary        | Unsafe assumption                     | Safer approach            |
| --------------- | ------------------------------------- | ------------------------- |
| HTTP API        | Response matches DTO                  | Validate response         |
| `JSON.parse`    | JSON matches expected type            | Parse to `unknown`        |
| `localStorage`  | Stored data is current and valid      | Version and validate      |
| Env vars        | Variables exist and have correct type | Parse config on startup   |
| Form input      | Input type determines JS value type   | Parse string values       |
| Database result | Row equals public model               | Map and validate boundary |

**Sharp edge:** Type correctness inside the program starts after boundary data has been validated or otherwise trusted by a deliberate adapter.

### Confusing `type` and `interface`

Both can describe object shapes:

```ts
type UserType = {
  id: string;
};

interface UserInterface {
  id: string;
}
```

Their differences matter most in API design and type-level computation.

| Need                       | Prefer      | Reason                                          |
| -------------------------- | ----------- | ----------------------------------------------- |
| Extendable object contract | `interface` | Supports declaration merging and contract style |
| Library augmentation       | `interface` | Can be reopened                                 |
| Union type                 | `type`      | Interfaces cannot directly be unions            |
| Tuple type                 | `type`      | Tuple syntax belongs to type aliases            |
| Mapped type                | `type`      | Required for mapped transformations             |
| Conditional type           | `type`      | Required for conditional logic                  |
| Primitive alias            | `type`      | Interfaces cannot alias primitives              |
| Application DTO            | Either      | Consistency is more important                   |

Declaration merging:

```ts
interface AppConfig {
  apiUrl: string;
}

interface AppConfig {
  retries: number;
}

const config: AppConfig = {
  apiUrl: "/api",
  retries: 3,
};
```

This is not possible with `type`.

**Sharp edge:** Neither `type` nor `interface` exists at runtime.

### Misunderstanding Structural Typing

TypeScript is structurally typed. Names do not create nominal identity.

```ts
type UserId = string;
type OrderId = string;

function getUser(id: UserId) {
  return id;
}

const orderId: OrderId = "order_1";

getUser(orderId); // Allowed
```

If distinct identity matters, use a brand:

```ts
type Brand<T, Name extends string> = T & {
  readonly __brand: Name;
};

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function getUser(id: UserId) {
  return id;
}

function makeUserId(value: string): UserId {
  if (!value.startsWith("user_")) {
    throw new Error("Invalid user id");
  }

  return value as UserId;
}
```

| Model                  | Meaning                                    |
| ---------------------- | ------------------------------------------ |
| `type UserId = string` | Alias only; still assignable like `string` |
| Branded string         | Static distinction between string-like IDs |
| Class                  | Runtime identity and constructor           |
| Runtime parser         | Actual validation or conversion            |

**Sharp edge:** Brands are erased. They must be introduced through controlled constructors or validators.

### Excess Property Checks Surprise

Fresh object literals receive excess property checks.

```ts
type UserInput = {
  email: string;
  role: "admin" | "member";
};

function createUser(input: UserInput) {
  return input;
}

createUser({
  email: "a@example.com",
  role: "member",
  // roel: "admin", // Error: likely typo
});
```

Intermediate variables behave structurally:

```ts
const input = {
  email: "a@example.com",
  role: "member",
  extra: true,
};

createUser(input);
```

This may still fail if `role` widened to `string`. The failure is not necessarily caused by `extra`.

Better:

```ts
const input = {
  email: "a@example.com",
  role: "member",
  extra: true,
} satisfies UserInput & { extra: boolean };

createUser(input);
```

| Scenario                             | Behavior                                     |
| ------------------------------------ | -------------------------------------------- |
| Fresh object literal passed directly | Excess properties checked                    |
| Object assigned to variable first    | Structural compatibility check               |
| Annotated variable                   | Checked against annotation                   |
| `satisfies`                          | Checks compatibility and preserves inference |
| Assertion                            | Can silence useful errors                    |

**Sharp edge:** Excess property checks are not exact object types. They are a targeted check for fresh literals.

### Optional Property vs `undefined`

These two types express different models:

```ts
type A = {
  timeoutMs?: number;
};

type B = {
  timeoutMs: number | undefined;
};
```

| Form                              | Property may be absent? | Property must exist? |                           Value may be `undefined`? | Meaning                                |
| --------------------------------- | ----------------------: | -------------------: | --------------------------------------------------: | -------------------------------------- |
| `timeoutMs?: number`              |                     Yes |                   No | Config-dependent under `exactOptionalPropertyTypes` | Option may be omitted                  |
| `timeoutMs: number \| undefined`  |                      No |                  Yes |                                                 Yes | Property exists but value may be empty |
| `timeoutMs: number \| null`       |                      No |                  Yes |                                                  No | Explicit null means absence            |
| `timeoutMs?: number \| undefined` |                     Yes |                   No |                                                 Yes | Omitted or explicitly undefined        |

Defaulting:

```ts
function connect(options: { timeoutMs?: number }) {
  const timeoutMs = options.timeoutMs ?? 5000;
  return timeoutMs;
}
```

**Sharp edge:** `exactOptionalPropertyTypes` makes optional-property modeling more precise. Codebases without it may blur absence and explicit `undefined`.

### Non-Null Assertion Abuse

The non-null assertion operator `!` removes `null` and `undefined` from the compiler’s view. It does not check at runtime.

Unsafe:

```ts
const root = document.querySelector("#root")!;

root.textContent = "Loaded";
```

Safer:

```ts
const root = document.querySelector("#root");

if (!root) {
  throw new Error("Missing #root element");
}

root.textContent = "Loaded";
```

| Use of `!`                        | Risk                            | Better pattern                        |
| --------------------------------- | ------------------------------- | ------------------------------------- |
| DOM query                         | Selector may not match          | Check and throw                       |
| Array lookup                      | Index may be missing            | Check result                          |
| Map lookup                        | Key may not exist               | Check `undefined`                     |
| Optional property                 | Data may be absent              | Narrow or redesign                    |
| React refs or framework lifecycle | Timing assumptions may be wrong | Guard by lifecycle or invariant check |

Non-null assertion may be acceptable when there is a strong invariant:

```ts
const cached = cache.get(key);

if (cached === undefined) {
  throw new Error("Cache invariant violated");
}

return cached;
```

In many cases, an explicit invariant check is better than `!` because it fails with a useful error.

### Enum vs Literal Union vs `as const` Object

TypeScript has several ways to model finite values.

```ts
enum StatusEnum {
  Draft = "draft",
  Sent = "sent",
  Paid = "paid",
}

type StatusUnion = "draft" | "sent" | "paid";

const StatusObject = {
  Draft: "draft",
  Sent: "sent",
  Paid: "paid",
} as const;

type StatusFromObject =
  (typeof StatusObject)[keyof typeof StatusObject];
```

| Pattern           | Runtime object? | Type shape              | Best use                               | Pitfall                                                 |
| ----------------- | --------------: | ----------------------- | -------------------------------------- | ------------------------------------------------------- |
| Regular `enum`    |             Yes | Enum type               | When runtime enum object is desired    | Emits JS and has enum-specific semantics                |
| `const enum`      | Usually inlined | Enum type               | Controlled `tsc`-only projects         | Toolchain portability problems                          |
| Literal union     |              No | Union of exact values   | Most domain states and API values      | No runtime list by itself                               |
| `as const` object |             Yes | Derivable union         | Runtime constants plus type derivation | `as const` is compile-time readonly, not runtime freeze |
| `as const` array  |             Yes | Derivable element union | Runtime iteration plus static union    | `includes` guards may require local assertion           |

Practical modern pattern:

```ts
const statuses = ["draft", "sent", "paid"] as const;

type Status = (typeof statuses)[number];

function isStatus(value: string): value is Status {
  return statuses.includes(value as Status);
}
```

Object constant pattern:

```ts
const Status = {
  Draft: "draft",
  Sent: "sent",
  Paid: "paid",
} as const;

type Status = (typeof Status)[keyof typeof Status];
```

**Sharp edge:** Regular enums have runtime output. Literal unions do not. Choose based on whether a runtime object is needed.

### `Record<string, T>` Overuse

`Record<string, T>` means any string key maps to `T`.

```ts
type UsersById = Record<string, User>;
```

This can be too optimistic:

```ts
const usersById: UsersById = {};

const user = usersById["missing"];
```

The runtime value is `undefined`. With `noUncheckedIndexedAccess`, TypeScript reflects this more accurately.

Safer explicit absence:

```ts
type UsersById = Record<string, User | undefined>;

const user = usersById["missing"];

if (user) {
  user.email;
}
```

Finite keys:

```ts
type Locale = "en" | "fr" | "ja";

const labels: Record<Locale, string> = {
  en: "Settings",
  fr: "Paramètres",
  ja: "設定",
};
```

| Data shape                   | Better type                                          |
| ---------------------------- | ---------------------------------------------------- |
| Known object fields          | Object type                                          |
| Known finite keys            | `Record<Union, T>`                                   |
| Unknown dynamic keys         | `Record<string, T \| undefined>` or `Map<string, T>` |
| Sparse dictionary            | `Partial<Record<K, T>>`                              |
| Runtime key-value collection | `Map<K, V>` when object keys are not natural         |

**Sharp edge:** Broad dictionaries hide misspellings and missing-key problems. Use them only for genuinely dynamic maps.

### Overload Overuse

Overloads are useful when different input forms produce different output types.

Appropriate overload:

```ts
function select(selector: string): Element | null;
function select(selector: string, all: true): NodeListOf<Element>;
function select(selector: string, all?: true) {
  return all
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
}
```

Unnecessary overload:

```ts
function normalize(value: string): string[];
function normalize(value: string[]): string[];
function normalize(value: string | string[]) {
  return Array.isArray(value) ? value : [value];
}
```

Better:

```ts
function normalize(value: string | string[]): string[] {
  return Array.isArray(value) ? value : [value];
}
```

| Situation                                    | Prefer                           |
| -------------------------------------------- | -------------------------------- |
| Same return type for all inputs              | Union parameter                  |
| Return type varies by input literal or shape | Overload or generic conditional  |
| Many correlated input/output cases           | Overloads, carefully             |
| Public library API with known call patterns  | Overloads may improve UX         |
| Internal helper                              | Union or generic usually simpler |

**Sharp edge:** Overloads create multiple public call signatures but one implementation. The implementation must handle all overload cases.

### Conditional, Mapped, and Template Type Overengineering

Powerful type-level programming can make APIs hard to read.

Overengineered:

```ts
type DeepMagic<T> = T extends object
  ? {
      [K in keyof T as K extends string
        ? `get${Capitalize<K>}`
        : never]: () => DeepMagic<T[K]>;
    }
  : T;
```

Sometimes explicit is better:

```ts
type UserGetters = {
  getId(): string;
  getEmail(): string;
};
```

| Type-level tool       | Good use                                 | Overuse signal                              |
| --------------------- | ---------------------------------------- | ------------------------------------------- |
| Mapped type           | Mechanical object transformation         | Readers cannot predict output               |
| Conditional type      | Extract or transform based on type shape | Debugging requires multiple helper aliases  |
| Template literal type | Real naming convention                   | Clever string generation with little payoff |
| Recursive type        | JSON-like or tree-like model             | Compiler slowdowns or unreadable errors     |
| Generic utility       | Repeated relationship                    | Used once and harder than explicit type     |

**Sharp edge:** Type-level abstractions are part of the codebase’s maintenance surface. Optimize for reader understanding.

### Module Resolution Mismatch

An import can type-check but fail at runtime.

```ts
import { createUser } from "@domain/user";
```

This works only if every relevant layer understands `@domain/user`.

| Layer        |                             Needs configuration? |
| ------------ | -----------------------------------------------: |
| TypeScript   |               Yes, `paths` or package resolution |
| Bundler      |                      Yes, alias config or plugin |
| Test runner  |                               Yes, alias mapping |
| Node runtime | Yes, loader, package imports, or rewritten paths |
| IDE          |                  Usually reads TypeScript config |

Runtime extension issue in Node ESM:

```ts
// Source file may need to reference emitted JS extension:
import { createUser } from "./user.js";
```

| Project context  | Common module setting                                |
| ---------------- | ---------------------------------------------------- |
| Node ESM         | `module: "NodeNext"`, `moduleResolution: "NodeNext"` |
| Bundler frontend | `module: "ESNext"`, `moduleResolution: "Bundler"`    |
| Legacy Node CJS  | `module: "CommonJS"`                                 |
| Library          | Must match published package strategy                |

**Sharp edge:** TypeScript’s resolver is not automatically the runtime resolver.

### Believing TypeScript Guarantees Runtime Correctness

TypeScript catches many errors, but runtime failures can still occur.

```ts
type Config = {
  port: number;
};

const config = JSON.parse(process.env.CONFIG_JSON!) as Config;

server.listen(config.port);
```

Possible runtime failures include:

| Failure                      | Why TypeScript may not catch it |
| ---------------------------- | ------------------------------- |
| Invalid JSON                 | Runtime parsing failure         |
| Missing environment variable | Hidden by `!`                   |
| Wrong shape                  | Hidden by assertion             |
| Wrong type                   | No runtime validation           |
| Port unavailable             | Runtime environment condition   |
| Network failure              | External system condition       |

Safer startup boundary:

```ts
type Config = {
  port: number;
};

function parseConfig(value: unknown): Config {
  if (
    typeof value === "object" &&
    value !== null &&
    "port" in value &&
    typeof value.port === "number" &&
    Number.isInteger(value.port) &&
    value.port > 0
  ) {
    return { port: value.port };
  }

  throw new Error("Invalid config");
}

const rawConfig = process.env.CONFIG_JSON;

if (!rawConfig) {
  throw new Error("Missing CONFIG_JSON");
}

const config = parseConfig(JSON.parse(rawConfig));
```

**Sharp edge:** TypeScript can prove consistency with declared assumptions. It cannot prove the assumptions are true unless they are established by code it can analyze.

### Assuming Tooling Conventions Are Language Semantics

Frameworks and bundlers often add behavior that is not TypeScript itself.

| Behavior                      | Usually comes from                          |
| ----------------------------- | ------------------------------------------- |
| Importing `.css` files        | Bundler or framework declaration            |
| Importing `.svg` as component | Bundler plugin and declaration              |
| Route parameter types         | Framework generated types                   |
| `import.meta.env`             | Bundler environment typing                  |
| JSX support                   | Compiler option plus framework types        |
| Test globals                  | Test runner types                           |
| Path aliases                  | TypeScript plus bundler/test/runtime config |
| Server/client module split    | Framework convention                        |

Example asset declaration:

```ts
declare module "*.svg" {
  const src: string;
  export default src;
}
```

This tells TypeScript that SVG imports are valid. It does not teach the runtime how to load SVG files. The bundler or framework must do that.

**Sharp edge:** When debugging, identify whether the issue belongs to TypeScript, JavaScript runtime, bundler, framework, test runner, or deployment environment.

### Unsoundness Hotspots

TypeScript is deliberately not fully sound. It chooses JavaScript compatibility and usability.

| Hotspot                     | Example                          | Risk                               | Safer pattern                                   |
| --------------------------- | -------------------------------- | ---------------------------------- | ----------------------------------------------- |
| `any`                       | `value.anything()`               | Disables checking                  | Use `unknown` and narrow                        |
| Assertion                   | `value as User`                  | Can lie                            | Validate or isolate assertion                   |
| Non-null assertion          | `value!`                         | Can crash                          | Check or throw                                  |
| Indexed access              | `map[key]`                       | Missing key                        | Enable `noUncheckedIndexedAccess`               |
| Mutable arrays              | `Animal[] = Dog[]` style issues  | Insert incompatible values         | Prefer readonly inputs                          |
| Function parameter variance | Callback assignability surprises | Handler receives unsupported value | Use explicit function types and strict settings |
| Declaration files           | Incorrect `.d.ts`                | False confidence                   | Test runtime behavior                           |
| External data               | DTO without validation           | Runtime mismatch                   | Parse boundary data                             |
| Optional properties         | Missing vs `undefined`           | Subtle assignment bugs             | Enable `exactOptionalPropertyTypes`             |
| Module interop              | ESM/CJS mismatch                 | Runtime import failure             | Align package and compiler settings             |

### `any` Containment Pattern

If `any` is unavoidable, contain it inside a small adapter.

```ts
type LegacyUser = {
  id: string;
  email: string;
};

declare const legacyClient: any;

function isLegacyUser(value: unknown): value is LegacyUser {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    typeof value.id === "string" &&
    typeof value.email === "string"
  );
}

async function getLegacyUser(id: string): Promise<LegacyUser> {
  const value: unknown = await legacyClient.getUser(id);

  if (!isLegacyUser(value)) {
    throw new Error("Invalid legacy user");
  }

  return value;
}
```

| Rule                         | Reason                                 |
| ---------------------------- | -------------------------------------- |
| Keep `any` at the boundary   | Prevents spread into application logic |
| Convert to `unknown` quickly | Restores type safety                   |
| Validate before returning    | Protects downstream code               |
| Expose a typed adapter       | Gives the rest of the app a safe API   |

### Assertion Containment Pattern

Unsafe assertion spread:

```ts
const user = JSON.parse(raw) as User;
const team = JSON.parse(rawTeam) as Team;
const invoice = JSON.parse(rawInvoice) as Invoice;
```

Better containment:

```ts
function unsafeJsonParse(raw: string): unknown {
  return JSON.parse(raw);
}

function parseUserJson(raw: string): User {
  const value = unsafeJsonParse(raw);

  if (!isUser(value)) {
    throw new Error("Invalid user JSON");
  }

  return value;
}
```

| Bad assertion                       | Better replacement                    |
| ----------------------------------- | ------------------------------------- |
| `JSON.parse(raw) as T`              | `parseT(JSON.parse(raw))`             |
| `querySelector(...) as HTMLElement` | `queryElement(selector, HTMLElement)` |
| `env.PORT as string`                | `readRequiredEnv("PORT")`             |
| `data as ApiResponse`               | API decoder                           |
| `x!`                                | Invariant check                       |

### Runtime Conversion vs Static Assertion

Static assertion:

```ts
const value = "123" as unknown as number;
```

This does not convert the string to a number.

Runtime conversion:

```ts
const value = Number("123");
```

Runtime conversion plus validation:

```ts
function parsePositiveInteger(value: string): number {
  const number = Number(value);

  if (!Number.isInteger(number) || number <= 0) {
    throw new Error("Expected positive integer");
  }

  return number;
}
```

| Goal                             | Correct mechanism                              |
| -------------------------------- | ---------------------------------------------- |
| Tell compiler about a known type | Annotation or assertion                        |
| Check shape                      | Guard or parser                                |
| Convert string to number         | `Number`, parser, validation                   |
| Convert JSON to domain object    | Parse JSON, validate, map                      |
| Convert class instance           | Constructor or factory                         |
| Freeze runtime object            | `Object.freeze`, deep freeze, immutable design |

**Sharp edge:** TypeScript syntax does not perform runtime conversion.

### Boolean State Explosion

Multiple booleans often permit invalid states.

Poor model:

```ts
type UploadState = {
  isIdle: boolean;
  isUploading: boolean;
  isComplete: boolean;
  hasError: boolean;
  error?: Error;
};
```

This allows contradictions:

```ts
const impossible: UploadState = {
  isIdle: true,
  isUploading: true,
  isComplete: true,
  hasError: true,
};
```

Better:

```ts
type UploadState =
  | { status: "idle" }
  | { status: "uploading"; progress: number }
  | { status: "complete"; fileUrl: string }
  | { status: "error"; error: Error };
```

| Problem                  | Better model            |
| ------------------------ | ----------------------- |
| Many booleans            | Single discriminant     |
| Optional data fields     | Variant-specific fields |
| Mutually exclusive modes | Discriminated union     |
| Exhaustive rendering     | `switch` plus `never`   |

### Nullable Data Bags

Poor async model:

```ts
type UserState = {
  loading: boolean;
  user: User | null;
  error: Error | null;
};
```

This permits ambiguous combinations such as `loading: true` with both `user` and `error`.

Better:

```ts
type UserState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; user: User }
  | { status: "error"; error: Error };
```

**Sharp edge:** Nullability is useful for simple absence. It is often poor for modeling state machines.

### Literal Widening Surprises

TypeScript widens mutable variables.

```ts
let status = "draft";
// string

const fixedStatus = "draft";
// "draft"
```

Object properties may widen:

```ts
const invoice = {
  status: "draft",
};

// invoice.status is string
```

Preserve literal:

```ts
const invoice = {
  status: "draft",
} as const;

// invoice.status is "draft"
```

Or check shape while preserving inference:

```ts
type Invoice = {
  status: "draft" | "sent" | "paid";
};

const invoice = {
  status: "draft",
} satisfies Invoice;

// invoice.status is "draft"
```

| Situation       | Widening behavior           | Fix                                        |
| --------------- | --------------------------- | ------------------------------------------ |
| `let x = "a"`   | `string`                    | Use `const` if not reassigned              |
| Object property | Often widens                | Use annotation, `as const`, or `satisfies` |
| Array literal   | Often `string[]`            | Use `as const` for tuple/literal union     |
| Function return | May widen unless contextual | Add return type or `as const`              |

### `satisfies` Misunderstanding

`satisfies` checks compatibility but does not make the variable’s type exactly the target type.

```ts
type Config = {
  mode: "dev" | "prod";
  retries: number;
};

const config = {
  mode: "prod",
  retries: 3,
} satisfies Config;

config.mode;
// "prod", not "dev" | "prod"
```

This is usually a benefit.

But if a broad variable type is desired, use annotation:

```ts
const config: Config = {
  mode: "prod",
  retries: 3,
};

config.mode;
// "dev" | "prod"
```

| Tool        | Result                                                         |
| ----------- | -------------------------------------------------------------- |
| Annotation  | Variable is typed as target                                    |
| Assertion   | Compiler is forced toward asserted type                        |
| `as const`  | Expression is inferred narrowly and readonly                   |
| `satisfies` | Expression is checked against target, then keeps inferred type |

**Sharp edge:** `satisfies` is ideal for config objects and lookup tables, not for every assignment.

### Shallow Readonly Mistakes

`readonly`, `Readonly<T>`, and `as const` are mostly compile-time and often shallow in practical use.

```ts
type Config = {
  database: {
    url: string;
  };
};

const config: Readonly<Config> = {
  database: {
    url: "postgres://local",
  },
};

config.database.url = "postgres://prod"; // Allowed
```

Deep runtime immutability requires runtime mechanisms or deep type utilities.

```ts
const frozen = Object.freeze({
  mode: "prod",
});
```

| Construct       |                        Static readonly? | Runtime frozen? |                                                          Deep? |
| --------------- | --------------------------------------: | --------------: | -------------------------------------------------------------: |
| `readonly prop` |                                     Yes |              No |                                                             No |
| `Readonly<T>`   |                                     Yes |              No |                                                             No |
| `readonly T[]`  |                                     Yes |              No |                                                             No |
| `as const`      |                                     Yes |              No | Inferred deeply for literal expression, but not runtime freeze |
| `Object.freeze` | Type-level and runtime top-level freeze |             Yes |                             No, unless deep freeze implemented |

**Sharp edge:** Readonly types prevent mutation through a typed reference. They do not make all aliases immutable.

### Array and Tuple Sharp Edges

Arrays are common sources of unsound assumptions.

```ts
const values = [1, 2, 3];

const value = values[10];
```

At runtime, `value` is `undefined`. Without `noUncheckedIndexedAccess`, TypeScript may not force a check.

Safer:

```ts
const value = values[10];

if (value !== undefined) {
  value.toFixed();
}
```

Tuples model known positions:

```ts
type Point = [x: number, y: number];

const point: Point = [10, 20];

const x = point[0];
const y = point[1];
```

| Mistake                                       | Better pattern                                |
| --------------------------------------------- | --------------------------------------------- |
| Using array when positions are meaningful     | Tuple                                         |
| Using tuple for long records                  | Object type                                   |
| Ignoring missing indexes                      | Enable `noUncheckedIndexedAccess`             |
| Mutating shared arrays                        | Accept `readonly T[]`                         |
| Using `as const` and expecting runtime freeze | Use `Object.freeze` if runtime freeze matters |

### Function Variance and Callback Surprises

Function parameter types can create assignability surprises.

```ts
type Animal = {
  name: string;
};

type Dog = Animal & {
  bark(): void;
};

type Handler<T> = (value: T) => void;

const handleAnimal: Handler<Animal> = (animal) => {
  console.log(animal.name);
};

const handleDog: Handler<Dog> = (dog) => {
  dog.bark();
};
```

A handler that can handle any `Animal` can handle a `Dog`.

```ts
const dogHandler: Handler<Dog> = handleAnimal;
```

But a handler that requires a `Dog` cannot safely handle any `Animal`.

```ts
// const animalHandler: Handler<Animal> = handleDog;
```

| Position            | Safe intuition                                             |
| ------------------- | ---------------------------------------------------------- |
| Function parameter  | Accepting broader inputs is safer                          |
| Function return     | Returning narrower outputs is safer                        |
| Readonly collection | Covariance is usually safe                                 |
| Mutable collection  | Invariance would be safer, but TS permits some unsoundness |

**Sharp edge:** Prefer explicit callback types and strict compiler settings for callback-heavy APIs.

### Declaration Files Can Lie

Declaration files describe runtime JavaScript. They do not prove implementation correctness.

```ts
// legacy-lib.d.ts
declare module "legacy-lib" {
  export function getUser(id: string): Promise<{
    id: string;
    email: string;
  }>;
}
```

If the real library returns `{ user_id: 123 }`, TypeScript will not know.

| Declaration source           | Risk                                          |
| ---------------------------- | --------------------------------------------- |
| Handwritten `.d.ts`          | May be inaccurate                             |
| Third-party `@types` package | May lag runtime package                       |
| Generated declarations       | May reflect source but not runtime deployment |
| Global declarations          | May describe missing injected values          |
| Asset declarations           | May not match bundler output                  |

**Better pattern:** Wrap unstable or untyped dependencies in a local adapter that validates or normalizes the output.

### Environment-Type Confusion

If a global name is missing, the problem is often configuration.

| Missing name          | Likely fix                        |
| --------------------- | --------------------------------- |
| `document`            | Add DOM lib for browser code      |
| `process`             | Install/include Node types        |
| `describe` / `it`     | Include test runner types         |
| `expect`              | Include assertion/test types      |
| `JSX`                 | Configure JSX and framework types |
| `import.meta.env`     | Include bundler/client types      |
| Custom build constant | Add `.d.ts` declaration           |

Example:

```ts
// globals.d.ts
declare const __APP_VERSION__: string;
```

**Sharp edge:** Adding types can make names type-check, but the runtime must still provide them.

### Minimal Pattern Set to Memorize

### Fixed Object Shape

Use for stable known fields.

```ts
type User = {
  id: string;
  email: string;
  createdAt: Date;
};
```

| Use when                        | Avoid when                                         |
| ------------------------------- | -------------------------------------------------- |
| Fields are known and stable     | Keys are genuinely dynamic                         |
| Object is a DTO or domain model | Value is untrusted external data before validation |

### Finite Literal Union

Use for allowed values.

```ts
type Role = "admin" | "editor" | "viewer";
```

| Use when                          | Avoid when                                  |
| --------------------------------- | ------------------------------------------- |
| Valid values are finite           | Values are open-ended strings               |
| Branching depends on exact values | Values come from unvalidated external input |

### Discriminated Union

Use for one of several shapes.

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error };
```

| Use when                                  | Avoid when                        |
| ----------------------------------------- | --------------------------------- |
| Variants have different fields            | A simple nullable value is enough |
| Invalid combinations should be impossible | All fields are always present     |

### `typeof` plus `as const`

Use to derive types from runtime constants.

```ts
const statuses = ["draft", "sent", "paid"] as const;

type Status = (typeof statuses)[number];
```

| Use when                                           | Avoid when                    |
| -------------------------------------------------- | ----------------------------- |
| Runtime list is source of truth                    | Type exists only conceptually |
| Runtime iteration and static union are both needed | Values are not actually fixed |

### `keyof` plus Indexed Access

Use to connect object keys and values.

```ts
function get<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
```

| Use when                     | Avoid when                                    |
| ---------------------------- | --------------------------------------------- |
| Key must be valid for object | Key is arbitrary external string              |
| Return type depends on key   | All keys have same value type and are dynamic |

### Generic Wrapper `Type<T>`

Use when a structure is reused with different inner data.

```ts
type ApiResponse<T> = {
  data: T;
  requestId: string;
};
```

| Use when              | Avoid when                                     |
| --------------------- | ---------------------------------------------- |
| Outer shape is stable | Generic parameter is not connected to anything |
| Inner data varies     | A concrete type would be clearer               |

### Constrained Generic

Use when a generic needs certain capabilities.

```ts
function getId<T extends { id: string }>(value: T): string {
  return value.id;
}
```

| Use when                                                | Avoid when                            |
| ------------------------------------------------------- | ------------------------------------- |
| Function preserves input type but needs required fields | A non-generic concrete type is enough |
| Relationship matters                                    | Generic exists only for style         |

### `Partial`, `Pick`, `Omit`, `Record`

Use standard utility types for shallow transformations.

```ts
type User = {
  id: string;
  email: string;
  passwordHash: string;
};

type PublicUser = Omit<User, "passwordHash">;

type UserUpdate = Partial<Pick<User, "email">>;

type UsersById = Record<string, User | undefined>;
```

| Utility        | Memorize as          |
| -------------- | -------------------- |
| `Partial<T>`   | Make fields optional |
| `Pick<T, K>`   | Keep fields          |
| `Omit<T, K>`   | Remove fields        |
| `Record<K, V>` | Key-value object     |

### `unknown` plus Type Guard

Use for external data.

```ts
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    typeof value.id === "string" &&
    typeof value.email === "string"
  );
}
```

| Use when                     | Avoid when                                         |
| ---------------------------- | -------------------------------------------------- |
| Data crosses trust boundary  | Data is already produced inside trusted typed code |
| Runtime validation is needed | Assertion would hide unsafe assumptions            |

### `satisfies`

Use for configuration objects and lookup tables.

```ts
type Route = {
  method: "GET" | "POST";
  path: string;
};

const routes = {
  listUsers: {
    method: "GET",
    path: "/users",
  },
  createUser: {
    method: "POST",
    path: "/users",
  },
} satisfies Record<string, Route>;

type RouteName = keyof typeof routes;
```

| Use when                                           | Avoid when                                  |
| -------------------------------------------------- | ------------------------------------------- |
| Need compatibility checking plus precise inference | Need variable to be exactly the target type |
| Config object keys should remain literal           | Runtime validation is required              |

### Final Sharp-Edge Checklist

| Before writing `as T`                   | Ask                            |
| --------------------------------------- | ------------------------------ |
| Is this value from outside the program? | Use `unknown` and validate     |
| Is this a DOM query?                    | Check `null` and element class |
| Is this an environment variable?        | Parse and validate config      |
| Is this a third-party library result?   | Wrap and validate if unstable  |
| Is this only to silence the compiler?   | Fix the model instead          |

| Before writing `any`                     | Ask                  |
| ---------------------------------------- | -------------------- |
| Can this be `unknown`?                   | Prefer `unknown`     |
| Can a generic preserve the relationship? | Use `<T>`            |
| Can a precise callback type be written?  | Avoid `Function`     |
| Can the unsafety be isolated?            | Use adapter boundary |
| Will this leak into public API?          | Avoid                |

| Before writing `Record<string, T>` | Ask                                                      |
| ---------------------------------- | -------------------------------------------------------- |
| Are the keys truly arbitrary?      | If not, use fixed object or finite union                 |
| Can a key be missing?              | Include `undefined` or enable `noUncheckedIndexedAccess` |
| Is insertion/deletion frequent?    | Consider `Map`                                           |
| Is this a DTO?                     | Prefer explicit object shape                             |
| Are keys known at build time?      | Use `Record<Union, T>`                                   |

| Before modeling state with booleans   | Ask                       |
| ------------------------------------- | ------------------------- |
| Are states mutually exclusive?        | Use discriminated union   |
| Do fields exist only in some states?  | Put fields on variants    |
| Should branching be exhaustive?       | Use `switch` plus `never` |
| Can impossible states be represented? | Redesign                  |
| Is this a lifecycle?                  | Use literal `status`      |

### Professional TypeScript Essence

Good TypeScript code usually follows these principles:

| Principle                                    | Practical expression                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| Keep runtime and type-level boundaries clear | Do not expect erased types to validate values                |
| Model domains precisely                      | Use literal unions, object shapes, and discriminated unions  |
| Treat external data as untrusted             | Start with `unknown` and validate                            |
| Prefer inference where it is accurate        | Avoid noisy local annotations                                |
| Add annotations at boundaries                | Exported APIs, DTOs, services, and modules                   |
| Keep escape hatches local                    | Contain `any`, assertions, and non-null assertions           |
| Derive instead of duplicate                  | Use `typeof`, `as const`, `keyof`, and utility types         |
| Avoid type cleverness without payoff         | Readability is part of correctness                           |
| Align configuration with runtime             | `tsconfig`, bundler, Node, browser, and framework must agree |
| Remember JavaScript executes                 | TypeScript checks; JavaScript runs                           |
