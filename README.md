> March 8, 2022: This project has been moved to [Sage-Bionetworks/challenge-registry](https://github.com/Sage-Bionetworks/challenge-registry).

# ROCC Web Client

## Introduction

TBA

## Specification

- ROCC app version: 0.6.0
- ROCC schemas version: 0.6.0
- Docker image: [sagebionetworks/rocc-app]

## Usage

### Running with Docker

1. Clone this repository, as well as the two linked repositories.  This can be
done with the `--recursive` flag.

       git clone --recursive https://github.com/Sage-Bionetworks/rocc-app.git

Refer to **[Updating a Linked Repository]** section below if you need to update one
or more of the linked repositories.

2. Create the configuration file.

       cp .env.example .env

3. Go to the [ROCC API service] and retrieve the service images.

       docker compose pull

4. Come back to this repo and start the ROCC app.

       docker compose up --build

   - access the app on http://localhost:80 by default
   - access the swagger UI on http://localhost:80/api/v1/ui

### Running with Angular CLI

This section describes how to start the ROCC API service and the ROCC Angular
app in development environment. After each step, you need to come back to the
project root folder.

1. Clone this repository, along with the linked repositories.

       git clone --recursive https://github.com/Sage-Bionetworks/rocc-app.git

2. Install the dependencies.

       npm ci

3. Start the [ROCC API service] using Python on http://localhost:8080/api/v1

4. Start the web client (uses Angular CLI).

       npm start

### Updating a Linked Repository

The ROCC app is dependent on two linked repositories (a.k.a. submodules):

* [rocc-client-angular]
* [sage-angular]

When an update is pushed to one or more of the linked repository(ies), you
will need to update those references on your end as well. The steps are:

1. Pull the latest changes, which will also fetch the updates made to the
configuration files for the linked repos.

       git checkout main
       git pull

2. Pull in the upstream changes from the linked repo's remote.

       git submodule update

3. (optional) If new packages have been added to the client, those packages
will need to be installed.

       npm ci

4. To test, start the web client.

       npm start

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app
will automatically reload if you change any of the source files.

### Adding a new page

To add a new page to the web client, both an Angular component and module will
need to be created:

       ng generate c pages/<new page name>
       ng generate m pages/<new page name>

This will add a new sub-folder to the `src/app/pages/` and will include 5 files:

* `<new page name>.component.html`
* `<new page name>.component.scss`
* `<new page name>.component.spec.ts`
* `<new page name>.component.ts`
* `<new page name>.module.ts`

A new TypeScript file will also need to be manually created within the sub-folder
called `index.ts`, so that both the component and module are exported, e.g.

```typescript
export * from './<new page name>.component';
export * from './<new page name>.module';
```

### Adding or modifying a route

Routing within the ROCC app is found within `src/app/app-routing.module.ts`. Edit
any `path`s as needed.

To add a new route, use the following structure:

```typescript
{
  path: '<some new path>',
  loadChildren: () => import('./pages/<new page name>').then(m => m.<NewPageName>),
  canActivate: [AuthGuard]
}
```

Please remember that the routing order does matter.  We follow Angular's standard
of more-specific first, less-specific later; that is, paths with static routes
are placed first, followed by paths with parameters.

### Editing the top navigation bar

rocc-app is utilizing a shared component from the [sage-angular] library for
its navigation bar. To edit the navbar contents, e.g. the links displayed, navigate
to `src/app/app-section.ts` and modify as needed.

To add a new section, use the following structure:

```typescript
<new path name>: {
  name: '<text to be displayed',
  summary: '<description of the path'
}
```


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License

[Apache License 2.0]

<!-- Links -->

[Updating a Linked Repository]: #updating-a-linked-repository
[rocc-client-angular]: https://github.com/Sage-Bionetworks/rocc-client-angular
[sage-angular]: https://github.com/Sage-Bionetworks/sage-angular
[ROCC API service]: https://github.com/Sage-Bionetworks/rocc-service
[Apache License 2.0]: https://github.com/Sage-Bionetworks/rocc-app/blob/develop/LICENSE
[sagebionetworks/rocc-app]: https://hub.docker.com/repository/docker/sagebionetworks/rocc-app
