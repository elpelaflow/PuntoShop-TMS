---
title: "Registry Names"
url: https://fleetbase.io/docs/extension-development/resource-views/registry-names
module: extension-development
---

Resource Views

# Registry Names

How resource view registry names are built — extension, resource, surface and slot — the slots each surface has, how to find the name for any view, and the details tabs alias.

# Registry Names

Every place you can add to has a name of four parts, separated by colons:

```
<extension>:<resource>:<surface>:<slot>
```

Read it as a path, from the most general part to the most specific:
**which engine**
,
**which resource**
,
**which view**
,
**which part of the view**
.

```
fleet-ops:driver:table:columns       the columns of Fleet-Ops' drivers table
ledger:invoice:details:menu          the "…" menu of Ledger's invoice details
iam:user:table:row-actions           each row's menu in IAM's users table
fleet-ops:order:details:actions      the header buttons of Fleet-Ops' order details
```

## The Four Parts

### Extension

The engine that
**owns the view**
, not the extension adding to it. It is always the engine's segment in the console URL, so you can read it off the address bar:

| You are on | Extension |
| --- | --- |
| `/console/fleet-ops/management/drivers` | `fleet-ops` |
| `/console/ledger/billing/invoices` | `ledger` |
| `/console/iam/users` | `iam` |
| `/console/developers/api-keys` | `developers` |

An extension adding a column to the Fleet-Ops drivers table always uses
`fleet-ops:`
, whatever its own name is.

### Resource

The kind of record the view shows:
**singular**
,
**lowercase**
and
**dasherized**
, without the engine's own prefix.

| View | Resource | Not |
| --- | --- | --- |
| Fleet-Ops work orders | `work-order` | `work-orders` , `workOrder` |
| Ledger invoices | `invoice` | `ledger-invoice` |
| Developers API keys | `api-key` | `api-credential` |

Where the resource name differs from the model name (Developers' API keys are
`api-credential`
records), the name the view uses is the one in the
[catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
.

### Surface

The kind of view:

| Surface | Means |
| --- | --- |
| `table` | The list of records: the index table, and its header |
| `details` | One record: the details panel, side panel, page or dialog that shows it |

### Slot

The part of the view. Each surface has a fixed set:

| Surface | Slot | Adds | Contract |
| --- | --- | --- | --- |
| `table` | `columns` | [Table columns](https://fleetbase.io/docs/extension-development/resource-views/tables/columns) | `TableColumn` |
| `table` | `row-actions` | [Items in each row's "…" menu](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions) | `ResourceAction` |
| `table` | `bulk-actions` | [Items in the Bulk Actions menu](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions) | `ResourceAction` |
| `table` | `actions` | [Buttons in the table header](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons) | `ActionButton` |
| `details` | `actions` | [Buttons in the details header](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons) | `ActionButton` |
| `details` | `menu` | [Items in the details header's "…" menu](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items) | `ResourceAction` |
| `details` | `tabs` | [Details tabs](https://fleetbase.io/docs/extension-development/resource-views/details/tabs) | `MenuItem` |

**`actions`
always means header buttons**
, on both surfaces. Items in a dropdown are
`row-actions`
,
`bulk-actions`
or
`menu`
.

## Every Name for One Resource

A resource with both views has seven names. For Fleet-Ops drivers:

```
fleet-ops:driver:table:columns
fleet-ops:driver:table:row-actions
fleet-ops:driver:table:bulk-actions
fleet-ops:driver:table:actions
fleet-ops:driver:details:actions
fleet-ops:driver:details:menu
fleet-ops:driver:details:tabs
```

The service can list them for you:

```
universe.getService('resource-view').resourceRegistryNames('fleet-ops', 'driver');
```

## Finding the Name You Need

1. **Find the engine**
   from the console URL.
2. **Find the resource**
   in that engine's page of the
   [Registry Catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
   . Each resource lists its names, the ids of its built-in items, and a link to the source file that wires it up.
3. **Pick the slot**
   for what you are adding, from the table above.

## Building Names in Code

You can write the full name, or let a helper build it from the engine and resource:

```
const views = universe.getService('resource-view');

// The full name
views.register('fleet-ops:driver:table:row-actions', action);

// A helper per slot
views.registerRowAction('fleet-ops', 'driver', action);
```

| Helper | Registers into |
| --- | --- |
| `registerTableColumn(extension, resource, column)` | `<extension>:<resource>:table:columns` |
| `registerRowAction(extension, resource, action)` | `<extension>:<resource>:table:row-actions` |
| `registerBulkAction(extension, resource, action)` | `<extension>:<resource>:table:bulk-actions` |
| `registerTableAction(extension, resource, button)` | `<extension>:<resource>:table:actions` |
| `registerDetailsAction(extension, resource, button)` | `<extension>:<resource>:details:actions` |
| `registerDetailsMenuItem(extension, resource, action)` | `<extension>:<resource>:details:menu` |
| `registerDetailsTab(extension, resource, menuItem)` | `<extension>:<resource>:details:tabs` |

The same helpers are on the Universe service itself, as
`universe.registerRowAction(…)`
and so on. See
[Resource View Service](https://fleetbase.io/docs/extension-development/universe/resource-view-service)
for the full API.

## The Details Tabs Alias

Details tabs existed before these registries, under a different name:
`<extension>:component:<resource>:details`
, registered through the
[Menu Service](https://fleetbase.io/docs/extension-development/universe/menu-service)
.

`<extension>:<resource>:details:tabs`
is an
**alias**
for that registry. Both names reach the same tabs, so you can use the new name, and extensions that already register tabs the old way keep working. See
[Tabs](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
.

## Invalid Names

A name that does not follow the rule is
**rejected**
: nothing is registered,
`register()`
returns
`false`
, and the console logs a debug message. This catches typos that would otherwise register into a slot no view reads.

| Name | Problem |
| --- | --- |
| `fleet-ops:table:driver:columns` | The surface comes before the resource |
| `fleet-ops:driver:table:column` | `column` is not a slot; it is `columns` |
| `fleet-ops:driver:details:columns` | Details views have no `columns` slot |
| `FleetOps:driver:table:columns` | Names are lowercase and dasherized |

An item is also rejected when its contract doesn't fit the slot, for example an
`ActionButton`
registered into
`columns`
.

**A well-formed name for a view that doesn't exist is accepted.**
`fleet-ops:drivers:table:columns`
follows the rule, so it registers, but no view reads it (the resource is
`driver`
) and your item never appears. Copy names from the
[catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
rather than typing them.

[Getting Started

Add a column to the Fleet-Ops drivers table, give it your own cell, place it where you want, and add an action to each row — step by step.](https://fleetbase.io/docs/extension-development/resource-views/getting-started)
[Placement

Control where your columns, actions and buttons appear among a view's own items — before or after another item, at a position, or by priority — and where they go when you don't say.](https://fleetbase.io/docs/extension-development/resource-views/placement)
