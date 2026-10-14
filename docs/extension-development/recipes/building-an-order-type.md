---
title: "Building an Order Type"
url: https://fleetbase.io/docs/extension-development/recipes/building-an-order-type
module: extension-development
---

# Building an Order Type

A complete example — an equipment rental order type for Fleet-Ops with its own lifecycle, its own form and details sections, hidden dispatch actions and validation, built from an order config, a configured lifecycle and an order presentation profile.

# Recipe: Building an Order Type

This recipe builds an
**Acme Rental**
extension. It adds an
**Equipment rental**
order type to Fleet-Ops. A rental is still a Fleet-Ops order, with a tracking number, activity history, comments, documents and a place on the map and the board, but it works like a rental rather than a delivery:

* It starts at
  **Requested**
  , not Created, and moves through Reserved, With customer, Extended, Returned and Completed, or is Cancelled. It can only move along that flow.
* It is never dispatched and has no driver.
* Its form asks for the equipment and the rental period, and hides the driver, vehicle and dispatch fields.
* Its details view leads with a rental summary and a one-click next step.
* The dispatch and driver actions are gone from its menus.

It uses three Fleet-Ops features together:

| Feature | Does |
| --- | --- |
| An **order config** | Defines the order type, and links the other two |
| A **[configured lifecycle](https://fleetbase.io/docs/extension-development/order-lifecycles)** | The rental's activities and rules, enforced by the API |
| An **[order presentation profile](https://fleetbase.io/docs/extension-development/order-presentation)** | The rental's form, details view and actions in the console |

It assumes an extension scaffolded with
`flb scaffold`
(see
[Quickstart](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
), with the console engine
`@acme/rental-engine`
and the PHP namespace
`Acme\Rental`
, and Fleet-Ops 0.6.71 or later.

## 1. The Flow and Lifecycle

The flow lists the rental's activities and which can follow which. The lifecycle names the special ones and turns on the rules.

```
<?php
// server/src/Support/RentalFlow.php

namespace Acme\Rental\Support;

use Illuminate\Support\Str;

class RentalFlow
{
    public const PROFILE = 'acme-rental';

    public static function lifecycle(): array
    {
        return [
            'initial'            => 'requested',
            'completed'          => 'completed',
            'canceled'           => 'cancelled',
            'terminal'           => ['completed', 'cancelled'],
            'dispatch'           => false,
            'strict_transitions' => true,
        ];
    }

    public static function definition(): array
    {
        // [code, status, details, color, next activities, completes the order]
        $activities = [
            ['requested', 'Requested', 'Rental requested', '#6B7280', ['reserved', 'cancelled'], false],
            ['reserved', 'Reserved', 'Equipment reserved', '#2563EB', ['out', 'cancelled'], false],
            ['out', 'With customer', 'Equipment handed over', '#7C3AED', ['extended', 'returned'], false],
            ['extended', 'Extended', 'Rental period extended', '#D97706', ['out'], false],
            ['returned', 'Returned', 'Equipment returned and inspected', '#0891B2', ['completed'], false],
            ['completed', 'Completed', 'Rental closed', '#16A34A', [], true],
            ['cancelled', 'Cancelled', 'Rental cancelled', '#DC2626', [], false],
        ];

        $flow = [];
        foreach ($activities as $sequence => [$code, $status, $details, $color, $next, $complete]) {
            $flow[$code] = [
                'key'         => $code,
                'code'        => $code,
                'status'      => $status,
                'details'     => $details,
                'color'       => $color,
                'sequence'    => $sequence,
                'activities'  => $next,
                'logic'       => [],
                'events'      => [],
                'actions'     => [],
                'entities'    => [],
                'options'     => [],
                'complete'    => $complete,
                'require_pod' => false,
                'pod_method'  => null,
                'internalId'  => (string) Str::uuid(),
            ];
        }

        return $flow;
    }
}
```

## 2. Install the Order Config

Each organization needs its own order config. Install it the first time the console asks for it, and return its uuid, which the console uses to recognise rentals.

```
<?php
// server/src/Http/Controllers/SetupController.php

namespace Acme\Rental\Http\Controllers;

use Acme\Rental\Support\RentalFlow;
use Fleetbase\FleetOps\Models\OrderConfig;
use Fleetbase\Http\Controllers\Controller;

class SetupController extends Controller
{
    public function show()
    {
        $config = OrderConfig::firstOrCreate(
            ['company_uuid' => session('company'), 'namespace' => 'acme:order-config:rental'],
            [
                'name'        => 'Equipment rental',
                'key'         => 'acme-rental',
                'description' => 'Equipment rented to a customer and collected afterwards.',
                'status'      => 'active',
                'version'     => '1.0.0',
                'flow'        => RentalFlow::definition(),
                'meta'        => [
                    'presentation_profile' => RentalFlow::PROFILE,
                    'lifecycle'            => RentalFlow::lifecycle(),
                ],
            ]
        );

        return response()->json(['order_config' => $config->uuid]);
    }
}
```

```
// server/src/routes.php
use Illuminate\Support\Facades\Route;

Route::prefix(config('rental.api.routing.prefix', 'acme-rental'))
    ->namespace('Acme\Rental\Http\Controllers')
    ->group(function ($router) {
        $router->group(['prefix' => 'int/v1', 'middleware' => ['fleetbase.protected']], function ($router) {
            $router->get('setup', 'SetupController@show');
        });
    });
```

`firstOrCreate`
leaves an existing config alone, so an organization's edits to the flow survive. When you ship a new version of the flow, migrate existing configs deliberately, and keep
`meta.presentation_profile`
and
`meta.lifecycle`
when you do.

## 3. Load the Config in the Console

The profile's
`isEnabled`
needs to know which config is the rental one. Load it once, when Fleet-Ops loads, and keep it in a small module the profile can read:

```
// addon/utils/rental-state.js
const rentalState = {
    orderConfigUuid: null,

    isRental(orderConfig) {
        return Boolean(orderConfig?.id) && orderConfig.id === this.orderConfigUuid;
    },
};

export default rentalState;
```

## 4. Register the Profile

```
// addon/extension.js
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';
import rentalState from './utils/rental-state';

const ENGINE = '@acme/rental-engine';
const section = (path) => new ExtensionComponent(ENGINE, path);

export default {
    setupExtension(app, universe) {
        const registryService = universe.getService('registry');

        registryService.register('fleet-ops:order-presentation', 'profiles', 'acme-rental', {
            id: 'acme-rental',

            // Only the config this extension installed for the current organization.
            isEnabled: (orderConfig) => rentalState.isRental(orderConfig),

            form: {
                detailFields: section('rental/form/detail-fields'),
                titles: { route: 'Delivery & collection' },
                sections: ['details', section('rental/form/equipment'), 'route', 'notes', 'documents'],
            },

            details: {
                sections: [section('rental/details/summary'), 'activity', 'route', 'notes', 'documents', 'comments'],
            },

            hidden: {
                fields: ['internal-id', 'facilitator', 'service-type', 'driver', 'vehicle', 'pod', 'adhoc', 'dispatch', 'multiple-waypoints'],
                actions: ['dispatch', 'assign-driver', 'unassign-driver', 'view-label'],
            },

            // A draft switched to Equipment rental: nothing dispatch-related, and a default period.
            prepare(order) {
                order.set('dispatched', false);
                order.set('adhoc', false);
                order.set('driver_assigned', null);
                order.set('vehicle_assigned', null);
                order.set('pod_required', false);
                order.set('meta', { ...(order.meta ?? {}), rental: order.meta?.rental ?? { days: 1 } });
            },

            // A draft switched away: drop the rental details.
            release(order) {
                const { rental, ...meta } = order.meta ?? {};
                order.set('meta', meta);
            },
        });

        universe.whenEngineLoaded('@fleetbase/fleetops-engine', async (engine) => {
            const fetch = app.lookup('service:fetch');
            const orderCreation = engine.lookup('service:order-creation');
            const orderPresentation = engine.lookup('service:order-presentation');

            // Learn which config is the rental one for this organization.
            try {
                const { order_config } = await fetch.get('setup', {}, { namespace: 'acme-rental/int/v1' });
                rentalState.orderConfigUuid = order_config;
            } catch {
                rentalState.orderConfigUuid = null;
            }

            // New rentals need equipment and a period before they can be saved.
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

What each part of the profile does:

* **`detailFields`**
  adds a rental reference and depot to the top of the form, next to the order type.
* **`sections`**
  puts an Equipment panel after the details, keeps the route (renamed "Delivery & collection", with multi-drop hidden), notes and documents, and leaves out payload, service rate, orchestrator constraints and metadata.
* **`details.sections`**
  leads with the rental summary, then the native activity, route, notes, documents and comments.
* **`hidden.fields`**
  removes everything dispatch-related from the form.
* **`hidden.actions`**
  removes dispatch, driver assignment and the shipping label from the table and details menus. Cancel and delete stay: the lifecycle names
  `cancelled`
  as the cancel activity.

## 5. The Form Sections

### Detail Fields

Rendered inside the native details grid, so it renders bare inputs:

```
// addon/components/rental/form/detail-fields.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RentalFormDetailFieldsComponent extends Component {
    @action selectDepot(place) {
        // The depot is where the equipment leaves from, so it is the order's pickup.
        this.args.order.payload.set('pickup', place);
    }
}
```

```
{{! addon/components/rental/form/detail-fields.hbs }}
<InputGroup @name="Rental reference" @value={{@order.internal_id}} @helpText="Your own reference for this rental." />
<InputGroup @name="Depot" @helpText="Where the equipment is collected from.">
    <ModelSelect @modelName="place" @selectedModel={{@order.payload.pickup}} @onChange={{this.selectDepot}} @placeholder="Select depot" as |place|>
        {{place.name}}
    </ModelSelect>
</InputGroup>
```

The profile hides the built-in internal id, so it appears here as "Rental reference" instead.

### Equipment

```
// addon/components/rental/form/equipment.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RentalFormEquipmentComponent extends Component {
    get rental() {
        return this.args.order.meta?.rental ?? {};
    }

    get returnDate() {
        const start = this.args.order.scheduled_at;
        const days = Number(this.rental.days);
        if (!start || !days) {
            return null;
        }

        const date = new Date(start);
        date.setDate(date.getDate() + days);
        return date;
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
        <InputGroup @name="Asset tag" @required={{true}} @value={{this.rental.asset_tag}} {{on "input" (fn this.update "asset_tag")}} />
        <InputGroup @name="Description" @value={{this.rental.description}} {{on "input" (fn this.update "description")}} />
        <InputGroup @name="Rental days" @type="number" @required={{true}} @value={{this.rental.days}} {{on "input" (fn this.update "days")}} />
        <InputGroup @name="Deposit" @type="number" @value={{this.rental.deposit}} {{on "input" (fn this.update "deposit")}} />
    </div>
    {{#if this.returnDate}}
        <p class="mt-2 text-sm text-gray-500">Due back {{format-date-fns this.returnDate "dd MMM yyyy"}}.</p>
    {{/if}}
</ContentPanel>
```

The rental details go in the order's
`meta.rental`
, so they are saved with the order and need no table of their own. The form keeps the native
`details`
section for the order type, customer and schedule; the schedule is the rental start.

## 6. The Details Section

The summary shows the rental and offers the next step as a button. It asks Fleet-Ops for the order's next activities, so it always follows the flow, including any steps an organization added to it.

```
// addon/components/rental/details/summary.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class RentalDetailsSummaryComponent extends Component {
    @service fetch;
    @service notifications;
    @tracked nextActivities = [];

    constructor() {
        super(...arguments);
        this.loadNextActivities.perform();
    }

    get rental() {
        return this.args.resource.meta?.rental ?? {};
    }

    @task *loadNextActivities() {
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
            this.notifications.success(`Rental moved to ${activity.status}.`);
            yield this.loadNextActivities.perform();
        } catch (error) {
            this.notifications.serverError(error);
        }
    }
}
```

```
{{! addon/components/rental/details/summary.hbs }}
<ContentPanel @title="Rental" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-2 gap-2 text-sm">
        <div class="text-gray-500">Asset tag</div>
        <div>{{or this.rental.asset_tag "—"}}</div>
        <div class="text-gray-500">Description</div>
        <div>{{or this.rental.description "—"}}</div>
        <div class="text-gray-500">Rental days</div>
        <div>{{or this.rental.days "—"}}</div>
        <div class="text-gray-500">Status</div>
        <div><Badge @status={{@resource.status}} /></div>
    </div>

    {{#if this.nextActivities.length}}
        <div class="flex flex-wrap gap-2 mt-4">
            {{#each this.nextActivities as |activity|}}
                <Button
                    @text={{activity.status}}
                    @type={{if (eq activity.code "cancelled") "danger" "primary"}}
                    @isLoading={{this.advance.isRunning}}
                    @onClick={{perform this.advance activity}}
                />
            {{/each}}
        </div>
    {{/if}}
</ContentPanel>
```

Because the lifecycle sets
`strict_transitions`
, the API checks every move. A button can only offer what
`next-activity`
returned, and anything else would be rejected anyway.

## 7. Try It

1. Open
   **Fleet-Ops → Operations → Orders → New**
   , and choose
   **Equipment rental**
   as the order type. The form changes to the rental layout, and the driver, vehicle and dispatch fields disappear.
2. Fill in the asset tag and rental days, a depot, and a dropoff. Until the asset tag and days are set, the order can't be saved.
3. Save. The order starts at
   **Requested**
   : its first tracking status is "Requested", with the details "Rental requested".
4. Open it. The Rental panel offers
   **Reserved**
   and
   **Cancelled**
   .
   **Dispatch**
   and
   **Assign driver**
   are not in the "…" menu or the table row menu.
5. Filter the board to
   **Equipment rental**
   : its columns are the rental's activities.
6. Choose another order type on a new order: the standard form comes back, and the rental details are removed from the draft.

## Going Further

* **Other order types keep working unchanged.**
  The profile and lifecycle only apply to orders using the rental config.
* **Add your own actions to rentals**
  with the order views' resource view registries, giving each a
  `visibleWhen`
  that checks
  `order.order_config?.meta?.presentation_profile === 'acme-rental'`
  . See
  [Actions](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions#your-own-actions)
  .
* **Keep rental data in your own tables**
  when it outgrows
  `meta`
  : save it from an observer on Fleet-Ops'
  `Order`
  model, and load it in your sections from your API. See
  [Expansions & Observers](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers)
  .
* **Rentals are console-managed.**
  They have no driver, so they never reach the Navigator app, and they are created and moved along from the console or your extension rather than the public order API. The orders list's Active filter, the live map and metrics still assume the dispatch lifecycle's codes; see
  [Limitations](https://fleetbase.io/docs/extension-development/order-lifecycles/server-reference#limitations)
  .

[Extending a Resource View

A complete example — add a filterable column with its own cell, a row action, a bulk action, a details button and a details menu item to the Fleet-Ops drivers views from a separate extension.](https://fleetbase.io/docs/extension-development/recipes/extending-a-resource-view)
[Publishing to the Marketplace

Authenticate with the Fleetbase registry and publish your extension using the CLI.](https://fleetbase.io/docs/extension-development/publishing/overview)
