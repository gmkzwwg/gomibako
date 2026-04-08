---
layout: post
category: Sheet
subclass: Linux
abbreviation: Linux Developing
title: Linux Tools Developing - Quick Reference and Minimal Tutorial
toc_before_content: compact
todos: 
  - 补完
---

# Development Environment

## Environment & Version Management

### asdf

Manages multiple language runtimes and developer tools through a single version manager across projects.

### direnv

Automatically loads and unloads environment variables based on the current directory, making per-project environment setup easier.

### sdk

Manages SDK versions for JVM-related tools such as Java, Kotlin, and Gradle in multi-project environments.

### pyenv

Manages multiple Python versions on one machine and is mainly used to select interpreter versions per shell or project.

### rustup

Installs and switches Rust toolchains, targets, and components and is the standard Rust version manager.

### corepack

Manages package-manager shims such as pnpm and Yarn so JavaScript projects can pin their package-manager versions.

### conda

Manages environments and packages across Python and other ecosystems, especially in scientific and data-oriented workflows.

## Editors, Terminal & Shell Workflow

### vim

Provides a modal terminal editor widely used for quick edits, remote work, and keyboard-driven development.

### nvim

Provides a modern Vim-based editor with strong plugin support and rich language-server integration.

### emacs

Provides an extensible editor and computing environment for advanced editing, scripting, and development workflows.

### tmux

Provides terminal multiplexing so multiple shells, panes, and long-running sessions can be managed in one terminal session.

### screen

Provides detachable terminal sessions and is often used on systems where tmux is unavailable.

### fzf

Provides fuzzy interactive selection for files, history, branches, and command output in terminal workflows.

### bat

Displays files with syntax highlighting and is often used as a more readable replacement for cat in development work.

### eza

Provides an enhanced directory listing experience and is often used as a modern replacement for ls.

### shellcheck

Analyzes shell scripts for common bugs, portability issues, and unsafe patterns.

### shfmt

Formats shell scripts consistently according to shell-aware parsing rules.

## Search, Diff & Repo Navigation

### rg

Provides fast recursive text search and is one of the most useful tools for navigating large codebases.

### fd

Provides a fast and simple file finder for project trees and is often used as a modern replacement for find.

### fzf

Provides fuzzy interactive selection for filenames, branches, commits, and search results.

### bat

Displays source files with syntax highlighting for quick code inspection from the terminal.

### diff

Compares files or directories and outputs textual differences.

### patch

Applies unified diff patches to source trees and review workflows.

### delta

Provides syntax-highlighted and improved diff viewing for Git and patch output.

## Structured Data & Formats

### jq

Processes and transforms JSON data from the command line with a powerful query language.

### yq

Processes YAML, and often JSON as well, using a command-line query and transformation interface.

### xmlstarlet

Queries, edits, and transforms XML documents from the command line.

### dasel

Queries and edits structured data across formats such as JSON, YAML, TOML, and XML.

### csvkit

Provides a suite of tools for inspecting and manipulating CSV data.

### xsv

Provides fast CSV processing tools optimized for performance on large datasets.

### mlr

Processes tabular and structured data streams and is especially useful for CSV, TSV, and JSON workflows.

### pandoc

Converts documents between markup and publishing formats and is widely used in technical writing pipelines.

### base64

Encodes and decodes data using Base64, commonly for transport or embedding binary content in text workflows.

### openssl

Provides cryptographic utilities for hashing, certificates, encryption, TLS inspection, and key handling.

### python -m json.tool

Pretty-prints and validates JSON using the Python standard library.

## Version Control & Review

### git

Provides distributed version control for source code and text-based project history.

#### Repository setup

```bash
git init
git clone <url> <path>
git remote add origin <url>
git remote -v
git remote set-url origin <url>
```

#### Daily workflow

```bash
git status
git add <file>
git add .
git commit -m "<message>"
git pull --rebase
git push origin <branch>
```

#### Branch workflow

