---
title: "Overview"
url: https://fleetbase.io/docs/extension-development/resource-views/catalogue
module: extension-development
---

Resource Views

Registry Catalogue

# Overview

Every resource view registry the built-in engines declare — one page per engine, with each resource's registry names, built-in ids and a link to the source that wires it.

# Registry Catalogue

The catalogue lists every registry the built-in engines declare. Use it to find:

* **the registry name**
  for the view you want to add to;
* **the built-in ids**
  in each slot, to place your items
  `before`
  or
  `after`
  ;
* **the source file**
  that renders the view, to see exactly how it is wired.

| Engine | Resources | Page |
| --- | --- | --- |
| Fleet-Ops | 25 | [Fleet-Ops Registries](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops) |
| Ledger | 7 | [Ledger Registries](https://fleetbase.io/docs/extension-development/resource-views/catalogue/ledger) |
| IAM | 4 | [IAM Registries](https://fleetbase.io/docs/extension-development/resource-views/catalogue/iam) |
| Developers | 5 | [Developers Registries](https://fleetbase.io/docs/extension-development/resource-views/catalogue/developers) |

## Reading an Engine's Page

Each page starts with a table of its resources:

| Column | Shows |
| --- | --- |
| **Resource** | The resource's name in the registry, which links to its section below |
| **View** | The screen it is, as users know it |
| **Table** , **Details** , **Side panel** | The source files that pass the registry to each view, on GitHub. A dash means the resource has no view of that kind |

Below the table, each resource opens to show its registries and built-in ids:

| Slot | Registry | Built-in ids |
| --- | --- | --- |
| Columns | `fleet-ops:driver:table:columns` | `name` , `public-id` , `phone` , … |
| Row actions | `fleet-ops:driver:table:row-actions` | `view` , `edit` , `assign-vehicle` , … `delete` |

A dash in
**Built-in ids**
means the slot has no built-in items with ids: your items still render, at the slot's
[default spot](https://fleetbase.io/docs/extension-development/resource-views/placement#default-spots)
.

## Notes That Apply Everywhere

* **Details rows**
  (header buttons, menu items, tabs) only appear for resources with a details view.
* **Ids follow two rules**
  : a column's id is its
  `valuePath`
  dasherized (
  `created_at`
  →
  `created-at`
  ); an action's id is its handler's name dasherized (
  `assignVehicle`
  →
  `assign-vehicle`
  ). The delete action is always
  `delete`
  .
* **Source links**
  point at each engine's
  `main`
  branch. A file's layout can change between releases; the registry names and ids are what stay stable.

## Your Own Engine

If your extension's views are extensible, document their registries the same way. See
[Making Your Views Extensible](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
.

[Tabs

Add a tab to another engine's details view with MenuItem — a component from your engine, rendered with the record, the routes it uses, the arguments it receives, and the details tabs alias.](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
[Fleet-Ops

Every resource view registry Fleet-Ops declares — the registry names for each table and details view, where each is wired in the Fleet-Ops source, and the built-in ids to place your items against.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops)
