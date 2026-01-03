---
category: Sheet
title: grep - Quick Reference and Minimal Tutorial
tags: Linux
---

`grep` is a command-line utility in Unix and Linux systems used to search for specific patterns or text within files. Its name stands for `Global Regular Expression Print`. grep is powerful and commonly used for text processing, system administration, and searching logs or codebases.

### Basic Syntax and Options

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

### Practical Usage Cheatsheet for `grep`

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