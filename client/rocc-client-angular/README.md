# ROCC Client Library for Angular

[![GitHub Release](https://img.shields.io/github/release/Sage-Bionetworks/rocc-angular-client.svg?include_prereleases&color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/Sage-Bionetworks/rocc-angular-client)
[![GitHub License](https://img.shields.io/github/license/sage-bionetworks/rocc-angular-client.svg?color=94398d&labelColor=555555&logoColor=ffffff&style=for-the-badge&logo=github)](https://github.com/sage-bionetworks/rocc-angular-client)

## Introduction

This TypeScript-Angular client library is used by the [ROCC web client] to
interact with the [ROCC API service].

This client library is automatically updated using [openapi-generator] via a
Pull Request opened shortly after a new release of the [ROCC schemas] is
available.


## Specification

- ROCC schemas version: 0.1.7
- ROCC client library version: 0.3.1


## Requirements

- [Node] >=14


## Versioning

### GitHub release tags

This repository uses [semantic versioning] to track the releases of this
project. This repository uses "non-moving" GitHub tags, that is, a tag will
always point to the same git commit once it has been created.

### npm package tags

The artifact published by the [CI/CD workflow] of this GitHub repository is an
npm package pushed to the npm package registry [npmjs.org]. This table lists the
package tags pushed to this registry.

| Tag name                    | Moving | Description
|-----------------------------|--------|------------
| `<major>.<minor>.<patch>`   | No     | Stable release.


## Contributing

Thinking about contributing to this project? Get started by reading our
[contribution guidelines].


## License

[Apache License 2.0]

<!-- Links -->

[ROCC web client]: https://github.com/Sage-Bionetworks/rocc-app
[ROCC API service]: https://github.com/Sage-Bionetworks/rocc-service
[openapi-generator]: https://github.com/OpenAPITools/openapi-generator
[ROCC schemas]: https://github.com/Sage-Bionetworks/rocc-schemas
[Node]: https://nodejs.org/en/
[npmjs.org]: https://www.npmjs.com/
[semantic versioning]: https://semver.org/
[contribution guidelines]: .github/CONTRIBUTING.md
[Apache License 2.0]: https://github.com/Sage-Bionetworks/rocc-client-angular/blob/main/LICENSE
