---
title: Manjaro + i3wm Workstation Setup
categories: Notes
subclass: Operating Tools
---

Last reviewed: May 2026

This guide documents how to build a keyboard-driven Linux workstation with Manjaro and i3wm. The setup starts from a standard Manjaro Xfce or GNOME installation, then installs and configures i3wm manually.

Manjaro provides official Xfce, GNOME, and KDE Plasma images, while the i3 image is listed as a community image. The i3 image is useful for experienced users, but this guide deliberately avoids using it. The goal is to keep a complete graphical desktop environment as a fallback, then gradually build an i3-based workflow on top of it. Manjaro’s own download page describes i3 as a tiling X11 window manager rather than a complete desktop environment.

## 1. Why This Setup

A full desktop environment such as Xfce or GNOME gives a beginner-friendly base system: display manager, network tools, file manager, fonts, input methods, and graphical settings are already available. i3wm gives a different layer of control: predictable window placement, fast workspace switching, keyboard-first navigation, and minimal visual noise.

This combination is useful for programming, writing, research, terminal work, note-taking, and multi-document reading. Instead of treating the desktop as a collection of floating windows, i3wm turns the screen into a stable layout system.

**Tip:** Keep Xfce or GNOME installed even after switching to i3wm. It provides a reliable fallback session when display scaling, input methods, themes, or graphics drivers need graphical troubleshooting.

## 2. Choose a Base Image

For most users, the recommended base image is Manjaro Xfce. It is lightweight, traditional, and closer to the X11 workflow used by i3wm.

Manjaro GNOME is also acceptable. It provides a polished default experience, but GNOME is more tightly integrated with its own shell and Wayland-oriented workflow. Since i3wm is an X11 window manager, Xfce usually creates less friction.

Recommended paths:

```text
Manjaro Xfce  → install i3wm → build keyboard-driven workstation
Manjaro GNOME → install i3wm → keep GNOME as fallback session
````

Avoid mixing too many complete desktop environments at once. Manjaro’s desktop environment documentation notes that multiple desktop environments may share settings packages, duplicate applications, or conflict in theming and configuration. ([Manjaro][1])

## 3. Download Manjaro and Create a Bootable USB Drive

Download the Manjaro Xfce or GNOME image from the official Manjaro website. Use a reliable USB flashing tool such as Rufus, balenaEtcher, Ventoy, or `dd`.

On Windows, Rufus is simple and reliable. On Linux, `dd` works well but must be used carefully.

```bash
lsblk
sudo dd if=manjaro.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

Replace `/dev/sdX` with the USB device, not a partition such as `/dev/sdX1`.

**Warning:** `dd` overwrites the target device directly. Check the device name with `lsblk` before running the command.

## 4. Install Manjaro

Modern machines should normally use `UEFI + GPT`. Legacy `BIOS + MBR` is only recommended for old hardware or when the firmware does not support UEFI properly.

A simple manual partitioning scheme is enough for most workstations:

```text
/boot/efi   FAT32   512 MiB     EFI System Partition
/           ext4    60–100 GiB  root filesystem
/home       ext4    remaining   user data
swap        swap    optional    useful for hibernation or low RAM
```

For systems with less than 8 GB RAM, a swap partition or swap file is still useful. For systems that use hibernation, swap should be at least as large as the memory size.

During installation, select the standard graphical installer. After installation, reboot and remove the USB drive.

## 5. First System Update

After the first login, update the package database and the system:

```bash
sudo pacman -Syu
```

Avoid using `sudo pacman -Syyu` as a routine command. Manjaro’s `pacman-mirrors` documentation uses `-Syu` by default and leaves the extra database refresh for cases where it is strictly necessary. ([Manjaro][2])

**Tip:** On a rolling-release distribution, update the whole system together. Partial upgrades are a common source of breakage.

## 6. Configure Manjaro Mirrors

Manjaro uses `pacman-mirrors` to generate the mirror list. To use fast up-to-date mirrors automatically:

```bash
sudo pacman-mirrors --fasttrack
sudo pacman -Syu
```

To select mirrors interactively:

```bash
sudo pacman-mirrors --interactive --default
sudo pacman -Syu
```

To limit mirrors by country:

```bash
sudo pacman-mirrors --country China
sudo pacman -Syu
```

**Note:** Do not restrict mirrors too aggressively. If a selected mirror becomes stale or unavailable, package synchronization may fail. Manjaro’s documentation explicitly notes that custom mirror pools require maintenance when official mirrors change. ([Manjaro][2])

### Optional: archlinuxcn Repository

The `archlinuxcn` repository can be useful for Chinese users, but it is an unofficial repository and should be treated with caution. Do not use `SigLevel = Never` as a permanent configuration.

A safer pattern is:

