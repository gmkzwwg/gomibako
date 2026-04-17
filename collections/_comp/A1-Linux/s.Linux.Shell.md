---
title: Linux Shell Programming
layout: post
categories: Sheet
subclass: Linux
abbreviation: Linux Shell
toc: list
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

```bash
#!/usr/bin/env bash

echo "Hello, world"
```

Save as:

```bash
hello.sh
```

Make executable:

```bash
chmod +x hello.sh
```

Run it:

```bash
./hello.sh
```

Or invoke explicitly:

```bash
bash hello.sh
```

Shebang:

```bash
#!/usr/bin/env bash
```

This tells the system which interpreter should run the script.

Common forms:

```bash
#!/usr/bin/env bash
#!/bin/bash
#!/usr/bin/env sh
```

Use `bash` when you rely on Bash features such as arrays, `[[ ... ]]`, `mapfile`, `shopt`, or associative arrays.

*Common Pitfalls: `source script.sh` runs in the current shell, while `bash script.sh` or `./script.sh` runs in a new shell; use shell only when command orchestration is the main task, not when the logic has grown into a real application.*

### Execution model: `source` `.` subshell current-shell environment

Run in a new shell:

```bash
bash script.sh
./script.sh
```

Run in current shell:

```bash
source script.sh
. script.sh
```

Use `source` only when the script is supposed to modify the current shell environment, for example exporting variables or defining functions.

*Common Pitfalls: sourcing a script that assumes a clean process can unexpectedly overwrite variables, shell options, aliases, functions, or the working directory of the current shell.*

### Safe script header: `set -euo pipefail` `IFS` `set -x`

A common strict-mode header:

```bash
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

```bash
set -x
```

Turn it off:

```bash
set +x
```

*Common Pitfalls: `set -e` is useful but not magical, because it has exceptions and should not replace explicit error handling in critical sections.*
<!-- 
## Shell Syntax

### Comments: `\#` `:`

```bash
# single-line comment
```

There is no real multiline comment syntax. Common workaround:

```bash
: '
This block is ignored.
Useful as a temporary comment block.
'
```

*Common Pitfalls: the `: ' ... '` pattern is only a workaround and can still misbehave if the quoted block accidentally contains conflicting quote characters.*

### Variables: assignment `export` `readonly` `local` `${var}`

Assignment: no spaces around `=`.

```bash
name="alice"
count=42
path="/tmp/data"
```

Wrong:

```bash
name = "alice"
```

Access:

```bash
echo "$name"
echo "${count}"
```

Prefer braces when concatenating:

```bash
file="${name}.txt"
```

Export environment variables:

```bash
export API_KEY="secret"
export PATH="$HOME/bin:$PATH"
```

Read-only variables:

```bash
readonly VERSION="1.0"
declare -r VERSION="1.0"
```

Local variables in functions:

```bash
my_func() {
  local msg="inside"
  echo "$msg"
}
```

*Common Pitfalls: `name = value` is invalid in shell, and unquoted expansions such as `$name` often break when values contain spaces or glob characters.*

### Parameters and arguments: `$0` `$1` `$#` `$?` `"$@"` `"$*"` `shift`

Positional parameters:

