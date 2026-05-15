---
title: TrueNAS SCALE 24.04 + NAS DIY
categories: Notes
subclass: Operating Tools
---

This guide is written for TrueNAS SCALE 24.04 Dragonfish and earlier releases. These versions use the older Kubernetes-based Apps system and can still work with application catalogs such as the official TrueNAS charts catalog and, historically, TrueCharts.

This guide is **not** written for TrueNAS SCALE 24.10 Electric Eel or later. Starting with 24.10, TrueNAS moved the Apps backend from Kubernetes to Docker Compose, and third-party catalogs such as TrueCharts do not automatically migrate in the same way as official catalog apps. TrueNAS 24.10 release notes also state that official 24.04 catalog apps can migrate to Docker, while third-party catalog apps such as TrueCharts do not automatically migrate.

## 1. Version Scope

Use this guide if the system is one of the following:

| Version | Apps Backend | Catalog Support | This Guide Applies |
| --- | --- | --- | --- |
| TrueNAS SCALE 22.12 | Kubernetes | Yes | Yes |
| TrueNAS SCALE 23.10 | Kubernetes | Yes | Yes |
| TrueNAS SCALE 24.04 Dragonfish | Kubernetes | Yes | Yes |
| TrueNAS SCALE 24.10 Electric Eel | Docker / Docker Compose | No traditional third-party catalog workflow | No |
| TrueNAS SCALE 25.04+ | Docker-based Apps | Newer Apps system | No |

For new deployments in 2026, it is usually better to use a current TrueNAS release unless there is a specific reason to stay on 24.04 or earlier. The official `truenas/charts` repository is now marked deprecated and explicitly points Dragonfish 24.04-or-prior users toward newer TrueNAS versions.

## 2. What This Setup Is For

This setup is suitable for:

| Use Case | Recommended |
| --- | --- |
| Home file server | Yes |
| SMB share for Windows/Linux/macOS | Yes |
| Photo/video archive | Yes |
| ZFS snapshots and data integrity | Yes |
| Small home lab Apps | Yes, but be careful with legacy catalogs |
| Heavy virtualization | Only with enough CPU/RAM |
| Professional video editing over 10GbE | Possible, but hardware planning matters |
| Long-term TrueCharts deployment | Not recommended for new systems |

The main idea is simple: use TrueNAS primarily as a storage appliance, then add Apps only when they are useful and maintainable.

## 3. Before Installation

Prepare:

| Item | Recommendation |
| --- | --- |
| Boot USB | 8 GB or larger |
| Boot device | Small SSD or mirrored boot SSDs |
| Data disks | CMR HDDs or SSDs |
| RAM | At least 8 GB; more for larger pools and Apps |
| Network | 1GbE minimum; 2.5GbE or 10GbE if large file transfer matters |
| UPS | Strongly recommended |

Download TrueNAS only from the official TrueNAS download page. TrueNAS Community Edition is free and open, and the official site describes it as installable on x86 hardware.

## 4. Make the Installer USB

On Windows, use Rufus or another USB flashing tool.

On Linux:

