---
category: Notes
title: Concepts, Techniques, and Models of Computer Programming
tags: Languages
---

## 第一章 程序设计概念简介

### 1.1 计算
```
{} for procedures or function calls

{Browse Var1}
```
### 1.2 变量
```
declare
Var=\exp\
```
### 1.3 函数
```
declare
fun {FunName Arg1 ..}
    \fun struct\
end

if \exp\ then \exp\ else \exp\ end
```
> Recursion, Combinations 数/组合, Permutation 数/排列, 
1. Fuctional abstractions (covered in chapter 3)

### 1.4 列表
> binomial theorem 数/二项式定理；Pascal's triangle 数/帕斯卡三角形=杨辉三角

```
[A B ..]

| for links

H|T called a cons/list pair
```
### 1.5 使用函数处理列表
1. Pattern matching, auxiliary funcions, top-down software development, 

```
% Caculate the Nth line of Pascal's Triangle
declare Pascal AddList ShiftLeft ShiftRight
fun {Pascal N}
   if N==1 then [1]
   else
      {AddList {ShiftLeft {Pascal N-1}} {ShiftRight {Pascal N-1}}}
   end
end

fun {ShiftLeft L}
   case L of H|T then
      H|{ShiftLeft T}
   else [0] end
end

fun {ShiftRight L} 0|L end

fun {AddList L1 L2}
   case L1 of H1|T1 then
      case L2 of H2|T2 then
         H1+H2|{AddList T1 T2}
      end
   else nil end
end
```
### 1.6 正确性
1. Language's semantics(mathematical model of operations of pl), program's specification(mathematical definition), mathematical induction 
### 1.7 复杂度
```
% call FastPascal once in a recursion
fun {FastPascal N}
   if N==1 then [1]
   else L in
      L={FastPascal N-1}
      {AddList {ShiftLeft L} {ShiftRight L}}
   end
end
```
### 1.8 惰性求值
1. Eager evaluation, lazy evaluation(covered in section 4.5)

```
% Keyword: lazy
fun lazy {Ints N}
   N|{Ints N+1}
end

% Define the lazy version of Pascal's triangle
fun lazy {PascalList Row}
   Row|{PascalList
            {AddList {ShiftLeft Row} {ShiftRightR Row}}}
end

L={PascalList [1]} % Initiate it

{Browse L.1} % Display the first row
{Browse L.2} % Display the second row

% Eager version, in contrast. Calculate the very first items every time.
fun {PascalList2 N Row}
   if N==1 then [Row]
   else
     Row|{PascalList2 N-1
           {AddList {ShiftLeft Row}  {ShiftRight Row}}}
   end
end
```

### 1.9 高阶编程
> subtract 减去，差集

```
fun {GenericPascal Op N}
   if N==1 then [1]
   else L in
      L={GenericPascal Op N-1}
      {OpList Op {ShiftLeft L} {ShiftRight L}}
   end
end

fun {OpList Op L1 L2}
   case L1 of H1|T1 then
      case L2 of H2|T2 then
         {op H1 H2}|{OpList Op T1 T2}
      end
   else nil end
end

fun {Add X Y} X+Y end

fun {FastPascal N} {GenericPascal Add N} end
% equals:
fun {FastPascal2 N} {GenericPascal ´+´ N} end

fun {Xor X Y} if X==Y then 0 else 1 end end
```
### 1.10 并发性
```
thread P in % takes long, but doesn't keep the system from displayling 99*99 IMMEDIATELY
   P={Pascal 30}
   {Browse P}
end
{Browse 99*99} % Displayed immediately
```
### 1.11 数据流
> aesthetic 美学的；radically 彻底地

1. pAdding threads and delays to a program can radically change a program’s appearance. But as long as the same operations are invoked with the same arguments, it does not change the program’s results at all. This is the key property of dataflow
concurrency.（covered in chapter 4)
### 1.12 显式状态
1. Explicit state: Memory is needed for functions that can change their behavior and learn from their past, this kind of memory is called explicit state. Explicit state is defined with momery cells.
```
% 3 operations for cells: initiating, assignment and access.
declare
C={NewCell 0}
C:=@C+1
{Browse @C}

% Adding Memory to FastPascal
declare
C={NewCell 0}
fun {FastPascal N}
   C:=@C+1
   {GenericPascal Add N}
end
```
### 1.13 对象
1. A function with internal memory is usually called an object.
```
% A counter. Operations: Bump, Read
declare
local C in
   C={NewCell 0}
   fun {Bump}
      C:=@C+1
      @C
   end
   fun {Read}
      @C
   end
end
```
> encapsulation 封装

