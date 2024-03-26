# reusable-workflows

Repository for reusable workflows.

## How to use in plugin projects?

Example of `.github/workflows/ci.yaml`:

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
    uses: halo-sigs/reusable-workflows/.github/workflows/plugin-ci.yaml@main
```

Example of `.github/workflows/cd.yaml`:

```yaml
name: CD

on:
  release:
    types:
      - published

jobs:
  cd:
    # Suggest using stable branch, tag or sha.
    uses: halo-sigs/reusable-workflows/.github/workflows/plugin-cd.yaml@main
    secrets:
      halo-username: ${{ secrets.HALO_USERNAME }}
      halo-password: ${{ secrets.HALO_PASSWORD }}
    permissions:
      contents: write
    with:
      # This is required for releasing to Halo Appstore.
      app-id: app-Qxhpp
```
