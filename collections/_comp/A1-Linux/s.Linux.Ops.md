---
layout: post
categories: Sheet
subclass: Linux
abbreviation: Linux Operating
title: Linux Operating - Quick Reference and Minimal Tutorial
toc_before_content: compact
todos: 
  - 补完
---

## System Identity & Basic State

### hostnamectl

Shows or changes the system hostname and related host metadata, making it a basic tool for identifying and labeling a machine.

### uname

Prints kernel and system identity information and is mainly used to confirm the running kernel and architecture.

### uptime

Shows how long the system has been running and provides a quick view of system load.

### whoami

Prints the effective current user and is useful when checking execution identity in shells or scripts.

### id

Displays the current user's UID, GID, and group memberships and is essential for permission troubleshooting.

### who

Shows currently logged-in users and active login sessions on the system.

### w

Displays logged-in users together with what they are doing and current load context.

### last

Shows recent login history from system records and is useful for auditing recent access.

### date

Prints or sets the system date and time and is fundamental for time-sensitive troubleshooting.

### timedatectl

Displays or changes system time, timezone, and NTP settings on systemd-based systems.

### arch

Prints the machine hardware name and is mainly used to confirm system architecture quickly.

## User & Group Administration

### useradd

Creates a new user account and is one of the standard tools for local account provisioning.

### usermod

Modifies an existing user account and is used to change groups, shells, home paths, and other account settings.

### userdel

Removes a user account and is used when deprovisioning local users.

### passwd

Sets or changes account passwords and is the standard password management tool.

### chage

Controls password aging and expiration policies for local user accounts.

### groupadd

Creates a new local group for access control and account organization.

### groupmod

Modifies an existing local group and is used less often than usermod but fills the same role for groups.

### groupdel

Deletes a local group that is no longer needed.

### gpasswd

Administers group membership and group passwords in local group management workflows.

### su

Switches to another user account within the current session and is often used for maintenance tasks.

### sudo

Runs commands with elevated privileges under controlled policy and is the main privilege escalation tool on most systems.

### visudo

Safely edits the sudoers configuration with syntax validation to prevent privilege policy mistakes.

## Permissions, Ownership & Access Control

### chmod

Changes file mode bits and is the standard command for basic Unix permission management.

### chown

Changes file owner and group ownership and is central to Linux filesystem administration.

### chgrp

Changes only the group ownership of files and directories.

### umask

Sets the default permission mask for newly created files and directories in a shell session.

### getfacl

Displays filesystem Access Control Lists and is used when permissions go beyond traditional mode bits.

### setfacl

Sets filesystem Access Control Lists for fine-grained permission control.

### lsattr

Shows extended filesystem attributes, especially on ext-family filesystems.

### chattr

Changes extended filesystem attributes such as immutable flags and append-only behavior.

### getenforce

Shows the current SELinux enforcement mode and is a quick policy-state check on SELinux systems.

### semanage

Manages SELinux policy settings such as contexts, ports, and booleans.

### restorecon

Restores SELinux file contexts according to policy and is commonly used after moving or relabeling files.

## Process, Job & Resource Control

### ps

Displays process information and is the standard starting point for process inspection.

### top

Provides a live view of processes and system resource usage.

### htop

Provides an interactive process viewer with easier navigation and filtering than top.

### pgrep

Finds process IDs by name or attributes and is useful in scripts and quick diagnostics.

### pkill

Sends signals to processes selected by name or attributes and is a convenient process control tool.

### kill

Sends a signal to a process and is most commonly used to terminate or control a running task.

### killall

Signals processes by name and is useful when handling multiple identical processes.

### pstree

Shows processes in a parent-child tree and helps explain process ancestry and supervision.

### nice

Starts a process with adjusted scheduling priority.

### renice

Changes the priority of an already running process.

### nohup

Runs a command so it can continue after the terminal session ends.

### jobs

Lists background and stopped jobs in the current shell session.

### bg

Resumes a stopped shell job in the background.

### fg

Brings a background or stopped job to the foreground.

### disown

Removes a job from the shell's job table so it is no longer tracked there.

### pidstat

Reports per-process CPU, memory, I/O, and scheduling statistics over time.

### pmap

Displays a process memory map and is useful in memory analysis.

