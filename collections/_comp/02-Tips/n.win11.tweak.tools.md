---
category: Notes
title: Best Windows 11 Tweak Tools
tags: Tips
---

## windows 11 easy

## UniGetUI - windows package manager with 

Releases on Github: https://github.com/marticliment/UniGetUI/releases/tag/3.1.2

## DevToys - A Swiss Army knife for developers

Official Website: https://devtoys.app/

WinGet from powershell:

```powershell
winget install DevToys-app.DevToys
``` 

## Microsoft PowerToys - Utilities to customize Windows

Official Website: https://learn.microsoft.com/en-us/windows/powertoys/install

WinGet from powershell:

```powershell
winget install --id Microsoft.PowerToys --source winget
```

## tbtool

Official Website: https://www.tbtool.cn/

## One Tool for Everything

Official Website: https://christitus.com/one-tool-for-everything/

Run Directly from PowerShell with Admin:

```powershell
irm christitus.com/win | iex
```

## Seelen UI - an i3wm like windows manager for Windows

Open Terminal(Administrator):

```powershell
winget install --id Seelen.SeelenUI
```

## Initiate Windows 11 Offline without a Microsoft Account

There were several ways to avoid internet connecting when first starting Windows 11 which is invalid now:
  - stop "Network Connection Flow" in task manager.
  - use "OOBE \BypassNRO" command.

And the only 2 method to do that currently(23.7) is that:

Change Registry when installing:
  - Open cmd with Shift+F10 or Shift+Fn+F10.
  - Input "regedit" and press enter.
  - Find "Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion|OOBE" directory.
  - Create a new DWORD(D) item named "BypassNRO" and set its value to 1.
  - In cmd windows, input logoff and press enter to restart computer.
  - Then "no internet" can be seleted, and create a local account to login Windows 11.

Or use Rufus to disable internet requirement before create the bootable USB installation media.