```ini
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

Then install the keyring:

```bash
sudo pacman -Syu
sudo pacman -S archlinuxcn-keyring
sudo pacman -Syu
```

**Warning:** Manjaro is not identical to Arch Linux. Mixing repositories should be done conservatively, especially on the stable branch.

## 7. Install i3wm

Install the core i3 packages:

```bash
sudo pacman -S i3-wm i3lock i3status
```

Manjaro’s desktop environment documentation lists `i3-wm`, `i3lock`, and `i3status` as the basic i3 installation set. It also describes i3 as a popular tiling window manager using a single self-contained configuration file. ([Manjaro][1])

Install common desktop helpers:

```bash
sudo pacman -S rofi dmenu feh picom arandr xorg-xrandr xclip xsel
```

These tools fill the gaps that a full desktop environment normally handles automatically.

```text
rofi        application launcher and window switcher
feh         wallpaper setter
picom       compositor for transparency and reduced tearing
arandr      graphical frontend for xrandr
xclip/xsel  clipboard integration for terminal workflows
```

Log out. On the display manager screen, choose the `i3` session and log in.

## 8. First i3 Configuration

On first launch, i3 asks whether to generate a default config file. Accept it.

The config file is located at:

```bash
~/.config/i3/config
```

A practical workstation layout starts with a predictable modifier key:

```bash
set $mod Mod4
```

`Mod4` usually means the Super/Windows key. This avoids conflicts with terminal programs that use `Alt`.

A compact navigation scheme can be added:

```bash
bindsym $mod+j focus left
bindsym $mod+k focus down
bindsym $mod+i focus up
bindsym $mod+l focus right

bindsym $mod+Shift+j move left
bindsym $mod+Shift+k move down
bindsym $mod+Shift+i move up
bindsym $mod+Shift+l move right

bindsym $mod+Return exec alacritty
bindsym $mod+d exec rofi -show drun
bindsym $mod+Escape kill
```

**Tip:** The goal is not to memorize many shortcuts immediately. Start with launch, focus, move, kill, split, fullscreen, and workspace switching. Add more bindings only when a repeated action becomes annoying.

## 9. Configure i3wm

The i3 configuration file is the center of the whole workstation setup. It controls keyboard shortcuts, window layout, workspace behavior, startup programs, display arrangement, appearance, and small desktop services.

The main config file is:

```bash
~/.config/i3/config
````

After editing it, reload i3 without logging out:

```text
Mod + Shift + C
```

Restart i3 in place:

```text
Mod + Shift + R
```

### Modifier Key and Basic Window Style

Use the Super/Windows key as the i3 modifier. This keeps `Alt` available for terminal programs, Emacs, browser shortcuts, and other applications.

```bash
set $mod Mod4

font xft:monospace 11
floating_modifier $mod

new_window pixel 1
new_float normal
hide_edge_borders none
```

The border settings keep the interface minimal while still making the active window visible. This is useful in a tiling workflow because window boundaries matter more than window decorations.

Optional border shortcuts:

```bash
bindsym $mod+u border none
bindsym $mod+y border pixel 1
bindsym $mod+n border normal
```

### Launching Applications

Use a terminal and a launcher as the two primary entry points into the system.

```bash
bindsym $mod+Return exec i3-sensible-terminal
bindsym $mod+d exec --no-startup-id rofi -show drun
bindsym $mod+Escape kill
```

`i3-sensible-terminal` uses the system’s configured terminal. If a fixed terminal is preferred, replace it with `alacritty`, `kitty`, `xfce4-terminal`, or another terminal emulator:

```bash
bindsym $mod+Return exec alacritty
```

`rofi -show drun` launches desktop applications. For command-style launching, use:

```bash
bindsym $mod+d exec --no-startup-id rofi -show run
```

### Focus and Window Movement

A keyboard-driven setup should make window navigation predictable. This configuration uses `j/k/i/l` for left/down/up/right, while keeping arrow keys as a fallback.

```bash
bindsym $mod+j focus left
bindsym $mod+k focus down
bindsym $mod+i focus up
bindsym $mod+l focus right

bindsym $mod+Left focus left
bindsym $mod+Down focus down
bindsym $mod+Up focus up
bindsym $mod+Right focus right
```

Move the focused window with `Shift`:

```bash
bindsym $mod+Shift+j move left
bindsym $mod+Shift+k move down
bindsym $mod+Shift+i move up
bindsym $mod+Shift+l move right

bindsym $mod+Shift+Left move left
bindsym $mod+Shift+Down move down
bindsym $mod+Shift+Up move up
bindsym $mod+Shift+Right move right
```

**Tip:** This layout keeps the right hand close to the home row. It is useful for long terminal, editor, and browser sessions where mouse movement becomes repetitive.

### Splitting, Layouts, and Fullscreen

i3 does not place windows randomly. Every new window appears according to the current split direction and layout mode.

```bash
bindsym $mod+h split h
bindsym $mod+v split v
bindsym $mod+q split toggle

bindsym $mod+f fullscreen toggle

bindsym $mod+s layout stacking
bindsym $mod+w layout tabbed
bindsym $mod+e layout toggle split
```

Use horizontal and vertical splits for two-pane work, tabbed layout for many related windows, and fullscreen for focused reading or writing.

### Floating Windows and Scratchpad

Floating mode is useful for tools that should not be tiled, such as calculators, audio mixers, small settings dialogs, and file-transfer windows.

```bash
bindsym $mod+Shift+space floating toggle
bindsym $mod+space focus mode_toggle
bindsym $mod+Shift+s sticky toggle
```

The scratchpad is a hidden temporary workspace. It is useful for a terminal, calculator, music control, note window, or any small utility that should appear on demand.

```bash
bindsym $mod+Shift+minus move scratchpad
bindsym $mod+minus scratchpad show
```

**Tip:** A scratchpad terminal is one of the most useful i3 habits. Open a terminal, send it to the scratchpad, and call it back whenever a quick command is needed.

### Workspaces

Define named workspaces first:

