---
title: "Developers"
url: https://fleetbase.io/docs/extension-development/resource-views/catalogue/developers
module: extension-development
---

Resource Views

Registry Catalogue

# Developers

Every resource view registry Developers declares — the registry names for each table and details view, where each is wired in the Developers source, and the built-in ids to place your items against.

# Developers Registries

Developers (
`@fleetbase/dev-engine`
, from 0.2.17) declares registries for
**5 resources**
. Every name starts with
`developers:`
and follows
`developers:<resource>:<surface>:<slot>`
.

The table lists each resource and the source file that wires it up. Open a resource below for its registry names and built-in ids.

| Resource | View | Table | Details | Side panel |
| --- | --- | --- | --- | --- |
| [`api-key`](#api-key) | API keys | `index.hbs` | — | — |
| [`webhook`](#webhook) | Webhooks | `index.hbs` | `view.js` | — |
| [`event`](#event) | Events | `index.hbs` | `view.js` | — |
| [`log`](#log) | Request logs | `index.hbs` | `view.js` | — |
| [`socket`](#socket) | Sockets | `index.hbs` | `view.js` | — |

## Resources

### api-key — API keys

### webhook — Webhooks

### event — Events

### log — Request logs

### socket — Sockets

[IAM

Every resource view registry IAM declares — the registry names for each table and details view, where each is wired in the IAM source, and the built-in ids to place your items against.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/iam)
[Overview

Let other extensions add columns, actions, buttons and tabs to your own engine's tables and details views — what it takes, in five steps, and a checklist.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
