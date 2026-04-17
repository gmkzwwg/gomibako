---
title: TypeScript - Quick Reference
categories: Notes
subclass: Webdev
todos: 给出技术趋势和技术栈的解析，如为什么ts代替js
---

## Quick Reference Table

It is designed as a fast-start sheet for someone who already understands programming and formal language structure.

One key distinction first:

* value level: things that exist at runtime
* type level: things that exist only for static checking

### Primitive types

| Syntax        | Example                       | Notes                      |                  |
| ------------- | ----------------------------- | -------------------------- | ---------------- |
| `string`      | `let name: string = "Ada"`    | text                       |                  |
| `number`      | `let age: number = 42`        | integer and floating-point |                  |
| `boolean`     | `let ok: boolean = true`      | logical values             |                  |
| `bigint`      | `let n: bigint = 10n`         | large integers             |                  |
| `symbol`      | `const id: symbol = Symbol()` | unique identifiers         |                  |
| inference     | `let city = "Tokyo"`          | inferred as `string`       |                  |
| literal types | `let dir: "left"              | "right"`                   | finite value set |

```ts
let username: string = "Alice";
let age: number = 20;
let active: boolean = true;

let city = "Tokyo"; // inferred: string

let direction: "left" | "right" = "left";
```

Classic usage:

* rely on inference for local variables
* annotate public APIs, function signatures, and non-trivial structures

### Arrays, tuples, readonly

| Syntax         | Example                     | Meaning                   |
| -------------- | --------------------------- | ------------------------- |
| `T[]`          | `number[]`                  | standard array            |
| `Array<T>`     | `Array<string>`             | generic array form        |
| tuple          | `[string, number]`          | fixed arity and positions |
| `readonly T[]` | `readonly string[]`         | immutable array view      |
| readonly tuple | `readonly [string, number]` | immutable tuple           |

```ts
const scores: number[] = [90, 85, 100];
const names: Array<string> = ["a", "b"];

let pair: [string, number] = ["age", 18];

const tags: readonly string[] = ["ts", "js"];
const point: readonly [number, number] = [10, 20];
```

Classic usage:

* tuples for coordinates, pairs, parser outputs
* `readonly` for config and immutable data

### Object types

| Syntax             | Example                         | Use                            |
| ------------------ | ------------------------------- | ------------------------------ |
| inline object type | `{ name: string; age: number }` | local structure                |
| optional property  | `email?: string`                | property may be absent         |
| readonly property  | `readonly id: number`           | immutable after initialization |
| index signature    | `[key: string]: string`         | dynamic key dictionaries       |

```ts
let user: {
  name: string;
  age: number;
  email?: string;
} = {
  name: "Alice",
  age: 20
};

type Dict = {
  [key: string]: string;
};

const env: Dict = {
  NODE_ENV: "production",
  API_URL: "/api"
};
```

Classic usage:

* prefer explicit object shapes over broad index signatures
* use index signatures only for genuinely dynamic maps

### `type` and `interface`

| Form        | Best used for                                               |
| ----------- | ----------------------------------------------------------- |
| `interface` | named object contracts                                      |
| `type`      | aliases, unions, intersections, mapped or conditional types |

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

type Status = "idle" | "loading" | "done";
```

Rule of thumb:

* use `interface` for object contracts
* use `type` for type expressions

### Union and intersection

| Syntax           | Example | Meaning                       |         |                      |
| ---------------- | ------- | ----------------------------- | ------- | -------------------- |
| union `          | `       | `string                       | number` | one of several types |
| intersection `&` | `A & B` | combination of multiple types |         |                      |

```ts
let id: string | number;
id = 123;
id = "abc";

type WithId = { id: number };
type WithName = { name: string };

type User2 = WithId & WithName;
// { id: number; name: string }
```

Classic usage:

* union for multiple valid input shapes
* intersection for composition

### Functions

| Syntax               | Example                 |
| -------------------- | ----------------------- |
| parameter annotation | `(x: number)`           |
| return annotation    | `(): string`            |
| optional parameter   | `(x?: number)`          |
| default parameter    | `(x = 1)`               |
| rest parameter       | `(...args: number[])`   |
| function type        | `(x: number) => string` |

```ts
function add(a: number, b: number): number {
  return a + b;
}

function greet(name = "world"): string {
  return `Hello, ${name}`;
}

function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

const format: (x: number) => string = (x) => x.toFixed(2);
```

Classic usage:

* annotate exported function return types
* let callback types be inferred when obvious

### `void`, `never`, `unknown`, `any`

| Type      | Meaning                    | Typical use                 |
| --------- | -------------------------- | --------------------------- |
| `void`    | no meaningful return       | side-effecting function     |
| `never`   | does not complete normally | throw, impossible branch    |
| `unknown` | unknown but safe           | external input, parsed JSON |
| `any`     | disable checking           | migration or escape hatch   |

```ts
function log(msg: string): void {
  console.log(msg);
}

function fail(msg: string): never {
  throw new Error(msg);
}

let input: unknown = JSON.parse('{"x":1}');

if (typeof input === "object" && input !== null) {
  console.log("safe to inspect further");
}
```

Rule:

* prefer `unknown` over `any`
* use `never` for exhaustiveness

### Narrowing

TypeScript refines types using runtime checks.

| Pattern           | Example                         |
| ----------------- | ------------------------------- |
| `typeof`          | `typeof x === "string"`         |
| `instanceof`      | `x instanceof Date`             |
| `in`              | `"name" in obj`                 |
| truthiness        | `if (x) {}`                     |
| custom type guard | `function isUser(x): x is User` |

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toFixed(0);
}
```

Custom type guard:

```ts
type User = { name: string };

function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "name" in value;
}

function handle(value: unknown) {
  if (isUser(value)) {
    console.log(value.name);
  }
}
```

Classic usage:

* validating external data
* handling tagged state
* moving from `unknown` to specific types

### Literal types and `as const`

```ts
const roles = ["admin", "user", "guest"] as const;
type Role = typeof roles[number];
// "admin" | "user" | "guest"

const config = {
  theme: "dark",
  pageSize: 20
} as const;
```

Effect of `as const`:

* narrows literals
* marks properties readonly
* preserves tuple-like array literals

Classic usage:

* enum-like values
* route names
* permissions
* deriving types from values

### Type assertions

