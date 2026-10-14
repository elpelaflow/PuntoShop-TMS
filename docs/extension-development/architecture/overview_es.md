---
title: "Descripción general"
url: https://fleetbase.io/docs/extension-development/architecture/overview
module: extension-development
---

# Descripción general

Una extensión de Fleetbase es un único repositorio con dos partes: un addon de Ember.js (la interfaz de usuario) y un paquete de Laravel (la API). El archivo `extension.json` los vincula y `addon/extension.js` es el punto de entrada de registro.

# Descripción general de la arquitectura

Una extensión de Fleetbase es:
**un único repositorio con dos partes:**

1. Un
   **addon de Ember.js**
   en la carpeta
   `addon/`
   — tu interfaz de usuario
2. Un
   **paquete de Laravel/Composer**
   en la carpeta
   `server/`
   — tu API

Además, un archivo `extension.json` de nivel superior que los vincula.

Cuando el console se inicia, carga el `addon/extension.js` de cada extensión instalada y ejecuta el hook `setupExtension(app, universe)`. Cuando Laravel se inicia, tu
`<Name>ServiceProvider.php`
(que extiende
`Fleetbase\Providers\CoreServiceProvider`)
configura las rutas, los observadores, las expansiones y las migraciones.

## Organización del repositorio

```
my-extension/
├── extension.json                    ← manifiesto (vincula el addon + el servidor)
├── package.json                      ← paquete npm — el addon de Ember
├── composer.json                     ← paquete de Composer — el paquete de Laravel
├── addon/                            ← código fuente del addon de Ember
│   ├── extension.js                  ← PUNTO DE REGISTRO
│   ├── engine.js                     ← Declaración del motor de Ember + dependencias de servicio
│   ├── routes.js                     ← Mapa de rutas del motor (buildRoutes)
│   ├── components/
│   ├── controllers/
│   ├── routes/
│   ├── templates/
│   ├── services/
│   ├── adapters/
│   ├── serializers/
│   └── models/
└── server/
    ├── src/
    │   ├── Providers/
    │   │   └── <Name>ServiceProvider.php   ← punto de inicio de Laravel
    │   ├── Http/
    │   │   └── Controllers/
    │   ├── Models/
    │   ├── Observers/
    │   ├── Expansions/
    │   └── routes.php                       ← rutas HTTP
    └── migrations/
```

