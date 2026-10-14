---
title: "Botones en la cabecera"
url: https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons
module: extension-development
---

Vistas de Recursos

Vistas de Detalles

# Botones en la cabecera

Añade un botón a la cabecera de la vista de detalles de otro motor, utilizando `ActionButton` — el registro al que se aplica, la visibilidad según el registro, menús desplegables y tus propios componentes, y dónde aparecen las vistas de detalles.

# Botones en la cabecera

Un botón en la cabecera se encuentra en la cabecera de una vista de detalles, después de los propios botones de la vista. Se aplica al registro que muestra la vista, que recibe como
`ctx.resource`
.

```
import { ActionButton } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'ledger:invoice:details:actions',
    new ActionButton({ id: 'acme-send-to-erp', text: 'Enviar a ERP', icon: 'cloud-arrow-up' })
        .visibleWhen((ctx) => ctx.resource.status === 'paid')
        .withHandler((ctx) => ctx.owner.lookup('service:fetch').post('erp/invoices', { invoice: ctx.resource.id }, { namespace: 'acme/int/v1' }))
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:details:actions` |
| **Contract** | `ActionButton` , from `@fleetbase/ember-core/contracts` |
| **Handler** | `onClick(ctx)` , with the record as `ctx.resource` |
| **Visibility check** | `isVisible(ctx)` , when the view renders |
| **Default spot** | After the view's own buttons |
| **Without the permission** | Shown disabled |

Los botones en la cabecera utilizan el mismo contrato que
[los botones de la barra de herramientas](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons): todas las opciones y métodos listados aquí funcionan. La diferencia es el contexto: una vista de detalles coloca
**el registro**
en
`ctx.resource`
.

## Dónde aparecen las vistas de detalles

El mismo registro aparece dondequiera que el motor muestre ese registro:

| Motor | Vistas de detalles |
| --- | --- |
| Fleet-Ops | El panel de detalles enrutado, y el panel lateral que se abre desde una fila o desde el mapa |
| Ledger | El panel de detalles enrutado |
| IAM | El diálogo de edición: los botones aparecen en la parte inferior del diálogo |
| Desarrolladores | La página de detalles: los botones aparecen en su cabecera |

El
[Catálogo de registro](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
lista qué recursos tienen una vista de detalles.

## Ejemplos

### Dependiendo del registro

`isVisible`
se comprueba cuando se renderiza la vista, con el registro en
`ctx.resource`
:

```
new ActionButton({ id: 'acme-track-shipment', text: 'Rastrear con Acme', icon: 'location-crosshairs' })
    .visibleWhen((ctx) => Boolean(ctx.resource.meta?.acme_tracking_id))
    .withHandler((ctx) => window.open(`https://track.acme.example.com/${ctx.resource.meta.acme_tracking_id}`, '_blank'));
```

### Luego, refrescar el registro

```
new ActionButton({ id: 'acme-verify', text: 'Verificar licencia', icon: 'id-card' })
    .withHandler(async (ctx) => {
        await ctx.owner.lookup('service:fetch').post(`drivers/${ctx.resource.id}/verify`, {}, { namespace: 'acme/int/v1' });
        await ctx.resource.reload();
        ctx.owner.lookup('service:notifications').success('Licencia verificada.');
    });
```

### Un menú desplegable de acciones

Los elementos en el menú desplegable de un botón en la cabecera reciben
`(registro, ctx)`
:

```
import { ActionButton, ResourceAction } from '@fleetbase/ember-core/contracts';

new ActionButton({ id: 'acme-erp', text: 'ERP', icon: 'building-columns' }).withItems([
    new ResourceAction({ id: 'acme-erp-send', label: 'Enviar a ERP' }).withHandler((invoice, ctx) => send(invoice, ctx)),
    new ResourceAction({ id: 'acme-erp-open', label: 'Abrir en ERP' })
        .visibleWhen((invoice) => Boolean(invoice.meta?.erp_id))
        .withHandler((invoice) => window.open(`https://erp.example.com/invoices/${invoice.meta.erp_id}`, '_blank')),
]);
```

Para una o dos acciones, es preferible
[los elementos de menú](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items): se integran en el menú existente "…" de la vista en lugar de añadir otro botón.

### Tu propio componente

```
new ActionButton({ id: 'acme-score' }).withComponent(new ExtensionComponent('@acme/safety-engine', 'driver-score-chip'));
```

El componente recibe las opciones del botón como argumentos. Para mostrar algo sobre el registro, léelo de un servicio que tu extensión rellena, o pásalo a través de la clave
`options`
del botón, que llega como
`@options`
.

## Relacionado

* [Elementos de menú](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
* [Botones de la barra de herramientas](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons): todas las opciones y métodos del
  `ActionButton`
.
* [Manejadores y contexto](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)