| Syntax       | Meaning                                   |
| ------------ | ----------------------------------------- |
| `value as T` | tell the compiler to treat `value` as `T` |
| `<T>value`   | older form, avoid in TSX/JSX              |

```ts
const el = document.getElementById("app") as HTMLDivElement;
```

Important:

* assertion is not runtime conversion
* it changes static interpretation, not actual value shape

### Enums and common replacement

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

Common modern alternative:

```ts
const Direction2 = {
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right"
} as const;

type Direction2 = typeof Direction2[keyof typeof Direction2];
```

Rule of thumb:

* many codebases prefer `as const` objects over `enum`
* `enum` is still valid, but has extra emitted/runtime semantics

### Classes

```ts
class UserService {
  constructor(public readonly baseUrl: string) {}

  getUser(id: number): string {
    return `${this.baseUrl}/users/${id}`;
  }
}
```

Useful features:

* `public`, `private`, `protected`
* parameter properties
* `readonly`
* `extends`
* `implements`
* `abstract`

```ts
abstract class Animal {
  abstract speak(): void;
}

class Dog extends Animal {
  speak() {
    console.log("woof");
  }
}
```

### Generics

Generics parameterize types.

```ts
function identity<T>(value: T): T {
  return value;
}

const a = identity<number>(123);
const b = identity("abc"); // inferred
```

With constraints:

```ts
function getId<T extends { id: number }>(obj: T): number {
  return obj.id;
}
```

With defaults:

```ts
type Box<T = string> = {
  value: T;
};

const x: Box = { value: "hello" };
```

Classic usage:

* container types
* reusable helpers
* API wrappers preserving relationships between input and output

### `keyof`

Produces a union of property keys.

```ts
type User = {
  id: number;
  name: string;
  active: boolean;
};

type UserKey = keyof User;
// "id" | "name" | "active"
```

Canonical pattern:

```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### `typeof` in type position

This derives a type from a value.

```ts
const settings = {
  theme: "dark",
  pageSize: 20
};

type Settings = typeof settings;
```

With `as const`:

```ts
const routes = {
  home: "/",
  about: "/about"
} as const;

type RouteName = keyof typeof routes;      // "home" | "about"
type RoutePath = typeof routes[RouteName]; // "/" | "/about"
```

### Indexed access types

```ts
type User = {
  id: number;
  profile: {
    name: string;
  };
};

type Id = User["id"];           // number
type Profile = User["profile"]; // { name: string }
```

Classic pattern:

```ts
const arr = ["a", "b", "c"] as const;
type Elem = typeof arr[number]; // "a" | "b" | "c"
```

### Conditional types

Type-level branching.

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<"x">; // true
type B = IsString<123>; // false
```

Using `infer`:

```ts
type ElementType<T> = T extends (infer U)[] ? U : T;

type E1 = ElementType<string[]>; // string
type E2 = ElementType<number>;   // number
```

Classic usage:

* extracting function return types
* unwrapping promises
* transforming generic input/output relations

### Mapped types

Generate a new type by iterating over keys.

```ts
type OptionsFlags<T> = {
  [K in keyof T]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureFlags = OptionsFlags<Features>;
```

Modifier control:

```ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type RequiredAll<T> = {
  [K in keyof T]-?: T[K];
};
```

Classic usage:

* making all fields optional, required, mutable, readonly
* deriving multiple views of a schema

### Template literal types

```ts
type EventName = "click" | "focus";
type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus"
```

Another classic pattern:

```ts
type Lang = "en" | "zh";
type Key = "title" | "subtitle";
type I18nKey = `${Lang}.${Key}`;
```

Classic usage:

* event names
* route patterns
* i18n keys
* naming conventions

### Utility types

Most frequently used:

| Utility          | Effect                         |
| ---------------- | ------------------------------ |
| `Partial<T>`     | all properties optional        |
| `Required<T>`    | all properties required        |
| `Readonly<T>`    | all properties readonly        |
| `Pick<T, K>`     | keep selected properties       |
| `Omit<T, K>`     | remove selected properties     |
| `Record<K, V>`   | key-value mapping              |
| `Exclude<A, B>`  | remove union members           |
| `Extract<A, B>`  | keep overlapping union members |
| `NonNullable<T>` | remove `null` and `undefined`  |
| `ReturnType<F>`  | function return type           |
| `Parameters<F>`  | function parameter tuple       |
| `Awaited<T>`     | unwrap promise-like value      |

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};

type UserPatch = Partial<User>;
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;

type UserMap = Record<string, User>;
```

Function extraction:

```ts
function fetchUser(id: number) {
  return Promise.resolve({ id, name: "Alice" });
}

type FetchUserParams = Parameters<typeof fetchUser>;
type FetchUserResult = Awaited<ReturnType<typeof fetchUser>>;
```

### Discriminated unions

One of the most useful real-world patterns.

```ts
type Loading = { status: "loading" };
type Success = { status: "success"; data: string[] };
type Failure = { status: "error"; error: Error };

type Result = Loading | Success | Failure;

function render(result: Result) {
  switch (result.status) {
    case "loading":
      return "Loading...";
    case "success":
      return result.data.join(", ");
    case "error":
      return result.error.message;
  }
}
```

Exhaustiveness check:

```ts
function assertNever(x: never): never {
  throw new Error("Unexpected value: " + x);
}
```

```ts
function render2(result: Result) {
  switch (result.status) {
    case "loading":
      return "Loading...";
    case "success":
      return result.data.join(", ");
    case "error":
      return result.error.message;
    default:
      return assertNever(result);
  }
}
```

Classic usage:

* request state
* reducers
* AST nodes
* command systems

### `satisfies`

Checks compatibility without losing the original narrow inferred type.

```ts
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255]
} satisfies Record<Colors, string | RGB>;
```

Why it is useful:

* safer than `as`
* more precise than forcing an annotation

Classic usage:

* config objects
* route tables
* dictionaries with constrained keys

### `const` type parameters

Useful for preserving literal precision in generic helpers.

```ts
function tuple<const T extends readonly unknown[]>(value: T): T {
  return value;
}

