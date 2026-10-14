---
title: "Layouts"
url: https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/layouts
module: extension-development
---

Resource Views

Making Your Views Extensible

# Layouts

Pass @registry to Layout::Resource::Tabular, Layout::Resource::Panel, TabularActions and resource context side panels, so they merge registered columns, actions, buttons and menu items.

# Layouts

The shared resource layouts from
`@fleetbase/ember-ui`
merge registered items when you give them a registry. Pass the
**surface prefix**
,
`<extension>:<resource>:<surface>`
, and they add each slot's name themselves.

| Layout | `@registry` | Merges |
| --- | --- | --- |
| `Layout::Resource::Tabular` | `acme:shipment:table` | Columns, row actions, bulk actions, toolbar buttons |
| `Layout::Resource::TabularActions` | `acme:shipment:table` | Bulk actions, toolbar buttons |
| `Layout::Resource::Panel` | `acme:shipment:details` | Header buttons, menu items |
| `resourceContextPanel.open({ registry })` | `acme:shipment:details` | Header buttons, menu items |

## Tables

```
{{! addon/templates/shipments/index.hbs }}
<Layout::Resource::Tabular
    @registry="acme:shipment:table"
    @title="Shipments"
    @searchQuery={{this.query}}
    @onSearch={{perform this.shipmentActions.controllerSearchTask this}}
    @data={{@model}}
    @columns={{this.columns}}
    @page={{this.page}}
    @onPageChange={{fn (mut this.page)}}
    @setupTable={{fn (mut this.table)}}
    @actionButtons={{this.actionButtons}}
    @bulkActions={{this.bulkActions}}
    @controller={{this}}
/>
```

With
`@registry`
, Tabular:

* merges registered
  **columns**
  into
  `@columns`
  , and registered
  **row actions**
  into the column whose
  `cellComponent`
  is
  `table/cell/dropdown`
  ;
* merges registered
  **bulk actions**
  and
  **toolbar buttons**
  ;
* lists registered columns in the filters menu and the column picker, and keeps users' hidden-column choices;
* renders
  `ExtensionComponent`
  cells and filters from other engines.

Pass
`@controller`
: it becomes
`ctx.controller`
in handlers.

A string literal is the most readable
`@registry`
.
`{{this.shipmentActions.tableRegistry}}`
gives the same value.

## Details Panels

```
{{! addon/templates/shipments/index/details.hbs }}
<Layout::Resource::Panel
    @registry="acme:shipment:details"
    @resource={{@model}}
    @headerComponent={{component "shipment/panel-header" resource=@model}}
    @actionButtons={{this.actionButtons}}
    @onPressCancel={{transition-to "shipments.index"}}
>
    <TabNavigation @tabs={{this.tabs}}>{{outlet}}</TabNavigation>
</Layout::Resource::Panel>
```

Panel merges registered
**header buttons**
into
`@actionButtons`
, and registered
**menu items**
into the first of your buttons that has
`items`
. Without one, it adds a "…" menu for them.

A custom
`@headerComponent`
receives the merged buttons as
`@actionButtons`
. Render them with
`<Layout::Resource::Panel::HeaderActions @actionButtons={{@actionButtons}} />`
or
`<Layout::Resource::ActionButtons @buttons={{@actionButtons}} />`
.

### Tabs

Panel doesn't render tabs. Read registered tabs in your controller and add them to your own:

```
get tabs() {
    const registered = this.menuService.getMenuItems('acme:component:shipment:details');
    return [
        { route: 'shipments.index.details.index', label: 'Overview' },
        ...(Array.isArray(registered) ? registered : []),
    ];
}
```

Add a
`virtual`
route under your details route, so registered tabs have somewhere to render; see
[Virtual Routes](https://fleetbase.io/docs/extension-development/frontend/virtual-routes)
.

## Side Panels

If your action service opens details in a side panel through
`resourceContextPanel.open()`
, pass the registry there too:

```
panel = {
    view: (shipment, options = {}) => {
        return this.resourceContextPanel.open({
            registry: this.detailsRegistry,
            shipment,
            header: 'shipment/panel-header',
            actionButtons: [ /* … */ ],
            tabs: this.panelTabs,
            ...options,
        });
    },
};
```

## Table Headers Only

`Layout::Resource::TabularActions`
renders only a table's header: search, filters, the column picker, bulk actions and toolbar buttons. It is used when a parent route or a card grid lays the page out:

```
<Layout::Section::Header @title="Shipments">
    <Layout::Resource::TabularActions
        @registry="acme:shipment:table"
        @columns={{this.columns}}
        @actionButtons={{this.actionButtons}}
        @bulkActions={{this.bulkActions}}
        @table={{this.table}}
        @controller={{this}}
    />
</Layout::Section::Header>
```

It doesn't render the table, so it can't merge columns. Merge them in the controller and pass the result to both the header and the table; see
[Custom Views](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views#columns-and-row-actions)
.

## Next

[Query Params and Ids →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/query-params-and-ids)

[Naming and Declaring

Choose your engine's registry names through ResourceActionService, and declare every registry for your resources in setupExtension.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/naming-and-declaring)
[Query Params and Ids

Build your index controllers' query params with queryParamsFor() so registered filterable columns work, and give your built-in columns, actions and buttons stable ids for others to place against.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/query-params-and-ids)
