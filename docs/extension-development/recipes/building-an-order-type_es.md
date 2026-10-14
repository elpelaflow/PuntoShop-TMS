---
title: "Crear un tipo de pedido"
url: https://fleetbase.io/docs/extension-development/recipes/building-an-order-type
module: extension-development
---

# Crear un tipo de pedido

Un ejemplo completo: un tipo de pedido de alquiler de equipos para Fleet-Ops, con su propio ciclo de vida, su propia sección de formulario y detalles, acciones de envío ocultas y validación, creado a partir de una configuración de pedido, un ciclo de vida configurado y un perfil de presentación de pedidos.

# Receta: Crear un tipo de pedido

Esta receta crea una extensión
**Acme Rental**. Agrega un tipo de pedido de
**Alquiler de equipos**
a Fleet-Ops. Un alquiler sigue siendo un pedido de Fleet-Ops, con un número de seguimiento, historial de actividades, comentarios, documentos y una ubicación en el mapa y en la lista, pero funciona como un alquiler en lugar de una entrega:

* Comienza en
  **Solicitado**
  , no como "Creado", y pasa por "Reservado", "Con el cliente", "Extendido", "Devuelto" y "Completado", o se Cancela. Solo puede seguir ese flujo.
* Nunca se envía y no tiene conductor.
* Su formulario solicita el equipo y el período de alquiler, y oculta los campos del conductor, el vehículo y el envío.
* Su vista de detalles comienza con un resumen del alquiler y un paso siguiente con un solo clic.
* Las acciones de envío y conductor ya no están en sus menús.

Utiliza tres funciones de Fleet-Ops juntas:

