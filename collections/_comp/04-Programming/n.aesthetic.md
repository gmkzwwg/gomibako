---
title: Coding Aesthetic
categories: Notes
subclass: Programming
todo: 用代码理解代码美学，真正地看到权衡利弊，而不是单纯对概念泛泛而谈
---

## Naming

`Don't` name variables with **single letter**.
* e.g. i, x, y.
* Code is not a mathematical expression, which are invented for simplicity.

`Don't` **abbreviate** names.
* Outdated. Context aren't acknowledged.

`Don't` put **types** in variable names.
* Outdated. Nowadays *static typed languages* could tell you exactly what type a symbol is.

`Show the unit` in the variable name.
* A better way is implementing a new type，with which users no longer needs to consider the unit.
* e.g. int Delay() -> int DelaySeconds() -> timeSpan Delay()

`Don't` put types in your types.
* e.g. AbstractX, BaseX, InterfaceX.
* Users won't care about this.

`Refactor` if there are **"Utils"**.
* In most cases, these codes could be included in the specific classes, or implemented as Generic Classes.
* Additionally, abstracting general patterns and building own utility packages are important abilities for programmers.

## Commenting

#### Code is a bettter way to express intent about code

In Conditional Statement `if`:
* Create a well-named constant to represent the variable instead.
  * e.g. "if status == 5: ### MESSAGE_SENT" -> "if status == MESSAGE_SENT:", where "MESSAGE_SENT" is 5.
* When the conditions is too long or complicated, better to create a well-named function to replace the condition than comments.
  * e.g. "if can_do_sth?():"

Use built-in functions of a language to state the situation of code.
* Better to `throw Exceptions or Errors` than using comments to tell you what is invalid.

Comments can **lie**, and **get bugs** like code.
* There's no way to test comments.
* Comments may be not kept updated when code changes.

Don't comment, unless there is:
  1. **Non obvious** Performance Optimization.
  2. Reference to Math or Algorithms.

#### Documentation v.s. Comments

Code documentation tells how code **is used**, by describing the high-level architecutre and public APIs of a system.
* What to document:
  * what a class or API represents;
  * Interface expectations: thread safety, possible states, error conditions.

Comments tell you how code **worked**.

## Nesting and Conditioning

**Definition**: This guide explains how to use **conditional logic**, **nesting**, and **code depth** well. The goal is not to eliminate nesting completely. The goal is to make code easy to read, easy to change, and hard to break.

**Conclusion**: Deep nesting is not always wrong. It becomes a problem when it hides the structure of the program, mixes too many concerns, or makes errors hard to detect. Good code keeps structure visible, limits depth, and isolates complexity.

### 1. Why nesting becomes a problem

**Background**: Nesting appears whenever one block is placed inside another block. This happens in many languages:
* `if` inside `if`
* loops inside conditionals
* UI elements inside containers
* helper calls inside other expressions

Nesting is natural. The problem begins when a reader must mentally track too many layers at once.

Badly nested code usually causes three things:
* structure becomes hard to see
* bugs become easier to introduce
* changes become more expensive

For example, this Python code is valid, but difficult to scan:

```python
def process_orders(orders, user):
    if user is not None:
        if user.is_active:
            if orders:
                for order in orders:
                    if order.is_paid:
                        if not order.is_shipped:
                            if order.total > 100:
                                print(f"Priority order: {order.id}")
```

A reader must track many nested conditions before reaching the actual action.

### 2. The main principle: make the shape of the code obvious

**Analysis**: Good code lets the reader answer these questions quickly:
* What is the main path?
* What are the exceptional cases?
* Where does each block begin and end?
* What part is structure, and what part is logic?

When these answers are not obvious, the code is too tangled.

Compare the earlier example with this version:

```python
def process_orders(orders, user):
    if user is None:
        return

    if not user.is_active:
        return

    if not orders:
        return

    for order in orders:
        if not order.is_paid:
            continue

        if order.is_shipped:
            continue

        if order.total <= 100:
            continue

        print(f"Priority order: {order.id}")
```

This version is flatter. The logic is the same, but the structure is much clearer.

**Conclusion**: Prefer code that reveals the main flow early and pushes exceptional cases out of the way.

### 3. Deep nesting is not automatically bad

**Definition**: Nesting is justified when the problem itself is hierarchical.