```bash
set $ws1 1
set $ws2 2
set $ws3 3
set $ws4 4
set $ws5 5
set $ws6 6
set $ws7 7
set $ws8 8
```

Switch to workspaces:

```bash
bindsym $mod+1 workspace $ws1
bindsym $mod+2 workspace $ws2
bindsym $mod+3 workspace $ws3
bindsym $mod+4 workspace $ws4
bindsym $mod+5 workspace $ws5
bindsym $mod+6 workspace $ws6
bindsym $mod+7 workspace $ws7
bindsym $mod+8 workspace $ws8
```

Move a window to a workspace without following it:

```bash
bindsym $mod+Ctrl+1 move container to workspace $ws1
bindsym $mod+Ctrl+2 move container to workspace $ws2
bindsym $mod+Ctrl+3 move container to workspace $ws3
bindsym $mod+Ctrl+4 move container to workspace $ws4
bindsym $mod+Ctrl+5 move container to workspace $ws5
bindsym $mod+Ctrl+6 move container to workspace $ws6
bindsym $mod+Ctrl+7 move container to workspace $ws7
bindsym $mod+Ctrl+8 move container to workspace $ws8
```

Move a window and follow it immediately:

```bash
bindsym $mod+Shift+1 move container to workspace $ws1; workspace $ws1
bindsym $mod+Shift+2 move container to workspace $ws2; workspace $ws2
bindsym $mod+Shift+3 move container to workspace $ws3; workspace $ws3
bindsym $mod+Shift+4 move container to workspace $ws4; workspace $ws4
bindsym $mod+Shift+5 move container to workspace $ws5; workspace $ws5
bindsym $mod+Shift+6 move container to workspace $ws6; workspace $ws6
bindsym $mod+Shift+7 move container to workspace $ws7; workspace $ws7
bindsym $mod+Shift+8 move container to workspace $ws8; workspace $ws8
```

Enable quick back-and-forth switching:

```bash
workspace_auto_back_and_forth yes
bindsym $mod+b workspace back_and_forth
bindsym $mod+Shift+b move container to workspace back_and_forth; workspace back_and_forth
```

**Practical workspace scheme:**

```text
1 terminal
2 browser
3 editor
4 notes
5 documents
6 media
7 communication
8 system
```

This is only a convention. The important point is that every workspace should have a stable role.

### Floating Rules for Dialogs and Utility Windows

Some programs work better as floating windows. This includes settings panels, package managers, calculators, audio controls, installers, and small tool dialogs.

```bash
for_window [class="(?i)pavucontrol"] floating enable border normal
for_window [class="(?i)galculator"] floating enable border pixel 1
for_window [class="(?i)gparted"] floating enable border normal
for_window [class="(?i)lxappearance"] floating enable sticky enable border normal
for_window [class="(?i)qt5ct"] floating enable sticky enable border normal
for_window [class="(?i)pamac-manager"] floating enable border normal
for_window [class="(?i)manjaro-settings-manager"] floating enable border normal
for_window [title="(?i)file transfer.*"] floating enable
```

To identify a window class, run:

```bash
xprop | grep WM_CLASS
```

Then click the target window.

**Tip:** Do not overuse automatic assignment rules at the beginning. Add them only after a program repeatedly opens in an inconvenient layout.

### Urgent Windows

Urgent windows can be focused automatically:

```bash
for_window [urgent=latest] focus
```

This is useful for system prompts or applications that require immediate attention. If it becomes distracting, remove this rule.

### Reload, Restart, and Exit

```bash
bindsym $mod+Shift+c reload
bindsym $mod+Shift+r restart
```

For logout, use a confirmation dialog:

```bash
bindsym $mod+Shift+e exec "i3-nagbar -t warning -m 'Exit i3 and end this X session?' -b 'Yes, exit i3' 'i3-msg exit'"
```

### System Power Menu

A small i3 mode can group lock, logout, suspend, reboot, and shutdown actions.

```bash
bindsym $mod+0 mode "$mode_system"

set $mode_system (l)ock, (e)xit, (s)uspend, (h)ibernate, (r)eboot, (Shift+s)hutdown

mode "$mode_system" {
    bindsym l exec --no-startup-id i3lock, mode "default"
    bindsym e exec --no-startup-id i3-msg exit, mode "default"
    bindsym s exec --no-startup-id systemctl suspend, mode "default"
    bindsym h exec --no-startup-id systemctl hibernate, mode "default"
    bindsym r exec --no-startup-id systemctl reboot, mode "default"
    bindsym Shift+s exec --no-startup-id systemctl poweroff, mode "default"

    bindsym Return mode "default"
    bindsym Escape mode "default"
}
```

If a custom `i3exit` script is used, replace the `systemctl` commands with that script. Keep the script outside the public article and document only its purpose.

### Resize Mode

Resize mode is better than assigning many permanent resize shortcuts. Enter resize mode, adjust the focused window, then return to normal mode.

```bash
bindsym $mod+r mode "resize"

mode "resize" {
    bindsym j resize shrink width 5 px or 5 ppt
    bindsym k resize grow height 5 px or 5 ppt
    bindsym i resize shrink height 5 px or 5 ppt
    bindsym l resize grow width 5 px or 5 ppt

    bindsym Left resize shrink width 10 px or 10 ppt
    bindsym Down resize grow height 10 px or 10 ppt
    bindsym Up resize shrink height 10 px or 10 ppt
    bindsym Right resize grow width 10 px or 10 ppt

    bindsym Return mode "default"
    bindsym Escape mode "default"
}
```