```bash
git switch -c <branch>
git switch <branch>
git branch
git merge <branch>
git branch -d <branch>
git push origin --delete <branch>
```

#### Inspection

```bash
git log --oneline --graph --decorate
git show <commit>
git diff
git diff --stat
git grep -n <pattern>
```

#### Safe undo

```bash
git restore <file>
git restore --staged <file>
git revert <commit>
git reset --soft HEAD~1
```

#### History rewrite

```bash
git reset --hard <commit>
git push --force-with-lease
```

### gh

Provides a command-line interface for GitHub workflows such as pull requests, issues, releases, and repository operations.

### tig

Provides a terminal UI for browsing Git history, diffs, and repository state interactively.

### git-lfs

Manages large files in Git repositories by storing pointers in Git and content in external storage.

### git bisect

Performs a binary search through Git history to identify the commit that introduced a regression.

### git grep

Searches tracked repository content efficiently using Git-aware search behavior.

### git worktree

Allows multiple working trees for the same repository so different branches can be checked out in parallel.

### delta

Provides an improved pager and syntax-highlighted viewer for diffs and Git output.

### pre-commit

Manages and runs Git hook-based checks before commits to enforce code quality and repository policy.

### patch

Applies unified diff patches to files and is commonly used in review and source distribution workflows.

### diff

Compares files or directories and outputs textual differences.

## Build, Automation & Task Runners

### make

Automates builds and task execution through dependency-based rules defined in Makefiles.

### just

Provides a modern command runner for project tasks with simpler syntax than Make.

### task

Provides a YAML-based task runner for defining repeatable project automation commands.

### entr

Runs commands automatically when watched files change and is useful in fast edit-run loops.

### watchexec

Watches filesystem changes and reruns commands for development automation and local feedback loops.

## Containers & Images

### docker

Builds, runs, and manages application containers and container images.

### docker compose

Defines and runs multi-container applications using declarative service configuration.

### podman

Provides a daemonless container engine with Docker-compatible workflows and strong rootless support.

### buildah

Builds OCI container images with a scripting-friendly and daemonless interface.

### skopeo

Inspects, copies, and transfers container images between registries and local storage without running them.

### nerdctl

Provides a Docker-like CLI for containerd-based environments.

### trivy

Scans container images, filesystems, and repositories for vulnerabilities and configuration issues.

### dive

Inspects container image layers and helps analyze image size and composition.

### cosign

Signs, verifies, and attests container images and other software artifacts.

## Kubernetes & Local Cluster Tooling

### kubectl

Provides the main command-line interface for interacting with Kubernetes clusters and resources.

### helm

Manages Kubernetes applications as versioned packages called charts.

### kustomize

Customizes Kubernetes manifests through overlays and patch-based configuration.

### k9s

Provides a terminal UI for observing and operating Kubernetes clusters interactively.

### kubectx

Switches quickly between Kubernetes contexts.

### kubens

Switches quickly between Kubernetes namespaces.

### stern

Streams logs from multiple Kubernetes pods with label-based or name-based selection.

### kind

Runs local Kubernetes clusters inside containers, mainly for testing and development.

### minikube

Runs a local Kubernetes environment for development, experimentation, and learning.

### kubeadm

Bootstraps and manages Kubernetes cluster setup at a lower level and is mainly used in more advanced cluster workflows.

### istioctl

Manages and diagnoses Istio service mesh installations and configuration.

## Infrastructure & Secrets

### ansible

Automates configuration, provisioning, and orchestration using agentless remote execution.

### terraform

Defines and provisions infrastructure declaratively across cloud and service providers.

### terragrunt

Adds orchestration, DRY structure, and workflow helpers on top of Terraform.

### packer

Builds machine images automatically for cloud, VM, and appliance environments.

### vault

Stores and manages secrets, credentials, and encryption material with controlled access policies.

### sops

Encrypts structured configuration files while keeping them friendly to version control.

### age

Provides a simple modern file encryption format and tool for secure data protection.

