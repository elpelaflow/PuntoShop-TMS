---
Título: Definir un flujo
URL: https://fleetbase.io/docs/extension-development/order-lifecycles/defining-a-flow
Módulo: extension-development
---

Ciclos de vida de los pedidos

# Definir un flujo

Defina el flujo y el ciclo de vida de un tipo de pedido en PHP, instale la configuración del pedido para cada organización y actualícela de forma segura en las versiones posteriores de su extensión.

# Definir un flujo

La mayoría de las extensiones definen su flujo y ciclo de vida en código, e instalan la configuración del pedido a partir de su API. De esta manera, cada organización tiene el mismo tipo de pedido, y su extensión conoce el ID de la configuración.

## El flujo y el ciclo de vida

Este flujo de alquiler tiene siete actividades. La cancelación es posible hasta que el equipo sale; una extensión devuelve a "con el cliente".

![El flujo de alquiler](https://fleetbase.io/_next/static/media/rental-flow.2576e38c.svg)

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
            ['requested', 'Requested', 'Solicitud de alquiler', '#6B7280', ['reserved', 'cancelled'], false],
            ['reserved', 'Reserved', 'Equipo reservado', '#2563EB', ['out', 'cancelled'], false],
            ['out', 'With customer', 'Entrega del equipo al cliente', '#7C3AED', ['extended', 'returned'], false],
            ['extended', 'Extended', 'Extensión del período de alquiler', '#D97706', ['out'], false],
            ['returned', 'Returned', 'Devolución del equipo e inspección', '#0891B2', ['completed'], false],
            ['completed', 'Completed', 'Pedido finalizado', '#16A34A', [], true],
            ['cancelled', 'Cancelled', 'Pedido cancelado', '#DC2626', [], false],
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

## Instalar la configuración del pedido

Cada organización necesita su propia configuración. Créela la primera vez que sea necesario, por ejemplo, a partir de un punto final de configuración que el motor de consola llama cuando Fleet-Ops se carga:

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
                'name'        => 'Alquiler de equipos',
                'key'         => 'acme-rental',
                'description' => 'Alquiler de equipos a un cliente y recogida posterior.',
                'status'      => 'activo',
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

* Identifique la configuración por
  `namespace`, que es la suya, en lugar del nombre, que los usuarios pueden cambiar.
* `firstOrCreate`
  deja la configuración existente sin cambios, por lo que los cambios que una organización realiza en el flujo sobreviven.
* Devuelve el UUID, para que su motor de consola pueda reconocer la configuración, por ejemplo, en el ID de un perfil de presentación
  `isEnabled`.

## Actualizarla más tarde

Cuando una nueva versión de su extensión cambia el flujo o el ciclo de vida, actualice las configuraciones existentes deliberadamente, por ejemplo, en una migración:

```
OrderConfig::where('namespace', 'acme:order-config:rental')->each(function (OrderConfig $config) {
    $meta = $config->meta ?? [];
    $meta['lifecycle'] = RentalFlow::lifecycle();

    $config->update(['meta' => $meta, 'version' => '1.1.0']);
});
```

Conserve en
`meta`, en lugar de reemplazarlo, para que los elementos clave que otros componentes de Fleet-Ops utilizan sobrevivan.

**Cambiar un flujo en vivo afecta a los pedidos que ya están en él.**
Un pedido cuyo estado ya no es una actividad en el flujo no puede avanzar con
`strict_transitions`. Cuando se cambia o elimina una actividad, mueva primero los pedidos existentes, o mantenga la actividad antigua con una flecha hacia su reemplazo.