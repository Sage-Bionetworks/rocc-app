# Sage Bionetworks library for Angular

[![GitHub Release](https://img.shields.io/github/release/Sage-Bionetworks/sage-angular.svg?include_prereleases&color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/Sage-Bionetworks/sage-angular/releases)
[![GitHub CI](https://img.shields.io/github/workflow/status/Sage-Bionetworks/sage-angular/CI.svg?color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/Sage-Bionetworks/sage-angular/actions)
[![GitHub License](https://img.shields.io/github/license/Sage-Bionetworks/sage-angular.svg?color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/Sage-Bionetworks/sage-angular/blob/main/LICENSE)

Library of reusable Angular artifacts used in Sage Bionetworks projects

## Introduction

This repository provides a library of reusable code that defines components,
services, and other Angular artifacts (pipes, directives, and so on) that are
imported into projects developed by [Sage Bionetworks].

This repository includes a multi-project workspace that supports the development
of the library `@sage-bionetworks/sage-angular`. The two projects included are:

- `sage-angular`: the library `@sage-bionetworks/sage-angular`.
- `sage-angular-demo`: a demo app used to showcase the content of the library.

## Previews

Version | Demo app | Storybook
------- | -------- | ---------
1.0.0   | [Demo app](https://sage-bionetworks.github.io/sage-angular/1.0.0/demo/) | [Storybook](https://sage-bionetworks.github.io/sage-angular/1.0.0/storybook/)
Edge   | [Demo app](https://sage-bionetworks.github.io/sage-angular/edge/demo/) | [Storybook](https://sage-bionetworks.github.io/sage-angular/edge/storybook/)

## Installation

```console
npm install @sage-bionetworks/sage-angular --save
```

Import the styles and themes of the library in your main *styles.scss*:

```
@import '@sage-bionetworks/sage-angular/src/styles';
@import '@sage-bionetworks/sage-angular/src/lib-theme';

// Include material core styles.
@include mat-core();

@include angular-material-theme($theme);
@include sage-angular-theme($theme);
```

Import the image assets of the library in your *angular.json*:

```json
"assets": [
  {
    "glob": "**/*.@(svg)",
    "input": "sage-angular/dist/sage-angular/src/assets/images",
    "output": "images"
  }
],
```

## Development server

Run `npm ci` to install the npm dependencies of this project.

Run `npm run start` for a dev server. Navigate to
`http://localhost:4200/`. The app will automatically reload if you change any of
the source files.

## Code scaffolding

The library `sage-angular` is split into multiple features that include each a
subentry to improve tree shaking and thus the performance of SPAs. As a
convention, the content of a feature folder should stay as flat as possible and
thus avoid sub-folders. An example of this approach is provided by the library
[Angular Material].

### Adding a library feature

We use the Angular schematic [ng-samurai] to add new feature to the library. The
command below will perform the following actions:

- Create a new folder with the provided name
- Create a (`module`, `component`, `index.ts`, `public-api.ts`, `package.json`)
- Export the module and the component from the `public-api.ts`

```console
ng g ng-samurai:generate-subentry --project sage-angular feature-a
```

Options can be passed to the command to disable the generation of certain types
of artifacts like `--gc false` to disable the generation of the default
component. Alternatively, remove the artifacts that are not needed after the
generation of the feature.

The file `projects/sage-angular/src/public-apis.ts` lists the features that are
available to consumer applications. Add the line `export * from '@sage-bionetworks/sage-angular/src/lib/feature-a';` to export the feature.

### Adding artifacts to a feature

The command `ng generate <artifact>` or `ng g <artifact>` generates a new
Angular artifact where `<artifact>` takes a value in
`directive|pipe|service|class|guard|interface|enum|module`. The option
`--project <project>` specifies the project the artifact should be added to.

For example, run this command to add a service to the feature `feature-a`:

    ng generate service --project sage-angular feature-a/feature-a

Run this command to add a component to the feature `feature-a`:

    ng generate component --project sage-angular feature-a/feature-a

> This library is configured to add the prefix `sage-` to the selector of
> components generated via `ng generate component`. For example, the selector of
> the component `feature-a` is `sage-feature-a` and this component will be
> imported in an HTML document with `<sage-feature-a></sage-feature-a>`.

The entry point file `public-api.ts` of the feature must include all the
artifacts that are offered by the feature. The entry point file must be updated
manually when adding or removing artifacts to a feature.

### Adding artifacts to the demo app

Run this command to add a module:

    ng g m --project sage-angular-demo module-x

Run this command to add a component to the module `module-x`:

    ng g c --project sage-angular-demo module-x/component-x

## Running lint checks

Run `npm run lint` to execute the lint checks via [TSLint](https://karma-runner.github.io).

## Build

Run `npm run build` to build the library. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. Run `npm run build:demo` to build the demo app.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma].

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor].

## License

[Apache License 2.0]

<!--

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. -->

<!-- Links -->

[TSLint]: https://palantir.github.io/tslint
[Karma]: https://karma-runner.github.io
[Protractor]: http://www.protractortest.org
[Angular Material]: https://github.com/angular/components/tree/master/src/material
[ng-samurai]: https://github.com/kreuzerk/ng-samurai

[Sage Bionetworks]: https://sagebionetworks.org
[Apache License 2.0]: https://github.com/Sage-Bionetworks/sage-angular/blob/main/LICENSE