```bash
lsblk
sudo dd if=TrueNAS-SCALE.iso of=/dev/sdX bs=4M status=progress oflag=sync
````

Replace `/dev/sdX` with the USB device, not a partition such as `/dev/sdX1`.

**Warning:** `dd` destroys the target device. Check the device name before running it.

## 5. Install TrueNAS SCALE

Boot from the USB installer, then install TrueNAS SCALE to the boot disk.

Recommended choices:

| Item            | Recommendation                             |
| --------------- | ------------------------------------------ |
| Boot disk       | Separate SSD, not one of the data disks    |
| Boot redundancy | Optional mirror if uptime matters          |
| Data disks      | Do not install the OS onto data pool disks |
| Admin account   | Use the web UI administrator account       |
| Initial network | DHCP first, static IP later                |

After installation, reboot and open the web UI from another computer using the IP address shown on the console.

TrueNAS SCALE initially uses DHCP for the primary system IP address. After installation, network settings can be changed through the console setup menu or the web UI.

## 6. Set Static IP

A NAS should usually use a static IP address or a DHCP reservation on the router.

Recommended method:

```text
Network → Interfaces → Edit primary NIC → Disable DHCP → Add static IP alias → Test Changes → Save
```

Prepare these before changing the interface:

| Item      | Example                     |
| --------- | --------------------------- |
| Static IP | `192.168.1.10`              |
| Netmask   | `24`                        |
| Gateway   | `192.168.1.1`               |
| DNS       | `192.168.1.1` or public DNS |

TrueNAS warns that changing the interface used by the web UI can disconnect the current session, and physical access or console knowledge may be required to recover from bad network settings. It also warns that multiple NICs on the same subnet should not be used casually; use LAGG for aggregation or aliases for multiple IPs on one NIC.

**Tip:** For a home NAS, a router-side DHCP reservation is often safer than manually setting a static IP inside TrueNAS.

## 7. Set Hostname, DNS, Time Zone

Use:

```text
System Settings → General → Localization
Network → Global Configuration
```

Recommended values:

| Setting   | Example                         |
| --------- | ------------------------------- |
| Hostname  | `truenas`                       |
| Domain    | `local` or your LAN domain      |
| Time zone | Your local time zone            |
| DNS       | Router IP or trusted DNS server |

A clear hostname makes SMB access easier:

```text
\\truenas
smb://truenas.local
```

## 8. Create Pool and Dataset

Create a pool:

```text
Storage → Create Pool
```

Do not create shares directly from the pool root. Create datasets under the pool.

TrueNAS documentation explicitly warns not to use the root or pool-level dataset for a share; create a new dataset under the pool-level dataset instead, because sharing the root dataset can lead to storage configuration problems.

Recommended layout:

```text
tank/
  media/
  documents/
  backup/
  apps/
  downloads/
```

Example:

| Dataset          | Use                                   |
| ---------------- | ------------------------------------- |
| `tank/media`     | Movies, music, photos                 |
| `tank/documents` | Personal files                        |
| `tank/backup`    | Windows/macOS/Linux backups           |
| `tank/apps`      | App configuration and persistent data |
| `tank/downloads` | Download clients and temporary files  |

TrueNAS setup documentation describes a simple mirrored pool as a common starting point, where half of the selected disks are used for data protection.

## 9. Choose Pool Layout

For small NAS systems, avoid overcomplicated RAID plans.

| Disk Count | Recommended Layout               | Notes                                 |
| ---------- | -------------------------------- | ------------------------------------- |
| 1 disk     | Single disk                      | No redundancy; backup required        |
| 2 disks    | Mirror                           | Simple, safe, easy to understand      |
| 3 disks    | RAIDZ1                           | Usable, but less safe for large disks |
| 4 disks    | Mirror vdevs or RAIDZ2           | Prefer RAIDZ2 for safer parity        |
| 5–6 disks  | RAIDZ2                           | Good balance                          |
| 8+ disks   | RAIDZ2 / RAIDZ3 / multiple vdevs | Depends on capacity and rebuild risk  |

For TrueNAS SCALE 24.04 and earlier, plan the vdev layout carefully at the beginning. Single-drive RAIDZ expansion was introduced in TrueNAS 24.10, while the traditional method is still adding full vdevs; therefore, 24.04-era systems should not be planned around easy one-disk-at-a-time RAIDZ expansion.

**Rule:** RAID is not backup. RAID keeps the system online after some disk failures; it does not protect against deletion, ransomware, fire, theft, controller failure, or user mistakes.

## 10. Create Users for SMB

Create a normal user:

```text
Credentials → Local Users → Add
```

For SMB access, enable Samba authentication for that user. TrueNAS documentation states that SMB shares require either Active Directory or at least one local SMB user, and root or built-in users cannot be used to access SMB shares.

Recommended:

| User Type       | Purpose                               |
| --------------- | ------------------------------------- |
| Admin user      | Web UI administration                 |
| Normal SMB user | File access                           |
| App user        | Optional service account for Apps     |
| Guest access    | Avoid unless isolated and intentional |

Do not grant broad anonymous write access to important datasets.

## 11. Create SMB Share

Use:

```text
Shares → Windows (SMB) Shares → Add
```

Recommended flow:

```text
Create dataset → Create SMB share → Set ACL permissions → Enable SMB service
```

For a simple private share:

| Setting | Value                  |
| ------- | ---------------------- |
| Path    | `/mnt/tank/documents`  |
| Name    | `documents`            |
| Purpose | Default SMB share      |
| Access  | Specific user or group |

After saving, enable or restart the SMB service.

## 12. Access SMB from Clients

### Windows

Open Run:

```text
Win + R
```

Enter:

```text
\\192.168.1.10
```

or:

```text
\\truenas
```

Right-click the share and choose **Map network drive**.

### Linux: Temporary Access

Install client tools:

```bash
# Arch / Manjaro
sudo pacman -S smbclient cifs-utils

