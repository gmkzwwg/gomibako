---
title: i3wm - Quick Reference
categories: Sheet
subclass: Operating Tools
---

## i3wm Keyboard Cheatsheet

**Note:**
* This cheatsheet is based on the custom configuration used in this workstation setup.
* `$mod` is the main i3 modifier key and is usually bound to either `Alt` (`Mod1`) or the Super/Windows key (`Mod4`); this setup uses `Mod4`.

### General and Session Control

| Shortcut | Action | Notes |
| --- | --- | --- |
| `$mod + Enter` | Open terminal | Uses `i3-sensible-terminal` or a configured terminal such as `alacritty` |
| `$mod + d` | Open application launcher | Usually `rofi -show drun`; can be replaced by `dmenu` |
| `$mod + Escape` | Kill focused window | Custom close-window binding |
| `$mod + Shift + c` | Reload i3 config | Applies config changes without restarting the session |
| `$mod + Shift + r` | Restart i3 in place | Useful after editing config or recovering from layout glitches |
| `$mod + Shift + e` | Exit i3 session | Usually wrapped by a confirmation prompt |
| `$mod + 0` | Open system power mode | Lock, logout, suspend, reboot, and shutdown |

### Window Layout and Navigation

| Shortcut | Action | Notes |
| --- | --- | --- |
| `$mod + h` | Split horizontally | New window opens beside the current container |
| `$mod + v` | Split vertically | New window opens below the current container |
| `$mod + q` | Toggle split orientation | Switches the current split direction |
| `$mod + e` | Toggle split layout | Switches between horizontal and vertical split layout |
| `$mod + s` | Use stacking layout | Shows one focused window with a stacked title list |
| `$mod + w` | Use tabbed layout | Shows one focused window with tab-like titles |
| `$mod + f` | Toggle fullscreen | Fullscreen for the focused window |
| `$mod + <Direction>` | Focus window in that direction | Direction keys: `j/k/i/l` or arrow keys |
| `$mod + Shift + <Direction>` | Move window in that direction | Direction keys: `j/k/i/l` or arrow keys |
| `$mod + Shift + Space` | Toggle floating mode | Useful for dialogs, calculators, and settings windows |
| `$mod + Space` | Toggle focus between tiling and floating windows | Helps when floating windows overlap tiled windows |
| `$mod + Shift + s` | Toggle sticky mode | Sticky only matters for floating windows |
| `$mod + Left Mouse Button` | Drag floating window | Uses `floating_modifier $mod` |
| `$mod + Right Mouse Button` | Resize floating window | Uses `floating_modifier $mod` |

### Workspaces and Scratchpad

| Shortcut | Action | Notes |
| --- | --- | --- |
| `$mod + <num>` | Switch to workspace `<num>` | Commonly used for workspaces `1–8` |
| `$mod + Shift + <num>` | Move window to workspace `<num>` and follow | Useful when reorganizing the current task |
| `$mod + Ctrl + <num>` | Move window to workspace `<num>` without following | Useful when sending windows away quietly |
| `$mod + b` | Switch back and forth | Toggles between current and previous workspace |
| `$mod + Shift + b` | Move window to previous workspace and follow | Uses workspace back-and-forth behavior |
| `$mod + Shift + -` | Move window to scratchpad | Hides the focused window |
| `$mod + -` | Show scratchpad window | Recalls a hidden scratchpad window |

### Resize, Borders, and Gaps

| Shortcut | Action | Notes |
| --- | --- | --- |
| `$mod + r` | Enter resize mode | Use resize keys inside the mode |
| `j` or `Left` | Shrink width | Used inside resize mode |
| `k` or `Down` | Grow height | Used inside resize mode |
| `i` or `Up` | Shrink height | Used inside resize mode |
| `l` or `Right` | Grow width | Used inside resize mode |
| `Enter` / `Escape` | Leave resize mode | Returns to default mode |
| `$mod + Shift + y` | Set fixed window height | Optional helper for controlled layouts |
| `$mod + Shift + u` | Set larger fixed window height | Optional helper for reading or recording |
| `$mod + Shift + o` | Set fixed window width | Optional helper for browser or document windows |
| `$mod + Shift + p` | Set larger fixed window width | Optional helper for wide displays |
| `$mod + u` | Remove border | Useful for distraction-free windows |
| `$mod + y` | Use pixel border | Minimal visible border |
| `$mod + n` | Use normal border | Restores title-bar style border |
| `$mod + Shift + g` | Enter gaps mode | Adjusts inner and outer gaps |

