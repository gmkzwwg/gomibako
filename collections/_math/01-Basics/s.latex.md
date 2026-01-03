---
category: Sheet
title: Writing Mathematical Formulas in LaTeX 
tags: Basics
---

## Basic Usage

**Document Structure**

```latex
\documentclass{article}     % Document type
\usepackage{package_name}   % Including a package
\begin{document}            % Start of the document
\end{document}              % End of the document
```

**Text Formatting**

```latex
\textbf{Bold text}
\textit{Italic text}
\underline{Underlined text}
\emph{Emphasized text}
```

**Sectioning**

```latex
\section{Section Title}
\subsection{Subsection Title}
\subsubsection{Sub-subsection Title}
```

**Lists**

- Unordered List

```latex
\begin{itemize}
  \item First item
  \item Second item
\end{itemize}
```

- Ordered List

```latex
\begin{enumerate}
  \item First item
  \item Second item
\end{enumerate}
```

**Mathematics**

- Inline Math:

```latex
$$  a^2 + b^2 = c^2  $$
```

- Display Math:

```latex
\[
  E = mc^2
\]
```

**Symbols**

```latex
\alpha, \beta, \gamma, \lambda   % Greek letters
\geq, \leq, \neq                 % Comparison operators
\sum, \prod, \int                % Summation, product, integral
\frac{a}{b}                      % Fraction
```

**Aligning Equations**

```latex
\begin{align*}
  a + b &= c \\
  x - y &= z
\end{align*}
```

**Figures**

```latex
\begin{figure}[h]
  \centering
  \includegraphics[width=0.5\textwidth]{filename}
  \caption{Caption text}
  \label{fig:label}
\end{figure}
```

**Tables**

```latex
\begin{tabular}{|c|c|c|}
  \hline
  Column 1 & Column 2 & Column 3 \\
  \hline
  Data 1   & Data 2   & Data 3   \\
  \hline
\end{tabular}
```

**Referencing**

```latex
\label{sec:label}       % Label a section
\ref{sec:label}         % Reference a section
\cite{reference_key}    % Cite a reference
```

## Math Symbols

Here's a quick reference for common LaTeX math symbols:

**Basic Symbols**

| Item                     | Symbol       | LaTeX    |
| ------------------------ | ------------ | -------- |
| Addition                 | +            | `+`      |
| Subtraction              | -            | `-`      |
| Multiplication           | $$ \times $$ | `\times` |
| Division                 | $$ \div $$   | `\div`   |
| Equality                 | =            | `=`      |
| Inequality               | $$ \neq $$   | `\neq`   |
| Less than                | <            | `<`      |
| Greater than             | >            | `>`      |
| Less than or equal to    | $$ \leq $$   | `\leq`   |
| Greater than or equal to | $$ \geq $$   | `\geq`   |

**Greek Letters**

| Lowercase         | LaTeX         | Uppercase      | LaTeX      | Read as      |
| ----------------- | ------------- | -------------- | ---------- | ------------ |
| $$ \alpha $$      | `\alpha`      | A              | `A`        | /ˈælfə/      |
| $$ \beta $$       | `\beta`       | B              | `B`        | /'beitə/     |
| $$ \gamma $$      | `\gamma`      | $$ \Gamma $$   | `\Gamma`   | /'gæmə/      |
| $$ \delta $$      | `\delta`      | $$ \Delta $$   | `\Delta`   | /'deltə/     |
| $$ \epsilon $$    | `\epsilon`    | E              | `E`        | /ep’silon/   |
| $$ \varepsilon $$ | `\varepsilon` |
| $$ \zeta $$       | `\zeta`       | Z              | `Z`        | /'zi:tə/     |
| $$ \eta $$        | `\eta`        | H              | `H`        | /'i:tə/      |
| $$ \theta $$      | `\theta`      | $$ \Theta $$   | `\Theta`   | /'θi:tə/     |
| $$ \vartheta $$   | `\vartheta`   |
| $$ \iota $$       | `\iota`       | I              | `I`        | /ai’oute/    |
| $$ \kappa $$      | `\kappa`      | K              | `K`        | /'kæpə/      |
| $$ \lambda $$     | `\lambda`     | $$ \Lambda $$  | `\Lambda`  | /'læmdə/     |
| $$ \mu $$         | `\mu`         | M              | `M`        | /mju:/       |
| $$ \nu $$         | `\nu`         | N              | `N`        | /nju:/       |
| $$ \xi $$         | `\xi`         | $$ \Xi $$      | `\Xi`      | /ksi/        |
| o                 | `o`           | O              | `O`        | /oumaik’rən/ |
| $$ \pi $$         | `\pi`         | $$ \Pi $$      | `\Pi`      | /pai/        |
| $$ \varpi $$      | `\varpi`      |
| $$ \rho $$        | `\rho`        | P              | `P`        | /rou/        |
| $$ \varrho $$     | `\varrho`     |
| $$ \sigma $$      | `\sigma`      | $$ \Sigma $$   | `\Sigma`   | /'sigmə/     |
| $$ \varsigma $$   | `\varsigma`   |
| $$ \tau $$        | `\tau`        | T              | `T`        | /tau/        |
| $$ \upsilon $$    | `\upsilon`    | $$ \Upsilon $$ | `\Upsilon` | /ju:p’silən/ |
| $$ \phi $$        | `\phi`        | $$ \Phi $$     | `\Phi`     | /fai/        |
| $$ \varphi $$     | `\varphi`     |
| $$ \chi $$        | `\chi`        | X              | `X`        | /kai/        |
| $$ \psi $$        | `\psi`        | $$ \Psi $$     | `\Psi`     | /psai/       |
| $$ \omega $$      | `\omega`      | $$ \Omega $$   | `\Omega`   | /'oumigə/    |

