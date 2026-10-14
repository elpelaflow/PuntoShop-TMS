---
title: "Rutas Virtuales"
url: https://fleetbase.io/docs/extension-development/frontend/virtual-routes
module: extension-development
---

# Rutas Virtuales

Cómo Fleetbase resuelve URLs dinámicamente registradas contra los registros de elementos de menú para renderizar componentes de extensión sin rutas codificadas.

# Rutas Virtuales

Fleetbase viene con un conjunto fijo de rutas de consola:
`/console`
,
`/console/settings`
,
`/console/admin`
,
`/console/account`
, etc. Las extensiones no pueden agregar a esta tabla de rutas en tiempo de ejecución.
**Rutas virtuales**
son la forma en que las extensiones registran páginas: un elemento de menú declara un
`slug`
más un componente, y una ruta virtual incorporada en el host renderiza ese componente cuando la URL coincide.

No existe la bandera
`_virtual: true`. "Virtual" es una propiedad de la
*ruta*
que apunta el elemento de menú, no del propio elemento de menú.

## Las Rutas Virtuales Incorporadas

La consola define cuatro rutas virtuales: una para cada registro que admita el renderizado virtual:

| Ruta | Registro | Utilizado por |
|---|---|---|
| `console.virtual` (ruta `/:section/:slug`) | `'console'` | Páginas de nivel superior personalizadas registradas mediante `menuService.registerMenuItem('console', …)` |
| `console.settings.virtual` (ruta `/:slug`) | `'console:settings'` | Páginas de configuración — `menuService.registerSettingsMenuItem(…)` |
| `console.admin.virtual` (ruta `/:slug`) | `'console:admin'` | Páginas de administración — `menuService.registerAdminMenuItem(…)` |
| `console.account.virtual` (ruta `/:slug`) | `'console:account'` | Páginas con ámbito de cuenta |

Cada una utiliza el
`model`
para llamar a
`menuService.lookupMenuItem(registry, slug, view)`
y devuelve el
`MenuItem`
registrado. El modelo renderiza
`@model.component`
dentro del navegador estándar:

```
{{!-- console/templates/console/settings/virtual.hbs --}}
<Layout::Section::Header @title={{@model.title}} />
<Layout::Section::Body>
    <LazyEngineComponent
        @component={{@model.component}}
        @params={{@model.componentParams}}
    />
</Layout::Section::Body>
```

`LazyEngineComponent`
es lo que cruza el límite del motor: carga el motor propietario del componente bajo demanda y lo renderiza directamente.

## Registrar una Página Virtual

Seleccione el registrador adecuado para el registro que desea. El
`slug`
se convierte en la sección de la URL;
`component`
es el
`ExtensionComponent`
que se renderiza.

```
// addon/extension.js
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService = universe.getService('menu');

        // Agrega /console/settings/my-extension que renderiza el componente del motor
        menuService.registerSettingsMenuItem(
            new MenuItem({
                title: 'My Extension',
                icon: 'gear',
                slug: 'my-extension',
                view: 'index',
                component: new ExtensionComponent(
                    '@my-org/my-extension-engine',
                    'my-extension-settings'
                ),
            })
        );
    },
};
```

Cuando el usuario hace clic en el elemento de menú, o visita
`/console/settings/my-extension`
directamente, la ruta
`console.settings.virtual`
del host resuelve el slug contra el registro
`'console:settings'`, encuentra su elemento de menú y renderiza su componente.

## Cómo las Rutas se Muestran en la Ruta Virtual

Cada registrador ya conecta el
`route`
del elemento de menú a la ruta virtual correspondiente, por lo que normalmente no tiene que configurarlo usted mismo:

| Registrador | Ruta predeterminada |
|---|---|
| `registerSettingsMenuItem` | `console.settings.virtual` |
| `registerAdminMenuItem` | `console.admin.virtual` |
| `registerOrganizationMenuItem` | `console.account.virtual` |
| `registerMenuItem('console', …)` | `console.virtual` |

Puede anular la
`route`
en el elemento de menú si su extensión posee una ruta de motor real y desea que el elemento de menú navegue allí, pero entonces el slug se ignora y no hay renderizado virtual. Es simplemente un enlace, no una ruta virtual.

## Transición Programática

Si maneja
`onClick`
usted mismo, utilice
`console.settings.virtual`
con el slug:

```
new MenuItem({
    title: 'My Extension',
    slug: 'my-extension',
    component: new ExtensionComponent('@my-org/my-extension-engine', 'my-extension-settings'),
    onClick: (menuItem) => {
        const router = app.lookup('service:router');
        return router.transitionTo('console.settings.virtual', menuItem.slug);
    },
});
```

El ayudante
`transitionMenuItem(route, menuItem)`
en
`UniverseService`
hace esto teniendo en cuenta los parámetros de consulta
`section`
,
`slug`
y
`view`:

```
universe.transitionMenuItem('console.settings.virtual', menuItem);
```

## Rutas Virtuales de Motor

Algunos motores también exponen sus propias rutas virtuales. Fleet-Ops lo hace para los detalles del pedido para que otras extensiones puedan adjuntar una pestaña allí:

```
// packages/fleetops/addon/routes.js
this.route('orders', { path: '/' }, function () {
    this.route('details', { path: '/:public_id' }, function () {
        this.route('virtual', { path: '/:slug' });
    });
});
```

Luego, otras extensiones registran un elemento de menú en
`'fleet-ops:component:order:details'`
con
`route: 'operations.orders.index.details.virtual'`, y el modelo de Fleet-Ops renderiza el mismo
`<LazyEngineComponent>`
patrón. Consulte
`ledger/addon/extension.js:92`
para un ejemplo de cómo registrar una pestaña "Invoice" en la ruta virtual de detalles del pedido de Fleet-Ops.

## ¿Por Qué Existen las Rutas Virtuales?

El enrutador de Ember está construido en tiempo de compilación: una vez que se ha compilado la consola, ninguna extensión puede agregar una nueva ruta. Las rutas virtuales lo invierten: hay una única ranura abierta para cada registro, y las extensiones registran
*qué debe renderizarse*
en esa ranura, utilizando el slug como clave. El elemento de menú es tanto la entrada de navegación como los datos de la ruta.

En resumen: las extensiones agregan nuevas páginas al panel sin bifurcar el enrutador, y los enlaces profundos funcionan porque la URL es un estado de enrutador Ember real, no un redireccionamiento sintético.

## Fuente

| Archivo | Descripción |
|---|---|
| [`console/app/routes/console/settings/virtual.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/console/app/routes/console/settings/virtual.js) | Ruta virtual de configuración |
| [`console/app/routes/console/admin/virtual.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/console/app/routes/console/admin/virtual.js) | Ruta virtual de administración |
| [`console/app/templates/console/settings/virtual.hbs`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/console/app/templates/console/settings/virtual.hbs) | Renderiza `<LazyEngineComponent>` |
| `addon/services/universe/menu-service.js` | `lookupMenuItem` , rutas predeterminadas por registrador |