For temporary fixed-size adjustments, add optional shortcuts:

```bash
bindsym $mod+Shift+y resize set height 1200
bindsym $mod+Shift+u resize set height 2400
bindsym $mod+Shift+o resize set width 800
bindsym $mod+Shift+p resize set width 2200
```

These are useful for screenshots, document reading, browser windows, and controlled recording layouts.

### Startup Programs

Use `exec` for programs that should start once when i3 starts. Use `exec_always` only for commands that must run again after `Mod + Shift + R`.

```bash
exec --no-startup-id nm-applet
exec --no-startup-id pamac-tray
exec --no-startup-id picom
exec --no-startup-id redshift -O 5200
```

For wallpaper restoration:

```bash
exec --no-startup-id feh --bg-scale ~/Pictures/wallpaper.jpg
```

or, if using Nitrogen:

```bash
exec --no-startup-id nitrogen --restore
```

For clipboard and power management:

```bash
exec --no-startup-id clipit
exec --no-startup-id mate-power-manager
```

For a status bar:

```bash
exec_always --no-startup-id ~/.config/polybar/launch.sh
```

**Tip:** Keep personal startup items separate. Browser URLs, private scripts, proxy clients, research dashboards, and project-specific applications should be placed in a private script such as:

```bash
~/.config/i3/autostart.local.sh
```

Then call it from i3:

```bash
exec --no-startup-id ~/.config/i3/autostart.local.sh
```

This keeps the public i3 configuration clean and publishable.

### Input Method Startup

For iBus, prefer loading environment variables from `~/.xprofile`:

```bash
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
ibus-daemon -drx
```

If the display manager does not load `~/.xprofile`, add the daemon line to i3:

```bash
exec --no-startup-id ibus-daemon -drx
```

Avoid putting `export` commands directly behind `exec` in i3 unless there is a specific reason. Environment variables should be set before GUI applications start.

### Multi-monitor Layout

For multiple monitors, first inspect output names:

```bash
xrandr --query
```

Then configure the layout manually or with `arandr`.

A generic three-monitor example:

```bash
exec --no-startup-id xrandr \
  --output <CENTER_OUTPUT> --primary --mode 3840x2160 --pos 2160x0 --rotate normal \
  --output <LEFT_OUTPUT>   --mode 3840x2160 --pos 0x0    --rotate left \
  --output <RIGHT_OUTPUT>  --mode 3840x2160 --pos 6000x0 --rotate right \
  --output <UNUSED_OUTPUT> --off
```

Assign workspaces to monitors:

```bash
workspace $ws1 output <CENTER_OUTPUT>
workspace $ws2 output <CENTER_OUTPUT>
workspace $ws3 output <CENTER_OUTPUT>
workspace $ws4 output <LEFT_OUTPUT>
workspace $ws5 output <RIGHT_OUTPUT>
```

A cleaner method is to use `arandr`, save the layout, and call the generated script:

```bash
exec --no-startup-id ~/.screenlayout/default.sh
```

**Tip:** Do not publish real monitor topology if it exposes private hardware details. Use placeholders such as `<CENTER_OUTPUT>`, `<LEFT_OUTPUT>`, and `<RIGHT_OUTPUT>`.

### Screenshots and Screen Saver

Install a screenshot tool:

```bash
sudo pacman -S xfce4-screenshooter
```

Bind a region screenshot shortcut:

```bash
bindsym $mod+Shift+d exec --no-startup-id xfce4-screenshooter -r -s ~/Pictures
```

Optional X11 screen blanking:

```bash
exec --no-startup-id xset s 1800
exec --no-startup-id xset dpms 0 0 1800
```

This turns off the display after a period of inactivity. Adjust the time according to the working environment.

### Colors and Gaps

A minimal color block keeps the active window recognizable:

```bash
client.focused          #bfbfbf #162025 #bfbfbf #39402e #39402e
client.focused_inactive #bfbfbf #162025 #bfbfbf #75404b #75404b
client.unfocused        #bfbfbf #162025 #bfbfbf #75404b #75404b
client.urgent           #bfbfbf #162025 #bfbfbf #75404b #75404b
client.placeholder      #bfbfbf #162025 #bfbfbf #75404b #75404b
client.background       #162025
```

Use zero gaps for maximum screen density:

```bash
gaps inner 0
gaps outer 0
smart_gaps on
```

If adjustable gaps are useful, add a gap mode:

```bash
set $mode_gaps Gaps: (o) outer, (i) inner
set $mode_gaps_outer Outer Gaps: +|-|0 local, Shift + +|-|0 global
set $mode_gaps_inner Inner Gaps: +|-|0 local, Shift + +|-|0 global

bindsym $mod+Shift+g mode "$mode_gaps"

mode "$mode_gaps" {
    bindsym o mode "$mode_gaps_outer"
    bindsym i mode "$mode_gaps_inner"
    bindsym Return mode "default"
    bindsym Escape mode "default"
}

mode "$mode_gaps_inner" {
    bindsym plus gaps inner current plus 5
    bindsym minus gaps inner current minus 5
    bindsym 0 gaps inner current set 0

    bindsym Shift+plus gaps inner all plus 5
    bindsym Shift+minus gaps inner all minus 5
    bindsym Shift+0 gaps inner all set 0

    bindsym Return mode "default"
    bindsym Escape mode "default"
}

mode "$mode_gaps_outer" {
    bindsym plus gaps outer current plus 5
    bindsym minus gaps outer current minus 5
    bindsym 0 gaps outer current set 0

    bindsym Shift+plus gaps outer all plus 5
    bindsym Shift+minus gaps outer all minus 5
    bindsym Shift+0 gaps outer all set 0

    bindsym Return mode "default"
    bindsym Escape mode "default"
}
```

