---
category: Notes
title: MIT Null, The Missing Semester of Your CS Education
tags: Basics
---


## 1. Shell and Linux Operating

Sources: 
  - MIT 6.NULL
  - Bar-Ilan_Linux Intro and Toolkits for Engineers_2020-24_GPT

> A Unix shell is both a **command interpreter** and **a programming language**.As a command interpreter, the shell provides the user interface to the rich set of GNU **utilities**. The programming language features allow these utilities to **be combined**.

### Commands

```bash
$ date
WWW MMM DD HH:MM:SS AM CST YYYY
$ echo bonjour
bonjour
$ echo "au revoir"
au revoir
$ echo À\ bientôt
À bientôt
```

Shell could dertermine where the programs are located through `Environment variable`. `Environment variable` are things that are set whenever you start your shell. 

The Environment variable **"$PATH"** records **where** the shell will search for programs, which is a list separated by colons (:)".

```bash
$ echo $PATH
/home/[userhame]r/.local/share/gem/ruby/3.0.0/bin:/home/[userhame]/.local/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/opt/cuda/bin:/opt/cuda/nsight_compute:/opt/cuda/nsight_systems/bin:/var/lib/flatpak/exports/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl:/var/lib/snapd/snap/bin
```

To see which program matches the command, run `which`:

```bash
$ which echo
/usr/bin/echo
```

### Paths

Paths are a way to name the location of a file on the computer. 

On Linux and Mac OS, paths are separated by forward slashes (/). Everything lives under the root namespace. e.g. /usr/bin/echo

On windows, separaters are backslashes (\). Every disk partition has a root namespace, so paths start with "C:\". e.g. C:\Windows\System32\cmd.exe

`Absolute Path` are paths that fully determine the location of a file. e.g. /usr/bin/echo

`Relative Path` refers to a location that is relative to a current directory. 
  - Run `pwd` (print working directory) to see where currently the shell is.
  - Run `cd` (change directory) to travel.
  - Relative paths make use of two special symbols, a dot (.) and a double dot (..), which translate into the current directory and the parent directory. Double dots are used for moving up in the hierarchy. 

```bash
$ pwd
/home/[username]/Pictures

$ cd /home # move to absolute path /home
$ cd ./home # move to "home" under current directory
$ cd .. # move to parent directory
$ cd ~ # move to home directory
$ cd - # move to directory previously in
```

### Arguments for Commands

Most programs take arguments like flags and options. The most useful one maybe `--help`.

`ls` (list) shows the contents of a directory, much like viewing a folder's contents in a file manager on a graphical interface.

```bash
$ ls --help
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.

Mandatory arguments to long options are mandatory for short options too.
  -a, --all                  do not ignore entries starting with .
  -A, --almost-all           do not list implied . and ..
      --author               with -l, print the author of each file
  -b, --escape               print C-style escapes for nongraphic characters
      --block-size=SIZE      with -l, scale sizes by SIZE when printing them;
                             e.g., '--block-size=M'; see SIZE format below
...
```

`ls -l` shows things as a list.

```bash
# sample results
-rw-r--r--  1 user group  4096 Sep 26 14:32 example.txt
drwxr-xr-x  2 john users  4096 Sep 26 14:32 myfolder
```

1. **File type and permissions (`-rw-r--r--`)**:
   - The first character indicates the file type:
     - `-` for a regular file
     - `d` for a directory
     - `l` for a symbolic link
     - `b` for a block device
     - `c` for a character device
   - The next nine characters show the file's permissions for three groups of users: 
     - The **owner** (first three characters),
     - The **group** (next three characters),
     - **Others** (last three characters).
     - `rwx` means read, write, execute separately. `-` means not permitted.

> Permissions for directory is different. `r`: list contents `w`: create, rename, or delete files `x`: enter and search the directory.

1. **Number of links (`1`)**:
   This represents the number of hard links to the file or directory. For directories, this count also includes subdirectories.

2. **Owner (`user`)**:
   This is the username of the file's owner.

3. **Group (`group`)**:
   This is the name of the group that owns the file.

4. **File size (`4096`)**:
   This shows the size of the file in bytes. If it's a directory, the size represents the space taken by its structure (not its contents).

5. **Modification date and time (`Sep 26 14:32`)**:
   This is the last modification date and time of the file.

6. **Filename (`example.txt`)**:
   The name of the file or directory.

### Common Shell Commands

