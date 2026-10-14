---
title: "Anatomía de una Extensión"
url: https://fleetbase.io/docs/extension-development/getting-started/extension-anatomy
module: extension-development
---

# Anatomía de una Extensión

Una descripción general de una extensión de Fleetbase estructurada: `addon/`, `server/`, `extension.json`, y los puntos de entrada clave ( `addon/extension.js`, el motor, el proveedor de servicios).

# Anatomía de una Extensión

Una extensión estructurada es un único repositorio que contiene
**dos partes**:

* **`addon/`**
  — Un addon de Ember.js (la interfaz de usuario de la consola)
* **`server/`**
  — Un paquete de Composer/Laravel (la API)

Además, un archivo de nivel superior
`extension.json`
que los une.

## Diseño de Nivel Superior

```
my-extension/
├── extension.json        ← El manifiesto (enlaza addon + server)
├── package.json          ← Paquete npm — el addon de Ember
├── composer.json         ← Paquete de Composer — el paquete de Laravel
├── README.md
├── addon/                ← Fuente del addon de Ember
│   ├── extension.js      ← EL punto de entrada — el hook setupExtension
│   ├── engine.js         ← Declaración del motor de Ember + dependencias de servicios
│   ├── routes.js         ← Mapa de rutas del motor
│   ├── components/       ← Componentes que proporciona tu motor
│   ├── controllers/      ← Controladores de Ember
│   ├── routes/           ← Manejadores de rutas de Ember
│   ├── templates/        ← Plantillas .hbs
│   ├── services/         ← Servicios con ámbito del motor
│   ├── adapters/         ← Adaptadores de Ember Data (opcional)
│   ├── serializers/      ← Serializadores de Ember Data (opcional)
│   ├── models/           ← Modelos de Ember Data
│   ├── instance-initializers/   ← Inicializadores de instancia del motor (opcional)
│   └── styles/           ← CSS con ámbito del motor
├── server/               ← Fuente del paquete de Laravel
│   ├── src/
│   │   ├── Providers/    ← Archivo MyServiceProvider.php — el punto de entrada de Laravel
│   │   ├── Http/
│   │   │   ├── Controllers/      ← Controladores internos + Api/v1
│   │   │   ├── Requests/         ← Validación de solicitudes de formulario
│   │   │   ├── Resources/        ← Formas de recursos de API
│   │   │   └── Middleware/
│   │   ├── Models/       ← Modelos de Eloquent
│   │   ├── Listeners/    ← Escuchadores de eventos
│   │   ├── Observers/    ← Observadores de modelos (autoadaptados)
│   │   ├── Expansions/   ← Extensiones de clases (autocargadas)
│   │   ├── Notifications/
│   │   ├── Services/
│   │   └── routes.php    ← Rutas HTTP del paquete
│   ├── migrations/       ← Migraciones de la base de datos (autocargadas)
│   ├── seeders/          ← Sembradores opcionales
│   └── config/           ← config/<extension>.php
└── config/               ← Configuración del lado de addon
```

## El Manifiesto — extension.json

El manifiesto es simple. Indica al registro las dos definiciones de paquetes:

```
{
    "name": "Ledger",
    "version": "0.0.3",
    "description": "Extension de Contabilidad e Facturación para Fleetbase",
    "repository": "https://github.com/elpelaflow/PuntoShop-TMS",
    "license": "AGPL-3.0-or-later",
    "author": "Fleetbase Pte Ltd <hello@fleetbase.io>",
    "engine": "package.json",
    "api": "composer.json"
}
```

| Campo | Propósito |
| --- | --- |
| `name` , `version` , `description` , `author` , `license` , `repository` | Metadatos estándar utilizados por el registro |
| `engine` | La ruta al `package.json` del addon de Ember (relativo al manifiesto) |
| `api` | La ruta al `composer.json` del paquete de Laravel |

Las extensiones reales colocan ambas partes en la raíz, por lo que
`package.json`
y
`composer.json`
son simplemente nombres de archivo como se muestra arriba.

## Puntos de Entrada del Frontend

### addon/extension.js — Registro

`addon/extension.js`
es el
**punto de entrada de registro**
que la consola llama al arrancar. Exporta un objeto predeterminado con un
`setupExtension(app, universe)`
método (y opcionalmente
`onEngineLoaded`
):

```
// addon/extension.js
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService = universe.getService('menu');

        menuService.registerHeaderMenuItem('My Extension', 'console.my-extension', {
            icon: 'puzzle-piece',
            description: 'Mi característica personalizada.',
        });
    },
};
```