### Screenshots, Audio, and Hardware Keys

| Shortcut | Action | Notes |
| --- | --- | --- |
| `$mod + Shift + d` | Take region screenshot | Example command: `xfce4-screenshooter -r` |
| `XF86AudioRaiseVolume` | Increase volume | Hardware/media key |
| `XF86AudioLowerVolume` | Decrease volume | Hardware/media key |
| `XF86AudioMute` | Toggle mute | Hardware/media key |
| `XF86TouchpadOn` | Enable touchpad | Laptop-specific |
| `XF86TouchpadOff` | Disable touchpad | Laptop-specific |

### Direction Key Convention

| Direction | Custom Key | Arrow Key |
| --- | --- | --- |
| Left | `j` | `Left` |
| Down | `k` | `Down` |
| Up | `i` | `Up` |
| Right | `l` | `Right` |

### Difference from the Default i3 Keybindings

This setup is not a default i3 cheatsheet.

The main change is that `$mod` is set to the Super/Windows key (`Mod4`) instead of the default `Alt` (`Mod1`), which reduces conflicts with terminals, editors, browsers, and application-level shortcuts. Window navigation is also customized: `j/k/i/l` are used together with arrow keys for directional focus and movement, replacing the more common default `j/k/l/semicolon` pattern. Several workflow-oriented bindings are added, including `$mod + Escape` for killing the focused window, `$mod + 0` for a system power mode, `$mod + b` for workspace back-and-forth, `$mod + Shift + -` / `$mod + -` for scratchpad use, fixed-size resize shortcuts, border toggles, gap adjustment mode, screenshot binding, and hardware keys for audio or touchpad control. In short, the configuration keeps i3’s tiling logic but reshapes the keymap around a workstation workflow: faster session control, clearer directional navigation, more explicit workspace movement, and more utilities available directly from the keyboard.


## i3wm Quick Start

This section explains how to make the configuration work in practice. The keybindings are listed in the cheatsheet; here the focus is on files, startup behavior, display layout, input methods, and debugging.

### 1. Install the Required Components

This configuration assumes that `i3wm` is only the window manager. Other desktop functions are provided by small external tools.

```bash
sudo pacman -S i3-wm i3lock i3status rofi feh picom arandr xorg-xrandr
sudo pacman -S alacritty xfce4-screenshooter redshift
sudo pacman -S ibus ibus-libpinyin
````

The roles are straightforward:

| Component             | Purpose                                            |
| --------------------- | -------------------------------------------------- |
| `i3-wm`               | Tiling window manager                              |
| `rofi`                | Application launcher                               |
| `feh` or `nitrogen`   | Wallpaper restoration                              |
| `picom`               | Compositor for transparency and smoother rendering |
| `arandr` / `xrandr`   | Monitor layout                                     |
| `ibus`                | Input method framework                             |
| `redshift`            | Manual or automatic screen color temperature       |
| `xfce4-screenshooter` | Screenshot tool                                    |

If a program is not used, remove its startup line from the i3 config. A clean i3 setup should not start unused background services.

### 2. Keep Public and Private Config Separate

The main i3 file should describe the reusable workflow:

```text
~/.config/i3/config
```

Machine-specific or private details should be moved into separate files:

```text
~/.config/i3/autostart.local.sh
~/.screenlayout/default.sh
~/.xprofile
~/.config/polybar/launch.sh
```

This separation keeps the public config publishable. The main file can contain generic logic, while the private files can contain monitor names, wallpaper paths, startup URLs, proxy clients, project scripts, or personal applications.

A practical startup pattern is:

```bash
exec --no-startup-id ~/.screenlayout/default.sh
exec --no-startup-id ~/.config/i3/autostart.local.sh
```

Make these scripts executable:

```bash
chmod +x ~/.screenlayout/default.sh
chmod +x ~/.config/i3/autostart.local.sh
```

### 3. Configure the Session Environment

Input methods and GUI environment variables should be loaded before applications start. Put them in:

```text
~/.xprofile
```

Example:

```bash
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
ibus-daemon -drx
```

This is more reliable than putting `export` commands directly inside the i3 config. The i3 config starts programs; `.xprofile` prepares the graphical session environment.

If `.xprofile` is not loaded by the display manager, keep only the daemon command in the i3 config:

```bash
exec --no-startup-id ibus-daemon -drx
```

### 4. Set Up Monitor Layout

First inspect available outputs:

```bash
xrandr --query
```

For a simple setup, use `arandr`:

```bash
arandr
```

Arrange the monitors visually, then save the layout as:

```text
~/.screenlayout/default.sh
```

Call it from i3:

```bash
exec --no-startup-id ~/.screenlayout/default.sh
```

For a public article, avoid publishing real output names or physical monitor topology. Use placeholders such as:

```bash
xrandr \
  --output <PRIMARY_OUTPUT> --primary --mode <RESOLUTION> --pos <X>x<Y> --rotate normal \
  --output <SECONDARY_OUTPUT> --mode <RESOLUTION> --pos <X>x<Y> --rotate normal
