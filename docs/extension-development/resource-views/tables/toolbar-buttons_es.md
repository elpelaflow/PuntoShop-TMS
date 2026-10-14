---
title: "Botones de la barra de herramientas"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons
module: extension-development
---

Vistas de recursos

Vistas de tablas

# Botones de la barra de herramientas

Añadir un botón a la cabecera de otra tabla con ActionButton — un botón simple, un menú desplegable de acciones, o su propio componente — con todas las opciones y métodos.

# Botones de la barra de herramientas

Un botón de la barra de herramientas se encuentra en la cabecera de la tabla, después de los botones propios de la tabla, como
**Nuevo**
y
**Exportar**
. Puede ser un botón simple, un menú desplegable de acciones, o un componente propio.

```
import { ActionButton } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'iam:user:table:actions',
    new ActionButton({ id: 'acme-import-users', text: 'Importar desde Acme', icon: 'descargar' })
        .withPermission('iam crear usuario')
        .withHandler((ctx) => ctx.owner.lookup('service:modals-manager').show('modals/acme-user-import', { title: 'Importar usuarios desde Acme' }))
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:table:actions` |
| **Contrato** | `ActionButton` , de `@fleetbase/ember-core/contracts` |
| **Manejador** | `onClick(ctx)` |
| **Verificación de visibilidad** | `isVisible(ctx)` , cuando se renderiza la tabla |
| **Ubicación predeterminada** | Después de los botones propios de la tabla |
| **Sin permiso** | Se muestra desactivado |

## Opciones

Propiedad

Tipo

`id`

cadena

`text
?`

cadena

`icon
?`

cadena

`iconPrefix
?`

cadena

`type
?`

'default' | 'primary' | 'secondary' | 'magic' | 'danger' | 'warning' | 'success' | 'link'

`size
?`

'xs' | 'sm' | 'md' | 'lg'

`helpText
?`

cadena

`onClick
?`

(ctx) => void

`items
?`

ResourceAction[]

`component
?`

cadena | ExtensionComponent

`isVisible
?`

(ctx) => boolean

`permission
?`

cadena

`disabled
?`

booleano

`wrapperClass
?`

cadena

`before
?`

cadena

`after
?`

cadena

`index
?`

número

`priority
?`

número

## Métodos

| Método | Establece | Ejemplo |
|---|---|---|
| `withText(text)` | `text` | `.withText('Importar')` |
| `withIcon(icon, prefix?)` | `icon` , y `iconPrefix` si se proporciona | `.withIcon('descargar')` |
| `withHandler(fn)` | `onClick` | `.withHandler((ctx) => abrirImport(ctx))` |
| `withItems(items)` | `items` | `.withItems([new ResourceAction(…), …])` |
| `withComponent(component)` | `component` | `.withComponent(new ExtensionComponent('@acme/engine', 'acme-sync-status'))` |
| `visibleWhen(fn)` | `isVisible` | `.visibleWhen((ctx) => isEnabled(ctx))` |
| `withPermission(permission)` | `permission` | `.withPermission('acme importar usuarios')` |
| `before(id)`, `after(id)`, `withIndex(index)`, `withPriority(priority)` | Posicionamiento | `.before('crear')` |

## Tres tipos de botón

### Un botón simple

`onClick`
recibe el
[contexto de la vista](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)
. En una tabla, esto incluye
`controlador`
y
`getSelectedRows()`
:

```
new ActionButton({ id: 'acme-sync', text: 'Sincronizar con Acme', icon: 'rotar' })
    .withHandler(async (ctx) => {
        await ctx.owner.lookup('service:fetch').post('sync/drivers', {}, { namespace: 'acme/int/v1' });
        ctx.owner.lookup('service:router').refresh();
    });
```

### Un menú desplegable

Dar al botón
`items`
, cada uno un
`ResourceAction`
. El manejador de un elemento recibe
`(ctx.resource, ctx)`
; en una tabla no hay un registro individual, así que use el contexto:

```
import { ActionButton, ResourceAction } from '@fleetbase/ember-core/contracts';

new ActionButton({ id: 'acme-menu', text: 'Acme', icon: 'nube' }).withItems([
    new ResourceAction({ id: 'acme-sync-all', label: 'Sincronizar todo' }).withHandler((resource, ctx) => sincronizarTodo(ctx)),
    new ResourceAction({ id: 'acme-sync-log', label: 'Sincronizar registro' }).withHandler((resource, ctx) => abrirRegistro(ctx)),
    new ResourceAction({ id: 'acme-divider', separator: true }),
    new ResourceAction({ id: 'acme-settings', label: 'Configuración de Acme…' }).withHandler((resource, ctx) => abrirConfiguración(ctx)),
]);
```

### Su propio componente

Para cualquier cosa que un botón no pueda hacer, como un indicador de estado en vivo o un interruptor, renderice un componente de su motor:

```
import { ActionButton, ExtensionComponent } from '@fleetbase/ember-core/contracts';

new ActionButton({ id: 'acme-sync-status' }).withComponent(new ExtensionComponent('@acme/engine', 'acme-sync-status'));
```

El componente recibe las opciones del botón como argumentos, incluyendo
`@text`
,
`@icon`
,
`@size`
,
`@items`
,
`@permission`
,
`@disabled`
y
`@onClick`
.

```
// addon/components/acme-sync-status.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class AcmeSyncStatusComponent extends Component {
    @service('acme-sync') acmeSync; // un servicio en su propio motor

    get connected() {
        return this.acmeSync.connected;
    }
}
```

```
{{! addon/components/acme-sync-status.hbs }}
<div class="flex items-center space-x-2 text-sm">
    <span class="h-2 w-2 rounded-full {{if this.connected 'bg-green-500' 'bg-gray-400'}}"></span>
    <span>{{if this.connected "Acme conectado" "Acme desconectado"}}</span>
</div>
```

## Ejemplos

### Solo icono

```
new ActionButton({ id: 'acme-help', icon: 'círculo-pregunta', helpText: 'Cómo funciona la sincronización de Acme' })
    .withHandler((ctx) => window.open('https://acme.example.com/help', '_blank'));
```

### Solo cuando esté configurada su integración

```
new ActionButton({ id: 'acme-import', text: 'Importar desde Acme', icon: 'descargar' })
    .visibleWhen((ctx) => ctx.owner.lookup('service:current-user').getOption('acme.connected') === true);
```

### Antes de un botón incorporado

```
new ActionButton({ id: 'acme-import', text: 'Importar desde Acme', icon: 'descargar' }).before('exportar');
```

Los IDs de los botones incorporados, como
`refresh`
,
`create`
y
`export`
, se enumeran por tabla en el
[Catálogo de registro](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
.

## Relacionado

* [Botones de la barra de herramientas](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons)
  : el mismo contrato, en una vista de detalles.
* [Acciones en lotes](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions)
  : acciones en las filas seleccionadas.