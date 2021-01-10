# Contributing Guide

👋Thank you for taking the time to read this and I look forward to reviewing your contribution.

## Contribution instructions:

- Create a fork of the project on Github.
- Clone the fork on your local machine. Your remote repo on Github is called `origin`.
- Add the original repository as a remote called `upstream`.
- If you created your fork a while ago be sure to pull upstream changes into your local repository.
- Create a new branch to work on! Branch from `trunk`.
- Please make an issue to reference and implement/fix your feature.
- Please add unit tests, **jest** is the testing tool.
- Make a pull request (PR) to merge into `trunk` and make sure it passes the continuous integration pipeline.
- You're PR will be reviewed as soon as possible.
  
## Getting Started

1. Running the project
   ```
   npm run compile
   # OR
   npm run watch
   ```
1. Run tests (Uses Jest)
   ```
   npm test
   npm test -- --watch
   ```
1. Debug extension:
   Press F5 in VS Code to launch the extension into a sandbox and you can place break points
1. Debug tests: In the debug tab you can change to `jest` from the dropdown

## Releasing

This section is for owner/maintainers with publish access to git-ease on the extension marketplace.

1. Add release notes at https://github.com/rkotze/git-ease/releases and update the CHANGELOG https://github.com/rkotze/git-ease/blob/trunk/CHANGELOG.md
1. Bump the version at the appropriate level (major, minor, patch); e.g.
   ```
   npm version patch
   ```
1. Push the version commit and tag
   ```
   git push --follow-tags
   ```
1. **Never to be used** only for reference: Manually release the package
   ```
   vsce publish -p <secret key>
   ```
