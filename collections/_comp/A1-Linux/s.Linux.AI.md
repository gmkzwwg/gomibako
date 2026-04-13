---
layout: post
category: Sheet
subclass: Linux
abbreviation: Linux AI
title: Linux AI Tools - Quick Reference and Minimal Tutorial
toc_before_content: compact
todos: 框架已成！
---

## Model Runners & Local Inference

### Ollama

Provides the easiest local model runner for Linux users by handling model download, management, and inference behind a simple CLI and local service interface.

### llama.cpp

Provides lightweight local LLM inference in C/C++ with minimal setup and broad hardware support, making it one of the most important Linux tools for running quantized open models locally.

### vLLM

Provides high-throughput LLM serving and an OpenAI-compatible API layer, making it a strong choice for Linux users who need serious local or server-side inference rather than single-user desktop chat.

### SGLang

Provides high-performance LLM serving and agent-oriented inference workflows, and is mainly used when low-latency structured generation or serving efficiency matters.

### LocalAI

Provides an OpenAI-compatible self-hosted AI runtime for multiple model types, making it useful when one Linux box needs a unified local AI API rather than many separate runtimes.

### Jan

Provides a desktop-style local AI client for running and chatting with models on Linux, positioned between a GUI app and a lightweight self-hosted assistant.

### GPT4All

Provides an easy local desktop and CLI workflow for running smaller offline models on Linux, especially for users who want a low-friction entry point.

## Chat UIs & Self-Hosted AI Frontends

### Open WebUI

Provides an extensible self-hosted AI web interface that works offline and supports Ollama plus OpenAI-compatible backends, making it one of the strongest Linux frontends for local AI.

### LibreChat

Provides a multi-provider chat UI that can connect to both local and remote model backends, making it useful when Linux users want one interface for mixed providers.

### LobeChat

Provides a polished multi-model chat frontend with local-backend support, positioned as a more UI-focused chat layer above model providers.

### text-generation-webui

Provides a broad web UI for local text-generation models and is commonly used by Linux users who want flexible backend support and many community integrations.

### Chainlit

Provides a fast way to build and expose conversational AI apps from Python code, making it more of an app layer than a pure chat client.

### Gradio

Provides an easy web interface layer for demos, prototypes, and model tools, and is widely used to expose local AI pipelines on Linux.

## Coding Agents & Terminal AI

### Aider

Provides Git-aware terminal coding assistance and is useful when Linux users want an AI coding agent that works directly in an existing repository.

### Claude Code–style local wrappers

Provide terminal-first coding-agent workflows around existing model APIs or local backends, making them useful for shell-centric development environments.

### Open WebUI Tools

Provide Python-executed server-side tools inside the chat environment, making Open WebUI useful not only as a chat frontend but also as an extensible Linux AI workspace.

## Speech-to-Text & Audio Understanding

### whisper.cpp

Provides fast local speech-to-text on Linux with lightweight deployment and broad platform support, making it one of the most practical offline transcription tools.

### faster-whisper

Provides faster Whisper inference through an optimized implementation and is useful when Python-based batch transcription matters more than a pure C/C++ stack.

### WhisperX

Provides transcription with improved alignment and diarization workflows, making it more suitable for research, interviews, and subtitle-quality outputs.

### FFmpeg

Provides audio and video decoding, conversion, resampling, and stream extraction, making it a core support dependency for transcription tools such as Whisper-based pipelines.

### yt-dlp

Provides robust downloading of online audio and video sources and is often used to feed podcast, lecture, or video audio into transcription tools.

## Text-to-Speech & Voice Output

### Piper

Provides fast local neural text-to-speech on Linux and is a practical choice for offline assistants and scripted voice output.

### Coqui TTS

Provides flexible text-to-speech and voice-cloning workflows and is often used when experimentation matters more than minimal deployment.

### espeak-ng

Provides lightweight text-to-speech and phoneme utilities and is often used as a fallback or support layer in Linux voice pipelines.

### sox

Provides command-line audio manipulation and is useful for trimming, resampling, and cleaning audio before or after AI voice processing.

## OCR, Document Parsing & Vision Extraction

### Tesseract

Provides OCR for scanned documents and images and remains one of the most common Linux OCR tools in AI document pipelines.

### OCRmyPDF

Provides an OCR pipeline for PDFs by combining OCR and PDF rewriting, making it one of the most useful support tools for searchable-document workflows on Linux.

### PaddleOCR

Provides stronger OCR for complex layouts and multilingual documents and is often used when plain Tesseract accuracy is insufficient.

### Poppler tools

