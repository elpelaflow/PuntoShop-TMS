---
título: "Acciones masivas"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions
módulo: extension-development
---

Vistas de recursos

Vistas de tablas

# Acciones masivas

Agrega un elemento al menú de "Acciones masivas" de una tabla utilizando ResourceAction: ejecuta tu función para las filas seleccionadas, con opciones, ejemplos y cómo manejar las selecciones para las que no aplica.

# Acciones masivas

Una acción masiva es un elemento en el
**menú de "Acciones masivas"**, que aparece en la cabecera de la tabla una vez que se selecciona al menos una fila. Al hacer clic, se ejecuta tu función para cada fila seleccionada.

```
import { ResourceAction } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'fleet-ops:order:table:bulk-actions',
    new ResourceAction({ id: 'acme-export', label: 'Enviar a Acme', icon: 'paper-plane' })
        .withHandler(async (orders, ctx) => {
            await ctx.owner.lookup('service:fetch').post('exports', { orders: orders.map((order) => order.id) }, { namespace: 'acme/int/v1' });
            ctx.owner.lookup('service:notifications').success(`${orders.length} órdenes enviadas a Acme.`);
        })
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:table:bulk-actions` |
| **Contract** | `ResourceAction` , from `@fleetbase/ember-core/contracts` |
| **Handler** | `fn(selectedRows, ctx)` |
| **Visibilidad** | No soportado |
| **Ubicación predeterminada** | Al final del menú |
| **Sin permisos** | Se muestra deshabilitado, con un tooltip "no autorizado" |

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

`class
?`

string

`fn
?`

(selectedRows, ctx) => void

`permission
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

| Método | Establece |
| --- | --- |
| `withLabel(label)` | `label` |
| `withIcon(icon, prefix?)` | `icon` , y `iconPrefix` si se proporciona |
| `withHandler(fn)` | `fn` |
| `withPermission(permission)` | `permission` |
| `before(id)` , `after(id)` , `withIndex(index)` , `withPriority(priority)` | Ubicación |

`visibleWhen()`
está disponible en el contrato, pero el menú de "Acciones masivas" no lo utiliza: una acción masiva siempre se muestra.

## El Handler

`fn`
recibe un
**array de los registros seleccionados**,
que se lee al hacer clic, y el
[contexto de la vista](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)
.

### Selecciones para las que no aplica la acción

Dado que una acción masiva siempre se muestra, verifica la selección tú mismo y avisa al usuario:

```
.withHandler(async (orders, ctx) => {
    const notifications = ctx.owner.lookup('service:notifications');
    const eligible = orders.filter((order) => order.status === 'completed');

    if (eligible.length === 0) {
        return notifications.warning('Solo las órdenes completadas se pueden facturar.');
    }

    await invoice(eligible, ctx);

    const skipped = orders.length - eligible.length;
    notifications.success(`${eligible.length} facturadas, ${skipped ? `, ${skipped} no facturadas` : ''}.`);
});
```

### Solicitando confirmación

```
.withHandler((drivers, ctx) => {
    const modalsManager = ctx.owner.lookup('service:modals-manager');

    modalsManager.confirm({
        title: `Recalcular 9 puntuaciones de seguridad?`,
        body: 'Las puntuaciones se recalculan a partir de los últimos 90 días de viajes.',
        acceptButtonText: 'Recalcular',
        confirm: async (modal) => {
            modal.startLoading();
            await recalculate(drivers, ctx);
            modal.done();
        },
    });
});
```

### Limpiando la selección posteriormente

`ctx.table`
es el componente de la tabla; su selección se puede limpiar una vez que se ha completado el trabajo:

```
.withHandler(async (rows, ctx) => {
    await archive(rows, ctx);
    ctx.table?.untoggleSelectAll?.();
    ctx.owner.lookup('service:router').refresh();
});
```

## Relacionado

* [Acciones de fila](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
  : la misma acción, para una sola fila.
* [Handlers y Contexto](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)

[Acciones de fila

Agrega un elemento al menú "…" en cada fila de otra tabla con ResourceAction — cada opción y método, la función, por fila, permisos, separadores y tooltips.](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
[Botones de la barra de herramientas

Agrega un botón al encabezado de otra tabla con ActionButton — un botón simple, un menú desplegable de acciones o tu propio componente — con cada opción y método.](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons)