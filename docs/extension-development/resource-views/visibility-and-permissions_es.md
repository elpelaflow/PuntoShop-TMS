---
título: "Visibilidad y permisos"
url: https://fleetbase.io/docs/extension-development/resource-views/visibility-and-permissions
módulo: extension-development
---

Vistas de recursos

# Visibilidad y permisos

Cómo cada tipo de elemento gestiona un control de permisos y visibilidad: oculto, mostrado como deshabilitado o excluido, con ejemplos de restringir el acceso a los elementos según las capacidades, el estado del registro y la configuración del usuario.

# Visibilidad y permisos

Puedes limitar un elemento de dos maneras:

* **`permission`**: un nombre de capacidad, como
  `acme-safety update score`. Los usuarios sin esta capacidad no pueden utilizar el elemento.
* **Un control de visibilidad**
  (
  `isVisible`
  , que se establece con
  `.visibleWhen()`
  ): una función que decide, ya sea por registro o por vista, si el elemento se muestra o no.

Utiliza
`permission`
para "quién puede", y un control de visibilidad para "cuándo se aplica". Funcionan juntos: un elemento puede tener ambos.

## Qué hace cada elemento

| Elemento | Sin la `permission` | Control de visibilidad |
|---|---|---|
| [Columna](https://fleetbase.io/docs/extension-development/resource-views/tables/columns) | **Oculto**: la columna no está en la tabla o en el selector de columnas | No soportado |
| [Acción de fila](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions) | **Mostrada como deshabilitada**, con una herramienta de ayuda "no autorizado" | `isVisible(fila, ctx)`, que se comprueba para cada fila |
| [Acción masiva](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions) | **Mostrada como deshabilitada**, con una herramienta de ayuda "no autorizado" | No soportado: comprueba la selección en el controlador |
| [Botón de barra de herramientas](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons) | **Mostrado como deshabilitado** | `isVisible(ctx)`, que se comprueba cuando se renderiza la vista |
| [Botón de encabezado](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons) | **Mostrado como deshabilitado** | `isVisible(ctx)`, que se comprueba cuando se renderiza la vista |
| [Elemento de menú](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items) | **No se comprueba**: utiliza un control de visibilidad | `isVisible(registro, ctx)` |
| [Pestaña](https://fleetbase.io/docs/extension-development/resource-views/details/tabs) | Ver [Servicio de menú](https://fleetbase.io/docs/extension-development/universe/menu-service) | — |

Mostrar una acción como deshabilitada, en lugar de ocultarla, indica a los usuarios que la función existe y que necesitan acceso a ella. Si prefieres ocultarla, comprueba la capacidad dentro del control de visibilidad.

## Permisos

Un permiso es una capacidad que tu extensión declara en el lado de la API; consulta
[Proveedor de servicios](https://fleetbase.io/docs/extension-development/backend/service-provider).
La consola lo comprueba con el
`abilities`
servicio.

```
new ResourceAction({ id: 'acme-recalculate', label: 'Recalcular puntuación' })
    .withPermission('acme-safety update score');

// De la misma manera, como clave
new ResourceAction({ id: 'acme-recalculate', label: 'Recalcular puntuación', permission: 'acme-safety update score' });
```

## Comprobaciones de visibilidad

### Por registro

Las acciones de fila y los elementos de menú se comprueban en función del registro:

```
// Solo para conductores activos
new ResourceAction({ id: 'acme-recalculate', label: 'Recalcular puntuación' })
    .visibleWhen((conductor) => conductor.status === 'active');

// Solo para pedidos con un conductor asignado
new ResourceAction({ id: 'acme-call-driver', label: 'Llamar al conductor' })
    .visibleWhen((order) => Boolean(order.driver_assigned));
```

### Por vista

Los botones se comprueban una vez, cuando se renderiza la vista, en función del contexto:

```
// Solo para facturas pagadas
new ActionButton({ id: 'acme-send-to-erp', text: 'Enviar a ERP' })
    .visibleWhen((ctx) => ctx.resource.status === 'paid');

// Solo cuando el usuario ha activado la integración
new ActionButton({ id id: 'acme-import', text: 'Importar desde Acme' })
    .visibleWhen((ctx) => ctx.owner.lookup('service:current-user').getOption('acme.enabled') === true);
```

### Ocultar en lugar de deshabilitar

Comprueba la capacidad dentro del control de visibilidad:

```
new ResourceAction({ id: 'acme-flag', label: 'Marcar para la formación' })
    .visibleWhen((driver, ctx) => ctx.owner.lookup('service:abilities').can('acme-safety update score'));
```

Esto también es cómo proteger un
**elemento de menú**, que ignora
`permission`.

## Mantén las comprobaciones rápidas

Las comprobaciones de visibilidad se ejecutan mientras se renderiza la vista: una vez por fila para las acciones de fila, lo que puede ser cientos de veces. Lee lo que ya está cargado, el estado del registro y de los servicios actuales, y no lo obtengas dentro de ellos. Carga lo que necesites de antemano, por ejemplo, en un servicio que tu extensión completa cuando se inicia, y léelo.

**Ocultar un elemento no es control de acceso.**
El punto final de la API detrás de una acción debe comprobar los permisos por sí mismo. La visibilidad y los permisos en los elementos solo dan forma de lo que muestra la consola.