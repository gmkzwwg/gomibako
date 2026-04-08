---
layout: post
category: Sheet
subclass: Linux
abbreviation: Linux Shell
title: Linux Shell Programming
toc_before_content: chart
---

## Intro to Shell

### Shell Programming

Shell programming is the practice of writing scripts for a command-line shell such as `bash` or `sh`. Its main role is orchestration: invoking programs, connecting them with pipelines, handling files and directories, reading environment variables, checking exit statuses, and automating repetitive command-line tasks.

A shell script is usually not the place to build a large internal application model. It is most effective when the system already provides the real work through existing commands, and the script mainly coordinates them.

### When to Use It, and When not to Use It

What shell programming is good at:

* glue code between existing commands
* automation of repetitive terminal tasks
* deployment hooks and setup scripts
* build and release wrappers
* file, directory, and log processing
* batch execution over many inputs
* environment initialization
* system administration and maintenance tasks
* simple text processing around Unix tools
* process and pipeline orchestration

What makes shell attractive:

* direct access to the Unix process model
* natural use of pipes and redirection
* easy integration with existing command-line tools
* very low startup cost for short scripts
* excellent for tasks already expressible as terminal commands
* convenient for system-level scripting on Linux

When shell is a good choice:

* the task is mostly “run these commands in this order”
* most of the work is being done by external tools
* inputs and outputs are files, streams, or command results
* the script is short or medium sized
* the logic is straightforward and procedural
* the script is tied closely to a Unix or Linux environment
* fast iteration matters more than building a large software architecture

When shell is usually the wrong tool:

* the program needs complex data structures
* the task requires complicated parsing
* the codebase will become large
* the logic is deeply nested or algorithmically heavy
* strong abstraction and modularity are required
* the program must be highly portable across non-shell environments
* the task involves heavy numerical computation
* the task requires robust concurrency or long-running service behavior
* the project needs extensive testing, refactoring, and long-term maintainability
* error handling becomes more complex than the command orchestration itself

A practical rule:

* use shell when the problem is mainly command orchestration
* do not use shell when the problem is mainly application logic

Typical examples where shell fits well:

* backup scripts
* installer scripts
* project bootstrap scripts
* CI helper scripts
* service start/stop wrappers
* file conversion batches
* log filtering pipelines
* environment setup scripts

Typical examples where another language is better:

* a web service
* a parser for a complicated file format
* a stateful daemon
* a program with many internal data relationships
* a concurrent worker system
* a large CLI application with substantial internal logic

Language choice in practice:

* use `sh` when strict POSIX portability is required
* use `bash` when you want a richer and more practical scripting environment on Linux

Bash is often preferred on Linux because it provides:

* arrays
* associative arrays
* `[[ ... ]]`
* `(( ... ))`
* process substitution
* better string and parameter handling
* more convenient scripting features overall

## Using Linux Scripts

### Script basics: `#!/usr/bin/env bash` `chmod +x` `./script.sh` `bash script.sh` `source` `.sh`

Create a script:

```bash id="60ymr"
#!/usr/bin/env bash

echo "Hello, world"
```

Save as:

```bash id="z4n4gu"
hello.sh
```

Make executable:

```bash id="v6irxe"
chmod +x hello.sh
```

Run it:

```bash id="nv0w77"
./hello.sh
```

Or invoke explicitly:

```bash id="km9u4e"
bash hello.sh
```

Shebang:

```bash id="09eyri"
#!/usr/bin/env bash
```

This tells the system which interpreter should run the script.

Common forms:

```bash id="imge96"
#!/usr/bin/env bash
#!/bin/bash
#!/usr/bin/env sh
```

Use `bash` when you rely on Bash features such as arrays, `[[ ... ]]`, `mapfile`, `shopt`, or associative arrays.

*Common Pitfalls: `source script.sh` runs in the current shell, while `bash script.sh` or `./script.sh` runs in a new shell; use shell only when command orchestration is the main task, not when the logic has grown into a real application.*