Provide PDF text and page extraction utilities such as `pdftotext` and `pdfimages`, making them useful support tools before OCR or RAG ingestion.

### ImageMagick

Provides image conversion, cropping, thresholding, and cleanup and is often used to improve OCR inputs before recognition.

## Embeddings, RAG & Knowledge Retrieval

### LlamaIndex

Provides a framework for indexing documents and building retrieval-augmented AI applications, making it a common Linux-side RAG orchestration layer.

### LangChain

Provides chaining, tool-calling, retrieval, and agent abstractions for AI applications, and is commonly used as a glue layer in Linux AI stacks.

### Chroma

Provides a lightweight vector database for embeddings and retrieval workflows.

### FAISS

Provides high-performance vector similarity search and is a core building block for local retrieval systems.

### Qdrant

Provides a production-capable vector database and is useful when local experimentation grows into a service.

### Milvus

Provides a larger-scale vector database for embedding-heavy retrieval systems and is usually used in more serious infrastructure setups.

### Unstructured

Provides document partitioning and extraction workflows for messy real-world files before chunking and retrieval.

### Apache Tika

Provides content extraction from many file formats and is useful as a support layer for ingestion pipelines.

## Image Generation & Visual Workflows

### ComfyUI

Provides a graph-based interface and backend for diffusion workflows on Linux, making it one of the most powerful visual AI tools for image-generation pipelines.

### AUTOMATIC1111 Stable Diffusion WebUI

Provides a broad web UI for Stable Diffusion workflows and remains a common Linux entry point for image generation and experimentation.

### InvokeAI

Provides a more workflow-oriented image-generation interface and is useful when users want a cleaner application experience around local diffusion models.

### Fooocus

Provides a simpler image-generation experience focused on ease of use rather than deep graph-based control.

### comfy-cli

Provides command-line interaction with ComfyUI workflows and is useful for scripting repeatable Linux image pipelines.

## Model Files, Formats & Weight Management

### Hugging Face CLI

Provides authenticated download, upload, and repository interaction for models and datasets hosted on Hugging Face.

### git-lfs

Provides large-file support for Git repositories and is a common dependency when cloning model or dataset repositories that store weights outside normal Git blobs.

### GGUF

Provides a practical model file format widely used by llama.cpp and related local-inference tools for quantized models.

### safetensors

Provides a safer and faster tensor serialization format widely used in model distribution.

### aria2

Provides fast multi-connection downloading and is useful for large model files on Linux systems.

### rsync

Provides efficient copying and synchronization and is useful for moving large model directories across machines or storage volumes.

## Model Serving APIs & Integration Layers

### OpenAI-compatible APIs

Provide a common request format that allows Linux tools and applications to switch between local and remote inference backends with minimal code changes.

### LiteLLM

Provides a unified proxy and abstraction layer over many model providers and backends, making multi-backend Linux setups easier to standardize.

### FastAPI

Provides a practical Python API layer for wrapping local models, tools, and RAG pipelines into internal services.

### Nginx

Provides reverse proxying, TLS termination, and routing and is often used to expose local AI services safely on Linux.

### Caddy

Provides an easier reverse-proxy and HTTPS experience for small self-hosted AI deployments.

## Training, Fine-Tuning & Acceleration

### transformers

Provides the core Python interface for loading and using many open-source models in research and custom inference workflows.

### PyTorch

Provides the dominant deep-learning runtime for model training, fine-tuning, and custom inference on Linux.

### PEFT

Provides parameter-efficient fine-tuning methods such as LoRA and is useful when full fine-tuning is too expensive.

### bitsandbytes

Provides quantization and memory-saving techniques that help fit larger models onto limited hardware.

### Axolotl

Provides a streamlined fine-tuning workflow for open models and is commonly used in practical Linux LoRA training setups.

### Unsloth

Provides optimized fine-tuning workflows for LLMs with a focus on faster and lighter training.

### accelerate

Provides device placement and distributed training helpers for PyTorch-based workflows.

### deepspeed

Provides large-scale training and inference optimization for bigger Linux GPU systems.

## Evaluation, Benchmarking & Prompt Testing

### lm-evaluation-harness

Provides a standardized framework for benchmarking language models across many evaluation tasks.

### promptfoo

Provides prompt testing, regression checks, and evaluation workflows for AI applications.

### OpenAI Evals–style local workflows

Provide structured evaluation patterns for prompts, outputs, and application behavior.

### hyperfine

Provides command-line benchmarking and is useful for comparing inference latency and throughput across Linux AI tools.

## Hardware, Drivers & Inference Support

### NVIDIA Driver

Provides the kernel-space and user-space GPU stack required for CUDA-based AI workflows on Linux.

