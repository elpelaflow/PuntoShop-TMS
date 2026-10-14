---
title: "Service API"
url: https://fleetbase.io/docs/extension-development/order-presentation/reference/service
module: extension-development
---

Order Presentation

Reference

# Service API

The Fleet-Ops order-presentation service — look up the profile for an order or order config, read its sections and hidden fields and actions, and prepare drafts — with how to reach it from your extension.

# Service API

Fleet-Ops'
`order-presentation`
service resolves profiles. Fleet-Ops' own form, details view and action menus use it; your extension can too, for example to check whether an order is one of yours.

## Reaching the Service

The service belongs to the Fleet-Ops engine.

**From
`extension.js`**
, look it up once Fleet-Ops has loaded:

```
export default {
    setupExtension(app, universe) {
        universe.whenEngineLoaded('@fleetbase/fleetops-engine', (engine) => {
            const orderPresentation = engine.lookup('service:order-presentation');
            // …
        });
    },
};
```

**In a component Fleet-Ops renders**
, such as one of your profile's sections, inject it:

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class RentalFormEquipmentComponent extends Component {
    @service orderPresentation;
}
```

**In a resource view handler**
, which runs in the console's context, read the config instead:
`order.order_config?.meta?.presentation_profile`
.

## Methods

| Member | Returns | Description |
| --- | --- | --- |
| `profiles` | `Array` | Every registered profile |
| `profileFor(orderOrConfig)` | `Object | null` | The profile that applies to an order or an order config, or `null` . Takes an order (and reads its `order_config` ) or an order config |
| `sectionsFor(profile, surface)` | `Array` | The profile's raw `form` or `details` section list; `[]` without one |
| `renderableSectionsFor(profile, surface)` | `Array` | The section list as descriptors: `{ key, native: true, name, componentName }` for a native section, `{ key, native: false, component }` for yours |
| `isHidden(orderOrConfig, group, key)` | `Boolean` | Whether the applying profile hides a field ( `group` `'fields'` ) or an action ( `'actions'` ) |
| `hiddenFieldsFor(orderOrConfig)` | `string[]` | The applying profile's `hidden.fields` ; `[]` without one |
| `prepare(order)` | `Object | null` | Calls the applying profile's `prepare(order)` , and returns the profile |

## Examples

```
// Is this order one of ours?
const isRental = orderPresentation.profileFor(order)?.id === 'acme-rental';

// Before any order exists: does this order type have our profile?
const isRentalType = orderPresentation.profileFor(orderConfig)?.id === 'acme-rental';

// Does the profile hide cancelling?
const canCancel = !orderPresentation.isHidden(order, 'actions', 'cancel');

// Which fields does it hide?
const hidden = orderPresentation.hiddenFieldsFor(order); // ['driver', 'vehicle', …]

// Prepare a draft your extension created in code
orderPresentation.prepare(draftOrder);
```

## The Registry

Profiles are stored in the shared registry, so registering one doesn't need the Fleet-Ops engine to be loaded:

|  |  |
| --- | --- |
| **Section** | `fleet-ops:order-presentation` |
| **List** | `profiles` |
| **Key** | The profile's `id` |

```
const registryService = universe.getService('registry');

registryService.register('fleet-ops:order-presentation', 'profiles', 'acme-rental', profile);
registryService.getRegistry('fleet-ops:order-presentation', 'profiles'); // every profile
```

Registering again with the same key replaces the profile.

## Source

| File |  |
| --- | --- |
| `addon/services/order-presentation.js` | The service |
| `addon/components/order/form.js` | Renders form sections |
| `addon/components/order/form/details.js` | Hidden fields, `detailFields` , `prepare` and `release` |
| `addon/components/order/details.js` | Renders details sections |

[Profile Object

Every key an order presentation profile can have — id, isEnabled, form, details, hidden, prepare and release — with types, defaults, and a complete annotated example.](https://fleetbase.io/docs/extension-development/order-presentation/reference/profile)
[Troubleshooting

Why an order presentation profile doesn't apply, a section is missing or empty, a field or action still shows, or a value survives a type switch — and how to fix each.](https://fleetbase.io/docs/extension-development/order-presentation/reference/troubleshooting)