Examples include:
* tree traversal
* recursive parsing
* nested menus
* document structures
* JSON-like data with real parent-child depth

For example, recursive traversal is naturally nested:

```python
def print_tree(node, level=0):
    print("  " * level + node["name"])
    for child in node.get("children", []):
        print_tree(child, level + 1)
```

This is acceptable because the data is genuinely nested.

**Conclusion**: Nesting is fine when it matches the shape of the data or the problem. It is poor style when it exists only because logic was piled together carelessly.

### 4. A practical rule: avoid making the reader track two structures at once

**Analysis**: One common source of confusion is forcing the reader to track two separate hierarchies at the same time.

For example, in frontend code, this often happens when **business rules** and **UI structure** are interwoven too tightly.

A React example:

```jsx
function Dashboard({ user, reports }) {
  return (
    <div>
      {user ? (
        user.isAdmin ? (
          reports.length > 0 ? (
            <section>
              {reports.map(report =>
                report.isPublished ? (
                  <article key={report.id}>{report.title}</article>
                ) : null
              )}
            </section>
          ) : (
            <p>No reports available.</p>
          )
        ) : (
          <p>Access denied.</p>
        )
      ) : (
        <p>Please sign in.</p>
      )}
    </div>
  );
}
```

This is not impossible to read, but it is harder than necessary because UI nesting and conditional nesting are tightly mixed.

A clearer version:

```jsx
function Dashboard({ user, reports }) {
  if (!user) {
    return <p>Please sign in.</p>;
  }

  if (!user.isAdmin) {
    return <p>Access denied.</p>;
  }

  const publishedReports = reports.filter(report => report.isPublished);

  if (publishedReports.length === 0) {
    return <p>No reports available.</p>;
  }

  return (
    <section>
      {publishedReports.map(report => (
        <article key={report.id}>{report.title}</article>
      ))}
    </section>
  );
}
```

**Conclusion**: Separate structural layout from branching logic whenever possible.

### 5. The most useful technique: handle special cases early

**Definition**: This is often called a **guard clause** or **early return** pattern.

Instead of wrapping the main logic in many layers of `if`, reject invalid cases first.

Bad:

```javascript
function sendEmail(user, message) {
  if (user) {
    if (user.email) {
      if (message) {
        if (message.length <= 500) {
          emailService.send(user.email, message);
        }
      }
    }
  }
}
```

Better:

```javascript
function sendEmail(user, message) {
  if (!user) return;
  if (!user.email) return;
  if (!message) return;
  if (message.length > 500) return;

  emailService.send(user.email, message);
}
```

This pattern reduces indentation and emphasizes the actual action.

**Conclusion**: Use early exits to keep the main path flat.

### 6. One block should answer one question

**Analysis**: Deep nesting often appears because one function is trying to answer many questions at once.

For example:

```python
def handle_request(request, user, database):
    if request.method == "POST":
        if user is not None:
            if user.has_permission("create"):
                if request.data is not None:
                    if "title" in request.data:
                        if len(request.data["title"]) > 3:
                            database.save(request.data)
                            return {"status": "ok"}
    return {"status": "error"}
```

This function mixes several concerns:
* request method validation
* user existence
* permission checking
* payload validation
* persistence

A clearer version:

```python
def is_valid_title(data):
    return data is not None and "title" in data and len(data["title"]) > 3


def handle_request(request, user, database):
    if request.method != "POST":
        return {"status": "error", "reason": "invalid method"}

    if user is None:
        return {"status": "error", "reason": "missing user"}

    if not user.has_permission("create"):
        return {"status": "error", "reason": "forbidden"}

    if not is_valid_title(request.data):
        return {"status": "error", "reason": "invalid data"}

    database.save(request.data)
    return {"status": "ok"}
```

**Conclusion**: If nesting becomes deep, the usual reason is that responsibilities were not separated.

### 7. Prefer named intermediate variables over complex inline logic

**Problem**: Code becomes hard to read when too much logic is placed directly inside a condition.

Bad:

```java
if (customer != null && customer.getAccount() != null &&
    customer.getAccount().isActive() &&
    customer.getOrders() != null &&
    customer.getOrders().size() > 0) {
    process(customer);
}
```

Better:

