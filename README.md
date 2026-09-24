# reusable-workflows

Reusable workflows for halo plugin and theme

## How to use?

### Plugin

#### `.github/workflows/plugin-ci.yaml`

Used to test whether the plugin can be built normally.

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  ci:
    # Suggest using stable branch, tag or sha.
    uses: halo-sigs/reusable-workflows/.github/workflows/plugin-ci.yaml@v5
```

inputs:

- `node-version`: (Optional) Version of Node.js, default is 24.
- `pnpm-version`: (Optional) Version of pnpm, default is 10. Set to `""` if the project uses Corepack and defines `packageManager` in `package.json`.
- `java-version`: (Optional) Version of Java, default is 21.
- `ui-path`: (Optional) Path of UI project, default is "console".
- `skip-node-setup`: (Optional) Indicates if the node setup should be skipped, default is false.
- `artifacts-path`: (Optional) Artifacts path, default is build/libs. Must be a folder.
- `npm-registry-url`: (Optional) NPM registry URL.
- `build-args`: (Optional) Additional build arguments, default is empty.

secrets:

- `npm-auth-token`: (Optional) NPM auth token.

#### `.github/workflows/plugin-cd.yaml`

Used to build plugin and upload them to the Release and [Halo app store](https://www.halo.run/store/apps).

> [!IMPORTANT]
> Currently, the developer center of the Halo app store is not open to everyone, and only some developers can manage their own apps.

```yaml
name: CD

on:
  release:
    types:
      - published

jobs:
  cd:
    # Suggest using stable branch, tag or sha.
    uses: halo-sigs/reusable-workflows/.github/workflows/plugin-cd.yaml@v5
    secrets:
      halo-pat: ${{ secrets.HALO_PAT }}
    permissions:
      contents: write
    with:
      # This is required for releasing to Halo App Store.
      app-id: app-Qxhpp
      sync-github-readme: true
```

inputs:

- `artifacts-path`: (Optional) Artifacts path, default is build/libs. Must be a folder.
- `node-version`: (Optional) Version of Node.js, default is 24.
- `pnpm-version`: (Optional) Version of pnpm, default is 10. Set to `""` if the project uses Corepack and defines `packageManager` in `package.json`.
- `java-version`: (Optional) Version of Java, default is 21.
- `ui-path`: (Optional) Path of UI project, default is "console".
- `skip-node-setup`: (Optional) Indicates if the node setup should be skipped, default is false.
- `skip-appstore-release`: (Optional) Indicates if the appstore release should be skipped, default is false.
- `app-id`: (Optional) Application ID from Halo App Store, default is "not-configured-app-id".
- `sync-github-readme`: (Optional) Sync the application README from its configured public GitHub repository after the App Store release is published, default is false. The App Store PAT needs the `app-store-developer-sync-github-readme-role` permission. If synchronization fails, the workflow fails although the version is already published.
- `halo-backend-baseurl`: (Optional) Base URL of Halo App Store, default is "<https://www.halo.run>".
- `npm-registry-url`: (Optional) NPM registry URL.
- `build-args`: (Optional) Additional build arguments, default is empty.

secrets:

- `halo-pat`: Personal Access Token for Halo App Store, required for publishing.
- `npm-auth-token`: (Optional) NPM auth token.

### Theme

#### `.github/workflows/theme-cd.yaml`

Used to package theme and upload them to the Release and [Halo app store](https://www.halo.run/store/apps).

> [!IMPORTANT]
> Currently, the developer center of the Halo app store is not open to everyone, and only some developers can manage their own apps.

```yaml
name: CD

on:
  release:
    types:
      - published

jobs:
  cd:
    # Suggest using stable branch, tag or sha.
    uses: halo-sigs/reusable-workflows/.github/workflows/theme-cd.yaml@v5
    secrets:
      halo-pat: ${{ secrets.HALO_PAT }}
    permissions:
      contents: write
    with:
      # This is required for releasing to Halo App Store.
      app-id: theme-Abcde
      sync-github-readme: true
```

inputs:

- `node-version`: (Optional) Version of Node.js, default is 24.
- `pnpm-version`: (Optional) Version of pnpm, default is 10. Set to `""` if the project uses Corepack and defines `packageManager` in `package.json`.
- `skip-appstore-release`: (Optional) Indicates if the appstore release should be skipped, default is false.
- `app-id`: (Optional) Application ID from Halo App Store, default is "not-configured-app-id".
- `sync-github-readme`: (Optional) Sync the application README from its configured public GitHub repository after the App Store release is published, default is false. The App Store PAT needs the `app-store-developer-sync-github-readme-role` permission. If synchronization fails, the workflow fails although the version is already published.
- `halo-backend-baseurl`: (Optional) Base URL of Halo App Store, default is "<https://www.halo.run>".

secrets:

- `halo-pat`: Personal Access Token for Halo App Store, required for publishing.

Please note that if you need to use this workflow to publish themes, your theme repository must use pnpm for package management and include a build script. The build script must include `npx @halo-dev/theme-package-cli`. For information about npx @halo-dev/theme-package-cli, please visit: [halo-dev/theme-package-cli](https://github.com/halo-dev/theme-package-cli), for example:

```json
{
  "name": "@halo-dev/theme-foo",
  "scripts": {
    "build": "npx @halo-dev/theme-package-cli"
  },
}
```

If your theme includes other build processes, you need to put them before `npx @halo-dev/theme-package-cli`, for example:

```json
{
  "name": "@halo-dev/theme-foo",
  "scripts": {
    "build": "vite build && npx @halo-dev/theme-package-cli"
  },
}
```

### App Store release action

The App Store release action is maintained in [`app-store-release-action`](app-store-release-action). Use `halo-sigs/reusable-workflows/app-store-release-action@v5` when a reusable workflow does not fit your build. Its inputs are `github-token`, `app-id`, `release-id`, `assets-dir`, `halo-pat`, and the optional `halo-backend-baseurl` and `sync-github-readme` (default `false`).

The former `halo-sigs/app-store-release-action` repository remains available for existing `@v4` callers but receives no new features. See [the maintainer checklist](dev/README.md) for development and release steps.
