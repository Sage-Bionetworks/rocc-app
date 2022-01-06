# Project Style Guide

## Setup

- This project uses [eslint] to validate TypeScript and JavaScript files. The
  configuration file of `eslint` is `.eslintrc.json`. The behavior of `eslint`
  can be extended using plugins and custom rules.
- TypeScript and JavaScript files are automatically validated and the lint
  issues fixed upon saving. This behavior is controled by the VS Code workspace
  settings file `.vscode/settings.json`.
- Staged files are automatically validated before the creation of a commit. This
  is possible thanks to the package [husky], which manages the pre-commit hook,
  and the package [stage-lint], which lint only the files that have been staged
  for the sake of saving time.

## References

- [Google TypeScript Style Guide]

<!-- Links -->

[google typescript style guide]: https://google.github.io/styleguide/tsguide.html
[eslint]: https://www.npmjs.com/package/eslint
[husky]: https://www.npmjs.com/package/husky
[stage-lint]: https://www.npmjs.com/package/lint-staged