### Execution model: `source` `.` subshell current-shell environment

Run in a new shell:

```bash id="f7bipu"
bash script.sh
./script.sh
```

Run in current shell:

```bash id="xw77g3"
source script.sh
. script.sh
```

Use `source` only when the script is supposed to modify the current shell environment, for example exporting variables or defining functions.

*Common Pitfalls: sourcing a script that assumes a clean process can unexpectedly overwrite variables, shell options, aliases, functions, or the working directory of the current shell.*

### Safe script header: `set -euo pipefail` `IFS` `set -x`

A common strict-mode header:

```bash id="zl8and"
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```

Meaning:

* `set -e`: exit on unhandled command failure
* `set -u`: error on unset variables
* `set -o pipefail`: fail a pipeline if any command fails
* `IFS=$'\n\t'`: reduces accidental word splitting issues

Common debugging mode:

```bash id="6f7w7h"
set -x
```

Turn it off:

```bash id="r6v0lm"
set +x
```

*Common Pitfalls: `set -e` is useful but not magical, because it has exceptions and should not replace explicit error handling in critical sections.*

## Shell Syntax

### Comments: `#` `:`

```bash id="8rj9w6"
# single-line comment
```

There is no real multiline comment syntax. Common workaround:

```bash id="q7u21h"
: '
This block is ignored.
Useful as a temporary comment block.
'
```

*Common Pitfalls: the `: ' ... '` pattern is only a workaround and can still misbehave if the quoted block accidentally contains conflicting quote characters.*

### Variables: assignment `export` `readonly` `local` `${var}`

Assignment: no spaces around `=`.

```bash id="ikxjsk"
name="alice"
count=42
path="/tmp/data"
```

Wrong:

```bash id="trj7b6"
name = "alice"
```

Access:

```bash id="tlqqn7"
echo "$name"
echo "${count}"
```

Prefer braces when concatenating:

```bash id="nz1w5v"
file="${name}.txt"
```

Export environment variables:

```bash id="hfqgzk"
export API_KEY="secret"
export PATH="$HOME/bin:$PATH"
```

Read-only variables:

```bash id="vci2x3"
readonly VERSION="1.0"
declare -r VERSION="1.0"
```

Local variables in functions:

```bash id="nh16bk"
my_func() {
  local msg="inside"
  echo "$msg"
}
```

*Common Pitfalls: `name = value` is invalid in shell, and unquoted expansions such as `$name` often break when values contain spaces or glob characters.*

### Parameters and arguments: `$0` `$1` `$#` `$?` `"$@"` `"$*"` `shift`

Positional parameters:

```bash id="gf2ajh"
$0   # script name
$1   # first argument
$2   # second argument
$#   # number of arguments
"$@" # all arguments, preserved as separate words
"$*" # all arguments as one string
$$   # current shell PID
$?   # last command exit status
```

Example:

```bash id="lbj0e6"
#!/usr/bin/env bash
echo "script: $0"
echo "arg1: $1"
echo "arg count: $#"
printf 'all args: %s\n' "$@"
```

Run:

```bash id="v9mr0f"
./demo.sh one two three
```

Shift arguments:

```bash id="sr8z7g"
while (($# > 0)); do
  echo "arg: $1"
  shift
done
```

Always prefer `"$@"`:

```bash id="7tby89"
for arg in "$@"; do
  echo "$arg"
done
```

Usually wrong:

```bash id="l0rv8x"
for arg in $@; do
  echo "$arg"
done
```

*Common Pitfalls: `"$@"` preserves argument boundaries, while `$@` and `$*` often do not behave as intended once spaces or empty arguments appear.*

### Reading input: `read -r` `read -p` `read -s` `while IFS= read -r`

Read one value:

```bash id="hsatgr"
read -r name
```

Prompt inline:

