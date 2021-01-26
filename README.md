# <img src="https://user-images.githubusercontent.com/10452163/104818888-310d0000-5822-11eb-8d37-89d917672783.png" width="80" alt="Git ease" /> Git-ease

The idea is very much **WIP**.

> Improve linking Git repositories to its remotes in VS Code.

### Problem

I find the current UI features in VS Code too limiting to represent Git features in a convenient way. There is also so many connected documents to Git repos (issues, PRs, etc) which i think can be more visible.

### Vision

Introduce a clean and interactive UI for viewing the Git log in VS Code SCM panel.

**Status** Currently building Alpha release

1. [Install](#install)
1. [Features](#features)

<img title="Preview of Git Ease" src="https://user-images.githubusercontent.com/10452163/105635259-edd21300-5e59-11eb-896f-8c06d8befc65.png" width="300" />

## Install

Download the latest `.vsix` file in [releases](https://github.com/rkotze/git-ease/releases) assets.

Read my tweet for [manual install instructions](https://twitter.com/richardkotze/status/1351109236189761536?s=20).

## Features

- View easy to read Git log
  - Supports `co-authored-by` meta data
- Support Git emojis
- Copy previous commit messages
- Commit messages link to remote repository **issues** (GitHub, enterprise GitHub and Bit Bucket)
- Link to remote repository **commits** (GitHub and enterprise GitHub)

