---
title: "Servicio de Menú"
url: https://fleetbase.io/docs/extension-development/universe/menu-service
module: extension-development
---

# Servicio de Menú

Registra las entradas de navegación en la consola: elementos del encabezado, paneles de configuración, paneles de administración, menús de organización y usuario, y registros personalizados, a través de `universe.getService('menu')`.

# Servicio de Menú

El
`menu`
servicio es la forma en que tu extensión contribuye con entradas de navegación a la consola. Proporciona registradores dedicados para cada superficie de menú principal, así como un registrador genérico para registros personalizados (
`auth:login`
,
`engine:fleet-ops`
, etc.).

```
// addon/extension.js
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService = universe.getService('menu');
        // … registros
    },
};
```

## Nombres de Registros

El servicio mantiene un conjunto pequeño de registros bien conocidos, referenciados por nombres separados por
**dos puntos**:

| Registro | Contiene | Registrador |
| --- | --- | --- |
| `header` | Elementos de la barra de navegación del encabezado (parte superior de la consola) | `registerHeaderMenuItem` |
| `console:account` | Menús de organización y usuario (con prefijos `organization:` o `user:` ) | `registerOrganizationMenuItem` , `registerUserMenuItem` |
| `console:admin` | Sección de administración: elementos ( `menu-item` ) y paneles ( `menu-panel` ) | `registerAdminMenuItem` , `registerAdminMenuPanel` |
| `console:settings` | Elementos de la página de configuración | `registerSettingsMenuItem` |
| `auth:login` | Extras de la pantalla de inicio de sesión (botones adicionales, páginas públicas sin autenticación) | `registerMenuItem('auth:login', …)` |
| `engine:<name>` | Cajón de configuración específico para el motor ( `engine:fleet-ops` , etc.) | `registerMenuItem('engine:<name>', …)` |
| Personalizado ( `my-ext:tabs` , etc.) | Cualquier cosa que definas a través de `registry.createRegistries(...)` | `registerMenuItem('my-ext:tabs', …)` |

## registerHeaderMenuItem(itemOrTitle, route?, options?)

El registrador más utilizado: añade una entrada a la parte superior del encabezado de la consola.

```
menuService.registerHeaderMenuItem('Fleet-Ops', 'console.fleet-ops', {
    icon: 'truck',
    priority: 0,
    description: 'Gestión de transporte y operaciones de flota.',
    shortcuts: [
        { title: 'Operaciones', icon: 'route', route: 'console.fleet-ops.operations.orders' },
        { title: 'Vehículos',   icon: 'truck', route: 'console.fleet-ops.management.vehicles' },
        { title: 'Conductores', icon: 'id-card', route: 'console.fleet-ops.management.drivers' },
    ],
});
```

El array
`shortcuts`
no es decorativo: cada atajo se registra automáticamente como un elemento de encabezado de primera clase (con el título del padre como
`_parentTitle`
para agrupar en el menú desplegable del personalizador). Esto significa que una única inscripción de encabezado puede exponer múltiples entradas descubribles.

También puedes pasar un
`MenuItem`
:

```
import { MenuItem } from '@fleetbase/ember-core/contracts';

menuService.registerHeaderMenuItem(
    new MenuItem({
        title: 'Fleet-Ops',
        route: 'console.fleet-ops',
        icon: 'truck',
        priority: 0,
    })
);
```

## registerSettingsMenuItem(itemOrTitle, options?)

Añade una entrada a la página de configuración.

```
menuService.registerSettingsMenuItem(
    new MenuItem({
        title: 'Mi Extensión',
        slug: 'my-extension',
        icon: 'gear',
        component: new ExtensionComponent('@my-org/my-engine', 'settings-panel'),
    })
);
```

Cuando el
`MenuItem`
tiene un
`component`
, se renderiza en la página de configuración cuando el usuario hace clic en la entrada. Si también quieres una transición de ruta, establece
`route: 'console.settings.virtual'`
y utiliza
`slug`
para identificar la vista.

## registerAdminMenuItem(itemOrTitle, route?, options?) / registerAdminMenuPanel(panelOrTitle, items?, options?)

La sección de administración admite tanto elementos planos como paneles agrupados.

```
menuService.registerAdminMenuPanel(
    'Configuración de Fleet-Ops',
    [
        new MenuItem({
            title: 'Enrutamiento',
            icon: 'route',
            component: new ExtensionComponent('@fleetbase/fleetops-engine', 'admin/routing-settings'),
        }),
        new MenuItem({
            title: 'Mapa',
            icon: 'map',
            component: new ExtensionComponent('@fleetbase/fleetops-engine', 'admin/map-settings'),
        }),
    ],
    { slug: 'fleet-ops' }
);
```

Un panel se almacena en
`console:admin → menu-panel → <slug>`
; también sus elementos hijos se extienden a
`console:admin → menu-item → <itemSlug>`
para que sean descubribles individualmente.

## registerOrganizationMenuItem(itemOrTitle, options?)

Elementos en el menú de organización (parte superior derecha). El slug se prefiere automáticamente con
`organization:`
.

```
menuService.registerOrganizationMenuItem(
    new MenuItem({
        title: 'Preferencias de Ledger',
        icon: 'calculator',
        slug: 'ledger-preferences',
        view: 'index',
        component: new ExtensionComponent('@fleetbase/ledger-engine', 'ledger-org-settings'),
        onClick: (menuItem) => {
            const router = app.lookup('service:router');
            router?.transitionTo('console.settings.virtual', menuItem.slug);
        },
    })
);
```