```bash
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

```bash
#!/usr/bin/env bash
echo "script: $0"
echo "arg1: $1"
echo "arg count: $#"
printf 'all args: %s\n' "$@"
```

Run:

```bash
./demo.sh one two three
```

Shift arguments:

```bash
while (($# > 0)); do
  echo "arg: $1"
  shift
done
```

Always prefer `"$@"`:

```bash
for arg in "$@"; do
  echo "$arg"
done
```

Usually wrong:

```bash
for arg in $@; do
  echo "$arg"
done
```

*Common Pitfalls: `"$@"` preserves argument boundaries, while `$@` and `$*` often do not behave as intended once spaces or empty arguments appear.*

### Reading input: `read -r` `read -p` `read -s` `while IFS= read -r`

Read one value:

```bash
read -r name
```

Prompt inline:

```bash
read -r -p "Name: " name
```

Silent input:

```bash
read -r -s -p "Password: " password
echo
```

Read into multiple variables:

```bash
read -r first last
```

Read a file line by line:

```bash
while IFS= read -r line; do
  echo "$line"
done < input.txt
```

*Common Pitfalls: `read -r` is usually the right default because plain `read` interprets backslashes, and `for line in $(cat file)` is almost never the correct way to process lines.*

### Output and redirection: `echo` `printf` `>` `>>` `2>` `2>&1` `/dev/null`

`echo`:

```bash
echo "hello"
```

Prefer `printf` for reliable formatting:

```bash
printf 'name=%s count=%d\n' "$name" "$count"
```

Redirect output:

```bash
command > out.txt
command >> out.txt
command 2> err.txt
command > out.txt 2>&1
command &> all.txt
```

Silence output:

```bash
command > /dev/null 2>&1
```

*Common Pitfalls: `echo` is not fully reliable for precise formatting or escape handling, so prefer `printf` when output must be exact.*

### Exit status: `exit` `return` `$?` `if command; then`

Success is `0`. Failure is nonzero.

```bash
some_command
status=$?
echo "$status"
```

Direct test:

```bash
if some_command; then
  echo "ok"
else
  echo "failed"
fi
```

Exit explicitly:

```bash
exit 0
exit 1
```

Return from function:

```bash
return 0
return 1
```

*Common Pitfalls: shell functions return status codes, not arbitrary values; to return data, print it and capture it.*

### Command substitution: `$(...)`

```bash
now=$(date)
files=$(ls)
```

Prefer `$(...)` over backticks:

```bash
value=$(command)
```

Nested form:

```bash
result=$(outer "$(inner)")
```

*Common Pitfalls: command substitution strips trailing newlines, and using it for line-based iteration often causes unwanted word splitting.*

### Arithmetic: `$(( ))` `(( ))` `++` `+=`

Integer arithmetic:

```bash
x=5
y=3
z=$((x + y))
echo "$z"
```

Common forms:

```bash
((x++))
((x += 10))
((x = y * 2))
```

Arithmetic in conditions:

```bash
if ((x > 10)); then
  echo "large"
fi
```

*Common Pitfalls: `(( ... ))` is arithmetic evaluation, not a general expression language, and Bash arithmetic is integer-only unless you delegate to another tool.*

### Quotes and expansion: single-quotes double-quotes word-splitting globbing

Double quotes expand variables and command substitution:

```bash
echo "Hello, $name"
```

Single quotes create literal strings:

```bash
echo 'Hello, $name'
```

No quotes means word splitting and globbing.

Best practice:

```bash
rm -- "$file"
cp -- "$src" "$dst"
```

*Common Pitfalls: quote expansions by default; remove quotes only when you deliberately want word splitting or glob expansion.*

### Tests and conditionals: `[` `[[` `-f` `-d` `-n` `-z` `&&` `||`

Use `[`:

```bash
if [ -f "$file" ]; then
  echo "file exists"
fi
```

Use `[[ ]]` in Bash when possible:

```bash
if [[ -f $file && $name == a* ]]; then
  echo "match"
fi
```

Common file tests:

```bash
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

```bash
[[ -z $s ]]
[[ -n $s ]]
[[ $a == $b ]]
[[ $a != $b ]]
[[ $a == prefix* ]]
```

Integer tests:

```bash
((a == b))
((a != b))
((a > b))
((a >= b))
((a < b))
((a <= b))
```

Portable `[` style:

```bash
[ "$a" -eq "$b" ]
[ "$a" -gt "$b" ]
[ "$a" -lt "$b" ]
```

Logical operators:

```bash
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

```bash
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

```bash
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

```bash
for x in a b c; do
  echo "$x"
done
```

For over arguments:

```bash
for arg in "$@"; do
  echo "$arg"
done
```

C-style loop:

```bash
for ((i = 0; i < 10; i++)); do
  echo "$i"
done
```

While loop:

```bash
i=0
while ((i < 5)); do
  echo "$i"
  ((i++))
done
```

Until loop:

```bash
until grep -q ready status.txt; do
  sleep 1
done
```

Break and continue:

```bash
for x in "$@"; do
  [[ $x == skip ]] && continue
  [[ $x == stop ]] && break
  echo "$x"
done
```

*Common Pitfalls: avoid `for x in $(command)` for line-based data, because command substitution and word splitting will corrupt many real inputs.*

### Functions: `fn()` `local` `return` `$(fn)`

Define:

```bash
hello() {
  echo "hello"
}
```

Alternative:

```bash
function hello {
  echo "hello"
}
```

Preferred style is the first.

Arguments:

```bash
greet() {
  local name=$1
  echo "Hello, $name"
}

greet "Alice"
```

Return status:

```bash
is_even() {
  local n=$1
  ((n % 2 == 0))
}

if is_even 4; then
  echo "even"
fi
```

Return data by printing:

```bash
get_name() {
  echo "alice"
}

name=$(get_name)
```

*Common Pitfalls: `return` only returns a small integer status code from a function; it does not return strings, arrays, or objects.*

### Arrays: `arr=()` `${arr[@]}` `${#arr[@]}` `declare -A`

Indexed arrays:

```bash
arr=(one two three)
echo "${arr[0]}"
echo "${arr[1]}"
```

Append:

```bash
arr+=("four")
```

All elements:

```bash
echo "${arr[@]}"
```

Indices:

```bash
echo "${!arr[@]}"
```

Length:

```bash
echo "${#arr[@]}"
```

Loop:

```bash
for x in "${arr[@]}"; do
  echo "$x"
done
```

Associative arrays:

```bash
declare -A map
map[name]="alice"
map[city]="Paris"

echo "${map[name]}"
```

Loop keys:

```bash
for k in "${!map[@]}"; do
  printf '%s=%s\n' "$k" "${map[$k]}"
done
```

*Common Pitfalls: arrays and associative arrays are Bash features, not POSIX `sh` features.*

### Strings and parameter expansion: `${#var}` `${var:-x}` `${var/pat/repl}` `${var%.*}`

Length:

```bash
s="abcdef"
echo "${#s}"
```

Substring:

```bash
echo "${s:1:3}"
```

Replace:

```bash
s="a_b_c"
echo "${s/_/-}"
echo "${s//_/-}"
```

Remove prefix/suffix by pattern:

```bash
path="/tmp/file.txt"
echo "${path##*/}"
echo "${path%.*}"
```

Case conversion:

```bash
name="alice"
echo "${name^^}"
echo "${name,,}"
```

Defaults and checks:

```bash
echo "${var:-default}"
echo "${var:=default}"
echo "${var:+alt}"
echo "${var:?var is required}"
```

*Common Pitfalls: parameter expansion patterns use shell glob patterns, not regular expressions.*

### Globbing and brace expansion: `*` `?` `[]` `globstar` `nullglob` `{1..5}`

Basic globbing:

```bash
*.txt
file?.sh
src/*
```

Useful shell options:

```bash
shopt -s globstar
shopt -s nullglob
shopt -s dotglob
```

Recursive globbing example:

```bash
for f in **/*.py; do
  echo "$f"
done
```

Brace expansion:

```bash
echo file{1..5}.txt
echo {a,b,c}
mkdir -p project/{src,bin,test}
```

*Common Pitfalls: brace expansion is purely syntactic and happens before runtime; it is not the same thing as a loop.*

### Here documents and here strings: `<<EOF` `<<'EOF'` `<<<`

Here document:

```bash
cat <<EOF
line 1
line 2
EOF
```

No expansion:

```bash
cat <<'EOF'
literal $HOME
EOF
```

Here string:

```bash
grep foo <<< "$text"
```

*Common Pitfalls: quoting the heredoc delimiter disables variable and command expansion inside the block.*

### Pipelines and process substitution: `|` `pipefail` `<(...)` `< <(...)`

Pipeline:

```bash
cat file.txt | grep foo | sort
```

With strict checking:

```bash
set -o pipefail
```

Read pipeline output safely:

```bash
grep foo file.txt | while IFS= read -r line; do
  echo "$line"
done
```

Prefer process substitution when variable changes must survive:

```bash
while IFS= read -r line; do
  :
done < <(grep foo file.txt)
```

Process substitution:

```bash
diff <(sort file1) <(sort file2)
```

*Common Pitfalls: pipelines often run loop bodies in a subshell, so variable updates inside them may not survive afterward.*

### Redirects and file descriptors: `0` `1` `2` `>&` `exec 3>`

Standard descriptors:

* `0`: stdin
* `1`: stdout
* `2`: stderr

Separate stdout and stderr:

```bash
command >out.log 2>err.log
```

Append:

```bash
command >>out.log 2>>err.log
```

Custom descriptor:

```bash
exec 3>debug.log
echo "debug line" >&3
exec 3>&-
```

Read from custom descriptor:

```bash
exec 3<input.txt
read -r line <&3
exec 3<&-
```

*Common Pitfalls: redirection order matters; `command >file 2>&1` is not always equivalent to rearranged forms.*

### Temporary files and cleanup: `mktemp` `trap EXIT` `rm -rf`

Use `mktemp`:

```bash
tmpfile=$(mktemp)
tmpdir=$(mktemp -d)
```

Cleanup pattern:

```bash
tmpdir=$(mktemp -d)
trap 'rm -rf "$tmpdir"' EXIT
```

*Common Pitfalls: never handcraft temp-file names in `/tmp`; use `mktemp` to avoid races and collisions.*

### Traps: `trap` `EXIT` `INT`

Basic trap:

```bash
trap 'echo "exiting"' EXIT
trap 'echo "interrupted"; exit 130' INT
```

Cleanup example:

```bash
tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT
```

Use traps for temp files, lock files, background processes, and state rollback.

*Common Pitfalls: traps are inherited and triggered in ways that can surprise you if the script creates subshells, pipelines, or multiple cleanup paths.*

### Option parsing with getopts: `getopts` `OPTARG` `OPTIND` `shift`

Basic pattern:

```bash
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

```bash
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

```bash
command -v jq >/dev/null 2>&1 || {
  echo "jq is required" >&2
  exit 1
}
```

Require root:

```bash
if ((EUID != 0)); then
  echo "must run as root" >&2
  exit 1
fi
```

Resolve script directory:

```bash
script_dir=$(
  cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd
)
```

Iterate files safely:

```bash
find . -type f -print0 |
while IFS= read -r -d '' file; do
  printf '%s\n' "$file"
done
```

Read full file into array:

```bash
mapfile -t lines < input.txt
printf '%s\n' "${lines[@]}"
```

*Common Pitfalls: never parse `ls` for filenames; use globs, `find`, or null-delimited workflows instead.*

### Advanced Bash features: `BASH_SOURCE` `local -n` `coproc` `select` `extglob` `=~`

`BASH_SOURCE`:

```bash
echo "${BASH_SOURCE[0]}"
```

Nameref:

```bash
set_value() {
  local -n ref=$1
  ref="updated"
}

name="old"
set_value name
echo "$name"
```

Coprocess:

```bash
coproc MYPROC { bc -l; }
echo '2 + 2' >&"${MYPROC[1]}"
read -r result <&"${MYPROC[0]}"
echo "$result"
```

Select:

```bash
select choice in start stop quit; do
  case "$choice" in
    start) echo start ;;
    stop) echo stop ;;
    quit) break ;;
  esac
done
```

Extended globbing:

```bash
shopt -s extglob
[[ $name == +(foo|bar) ]]
```

Regex:

```bash
if [[ $email =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
  echo "valid"
fi
```

Captured groups:

```bash
if [[ $text =~ ([0-9]+)-([A-Za-z]+) ]]; then
  echo "${BASH_REMATCH[1]}"
  echo "${BASH_REMATCH[2]}"
fi
```

*Common Pitfalls: do not quote the regex on the right-hand side of `[[ string =~ regex ]]`, and remember that many advanced Bash features are not portable to POSIX `sh`.*

### Background jobs and concurrency: `&` `$!` `wait` `xargs -P`

Run in background:

```bash
long_task &
pid=$!
```

Wait for completion:

```bash
wait "$pid"
```

Multiple jobs:

```bash
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

```bash
printf '%s\n' a b c | xargs -n1 -P4 ./worker.sh
```

*Common Pitfalls: background jobs still share filesystem state and external resources, so concurrency bugs often appear even in simple shell scripts.*

### Sourcing libraries: `source` shared-functions `BASH_SOURCE`

`library.sh`:

```bash
log() {
  printf '[%s] %s\n' "$(date +%T)" "$*"
}
```

`main.sh`:

```bash
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

```bash
x="value"
readonly x
export x
local x
unset x
```

Parameters:

```bash
$0 $1 $2 $# $? $$ "$@" "$*"
shift
```

Tests:

```bash
[[ -f $file ]]
[[ -d $dir ]]
[[ -n $s ]]
[[ -z $s ]]
[[ $a == $b ]]
[[ $a == prefix* ]]
((x > 0))
```

Conditionals:

```bash
if ...; then ...; fi
if ...; then ...; elif ...; then ...; else ...; fi
case "$x" in pat) ... ;; *) ... ;; esac
```

Loops:

```bash
for x in ...; do ...; done
for ((i=0; i<10; i++)); do ...; done
while ...; do ...; done
until ...; do ...; done
break
continue
```

Functions:

```bash
fn() { ...; }
local x
return 0
value=$(fn)
```

Arrays:

```bash
arr=(a b c)
echo "${arr[0]}"
echo "${arr[@]}"
echo "${#arr[@]}"

declare -A map
map[key]=value
echo "${map[key]}"
```

Expansion:

```bash
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

```bash
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

```bash
$(command)
```

Arithmetic:

```bash
$((x + y))
((x++))
((x += 2))
```

Options:

```bash
while getopts ":ab:c" opt; do
  ...
done
shift $((OPTIND - 1))
```

Traps:

```bash
trap cleanup EXIT
trap 'exit 130' INT
```

*Common Pitfalls: this section is only a syntax map; many constructs change behavior depending on quoting, shell options, and whether the script runs under Bash or plain `sh`.*

### Minimal directly usable examples: file-check option-parse tempdir line-loop associative-array

File existence check:

```bash
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

```bash
#!/usr/bin/env bash
set -euo pipefail

for arg in "$@"; do
  printf 'arg=%s\n' "$arg"
done
```

Parse options:

```bash
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

```bash
#!/usr/bin/env bash
set -euo pipefail

tmpdir=$(mktemp -d)
trap 'rm -rf "$tmpdir"' EXIT

cp input.txt "$tmpdir/"
echo "workdir=$tmpdir"
```

Line-by-line input:

```bash
#!/usr/bin/env bash
set -euo pipefail

while IFS= read -r line; do
  printf 'line: %s\n' "$line"
done < input.txt
```

Associative array dispatch:

```bash
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

```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

main() {
  :
}

main "$@"
```

*Common Pitfalls: strict mode and quoted expansions should be the default, but they do not eliminate the need to think carefully about error handling, argument parsing, and subprocess behavior.* -->

## Practical Scripts

Inline comments explicitly label the comment type, such as `[style]`, `[function]`, `[args]`, or `[safety]`.

### 1. Search text in a project safely

Use case:

* search for a keyword in the current directory
* ignore `.git`
* preserve spaces in the search term

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Enable strict mode for safer scripting.
IFS=$'\n\t'        # [style] Reduce accidental word splitting.

pattern=${1:?Usage: $0 <pattern> [path]}  # [args] Require a search pattern.
path=${2:-.}                              # [args] Default search path is current directory.

grep -RIn --exclude-dir=.git -- "$pattern" "$path"  # [function] Recursive, line-numbered search.
                                                    # [args] -- stops option parsing if pattern begins with '-'.
                                                    # [function] --exclude-dir=.git avoids noisy repository metadata.
```

Why it is useful:

* faster than manually typing a long `grep` every time
* safe for patterns containing spaces
* good baseline before switching to `rg`

Common Pitfalls: always quote the pattern and path; otherwise spaces or glob characters can break the command.

### 2. Make a timestamped backup copy

Use case:

* create a quick backup of a file before editing
* preserve the original file unchanged

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Fail early on errors.
IFS=$'\n\t'        # [style] Safer word splitting behavior.

src=${1:?Usage: $0 <file>}  # [args] Require exactly one source file.

[[ -f "$src" ]] || {        # [safety] Ensure the input is a regular file.
  echo "Error: not a file: $src" >&2
  exit 1
}

ts=$(date +%Y%m%d-%H%M%S)                   # [function] Stable timestamp for sorting and uniqueness.
dst="${src}.${ts}.bak"                     # [function] Construct backup filename next to source.
cp -- "$src" "$dst"                        # [safety] -- prevents path-like filenames being treated as options.
printf 'Backup created: %s\n' "$dst"       # [function] Print the resulting backup path.
```

Why it is useful:

* ideal before risky edits, refactors, or config changes
* timestamp format sorts naturally

Common Pitfalls: do not build backup names without quoting; filenames may contain spaces or leading hyphens.

### 3. Show the largest files in a directory tree

Use case:

* quickly find what is consuming disk space
* useful when `df` says the disk is full

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer execution.
IFS=$'\n\t'        # [style] Safer splitting.

path=${1:-.}       # [args] Default directory is current directory.
count=${2:-10}     # [args] Default result size is 10.

[[ -d "$path" ]] || {  # [safety] Ensure the target is a directory.
  echo "Error: not a directory: $path" >&2
  exit 1
}

find "$path" -type f -printf '%s\t%p\n' |  # [function] Print file size in bytes and path.
sort -nr |                                 # [function] Sort numerically, largest first.
head -n "$count" |                         # [args] Limit output to requested number of results.
awk -F '\t' '{printf "%12d  %s\n", $1, $2}'  # [function] Clean aligned output.
```

Why it is useful:

* one of the most common real admin/user tasks
* teaches `find | sort | head` composition

Common Pitfalls: `du` and `df` answer different questions; this script shows large files, not total filesystem capacity.

### 4. Check whether required commands exist

Use case:

* validate a machine before running a project script
* useful in setup scripts and CI helpers

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer script behavior.
IFS=$'\n\t'        # [style] Safer splitting.

[[ $# -gt 0 ]] || {  # [args] Require at least one command name.
  echo "Usage: $0 <command> [command ...]" >&2
  exit 1
}

missing=0  # [function] Track whether any required command is unavailable.

for cmd in "$@"; do
  if command -v "$cmd" >/dev/null 2>&1; then
    printf 'OK      %s\n' "$cmd"       # [function] Report available command.
  else
    printf 'MISSING %s\n' "$cmd" >&2   # [function] Report missing command to stderr.
    missing=1                          # [function] Remember failure for final exit code.
  fi
done

exit "$missing"  # [function] Return nonzero if any dependency is missing.
```

Why it is useful:

* very common in bootstrap and tooling scripts
* teaches `command -v` and exit-code design

Common Pitfalls: do not use `which` in scripts for dependency checks; `command -v` is more reliable in shell logic.

### 5. Batch rename file extensions safely

Use case:

* rename many files from one extension to another
* example: `.txt` to `.md`

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Use strict mode.
IFS=$'\n\t'        # [style] Safer splitting.

old_ext=${1:?Usage: $0 <old-ext> <new-ext> [path]}  # [args] Require old extension.
new_ext=${2:?Usage: $0 <old-ext> <new-ext> [path]}  # [args] Require new extension.
path=${3:-.}                                        # [args] Default path is current directory.

[[ -d "$path" ]] || {  # [safety] Ensure the target path is a directory.
  echo "Error: not a directory: $path" >&2
  exit 1
}

find "$path" -type f -name "*.${old_ext}" -print0 |   # [function] Find matching files safely with NUL delimiters.
while IFS= read -r -d '' file; do                     # [style] Safe loop for arbitrary filenames.
  new_name="${file%.${old_ext}}.${new_ext}"           # [function] Replace only the final matching extension.
  mv -- "$file" "$new_name"                           # [safety] -- protects against dash-prefixed filenames.
  printf 'Renamed: %s -> %s\n' "$file" "$new_name"    # [function] Show each change explicitly.
done
```

Why it is useful:

* a classic daily file-management task
* teaches null-delimited filename handling with `-print0` and `read -d ''`

Common Pitfalls: never do bulk renaming with `for f in $(find ...)`; filenames with spaces, tabs, or newlines will break.

### 6. Tail and highlight important log lines

Use case:

* follow a log file in real time
* only show lines that likely matter
* useful for application logs, deployment logs, and service debugging

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Enable strict mode for safer execution.
IFS=$'\n\t'        # [style] Reduce accidental word splitting.

log_file=${1:?Usage: $0 <log-file>}  # [args] Require one log file path.

[[ -f "$log_file" ]] || {            # [safety] Ensure the log target exists and is a regular file.
  echo "Error: not a file: $log_file" >&2
  exit 1
}

tail -F -- "$log_file" |  # [function] Follow the file across rotations; -F is better than -f for logs.
grep --line-buffered -Ei 'error|warn|fatal|panic|timeout|exception|failed'  # [function] Filter likely-important lines in real time.
```

Why it is useful:

* reduces noise in large logs
* teaches `tail -F` and line-buffered filtering
* practical for daily debugging

Common Pitfalls: plain `grep` in a pipeline may buffer too much for interactive use, so `--line-buffered` matters here.

### 7. Parse short options with `getopts`

Use case:

* build a proper CLI instead of ad hoc positional parsing
* support flags like `-v` and options like `-o output.txt`

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer script behavior.
IFS=$'\n\t'        # [style] Safer splitting.

verbose=0          # [function] Default flag state.
output=""          # [function] Default output path.

while getopts ":vo:" opt; do  # [args] v is a flag; o: requires an argument.
  case "$opt" in
    v) verbose=1 ;;           # [function] Enable verbose mode.
    o) output=$OPTARG ;;      # [function] Capture the option argument.
    :)
      echo "Error: -$OPTARG requires an argument" >&2  # [args] Missing value for an option that needs one.
      exit 1
      ;;
    \?)
      echo "Error: invalid option: -$OPTARG" >&2       # [args] Unknown option encountered.
      exit 1
      ;;
  esac
done

shift $((OPTIND - 1))  # [style] Remove parsed options so "$@" now contains only remaining positional arguments.

(( verbose )) && echo "Verbose mode enabled"     # [function] Conditional diagnostic output.
printf 'Output: %s\n' "${output:-<none>}"        # [function] Show parsed output target.
printf 'Remaining args: %s\n' "$*"               # [function] Show remaining positional arguments.
```

Why it is useful:

* teaches proper short-option parsing
* scales much better than raw `$1`, `$2`, `$3`
* common in real shell tools

Common Pitfalls: `getopts` handles short options well, but it does not natively parse GNU-style long options like `--verbose`.

### 8. Use a temp directory and clean it automatically

Use case:

* do multi-step work in a temp workspace
* guarantee cleanup even on failure or interruption

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer execution.
IFS=$'\n\t'        # [style] Safer splitting.

tmpdir=$(mktemp -d)  # [function] Create a unique temporary working directory safely.

cleanup() {
  rm -rf -- "$tmpdir"  # [safety] Remove the temporary workspace on exit.
}

trap cleanup EXIT      # [function] Ensure cleanup runs on normal exit and most failures.

printf 'Working in: %s\n' "$tmpdir"  # [function] Expose temp path for debugging or inspection.

cp -- input.txt "$tmpdir/"           # [function] Example work step using the temporary workspace.
printf 'done\n' > "$tmpdir/result.txt"  # [function] Example generated output inside temp storage.
```

Why it is useful:

* one of the most important real scripting patterns
* prevents leftover temp files
* teaches `mktemp` plus `trap`

Common Pitfalls: never invent temp paths manually under `/tmp`; use `mktemp` to avoid race conditions and collisions.

### 9. Run jobs in parallel and wait for all of them

Use case:

* speed up repetitive independent tasks
* useful for encoding, downloading, linting, or batch processing

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer execution.
IFS=$'\n\t'        # [style] Safer splitting.

work() {
  local item=$1                           # [style] Keep function-local state local.
  printf 'start %s\n' "$item"            # [function] Show job start.
  sleep 1                                # [function] Simulate real work.
  printf 'done  %s\n' "$item"            # [function] Show job completion.
}

pids=()                                   # [function] Store child process IDs for later waiting.

for item in "$@"; do
  work "$item" &                          # [function] Start each job in the background.
  pids+=("$!")                            # [function] Record the PID of the background job.
done

for pid in "${pids[@]}"; do
  wait "$pid"                             # [function] Propagate child failures and ensure all jobs finish.
done
```

Why it is useful:

* introduces background jobs and `wait`
* extremely practical for daily batch tasks
* small pattern, large payoff

Common Pitfalls: background jobs still compete for CPU, disk, network, and filesystem state, so parallelism can make a script faster or much more fragile depending on the workload.

### 10. Build a simple menu-driven command dispatcher

Use case:

* wrap a few common tasks behind a tiny CLI
* useful for project scripts like `start`, `stop`, `test`, `deploy`

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer script defaults.
IFS=$'\n\t'        # [style] Safer splitting.

cmd=${1:-}         # [args] Read the first positional argument as the subcommand.

case "$cmd" in
  start)
    echo "Starting service..."  # [function] Replace with the real start command.
    ;;
  stop)
    echo "Stopping service..."  # [function] Replace with the real stop command.
    ;;
  test)
    echo "Running tests..."     # [function] Replace with the real test command.
    ;;
  *)
    echo "Usage: $0 {start|stop|test}" >&2  # [args] Show valid subcommands on invalid input.
    exit 1
    ;;
esac
```

Why it is useful:

* one of the most common shell-script structures
* teaches `case` as a subcommand dispatcher
* good foundation for project automation scripts

Common Pitfalls: `case` matches shell patterns, not regular expressions, and every branch must end cleanly with `;;` or another explicit terminator.

### 11. Check whether a port is listening

Use case:

* verify whether a local service has started
* useful for databases, web servers, and development backends

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Enable strict mode for safer execution.
IFS=$'\n\t'        # [style] Reduce accidental word splitting.

port=${1:?Usage: $0 <port>}  # [args] Require one TCP port number.

[[ "$port" =~ ^[0-9]+$ ]] || {  # [safety] Ensure the port looks numeric.
  echo "Error: port must be numeric: $port" >&2
  exit 1
}

ss -ltn | awk '{print $4}' | grep -Eq "(^|:)$port$"  # [function] Check listening TCP sockets for the target port.

if [[ $? -eq 0 ]]; then
  printf 'Port %s is listening\n' "$port"  # [function] Report success.
else
  printf 'Port %s is not listening\n' "$port"  # [function] Report failure.
  exit 1
fi
```

Why it is useful:

* simple health check for local services
* helpful in scripts that wait for dependencies

Common Pitfalls: address formatting varies between IPv4 and IPv6, so do not assume every socket string looks the same beyond the final port match.

### 12. Wait until a service becomes reachable

Use case:

* wait for a local or remote HTTP service to become ready
* useful in startup scripts and local development stacks

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer execution.
IFS=$'\n\t'        # [style] Safer splitting.

url=${1:?Usage: $0 <url> [max-attempts]}  # [args] Require the target URL.
max_attempts=${2:-30}                     # [args] Default retry limit is 30.
attempt=1                                 # [function] Track retry count.

until curl -fsS --max-time 2 "$url" >/dev/null; do  # [function] Retry until the endpoint responds successfully.
  if (( attempt >= max_attempts )); then            # [safety] Stop after a bounded number of retries.
    echo "Service did not become ready: $url" >&2
    exit 1
  fi

  printf 'Waiting for %s (%d/%d)\n' "$url" "$attempt" "$max_attempts"  # [function] Progress output.
  sleep 1                                                               # [function] Backoff interval.
  ((attempt++))
done

printf 'Service is ready: %s\n' "$url"  # [function] Success message.
```

Why it is useful:

* very common in Compose stacks, CI, and startup automation
* better than inserting arbitrary `sleep 10`

Common Pitfalls: readiness is not always the same as process existence; a process may be running while the actual service is still not ready.

### 13. Create a safe project archive

Use case:

* quickly archive a project directory
* exclude obvious junk such as `.git` and caches

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Use strict mode.
IFS=$'\n\t'        # [style] Safer splitting.

src=${1:?Usage: $0 <directory> [archive-name]}  # [args] Require a source directory.
archive=${2:-$(basename "$src").tar.gz}         # [args] Default archive name is derived from the directory.

[[ -d "$src" ]] || {  # [safety] Ensure the source is a directory.
  echo "Error: not a directory: $src" >&2
  exit 1
}

tar \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='__pycache__' \
  --exclude='.venv' \
  -czf "$archive" -- "$src"  # [function] Create a compressed tar archive while skipping common heavy or disposable paths.

printf 'Archive created: %s\n' "$archive"  # [function] Show the resulting archive path.
```

Why it is useful:

* common for backups, transfers, and snapshots
* teaches a practical `tar` pattern

Common Pitfalls: archiving from the wrong current directory may produce unexpected path prefixes inside the archive.

### 14. Find recently modified files

Use case:

* inspect what changed recently in a directory tree
* useful after builds, deployments, or debugging sessions

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer execution.
IFS=$'\n\t'        # [style] Safer splitting.

path=${1:-.}      # [args] Default search path is current directory.
minutes=${2:-60}  # [args] Default time window is the last 60 minutes.

[[ -d "$path" ]] || {  # [safety] Ensure the path is a directory.
  echo "Error: not a directory: $path" >&2
  exit 1
}

find "$path" -type f -mmin "-$minutes" -print  # [function] Show files modified within the requested recent interval.
```

Why it is useful:

* fast way to understand recent activity
* handy after automated tooling changes many files

Common Pitfalls: file timestamps are not all the same concept; modification time is not access time or metadata-change time.

### 15. Compute hashes for files in bulk

Use case:

* verify file integrity
* compare outputs across machines or runs
* useful for artifacts, downloads, and backups

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer script behavior.
IFS=$'\n\t'        # [style] Safer splitting.

algo=${1:?Usage: $0 <sha256|sha1|md5> <file> [file ...]}  # [args] Require a hash algorithm name.
shift                                                    # [style] Remove the parsed algorithm argument.

[[ $# -gt 0 ]] || {  # [args] Require at least one file.
  echo "Error: no files provided" >&2
  exit 1
}

case "$algo" in
  sha256) cmd=sha256sum ;;  # [function] Map a friendly algorithm name to the system command.
  sha1)   cmd=sha1sum ;;
  md5)    cmd=md5sum ;;
  *)
    echo "Error: unsupported algorithm: $algo" >&2
    exit 1
    ;;
esac

for file in "$@"; do
  [[ -f "$file" ]] || {                # [safety] Ensure each input is a regular file.
    echo "Skipping non-file: $file" >&2
    continue
  }

  "$cmd" -- "$file"                    # [function] Print the digest and filename.
done
```

Why it is useful:

* a practical integrity-check pattern
* teaches command dispatch with `case`

Common Pitfalls: `md5` is still useful for quick non-security checks, but it should not be treated as a secure cryptographic choice.

### 16. Retry a flaky command with backoff

Use case:

* rerun a command that may fail transiently
* useful for network requests, package downloads, and service startup checks

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Enable strict mode for safer scripting.
IFS=$'\n\t'        # [style] Reduce accidental word splitting.

max_attempts=${1:?Usage: $0 <max-attempts> <command> [args ...]}  # [args] Require retry limit first.
shift                                                             # [style] Remove parsed retry limit.

[[ "$max_attempts" =~ ^[0-9]+$ ]] || {  # [safety] Validate retry count.
  echo "Error: max-attempts must be numeric" >&2
  exit 1
}

attempt=1  # [function] Track current attempt number.

until "$@"; do  # [function] Run the target command exactly as given.
  if (( attempt >= max_attempts )); then
    echo "Command failed after $attempt attempt(s)" >&2  # [function] Final failure message.
    exit 1
  fi

  printf 'Retrying (%d/%d): %s\n' "$attempt" "$max_attempts" "$*" >&2  # [function] Progress output.
  sleep "$attempt"                                                     # [function] Simple linear backoff.
  ((attempt++))
done
```

Why it is useful:

* wraps many unreliable commands without rewriting them
* teaches `until` plus command passthrough

Common Pitfalls: always pass the target command as separate arguments, not as one quoted string, unless you deliberately want shell re-parsing.

### 17. Protect a script with a lock file using `flock`

Use case:

* prevent concurrent runs of the same script
* useful for cron jobs, backups, and periodic maintenance tasks

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer execution.
IFS=$'\n\t'        # [style] Safer splitting.

lock_file=/tmp/my-job.lock  # [function] Define a lock path shared by all competing runs.

exec 9>"$lock_file"  # [function] Open the lock file on file descriptor 9.

if ! flock -n 9; then  # [safety] Fail immediately if another instance already holds the lock.
  echo "Another instance is already running" >&2
  exit 1
fi

echo "Lock acquired; doing work..."  # [function] Placeholder for the protected critical section.
sleep 5                              # [function] Simulate work.
```

Why it is useful:

* solves a common real-world cron problem
* avoids duplicate backups, duplicate syncs, and overlapping jobs

Common Pitfalls: a plain “create a file if missing” lock pattern is race-prone; `flock` is safer for real mutual exclusion.

### 18. Show disk usage warnings for large directories

Use case:

* quickly spot large top-level directories
* useful when a machine or project workspace is filling up

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Enable strict mode.
IFS=$'\n\t'        # [style] Safer splitting.

path=${1:-.}       # [args] Default path is current directory.
limit_mb=${2:-500} # [args] Default warning threshold is 500 MB.

[[ -d "$path" ]] || {  # [safety] Ensure the target is a directory.
  echo "Error: not a directory: $path" >&2
  exit 1
}

du -sm -- "$path"/* 2>/dev/null |  # [function] Summarize immediate children in megabytes.
while read -r size name; do
  if (( size >= limit_mb )); then
    printf 'LARGE %6d MB  %s\n' "$size" "$name"  # [function] Highlight large entries only.
  fi
done
```

Why it is useful:

* gives a fast top-level storage summary
* practical before deeper cleanup

Common Pitfalls: `du` reports filesystem usage for paths, not free-space capacity; use `df` for whole-filesystem capacity questions.

### 19. Pretty-print JSON from a file or stdin

Use case:

* inspect JSON quickly
* useful for API responses, config files, and logs

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer behavior.
IFS=$'\n\t'        # [style] Safer splitting.

if [[ $# -eq 0 ]]; then
  python -m json.tool  # [function] Read JSON from stdin and pretty-print it.
else
  python -m json.tool < "$1"  # [function] Read JSON from the given file.
fi
```

Why it is useful:

* works on many systems without extra dependencies
* perfect as a quick inspection helper

Common Pitfalls: this expects valid JSON; many real-world “JSON-like” files fail because of comments, trailing commas, or mixed log prefixes.

### 20. Run one command on many hosts over SSH

Use case:

* execute a quick check or admin command across several servers
* useful for service status checks, log inspection, and config verification

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Use strict mode.
IFS=$'\n\t'        # [style] Safer splitting.

hosts_file=${1:?Usage: $0 <hosts-file> <command> [args ...]}  # [args] Require a file containing one host per line.
shift                                                         # [style] Remove parsed hosts file argument.

[[ -f "$hosts_file" ]] || {  # [safety] Ensure the host list exists.
  echo "Error: hosts file not found: $hosts_file" >&2
  exit 1
}

while IFS= read -r host; do
  [[ -n "$host" ]] || continue                    # [style] Skip empty lines.
  [[ "$host" =~ ^# ]] && continue                 # [style] Skip comment lines.
  printf '\n==> %s <==\n' "$host"                 # [function] Clear host separator for readability.
  ssh -- "$host" "$@"                             # [function] Execute the provided command on the remote host.
done < "$hosts_file"
```

Why it is useful:

* very practical for small fleets and personal servers
* teaches safe line reading plus command forwarding

Common Pitfalls: remote quoting rules differ from local quoting rules, so complex shell fragments passed through SSH can become tricky very quickly.

### 21. Compare two directories by file list and hashes

Use case:

* verify whether two directories contain the same files and contents
* useful for backup validation and migration checks

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Enable strict mode.
IFS=$'\n\t'        # [style] Safer splitting.

dir_a=${1:?Usage: $0 <dir-a> <dir-b>}  # [args] Require first directory.
dir_b=${2:?Usage: $0 <dir-a> <dir-b>}  # [args] Require second directory.

[[ -d "$dir_a" && -d "$dir_b" ]] || {  # [safety] Ensure both inputs are directories.
  echo "Error: both inputs must be directories" >&2
  exit 1
}

tmp_a=$(mktemp)  # [function] Temporary manifest for directory A.
tmp_b=$(mktemp)  # [function] Temporary manifest for directory B.
trap 'rm -f "$tmp_a" "$tmp_b"' EXIT  # [safety] Always clean up temporary files.

(
  cd "$dir_a"
  find . -type f -print0 | sort -z | xargs -0 sha256sum
) > "$tmp_a"  # [function] Build a deterministic hash manifest for directory A.

(
  cd "$dir_b"
  find . -type f -print0 | sort -z | xargs -0 sha256sum
) > "$tmp_b"  # [function] Build a deterministic hash manifest for directory B.

diff -u -- "$tmp_a" "$tmp_b"  # [function] Show differences in file set or content hash.
```

Why it is useful:

* more meaningful than checking just file counts
* practical for verifying copies and backups

Common Pitfalls: this detects content differences, but metadata such as ownership, permissions, and timestamps are not part of the comparison.

### 22. Move files to a local trash directory instead of deleting immediately

Use case:

* safer alternative to `rm`
* useful for daily interactive cleanup

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Use strict mode.
IFS=$'\n\t'        # [style] Safer splitting.

[[ $# -gt 0 ]] || {  # [args] Require at least one path.
  echo "Usage: $0 <file> [file ...]" >&2
  exit 1
}

trash_dir="${HOME}/.local/trash-shell"  # [function] Define a simple per-user trash location.
mkdir -p -- "$trash_dir"                # [function] Ensure the trash directory exists.

ts=$(date +%Y%m%d-%H%M%S)               # [function] Use a timestamp to reduce name collisions.

for path in "$@"; do
  [[ -e "$path" ]] || {                 # [safety] Skip non-existent paths rather than failing the whole batch.
    echo "Skipping missing path: $path" >&2
    continue
  }

  base=$(basename -- "$path")           # [function] Extract the final path component.
  dest="${trash_dir}/${ts}-${base}"     # [function] Build a unique destination name.
  mv -- "$path" "$dest"                 # [function] Move into trash instead of deleting.
  printf 'Trashed: %s -> %s\n' "$path" "$dest"
done
```

Why it is useful:

* gives a recovery window for accidental deletions
* safer for daily shell usage

Common Pitfalls: this is a simple local trash pattern, not a full desktop-trash standard implementation with metadata and restore support.

### 23. Extract one column from a CSV-like file quickly

Use case:

* grab a simple comma-separated column without opening a spreadsheet tool
* useful for quick inspection or one-off scripting

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer execution.
IFS=$'\n\t'        # [style] Safer splitting.

file=${1:?Usage: $0 <file> <column-number>}  # [args] Require input file.
column=${2:?Usage: $0 <file> <column-number>}  # [args] Require 1-based column number.

[[ -f "$file" ]] || {  # [safety] Ensure the input exists.
  echo "Error: not a file: $file" >&2
  exit 1
}

cut -d',' -f"$column" -- "$file"  # [function] Extract the requested comma-delimited field.
```

Why it is useful:

* very fast for simple CSV-like data
* teaches `cut` as a quick extraction tool

Common Pitfalls: real CSV can contain quoted commas and embedded newlines, so `cut -d','` is only correct for simple delimited text, not full CSV semantics.

### 24. Apply chmod recursively to files and directories differently

Use case:

* fix permissions in a project tree
* common for web apps, repos, and shared directories

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Enable strict mode.
IFS=$'\n\t'        # [style] Safer splitting.

path=${1:?Usage: $0 <directory>}  # [args] Require a target directory.

[[ -d "$path" ]] || {  # [safety] Ensure the target is a directory.
  echo "Error: not a directory: $path" >&2
  exit 1
}

find "$path" -type d -exec chmod 755 {} +  # [function] Set directory permissions to rwxr-xr-x.
find "$path" -type f -exec chmod 644 {} +  # [function] Set file permissions to rw-r--r--.
```

Why it is useful:

* one of the most common project permission fixes
* teaches that files and directories often need different modes

Common Pitfalls: do not blindly apply these modes to executables, private keys, scripts that must remain executable, or special application data.

### 25. Create a small utility menu with `select`

Use case:

* build a quick interactive helper for repeated manual tasks
* useful for personal admin or project scripts

```bash
#!/usr/bin/env bash
set -euo pipefail  # [style] Safer defaults.
IFS=$'\n\t'        # [style] Safer splitting.

PS3='Choose an action: '  # [function] Customize the interactive prompt.

select action in "Show date" "List files" "Show disk usage" "Quit"; do
  case "$action" in
    "Show date")
      date  # [function] Display current system time.
      ;;
    "List files")
      ls -lah  # [function] Show a readable directory listing.
      ;;
    "Show disk usage")
      df -h  # [function] Show human-readable filesystem usage.
      ;;
    "Quit")
      break  # [function] Exit the menu loop.
      ;;
    *)
      echo "Invalid selection" >&2  # [args] Handle out-of-range numeric input.
      ;;
  esac
done
```

Why it is useful:

* very handy for small interactive tool hubs
* teaches `select` plus `case`

Common Pitfalls: `select` is convenient for quick Bash-only menus, but it is not suitable for polished TUIs or fully portable POSIX shell interfaces.
