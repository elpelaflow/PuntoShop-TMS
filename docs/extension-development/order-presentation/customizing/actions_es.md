---
title: "Acciones"
url: https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions
module: extension-development
---

Presentación de Pedidos

Personalización

# Acciones

Ocultar las acciones integradas de Fleet-Ops en la tabla de pedidos y en el menú de detalles del pedido, como "asignar conductor", "cancelar", "eliminar" y más, para el tipo de pedido deseado, utilizando `hidden.actions`.

# Acciones

`hidden.actions`
elimina las acciones integradas de Fleet-Ops, por ID, de:

* **la tabla de pedidos**
  : el menú "…" de cada fila;
* **la vista de detalles del pedido**
  : el menú "…" del encabezado.

```
hidden: {
    actions: ['asignar-conductor', 'desasignar-conductor', 'ver-etiqueta'],
},
```

## IDs de Acciones

| ID | Acción | Tabla de pedidos | Menú de detalles |
| --- | --- | --- | --- |
| `ver` | Ver pedido | ✓ |  |
| `asignar-conductor` | Asignar conductor | ✓ |  |
| `desasignar-conductor` | Desasignar conductor | ✓ | ✓ |
| `editar-detalles-pedido` | Editar detalles |  | ✓ |
| `actualizar-actividad` | Actualizar actividad |  | ✓ |
| `ver-etiqueta` | Ver etiqueta del pedido |  | ✓ |
| `escuchar-canal-socket` | Escuchar canal de socket |  | ✓ |
| `ver-metadatos` | Ver metadatos |  | ✓ |
| `cancelar` | Cancelar pedido | ✓ | ✓ |
| `eliminar` | Eliminar pedido | ✓ | ✓ |

Estos son los mismos IDs que utilizan las vistas de pedidos en sus
[registros de vistas de recursos](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops#order)
, por lo que
`hidden.actions: ['cancelar']`
y otra extensión,
`.before('cancelar')`
se refieren a la misma acción.

Los IDs se coinciden exactamente.
`asignar-conductor`
y
`desasignar-conductor`
son dos acciones: el menú muestra una u otra dependiendo de si el pedido tiene un conductor, por lo que se ocultan ambas si ninguna de las dos aplica.

El menú de detalles elimina los separadores que se dejan al principio, al final o uno al lado del otro al ocultar.

## Ejemplos

### Un tipo de pedido que nunca se envía

```
hidden: {
    actions: ['asignar-conductor', 'desasignar-conductor', 'ver-etiqueta'],
},
```

### Uno que no se puede eliminar desde la consola

```
hidden: {
    actions: ['eliminar'],
},
```

### Uno que se gestiona completamente desde sus propias pantallas

```
hidden: {
    actions: ['asignar-conductor', 'desasignar-conductor', 'editar-detalles-pedido', 'actualizar-actividad', 'cancelar', 'eliminar'],
},
```

## Sus Propias Acciones

Ocultar se aplica a las acciones integradas de Fleet-Ops. Para
**añadir**
una acción para su tipo de pedido, regístrela en los registros de vistas de recursos de las vistas de pedidos, y muéstrela solo para sus pedidos:

```
import { ResourceAction } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:pedido:detalles:menu',
    new ResourceAction({ id: 'acme-extend-rental', label: 'Extender alquiler…', icon: 'calendar-plus' })
        .before('cancelar')
        .visibleWhen((pedido) => pedido.order_config?.meta?.presentation_profile === 'acme-rental')
        .withHandler((pedido, ctx) => openExtendDialog(pedido, ctx))
);
```

La comprobación lee directamente la configuración del pedido
`meta`
: los manejadores se ejecutan en el contexto de la consola, donde el servicio de Fleet-Ops
`order-presentation`
no está disponible. Consulte
[Elementos del menú](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
y
[Acciones de fila](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
.

**Ocultar una acción no es una autorización.**
El punto final de la API de la acción sigue funcionando para cualquier persona que tenga permiso para llamarla. Para impedir que se envíe un tipo de pedido o que se mueva a actividades fuera de su flujo, proporcione una
[vida útil configurada](https://fleetbase.io/docs/extension-development/order-lifecycles)
a su configuración con
`asignar: false`
y
`transitions_strictas: true`
, que la API hace cumplir.

[La Vista de Detalles

Cree la vista de detalles del pedido para su tipo de pedido con secciones de detalles —secciones nativas de Fleet-Ops por nombre y las suyas— con los argumentos que reciben sus secciones, actualizando después de los cambios, y un resumen con botones de siguiente paso.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view)
[Borradores y Validación

Prepare un nuevo pedido cuando un usuario lo cambia a su tipo de pedido y limpie cuando lo cambian de vuelta, con prepare y release, y requiera sus propios campos antes de guardar un pedido, con reglas de validación de creación de pedidos.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation)