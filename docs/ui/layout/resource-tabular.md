---
title: "Resource Layouts"
url: https://fleetbase.io/docs/ui/layout/resource-tabular
module: ui
---

# Resource Layouts

<Layout::Resource::Tabular>, <Layout::Resource::Card>, <Layout::Resource::CardsGrid>, and <Layout::Resource::Panel> — pre-built page layouts for resource list views.

# Resource Layouts

`@fleetbase/ember-ui`
ships four pre-built page layouts for rendering a resource list. They are higher-level wrappers around
`<Table>`
, search, filters, bulk actions, and pagination — drop one in and you get a complete resource page.

| Layout | Component | When to use |
| --- | --- | --- |
| Tabular | `<Layout::Resource::Tabular>` | Standard list/detail page (the default for most resources) |
| Card | `<Layout::Resource::Card>` | Single-card detail view |
| CardsGrid | `<Layout::Resource::CardsGrid>` | Grid of cards (e.g. media gallery, store grid) |
| Panel | `<Layout::Resource::Panel>` | Sectioned panel layout |

## Tabular Example

```
<Layout::Resource::Tabular
  @title="Drivers"
  @searchQuery={{this.q}}
  @onSearch={{this.onSearch}}
  @onReload={{this.onReload}}
  @columns={{this.columns}}
  @rows={{this.rows}}
  @table={{this.table}}
  @onRowClick={{this.openDriver}}
/>
```

`<Layout::Resource::Tabular>`
renders:

* Section header with
  `@title`
  , search input, refresh button
* Filters picker (driven by columns marked
  `filterable`
  )
* Visible-column picker (let the user hide/show columns)
* Bulk-action dropdown (when rows are selected)
* The actual
  `<Table>`
  with sortable columns and pagination
* Optional bulk-search dropdown for advanced multi-field search

## Common Arguments

| Argument | Description |
| --- | --- |
| `@title` | Header title |
| `@columns` | Column descriptors (passed to `<Table>` ) |
| `@rows` | Row data |
| `@table` | The ember-light-table model object |
| `@searchQuery` | Bound to the search input |
| `@onSearch` | Search callback |
| `@onReload` | Refresh button callback |
| `@onRowClick` | Click callback for each row |
| `@onSubmitBulkSearch` | Optional advanced search |
| `@bulkSearchValue` | Bound to advanced search |
| `@withoutHeader` | Skip the entire header row |
| `@hideColumnsPicker` | Skip the visible-column picker |
| `@registry` | A table registry such as `fleet-ops:driver:table` . Merges the columns, row actions, bulk actions and toolbar buttons other extensions registered there. See [Resource View Registries](https://fleetbase.io/docs/extension-development/resource-views) |
| `@actionButtons` | Toolbar buttons: `{ id, text, icon, type, onClick, permission }` , a dropdown with `items` , or a `component` |
| `@bulkActions` | Items for the **Bulk Actions** menu: `{ id, label, icon, fn, permission }` |
| `@searchDisabled` | Disable the search input |

Plus a long tail of
`*Class`
and
`*Width`
overrides for each subsection.

### Extra Header Controls

Use the
`<:header>`
block for controls that belong in the header before the standard ones, such as a mode toggle:

```
<Layout::Resource::Tabular @title="API Keys" @data={{@model}} @columns={{this.columns}}>
  <:header>
    <Toggle @isToggled={{this.isTestMode}} @onToggle={{this.toggleTestMode}} @label="Test mode" />
  </:header>
</Layout::Resource::Tabular>
```

## Extension Registries

Pass
`@registry`
and other extensions can extend the view without changing it:

| Layout | `@registry` | Merges |
| --- | --- | --- |
| `<Layout::Resource::Tabular>` | `<extension>:<resource>:table` | Columns, row actions, bulk actions, toolbar buttons |
| `<Layout::Resource::TabularActions>` | `<extension>:<resource>:table` | Toolbar buttons and bulk actions (merge columns in your controller) |
| `<Layout::Resource::Panel>` | `<extension>:<resource>:details` | Header buttons, and items in the "…" menu |

Cells, filters and toolbar components that other extensions register can come from their own engines, as
`ExtensionComponent`
s. The shared renderers
`<Layout::Resource::ActionButtons @buttons>`
and
`<Layout::Resource::BulkActions @actions>`
are available for headers you lay out yourself. See
[Making Views Extensible](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
.

## Real-World Usage

Look at any of the resource list controllers in fleet-ops or ledger — they all use
`<Layout::Resource::Tabular>`
as their root template:

* `fleet-ops/addon/templates/management/drivers/index.hbs`
* `fleet-ops/addon/templates/management/vehicles/index.hbs`
* `fleet-ops/addon/templates/operations/orders/index.hbs`

Studying any of these is the fastest way to see the full set of arguments in action.

## Source

| File | Description |
| --- | --- |
| `addon/components/layout/resource/tabular.hbs` | Template |
| `addon/components/layout/resource/tabular.js` | Class |
| `addon/components/layout/resource/card.hbs` | Sibling — single-card detail view (template) |
| `addon/components/layout/resource/card.js` |  |
| `addon/components/layout/resource/cards-grid.hbs` | Sibling — grid of cards (template) |
| `addon/components/layout/resource/cards-grid.js` |  |
| `addon/components/layout/resource/panel.hbs` | Sibling — sectioned panel layout (template) |
| `addon/components/layout/resource/panel.js` |  |
