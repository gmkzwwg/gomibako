---
layout: post
categories: Sheet
subclass: Linux
abbreviation: Linux Basics
title: Linux Basics - Quick Reference and Minimal Tutorial
toc_before_content: compact
todos: 
  - 补完
---


## Navigation & Paths

### pwd

Prints the absolute path of the current working directory, mainly used to confirm where the shell is operating.

### cd

Changes the current working directory and is the basic tool for moving through the filesystem.

### ls

Lists files and directories and is the standard command for inspecting directory contents.

### tree

Displays directory contents as a hierarchical tree, useful for understanding project or filesystem structure.

**Best high-frequency `tree` commands to memorize**

```bash
tree
# Show the full tree of the current directory

tree /path/to/dir
# Show the tree of a specific directory

tree -L 2
# Limit output to 2 levels; useful for a quick overview

tree -d
# Show directories only; useful for studying folder structure

tree -a
# Include hidden files and directories such as .git and .env

tree -I "node_modules|.git|dist|build"
# Exclude noisy folders by pattern

tree -P "*.py"
# Show only names matching the pattern, for example Python files

tree -P "*.md"
# Show only Markdown files

tree -f
# Show full path for each entry

tree -pugh
# Show permissions, owner, group, and human-readable sizes

tree -a -L 3 -I ".git|node_modules|venv|__pycache__|dist|build"
# A practical everyday command for code projects:
# include hidden files, limit depth, and ignore common noise directories

tree -L 3 -I ".git|node_modules|venv" -o structure.txt
# Save a filtered tree view to a text file

tree -H . -o tree.html
# Export the tree as HTML

tree -d -L 3
# Show only directories up to 3 levels deep

tree -sh
# Show sizes in human-readable form

tree -C
# Force colored output

tree -A
# Use ASCII characters instead of line-drawing characters
```

#### **Classic usage**

The main point: `tree` prints directories and files in a tree-shaped layout, so the structure of a project becomes easy to read.

Basic form:

```bash
tree
```

This shows the current directory recursively.

If a path is given, `tree` shows that location instead:

```bash
tree /etc
tree ~/project
```

A typical output looks like this:

```bash
.
├── README.md
├── src
│   ├── main.py
│   └── utils.py
└── tests
    └── test_main.py
```

This means:

* `.` is the current directory
* `src` and `tests` are subdirectories
* indentation shows hierarchy
* `├──` means there are more entries at the same level
* `└──` means this is the last entry at that level

**Most useful commands to learn first**

1. Show only a few levels

```bash
tree -L 2
```

This is one of the most practical forms. Large folders become unreadable if every level is printed. `-L 2` means: only show two levels deep.

1. Show directories only

```bash
tree -d
```

This is useful when the goal is to understand the structure of a project, not every single file.

1. Include hidden files

```bash
tree -a
```

By default, hidden names such as `.git`, `.env`, and `.bashrc` are not shown. `-a` includes them.

1. Ignore noisy folders

```bash
tree -I "node_modules|.git|dist"
```

This is extremely common. `-I` excludes names that match the pattern. It is often used to hide build folders, dependency folders, cache folders, and Git metadata.

1. Show only certain files

```bash
tree -P "*.py"
```

`-P` keeps only names matching the pattern. This is useful for locating all Python files, Markdown files, shell scripts, and so on.

1. Show full paths

```bash
tree -f
```

Without `-f`, only filenames are printed. With `-f`, each entry includes its full path.

**High-value combinations**

For project structure:

```bash
tree -L 2 -I "node_modules|.git|dist|build"
```

For directory design only:

```bash
tree -d -L 3
```

For Python files only:

```bash
tree -P "*.py"
```

For hidden files plus limited depth:

```bash
tree -a -L 2
```

For detailed metadata:

```bash
tree -pugh
```

This shows permissions, owner, group, and human-readable sizes.

For saving output:

```bash
tree -L 3 -I ".git|node_modules|venv" > structure.txt
```

Or:

```bash
tree -L 3 -I ".git|node_modules|venv" -o structure.txt
```

**How to think about the command**

A simple way to remember `tree` is to divide options into four groups:

* scope: where and how deep to look
* filter: what to include or exclude
* display: how much detail to print
* output: where the result goes

So in practice, many real commands look like this:

```bash
tree [path] [depth control] [filters] [display options]
```

Example:

```bash
tree ~/project -L 3 -I ".git|node_modules|__pycache__" -a
```

This means:

* inspect `~/project`
* go three levels deep
* exclude common noisy directories
* include hidden files

**A very practical default template**

```bash
tree -a -L 3 -I ".git|node_modules|venv|__pycache__|dist|build"
```

This is a good everyday command for code repositories.

**If `tree` is not installed**

Ubuntu / Debian:

```bash
sudo apt install tree
```

Fedora:

```bash
sudo dnf install tree
```

CentOS / RHEL:

```bash
sudo yum install tree
```

Arch Linux:

```bash
sudo pacman -S tree
```

#### **Option reference table**

| Option | Meaning | Common values / inputs | What the common values mean |
||---|---|---|
| `tree [path]` | Show a directory tree | `.`, `/etc`, `~/project` | If no path is given, `tree` uses the current directory. Any valid directory path can be used. |
| `-a` | Show all files | none | Includes hidden files and hidden directories, such as `.git` and `.env`. |
| `-d` | Show directories only | none | Excludes regular files and prints only directories. |
| `-L <level>` | Limit depth | `1`, `2`, `3`, `4` | `1` shows only the top level. `2` shows one layer below that. Larger numbers show deeper levels. |
| `-f` | Show full path | none | Prints the full path prefix for every entry instead of only the name. |
| `-P <pattern>` | Include only matching names | `"*.py"`, `"*.md"`, `"src*"` | `"*.py"` means only Python files. `"*.md"` means only Markdown files. `"src*"` means names beginning with `src`. |
| `-I <pattern>` | Exclude matching names | `"node_modules"`, `"*.log"`, `"node_modules|.git|dist"` | A single name excludes one target. `"*.log"` excludes log files. Patterns separated by `|` mean “exclude any of these”. |
| `--matchdirs` | Match directories with patterns too | none | Usually used with `-P`. Makes directory names themselves participate in matching. |
| `--prune` | Hide empty branches | none | Commonly used with `-P` or `-I`. If filtering makes a directory branch empty, that empty branch is removed from the output. |
| `-p` | Show permissions | none | Prints Unix permission bits such as `drwxr-xr-x`. |
| `-u` | Show owner | none | Prints the username of the file owner. |
| `-g` | Show group | none | Prints the group name for each entry. |
| `-s` | Show size | none | Displays file size, usually in bytes unless combined with `-h`. |
| `-h` | Human-readable sizes | none | Often used with `-s`. Sizes appear as `4.0K`, `12M`, `2.1G` instead of raw bytes. |
| `-D` | Show modification time | none | Prints the last modification date and time. |
| `--timefmt <format>` | Set time format | `"%Y-%m-%d"`, `"%F %T"`, `"%H:%M"` | `"%Y-%m-%d"` gives year-month-day. `"%F %T"` gives full date and time. `"%H:%M"` gives only hour and minute. |
| `-t` | Sort by modification time | none | Newer or older ordering is used instead of normal alphabetical sorting. |
| `-r` | Reverse sorting | none | Reverses the current order. Often combined with `-t`. |
| `--dirsfirst` | Show directories before files | none | Keeps directories grouped before regular files. |
| `-N` | Print raw filenames | none | Prevents escaping of non-ASCII characters. Useful for Chinese, Japanese, Korean, and other non-Latin filenames. |
| `-Q` | Quote filenames | none | Wraps names in double quotes. Useful when names contain spaces or special characters. |
| `-i` | Do not draw indentation lines | none | Removes the line graphics from the tree view. Output becomes simpler but less visual. |
| `-A` | Use ASCII graphics | none | Uses plain ASCII characters instead of extended line-drawing characters. Useful for limited terminals. |
| `-n` | Turn off colors | none | Disables colored output. Good for scripts, logs, or plain text copying. |
| `-C` | Force colors | none | Forces colored output even when automatic detection would not use it. |
| `-x` | Stay on one filesystem | none | Prevents crossing into mounted filesystems under the target directory. |
| `-o <file>` | Write output to a file | `tree.txt`, `output.log`, `structure.md` | Saves the printed tree into a file instead of standard output. |
| `-H <baseHREF>` | Output HTML | `.`, `/`, `https://example.com/` | Generates HTML output. `.` is common for a local relative base. A URL can be used as the base for links. |
| `-T <title>` | Set HTML page title | `"Project Tree"`, `"Directory Index"` | Used with `-H`. Sets the HTML document title. |
| `--charset <charset>` | Set output charset | `UTF-8`, `ASCII`, `ISO-8859-1` | `UTF-8` is the common modern default. `ASCII` is safer for very old terminals. |
| `--filelimit <number>` | Do not descend into very large directories | `100`, `500`, `1000` | If a directory has more than this number of entries, `tree` will not expand it further. |
| `--du` | Show directory sizes | none | Calculates cumulative directory sizes based on their contents. |
| `--noreport` | Hide summary line | none | Suppresses the final line like “X directories, Y files”. |
| `--help` | Show help | none | Prints the built-in help message. |
| `--version` | Show version | none | Prints the installed version of `tree`. |

**Common mistakes and easily confused points**

* `-P` means include matching names, while `-I` means exclude matching names.
* `-h` is most useful together with `-s`; by itself it does not make much sense.
* `-L` limits depth, not the total number of files.
* Hidden files are not shown unless `-a` is used.
* `tree` can become too verbose on large directories; in practice, `-L` and `-I` are often essential.
* Pattern strings usually need quotes, especially when they contain `*` or `|`, so the shell does not process them first.

### realpath

Resolves a path to its canonical absolute form, which is useful when symlinks or relative paths are involved.

### dirname

Extracts the parent directory portion of a path and is commonly used in shell scripts.

### basename

Extracts the final path component and is useful when only the filename or leaf name is needed.

### readlink

Reads the target of a symbolic link and is commonly used to resolve linked paths.

### pushd

Changes directory while saving the previous one on the directory stack for quick navigation.

### popd

Returns to a directory saved on the directory stack and removes it from that stack.

### dirs

Shows the current directory stack and is mainly used together with pushd and popd.

## File/Dir Operations

### cp

Copies files or directories and is the standard command for duplication in the filesystem.

### mv

Moves or renames files and directories and is the basic tool for relocation and renaming.

### rm

Removes files or directories and is the standard deletion command in Unix-like systems.

### mkdir

Creates directories and is used to build new filesystem structure.

### rmdir

Removes empty directories and is mainly used when deletion should be restricted to empty paths.

### touch

Creates an empty file or updates file timestamps and is commonly used in scripts and build workflows.

### ln

Creates hard links or symbolic links and is used to reference the same file content or redirect paths.

### install

Copies files while setting permissions and ownership, making it useful in deployment and packaging workflows.

### rename

Renames multiple files in bulk according to a pattern, useful for batch filename changes.

### mktemp

Creates uniquely named temporary files or directories safely, mainly for scripting.

### unlink

Removes a single filesystem entry and is a low-level deletion command similar to rm for one path.

### truncate

Shrinks or extends a file to a specified size and is useful for log or test file manipulation.

## Content Viewing

### cat

Prints file contents to standard output and is the simplest tool for viewing or concatenating files.

### less

Shows file contents in a scrollable pager and is the standard tool for reading long text output interactively.

### more

Displays text one screen at a time and is an older pager mainly kept for compatibility.

### head

Prints the first part of a file and is useful for quick inspection of file beginnings.

### tail

Prints the last part of a file and is especially useful for watching growing logs with follow mode.

### nl

Prints file contents with line numbers and is useful when discussing or debugging specific lines.

### wc

Counts lines, words, or bytes and is mainly used for quick size and content statistics.

### file

Identifies the type of a file based on content rather than filename extension and is useful for unknown files.

### stat

Shows detailed file metadata such as size, timestamps, permissions, and inode information.

### strings

Extracts printable text from binary files and is commonly used for quick binary inspection.

### hexdump

Displays binary data in hexadecimal form and is useful for low-level file inspection.

### od

Outputs file contents in octal, hexadecimal, or other formats and is used for byte-level examination.

## Permissions & Security Bits

### chmod

Changes file permission bits and is the standard command for controlling read, write, and execute access.

### chown

Changes file owner and group and is essential for Linux file ownership management.

### chgrp

Changes the group ownership of files and directories and is used when only the group needs adjustment.

### umask

Sets the default permission mask for newly created files and directories in a shell session.

### getfacl

Displays Access Control Lists for files and directories and is used when permissions go beyond basic mode bits.

### setfacl

Sets Access Control Lists and is used for fine-grained permission control on Linux filesystems.

### lsattr

Shows extended filesystem attributes and is commonly used on ext-family filesystems.

### chattr

