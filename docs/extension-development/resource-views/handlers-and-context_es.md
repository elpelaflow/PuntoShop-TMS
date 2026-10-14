---
título: "Manejadores y Contexto"
url: https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context
módulo: extension-development
---

Vistas de Recursos

# Manejadores y Contexto

Cómo funcionan tus manejadores de clics y las comprobaciones de visibilidad — qué registros o registros reciben, y el contexto de la vista, incluyendo el propietario, el registro y el estado de la propia vista — y cómo acceder a los servicios desde ellos.

# Manejadores y Contexto

Las acciones y los botones ejecutan tu código cuando se hacen clic, y pueden realizar una comprobación para decidir si se muestran. Ambos reciben un
**objeto de contexto**
,
`ctx`
, que describe la vista en la que se encuentran.

## Qué recibe cada manejador

| Elemento | Manejador de clic | Comprobación de visibilidad |
|---|---|---|
| [Acción de fila](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions) | `fn(fila, ctx)` | `isVisible(fila, ctx)` |
| [Acción masiva](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions) | `fn(filasSeleccionadas, ctx)` | No soportado |
| [Botón de barra de herramientas](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons) | `onClick(ctx)` | `isVisible(ctx)` |
| [Botón de encabezado](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons) | `onClick(ctx)` | `isVisible(ctx)` |
| [Elemento de menú](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items) | `fn(registro, ctx)` | `isVisible(registro, ctx)` |
| Elemento en el menú desplegable de un botón | `fn(ctx.resource, ctx)` | `isVisible(ctx.resource, ctx)` |

Los defines utilizando los métodos del contrato:

```
new ResourceAction({ id: 'acme-sync', label: 'Sincronizar' })
    .withHandler((fila, ctx) => { /* … */ })   // establece fn
    .visibleWhen((fila, ctx) => true);         // establece isVisible

new ActionButton({ id: 'acme-import', text: 'Importar' })
    .withHandler((ctx) => { /* … */ })        // establece onClick
    .visibleWhen((ctx) => true);              // establece isVisible
```

## El Contexto

`ctx`
siempre tiene:

| Clave | Valor |
|---|---|
| `owner` | El propietario de la aplicación en la consola. `ctx.owner.lookup('service:…')` accede a cualquier servicio que tenga la consola |
| `registry` | El nombre completo del registro en el que se registró el elemento, como `fleet-ops:driver:table:row-actions` |
| `extension` | La primera parte del nombre, como `fleet-ops` |
| `resourceName` | La segunda parte del nombre, como `driver` |
| `surface` | `table` o `details` |
| `slot` | La última parte del nombre, como `row-actions` |

Además, lo que proporciona la vista:

| Vista | Claves adicionales |
|---|---|
| Tablas | `controller` : el controlador de índice. `table` : el componente de la tabla, una vez renderizado. `getSelectedRows()` : las filas seleccionadas actualmente |
| Paneles de detalles y paneles laterales | `resource` : el registro mostrado. `panel` : el panel, una vez abierto |
| Páginas de detalles del desarrollador | `resource` , `controller` |
| Diálogos de edición de IAM | `resource` |

Algunas claves se leen
**cuando se ejecuta tu manejador**, no cuando se renderiza la vista:
`table`
y
`panel`
solo existen después del primer renderizado, así que léalas dentro del manejador en lugar de almacenarlas.

## Acceder a los servicios

`ctx.owner`
es el propietario de la consola. Accede a los servicios a través de él:

```
.withHandler(async (orden, ctx) => {
    const fetch = ctx.owner.lookup('service:fetch');
    const notifications = ctx.owner.lookup('service:notifications');

    await fetch.post('labels', { order: order.id }, { namespace: 'acme/int/v1' });
    notifications.success('Etiqueta enviada a la impresora.');
});
```

Los servicios que cualquier extensión puede acceder de esta manera incluyen
`fetch`
,
`notifications`
,
`modals-manager`
,
`store`
,
`current-user`
,
`abilities`
,
`intl`
y
`router`
.

**Los servicios en tu propio motor no están en el propietario de la consola.**
`ctx.owner.lookup('service:acme-labels')`
devuelve
`undefined`
si
`acme-labels`
solo existe dentro de tu motor. Registra el servicio con la consola primero, desde
`setupExtension`
, con
`universe.getService('registry').registerService('acme-labels', AcmeLabelsService)`
. Consulta
[Registry Service](https://fleetbase.io/docs/extension-development/universe/registry-service)
. O mantén el manejador auto-contenido, utilizando solo los servicios de la consola.

## Manejadores Asíncronos

Los manejadores pueden ser
`async`
. La vista no espera a que se ejecuten, así que proporciona tu propio feedback: una notificación cuando se completa, o un modal mientras se está ejecutando.

```
.withHandler(async (filas, ctx) => {
    const notifications = ctx.owner.lookup('service:notifications');
    try {
        await ctx.owner.lookup('service:fetch').post('exports', { ids: filas.map((fila) => fila.id) }, { namespace: 'acme/int/v1' });
        notifications.success(`${filas.length} registros exportados.`);
    } catch (error) {
        notifications.serverError(error);
    }
});
```

## Actualizar la vista

Después de cambiar los registros, actualiza lo que muestra la vista:

```
// Una tabla: refresca la ruta actual, que recarga sus registros
.withHandler(async (fila, ctx) => {
    await doSomething(fila);
    ctx.owner.lookup('service:router').refresh();
});

// Una vista de detalles: recarga el registro
.withHandler(async (ctx) => {
    await doSomething(ctx.resource);
    await ctx.resource.reload();
});
```

[Ubicación

Controla dónde aparecen tus columnas, acciones y botones dentro de los propios elementos de una vista — antes o después de otro elemento, en una posición específica, o según la prioridad — y dónde van cuando no lo especificas.](https://fleetbase.io/docs/extension-development/resource-views/placement)
[Visibilidad y Permisos

Cómo manejan cada tipo de elemento las comprobaciones de permiso y visibilidad — oculto, mostrado como deshabilitado, o excluido — con ejemplos de controlar los elementos en las capacidades, el estado del registro y la configuración del usuario.](https://fleetbase.io/docs/extension-development/resource-views/visibility-and-permissions)