**Operators**


| Item               | Symbol                            | LaTeX                         |
| ------------------ | --------------------------------- | ----------------------------- |
| Sum                | $$ \sum $$                        | `\sum`                        |
| Product            | $$ \prod $$                       | `\prod`                       |
| Integral           | $$ \int $$                        | `\int`                        |
| Derivative         | $$ \frac{dy}{dx} $$               | `\frac{dy}{dx}`               |
| Partial Derivative | $$ \frac{\partial}{\partial x} $$ | `\frac{\partial}{\partial x}` |
| Infinity           | $$ \infty $$                      | `\infty`                      |
| Limit              | $$ \lim $$                        | `\lim`                        |

**Fractions & Roots**

| Item        | Symbol            | LaTeX         |
| ----------- | ----------------- | ------------- |
| Fraction    | $$ \frac{a}{b} $$ | `\frac{a}{b}` |
| Square Root | $$ \sqrt{x} $$    | `\sqrt{x}`    |
| N-th Root   | $$ \sqrt[n]{x} $$ | `\sqrt[n]{x}` |

**Basic Logical Operators**

| Item             | Symbol                | LaTeX             |
| ---------------- | --------------------- | ----------------- |
| Negation         | $$ \neg $$            | `\neg`            |
| And              | $$ \land $$           | `\land`           |
| Or               | $$ \lor $$            | `\lor`            |
| Implies          | $$ \Rightarrow $$     | `\Rightarrow`     |
| If and only if   | $$ \Leftrightarrow $$ | `\Leftrightarrow` |
| Equivalent       | $$ \equiv $$          | `\equiv`          |
| For all          | $$ \forall $$         | `\forall`         |
| There exists     | $$ \exists $$         | `\exists`         |
| Does not exist   | $$ \nexists $$        | `\nexists`        |
| Unique existence | $$ \exists! $$        | `\exists!`        |

**Set Relations**

| Item              | Symbol          | LaTeX       |
| ----------------- | --------------- | ----------- |
| Element of        | $$ \in $$       | `\in`       |
| Not element of    | $$ \notin $$    | `\notin`    |
| Subset            | $$ \subset $$   | `\subset`   |
| Superset          | $$ \supset $$   | `\supset`   |
| Subset or equal   | $$ \subseteq $$ | `\subseteq` |
| Superset or equal | $$ \supseteq $$ | `\supseteq` |
| Union             | $$ \cup $$      | `\cup`      |
| Intersection      | $$ \cap $$      | `\cap`      |
| Empty set         | $$ \emptyset $$ | `\emptyset` |

**Quantifiers and Connectives**

| Item                | Symbol        | LaTeX     |
| ------------------- | ------------- | --------- |
| Logical consequence | $$ \vdash $$  | `\vdash`  |
| Models              | $$ \models $$ | `\models` |
| Contradiction       | $$ \bot $$    | `\bot`    |
| Tautology           | $$ \top $$    | `\top`    |

