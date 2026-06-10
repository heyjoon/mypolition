# BRANCH_PROTECTION.md

## Goal
Prevent merge before CI passes.

This file documents the required GitHub repository setting. It cannot be fully enforced from source code alone unless repository administration is configured.

## Recommended GitHub settings
In GitHub:

1. Go to `Settings`.
2. Open `Branches`.
3. Add a branch protection rule for `main`.
4. Enable `Require status checks to pass before merging`.
5. Select the CI check from `.github/workflows/ci.yml`.
6. Enable `Require branches to be up to date before merging`.
7. Enable `Require a pull request before merging`.
8. Keep direct pushes to `main` disabled for normal development.

## Merge rule
Do not merge feature branches until:

```bash
npm run check
```

passes locally and in GitHub Actions.
