---
title: Best Windows 11 Tweak Tools
categories: Notes
subclass: Operating Tools
---

## Quick Reference

This is a curated Windows 11 toolkit for setup, optimization, productivity, UI customization, package management, monitoring, cleanup, and troubleshooting.

**Note:** Do not stack multiple deep system-tweak tools blindly. Create a restore point before using debloaters, shell patchers, privacy scripts, or one-line PowerShell installers.

| Category | Tool | Function | Repository / Download | Install / Run |
| --- | --- | --- | --- | --- |
| Package Manager | **WinGet** | Official Windows Package Manager CLI. Useful for installing and updating apps from terminal. | [GitHub](https://github.com/microsoft/winget-cli) / [Docs](https://learn.microsoft.com/en-us/windows/package-manager/winget/) | Built into modern Windows 10/11; update via App Installer |
| Package Manager GUI | **UniGetUI** | GUI frontend for `WinGet`, `Scoop`, `Chocolatey`, `pip`, `npm`, `.NET Tool`, PowerShell Gallery, etc. | [GitHub](https://github.com/marticliment/UniGetUI) / [Releases](https://github.com/marticliment/UniGetUI/releases) | Download installer or install via package manager |
| Package Manager | **Scoop** | Command-line installer focused on portable/dev tools; installs into user directory and avoids many UAC prompts. | [Website](https://scoop.sh/) / [GitHub](https://github.com/ScoopInstaller/Scoop) | Follow official PowerShell install command |
| Package Installer | **Ninite** | One-click installer/updater for common apps; silently installs selected apps and rejects bundled junk. | [Website](https://ninite.com/) | Generate custom installer from official site |
| Auto Update | **Winget-AutoUpdate** | Automatically updates apps installed through `winget`; supports scheduled updates and allow/block lists. | [GitHub](https://github.com/Romanitho/Winget-AutoUpdate) / [Releases](https://github.com/Romanitho/Winget-AutoUpdate/releases) | Download from GitHub releases |
| Windows Utilities | **Microsoft PowerToys** | Official Microsoft toolkit: FancyZones, launcher, keyboard remapping, Always on Top, file tools, image tools, mouse tools, etc. | [Docs](https://learn.microsoft.com/en-us/windows/powertoys/install) / [GitHub](https://github.com/microsoft/PowerToys) / [Releases](https://github.com/microsoft/PowerToys/releases) | `winget install --id Microsoft.PowerToys --source winget` |
| Developer Tools | **DevToys** | Developer “Swiss Army knife”: JSON formatting, text tools, encoders/decoders, converters, hash tools, RegExp tools, etc. | [Website](https://devtoys.app/) / [GitHub](https://github.com/DevToys-app/DevToys) | `winget install DevToys-app.DevToys` |
| Terminal | **Windows Terminal** | Modern Microsoft terminal with tabs, themes, rich text, configurability, and command-line workflow improvements. | [GitHub](https://github.com/microsoft/terminal) / [Releases](https://github.com/microsoft/terminal/releases) | Microsoft Store / GitHub / `winget` |
| System Toolkit | **Sysinternals Suite** | Microsoft’s advanced diagnostic toolkit for processes, startup items, handles, networking, disk, registry, and troubleshooting. | [Microsoft Docs](https://learn.microsoft.com/en-us/sysinternals/) / [Suite Download](https://learn.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite) | Download from Microsoft Sysinternals |
| Debloat / Tweak | **Winhance** | Open-source Windows 10/11 optimization tool for debloating, privacy toggles, default app removal, customization, and setup automation. | [GitHub](https://github.com/memstechtips/Winhance) / [Releases](https://github.com/memstechtips/Winhance/releases) | `irm "https://get.winhance.net" \| iex` |
| Debloat / Tweak | **Chris Titus Tech WinUtil** | All-in-one Windows utility for app install, debloat, tweaks, configuration, update fixes, and setup automation. | [GitHub](https://github.com/christitustech/winutil) / [Website](https://christitus.com/windows-tool/) | `irm christitus.com/win \| iex` |
| Debloat / Tweak | **Win11Debloat** | Lightweight PowerShell script for removing preinstalled apps, disabling telemetry, and cleaning intrusive Windows UI elements. | [GitHub](https://github.com/Raphire/Win11Debloat) / [Docs](https://github.com/Raphire/Win11Debloat#readme) | `& ([scriptblock]::Create((irm "https://debloat.raphi.re/")))` |
| Advanced Tweak | **Sophia Script** | Advanced open-source PowerShell module with many granular Windows configuration functions. | [GitHub](https://github.com/farag2/Sophia-Script-for-Windows) / [Releases](https://github.com/farag2/Sophia-Script-for-Windows/releases) | Download release; edit preset before running |
| Advanced Tweak GUI | **SophiApp** | GUI version of Sophia-style Windows fine-tuning; exposes many tweaks through a modern interface. | [GitHub](https://github.com/Sophia-Community/SophiApp) / [Releases](https://github.com/Sophia-Community/SophiApp/releases) | Download from GitHub releases |
| Privacy | **privacy.sexy** | Open-source privacy/security script generator for Windows, macOS, and Linux. Lets users inspect generated scripts. | [Website](https://privacy.sexy/) / [GitHub](https://github.com/undergroundwires/privacy.sexy) | Generate script from official site |
| Privacy | **O&O ShutUp10++** | Portable privacy-control panel for Windows 10/11; toggles telemetry, privacy, app permissions, and system data collection settings. | [Website](https://www.oo-software.com/en/shutup10) | Download portable executable |
| Registry / UI Tweak | **Winaero Tweaker** | GUI utility for hidden Windows settings, Explorer behavior, classic UI options, taskbar/context menu tweaks, and system behavior changes. | [Website](https://winaero.com/winaero-tweaker/) | Download installer/portable package |
| UI / Shell Mods | **Windhawk** | Modular customization marketplace for Windows and apps; useful for taskbar, Start menu, Explorer, and app-specific tweaks. | [Website](https://windhawk.net/) / [GitHub](https://github.com/ramensoftware/windhawk) | Download from official site |
| UI / Shell Mods | **ExplorerPatcher** | Restores or customizes legacy Windows shell behavior, including taskbar, Start menu, and File Explorer-related behavior. | [GitHub](https://github.com/valinet/ExplorerPatcher) / [Releases](https://github.com/valinet/ExplorerPatcher/releases) | Download from GitHub releases |
| UI / Shell Mods | **StartAllBack** | Paid Windows 11 shell customization tool for restoring/improving taskbar, Start menu, context menus, Explorer, and classic UI behavior. | [Website](https://www.startallback.com/) | Download trial / purchase |
| UI / Shell Mods | **Start11** | Paid Start menu and taskbar customization tool from Stardock; supports multiple Start menu styles and Windows 10/11 customization. | [Website](https://www.stardock.com/products/start11/) | Download trial / purchase |
| UI / Tiling Workflow | **Seelen UI** | Desktop environment overlay for Windows with dock, launcher, widgets, tiling window manager features, and virtual desktop workflow. | [GitHub](https://github.com/eythaann/Seelen-UI) / [Releases](https://github.com/eythaann/Seelen-UI/releases) | `winget install --id Seelen.SeelenUI` |
| Taskbar Style | **TranslucentTB** | Lightweight taskbar transparency/acrylic/blur styling tool for Windows 10/11. | [GitHub](https://github.com/TranslucentTB/TranslucentTB) / [Releases](https://github.com/TranslucentTB/TranslucentTB/releases) | Microsoft Store / GitHub releases |
| Window Visuals | **Mica For Everyone** | Applies Windows 11 Mica/Acrylic-style backdrop effects to Win32 app title bars. | [GitHub](https://github.com/MicaForEveryone/MicaForEveryone) / [Releases](https://github.com/MicaForEveryone/MicaForEveryone/releases) | Microsoft Store / GitHub releases |
| Window Visuals | **DWMBlurGlass** | Adds custom blur/glass effects to global Windows title bars and DWM rendering style. | [GitHub](https://github.com/Maplespe/DWMBlurGlass) / [Releases](https://github.com/Maplespe/DWMBlurGlass/releases) | GitHub releases |
| Theme Switching | **Auto Dark Mode** | Automatically switches Windows 10/11 between light and dark themes by time, schedule, or conditions. | [GitHub](https://github.com/AutoDarkMode/Windows-Auto-Night-Mode) / [Releases](https://github.com/AutoDarkMode/Windows-Auto-Night-Mode/releases) | Microsoft Store / GitHub releases |
| Launcher | **Flow Launcher** | Fast Windows app/file launcher with plugin ecosystem; can integrate search, calculations, plugins, and app launching. | [Website](https://www.flowlauncher.com/) / [GitHub](https://github.com/Flow-Launcher/Flow.Launcher) / [Releases](https://github.com/Flow-Launcher/Flow.Launcher/releases) | `winget install "Flow Launcher"` |
| File Search | **Everything** | Extremely fast filename-based search engine for Windows; much faster than Windows Search for local file lookup. | [Website](https://www.voidtools.com/) / [Download](https://www.voidtools.com/downloads/) | Download installer/portable version |
| File Preview | **QuickLook** | Adds macOS-like Spacebar file preview to Windows Explorer. | [GitHub](https://github.com/QL-Win/QuickLook) / [Releases](https://github.com/QL-Win/QuickLook/releases) | Microsoft Store / GitHub releases |
| File Manager | **Files** | Modern open-source Windows file manager with tabs, modern UI, previews, and workflow-focused file management. | [Website](https://files.community/) / [GitHub](https://github.com/files-community/Files) | Microsoft Store / GitHub |
| Clipboard | **Ditto** | Clipboard manager that saves clipboard history and supports text, images, HTML, and custom formats. | [Website](https://sabrogden.github.io/Ditto/) / [GitHub](https://github.com/sabrogden/Ditto) | Download installer / Microsoft Store |
| Audio | **EarTrumpet** | Better Windows volume mixer with per-app volume and output-device control from the tray. | [Website](https://eartrumpet.app/) / [GitHub](https://github.com/File-New-Project/EarTrumpet) | Microsoft Store / Chocolatey / GitHub |
| Hardware Monitor | **LiteMonitor** | Lightweight customizable Windows desktop/taskbar hardware monitor; monitors CPU, GPU, memory, disk, network, FPS, plugins, and memory cleanup. | [GitHub](https://github.com/Diorser/LiteMonitor) / [Releases](https://github.com/Diorser/LiteMonitor/releases) | GitHub releases / official site |
| Hardware Monitor | **HWiNFO** | Professional hardware information, monitoring, diagnostics, and reporting tool for Windows. | [Website](https://www.hwinfo.com/) / [Download](https://www.hwinfo.com/download/) | Installer or portable download |
| Fan Control | **Fan Control** | Highly customizable Windows fan-control utility with fan curves and sensor-based control. | [GitHub](https://github.com/Rem0o/FanControl.Releases) / [Releases](https://github.com/Rem0o/FanControl.Releases/releases) | GitHub releases |
| Hardware Toolkit | **图吧工具箱 / tbtool** | Chinese PC hardware testing and diagnostic toolbox; useful for DIY PCs, second-hand hardware checks, and benchmark collections. | [Website](https://www.tbtool.cn/) | Download from official website |
| Uninstaller | **Bulk Crap Uninstaller** | Bulk uninstall tool that removes many apps, detects leftovers, orphaned apps, and hidden uninstall entries. | [Website](https://www.bcuninstaller.com/) / [GitHub](https://github.com/Klocman/Bulk-Crap-Uninstaller) / [Releases](https://github.com/Klocman/Bulk-Crap-Uninstaller/releases) | Installer / portable |
| Disk Cleanup | **BleachBit** | Open-source disk cleaner and privacy cleaner for Windows/Linux; removes junk, cache, logs, and can shred files. | [Website](https://www.bleachbit.org/) / [GitHub](https://github.com/bleachbit/bleachbit) | Download from official site |
| Windows Install USB | **Rufus** | Creates bootable USB drives and can customize Windows installation media, including local-account-oriented setup options. | [Website](https://rufus.ie/) / [GitHub](https://github.com/pbatard/rufus) / [Releases](https://github.com/pbatard/rufus/releases) | Download portable executable |
| Windows Setup / OOBE | **FlyOOBE** | Windows 11 setup/upgrade helper for OOBE customization, upgrade checks, and bypass-style setup workflows. Use only official GitHub due to fake copies. | [GitHub](https://github.com/builtbybel/Flyoobe) / [Releases](https://github.com/builtbybel/Flyoobe/releases) | Download from official GitHub only |
| Legacy / Caution | **Optimizer** | Windows privacy/security optimizer; now archived/read-only, so not recommended for new setups unless needed for a specific legacy workflow. | [GitHub](https://github.com/hellzerg/optimizer) / [Releases](https://github.com/hellzerg/optimizer/releases) | Avoid for new installs |

## Practical Windows 11 Setup Combos

| Scenario | Recommended Tools |
| --- | --- |
| Clean daily-use setup | PowerToys + UniGetUI + Everything + QuickLook + Ditto |
| Developer workstation | Windows Terminal + DevToys + PowerToys + Flow Launcher + Scoop |
| Fresh reinstall | Rufus + UniGetUI + Ninite + PowerToys + WinGet |
| Debloat with caution | Winhance or Win11Debloat or Chris Titus WinUtil; choose one, not all |
| Privacy-focused setup | O&O ShutUp10++ + privacy.sexy, but review every option manually |
| i3wm-like Windows workflow | Seelen UI + PowerToys FancyZones + Flow Launcher |
| Modern Windows UI | Windhawk + TranslucentTB + Mica For Everyone + Auto Dark Mode |
| Hardware monitoring | LiteMonitor + HWiNFO + Fan Control |
| Cleanup and uninstall | Bulk Crap Uninstaller + BleachBit |

## Notes

One-line PowerShell installers such as `irm ... | iex` execute remote code immediately. Use them only from official project pages, preferably after reading the repository.

For shell modification tools such as ExplorerPatcher, Windhawk, StartAllBack, DWMBlurGlass, and Seelen UI, Windows feature updates may break behavior temporarily. Keep installers and rollback options available.

For debloat tools, do not remove components blindly. Xbox, Microsoft Store, Edge WebView2, OneDrive, Widgets, Copilot, and telemetry-related services may be tied to other apps or enterprise policies.

## Windows 11 Installation-Time Troubleshooting

Windows 11 installation is stricter than older Windows versions. The official requirements include UEFI with Secure Boot capability, TPM 2.0, 4 GB RAM, 64 GB storage, and, for Windows 11 Home and Windows 11 Pro personal setup, internet connectivity plus a Microsoft account during initial setup. These requirements are version-sensitive, so older bypass methods may stop working on newer Windows 11 builds. 

### Create a More Flexible Installer with Rufus

For clean installs, the most practical approach is to prepare the installer before booting into Windows Setup. Rufus can create bootable Windows installation drives and its project explicitly lists support for creating Windows 11 installation drives for PCs without TPM or Secure Boot. 

When creating the USB installer, Rufus may show a **Windows User Experience** dialog. Depending on the ISO and Rufus version, useful options may include:

| Option | What It Solves |
| --- | --- |
| Remove requirement for online Microsoft account | Avoids being trapped at OOBE account setup |
| Remove TPM / Secure Boot / RAM requirement | Allows installation on unsupported or older machines |
| Create a local account | Predefines a local user during setup |
| Disable data collection options | Reduces first-boot setup prompts |
| Disable automatic BitLocker / device encryption behavior | Useful when reinstalling frequently or testing hardware |

**Tip:** Prefer Rufus-based preparation over relying on manual OOBE tricks. OOBE bypass commands are increasingly version-dependent.

### Local Account Setup During OOBE

Older Windows 11 builds allowed several manual workarounds during OOBE, such as killing **Network Connection Flow** or running:

```text
OOBE\BYPASSNRO
````

These methods should now be treated as unreliable. Microsoft has been removing known local-account and network-bypass paths from newer Windows 11 builds, especially Insider and recent setup flows. ([The Verge][1])

A registry-based method may still work on some builds:

```text
Shift + F10
regedit
```

Then create:

```text
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\OOBE
```

Add a `DWORD (32-bit)` value:

```text
BypassNRO = 1
```

Then restart OOBE:

```cmd
logoff
```

After rebooting, the **I don't have internet** option may appear.

**Warning:** This is build-dependent. For repeatable installations, configure the USB installer with Rufus instead of depending on OOBE behavior.

### If Windows Setup Says “This PC Can’t Run Windows 11”

Check the firmware first:

| Problem                   | Fix                                                                            |
| ------------------------- | ------------------------------------------------------------------------------ |
| TPM disabled              | Enable `TPM`, `fTPM`, or `Intel PTT` in BIOS                                   |
| Secure Boot disabled      | Enable Secure Boot if the machine supports it                                  |
| Legacy boot mode          | Switch to `UEFI` mode                                                          |
| MBR disk layout           | Convert or repartition as `GPT`                                                |
| Unsupported CPU           | Use supported hardware, or prepare installer with Rufus for testing/legacy use |
| Too little RAM or storage | Upgrade hardware or use a modified installer only for non-critical systems     |

Microsoft documents TPM 2.0 as required for Windows 11 and describes it as a security component used by Windows 11 security features. 

**Tip:** If Secure Boot cannot be enabled, check whether the boot mode is still set to `Legacy/CSM`. Secure Boot normally requires `UEFI`.

### If the Installer USB Does Not Boot

| Symptom                     | Possible Cause                                    | Fix                                                                   |
| --------------------------- | ------------------------------------------------- | --------------------------------------------------------------------- |
| USB does not appear in BIOS | Bad USB port, bad flash drive, or wrong boot mode | Try another USB port, preferably USB 2.0; recreate installer          |
| Boot loops back to BIOS     | Wrong partition scheme                            | Use `GPT + UEFI` for modern machines                                  |
| Black screen after boot     | GPU or display initialization issue               | Try another display output, disable CSM, or use another installer USB |
| Secure Boot blocks boot     | Installer or bootloader mismatch                  | Use Microsoft Media Creation Tool or recreate the USB with Rufus      |
| ISO copy fails on FAT32     | Large `install.wim` file                          | Use Rufus; it can handle UEFI bootable NTFS workflows                 |

Microsoft’s own installation-media guidance states that USB installation media can be used for clean installs and reinstallations, while Rufus is useful when more control over the USB creation process is needed. 

### If No Disk Appears During Installation

This usually happens on laptops or desktops using Intel RST, VMD, RAID mode, or unusual storage controllers.

| Cause                      | Fix                                                         |
| -------------------------- | ----------------------------------------------------------- |
| Intel RST / VMD enabled    | Disable `VMD` or switch storage mode to `AHCI` in BIOS      |
| RAID mode enabled          | Switch to `AHCI` unless hardware RAID is intentionally used |
| NVMe driver missing        | Load storage driver from motherboard/laptop vendor          |
| Disk contains old metadata | Clean the disk with `diskpart`                              |
| Wrong target disk          | Disconnect other disks before installing                    |

To wipe a target disk during setup:

```cmd
Shift + F10
diskpart
list disk
select disk <number>
clean
convert gpt
exit
```

**Warning:** `clean` erases the selected disk’s partition table. Disconnect unrelated drives before using it.

### If Windows Creates the Wrong Boot Partition

When multiple disks are installed, Windows Setup may place the EFI System Partition on a different disk from the Windows system disk.

Best practice:

```text
Disconnect all non-target disks before installing Windows.
Install Windows.
Reconnect the other disks after the first successful boot.
```

This avoids hidden boot dependency on another drive.

### If the Wrong Windows Edition Installs Automatically

Windows Setup may automatically choose an edition based on an embedded OEM key in BIOS.

To force edition selection, create this file on the USB installer:

```text
sources\ei.cfg
```

Example:

```ini
[EditionID]
Professional

[Channel]
Retail

[VL]
0
```

For Windows 11 Home:

```ini
[EditionID]
Core

[Channel]
Retail

[VL]
0
```

**Tip:** `Core` means Home edition. `Professional` means Pro edition.

### If Shift + F10 Does Not Open Command Prompt

Some laptops require the function layer:

```text
Shift + Fn + F10
```

If that still fails:

| Cause                            | Fix                                              |
| -------------------------------- | ------------------------------------------------ |
| Function keys locked             | Toggle `Fn Lock`                                 |
| Compact keyboard                 | Use an external USB keyboard                     |
| OOBE screen intercepts shortcuts | Try earlier in setup or after network page loads |
| VM keyboard mapping issue        | Use the VM console menu to send function keys    |

### If Network Is Missing During Setup

Some laptops have Wi-Fi or Ethernet chips without in-box drivers.

Options:

| Method                            | Use Case                           |
| --------------------------------- | ---------------------------------- |
| Use USB Ethernet adapter          | Fastest fix for missing Wi-Fi      |
| Load vendor driver during setup   | Useful for storage/network devices |
| Prepare local-account installer   | Avoid OOBE network trap            |
| Install offline, then add drivers | Works if OOBE can be completed     |

After installation, install chipset, Wi-Fi, Ethernet, GPU, and touchpad drivers from the motherboard or laptop vendor.

### If Windows Setup Gets Stuck at OOBE

Useful commands from `Shift + F10`:

```cmd
taskmgr
```

```cmd
control netconnections
```

```cmd
shutdown /r /t 0
```

```cmd
logoff
```

If OOBE repeatedly crashes or loops, the cleaner fix is usually to recreate the installer with a newer ISO and avoid keeping the machine connected to the network until the intended account path is ready.

### If Setup Fails After the First Reboot

| Symptom                       | Likely Cause                             | Fix                                                               |
| ----------------------------- | ---------------------------------------- | ----------------------------------------------------------------- |
| Reboots back into installer   | USB still first in boot order            | Remove USB or change boot priority                                |
| “Operating system not found”  | EFI partition missing or wrong disk used | Reinstall with only target disk connected                         |
| Blue screen during first boot | Storage driver or BIOS mode changed      | Revert storage mode or reinstall after setting AHCI/VMD correctly |
| Endless setup loop            | Corrupt installer or failed OOBE state   | Recreate USB installer and reinstall                              |

### If BitLocker or Device Encryption Starts Unexpectedly

On some Windows 11 systems, device encryption may be enabled automatically after setup, especially when signing in with a Microsoft account or work/school account. This can be useful, but it is dangerous if the recovery key is not saved.

Immediately after installation, check:

```text
Settings → Privacy & security → Device encryption
```

or:

```cmd
manage-bde -status
```

If encryption is enabled, save the recovery key before changing BIOS, reinstalling, cloning disks, or modifying boot settings.

### If You Need to Install on Unsupported Hardware

For testing, lab machines, or older hardware, Rufus is usually the least painful method because it can prepare a Windows 11 installer with selected requirement relaxations. However, unsupported hardware is still unsupported: future updates, drivers, security features, or feature upgrades may behave unpredictably. Rufus documents its ability to create Windows 11 installation drives for PCs without TPM or Secure Boot, but that does not make the resulting system officially supported by Microsoft. 

Recommended policy:

| Machine Type                    | Recommendation                                            |
| ------------------------------- | --------------------------------------------------------- |
| Main work machine               | Use supported hardware                                    |
| Lab/test machine                | Rufus workaround is acceptable                            |
| Family or non-technical user PC | Avoid unsupported installs                                |
| Security-sensitive machine      | Do not bypass TPM/Secure Boot                             |
| Old PC kept for light use       | Consider Windows 10 LTSC, Linux, or ChromeOS Flex instead |

### Minimal Installation Checklist

Before installing:

```text
Back up existing data.
Download ISO from Microsoft.
Create USB installer with Rufus or Media Creation Tool.
Decide: Microsoft account or local account.
Disconnect non-target disks.
Check BIOS: UEFI, TPM, Secure Boot, AHCI/VMD.
Prepare network/storage drivers if needed.
```

During installation:

```text
Use GPT for modern UEFI systems.
Install to the intended disk only.
Avoid connecting to the network until the account path is decided.
Do not delete unknown partitions on unrelated disks.
```

After installation:

```text
Install chipset, GPU, network, and storage drivers.
Check activation.
Check device encryption / BitLocker status.
Create restore point.
Run Windows Update.
Install PowerToys, UniGetUI, DevToys, and other core tools.
```
