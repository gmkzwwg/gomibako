---
category: Sheet
title: Regex - Basic Syntax and Practical Usage
tags: Tips
---

## Basic Syntax


#### Match Characters

| Syntax                           | Syntax Name                 | Description                                     | Example                                        |
| -------------------------------- | --------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| `.`                              | any char                    | any single char (except newline unless DOTALL)  | `a.b` → `aXb`                                  |
| `\n`                             | newline                     | line break                                      | `foo\nbar`                                     |
| `\t`                             | tab                         | tab char                                        | `a\tb`                                         |
| `\\`                             | escape `\`                  | literal backslash                               | `C:\\Windows\\` → `C:\Windows\`                |
| `\.\*\+\?\^\$\|\(\)\[\]\{\}`     | escape metachar             | treat as literal                                | `a\+b` → `a+b`                                 |
| `[abc]`                          | char class                  | one of listed                                   | `gr[ae]y` → `gray/grey`                        |
| `[^abc]`                         | negated class               | anything but listed                             | `[^0-9]+` → non-digits run                     |
| `[a-z]`                          | range                       | any in range                                    | `[A-Za-z_]\w*` → identifier-like               |
| `[\s\S]`                         | any char (portable)         | any char incl newline                           | `[\s\S]*` → “match all”                        |
| `\d`                             | digit                       | `[0-9]` (engine-dependent for Unicode)          | `\d{4}` → `2025`                               |
| `\D`                             | not digit                   | `[^0-9]`                                        | `\D+`                                          |
| `\w`                             | word char                   | letters/digits/underscore (Unicode rules vary)  | `\w+` → word token                             |
| `\W`                             | not word                    | non-`\w`                                        | `\W+`                                          |
| `\s`                             | whitespace                  | space/tab/newline etc.                          | `\s+` → normalize gaps                         |
| `\S`                             | not whitespace              | non-space                                       | `\S+@\S+` → rough email                        |
| `\b`                             | word boundary               | between `\w` and `\W`                           | `\bcat\b` → whole word `cat`                   |
| `\B`                             | not boundary                | not at word boundary                            | `\Bing` → `sing` (`ing` not starting boundary) |
| `^`                              | start anchor                | start of string/line (multiline)                | `^ERROR:` → line starts with `ERROR:`          |
| `$`                              | end anchor                  | end of string/line (multiline)                  | `;$` → line ends with `;`                      |
| `\A`                             | absolute start              | start of entire string                          | `\A#` → first char `#`                         |
| `\Z`                             | absolute end                | end (before final newline in some engines)      | `\Z`                                           |
| `\z`                             | strict end                  | end of entire string                            | `\z`                                           |
| `(?m)`                           | multiline mode              | `^/$` apply per line                            | `(?m)^\s*#.*$` → comment lines                 |
| `(?s)`                           | dotall mode                 | `.` matches newline                             | `(?s)<tag>.*</tag>`                            |
| `(?i)`                           | case-insensitive            | ignore case                                     | `(?i)\bjson\b` → `JSON/Json`                   |
| `(?x)`                           | free-spacing                | allow spaces/comments                           | `(?x) \d{4} - \d{2} - \d{2}`                   |

#### Specify the Number of Objects

| Syntax                           | Syntax Name                 | Description                                     | Example                                        |
| -------------------------------- | --------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| `*`                              | 0+ quantifier               | repeat 0 or more (greedy)                       | `ab*` → `a`, `ab`, `abbb`                      |
| `+`                              | 1+ quantifier               | repeat 1 or more                                | `\d+` → number                                 |
| `?`                              | 0/1 quantifier              | optional                                        | `colou?r` → `color/colour`                     |
| `{n}`                            | exact count                 | exactly `n`                                     | `\d{2}` → `07`                                 |
| `{n,}`                           | at least                    | `n` or more                                     | `\d{3,}` → `123`                               |
| `{n,m}`                          | range count                 | between `n` and `m`                             | `\d{1,3}` → octet-like                         |
| `*?` `+?` `??` `{n,m}?`          | lazy quantifier             | minimal match                                   | `<.*?>` → shortest tag                         |
| `*+` `++` `{n,m}+`               | possessive quantifier       | no backtrack (engine-dependent)                 | `\d++\w` → fails fast if no `\w`               |

#### Grouping and Condition

