---
title: "Introduction"
url: https://fleetbase.io/docs/extension-development/resource-views
module: extension-development
---

Resource Views

# Introduction

Resource views are the table and details screens of Fleet-Ops, Ledger, IAM and Developers. Your extension can add columns, actions, buttons and tabs to them without changing the engine that owns them.

# Resource Views

A
**resource view**
is one of the screens Fleetbase uses to list and show records: the
**table**
of drivers, orders or invoices, and the
**details view**
that opens when you click one. Every engine that ships with Fleetbase (Fleet-Ops, Ledger, IAM and Developers) builds its screens this way.

Each of those views has a set of
**registries**
: named places where an extension can add its own items. Your extension registers an item once, from its
`extension.js`
, and the view renders it next to its own, with no change to the engine that owns the view.

## What You Can Add

### To a Table View

![A Fleet-Ops drivers table with an added column, row action, bulk action and toolbar button, each outlined and numbered against its registry name](https://fleetbase.io/_next/static/media/table-view-slots.fd236c45.svg)

|  | Element | What it is | Page |
| --- | --- | --- | --- |
| 1 | **Columns** | A column in the table, with its own cell and, optionally, a filter | [Columns](https://fleetbase.io/docs/extension-development/resource-views/tables/columns) |
| 2 | **Row actions** | An item in each row's "…" menu | [Row Actions](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions) |
| 3 | **Bulk actions** | An item in the **Bulk Actions** menu, run on the selected rows | [Bulk Actions](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions) |
| 4 | **Toolbar buttons** | A button in the table's header | [Toolbar Buttons](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons) |

### To a Details View

![A Fleet-Ops driver details panel with an added header button, menu item and tab, each outlined and numbered against its registry name](https://fleetbase.io/_next/static/media/details-view-slots.97527a20.svg)

|  | Element | What it is | Page |
| --- | --- | --- | --- |
| 1 | **Header buttons** | A button in the details header | [Header Buttons](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons) |
| 2 | **Menu items** | An item in the header's "…" menu | [Menu Items](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items) |
| 3 | **Tabs** | A tab that renders your own component | [Tabs](https://fleetbase.io/docs/extension-development/resource-views/details/tabs) |

## How It Works

Three pieces fit together:

1. **A registry name**
   says
   *where*
   the item goes. It reads like a path: the engine, the resource, the kind of view, and the slot.

   ```
   fleet-ops : driver : table : columns
   ───┬─────   ──┬───   ──┬──   ───┬───
   extension  resource  surface   slot
   ```

   See
   [Registry Names](https://fleetbase.io/docs/extension-development/resource-views/registry-names)
   .
2. **A contract**
   says
   *what*
   the item is. Each kind of item has its own class from
   `@fleetbase/ember-core/contracts`
   :

   | Contract | Used for |
   | --- | --- |
   | `TableColumn` | Columns |
   | `ResourceAction` | Row actions, bulk actions and details menu items |
   | `ActionButton` | Toolbar buttons and details header buttons |
   | `MenuItem` | Details tabs |
3. **The
   `resource-view`
   service**
   stores your item under that name. The view reads the registry when it renders and merges your items in with its own.

```
// addon/extension.js
import { TableColumn } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const views = universe.getService('resource-view');

        views.register(
            'fleet-ops:driver:table:columns',
            new TableColumn({ id: 'acme-safety-score', label: 'Safety Score', valuePath: 'meta.safety_score' })
        );
    },
};
```

That is a complete registration: the drivers table now has a
**Safety Score**
column.
[Getting Started](https://fleetbase.io/docs/extension-development/resource-views/getting-started)
builds it up step by step, with a custom cell and a placement.

## Where to Go Next

Getting Started

Add your first column, then a cell component and an action, step by step.

[Getting Started →](https://fleetbase.io/docs/extension-development/resource-views/getting-started)

Registry Names

How the names are built, and how to find the one you need.

[Registry Names →](https://fleetbase.io/docs/extension-development/resource-views/registry-names)

Registry Catalogue

Every registry the built-in engines declare, with their built-in ids.

[Registry Catalogue →](https://fleetbase.io/docs/extension-development/resource-views/catalogue)

Making Your Views Extensible

Let other extensions add to your own engine's tables and details views.

[Making Your Views Extensible →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)

## Requirements

Resource view registries need
**`@fleetbase/ember-core`
0.3.25**
and
**`@fleetbase/ember-ui`
0.4.5**
or later in the console, and these engine versions or later:

| Engine | Package | Version |
| --- | --- | --- |
| Fleet-Ops | `@fleetbase/fleetops-engine` | 0.6.71 |
| Ledger | `@fleetbase/ledger-engine` | 0.0.12 |
| IAM | `@fleetbase/iam-engine` | 0.1.13 |
| Developers | `@fleetbase/dev-engine` | 0.2.17 |

On an older console, registering does nothing and the views render as they always have, so your extension keeps working.

[Extension Manager

Lazy-load engines on demand, react to engine load events, share host services and components into engines, and inspect installed-extension state.](https://fleetbase.io/docs/extension-development/universe/extension-manager)
[Getting Started

Add a column to the Fleet-Ops drivers table, give it your own cell, place it where you want, and add an action to each row — step by step.](https://fleetbase.io/docs/extension-development/resource-views/getting-started)
