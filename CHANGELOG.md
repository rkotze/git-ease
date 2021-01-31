# Change Log

All notable changes to the "git-ease" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## in progress

## 0.2.0
### Added

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