Changes extended filesystem attributes such as immutable flags and is used for special file protections.

### sudo

Runs a command with elevated privileges and is the standard privilege escalation tool on Linux.

### visudo

Safely edits the sudoers policy file with syntax checking to avoid configuration errors.

### id

Displays the current user's UID, GID, and group memberships and is useful in permission debugging.

### su

Switches to another user account, often to a privileged account, within the current session.

## Shell Builtins & Control

### printf

Formats and prints text predictably and is preferred over echo in many scripts.

### echo

Prints text or variable values and is the simplest shell output command.

### read

Reads input from standard input into shell variables and is commonly used in interactive scripts.

### test

Evaluates conditions in shell scripts and is used for file checks, string checks, and comparisons.

### [

Provides test-style conditional evaluation in a compact shell syntax.

### [[

Provides enhanced conditional testing in shells such as Bash with safer syntax and richer operators.

### case

Performs pattern-based branching and is useful when multiple string cases must be handled clearly.

### trap

Registers handlers for signals or shell exit events and is important for cleanup logic in scripts.

### set

Controls shell options and positional parameters and is central to shell behavior management.

### export

Marks variables for inheritance by child processes and is the standard way to define environment variables.

### unset

Removes shell variables or functions and is used to clean environment state.

### eval

Evaluates constructed shell code dynamically and is powerful but should be used cautiously.

### alias

Defines command shortcuts in the shell and is mainly used for convenience in interactive sessions.

### unalias

Removes previously defined aliases and is used to restore original command behavior.

### source

Executes commands from a file in the current shell environment rather than a subshell.

### shift

Shifts positional parameters in shell scripts and is useful when parsing command arguments.

### getopts

Parses short command-line options in shell scripts and is the standard built-in option parser.

## Pipes, Redirection, IPC

### tee

Copies standard input to both standard output and files and is useful for logging pipeline output.

### xargs

Builds and runs commands from standard input and is commonly used to turn text input into command arguments.

#### Basic Syntax

```bash
command | xargs [options] [command]
```

#### Common Options

| Option         | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| `-n [num]`     | Specifies the number of arguments per command invocation.                   |
| `-I {}`        | Replace `{}` in the command with the argument(s) from input.                |
| `-0`           | Use with null-terminated input (e.g., with `find ... -print0`), handling filenames with spaces. |
| `-p`           | Prompt before executing each command.                                       |
| `-t`           | Print each command before executing it.                                     |
| `-L [num]`     | Set the number of lines read from input per command invocation.             |
| `-d [delim]`   | Use `[delim]` as the input delimiter, instead of whitespace.                |
| `--max-procs [n]` | Run up to `[n]` commands in parallel.                                  |

#### Practical Examples

| Command                                           | Description                                                          |
|---------------------------------------------------|----------------------------------------------------------------------|
| `echo "file1 file2 file3" | xargs rm`             | Delete `file1`, `file2`, and `file3`.                                |
| `find . -name "*.log" | xargs -p rm`              | Prompt before deleting each `.log` file found.                       |
| `ls *.jpg | xargs -I {} mv {} /backup`            | Move all `.jpg` files in the directory to `/backup`.                 |
| `cat urls.txt | xargs wget`                       | Download all URLs listed in `urls.txt`.                              |
| `find . -type f -print0 | xargs -0 rm`            | Delete all files, handling filenames with spaces using `-print0`.    |
| `echo "apple orange banana" | xargs -n 2`         | Print arguments in pairs of two.                                     |
| `grep -l "ERROR" *.log | xargs -I {} cp {} /errors` | Copy all files containing "ERROR" to the `/errors` directory.     |
| `find . -name "*.sh" | xargs chmod +x`            | Make all `.sh` files executable.                                     |
| `echo "package1 package2" | xargs sudo apt-get install -y` | Install multiple packages using `apt-get`.               |
| `find /logs -name "*.log" | xargs -I {} gzip {}`  | Compress each `.log` file in `/logs`.                                |
| `echo "path1 path2" | xargs -L 1 mkdir`           | Create directories for each path listed, one `mkdir` per line.       |

#### Advanced Tips

- **Parallel Execution**: Use `--max-procs` for parallel processing:
  ```bash
  cat urls.txt | xargs --max-procs=4 wget
  ```
* **Nested Commands**: Combine `xargs` with `find`, `grep`, `awk`, etc., for flexible batch operations:
  ```bash
  find . -name "*.c" | xargs grep 'main'
  ```
  
This cheatsheet provides a quick reference to `xargs` for handling multiple arguments efficiently!

Here are some advanced `xargs` tips that help leverage its full power:

1. **Limit Arguments per Command Execution**
   * Using `-n` and `-L` together allows you to control the number of arguments and lines, creating more flexibility in splitting tasks.
   ```bash
   cat large_list.txt | xargs -n 5 -L 2 echo
   ```
   This command processes 5 arguments at a time, but reads 2 lines per command invocation.

2. **Execute Commands in Parallel with Output Ordering**
   * `xargs` with `--max-procs` runs commands in parallel but can have mixed output. Combine with `wait` or use output redirection to maintain order.
   ```bash
   cat urls.txt | xargs -n 1 -P 4 -I {} sh -c 'wget {} -O {}.html && echo "Downloaded {}"'
   ```
   Here, 4 downloads run in parallel with the downloaded filenames ordered correctly.

3. **Avoid Errors with Filenames Containing Spaces or Special Characters**
   * When working with files with spaces, use `-print0` in `find` and `-0` in `xargs` to handle special characters safely.
   ```bash
   find /path -name "*.txt" -print0 | xargs -0 grep 'pattern'
   ```

4. **Pipe Command Output to `xargs` as Input for Other Commands**
   * Chain `xargs` with multiple commands to perform compound operations.
   ```bash
   cat list.txt | xargs -I {} sh -c 'echo "Processing {}" && grep "keyword" {} && echo "Done with {}"'
   ```
   This executes `echo`, `grep`, and another `echo` for each item in `list.txt`.

5. **Control Command Failure with `xargs` and `||`**
   * Set up a fallback command to handle failed executions using `||`.
   ```bash
   cat files.txt | xargs -I {} sh -c 'cp {} /backup || echo "Failed to copy {}"'
   ```

6. **Batch Process Files in Chunks**
   * Sometimes you want to process files in batches (e.g., 10 at a time). Use `-n` for chunking and a loop for multi-batch processing.
   ```bash
   cat files.txt | xargs -n 10 | while read batch; do
       echo "Processing batch: $batch"
       # Replace with actual command
   done
   ```