## Service & Init Management

### systemctl

Manages systemd units such as services, timers, sockets, and mounts and is the main service control interface on modern Linux.

### service

Provides a compatibility wrapper for init scripts or service managers on some distributions.

### systemd-analyze

Analyzes boot performance and startup ordering on systemd systems.

### systemd-run

Starts transient units under systemd and is useful for controlled one-off execution.

### loginctl

Inspects and manages user logins and sessions on systemd-based systems.

### systemctl list-units

Lists active or loaded systemd units and is useful for discovering what is currently running.

### systemctl list-timers

Lists scheduled systemd timers and is the systemd-native equivalent of checking cron-style schedules.

### systemctl status

Shows the current state and recent logs of a unit and is usually the first command used for service troubleshooting.

### systemctl cat

Displays the effective unit file and overrides for a systemd unit.

### systemctl edit

Creates or edits systemd drop-in overrides without modifying vendor unit files directly.

## Logging & Diagnostics

### journalctl

Queries and displays logs from the systemd journal with filtering by unit, time, boot, and priority.

### journalctl -b

Shows logs from a specific boot and is essential for startup failure analysis.

### journalctl -u

Shows logs for a specific systemd unit and is one of the most common service debugging commands.

### dmesg

Displays kernel ring buffer messages and is critical for hardware, driver, and boot diagnostics.

### logger

Writes messages into the system logging pipeline and is useful in scripts and operational testing.

### logrotate

Manages log rotation, compression, and retention according to policy.

### tail

Displays the end of a file and is commonly used with logs for live monitoring.

### less

Provides interactive viewing for long log files and command output.

### grep

Filters log or text output using patterns and is a core diagnostic tool.

### lnav

Provides an interactive log navigator optimized for large and structured log files.

## Package Management & Software Maintenance

### apt

Manages packages on Debian-based systems and is the main high-level package tool there.

### dpkg

Installs, queries, and manages DEB packages at a lower level than apt.

### dnf

Manages packages on Fedora and modern RHEL-family systems.

### yum

Provides package management on older RHEL-family systems and is largely superseded by dnf.

### rpm

Installs, queries, and verifies RPM packages at a lower level than dnf or yum.

### pacman

Manages packages on Arch Linux and related distributions.

### zypper

Manages packages on openSUSE and SUSE Linux systems.

### apk

Manages packages on Alpine Linux systems.

### snap

Installs and manages sandboxed software packages in Snap format.

### flatpak

Installs and manages sandboxed desktop-oriented application packages.

### apt-cache

Queries package metadata and dependency information on Debian-based systems.

### dnf repoquery

Queries package and repository metadata in DNF-based environments.

## Filesystems, Mounts & Disk Usage

### df

Reports filesystem space usage and is used to check free and used capacity.

### du

Estimates disk usage for files and directories and is used to locate large paths.

### lsblk

Lists block devices in a tree view and is the standard tool for understanding storage layout.

### blkid

Shows filesystem and block-device identifiers such as UUID and type.

### mount

Attaches a filesystem to the directory tree so it becomes accessible.

### umount

Detaches a mounted filesystem from the directory tree.

### findmnt

Displays mounted filesystems in a structured way and is very useful in mount debugging.

### stat

Shows detailed file metadata such as size, permissions, timestamps, and inode information.

### file

Identifies file type based on content rather than extension and is useful for unknown files.

### tune2fs

Adjusts metadata and parameters of ext-family filesystems.

### xfs_info

Displays metadata and geometry information about an XFS filesystem.

### lsattr

Shows extended filesystem attributes and is relevant when ordinary permissions do not explain behavior.

## Partitioning, RAID, LVM & Encryption

### fdisk

Edits disk partition tables and is commonly used for basic partition management.

### parted

Manages disk partitions with support for modern partition table formats and large disks.

### sfdisk

Provides script-friendly partition table management for automation and recovery workflows.

### mkfs

Creates a filesystem on a block device or partition.

### fsck

Checks and repairs filesystem consistency and is a standard recovery tool.

### mkswap

Initializes a device or file for use as swap space.

### swapon

Enables a swap area for system use.

### swapoff

Disables an active swap area.

### losetup

Associates regular files with loop devices so they can be treated like block devices.