| Syntax                           | Syntax Name                 | Description                                     | Example                                        |
| -------------------------------- | --------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| a\|b                             | alternation                 | match left or right                             | cat\|dog                                     |
| `( … )`                          | capturing group             | capture for backref/extract                     | `(\d{4})-(\d{2})-(\d{2})`                      |
| `$n`                               | duplicate group n           | when replacing, copy group n in result        | (adc)apc then $1!$1  → adc!adc
| `(?: … )`                        | non-capturing group         | group w/o capture                               | `(?:https?)://\S+`                             |
| `(?P<name> … )` / `(?<name> … )` | named capture               | capture by name (syntax varies)                 | `(?P<y>\d{4})-(?P<m>\d{2})`                    |
| `\1` `\2`                        | numbered backref            | repeat captured text                            | `(\w+)\s+\1` → doubled word                    |
| `(?P=name)` / `\k<name>`         | named backref               | repeat named capture                            | `(?P<w>\w+)\s+(?P=w)`                          |
| `(?= … )`                        | positive lookahead          | next chars must match                           | `\w+(?=\.)` → word before `.`                  |
| `(?! … )`                        | negative lookahead          | next chars must NOT match                       | `^(?!.*password).*` → line w/o `password`      |
| `(?<= … )`                       | positive lookbehind         | prev chars must match                           | `(?<=\$)\d+` → digits after `$`                |
| `(?<! … )`                       | negative lookbehind         | prev chars must NOT match                       | `(?<!\.)\bcom\b` → `com` not after `.`         |
| `(?> … )`                        | atomic group                | no backtrack inside (engine-dependent)          | `(?>\d+)\d` → prevents “giveback”              |
| `\G`                             | contiguous anchor           | start where last match ended (engine-dependent) | `\G,\s*\w+` → parse CSV tokens                 |
| `\Q … \E`                        | quote literal span          | treat everything literal (engine-dependent)     | `\Q(a+b)*\E`                                   |
| `(?=^.{8,}$)`                    | length check                | whole-string constraint                         | `(?=^.{8,}$)(?=.*\d).*` → >=8 and has digit    |
| `(?:(?=…).*?)`                   | “find all overlaps” pattern | use lookahead to overlap                        | `(?=(\d{2}))` → overlapping 2-digit windows    |
| `(?# … )`                        | inline comment              | comment (engine-dependent)                      | `\d+(?#id)\w+`                                 |

#### Greedy Mode v.s. Lazy Mode

Greedy vs lazy (non-greedy) quantifiers in regex describe **how much text a quantifier tries to consume**.

* **Greedy**: matches **as much as possible** while still allowing the overall match to succeed. Use **greedy** when you want to go to the **last possible delimiter** (last slash, last dot, last colon).
* **Lazy / non-greedy**: matches **as little as possible** while still allowing the overall match to succeed. Use **lazy** when your delimiters repeat and you want the **nearest closing delimiter** (quotes, tags, parentheses, repeated blocks).

Lazy is typically written by adding `?` after a quantifier: `*?`, `+?`, `??`, `{m,n}?`.

Text:

```text
a "one" b "two"
```

* Greedy: `".*"` → matches `"one" b "two"`
* Lazy: `".*?"` → matches `"one"`

**Frequent use cases**

| Goal (use case)                                                              | Example text              | Greedy pattern     | Lazy pattern         | What you usually want                    |
| ---------------------------------------------------------------------------- | ------------------------- | ------------------ | -------------------- | ---------------------------------------- |
| Extract the **first** quoted string                                          | `a "one" b "two"`         | `".*"`             | `".*?"`              | Lazy (`"one"`)                           |
| Match each **HTML tag** separately (not the whole line)                      | `<b>x</b><i>y</i>`        | `<.*>`             | `<.*?>`              | Lazy (`<b>`, then `<\/b>`, etc.)         |
| Capture content between **BEGIN/END** blocks one-by-one                      | `BEGIN A END BEGIN B END` | `BEGIN.*END`       | `BEGIN.*?END`        | Lazy (`BEGIN A END`, then `BEGIN B END`) |
| Get everything up to the **last** slash (directory part)                     | `path/to/file.txt`        | `^.*/`             | `^.*?/`              | Greedy (`path/to/`)                      |
| Get everything up to the **last** dot (remove last extension)                | `a.b.c.tar.gz`            | `^.*\.`            | `^.*?\.`             | Greedy (`a.b.c.tar.`)                    |
| Extract a Markdown link `[text](url)` safely (avoid spanning multiple links) | `[a](u) [b](v)`           | `\[(.*)\]\((.*)\)` | `\[(.*?)\]\((.*?)\)` | Lazy (`[a](u)` first)                    |

## Practical Usage