const t = tuple(["a", "b", "c"]);
// readonly ["a", "b", "c"]
```

Classic usage:

* library helpers that should preserve literal input structure
* avoiding extra `as const` at call sites

### Function overloads

```ts
function format(value: number): string;
function format(value: Date): string;
function format(value: number | Date): string {
  if (value instanceof Date) return value.toISOString();
  return value.toFixed(2);
}
```

Rule:

* use overloads when the API meaning really differs by input shape
* otherwise prefer unions

### Modules and type-only imports

```ts
export type User = {
  id: number;
  name: string;
};

export function getUser(id: number): User {
  return { id, name: "Alice" };
}
```

```ts
import type { User } from "./user";
import { getUser } from "./user";
```

Classic usage:

* keep value imports and type imports distinct
* reduce confusion between runtime and type-only dependencies

### Declaration files

Used to describe existing JavaScript code.

```ts
declare module "my-lib" {
  export function parse(input: string): { ok: boolean };
}
```

Or globals:

```ts
declare const __DEV__: boolean;
```

Classic usage:

* typing legacy JS
* typing untyped third-party modules
* declaring build-time globals

Most useful patterns to memorize

A. Derive a union from a constant array

```ts
const roles = ["admin", "user", "guest"] as const;
type Role = typeof roles[number];
```

B. Safe property accessor

```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

C. Generic API response wrapper

```ts
type ApiResponse<T> = {
  data: T;
  error: string | null;
};

type User = { id: number; name: string };

const res: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  error: null
};
```

D. Request state as discriminated union

```ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };
```

E. Validate config with `satisfies`

```ts
type Route = {
  path: string;
  auth: boolean;
};

const routes = {
  home: { path: "/", auth: false },
  admin: { path: "/admin", auth: true }
} satisfies Record<string, Route>;
```

### Minimum set to become productive fast

* `type`
* `interface`
* `|`
* `&`
* `?`
* `readonly`
* `keyof`
* `typeof`
* `T[K]`
* `extends`
* `as const`
* `Partial`, `Pick`, `Omit`, `Record`

Then add:

* discriminated unions
* conditional types
* mapped types
* `satisfies`

Common mistakes and easily confused points

* `type` and `interface` overlap, but are not identical in use.
* `as` is not runtime conversion.
* `any` turns off checking; it is not “flexible typing.”
* `unknown` is much safer than `any`.
* `keyof T` gives keys, not values.
* `typeof` in type position differs from runtime `typeof`.
* `T[]` is an array type, not a tuple.
* `A | B` means either, not both; `A & B` means both.
* conditional, mapped, and template literal types exist only at the type level.
* `satisfies` validates while preserving precision; a plain annotation often widens too much.

## TypeScript by task pattern

his sheet is organized by actual tasks:

* define data
* constrain inputs
* derive types from values
* transform existing types
* model branching states
* write reusable generic helpers
* type external or unknown data
* type modules and libraries

1. Define a fixed object shape

Use when:

* you know the fields ahead of time
* you want a stable contract for data or parameters

Pattern:

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};
```

or

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}
```

Typical usage:

```ts
function sendWelcome(user: User) {
  console.log(user.name);
}
```

Choose:

* `interface` for object contracts
* `type` if you may later compose with unions, intersections, or mapped types

1. Define a dictionary or dynamic-key map

Use when:

* keys are not known in advance
* values all share one type

Pattern:

```ts
type StringMap = {
  [key: string]: string;
};
```

Better modern form:

```ts
type UserMap = Record<string, { id: number; name: string }>;
```

Examples:

```ts
const env: Record<string, string> = {
  NODE_ENV: "production",
  API_URL: "/api"
};
```

```ts
const usersById: Record<string, { id: number; name: string }> = {
  "1": { id: 1, name: "Ada" }
};
```

Rule:

* use explicit object types when keys are known
* use `Record` or index signatures only for real maps

1. Model a finite set of allowed values

Use when:

* a value should only be one of several exact strings or numbers

Pattern:

```ts
type Status = "idle" | "loading" | "success" | "error";
```

Example:

```ts
let status: Status = "idle";
status = "loading";
```

Classic use cases:

* state tags
* event names
* role names
* route names

1. Model “one of several shapes”

Use when:

* input or state may have different valid structures

Pattern:

```ts
type Input = string | number;
```

Example:

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toFixed(0);
}
```

This is the basic union pattern.

1. Model “combine several capabilities”

Use when:

* one type should include all fields from multiple parts

Pattern:

```ts
type WithId = { id: number };
type WithName = { name: string };

type User = WithId & WithName;
```

Example:

```ts
const user: User = {
  id: 1,
  name: "Ada"
};
```

Use intersection `&` for composition.

1. Type function parameters and return values

Use when:

* you want explicit contracts at API boundaries

Pattern:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Function type pattern:

```ts
type Formatter = (value: number) => string;
```

Example:

```ts
const formatPrice: Formatter = (value) => `$${value.toFixed(2)}`;
```

Rule:

* exported functions: annotate return type
* local callbacks: let inference do most of the work

1. Make a parameter optional or provide a default

Optional parameter:

```ts
function greet(name?: string) {
  return `Hello, ${name ?? "world"}`;
}
```

Default parameter:

```ts
function greet(name = "world") {
  return `Hello, ${name}`;
}
```

Difference:

* optional means the argument may be omitted
* default gives a runtime fallback automatically

1. Type a configuration object

Use when:

* you have a fixed config schema
* you want validation without losing literal precision

Base shape:

```ts
type Config = {
  theme: "light" | "dark";
  pageSize: number;
  debug?: boolean;
};
```

Direct annotation:

```ts
const config: Config = {
  theme: "dark",
  pageSize: 20
};
```

Better modern validation with `satisfies`:

```ts
const config = {
  theme: "dark",
  pageSize: 20
} satisfies Config;
```

Why `satisfies` is often better:

* checks compatibility
* preserves narrow inferred values
* avoids some unwanted widening

1. Derive a type from a runtime value

Use when:

* the value already exists
* you do not want to duplicate it manually at the type level

Pattern:

```ts
const settings = {
  theme: "dark",
  pageSize: 20
};

type Settings = typeof settings;
```

With exact literals:

```ts
const routes = {
  home: "/",
  about: "/about"
} as const;