| **Command** | **Description**                                         | **Example**                                       |
| ----------- | ------------------------------------------------------- | ------------------------------------------------- |
| `ls`        | **List** directory contents.                            | `ls -l`                                           |
| `cd`        | **Change** the current **directory**.                   | `cd /home/user/Documents`                         |
| `pwd`       | **Print** the current **working directory**.            | `pwd`                                             |
| `mkdir`     | **Make** a new **directory**.                           | `mkdir new_folder`                                |
| `rmdir`     | **Remove** an empty **directory**.                      | `rmdir old_folder`                                |
| `rm`        | **Remove** files or directories.                        | `rm file.txt`                                     |
| `cp`        | **Copy** files or directories.                          | `cp source.txt destination.txt`                   |
| `mv`        | **Move** or rename files or directories.                | `mv old_name.txt new_name.txt`                    |
| `touch`     | Create an empty file or update the timestamp of a file. | `touch newfile.txt`                               |
| `cat`       | **Concatenate** and display file contents.              | `cat file.txt`                                    |
| `echo`      | Display a line of text or a variable value.             | `echo "Hello, World!"`                            |
| `man`       | Display the **manual** page for a command.              | `man ls`                                          |
| `chmod`     | **Change** file permissions.                            | `chmod 755 script.sh`                             |
| `chown`     | **Change** file **owner** and group.                    | `chown user:group file.txt`                       |
| `ps`        | Display currently running **processes**.                | `ps aux`                                          |
| `top`       | Display real-time information about running processes.  | `top`                                             |
| `kill`      | Terminate a process by its PID.                         | `kill 1234`                                       |
| `grep`      | Search for a specific pattern in files.                 | `grep "text" file.txt`                            |
| `find`      | Search for files in a directory hierarchy.              | `find /path/to/search -name "*.txt"`              |
| `df`        | Display **disk** space usage for **file** systems.      | `df -h`                                           |
| `du`        | Estimate file and directory space usage.                | `du -sh /path/to/directory`                       |
| `history`   | Show command **history**.                               | `history`                                         |
| `clear`     | **Clear** the terminal screen.                          | `clear`                                           |
| `ssh`       | Connect to a remote server via SSH.                     | `ssh user@hostname`                               |
| `scp`       | **Securely copy** files between hosts over SSH.         | `scp file.txt user@hostname:/path/to/destination` |
| `wget`      | Download files from the web.                            | `wget http://example.com/file.zip`                |
| `curl`      | Transfer data from or to a server.                      | `curl -O http://example.com/file.zip`             |
| `tar`       | Archive files using tar (create, extract).              | `tar -cvf archive.tar folder/`                    |
| `zip`       | Compress files into a zip archive.                      | `zip archive.zip file1.txt file2.txt`             |
| `unzip`     | Extract files from a zip archive.                       | `unzip archive.zip`                               |

### Shortcuts for Shell

| **Action**                                     | **Shortcut**       |
| ---------------------------------------------- | ------------------ |
| Move to the beginning of the line              | `Ctrl + A`         |
| Move to the end of the line                    | `Ctrl + E`         |
| Move forward one character                     | `Ctrl + F`         |
| Move backward one character                    | `Ctrl + B`         |
| Move forward one word                          | `Alt + F`          |
| Move backward one word                         | `Alt + B`          |
| Cut everything before the cursor               | `Ctrl + U`         |
| Cut everything after the cursor                | `Ctrl + K`         |
| Cut the word before the cursor                 | `Ctrl + W`         |
| Paste the last cut text                        | `Ctrl + Y`         |
| Log out of the current shell                   | `Ctrl + D`         |
| Search through command history                 | `Ctrl + R`         |
| Previous command in history                    | `Up Arrow`         |
| Next command in history                        | `Down Arrow`       |
| Exit search mode after using `Ctrl + R`        | `Ctrl + G`         |
| Kill the current command                       | `Ctrl + C`         |
| Suspend the current command                    | `Ctrl + Z`         |
| Bring the last suspended process to foreground | `fg`               |
| Resume a suspended process in the background   | `bg`               |
| Clear the screen                               | `Ctrl + L`         |
| Open a new tab (in some terminal emulators)    | `Ctrl + Shift + T` |
| Open a new window (in some terminal emulators) | `Ctrl + Shift + N` |
| Auto-complete files/directories/commands       | `Tab`              |

TODO:
一、常用快捷键小技巧
以下快捷键，都是一些常用的，记住这些命令，你的工作效率就会大大提升。

