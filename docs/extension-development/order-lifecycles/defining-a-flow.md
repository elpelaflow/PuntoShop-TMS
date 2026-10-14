---
title: "Defining a Flow"
url: https://fleetbase.io/docs/extension-development/order-lifecycles/defining-a-flow
module: extension-development
---

Order Lifecycles

# Defining a Flow

Define an order type's flow and lifecycle in PHP, install the order config for each organization, and update it safely in later versions of your extension.

# Defining a Flow

Most extensions define their flow and lifecycle in code, and install the order config from their API. That way every organization gets the same order type, and your extension knows the config's id.

## The Flow and Lifecycle

This rental flow has seven activities. Cancellation is possible until the equipment leaves; an extension returns to "With customer".

![The rental flow](https://fleetbase.io/_next/static/media/rental-flow.2576e38c.svg)

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
            ['requested', 'Requested', 'Rental requested by {customer.name}', '#6B7280', ['reserved', 'cancelled'], false],
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

## Installing the Order Config

Each organization needs its own config. Create it the first time it's needed, for example from a setup endpoint your console engine calls when Fleet-Ops loads:

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

* **Identify the config by
  `namespace`**
  , which is yours, rather than by name, which users can change.
* **`firstOrCreate`
  leaves an existing config alone**
  , so changes an organization makes to the flow survive.
* **Return the uuid**
  , so your console engine can recognise the config, for example in a presentation profile's
  `isEnabled`
  .

## Updating It Later

When a new version of your extension changes the flow or lifecycle, update existing configs deliberately, for example in a migration:

```
OrderConfig::where('namespace', 'acme:order-config:rental')->each(function (OrderConfig $config) {
    $meta = $config->meta ?? [];
    $meta['lifecycle'] = RentalFlow::lifecycle();

    $config->update(['meta' => $meta, 'version' => '1.1.0']);
});
```

Merge into
`meta`
, rather than replacing it, so keys other parts of Fleet-Ops use survive.

**Changing a live flow affects orders already in it.**
An order whose status is no longer an activity in the flow can't move on with
`strict_transitions`
. When you rename or remove an activity, move existing orders first, or keep the old activity with an arrow to its replacement.
