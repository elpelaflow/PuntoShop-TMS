---
title: "Elementos del menú"
url: https://fleetbase.io/docs/extension-development/resource-views/details/menu-items
module: extension-development
---

Vistas de recursos

Vistas de detalles

# Elementos del menú

Agrega un elemento al menú "…" en el encabezado de detalles de otro motor con ResourceAction — el registro al que se refiere, comprobaciones de visibilidad, ubicación arriba de "Eliminar" y por qué se debe verificar la autorización en la comprobación de visibilidad.

# Elementos del menú

Un elemento del menú es una entrada en el menú "…" del encabezado de una vista de detalles. Actúa sobre el registro que muestra la vista.

```
import { ResourceAction } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:vehicle:details:menu',
    new ResourceAction({ id: 'acme-ping-tracker', label: 'Seguimiento', icono: 'satellite-dish' })
        .visibleWhen((vehicle) => Boolean(vehicle.meta?.acme_tracker_id))
        .withHandler((vehicle, ctx) => ctx.owner.lookup('service:fetch').post(`trackers/${vehicle.meta.acme_tracker_id}/ping`, {}, { namespace: 'acme/int/v1' }))
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:details:menu` |
| **Contract** | `ResourceAction` , from `@fleetbase/ember-core/contracts` |
| **Handler** | `fn(record, ctx)` |
| **Comprobación de visibilidad** | `isVisible(record, ctx)` , cuando se renderiza la vista |
| **Ubicación predeterminada** | Justo arriba del elemento "Eliminar" integrado, o al final |
| **Sin autorización** | **No se verifica** : use la comprobación de visibilidad |

Los elementos del menú utilizan el mismo contrato que
[acciones de fila](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
; consulte esa página para todas las opciones y métodos. En un menú, se puede establecer el texto del elemento con
`label`
o
`text`
.

## Dónde va el elemento

* Si el encabezado de la vista tiene un menú "…", sus elementos se añaden a él.
* Si no, se añade un menú "…" para ellos.

En cualquier caso, los elementos se colocan como acciones de fila: arriba
**Eliminar**
por defecto, o donde
`before`
,
`after`
o
`index`
indique.

**`permission`
no se verifica para los elementos del menú.**
Para limitar quién puede ver uno, verifique la capacidad en la comprobación de visibilidad:

```
.visibleWhen((vehicle, ctx) => ctx.owner.lookup('service:abilities').can('acme ping tracker'))
```

## Ejemplos

### Varios elementos juntos

Registre un array para añadir un grupo, con un divisor delante:

```
views.register('fleet-ops:driver:details:menu', [
    new ResourceAction({ id: 'acme-divider', separator: true }).withPriority(1),
    new ResourceAction({ id: 'acme-flag', label: 'Marca para la formación', icono: 'flag' }).withPriority(2).withHandler(flag),
    new ResourceAction({ id: 'acme-history', label: 'Historial de seguridad', icono: 'clock-rotate-left' }).withPriority(3).withHandler(openHistory),
]);
```

### Abrir un modal para el registro

```
new ResourceAction({ id: 'acme-schedule-service', label: 'Programar el servicio…', icono: 'wrench' })
    .withHandler((vehicle, ctx) => {
        ctx.owner.lookup('service:modals-manager').show('modals/acme-schedule-service', {
            title: `Programar el servicio para ${vehicle.display_name}`,
            vehicle,
            acceptButtonText: 'Programar',
        });
    });
```

### Detalles del pedido

El menú "…" de detalles de "Pedidos" de Fleet-Ops tiene elementos integrados con ids, para que pueda colocar elementos entre ellos:

```
views.register(
    'fleet-ops:order:details:menu',
    new ResourceAction({ id: 'acme-reprint', label: 'Imprimir etiqueta Acme', icono: 'print' })
        .after('view-label')
        .withHandler((order, ctx) => reprint(order, ctx))
);
```

Los ids son
`edit-order-details`
,
`update-activity`
,
`assign-driver`
o
`unassign-driver`
,
`view-label`
,
`listen-to-socket-channel`
,
`view-metadata`
,
`cancel`
y
`delete`
.

## Relacionado

* [Botones de encabezado](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons)
* [Acciones de fila](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
  : todas las opciones para
  `ResourceAction`
* [Visibilidad y permisos](https://fleetbase.io/docs/extension-development/resource-views/visibility-and-permissions)

[Botones de encabezado

Añade un botón al encabezado de la vista de detalles de otro motor con ActionButton — el registro al que se refiere, comprobaciones de visibilidad, menús desplegables y tus propios componentes, y dónde aparecen las vistas de detalles.](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons)
[Pestañas

Añade una pestaña a la vista de detalles de otro motor con MenuItem — un componente de tu motor, renderizado con el registro, las rutas que utiliza, los argumentos que recibe, y el alias de las pestañas de detalles.](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)