---
category: Notes
title: Coding Aesthetic
tags: Programming
---

Video Course: [Youtube @CodeAesthetic](https://www.youtube.com/@CodeAesthetic)

## Naming Variables

`Don't` name variables with **single letter**.
  - e.g. i, x, y.
  - Code is not a mathematical expression, which are invented for simplicity.

`Don't` **abbreviate** names.
  - Outdated. Context aren't acknowledged.

`Don't` put **types** in variable names.
  - Outdated. Nowadays *static typed languages* could tell you exactly what type a symbol is.

`Show the unit` in the variable name.
  - A better way is implementing a new type，with which users no longer needs to consider the unit.
  - e.g. int Delay() -> int DelaySeconds() -> timeSpan Delay()

`Don't` put types in your types.
  - e.g. AbstractX, BaseX, InterfaceX.
  - Users won't care about this.

`Refactor` if there are **"Utils"**.
  - In most cases, these codes could be included in the specific classes, or implemented as Generic Classes.
  - Additionally, abstracting general patterns and building own utility packages are important abilities for programmers.

## Comments and Documentation

### Code is a bettter way to express intent about code

In Conditional Statement `if`:
  - Create a well-named constant to represent the variable instead.
    - e.g. "if status == 5: ## MESSAGE_SENT" -> "if status == MESSAGE_SENT:", where "MESSAGE_SENT" is 5.
  - When the conditions is too long or complicated, better to create a well-named function to replace the condition than comments.
    - e.g. "if can_do_sth?():"

Use built-in functions of a language to state the situation of code.
  - Better to `throw Exceptions or Errors` than using comments to tell you what is invalid.

Comments can **lie**, and **get bugs** like code.
  - There's no way to test comments.
  - Comments may be not kept updated when code changes.

Don't comment, unless there is:
  1. **Non obvious** Performance Optimization.
  2. Reference to Math or Algorithms.

### Documentation v.s. Comments

Code documentation tells how code **is used**, by describing the high-level architecutre and public APIs of a system.
  - What to document: 
    - what a class or API represents; 
    - Interface expectations: thread safety, possible states, error conditions.

Comments tell you how code **worked**.

## Abstraction

Abstraction is not always worth it, as it increases **coupling** and makes the code harder to understand.

Two conditions that abstraction will be worthy:
  - Re-use codes among 3 more instances.
  - One will **call** the methods, but didn't know which instance.

Some duplicated codes are not evil.

## Prefer Composition Over Inheritance

`Composition` and `Inheritance` are both ways to re-use codes.

Changing code may breaks the original structure
  - `Inheritance` forces coders bunlde common parts of classes into a parent class, then when a exceptional child class appears, the entire code needs refactoring.
  - `Composition` means abstract classes are no longer used, the original class is splited into a class which simply represent the object(data), and multiple method classes which manipulate the object(data). Interfaces are used to indicate which methods could be 

`Interfaces` v.s.` Abstract Classes`
  - `Interfaces` are **minimal**, tell you what these classes **can do** (like a sign).
  - `Abstract Classes` tells you **what methods should be implemented at least**. When exceptional class appears, some part would be redundant, and the whole code would be difficult to change.

```java
// Inheritance

abstract class Parent
{
  private data = new DataGenerator(args);
  public abstract void Procedure(args); ## thing might be redundant
}

class Child: Parent
{
  public override void Procedure(args){...}
}

// Composition

interface Procedure
{
  public abstract void Procedure(args);
}

class ClassWhoNeedTheProcedure: Procedure
{
  private data = new DataGenerator(args);
  public override void Procedure(args){...}
}
```

## Never Nests

> *Linux Kernel Guidelines*: If you need more than 3 levels of indentation, you're screwed anyway,and should fix your program.

2 ways to denest:
  - **Extracting** some blocks into a separated functions.
  - **Inversing conditions**.
    - Some validation gatekeeping sections will end code with `return` or `Exception`, which shield core code. Try inversing the conditions, list these terminators firstly, and remaining core code in the end.

## Premature Optimization

> Donald Knuth: Premature / ˈpremətʃə(r) / Optimization is the root of all evil.

The Impossible Trinity in Coding:
  - Performance
  - Velocity
  - Adaptability

2 level of Performance:
  - **Macro Performance** at design level.
  - **Micro Performance**, it means whether the code is fine tuned. *Premature optimization usually occurs for micro performance*.

Optimization is not the most important thing. Until you've shown that the function specifically is the leading cause of performance issues, go with what's more readable.

How to optimize
  1. Have a **real** performance problem
  2. **Measure**.
  3. Make 80% moves (data structure). **Measure**.
  4. Profile and fix hot spots. **Measure**.
  5. Analyze what the code is doing under the hood & Memory. **Measure**.