```bash id="n90rm4"
read -r -p "Name: " name
```

Silent input:

```bash id="8w21x0"
read -r -s -p "Password: " password
echo
```

Read into multiple variables:

```bash id="ue9gwj"
read -r first last
```

Read a file line by line:

```bash id="8xb78b"
while IFS= read -r line; do
  echo "$line"
done < input.txt
```

*Common Pitfalls: `read -r` is usually the right default because plain `read` interprets backslashes, and `for line in $(cat file)` is almost never the correct way to process lines.*

### Output and redirection: `echo` `printf` `>` `>>` `2>` `2>&1` `/dev/null`

`echo`:

```bash id="sy2ezx"
echo "hello"
```

Prefer `printf` for reliable formatting:

```bash id="pe95o1"
printf 'name=%s count=%d\n' "$name" "$count"
```

Redirect output:

```bash id="tjxpwm"
command > out.txt
command >> out.txt
command 2> err.txt
command > out.txt 2>&1
command &> all.txt
```

Silence output:

```bash id="xangot"
command > /dev/null 2>&1
```

*Common Pitfalls: `echo` is not fully reliable for precise formatting or escape handling, so prefer `printf` when output must be exact.*

### Exit status: `exit` `return` `$?` `if command; then`

Success is `0`. Failure is nonzero.

```bash id="p7o83n"
some_command
status=$?
echo "$status"
```

Direct test:

```bash id="95n1o6"
if some_command; then
  echo "ok"
else
  echo "failed"
fi
```

Exit explicitly:

```bash id="lakzl0"
exit 0
exit 1
```

Return from function:

```bash id="j5z1c8"
return 0
return 1
```

*Common Pitfalls: shell functions return status codes, not arbitrary values; to return data, print it and capture it.*

### Command substitution: `$(...)`

```bash id="m3xbjm"
now=$(date)
files=$(ls)
```

Prefer `$(...)` over backticks:

```bash id="armu1q"
value=$(command)
```

Nested form:

```bash id="t4cd0v"
result=$(outer "$(inner)")
```

*Common Pitfalls: command substitution strips trailing newlines, and using it for line-based iteration often causes unwanted word splitting.*

### Arithmetic: `$(( ))` `(( ))` `++` `+=`

Integer arithmetic:

```bash id="gnt3g2"
x=5
y=3
z=$((x + y))
echo "$z"
```

Common forms:

```bash id="4s0i6l"
((x++))
((x += 10))
((x = y * 2))
```

Arithmetic in conditions:

```bash id="efvwh1"
if ((x > 10)); then
  echo "large"
fi
```

*Common Pitfalls: `(( ... ))` is arithmetic evaluation, not a general expression language, and Bash arithmetic is integer-only unless you delegate to another tool.*

### Quotes and expansion: single-quotes double-quotes word-splitting globbing

Double quotes expand variables and command substitution:

```bash id="3g8c2w"
echo "Hello, $name"
```

Single quotes create literal strings:

```bash id="u1wuo0"
echo 'Hello, $name'
```

No quotes means word splitting and globbing.

Best practice:

```bash id="75edgl"
rm -- "$file"
cp -- "$src" "$dst"
```

*Common Pitfalls: quote expansions by default; remove quotes only when you deliberately want word splitting or glob expansion.*

### Tests and conditionals: `[` `[[` `-f` `-d` `-n` `-z` `&&` `||`

Use `[`:

```bash id="j0kn5r"
if [ -f "$file" ]; then
  echo "file exists"
fi
```

Use `[[ ]]` in Bash when possible:

```bash id="h2xcyw"
if [[ -f $file && $name == a* ]]; then
  echo "match"
fi
```

Common file tests:

```bash id="a2kwna"
-e path
-f path
-d path
-L path
-r path
-w path
-x path
-s path
```

String tests:

```bash id="a91f17"
[[ -z $s ]]
[[ -n $s ]]
[[ $a == $b ]]
[[ $a != $b ]]
[[ $a == prefix* ]]
```

Integer tests:

```bash id="6gjn5g"
((a == b))
((a != b))
((a > b))
((a >= b))
((a < b))
((a <= b))
```

Portable `[` style:

```bash id="ugc41j"
[ "$a" -eq "$b" ]
[ "$a" -gt "$b" ]
[ "$a" -lt "$b" ]
```

Logical operators:

```bash id="yvwxnq"
if [[ cond1 && cond2 ]]; then
  :
fi

if [[ cond1 || cond2 ]]; then
  :
fi

if ! command; then
  :
fi
```

*Common Pitfalls: `[[ ... ]]` is Bash syntax, not POSIX `sh`, and `[` requires spaces around every token, including the closing bracket.*

### if / elif / else: `if` `elif` `else` `fi`

```bash id="nq0jlwm"
if [[ $x -gt 10 ]]; then
  echo "greater"
elif [[ $x -eq 10 ]]; then
  echo "equal"
else
  echo "smaller"
fi
```

*Common Pitfalls: prefer testing commands directly inside `if` rather than capturing `$?` manually unless you need to preserve the status for later use.*

### case: `case` `esac` patterns `|`

```bash id="45r4bh"
case "$1" in
  start)
    echo "starting"
    ;;
  stop)
    echo "stopping"
    ;;
  restart|reload)
    echo "reloading"
    ;;
  *)
    echo "usage: $0 {start|stop|restart}"
    exit 1
    ;;
esac
```

Use `case` for command dispatch and pattern-based branching.

*Common Pitfalls: `case` uses shell patterns, not regular expressions.*

### Loops: `for` `while` `until` `break` `continue`

For over words:

```bash id="u5je9n"
for x in a b c; do
  echo "$x"
done
```

For over arguments:

```bash id="cx99jn"
for arg in "$@"; do
  echo "$arg"
done
```

C-style loop:

```bash id="d3y2ql"
for ((i = 0; i < 10; i++)); do
  echo "$i"
done
```

While loop:

```bash id="npga1u"
i=0
while ((i < 5)); do
  echo "$i"
  ((i++))
done
```

Until loop:

```bash id="g41q6d"
until grep -q ready status.txt; do
  sleep 1
done
```

Break and continue:

```bash id="m8k6je"
for x in "$@"; do
  [[ $x == skip ]] && continue
  [[ $x == stop ]] && break
  echo "$x"
done
```

*Common Pitfalls: avoid `for x in $(command)` for line-based data, because command substitution and word splitting will corrupt many real inputs.*

### Functions: `fn()` `local` `return` `$(fn)`

Define:

```bash id="d6elui"
hello() {
  echo "hello"
}
```

Alternative:

```bash id="ann4h1"
function hello {
  echo "hello"
}
```

Preferred style is the first.

Arguments:

```bash id="t3lydh"
greet() {
  local name=$1
  echo "Hello, $name"
}

greet "Alice"
```

Return status:

```bash id="lyp3qu"
is_even() {
  local n=$1
  ((n % 2 == 0))
}

if is_even 4; then
  echo "even"
fi
```

Return data by printing:

```bash id="j7t0bu"
get_name() {
  echo "alice"
}

name=$(get_name)
```

*Common Pitfalls: `return` only returns a small integer status code from a function; it does not return strings, arrays, or objects.*

### Arrays: `arr=()` `${arr[@]}` `${#arr[@]}` `declare -A`

Indexed arrays:

```bash id="yjv9sn"
arr=(one two three)
echo "${arr[0]}"
echo "${arr[1]}"
```

Append:

```bash id="f1e8fq"
arr+=("four")
```

All elements:

```bash id="jvz6i4"
echo "${arr[@]}"
```

Indices:

```bash id="e41xne"
echo "${!arr[@]}"
```

Length:

```bash id="73d0ea"
echo "${#arr[@]}"
```

Loop:

```bash id="hpe7k4"
for x in "${arr[@]}"; do
  echo "$x"
done
```

Associative arrays:

```bash id="5pcq2h"
declare -A map
map[name]="alice"
map[city]="Paris"

echo "${map[name]}"
```

Loop keys:

```bash id="u3yoxo"
for k in "${!map[@]}"; do
  printf '%s=%s\n' "$k" "${map[$k]}"
done
```

*Common Pitfalls: arrays and associative arrays are Bash features, not POSIX `sh` features.*

### Strings and parameter expansion: `${#var}` `${var:-x}` `${var/pat/repl}` `${var%.*}`

Length:

```bash id="wzkhq4"
s="abcdef"
echo "${#s}"
```

Substring:

```bash id="z44f16"
echo "${s:1:3}"
```

Replace:

```bash id="z3hb3p"
s="a_b_c"
echo "${s/_/-}"
echo "${s//_/-}"
```

Remove prefix/suffix by pattern:

```bash id="mh52p3"
path="/tmp/file.txt"
echo "${path##*/}"
echo "${path%.*}"
```

Case conversion:

```bash id="altl0i"
name="alice"
echo "${name^^}"
echo "${name,,}"
```

Defaults and checks:

```bash id="uowbpo"
echo "${var:-default}"
echo "${var:=default}"
echo "${var:+alt}"
echo "${var:?var is required}"
```

*Common Pitfalls: parameter expansion patterns use shell glob patterns, not regular expressions.*

### Globbing and brace expansion: `*` `?` `[]` `globstar` `nullglob` `{1..5}`

Basic globbing:

```bash id="uayjlwm"
*.txt
file?.sh
src/*
```

Useful shell options:

```bash id="rjq0fk"
shopt -s globstar
shopt -s nullglob
shopt -s dotglob
```

Recursive globbing example:

```bash id="9w6owh"
for f in **/*.py; do
  echo "$f"
done
```

Brace expansion:

```bash id="9qac0m"
echo file{1..5}.txt
echo {a,b,c}
mkdir -p project/{src,bin,test}
```

*Common Pitfalls: brace expansion is purely syntactic and happens before runtime; it is not the same thing as a loop.*

### Here documents and here strings: `<<EOF` `<<'EOF'` `<<<`

Here document:

```bash id="w5xsn1"
cat <<EOF
line 1
line 2
EOF
```

No expansion:

```bash id="jlwmia"
cat <<'EOF'
literal $HOME
EOF
```

Here string:

```bash id="5shisq"
grep foo <<< "$text"
```

*Common Pitfalls: quoting the heredoc delimiter disables variable and command expansion inside the block.*

### Pipelines and process substitution: `|` `pipefail` `<(...)` `< <(...)`

Pipeline:

```bash id="s70mmi"
cat file.txt | grep foo | sort
```

With strict checking:

```bash id="xg6ma2"
set -o pipefail
```

Read pipeline output safely:

```bash id="sls0gx"
grep foo file.txt | while IFS= read -r line; do
  echo "$line"
done
```

Prefer process substitution when variable changes must survive:

```bash id="wz2mfc"
while IFS= read -r line; do
  :
done < <(grep foo file.txt)
```

Process substitution:

```bash id="a2a1x8"
diff <(sort file1) <(sort file2)
```

*Common Pitfalls: pipelines often run loop bodies in a subshell, so variable updates inside them may not survive afterward.*

### Redirects and file descriptors: `0` `1` `2` `>&` `exec 3>`

Standard descriptors:

* `0`: stdin
* `1`: stdout
* `2`: stderr

Separate stdout and stderr:

```bash id="pr8d2a"
command >out.log 2>err.log
```

Append:

```bash id="6l8hwk"
command >>out.log 2>>err.log
```

Custom descriptor:

```bash id="7r600m"
exec 3>debug.log
echo "debug line" >&3
exec 3>&-
```