7. **Run Interactive Commands Using `xargs`**
   * For commands that need interaction (like `rm -i`), combine `xargs` with `-p` for user confirmation:
   ```bash
   ls *.tmp | xargs -p rm
   ```

8. **Capture Standard Error and Redirect Outputs Separately**
   * To handle errors or redirect specific outputs, redirect `stderr` to a log while still displaying `stdout`.
   ```bash
   cat files.txt | xargs -I {} sh -c 'cp {} /backup 2>>error.log'
   ```

9. **Use `xargs` with `rsync` or `scp` for Remote Operations**
   * Sync or copy multiple files to a remote server using `xargs`.
   ```bash
   cat files.txt | xargs -I {} rsync -av {} user@remote:/destination/
   ```

10. **Process Command Substitution with `xargs`**
* Use command substitution to pass `xargs` output to another command inline.
   ```bash
   echo $(cat files.txt | xargs echo)
   ```
   This reads the list of files from `files.txt`, concatenates them, and prints them in a single line.

These tips allow `xargs` to streamline batch processing tasks, especially in complex or parallel workflows.

#### xargs: unmatched single quote

ls | xargs -d "\n" -I {} ffmpeg -i {} -q:a 0 -map a {}.mp3

### parallel

Runs jobs in parallel from input items and is used to speed up batch processing.

### stdbuf

Adjusts buffering behavior of command streams and is useful when pipeline output appears delayed.

### pv

Shows progress information for data moving through a pipeline and is useful for large transfers.

### mkfifo

Creates a named pipe for inter-process communication between commands.

### flock

Applies file locks to coordinate access between processes and is useful in scripts and cron jobs.

### timeout

Runs a command with a time limit and terminates it if the limit is exceeded.

### script

Records a terminal session and is useful for demonstrations, auditing, or reproducing shell activity.

### expect

Automates interaction with terminal programs that normally require manual input.

### wait

Waits for background jobs or child processes to finish and is essential in shell job control.

## Text Transform (Core)

### grep

Searches text using regular expressions and is the standard Unix filtering tool.

`grep` is a command-line utility in Unix and Linux systems used to search for specific patterns or text within files. Its name stands for `Global Regular Expression Print`. grep is powerful and commonly used for text processing, system administration, and searching logs or codebases.

#### Basic Syntax and Options

```bash
grep [options] pattern [file...]
```

| Option        | Description                                   |
|---------------|-----------------------------------------------|
| `-i`          | Ignore case (case-insensitive search)        |
| `-v`          | Invert match (show lines that do **not** match)|
| `-r` or `-R`  | Recursive search through directories         |
| `-l`          | Print file names with matches (not the matches themselves) |
| `-n`          | Print line numbers alongside matches         |
| `-c`          | Print count of matching lines                |
| `-w`          | Match whole words only                       |
| `-x`          | Match entire line                            |
| `--color`     | Highlight matched text                       |
| `-e`          | Specify multiple patterns (useful for OR logic) |
| `-f`          | Read patterns from a file                    |
| `-o`          | Print only matched parts of a line           |
| `-q`          | Quiet mode (no output, returns exit status)  |
| `-m [num]`    | Stop reading after `[num]` matches           |

#### Practical Usage Cheatsheet for `grep`

| Command                                | Description                                                          |
|---------------------------------------|----------------------------------------------------------------------|
| `grep 'error' logfile.txt`            | Find all lines containing "error" in `logfile.txt`.                 |
| `grep -i 'warning' logfile.txt`       | Search for "warning" in `logfile.txt`, ignoring case sensitivity.   |
| `grep -r 'TODO' /projects`            | Recursively search for "TODO" comments in all files under `/projects`. |
| `grep -l '404' /var/log/*`            | List all files in `/var/log` containing the string "404".           |
| `grep -n 'function' script.sh`        | Display matching lines with line numbers where "function" appears in `script.sh`. |
| `grep -v '^#' config.txt`             | Show all non-commented lines (not starting with `#`) in `config.txt`.|
| `grep -w 'root' /etc/passwd`          | Find lines with the exact word "root" in `/etc/passwd` file.        |
| `grep -c 'fail' /var/log/syslog`      | Count the number of lines containing "fail" in `/var/log/syslog`.   |
| `grep --color 'ERROR' logfile.txt`    | Highlight the word "ERROR" in the matching lines from `logfile.txt`.|
| `grep -e 'foo' -e 'bar' file.txt`     | Search for lines containing either "foo" or "bar" in `file.txt`.    |
| `grep '^user:' /etc/passwd`           | Display lines in `/etc/passwd` that start with "user:".             |
| `grep '[0-9]\{3\}-[0-9]\{2\}-[0-9]\{4\}' data.txt` | Search for lines containing a pattern like a social security number (e.g., `123-45-6789`) in `data.txt`. |
| `grep -f patterns.txt data.log`       | Search `data.log` using multiple patterns listed in `patterns.txt`. |
| `grep -A 3 'error' logfile.txt`       | Show lines containing "error" and 3 lines **after** each match in `logfile.txt`. |
| `grep -B 2 'failed' logfile.txt`      | Show lines containing "failed" and 2 lines **before** each match in `logfile.txt`. |
| `grep -C 1 'timeout' logfile.txt`     | Show lines containing "timeout" with 1 line of context (before and after) in `logfile.txt`. |
| `grep -o 'http[^ ]*' webpage.html`    | Extract all URLs (starting with "http") from `webpage.html`.        |
| `grep -m 5 'error' logfile.txt`       | Stop searching after finding the first 5 matches of "error" in `logfile.txt`. |
| `grep '^[a-zA-Z]' file.txt`                 | Find lines that start with any alphabetic character in `file.txt`.  |
| `grep '[^0-9]' file.txt`                    | Show lines containing any character **other than** numbers in `file.txt`. |
| `grep -r --include=\*.txt 'ERROR' /logs`    | Recursively search only `.txt` files in `/logs` directory for "ERROR". |
| `grep -r --exclude=\*.log 'SUCCESS' /data`  | Recursively search all files except `.log` files for "SUCCESS" in `/data`. |
| `grep -r -l 'password' /etc/*`              | List only file names containing "password" in the `/etc` directory and its subdirectories. |
| `grep -P '^\d{4}-\d{2}-\d{2}' dates.txt`    | Use Perl regex to find lines starting with a date format like `YYYY-MM-DD` in `dates.txt`. |
| `grep -E '(ERROR|WARNING|INFO)' logfile.txt`| Search for lines containing "ERROR", "WARNING", or "INFO" in `logfile.txt` using extended regex. |
| `grep -H 'pattern' file1.txt file2.txt`     | Display file name along with matching lines from `file1.txt` and `file2.txt`. |
| `grep --binary-files=text 'pattern' binaryfile.bin` | Search for a pattern in a binary file, treating it as text.        |
| `grep -rZ 'username' /home/ | xargs -0 rm`  | Find files containing "username" and delete them (useful for cleanup tasks). |
| `grep -lZ 'keyword' * | xargs -0 cp -t /backup/` | Find files with "keyword" and copy them to `/backup/` directory.  |
| `grep 'user[0-9]\+' /etc/passwd`            | Search for lines containing "user" followed by one or more digits in `/etc/passwd`. |
| `grep -r --exclude-dir=cache 'DEBUG' /var/` | Recursively search for "DEBUG" in `/var/`, excluding directories named `cache`. |
| `grep --exclude=\*.{log,txt} -r 'error' /logs` | Recursively search for "error" in `/logs`, excluding `.log` and `.txt` files. |
| `grep -r 'pattern' /home/user/ --context=2` | Show 2 lines of context (before and after) for matches in `/home/user/`. |
| `grep -B3 -A2 'panic' /var/log/syslog`      | Display 3 lines before and 2 lines after lines containing "panic" in `/var/log/syslog`. |
| `grep -E '[A-Z]{3,}' notes.txt`             | Find lines with words of 3 or more uppercase letters in `notes.txt`. |
| `grep --line-buffered 'LIVE' output.log`    | Print lines containing "LIVE" in real-time as they are written to `output.log`. |
| `grep --color=always -i 'error' file.txt | less -R` | Highlight "error" in `file.txt` and view results with `less` while preserving color. |
| `grep -A 0 'ERROR' /logs/* | grep -B 2 'FATAL'` | Find lines with "ERROR" that are followed by lines containing "FATAL" using nested `grep`. |
| `grep -C 5 'function' *.c`                  | Show 5 lines of context around each match for "function" in all `.c` files. |
| `grep -L 'DEBUG' *.py`                      | List all `.py` files that do **not** contain the string "DEBUG".     |
| `grep -oP 'https?://\S+' webdata.html`      | Extract all URLs from `webdata.html`, matching both `http` and `https`. |

