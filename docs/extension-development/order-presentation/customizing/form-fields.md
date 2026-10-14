---
title: "Form Fields"
url: https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields
module: extension-development
---

Order Presentation

Customizing

# Form Fields

Change the fields inside the order form's native details and route sections — add your own fields with form.detailFields, hide fields with hidden.fields, rename the route section, and hide multi-drop routing.

# Form Fields

The native
`details`
and
`route`
sections can be adjusted without replacing them:

| You want to | Use |
| --- | --- |
| Add a few fields next to the built-in ones | [`form.detailFields`](#adding-fields) |
| Hide built-in fields | [`hidden.fields`](#hiding-fields) |
| Rename the route section | [`form.titles.route`](#the-route-section) |
| Allow only a pickup and a dropoff | [`hidden.fields: ['multiple-waypoints']`](#the-route-section) |

## Adding Fields

`form.detailFields`
is a component from your engine, rendered
**inside the
`details`
section's grid**
, directly after the order type. Use it for a few fields that belong next to the built-in ones, rather than a section of their own.

```
form: {
    detailFields: new ExtensionComponent('@acme/rental-engine', 'rental/form/detail-fields'),
    sections: ['details', 'route', 'notes'],
},
```

The fields that follow it in the grid move along, so the order type, your fields and the remaining built-in fields read as one form.

The component receives
`@order`
,
`@resource`
(the same order) and
`@profile`
. It renders
**inside**
a grid, so render bare
`InputGroup`
s, not a
`ContentPanel`
:

```
// addon/components/rental/form/detail-fields.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RentalFormDetailFieldsComponent extends Component {
    @action selectDepot(place) {
        // The depot is where the equipment leaves from: the order's pickup.
        this.args.order.payload.set('pickup', place);
    }
}
```

```
{{! addon/components/rental/form/detail-fields.hbs }}
<InputGroup @name="Rental reference" @value={{@order.internal_id}} @helpText="Your own reference for this rental." />
<InputGroup @name="Depot">
    <ModelSelect @modelName="place" @selectedModel={{@order.payload.pickup}} @onChange={{this.selectDepot}} @placeholder="Select depot" as |place|>
        {{place.name}}
    </ModelSelect>
</InputGroup>
```

This example shows the built-in internal id under its own label. Hide the built-in
`internal-id`
field so it isn't shown twice.

## Hiding Fields

`hidden.fields`
hides fields in the native
`details`
and
`route`
sections:

| Key | Hides | Section |
| --- | --- | --- |
| `internal-id` | Internal ID | `details` |
| `schedule` | Schedule | `details` |
| `customer` | Customer | `details` |
| `facilitator` | Facilitator | `details` |
| `service-type` | An integrated vendor's service type | `details` |
| `driver` | Assign Driver | `details` |
| `vehicle` | Assign Vehicle | `details` |
| `pod` | The proof-of-delivery toggle and method | `details` |
| `adhoc` | The ad-hoc toggle and ping distance | `details` |
| `dispatch` | The dispatch toggle | `details` |
| `multiple-waypoints` | The multi-drop toggle | `route` |

```
hidden: {
    fields: ['internal-id', 'facilitator', 'service-type', 'driver', 'vehicle', 'pod', 'adhoc', 'dispatch'],
},
```

The order type selector and the order config's custom fields can't be hidden.

**Hiding a field doesn't clear its value.**
If a user picked a driver before switching the order to your type, the driver is still on the order. Clear values that don't apply in
[`prepare`](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation#preparing-drafts)
.

## The Route Section

### Renaming It

```
form: {
    titles: { route: 'Delivery & collection' },
    sections: ['details', 'route'],
},
```

`titles.route`
is the only section title a profile can change.

### Pickup and Dropoff Only

Hide
`multiple-waypoints`
to remove the multi-drop toggle, so the route is always a pickup and a dropoff:

```
hidden: {
    fields: ['multiple-waypoints'],
},
```

## Your Own Sections Can Read hidden.fields

Your form sections receive the profile's hidden fields as
`@hiddenFields`
, so one component can serve several profiles that hide different things:

```
{{#unless (includes "deposit" @hiddenFields)}}
    <InputGroup @name="Deposit" @type="number" @value={{this.rental.deposit}} {{on "input" (fn this.update "deposit")}} />
{{/unless}}
```

Use your own key names for your own fields; Fleet-Ops ignores keys it doesn't know.

[The Order Form

Compose the order form for your order type with form.sections — Fleet-Ops' native sections by name and your own as ExtensionComponents — with the arguments your sections receive and patterns for reading and writing the order.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form)
[The Details View

Compose the order details view for your order type with details.sections — Fleet-Ops' native sections by name and your own — with the arguments your sections receive, refreshing after changes, and a summary with next-step buttons.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view)