```java
boolean hasCustomer = customer != null;
boolean hasAccount = hasCustomer && customer.getAccount() != null;
boolean isActive = hasAccount && customer.getAccount().isActive();
boolean hasOrders = hasCustomer && customer.getOrders() != null && !customer.getOrders().isEmpty();

if (hasCustomer && hasAccount && isActive && hasOrders) {
    process(customer);
}
```

Or better still:

```java
if (canProcess(customer)) {
    process(customer);
}
```

with:

```java
boolean canProcess(Customer customer) {
    if (customer == null) return false;
    if (customer.getAccount() == null) return false;
    if (!customer.getAccount().isActive()) return false;
    if (customer.getOrders() == null || customer.getOrders().isEmpty()) return false;
    return true;
}
```

**Conclusion**: A condition should be easy to read as a sentence. If it is not, extract part of it.

### 8. Keep branching at the right level

**Analysis**: Not every branch belongs in the same place. Some branches decide **structure**. Others decide **details**.

For example, in a web endpoint:
* high-level branch: admin user vs normal user
* low-level branch: show one label or another

Good separation:

```python
def render_dashboard(user):
    if user.is_admin:
        return render_admin_dashboard(user)
    return render_user_dashboard(user)
```

Then inside a smaller rendering function:

```python
def render_user_badge(user):
    return "Pro" if user.is_pro else "Free"
```

This is better than writing one giant function full of mixed branches.

**Conclusion**: High-level conditions should choose large modes or paths. Low-level conditions should control small details.

### 9. A common code smell: “staircase code”

**Definition**: Staircase code is code that shifts farther right with each condition and makes the main action appear only at the deepest point.

Example:

```python
if condition_a:
    if condition_b:
        if condition_c:
            if condition_d:
                do_work()
```

This shape often suggests poor structure.

Possible fixes:
* use guard clauses
* extract helper functions
* invert conditions
* split the function

For example:

```python
if not condition_a:
    return

if not condition_b:
    return

if not condition_c:
    return

if not condition_d:
    return

do_work()
```

### 10. Another common smell: mixing loops, conditions, and side effects

**Problem**: Nesting becomes dangerous when a loop contains conditionals, which contain data mutation, which contain more conditionals.

Example:

```javascript
for (const user of users) {
  if (user.isActive) {
    if (user.orders) {
      for (const order of user.orders) {
        if (order.total > 100) {
          if (!order.flagged) {
            order.flagged = true;
            save(order);
          }
        }
      }
    }
  }
}
```

A clearer version:

```javascript
for (const user of users) {
  if (!user.isActive || !user.orders) continue;

  for (const order of user.orders) {
    if (order.total <= 100 || order.flagged) continue;

    order.flagged = true;
    save(order);
  }
}
```

This version is flatter and makes the mutation easier to find.

### 11. Reasonable depth: how deep is too deep?

**Analysis**: There is no universal numeric rule, but some practical guidelines are useful.

A rough rule:
* 1 to 2 levels: usually fine
* 3 levels: still normal, but inspect readability
* 4 levels: often a warning sign
* 5 or more levels: usually restructure unless the problem is inherently hierarchical

This is not a law. It is a heuristic.

For example, this may be acceptable in a parser:

```python
for token in tokens:
    if token.type == "BLOCK":
        for statement in token.statements:
            if statement.kind == "IF":
                for branch in statement.branches:
                    handle(branch)
```

But the same depth in ordinary business logic usually needs refactoring.

**Conclusion**: Do not count levels mechanically. Ask whether each level reflects real structure or accidental complexity.

### 12. Prefer complete blocks over fragmented blocks

**Analysis**: A common mistake is to let one control structure open a region and let another distant line close it indirectly. This makes code fragile.

Bad style in many languages looks like this in spirit:

```python
if show_section:
    print("<section>")

for item in items:
    print(item)

if show_section:
    print("</section>")
```

The reader must remember that the closing tag depends on a condition seen earlier.

Better:

```python
if show_section:
    print("<section>")
    for item in items:
        print(item)
    print("</section>")
else:
    for item in items:
        print(item)
```

Or better, separate the rendering concerns into helper functions.

**Conclusion**: Prefer self-contained blocks. Do not split one structural unit across distant conditions unless there is a strong reason.

### 13. Refactor by extracting intent, not just lines

**Problem**: Some refactoring makes code shorter without making it clearer.

Bad original:

```python
if user is not None:
    if user.is_active:
        if user.age >= 18:
            approve(user)
```

Weak refactor:

```python
if user is not None and user.is_active and user.age >= 18:
    approve(user)
```

This is shorter, but not necessarily more readable.

Better refactor:

```python
def can_be_approved(user):
    if user is None:
        return False
    if not user.is_active:
        return False
    if user.age < 18:
        return False
    return True


if can_be_approved(user):
    approve(user)
```

This version gives the condition a name. That improves meaning.

**Conclusion**: Refactoring should reveal intent, not merely compress syntax.

### 14. Use polymorphism or dispatch when branching becomes repetitive

**Analysis**: Sometimes too many `if` or `switch` statements indicate that behavior should be delegated.

Bad:

```python
def calculate_discount(customer):
    if customer.type == "student":
        return 0.10
    elif customer.type == "senior":
        return 0.15
    elif customer.type == "vip":
        return 0.20
    else:
        return 0.0
```

This is acceptable when small. But when each branch grows large, another pattern may be better.

For example:

```python
class StudentDiscount:
    def calculate(self):
        return 0.10


class SeniorDiscount:
    def calculate(self):
        return 0.15


class VipDiscount:
    def calculate(self):
        return 0.20
```

Or use a dispatch table:

```python
DISCOUNT_BY_TYPE = {
    "student": 0.10,
    "senior": 0.15,
    "vip": 0.20,
}

def calculate_discount(customer):
    return DISCOUNT_BY_TYPE.get(customer.type, 0.0)
```

**Conclusion**: When many branches repeat the same structural pattern, consider replacing conditional complexity with data or delegated behavior.

### 15. Good examples and bad examples across languages

#### Python

Bad:

```python
def register(user):
    if user:
        if user.email:
            if "@" in user.email:
                save(user)
```

Better:

```python
def register(user):
    if not user or not user.email or "@" not in user.email:
        return
    save(user)
```

#### JavaScript

Bad:

```javascript
function render(items) {
  if (items) {
    if (items.length > 0) {
      return items.map(item => `<li>${item}</li>`).join("");
    } else {
      return "<p>No items</p>";
    }
  } else {
    return "<p>No data</p>";
  }
}
```

Better:

```javascript
function render(items) {
  if (!items) return "<p>No data</p>";
  if (items.length === 0) return "<p>No items</p>";
  return items.map(item => `<li>${item}</li>`).join("");
}
```

#### Java

Bad:

```java
if (order != null) {
    if (order.isPaid()) {
        if (!order.isCancelled()) {
            ship(order);
        }
    }
}
```

Better:

```java
if (order == null) return;
if (!order.isPaid()) return;
if (order.isCancelled()) return;

ship(order);
```

### 16. When to keep nested `if` statements

**Analysis**: Nested `if` statements are acceptable when each inner level logically depends on the outer level and the dependency itself is meaningful.

Example:

```python
if response.status_code == 200:
    data = response.json()
    if "user" in data:
        user = data["user"]
        if user.get("is_active"):
            activate_session(user)
```

This is not automatically bad because each step depends on the previous one. Still, if the block grows much larger, it should be simplified.

A flatter version may still be clearer:

```python
if response.status_code != 200:
    return

data = response.json()
user = data.get("user")

if not user:
    return

if not user.get("is_active"):
    return

activate_session(user)
```

### 17. Style rules that work well in most codebases

**Conclusion**: The following rules are practical and widely useful.

**Rule 1**: Use **guard clauses** for invalid or exceptional cases.

**Rule 2**: Keep the **main path** visually obvious.

**Rule 3**: Do not let ordinary business logic drift past **3 to 4 levels** of nesting without checking whether it should be refactored.

**Rule 4**: Extract helper functions when a block is answering more than one question.

**Rule 5**: Replace complicated inline conditions with **named variables** or **well-named predicates**.

**Rule 6**: Keep high-level branching separate from low-level detail branching.

**Rule 7**: Prefer complete, self-contained blocks over fragmented structural logic.

**Rule 8**: If nesting reflects real hierarchy, it may be correct. If it reflects accumulated clutter, it should be reduced.

### 18. A simple refactoring checklist

**Next Step**: When a function feels too nested, apply this checklist in order.
1. Can invalid cases be rejected earlier?
2. Can one long condition be given a name?
3. Can repeated logic be moved to a helper?
4. Can high-level mode selection be separated from detailed rendering or processing?
5. Can a data table, dispatch map, or object replace repeated branching?
6. Does the current depth reflect the real problem, or only the current implementation?

