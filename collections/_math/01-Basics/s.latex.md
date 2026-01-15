---
category: Sheet
title: Writing Mathematical Formulas in LaTeX 
tags: Basics
---

## Minimal Guide

What LaTeX is
  - LaTeX = a markup-based typesetting system: you write structured plain text + commands; it compiles into a high-quality PDF.
  - Core idea: describe structure (sections, figures, references), not pixel-level layout.

Why use LaTeX
  - Typography quality: consistent spacing, hyphenation, pagination, professional output.
  - Structure-first writing: headings, cross-references, tables/figures behave predictably.
  - Large documents: stable management of long reports, theses, books.
  - References: citations/bibliographies scale well (BibTeX/biblatex).
  - Collaboration/versioning: plain text works well with Git and diff tools.
  - Reuse: templates and macros let you standardize formatting across documents.

Use LaTeX when you need:
  - Long or structured documents (papers, theses, books, lecture notes).
  - Many figures/tables and lots of cross-referencing.
  - Formal bibliography management.
  - Consistent, publication-style formatting.
  - Collaboration where plain-text + Git is beneficial.

Best-practice workflow:
  1. Start from a reputable template.(Journal/conference template (IEEE/ACM/Springer) or a clean article template.)
  2. Keep structure clean
    - Use `\section/\subsection`, not manual formatting for headings.
    - Use `\label` + `\ref` for numbering, never type “Figure 3” manually.
  3. Use packages deliberately (small, stable set)
    - `geometry`, `graphicx`, `hyperref`, `booktabs`, `enumitem`, `biblatex` + `biber`
  4. Separate content: main.tex + sections/*.tex + figures/* + refs.bib
  5. Compile consistently. Stick to one engine unless you know why: pdfLaTeX (common), XeLaTeX/LuaLaTeX (better Unicode/font handling).

Tips
  - **Use labels everywhere** you’ll refer back to: Put `\label{...}` right after `\caption{...}` for figures/tables.
  - Escape special characters: If you need literal `# % & $ _ { } \` you must escape them: `\# \% \& \$ \_ \{ \} \textbackslash`
  - Use booktabs for tables: Avoid vertical lines; use \toprule \midrule \bottomrule.
  - Add hyperlinks early: hyperref makes refs/cites clickable in the PDF.


## Basic Usage

**Document Structure and Sectioning**

```latex
% This is a single, compilable LaTeX tutorial file

% Document Structure and Sectioning
\documentclass{11pt}{article}      % [OPTIONS]{CLASS}; Common CLASSES: article, report, book, letter, beamer


% [1] PACKAGES
% Engine detection (so the same file works in pdfLaTeX / XeLaTeX / LuaLaTeX) 
\usepackage{iftex}                 % [OPTIONS]{PACKAGE}Including a package

% (1.1) Encoding / Language
\ifPDFTeX
  % inputenc (legacy): allow UTF-8 input in pdfLaTeX
  \usepackage[utf8]{inputenc}
  % fontenc: better output encoding (copy/paste and hyphenation for Western languages)
  \usepackage[T1]{fontenc}
  % babel: language-specific hyphenation and typographic rules
  \usepackage[english]{babel}
  % lmodern: improved default fonts for pdfLaTeX
  \usepackage{lmodern}
\else
  % fontspec: use system/OpenType fonts (XeLaTeX/LuaLaTeX)
  \usepackage{fontspec}
  % polyglossia: language support designed for XeLaTeX/LuaLaTeX
  \usepackage{polyglossia}
  \setmainlanguage{english}
  % A safe default font (usually available); you can replace with a system font.
  \setmainfont{Latin Modern Roman}
\fi

% (2) Layout / Spacing
\usepackage[margin=1in]{geometry} % geometry: set margins/page size
\usepackage{setspace}            % setspace: line spacing control

% (3) Graphics / Color / Links
\usepackage{graphicx}            % graphicx: \includegraphics
\usepackage{xcolor}              % xcolor: \textcolor, color definitions
\usepackage[colorlinks=true]{hyperref} % hyperref: clickable refs, URLs, PDF metadata

% (4) Lists / Tables
\usepackage{enumitem}            % enumitem: list spacing and labels
\usepackage{booktabs}            % booktabs: professional table rules
\usepackage{tabularx}            % tabularx: auto-width columns (X)
\usepackage{longtable}           % longtable: multi-page tables

% (5) Bibliography (choose ONE system in practice)
% Recommended modern approach:
\usepackage[backend=biber,style=authoryear]{biblatex} % biblatex: flexible citations/bibliography
\addbibresource{\jobname.bib}

% Alternative legacy approach (disabled here):
% \usepackage[authoryear]{natbib}   % natbib: classic citation commands
% Then use BibTeX with \bibliographystyle{...} and \bibliography{...}

% [2] TITLE / META
\TITLE{A Minimal Practical \LaTeX\ Tutorial (One File)}
\author{Gomikuzu}
\date{\today}

\hypersetup{
  pdftitle  = {Minimal Practical LaTeX Tutorial},
  pdfauthor = {Gomikuzu}
}

\definecolor{Accent}{HTML}{1F5FBF} % Example custom color


% [3] DOCUMENT STRUCTURE
\begin{document}                   % Start of the document

\maketitle
\onehalfspacing
\tableofcontents                   % Generate table of content
\newpage

% (3.1) Sectioning
% \part{PART NAME}                   % Largest unit of a BOOK. 1 part = n chapters
% \chapter{NAME}                     % REPORT/BOOKS ONLY. Establish a NEW PAGE
\section{What this file is}        % Largest unit of class ARTICLE
This is a real \LaTeX\ document that explains the most common syntax and the function of several high-value packages.
\section*{Unnumbered Section}                   % Unnumbered section                    
The goal is to show you the \emph{workflow-ready core} (structure, lists, tables, figures, references, bibliography).

\section{Document structure}
\begin{itemize}[noitemsep,leftmargin=*]
  \item \textbf{Preamble} (above \verb|\begin{document}|): configuration, packages, custom commands.
  \item \textbf{Body} (between \verb|\begin{document}| and \verb|\end{document}|): your content.
  \item \textbf{Commands} start with a backslash, e.g., \verb|\section{Title}|.
  \item \textbf{Environments} wrap blocks, e.g., \verb|\begin{itemize} ... \end{itemize}|.
\end{itemize}

\subsection{Texts}
\subsubsection{Comments and paragraphs}
A percent sign starts a comment. Blank lines start a new paragraph.

\subsubsection{Special characters (escaping)}
To print these characters literally, escape them: \verb|\# \% \& \$ \_ \{ \} \textbackslash|.

\subsubsection{Text Formatting}              % Do not appear in toc(depends on \setcounter{tocdepth}{n})
\textbf{BOLD TEXT}                 % Boldface
\textit{ITALIC TEXT}               % Italic
\texttt{TYPEWRITER TEXT}           % Typewriter. Used for codes or URL.
\textsc{SMALL CAPS}                % Small Caps. Used for name, abbreviations, terminologies.
\underline{UNDERLINED TEXT}        % Underlined
\emph{EMPHASIZED TEXT}             % Emphasis

\paragraph{Dashing}                   % Used for paragraph headings. Unnumbered, run-in heading
\textbf{Hyphen (-)}: Used for compound words, such as \textit{high-tech}.
\textbf{En-dash (--)}: Used for numerical ranges, such as 1921--2026.
\textbf{Em-dash (---)}: Used for pauses within a sentence or as parenthetical dashes, indicating a shift in thought.
\ldots                             % For ellipsis, instead of ...

\subparagraph{Cross-references and navigation}                % Smallest unit of LaTeX
\label{KEY}                        % The ANCHOR. It records the current value of the most recent counter (e.g., section number, figure number) and the page number.
\ref{KEY}                          % The ECHO. It prints the value of the counter associated with the label.
\pageref{KEY}                      % Prints the page number where the label is located.
\cite{KEY}

\subsubsection{Quoting}            % Use `csquotes` package
\enquote{First level quoting, \enquote{nested quoting}.}

\appendix                          % THEN sectioning commands. Rarely used.

\subsubsection{Font Size Declarations}
{\small Small texts.}              % 0.9x
{\normalsize Normal size text.}    % 1.0x
{\large Large text.}               % 1.2x
{\Large Larger than large.}        % 1.44x
{\LARGE More Larger.}              % 1.73x
{\huge Huge text.}                 % 2.07x
{\Huge Larger than Huge.}          % 2.49x

\section{Color and hyperlinks}
\subsection{\texttt{xcolor}}
Use \texttt{xcolor} for colored text and custom color definitions.
\begin{itemize}[noitemsep,leftmargin=*]
  \item \textcolor{Accent}{Colored text} via \verb|\textcolor{Accent}{...}|.
  \item Named colors and HEX colors via \verb|\definecolor|.
\end{itemize}

\subsection{\texttt{hyperref}}
Use \texttt{hyperref} to make references, citations, and URLs clickable in the PDF.
\begin{itemize}[noitemsep,leftmargin=*]
  \item URL: \url{https://www.latex-project.org}
  \item Named link: \href{https://www.ctan.org}{CTAN}
\end{itemize}

\section{Lists (80/20 formatting control with \texttt{enumitem})}
Default lists are often too spaced out. \texttt{enumitem} gives compact control:
\begin{itemize}[noitemsep,leftmargin=*]
  \item Bullets: \verb|itemize|
  \item Numbers: \verb|enumerate|
  \item Control spacing/indent: \verb|[noitemsep,leftmargin=*]|
\end{itemize}

\subsection{Examples}
\begin{enumerate}[noitemsep,leftmargin=*]
  \item First numbered item
  \item Second numbered item
\end{enumerate}

\section{Figures (syntax) and \texttt{graphicx}}
In real documents, figures are usually wrapped in a \verb|figure| environment and referenced by \verb|\label|/\verb|\ref|.

\subsection{A compile-safe placeholder figure}
Figure~\ref{fig:placeholder} is a placeholder that compiles without external image files.

\begin{figure}[t]
  \centering
  \fbox{\rule{0pt}{1.5in}\rule{0.85\linewidth}{0pt}}
  \caption{Placeholder figure box (replace with \texttt{\textbackslash includegraphics}).}
  \label{fig:placeholder}
\end{figure}

\subsection{Real image inclusion (source syntax)}
\begin{verbatim}
\begin{figure}[t]
  \centering
  \includegraphics[width=0.8\linewidth]{figures/myplot.pdf}
  \caption{My plot.}
  \label{fig:myplot}
\end{figure}
\end{verbatim}

\section{Tables (the most common stack: \texttt{booktabs} + \texttt{tabularx} + \texttt{longtable})}
\subsection{\texttt{booktabs}: publication-quality rules}
Table~\ref{tab:booktabs} uses \verb|\toprule|/\verb|\midrule|/\verb|\bottomrule| (preferred over vertical lines).

\begin{table}[t]
  \centering
  \begin{tabular}{lrr}
    \toprule
    Method & Score & Time (s) \\
    \midrule
    Baseline & 0.71 & 12.4 \\
    Improved & 0.79 & 13.1 \\
    \bottomrule
  \end{tabular}
  \caption{A \texttt{booktabs} example.}
  \label{tab:booktabs}
\end{table}

\subsection{\texttt{tabularx}: auto-wrapping columns}
Use \texttt{tabularx} when you have a text-heavy column that must fit the page width.

\begin{table}[t]
  \centering
  \begin{tabularx}{0.95\linewidth}{lX}
    \toprule
    Key & Description (auto-wrapping X column) \\
    \midrule
    Traceability & A short narrative that wraps naturally without manual line breaks. \\
    Reproducibility & Enough detail for another reader to verify sources and computations. \\
    \bottomrule
  \end{tabularx}
  \caption{A \texttt{tabularx} example.}
\end{table}

\subsection{\texttt{longtable}: tables that can span pages}
Use \texttt{longtable} for long datasets in appendices. This example shows the syntax (it may or may not page-break depending on your PDF layout).

\begin{longtable}{ll}
\caption{A \texttt{longtable} example (multi-page capable).}\label{tab:longtable}\\
\toprule
ID & Note \\
\midrule
\endfirsthead
\toprule
ID & Note (continued) \\
\midrule
\endhead
\midrule
\multicolumn{2}{r}{Continued on next page} \\
\endfoot
\bottomrule
\endlastfoot
01 & Row content \\
02 & Row content \\
03 & Row content \\
04 & Row content \\
05 & Row content \\
06 & Row content \\
07 & Row content \\
08 & Row content \\
09 & Row content \\
10 & Row content \\
11 & Row content \\
12 & Row content \\
13 & Row content \\
14 & Row content \\
15 & Row content \\
16 & Row content \\
17 & Row content \\
18 & Row content \\
19 & Row content \\
20 & Row content \\
\end{longtable}

\section{Cross-references (the non-negotiable habit)}
Use \verb|\label| and \verb|\ref| instead of hardcoding numbers.
\begin{itemize}[noitemsep,leftmargin=*]
  \item Figure reference: Figure~\ref{fig:placeholder}
  \item Table reference: Table~\ref{tab:booktabs}
\end{itemize}

\noindent Best practice:
\begin{verbatim}
\caption{...}
\label{fig:meaningful-key} % label AFTER caption in figures/tables
\end{verbatim}

\section{Bibliography (biblatex + biber) and the natbib alternative}
This document uses \texttt{biblatex} (recommended for new projects). Here are two citations:
Knuth's \emph{The \TeX book} \parencite{knuth1984texbook} and Lamport's \LaTeX\ book \parencite{lamport1994latex}.

\subsection{Core biblatex syntax}
\begin{verbatim}
\usepackage[backend=biber,style=authoryear]{biblatex}
\addbibresource{refs.bib}
Cite: \parencite{key} or \textcite{key}
Print: \printbibliography
\end{verbatim}

\subsection{natbib + BibTeX (when to use)}
Use \texttt{natbib} when a venue/template requires BibTeX \texttt{.bst} styles or provides a fixed BibTeX pipeline.
\begin{verbatim}
\usepackage{natbib}
Cite: \citet{key} \citep{key}
\bibliographystyle{plainnat}
\bibliography{refs}
\end{verbatim}

\printbibliography

\section{Minimal practice checklist}
\begin{enumerate}[noitemsep,leftmargin=*]
  \item Change the margin in \texttt{geometry} and recompile.
  \item Add one new item to a list and recompile.
  \item Add a new row to a table and recompile.
  \item Add a new citation entry in the embedded \texttt{.bib} and cite it.
  \item Add a \verb|\label|/\verb|\ref| pair somewhere new and verify it resolves (compile twice).
\end{enumerate}

\end{document}
```

### Common Packages

Encoding/language: 
  * `inputenc` (legacy): Enables UTF-8 input for pdfLaTeX; use only for older pdfLaTeX workflows or legacy templates—avoid if using modern UTF-8-by-default setups or XeLaTeX/LuaLaTeX.
  * `fontenc`: Controls font encoding in pdfLaTeX (e.g., T1) for correct hyphenation and copy/paste of accented characters; use for Western-language documents compiled with pdfLaTeX.
  * `babel`: Language and typographic rules (hyphenation patterns, captions, date formats) primarily for pdfLaTeX (also works elsewhere); use when writing in one or multiple languages and you want correct language-specific conventions.
  * `polyglossia`: Language management designed for XeLaTeX/LuaLaTeX as an alternative to `babel`; use when compiling with XeLaTeX/LuaLaTeX, especially for multilingual documents.

Fonts:  (XeLaTeX/LuaLaTeX)
  * `lmodern`: Provides Latin Modern fonts (a cleaner, extended Computer Modern) with good PDF output; use for a quick, high-quality default in pdfLaTeX documents.
  * `fontspec`: Lets you select system/OpenType fonts and control font features; use when compiling with XeLaTeX/LuaLaTeX and you need modern fonts, Unicode scripts, or precise typography.

Layout:
  * `geometry`: Sets page size and margins with simple options; use whenever you need predictable margin control (papers, theses, submissions).
  * `setspace`: Adjusts line spacing (single/1.5/double) cleanly; use for thesis requirements, manuscripts, or reviewer-friendly drafts.

Graphics:
  * `graphicx`: Adds `\includegraphics` and sizing/rotation options for images; use whenever you insert figures (PNG/JPG/PDF).

Color: 
  * `xcolor`: Defines and manages colors for text, tables, and drawing packages; use when you need colored text/links/tables or any custom color definitions.

Hyperlinks:
  * `hyperref`: Creates clickable references, citations, URLs, and PDF metadata; use in almost all documents intended for digital reading, typically loaded late in the preamble.
  * `cleveref`: A "smart" referencing tool. It detects the type of element (Table, Figure, Section) and automatically adds the prefix (e.g., instead of typing Section~`\ref{sec:intro}`, you just type `\cref{sec:intro}`).

Lists: 
  * `enumitem`: Controls list spacing, indentation, and labels for `itemize/enumerate`; use when default list formatting is too spaced out or you need consistent compact lists.

Tables: 
  * `booktabs`: Provides professional horizontal rules (`\toprule`, `\midrule`, `\bottomrule`) and promotes clean table design; use for publication-quality tables (avoid vertical rules).
  * `tabularx`: Adds a table environment that auto-adjusts column widths to a target table width; use when you have text-heavy columns and want the table to fit the page neatly.
  * `longtable`: Enables tables that span multiple pages with repeating headers; use for long datasets, catalogs, or appendices where tables cannot fit on one page.

Bibliography:
`* `biblatex` + `biber`: Modern bibliography system with flexible styles, robust localization, and fine-grained control; use for new projects unless a venue forces BibTeX/natbib.
* `natbib` + BibTeX: Classic citation interface widely supported by journal templates and legacy workflows; use when a publisher/template requires BibTeX-based compilation or provides `.bst` styles.
`

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