Para una explicación detallada de cada archivo, consulta
[Anatomía de la extensión](https://fleetbase.io/docs/extension-development/getting-started/extension-anatomy)
.

## Frontend — addon/

El frontend es un
**motor de Ember**
que se monta dentro de la aplicación de console anfitriona.

Dos archivos son especiales:

| Archivo | Rol |
|---|---|
| `addon/extension.js` | El **punto de entrada de registro**. Exporta un objeto predeterminado con `setupExtension(app, universe)` (y opcionalmente `onEngineLoaded`). Se llama por `ExtensionManager` al iniciar la console |
| `addon/engine.js` | La **declaración del motor de Ember**. Declara `dependencies.services` (servicios anfitriones para inyectar), el resolver y exporta la clase Engine |

**El código de registro vive en
`addon/extension.js`
, no en
`engine.js`
.**
El motor es simplemente un contenedor — los registros se realizan al inicio mediante
`setupExtension`
. Consulta
[Registro de la extensión](https://fleetbase.io/docs/extension-development/architecture/extension-registration)
.

Un ejemplo típico de
`addon/extension.js`
:

```
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

Consulta
[Enrutamiento del frontend](https://fleetbase.io/docs/extension-development/frontend/routing)
para los patrones de motor y rutas.

## Backend — server/

El backend es un
**paquete de Composer**
con un proveedor de servicios de Laravel que extiende
`Fleetbase\Providers\CoreServiceProvider`
(de
`core-api`
):

```
<?php

namespace MyOrg\MyExtension\Providers;

use Fleetbase\Providers\CoreServiceProvider;

class MyExtensionServiceProvider extends CoreServiceProvider
{
    public $observers = [
        \MyOrg\MyExtension\Observers\MyModelObserver::class,
    ];

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

Las rutas viven en
`server/src/routes.php`
(cargadas mediante
`loadRoutesFrom(__DIR__ . '/../routes.php')`
). Las migraciones viven en
`server/migrations/`
(cargadas mediante
`loadMigrationsFrom(__DIR__ . '/../../migrations')`
). Ambos caminos son relativos al proveedor, que vive en
`server/src/Providers/`
.

`CoreServiceProvider`
proporciona:

* Registro automático de los arrays
  `$observers`
  y
  `$middleware`
  que declares
* Carga automática de los directorios
  `Expansions/`
  ,
  `Macros/`
  y
  `Mixins/`
* Ayudantes de rutas —
  `$router->fleetbaseRoutes($name)`
  ,
  `$router->fleetbaseRestRoutes(...)`
  y
  `$router->fleetbaseAuthRoutes(...)`
* Grupos de middleware —
  `'fleetbase.api'`
  (autenticación de clave) y
  `'fleetbase.protected'`
  (autenticación de sesión)
* Ayudante de programación —
  `$this->scheduleCommands($callable)`

Consulta
[Proveedor de servicios](https://fleetbase.io/docs/extension-development/backend/service-provider)
para el patrón completo.

## Manifest — extension.json

Un archivo pequeño que vincula las dos partes:

```
{
    "name": "Ledger",
    "version": "0.0.3",
    "description": "Extension de contabilidad e facturación para Fleetbase",
    "repository": "https://github.com/elpelaflow/PuntoShop-TMS",
    "license": "AGPL-3.0-or-later",
    "author": "Fleetbase Pte Ltd <hello@fleetbase.io>",
    "engine": "package.json",
    "api": "composer.json"
}
```

`engine`
y
`api`
son las rutas a las dos definiciones de paquetes (relativas al manifiesto). El registro de Fleetbase utiliza este manifiesto para descubrir e instalar tu extensión.

## Cómo funciona el inicio

```
Se inicia la console
  ├── ExtensionManager carga cada extensión habilitada
  │     └── Para cada una, carga dinámicamente addon/extension.js
  │           └── ejecuta setupExtension(app, universe)
  │
  └── Al navegar por primera vez a una ruta de extensión:
        └── Ember carga addon/engine.js (carga diferida)
              └── se dispara onEngineLoaded (si se exporta)

Laravel se inicia
  └── <Name>ServiceProvider.boot() se ejecuta
        ├── parent::boot() — grupos de middleware, capacidades
        ├── registerObservers() — observadores de modelos
        ├── registerExpansionsFrom() — expansiones de clase
        ├── loadRoutesFrom() — server/src/routes.php
        └── loadMigrationsFrom() — server/migrations/
```

## Siguiente

* [Anatomía de la extensión](https://fleetbase.io/docs/extension-development/getting-started/extension-anatomy)
  — una explicación detallada de los archivos
* [Registro de la extensión](https://fleetbase.io/docs/extension-development/architecture/extension-registration)
  — el contrato de
  `addon/extension.js`
  en detalle
* [Servicio del universo](https://fleetbase.io/docs/extension-development/universe/overview)
  — lo que registras a través de él
* [Proveedor de servicios del backend](https://fleetbase.io/docs/extension-development/backend/service-provider)
  — el lado de Laravel

[Anatomía de la extensión

Una explicación de una extensión de Fleetbase en plantilla — addon/, server/, extension.json y los principales puntos de entrada (addon/extension.js, el motor, el proveedor de servicios).](https://fleetbase.io/docs/extension-development/getting-started/extension-anatomy)
[Registro de la extensión

Cómo addon/extension.js conecta tu extensión al ciclo de vida de inicio de la console de Fleetbase. El hook setupExtension, onEngineLoaded y el contrato que implementa cada extensión.](https://fleetbase.io/docs/extension-development/architecture/extension-registration)