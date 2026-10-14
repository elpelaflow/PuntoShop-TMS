---
title: "Acciones para Filas"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions
module: extension-development
---

Vistas de Recursos

Vistas de Tablas

# Acciones para Filas

Agrega un elemento al menú "…" en cada fila de otra tabla con ResourceAction — todas las opciones y métodos, el controlador, visibilidad por fila, permisos, separadores y descripciones.

# Acciones para Filas

Una acción para una fila es un elemento en el menú "…" al final de cada fila de la tabla. Al hacer clic, se ejecuta tu controlador con el registro de esa fila.

```
import { ResourceAction } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:order:table:row-actions',
    new ResourceAction({ id: 'acme-print-label', label: 'Imprimir etiqueta de envío', icon: 'print' })
        .withHandler((order, ctx) => ctx.owner.lookup('service:fetch').post('labels', { order: order.id }, { namespace: 'acme/int/v1' }))
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:table:row-actions` |
| **Contract** | `ResourceAction` , from `@fleetbase/ember-core/contracts` |
| **Handler** | `fn(row, ctx)` |
| **Verificación de visibilidad** | `isVisible(row, ctx)` , para cada fila |
| **Ubicación predeterminada** | Justo encima del elemento "Eliminar" incorporado |
| **Sin permiso** | Mostrado como deshabilitado, con una descripción "no autorizado" |

## Opciones

Propiedad

Tipo

`id`

string

`label
?`

string

`icon
?`

string

`iconPrefix
?`

string

`iconClass
?`

string

`class
?`

string

`fn
?`

(row, ctx) => void

`isVisible
?`

(row, ctx) => boolean

`permission
?`

string

`disabled
?`

boolean

`helpText
?`

string

`separator
?`

boolean

`before
?`

string

`after
?`

string

`index
?`

number

`priority
?`

number

## Métodos

| Método | Establece | Ejemplo |
|---|---|---|
| `withLabel(label)` | `label` | `.withLabel('Imprimir etiqueta')` |
| `withIcon(icon, prefix?)` | `icon` , y `iconPrefix` si se proporciona | `.withIcon('print')` |
| `withHandler(fn)` | `fn` | `.withHandler((row, ctx) => print(row))` |
| `visibleWhen(fn)` | `isVisible` | `.visibleWhen((row) => row.status !== 'canceled')` |
| `withPermission(permission)` | `permission` | `.withPermission('acme print label')` |
| `before(id)` , `after(id)` | Ubicación | `.before('delete')` |
| `withIndex(index)` , `withPriority(priority)` | Ubicación | `.withIndex(0)` |

## El Controlador

`fn`
recibe el
**registro de la fila**
y el
[contexto de la vista](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)
:

```
.withHandler(async (order, ctx) => {
    const fetch = ctx.owner.lookup('service:fetch');
    const notifications = ctx.owner.lookup('service:notifications');

    try {
        await fetch.post('labels', { order: order.id }, { namespace: 'acme/int/v1' });
        notifications.success(`Etiqueta para ${order.tracking} enviada a la impresora.`);
    } catch (error) {
        notifications.serverError(error);
    }
});
```

El menú se cierra tan pronto como se hace clic en el elemento; no espera a que se ejecute tu controlador.

## Ejemplos

### Solo para Algunas Filas

```
new ResourceAction({ id: 'acme-reopen', label: 'Reabrir', icon: 'rotate-left' })
    .visibleWhen((order) => order.status === 'canceled')
    .withHandler((order, ctx) => reopen(order, ctx));
```

### Abrir un Modal

```
new ResourceAction({ id: 'acme-add-note', label: 'Añadir nota de Acme', icon: 'note-sticky' })
    .withHandler((vehicle, ctx) => {
        const modalsManager = ctx.owner.lookup('service:modals-manager');
        modalsManager.show('modals/acme-note', { title: `Nota para ${vehicle.display_name}`, vehicle });
    });
```

El componente del modal (
`modals/acme-note`
) debe poder ser encontrado por la consola. Regístralo desde tu motor; consulta
[Registry Service](https://fleetbase.io/docs/extension-development/universe/registry-service)
.

### Un Grupo con un Separador

```
views.register('fleet-ops:vehicle:table:row-actions', [
    new ResourceAction({ id: 'acme-divider', separator: true }).withPriority(1),
    new ResourceAction({ id: 'acme-ping', label: 'Ping al rastreador', icon: 'satellite-dish' }).withPriority(2).withHandler(ping),
    new ResourceAction({ id: 'acme-history', label: 'Historial del rastreador', icon: 'clock-rotate-left' }).withPriority(3).withHandler(history),
]);
```

Los tres deben estar encima de
**Eliminar**, en orden de prioridad: un separador, luego tus dos elementos.

### Primero en el Menú

```
new ResourceAction({ id: 'acme-open', label: 'Abrir en Acme', icon: 'arrow-up-right-from-square' })
    .withIndex(0)
    .withHandler(window.open(`https://acme.example.com/records/${row.public_id}`, '_blank'));
```

### Colocado al lado de un Elemento Incorporado

```
views.register(
    'fleet-ops:driver:table:row-actions',
    new ResourceAction({ id: 'acme-assign-route', label: 'Asignar ruta de Acme', icon: 'route' })
        .after('assign-vehicle')
        .withHandler(assignRoute)
);
```

Los ids incorporados para cada fila de la tabla están en el
[Catalogue de Menús](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
.

## Relacionado

* [Acciones para Múltiples Filas](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions)
  : la misma acción, para múltiples filas a la vez.
* [Elementos del Menú](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
  : la misma acción, en una vista de detalles.