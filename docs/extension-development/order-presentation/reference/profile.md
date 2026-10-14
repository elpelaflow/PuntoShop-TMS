---
title: "Profile Object"
url: https://fleetbase.io/docs/extension-development/order-presentation/reference/profile
module: extension-development
---

Order Presentation

Reference

# Profile Object

Every key an order presentation profile can have — id, isEnabled, form, details, hidden, prepare and release — with types, defaults, and a complete annotated example.

# Profile Object

A profile is a plain object, registered in the
`fleet-ops:order-presentation`
registry under
`profiles`
:

```
universe.getService('registry').register('fleet-ops:order-presentation', 'profiles', profile.id, profile);
```

## Keys

Prop

Type

`id`

string

`isEnabled
?`

(orderConfig) => boolean

`form.sections`

Array<string | ExtensionComponent>

`form.detailFields
?`

ExtensionComponent

`form.titles.route
?`

string

`details.sections`

Array<string | ExtensionComponent>

`hidden.fields
?`

string[]

`hidden.actions
?`

string[]

`prepare
?`

(order) => void

`release
?`

(order) => void

| Key | Reference |
| --- | --- |
| `form.sections` | [The Order Form](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form) |
| `form.detailFields` , `form.titles` , `hidden.fields` | [Form Fields](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields) |
| `details.sections` | [The Details View](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view) |
| `hidden.actions` | [Actions](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions) |
| `prepare` , `release` | [Drafts and Validation](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation) |

Your profile object is passed to your sections as
`@profile`
, so you can keep your own settings on it too, under a key named after your extension.

## isEnabled

Without
`isEnabled`
, a profile applies to every order whose config names it. Add one when the name alone isn't enough.

### Only Your Organization's Config

If your extension installs an order config per organization, apply the profile only to the config it installed, by uuid. A user can rename a config, but not change its uuid:

```
// rentalState.orderConfigUuid is loaded from your API when Fleet-Ops loads
isEnabled: (orderConfig) => Boolean(orderConfig?.id) && orderConfig.id === rentalState.orderConfigUuid,
```

### Only While a Setting Is On

```
isEnabled: (orderConfig) => orderConfig?.meta?.acme_rental?.enabled !== false,
```

### Keep It Fast

`isEnabled`
runs every time a form, details view or action menu renders. Read state your extension already has; don't fetch. Load what it needs once, for example when the Fleet-Ops engine loads:

```
universe.whenEngineLoaded('@fleetbase/fleetops-engine', async () => {
    const { order_config } = await app.lookup('service:fetch').get('setup', {}, { namespace: 'acme-rental/int/v1' });
    rentalState.orderConfigUuid = order_config;
});
```

**Think about what happens when
`isEnabled`
returns
`false`
.**
The order falls back to the standard form and actions, including dispatch and delete, unless a
[configured lifecycle](https://fleetbase.io/docs/extension-development/order-lifecycles)
blocks them on the server. If you want orders read-only while your extension is switched off, keep the profile applying, and disable things inside your own sections instead.

## A Complete Example

```
// addon/extension.js
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';
import rentalState from './utils/rental-state';

const ENGINE = '@acme/rental-engine';
const section = (path) => new ExtensionComponent(ENGINE, path);

export default {
    setupExtension(app, universe) {
        universe.getService('registry').register('fleet-ops:order-presentation', 'profiles', 'acme-rental', {
            id: 'acme-rental',

            // Only the config this extension installed for this organization.
            isEnabled: (orderConfig) => rentalState.isRental(orderConfig),

            form: {
                // Rental reference and depot, next to the order type
                detailFields: section('rental/form/detail-fields'),
                // "Delivery & collection" instead of "Route"
                titles: { route: 'Delivery & collection' },
                // Details, then the equipment, then the route, notes and documents
                sections: ['details', section('rental/form/equipment'), 'route', 'notes', 'documents'],
            },

            details: {
                // The rental summary first, then the native sections a rental uses
                sections: [section('rental/details/summary'), 'activity', 'route', 'notes', 'documents', 'comments'],
            },

            hidden: {
                // Nothing dispatch-related; the reference replaces the internal id
                fields: ['internal-id', 'facilitator', 'service-type', 'driver', 'vehicle', 'pod', 'adhoc', 'dispatch', 'multiple-waypoints'],
                // No dispatch, no drivers, no shipping label
                actions: ['dispatch', 'assign-driver', 'unassign-driver', 'view-label'],
            },

            prepare(order) {
                order.set('dispatched', false);
                order.set('adhoc', false);
                order.set('driver_assigned', null);
                order.set('vehicle_assigned', null);
                order.set('pod_required', false);
                order.set('meta', { ...(order.meta ?? {}), rental: order.meta?.rental ?? { days: 1 } });
            },

            release(order) {
                const { rental, ...meta } = order.meta ?? {};
                order.set('meta', meta);
            },
        });
    },
};
```

[Drafts and Validation

Prepare a new order when a user switches it to your order type and clean up when they switch away, with prepare and release, and require your own fields before an order is saved, with order-creation validation rules.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation)
[Service API

The Fleet-Ops order-presentation service — look up the profile for an order or order config, read its sections and hidden fields and actions, and prepare drafts — with how to reach it from your extension.](https://fleetbase.io/docs/extension-development/order-presentation/reference/service)