type Routes = typeof routes;
type RouteName = keyof typeof routes;
type RoutePath = typeof routes[RouteName];
```

This is one of the most important real-world patterns in TS.

1. Derive a union from an array of constants

Use when:

* you want a list of values and a type from the same source

Pattern:

```ts
const roles = ["admin", "user", "guest"] as const;
type Role = typeof roles[number];
```

Example:

```ts
function canLogin(role: Role) {
  return role !== "guest";
}
```

This is the standard pattern for:

* roles
* tags
* route names
* enum-like string sets

1. Access a property type from another type

Use when:

* you want to reuse one field’s type
* you want to keep types synchronized

Pattern:

```ts
type User = {
  id: number;
  profile: {
    name: string;
  };
};

type Id = User["id"];
type Profile = User["profile"];
```

This is indexed access.

1. Write a safe generic property getter

Use when:

* you want a helper that reads object properties safely

Pattern:

```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Example:

```ts
const user = { id: 1, name: "Ada" };

const id = getProp(user, "id");     // number
const name = getProp(user, "name"); // string
```

This is a canonical TypeScript pattern. Memorize it.

1. Write a reusable generic wrapper type

Use when:

* you want one shape reusable across many data types

Pattern:

```ts
type ApiResponse<T> = {
  data: T;
  error: string | null;
};
```

Example:

```ts
type User = { id: number; name: string };

const response: ApiResponse<User> = {
  data: { id: 1, name: "Ada" },
  error: null
};
```

Other common wrappers:

* `Result<T>`
* `Paginated<T>`
* `Box<T>`
* `Nullable<T>`

1. Constrain a generic

Use when:

* a generic type must have certain properties or behavior

Pattern:

```ts
function getId<T extends { id: number }>(obj: T): number {
  return obj.id;
}
```

Example:

```ts
getId({ id: 1, name: "Ada" }); // OK
```

Use `extends` for generic constraints.

1. Transform all fields of an existing type

Use when:

* you want a derived type from another type
* you do not want to rewrite every property

Built-in patterns:

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};

type UserPatch = Partial<User>;
type StrictUser = Required<User>;
type ReadonlyUser = Readonly<User>;
```

Examples:

* `Partial<T>` for update patches
* `Required<T>` for validated final objects
* `Readonly<T>` for immutable views

1. Keep or remove specific fields

Use when:

* you want a subtype projection

Pattern:

```ts
type User = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
};

type PublicUser = Pick<User, "id" | "name" | "email">;
type SafeUser = Omit<User, "passwordHash">;
```

Classic usage:

* DTOs
* API response shaping
* removing secrets before serialization

1. Model request or async state

Use when:

* data moves through loading, success, and failure states

Pattern:

```ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };
```

Example:

```ts
function render(state: RequestState<string[]>) {
  switch (state.status) {
    case "idle":
      return "Idle";
    case "loading":
      return "Loading";
    case "success":
      return state.data.join(", ");
    case "error":
      return state.error.message;
  }
}
```

This is the discriminated union pattern.
It is one of the most important business-code patterns in TS.

1. Enforce exhaustive branching

Use when:

* every union member must be handled
* you want the compiler to catch forgotten branches

Pattern:

```ts
function assertNever(x: never): never {
  throw new Error("Unexpected value: " + x);
}
```

Example:

```ts
function render(state: RequestState<string[]>) {
  switch (state.status) {
    case "idle":
      return "Idle";
    case "loading":
      return "Loading";
    case "success":
      return state.data.join(", ");
    case "error":
      return state.error.message;
    default:
      return assertNever(state);
  }
}
```

This is the standard exhaustive-check pattern.

1. Type unknown external data safely

Use when:

* you parse JSON
* you receive untrusted input
* you cross a system boundary

Pattern:

```ts
let input: unknown = JSON.parse(rawJson);
```

Then narrow:

```ts
type User = { name: string };

function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "name" in value;
}

if (isUser(input)) {
  console.log(input.name);
}
```

Rule:

* external data should begin as `unknown`
* narrow before using
* avoid `any` here

1. Type callbacks and higher-order functions

Use when:

* functions are passed around as values

Pattern:

```ts
type Mapper<T, U> = (value: T) => U;
```

Example:

```ts
function mapArray<T, U>(arr: T[], fn: Mapper<T, U>): U[] {
  return arr.map(fn);
}

const lengths = mapArray(["a", "bb", "ccc"], (s) => s.length);
```

This pattern is fundamental in utility and library code.

1. Extract function parameters or return types

Use when:

* you want to reuse an existing function contract
* you want wrapper functions to stay synchronized

Pattern:

```ts
function fetchUser(id: number) {
  return Promise.resolve({ id, name: "Ada" });
}

type FetchUserParams = Parameters<typeof fetchUser>;
type FetchUserReturn = ReturnType<typeof fetchUser>;
type FetchUserResolved = Awaited<FetchUserReturn>;
```

This avoids duplicate type definitions.

1. Write type-level “if” logic

Use when:

* a type should change depending on another type

Pattern:

```ts
type IsString<T> = T extends string ? true : false;
```

Example:

```ts
type A = IsString<"x">; // true
type B = IsString<123>; // false
```

Common extraction pattern:

```ts
type ElementType<T> = T extends (infer U)[] ? U : T;
```

Example:

```ts
type E1 = ElementType<string[]>; // string
type E2 = ElementType<number>;   // number
```

This is the basic conditional type pattern.

1. Create a new type by mapping over keys

Use when:

* you want systematic field transformation

Pattern:

```ts
type BoolFlags<T> = {
  [K in keyof T]: boolean;
};
```

Example:

```ts
type Features = {
  darkMode: () => void;
  comments: () => void;
};

type FeatureFlags = BoolFlags<Features>;
// { darkMode: boolean; comments: boolean }
```

This is the mapped type pattern.

1. Construct type-safe key strings

Use when:

* you want structured string names
* you want compile-time-checked naming conventions

Pattern:

```ts
type Event = "click" | "focus";
type Handler = `on${Capitalize<Event>}`;
```

Example:

```ts
type Lang = "en" | "zh";
type Key = "title" | "subtitle";
type I18nKey = `${Lang}.${Key}`;
```

This is the template literal type pattern.

1. Preserve literal precision in helpers

Use when:

* generic helpers should not widen literal inputs too much

Classic `as const` use:

```ts
const tupleValue = ["a", "b"] as const;
```

Generic helper with `const` type parameter:

```ts
function tuple<const T extends readonly unknown[]>(value: T): T {
  return value;
}