Si no se proporciona
`section`
, se establece de forma predeterminada en
`'settings'`
.

## registerUserMenuItem(itemOrTitle, options?)

Elementos en el menú de usuario. El slug se prefiere automáticamente con
`user:`
.

```
menuService.registerUserMenuItem(
    new MenuItem({
        title: 'Ayuda y tutoriales',
        icon: 'question-circle',
        onClick: () => app.lookup('service:tour')?.showTourLauncher(),
    })
);
```

Si no se proporciona
`section`
, se establece de forma predeterminada en
`'account'`
.

## registerMenuItem(registryName, titleOrMenuItem, options?)

El registrador genérico para
**registros personalizados**
— tus propios (
`my-ext:sidebar`
) o registros del motor bien conocidos (
`auth:login`
,
`engine:fleet-ops`
,
`fleet-ops:component:vehicle:details`
).

```
// Un botón en la pantalla de inicio de sesión — enlaza a la propia ruta de inicio de sesión del motor
menuService.registerMenuItem(
    'auth:login',
    new MenuItem({
        title: 'Acceso para socios',
        route: 'partner-portal.login',
        icon: 'person',
        type: 'link',
        wrapperClass: 'btn-block py-1 border dark:border-gray-700 border-gray-200 hover:opacity-50',
    })
);

// Una pestaña en el panel de detalles del pedido de Fleet-Ops
menuService.registerMenuItem(
    'fleet-ops:component:order:details',
    new MenuItem({
        title: 'Factura',
        route: 'operations.orders.index.details.virtual',
        component: new ExtensionComponent('@fleetbase/ledger-engine', 'order-invoice'),
        icon: 'file-invoice-dollar',
        slug: 'invoice',
    })
);
```

Ejemplo real:
`packages/ledger/addon/extension.js:92`
— registra una pestaña "Factura" en el panel de detalles del pedido de Fleet-Ops.

Para contribuciones de componentes (donde el anfitrión renderiza la IU contribuida en lugar de navegar a una ruta), utiliza
[`registry.registerRenderableComponent(...)`](https://fleetbase.io/docs/extension-development/universe/registry-service)
en su lugar — es la herramienta adecuada para las contribuciones de componentes.

## Leer elementos

| Método | Devuelve |
| --- | --- |
| `getHeaderMenuItems()` | Array de elementos del encabezado |
| `getOrganizationMenuItems()` | Elementos con prefijo `organization:` |
| `getUserMenuItems()` | Elementos con prefijo `user:` |
| `getAdminMenuItems()` | Elementos de la sección de administración (excluyendo paneles hijos) |
| `getAdminMenuPanels()` (alias `getAdminPanels` ) | Paneles de administración |
| `getSettingsMenuItems()` | Elementos de la página de configuración |
| `getSettingsMenuPanels()` | Paneles de configuración |
| `getMenuItems(registryName)` | Elementos en cualquier registro |
| `getMenuPanels(registryName)` | Paneles en cualquier registro |
| `getMenuItemsFromPanel(panelSlug)` | Elementos dentro de un panel específico |
| `lookupMenuItem(registryName, slug, view?, section?)` (alias `getMenuItem` ) | Un elemento específico |

## Control de Permisos

Pasa
`permission`
en un
`MenuItem`
y la IU del menú ocultará o deshabilitará el elemento según las capacidades de IAM del usuario.

```
new MenuItem({
    title: 'Eliminar conductor',
    icon: 'trash',
    permission: 'fleet-ops driver delete',
    onClick: deleteDriver,
});
```

## Referencias del mundo real

| Extensión | Patrón mostrado | Fuente |
| --- | --- | --- |
| Fleet-Ops | Elemento de encabezado con atajos + panel de administración | `packages/fleetops/addon/extension.js` |
| Ledger | Elemento de encabezado, panel personalizado, pestaña de pedido de Fleet-Ops | `packages/ledger/addon/extension.js` |
| IAM Engine | Integraciones de menú de organización y usuario, permisos | `packages/iam-engine/addon/extension.js` |
| Dev Engine | Ajustes de desarrollador, llaves de API, menú de webhooks | `packages/dev-engine/addon/extension.js` |

## Ver también

* [Servicio de Registro](https://fleetbase.io/docs/extension-development/universe/registry-service)
  — para contribuciones de componentes (componentes renderizables)
* [`MenuItem`
  contrato](https://fleetbase.io/docs/extension-development/reference/contracts#menuitem)
  — tabla completa de propiedades
* [`MenuPanel`
  contrato](https://fleetbase.io/docs/extension-development/reference/contracts#menupanel)

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/services/universe/menu-service.js` | Implementación de MenuService |
| `addon/contracts/menu-item.js` | `MenuItem` |
| `addon/contracts/menu-panel.js` | `MenuPanel` |

[Visión general

El UniverseService es la fachada de extensibilidad central en @fleetbase/ember-core. Expone sub-servicios para menús, registros, vistas de recursos, widgets, hooks y motores, y es el único punto de entrada que utiliza tu extensión para integrarse en la consola.](https://fleetbase.io/docs/extension-development/universe/overview)
[Hook Service

Aproveche los eventos del ciclo de vida de la plataforma utilizando "hooks" para ejecutar la lógica en puntos clave de la aplicación: inicio de sesión, transiciones de ruta, arranque de la consola y eventos personalizados que usted mismo crea.](https://fleetbase.io/docs/extension-development/universe/hook-service)