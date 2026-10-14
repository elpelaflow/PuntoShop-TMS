---
title: "Overview"
url: https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible
module: extension-development
---

Resource Views

Making Your Views Extensible

# Overview

Let other extensions add columns, actions, buttons and tabs to your own engine's tables and details views — what it takes, in five steps, and a checklist.

# Making Your Views Extensible

The pages before this one are about adding to
**other engines'**
views. This section is about the other side: making
**your engine's**
views accept additions, the same way Fleet-Ops, Ledger, IAM and Developers do.

When your views are extensible, any extension can register a column into
`acme:shipment:table:columns`
, and your shipments table renders it, with no change to your engine.

## What It Takes

### Name your resources

Choose the registry names for each resource,
`<your-extension>:<resource>`
. If your action services extend
`ResourceActionService`
, they work the names out for you.

[Naming and Declaring →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/naming-and-declaring)

### Declare your registries

Create them when your extension boots, so they exist before others register into them.

[Naming and Declaring →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/naming-and-declaring#declaring)

### Pass @registry to your layouts

`Layout::Resource::Tabular`
and
`Layout::Resource::Panel`
merge registered items for you when given a registry.

[Layouts →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/layouts)

### Accept registered filters

Build your index controllers' query params with
`queryParamsFor()`
, so filterable columns others register can filter.

[Query Params and Ids →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/query-params-and-ids)

### Give your built-in items stable ids

Others place their items before and after yours, by id.

[Query Params and Ids →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/query-params-and-ids#stable-ids)

Views that don't use the resource layouts, such as a hand-built table or a dialog, can merge registered items themselves; see
[Custom Views](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views)
.

## Checklist

* Action services extend
  `ResourceActionService`
  , with
  `registryResource`
  set where the model name differs from the resource name
* `declare('<extension>', [...resources])`
  is called in
  `setupExtension`
* Tables pass
  `@registry="<extension>:<resource>:table"`
* Details panels pass
  `@registry="<extension>:<resource>:details"`
  , and side panels
  `registry: this.detailsRegistry`
* Index controllers build
  `queryParams`
  with
  `queryParamsFor()`
* Built-in columns, actions and buttons have stable ids, and the delete action's id is
  `delete`
* Your registries and built-in ids are documented, so other extension authors can find them

[Developers

Every resource view registry Developers declares — the registry names for each table and details view, where each is wired in the Developers source, and the built-in ids to place your items against.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/developers)
[Naming and Declaring

Choose your engine's registry names through ResourceActionService, and declare every registry for your resources in setupExtension.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/naming-and-declaring)