| Función | Hace |
|---|---|
| Una **configuración de pedido** | Define el tipo de pedido y vincula las otras dos |
| Un **[ciclo de vida configurado](https://fleetbase.io/docs/extension-development/order-lifecycles)** | Las actividades y reglas del alquiler, que se aplican mediante la API |
| Un **[perfil de presentación de pedidos](https://fleetbase.io/docs/extension-development/order-presentation)** | El formulario, la vista de detalles y las acciones en la consola del alquiler |

Asume una estructura de extensión creada con
`flb scaffold`
(ver
[Guía rápida](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
), con el motor de la consola
`@acme/rental-engine`
y el espacio de nombres de PHP
`Acme\Rental`
, y Fleet-Ops 0.6.71 o posterior.

## 1. El flujo y el ciclo de vida

El flujo enumera las actividades del alquiler y qué puede seguir. El ciclo de vida nombra las especiales y activa las reglas.

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

## 2. Instalar la configuración del pedido

Cada organización necesita su propia configuración de pedido. Instálala la primera vez que el sistema solicita, y devuelve su UUID, que el sistema utiliza para reconocer los alquileres.

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
                'description' => 'Equipo alquilado a un cliente y recogido posteriormente.',
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
deja que una configuración existente permanezca, por lo que las ediciones de una organización en el flujo sobreviven. Cuando envías una nueva versión del flujo, migra las configuraciones existentes deliberadamente, y mantén
`meta.presentation_profile`
y
`meta.lifecycle`
cuando lo hagas.

## 3. Cargar la configuración en el sistema

El perfil necesita saber qué configuración es la del alquiler. Cárgala una vez cuando Fleet-Ops se carga, y guárdala en un pequeño módulo que el sistema puede leer:

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

## 2. Instalar la configuración del pedido

Cada organización necesita su propia configuración de pedido. Instálala la primera vez que el sistema solicita, y devuelve su UUID, que el sistema utiliza para reconocer los alquileres.

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
                'description' => 'Equipo alquilado a un cliente y recogido posteriormente.',
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
deja que una configuración existente permanezca, por lo que las ediciones de una organización en el flujo sobreviven. Cuando envías una nueva versión del flujo, migra las configuraciones existentes deliberadamente, y mantén
`meta.presentation_profile`
y
`meta.lifecycle`
cuando lo hagas.

## 3. Cargar la configuración en el sistema

El perfil necesita saber qué configuración es la del alquiler. Cárgala una vez cuando Fleet-Ops se carga, y guárdala en un pequeño módulo que el sistema puede leer:

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

## 2. Instalar la configuración del pedido

Cada organización necesita su propia configuración de pedido. Instálala la primera vez que el sistema solicita, y devuelve su UUID, que el sistema utiliza para reconocer los alquileres.

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
                'description' => 'Equipo alquilado a un cliente y recogido posteriormente.',
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
deja que una configuración existente permanezca, por lo que las ediciones de una organización en el flujo sobreviven. Cuando envías una nueva versión del flujo, migra las configuraciones existentes deliberadamente, y mantén
`meta.presentation_profile`
y
`meta.lifecycle`
cuando lo hagas.

## 3. Cargar la configuración en el sistema

El perfil necesita saber qué configuración es la del alquiler. Cárgala una vez cuando Fleet-Ops se carga, y guárdala en un pequeño módulo que el sistema puede leer:

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

## 2. Instalar la configuración del pedido

Cada organización necesita su propia configuración de pedido. Instálala la primera vez que el sistema solicita, y devuelve su UUID, que el sistema utiliza para reconocer los alquileres.

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
                'description' => 'Equipo alquilado a un cliente y recogido posteriormente.',
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
deja que una configuración existente permanezca, por lo que las ediciones de una organización en el flujo sobreviven. Cuando envías una nueva versión del flujo, migra las configuraciones existentes deliberadamente, y mantén
`meta.presentation_profile`
y
`meta.lifecycle`
cuando lo hagas.

## 3. Cargar la configuración en el sistema

El perfil necesita saber qué configuración es la del alquiler. Cárgala una vez cuando Fleet-Ops se carga, y guárdala en un pequeño módulo que el sistema puede leer:

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

## 2. Instalar la configuración del pedido

Cada organización necesita su propia configuración de pedido. Instálala la primera vez que el sistema solicita, y devuelve su UUID, que el sistema utiliza para reconocer los alquileres.

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
                'description' => 'Equipo alquilado a un cliente y recogido posteriormente.',
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
deja que una configuración existente permanezca, por lo que las ediciones de una organización en el flujo sobreviven. Cuando envías una nueva versión del flujo, migra las configuraciones existentes deliberadamente, y mantén
`meta.presentation_profile`
y
`meta.lifecycle`
cuando lo hagas.

## 3. Cargar la configuración en el sistema

El perfil necesita saber qué configuración es la del alquiler. Cárgala una vez cuando Fleet-Ops se carga, y guárdala en un pequeño módulo que el sistema puede leer:

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

## 2. Instalar la configuración del pedido

Cada organización necesita su propia configuración de pedido. Instálala la primera vez que el sistema solicita, y devuelve su UUID, que el sistema utiliza para reconocer los alquileres.

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
                'description' => 'Equipo alquilado a un cliente y recogido posteriormente.',
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
deja que una configuración existente permanezca, por lo que las ediciones de una organización en el flujo sobreviven. Cuando envías una nueva versión del flujo, migra las configuraciones existentes deliberadamente, y mantén
`meta.presentation_profile`
y
`meta.lifecycle`
cuando lo hagas.

## 3. Cargar la configuración en el sistema

El perfil necesita saber qué configuración es la del alquiler. Cárgala una vez cuando Fleet-Ops se carga, y guárdala en un pequeño módulo que el sistema puede leer:

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

## 2. Instalar la configuración del pedido

Cada organización necesita su propia configuración de pedido. Instálala la primera vez que el sistema solicita, y devuelve su UUID, que el sistema utiliza para reconocer los alquileres.

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
                'description' => 'Equipo alquilado a un cliente y recogido posteriormente.',
                'status'      => 'active',
                'version'

Cada parte del perfil hace lo siguiente:

*   **`detailFields`**
    añade una referencia de alquiler y un depósito al principio del formulario, junto al tipo de pedido.
*   **`sections`**
    añade un panel de "Equipamiento" después de los detalles, mantiene la ruta (renombrada como "Entrega y recogida", con múltiples destinos ocultos), notas y documentos, y omite la capacidad de carga, la tarifa de servicio, las restricciones del coordinador y los metadatos.
*   **`details.sections`**
    comienza con el resumen del alquiler, luego la actividad nativa, la ruta, las notas, los documentos y los comentarios.
*   **`hidden.fields`**
    elimina todo lo relacionado con el envío del formulario.
*   **`hidden.actions`**
    elimina el envío, la asignación de conductor y la etiqueta de envío de las opciones del menú y de las filas de la tabla. Permanecen las opciones "Cancelar" y "Eliminar": las opciones de ciclo de vida.
    `cancelado`
    como la opción de cancelar.

## 5. Las Secciones del Formulario

### Campos de Detalle

Se renderizan dentro de la cuadrícula interna nativa, por lo que se muestran entradas simples:

```
// addon/components/rental/form/detail-fields.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RentalFormDetailFieldsComponent extends Component {
    @action selectDepot(place) {
        // El depósito es donde sale el equipo, por lo que es la recogida del pedido.
        this.args.order.payload.set('pickup', place);
    }
}
```

```
{{! addon/components/rental/form/detail-fields.hbs }}
<InputGroup @name="Referencia de alquiler" @value={{@order.internal_id}} @helpText="Su propia referencia para este alquiler." />
<InputGroup @name="Depósito" @helpText="Dónde se recoge el equipo.">
    <ModelSelect @modelName="place" @selectedModel={{@order.payload.pickup}} @onChange={{this.selectDepot}} @placeholder="Seleccionar depósito" as |place|>
        {{place.name}}
    </ModelSelect>
</InputGroup>
```

El perfil oculta el identificador interno integrado, por lo que aparece aquí como "Referencia de alquiler" en lugar de eso.

### Equipamiento

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
<ContentPanel @title="Equipamiento" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <InputGroup @name="Etiqueta del activo" @required={{true}} @value={{this.rental.asset_tag}} {{on "input" (fn this.update "asset_tag")}} />
        <InputGroup @name="Descripción" @value={{this.rental.description}} {{on "input" (fn this.update "description")}} />
        <InputGroup @name="Días de alquiler" @type="number" @required={{true}} @value={{this.rental.days}} {{on "input" (fn this.update "days")}} />
        <InputGroup @name="Depósito" @type="number" @value={{this.rental.deposit}} {{on "input" (fn this.update "deposit")}} />
    </div>
    {{#if this.returnDate}}
        <p class="mt-2 text-sm text-gray-500">Devolver el {{format-date-fns this.returnDate "dd MMM yyyy"}}.</p>
    {{/if}}
</ContentPanel>
```

Los detalles del alquiler van en la sección
`meta.rental`
del pedido, por lo que se guardan junto con el pedido y no necesitan una tabla propia. El formulario mantiene la sección nativa
`details`
para el tipo de pedido, el cliente y el horario; el horario es la fecha de inicio del alquiler.

## 6. La Sección de Detalles

El resumen muestra los detalles del alquiler y ofrece el siguiente paso como un botón. Solicita a Fleet-Ops las siguientes actividades del pedido, por lo que siempre sigue el flujo, incluyendo cualquier paso que una organización haya añadido.

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
            this.notifications.success(`El alquiler se ha movido a ${activity.status}.`);
            yield this.loadNextActivities.perform();
        } catch (error) {
            this.notifications.serverError(error);
        }
    }
}
```

```
{{! addon/components/rental/details/summary.hbs }}
<ContentPanel @title="Alquiler" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-2 gap-2 text-sm">
        <div class="text-gray-500">Etiqueta del activo</div>
        <div>{{or this.rental.asset_tag "—"}}</div>
        <div class="text-gray-500">Descripción</div>
        <div>{{or this.rental.description "—"}}</div>
        <div class="text-gray-500">Días de alquiler</div>
        <div>{{or this.rental.days "—"}}</div>
        <div class="text-gray-500">Estado</div>
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

Dado que el ciclo de vida establece
`strict_transitions`
, la API verifica cada movimiento. Un botón solo puede ofrecer lo que
`next-activity`
devuelve, y cualquier otra cosa se rechazará de todos modos.

## 7. Pruébalo

1. Abre
   **Fleet-Ops → Operaciones → Pedidos → Nuevo**
   y elige
   **Alquiler de equipos**
   como el tipo de pedido. El formulario cambia al diseño de alquiler, y los campos de conductor, vehículo y envío desaparecen.
2. Rellena la etiqueta del activo y los días de alquiler, un depósito y un punto de recogida. Hasta que se establezca la etiqueta del activo y los días, el pedido no se puede guardar.
3. Guarda. El pedido comienza en
   **Solicitado**
   : su primer estado de seguimiento es "Solicitado", con los detalles "Alquiler solicitado".
4. Ábrelo. El panel de alquiler ofrece
   **Reservado**
   y
   **Cancelado**
   .
   **Envío**
   y
   **Asignar conductor**
   no aparecen en el menú "…" ni en la fila de la tabla.
5. Filtra la tabla para
   **Alquiler de equipos**
   : sus columnas son las actividades del alquiler.
6. Elige otro tipo de pedido en un nuevo pedido: vuelve a aparecer el formulario estándar, y los detalles del alquiler se eliminan del borrador.

## Más

*   **Otros tipos de pedidos siguen funcionando sin cambios.**
    El perfil y el ciclo de vida solo se aplican a los pedidos que utilizan la configuración de alquiler.
*   **Añade tus propias acciones para los alquileres**
    con las vistas de recursos de las vistas de Fleet-Ops, añadiendo cada una un
    `visibleWhen`
    que comprueba
    `order.order_config?.meta?.presentation_profile === 'acme-rental'`
    . Ver
    [Acciones](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions#your-own-actions)
    .
*   **Mantén los datos del alquiler en tus propias tablas**
    cuando superan
    `meta`
    : guárdalos desde un observador en el modelo
    `Order`
    de Fleet-Ops, y cárgalos en tus secciones desde tu API. Ver
    [Expansiones y Observadores](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers)
    .
*   **Los alquileres se gestionan desde la consola.**
    No tienen conductor, por lo que nunca llegan a la aplicación Navigator, y se crean y mueven a lo largo desde la consola o tu extensión en lugar de la API pública del pedido. Los filtros de la lista de pedidos, el mapa en vivo y las métricas siguen asumiendo los códigos de la vida del envío; ver
    [Limitaciones](https://fleetbase.io/docs/extension-development/order-lifecycles/server-reference#limitations)
    .

[Extender una Vista de Recurso

Un ejemplo completo: añadir una columna filtrable con su propia celda, una acción de fila, una acción por lotes y un elemento del menú de detalles a las vistas de conductores de Fleet-Ops desde una extensión separada.](https://fleetbase.io/docs/extension-development/recipes/extending-a-resource-view)
[Publicar en el Marketplace

Autentícate con el registro de Fleetbase y publica tu extensión utilizando la CLI.](https://fleetbase.io/docs/extension-development/publishing/overview)