const t = tuple(["a", "b", "c"]);
// readonly ["a", "b", "c"]
```

Use this in library-style helpers.

1. Type overload-like APIs

Use when:

* function meaning truly changes with input shape

Pattern:

```ts
function format(value: number): string;
function format(value: Date): string;
function format(value: number | Date): string {
  if (value instanceof Date) return value.toISOString();
  return value.toFixed(2);
}
```

Rule:

* overload if distinct call signatures matter
* otherwise prefer a union

1. Type classes and constructor-based APIs

Use when:

* you model behavior with classes
* you want constructor contracts

Example:

```ts
interface Serializable {
  serialize(): string;
}

class User implements Serializable {
  constructor(public id: number, public name: string) {}

  serialize() {
    return JSON.stringify({ id: this.id, name: this.name });
  }
}
```

Pattern notes:

* `implements` checks the instance-side contract
* use `readonly` for immutable instance data
* use `abstract` for base classes with required methods

1. Type module boundaries cleanly

Use when:

* you export values and types from files
* you want clean separation between runtime and type-only dependencies

Pattern:

```ts
export type User = {
  id: number;
  name: string;
};

export function getUser(id: number): User {
  return { id, name: "Ada" };
}
```

Import pattern:

```ts
import type { User } from "./user";
import { getUser } from "./user";
```

Use `import type` when only the type is needed.

1. Add types to JavaScript libraries or globals

Use when:

* a JS module has no types
* build tooling injects globals
* legacy code needs declarations

Module declaration:

```ts
declare module "my-lib" {
  export function parse(input: string): { ok: boolean };
}
```

Global declaration:

```ts
declare const __DEV__: boolean;
```

This is the declaration-file pattern.

1. Choose between annotation, assertion, and `satisfies`

This is a common confusion point.

Annotation:

```ts
const config: { theme: "dark" | "light"; pageSize: number } = {
  theme: "dark",
  pageSize: 20
};
```

Assertion:

```ts
const config = {
  theme: "dark",
  pageSize: 20
} as { theme: "dark" | "light"; pageSize: number };
```

Validation with `satisfies`:

```ts
const config = {
  theme: "dark",
  pageSize: 20
} satisfies { theme: "dark" | "light"; pageSize: number };
```

Rule:

* annotation defines the variable’s type
* assertion forces the compiler view, sometimes unsafely
* `satisfies` checks compatibility while preserving better inference

Minimal pattern set to memorize

If you only memorize 10 patterns, memorize these:

1. fixed object shape
2. finite union of literals
3. discriminated union for state
4. `typeof` + `as const` to derive from values
5. `keyof` + `T[K]` for property-safe access
6. generic wrapper `Type<T>`
7. constrained generic `T extends ...`
8. `Partial` / `Pick` / `Omit` / `Record`
9. `unknown` + type guard for external data
10. `satisfies` for config objects

Common mistakes and tacit knowledge

* Many TS problems are really “value level vs type level” confusion.
* `any` removes safety; use it only as a deliberate escape hatch.
* `as` does not transform values at runtime.
* `satisfies` is usually better than a blunt assertion for config-style objects.
* Overloads are often overused; unions are simpler in many cases.
* `Record<string, T>` is not always the right choice when keys are actually fixed.
* `as const` is one of the highest-value tools in modern TS.
* The most practical advanced tools are not the fanciest ones; they are usually `keyof`, `typeof`, indexed access, mapped types, discriminated unions, and utility types.

If you want, I can next make a third sheet:
“TypeScript by codebase domain”
for example:
frontend, Node.js backend, library authoring, and data-modeling patterns.

## TypeScript: a comprehensive introduction

Main point: TypeScript is not a different runtime from JavaScript. It is a language layer on top of JavaScript that adds static type syntax, stronger tooling, and compile-time checking. The TypeScript team itself describes it as “JavaScript with syntax for types,” and its documentation is structured around learning types, narrowing, functions, objects, classes, modules, and declaration files. ([TypeScript][1])

JavaScript, by contrast, is the actual language executed by browsers and JavaScript runtimes such as Node.js. It is standardized through ECMAScript. In practical terms, JavaScript is the execution language; TypeScript is usually a development language that is checked and then emitted as JavaScript. ([developer.mozilla.org][2])

**A balanced judgment**
* TypeScript is usually better for long-lived, collaborative, complex systems.
* JavaScript is usually better for very small, direct, runtime-native code.

The strongest practical model today is not “TS instead of JS” but:
* write source in TypeScript when structure matters
* emit JavaScript for actual execution
* interoperate freely with existing JavaScript code where needed

That model fits both the technical design of TypeScript and the reality of the modern ecosystem. ([TypeScript][1])

### What TypeScript is

TypeScript adds a static type system to normal JavaScript code. That means you can describe the expected shape of values, function parameters, return values, objects, classes, and APIs before the code runs. The compiler can then detect many categories of mistakes earlier, especially in larger codebases. This is one of its central goals: better tooling and safer scaling. ([TypeScript][1])

A simple example:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Here, `number` is not executed by the browser as a runtime feature. It is used by TypeScript during checking. After compilation, the emitted JavaScript is essentially:

```js
function add(a, b) {
  return a + b;
}
```

So TypeScript does not replace JavaScript. It describes JavaScript more precisely during development, then produces JavaScript for execution. This is why it is best understood as a superset of JavaScript used at authoring time. ([TypeScript][1])

### Why TypeScript exists

TypeScript became important because JavaScript grew from small browser scripts into the foundation of large front-end and back-end systems. As projects became larger, developers needed stronger guarantees around refactoring, API design, and team-scale maintenance. JavaScript modules, bundlers, and large application architectures all increased the value of better static analysis. MDN’s account of JavaScript’s evolution toward larger modular applications explains the underlying pressure clearly. ([developer.mozilla.org][3])

In short, TypeScript addresses problems such as:

* accidental property access on the wrong object
* unclear function contracts
* fragile refactoring across large codebases
* weak editor assistance in complex applications
* integration difficulty across many files and teams

Those are development-time problems, not runtime-language problems. TypeScript’s main contribution is to make those problems more visible before deployment. ([TypeScript][1])

### Core ideas in TypeScript

#### 3.1 Type annotations

Type annotations let you specify expected types explicitly.

```ts
let username: string = "Ada";
let age: number = 25;
let active: boolean = true;
```

#### 3.2 Type inference

You often do not need to annotate everything. TypeScript can infer many types automatically.

```ts
let username = "Ada"; // inferred as string
```

This balance is important: TypeScript is not only about writing many annotations. Good TypeScript often relies heavily on inference. The official documentation treats type inference as a major concept, not a minor convenience. ([TypeScript][4])

#### 3.3 Object types and interfaces

You can define the expected structure of objects.

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}
```