### rg

Searches text recursively with high performance and is commonly used as a modern replacement for recursive grep.

### sed

Edits text streams non-interactively and is used for substitutions, deletions, and scriptable transformations.

### awk

Processes text by fields and patterns and is one of the most important Unix text-processing languages.

<table>
  <tr>
    <td>sum integers from a file or stdin, one integer per line:</td>
  </tr>
  <tr>
    <td>printf '1\n2\n3\n' | awk '{ sum += $1} END {print sum}'</td>
  </tr>
  <tr>
    <td>using specific character as separator to sum integers from a file or stdin</td>
  </tr>
  <tr>
    <td>printf '1:2:3' | awk -F ":" '{print $1+$2+$3}'</td>
  </tr>
  <tr>
    <td>print a multiplication table</td>
  </tr>
  <tr>
    <td>seq 9 | sed 'H;g' | awk -v RS='' '{for(i=1;i&lt;=NF;i++)printf("%dx%d=%d%s", i, NR, i*NR, i==NR?"\n":"\t")}'</td>
  </tr>
  <tr>
    <td>Specify output separator character</td>
  </tr>
  <tr>
    <td>printf '1 2 3' | awk 'BEGIN {OFS=":"}; {print $1,$2,$3}'</td>
  </tr>
</table>
```
FILE SPACING:

```
 # double space a file
 awk '1;{print ""}'
 awk 'BEGIN{ORS="\n\n"};1'

 # double space a file which already has blank lines in it. Output file
 # should contain no more than one blank line between lines of text.
 # NOTE: On Unix systems, DOS lines which have only CRLF (\r\n) are
 # often treated as non-blank, and thus 'NF' alone will return TRUE.
 awk 'NF{print $0 "\n"}'

 # triple space a file
 awk '1;{print "\n"}'

NUMBERING AND CALCULATIONS:

 # precede each line by its line number FOR THAT FILE (left alignment).
 # Using a tab (\t) instead of space will preserve margins.
 awk '{print FNR "\t" $0}' files*

 # precede each line by its line number FOR ALL FILES TOGETHER, with tab.
 awk '{print NR "\t" $0}' files*

 # number each line of a file (number on left, right-aligned)
 # Double the percent signs if typing from the DOS command prompt.
 awk '{printf("%5d : %s\n", NR,$0)}'

 # number each line of file, but only print numbers if line is not blank
 # Remember caveats about Unix treatment of \r (mentioned above)
 awk 'NF{$0=++a " :" $0};1'
 awk '{print (NF? ++a " :" :"") $0}'

 # count lines (emulates "wc -l")
 awk 'END{print NR}'

 # print the sums of the fields of every line
 awk '{s=0; for (i=1; i<=NF; i++) s=s+$i; print s}'

 # add all fields in all lines and print the sum
 awk '{for (i=1; i<=NF; i++) s=s+$i}; END{print s}'

 # print every line after replacing each field with its absolute value
 awk '{for (i=1; i<=NF; i++) if ($i < 0) $i = -$i; print }'
 awk '{for (i=1; i<=NF; i++) $i = ($i < 0) ? -$i : $i; print }'

 # print the total number of fields ("words") in all lines
 awk '{ total = total + NF }; END {print total}' file

 # print the total number of lines that contain "Beth"
 awk '/Beth/{n++}; END {print n+0}' file

 # print the largest first field and the line that contains it
 # Intended for finding the longest string in field #1
 awk '$1 > max {max=$1; maxline=$0}; END{ print max, maxline}'

 # print the number of fields in each line, followed by the line
 awk '{ print NF ":" $0 } '

 # print the last field of each line
 awk '{ print $NF }'

 # print the last field of the last line
 awk '{ field = $NF }; END{ print field }'

 # print every line with more than 4 fields
 awk 'NF > 4'

 # print every line where the value of the last field is > 4
 awk '$NF > 4'

STRING CREATION:

 # create a string of a specific length (e.g., generate 513 spaces)
 awk 'BEGIN{while (a++<513) s=s " "; print s}'

 # insert a string of specific length at a certain character position
 # Example: insert 49 spaces after column #6 of each input line.
 gawk --re-interval 'BEGIN{while(a++<49)s=s " "};{sub(/^.{6}/,"&" s)};1'

