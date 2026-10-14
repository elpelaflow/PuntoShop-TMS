---
title: "Placement"
url: https://fleetbase.io/docs/extension-development/resource-views/placement
module: extension-development
---

Resource Views

# Placement

Control where your columns, actions and buttons appear among a view's own items — before or after another item, at a position, or by priority — and where they go when you don't say.

# Placement

When a view renders, it takes its own (built-in) items and merges yours in. Placement decides where each of yours goes. Every contract has the same four placement options.

| Option | Method | Places the item |
| --- | --- | --- |
| `before` | `.before(id)` | Directly before the item with that id |
| `after` | `.after(id)` | Directly after the item with that id |
| `index` | `.withIndex(n)` | At position `n` in the list, counting from 0 |
| `priority` | `.withPriority(n)` | Decides the order in which registered items are placed. Lower goes first; the default is `10` |

```
new TableColumn({ id: 'acme-score', label: 'Score' }).after('status');
new TableColumn({ id: 'acme-region', label: 'Region' }).before('name');
new TableColumn({ id: 'acme-flag', label: 'Flag' }).withIndex(0);
new ResourceAction({ id: 'acme-sync', label: 'Sync' }).withPriority(1);
```

The same options can be passed as keys:

```
new TableColumn({ id: 'acme-score', label: 'Score', after: 'status' });
```

`before`
and
`after`
replace each other: calling
`.after()`
clears an earlier
`.before()`
, and the other way round.

## How Items Are Placed

For each slot, the view:

1. **Starts with its built-in items**
   , in their own order.
2. **Drops registered items whose
   `id`
   is already taken.**
   Built-in items always win. A debug message names the skipped id.
3. **Sorts the remaining registered items by
   `priority`**
   , lowest first. Items with the same priority keep the order they were registered in.
4. **Places each one in turn**
   :
   * before or after its anchor, if an item with that id is in the list;
   * otherwise at
     `index`
     , clamped to the start or end of the list;
   * otherwise at the slot's
     **default spot**
     .

Because items are placed one at a time, an item can anchor to another extension's item, as long as that item is placed first. Give the anchor a lower
`priority`
to be sure.

## Default Spots

With no placement, or when the anchor isn't there:

| Slot | Default spot | Why |
| --- | --- | --- |
| `columns` | Just before the row actions ("…") column | Your column is the last data column, and the "…" column stays at the right edge |
| `row-actions` | Just before the `delete` item, and the separator in front of it | **Delete** stays at the bottom of the menu |
| `menu` (details) | Same as `row-actions` | Same |
| `bulk-actions` | At the end |  |
| `actions` (toolbar and header buttons) | At the end, after the built-in buttons |  |
| `tabs` | After the built-in tabs |  |

## Finding Ids to Anchor To

Built-in ids are listed for every view in the
[Registry Catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
. They follow two rules, so you can usually guess them:

* **A column's id**
  is its
  `valuePath`
  , dasherized:
  `created_at`
  →
  `created-at`
  ,
  `vendor.name`
  →
  `vendor-name`
  .
* **An action's id**
  is its handler's name, dasherized:
  `assignVehicle`
  →
  `assign-vehicle`
  . The delete action is always
  `delete`
  .

An anchor that isn't in the list is ignored, not an error: the item falls back to
`index`
, then to the default spot. This keeps your item showing if a future version of the engine renames or removes the anchor.

## Examples

```
// Right after the Status column
new TableColumn({ id: 'acme-score', label: 'Score' }).after('status');

// The first data column (before Name, which is first on most tables)
new TableColumn({ id: 'acme-flag', label: '' }).before('name');

// The first item in the row menu
new ResourceAction({ id: 'acme-open', label: 'Open in Acme' }).withIndex(0);

// Two of your own items, in a fixed order, both above Delete
new ResourceAction({ id: 'acme-sync', label: 'Sync' }).withPriority(1);
new ResourceAction({ id: 'acme-unsync', label: 'Unsync' }).withPriority(2);

// Anchored to another of your own items, placed first by priority
new ResourceAction({ id: 'acme-sync', label: 'Sync' }).withPriority(1);
new ResourceAction({ id: 'acme-sync-log', label: 'Sync log' }).after('acme-sync');
```

## Separators

Row actions, bulk actions and menu items can include a divider. A separator is a
`ResourceAction`
with
`separator: true`
, and it still needs an
`id`
:

```
new ResourceAction({ id: 'acme-divider', separator: true }).before('acme-sync');
```