The `?` means the property is optional.

#### 3.4 Functions

TypeScript can type parameters and return values.

```ts
function greet(user: User): string {
  return `Hello, ${user.name}`;
}
```

#### 3.5 Union types

A value may be one of several types.

```ts
let id: string | number;
```

#### 3.6 Narrowing

When a value can have multiple possible types, TypeScript uses control flow to narrow it.

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(0));
  }
}
```

“Narrowing” is one of the most important TypeScript ideas because it connects runtime checks to static certainty. It is prominent in the official handbook for that reason. ([TypeScript][4])

#### 3.7 Generics

Generics let you write reusable logic while preserving type information.

```ts
function identity<T>(value: T): T {
  return value;
}
```

This is crucial for libraries, utility functions, collections, and framework APIs.

#### 3.8 Modules

TypeScript uses JavaScript module concepts. A file with a top-level `import` or `export` is treated as a module, just as in ECMAScript module systems. ([TypeScript][5])

```ts
export function sum(a: number, b: number) {
  return a + b;
}
```

```ts
import { sum } from "./math";
```

#### 3.9 Declaration files

One of TypeScript’s most important ecosystem features is the ability to describe existing JavaScript libraries with type declarations. That allows TypeScript projects to use JavaScript libraries with strong editor support and checking, even if the library itself is written in JavaScript. This is a major reason TS can coexist with JS rather than requiring a total rewrite of the ecosystem. ([TypeScript][4])

### TypeScript vs JavaScript

| Aspect                  | JavaScript                                           | TypeScript                                                             |
| ----------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| Nature                  | Runtime language executed by browsers and runtimes   | Development language layer that compiles to JavaScript                 |
| Standardization         | Standardized as ECMAScript                           | Maintained by Microsoft; built on JavaScript                           |
| Type system             | Dynamic typing                                       | Static typing with optional annotations and inference                  |
| Error detection         | Many errors appear at runtime                        | Many errors can be caught before runtime                               |
| Tooling                 | Good, but less precise in large systems              | Strong editor tooling, autocomplete, refactoring, navigation           |
| Learning curve          | Lower initial barrier                                | Higher initial barrier because of types and compiler concepts          |
| Build step              | Often none for small scripts                         | Usually requires checking/transpilation step                           |
| Best for                | Small scripts, quick prototypes, runtime-native work | Large apps, shared codebases, library authoring, long-term maintenance |
| Runtime cost            | Direct execution                                     | No type-system runtime cost after compilation, since types are erased  |
| Ecosystem compatibility | Native ecosystem                                     | Designed to interoperate with JS ecosystem                             |

This comparison follows directly from TypeScript’s own definition of itself, plus the fact that JavaScript modules and runtime semantics remain the execution target. ([TypeScript][1])

### Strengths of TypeScript

TypeScript is especially valuable in medium and large codebases. It improves maintainability, makes APIs more self-documenting, and gives better support for refactoring. When code is passed between many files or many developers, these benefits compound. The official TypeScript site emphasizes “better tooling at any scale,” which captures this well. ([TypeScript][1])

It is also strong for library design. A well-typed public API gives users autocomplete, parameter hints, and better compile-time guidance. This makes a library easier to use correctly, even before reading full documentation. Declaration files and the broader type ecosystem are important here. ([TypeScript][4])

### Weaknesses or costs of TypeScript

TypeScript is not free. It adds compiler configuration, type design overhead, and conceptual complexity. In small or short-lived scripts, that overhead may not be worth it. A five-line browser utility often does not need generics, interfaces, and compiler settings. This is one reason plain JavaScript remains highly relevant. ([TypeScript][1])

It also introduces a second layer of thinking: not only “does this run?” but also “does the type system understand this correctly?” That extra discipline is often valuable, but it can slow beginners or overcomplicate tiny projects.

### How TypeScript interacts with JavaScript

This is one of the most important parts.

#### 7.1 TypeScript compiles to JavaScript

TypeScript code is normally transformed into JavaScript before execution. So the browser or Node.js still runs JavaScript, not TypeScript itself. ([TypeScript][1])

#### 7.2 TypeScript uses JavaScript module rules

TypeScript follows JavaScript module structure closely. The TypeScript docs state that a file with a top-level `import` or `export` is a module, matching ECMAScript 2015 module logic. MDN likewise explains modern JavaScript modules as a native browser feature. ([TypeScript][5])

#### 7.3 TypeScript can consume JavaScript code

A TypeScript project can import JavaScript modules. If type information is available, TypeScript can check usage more accurately. If not, you may still use the module, but with weaker guarantees unless you add or install declaration files. ([TypeScript][4])

#### 7.4 JavaScript projects can gradually adopt TypeScript

You do not need a total rewrite. A common path is:

1. keep most files in `.js`
2. introduce TypeScript configuration
3. add type checking gradually
4. convert selected files to `.ts` or `.tsx`
5. add declarations for important JavaScript modules

This gradual migration model is a major reason TypeScript adoption has been practical in real projects. The official docs explicitly include migration guidance and documentation for JavaScript programmers. ([TypeScript][4])

#### 7.5 Type declarations bridge the two ecosystems

Type declaration files, usually `.d.ts`, describe the shape of JavaScript code. They make JavaScript libraries feel “native” inside TypeScript development. This is one of the main technical mechanisms by which TS and JS interact. ([TypeScript][4])

### Practical examples of TS/JS interaction

#### Example A: TS calling JS

JavaScript file:

```js
// math.js
export function multiply(a, b) {
  return a * b;
}
```

TypeScript file:

```ts
import { multiply } from "./math.js";

