---
title: "The Details View"
url: https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view
module: extension-development
---

Order Presentation

Customizing

# The Details View

Compose the order details view for your order type with details.sections — Fleet-Ops' native sections by name and your own — with the arguments your sections receive, refreshing after changes, and a summary with next-step buttons.

# The Details View

`details.sections`
is the order details overview, top to bottom, built the same way as the
[form](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form)
: native section names and
`ExtensionComponent`
s.

```
details: {
    sections: [section('rental/details/summary'), 'activity', 'route', 'notes', 'documents', 'comments'],
},
```

![The standard order details view next to a profiled one](https://fleetbase.io/_next/static/media/details-standard-vs-profile.d1e1c5b4.svg)

As with the form, the list
**is**
the view: anything you leave out isn't rendered.

## Native Sections

| Name | Renders |
| --- | --- |
| `activity` | The current activity and the history, with **Update activity** |
| `detail` | The order's details: type, internal id, tracking number, customer, facilitator, driver, vehicle, scheduled, dispatched and started dates, ad-hoc and proof of delivery |
| `custom-fields` | The order config's custom field values |
| `purchase-rate` | The purchase rate and transaction |
| `tracking` | The tracking number, QR code and ETA |
| `proof` | Proof of delivery records |
| `notes` | Notes |
| `integrated-vendor-details` | An integrated vendor's order details |
| `route` | The route and its stops |
| `payload` | The entities |
| `documents` | Documents |
| `comments` | Comments |
| `metadata` | Metadata |

**Native names differ between the form and the details view.**
The details view's summary is
`detail`
; the form's is
`details`
. Custom fields are a section of their own here (
`custom-fields`
), while in the form they are part of
`details`
.

Native sections keep their editing behaviour: notes, documents, comments and the activity update work as in the standard view.

### The Standard Layout

```
details: {
    sections: ['activity', 'detail', 'custom-fields', 'purchase-rate', 'tracking', 'proof', 'notes', 'integrated-vendor-details', 'route', 'payload', 'documents', 'comments', 'metadata'],
},
```

## Your Own Sections

| Argument | Value |
| --- | --- |
| `@resource` | The order |
| `@controller` | The details controller |
| `@permission` | The order's write permission, for `cannot-write` -style checks |
| `@isLoading` | Whether the order is reloading |
| `@profile` | Your profile object |
| `@onChange` | Call after you change the order, so the view refreshes |

### A Summary

```
{{! addon/components/rental/details/summary.hbs }}
<ContentPanel @title="Rental" @open={{true}} @wrapperClass="bordered-top">
    {{#if @isLoading}}
        <Spinner />
    {{else}}
        <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="text-gray-500">Asset tag</div>
            <div>{{or @resource.meta.rental.asset_tag "—"}}</div>
            <div class="text-gray-500">Rental days</div>
            <div>{{or @resource.meta.rental.days "—"}}</div>
            <div class="text-gray-500">Status</div>
            <div><Badge @status={{@resource.status}} /></div>
        </div>
    {{/if}}
</ContentPanel>
```

### Next-Step Buttons

A section can offer the order's next steps as buttons. Ask Fleet-Ops for them, so the buttons always follow the order config's flow:

```
// addon/components/rental/details/next-steps.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class RentalDetailsNextStepsComponent extends Component {
    @service fetch;
    @service notifications;
    @tracked nextActivities = [];

    constructor() {
        super(...arguments);
        this.load.perform();
    }

    @task *load() {
        try {
            this.nextActivities = yield this.fetch.get(`orders/next-activity/${this.args.resource.id}`);
        } catch {
            this.nextActivities = [];
        }
    }

    @task *advance(activity) {
        try {
            yield this.fetch.patch(`orders/update-activity/${this.args.resource.id}`, { activity: { code: activity.code } });
            yield this.args.resource.reload();
            this.args.onChange?.();
            this.notifications.success(`Moved to ${activity.status}.`);
            yield this.load.perform();
        } catch (error) {
            this.notifications.serverError(error);
        }
    }
}
```

```
{{! addon/components/rental/details/next-steps.hbs }}
{{#if this.nextActivities.length}}
    <div class="flex flex-wrap gap-2 p-4">
        {{#each this.nextActivities as |activity|}}
            <Button @text={{activity.status}} @type="primary" @isLoading={{this.advance.isRunning}} @onClick={{perform this.advance activity}} />
        {{/each}}
    </div>
{{/if}}
```

With a
[configured lifecycle](https://fleetbase.io/docs/extension-development/order-lifecycles)
that sets
`strict_transitions`
, these are the only moves the API accepts.

## Details Tabs

Tabs are separate from sections: tabs registered for orders, such as Ledger's
**Invoice**
, still appear for a profiled order. To add a tab for your order type, register one and show it only for your orders; see
[Tabs](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
.

## Registry Slots Aren't Rendered

The standard details view renders the
`fleet-ops:component:order:details:*`
registry slots, where extensions inject components. A profiled view doesn't: your sections are the whole layout. If your order type needs something another extension provides there, render it from one of your own sections.