### CUDA

Provides the core GPU compute platform used by many Linux AI frameworks and inference servers.

### cuDNN

Provides optimized neural-network primitives used by many CUDA-based AI workloads.

### ROCm

Provides AMD GPU compute support on Linux and is required for many AMD-accelerated local AI workflows.

### Intel oneAPI / IPEX-LLM

Provide Intel-focused acceleration paths for local LLM inference and serving, including integrations with Ollama, llama.cpp, and vLLM.

### Vulkan

Provides a graphics and compute backend used by some local-inference and image-generation tools.

### OpenCL

Provides a general compute backend still used by some Linux-side acceleration paths and legacy tooling.

## Python & Packaging Support for AI Workflows

### uv

Provides a fast Python environment and package manager and is especially useful for AI projects with heavy dependency churn.

### pip

Provides package installation for Python-based AI tooling and remains the default fallback in many projects.

### conda

Provides environment isolation and binary package management that is especially useful in GPU, scientific, and mixed-language AI stacks.

### venv

Provides lightweight Python environment isolation for simpler local AI projects.

### poetry

Provides Python dependency and project management and is useful when AI tooling is part of a larger application codebase.

## Media, Files & Preprocessing Support Tools

### ffmpeg

Provides the essential media conversion layer for transcription, TTS preprocessing, audio slicing, and video-to-audio extraction workflows.

### sox

Provides command-line audio editing and signal processing for datasets and voice workflows.

### imagemagick

Provides image conversion and cleanup for OCR, captioning, and vision-model preprocessing.

### pdftotext

Provides simple text extraction from PDFs and is often the first step before OCR or RAG.

### pdfimages

Extracts embedded images from PDFs and is useful when documents need image-based OCR or multimodal processing.

### unzip / tar

Provide archive extraction support for downloaded models, datasets, and offline bundles.

## Remote Access, Deployment & Self-Hosting Support

### Docker

Provides the easiest deployment path for many Linux AI tools, especially Open WebUI, ComfyUI, vector databases, and model-serving stacks.

### docker compose

Provides reproducible multi-service local AI stacks such as model runner plus frontend plus vector database.

### Podman

Provides a rootless container workflow and is useful on Linux systems that avoid Docker daemon usage.

### systemd

Provides service supervision for persistent AI daemons such as Ollama, vLLM, and custom inference APIs.

### tmux

Provides persistent terminal sessions and is useful for long-running downloads, model conversion, or fine-tuning jobs.

### ssh

Provides remote access to Linux AI servers and is the default control path for headless deployments.

## Recommended Minimal Stacks

### Minimal local chat stack

Use Ollama plus Open WebUI for the fastest path to a local Linux chat assistant with a web UI.

### Minimal offline transcription stack

Use whisper.cpp plus ffmpeg for a lightweight Linux speech-to-text workflow with minimal overhead.

### Minimal local RAG stack

Use Ollama or llama.cpp for inference, plus LlamaIndex or LangChain, plus FAISS or Chroma for retrieval.

### Minimal image-generation stack

Use ComfyUI plus a model manager and optionally Docker for a strong Linux visual-generation workflow.

### Minimal server-grade LLM stack

Use vLLM plus an OpenAI-compatible API layer, reverse-proxied by Nginx or Caddy, when Linux deployment and throughput matter more than desktop simplicity.

### ffmpeg

```shell
## Transfoer all videos to audios
ls | xargs -I {} ffmpeg -i {} -b:a 192K -vn {}.mp3
```

### whisper

```shell
## Generate subtitle for all files
whisper --model large --output_format all --language en --word_timestamps True --max_line_width 999 *
```

### whisperx

Whisper is very poor at sentence segmentation, often splitting a sentence into two paragraphs or mixing two sentences together. WhisperX works better at sentence segmentation.

### miniconda

```shell
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash ./Miniconda3-latest-Linux-x86_64.sh
ource ~/.bashrc
```

### ollama

```shell
ollama serve
## 45G vram +
ollama run llama3.3
## 22G vram +
ollama run qwen2.5:32b
## 8G vram +, 7b by default
ollama run qwen2.5
```

### marker

```shell
## transfer pdfs to md texts
marker --output_dir marker_output/ --output_format markdown marker_input/ --workers 3


```

### install ollama in cn

curl cannot connect to the official site of ollama.

```
export OLLAMA_MIRROR="https://ghproxy.cn/https://github.com/ollama/ollama/releases/latest/download"
curl -fsSL https://ollama.com/install.sh | sed "s|https://ollama.com/download|$OLLAMA_MIRROR|g" | sh
```