ARRAY CREATION:

 # These next 2 entries are not one-line scripts, but the technique
 # is so handy that it merits inclusion here.
 
 # create an array named "month", indexed by numbers, so that month[1]
 # is 'Jan', month[2] is 'Feb', month[3] is 'Mar' and so on.
 split("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec", month, " ")

 # create an array named "mdigit", indexed by strings, so that
 # mdigit["Jan"] is 1, mdigit["Feb"] is 2, etc. Requires "month" array
 for (i=1; i<=12; i++) mdigit[month[i]] = i

TEXT CONVERSION AND SUBSTITUTION:

 # IN UNIX ENVIRONMENT: convert DOS newlines (CR/LF) to Unix format
 awk '{sub(/\r$/,"")};1'   # assumes EACH line ends with Ctrl-M

 # IN UNIX ENVIRONMENT: convert Unix newlines (LF) to DOS format
 awk '{sub(/$/,"\r")};1'

 # IN DOS ENVIRONMENT: convert Unix newlines (LF) to DOS format
 awk 1

 # IN DOS ENVIRONMENT: convert DOS newlines (CR/LF) to Unix format
 # Cannot be done with DOS versions of awk, other than gawk:
 gawk -v BINMODE="w" '1' infile >outfile

 # Use "tr" instead.
 tr -d \r <infile >outfile            # GNU tr version 1.22 or higher

 # delete leading whitespace (spaces, tabs) from front of each line
 # aligns all text flush left
 awk '{sub(/^[ \t]+/, "")};1'

 # delete trailing whitespace (spaces, tabs) from end of each line
 awk '{sub(/[ \t]+$/, "")};1'

 # delete BOTH leading and trailing whitespace from each line
 awk '{gsub(/^[ \t]+|[ \t]+$/,"")};1'
 awk '{$1=$1};1'           # also removes extra space between fields

 # insert 5 blank spaces at beginning of each line (make page offset)
 awk '{sub(/^/, "     ")};1'

 # align all text flush right on a 79-column width
 awk '{printf "%79s\n", $0}' file*

 # center all text on a 79-character width
 awk '{l=length();s=int((79-l)/2); printf "%"(s+l)"s\n",$0}' file*

 # substitute (find and replace) "foo" with "bar" on each line
 awk '{sub(/foo/,"bar")}; 1'           # replace only 1st instance
 gawk '{$0=gensub(/foo/,"bar",4)}; 1'  # replace only 4th instance
 awk '{gsub(/foo/,"bar")}; 1'          # replace ALL instances in a line

 # substitute "foo" with "bar" ONLY for lines which contain "baz"
 awk '/baz/{gsub(/foo/, "bar")}; 1'

 # substitute "foo" with "bar" EXCEPT for lines which contain "baz"
 awk '!/baz/{gsub(/foo/, "bar")}; 1'

 # change "scarlet" or "ruby" or "puce" to "red"
 awk '{gsub(/scarlet|ruby|puce/, "red")}; 1'

 # reverse order of lines (emulates "tac")
 awk '{a[i++]=$0} END {for (j=i-1; j>=0;) print a[j--] }' file*

 # if a line ends with a backslash, append the next line to it (fails if
 # there are multiple lines ending with backslash...)
 awk '/\\$/ {sub(/\\$/,""); getline t; print $0 t; next}; 1' file*

 # print and sort the login names of all users
 awk -F ":" '{print $1 | "sort" }' /etc/passwd

 # print the first 2 fields, in opposite order, of every line
 awk '{print $2, $1}' file

 # switch the first 2 fields of every line
 awk '{temp = $1; $1 = $2; $2 = temp}' file

 # print every line, deleting the second field of that line
 awk '{ $2 = ""; print }'

 # print in reverse order the fields of every line
 awk '{for (i=NF; i>0; i--) printf("%s ",$i);print ""}' file

 # concatenate every 5 lines of input, using a comma separator
 # between fields
 awk 'ORS=NR%5?",":"\n"' file

SELECTIVE PRINTING OF CERTAIN LINES:

 # print first 10 lines of file (emulates behavior of "head")
 awk 'NR < 11'

 # print first line of file (emulates "head -1")
 awk 'NR>1{exit};1'

  # print the last 2 lines of a file (emulates "tail -2")
 awk '{y=x "\n" $0; x=$0};END{print y}'

 # print the last line of a file (emulates "tail -1")
 awk 'END{print}'

 # print only lines which match regular expression (emulates "grep")
 awk '/regex/'

 # print only lines which do NOT match regex (emulates "grep -v")
 awk '!/regex/'

 # print any line where field #5 is equal to "abc123"
 awk '$5 == "abc123"'

 # print only those lines where field #5 is NOT equal to "abc123"
 # This will also print lines which have less than 5 fields.
 awk '$5 != "abc123"'
 awk '!($5 == "abc123")'

 # matching a field against a regular expression
 awk '$7  ~ /^[a-f]/'    # print line if field #7 matches regex
 awk '$7 !~ /^[a-f]/'    # print line if field #7 does NOT match regex

 # print the line immediately before a regex, but not the line
 # containing the regex
 awk '/regex/{print x};{x=$0}'
 awk '/regex/{print (NR==1 ? "match on line 1" : x)};{x=$0}'

 # print the line immediately after a regex, but not the line
 # containing the regex
 awk '/regex/{getline;print}'

 # grep for AAA and BBB and CCC (in any order on the same line)
 awk '/AAA/ && /BBB/ && /CCC/'

 # grep for AAA and BBB and CCC (in that order)
 awk '/AAA.*BBB.*CCC/'

 # print only lines of 65 characters or longer
 awk 'length > 64'

 # print only lines of less than 65 characters
 awk 'length < 64'

 # print section of file from regular expression to end of file
 awk '/regex/,0'
 awk '/regex/,EOF'

 # print section of file based on line numbers (lines 8-12, inclusive)
 awk 'NR==8,NR==12'

 # print line number 52
 awk 'NR==52'
 awk 'NR==52 {print;exit}'          # more efficient on large files

 # print section of file between two regular expressions (inclusive)
 awk '/Iowa/,/Montana/'             # case sensitive

SELECTIVE DELETION OF CERTAIN LINES:

 # delete ALL blank lines from a file (same as "grep '.' ")
 awk NF
 awk '/./'

 # remove duplicate, consecutive lines (emulates "uniq")
 awk 'a !~ $0; {a=$0}'

 # remove duplicate, nonconsecutive lines
 awk '!a[$0]++'                     # most concise script
 awk '!($0 in a){a[$0];print}'      # most efficient script
