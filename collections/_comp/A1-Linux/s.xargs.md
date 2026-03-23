---
category: Sheet
title: xargs - Quick Reference and Minimal Tutorial
tags: Linux
---


Here's a concise `xargs` cheatsheet covering common options and practical examples:

### Basic Syntax
```bash
command | xargs [options] [command]
```

### Common Options
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

### Practical Examples

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

### Advanced Tips
- **Parallel Execution**: Use `--max-procs` for parallel processing:
  ```bash
  cat urls.txt | xargs --max-procs=4 wget
  ```
- **Nested Commands**: Combine `xargs` with `find`, `grep`, `awk`, etc., for flexible batch operations:
  ```bash
  find . -name "*.c" | xargs grep 'main'
  ```
  
This cheatsheet provides a quick reference to `xargs` for handling multiple arguments efficiently!

Here are some advanced `xargs` tips that help leverage its full power:

### 1. **Limit Arguments per Command Execution**
   - Using `-n` and `-L` together allows you to control the number of arguments and lines, creating more flexibility in splitting tasks.
   ```bash
   cat large_list.txt | xargs -n 5 -L 2 echo
   ```
   This command processes 5 arguments at a time, but reads 2 lines per command invocation.

### 2. **Execute Commands in Parallel with Output Ordering**
   - `xargs` with `--max-procs` runs commands in parallel but can have mixed output. Combine with `wait` or use output redirection to maintain order.
   ```bash
   cat urls.txt | xargs -n 1 -P 4 -I {} sh -c 'wget {} -O {}.html && echo "Downloaded {}"'
   ```
   Here, 4 downloads run in parallel with the downloaded filenames ordered correctly.

### 3. **Avoid Errors with Filenames Containing Spaces or Special Characters**
   - When working with files with spaces, use `-print0` in `find` and `-0` in `xargs` to handle special characters safely.
   ```bash
   find /path -name "*.txt" -print0 | xargs -0 grep 'pattern'
   ```

### 4. **Pipe Command Output to `xargs` as Input for Other Commands**
   - Chain `xargs` with multiple commands to perform compound operations.
   ```bash
   cat list.txt | xargs -I {} sh -c 'echo "Processing {}" && grep "keyword" {} && echo "Done with {}"'
   ```
   This executes `echo`, `grep`, and another `echo` for each item in `list.txt`.

### 5. **Control Command Failure with `xargs` and `||`**
   - Set up a fallback command to handle failed executions using `||`.
   ```bash
   cat files.txt | xargs -I {} sh -c 'cp {} /backup || echo "Failed to copy {}"'
   ```

### 6. **Batch Process Files in Chunks**
   - Sometimes you want to process files in batches (e.g., 10 at a time). Use `-n` for chunking and a loop for multi-batch processing.
   ```bash
   cat files.txt | xargs -n 10 | while read batch; do
       echo "Processing batch: $batch"
       # Replace with actual command
   done
   ```

### 7. **Run Interactive Commands Using `xargs`**
   - For commands that need interaction (like `rm -i`), combine `xargs` with `-p` for user confirmation:
   ```bash
   ls *.tmp | xargs -p rm
   ```

### 8. **Capture Standard Error and Redirect Outputs Separately**
   - To handle errors or redirect specific outputs, redirect `stderr` to a log while still displaying `stdout`.
   ```bash
   cat files.txt | xargs -I {} sh -c 'cp {} /backup 2>>error.log'
   ```

### 9. **Use `xargs` with `rsync` or `scp` for Remote Operations**
   - Sync or copy multiple files to a remote server using `xargs`.
   ```bash
   cat files.txt | xargs -I {} rsync -av {} user@remote:/destination/
   ```

### 10. **Process Command Substitution with `xargs`**
   - Use command substitution to pass `xargs` output to another command inline.
   ```bash
   echo $(cat files.txt | xargs echo)
   ```
   This reads the list of files from `files.txt`, concatenates them, and prints them in a single line.

These tips allow `xargs` to streamline batch processing tasks, especially in complex or parallel workflows.

### xargs: unmatched single quote;

ls | xargs -d "\n" -I {} ffmpeg -i {} -q:a 0 -map a {}.mp3