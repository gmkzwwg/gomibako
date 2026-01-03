---
category: Notes
title: Build Efficient working Environment with Manjaro and i3wm
tags: Linux
---

Note: Official Manjaro i3wm images are now available from the official website.

## Download Manjaro and Create a Bootable USB Drive

1. Download Manjaro: [Official Mirrors](https://manjaro.org/downloads/official/xfce/)
2. Download Rufus: [Official Download](https://rufus.ie/en_US/)
3. Insert the USB drive and launch Rufus.
4. Select the target device under the **Device** option.
5. Select the downloaded ISO image under the **Boot selection** option.
6. Set the **Partition scheme** to MBR (default).

## Install Manjaro

1. Insert the USB drive, start the computer, and enter the **BIOS** before the system boots.
2. Change the **OS Type** in the Boot tab to **Legacy OS**.
3. Open **Hard Drive BBS Priorities** and set the bootable USB drive as the primary boot option.
4. Save changes and restart. Select **Boot With Open Source Drivers** to enter the Manjaro Live CD environment.
5. Select **Launch Installer** to open the installation wizard.
6. Select your current **Location**.
7. Select **English US - Default** for the keyboard layout.
8. Select **Manual Partitioning**.
   1. Create a new **MBR Partition Table**.
   2. Create a **/boot** partition for system boot files (File system: **ext4**).
   3. Create a **/** (root) partition (File system: **ext4**).
   4. Create a **/home** partition (File system: **ext4**).
   5. If RAM is less than 8GB, create a **swap** partition (File system: **linuxswap**).
9. Set the **Boot loader location** to the Master Boot Record (MBR) of the hard drive.
10. Set up your **Username** and **Password**.
11. Confirm the installation summary and begin the Manjaro installation.
12. Once finished, restart the system and remove the USB drive.


## Comparisions

### Manjaro vs. Other Distributions

| Feature | Manjaro (Arch-based) | Traditional (Ubuntu/Fedora) | Pure Arch Linux |
| --- | --- | --- | --- |
| **Release Model** | **Rolling Release** (Install once, update forever) | **Point Release** (Major upgrades every 6–12 months) | **Rolling Release** (Bleeding edge) |
| **Installation** | **Easy** (Graphical installer) | **Easy** (Graphical installer) | **Difficult** (Command line) |
| **Software Age** | **New** (Tested for ~2 weeks) | **Older** (Stable but fixed) | **Newest** (Instant updates) |
| **Software Source** | **Official + AUR** (Huge library) | **Official + PPA/Snap/Flatpak** | **Official + AUR** |
| **Hardware Setup** | **Auto-detects** drivers (MHWD) | Good, but often manual for Nvidia | Completely manual |

### Pros and Cons of Manjaro

**Advantages**

* **The AUR (Arch User Repository):** Access to almost every Linux application imaginable without searching for external websites or PPAs.
* **Always Up-to-Date:** You get the latest versions of GNOME, Plasma, and the Linux kernel much faster than on Ubuntu or Debian.
* **No "Reinstalling":** Since it is a rolling release, you never have to "reinstall" the OS to get the next major version.
* **Hardware Manager (MHWD):** Excellent at automatically identifying and installing the correct proprietary drivers (especially for Nvidia cards).

**Disadvantages**

* **Stability Risks:** Because software is new, updates can occasionally break system components (though Manjaro tests updates more than Arch).
* **Maintenance Required:** You need to check the [Manjaro Forums](https://forum.manjaro.org/) during major updates to see if manual intervention is required.
* **"The Manjaro Delay":** Manjaro holds back Arch packages for about two weeks to test them, which can sometimes cause compatibility issues with AUR packages that expect the absolute newest libraries.

### i3wm as a Windows Manager

| Category                                    | i3wm                                                              | KDE Plasma                                              | Windows                                                 | macOS                                                              |
| ------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| Primary interaction style                   | Keyboard-first; you drive everything with shortcuts               | Keyboard + mouse balanced; highly customizable          | Mouse-first with strong keyboard helpers                | Trackpad/mouse-first with strong keyboard helpers                  |
| Window organization                         | True tiling as the default; layouts are consistent and repeatable | Traditional desktop with optional tiling-like behavior  | Traditional desktop with Snap for quick layouts         | Traditional desktop with built-in tiling/splitting                 |
| Speed for multitasking                      | Very high once learned (fast context switching)                   | High (many workflows supported)                         | High for common workflows (Snap + Task View)            | High for common workflows (Mission Control + tiling)               |
| Learning curve                              | Steep initially                                                   | Moderate                                                | Low                                                     | Low–moderate                                                       |
| Customization (workflow, look & feel)       | Very high (workflow-first)                                        | Very high (both workflow and appearance)                | Medium (some system limits; more via third-party tools) | Medium (more constrained; many rely on third-party tools)          |
| “Out of the box” completeness               | Minimal; you build your workflow habits around it                 | Very complete desktop experience                        | Very complete                                           | Very complete                                                      |
| Best built-in support for multiple monitors | Good when you standardize your workflow                           | Very good; lots of UI controls                          | Very good; strong defaults                              | Good; strongest with Apple ecosystem workflows                     |
| Workspaces / virtual desktops               | Central to daily use; extremely fast switching                    | Strong support                                          | Strong support                                          | Strong support                                                     |
| App compatibility / “things just work”      | Good for typical Linux apps; some friction possible               | Very good on Linux                                      | Excellent                                               | Excellent (especially within Apple ecosystem)                      |
| Best for focused deep work                  | Excellent (low distraction, consistent layout)                    | Very good (can be made focused)                         | Good (more notifications/UI noise by default)           | Good (polished, but can be distractible without tuning)            |
| Best for creative/pro media ecosystems      | Depends on Linux toolchain                                        | Better than i3 if you want a full desktop on Linux      | Very strong                                             | Very strong (especially audio/video and Apple pro apps)            |
| Ideal user profile                          | Users who want maximum workflow control and keyboard efficiency   | Users who want control without giving up a full desktop | Users who want broad software support and familiar UX   | Users who want polished UX and tight hardware/software integration |

## Configure Manjaro Mirrors

### pacman Mirrorlist

1. Automatically rank and set the fastest mirrors.
**

```bash
sudo pacman-mirrors -i -c China -m rank
```

1. Edit `/etc/pacman.conf`: add Archlinuxcn image.

```bash
[archlinuxcn]
SigLevel = Never
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

3. Update keyring and all packages.

```bash
sudo pacman -Syy && sudo pacman -S archlinuxcn-keyring manjaro-keyring
sudo pacman-key --populate archlinuxcn manjaro
sudo pacman-key --refresh-keys
sudo pacman -Syyu
```
### Config `flatpak` Mirror Source

```bash
## official source
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
## sjtu source
flatpak remote-modify flathub --url=https://mirror.sjtu.edu.cn/flathub
```

## Install Utilities


```bash
# Utilities
sudo pacman -S python3 python-pip ruby cloc coq sbcl ghc stack idris agda / # Programming
i3-wm ibus ibus-libpinyin redshift nmon tldr arandr trojan proxychains net-tools calibre / # Utilities
nautilus  alacritty  fragments dolphin emacstexmacs code obs kdenlive blender/ # Productivity
# Fonts
sudo pacman -S otf-fira-mono otf-fira-sans ttf-fira-code noto-fonts-cjk adobe-source-han-sans-cn-fonts adobe-source-han-serif-cn-fonts wqy-bitmapfont wqy-microhei wqy-microhei-lite wqy-zenhei
# AUR
yay -S google-chrome lyx ttf-ms-fonts
# pip 
pip install cheat
# gem
gem install bundler jekyll jekyll-sitemap jekyll-feed jekyll-seo-tag jekyll-mermaid
```

Software Descriptions
  - net-tools: Includes the netstat networking utility.
  - fragments: A BitTorrent (BT) download client.
  - arandr: A GUI front-end for xrandr, used for managing monitors and screen resolutions under i3wm.
  - cloc: A utility for counting lines of code in various programming languages.
  - tldr / cheat: Command-line cheat sheets and documentation tools that provide simplified, practical examples.

### troubleshooting "Dependency conflict occurred during installation: exists in filesystem"


```bash
[PACKAGE_NAME]: [FILE_PATH] exists in filesystem
Errors occurred, no packages were upgraded.
```

This occurs because different software packages depend on the same dependency from different sources. You can resolve this by overwriting the files. Following command may help:

```bash
sudo pacman -S [PCKAGE_NAME] --overwrite /PATH/TO/FILE/*
```

## Adjusting System Time

By default, the Linux **Real-time Clock (RTC)** is set to **Coordinated Universal Time (UTC)**, which is the time at the zero meridian. The system time is then calculated by adding the timezone offset.

While Linux is running, the **system time** and **hardware time** operate asynchronously and independently. The hardware time is maintained by the BIOS battery, whereas the system time is driven by CPU ticks.

In a dual-boot setup, **Windows** treats the BIOS time as **Local Time**, while **Linux** treats it as **UTC**. Since Linux adds the timezone offset based on this reference, it results in the timezone being applied twice, causing an incorrect time display.

```bash
# Check if Local Time, UTC, and Timezone are correct
timedatectl

# Check Hardware Time
sudo hwclock --show

# Check System Time
date

# Synchronize time from a server using ntpdate
ntpdate [-nv] [NTP IP/hostname]
# sudo ntpdate 0.cn.pool.ntp.org

# Write system time to hardware clock and verify
sudo hwclock -w
sudo hwclock --show

```

> **Note:** Synchronizing time with `ntpdate` can cause "time jumps," which may affect time-sensitive programs and services. In such cases, using the `ntpd` service is recommended.

> **Tip:** When using **ChatGPT**, if there is a significant discrepancy between your system time and the actual time, you may encounter a **"Your connection is not private"** error.

---

## Configuring the i3-wm Window Manager

1. Download the **i3wm-themer** themes.

```bash
cd ~/.config/ && mkdir i3 && cd
git clone https://github.com/unix121/i3wm-themer && cd i3wm-themer
```

1. Install requirements.

```bash
cd i3wm-themer && pip install -r requirements.txt
./install_arch.sh
```

1. Copy polybar scripts.

```bash
cp -r scripts/* /home/$USER/.config/polybar/
```

1. Install and themes and switch to one of them.

```bash
python3 i3wm-themer.py --config config.yaml --install defaults/
python3 i3wm-themer.py --config config.yaml --load themes/002.json # alternatives can be 000.json - 012.json
```

1. Edit `/home/$USER/.config/i3/config`: config i3-wm.

```bash
# [Modified] keybinding of fuction key
set $mod Mod4
# [Modified] Window kill command
bindsym $mod+Escape kill

# [Modified] change focus
bindsym $mod+j focus left
bindsym $mod+k focus down
bindsym $mod+i focus up
bindsym $mod+l focus right

# [Modified] move focused window
bindsym $mod+Shift+j move left
bindsym $mod+Shift+k move down
bindsym $mod+Shift+i move up
bindsym $mod+Shift+l move right

# [Appended] Ibus daemon.
exec --no-startup-id export GTK_IM_MODULE=ibus
exec --no-startup-id export XMODIFIERS=@im=ibus
exec --no-startup-id export QT_IM_MODULE=ibus
exec --no-startup-id ibus-daemon --xim -d -r
exec --no-startup-id trojan
exec --no-startup-id redshift -O 5000

# [Modified] Gaps
gaps inner 0
gaps outer 0

smart_gaps on
```
6. Add the following content to the `~/.Xresources` file to adjust the **DPI** for i3wm:

```bash
Xft.dpi: 144
```

Common Display DPI Reference Table

| Screen Size | Resolution | Type | Native DPI | Recommended DPI |
| --- | --- | --- | --- | --- |
| **13.3"** | 1920 x 1080 | Laptop | 166 | **144 - 168** |
| **14.0"** | 1920 x 1080 | Laptop | 157 | **144 - 157** |
| **15.6"** | 1920 x 1080 | Laptop | 141 | **120 - 144** |
| **15.6"** | 3840 x 2160 | Laptop 4K | 282 | **240 - 288** |
| **24"** | 1920 x 1080 | Desktop | 92 | **96** |
| **24"** | 2560 x 1440 | Desktop 2K | 122 | **120** |
| **27"** | 2560 x 1440 | Desktop 2K | 109 | **109 - 120** |
| **27"** | 3840 x 2160 | Desktop 4K | 163 | **144 - 168** |
| **32"** | 3840 x 2160 | Desktop 4K | 138 | **144** |

7. Use the shortcut **Mod + D** to run `rofi-theme-selector` and choose a theme for **Rofi**. Press **Alt + A** to apply your selection.

## Configuring Chinese Input Method

1. After installing `ibus` and `ibus-libpinyin`, launch `ibus-setup` to add the Chinese input method: **Input Method** -> **Add** -> **Chinese** -> **Intelligent Pinyin**.
2. Add the `ibus-daemon` to your startup applications and configure the environment parameters. Append the following lines to the end of your `~/.config/i3/config` file:

```bash
exec --no-startup-id export GTK_IM_MODULE=ibus
exec --no-startup-id export XMODIFIERS=@im=ibus
exec --no-startup-id export QT_IM_MODULE=ibus
exec --no-startup-id ibus-daemon --xim -d -r
```

### Using iBus Input Method in Emacs

Add the following content to your ~/.xprofile file:

```bash
export LC_CTYPE=zh_CN.UTF-8
export XMODIFIERS=@im=ibus
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
ibus-daemon -drx
```

### Enabling Greek Letter Input for ibus-libpinyin

**[Option 1] Use Greek Letter Input Mode**

1. Open `ibus-setup`, navigate to the **Input Method** tab, select **Intelligent Pinyin**, and click **Preferences**.
2. In the pop-up window, select the **User Data** tab and click **Edit User Lua Script**. Add the following content to the opened file:

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

3. Enter `ibus restart` to restart iBus.
4. When using iBus, press the keys in the following sequence: `i`, `Space`, `g`, `a` to enable Greek letter input mode, then select the Greek letter according to the table above.

**[Option 2] Add Greek letters and other symbols to the candidate words**


## Configuring Network Proxy (Magic Crossing)

1. Modify the `/etc/trojan/config.json` file to configure **Trojan**. The configuration text is provided by your service provider.
2. Modify the `/etc/proxychains.conf` file to configure **Proxychains**. Change the last line to:

```bash
sock5 127.0.0.1 1080
```

3. Set a temporary proxy for Chrome to access the Web Store:

```bash
google-chrome-stable --proxy-server=socks5://127.0.0.1:1080

```

4. Visit the Chrome Web Store, search for, and install **ZeroOmega**.
5. Open the ZeroOmega settings interface and import your configuration file.
6. Set **Trojan** to start automatically on boot. Append the following to the end of your `~/.config/i3/config` file:

```bash
exec --no-startup-id trojan

```

## Configuring Git

1. Configure the Git proxy.

```bash
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
```

2. Set up accounts.

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

3. Persist Git Credentials

```bash
# Store credentials in a file on disk (Permanent)
git config --global credential.helper store

# Alternatively, cache credentials in memory for a specific duration (e.g., 1 hour)
git config --global credential.helper 'cache --timeout=3600'有
```

## Configuring Visual Studio Code

1. Install the following extensions: **Awesome Emacs Keymap**, **Markdown All in One**, **Prettier**, and **Org Mode**.
2. Add your preferred fonts under the **Editor: Font Family** option in Preferences.
3. To enable ligatures for **Fira Code**, set the value of `"editor.fontLigatures"` to `true` in your `settings.json`.

## Configuring Alacritty

1. Create a new file at `~/.config/alacritty/alacritty.yml` and add the following content:

```bash
# XTerm's default colors
font:
  normal:
    family: monospace
    style: Regular

  bold:
    family: monospace
    style: Bold

  italic:
    family: monospace
    style: Italic

  bold_italic:
    family: monospace
    style: Bold Italic

  size: 18

env:
  WINIT_X11_SCALE_FACTOR: "1.0"

colors:
  # Default colors
  primary:
    background: '0x000000'
    foreground: '0xffffff'
  # Normal colors
  normal:
    black:   '0x000000'
    red:     '0xcd0000'
    green:   '0x00cd00'
    yellow:  '0xcdcd00'
    blue:    '0x0000ee'
    magenta: '0xcd00cd'
    cyan:    '0x00cdcd'
    white:   '0xe5e5e5'

  # Bright colors
  bright:
    black:   '0x7f7f7f'
    red:     '0xff0000'
    green:   '0x00ff00'
    yellow:  '0xffff00'
    blue:    '0x5c5cff'
    magenta: '0xff00ff'
    cyan:    '0x00ffff'
    white:   '0xffffff'
```

## Sharing File - Samba

1. Edit `/etc/samba/smb.conf`: configuring samba.

```bash
[global]
workgroup = ArbitraryGroup
server string = Samba Server Version %v
log file = /var/log/samba/log.%m
max log size = 50
security = USER
passdb backend = tdbsam

[database]
comment = passwd
path = /home/share
public = no
writable = yes 
```

Create account for samba:

```bash
sudo useradd samba
sudo passwd samba
id samba
pdbedit -a -u samba
```

Create sharing folder for samba:

```bash
mkdir /home/databases
sudo systemctl restart smb
```

## Eye Care Software - Redshift

Start **Redshift** (or add it to your i3wm configuration file):

```bash
redshift -O 5000

```

The number controls the **color temperature**; the higher the value, the warmer (more yellow) the screen becomes.

**Note:** Actually, in Redshift, lower values (e.g., 3500K) are warmer/more yellow, while higher values (e.g., 6500K) are cooler/bluer.

To remove/reset Redshift:

```bash
redshift -x
```

## Nvidia Graphics Drivers (Optional)

```bash
# Check installed drivers
inxi -G

# Automatically install official Nvidia proprietary drivers
sudo mhwd -a pci nonfree 0300
# Restart the computer after installation is complete

# List installed drivers
mhwd -li

# Change resolution and refresh rate
sudo nvidia-settings
# Make changes in the "X Server Display Configuration" page, then save the configuration to /etc/X11/mhwd.d/nvidia.conf

# Apply the changes
sudo mhwd-gpu --setmod nvidia --setxorg /etc/X11/mhwd.d/nvidia.conf

```

If you have dual graphics cards (Hybrid), the installed hybrid drivers may not support output from the discrete GPU. Manually install the standalone Nvidia driver:

```bash
sudo mhwd -i pci video-nvidia

```

Reboot to apply changes.

## Mathematics: Matlab

1. Download, install, and crack Matlab 2018.


```bash
# Download Matlab2018R by BaiduNetDisk
sudo mkdir /mnt/matlab
sudo mount -o loop R2018b_glnxa64_dvd1.iso
sudo /mnt/matlab/install
# Key: 09806-07443-53955-64350-21751-41297
sudo umount R2018b_glnxa64_dvd1.iso && sudo mount -o loop R2018b_glnxa64_dvd2.iso
# Crack
unrar e Crack.rar Crack && cd Crack
sudo cp -f license_standalone.lic /usr/local/MATLAB/R2018a/licenses
sudo cp -rf R2018a/* /usr/local/MATLAB/R2018a/
sudo chmod -R 777 /usr/local/MATLAB/
# Run MATLAB
sh /usr/local/MATLAB/R2018a/bin/matlab
# Add Alias
nano ~/.bash_profile
# [Appended] MATLAB shortcut
alias matlab="sh /usr/local/MATLAB/R2018a/bin/matlab"
```

## Configuring Mozart Oz

1. Installing Oz.

```bash
# Mozart 1.4
# Resolve dependencies
sudo apt-get install flex bison tcl8.5 tcl8.5-developing lzip libx11-6:i386 libgmp10:i386 lib32stdc++6
wget https://gmplib.org/download/gmp/gmp-6.1.2.tar.lz
lzip -d gmp-6.1.2.tar.lz
tar -xvf gmp-6.1.2.tar
cd gmp-6.1.2
./configure
make
sudo make install
# install mozart 1.4 in amd64
sudo alien -g mozart-1.4.0.20080704-16189.i386.rpm
cd mozart-1.4.0.20080704
vi debian/control
# Add "amd64" in the Architecture field. The file may look like:
Architecture: i386, amd64
# Make .deb package
sudo debian/rules binary
# Install binary files:
sudo dpkg -i mozart-1.4.0.20080704-16189.i386.deb
# Append codes below to Emacs config
```

2. Configure Emacs:

```lisp
(or (getenv "OZHOME")
    (setenv "OZHOME"
            "/usr/local/oz"))   ; or wherever Mozart is installed
(setenv "PATH" (concat (getenv "OZHOME") "/bin:" (getenv "PATH")))

(setq load-path (cons (concat (getenv "OZHOME") "/share/elisp")
                      load-path))

(setq auto-mode-alist
      (append '(("\\.oz\\'" . oz-mode)
                ("\\.ozg\\'" . oz-gump-mode))
              auto-mode-alist))

(autoload 'run-oz "oz" "" t)
(autoload 'oz-mode "oz" "" t)
(autoload 'oz-gump-mode "oz" "" t)
(autoload 'oz-new-buffer "oz" "" t)
```

## Intsall `ttf` Font Files

Copy `ttf` files:

```shell
/home/yourname/.fonts/ # for personal fonts
/usr/share/fonts/ # for those that are used system-wide
```

Run:

```shell
fc-cache -fv
```

## Trouble shooting

### OBS Startup Failures and VLC Decoder Errors

OBS Error Code:

```bash
debug: Found portal inhibitor
debug: Attempted path: share/obs/obs-studio/locale/en-US.ini
debug: Attempted path: /usr/share/obs/obs-studio/locale/en-US.ini
debug: Attempted path: share/obs/obs-studio/locale.ini
debug: Attempted path: /usr/share/obs/obs-studio/locale.ini
debug: Attempted path: share/obs/obs-studio/themes/Yami.qss
debug: Attempted path: /usr/share/obs/obs-studio/themes/Yami.qss
info: Using EGL/X11
info: CPU Name: AMD Ryzen 9 7950X 16-Core Processor
info: CPU Speed: 3455.782MHz
info: Physical Cores: 16, Logical Cores: 32
info: Physical Memory: 63426MB Total, 53403MB Free
info: Kernel Version: Linux 6.1.31-2-MANJARO
info: Distribution: "Manjaro Linux" Unknown
info: Session Type: x11
info: Window System: X11.0, Vendor: The X.Org Foundation, Version: 1.21.1
info: Qt Version: 6.5.0 (runtime), 6.5.0 (compiled)
info: Portable mode: false
qt.core.qmetaobject.connectslotsbyname: QMetaObject::connectSlotsByName: No matching signal for on_tbar_position_valueChanged(int)
info: OBS 29.0.2-5 (linux)
info: ---------------------------------
info: ---------------------------------
info: audio settings reset:
	samples per sec: 48000
	speakers:        2
	max buffering:   960 milliseconds
	buffering type:  dynamically increasing
info: ---------------------------------
info: Initializing OpenGL...
info: Loading up OpenGL on adapter NVIDIA Corporation NVIDIA GeForce RTX 4090/PCIe/SSE2
info: OpenGL loaded successfully, version 3.3.0 NVIDIA 530.41.03, shading language 3.30 NVIDIA via Cg compiler
info: ---------------------------------
info: video settings reset:
	base resolution:   1920x1080
	output resolution: 1280x720
	downscale filter:  Bicubic
	fps:               30/1
	format:            NV12
	YUV mode:          Rec. 709/Partial
info: NV12 texture support not available
info: P010 texture support not available
info: Audio monitoring device:
	name: Default
	id: default
info: ---------------------------------
warning: Failed to load 'en-US' text for module: 'decklink-captions.so'
warning: Failed to load 'en-US' text for module: 'decklink-output-ui.so'
libDeckLinkAPI.so: cannot open shared object file: No such file or directory
warning: A DeckLink iterator could not be created.  The DeckLink drivers may not be installed
warning: Failed to initialize module 'decklink.so'
info: [pipewire] No captures available
warning: v4l2loopback not installed, virtual camera disabled
info: NVENC supported
info: VAAPI: API version 1.18
Segmentation fault (core dumped)
```

This may be because OBS no longer supports `libva-vdpau-driver`.

The solution is to replace `libva-vdpau-driver` with `nvidia-vaapi-driver`.

```bash
sudo pacman -R libva-vdpau-driver
sudo pacman -S nvidia-vaapi-driver

```

## VirtualBox Virtual Machine

Check the kernel version:

```bash
mhwd-kernel -li

```

Install VirtualBox according to your specific version:

```bash
# Example for kernel version linux61
sudo pacman -Syu virtualbox linux61-virtualbox-host-modules
sudo vboxreload

```

Verify the installation:

```bash
vboxmanage --version

```

If you are unable to download `VBoxGuestAdditions_x.x.x.iso` due to network issues, you can download the ISO image for your version here:

[http://download.virtualbox.org/virtualbox/7.0.8/](http://download.virtualbox.org/virtualbox/7.0.8/)

## SSH

```bash
sudo pacman -S openssh
sudo systemctl status sshd.service  # default=disabled
sudo systemctl enable sshd.service
sudo systemctl start sshd.service

```

## Performance Monitoring: Prometheus + Grafana

PLACEHOLDER.