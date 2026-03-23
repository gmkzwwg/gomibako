---
category: Notes
title: Low Power-Comsumption NAS Crafting
tags: Linux
---

## Truenas Scale Quick Start Guide

### Make TrueNAS USB Flash Disk

Prerequisite:
  1. USB Flash Disk with 4 GiB Storage at least
  2. A computer with network connection

1. Download TrueNAS Scale ISO image in official website: https://manjaro.com/.
2. Download Rufus 4.1p: https://rufus.ie/.
3. Make TrueNAS USB Flash Disk by rufus with default configuration and wait until the progress is completed.
4. Insert USB Flash Disk.
5. Press F1/F2/F8/F10/Shift+F10/Shift+Fn+F10/DEL, enter BIOS and make sure the boot priority of USB Flash Disk is highest.
6. Install TrueNAS Scale.
  - You can choose multiple hard disk to install to enable raid mode to gain more stability.
  - TrueNAS Scale encourage users maintain NAS with "admin" account, rather than "root" with TrueNAS Core.
7. Set Password.
8. Reboot, keep the ip address shown in the monitor and access the management site in web browser with another computer.

### 2. (Optional) Change Time Zone and Locale.

In the management site:
1. SYSTEM.
2. GENERAL.
3. LOCALIZATION SETTINGS.
4. SETTINGS.
5. Asia/Shanghai.
6. SAVE.

### 3. Disable DHCP service and allocate a static ip address to NAS.

1. NETWORK.
2. INTERFACES.
3. Click the network card.
4. Deselect DHCP checkbox.
5. Add ALIASES, input the ip address which you prefer to access NAS management site with (generally start with 193.168.1).
6. Input NETWORK MASK, which generally is 24 (it means your local network ip address range from xxx.xxx.xxx.1 to xxx.xxx.xxx.255).
6.  的 IP Addresses 中，输入欲访问的地址、掩码（一般为24） - APPLY`

At this point, a manual gateway setting appears; enter it in the dialog box.

A “Test Settings” dialog box then appears.

`Check Confirm, then click Test Changes - Apply Changes.`

Log in again using the updated IP address. A dialog box will appear to confirm the changes; click `Confirm`. A message will then indicate that the settings have been changed.

### 4. Set the host name and DNS server

`Network - Interfaces - Global Configuration - SETTINGS - enter hostname - enter DNS address`

### 5. Create a pool and a dataset

Create a pool:

`Storage - Create Pool - in Pool Manager, enter a name - select all disks and add them to Data VDev - choose a RAID layout mode under Data VDev - Create - a warning window pops up; check Confirm and click Create Pool`

> In the RAID layout modes: Stripe = RAID 0, Mirror = RAID 1. There are also Z1, Z2, and Z3.

The pool root directory is located at: `/mnt/[POOL_NAME]`

Create a dataset:

`Dataset - ADD DATASET - enter the Dataset name - SAVE`

### 6. Add a user

`Credentials - Local User - ADD - enter Full Name, Username, Password - (optional) set Home Directory - SAVE`

### 7. Change dataset access permissions

`Datasets - Permissions - EDIT - grant write permission to the Other group`

### 8. Share via Samba

`Shares - click the “⋮” icon for Windows (SMB) Shares, then click Turn On Service - ADD - select the dataset to share - SAVE - in the pop-up dialog, select Restart Service`

## Client access to NAS storage services

### Windows

`Win + X to open Run - enter \\ + the NAS server’s internal IP address - Run`

In the opened folder, right-click the dataset folder and choose “Map network drive”. You will then see this drive under “This PC”.

### Linux

1. Install `smbclient`

```bash