**Modal Logic Symbols**

| Item        | Symbol         | LaTeX      |
| ----------- | -------------- | ---------- |
| Possibly    | $$ \Diamond $$ | `\Diamond` |
| Necessarily | $$ \Box $$     | `\Box`     |

**Arrows**

| Item        | Symbol            | LaTeX         |
| ----------- | ----------------- | ------------- |
| Right arrow | $$ \rightarrow $$ | `\rightarrow` |
| Left arrow  | $$ \leftarrow $$  | `\leftarrow`  |
| Up arrow    | $$ \uparrow $$    | `\uparrow`    |
| Down arrow  | $$ \downarrow $$  | `\downarrow`  |

**Miscellaneous**

| Item         | Symbol        | LaTeX     |
| ------------ | ------------- | --------- |
| Degree       | $$ ^\circ $$  | `^\circ`  |
| Angle        | $$ \angle $$  | `\angle`  |
| Approximate  | $$ \approx $$ | `\approx` |
| Proportional | $$ \propto $$ | `\propto` |
| Plus-minus   | $$ \pm $$     | `\pm`     |

## Function

### Piecewise Function

```latex
$$ f(x)=\left\{
\begin{aligned}
x & = & \cos(t) \\
y & = & \sin(t) \\
z & = & \frac xy
\end{aligned}
\right.
$$
```