**Tip:** Zero gaps are efficient for workstations with many terminal and editor windows. Larger gaps are visually cleaner but reduce usable screen space.

### Audio and Touchpad Keys

Bind common media keys:

```bash
bindsym XF86AudioRaiseVolume exec --no-startup-id amixer -q set Master 2dB+ unmute
bindsym XF86AudioLowerVolume exec --no-startup-id amixer -q set Master 2dB- unmute
bindsym XF86AudioMute exec --no-startup-id amixer -q set Master toggle
```

For laptop touchpad control:

```bash
bindsym XF86TouchpadOn exec --no-startup-id synclient Touchpadoff=0
bindsym XF86TouchpadOff exec --no-startup-id synclient Touchpadoff=1
```

If `synclient` does not work on a modern system, check whether the touchpad is managed by `libinput` instead.

### Public and Private Configuration Split

For a publishable workstation setup, keep the public i3 config generic and move private details into local files.

Recommended structure:

```text
~/.config/i3/config               public, reusable i3 configuration
~/.config/i3/autostart.local.sh   private startup applications
~/.screenlayout/default.sh        private monitor layout
~/.config/polybar/launch.sh       status bar launcher
~/.xprofile                       session environment variables
```

The public config should describe the workflow. The private files can contain machine-specific display outputs, startup URLs, proxy clients, project scripts, personal dashboards, or hardware-specific commands.

```
```

## 10. Install Core Workstation Packages

The following package groups are optional but useful for a general research and development workstation.

### Terminal and Shell Workflow

```bash
sudo pacman -S alacritty tmux zsh fzf ripgrep fd bat eza tree unzip p7zip
```

This set gives a fast terminal, terminal multiplexing, fuzzy search, modern file search, better text preview, and common archive tools.

### Development Tools

```bash
sudo pacman -S git base-devel python python-pip nodejs npm ruby go rustup jdk-openjdk
```

For Rust, initialize the toolchain after installing `rustup`:

```bash
rustup default stable
```

### Monitoring and System Inspection

```bash
sudo pacman -S htop btop nmon ncdu lsof net-tools inxi
```

`btop` is convenient for live monitoring. `ncdu` is useful when disk usage grows unexpectedly. `inxi` is useful for reporting hardware and driver information.

### Writing, Research, and Media

```bash
sudo pacman -S emacs pandoc texlive-core texlive-latexextra calibre
sudo pacman -S obs-studio kdenlive blender gimp inkscape
```

For bibliography management or specialized academic tools, prefer official packages or Flatpak when available. Avoid unverified binary packages unless the source and maintainer are trusted.

### Fonts

```bash
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji ttf-fira-code otf-fira-mono
```

For Chinese, Japanese, Korean, mathematical symbols, and emoji-heavy documents, `noto-fonts-cjk` and `noto-fonts-emoji` prevent many missing-glyph problems.

## 11. AUR Usage

The AUR is useful but should not be treated as an official package repository. Manjaro’s AUR documentation warns that AUR packages may not always install cleanly, may require manual dependency handling, and are not guaranteed to work properly. It also recommends checking the relevant AUR page and comments before installing software. ([Manjaro][3])

Install build tools first:

```bash
sudo pacman -S base-devel git
```

If using an AUR helper, inspect build files before installation:

```bash
pamac search -a google-chrome
pamac build google-chrome
```

**Warning:** Read `PKGBUILD` files for packages that download binaries, modify system services, install browser extensions, or request broad permissions.

## 12. Configure Alacritty

Alacritty is a fast GPU-accelerated terminal emulator. Since version `0.13.0`, Alacritty uses `TOML` configuration instead of `YAML`, and old YAML configs can be migrated with `alacritty migrate`. ([alacritty.org][4])

Create the config file:

```bash
mkdir -p ~/.config/alacritty
nano ~/.config/alacritty/alacritty.toml
```

A minimal configuration:

```toml
[font]
size = 16

[font.normal]
family = "monospace"
style = "Regular"

[font.bold]
family = "monospace"
style = "Bold"

[font.italic]
family = "monospace"
style = "Italic"

[window]
opacity = 1.0

[env]
WINIT_X11_SCALE_FACTOR = "1.0"
```

**Tip:** Alacritty does not try to be a full terminal suite. Use `tmux` for tabs, panes, persistent sessions, and remote development.

## 13. DPI and Display Scaling

For HiDPI displays under X11, create or edit:

```bash
nano ~/.Xresources
```

Add:

```text
Xft.dpi: 144
```

Reload it:

```bash
xrdb -merge ~/.Xresources
```

A compact reference:

```text
13.3" 1920x1080  → 144–168 DPI
14.0" 1920x1080  → 144–157 DPI
15.6" 1920x1080  → 120–144 DPI
24"   1920x1080  → 96 DPI
27"   2560x1440  → 109–120 DPI
27"   3840x2160  → 144–168 DPI
32"   3840x2160  → 144 DPI
```

