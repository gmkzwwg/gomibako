---
title: Linux - Check Hardware infomation and Specification
categories: Notes
subclass: Linux
---

## 操作系统、内核

### uname

```bash
$ uname -n
Linux mjruser 6.1.31-2-MANJARO #1 SMP PREEMPT_DYNAMIC Sun Jun  4 12:31:46 UTC 2023 x86_64 GNU/Linux
```
[KERNAL_NAME] Linux，对应 uname -s

[NETWORK_NODE_HOSTNAME] mjruser，对应 uname -n

[KERNEL_RELEASE] 6.1.31-2-MANJARO，对应 uname -r

[KERNEL_VERSION] #1 SMP PREEMPT_DYNAMIC Sun Jun  4 12:31:46 UTC 2023，对应 uname -v

[MACHINE_HARDWARE_NAME] x86_64，对应 uname -m

[OPERATING_SYSTEM] GNU/Linux，对应 uname -o

Processor 和 Hardware Platform 为 Unknown，因此没有显示。

### cat /etc/os-release

```bash
$ cat /etc/os-release
NAME="Manjaro Linux"
PRETTY_NAME="Manjaro Linux"
ID=manjaro
ID_LIKE=arch
BUILD_ID=rolling
ANSI_COLOR="32;1;24;144;200"
HOME_URL="https://manjaro.org/"
DOCUMENTATION_URL="https://wiki.manjaro.org/"
SUPPORT_URL="https://forum.manjaro.org/"
BUG_REPORT_URL="https://docs.manjaro.org/reporting-bugs/"
PRIVACY_POLICY_URL="https://manjaro.org/privacy-policy/"
LOGO=manjarolinux
```
不同系统路径可能不同。如 RedHat 系统为 /etc/redhat-release。


###  lsb_release -a

```bash
$  lsb_release -a
LSB Version:	n/a
Distributor ID:	ManjaroLinux
Description:	Manjaro Linux
Release:	23.0.0
Codename:	UltimaThule
```

### hostnamectl

```bash
$ hostnamectl
 Static hostname: mjruser
       Icon name: computer-desktop
         Chassis: desktop 🖥️
      Machine ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
         Boot ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Operating System: Manjaro Linux
          Kernel: Linux 6.1.31-2-MANJARO
    Architecture: x86-64
 Hardware Vendor: ASUS
  Hardware Model: ProArt X670E-CREATOR WIFI
Firmware Version: 1415
   Firmware Date: Tue 2023-05-16
```

### cat /proc/version

```bash
$ cat /proc/version
Linux version 6.1.31-2-MANJARO (builduser@fv-az462-57) (gcc (GCC) 13.1.1 20230429, GNU ld (GNU Binutils) 2.40.0) #1 SMP PREEMPT_DYNAMIC Sun Jun  4 12:31:46 UTC 2023
```

### mhwd-kernel -li 

> 仅 Manjaro 可用。

```bash
$ mhwd-kernel -li
Currently running: 6.1.31-2-MANJARO (linux61)
The following kernels are installed in your system:
   * linux61
```

## 用户名

### cat /etc/passwd | grep home

```bash
$ cat /etc/passwd | grep home
mjruser:x:1000:1000:mjruser:/home/mjruser:/bin/bash
```

### w

```bash
$ w
07:04:30 up 2 days,  7:51,  1 user,  load average: 1.47, 1.57, 1.12
USER     TTY        LOGIN@   IDLE   JCPU   PCPU WHAT
mjruser  tty7      Mon23   27:17   2:36   3.13s i3
```

### who

```bash
$ who
mjruser tty7         2023-06-26 23:13 (:0)
```

### whoami

```bash
$ who
mjruser
```

### id -un

```bash
$ id -un
mjruser
```

### last

```bash
$ last
mjruser tty7         :0               Mon Jun 26 23:13   still logged in
reboot   system boot  6.1.31-2-MANJARO Mon Jun 26 23:13   still running
reboot   system boot  6.1.31-2-MANJARO Mon Jun 26 08:54 - 08:54  (00:00)

------------

```

## 网络

### ip address

### ifconfig

## 主板 

### dmidecode -t baseboard

```bash
$ sudo dmidecode -t baseboard
# dmidecode 3.5
Getting SMBIOS data from sysfs.
SMBIOS 3.5.0 present.

Handle 0x0002, DMI type 2, 15 bytes
Base Board Information
	Manufacturer: ASUSTeK COMPUTER INC.
	Product Name: ProArt X670E-CREATOR WIFI
	Version: Rev 1.xx
	Serial Number: 221112128900345
	Asset Tag: Default string
	Features:
		Board is a hosting board
		Board is replaceable
	Location In Chassis: Default string
	Chassis Handle: 0x0003
	Type: Motherboard
	Contained Object Handles: 0

Handle 0x0004, DMI type 10, 6 bytes
On Board Device Information
	Type: Video
	Status: Enabled
	Description:    To Be Filled By O.E.M.

Handle 0x0049, DMI type 41, 11 bytes
Onboard Device
	Reference Designation: Realtek ALC1220 Audio
	Type: Sound
	Status: Enabled
	Type Instance: 1
	Bus Address: 0000:6c:00.6

Handle 0x004A, DMI type 41, 11 bytes
Onboard Device
	Reference Designation: Intel I225 2.5G LAN
	Type: Ethernet
	Status: Enabled
	Type Instance: 1
	Bus Address: 0000:09:00.0

Handle 0x004B, DMI type 41, 11 bytes
Onboard Device
	Reference Designation: AQC113 10G LAN
	Type: Ethernet
	Status: Enabled
	Type Instance: 2
	Bus Address: 0000:0a:00.0

Handle 0x004C, DMI type 41, 11 bytes
Onboard Device
	Reference Designation: PROM21 SATA AHCI Controller
	Type: SATA Controller
	Status: Enabled
	Type Instance: 1
	Bus Address: 0000:6a:00.0
```

## CPU

## 内存

### free -ht

```bash
$ free -ht
               total        used        free      shared  buff/cache   available
Mem:            61Gi        14Gi       7.8Gi       615Mi        39Gi        46Gi
Swap:             0B          0B          0B
Total:          61Gi        14Gi       7.8Gi
```

## GPU 

## 综合

### Neofetch

```bash
$ neofetch
██████████████████  ████████   xxxxxxxx@xxxx
██████████████████  ████████   --------------
██████████████████  ████████   OS: Manjaro Linux x86_64
██████████████████  ████████   Kernel: 6.1.44-1-MANJARO
████████            ████████   Uptime: 1 hour, 43 mins
████████  ████████  ████████   Packages: 1750 (pacman), 6 (flatpak)
████████  ████████  ████████   Shell: bash 5.1.16
████████  ████████  ████████   Resolution: 3840x2160
████████  ████████  ████████   WM: i3
████████  ████████  ████████   Theme: Matcha-dark-azul [GTK3]
████████  ████████  ████████   Icons: elementary [GTK3]
████████  ████████  ████████   Terminal: alacritty
████████  ████████  ████████   Terminal Font: monospace
████████  ████████  ████████   CPU: AMD Ryzen 9 7950X (32) @ 4.500GHz
                               GPU: NVIDIA GeForce RTX 4090
                               GPU: AMD ATI 6d:00.0 Raphael
                               Memory: 1849MiB / 63426MiB
```

## 实时监控

### s-tui

### nmon

### dstat