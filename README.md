# <img src="https://user-images.githubusercontent.com/10452163/104818888-310d0000-5822-11eb-8d37-89d917672783.png" width="80" alt="Git ease" /> Git-ease

![](https://vsmarketplacebadge.apphb.com/installs/RichardKotze.git-ease.svg) [![](https://vsmarketplacebadge.apphb.com/downloads-short/RichardKotze.git-ease.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-ease.svg)

> Quick and convenient linking from local a Git repository to external sources.

### Problem

The current UI features in VS Code too limiting to represent Git features in a convenient way. There is also so many connected documents to Git repos (issues, PRs, etc) which I think can be better linked from VS Code.

### Vision

Introduce a convenient and connected interface for viewing the Git log and related documents in VS Code SCM panel.

**Status** Currently building Beta release

1. [Install](#install)
1. [Features](#features)
1. [Settings](#settings)

<img title="Preview of Git Ease" src="https://user-images.githubusercontent.com/10452163/134826832-0550c9b5-2fbd-470f-aa76-fef61723e3cc.png" width="350" />

<img title="Open file diff" src="https://user-images.githubusercontent.com/10452163/144715069-68ed9ae2-622d-4869-bfa4-ff5738b0da03.png" width="800" />

## Install

Type **"Git-Ease"** in VS Code extensions panel or VS Code marketplace [Git Ease](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-ease).

## Features

### Local Git

- Search commit history
- Convenient commit history view in SCM panel
  - Supports `co-authored-by` meta data
- Support Git emojis
- Copy any commit message into input
- List **file changes** for a commit, **open file** and **open diff**.

### Link to remote repository:

- **Issues** (GitHub, enterprise GitHub and Bit Bucket) Example: Scans for #1 and links to issue 1
- **Commits** (GitHub and enterprise GitHub)
- Link to **project** management tools like **Jira** by providing custom Regex patterns. See settings how to setup.

## Settings

### Commit log -> linkPatterns

`gitEase.log.linkPatterns`

`Default: []`

Configurable in JSON settings only

Provide three properties pre pattern to find custom patterns in the commit log to link from.

- `pattern` = Regex format as a string. Regex groups are needed to match with format numbers
- `urlFormat` = Url to source like Jira issue. Number will be replaced by matching Regex group
- `textFormat` = Text to display. Number will be replaced by matching Regex group

Jira example:

```json
[{
  "pattern": "(GE-[0-9]+)",
  "urlFormat": "https://jira.com/browse/{0}",
  "textFormat": "{0}",
}]
```