### consul

Provides service discovery, configuration storage, and distributed coordination features.

## Observability Tooling

### promtool

Validates Prometheus configuration and alerting rules and supports operational checks around Prometheus setups.

### node_exporter

Exports host-level system metrics for collection by Prometheus.

### alertmanager

Routes, groups, silences, and delivers alerts from monitoring systems such as Prometheus.

### otelcol

Collects, processes, and exports telemetry data in the OpenTelemetry ecosystem.

### jaeger

Provides distributed tracing storage, query, and visualization capabilities.

### loki

Stores and queries logs with label-based indexing, often alongside Prometheus and Grafana.

### vector

Collects, transforms, and routes logs and metrics in observability pipelines.

### lnav

Provides an interactive terminal log viewer optimized for large and structured log files.

### grafana

Visualizes metrics, logs, and traces through dashboards and observability integrations.

## Databases, Messaging & API Clients

### psql

Provides the command-line client for PostgreSQL administration and query execution.

### mysql

Provides the command-line client for MySQL and compatible database systems.

### redis-cli

Provides the command-line interface for interacting with Redis servers.

### mongosh

Provides the interactive shell for MongoDB operations and queries.

### sqlite3

Provides the command-line shell for SQLite databases and local SQL inspection.

### duckdb

Provides a local analytical SQL engine with a strong command-line interface for ad hoc data analysis.

### clickhouse-client

Provides the command-line client for querying and managing ClickHouse databases.

### kcat

Provides a general-purpose command-line client for producing to and consuming from Kafka topics.

### rabbitmqctl

Provides administrative control for RabbitMQ nodes, users, queues, and cluster state.

### etcdctl

Provides administrative and data access commands for etcd clusters.

### grpcurl

Calls gRPC services from the command line without requiring a generated client.

### curl

Transfers data with URLs and is widely used for HTTP APIs, debugging, and service probing.

### httpie

Provides a user-friendly command-line HTTP client for testing and interacting with web APIs.

## Python

### python

Provides the Python interpreter for running scripts, modules, and interactive sessions.

### pip

Installs and manages Python packages in an environment.

### venv

Creates lightweight isolated Python environments using the standard library.

### pyenv

Manages multiple installed Python versions for local and per-project use.

### uv

Provides fast dependency installation and environment workflows for modern Python projects.

### poetry

Manages Python dependencies, packaging, and virtual environments with lockfile support.

### pipx

Installs Python CLI applications in isolated environments while exposing commands globally.

### ruff

Provides very fast linting and formatting support for Python code.

### mypy

Performs static type checking for Python code using type hints.

### pytest

Provides a flexible and widely used Python testing framework.

### ipython

Provides an enhanced interactive Python shell with better introspection and usability.

### jupyter

Provides notebook-based interactive computing for Python and other languages.

## JavaScript / TypeScript

### node

Provides the runtime for JavaScript and many CLI-based frontend and backend workflows.

### npm

Installs and manages JavaScript packages and project dependencies.

### pnpm

Provides efficient JavaScript dependency management with strong workspace support.

### yarn

Provides an alternative package manager for JavaScript projects with lockfile and workspace features.

### npx

Runs package binaries directly, often without permanent installation.

### corepack

Enables version-pinned package-manager workflows for tools such as pnpm and Yarn.

### tsc

Compiles TypeScript into JavaScript and performs type checking.

### tsx

Runs TypeScript files directly with minimal setup, often for development scripts and tools.

### eslint

Lints JavaScript and TypeScript code according to configurable rules.

### prettier

Formats JavaScript, TypeScript, and many other text formats consistently.

### vitest

Provides a fast testing framework aligned with modern frontend and Vite-based workflows.

### jest

Provides a widely used JavaScript testing framework with mocking and snapshot support.

## Go

### go

Provides the Go toolchain for building, testing, and managing Go modules.

### go mod

Manages module dependencies and version requirements for Go projects.

### go test