### 19. Final rule of thumb

**Conclusion**: Good code does not merely run correctly. It shows its structure clearly. Use nesting where the problem truly requires hierarchy. Reduce nesting where it only hides intent. The best code usually makes the important path easy to see and the exceptional path easy to isolate.

**Common misconceptions**:
1. Shorter code is not always better code.
2. Fewer lines do not necessarily mean lower complexity.
3. A single dense condition may be worse than several simple ones.
4. Deep nesting is acceptable in recursive or hierarchical problems, but often poor in ordinary application logic.
5. Removing indentation is not enough; the real goal is to improve meaning and structure.

I can also turn this into a more formal **style-guide chapter** format, with sections like **Principles**, **Anti-patterns**, **Refactoring patterns**, and **Exercises**.

### Abstraction

Abstraction is not always worth it, as it increases **coupling** and makes the code harder to understand.

Two conditions that abstraction will be worthy:
* Re-use codes among 3 more instances.
* One will **call** the methods, but didn't know which instance.

Some duplicated codes are not evil.

### Prefer Composition Over Inheritance

`Composition` and `Inheritance` are both ways to re-use codes.

Changing code may breaks the original structure
* `Inheritance` forces coders bunlde common parts of classes into a parent class, then when a exceptional child class appears, the entire code needs refactoring.
* `Composition` means abstract classes are no longer used, the original class is splited into a class which simply represent the object(data), and multiple method classes which manipulate the object(data). Interfaces are used to indicate which methods could be

`Interfaces` v.s.`Abstract Classes`
* `Interfaces` are **minimal**, tell you what these classes **can do** (like a sign).
* `Abstract Classes` tells you **what methods should be implemented at least**. When exceptional class appears, some part would be redundant, and the whole code would be difficult to change.

```java
// Inheritance

abstract class Parent
{
  private data = new DataGenerator(args);
  public abstract void Procedure(args); ### thing might be redundant
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

### Never Nests

> *Linux Kernel Guidelines*: If you need more than 3 levels of indentation, you're screwed anyway,and should fix your program.

2 ways to denest:
* **Extracting** some blocks into a separated functions.
* **Inversing conditions**.
  * Some validation gatekeeping sections will end code with `return` or `Exception`, which shield core code. Try inversing the conditions, list these terminators firstly, and remaining core code in the end.

### Premature Optimization

> Donald Knuth: Premature / ˈpremətʃə(r) / Optimization is the root of all evil.

The Impossible Trinity in Coding:
* Performance
* Velocity
* Adaptability

2 level of Performance:
* **Macro Performance** at design level.
* **Micro Performance**, it means whether the code is fine tuned. *Premature optimization usually occurs for micro performance*.

Optimization is not the most important thing. Until you've shown that the function specifically is the leading cause of performance issues, go with what's more readable.

How to optimize
  1. Have a **real** performance problem
  2. **Measure**.
  3. Make 80% moves (data structure). **Measure**.
  4. Profile and fix hot spots. **Measure**.
  5. Analyze what the code is doing under the hood & Memory. **Measure**.

### “可阅读、可维护、工业级”应当遵守三个原则

“可阅读、可维护、工业级”代码，不是指代码看起来高级，而是指代码在多人协作、长期迭代、频繁修改时，仍然容易理解、容易修改、不容易出错。要做到这一点，最基本也最有效的三条原则是：

**1. 内容、结构、表现、行为分层。**
**2. 让公共部分只有一个真实来源。**
**3. 把格式化、lint、构建、发布交给自动化。**

这三条原则看起来简单，但它们几乎决定了一个项目会变成“清晰系统”，还是变成“不断堆补丁的大泥团”。

下面用一个个人网站的例子来解释。假设网站有四类页面：
* 首页
* 技术博客
* 简历
* 照片墙

一、为什么要强调“可阅读、可维护、工业级”

先给结论：

可阅读，是为了让人能快速理解代码。
可维护，是为了让修改局部时不破坏整体。
工业级，是为了让项目能在真实开发环境中长期运行，而不是只在作者脑中成立。

很多初学者写代码时，重点放在“能不能跑”。这当然必要，但远远不够。因为真正的成本往往不是第一次写出来，而是后面不断修改：
* 三个月后自己还能不能看懂
* 别人接手能不能继续开发
* 新增功能时要不要复制粘贴一堆旧代码
* 改一个菜单，是否要手动改十个页面
* 上线前是否要靠肉眼检查有没有漏掉错误

如果这些问题处理不好，项目很快就会进入一种状态：小改动越来越难，大重构越来越不敢做。

所以，“工业级”并不等于“大公司技术栈”，而是指代码组织方式具有工程上的稳定性。

二、原则一：内容、结构、表现、行为分层

主点

不要把“写什么”“长什么样”“怎么动”混在同一个文件、同一段代码里。它们应该分别归位。

这四个词分别指什么

内容（content）
指页面真正表达的信息，例如：
* 博客标题与正文
* 简历中的教育经历和项目经历
* 照片墙里的图片说明
* 导航菜单里的文字

结构（structure）
指页面的组织骨架，例如：
* 页头
* 主内容区
* 侧边栏
* 页脚
* 卡片列表
* 文章布局

表现（presentation）
指视觉层，例如：
* 字体
* 颜色
* 间距
* 响应式布局
* 动画
* hover 效果

行为（behavior）
指交互逻辑，例如：
* 点击按钮展开菜单
* 切换深色模式
* 筛选照片
* 搜索文章
* 弹出对话框

为什么必须分层

因为这四类变化的频率不同，修改者也可能不同。

例如：
* 内容编辑者经常改文章，不应碰布局代码
* 设计者经常改样式，不应碰数据逻辑
* 前端工程师经常改交互，不应改每篇文章正文
* 架构者经常改页面骨架，不应逐页复制 HTML

如果四者混在一起，任何小改动都会触碰整块系统。

一个反例

下面是典型的混杂写法：

```html
<div style="padding:20px;background:black;color:#0f0;">
  <h1>My Blog</h1>
  <button onclick="document.getElementById('menu').style.display='block'">Open</button>
  <ul id="menu" style="display:none;">
    <li><a href="/post1">Post 1</a></li>
    <li><a href="/post2">Post 2</a></li>
  </ul>
