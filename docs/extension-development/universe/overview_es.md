---
title: "Descripción general"
url: https://fleetbase.io/docs/extension-development/universe/overview
module: extension-development
---

# Descripción general

El servicio `UniverseService` es la fachada central de extensión en `@fleetbase/ember-core`. Expone servicios secundarios para menús, registros, vistas de recursos, widgets, hooks y motores, y es el único punto de entrada que utiliza tu extensión para integrarse en la consola.

# Servicio Universe

El
**`UniverseService`**
es la fachada central de extensión en
`@fleetbase/ember-core`
. Es el punto de entrada que utiliza tu extensión para registrar todo: elementos de menú, componentes, widgets, hooks, registros e integraciones de motores.

Lo accedes a través del
`setupExtension(app, universe)`
hook en tu
`addon/extension.js`
:

```
// addon/extension.js
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService     = universe.getService('menu');
    const registryService = universe.getService('registry');
    const widgetService   = universe.getService('widget');
    const hookService     = universe.getService('hook');

        // … registra tus contribuciones
    },
};
```

Para el ciclo de vida completo de la inscripción de extensiones, consulta
[Inscripción de extensiones](https://fleetbase.io/docs/extension-development/architecture/extension-registration)
.

## Servicios secundarios

`UniverseService`
es una fachada: la mayor parte de la funcionalidad reside en servicios secundarios especializados a los que puedes acceder a través de
`universe.getService(...)`
:

| Servicio | Qué hace | Página |
| --- | --- | --- |
| `menu` | Elementos de encabezado, ajustes, paneles de administración, menús de organización y usuarios, registros personalizados | [Servicio de menú](https://fleetbase.io/docs/extension-development/universe/menu-service) |
| `registry` | Crea y consulta registros; registra componentes, componentes, servicios y helpers | [Servicio de registro](https://fleetbase.io/docs/extension-development/universe/registry-service) |
| `resource-view` | Columnas, acciones de fila y por lotes, y botones en las vistas de tabla y detalles de cualquier motor | [Servicio de vista de recursos](https://fleetbase.io/docs/extension-development/universe/resource-view-service) |
| `widget` | Widgets del panel de control y paneles de control | [Servicio de widgets](https://fleetbase.io/docs/extension-development/universe/widget-service) |
| `hook` | Hooks de ciclo de vida ( `application:before-model` , `console:after-model` , etc.) | [Servicio de hooks](https://fleetbase.io/docs/extension-development/universe/hook-service) |
| `extension-manager` | Carga del motor e integración entre motores | [Gestor de extensiones](https://fleetbase.io/docs/extension-development/universe/extension-manager) |

## Resolución de nombres de `getService()`

`getService()`
acepta varias formas: todas se resuelven al mismo subservicio:

| Puedes escribir | Se resuelve en |
| --- | --- |
| `'menu'`, `'menus'` | `universe/menu-service` |
| `'menu-service'`, `'menuService'` | `universe/menu-service` |
| `'universe/menu-service'` | `universe/menu-service` |
| `'registry'`, `'registry-service'` | `universe/registry-service` |
| `'resource-view'`, `'resourceView'`, `'resource-views'`, `'resource-view-service'` | `universe/resource-view-service` |
| `'widget'`, `'widgets'`, `'widget-service'` | `universe/widget-service` |
| `'hook'`, `'hooks'`, `'hook-service'` | `universe/hook-service` |

La forma abreviada en kebab-case (
`'menu'`,
`'widget'`
, etc.) es la forma canónica en archivos reales de
`addon/extension.js`
: es lo que utilizan todas las extensiones modernas.

## Métodos de ciclo de vida del motor

Además de los servicios secundarios,
`UniverseService`
expone directamente algunos ayudantes de carga de motores:

| Método | Propósito |
| --- | --- |
| `universe.whenEngineLoaded(name, cb)` | Ejecuta `cb(engineInstance, universe, app)` cuando el motor se ha iniciado. Si ya está cargado, se ejecuta inmediatamente. Es la forma recomendada de realizar el trabajo entre motores |
| `universe.ensureEngineLoaded(name)` | Carga forzadamente un motor (devuelve una `Promise<EngineInstance>` ) |
| `universe.onEngineLoaded(name, cb)` | Solo escucha de eventos: no se activa si el motor ya está cargado. Preferiblemente usar `whenEngineLoaded` |
| `universe.getEngineInstance(name)` | Devuelve la instancia del motor cargada, o `null` |
| `universe.getServiceFromEngine(engineName, serviceName, options?)` | Busca un servicio dentro de otro motor |
| `universe.extensionManager.isInstalled(name)` | Indica si una extensión está instalada en el despliegue de Fleetbase |

Todos estos delegan a
[Gestor de extensiones](https://fleetbase.io/docs/extension-development/universe/extension-manager)
.

## Métodos de conveniencia de la fachada

Para la compatibilidad hacia atrás,
`UniverseService`
expone también métodos de paso directo que delegan a los servicios secundarios. Por ejemplo:

* `universe.registerHeaderMenuItem(...)`
  →
  `menuService.registerHeaderMenuItem(...)`
* `universe.registerHook(...)`
  →
  `hookService.registerHook(...)`
* `universe.createRegistry(...)`
  →
  `registryService.createRegistry(...)`
* `universe.registerRenderableComponent(...)`
  →
  `registryService.registerRenderableComponent(...)`

**Es preferible usar la forma de los servicios secundarios**
(
`universe.getService('menu').registerHeaderMenuItem(...)`
) — es la forma canónica, hace que la intención sea explícita y evita los alias de fachada obsoletos como
`registerDashboardWidgets`
.

## Un ejemplo completo de addon/extension.js

Un ejemplo representativo que combina varios servicios secundarios:

```
// addon/extension.js
import { MenuItem, Widget, ExtensionComponent, Hook } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService     = universe.getService('menu');
        const registryService = universe.getService('registry');
        const widgetService   = universe.getService('widget');
        const hookService     = universe.getService('hook');

        // 1. Elemento de menú de nivel superior
        menuService.registerHeaderMenuItem('Mi extensión', 'console.my-extension', {
            icon: 'puzzle-piece',
            description: 'Mi característica de logística personalizada.',
        });

        // 2. Elemento de ajustes
        menuService.registerSettingsMenuItem(
            new MenuItem({
                title: 'Mi extensión',
                slug: 'my-extension',
                icon: 'gear',
                component: new ExtensionComponent('@my-org/my-extension-engine', 'settings'),
            })
        );

        // 3. Inyecta un componente en un slot de otra extensión
        registryService.registerRenderableComponent(
            'fleet-ops:component:order:details',
            new ExtensionComponent('@my-org/my-extension-engine', 'my-order-tab')
        );

        // 4. Registra un widget del panel de control
        widgetService.registerWidgets('dashboard', [
            new Widget({
                id: 'my-extension-stats',
                name: 'Mis estadísticas',
                icon: 'chart-line',
                component: new ExtensionComponent('@my-org/my-extension-engine', 'widget/my-stats'),
                grid_options: { w: 6, h: 6, minW: 4, minH: 4 },
            }),
        ]);

        // 5. Ancla en el arranque de la consola
        hookService.registerHook(
            new Hook('console:after-model', (session, router) => {
                // hacer algo después de la autenticación del usuario
            })
        );
    },
};
```

## Referencias del mundo real

| Extensión | Patrón mostrado | Fuente |
| --- | --- | --- |
| Fleet-Ops | Elemento de encabezado con atajos, panel de administración, registros personalizados (40+) | `packages/fleetops/addon/extension.js` |
| VROOM | `whenEngineLoaded` para registrar un proveedor de optimización de rutas en Fleet-Ops | `packages/fleetops/addon/extension.js` |
| Valhalla | `whenEngineLoaded` para registrar un motor de enrutamiento en Fleet-Ops | `packages/fleetops/addon/extension.js` |
| Ledger | Widget personalizado, múltiples widgets, pestaña de detalles de pedidos de Fleet-Ops | `packages/ledger/addon/extension.js` |
| IAM Engine | Gestión de identidad y acceso, hooks de autenticación, permisos de consola | `packages/iam-engine/addon/extension.js` |

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/services/universe.js` | El servicio `UniverseService` |
| `addon/services/universe/` | Los cinco servicios secundarios |
| `addon/contracts/` | `MenuItem` , `Widget` , `Hook` , `ExtensionComponent` , etc. |