ctrl + a ：光标跳到行首。
ctrl + e ：光标跳到行尾。
ctrl + d ：后删一个字符；退出会话，类似于 exit 。
ctrl + k ：剪切光标后到行尾的所有内容（可以当作清除用）
ctrl + u ：剪切光标前到行首的所有内容（可以当作清除用）
ctrl + w ：剪切光标前的单个单词，以空格分隔（可以当作清除用）
ctrl + y ：粘贴剪切的内容。
ctrl + r ：反向搜索历史命令，实现快速匹配。（特别推荐，避免了低效的 ↑↓ 键切换历史命令。）
ctrl + s ：暂时冻结当前 shell 的输入（原来还有这个命令，之前触发过这个操作，我还以为是 shell 卡住了。。。）。
ctrl + q ：解冻当前 shell 的输入。
ctrl + ←、→ ：光标左右移动一个单词。
ctrl + l ：清屏。
ctrl + shift + r ：xshell 快速连接会话。
alt + r ：使 xshell 会话透明化（这样好方便你抄写命令）
二、快速搜索历史命令
老实说，在不知道这个历史命令之前，我都是 ↑↓ 键找或者是 history | grep 过滤的。


现在知道 ctrl + r 命令了，用起来真的好爽，貌似同事一直也是用的这个命令，现在终于是让我找到了。。

简单说一下用法：

ctrl + r：反向搜索历史命令。

1）执行 ctrl + r 后，输入你想要的历史命令的关键词，关键词越独特，匹配的就越准确。

2）如果匹配的命令不完全符合你的预期，可以继续执行 ctrl + r 命令来切换匹配到的下一个命令。

3）敲一下回车，就会直接执行该命令；敲一下左右键，这条命令就筛选出来了，可以修改该命令后执行。

真的比 ↑↓ 键找或者是 history | grep 好用省时很多了。

### Streams and 

### Compare CLI and GUI

Comparison of **Command-Line Interface (CLI)** and **Graphical User Interface (GUI)**:

| **Aspect**                  | **CLI (Command-Line Interface)**                                         | **GUI (Graphical User Interface)**                                     |
| --------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **Learning Curve**          | Steep learning curve, requires knowledge of commands and syntax.         | Gentle learning curve, easy for beginners due to visuals.              |
| **Speed**                   | Faster for experienced users due to direct command execution.            | Generally slower as it requires navigating through menus.              |
| **Efficiency**              | Highly efficient for repetitive tasks through scripting and automation.  | Less efficient for repetitive tasks, requires manual clicking.         |
| **Resource Usage**          | Minimal resource consumption (low memory, CPU).                          | Higher resource usage due to graphical elements and processes.         |
| **Control and Flexibility** | Offers fine-grained control over the system, ideal for advanced tasks.   | Limited control for advanced tasks, often abstracts complexities.      |
| **Multitasking**            | Allows quick multitasking with multiple commands/scripts.                | Multitasking is possible but slower, often window-based.               |
| **Customization**           | Highly customizable, especially through scripting and environment setup. | Customization limited to themes, icons, and basic layouts.             |
| **Error Feedback**          | Clear and precise error messages, but can be difficult to interpret.     | Errors are often more user-friendly, but less detailed.                |
| **Remote Access**           | Ideal for remote access via SSH or terminal tools.                       | Less suitable for remote access, usually requires additional software. |
| **User Accessibility**      | Difficult for non-technical users due to text-based nature.              | User-friendly, especially for non-technical or casual users.           |
| **Automation**              | Excellent for automating complex tasks and workflows.                    | Limited automation features, mostly manual operations.                 |
| **Search and Navigation**   | Requires specific commands to search and navigate directories.           | Easier to navigate with file explorers and search boxes.               |
| **System Requirements**     | Can run on very low-end systems or minimal environments.                 | Requires higher-end hardware for smooth operation.                     |
| **Documentation**           | Often requires external documentation or knowledge to use effectively.   | Visual hints and tooltips available for most actions.                  |




> - follow along 跟随，听从：指在某人或某事物的引导下进行行动或采取行动；理解，明白：指理解或明白某人的思路、逻辑或解释。
> - dictate [dɪkˈteɪt] v.决定；口述；支配；强行规定 n.规定；命令
> - concatenate [kənˈkætəneɪt] adj.连锁状的 v.使(成串地)连结[衔接]起来

## Vim

## Data Wrangling

## Command-line Environment

## Git and Version Control

## Debugging and Profiling

## MetaProgramming

## Security and Crytography

## Potpourri

> - potpourri [ˌpəʊpʊˈriː] n.百花香；混合物；杂曲；大杂烩

## ChatGPT and Prompt Engineering

## Docker and 

## Obsidian and Note Keeping