</div>
```

这里的问题是：
* 内容写在 HTML 里
* 样式写成内联 style
* 行为写成 onclick
* 结构和视觉绑死在一起

这段代码不是不能用，而是很难演化。只要菜单逻辑复杂一点，或者页面多几个，维护成本马上上升。

一个更好的例子

假设用现代站点结构来组织：

```text
src/
  components/
    Header.tsx
    NavMenu.tsx
  content/
    posts/
      hello-world.md
  styles/
    header.css
  data/
    navigation.ts
  pages/
    index.astro
```

对应地：

内容放在 `content/posts/hello-world.md`
结构放在 `Header.tsx` 和页面组件中
表现放在 `header.css`
行为放在 `NavMenu.tsx` 或独立脚本中

例如导航数据：

```ts
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Gallery", href: "/gallery" }
];
```

结构组件：

```tsx
type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  items: NavItem[];
};

export function Header({ items }: HeaderProps) {
  return (
    <header className="site-header">
      <h1 className="site-title">My Site</h1>
      <nav>
        <ul className="nav-list">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

表现层：

```css
.site-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.nav-list {
  display: flex;
  gap: 1rem;
  list-style: none;
}
```

行为层如果要加移动端菜单切换，再放到脚本里，而不是写在 HTML 属性里。

这就是分层的价值：改样式时不用碰数据，改数据时不用碰组件，改行为时不用大改 HTML。

三、原则二：让公共部分只有一个真实来源

主点

一个信息如果在系统里会被重复使用，就不应在多个地方手工重复维护，而应由一个统一来源生成。

这就是 single source of truth。

为什么它重要

因为重复数据会产生漂移。

比如导航菜单，假设你有五个页面：
* 首页
* 博客页
* 简历页
* 照片墙页
* 关于页

如果每个页面都手写导航：

```html
<nav>
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
  <a href="/resume">Resume</a>
  <a href="/gallery">Gallery</a>
</nav>
```

那么有一天你把 “Resume” 改成 “CV”，就要改五遍。只要漏一页，站内就不一致了。

这还只是菜单。更常见的还有：
* 网站标题
* 作者姓名
* 社交链接
* SEO 元信息
* 页脚版权信息
* 主题颜色
* 简历中的技能列表
* 博客标签定义

一个反例

```tsx
// Home page
const siteTitle = "Zoe's Lab";

// Blog page
const siteTitle = "Zoe Lab";

// Resume page
const siteTitle = "Zoe's Portfolio";
```

这种写法看起来问题不大，但它已经埋下不一致的种子。

更好的写法

集中定义：

```ts
export const siteConfig = {
  title: "Zoe's Lab",
  description: "Research, engineering, writing, and photography.",
  author: "Zoe",
  social: {
    github: "https://github.com/example",
    email: "example@example.com"
  }
};
```

然后各处引用：

```tsx
import { siteConfig } from "../data/site-config";

export function Footer() {
  return (
    <footer>
      <p>{siteConfig.title}</p>
      <a href={siteConfig.social.github}>GitHub</a>
    </footer>
  );
}
```

这样一来，只改一处，全站一致。

再举一个更典型的例子：简历页面

错误做法：
在首页写一份“项目经历摘要”，在简历页再手写一份“项目经历完整版”。

后果：
你更新了简历页项目时间，却忘了首页摘要，结果信息冲突。

更好的做法：
把项目经历定义成结构化数据：

```ts
export const projects = [
  {
    slug: "personal-site",
    title: "Personal Site",
    role: "Designer and Developer",
    year: "2026",
    summary: "A personal website with blog, resume, and gallery."
  },
  {
    slug: "research-notes",
    title: "Research Notes System",
    role: "Writer and Maintainer",
    year: "2025",
    summary: "A structured note-taking workflow for interdisciplinary study."
  }
];
```

首页引用其中前两项，简历页引用全部，项目页再单独展开。数据只维护一次。

single source of truth 的本质

它不是“所有东西都塞到一个文件”，而是：
* 一类信息只在一个地方定义
* 其他地方只消费，不重复制造
* 修改点明确
* 一致性有保障

四、原则三：把格式化、lint、构建、发布交给自动化

主点

凡是机器比人更稳定的工作，就不要让人手工反复做。

这条原则往往是“业余项目”和“工业项目”的分界线。

四个概念分别是什么

格式化（formatting）
自动统一代码样式，例如：
* 缩进
* 引号风格
* 逗号
* 行宽
* 空行

lint
检查不规范或高风险写法，例如：
* 未使用变量
* 重复定义
* 可疑逻辑
* 样式命名不一致
* 可访问性问题

构建（build）
把源码转成最终网站，例如：
* 处理 TypeScript
* 打包资源
* 生成静态页面
* 优化图片
* 压缩资源

发布（deploy）
把构建结果自动上线到 GitHub Pages、Netlify、Vercel 等平台。

为什么必须自动化

因为手工做这些事有三个问题：
1. 不稳定
   今天记得跑，明天忘了跑。
2. 不一致
   你本地格式化了，队友没有。
3. 不可追踪
   上线失败时，不知道是哪一步出的问题。

一个典型反例

开发流程是这样的：
* 手工改代码
* 肉眼检查格式
* 本地随便点一下页面
* 手工上传文件
* 上线后才发现一个拼写错误或构建失败

这种方式在文件少时看似“简单”，实际非常脆弱。

更好的流程

在 `package.json` 里统一定义命令：

```json
{
  "scripts": {
    "dev": "astro dev",
    "format": "biome format . --write",
    "lint": "biome lint .",
    "typecheck": "tsc --noEmit",
    "build": "astro build"
  }
}
```

这样项目成员只要记住固定命令。

进一步，在 GitHub Actions 中自动执行：

```yml
name: Deploy Site

on:
  push:
    branches: ["main"]
  pull_request:

jobs:
  check-and-build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install dependencies
        run: |
          corepack enable
          pnpm install
      - name: Format check
        run: pnpm biome check .
      - name: Type check
        run: pnpm typecheck
      - name: Build
        run: pnpm build
```

如果这些步骤失败，合并和发布就应停止。

自动化的真正意义

不是为了“显得专业”，而是为了让流程变成系统的一部分，而不是某个人脑中的习惯。

一旦自动化到位，项目会出现很明显的变化：
* 代码风格稳定
* 错误更早暴露
* 发布更可靠
* 新人更容易加入
* 回滚与排错更容易

五、把三条原则放到同一个实例中看

假设你要做一个个人站。

需求是：
* 首页展示简介、精选文章、精选项目、最近照片
* 博客有文章列表和文章页
* 简历有教育、项目、技能
* 照片墙有缩略图和详情页

坏的做法

```text
pages/
  index.html
  blog.html
  resume.html
  gallery.html
```

每个页面都手写：
* 同一个 header
* 同一个 footer
* 同一个网站标题
* 同一套菜单
* 各自不同但相似的 CSS
* 各自复制出来的小脚本

短期后果是“能跑”，长期后果是：
* 全站改导航很痛苦
* 简历和首页项目描述不一致
* 样式越来越重复
* 一个页面修过的 bug，另一个页面还在
* 发布靠手工，很容易漏

好的做法

```text
src/
  components/
    Header.tsx
    Footer.tsx
    PostCard.tsx
    PhotoGrid.tsx
    ResumeSection.tsx
  content/
    blog/
      first-post.md
      second-post.md
    photos/
      2026-01-park.md
      2026-02-street.md
  data/
    site-config.ts
    navigation.ts
    resume.ts
  styles/
    global.css
    components/
  pages/
    index.astro
    blog/
    gallery/
    resume.astro
.github/
  workflows/
    deploy.yml
```

然后三条原则同时生效：

第一条，分层：
* `content/` 负责内容
* `components/` 负责结构
* `styles/` 负责表现
* 组件脚本负责行为

第二条，单一真实来源：
* `navigation.ts` 只定义一次菜单
* `site-config.ts` 只定义一次网站信息
* `resume.ts` 只定义一次简历数据

第三条，自动化：
* 格式化命令统一
* lint 自动检查
* build 自动生成
* GitHub Actions 自动部署

这种组织方式，才是真正接近工业级。

六、为什么这三条原则是互相支撑的

这三条不是彼此孤立的建议，而是互相加强。

分层，会让你更容易建立 single source of truth。
因为内容、配置、样式、行为各自有位置，重复信息更容易被发现。

single source of truth，会让自动化更有效。
因为数据集中后，lint 和 build 更容易检查一致性。

自动化，会反过来保护前两条原则。
因为格式化、lint、构建会阻止代码逐渐滑回混乱状态。

也就是说，它们共同形成一个闭环：
* 分层降低耦合
* 单一来源降低重复
* 自动化降低人为失误

七、写代码时如何实际执行这三条原则

可以把它变成一份简单检查表。

每当你新增一个功能时，问自己：

第一，内容是否和结构混在一起了？
例如：博客正文是不是写进组件代码里了？

第二，相同信息是否出现了两次？
例如：导航是否在多个页面重复定义？

第三，这项检查能不能交给机器？
例如：命名风格、格式、类型错误、构建流程，能否自动检测？

如果三个问题都能答得比较好，项目通常就不会太乱。

八、总结

“可阅读、可维护、工业级”的核心，不在于用了多少流行技术，而在于是否建立了清晰边界和稳定流程。

最重要的三条原则是：
1. 内容、结构、表现、行为分层
   这样每类改动都有自己的位置，减少牵一发动全身。
2. 让公共部分只有一个真实来源
   这样全站一致，修改点清晰，不会因为复制粘贴导致信息漂移。
3. 把格式化、lint、构建、发布交给自动化
   这样规则从“个人习惯”升级成“系统约束”，项目才真正可靠。

一个项目真正成熟，不是因为它用了最新框架，而是因为它能在不断变化中保持清晰。

常见错误与易混点
1. 分层不等于文件越多越好
   不是把每一行代码拆成一个文件，而是按职责拆分。过度拆分同样会降低可读性。
2. single source of truth 不等于“所有内容放一个大文件”
   真正含义是“一类信息只定义一次”。不是把所有数据挤在一起。
3. 自动化不等于工具越多越先进
   关键是让流程稳定，不是堆工具。一个清晰的 format + lint + build + deploy 流程，比十个互相重叠的工具更好。
4. 工业级不等于复杂
   很多人误以为“工业级”就是目录特别深、配置特别多。其实工业级首先是清晰、稳定、可预测。
5. 能跑不等于可维护
   一次性 demo 可以混写，但长期项目必须分层、去重、自动化，否则后期成本会迅速上升。

### Reference
1. Video Course: [Youtube @CodeAesthetic](https://www.youtube.com/@CodeAesthetic)
2. <https://github.com/trekhleb/state-of-the-art-shitcode>
3. <https://github.com/Droogans/unmaintainable-code>
