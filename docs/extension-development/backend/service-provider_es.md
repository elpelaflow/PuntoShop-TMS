---
title: "Proveedor de Servicios"
url: https://fleetbase.io/docs/extension-development/backend/service-provider
module: extension-development
---

# Proveedor de Servicios

El proveedor de servicios de Laravel es el punto de entrada para el backend de tu extensión. Carga rutas, migraciones, observadores, expansiones, middleware y vincula los servicios en el contenedor.

# Proveedor de Servicios

La parte de backend de una extensión es un paquete de Laravel. Tu proveedor de servicios es su punto de entrada: Composer lo descubre automáticamente a través del
`extra.laravel.providers`
array en
`composer.json`
, y Laravel lo inicia en cada solicitud.

Fleetbase proporciona un proveedor de servicios base,
**`Fleetbase\Providers\CoreServiceProvider`**,
que realiza la mayor parte de la configuración por ti. Extiéndelo (no extiéndelo directamente a
`ServiceProvider`
de Laravel) para que herede la auto-registración de observadores, los grupos de middleware, la carga de expansiones y lo demás.

## La Estructura del Servidor

```
server/
├── composer.json
├── src/
│   ├── routes.php                            # Definiciones de rutas (NO routes/api.php)
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   ├── Observers/
│   ├── Expansions/
│   ├── Providers/
│   │   └── MyExtensionServiceProvider.php
│   └── Console/
│       └── Commands/
└── migrations/                               # Las migraciones viven aquí
```

## composer.json

La configuración para descubrir paquetes de Laravel se encuentra en
`extra.laravel.providers`
:

```
{
    "name": "my-org/my-extension-api",
    "version": "0.0.1",
    "require": {
        "php": "^8.0",
        "fleetbase/core-api": "*"
    },
    "autoload": {
        "psr-4": {
            "MyOrg\\MyExtension\\": "server/src/"
        }
    },
    "extra": {
        "laravel": {
            "providers": [
                "MyOrg\\MyExtension\\Providers\\MyExtensionServiceProvider"
            ]
        }
    }
}
```

