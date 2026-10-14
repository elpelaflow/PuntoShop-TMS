---
title: "Badge"
url: https://fleetbase.io/docs/ui/display/badge
module: ui
---

# Badge

`<Badge>` es una pequeña etiqueta de estado, utilizada en todo lugar para mostrar los estados de los pedidos, los estados de las cuentas y las etiquetas categóricas.

# `<Badge>`

`<Badge>`
muestra una etiqueta de color con un punto de estado y una etiqueta. Es la forma canónica de mostrar:

* Estados de los pedidos (
  `created`
  ,
  `dispatched`
  ,
  `completed`
  ,
  `canceled`
  )
* Estados de las cuentas (
  `active`
  ,
  `inactive`
  ,
  `pending`
  )
* Etiquetas genéricas (
  `paid`
  ,
  `overdue`
  ,
  `published`
  )

La cadena de estado controla el color a través de una clase Tailwind, se aplica una clase llamada
`<status>-status-badge`
, por lo que
`created-status-badge`
,
`completed-status-badge`
, etc. Los estilos se definen en la hoja de estilo `ember-ui`.

## Uso básico

```
<Badge @status={{this.order.status}} />
```

La cadena de estado se humaniza para la visualización (
`pickup_ready`
→
`Pickup Ready`
) y se convierte en una clase CSS (
`pickup_ready`
→
`pickup-ready-status-badge`
).

## Color personalizado a través de @type

Si el estado no tiene un color estilizado, pase
`@type`
para el color visual y
`@status`
(o
`@text`
) para la etiqueta:

```
<Badge @type="info"    @text="Beta" />
<Badge @type="success" @text="Active" />
<Badge @type="warning" @text="Pending review" />
<Badge @type="danger"  @text="Suspended" />
```

El color predeterminado es
`info`
si no se establece ni
`@type`
ni
`@status`.

## Sin el punto de estado

```
<Badge @status="published" @hideStatusDot={{true}} />
```

## Icono personalizado

Reemplace el punto de círculo predeterminado con cualquier icono de FontAwesome:

```
<Badge @status="vip" @icon="star" @iconPrefix="fas" />
<Badge @text="Refunded" @icon="undo" @type="warning" />
```

## Deshabilitar la humanización

Por defecto, el texto de la etiqueta se humaniza:
`pickup_ready`
se convierte en
`Pickup Ready`
. Para mostrar la cadena de estado sin procesar:

```
<Badge @status="ABC-123" @disableHumanize={{true}} />
```

## Mostrar contenido personalizado

Utilice un bloque para tener control total sobre el cuerpo. El valor entregado es
`@status`
:

```
<Badge @status={{this.order.status}} as |status|>
  <span class="font-bold">{{status}}</span>
  <span class="ml-1">({{@order.public_id}})</span>
</Badge>
```

## Redondo completo

Para una forma más similar a una etiqueta:

```
<Badge @status="completed" @roundedFull={{true}} />
```

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `@status` | string | — | El estado — controla tanto el color (a través de la clase `<status>-status-badge` ) como la etiqueta |
| `@type` | string | se aplica al valor predeterminado de `@status` , luego `info` | Para sobreescribir el color de la clase |
| `@text` | string | — | Para sobreescribir la etiqueta (de lo contrario se utiliza `@status` ) |
| `@disableHumanize` | boolean | `false` | Mostrar la cadena de estado sin procesar en lugar de humanizarla |
| `@hideText` | boolean | `false` | Mostrar solo el punto/icono |
| `@hideStatusDot` | boolean | `false` | Ocultar el punto de estado |
| `@hideIcon` | boolean | `false` | Igual que `@hideStatusDot` |
| `@icon` | string | `circle` | Icono de FontAwesome para el punto |
| `@iconPrefix` | string | `fas` | Prefijo de FontAwesome |
| `@iconClass` | string | — | Clases adicionales en el icono |
| `@size` | string | `xs` | Tamaño del icono — `xs` , `sm` , `lg` , etc. |
| `@roundedFull` | boolean | `false` | Mostrar como una etiqueta completamente redondeada en lugar de un rectángulo redondeado pequeño |
| `@helpText` | string | — | Texto de ayuda al pasar el ratón |
| `@exampleText` | string | — | Texto de ejemplo opcional debajo del texto de ayuda |
| `@tooltipPlacement` | string | `top` | Posición del tooltip |
| `@wrapperClass` | string | — | Clases adicionales en el `<div>` exterior |
| `@spanClass` | string | — | Clases adicionales en el `<span>` interior |

Cualquier atributo adicional
`...attributes`
se pasa al `<div>` exterior.

## Ejemplos del mundo real

```
{{!-- Estado del pedido en una fila de lista --}}
<Badge @status={{order.status}} />

{{!-- Dentro de una celda de tabla --}}
<Badge @status={{row.account.status}} @hideStatusDot={{true}} />

{{!-- Indicador de mensajes no leídos --}}
{{#if this.unreadCount}}
  <Badge @text={{this.unreadCount}} @type="danger" @hideStatusDot={{true}} @roundedFull={{true}} />
{{/if}}

{{!-- Con texto de ayuda explicando el estado --}}
<Badge
  @status="pickup_ready"
  @helpText="El pedido ha sido preparado y está esperando a que el cliente lo reciba"
/>
```

## Ver también

* [`<Pill>`](https://fleetbase.io/docs/ui/display/pill)
  — similar a Badge, pero se utiliza para etiquetas categóricas no de estado

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/badge.hbs` | Plantilla (solo plantilla — sin clase de JS) |