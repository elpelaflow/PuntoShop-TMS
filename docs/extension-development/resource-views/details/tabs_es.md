---
título: "Pestañas"
url: https://fleetbase.io/docs/extension-development/resource-views/details/tabs
módulo: extension-development
---

Vistas de recursos

Vistas de detalles

# Pestañas

Añade una pestaña a la vista de detalles de otro motor utilizando MenuItem, un componente de tu motor, renderizado con el registro, las rutas que utiliza, los argumentos que recibe y el alias de las pestañas de detalles.

# Pestañas

Una pestaña añade una página propia a la vista de detalles de un registro, junto a pestañas como
**Resumen**
y
**Actividad**. Renderiza un componente de tu motor, con el registro.

```
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:driver:details:tabs',
    new MenuItem({
        title: 'Seguridad',
        slug: 'acme-safety',
        icon: 'shield-halved',
        route: 'management.drivers.index.details.virtual',
        component: new ExtensionComponent('@acme/safety-engine', 'driver-safety-tab'),
    })
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:details:tabs` |
| **Contract** | `MenuItem` , from `@fleetbase/ember-core/contracts` |
| **Keyed by** | `slug` |
| **Default spot** | Después de las pestañas propias de la vista |

## Opciones

Propiedad

Tipo

`title`

string

`slug
?`

string

`icon
?`

string

`route
?`

string

`component`

ExtensionComponent

`componentParams
?`

object

`priority
?`

number

`MenuItem`
tiene más opciones, utilizadas en menús en otros lugares de la consola; ver
[Servicio de menú](https://fleetbase.io/docs/extension-development/universe/menu-service)
.

## La ruta

En una página de detalles con ruta, una pestaña es un enlace al
**virtual**
ruta del motor para esa vista, que renderiza tu componente con el slug en la URL. Estas vistas de detalles tienen una:

| Vista de detalles | `route` |
| --- | --- |
| Órdenes de Fleet-Ops | `operations.orders.index.details.virtual` |
| Conductores de Fleet-Ops | `management.drivers.index.details.virtual` |
| Vehículos de Fleet-Ops | `management.vehicles.index.details.virtual` |
| Flotas de Fleet-Ops | `management.fleets.index.details.virtual` |
| Lugares de Fleet-Ops | `management.places.index.details.virtual` |
| Dispositivos de Fleet-Ops | `connectivity.devices.index.details.virtual` |
| Sensores de Fleet-Ops | `connectivity.sensors.index.details.virtual` |
| Facturas de Ledger | `billing.invoices.index.details.virtual` |

## Tu componente de pestaña

```
{{! addon/components/driver-safety-tab.hbs }}
<div class="p-4 space-y-4">
    <h3 class="text-lg font-semibold">Puntuación de seguridad: {{this.score}}</h3>
    <Table @rows={{this.incidents}} @columns={{this.columns}} />
</div>
```

| Argumento | Valor |
| --- | --- |
| `@resource` | El registro |
| `@params` | Los `componentParams` de la pestaña |

El registro también se pasa con el nombre propio del recurso, como
`@driver`
o
`@order`
. Prefiere
`@resource`
, para que un solo componente pueda servir a varias vistas.

## El alias

Las pestañas existían antes de los registros de vistas de recursos, con el nombre
`<extension>:component:<resource>:details`
, registrados a través del
[Servicio de menú](https://fleetbase.io/docs/extension-development/universe/menu-service)
. El
`details:tabs`
nombre es un
**alias**
para ello:

```
// Estas dos se registran en el mismo lugar
views.register('fleet-ops:driver:details:tabs', tab);
universe.getService('menu').registerMenuItem('fleet-ops:component:driver:details', tab);

// El atajo
views.registerDetailsTab('fleet-ops', 'driver', tab);
```

Las pestañas registradas de esta manera aparecen juntas, y
`views.get('fleet-ops:driver:details:tabs')`
las lista todas. Para eliminar una, desregistra su
**slug**:

```
views.unregister('fleet-ops:driver:details:tabs', 'acme-safety');
```

## Relacionado

* [Rutas virtuales](https://fleetbase.io/docs/extension-development/frontend/virtual-routes)
  : cómo se renderiza un elemento del menú.
* [Servicio de menú](https://fleetbase.io/docs/extension-development/universe/menu-service)

[Elementos del menú

Añade un elemento al menú "…" en el encabezado de detalles de otro motor utilizando ResourceAction, el registro que recibe, las comprobaciones de visibilidad, la colocación por encima de "Eliminar" y la razón para comprobar los permisos en la comprobación de visibilidad.](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
[Resumen

Cada registro de vista de recursos declara los motores incorporados — una página por motor, con los nombres de registro, los ids incorporados y un enlace a la fuente que lo conecta.](https://fleetbase.io/docs/extension-development/resource-views/catalogue)