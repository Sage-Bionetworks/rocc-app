# Project Style Guide

## Requirements

- [Visual Studio Code]
- [Node.js] >= v14.x

## Overview

The workflow is the following:

- VS Code shows immediately style issues when editing TypeScript files.
- VS Code automatically fix style issues when saving files.
- The style of staged files is validated upon creating a new commit.
- The style of files pushed to GitHub is validated using a GitHub workflow.

## Setup

- VS Code invites you to install the recommended extensions, which include
  `dbaeumer.vscode-eslint`. This extension is used in the VS Code workspace
  settings file `settings.json` available in this repository.
- This project uses [eslint] to validate TypeScript and JavaScript files. The
  configuration file of `eslint` is `.eslintrc.json`. The behavior of `eslint`
  can be extended using plugins and custom rules.
- This project runs [prettier] via `eslint` for additional flexibility in
  validating files. The configuration of `prettier` is located in
  `.eslintrc.json`.
- TypeScript and JavaScript files are automatically validated and the lint
  issues fixed upon saving. This behavior is controled by the VS Code workspace
  settings file `.vscode/settings.json`.
- Staged files are automatically validated before the creation of a commit. This
  is possible thanks to the package [husky], which manages the pre-commit hook,
  and the package [stage-lint], which lint only the files that have been staged
  for the sake of saving time.

## MarkDown

- Lines must not be longer than 80 characters. To rewrap text, place your cursor
  in a paragraph or highlight multiple paragraph and press `ALT+Q` provided by
  the VS Code extension `stkb.rewrap`.

## References

- [Google TypeScript Style Guide]

<!-- Links -->

[google typescript style guide]: https://google.github.io/styleguide/tsguide.html
[eslint]: https://www.npmjs.com/package/eslint
[husky]: https://www.npmjs.com/package/husky
[stage-lint]: https://www.npmjs.com/package/lint-staged
[prettier]: https://www.npmjs.com/package/prettier
[Visual Studio Code]: https://code.visualstudio.com/
[Node.js]: https://nodejs.org/en/