Runs Go tests and benchmarks within packages.

### gofmt

Formats Go source code according to the standard Go style.

### goimports

Formats Go code and automatically manages import statements.

### golangci-lint

Runs a large suite of Go linters through a unified interface.

### staticcheck

Performs advanced static analysis for Go code quality and correctness.

### dlv

Provides the standard debugger for Go programs.

### pprof

Analyzes runtime profiling data for Go applications.

### govulncheck

Checks Go code and dependencies for known vulnerabilities.

## Rust

### rustc

Compiles Rust source code into executables or libraries.

### cargo

Builds Rust projects, manages dependencies, and runs tests and related workflows.

### rustup

Installs and switches Rust toolchains, targets, and components.

### rustfmt

Formats Rust source code using the standard style conventions.

### clippy

Provides linting for Rust code with a focus on correctness and idiomatic style.

### cargo-edit

Adds, removes, and updates dependencies in Cargo manifest files conveniently.

### cargo-nextest

Provides an improved high-performance test runner for Rust projects.

### cargo-audit

Checks Rust dependencies for known security vulnerabilities.

### cargo-deny

Enforces policy checks for licenses, bans, advisories, and dependency sources.

### cargo-bloat

Analyzes which functions and dependencies contribute most to binary size.

## Java

### java

Runs Java applications on the JVM.

### javac

Compiles Java source files into JVM bytecode.

### jar

Packages and manipulates Java archive files.

### mvn

Builds and manages Java projects using Apache Maven.

### gradle

Builds and automates Java and JVM projects with a flexible task model.

### jcmd

Sends diagnostic commands to running JVM processes.

### jstack

Captures thread stack traces from running JVM processes.

### jmap

Inspects memory usage and heap data of JVM processes.

### jstat

Reports JVM statistics such as garbage collection and class loading activity.

### jfr

Records low-overhead runtime events for JVM profiling and diagnostics.

## C / C++

### gcc

Compiles C, C++, and related languages in the GNU toolchain.

### clang

Compiles C and C++ with the LLVM-based compiler toolchain.

### make

Builds targets according to dependency rules defined in Makefiles.

### cmake

Generates build system files and manages cross-platform native build configuration.

### ninja

Provides a fast build executor often generated by higher-level tools such as CMake.

### pkg-config

Reports compiler and linker flags for installed libraries.

### gdb

Provides source-level debugging for native programs.

### lldb

Provides a debugger in the LLVM ecosystem for native code.

### objdump

Inspects object files and binaries, including disassembly and section information.

### readelf

Displays ELF binary structure and metadata without requiring symbol disassembly.

### clangd

Provides language-server features such as completion, navigation, and diagnostics for C and C++.

## C# / .NET

### dotnet

Provides the .NET SDK and CLI for building, running, and managing .NET applications.

### nuget

Manages .NET packages and package sources.

### msbuild

Builds .NET and related projects through declarative project files.

### dotnet restore

Restores package dependencies for a .NET project.

### dotnet test

Builds and runs tests for .NET projects.

### dotnet publish

Produces distributable build output for deployment.

### dotnet format

Formats .NET code according to style and analyzer rules.

### dotnet watch

Rebuilds and reruns .NET applications automatically during development.

### dotnet-trace

Collects performance traces from running .NET processes.

### dotnet-sos

Provides advanced debugging extensions for .NET crash dumps and runtime inspection.

## Ruby

### ruby

Provides the Ruby interpreter for scripts and applications.

### gem

Installs and manages Ruby packages known as gems.

### bundle

Resolves, installs, and executes Ruby project dependencies through Bundler.

### rake

Provides a task runner commonly used for automation in Ruby projects.

### irb

Provides an interactive Ruby shell for experimentation and inspection.

### rbenv

Manages multiple Ruby versions per user and per project.

### rubocop

Lints and formats Ruby code according to style and quality rules.

### rspec

Provides a widely used testing framework for Ruby applications.

### yard

