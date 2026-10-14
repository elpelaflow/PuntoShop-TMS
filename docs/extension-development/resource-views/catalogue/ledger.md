---
title: "Ledger"
url: https://fleetbase.io/docs/extension-development/resource-views/catalogue/ledger
module: extension-development
---

Resource Views

Registry Catalogue

# Ledger

Every resource view registry Ledger declares — the registry names for each table and details view, where each is wired in the Ledger source, and the built-in ids to place your items against.

# Ledger Registries

Ledger (
`@fleetbase/ledger-engine`
, from 0.0.12) declares registries for
**7 resources**
. Every name starts with
`ledger:`
and follows
`ledger:<resource>:<surface>:<slot>`
.

The table lists each resource and the source file that wires it up. Open a resource below for its registry names and built-in ids.

| Resource | View | Table | Details | Side panel |
| --- | --- | --- | --- | --- |
| [`invoice`](#invoice) | Invoices | `index.hbs` | `details.hbs` | — |
| [`invoice-template`](#invoice-template) | Invoice templates | `index.hbs` | — | — |
| [`transaction`](#transaction) | Transactions | `index.hbs` | `details.hbs` | — |
| [`wallet`](#wallet) | Wallets | `index.hbs` | `details.hbs` | — |
| [`gateway`](#gateway) | Payment gateways | `index.hbs` | — | — |
| [`account`](#account) | Accounts | `index.hbs` | `details.hbs` | — |
| [`journal`](#journal) | Journal entries | `index.hbs` | `details.hbs` | — |

## Resources

### invoice — Invoices

### invoice-template — Invoice templates

### transaction — Transactions

### wallet — Wallets

### gateway — Payment gateways

### account — Accounts

### journal — Journal entries

[Fleet-Ops

Every resource view registry Fleet-Ops declares — the registry names for each table and details view, where each is wired in the Fleet-Ops source, and the built-in ids to place your items against.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops)
[IAM

Every resource view registry IAM declares — the registry names for each table and details view, where each is wired in the IAM source, and the built-in ids to place your items against.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/iam)
