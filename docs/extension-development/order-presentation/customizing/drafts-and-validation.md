---
title: "Drafts and Validation"
url: https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation
module: extension-development
---

Order Presentation

Customizing

# Drafts and Validation

Prepare a new order when a user switches it to your order type and clean up when they switch away, with prepare and release, and require your own fields before an order is saved, with order-creation validation rules.

# Drafts and Validation

## Preparing Drafts

On the new order form, users choose the order type in the
`details`
section, and can change it after filling the form in. When a draft switches
**to**
your order type, Fleet-Ops calls your profile's
`prepare(order)`
. When it switches
**away**
from it, Fleet-Ops calls
`release(order)`
.

```
prepare(order) {
    // A rental is never dispatched, and has no driver or proof of delivery.
    order.set('dispatched', false);
    order.set('adhoc', false);
    order.set('driver_assigned', null);
    order.set('vehicle_assigned', null);
    order.set('pod_required', false);

    // Start the rental details with defaults.
    order.set('meta', { ...(order.meta ?? {}), rental: order.meta?.rental ?? { days: 1 } });
},

release(order) {
    // Leave nothing rental-specific on an order that is no longer a rental.
    const { rental, ...meta } = order.meta ?? {};
    order.set('meta', meta);
},
```

| Hook | Called when | Use it to |
| --- | --- | --- |
| `prepare(order)` | A draft switches to your order type | Clear values your form hides; set defaults |
| `release(order)` | A draft switches from your order type to another | Remove what your sections added |

Both are optional, and both are only for
**drafts**
. They aren't called when an existing order is opened or edited.

### Preparing a Draft Yourself

If your extension creates draft orders in code, for example from a "New rental" button of its own, prepare them the same way through the service:

```
universe.whenEngineLoaded('@fleetbase/fleetops-engine', (engine) => {
    const orderPresentation = engine.lookup('service:order-presentation');
    orderPresentation.prepare(order); // calls the applying profile's prepare(), and returns the profile
});
```

## The Order Type Is Locked Once Saved

Once an order with a profile is saved, its order type can't be changed: the type selector in the
`details`
section is disabled. Moving an order from one presentation to another isn't supported.

## Validating Your Fields

A profile changes what the form shows, not what it requires. Fleet-Ops' own validation still requires an order type, and a pickup and dropoff (or at least two waypoints).

To require your own fields, add a rule to Fleet-Ops'
`order-creation`
service. A rule receives the order and returns
`false`
to block saving. Rules run for
**every**
order, so return
`true`
for orders that aren't yours:

```
// addon/extension.js
export default {
    setupExtension(app, universe) {
        universe.whenEngineLoaded('@fleetbase/fleetops-engine', (engine) => {
            const orderCreation = engine.lookup('service:order-creation');
            const orderPresentation = engine.lookup('service:order-presentation');

            orderCreation.setOrderValidationRule('acme-rental', (order) => {
                if (orderPresentation.profileFor(order)?.id !== 'acme-rental' || !order.isNew) {
                    return true;
                }

                const rental = order.meta?.rental ?? {};
                return Boolean(rental.asset_tag) && Number(rental.days) > 0;
            });
        });
    },
};
```

While a rule returns
`false`
, the order can't be created. Show users why from your section, next to the field:

```
<InputGroup @name="Asset tag" @required={{true}} @value={{this.rental.asset_tag}} {{on "input" (fn this.update "asset_tag")}} />
{{#unless this.rental.asset_tag}}
    <p class="text-xs text-red-500">An asset tag is required for a rental.</p>
{{/unless}}
```

| Method | Does |
| --- | --- |
| `orderCreation.setOrderValidationRule(key, fn)` | Adds or replaces the rule named `key` . `fn(order)` returns `false` to block saving |
| `orderCreation.clearOrderValidationRule(key)` | Removes it |

Validation rules check the console form. Validate on the server too, for orders created through the API.

[Actions

Hide Fleet-Ops' built-in order actions — dispatch, driver assignment, cancel, delete and more — from the orders table and the order details menu for your order type, with hidden.actions.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions)
[Profile Object

Every key an order presentation profile can have — id, isEnabled, form, details, hidden, prepare and release — with types, defaults, and a complete annotated example.](https://fleetbase.io/docs/extension-development/order-presentation/reference/profile)