```

### 5. Add Startup Programs Deliberately

Use `exec` for programs that should start once when the i3 session starts:

```bash
exec --no-startup-id nm-applet
exec --no-startup-id picom
exec --no-startup-id redshift -O 5200
```

Use `exec_always` only for commands that should run again after restarting i3 in place:

```bash
exec_always --no-startup-id ~/.config/polybar/launch.sh
```

A common mistake is putting every personal application in `~/.config/i3/config`. A cleaner method is to put private startup items into:

```text
~/.config/i3/autostart.local.sh
```

Example:

```bash
#!/bin/sh

# Start private or machine-specific applications here.
# Examples:
# browser
# proxy-client
# project-dashboard
# note-application
```

### 6. Use Floating Rules Only Where They Help

Most windows should remain tiled. Floating rules are useful for small tools and dialogs.

To identify a window class:

```bash
xprop | grep WM_CLASS
```

Click the target window, then add a rule:

```bash
for_window [class="(?i)pavucontrol"] floating enable border normal
for_window [class="(?i)galculator"] floating enable border pixel 1
for_window [class="(?i)lxappearance"] floating enable sticky enable border normal
```

Use floating rules for settings panels, calculators, package managers, file-transfer dialogs, and audio controls. Avoid assigning large applications too early; workspace automation is easier to maintain after the daily workflow becomes stable.

### 7. Configure Appearance Minimally

The configuration uses a dense layout:

```bash
gaps inner 0
gaps outer 0
smart_gaps on
```

This maximizes usable screen space and works well for terminals, editors, browsers, and PDFs.

Window borders should remain visible enough to identify focus:

```bash
new_window pixel 1
new_float normal
```

A minimal appearance is easier to maintain than a heavily themed setup. If theming is needed, keep it separate from functional configuration.

### 8. Validate the Config Before Restarting

Check syntax:

```bash
i3 -C -c ~/.config/i3/config
```

Reload from terminal:

```bash
i3-msg reload
```

Restart i3 from terminal:

```bash
i3-msg restart
```

If a newly added line breaks the session, switch to a TTY or another desktop session, edit the config, then validate it again.

### 9. Recommended File Structure

A maintainable i3 setup can be organized as follows:

```text
~/.config/i3/config
    Main i3 configuration: keybindings, layouts, rules, startup hooks.

~/.config/i3/autostart.local.sh
    Private startup programs and machine-specific services.

~/.screenlayout/default.sh
    Monitor arrangement generated by arandr or written with xrandr.

~/.xprofile
    Graphical session environment variables, especially input methods.

~/.config/polybar/launch.sh
    Status bar launcher, used only if polybar is installed.
```

This structure keeps the setup portable. The public config explains the workflow; local files handle the private machine details.