Read from custom descriptor:

```bash id="kuumz8"
exec 3<input.txt
read -r line <&3
exec 3<&-
```

*Common Pitfalls: redirection order matters; `command >file 2>&1` is not always equivalent to rearranged forms.*

### Temporary files and cleanup: `mktemp` `trap EXIT` `rm -rf`

Use `mktemp`:

```bash id="49ozq9"
tmpfile=$(mktemp)
tmpdir=$(mktemp -d)
```

Cleanup pattern:

```bash id="yrjgvj"
tmpdir=$(mktemp -d)
trap 'rm -rf "$tmpdir"' EXIT
```

*Common Pitfalls: never handcraft temp-file names in `/tmp`; use `mktemp` to avoid races and collisions.*

### Traps: `trap` `EXIT` `INT`

Basic trap:

```bash id="jk8ozt"
trap 'echo "exiting"' EXIT
trap 'echo "interrupted"; exit 130' INT
```

Cleanup example:

```bash id="64v6hr"
tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT
```

Use traps for temp files, lock files, background processes, and state rollback.

*Common Pitfalls: traps are inherited and triggered in ways that can surprise you if the script creates subshells, pipelines, or multiple cleanup paths.*

### Option parsing with getopts: `getopts` `OPTARG` `OPTIND` `shift`

Basic pattern:

```bash id="nr931u"
#!/usr/bin/env bash

verbose=0
output=""

while getopts ":vo:" opt; do
  case "$opt" in
    v) verbose=1 ;;
    o) output=$OPTARG ;;
    :)
      echo "option -$OPTARG requires an argument" >&2
      exit 1
      ;;
    \?)
      echo "invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

shift $((OPTIND - 1))
```

Meaning:

* `v` is a flag
* `o:` requires an argument
* leading `:` changes error handling behavior

Remaining positional arguments are in `"$@"` after the `shift`.

*Common Pitfalls: `getopts` handles short options well but not GNU-style long options by itself.*

### Common script skeleton: `usage()` `cleanup()` `trap` `main "$@"`

```bash id="cy5t6u"
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

usage() {
  echo "Usage: $0 [-v] -o output input..." >&2
  exit 1
}

cleanup() {
  :
}
trap cleanup EXIT

verbose=0
output=""

while getopts ":vo:" opt; do
  case "$opt" in
    v) verbose=1 ;;
    o) output=$OPTARG ;;
    *) usage ;;
  esac
done
shift $((OPTIND - 1))

[[ -n $output ]] || usage
(($# > 0)) || usage

for input in "$@"; do
  [[ -f $input ]] || { echo "missing file: $input" >&2; exit 1; }
  ((verbose)) && printf 'processing %s\n' "$input"
done
```

*Common Pitfalls: putting all logic at top level makes scripts harder to test, source, and reuse; a `main "$@"` style scales better.*

### Common utility patterns: `command -v` `EUID` `BASH_SOURCE` `find -print0` `mapfile`

Check command exists:

```bash id="myr85v"
command -v jq >/dev/null 2>&1 || {
  echo "jq is required" >&2
  exit 1
}
```

Require root:

```bash id="zf4um6"
if ((EUID != 0)); then
  echo "must run as root" >&2
  exit 1
fi
```

Resolve script directory:

```bash id="eh48cq"
script_dir=$(
  cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd
)
```

Iterate files safely:

```bash id="tc354z"
find . -type f -print0 |
while IFS= read -r -d '' file; do
  printf '%s\n' "$file"
done
```

Read full file into array:

```bash id="4yb0ak"
mapfile -t lines < input.txt
printf '%s\n' "${lines[@]}"
```

*Common Pitfalls: never parse `ls` for filenames; use globs, `find`, or null-delimited workflows instead.*

### Advanced Bash features: `BASH_SOURCE` `local -n` `coproc` `select` `extglob` `=~`