Generates documentation from Ruby source code and comments.

### pry

Provides an enhanced interactive Ruby shell with debugging-friendly features.

## PHP

### php

Provides the PHP runtime and command-line interpreter.

### composer

Manages PHP dependencies and autoloading for projects.

### phpunit

Provides the standard testing framework for PHP applications.

### phpstan

Performs static analysis for PHP code to detect type and logic issues.

### psalm

Performs advanced static analysis for PHP with strong type inference.

### php-cs-fixer

Formats and fixes PHP code style automatically.

### phpcs

Checks PHP code against coding standards and style rules.

### xdebug

Provides debugging, profiling, and coverage support for PHP.

### pecl

Installs and manages PHP extensions distributed through PECL.

### php-fpm

Runs PHP as a FastCGI process manager for web server integration.

## Kotlin

### kotlinc

Compiles Kotlin source code for the JVM and other supported targets.

### kotlin

Runs Kotlin programs and scripts from the command line.

### gradle

Builds and manages dependencies for Kotlin projects, especially on the JVM and Android.

### gradlew

Runs the project-pinned Gradle wrapper version for reproducible builds.

### ktlint

Lints and formats Kotlin code according to standard conventions.

### detekt

Performs static analysis for Kotlin code quality and maintainability.

### kover

Collects and reports code coverage for Kotlin projects.

### dokka

Generates documentation for Kotlin source code.

### kdoctor

Checks the local environment for Kotlin Multiplatform and related development setup issues.

### jfr

Provides JVM runtime recording and profiling for Kotlin applications running on the JVM.

## Scala

### scalac

Compiles Scala source code into JVM bytecode.

### scala

Runs Scala code and provides a REPL environment.

### sbt

Builds Scala projects and manages dependencies and tasks.

### scala-cli

Provides a lightweight way to run, build, and package Scala code with minimal setup.

### amm

Provides the Ammonite REPL and scripting environment for Scala.

### scalafmt

Formats Scala code according to configured style rules.

### scalafix

Performs automated refactoring and lint-driven rewrites for Scala code.

### cs

Provides Coursier-based dependency fetching, launching, and installation for Scala tools.

### bloop

Provides a fast Scala build server used by development tools and editors.

### metals

Provides language-server functionality for Scala development.

## R

### R

Provides the interactive R environment for statistical computing.

### Rscript

Runs R scripts non-interactively from the command line.

### pak

Provides fast package installation and dependency resolution for R.

### renv

Creates project-local reproducible R library environments.

### devtools

Supports R package development workflows such as testing, checking, and documentation.

### testthat

Provides the standard unit testing framework for R packages.

### lintr

Lints R code for style and quality issues.

### R CMD check

Runs the standard R package quality and compatibility checks.

### R CMD build

Builds an R package source bundle for distribution.

### quarto

Generates reports, notebooks, and publishing outputs integrating code and narrative text.

## Julia

### julia

Provides the Julia runtime and interactive language environment.

### Pkg

Manages Julia packages, environments, and dependency resolution.

### juliaup

Manages Julia versions and channels on a machine.

### Revise.jl

Keeps Julia code changes live in a running session to improve development workflow.

### IJulia

Provides Jupyter notebook support for Julia.

### Pluto.jl

Provides a reactive notebook environment for Julia.

### Documenter.jl

Generates documentation sites from Julia packages and source code.

### BenchmarkTools.jl

Provides reliable benchmarking utilities for Julia code.

### Debugger.jl

Provides interactive debugging support for Julia programs.

### PackageCompiler.jl

Builds system images and standalone applications from Julia code.

## Shell (Bash / Zsh / Fish)

### bash

Provides the Bourne Again Shell, widely used for scripting and interactive shell work.

### zsh

Provides a powerful interactive shell with advanced completion and customization features.

### fish

Provides a user-friendly interactive shell with discoverable syntax and strong defaults.

### shellcheck

Analyzes shell scripts for common bugs, portability issues, and bad practices.

