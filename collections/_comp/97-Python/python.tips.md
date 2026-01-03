---
category: Notes
title: Python Using Tips
tags: Python
---


## Error Installing by pip: externally-managed-environment

When you use pip to install Python packages, you may encounter an ‘`externally-managed-environment`’ error. This error occurs because your Python environment is “externally managed” by a package manager, which prevents direct use of pip for system-wide installations to avoid conflicts or issues.

```shell
× This environment is externally managed
╰─> To install Python packages system-wide, try 'pacman -S
    python-xyz', where xyz is the package you are trying to
    install.

    If you wish to install a non-Arch-packaged Python package,
    create a virtual environment using 'python -m venv path/to/venv'.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip.

    If you wish to install a non-Arch packaged Python application,
    it may be easiest to use 'pipx install xyz', which will manage a
    virtual environment for you. Make sure you have python-pipx
    installed via pacman.
```

Error: externally-managed-environment occurs when a package manager is managing a Python environment, which prevents direct use of pip. 

**Solution 1: Using a virtual environment**

```shell
python3 -m venv ~/py_envs
source ~/py_envs/bin/activate
python3 -m pip install xyz
```

**Solution 2: Force Install**

pip install xyz --break-system-packages.

## Bad Network Connection with pip

Change mirror:
```shell
# tsinghua mirror
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

# ali mirror
pip config set http://mirrors.aliyun.com/pypi/simple/
pip config set install.trusted-host mirrors.aliyun.com
```

## install torch GPU version

```shell
nvidia-smi
# find cuda version first

pip install torch==2.8.0 torchaudio==2.8.0 --index-url https://download.pytorch.org/whl/cu129
```

## install specified version of packages at Github

```shell
pip install git+https://github.com/USERNAME/PACKAGENAME.git@<COMMIT/>

# example

pip install git+https://github.com/openai/whisper.git@v20231117 # version

pip install git+https://github.com/openai/whisper.git@dev-branch # branch

pip install git+https://github.com/openai/whisper.git@a1b2c3d4 # commit

pip install git+https://github.com/user/repo.git@commit#subdirectory=path/to/package # sub dir
```