const result = multiply(3, 4);
```

This works, but without explicit type declarations, the compiler may have limited knowledge of the exact contract.

#### Example B: add a declaration

```ts
// math.d.ts
export function multiply(a: number, b: number): number;
```

Now TypeScript can type-check calls to the JavaScript function much more precisely.

#### Example C: TS output consumed as JS

TypeScript source:

```ts
export function square(x: number): number {
  return x * x;
}
```

Emitted JavaScript:

```js
export function square(x) {
  return x * x;
}
```

The runtime consumer only sees JavaScript.

### When to choose JavaScript

Choose JavaScript when:

* the project is very small
* speed of setup matters more than long-term maintainability
* the code is mostly exploratory or disposable
* you are writing simple browser snippets or automation scripts
* you want zero build complexity

JavaScript remains the universal execution layer and still dominates usage broadly. Stack Overflow’s 2024 survey described it as the most popular programming language for most survey years, and the 2025 survey still shows JavaScript with broader reported use than TypeScript among respondents. ([survey.stackoverflow.co][6])

### When to choose TypeScript

Choose TypeScript when:

* the project will grow
* several developers will maintain it
* the API surface is large
* correctness and refactoring matter
* editor tooling quality matters
* you are building libraries, frameworks, UI applications, or shared infrastructure

This is especially true for modern web application codebases, where component props, state models, server contracts, and utility functions benefit from explicit structure. TypeScript’s design and documentation are clearly aimed at this use case. ([TypeScript][1])

### Technical development trends

The broad trend is not “TypeScript replaces JavaScript.” The real trend is “JavaScript remains the runtime foundation, while TypeScript becomes a dominant authoring layer for larger systems.” TypeScript’s role has strengthened because developers want stronger tooling, while JavaScript remains unavoidable because it is the execution target. ([TypeScript][1])

A second trend is the continued normalization of native JavaScript modules. MDN notes that modern browsers support module features natively, which reduces the conceptual gap between language-level modularity and application structure. This matters for both JS and TS, because TypeScript models JavaScript modules rather than inventing a separate module world. ([developer.mozilla.org][3])

A third trend is faster toolchains. The 2024 State of JavaScript data notes strong momentum for Vite and also highlights tools such as Rspack and Rolldown, while build ecosystems increasingly emphasize speed and developer experience. In practice, this supports TypeScript adoption because the historical complaint that typed front-end builds are too slow is being reduced by better tooling. ([2024.stateofjs.com][7])

A fourth trend is that JavaScript remains massively used even as TypeScript grows. In Stack Overflow’s 2025 survey language section, JavaScript shows broader usage than TypeScript among respondents, while TypeScript still appears as a major language rather than a niche one. That indicates coexistence, not replacement. ([survey.stackoverflow.co][8])

So the technical trajectory can be summarized like this:

* JavaScript remains the runtime and standards base
* TypeScript continues growing as the preferred large-project authoring layer
* native ESM (ECMAScript modules) is now normal
* tooling is becoming faster and more integrated
* gradual migration from JS to TS remains common and practical ([developer.mozilla.org][2])

## Start to Use TypeScript

Main point: TypeScript is a development language for writing safer JavaScript. You write `.ts` or `.tsx`, TypeScript checks the code and emits JavaScript, and that JavaScript is what actually runs in the browser, Node.js, Deno, or Bun. ([typescriptlang.org][1])

### The lifecycle of using TypeScript

A normal TypeScript workflow looks like this:

1. create a project
2. install TypeScript
3. create a `tsconfig.json`
4. write `.ts` or `.tsx` source files
5. run the TypeScript compiler
6. get `.js` output
7. run or ship the JavaScript
8. repeat with watch mode during development

That is the whole cycle. TypeScript does most of its work at compile time. JavaScript does the runtime work. ([typescriptlang.org][2])

A useful mental model is:

* TypeScript = authoring and checking
* JavaScript = execution

### Install TypeScript

The standard way is to add TypeScript as a development dependency in your project, then run it locally with `npx`. The official installation page supports both global and local installation, but local installation is usually better for project consistency. ([typescriptlang.org][1])

Create a new project:

```bash
mkdir my-ts-project
cd my-ts-project
npm init -y
npm install --save-dev typescript
```

Check that the compiler is available:

```bash
npx tsc --version
```

### Initialize the project

Create a TypeScript config file:

```bash
npx tsc --init
```

This generates `tsconfig.json`, which marks the directory as a TypeScript project and controls how the compiler finds files and emits output. A `tsconfig.json` file is the root configuration file for a TypeScript or JavaScript project. ([typescriptlang.org][3])

A simple project layout is:

```text
my-ts-project/
  src/
    index.ts
  dist/
  package.json
  tsconfig.json
```

### Write your first TypeScript file

Create `src/index.ts`:

```ts
const message: string = "Hello TypeScript";

function add(a: number, b: number): number {
  return a + b;
}

console.log(message);
console.log(add(2, 3));
```

This looks almost like JavaScript, but with type annotations such as `: string` and `: number`.

### Configure compilation with `tsconfig.json`

A good beginner configuration is:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "sourceMap": true
  },
  "include": ["src"]
}
```

What these options do:

* `target`: which JavaScript version to emit
* `module`: which module system to use
* `rootDir`: where your TypeScript source lives
* `outDir`: where compiled JavaScript goes
* `strict`: enables stricter type checking
* `sourceMap`: helps debugging generated JavaScript

These are standard TSConfig options documented in the TSConfig reference. ([typescriptlang.org][3])

A practical note: recent TypeScript release notes indicate that `rootDir` behavior has changed in TypeScript 6.0, so explicitly setting `rootDir` is now a safer and clearer choice for many projects. ([typescriptlang.org][4])

### Compile TypeScript to JavaScript

To compile the whole project, run:

```bash
npx tsc
```

When you run `tsc` with no file arguments, it compiles the nearest project defined by `tsconfig.json`. ([typescriptlang.org][2])

If your config uses `rootDir: "./src"` and `outDir: "./dist"`, then after compilation you will typically get:

```text
dist/
  index.js
  index.js.map
```

The emitted `index.js` is plain JavaScript.

### Run the compiled JavaScript

### In Node.js

Run the emitted file directly:

```bash
node dist/index.js
```

### In the browser

Load the compiled JavaScript with a script tag, usually as a module if you are using ES modules:

```html
<script type="module" src="./dist/index.js"></script>
```

At this stage the browser is not seeing TypeScript. It is only seeing JavaScript. TypeScript’s job ended at compilation. ([typescriptlang.org][5])

### Use watch mode during development

For active development, use watch mode:

