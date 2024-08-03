<h1 align="center">📦 Project Analyzer</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.7.3-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/MassivDash/ProjectAnalyzer/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/SpaceoutPl" target="_blank">
    <img alt="Twitter: SpaceoutPl" src="https://img.shields.io/twitter/follow/SpaceoutPl.svg?style=social" />
  </a>
</p>

![codeQL](https://github.com/MassivDash/ProjectAnalyzer/actions/workflows/codeQL.yml/badge.svg)![CI](https://github.com/MassivDash/ProjectAnalyzer/actions/workflows/ci.yml/badge.svg)![Compliation](https://github.com/MassivDash/ProjectAnalyzer/actions/workflows/publish.yml/badge.svg)![CodeCoverage](./badges/coverage.svg)

Welcome to Project Analyzer, a global npm package that provides code complexity scores and codebase statistics for your projects.

More info on used method to calculate score [here](https://spaceout.pl/folders-files-and-everything-in-between)

---

## Installation

**Minimal node version**

![Static Badge](https://img.shields.io/badge/_node_-%3E%3D_20.6.0-red)

To install Project Analyzer, simply run the following command:

```
npm i -g project-analyzer
```

## Usage

Once installed, you can execute Project Analyzer in any folder to analyze the complexity and statistics of your codebase.

```
projectAnalyzer
```

## Arguments

```bash

Usage: projectAnalyzer [options]

    Options:
        -h, --help            display help for command
        -p, --path <path>     specify the path to the directory to analyze
        -o, --output <output> specify the output file name
        -m, --markdown        output the results in markdown format
        -s, --silent          do not output the results to the console
        -t, --tree            output folder structure as a tree

```

---

## Features

- Code complexity scoring
- Codebase statistics

## Authentication

Project Analyzer does not require any authentication. It analyzes your codebase locally without the need for any external services.

### CI uses

```yml
name: "Test"
on:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    permissions:
      # Required to checkout the code
      contents: read
      # Required to put a comment into the pull-request
      pull-requests: write

    steps:
      - uses: actions/checkout@v4
      - name: "Install Node"
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
      - name: Run project analyzer
        run: npm i -g project-analyzer && projectAnalyzer -m
      - name: Add Project Analysis PR Comment
        uses: marocchino/sticky-pull-request-comment@v2
        if: github.event_name == 'pull_request'
        with:
          recreate: true
          path: analysis.md
```

Thank you for choosing Project Analyzer for your code analysis needs!

---

<img src="https://spaceout.pl/icons/icon-96x96.png?v=c01d3dc2404b91dfce33d962ff296151" alt="spaceout.pl" />

Luke Celitan, [Spaceghost](https://spaceout.pl/)

(x/tweeter)[https://x.com/SpaceoutPl]