Este es el
**único**
lugar donde puedes registrar elementos de menú, widgets, hooks, registros y contribuciones de componentes. Consulta
[Registro de Extensiones](https://fleetbase.io/docs/extension-development/architecture/extension-registration)
para el contrato completo.

### addon/engine.js — Declaración del Motor de Ember

`addon/engine.js`
declara el motor de Ember — los servicios que se deben inyectar, el resolver y la ruta exportada. **No** es para código de registro:

```
// addon/engine.js
import Engine from '@ember/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from './config/environment';
import services from '@fleetbase/ember-core/exports/services';
import modulePrefix from './module-prefix';

const { modulePrefix: prefix } = config;

export default class MyExtensionEngine extends Engine {
    modulePrefix = prefix;
    Resolver = Resolver;
    dependencies = {
        services,
        externalRoutes: ['console'],
    };
}

loadInitializers(MyExtensionEngine, modulePrefix);
```

El array
`services`
importado de
`@fleetbase/ember-core/exports/services`
es la lista canónica de servicios de host que puedes inyectar en tu motor (
`store`
,
`fetch`
,
`notifications`
,
`current-user`
,
`session`
,
`universe`
,
`crud`
,
`theme`
, etc.).

### addon/routes.js — Mapa de Rutas

```
// addon/routes.js
import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function () {
    this.route('index');
    this.route('settings');
    this.route('reports', function () {
        this.route('show', { path: '/:report_id' });
    });
});
```

## Puntos de Entrada del Backend

### server/src/Providers/MyServiceProvider.php — Arranque de Laravel

```php
<?php

namespace MyOrg\MyExtension\Providers;

use Fleetbase\Providers\CoreServiceProvider;

class MyExtensionServiceProvider extends CoreServiceProvider
{
    /**
     * Observers automatically registered by the parent's registerObservers().
     */
    public $observers = [
        \MyOrg\MyExtension\Observers\InvoiceObserver::class,
    ];

    /**
     * Middleware groups the parent's registerMiddleware() pushes into the router.
     */
    public $middleware = [];

    public function boot()
    {
        parent::boot();

        $this->registerObservers();
        $this->registerExpansionsFrom(__DIR__ . '/../Expansions');
        $this->loadRoutesFrom(__DIR__ . '/../routes.php');
        $this->loadMigrationsFrom(__DIR__ . '/../../migrations');
    }
}
```

El proveedor extiende
`Fleetbase\Providers\CoreServiceProvider`
— es donde se encuentran los helpers de rutas, la auto-registración de observadores, la auto-carga de expansiones y los grupos de middleware. Consulta
[Proveedor de Servicios](https://fleetbase.io/docs/extension-development/backend/service-provider)
.

### server/src/routes.php — Rutas HTTP

```
<?php

use Illuminate\Support\Facades\Route;

Route::prefix(config('my-extension.api.routing.prefix', 'my-extension'))
    ->namespace('MyOrg\\MyExtension\\Http\\Controllers')
    ->group(function ($router) {
        // Rutas públicas de webhook
        $router->post('webhooks/stripe', 'WebhookController@handle');

        // Rutas API-key
        $router->prefix('v1')->middleware(['fleetbase.api'])->group(function ($router) {
            $router->fleetbaseRoutes('invoices');
        });

        // Rutas de consola autenticadas en sesión
        $router->prefix('int/v1')->middleware(['fleetbase.protected'])->group(function ($router) {
            $router->fleetbaseRoutes('invoices');
            $router->fleetbaseRoutes('gateways');
        });
    });
```

Observa
`$router->fleetbaseRoutes('invoices')`
— es el helper de rutas de
`core-api`
que genera automáticamente un conjunto de recursos REST (
`index`
,
`show`
,
`store`
,
`update`
,
`destroy`
, más búsqueda/conteo/acción en lote). Consulta
[Rutas y Controladores](https://fleetbase.io/docs/extension-development/backend/routes-and-controllers)
.

## Piezas Conectadas

Cómo encajan todo en el arranque:

```
El sistema de consola arranca
  ├── El administrador de extensiones carga el addon/extension.js de cada extensión
  │     └── setupExtension(app, universe) se ejecuta
  │           ├── El servicio de menú registra tu elemento de menú de encabezado, paneles de configuración, etc.
  │           ├── El servicio de widget registra tus widgets del panel
  │           └── El servicio de registro crea registros / inyecta componentes
  │
  └── Al navegar por primera vez a tu extensión:
        └── Ember carga addon/engine.js
              ├── routes.js conecta el mapa de rutas
              └── onEngineLoaded(engineInstance, universe, app) se dispara (si se exporta)

Laravel arranca
  └── El proveedor MyServiceProvider.boot() se ejecuta
        ├── parent::boot() — grupos de middleware, esquemas de habilidades
        ├── registerObservers() — adjunta tus observadores de modelos
        ├── registerExpansionsFrom() — carga automáticamente las extensiones de clases
        ├── loadRoutesFrom('server/src/routes.php')
        └── loadMigrationsFrom('server/migrations')
```

## Extensión de Ejemplo para Consultar

`ledger`
es una extensión completa representativa — ambas partes, observadores, expansiones, panel, elementos de menú de configuración, rutas, modelos, migraciones. Consulta esta sección junto con ella.

## Referencia de Código

| Archivo | Descripción |
|---|---|
| `ledger/extension.json` | Manifiesto real |
| `ledger/addon/extension.js` | Punto de entrada `setupExtension` real |
| `ledger/addon/engine.js` | Declaración del motor real |
| `ledger/server/src/Providers/MyServiceProvider.php` | Proveedor real |
| `ledger/server/src/routes.php` | Archivo de rutas real |

Utilice la interfaz de línea de comandos de Fleetbase para crear una nueva extensión con un backend y una interfaz de usuario (frontend) básicos.](https://fleetbase.io/docs/extension-development/getting-started/quickstart)

[Descripción general

Una extensión de Fleetbase es un único repositorio que consta de dos partes: un complemento de Ember.js (la interfaz de usuario) y un paquete de Laravel (la API). El archivo `extension.json` los vincula, y `addon/extension.js` es el punto de registro.](https://fleetbase.io/docs/extension-development/architecture/overview)