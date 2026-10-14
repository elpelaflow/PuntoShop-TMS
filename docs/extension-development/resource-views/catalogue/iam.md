---
title: "IAM"
url: https://fleetbase.io/docs/extension-development/resource-views/catalogue/iam
module: extension-development
---

Resource Views

Registry Catalogue

# IAM

Every resource view registry IAM declares — the registry names for each table and details view, where each is wired in the IAM source, and the built-in ids to place your items against.

# IAM Registries

IAM (
`@fleetbase/iam-engine`
, from 0.1.13) declares registries for
**4 resources**
. Every name starts with
`iam:`
and follows
`iam:<resource>:<surface>:<slot>`
.

The table lists each resource and the source file that wires it up. Open a resource below for its registry names and built-in ids.

| Resource | View | Table | Details | Side panel |
| --- | --- | --- | --- | --- |
| [`user`](#user) | Users | `users.hbs` | `user-actions.js` | — |
| [`group`](#group) | Groups | `index.hbs` | `group-actions.js` | — |
| [`role`](#role) | Roles | `index.hbs` | `role-actions.js` | — |
| [`policy`](#policy) | Policies | `index.hbs` | `policy-actions.js` | — |

## Resources

### user — Users

### group — Groups

### role — Roles

### policy — Policies