# arch/manjaro
sudo pacman -S smbclient
# debian/ubuntu
sudo apt install smblient
# RHEL
sudo yum install samba-client
```

2. Access Samba shared resources

```bash
smbclient //[HOSTNAME_OR_IP]/[SHARE_NAME] -U [USERNAME]
```

3. Enter the password when prompted. After a successful connection, you will see the `smb: \>` prompt.

4. Mount the dataset locally: install `cifs-utils` and create a mount point.

```bash
sudo mkdir /mnt/[MOUNT_DIR_NAME]
```

5. Mount the remote directory to the newly created local directory.

```bash
sudo mount -t cifs //[HOSTNAME_OR_IP]/[SHARE_NAME] /mnt/[MOUNT_DIR_NAME] -o username=[USERNAME],password=[PASSWORD],iocharset=utf8,dir_mode=0777,file_mode=0777
```

> Use `df -h` to check mount status; use `ll /mnt/[MOUNT_DIR_NAME]` to view files.

6. Unmount

```bash
umount /mnt/smbmount
```

7. Configure auto-mount at boot

Add the following entry to `/etc/fstab`:

```bash
//[HOSTNAME_OR_IP]/[SHARE_NAME] /mnt/[MOUNT_DIR_NAME]  cifs  username=[USERNAME],password=[PASSWORD],soft,rw  0 0
```

## Storage Dashboard overview

This page lists detailed information about the storage pool:

* **Export/Disconnect**: Temporarily take a pool offline / bring it back online.
* **Topology - Manage Devices**: View physical disk status, error counts, or add a VDEV.
* **Usage - Manage Datasets**: Manage datasets.
* **ZFS Health - Scrub**: Manually scrub disks. By default, a scrub runs every Sunday at 00:00, lasts about 12 hours, and usually does not require manual scrubs.
* **Disk Health - Manage Disks**: Manage physical disks.

## Advanced usage

### Add new physical disks to an existing pool

`Storage - in the Unassigned Disks tab, click Add to Pool - select Existing Pool - choose the name of the pool to add to.`

Notes:

1. The pool will then have multiple VDEVs. These VDEVs should keep the same number of physical disks, and they can only use the same RAID layout mode. In general, it is not recommended to expand a pool after creation; if expansion is needed, create a new pool instead (this will change file access paths).
2. Once a VDEV is added to a pool, it cannot be detached, because files are distributed across the VDEVs.

### Replace a disk in an existing pool

`Storage - in the Topology tab, click Manage Devices - click the disk to be replaced - in the pop-up dialog, select the replacement disk - if the replacement disk is already partitioned, check Force - Replace Disk.`

Notes:

1. The replacement disk must have a larger capacity than the existing disk, regardless of how much space is currently used.
2. Replacement takes time depending on how much data is on the pool.

### Migrate a storage pool

> Disks retain metadata about the pools they belonged to; as long as all physical disks are present, the pool can be reconstructed.

Disconnect the existing pool:

`Storage - Export/Disconnect`

Import the pool:

`Storage - Import Pool - select the pool name to import from the right sidebar.`

### Restore redundancy when a disk has failed but no data was lost

After installing the new disk in the host machine:

`Storage - in the Topology tab, click Manage Devices - click the REMOVED disk - under Disk Info, click Replace - select the new disk in the pop-up dialog - wait for the system to finish resilvering`

> During resilvering, it is best not to perform other operations on the NAS host.


### Test sequential read speed of a hard drive

System - Shell:

```bash
cd /mnt/[POOL_NAME]/[DATASET_NAME]
fio --name=test --size=50g --rw=write --ioengine=posixaio --direct=1 --bs=1m
```

### Encrypt the storage pool

## Basics

### Comparison of major NAS operating systems

**TrueNAS Core**

* Evolved from FreeNAS, based on FreeBSD;
* Open-source; supports a wide range of NIC models; suitable for high-speed storage
* ZFS: supports real-time compression; uses RAM as cache to extend drive lifespan; real-time snapshots

**TrueNAS Scale**

* Based on Debian; adds support for Docker and virtual machines

**Synology**

* Limited NIC model support; 10GbE upgrades are expensive
* Has an app store; no need to manually change package sources
* Provides recycle bin, snapshots, and versioning
* Strong mobile app support, e.g. Moments for photo management; Drive for documents; Plex for video management

**UNRAID**

* Uses a parity-disk mechanism
* Works well with disks of different capacities
* Cannot build traditional RAID arrays

**openmediavault**

* Essentially a free “Synology-like” system without the package center/app services
* Uses Portainer to manage Docker
* Can install ZFS and supports snapshots

### RAID mode comparison

**RAID 0**: Two disks striped. No capacity loss, no redundancy, fast. If any disk fails, data is lost. Low safety.

**RAID 1**: N disks mirrored. Loses capacity of N−1 disks. Read speed scales up (roughly N×), write speed unchanged. Up to N−1 disks can fail (N ≥ 2). Low cost-performance.

**RAID 2**: At least 3 disks; bit-level striping with real-time encoding and Hamming-code ECC. Checks data on reads/writes; high hardware overhead.

**RAID 3**: Derived from RAID 2. At least 3 disks; dedicated parity disk. Every read/write accesses the parity disk, making it a bottleneck and prone to wear. If the parity disk fails, data is lost. Bit-level striping.

**RAID 4**: Derived from RAID 3; block-level striping. Fast for small reads. When a non-parity disk fails, recovery is less reliable than RAID 3.

**RAID 5**: Similar idea to RAID 3 but with distributed parity. At least 3 disks; loses capacity of 1 disk. Tolerates failure of 1 disk. There is a very small chance of URE (Unrecoverable Read Error); if it occurs during rebuild, the rebuild must restart. Rebuild is difficult; less safe than RAID 6.

**RAID F1**: Derived from RAID 5; designed for SSDs.

**RAID 6**: Similar to RAID 5. At least 4 disks; two parity blocks. Tolerates failure of 2 disks. Writes are slower than RAID 5.

**RAID 7**: Patented by SCC; paid/licensed.

**RAID 10**: At least 4 disks. Pairs are mirrored (RAID 1) and then striped (RAID 0). Loses 50% capacity. High safety.

**JBOD**: Combines all disks into one logical volume. No speed gain; no capacity loss. The first disk stores the segment table—if it fails, the array fails; failure of other disks affects only their own data. Low safety.

**Unraid**: Uses 1–2 disks as parity. Tolerates failure of 1–2 disks; if a non-parity disk fails, only its own data is affected. Easy to expand. Slowest writes. Paid.

**SHR**: Synology Hybrid RAID. Automatically chooses a RAID mode; beginner-friendly. Can be configured with 1–2 redundancy disks.

**RAID-Z**: A ZFS filesystem feature; no extra hardware/software needed. Requires large RAM, ideally ECC. Expansion is difficult.

* **RAID-Z1**: Similar to RAID 5: 2 data disks + 1 parity equivalent.
* **RAID-Z2**: Similar to RAID 6: 2 parity equivalents.
* **RAID-Z3**: 3 parity equivalents.

### Use cases

* Backup photos/videos from phone cameras
* Archive media for a home theater
* Windows/macOS system backups
* Multi-client access from phones and computers
* High-speed, secure storage
* Multi-user permission control
* File recovery, snapshots, version control
* Remote storage and access

## NAS pitfalls

### CPU

* Whether it has an iGPU for hardware video decoding. Low-power Xeon E3 CPUs with iGPU are rare (e.g., 1235L v5), while 1240L v5 has no iGPU.
* NAS OSes update iGPU drivers slowly; iGPUs integrated in 10th-gen Core and newer may be unsupported.
* NAS OS CPU requirements are generally low. Cases needing stronger CPU:

  * Running Docker
  * Slow 10GbE transfers
  * Multi-user online video editing
  * Using ZFS
  * Running virtual machines

### Memory

* ZFS-based systems (e.g., TrueNAS) ideally need ECC RAM to mitigate bit flips caused by solar activity/electromagnetic interference.
* Check whether the CPU supports ECC / registered ECC (RDIMM).
* ECC type: unbuffered ECC vs registered ECC. Xeon E3 and some Pentium CPUs may support unbuffered ECC; higher-end server CPUs (e.g., Xeon E5) support registered ECC.
* Registered ECC has higher power and heat (about 10W per DIMM), requiring strong case fans.
* Frequency/speed is not important; start at 8GB. TrueNAS benefits from large RAM for caching. Rough guideline:

  * 10TB → 16–32GB RAM
  * 40TB → 32–64GB RAM
  * 100TB+ → 64–128GB RAM

### Motherboard

* Do SATA ports conflict with M.2? Some boards disable certain SATA ports when M.2 is used.
* “NAS ITX” no-name boards can be problematic: loud coolers, weak NICs, SATA conflicts.
* OS installation temporarily needs video output. Confirm the board has a video port; if not, use a GPU temporarily and remove it after installation. Some workstation/industrial boards (e.g., X150 series) have no video outputs.
* Do not use motherboards’ built-in RAID functions: failed overclocks or a dead CMOS battery can cause RAID metadata loss.
* ERYING boards with soldered CPUs look ideal on paper for low-power high-performance NAS, but may fail to boot when adding “data-containing HDDs”. They may also fail to boot after power loss.

### Hard drives

* Extremely cheap drives are often used mining drives.
* If speed is not critical, 5400 RPM drives are sufficient.
* Most 2.5" drives are SMR; some 3.5" are too—prefer CMR.
* Seagate Exos enterprise drives have read/write noise around 43–48 dB, much higher than typical ambient noise (30–36 dB); WD can exceed 50 dB. If noise matters, choose low-RPM NAS drives.
* Synology-style small enclosures often cannot use enterprise drives due to poor airflow; they are designed for NAS drives.
* Some cheap cases have poor vibration damping—unsuitable for enterprise drives.
* In 2U/4U blade-style chassis, disk density can be too high: standard ~3000 RPM fans may be insufficient; high-RPM industrial fans may be required.
* The OS install drive only needs >16GB. You can use RAID1 for stability. Even if the OS breaks, reinstalling can restore the disk array.

### Power supply

* Many NAS cases only support 1U PSUs: low efficiency and noisy.
* Power budgeting: if staggered spin-up is not supported, enterprise drives may draw 25–36W at spin-up; each RDIMM can draw ~10W.
* Check how much power the PSU can deliver to SATA devices. For example, a Seasonic GX650 can allocate most of its 650W across drives, while an MSI MPG A650GF may limit SATA devices to ~300W.
* Check how many SATA power connectors are available. Modular cables are often 1-to-3 or 1-to-4; avoid powering more than 4 drives from a single cable.
* If power outages are possible, use a UPS. The UPS can send a shutdown command to the NAS via a data cable.

### Network card

* Some older 10GbE NICs do not downshift to 2.5GbE (e.g., Intel X540). Intel X550 supports 10G/2.5G/1G.
* Does the NIC require drivers? Does the NAS OS include them? Closed systems like Synology support fewer NICs.
* Some server PCIe NICs are mechanically/electrically incompatible with consumer motherboard PCIe slots and require an adapter.
* You can use driverless NICs (where supported).

### Case

* With NAS cases, check CPU cooler height limits; many do not support tower coolers. Top-down coolers are usually compatible and sufficient.
* Many cases support only 1U or SFX PSUs.
* Check disk connectivity: direct SATA cables vs a hot-swap backplane.

### Operating system

* For home use, Synology or OMV is often best due to strong phone-platform support.
* Xpenology (“black Synology”) often needs an external boot device (USB stick or internal drive). Ensure it is durable, stable, and heat-resistant.
* For professional uses like online video editing, TrueNAS is preferred and requires ECC RAM.
* Avoid small-company NAS products using proprietary OSes; if the company shuts down, OS support may stop.

### During use

* After one disk fails in RAID 5, rebuilding is difficult because there is a small chance of URE (Unrecoverable Read Error). On average, one URE may occur per ~12TB read. If a URE happens, the rebuild stops and must restart.
* RAID-Z / Z2 / Z3 are not suitable for expansion. UNRAID is easier to expand.

## Full hardware spec

### PC #1

| | Hardware Spec | |
|:---:|:---:|:---:|
| CPU | AMD Ryzen R9 7950x | 16c32t 5.85GHz 170wTDP AM5 |
| Motherboard | ASUS ProArt X670E-Creator | DDR5 Wifi ATX 305mm * 244mm |
| Memory | Kingbank Blade | 32G 6000MHz C30 Hynix A-Die * 2 |
| GPU1 | ASUS TUF Gaming RTX 4090 OC | 384bit 24GB GDDR6X 16384sp 450wTDP |
| GPU2 | AMD Radeon 610M GPU | 2cu RDNA3 Integreted |
| SSD Slot1 | Solidigm P44 PRO |  2TB PCIe4.0 |
| SSD Slot2 | Solidigm P44 PRO |  2TB PCIe4.0 |
| SSD Slot3 | Kingbank KP230PRO |  2TB PCIe3.0 |
| SSD Slot4 | Kingbank KP230PRO |  2TB PCIe3.0 |
| Chassis | Fractal Design Torrent | Black ATX 242mm * 544mm * 530mm |
| PSU | Thermaltake GF3 |  1200w Gold ATX3.0 Fully Modular |
| Cooler | Noctua NH-D15s |  Black 165mm * 150mm * 135mm |
| Monitor | LG UltraFast 32GR95U |  31.5inch 95%DCI-P3 4k144hz IPS |
| Keyboard | Keychron Q10 | 75% Alice Layout |
| Mouse | Logitech MX Vertical | Ergonomic Wireless Mouse |
| Printer | Brohter HL-2595DW | Wireless Lazer Printer |
| Power Button | Wireless Key Decision Button | PCIE3.0x4 |
| Front Fans | Fractal Design Dynamic PWM GP-18 | 180mm * 180mm * 25mm * 2 |
| Bottom Fans | Fractal Design Dynamic PWM GP-14 | 140mm * 140mm * 25mm * 3 |
| Back Fans | Fractal Design Dynamic PWM GP-14 | 140mm * 140mm * 25mm * 1 |

### PC #2

| | Hardware Spec | |
|:---:|:---:|:---:|
| CPU | Intel Xeon E3-1230 v5 | 4c8t 3.80GHz 80wTDP FCLGA1151 |
| Motherboard | MSI C236M Workstation | DDR4 mATX 244mm * 244mm |
| Memory | Hynix ECC DDR4 | 2133mhz c15 8G * 2 |
| GPU | ASUS 1060 LOL | 192bit 3G GDDR5 1152sp 80wTDP |
| SSD Slot1 | ZHITAI SC001 | 256GB SATA3.0 |
| SSD Slot2 | KIOXIA RC20 | 1TB PCIE3.0 |
| HDD Slot1 | HGST | 1TB  SATA3.0 |
| Chassis | JOSBO D31 |  Black MATX 205mm * 440mm * 363mm |
| PSU | SAMA 500P | ATX Gold Fully Modular |
| Cooler | Thermalright Peerless Assassin 120 SE | 125mm * 110mm * 155mm |
| Monitor | AOC Luvia LV273HUPX | 27inch 99% aRGB 4k60hz IPS |
| Keyboard | Irock fe87 | 80% Layout |
| Mouse | Logitech G304 | 200 - 12,000 dpi |

### PC #3

| | Hardware Spec | |
|:---:|:---:|:---:|
| CPU | Intel i5-12500 | 6c12t 4.60GHz 65wTDP FCLGA1700 |
| Motherboard | ASUS TUF B660M-PLUS | WIFI DDR4 mATX 244mm * 244mm |
| Memory | Kingbank Heatsink Black | 16G 3600MHz C18 Samsung A-Die * 2 |
| GPU1 | EVGA 1060 | 192bit 3G GDDR5 1152sp 120wTDP |
| GPU2 | Intel UHD 770 | 32EU |
| SSD Slot1 | KIOXIA RC20 | 1T PCIE3.0 |
| SSD Slot2 | Samsung PM961 | 128G  PCIE3.0 |
| Chassis | JOSBO D31 |  Black MATX 205mm * 440mm * 363mm |
| PSU | ThermalTake GT | 550W Gold Fully Modular |
| Cooler | Thermalright Peerless Assassin 120 SE | 125mm * 110mm * 155mm |
| Monitor | AOC Luvia LV273HUPX | 27inch 99% aRGB 4k60hz IPS |
| Keyboard | Irock fe87 | 80% Layout |
| Mouse | Logitech G304 | 200 - 12,000 dpi |

### PC #4

| | Hardware Spec | |
|:---:|:---:|:---:|
| CPU | Intel Core I5-11500h | 6c12t 4.6GHz 45wTDP FCBGA1787 |
| Motherboard | Erying Skyline HM570 |  ITX 170mm X 170mm |
| Memory | Kingbank Heatsink Black |  3200mhz 8GB |
| GPU | Intel UHD Graphics XE  | 32eu |
| SSD Slot1 | Samsung PM961 | 128G PCIE3.0 |
| SSD Slot2 | Samsung PM961 | 128G PCIE3.0 |
| Chassis | Sirius S40 | 8.5L ITX |
| PSU | Thermaltake Toughpower | 450w SFX Gold Fully Modular |
| Cooler | Thermalright axp90-x53 |  Black 95mm * 94.5mm * 53mm |
| Monitor | LG 24EA53V | 24inch 1080p60hz IPS |

### NAS #1

| | Hardware Spec | |
|:---:|:---:|:---:|
| CPU | Intel Xeon E5-1235L v5 | 4c4t 3GHz 25wTDP FCLGA1151 |
| Motherboard | MSI C236A Workstation | ATX 305mm * 244mm |
| Memory | Hynix ECC DDR4 | 2133mhz c15 16G * 4 |
| GPU | Intel Graphics HD P530 |  192sp Integrated |
| Boot Pool | Samsung PM961 |  128GB PCIE3.0 * 2 |
| AppData Pool | Samsung PM961<br>Samsung 970 Evo Plus<br>Samsung 980 | 512GB PCIE3.0 * 3 |
| Storage Pool | Seagate Exos St1800nm000j | 18TB SATA3 * 6 |
| Chassis | Antec P101 Silent | 527mm * 232mm * 506mm |
| PSU | Msi MPG A650GF |  650w ATX Gold Fully Modular |
| Cooler | Phantom Spirit 120 SE | 125mm * 110mm * 155mm |

### NAS #2

| | Hardware Spec | |
|:---:|:---:|:---:|
| CPU | Intel Xeon E5-1225 v5 | 4c4t 3.7GHz 80wTDP FCLGA1151 |
| Motherboard | Gigabyte X150M WS | MATX 226mm * 17.4mm |
| Memory | Hynix ECC DDR4 | 2133mhz c15 16G * 2 |
| GPU | Intel Graphics HD P530 |  192sp Integrated |
| Boot Pool | Samsung PM961 |  128GB PCIE3.0 * 2 |
| AppData Pool | Samsung PM961 |  128GB PCIE3.0 * 2 |
| Storage Pool | Seagate Skyhawk ST4000VX015<br>Seagate BarraCuda | 4T SATA3 * 3<br>5T SATA3 * 1 |
| Chassis | SAMA Hard Disk King | 592mm * 243mm * 567mm |
| PSU | Greatwall ATX500BL | 500W ATX Gold Fully Modular |
| Cooler | Phantom Spirit 120 SE | 125mm * 110mm * 155mm |