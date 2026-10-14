---
title: "Custom Views"
url: https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views
module: extension-development
---

Resource Views

Making Your Views Extensible

# Custom Views

Merge registered columns, actions, buttons and menu items into views you render yourself — a hand-built table, a page header, a dialog — and the context to pass to handlers.

# Custom Views

If a view doesn't use the resource layouts, for example a
`<Table>`
with a header you built yourself, merge registered items in your controller. Each method below takes your built-in items and returns them with the registered ones placed in.

## Columns and Row Actions

For a
`<Table>`
you render, merge columns and row actions together:

```
import { cached } from '@glimmer/tracking';

@cached get registeredColumns() {
    return this.shipmentActions.mergeRegisteredColumns(this.columns, { controller: this });
}
```

```
<Table @rows={{@model}} @columns={{this.registeredColumns}} />
```

## Header Buttons and Menu Items

Merge with
`mergeHeaderButtons`
, and render with
`Layout::Resource::ActionButtons`
:

```
import { getOwner } from '@ember/application';
import lookupResourceView, { mergeHeaderButtons } from '@fleetbase/ember-ui/utils/resource-view';

get actionButtons() {
    const buttons = [{ id: 'refresh', icon: 'refresh', onClick: this.reload }];

    return mergeHeaderButtons(
        lookupResourceView(getOwner(this)),
        'acme:shipment:details',
        buttons,
        { resource: this.model, controller: this },
        { withMenu: true }
    );
}
```

```
<Layout::Section::Header @title={{@model.name}} @actionsWrapperClass="space-x-2">
    <Layout::Resource::ActionButtons @buttons={{this.actionButtons}} />
</Layout::Section::Header>
```

`withMenu: true`
also merges the
`menu`
slot, for details views. Leave it out for a table header.

## Any One Slot

`mergeRegistered(surface, slot, items, context)`
on your action service merges a single slot:

```
get bulkActions() {
    return this.shipmentActions.mergeRegistered('table', 'bulk-actions', [{ id: 'bulk-delete', label: 'Delete selected', fn: this.bulkDelete }], {
        controller: this,
        getSelectedRows: () => this.table?.selectedRows ?? [],
    });
}
```

`Layout::Resource::BulkActions`
renders a merged bulk actions list:

```
<Layout::Resource::BulkActions @actions={{this.bulkActions}} />
```

## Dialogs

A details view in a modal can show registered buttons in its footer. The default modal renders
`actionButtons`
from its options:

```
this.modalsManager.show('modals/shipment-form', {
    title: 'Edit shipment',
    actionButtons: mergeHeaderButtons(this.resourceView, 'acme:shipment:details', [], { resource: shipment }, { withMenu: true }),
    // …
});
```

## The Context to Pass

What you pass as the context is what handlers receive as
`ctx`
, alongside the registry's own keys (
`owner`
,
`registry`
,
`extension`
,
`resourceName`
,
`surface`
,
`slot`
):

| View | Pass |
| --- | --- |
| Tables | `controller` ; `table` , as a getter, because the table is set up after the first render; `getSelectedRows()` |
| Details | `resource` ; `controller` or `panel` where you have them |

Getters stay getters:

```
const view = this;
const context = {
    controller: this,
    get table() {
        return view.table;
    },
    getSelectedRows: () => view.table?.selectedRows ?? [],
};
```

## Caching

Use
`@cached`
for merged lists a template reads more than once. Merging creates fresh copies each time, so anything users change on them, such as a column they hid, is lost on the next merge.