`BASH_SOURCE`:

```bash id="o2n2rz"
echo "${BASH_SOURCE[0]}"
```

Nameref:

```bash id="8vjlwm"
set_value() {
  local -n ref=$1
  ref="updated"
}

name="old"
set_value name
echo "$name"
```

Coprocess:

```bash id="jx2m09"
coproc MYPROC { bc -l; }
echo '2 + 2' >&"${MYPROC[1]}"
read -r result <&"${MYPROC[0]}"
echo "$result"
```

Select:

```bash id="jlwmia2"
select choice in start stop quit; do
  case "$choice" in
    start) echo start ;;
    stop) echo stop ;;
    quit) break ;;
  esac
done
```

Extended globbing:

```bash id="m9brzy"
shopt -s extglob
[[ $name == +(foo|bar) ]]
```

Regex:

```bash id="92k1m8"
if [[ $email =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
  echo "valid"
fi
```

Captured groups:

```bash id="jlwm6u"
if [[ $text =~ ([0-9]+)-([A-Za-z]+) ]]; then
  echo "${BASH_REMATCH[1]}"
  echo "${BASH_REMATCH[2]}"
fi
```

*Common Pitfalls: do not quote the regex on the right-hand side of `[[ string =~ regex ]]`, and remember that many advanced Bash features are not portable to POSIX `sh`.*

### Background jobs and concurrency: `&` `$!` `wait` `xargs -P`

Run in background:

```bash id="vjqiql"
long_task &
pid=$!
```

Wait for completion:

```bash id="jlwm7q"
wait "$pid"
```

Multiple jobs:

```bash id="’wini6v"
pids=()
for x in a b c; do
  work "$x" &
  pids+=("$!")
done

for pid in "${pids[@]}"; do
  wait "$pid"
done
```

Limit concurrency with `xargs`:

```bash id="upgnzg"
printf '%s\n' a b c | xargs -n1 -P4 ./worker.sh
```

*Common Pitfalls: background jobs still share filesystem state and external resources, so concurrency bugs often appear even in simple shell scripts.*

### Sourcing libraries: `source` shared-functions `BASH_SOURCE`

`library.sh`:

```bash id="5uzpkq"
log() {
  printf '[%s] %s\n' "$(date +%T)" "$*"
}
```

`main.sh`:

```bash id="jlwm5v"
#!/usr/bin/env bash
source ./library.sh
log "started"
```

Use `source` for shared shell functions and constants.

*Common Pitfalls: relative `source ./library.sh` paths depend on the current working directory, not automatically on the script’s own directory.*

### Portability notes: `sh` POSIX `[` no-arrays no-[[`

If you need POSIX `sh` portability, avoid:

* arrays
* associative arrays
* `[[ ... ]]`
* `(( ... ))`
* process substitution `<(...)`
* `mapfile`
* `local -n`
* `coproc`
* `shopt`

Portable style uses:

* `#!/bin/sh`
* `[` instead of `[[`
* external tools for more complex tasks

*Common Pitfalls: a script that starts with `#!/bin/sh` but uses Bash-only syntax may work on one machine and fail immediately on another.*

### Quick reference: variables parameters tests loops arrays redirects traps

Variables:

```bash id="jlwm8g"
x="value"
readonly x
export x
local x
unset x
```

Parameters:

```bash id="u5cd8u"
$0 $1 $2 $# $? $$ "$@" "$*"
shift
```

Tests:

```bash id="8iua0d"
[[ -f $file ]]
[[ -d $dir ]]
[[ -n $s ]]
[[ -z $s ]]
[[ $a == $b ]]
[[ $a == prefix* ]]
((x > 0))
```

Conditionals:

```bash id="jlwm8h"
if ...; then ...; fi
if ...; then ...; elif ...; then ...; else ...; fi
case "$x" in pat) ... ;; *) ... ;; esac
```

Loops:

```bash id="’wini9h"
for x in ...; do ...; done
for ((i=0; i<10; i++)); do ...; done
while ...; do ...; done
until ...; do ...; done
break
continue
```

Functions:

```bash id="’wini0h"
fn() { ...; }
local x
return 0
value=$(fn)
```

Arrays:

```bash id="yclnkt"
arr=(a b c)
echo "${arr[0]}"
echo "${arr[@]}"
echo "${#arr[@]}"

declare -A map
map[key]=value
echo "${map[key]}"
```

Expansion:

```bash id="’wini9x"
${var}
${#var}
${var:-default}
${var:=default}
${var:?message}
${var:+alt}
${var#pat}
${var##pat}
${var%pat}
${var%%pat}
${var/pat/repl}
${var//pat/repl}
${var:offset:length}
```

Redirection:

```bash id="qhub0r"
> file
>> file
2> file
2>> file
> file 2>&1
&> file
<<< "$text"
<<EOF
```

Command substitution:

```bash id="u8z5kt"
$(command)
```

Arithmetic:

```bash id="’wini3h"
$((x + y))
((x++))
((x += 2))
```

Options:

```bash id="9xm7bg"
while getopts ":ab:c" opt; do
  ...
done
shift $((OPTIND - 1))
```

Traps:

```bash id="0au4om"
trap cleanup EXIT
trap 'exit 130' INT
```

*Common Pitfalls: this section is only a syntax map; many constructs change behavior depending on quoting, shell options, and whether the script runs under Bash or plain `sh`.*

### Minimal directly usable examples: file-check option-parse tempdir line-loop associative-array

File existence check:

```bash id="4li8m9"
#!/usr/bin/env bash
set -euo pipefail

file=${1:?usage: $0 <file>}

if [[ -f $file ]]; then
  echo "exists"
else
  echo "missing"
  exit 1
fi
```

Iterate arguments safely:

```bash id="75gq9v"
#!/usr/bin/env bash
set -euo pipefail

for arg in "$@"; do
  printf 'arg=%s\n' "$arg"
done
```

Parse options:

```bash id="jljlwm"
#!/usr/bin/env bash
set -euo pipefail

verbose=0
name=""

while getopts ":vn:" opt; do
  case "$opt" in
    v) verbose=1 ;;
    n) name=$OPTARG ;;
    *) exit 1 ;;
  esac
done
shift $((OPTIND - 1))

((verbose)) && echo "verbose enabled"
echo "name=$name"
printf 'rest: %s\n' "$@"
```

Safe temp dir:

```bash id="b4s0y7"
#!/usr/bin/env bash
set -euo pipefail

tmpdir=$(mktemp -d)
trap 'rm -rf "$tmpdir"' EXIT

cp input.txt "$tmpdir/"
echo "workdir=$tmpdir"
```

Line-by-line input:

```bash id="hgtm1e"
#!/usr/bin/env bash
set -euo pipefail

while IFS= read -r line; do
  printf 'line: %s\n' "$line"
done < input.txt
```

Associative array dispatch:

```bash id="2n7n3v"
#!/usr/bin/env bash
set -euo pipefail

declare -A handlers=(
  [start]="echo starting"
  [stop]="echo stopping"
)

cmd=${1:-}
[[ -n $cmd ]] || exit 1
[[ -v handlers[$cmd] ]] || exit 1

eval "${handlers[$cmd]}"
```

*Common Pitfalls: the associative-array dispatch example uses `eval`, which is powerful but dangerous if keys or values can come from untrusted input.*

### Recommended default style: `main "$@"` strict-mode quoted-expansions

Use this by default unless you need portability to plain POSIX `sh`.

```bash id="kpọlxp"
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

main() {
  :
}

main "$@"
```

*Common Pitfalls: strict mode and quoted expansions should be the default, but they do not eliminate the need to think carefully about error handling, argument parsing, and subprocess behavior.*