### mdadm

Manages Linux software RAID arrays.

### pvcreate

Initializes a physical volume for LVM.

### vgcreate

Creates an LVM volume group from physical volumes.

### lvcreate

Creates an LVM logical volume within a volume group.

### lvs

Displays logical volume information and is used for quick LVM inspection.

### vgs

Displays volume group information and is used for LVM capacity and structure checks.

### pvs

Displays physical volume information and completes the standard LVM inspection set.

### cryptsetup

Manages encrypted block devices, especially LUKS volumes used for protected storage.

## Networking Basics

### ip

Configures and inspects network interfaces, addresses, routes, and links and is the standard modern Linux networking tool.

### ping

Tests network reachability and latency using ICMP echo requests.

### traceroute

Shows the network path packets take to a destination.

### mtr

Combines traceroute and latency/loss measurement for ongoing path diagnostics.

### ss

Displays sockets and network connections and is the modern replacement for many netstat uses.

### nc

Creates raw TCP or UDP connections and is useful for quick connectivity testing.

### curl

Transfers data with URLs and is widely used for HTTP requests, APIs, and network diagnostics.

### wget

Downloads files non-interactively and is commonly used in scripts and server environments.

### dig

Queries DNS servers directly and is the standard DNS diagnostic tool.

### host

Performs simple DNS lookups and is useful for quick resolution checks.

### nslookup

Performs DNS queries and is still widely recognized even though dig is usually preferred.

### resolvectl

Inspects DNS resolution state and controls systemd-resolved behavior.

### nmcli

Controls NetworkManager from the command line on systems that use it.

### hostnamectl

Also helps confirm the network-visible hostname and system identity in managed environments.

## Networking Advanced & Packet Inspection

### tcpdump

Captures and prints network packets and is one of the main Linux packet analysis tools.

### tshark

Captures and analyzes packets from the command line as the terminal counterpart to Wireshark.

### nmap

Scans hosts and ports to discover network services and exposure.

### iperf3

Measures network throughput between two endpoints.

### ethtool

Queries and configures network interface driver and link settings.

### socat

Creates flexible bidirectional data channels between sockets, files, terminals, and more.

### openssl s_client

Opens a raw TLS client connection and is useful for certificate and handshake debugging.

## Firewall, Kernel Policy & Host Security

### nft

Manages nftables rules and is the modern Linux packet filtering framework.

### iptables

Manages legacy netfilter firewall rules and remains common on older systems.

### ufw

Provides a simplified host firewall interface, especially on Ubuntu-based systems.

### firewall-cmd

Manages firewalld zones and rules and is common on Fedora and RHEL-family systems.

### ipset

Manages sets of IP addresses and networks for efficient firewall matching.

### tc

Controls traffic shaping, queuing, and scheduling on Linux network interfaces.

### sysctl

Reads and writes kernel runtime parameters exposed through procfs.

### fail2ban-client

Controls Fail2ban and is used to inspect or manage automatic ban policies.

### auditctl

Controls Linux audit subsystem rules for security monitoring and compliance.

### ausearch

Searches audit logs and is used for security investigation and traceability.

## Scheduled Tasks & Local Automation

### crontab

Edits or lists per-user cron jobs for recurring scheduled execution.

### cron

Refers to the cron daemon that runs recurring scheduled jobs in the background.

### at

Schedules a command to run once at a specified time.

### anacron

Runs scheduled jobs that were missed while the system was powered off.

### watch

Runs a command repeatedly and refreshes the output for monitoring tasks.

### sleep

Pauses execution for a specified duration and is commonly used in shell automation.

### timeout

Runs a command with a time limit and terminates it if the limit is exceeded.

### flock

Applies file locks to coordinate access between concurrent scripts or jobs.

### script

Records a terminal session and is useful for audits, demonstrations, and reproducibility.

## Boot, Firmware & Early Startup

### GNU Grub

GNU GRUB is a Multiboot boot loader. It was derived from GRUB, the GRand Unified Bootloader, which was originally designed and implemented by Erich Stefan Boleyn.

Briefly, a boot loader is the first software program that runs when a computer starts. It is responsible for loading and transferring control to the operating system kernel software (such as the Hurd or Linux). The kernel, in turn, initializes the rest of the operating system (e.g. GNU).

