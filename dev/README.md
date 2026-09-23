# Maintainer checklist

## Changes

- [ ] Start a feature branch from `main` and open a pull request targeting `main`.
- [ ] Keep the reusable workflow inputs and the App Store action inputs compatible within a major version. Use a new major version for breaking changes.
- [ ] For changes under `app-store-release-action`, run `pnpm install --frozen-lockfile`, `pnpm exec biome check src`, `pnpm run typecheck`, and `pnpm run build` in that directory. Build and commit `dist/index.js` on Linux, matching CI; macOS produces different bundle bytes. Regenerate `pnpm-lock.yaml` with pnpm when dependencies change.
- [ ] Check that CI passes and test the affected workflow or action from the pull request commit in a caller repository before releasing.

## Release

- [ ] Confirm `main` contains the intended changes and CI passed at the exact release commit. Check that the `v4` branches in both repositories still point to their existing commits.
- [ ] Create a semantic version tag on that commit (first consolidated release: `v5.0.0`) and publish its GitHub Release. Do not publish a GitHub Release for the moving major tag.
- [ ] Move the major tag (`v5`) to the validated release commit. Update it only for compatible v5 releases; create `v6` for breaking changes.
- [ ] Test the published `@v5` reusable workflows and `halo-sigs/reusable-workflows/app-store-release-action@v5` in a caller repository, including an App Store publication when applicable.
- [ ] Update the README examples when the recommended major version changes.

The old `halo-sigs/app-store-release-action@v4` and `halo-sigs/reusable-workflows@v4` references remain available. Maintain new versions here; consumers of the standalone action must change their `uses:` path to adopt them. Do not delete or move either legacy `v4` branch.