### 1.14 类
> compound 合成的，混合的
```
declare
fun {NewCounter}
C Bump Read in
   C={NewCell 0}
   fun {Bump}
      C:=@C+1
      #C
   end
   fun {Read}
      @C
   end
   counter(bump:Bump read:Read)
end
```
### 1.15 不确定性和时间
1. Concurrency + State -> may give different results = Nondeterminism
2. Observable Nondeterminism = Race condition

### 1.16 原子性
> Atomicity 原子性；interleave 交错

1. Programming with atomic actions is covered in chapter 8.
2. Lock: only one thread at a time can be executing INSIDE.
```
declare
C={NewCell 0}
L={NewLock}
thread
   lock L then I in % Lock L is defined.
      I=@C
      C:=I+1
   end
end
thread
   lock L then J in
      J=@C
      C:=I+1
   end
end
```
### 1.17 下一步是什么？

* Chapter 2 & 3: declarative model
* Chapter 4: concurrent declarative model
* Section 4.5: lazy declarative model
* Chapter 6: stateful model
* Chapter 7: object-oriented model
* Chapter 8: shared-state concurrent model

### 1.18 练习

```
% 1.a 
declare
A=1
B=0
if B < 100 then
      A:=A*2
      B:=B+1
   else
      {Browse A}
end
```

