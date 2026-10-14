---
title: "Repositories"
url: https://fleetbase.io/docs/contributing/translations/repositories
module: contributing
---

Translations

# Repositories

Every Fleetbase repository that accepts translation contributions, with paths and what each one covers.

# Translation repositories

Fleetbase is split across many repositories — each maintained independently, each with its own translation files. To deliver a complete experience in a language, you typically contribute to multiple repos. This page is the full map.

## Console + extensions

These are the user-facing applications operators interact with daily. The bulk of translation work happens here.

| Repository | Translation path | Covers |
| --- | --- | --- |
| [`fleetbase/fleetbase`](https://github.com/elpelaflow/PuntoShop-TMS) | `console/translations/` | Console shell — top nav, settings, account, auth, shared UI, navigation menus |
| `fleetops` | `translations/` | Fleet-Ops — orders, drivers, vehicles, fleets, dispatching, live map, maintenance |
| `ledger` | `translations/` | Ledger — invoices, payments, wallets, accounting, reports |
| `iam-engine` | `translations/` | IAM — users, roles, groups, policies, permissions |
| `dev-engine` | `translations/` | Developer Console — API keys, webhooks, logs, events, sandbox |

## Mobile apps (React Native)

Mobile app translations follow the same pattern — fork, edit, PR — but use a slightly different file format (JSON instead of YAML in some cases). Check the
`translations/`
or
`i18n/`
directory in each repo's README before starting.

| Repository | Covers |
| --- | --- |
| `navigator-app` | Navigator — driver-facing app for completing deliveries |

## What if my repo isn't listed?

If you maintain a third-party Fleetbase extension and want to follow the same translation conventions, you can add a
`translations/en-us.yaml`
to your repo and point contributors at this guide. The Fleetbase i18n loader automatically picks up
`translations/<locale>.yaml`
from any registered extension.

## Where to start

If you're translating from scratch, here's a sensible order — by impact:

### PuntoShop-TMS — Console shell

The most visible UI. Every user sees this regardless of which extensions they use.

### Fleet-Ops — Fleet management

The largest single extension by string count. Used by every operator running deliveries or fleet ops.

### IAM Engine — Users & roles

Common across every deployment. Smaller string count than Fleet-Ops but high visibility.

### Whatever extension your team uses most

Ledger, Dev Console — pick what's relevant to your operation.

## Coordinating with other translators

If you're working on a language with active translators, coordinate in
`#translations`
on
[Discord](https://fleetbase.io/docs/community/discord)
before starting a major PR — it avoids two people translating the same file in parallel.

For a brand-new language, just open a PR with your work — the maintainers will tag any other contributors who've expressed interest.

## Submitting

Once your changes are ready, see
[Submitting →](https://fleetbase.io/docs/contributing/translations/submitting)
for the PR conventions.