Use `arandr` for graphical monitor layout:

```bash
arandr
```

After arranging displays, save the layout script and call it from i3:

```bash
exec --no-startup-id ~/.screenlayout/default.sh
```

## 14. Chinese Input Method with iBus

Install iBus and the Pinyin engine:

```bash
sudo pacman -S ibus ibus-libpinyin
```

Launch the setup tool:

```bash
ibus-setup
```

Open **Input Method** → **Add** → **Chinese** → **Intelligent Pinyin**.

Create or edit `~/.xprofile`:

```bash
export LC_CTYPE=zh_CN.UTF-8
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
ibus-daemon -drx
```

Then log out and log in again.

**Tip:** GUI applications inherit environment variables from the graphical session, not always from `.bashrc` or `.zshrc`. For input methods, `~/.xprofile` is usually more reliable than shell-only configuration.

## 15. Greek Letter Input with ibus-libpinyin

`ibus-libpinyin` supports user Lua scripts. This can be used to add a small Greek-letter command.

Open `ibus-setup`, select **Intelligent Pinyin**, open **Preferences**, then go to **User Data** and edit the user Lua script.

Add:

```lua
_MAPPING_TABLE = [[
a A,α,Alpha
b B,β,Beta
g Γ,γ,Gamma
d Δ,δ,Delta
e Ε,ε,Epsilon,Η,η,Eta
z Ζ,ζ,Zeta
t Θ,θ,Theta,Τ,τ,Tau
i Ι,ι,Iota
k Κ,κ,Kappa
l Λ,λ,Lambda
m Μ,μ,Mu
n Ν,ν,Nu
x Ξ,ξ,Xi
o Ο,ο,Omicron,Ω,ω,Omega
p Π,π,Pi,Φ,φ,Phi,Ψ,ψ,Psi
r Ρ,ρ,Rho
s Σ,σ,Sigma
u Υ,υ,Upsilon
c Χ,χ,Chi
]]

_MAPPING = ime.parse_mapping(_MAPPING_TABLE, "\n", " ", ",")

function GreekAlphabet(input)
    if _MAPPING[input] then
        return _MAPPING[input]
    else
        error("Invalid argument")
    end
end

ime.register_command("ga", "GreekAlphabet", "希腊字母")
```

Restart iBus:

```bash
ibus restart
```

When using the Pinyin input method, type:

```text
i Space g a
```

Then select the corresponding Greek letter.

**Tip:** This is useful for mathematics, logic, linguistics, physics, and philosophy notes where Greek letters appear frequently but do not justify switching to a full Greek keyboard layout.

## 16. French Input on a US Keyboard with iBus

Typing French on a standard US keyboard can be inconvenient because French keyboards usually use an `AZERTY` layout, while most programming-oriented workflows assume `QWERTY`. Instead of switching the entire keyboard layout to French, a more practical approach is to keep the US layout and enable an international layout with `AltGr` dead keys.

This is especially useful in an i3wm workflow: the physical key positions remain familiar for shortcuts, terminal commands, and programming symbols, while accented French characters can still be entered directly.

```bash
ibus-setup
```

Open **Input Method** → **Add** → **French** → **English (intl., with AltGr dead keys)**.

Common examples:

```text
AltGr + e  → é
AltGr + c  → ç
AltGr + k  → œ
AltGr + q  → ä
```

**Tip:** For daily programming and writing, `English (intl., with AltGr dead keys)` is usually more convenient than a full French `AZERTY` layout. It preserves the US keyboard positions for symbols such as `/`, `\`, `[`, `]`, `{`, `}`, `;`, and `'`, which are frequently used in code and shell commands.

A typical French `AZERTY` layout looks like this:

<pre class="ascii_art">
,---,---,---,---,---,---,---,---,---,---,---,---,---,-------,
| ² |& 1|é 2|" 3|' 4|( 5|- 6|è 7|_ 8|ç 9|à 0|) °|= +| <-    |
|---'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-----|
| ->| | a | z | e | r | t | y | u | i | o | p |^ ¨|$ £|   E |
|-----',--',--',--',--',--',--',--',--',--',--',--',--',  N |
| caps | q | s | d | f | g | h | j | k | l | m |ù %|μ *|  T |
|----,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'---'----|
| sft|> <| w | x | c | v | b | n |, ?|; .|: /|! §| shift    |
|----',--'--,'---',--'---'---'---'---'---',--'---',--,------|
| ctl | win | alt |                       | altgr |  | ctrl |
'-----'-----'-----'-----------------------'-------'  '------'
</pre>

With the international US layout, `AltGr` exposes additional accented characters and symbols:

<pre class="ascii_art">
,---,---,---,---,---,---,---,---,---,---,---,---,---,-------,
| ` | ¹ | ² | ³ | ¤ | € | ^ |  ̛ | ˛ | ‘ | ’ | ¥ | × | <-    |
|---'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-----|
| ->| | ä | å | é | ë | þ | ü | ú | í | ó | ö | « | » |  \  |
|-----',--',--',--',--',--',--',--',--',--',--',--',--'-----|
| caps | á | ß | ð | f | g | h | ï | œ | ø | ¶ | ´ | enter  |
|------'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'---'----|
| shift  | æ | œ | © | ® | · | ñ | µ | ç | ˙ | ¿ | shift    |
|-----,--'--,'---',--'---'---'---'---'---',--'---',--,------|
| ctl | win | alt |                       | altgr |  | ctrl |
'-----'-----'-----'-----------------------'-------'  '------'
</pre>

For comparison, the standard US layout is shown below:

<pre class="ascii_art">
,---,---,---,---,---,---,---,---,---,---,---,---,---,-------,
| ~ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0 | - | = | <-    |
|---'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-----|
| ->| | Q | W | E | R | T | Y | U | I | O | P | [ | ] |  \  |
|-----',--',--',--',--',--',--',--',--',--',--',--',--'-----|
| caps | A | S | D | F | G | H | J | K | L | ; | ' | enter  |
|----,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'-,-'---'----|
| shift  | Z | X | C | V | B | N | M | , | . | / | shift    |
|----',--'--,'---',--'---'---'---'---'---',--'---',--,------|
| ctl | win | alt |                       | altgr |  | ctrl |
'-----'-----'-----'-----------------------'-------'  '------'
</pre>

**Practical note:** If French is used only occasionally, this method is usually enough. For long-form French writing, switching to a dedicated French layout may be more comfortable, but it also changes many punctuation and symbol positions that are important for programming.

## 17. Network Proxy Configuration

A proxy can be configured at several layers: browser, shell, Git, package manager, or system service. Keep these layers separate. A browser proxy should not silently affect package management unless that is intentional.

### Browser-level Proxy

For Chrome or Chromium, a temporary proxy can be used at launch:

```bash
google-chrome-stable --proxy-server=socks5://127.0.0.1:1080
```

Browser extensions such as ZeroOmega can manage proxy rules more conveniently.

### Git Proxy

```bash
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
```

To remove the proxy:

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### proxychains

Edit:

```bash
sudo nano /etc/proxychains.conf
```

Append:

```text
socks5 127.0.0.1 1080
```

Then run:

```bash
proxychains curl https://example.com
```

**Tip:** Use `proxychains` for specific commands instead of exporting global proxy variables permanently. It reduces accidental side effects.

## 18. Git Configuration

Set identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use a safe default branch name:

```bash
git config --global init.defaultBranch main
```

Enable credential caching:

```bash
git config --global credential.helper 'cache --timeout=3600'
```

Permanent credential storage is convenient but less secure:

```bash
git config --global credential.helper store
```

**Tip:** For GitHub or GitLab, SSH keys are usually cleaner than HTTPS credential storage.

```bash
ssh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub
```

## 19. Visual Studio Code

Install the open-source build from the official repository:

```bash
sudo pacman -S code
```

Useful extensions:

```text
Markdown All in One
Prettier
Awesome Emacs Keymap
Org Mode
Python
LaTeX Workshop
```

Enable ligatures for Fira Code in `settings.json`:

```json
{
  "editor.fontFamily": "Fira Code, monospace",
  "editor.fontLigatures": true
}
```

**Note:** The `code` package is the open-source build. If Microsoft’s official binary distribution is required, use an AUR package only after checking its build files and comments.

## 20. Emacs and Research Writing

Install Emacs and basic writing tools:

```bash
sudo pacman -S emacs pandoc texlive-core texlive-latexextra
```

A compact research workflow:

```text
Emacs       long-form writing, notes, Lisp, Org mode
Pandoc      document conversion
LaTeX       academic typesetting
Calibre     ebook management
Zotero      bibliography management
```

For mathematical computing, prefer legal and maintainable tools:

```bash
sudo pacman -S octave
```

If MATLAB is required, use a valid MathWorks license, a university license, or an official installer. Avoid storing license keys, cracked files, or private activation material in public notes.

## 21. Samba File Sharing

Install Samba:

```bash
sudo pacman -S samba
```

Create a shared directory:

```bash
sudo mkdir -p /home/share
sudo chmod 770 /home/share
```

Edit the configuration:

```bash
sudo nano /etc/samba/smb.conf
```

Example:

```ini
[global]
workgroup = WORKGROUP
server string = Manjaro Samba Server
security = user
passdb backend = tdbsam
log file = /var/log/samba/log.%m
max log size = 50