| Practical Target                    | Regex (Common)                                                                    | → Matches / Use                            |
| ----------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------ |
| email (basic)                       | `\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b`                              | → typical emails (not RFC-perfect)         |
| email (strict-ish)                  | `(?i)\b[a-z0-9.!#$%&'*+/=?^_\\{\|\}~-]+@(?:[a-z0-9-]+.)+[a-z]{2,}\b`              | → broader local-part chars                 |
| URL (http/https)                    | `https?://[^\s<>"']+`                                                             | → common URLs in text                      |
| domain (hostname)                   | `\b(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}\b`                                            | → `example.com`                            |
| IPv4                                | `\b(?:(?:25[0-5]\|2[0-4]\d\|1?\d?\d).){3}(?:25[0-5]\|2[0-4]\d\|1?\d?\d)\b`        | → valid IPv4 octets                        |
| IPv6 (full + compressed, practical) | `\b(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}\b\|\b(?:[0-9A-Fa-f]{1,4}:){1,7}:\b\|\b:(?::[0-9A-Fa-f]{1,4}){1,7}\b\|\b(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}\b` | → common IPv6 forms incl `::` (not every edge case) |
| MAC address                         | `\b(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}\b`                                     | → `00:1A:2B:...` or `00-1A-...`            |
| Windows path                        | `(?:[A-Za-z]:\(?:[^\/:*?"<>\|\r\n]+\)*[^\/:*?"<>\|\r\n]*)`                        | → `C:\Users\name\file.txt`                 |
| Unix path                           | `/(?:[^/\0]+/)*[^/\0]*`                                                           | → `/usr/local/bin/` etc                    |
| file extension                      | `\.[A-Za-z0-9]{1,10}\b`                                                           | → `.pdf` `.tar` `.mp4`                     |
| filename (no path)                  | `[^\\/\s]+?\.[A-Za-z0-9]{1,10}\b`                                                 | → `report_v2.docx`                         |
| Windows UNC path                    | `\[A-Za-z0-9.*-]+[A-Za-z0-9.$*-]+(?:[^\/:*?"<>\|\r\n]+)*`                         | → `\\server\share\dir`                     |
| JSON key (simple)                   | `"([^"\]\|\.)+"\s*:`                                                              | → `"key":` robust vs escaped quotes        |
| number (int/float)                  | `[-+]?(?:\d+.?\d*\|.\d+)(?:[eE][-+]?\d+)?`                                        | → `-3.2e+5`                                |
| date (YYYY-MM-DD)                   | `\b\d{4}-\d{2}-\d{2}\b`                                                           | → ISO-like dates                           |
| time (HH:MM)                        | `\b(?:[01]\d\|2[0-3]):[0-5]\d(?::[0-5]\d)?\b`                                     | → `23:59` `23:59:59`                       |
| credit card (format only)           | `\b(?:\d[ -]*?){13,19}\b`                                                         | → shape check only (not Luhn)              |
| duplicate word                      | `\b(\w+)(?:\s+\1\b)+`                                                             | → `the the`                                |
| trim leading/trailing spaces        | `^\s+\|\s+$`                                                                      | → cleanup                                  |
| collapse whitespace                 | `\s+`                                                                             | → replace with single space                |
| extract quoted strings              | `"(?:[^"\]\|\.)*"`                                                                | → JSON-ish quoted spans                    |
| strip HTML tags (rough)             | `<[^>]+>`                                                                         | → remove tags (not a parser)               |
| log line level                      | `^(INFO\|WARN\|ERROR\|DEBUG)\b`                                                   | → classify level at line start             |
| grep “contains all”                 | `(?=.*foo)(?=.*bar).*`                                                            | → line has `foo` and `bar`                 |
| SRT timestamp line                  | `^\s*\d+\s*$\R^\s*(\d{2}:\d{2}:\d{2},\d{3})\s*` --> `\s*(\d{2}:\d{2}:\d{2},\d{3}).*$` | → capture start/end times (multiline mode) |
| SRT text lines (exclude index/time) | `^(?!\d+$)(?!\d{2}:\d{2}:\d{2},\d{3}\s*` --> `\s*\d{2}:\d{2}:\d{2},\d{3}).+`      | → subtitle text lines only                 |
| SRT → plain text (block grab)       | `(?ms)^\d+\R\d{2}:\d{2}:\d{2},\d{3}\s*` --> `\s*\d{2}:\d{2}:\d{2},\d{3}\R(.*?)(?:\R\R\|\z)` | → capture each subtitle block text  |
| SRT to Texts                        | `\n\n[0-9]+\n[0-9]+:[0-9]+:[0-9]+,[0-9]+ --> [0-9]+:[0-9]+:[0-9]+,[0-9]+\n`       | → convert subtitles to texts               |
| extract code fence blocks           | `(?s)```(\w+)?\R(.*?)\R``` `                                                      | → fenced code segments                     |
| env var `${VAR}`                    | `\$\{[A-Za-z_][A-Za-z0-9_]*\}`                                                    | → `${HOME}`                                |
| shell `$VAR`                        | `$(?:[A-Za-z_][A-Za-z0-9_]*\|{[A-Za-z_][A-Za-z0-9_]*})`                           | → `$PATH` or `${PATH}`                     |
| AV Code                             | `\(Av[0-9]+,P[0-9]+\)`                                                            | → av12345                                  | 
| Markdown Links | `\[.+?\]?\(.+?\)` | `[google official](www.google.com)` |

