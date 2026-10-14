---
title: "The Order Form"
url: https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form
module: extension-development
---

Order Presentation

Customizing

# The Order Form

Compose the order form for your order type with form.sections — Fleet-Ops' native sections by name and your own as ExtensionComponents — with the arguments your sections receive and patterns for reading and writing the order.

# The Order Form

`form.sections`
is the order form, top to bottom. Each entry is either:

* **a native section's name**
  , a string such as
  `'details'`
  or
  `'route'`
  , which renders Fleet-Ops' own section; or
* **an
  `ExtensionComponent`**
  , which renders a component from your engine.

```
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

const section = (path) => new ExtensionComponent('@acme/rental-engine', path);

form: {
    sections: ['details', section('rental/form/equipment'), 'route', 'notes', 'documents'],
},
```

![The standard order form next to a profiled one](https://fleetbase.io/_next/static/media/form-standard-vs-profile.d3066928.svg)

The list
**is**
the form: anything you leave out isn't rendered, and an empty or missing list renders an empty form.

## Native Sections

| Name | Renders |
| --- | --- |
| `details` | The order type selector, internal id, schedule, customer, facilitator, driver, vehicle, the ad-hoc, dispatch and proof-of-delivery toggles, and then the order config's custom fields. [Fields can be hidden or added](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields) |
| `route` | Pickup, dropoff and waypoints, with the route map. [Its title can change, and multi-drop can be hidden](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields#the-route-section) |
| `payload` | The entities (items) the order carries |
| `service-rate` | Service rate and quote selection |
| `notes` | Order notes |
| `documents` | File attachments |
| `orchestrator-constraints` | Time windows, required skills and priority for the orchestrator |
| `metadata` | Free-form key/value metadata |

**Keep
`details`
in your form.**
It holds the order type selector, which is how users choose your type for a new order, and the order config's custom fields. Leave it out only if your own section sets
`order_config`
and handles custom fields.

Fleet-Ops' order validation still requires a pickup and dropoff (or at least two waypoints), so keep
`route`
too, unless your section sets them.

### The Standard Layout

To keep the form exactly as it is for other order types:

```
form: {
    sections: ['details', 'route', 'payload', 'service-rate', 'notes', 'documents', 'orchestrator-constraints', 'metadata'],
},
```

## Your Own Sections

An
`ExtensionComponent`
section is rendered with
`LazyEngineComponent`
, so it can live in your engine. Your engine is loaded the first time the section renders.

| Argument | Value |
| --- | --- |
| `@order` | The order being created or edited |
| `@resource` | The same order |
| `@controller` | The host controller, when the host passes one |
| `@profile` | Your profile object |
| `@hiddenFields` | The profile's `hidden.fields` |

Use the same building blocks as Fleet-Ops' own sections, so yours look native: a
`ContentPanel`
with
`@wrapperClass="bordered-top"`
, and
`InputGroup`
s in a grid.

```
<ContentPanel @title="Equipment" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        …
    </div>
</ContentPanel>
```

## Storing What Your Section Collects

Whatever your section sets on the order is saved with it.

### On the Order's meta

For values that have no order column, use
`meta`
. Replace
`meta`
with a new object rather than changing a key inside it, so the change is noticed:

```
// addon/components/rental/form/equipment.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RentalFormEquipmentComponent extends Component {
    get rental() {
        return this.args.order.meta?.rental ?? {};
    }

    @action update(key, event) {
        const order = this.args.order;
        order.set('meta', { ...(order.meta ?? {}), rental: { ...this.rental, [key]: event.target.value } });
    }
}
```

```
{{! addon/components/rental/form/equipment.hbs }}
<ContentPanel @title="Equipment" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <InputGroup @name="Asset tag" @value={{this.rental.asset_tag}} {{on "input" (fn this.update "asset_tag")}} />
        <InputGroup @name="Rental days" @type="number" @value={{this.rental.days}} {{on "input" (fn this.update "days")}} />
    </div>
</ContentPanel>
```

`InputGroup`
passes extra attributes and modifiers to its input, which is how
`{{on "input"}}`
reaches it.

### On the Order's Own Fields

Your section can set any order field Fleet-Ops' sections would, such as
`scheduled_at`
,
`customer`
or the payload's
`pickup`
:

```
@action selectDepot(place) {
    this.args.order.payload.set('pickup', place);
}
```

### In Your Own Tables

For data that belongs to your extension, keep a draft in
`meta`
while the form is open, then save it to your own tables on the server when the order is created, from an observer on Fleet-Ops'
`Order`
model. See
[Expansions & Observers](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers)
.

## Editing an Existing Order

The same sections are used when an order is edited:
**Edit details**
in the order's menu opens the profiled form in a side panel. Check
`@order.isNew`
where your section should behave differently for a new order, for example to lock a field once the order exists:

```
<InputGroup @name="Asset tag" @value={{this.rental.asset_tag}} @disabled={{not @order.isNew}} {{on "input" (fn this.update "asset_tag")}} />
```

## Section Order

Sections render in list order. A few patterns:

```
// Your section first, before the order type
sections: [section('loan/form/customer'), 'details', 'route', 'notes'],

// Your section between two native ones
sections: ['details', 'route', section('rental/form/handover'), 'notes'],

// Several of your own
sections: ['details', section('rental/form/equipment'), section('rental/form/period'), 'route', 'documents'],
```

## Related

* [Form Fields](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields)
  : change fields inside the
  `details`
  and
  `route`
  sections.
* [Drafts and Validation](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation)
  : prepare drafts, and require your fields.

[Getting Started

Build a first order presentation profile step by step — an order config that names it, a profile that keeps the standard layout, then hidden fields, your own form and details sections, and hidden actions.](https://fleetbase.io/docs/extension-development/order-presentation/getting-started)
[Form Fields

Change the fields inside the order form's native details and route sections — add your own fields with form.detailFields, hide fields with hidden.fields, rename the route section, and hide multi-drop routing.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields)