```bash
npx tsc --watch
```

This tells the compiler to keep running and rebuild whenever source files change. The CLI documentation includes watch-related usage as part of normal `tsc` workflows. ([typescriptlang.org][2])

This is one of the easiest development loops:

1. edit `src/*.ts`
2. save
3. TypeScript recompiles
4. run or refresh the generated JavaScript

### Understand `.ts`, `.tsx`, and modules

Use `.ts` for normal TypeScript files.

Use `.tsx` when the file contains JSX, such as in React code. The TypeScript documentation on migration and modules reflects this distinction. ([typescriptlang.org][6])

TypeScript follows JavaScript module rules closely. A file with `import`, `export`, or top-level `await` is treated as a module. A file without them is treated as a script. If you want a file to be treated as a module even though it exports nothing, you can add:

```ts
export {};
```

That behavior is documented in the modules handbook. ([typescriptlang.org][5])

### A complete minimal example

Project structure:

```text
my-ts-project/
  src/
    math.ts
    index.ts
  tsconfig.json
  package.json
```

`src/math.ts`

```ts
export function add(a: number, b: number): number {
  return a + b;
}
```

`src/index.ts`

```ts
import { add } from "./math";

console.log(add(2, 3));
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src"]
}
```

Compile:

```bash
npx tsc
```

Run:

```bash
node dist/index.js
```

This is the smallest full TypeScript workflow: source, config, compile, run.

### Start TypeScript in an existing JavaScript project

TypeScript does not require a full rewrite.

The official migration guide presents gradual migration as a normal path. One of the simplest first steps is to rename a JavaScript file from `.js` to `.ts`, then start fixing the type errors one file at a time. The same applies to `.jsx` becoming `.tsx` when JSX is involved. ([typescriptlang.org][6])

A practical migration path is:

1. install TypeScript
2. add `tsconfig.json`
3. convert one important file to `.ts`
4. add basic types to functions and objects
5. compile and fix errors
6. keep converting files incrementally

This gradual method is usually better than a full rewrite.

### Use TypeScript with JavaScript instead of against JavaScript

TypeScript is designed to work with JavaScript, not replace it completely.

You have at least three common ways to use it:

### A. Write TypeScript and emit JavaScript

This is the standard full TypeScript workflow.

### B. Gradually migrate a JavaScript project

This is the official migration path. ([typescriptlang.org][6])

### C. Keep writing JavaScript but use TypeScript tooling

TypeScript can also support JavaScript projects through JSDoc and type-aware tooling. It can even generate `.d.ts` declaration files from JavaScript in certain setups. ([typescriptlang.org][7])

That means you do not always need to convert everything to `.ts` immediately to gain value.

### What the compiler actually does

The TypeScript compiler, `tsc`, does two main jobs:

* type checking
* emitting output files

Depending on your configuration, it can emit:

* `.js`
* source maps
* declaration files such as `.d.ts`

Declaration files describe types without including runtime implementations. They are how TypeScript models external libraries and shared API shapes. ([typescriptlang.org][8])

For normal application development, the main artifact is the compiled `.js`. For library development, `.d.ts` files are often important as well. ([typescriptlang.org][9])

### The commands you will use most

Install TypeScript:

```bash
npm install --save-dev typescript
```

Initialize config:

```bash
npx tsc --init
```

Compile the project:

```bash
npx tsc
```

Compile with watch mode:

```bash
npx tsc --watch
```

Compile a specific project config:

```bash
npx tsc --project tsconfig.json
```

A key detail from the CLI docs: if you pass files directly on the command line, `tsconfig.json` is ignored. For example:

```bash
npx tsc src/index.ts
```

This compiles with compiler defaults instead of your project config. The CLI documentation explicitly states that when input files are specified, `tsconfig.json` files are ignored. ([typescriptlang.org][2])

This is a very common source of confusion.

### A good beginner workflow

A clean beginner workflow is:

1. create `src/`
2. write `.ts` files there
3. set `outDir` to `dist/`
4. run `npx tsc --watch`
5. run the JavaScript in `dist/`

This gives you clear separation between source and output, which the migration guide also emphasizes as important to avoid overwriting source files. ([typescriptlang.org][6])

### What to learn next after the basics

Once the basic compile-run loop is comfortable, the next concepts worth learning are:

* basic types
* object types
* function typing
* unions
* narrowing
* generics
* modules
* utility types
* declaration files for libraries

The official docs organize the language and project features in these broad areas as well. ([typescriptlang.org][1])

### Final model

The most useful summary is:

* write TypeScript in `src/`
* compile with `tsc`
* get JavaScript in `dist/`
* run the JavaScript
* let TypeScript help you during development

TypeScript is best understood as a structured development layer over JavaScript, not as a replacement runtime. ([typescriptlang.org][1])

## Bibliography

Microsoft. “TypeScript: JavaScript With Syntax for Types.” TypeScript. Accessed April 14, 2026. <https://www.typescriptlang.org/>

Microsoft. “TypeScript: Documentation - tsc CLI Options.” TypeScript Documentation. Accessed April 14, 2026. <https://www.typescriptlang.org/docs/handbook/compiler-options.html>

Microsoft. “TypeScript: TSConfig Reference - Docs on Every TSConfig Option.” TypeScript Documentation. Accessed April 14, 2026. <https://www.typescriptlang.org/tsconfig/>

Microsoft. “TypeScript: Documentation - Modules.” TypeScript Documentation. Accessed April 14, 2026. <https://www.typescriptlang.org/docs/handbook/2/modules.html>

Microsoft. “TypeScript: Documentation - Migrating from JavaScript.” TypeScript Documentation. Accessed April 14, 2026. <https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html>

Microsoft. “TypeScript: Documentation - Creating .d.ts Files from .js Files.” TypeScript Documentation. Accessed April 14, 2026. <https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html>

Microsoft. “TypeScript: Documentation - Type Declarations.” TypeScript Documentation. Accessed April 14, 2026. <https://www.typescriptlang.org/docs/handbook/2/type-declarations.html>

Microsoft. “TypeScript: Documentation - Modules .d.ts.” TypeScript Documentation. Accessed April 14, 2026. <https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html>

Microsoft. “TypeScript: Documentation - TypeScript 6.0.” TypeScript Release Notes. Accessed April 14, 2026. <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html>