## Update Grub

```bash
# For Arch Linux:
sudo grub-mkconfig -0 /boot/grub/grub.cfg

# For Debian:
sudo update-grub
```
Modify Grub configurations: Configuration file path: /etc/default/grub

Personality and Themes

**CHANGE BACKGROUND**

1.Move the background image you have chosen into /usr/share/gurb.

2.Edit /etc/default/grub:

```bash
GRUB_BACKGROUND="/usr/share/grub/[BACKGROUND_IMAGE].*"
```

3.Update grub configuration with terminal:

```bash
# For Arch Linux:
sudo grub-mkconfig -0 /boot/grub/grub.cfg

# For Debian:
sudo update-grub
```

**APPLY THEMES**

1.Downlad grub themes from: https://www.gnome-look.org/.

2.Extract and move the theme folder you have chosen into /usr/share/gurb.

3.Edit /etc/default/grub:

```bash
GRUB_THEME="/usr/share/grub/themes/[THEME_FOLDER]/theme.txt"
```

4.Update grub configuration with terminal:

```bash
# For Arch Linux:
sudo grub-mkconfig -0 /boot/grub/grub.cfg

# For Debian:
sudo update-grub
```

### grub-install

Installs the GRUB bootloader onto a disk or device and is commonly used during setup or boot repair.

### grub-mkconfig

Generates a GRUB configuration file from system settings and detected boot entries.

### update-grub

Updates GRUB configuration through a distribution-specific wrapper, commonly on Debian-based systems.

### grub-editenv

Reads and modifies the GRUB environment block such as saved default entries.

### efibootmgr

Manages UEFI boot entries from Linux and is essential for controlling boot order on modern systems.

### bootctl

Manages systemd-boot installation and boot entries on UEFI systems.

### kernel-install

Installs kernel images and related boot artifacts according to the Boot Loader Specification.

### dracut

Builds initramfs images and is commonly used on Fedora, RHEL, and related systems.

### update-initramfs

Creates or updates initramfs images on Debian and Ubuntu systems.

### mkinitcpio

Generates initramfs images on Arch Linux and related systems.

### lsinitramfs

Lists the contents of an initramfs image for inspection and debugging.

### modprobe

Loads or unloads kernel modules and resolves dependencies automatically.

### lsmod

Lists currently loaded kernel modules and is useful during driver and boot troubleshooting.

### modinfo

Displays metadata about a kernel module such as parameters and aliases.

### depmod

Generates module dependency metadata used during module loading.

### journalctl -k

Shows kernel messages from the journal and complements dmesg during boot diagnostics.

### systemctl rescue

Enters rescue mode with minimal services for maintenance and repair.

### systemctl emergency

Enters emergency mode with the smallest possible userspace for critical recovery.

## Remote Access, Copy & Session Management

### ssh

Provides secure remote shell access and is a fundamental Linux administration tool.

### scp

Copies files over SSH and is used for simple secure file transfer.

### sftp

Provides interactive file transfer over SSH.

### rsync

Synchronizes files efficiently by transferring only differences and is widely used for backup and remote administration.

### ssh-keygen

Generates and manages SSH keys for authentication.

### ssh-copy-id

Installs a public SSH key on a remote account for passwordless login setup.

### tmux

Provides terminal multiplexing so long-running administration sessions survive disconnects.

### screen

Provides terminal multiplexing and detachable sessions on systems where tmux is unavailable.

## Hardware, Devices & Low-Level Inspection

### lscpu

Displays CPU architecture and topology information.

### lsmem

Displays memory block information and system memory layout details.

### free

Shows memory and swap usage in a compact format.

### vmstat

Reports process, memory, CPU, and I/O activity for quick system health checks.

### iostat

Shows CPU and block device I/O statistics and is useful for storage performance diagnosis.

### iotop

Shows disk I/O usage by process and helps identify I/O-heavy workloads.

### lspci

Lists PCI devices and is essential for hardware inventory and driver troubleshooting.

### lsusb

Lists USB devices and is useful for external hardware diagnostics.

### udevadm

Inspects and controls udev device handling and is important for hardware-event debugging.

### smartctl

Queries disk SMART health data and is commonly used for storage health checks.