### shfmt

Formats shell scripts consistently according to shell-aware rules.

### bats

Provides a testing framework for Bash and POSIX-style shell scripts.

### zunit

Provides a unit testing framework for Zsh scripts.

### bashate

Checks Bash scripts for style issues according to defined conventions.

### direnv

Automatically loads shell environment variables based on directory context.

### fzf

Provides fuzzy interactive selection useful in shell workflows and custom shell integrations.

## Lua

### lua

Provides the standard Lua interpreter.

### luajit

Provides a high-performance JIT-compiled implementation of Lua.

### luarocks

Installs and manages Lua packages known as rocks.

### stylua

Formats Lua code automatically according to consistent style rules.

### luacheck

Lints Lua code for common problems and style issues.

### busted

Provides a testing framework for Lua projects.

### lua-language-server

Provides language-server functionality for Lua editors and IDEs.

### luac

Compiles Lua source into bytecode and can inspect compiled chunks.

### mobdebug

Provides debugging support commonly used in Lua development environments.

### luaunit

Provides a unit testing framework for Lua.

## Perl

### perl

Provides the Perl interpreter for scripts and command-line text processing.

### cpanm

Installs Perl modules from CPAN with a lightweight interface.

### cpan

Provides the traditional interactive client for installing Perl modules from CPAN.

### perlbrew

Manages multiple Perl installations for a user.

### local::lib

Creates and uses user-local Perl module installation paths.

### carton

Manages Perl project dependencies in a reproducible way.

### prove

Runs Perl test suites, especially those based on TAP.

### perltidy

Formats Perl source code according to style rules.

### perlcritic

Analyzes Perl code against best-practice and policy guidelines.

### plenv

Manages multiple Perl versions in a style similar to pyenv and rbenv.

## Haskell

### ghc

Compiles Haskell source code with the Glasgow Haskell Compiler.

### ghci

Provides the interactive Haskell REPL environment.

### cabal

Builds Haskell projects and manages dependencies through the Cabal ecosystem.

### stack

Builds Haskell projects with curated toolchain and dependency management.

### hlint

Suggests improvements and idiomatic rewrites for Haskell code.

### ormolu

Formats Haskell code using a consistent standard style.

### ghcid

Provides fast reload and feedback loops for Haskell compilation during development.

### haskell-language-server

Provides language-server support for Haskell editors.

### tasty

Provides a composable testing framework for Haskell.

### criterion

Provides benchmarking utilities for Haskell code.

## OCaml

### ocaml

Provides the OCaml toplevel and runtime environment.

### utop

Provides an enhanced interactive REPL for OCaml.

### opam

Manages OCaml compiler versions and packages.

### dune

Builds OCaml projects and manages project structure and workflows.

### ocamlformat

Formats OCaml source code automatically.

### ocaml-lsp-server

Provides language-server support for OCaml development.

### merlin

Provides editor tooling such as completion and type inspection for OCaml.

### odoc

Generates documentation from OCaml interfaces and source metadata.

### alcotest

Provides a lightweight testing framework for OCaml.

### ppxlib

Provides infrastructure for syntax extensions and code generation in OCaml.

## Swift

### swift

Provides the Swift toolchain entry point for building and running Swift code.

### swiftc

Compiles Swift source code directly.

### swift package

Manages Swift packages and dependencies through Swift Package Manager.

### swift test

Builds and runs tests for Swift packages.

### swift-format

Formats Swift source code according to standard style rules.

### swiftlint

Lints Swift code for style and quality issues.

### sourcekit-lsp

Provides language-server functionality for Swift development tools.

### lldb

Provides debugging support for Swift and other native programs.

### swift build

Builds targets defined in a Swift package.

### swift run

Builds and runs a target from a Swift package.

## Erlang / Elixir

### erl

Provides the Erlang shell and runtime environment.

### rebar3

Builds and manages dependencies for Erlang projects.

### mix

Builds, tests, and manages dependencies for Elixir projects.

