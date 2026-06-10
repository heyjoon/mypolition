# TEST_STRATEGY.md

## Goal
The test suite should protect product safety, deterministic mock data, route integrity, and adapter boundaries.

## Required command

```bash
npm run check
```

`npm run check` runs lint, unit/integration/e2e-style tests, and production build.

## Test layers

### Unit
Unit tests cover pure rules and safety helpers.

Examples:

- Allowed labels contain no banned terms.
- Banned terms are detected.
- Evidence grade descriptions exist for all expected grades.

### Integration
Integration tests cover deterministic seed data and relationships.

Examples:

- 3 fake public officials.
- 10 fake bills.
- 15 fake votes.
- 8 fake statements.
- 8 fake evidence records.
- 5 fake analysis findings.
- Bills and votes point to valid officials.
- Finding types and review statuses are allowed.

### E2E-style route checks
Until Playwright is added, e2e-style tests inspect route files and core Korean UI strings.

Examples:

- `/compare` exists.
- Comparison page contains safety wording against ranking/score interpretation.
- Main page links to `/compare`.

## Safety tests
Safety tests must prevent banned defamatory terms from appearing in:

- allowed labels
- mock analysis findings
- core visible UI strings where practical

## Future test expansion
- Add Playwright for browser e2e after UI stabilizes.
- Add API adapter contract tests before real public-data integration.
- Add accessibility checks for key routes.
