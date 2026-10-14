---
title: "Getting Started"
url: https://fleetbase.io/docs/extension-development/order-presentation/getting-started
module: extension-development
---

Order Presentation

# Getting Started

Build a first order presentation profile step by step — an order config that names it, a profile that keeps the standard layout, then hidden fields, your own form and details sections, and hidden actions.

# Getting Started

This walkthrough gives a
**Vehicle loan**
order type its own presentation. It starts from a profile that changes nothing, then changes one thing at a time, so you can see the effect of each.

It assumes an extension scaffolded with
`flb scaffold`
(see
[Quickstart](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
), with the console engine
`@acme/loans-engine`
and the PHP namespace
`Acme\Loans`
.

### Create the order config

A profile applies to orders of one
**order config**
. Create a config for loans, and name the profile in its
`meta.presentation_profile`
:

```
<?php
// server/src/Support/LoanOrderConfig.php

namespace Acme\Loans\Support;

use Fleetbase\FleetOps\Models\OrderConfig;

class LoanOrderConfig
{
    public static function installFor(string $companyUuid): OrderConfig
    {
        // Start from the organization's Transport flow: created, dispatched, started, completed.
        $transport = OrderConfig::where('company_uuid', $companyUuid)->where('namespace', 'system:order-config:transport')->first();

        return OrderConfig::firstOrCreate(
            ['company_uuid' => $companyUuid, 'namespace' => 'acme:order-config:loan'],
            [
                'name'    => 'Vehicle loan',
                'key'     => 'acme-loan',
                'status'  => 'active',
                'version' => '1.0.0',
                'flow'    => $transport?->flow ?? [],
                'meta'    => ['presentation_profile' => 'acme-loan'],
            ]
        );
    }
}
```

The config reuses the Transport activities for now;
[Order Lifecycles](https://fleetbase.io/docs/extension-development/order-lifecycles)
shows how to give it its own. Call
`installFor()`
for the current organization, for example from a setup endpoint your console engine calls once. The
[recipe](https://fleetbase.io/docs/extension-development/recipes/building-an-order-type#2-install-the-order-config)
shows one way.

### Register a profile that keeps the standard layout

In your engine's
`extension.js`
, register a profile with the same
`id`
. To begin, list the standard sections, so nothing changes yet:

```
// addon/extension.js
export default {
    setupExtension(app, universe) {
        universe.getService('registry').register('fleet-ops:order-presentation', 'profiles', 'acme-loan', {
            id: 'acme-loan',

            form: {
                sections: ['details', 'route', 'payload', 'service-rate', 'notes', 'documents', 'orchestrator-constraints', 'metadata'],
            },

            details: {
                sections: ['activity', 'detail', 'custom-fields', 'purchase-rate', 'tracking', 'proof', 'notes', 'integrated-vendor-details', 'route', 'payload', 'documents', 'comments', 'metadata'],
            },
        });
    },
};
```

The arguments are the registry (
`fleet-ops:order-presentation`
), the list (
`profiles`
), a key (use the profile's
`id`
), and the profile.

Open
**Fleet-Ops → Operations → Orders → New**
and choose
**Vehicle loan**
as the order type. The form looks the same as for any other type: the profile applies, and lists the standard sections.

**Both section lists are required.**
When a profile applies, its sections are the whole layout. Leave
`form.sections`
out and the form is empty.

### Remove what a loan doesn't use

A loan isn't dispatched and has no driver, payload or service rate. Remove those sections, and hide the dispatch fields:

```
form: {
    sections: ['details', 'route', 'notes', 'documents'],
},

hidden: {
    fields: ['driver', 'vehicle', 'facilitator', 'service-type', 'dispatch', 'adhoc', 'pod'],
},
```

Choose
**Vehicle loan**
again: the form now has four sections, and the details section no longer asks for a driver or offers dispatch. See
[Form Fields](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields#hiding-fields)
for every field you can hide.

### Add a section of your own

Add a
**Loan period**
section from your own engine. Section entries can be a native name, or an
`ExtensionComponent`
:

```
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

const section = (path) => new ExtensionComponent('@acme/loans-engine', path);

form: {
    sections: ['details', section('loan/form/period'), 'route', 'notes', 'documents'],
},
```

```
// addon/components/loan/form/period.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LoanFormPeriodComponent extends Component {
    get loan() {
        return this.args.order.meta?.loan ?? {};
    }

    @action update(key, event) {
        const order = this.args.order;
        order.set('meta', { ...(order.meta ?? {}), loan: { ...this.loan, [key]: event.target.value } });
    }
}
```

```
{{! addon/components/loan/form/period.hbs }}
<ContentPanel @title="Loan period" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <InputGroup @name="Starts" @type="date" @value={{this.loan.starts_on}} {{on "input" (fn this.update "starts_on")}} />
        <InputGroup @name="Days" @type="number" @value={{this.loan.days}} {{on "input" (fn this.update "days")}} />
    </div>
</ContentPanel>
```

Your section receives the order as
`@order`
(and
`@resource`
). What it sets on the order is saved with it. See
[The Order Form](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form)
.

### Lead the details view with a summary

Do the same for the details view: a summary of your own first, then the native sections a loan uses:

```
details: {
    sections: [section('loan/details/summary'), 'activity', 'route', 'notes', 'documents', 'comments'],
},
```

```
{{! addon/components/loan/details/summary.hbs }}
<ContentPanel @title="Loan" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-2 gap-2 text-sm">
        <div class="text-gray-500">Starts</div><div>{{or @resource.meta.loan.starts_on "—"}}</div>
        <div class="text-gray-500">Days</div><div>{{or @resource.meta.loan.days "—"}}</div>
    </div>
</ContentPanel>
```

See
[The Details View](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view)
.

### Hide the actions a loan doesn't have

Remove dispatch and driver actions from the orders table and the details "…" menu:

```
hidden: {
    fields: ['driver', 'vehicle', 'facilitator', 'service-type', 'dispatch', 'adhoc', 'pod'],
    actions: ['dispatch', 'assign-driver', 'unassign-driver'],
},
```

See
[Actions](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions)
for every action id.

### Clean up drafts

A user can start a new order as a Transport, set a driver, then switch it to Vehicle loan. The driver field is now hidden, but the value is still on the order. Clear it in
`prepare`
, which runs when a draft switches to your order type:

```
prepare(order) {
    order.set('dispatched', false);
    order.set('adhoc', false);
    order.set('driver_assigned', null);
    order.set('vehicle_assigned', null);
},
```

See
[Drafts and Validation](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation)
.

## The Finished Profile

```
// addon/extension.js
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

const section = (path) => new ExtensionComponent('@acme/loans-engine', path);

export default {
    setupExtension(app, universe) {
        universe.getService('registry').register('fleet-ops:order-presentation', 'profiles', 'acme-loan', {
            id: 'acme-loan',

            form: {
                sections: ['details', section('loan/form/period'), 'route', 'notes', 'documents'],
            },

            details: {
                sections: [section('loan/details/summary'), 'activity', 'route', 'notes', 'documents', 'comments'],
            },

            hidden: {
                fields: ['driver', 'vehicle', 'facilitator', 'service-type', 'dispatch', 'adhoc', 'pod'],
                actions: ['dispatch', 'assign-driver', 'unassign-driver'],
            },

            prepare(order) {
                order.set('dispatched', false);
                order.set('adhoc', false);
                order.set('driver_assigned', null);
                order.set('vehicle_assigned', null);
            },
        });
    },
};
```

## Next Steps

* **Stop loans from being dispatched at all**
  , and give them their own statuses:
  [Order Lifecycles](https://fleetbase.io/docs/extension-development/order-lifecycles)
  .
* **Require your own fields**
  before an order can be saved:
  [Drafts and Validation](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation#validating-your-fields)
  .
* **Apply the profile only to your organization's config**
  , by uuid:
  [Profile Object](https://fleetbase.io/docs/extension-development/order-presentation/reference/profile#isenabled)
  .
* **See a complete extension**
  :
  [Recipe: Building an Order Type](https://fleetbase.io/docs/extension-development/recipes/building-an-order-type)
  .