[share]
comment = Shared Folder
path = /home/share
browseable = yes
writable = yes
guest ok = no
```

Create a Samba user:

```bash
sudo useradd -M sambauser
sudo smbpasswd -a sambauser
```

Restart the service:

```bash
sudo systemctl restart smb.service
sudo systemctl enable smb.service
```

If the service name differs on the installed system, inspect available units:

```bash
systemctl list-unit-files | grep -E 'smb|samba'
```

## 22. Redshift for Eye Care

Install Redshift:

```bash
sudo pacman -S redshift
```

Apply a fixed color temperature:

```bash
redshift -O 5000
```

Reset the screen:

```bash
redshift -x
```

Redshift adjusts screen color temperature according to time and surroundings. Its manual describes lower night temperatures around `3000K–4000K` and daytime values around `5500K–6500K`; lower values look warmer and more reddish, while higher values look cooler and bluer. ([man.archlinux.org][5])

**Tip:** `redshift -O 5000` is a manual one-shot adjustment. For automatic day/night transitions, use a Redshift config file with location settings.

## 23. Nvidia Graphics Drivers

Check the current graphics device and driver:

```bash
inxi -G
mhwd -li
```

Automatically install a proprietary Nvidia driver:

```bash
sudo mhwd -a pci nonfree 0300
```

For manual installation:

```bash
sudo mhwd -i pci video-nvidia
```

Reboot after changing graphics drivers.

For display settings:

```bash
sudo nvidia-settings
```

If using hybrid graphics, check whether the display output is wired to the integrated GPU or the discrete GPU. Hybrid laptops may need additional configuration.

**Tip:** Graphics driver problems are easier to fix when Xfce or GNOME is still available as a fallback session.

## 24. VirtualBox

Check the installed and running kernel:

```bash
mhwd-kernel -li
uname -r
```

Install VirtualBox with the host module matching the current Manjaro kernel. Manjaro’s VirtualBox documentation explicitly states that `linux*-virtualbox-host-modules` must match the kernel version. ([Manjaro][6])

Example for `linux66`:

```bash
sudo pacman -Syu virtualbox linux66-virtualbox-host-modules
sudo vboxreload
```

Verify:

```bash
vboxmanage --version
```

**Warning:** If the kernel is upgraded, VirtualBox modules may need to be updated or reloaded. Rebooting is often the simplest fix.

## 25. SSH

Install OpenSSH:

```bash
sudo pacman -S openssh
```

Enable and start the service:

```bash
sudo systemctl enable sshd.service
sudo systemctl start sshd.service
```

Check status:

```bash
systemctl status sshd.service
```

Basic hardening:

```bash
sudo nano /etc/ssh/sshd_config
```

Useful options:

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Restart after editing:

```bash
sudo systemctl restart sshd.service
```

**Tip:** Disable password login only after confirming that SSH key login works from another machine.

## 26. Troubleshooting

### Package File Conflict

A common package error looks like this:

```text
error: failed to commit transaction
PACKAGE_NAME: /path/to/file exists in filesystem
```

Do not immediately overwrite everything. First identify which package owns the file:

```bash
pacman -Qo /path/to/file
```

If the file is unowned and the package is trusted, overwrite only the specific path:

```bash
sudo pacman -S PACKAGE_NAME --overwrite /path/to/file
```

**Warning:** Avoid broad patterns such as `--overwrite "*"`. They can hide real package conflicts.

### Mirror or Keyring Problems

Refresh mirrors and update:

```bash
sudo pacman-mirrors --fasttrack
sudo pacman -Syu
```

Refresh Manjaro keyrings:

```bash
sudo pacman -S manjaro-keyring archlinux-keyring
sudo pacman -Syu
```

### OBS Startup Failure with Nvidia or VAAPI

If OBS crashes around VAAPI or decoder initialization, inspect installed VAAPI packages:

```bash
pacman -Qs vaapi
```

For Nvidia systems, replacing older VAAPI bridge packages with a currently maintained Nvidia VAAPI driver may help:

```bash
sudo pacman -R libva-vdpau-driver
sudo pacman -S nvidia-vaapi-driver
```

Then restart the session and test OBS again.

### Incorrect Time in Dual Boot

Linux commonly treats the hardware clock as UTC, while Windows often treats it as local time. In a dual-boot setup, this may cause time drift.

Check time status:

```bash
timedatectl
sudo hwclock --show
date
```

Write system time to hardware clock:

```bash
sudo hwclock -w
```

For a Windows/Linux dual-boot machine, choose one clock strategy and keep it consistent.

**Tip:** A large time mismatch can break TLS certificate validation and produce browser errors such as “Your connection is not private.”

## 27. A Compact i3 Workflow

A useful i3 workstation does not need to be visually complex. A stable daily workflow can be built from a few components:

```text
i3wm       window layout and workspaces
rofi       application launcher
alacritty  terminal emulator
tmux       terminal sessions and panes
fzf        fuzzy selection
ripgrep    fast text search
ibus       multilingual input
arandr     monitor layout
picom      compositor
```

The practical goal is consistency. Every workspace should have a role:

```text
1 terminal
2 browser
3 editor
4 notes
5 documents
6 media
7 communication
8 system
9 scratch
```

**Tip:** Assign applications to workspaces only after the workflow becomes stable. Premature automation often creates more configuration work than it saves.

## 28. Final Notes

This setup is intentionally incremental. Start with a stable Manjaro Xfce or GNOME installation, install i3wm, then add only the tools that improve the daily workflow.

A good workstation is not just a list of packages. It is a set of habits: fast window movement, stable keyboard shortcuts, predictable input methods, readable fonts, trusted package sources, and recoverable system configuration.

The most important maintenance rule is simple:

```bash
sudo pacman -Syu
```

Update the system as a whole, read warnings before major upgrades, and keep a fallback desktop session available.

```
::contentReference[oaicite:10]{index=10}
```

[1]: https://wiki.manjaro.org/index.php/Install_Desktop_Environments "Install Desktop Environments - Manjaro"
[2]: https://wiki.manjaro.org/index.php/Pacman-mirrors "Pacman-mirrors - Manjaro"
[3]: https://wiki.manjaro.org/index.php/Arch_User_Repository "Arch User Repository - Manjaro"
[4]: https://alacritty.org/changelog_0_13_0.html "Alacritty"
[5]: https://man.archlinux.org/man/redshift.1.en "redshift(1) — Arch manual pages"
[6]: https://wiki.manjaro.org/index.php/VirtualBox "VirtualBox - Manjaro"