# Debian / Ubuntu
sudo apt install smbclient cifs-utils
```

Connect:

```bash
smbclient //192.168.1.10/documents -U username
```

### Linux: Mount SMB Share

Create a mount point:

```bash
sudo mkdir -p /mnt/truenas-documents
```

Mount:

```bash
sudo mount -t cifs //192.168.1.10/documents /mnt/truenas-documents \
  -o username=username,iocharset=utf8,uid=$(id -u),gid=$(id -g)
```

For long-term use, store credentials in a protected file instead of putting the password directly in `/etc/fstab`.

```bash
sudo nano /etc/samba/truenas-documents.cred
```

```text
username=your_username
password=your_password
```

```bash
sudo chmod 600 /etc/samba/truenas-documents.cred
```

Add to `/etc/fstab`:

```text
//192.168.1.10/documents /mnt/truenas-documents cifs credentials=/etc/samba/truenas-documents.cred,iocharset=utf8,uid=1000,gid=1000,nofail,x-systemd.automount 0 0
```

## 13. Apps on TrueNAS 24.04 and Earlier

TrueNAS SCALE 24.04 uses Kubernetes for Apps. The 24.04 documentation states that the Apps feature is provided using Kubernetes, while future versions starting with 24.10 use Docker.

Before installing Apps:

```text
Apps → Choose Pool
```

Use a dataset such as:

```text
tank/apps
```

Do not mix app data randomly into media or document datasets.

## 14. Add App Catalogs

TrueNAS 24.04 has a default official catalog and allows custom catalogs. The documentation says TrueNAS has an official catalog of iXsystems-approved applications, and users can configure custom catalogs, but iXsystems does not directly support non-official apps from custom catalogs.

Open:

```text
Apps → Discover Apps → Manage Catalogs → Add Catalog
```

The Add Catalog screen accepts fields such as catalog name, repository, preferred trains, and branch. The 24.04 UI reference also warns that third-party app catalogs are maintained outside iXsystems and require the user to self-support them.

### Official TrueNAS Charts Catalog for 24.04-era Systems

Normally, the default `TRUENAS` catalog already exists. If the catalog is missing or needs to be restored in a 24.04-era system, the legacy official chart repository is:

```text
Catalog Name: truenas
Repository: https://github.com/truenas/charts.git
Branch: master
Preferred Trains: charts, community, enterprise
```

**Warning:** This repository is now deprecated. It is relevant only for legacy TrueNAS SCALE 24.04-or-earlier chart-based systems. The repository itself states that Dragonfish 24.04-or-prior users should consider upgrading to Electric Eel 24.10 or later.

### TrueCharts Legacy Catalog

Historically, TrueCharts could be added as a third-party catalog:

```text
Catalog Name: truecharts
Repository: https://github.com/truecharts/catalog
Branch: main
Preferred Trains: stable, enterprise, operators
```

However, this should now be treated as a legacy-only path. TrueCharts states that TrueNAS SCALE moved toward Docker in 24.10 and removed the native Kubernetes environment that allowed TrueCharts Helm charts to work through the TrueNAS Apps system. It also states that TrueCharts removed the TrueNAS SCALE application catalog to prevent new users from starting an app environment that would soon be outdated.

Recommended policy:

| Situation                         | Recommendation                                                        |
| --------------------------------- | --------------------------------------------------------------------- |
| Existing TrueCharts apps on 24.04 | Keep running only if stable; back up app data                         |
| New app deployment on 24.04       | Prefer official TrueNAS catalog or Custom App                         |
| Need TrueCharts long-term         | Run TrueCharts on a proper Kubernetes platform, not native 24.04 Apps |
| Planning upgrade to 24.10+        | Migrate away from TrueCharts before upgrading                         |

## 15. Install Custom Apps

Use Custom App when the app is not available in the official catalog.

Before opening the wizard, create all required datasets and directories. The 24.04 documentation warns that the user cannot save and exit the Custom App wizard halfway just to create storage directories; required paths should be prepared before starting the app installation.

Recommended structure:

```text
tank/apps/
  appname/
    config/
    data/
    cache/