$$
f(x)=\left\{
\begin{aligned}
x & = & \cos(t) \\
y & = & \sin(t) \\
z & = & \frac xy
\end{aligned}
\right.
$$

### Formula Set

**Align right**

```latex
$$
\left\{
\begin{array}{rcl}
  IF_{k}(\hat{t}_{k,m})=IF_{m}(\hat{t}_{k,m}), & \\
  IF_{k}(\hat{t}_{k,m}) \pm h= IF_{m}(\hat{t}_{k,m}) \pm h  , &\\
  \left |IF'_{k}(\hat{t}_{k,m} - IF'_{m}(\hat{t}_{k,m} \right |\geq d , &
\end{array}
\right.
$$
```

$$
\left\{
\begin{array}{rcl}
  IF_{k}(\hat{t}_{k,m})=IF_{m}(\hat{t}_{k,m}), & \\
  IF_{k}(\hat{t}_{k,m}) \pm h= IF_{m}(\hat{t}_{k,m}) \pm h  , &\\
  \left |IF'_{k}(\hat{t}_{k,m} - IF'_{m}(\hat{t}_{k,m} \right |\geq d , &
\end{array}
\right.
$$

**Two Rows**

```latex
$$
\left\{
  \begin{array}{lr}
  x=\dfrac{3\pi}{2}(1+2t)\cos(\dfrac{3\pi}{2}(1+2t)), &  \\
  y=s, & 0\leq s\leq L,|t|\leq1.\\
  z=\dfrac{3\pi}{2}(1+2t)\sin(\dfrac{3\pi}{2}(1+2t)), &
  \end{array}
\right.
$$
```

$$
\left\{
  \begin{array}{lr}
  x=\dfrac{3\pi}{2}(1+2t)\cos(\dfrac{3\pi}{2}(1+2t)), &  \\
  y=s, & 0\leq s\leq L,|t|\leq1.\\
  z=\dfrac{3\pi}{2}(1+2t)\sin(\dfrac{3\pi}{2}(1+2t)), &
  \end{array}
\right.
$$

## Matrix

Here are the English outputs for the different types of matrices in LaTeX, using no brackets, parentheses, square brackets, curly brackets, determinants, and double vertical bars (norms).

**Matrix without brackets (`matrix`)**

```latex
\[
\begin{matrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{matrix}
\]
```

$$
\begin{matrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{matrix}
$$

**Parentheses matrix (`pmatrix`)**

```latex
\[
\begin{pmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{pmatrix}
\]
```

$$
\begin{pmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{pmatrix}
$$

**Square brackets matrix (`bmatrix`)**

```latex
\[
\begin{bmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{bmatrix}
\]
```

$$
\begin{bmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{bmatrix}
$$

**Curly brackets matrix (`Bmatrix`)**

```latex
\[
\begin{Bmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{Bmatrix}
\]
```

$$
\begin{Bmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{Bmatrix}
$$

**Determinant (`vmatrix`)**

```latex
\[
\begin{vmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{vmatrix}
\]
```

$$
\begin{vmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{vmatrix}
$$

**Norm (double vertical bars) (`Vmatrix`)**

```latex
\[
\begin{Vmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{Vmatrix}
\]
```

$$
\begin{Vmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{Vmatrix}
$$

**Matrix of arbitrary size**

```latex
\[
\begin{pmatrix}
  a_{11} & a_{12} & \cdots & a_{1n} \\
  a_{21} & a_{22} & \cdots & a_{2n} \\
  \vdots & \vdots & \ddots & \vdots \\
  a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
\]
```

$$
\begin{pmatrix}
  a_{11} & a_{12} & \cdots & a_{1n} \\
  a_{21} & a_{22} & \cdots & a_{2n} \\
  \vdots & \vdots & \ddots & \vdots \\
  a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
$$

This matrix can represent any arbitrary size \( m \times n \) where the exact dimensions are not specified, and ellipses (`\cdots` and `\vdots`) indicate the continuation of rows and columns.

**Upper triangular matrix** (with no blank spaces for the missing elements)

```latex
$$
\begin{bmatrix}
a_{11} & \cdots & a_{1n} \\
 & \ddots & \vdots \\
& \ & a_{nn}
\end{bmatrix}
$$
```

$$
\begin{bmatrix}
a_{11} & \cdots & a_{1n} \\
 & \ddots & \vdots \\
& \ & a_{nn}
\end{bmatrix}
$$


<table> 
   <thead> 
    <tr> 
     <th></th> 
     <th>名称</th> 
     <th>含义</th> 
     <th>举例</th> 
     <th>读法</th> 
     <th>范畴</th> 
    </tr> 
   </thead> 
   <tbody> 
    <tr> 
     <td>→</td> 
     <td>蕴含，实质蕴含</td> 
     <td>A → B 意味着如果 A 为真，则 B 也为真；如果 A 为假，则对 B 没有任何影响</td> 
     <td> x = 2 → x^2 =4 为真，但 x^2 = 4 → x = 2一般为假，因为可以有x = - 2</td> 
     <td>仅为真值表蕴含式；如果…那么</td> 
     <td>命题逻辑</td> 
    </tr> 
    <tr> 
     <td>⇒</td> 
     <td>严格蕴含（模态逻辑）</td> 
     <td>A ⇒ B 表示不仅 A 蕴含 B ，而且内容相关</td> 
     <td></td> 
     <td>严格蕴含，内容相关；如果…那么</td> 
     <td>模态逻辑</td> 
    </tr> 
    <tr> 
     <td>↔</td> 
     <td>实质等价</td> 
     <td>A ↔ B 意味着 A 为真 则B 为真，和 A 为假 则 B 为假。</td> 
     <td> x + 5 = y + 2 ↔ x + 3 = y</td> 
     <td>当且仅当；iff</td> 
     <td>命题逻辑</td> 
    </tr> 
    <tr> 
     <td>⇔</td> 
     <td>严格等价（模态逻辑）</td> 
     <td>A ⇔ B ， A与B之间必须内容相关。</td> 
     <td></td> 
     <td>当且仅当；iff</td> 
     <td>模态逻辑</td> 
    </tr> 
    <tr> 
     <td>¬</td> 
     <td>逻辑否定</td> 
     <td>¬A 为真，当且仅当 A 为假</td> 
     <td>¬(¬A) ↔ A</td> 
     <td>非</td> 
     <td>命题逻辑</td> 
    </tr> 
    <tr> 
     <td>∧</td> 
     <td>逻辑合取</td> 
     <td>当A 与 B二者都为真，则陈述 A ∧ B 为真；否则为假</td> 
     <td>n &lt; 4 ∧ n &gt;2 ⇔ n = 3（当 n 是自 然数的时候）</td> 
     <td>与</td> 
     <td>命题逻辑</td> 
    </tr> 
    <tr> 
     <td>∨</td> 
     <td>逻辑析取</td> 
     <td>当A 或 B有一个为真或二者均为真陈述，则 A ∨ B 为真；当二者都为假，则 陈述为假。</td> 
     <td>n ≣ 4 ∨ n ≢ 2 ⇔ n ≠ 3（当 n 是 自然数的时候）。</td> 
     <td>或</td> 
     <td>命题逻辑</td> 
    </tr> 
    <tr> 
     <td>∀</td> 
     <td>全称量词</td> 
     <td>∀ x: P(x) 意味着对所有的 x 都使 P(x) 都为真。</td> 
     <td>∀ n ∈ N（n² ≣ n）</td> 
     <td>所有，每一个，任意</td> 
     <td>谓词逻辑</td> 
    </tr> 
    <tr> 
     <td>∃</td> 
     <td>存在量词</td> 
     <td>∃ x: P(x) 意味着有至少存在一个 x 使 P(x) 为真。</td> 
     <td>∃ n ∈ N（n 是偶数）。</td> 
     <td>存在着，至少有一个</td> 
     <td>谓词逻辑</td> 
    </tr> 
    <tr> 
     <td>∃!</td> 
     <td>唯一量词</td> 
     <td>∃! x: P(x) 意味着精确的有一个 x 使 P(x) 为真。</td> 
     <td>∃! n ∈ N（n + 5 = 2n）</td> 
     <td>精确的存在一个</td> 
     <td>谓词逻辑</td> 
    </tr> 
    <tr> 
     <td> Ψ</td> 
     <td>任意目谓词</td> 
     <td> Ψ : psi，读音“普赛”，大写 Ψ，小写 ψ</td> 
     <td> Ψ（）是任意目谓词的元变项</td> 
     <td> Ψ（x）代表任意目谓词构成的开语句</td> 
     <td>谓词逻辑</td> 
    </tr> 
    <tr> 
     <td> ι</td> 
     <td>摹状词里用希腊字母 ι 代替定冠词</td> 
     <td> ι : iota ，读音”约塔“ 或者”艾欧塔“。大写 Ι ， 小写  ι</td> 
     <td>摹状词结构：定冠词 the+形容词+名词单数，符号化为  ιxp （x）</td> 
     <td>q（ ιxp （x））读做：那个唯一具有性质p的个体是q</td> 
     <td>谓词逻辑</td> 
    </tr> 
    <tr> 
     <td>∵</td> 
     <td>因为</td> 
     <td></td>
     <td></td> 
     <td></td> 
     <td></td> 
    </tr> 
    <tr> 
     <td>∴</td> 
     <td>所以</td> 
     <td></td>
     <td></td> 
     <td></td> 
     <td></td> 
    </tr> 
    <tr> 
     <td> □</td> 
     <td>模态词</td> 
     <td>必然</td> 
     <td>-</td> 
     <td>必然</td> 
     <td>-</td> 
    </tr> 
    <tr> 
     <td> ⋄</td> 
     <td>模态词</td> 
     <td>可能</td> 
     <td>-</td> 
     <td>可能</td> 
     <td>-</td> 
    </tr> 
    <tr> 
     <td>┌└┃</td> 
     <td>推演过程流程符号</td> 
     <td>推演过程假设域需要用的流程符号</td> 
     <td>-</td> 
     <td></td> 
     <td>-</td> 
    </tr> 
    <tr> 
     <td>⊕</td> 
     <td>xor</td> 
     <td>陈述 A ⊕ B 为真，在要么 A 要么 B 但不是二者为真的时候为真。</td> 
     <td>(¬A) ⊕ A 总是真，A ⊕ A 总是假。</td> 
     <td>异或</td> 
     <td>命题逻辑，布尔代数</td> 
    </tr> 
    <tr> 
     <td>/</td> 
     <td>命题逻辑</td> 
     <td>穿过其他算符的斜线同于在它前面放置的"¬"。</td> 
     <td>x ≠ y ↔ ¬(x = y)</td> 
     <td>非</td> 
     <td>命题逻辑</td> 
    </tr> 
    <tr> 
     <td>:= 或者 ≡</td> 
     <td>定义</td> 
     <td>x := y 或 x ≡ y 意味着 x 被定义为 y 的另一个名字(但要注意 ≡ 也可以意味着其他东西，比如全等)。</td> 
     <td>双曲余弦函数cosh x := (1/2)(exp x + exp (−x))</td> 
     <td>被定义为</td> 
     <td>所有地方</td> 
    </tr> 
    <tr> 
     <td>:⇔</td> 
     <td>定义</td> 
     <td>P :⇔ Q 意味着 P 被定义为逻辑等价于 Q。</td> 
     <td>A XOR B :⇔ (A ∨ B) ∧ ¬(A ∧ B)</td> 
     <td>被定义为</td> 
     <td>所有地方</td> 
    </tr> 
    <tr> 
     <td>├</td> 
     <td>推论</td> 
     <td>x ├ y 意味着 y 推导自 x。</td> 
     <td>A → B ├ ¬B → ¬A</td> 
     <td>推论或推导</td> 
     <td>命题逻辑, 谓词逻辑</td> 
    </tr> 
    <tr> 
     <td>├</td> 
     <td>断定符</td> 
     <td>-</td> 
     <td>-</td> 
     <td>(公式在L中可证)</td> 
     <td>-</td> 
    </tr> 
    <tr> 
     <td>╞</td> 
     <td>满足符</td> 
     <td>-</td> 
     <td>-</td> 
     <td>(公式在E上有效，公式在E上可满足)</td> 
     <td>-</td> 
    </tr> 
   </tbody> 
</table>

### 数学符号

<table>
<thead>
  <tr>
    <th colspan="2">运算</th>
    <th colspan="2">性质</th>
    <th colspan="2">集合</th>
    <th colspan="2">常用集合</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>П</td>
    <td>连乘（集合论中的相乘）</td>
    <td>△</td>
    <td>三角形</td>
    <td>∈</td>
    <td>属于</td>
    <td>C</td>
    <td>复数集</td>
  </tr>
  <tr>
    <td>Σ</td>
    <td>连加</td>
    <td>Rt△</td>
    <td>直角三角形</td>
    <td>∉</td>
    <td>不属于</td>
    <td>N</td>
    <td>自然数集（包含0在内）</td>
  </tr>
  <tr>
    <td>√</td>
    <td>根号</td>
    <td>∠</td>
    <td>角</td>
    <td>⊆</td>
    <td>真包含于</td>
    <td>N*</td>
    <td>正自然数集</td>
  </tr>
  <tr>
    <td>log</td>
    <td>对数（或lg，ln）</td>
    <td>⊙</td>
    <td>圆</td>
    <td>⊇</td>
    <td>真包含</td>
    <td>P</td>
    <td>素数集</td>
  </tr>
  <tr>
    <td>dx</td>
    <td>微分</td>
    <td>º</td>
    <td>度</td>
    <td>⊂</td>
    <td>包含于</td>
    <td>Q</td>
    <td>有理数集</td>
  </tr>
  <tr>
    <td>∫</td>
    <td>积分</td>
    <td>||</td>
    <td>平行 is parallel to ∥</td>
    <td>⊃</td>
    <td>包含</td>
    <td>ℝ</td>
    <td>实数集</td>
  </tr>
  <tr>
    <td>∮</td>
    <td>曲线积分</td>
    <td>⊥</td>
    <td>垂直</td>
    <td>∪</td>
    <td>并集</td>
    <td>Z</td>
    <td>整数集</td>
  </tr>
  <tr>
    <td>∞</td>
    <td>无穷大</td>
    <td></td>
    <td></td>
    <td>∩</td>
    <td>交集</td>
    <td>Ø</td>
    <td>空集</td>
  </tr>
</tbody>
</table>

### 希腊字母

<table> 
   <thead> 
    <tr> 
     <th colspan="2">大小写</th> 
     <th>读音</th> 
     <th>常见含义</th> 
    </tr> 
   </thead> 
   <tbody> 
    <tr> 
     <td>Α</td> 
     <td>α</td> 
     <td>alpha /ˈælfə/，阿尔法</td> 
     <td>角度；系数 ； 角加速度</td> 
    </tr> 
    <tr> 
     <td>Β</td> 
     <td>β</td> 
     <td>beta /'beitə/，贝塔</td> 
     <td>磁通系数；角度；系数</td> 
    </tr> 
    <tr> 
     <td>Γ</td> 
     <td>γ</td> 
     <td>gamma/'gæmə/，伽玛</td> 
     <td>电导系数（小写） ；角度，比热容比</td> 
    </tr> 
    <tr> 
     <td>Δ</td> 
     <td>δ</td> 
     <td>delta/'deltə/，德尔塔</td> 
     <td>变动；密度；变化量，屈光度，一元二次方程中的判别式</td> 
    </tr> 
    <tr> 
     <td>Ε</td> 
     <td>ε,e</td> 
     <td>epsilon /ep’silon/ ，伊普西隆</td> 
     <td>对数之基数 ；介电常数</td> 
    </tr> 
    <tr> 
     <td>Ζ</td> 
     <td>ζ</td> 
     <td>zeta/'zi:tə/，泽塔</td> 
     <td>系数；方位角；阻抗；相对粘度；原子序数</td> 
    </tr> 
    <tr> 
     <td>Η</td> 
     <td>η</td> 
     <td>eta/'i:tə/，伊塔</td> 
     <td>磁滞系数；效率（小写）</td> 
    </tr> 
    <tr> 
     <td>Θ</td> 
     <td>θ,θ</td> 
     <td>theta/'θi:tə/ ，西塔</td> 
     <td>温度；相位角</td> 
    </tr> 
    <tr> 
     <td>Ι</td> 
     <td>ι</td> 
     <td>iota/ai’oute/，约塔，艾欧塔</td> 
     <td>微小,一点儿</td> 
    </tr> 
    <tr> 
     <td>Κ</td> 
     <td>κ</td> 
     <td>kappa/'kæpə/ ，卡帕</td> 
     <td>介质常数 ；绝热指数</td> 
    </tr> 
    <tr> 
     <td>∧</td> 
     <td>λ</td> 
     <td>lambda/'læmdə/ ，兰姆达</td> 
     <td>波长（小写）；体积 ；导热系数</td> 
    </tr> 
    <tr> 
     <td>Μ</td> 
     <td>μ</td> 
     <td>mu/mju:/，米欧</td> 
     <td>磁导系数；微（千分之一）；放大因数（小写） ；动摩擦系（因）数；流体动力粘度</td> 
    </tr> 
    <tr> 
     <td>Ν</td> 
     <td>ν</td> 
     <td>nu /nju:/， 纽</td> 
     <td>磁阻系数 ；流体运动粘度；光子频率</td> 
    </tr> 
    <tr> 
     <td>Ξ</td> 
     <td>ξ</td> 
     <td>xi/ksi/，克西</td> 
     <td>随机数；（小）区间内的一个未知特定值</td> 
    </tr> 
    <tr> 
     <td>Ο</td> 
     <td>ο</td> 
     <td>omicron /oumaik’rən/ ，欧米克隆</td> 
     <td>高阶无穷小函数</td> 
    </tr> 
    <tr> 
     <td>∏</td> 
     <td>π</td> 
     <td>pi /pai/，派</td> 
     <td>圆周÷直径=3.1416 ；圆周率，π(n)表示不大于n的质数个数</td> 
    </tr> 
    <tr> 
     <td>Ρ</td> 
     <td>ρ,ρ</td> 
     <td>rho/rou/，柔</td> 
     <td>电阻系数（小写） ；柱坐标和极坐标中的极径；密度</td> 
    </tr> 
    <tr> 
     <td>∑</td> 
     <td>σ,s</td> 
     <td>sigma/'sigmə/ ，西格玛</td> 
     <td>总和（大写）,表面密度；跨导（小写） ；正应力</td> 
    </tr> 
    <tr> 
     <td>Τ</td> 
     <td>τ</td> 
     <td>tau /tau/，陶</td> 
     <td>时间常数 ；切应力</td> 
    </tr> 
    <tr> 
     <td>Υ</td> 
     <td>υ</td> 
     <td>upsilon/ju:p’silən/ ，玉普西隆</td> 
     <td>位移</td> 
    </tr> 
    <tr> 
     <td>Φ</td> 
     <td>φ</td> 
     <td>phi /fai/，弗爱</td> 
     <td>磁通；角 ；透镜焦度；热流量</td> 
    </tr> 
    <tr> 
     <td>Χ</td> 
     <td>χ</td> 
     <td>chi /kai/ ，凯</td> 
     <td>统计学中有卡方(χ2)分布</td> 
    </tr> 
    <tr> 
     <td>Ψ</td> 
     <td>ψ</td> 
     <td>psi/psai/ ，普赛</td> 
     <td>角速；介质电通量（静电力线）；角</td> 
    </tr> 
    <tr> 
     <td>Ω</td> 
     <td>ω</td> 
     <td>omega/'oumigə/，奥米伽</td> 
     <td>欧姆（大写）；角速（小写）；角 ；交流电的电角度</td> 
    </tr> 
   </tbody> 
</table>
