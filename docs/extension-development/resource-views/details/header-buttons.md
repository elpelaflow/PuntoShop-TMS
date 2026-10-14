---
title: "Header Buttons"
url: https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons
module: extension-development
---

Resource Views

Details Views

# Header Buttons

Add a button to the header of another engine's details view with ActionButton — the record it acts on, visibility per record, dropdowns and your own components, and where details views appear.

# Header Buttons

A header button sits in a details view's header, after the view's own buttons. It acts on the record the view shows, which it receives as
`ctx.resource`
.

```
import { ActionButton } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'ledger:invoice:details:actions',
    new ActionButton({ id: 'acme-send-to-erp', text: 'Send to ERP', icon: 'cloud-arrow-up' })
        .visibleWhen((ctx) => ctx.resource.status === 'paid')
        .withHandler((ctx) => ctx.owner.lookup('service:fetch').post('erp/invoices', { invoice: ctx.resource.id }, { namespace: 'acme/int/v1' }))
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:details:actions` |
| **Contract** | `ActionButton` , from `@fleetbase/ember-core/contracts` |
| **Handler** | `onClick(ctx)` , with the record as `ctx.resource` |
| **Visibility check** | `isVisible(ctx)` , when the view renders |
| **Default spot** | After the view's own buttons |
| **Without the permission** | Shown disabled |

Header buttons use the same contract as
[toolbar buttons](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons)
: every option and method listed there works here. The difference is the context: a details view puts
**the record**
on
`ctx.resource`
.

## Where Details Views Appear

The same registration shows up wherever the engine shows that record:

| Engine | Details views |
| --- | --- |
| Fleet-Ops | The routed details panel, and the side panel that opens from a row or from the map |
| Ledger | The routed details panel |
| IAM | The edit dialog: buttons appear in the dialog's footer |
| Developers | The details page: buttons appear in its header |

The
[Registry Catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
lists which resources have a details view.

## Examples

### Depending on the Record

`isVisible`
is checked when the view renders, with the record on
`ctx.resource`
:

```
new ActionButton({ id: 'acme-track-shipment', text: 'Track with Acme', icon: 'location-crosshairs' })
    .visibleWhen((ctx) => Boolean(ctx.resource.meta?.acme_tracking_id))
    .withHandler((ctx) => window.open(`https://track.acme.example.com/${ctx.resource.meta.acme_tracking_id}`, '_blank'));
```

### Then Refreshing the Record

```
new ActionButton({ id: 'acme-verify', text: 'Verify licence', icon: 'id-card' })
    .withHandler(async (ctx) => {
        await ctx.owner.lookup('service:fetch').post(`drivers/${ctx.resource.id}/verify`, {}, { namespace: 'acme/int/v1' });
        await ctx.resource.reload();
        ctx.owner.lookup('service:notifications').success('Licence verified.');
    });
```

### A Dropdown of Actions

Items in a header button's dropdown receive
`(record, ctx)`
:

```
import { ActionButton, ResourceAction } from '@fleetbase/ember-core/contracts';

new ActionButton({ id: 'acme-erp', text: 'ERP', icon: 'building-columns' }).withItems([
    new ResourceAction({ id: 'acme-erp-send', label: 'Send to ERP' }).withHandler((invoice, ctx) => send(invoice, ctx)),
    new ResourceAction({ id: 'acme-erp-open', label: 'Open in ERP' })
        .visibleWhen((invoice) => Boolean(invoice.meta?.erp_id))
        .withHandler((invoice) => window.open(`https://erp.example.com/invoices/${invoice.meta.erp_id}`, '_blank')),
]);
```

For one or two actions, prefer
[menu items](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
: they join the view's existing "…" menu instead of adding another button.

### Your Own Component

```
new ActionButton({ id: 'acme-score' }).withComponent(new ExtensionComponent('@acme/safety-engine', 'driver-score-chip'));
```

The component receives the button's options as arguments. To show something about the record, read it from a service your extension fills, or pass what it needs through the button's
`options`
key, which arrives as
`@options`
.

## Related

* [Menu Items](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
* [Toolbar Buttons](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons)
  : every
  `ActionButton`
  option.
* [Handlers and Context](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)