```

Example dataset paths:

```text
/mnt/tank/apps/qbittorrent/config
/mnt/tank/downloads
/mnt/tank/media
```

Basic checklist before installing a Custom App:

| Item             | Check                                          |
| ---------------- | ---------------------------------------------- |
| Image repository | Correct container image                        |
| Image tag        | Avoid accidental `latest` if stability matters |
| Ports            | No conflict with existing services             |
| Storage          | Host paths already created                     |
| User/group       | Permissions match mounted datasets             |
| Network          | Decide bridge, host, or exposed ports          |
| Backup           | App config dataset included in backup plan     |

## 16. Backup, Scrub, and SMART

TrueNAS protects data integrity, but it does not replace backup.

Minimum maintenance:

| Task                    | Recommended Schedule        |
| ----------------------- | --------------------------- |
| ZFS scrub               | Monthly or default schedule |
| SMART short test        | Weekly                      |
| SMART long test         | Monthly                     |
| Config backup           | After major changes         |
| External/offsite backup | For important data          |

TrueNAS creates a default scrub task when a new pool is created, and scrubs are used to identify data integrity problems, silent corruption, transient hardware problems, and early disk failure alerts.

SMART tests should not be scheduled at the same time as scrubs or other disk-intensive tasks, because TrueNAS warns that SMART tests can reduce drive performance and should be scheduled during low-usage periods.

## 17. UPS Setup

A UPS is strongly recommended for any NAS using ZFS.

Use:

```text
System Settings → Services → UPS
```

TrueNAS documents the UPS service under System Settings → Services and notes that the UPS device should be connected to the TrueNAS system before configuration.

Recommended behavior:

| Event          | Action                                          |
| -------------- | ----------------------------------------------- |
| Short outage   | Continue running                                |
| Long outage    | Graceful shutdown                               |
| Power restored | Optional automatic power-on if BIOS supports it |

A UPS is especially important when using many HDDs, because sudden power loss during writes increases the chance of pool or application inconsistency.

## 18. Disk Replacement

When a disk fails:

```text
Storage → Pool → Topology → Manage Devices → Select failed disk → Replace
```

After replacement, TrueNAS starts resilvering.

During resilvering:

| Recommendation         | Reason                          |
| ---------------------- | ------------------------------- |
| Avoid heavy writes     | Reduces stress during rebuild   |
| Keep system powered    | UPS is important                |
| Monitor disk errors    | Another disk may be weak        |
| Do not reboot casually | Let resilver finish if possible |

For large disks, resilvering can take many hours or days.

## 19. Pool Migration

ZFS stores pool metadata on disks. If all required disks are present, a pool can usually be imported into another TrueNAS system.

Typical flow:

```text
Old system: Storage → Export/Disconnect
New system: Storage → Import Pool
```

Before migration:

| Check                   | Why                                   |
| ----------------------- | ------------------------------------- |
| All disks labeled       | Avoid wrong order or missing disks    |
| Config backup saved     | Restores users, shares, services      |
| Apps backed up          | Apps can be more fragile than storage |
| HBA/NIC drivers checked | Avoid hardware incompatibility        |

## 20. Expansion Strategy

For 24.04 and earlier, expansion should be planned conservatively.

Good expansion methods:

| Method                              | Recommendation                     |
| ----------------------------------- | ---------------------------------- |
| Replace all disks with larger disks | Good for mirrors and RAIDZ         |
| Add another full vdev               | Good if same layout and disk count |
| Create a new pool                   | Clean and safe                     |
| Add one disk to RAIDZ               | Not a 24.04-era assumption         |

Do not mix many random vdev layouts inside one pool unless the consequences are understood. A pool’s reliability is constrained by its weakest vdev.

## 21. NAS Hardware Selection Pitfalls

### CPU

NAS CPU requirements are usually modest. More CPU matters when running Apps, virtual machines, encryption, transcoding, or high-speed networking.

| Need                      | CPU Feature                                       |
| ------------------------- | ------------------------------------------------- |
| Plex/Jellyfin transcoding | Intel iGPU or supported GPU                       |
| Many Apps                 | More cores                                        |
| VMs                       | More cores and VT-x/AMD-V                         |
| 10GbE transfers           | Modern CPU and enough PCIe bandwidth              |
| Low idle power            | Efficient consumer CPU often beats old server CPU |

Avoid buying an old server CPU only because it is cheap. It may use much more power than expected.

### Memory

TrueNAS and ZFS benefit from memory. ECC is preferred, especially for serious storage.

| Capacity            | Practical Starting Point |
| ------------------- | ------------------------ |
| Small home NAS      | 16 GB                    |
| 4–6 disk ZFS pool   | 32 GB                    |
| Apps + storage      | 32–64 GB                 |
| Large pool / VM use | 64 GB+                   |

Pitfalls:

| Pitfall                       | Explanation                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| ECC support mismatch          | CPU, motherboard, and RAM must all support the same ECC type |
| RDIMM vs UDIMM                | Registered ECC and unbuffered ECC are not interchangeable    |
| Old server RAM                | Cheap but hotter and higher power                            |
| Too little RAM with many Apps | Apps compete with ARC cache                                  |

### Motherboard

Check before buying:

| Item                  | Why It Matters                                |
| --------------------- | --------------------------------------------- |
| SATA count            | Determines disk capacity without add-in cards |
| M.2/SATA lane sharing | Some M.2 slots disable SATA ports             |
| ECC support           | Must match CPU and RAM                        |
| PCIe slots            | Needed for HBA, 10GbE, or GPU                 |
| BIOS power restore    | Useful after outage                           |
| Video output          | Needed for installation and troubleshooting   |

Avoid motherboard RAID. Use direct disk access with ZFS.

### HBA and SATA Cards

Prefer IT-mode HBA cards for many disks.

| Good                     | Avoid                             |
| ------------------------ | --------------------------------- |
| LSI/Broadcom IT-mode HBA | Fake RAID cards                   |
| Proper cooling           | Uncooled server HBA in small case |
| Direct disk visibility   | RAID mode hiding disks from ZFS   |

ZFS should see individual disks directly.

### Hard Drives

Prefer CMR drives for ZFS.

| Drive Type                 | Recommendation                |
| -------------------------- | ----------------------------- |
| CMR NAS HDD                | Good default                  |
| Enterprise HDD             | Good but noisy and hot        |
| SMR HDD                    | Avoid for ZFS pools           |
| Used mining/storage drives | Avoid unless tested carefully |
| 2.5-inch HDD               | Often SMR; check carefully    |

Noise and vibration matter. Enterprise drives can be much louder than consumer NAS drives and may need stronger airflow and vibration control.

### SSDs

SSDs are useful for boot, Apps, VMs, and metadata-heavy workloads.

| Use        | Recommendation                                            |
| ---------- | --------------------------------------------------------- |
| Boot       | Small SSD                                                 |
| Apps       | SSD dataset or small SSD pool                             |
| VM storage | SSD strongly recommended                                  |
| SLOG       | Only useful for sync writes; use power-loss-protected SSD |
| L2ARC      | Usually unnecessary for small home NAS                    |

Do not add cache devices casually. Many small NAS builds benefit more from more RAM than from L2ARC.

### Power Supply

NAS power supply planning must account for disk spin-up.

| Check                  | Reason                          |
| ---------------------- | ------------------------------- |
| SATA power connectors  | Avoid too many splitters        |
| 12V capacity           | HDD spin-up load can be high    |
| PSU form factor        | NAS cases may require SFX or 1U |
| Efficiency at low load | NAS idles most of the time      |
| UPS compatibility      | Needed for graceful shutdown    |

Avoid powering too many drives from one modular SATA cable.

### Network Card

| Need                   | Recommendation                     |
| ---------------------- | ---------------------------------- |
| Basic home NAS         | 1GbE                               |
| Large file transfer    | 2.5GbE                             |
| Multiple heavy clients | 10GbE                              |
| Old 10GbE cards        | Check 2.5GbE downshift support     |
| TrueNAS compatibility  | Check driver support before buying |

Some old 10GbE NICs are cheap but hot, power-hungry, or poor at 2.5GbE compatibility.

### Case and Cooling

| Check              | Why                                         |
| ------------------ | ------------------------------------------- |
| Drive bays         | Enough for initial pool and expansion       |
| Airflow over disks | HDD life depends on cooling                 |
| Vibration damping  | Important for many HDDs                     |
| PSU size           | Many NAS cases are SFX or 1U only           |
| CPU cooler height  | Small NAS cases often reject tower coolers  |
| Backplane quality  | Bad backplanes cause mysterious disk errors |

Dense 2U/4U chassis may require high-RPM fans. Quiet home environments often prefer fewer, larger fans.

## 22. RAID and ZFS Pitfalls

### RAID-Z1

RAIDZ1 is capacity-efficient but risky with large disks. If one disk fails, the rebuild reads all remaining disks. If another disk fails or a serious read error occurs during rebuild, data can be lost.

Use RAIDZ1 only when:

| Condition             | Required   |
| --------------------- | ---------- |
| Data is not critical  | Yes        |
| Backup exists         | Yes        |
| Disk count is small   | Yes        |
| Disk size is moderate | Preferably |

### RAID-Z2

RAIDZ2 is the safer default for many 4–8 disk NAS builds.

It tolerates two disk failures and is more appropriate for large HDDs.

### Mirrors

Mirrors are simple, fast, and easy to expand by adding another mirror vdev.

Good for:

| Use Case          | Why                            |
| ----------------- | ------------------------------ |
| Small NAS         | Simple recovery                |
| VM storage        | Better random I/O              |
| Gradual expansion | Add another mirror pair        |
| Fast rebuild      | Less stressful than wide RAIDZ |

### RAID Is Not Backup

Snapshots protect against accidental deletion and ransomware only if retained safely. They do not protect against pool loss, fire, theft, power damage, or catastrophic user error.

Use at least one backup outside the NAS.

## 23. Recommended Build Patterns

### Basic Home NAS

```text
CPU: Low-power Intel with iGPU
RAM: 16–32 GB
Disks: 2 × CMR NAS HDD mirror
Boot: Small SSD
Network: 1GbE or 2.5GbE
UPS: Yes
```

### Media NAS with Apps

```text
CPU: Intel iGPU preferred
RAM: 32 GB+
Disks: 4–6 × CMR HDD, RAIDZ2
Apps: SSD-backed dataset
Network: 2.5GbE or 10GbE
UPS: Yes
```

### Research / Workstation Storage NAS

```text
CPU: Modern multi-core CPU
RAM: 64 GB+
Disks: RAIDZ2 or mirror vdevs
Network: 10GbE
Apps: Minimal; storage first
UPS: Required
```

### Avoid

```text
No-name NAS motherboard + many disks + weak PSU
SMR drives in RAIDZ
No backup
No UPS
TrueCharts-heavy app stack on 24.04 with no migration plan
Motherboard RAID
Unlabeled disks
Random vdev expansion
```

## 24. Minimal Operating Routine

After the NAS is running:

| Task                 | Frequency                   |
| -------------------- | --------------------------- |
| Check alerts         | Weekly                      |
| Check pool status    | Weekly                      |
| Scrub                | Monthly or default schedule |
| SMART short test     | Weekly                      |
| SMART long test      | Monthly                     |
| Export config backup | After major changes         |
| Test restore path    | Occasionally                |
| Verify UPS shutdown  | After UPS setup             |

Shell checks:

```bash
zpool status
zpool list
df -h
smartctl -a /dev/sdX
```

## 25. Upgrade Warning for 24.04 Users

If Apps matter, do not upgrade from 24.04 to 24.10+ casually.

Before upgrading:

| Check            | Action                    |
| ---------------- | ------------------------- |
| Official Apps    | Review migration notes    |
| TrueCharts Apps  | Plan manual migration     |
| Custom Apps      | Back up config and data   |
| App datasets     | Snapshot and backup       |
| Catalog list     | Record installed catalogs |
| Network settings | Export config             |
| Pool status      | Scrub before upgrade      |

TrueNAS documentation states that 24.10 moves the Apps backend from Kubernetes to Docker, and that third-party catalog apps such as TrueCharts do not automatically migrate.

There was also a later app migration deadline: the 24.04 Apps UI reference says migration from 24.04 to 24.10 was supported before June 1, 2025, but not supported after that date in the same way.

## 26. Final Advice

For TrueNAS SCALE 24.04 and earlier, the safest mental model is:

```text
Storage first.
Apps second.
Catalogs are convenient, not permanent infrastructure.
Backups matter more than RAID layout.
Hardware compatibility matters more than theoretical performance.
```

Use TrueNAS as a reliable ZFS storage appliance. Add Apps only when they are easy to back up, easy to migrate, and not essential to accessing the stored data.

<!-- ## Full hardware spec

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
| Cooler | Phantom Spirit 120 SE | 125mm * 110mm * 155mm | -->