```

### cut

Extracts selected fields or character ranges from each line of input.

### paste

Merges lines from files side by side and is useful for simple column-based composition.

### join

Combines lines from two sorted files based on a common field, similar to a text-based relational join.

### sort

Sorts lines of text and is often used before deduplication, comparison, or aggregation.

### uniq

Removes or counts adjacent duplicate lines and is usually used after sorting.

### column

Formats input into aligned columns and is useful for improving readability of tabular text.

### tr

Translates or deletes characters and is commonly used for simple character-level transformations.

### comm

Compares two sorted files line by line and separates unique and shared lines.

## Search & Indexing

### find

Searches the filesystem by predicates such as name, type, size, or time and is the core Linux file search tool.

<table>
  <tr>
    <td>Search for file ending .conf</td>
    <td>find /etc/ -name *.conf<g/td>
  </tr>
  <tr>
    <td>Find files modified between 10 to 7 days ago</td>
    <td>find /etc/ -mmin +10 -mtime +7d</td>
  </tr>
  <tr>
    <td>Search for directories and change permission to 755</td>
    <td>find /path/ -type d -exec chmod -v 755 {} \;</td>
  </tr>
  <tr>
    <td>To find files with extension '.txt' and remove them</td>
    <td>find . /path/ -name '*.txt' -exec rm '{}' \;</td>
  </tr>
  <tr>
    <td>To find files with size bigger than 5 Mb and sort them by size</td>
    <td>find . -type f -size +20000k -exec ls -lh {} \; | awk '{ print $9 ": " $5 }'</td>
  </tr>
  <tr>
    <td>To search for and delete empty directories</td>
    <td>find . -type d -empty -exec rmdir {} \;</td>
  </tr>
  <tr>
    <td>To search all files who are not in .git directory</td>
    <td>find . ! -iwholename '*.git*' -type f</td>
  </tr>
  <tr>
    <td>To find files with extension '.txt' and look for a string into them</td>
    <td>find ./path/ -name '*.txt' | xargs grep 'string'</td>
  </tr>
</table>

### fd

Provides a faster and simpler interface for common file searches and is often used as a modern alternative to find.

### locate

Finds paths from a prebuilt filename database and is useful for very fast lookups.

### updatedb

Refreshes the database used by locate and is part of indexed file search maintenance.

### which

Shows the executable path that would be run for a command name, mainly for quick shell inspection.

### whereis

Locates binaries, source files, and manual pages for a command.

### type

Explains how the shell resolves a command name, including aliases, builtins, functions, and executables.

### command -v

Returns the command resolution result in a script-friendly way and is preferred in portable shell checks.

## Archiving & Backup

### tar

Creates or extracts archive files and is the standard Unix archiving tool.

### gzip

Compresses files using the gzip format and is commonly paired with tar.

### bzip2

Compresses files with stronger compression than gzip at the cost of speed.

### xz

Provides high-ratio compression and is often used for distribution archives.

### zstd

Provides fast modern compression with a strong balance between speed and compression ratio.

### zip

Creates ZIP archives and is often used for cross-platform file exchange.

### unzip

Extracts ZIP archives and is the standard command for ZIP handling on Linux.

### rsync

Synchronizes files efficiently by transferring only differences and is widely used for backup and deployment.

### dd

Performs low-level block copying and is commonly used for disk images, device cloning, and rescue work.

## Process & Jobs

### ps

Displays process information and is the standard tool for inspecting running processes.

### top

Shows a live updating view of processes and system resource usage.

### htop

Provides an interactive process viewer with easier navigation than top.

### pgrep

Finds process IDs by name or attributes and is useful for scripting.

### pkill

Sends signals to processes selected by name or attributes and is a convenient process control tool.

### kill

Sends a signal to a process, usually to terminate or control it.

### killall

Signals processes by name and is useful when multiple matching processes should be handled together.

### nice

Starts a process with adjusted CPU scheduling priority.

### renice

Changes the scheduling priority of an already running process.

### pstree

Displays processes as a parent-child tree and is useful for understanding process relationships.

### nohup

Runs a command so it continues after the terminal session ends.

### jobs

Lists shell background and stopped jobs in the current shell session.

### bg

Resumes a stopped shell job in the background.

### fg

Brings a background or stopped shell job to the foreground.

### disown

Removes a shell job from the shell’s job table so it is no longer managed there.

## Open Files & Sockets

### lsof

Lists open files and the processes using them, which is useful because many Linux resources appear as files.

### fuser

Shows which processes are using a file, directory, or socket and can also signal them.

### ss

Displays socket and network connection information and is the modern replacement for many netstat uses.

### ipcs

Shows System V IPC objects such as shared memory, semaphores, and message queues.

### ipcrm

Removes System V IPC objects and is used for cleanup of shared kernel resources.

### pmap

Displays a process memory map and is useful for investigating memory layout and usage.

### strace -p

Attaches to a running process and traces its system calls for debugging.

### gdb -p

Attaches the GNU debugger to a running process for interactive debugging.

### coredumpctl

Lists and accesses core dumps managed by systemd for post-mortem debugging.

## Services, Logs (systemd)

### systemctl

Manages systemd units such as services, sockets, mounts, and timers and is the central service control tool on modern Linux.

### journalctl

Queries and displays logs from the systemd journal with filtering by service, boot, time, and priority.

### systemd-analyze

Analyzes boot and unit startup performance and is useful for diagnosing slow startup.

### systemd-run

Starts transient units under systemd and is useful for controlled one-off execution.

### loginctl

Inspects and manages user logins, sessions, and seats on systemd-based systems.

### timedatectl

Displays or changes system time, date, timezone, and NTP settings.

### hostnamectl

Displays or changes the system hostname and related host metadata.

### udevadm

Inspects and controls udev device management and is useful for hardware and rule debugging.

### logrotate

Rotates, compresses, and manages log file retention according to policy.

### logger

Writes messages into the system logging pipeline and is useful in scripts and diagnostics.

### dmesg

Displays kernel ring buffer messages and is essential for boot, driver, and hardware troubleshooting.

## Performance & Tracing

### time

Measures how long a command takes to run and reports timing information.

### vmstat

Reports virtual memory, process, CPU, and I/O activity for quick system health checks.

### iostat

Shows CPU and block device I/O statistics and is useful for storage performance diagnosis.

### pidstat

Reports per-process CPU, memory, I/O, and scheduling statistics over time.

### sar

Collects and reports historical system activity data and is useful for retrospective analysis.

### mpstat

Reports CPU usage statistics per processor and is useful on multicore systems.

### free

Displays memory and swap usage in a compact format.

### iotop

Shows disk I/O usage by process and helps identify I/O-heavy workloads.

### perf

Provides Linux performance profiling and tracing using kernel performance counters.

### bpftrace

Runs high-level eBPF tracing programs for dynamic observability of kernel and user-space behavior.

### bpftool

Inspects and manages eBPF programs, maps, and related kernel objects.

### valgrind

Analyzes programs for memory errors and performance issues, mainly in native code debugging.

## Storage & Filesystems

### df

Reports filesystem space usage and is used to check free and used disk capacity.

### du

Estimates disk usage for files and directories and is commonly used to find large paths.

### lsblk

Lists block devices in a tree view and is the standard tool for understanding disk layout.

### blkid

Displays block device attributes such as UUID and filesystem type.

### mount

Attaches a filesystem to the directory tree so it becomes accessible.

### umount

Detaches a mounted filesystem from the directory tree.

### findmnt

Shows mounted filesystems in a structured way and is useful for mount inspection.

### fsck

Checks and repairs filesystem consistency and is typically used for recovery or maintenance.

### tune2fs

Adjusts parameters of ext-family filesystems such as reserved blocks and mount counts.

### xfs_info

Displays metadata and geometry information about an XFS filesystem.

### zpool

Manages ZFS storage pools and is the main administrative tool for ZFS pool operations.

### zfs

Manages ZFS datasets, snapshots, and filesystem properties.

## Partitioning / LVM / RAID

### fdisk

Edits disk partition tables and is commonly used for basic partition management.

### parted

Manages disk partitions with support for modern partition table formats and large disks.

### sfdisk

Provides script-friendly partition table management for automation.

### mkfs

Creates a filesystem on a block device or partition.

### mkswap

Initializes a device or file for use as Linux swap space.

### swapon

Enables a swap area for system use.

### swapoff

Disables an active swap area.

### losetup

Associates files with loop devices so ordinary files can be treated like block devices.

### pvcreate

Initializes a physical volume for LVM.

### vgcreate

Creates an LVM volume group from one or more physical volumes.

### lvcreate

Creates an LVM logical volume inside a volume group.

### mdadm

Manages Linux software RAID arrays.

### cryptsetup

Manages disk encryption, especially LUKS volumes, on Linux.

## Networking (Basics)

### ip

Configures and inspects network interfaces, addresses, routes, and links and is the standard modern Linux networking tool.

### ping

Tests network reachability and latency using ICMP echo requests.

### traceroute

Shows the network path packets take to a destination.

### dig

Queries DNS servers directly and is the standard diagnostic DNS lookup tool.

### host

Performs simple DNS lookups and is useful for quick name resolution checks.

### nslookup

Queries DNS records and is still commonly used, though dig is generally preferred.

### curl

Transfers data with URLs and is widely used for HTTP requests, APIs, and network debugging.

### wget

Downloads files non-interactively and is commonly used in scripts and server environments.

### nc

Reads and writes raw network connections and is useful for quick TCP or UDP testing.

### ssh

Provides secure remote shell access and is a fundamental Linux administration tool.

### scp

Copies files over SSH and is used for simple secure file transfer.

### sftp

Provides interactive file transfer over SSH.

## Networking (Advanced)

### tcpdump

Captures and prints network packets and is one of the main Linux packet analysis tools.

### mtr

Combines ping and traceroute functionality to analyze path quality over time.

### iperf3

Measures network throughput between two endpoints.

### nmap

Scans hosts and ports to discover services and network exposure.

### openssl s_client

Opens a raw TLS client connection and is useful for certificate and handshake debugging.

### socat

Creates flexible bidirectional data channels between files, sockets, terminals, and more.

### ethtool

Queries and configures network interface driver and link settings.

### nmcli

Controls NetworkManager from the command line and is widely used on desktop and server Linux systems.

### resolvectl

Inspects DNS resolution state and controls systemd-resolved behavior.

### iptables-nft

Provides iptables-compatible interaction on nftables-backed systems.

### tshark

Captures and analyzes packets from the command line as the terminal counterpart to Wireshark.

## Firewall & Policy

### nft

Manages nftables rules and is the modern Linux packet filtering framework.

### iptables

Manages legacy netfilter firewall rules and remains common on older systems.

### ufw

Provides a simplified interface for host firewall management, especially on Ubuntu-based systems.

### firewall-cmd

Manages firewalld zones and rules and is common on Fedora and RHEL-based systems.

### ipset

Manages sets of IPs or networks for efficient firewall matching.

### tc

Controls Linux traffic shaping, queuing, and packet scheduling.

### sysctl

Reads and writes kernel runtime parameters exposed through procfs.

### fail2ban-client

Controls Fail2ban and is used to inspect or manage automatic ban rules.

### getenforce

Shows the current SELinux enforcement mode.

### semanage

Manages SELinux policy settings such as contexts, ports, and booleans.

### auditctl

Controls the Linux audit subsystem rules.

### ausearch

Searches audit logs and is used for security and compliance investigation.

## Scheduling & Automation (Local)

### crontab

Edits or lists per-user cron jobs for recurring scheduled execution.

### cron

Refers to the cron scheduling service that runs periodic tasks in the background.

### at

Schedules a command to run once at a specified time.

### systemctl list-timers

Lists systemd timers, which are the systemd-native alternative to cron-style scheduling.

### anacron

Runs scheduled jobs that were missed while the system was powered off.

### date

Prints or formats date and time values and is widely used in scripts.

### sleep

Pauses execution for a specified duration and is commonly used in shell automation.

### watch

Runs a command repeatedly and displays refreshed output for monitoring.

### envsubst

Substitutes environment variables in text and is useful for simple template expansion.

### make

Automates tasks based on dependency rules and is often used beyond compilation.

### just

Provides a modern command runner for project tasks with simpler syntax than make.

## Package Management

### apt

Manages packages on Debian-based systems and is the main high-level package tool there.

### dnf

Manages packages on modern Fedora and related systems.

### yum

Provides package management on older RHEL-family systems and is largely superseded by dnf.

### pacman

Manages packages on Arch Linux and related distributions.

### zypper

Manages packages on openSUSE and SUSE Linux systems.

### apk

Manages packages on Alpine Linux.

### rpm

Installs, queries, and verifies RPM packages at a lower level than dnf or yum.

### dpkg

Installs, queries, and manages DEB packages at a lower level than apt.