El
`flb scaffold`
CLI genera esto para ti. Consulta
[Visión general de la arquitectura](https://fleetbase.io/docs/extension-development/architecture/overview)
para obtener más información sobre la configuración.

## Un Proveedor de Servicios Mínimo

```
<?php

namespace MyOrg\MyExtension\Providers;

use Fleetbase\Providers\CoreServiceProvider;

if (!class_exists(CoreServiceProvider::class)) {
    throw new \Exception('No se puede cargar la extensión sin que esté instalado `fleetbase/core-api`!');
}

class MyExtensionServiceProvider extends CoreServiceProvider
{
    /**
     * Observadores auto-registrados por CoreServiceProvider.
     */
    public $observers = [
        \MyOrg\MyExtension\Models\Widget::class => \MyOrg\MyExtension\Observers\WidgetObserver::class,
    ];

    /**
     * Comandos de consola auto-registrados por CoreServiceProvider.
     */
    public $commands = [
        \MyOrg\MyExtension\Console\Commands\SyncCommand::class,
    ];

    public function register()
    {
        $this->app->register(CoreServiceProvider::class);
    }

    public function boot()
    {
        $this->registerCommands();
        $this->registerObservers();
        $this->registerExpansionsFrom(__DIR__ . '/../Expansions');
        $this->loadRoutesFrom(__DIR__ . '/../routes.php');
        $this->loadMigrationsFrom(__DIR__ . '/../../migrations');
        $this->mergeConfigFrom(__DIR__ . '/../../config/my-extension.php', 'my-extension');
    }
}
```

Ejemplo real:
`ledger/server/src/Providers/LedgerServiceProvider.php`
.

## Lo que hace CoreServiceProvider por ti

| Propiedad | Comportamiento |
|---|---|
| `$observers` | Cada par `Modelo => Observador` se registra cuando llamas a `$this->registerObservers()` |
| `$commands` | Comandos de consola registrados a través de `$this->registerCommands()` |
| `$middleware` | Grupos de middleware nombrados ( `'fleetbase.api'` , `'fleetbase.protected'` ) — extiéndelos añadiendo |
| `$globalMiddlewares` | Middleware global siempre activos — añádelos para agregarlos |
| `$transformers` | Transformadores de recursos registrados cuando llamas a `$this->registerTransformers()` — consulta [Transformadores de recursos](https://fleetbase.io/docs/extension-development/backend/resource-transformers) |

| Ayudante | Propósito |
|---|---|
| `loadRoutesFrom(path)` | Carga el archivo de rutas (función incorporada de Laravel) |
| `loadMigrationsFrom(path)` | Carga las migraciones (función incorporada de Laravel) |
| `registerExpansionsFrom(dir)` | Carga automáticamente cada clase `Expansion` en el directorio y la extiende |
| `registerTransformersFrom(dir)` | Carga automáticamente cada clase `ResourceTransformer` en el directorio y la registra |
| `scheduleCommands(callback)` | Vincula los comandos programados en el programador de Laravel |

Consulta
`Fleetbase\Providers\CoreServiceProvider`
para obtener más información.

## Grupos de Middleware

Se definen dos grupos nombrados globalmente:

| Grupo | Cuándo usar | Incluye |
|---|---|---|
| `fleetbase.api` | Puntos finales de API públicos que usan claves de API | Control de acceso, autenticación básica, registro de solicitudes, vinculación de rutas |
| `fleetbase.protected` | Puntos finales de la consola internos que usan la sesión del usuario | Sanctum, sesión, guardia de autorización, seguimiento de la presencia |

Añade tu propio middleware a un grupo desde
`boot()`
:

```
$this->app->router->pushMiddlewareToGroup(
    'fleetbase.api',
    \MyOrg\MyExtension\Http\Middleware\RequireFeatureFlag::class
);
```

## Rutas

Define tus rutas en
`server/src/routes.php`
(la ruta que pasas a
`loadRoutesFrom`
). Usa la convención de espacio de nombres y prefijo — consulta
[Rutas y controladores](https://fleetbase.io/docs/extension-development/backend/routes-and-controllers)
para obtener más información.

```
<?php

use Illuminate\Support\Facades\Route;

Route::prefix(config('my-extension.api.routing.prefix', 'my-extension'))
    ->namespace('MyOrg\MyExtension\Http\Controllers')
    ->group(function ($router) {
        $router->group(['middleware' => ['fleetbase.protected']], function ($router) {
            $router->fleetbaseRoutes('widgets');
        });
    });
```

`fleetbaseRoutes()`
es un macro de expansión que registra las rutas estándar para un recurso (
`index`
,
`store`
,
`show`
,
`update`
,
`destroy`
) más algunos extras de Fleetbase. Consulta
[Rutas y controladores](https://fleetbase.io/docs/extension-development/backend/routes-and-controllers)
.

## Migraciones

Las migraciones viven en
`server/migrations/`
(en un directorio plano, no
`database/migrations/`
). Se cargan automáticamente cuando llamas a
`$this->loadMigrationsFrom()`
. Consulta
[Migraciones](https://fleetbase.io/docs/extension-development/backend/migrations)
.

## Observadores, Expansiones, Transformadores, Eventos

Cuatro patrones se extienden desde el proveedor de servicios:

* **[Observadores](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers#observers)**
  — reaccionan a los eventos del ciclo de vida del modelo (creación, actualización, eliminación) en tus propios o modelos centrales
* **[Expansiones](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers#expansions)**
  — extienden losFacades de Laravel (
  `Route`
  ,
  `Str`
  ,
  `Arr`
  , etc.) con métodos personalizados. El
  `Route::fleetbaseRoutes()`
  macro es una expansión
* **[Transformadores de recursos](https://fleetbase.io/docs/extension-development/backend/resource-transformers)**
  — decoran la salida JSON de los recursos que no son tuyos (central o de otras extensiones), en todas las instancias donde se serializan, sin modificarlos
* **Proveedor de eventos**
  — para eventos de la aplicación, registra un proveedor de eventos hermano
  `EventServiceProvider`
  y
  `register()`
  lo desde tu proveedor principal. Consulta
  `fleetops/server/src/Providers/EventServiceProvider.php`
  para un ejemplo de implementación.

## Fuente

| Archivo | Descripción |
|---|---|
| `src/Providers/CoreServiceProvider.php` | Proveedor base — extiéndelo |
| `src/Expansions/Route.php` | `fleetbaseRoutes`, `fleetbaseRestRoutes`, `fleetbaseAuthRoutes` |
| `ledger/server/src/Providers/LedgerServiceProvider.php` | Proveedor de extensión de referencia |
| `fleetops/server/src/Providers/FleetOpsServiceProvider.php` | Otro proveedor de extensión de referencia |