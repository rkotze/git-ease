# Change Log

All notable changes to the "git-ease" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## in progress

## 0.6.0

### Added

- Handle file rename in commit history [Issue 17](https://github.com/rkotze/git-ease/issues/17)
- Search commit history [Issue 15](https://github.com/rkotze/git-ease/issues/15)

### Fixed

- Commit history might not load when first opening VS Code
- Reload will trigger required functions to generate log

## 0.5.0

### Added

- Show filename first and remaining path which will trim depending on panel width [Issue 16](https://github.com/rkotze/git-ease/issues/16)
- Split branch and tags into own boxes [Issue 13](https://github.com/rkotze/git-ease/issues/13)

## 0.4.0

### Added

- List changed files for relevant commit [Issue 11](https://github.com/rkotze/git-ease/issues/11)
- Hover over file to reveal open file action. Click to open associated file.[Issue 11](https://github.com/rkotze/git-ease/issues/11)
- Click on the file list time to open a diff view of changes made: [Issue 14](https://github.com/rkotze/git-ease/issues/14)

![Commit file list](https://user-images.githubusercontent.com/10452163/114325307-447cee00-9b27-11eb-9a5c-9af020a75e35.png)

## 0.3.0

### Added

- Provide custom link patterns to find codes in commit messages and link to external sources. For example link to Jira issues, Trello cards, Asana.

## 0.2.0

### Added

- Find patterns in message and link to remote issues e.g. GitHub issues if #1 is found.
- New layout change to messages
  - Commit author icon moved to second row
  - Micro data font larger
  - Full message item clickable to expand message details
### Fixed

- Sometimes the commit log will not render.
  - Only listen to messages when component is ready
  - Don't link to remote when remote data has not been resolved

## 0.1.0

### Added

- Refresh panel action
- Support for co-author meta in message
- Link to remote repository issues (GitHub, enterprise GitHub and Bit Bucket)
- Link to remote repository commits (GitHub and enterprise GitHub)

### Fixed

- Co-author meta email hidden
- Improve repository changes to auto update the log view

## 0.0.1

### Added

- View easy to read Git log
- Support Git emojis
- Copy previous commit messages 