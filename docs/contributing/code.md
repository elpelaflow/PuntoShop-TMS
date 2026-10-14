---
title: "Code contributions"
url: https://fleetbase.io/docs/contributing/code
module: contributing
---

# Code contributions

How to submit bug fixes, features, and refactors to Fleetbase — branching, testing, and PR conventions.

# Code contributions

This page covers contributing
**code**
to Fleetbase — bug fixes, features, refactors, and improvements across the core platform and its extensions.

For other contribution types see
[Translations](https://fleetbase.io/docs/contributing/translations)
,
[Documentation](https://fleetbase.io/docs/contributing/documentation)
,
[Extensions](https://fleetbase.io/docs/contributing/extensions)
, or
[Reporting issues](https://fleetbase.io/docs/contributing/reporting-issues)
.

## Before you start

* **Open a discussion first**
  for non-trivial changes. A small fix doesn't need one — but anything that adds APIs, changes behaviour, or restructures code should be agreed in
  [GitHub Discussions](https://github.com/elpelaflow/PuntoShop-TMS/discussions)
  before you build it.
* **Find a good first issue**
  : issues labelled
  [`good first issue`](https://github.com/elpelaflow/PuntoShop-TMS/labels/good%20first%20issue)
  are scoped for newcomers.
* **Read the relevant repo's README**
  — coding conventions and dev setup vary by component.

## Submitting a pull request

### Fork and clone

Fork the repository on GitHub, then clone your fork:

```
git clone https://github.com/YOUR_USERNAME/fleetbase.git
cd PuntoShop-TMS
```

### Create a branch

Branch from
`main`
with a descriptive name:

```
git checkout -b fix/order-status-not-updating
# or
git checkout -b feat/add-bulk-driver-import
```

Use
`fix/`
,
`feat/`
,
`refactor/`
,
`docs/`
, or
`chore/`
prefixes to match commit conventions.

### Make your changes

Match the coding conventions for the component you're touching:

* **PHP / Laravel (core API)**
  — PSR-12 coding standard, type hints, docblocks on public methods
* **Ember.js (Console, extensions)**
  — native classes, no jQuery, follow existing component and service patterns
* **React Native (mobile apps)**
  — functional components, hooks, no class components
* **TypeScript (developer tools, this site)**
  — strict mode, prefer composition over inheritance

### Run tests

```
# PHP tests (from the api container)
docker compose exec application php artisan test

# Ember tests (from the console directory)
cd console && pnpm test

# JavaScript / TypeScript tests
pnpm test
```

All existing tests must pass. If you're adding a feature, add a test that covers it.

### Open the pull request

Push your branch and open a PR against
`main`
of the upstream repository. In the PR description:

* Reference the issue it closes (e.g.
  `Closes #1234`
  )
* Describe what changed and why
* Note any breaking changes
* Include screenshots for UI changes
* Include a test plan section listing what you've verified

## Coding conventions

### Commit messages

Follow
[Conventional Commits](https://www.conventionalcommits.org)
:

```
feat(orders): add bulk dispatch action
fix(map): correct vehicle marker rotation
refactor(iam): simplify policy evaluation
docs(api): document the webhook signature scheme
chore(deps): bump @fleetbase/sdk to 1.4.0
```

### One thing per PR

A PR that fixes a bug AND refactors three other files AND adds a feature is impossible to review. Split it.

### Tests

* New code → new tests
* Bug fix → regression test that fails before the fix and passes after
* Refactor → existing tests must still pass; add new ones if behaviour changed

### Performance

If your change touches a hot path (rendering the live map, list-view queries, the order timeline), include before/after numbers in the PR description.

## Where contributions live

Different changes go to different repos. The full repo map:

| Repository | What it covers |
| --- | --- |
| [`fleetbase/fleetbase`](https://github.com/elpelaflow/PuntoShop-TMS) | Core platform — API, Console shell, IAM, Developer Console |
| [`PuntoShop-TMS (Fleet-Ops)`](https://github.com/elpelaflow/PuntoShop-TMS) | Fleet-Ops extension |
| [`PuntoShop-TMS (Ledger)`](https://github.com/elpelaflow/PuntoShop-TMS) | Ledger (finance) extension |
| [`PuntoShop-TMS (IAM Engine)`](https://github.com/elpelaflow/PuntoShop-TMS) | IAM engine |
| [`PuntoShop-TMS (Dev Engine)`](https://github.com/elpelaflow/PuntoShop-TMS) | Developer console engine |
| [`Navigator App`](https://github.com/elpelaflow/PuntoShop-TMS) | Navigator driver mobile app |
| [`fleetbase/fleetbase-cli`](https://github.com/elpelaflow/PuntoShop-TMS-cli) | Fleetbase CLI |
| [`PuntoShop-TMS (Ember UI)`](https://github.com/elpelaflow/PuntoShop-TMS) | Console UI component library |

## License

By submitting a contribution, you agree your code is licensed under
[AGPL-3.0](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/LICENSE.md)
. For licensing questions, see
[Licensing](https://fleetbase.io/docs/community/licensing)
.