### iex

Provides the interactive Elixir shell.

### hex

Provides package management for Elixir and Erlang ecosystems.

### dialyzer

Performs success typing analysis for Erlang and Elixir code.

### credo

Lints Elixir code for readability, consistency, and design issues.

### observer

Provides a runtime inspection tool for Erlang and Elixir systems.

### ex_unit

Provides the built-in testing framework for Elixir.

### relx

Builds Erlang and Elixir releases for deployment.

## Dart / Flutter

### dart

Provides the Dart runtime and command-line development tools.

### pub

Manages Dart packages and dependencies.

### flutter

Provides the Flutter SDK and CLI for building cross-platform applications.

### dart format

Formats Dart source code consistently.

### dart analyze

Performs static analysis for Dart code.

### dart test

Runs Dart test suites.

### flutter test

Runs test suites for Flutter applications.

### build_runner

Runs code-generation pipelines in Dart projects.

### fvm

Manages multiple Flutter SDK versions.

### melos

Manages monorepo workflows for Dart and Flutter projects.

## Clojure

### clj

Provides the Clojure CLI for running code and managing dependencies through tools.deps.

### lein

Provides Leiningen-based build and dependency management for Clojure projects.

### bb

Provides Babashka, a fast scripting environment for Clojure-like workflows.

### clj-kondo

Lints Clojure code for correctness and style issues.

### clojure-lsp

Provides language-server support for Clojure development.

### shadow-cljs

Builds ClojureScript projects, especially for frontend and Node.js targets.

### nrepl

Provides a networked REPL protocol for interactive development.

### deps-new

Generates new Clojure project templates using tools.deps conventions.

### eastwood

Provides additional linting for Clojure code.

### kaocha

Provides a flexible test runner for Clojure projects.

## PowerShell

### pwsh

Provides the modern cross-platform PowerShell shell and scripting environment.

### Pester

Provides the standard testing framework for PowerShell scripts and modules.

### PSReadLine

Enhances interactive shell editing, history, and command-line experience in PowerShell.

### Get-Help

Displays built-in help for PowerShell commands and concepts.

### Install-Module

Installs PowerShell modules from configured repositories.

### Invoke-WebRequest

Performs HTTP and web requests from PowerShell scripts.

### Invoke-RestMethod

Calls REST APIs and parses structured responses conveniently in PowerShell.

### ConvertFrom-Json

Parses JSON text into PowerShell objects.

### ConvertTo-Json

Converts PowerShell objects into JSON text.

### Set-ExecutionPolicy

Controls script execution policy behavior in PowerShell environments.

## Zig

### zig

Provides the Zig toolchain entry point for building and managing Zig code.

### zig build

Builds projects using Zig’s build system.

### zig fmt

Formats Zig source code according to standard style rules.

### zig test

Builds and runs Zig test code.

### zig cc

Provides a C compiler frontend powered by the Zig toolchain.

### zig c++

Provides a C++ compiler frontend powered by the Zig toolchain.

### zig env

Shows environment and toolchain configuration for Zig.

### zig run

Builds and runs a Zig source file directly.

### zls

Provides language-server support for Zig development.

### zig build-exe

Builds an executable directly from Zig source files.

## SQL Tooling

### psql

Provides the PostgreSQL command-line interface for SQL execution and administration.

### mysql

Provides the MySQL command-line interface for SQL execution and administration.

### sqlite3

Provides the SQLite shell for local database inspection and querying.

### duckdb

Provides a local analytical SQL engine with strong command-line usability.

### pg_dump

Exports PostgreSQL databases for backup or migration.

### mysqldump

Exports MySQL databases for backup or migration.

### sqlfluff

Lints and formats SQL according to dialect-aware rules.

### flyway

Manages database schema migrations in a versioned and repeatable workflow.

### liquibase

Manages database schema changes and migration history across environments.

### psqlrc

Refers to PostgreSQL client configuration used to customize interactive psql behavior.