## Tips

* What regex is (and isn’t)

  * Regex = pattern language for matching/extracting/replacing text in strings `→` “describe a shape of text”.
  * Regex is best for *regular* textual structure; it is a poor tool for full parsing of nested grammars (HTML/XML with nesting, full programming languages) `→` use a parser.

* When to use regex

  * Find occurrences in free text `→` logs, configs, documents (`ERROR:…`, URLs, IDs).
  * Extract structured pieces `→` capture groups for dates, tags, key/value, filenames.
  * Normalize/clean text `→` trim, collapse whitespace, remove markup-like noise.
  * Quick pre-validation (screening) `→` “looks like an email/UUID” before deeper validation.

* When not to use regex

  * When correctness requires full grammar compliance `→` RFC email, full URL grammar, IPv6 edge cases.
  * When structure is hierarchical/nested or context-sensitive `→` HTML with nested tags, balanced parentheses (beyond limited cases).

* Minimal matching building blocks

  * Literals and escaping: `.` `*` `+` `?` `(` `)` `[` `]` are special `→` use `\.` `\+` `\(` to match them literally.
  * Character classes: `[abc]` `[a-z]` `[^…]` `→` “one char from a set”.
  * Shorthands: `\d \w \s` and their negations `\D \W \S` `→` digits/word/space (Unicode behavior varies by engine).
  * Anchors/boundaries: `^` `$` `\b` `\A` `\z` `→` “where” a match is allowed, not “what”.

* Quantifiers and greediness (core failure source)

  * Repetition: `*` `+` `?` `{n,m}` `→` how many times.
  * Greedy vs lazy: `.*` grabs most; `.*?` grabs least `→` prefer lazy when delimiting with end markers.
  * Catastrophic backtracking risk: nested ambiguous quantifiers `→` avoid patterns like `(.*)*`, prefer tighter classes (e.g., `[^"]*` instead of `.*` inside quotes).

* Grouping and extraction

  * Grouping: `( … )` groups; `(?: … )` groups without capturing.
  * Captures: `(\d{4})-(\d{2})-(\d{2})` `→` extract year/month/day.
  * Backreferences: `\1` (or named) `→` enforce repetition (e.g., duplicate words).

* Alternatives and conditions

  * Alternation: `A|B` `→` choose one; always group when mixing with quantifiers: `(?:cat|dog)s?`.

* Lookarounds (context without consuming)

  * Lookahead: `X(?=Y)` / `X(?!Y)` `→` “followed by / not followed by”.
  * Lookbehind: `(?<=X)Y` / `(?<!X)Y` `→` “preceded by / not preceded by” (support varies; often fixed-length only).

* Flags / modes (change meaning of basics)

  * Case-insensitive: `i` `→` `(?i)`.
  * Multiline: `m` `→` `^/$` work per line.
  * Dotall: `s` `→` `.` includes newline.
  * Free-spacing: `x` `→` readable patterns with spaces/comments.

* Engine reality (portability)

  * “Regex” is not one standard `→` PCRE, Java, .NET, JavaScript, Python differ (lookbehind, Unicode classes, possessive quantifiers, named-group syntax).
  * Always know the target engine (language/tool) before writing “clever” constructs.

* How to use regex safely in practice

  * Start strict then relax: anchor first (`^…$`) if you mean full-string match; otherwise omit anchors for searching.
  * Prefer explicit character classes over `.` in structured contexts `→` `[^,]*` for CSV-like fields, `[^"]*` for quoted segments.
  * Make input normalization explicit `→` trim/casefold first when appropriate.
  * Treat regex validation as a filter `→` follow with actual parsing/validation where correctness matters.

* Replacement essentials (using matches)

  * Replacement uses captured groups `→` `$1`/`${name}` (varies by engine).
  * Common transforms: `^\s+|\s+$` `→` trim; `\s+` `→` collapse spaces; `(\w+)\s+\1` `→` dedupe repeated word.