### sensors

Displays hardware sensor readings such as temperatures and voltages on supported systems.

## System Call, Crash & Deep Debugging

### strace

Traces system calls and signals and is one of the most useful tools for diagnosing failing programs.

### ltrace

Traces library calls and complements strace in user-space debugging.

### gdb

Provides source-level and runtime debugging for native programs.

### coredumpctl

Lists and accesses core dumps managed by systemd for post-mortem debugging.

### valgrind

Analyzes programs for memory errors and selected performance issues.

### perf

Provides Linux performance profiling and tracing using kernel performance counters.

### bpftrace

Runs high-level eBPF tracing programs for dynamic observability of kernel and user-space behavior.

### bpftool

Inspects and manages eBPF programs, maps, and related kernel objects.

## Backup, Recovery & Rescue

### tar

Creates or extracts archive files and is the standard Unix archiving tool.

### gzip

Compresses files using the gzip format and is commonly paired with tar.

### xz

Provides high-ratio compression often used for archives and system images.

### zstd

Provides fast modern compression with a strong balance of speed and compression ratio.

### zip

Creates ZIP archives for cross-platform file exchange.

### unzip

Extracts ZIP archives on Linux systems.

### dd

Performs low-level block copying and is used for disk images, cloning, and rescue operations.

### rsync

Synchronizes data efficiently and is one of the most common backup and migration tools.

### borg

Provides deduplicating backup with strong support for efficient repository-based backups.

### restic

Provides encrypted, deduplicated backups with support for multiple storage backends.

### rclone

Synchronizes files with cloud and remote storage services and is useful in backup workflows.

### testdisk

Recovers lost partitions and repairs partition tables in recovery scenarios.

### photorec

Recovers files by signature scanning and is used when filesystem metadata is damaged.

## Configuration Files & System Locations

### /etc

Stores host-specific system configuration and is the primary configuration tree on Linux systems.

### /var/log

Stores log files and is a standard location for service and system logs outside the journal.

### /var/lib

Stores persistent application and service state data managed by the system.

### /run

Stores runtime state for the current boot and usually resides on a temporary filesystem.

### /boot

Stores kernel, initramfs, and bootloader-related files needed for system startup.

### /home

Stores user home directories and personal data.

### /root

Stores the home directory of the root user.

### /proc

Exposes kernel and process information through a virtual filesystem interface.

### /sys

Exposes kernel device and driver state through sysfs.

### /dev

Provides device nodes that represent hardware and virtual devices.

### /etc/fstab

Defines static filesystem mount configuration used during boot and manual mount workflows.

### /etc/ssh/sshd_config

Defines OpenSSH server behavior and is central to remote access administration.

### /etc/sudoers

Defines sudo privilege policy and must be edited carefully, usually through visudo.

### /etc/systemd/system

Stores local systemd unit files and overrides created by the administrator.

### /etc/passwd

Stores basic local user account records.

### /etc/shadow

Stores password hashes and password-aging information for local accounts.

### /etc/group

Stores local group definitions and group memberships.

## 常见任务视角下的最小命令集合

### Check system identity

Use tools such as hostnamectl, uname, uptime, whoami, id, and timedatectl to confirm what machine you are on and what state it is in.

### Check a failing service

Use systemctl status, journalctl -u, journalctl -b, and systemd-analyze to inspect service state and recent logs.

### Check disk and mounts

Use lsblk, blkid, df, du, mount, umount, and findmnt to understand storage layout and space usage.

### Check users and permissions

Use id, passwd, usermod, groups, chmod, chown, getfacl, and setfacl to inspect access control.

### Check network reachability

Use ip, ping, ss, curl, dig, nc, and traceroute to validate addressing, connectivity, and service exposure.

### Check boot problems

Use dmesg, journalctl -b, journalctl -k, efibootmgr, grub-mkconfig, update-initramfs, lsmod, and fsck to trace startup failures.

### Check hardware or performance issues

Use lscpu, free, vmstat, iostat, iotop, smartctl, sensors, and perf to locate bottlenecks or failing devices.

### Prepare recovery work

Use rsync, tar, dd, testdisk, cryptsetup, mdadm, and lvm-related tools to preserve data and restore system access.