## 第二章 声明式计算模型
encompass 包含； embryonic [,ɛmbrɪ'ɑnɪk] 胚胎的；embryonic form 雏形

Programming encompasses: computation model, programming model(programming techniques & design principles), reasoning techniques 
### 2.1 定义实用的程序设计语言
define the syntax and semantics of practical programming languages:

**2.1.1 Laguage Syntax** 

1. Extended Backus-Naur Form(EBNF)
```
<digit> ::= 0|1|2|3|4|5|6|7|8|9
<int> ::= <digit>{<digit>}
```
2. Context-sensitive grammars 
3. Formal language: any well-defined set of statement.
4. Context-free grammer can be ambiguous(mutiple parse trees maybe) ->SOLUTION: giving precedence & associativity

> disambiguate /,dɪsæm'bɪɡjuet/ 消除歧义；precedence 优先；associativity，结合性

**2.1.2 Laguage Semantics**
1. **Practical Language**: useful abractions; can be extented with linguistic abstractions
<br>**Kernel Language**: a minimal set of intuitive concepts; easy to understand and reason in; has a formal semantics
2. Formal semantics: an operational, axiomatic, or denotational semantics
3. Four widely used approaches to language semantics: **operational semantics, axiomatic semantics, denotational semantics, logical semantics**.
4. Linguistic abstraction
5. Syntactic sugar -> 2.6.1h
6. Language design

> predecessor ['prɛdəsɛsɚ] 前任者；axiomatic  [,æksɪə'mætɪk] 公理的，自明的；denotation [,dino'teʃən] 符号；in terms of，依据，按照；reentrant 可重入；idioms 成语 习语；be analogous to [ə'næləɡəs] 与...类似； be intended for 打算为…所用；预定给；idealized 理想化的


### 2.2 单次赋值存储


### 2.3 核心语言


### 2.4 核心语言的语义


### 2.5 内存管理


### 2.6 从核心语言到使用语言


### 2.7 异常


### 2.8 高阶话题


### 2.9 练习

## 第三章 声明式程序设计的技术



### 3.1 什么是可声明性


### 3.2 迭代计算


### 3.3 递归计算


### 3.4 递归程序设计


### 3.5 时间和空间的高效性


### 3.6 高阶编程


### 3.7 抽象数据类型


### 3.8 Nondeclarative needs~


### 3.9 Program design in the small


### 3.10 练习

## 第四章 声明式并发


### 4.1 数据驱动的并发模型


### 4.2 线程编程技术基础


### 4.3 流


### 4.4 直接使用声明式并发模型


### 4.5 惰性运行


### 4.6 软实时编程


### 4.7 Haskell语言


### 4.8 声明式编程的限制和扩展


### 4.9 高级话题


### 4.10 历史性记录


### 4.11 练习

## 第五章 消息传递并发


### 5.1 消息传递并发模型


### 5.2 端口对象


### 5.3 简单消息协议


### 5.4 并发程序设计


### 5.5 升降控制系统


### 5.6 直接使用消息传递模型


### 5.7 Erlang编程语言


### 5.8 高级话题


### 5.9 练习

## 第六章 显式状态


### 6.1 什么是显式状态


### 6.2 状态和系统搭建


### 6.3 应用～显式状态的并发模型


### 6.4 数据抽象


### 6.5 Stateful Collection～


### 6.6 reasoning with state


### 6.7 宏观程序设计


### 6.8 案例学习


### 6.9 高级话题


### 6.10 练习

## 第七章 面向对象程序设计


### 7.1 继承


### 7.2 用作完全数据抽象的类


### 7.3 用作增量式数据抽象的类


### 7.4 用继承编程


### 7.5 和其他计算模型的关系


### 7.6 实现一个类型系统


### 7.7 Java编程语言


### 7.8 Active对象～


### 7.9 练习

## 第八章 共享状态并发 


### 8.1 共享状态并发模型


### 8.2 并发编程


### 8.3 锁


### 8.4 监视器


### 8.5 事件


### 8.6 Java编程语言（并发部分）


### 8.7 练习

## 第九章 关系式编程


### 9.1 关系式计算模型


### 9.2 更多的例子


### 9.3 和逻辑编程的关系


### 9.4 自然语言句法分析


### 9.5 一个语法解释器


### 9.6 数据库


### 9.7 Prolog编程语言


### 9.8 练习


## 第十章 图形化用户界面编程



### 10.1 声明式/过程式实现



### 10.2 使用声明式/过程式实现


### 10.3 原型设计师交互学习工具


### 10.4 案例学习


### 10.5 实现GUI工具


### 10.6 练习

## 第十一章 分布式编程


### 11.1 分布式系统的分类


### 11.2 分布式模型


### 11.3 声明式数据的分布


### 11.4 状态的分布


### 11.5 网络awareness


### 11.6 一般的分布式编程模式


### 11.7 分布式协议


### 11.8 局部故障


### 11.9 安全性


### 11.10 构建应用


### 11.11 练习

## 第十二章 约束式编程


### 12.1 传播和搜索


### 12.2 编程技巧


### 12.3 基于约束的计算模型


### 12.4 定义和使用计算空间


### 12.5 实现关系式计算模型


### 12.6 练习

## 第十三章 语言的语义


### 13.1 一般的计算模型


### 13.2 声明式的一致性？并发性？


### 13.3 八个计算模型


### 13.4 一般抽象的语义


### 13.5 历史性讲义


### 13.6 练习


## A Mozart系统开发环境


### A.1 交互式界面


### A.2 命令行界面



## B 基本数据类型


### B.1 Nunmber（Integer，Float，夯实基础
python编程从入门到精通，从单纯的语法理解到灵活应用解决实际问题，掌握Linux和Windows双系统开发环境，掌握常见数据结构和算法（时间复杂度计算，排序，搜索，栈，队列，二叉树），建立面向对象思维，能对问题进行抽象归类，了解设计模式，掌握单例模式和工厂Character）


### B.2 Literal（atom和name）


### B.3 Record和Tuple


### B.4 Chunks（限制大小的Record）


### B.5 List


### B.6 String


### B.7 Virtual String



## C 语言的语法


### C.1 交互式程序指令


### C.2 程序指令和表达式


### C.3 指令和表达式的非终止


### C.4 操作符


### C.5 关键字


### C.6 构词句法

## D 通用计算模型


### D.1 有创造力的扩展规则


### D.2 核心语言


### D.3 概念


### D.4 状态的不同形式


### D.5 其他概念


### D.6 层次化语言设计

## 引用

## 目录