---
category: Notes
title: Grub Minimal Tutorial
tags: Linux
---

## Introduction to GNU Grub

GNU GRUB is a Multiboot boot loader. It was derived from GRUB, the GRand Unified Bootloader, which was originally designed and implemented by Erich Stefan Boleyn.

Briefly, a boot loader is the first software program that runs when a computer starts. It is responsible for loading and transferring control to the operating system kernel software (such as the Hurd or Linux). The kernel, in turn, initializes the rest of the operating system (e.g. GNU).

## Update Grub

```bash
# For Arch Linux:
sudo grub-mkconfig -0 /boot/grub/grub.cfg

# For Debian:
sudo update-grub
```

## Modify Grub configurations

Configuration file path: /etc/default/grub

## Personality and Themes

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