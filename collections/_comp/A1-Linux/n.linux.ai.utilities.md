---
category: Notes
title: Linux Utilities and AI Tools
tags: Linux
---

## ffmpeg

```shell
## Transfoer all videos to audios
ls | xargs -I {} ffmpeg -i {} -b:a 192K -vn {}.mp3
```

## whisper

```shell
## Generate subtitle for all files
whisper --model large --output_format all --language en --word_timestamps True --max_line_width 999 *
```

## whisperx

Whisper is very poor at sentence segmentation, often splitting a sentence into two paragraphs or mixing two sentences together. WhisperX works better at sentence segmentation.

## miniconda

```shell
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash ./Miniconda3-latest-Linux-x86_64.sh
ource ~/.bashrc
```

## ollama

```shell
ollama serve
## 45G vram +
ollama run llama3.3
## 22G vram +
ollama run qwen2.5:32b
## 8G vram +, 7b by default
ollama run qwen2.5
```
## marker

```shell
## transfer pdfs to md texts
marker --output_dir marker_output/ --output_format markdown marker_input/ --workers 3


```

## install ollama in cn

curl cannot connect to the official site of ollama.

```
export OLLAMA_MIRROR="https://ghproxy.cn/https://github.com/ollama/ollama/releases/latest/download"
curl -fsSL https://ollama.com/install.sh | sed "s|https://ollama.com/download|$OLLAMA_MIRROR|g" | sh
```