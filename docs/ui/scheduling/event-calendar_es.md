---
title: "EventCalendar / ScheduleCalendar"
url: https://fleetbase.io/docs/ui/scheduling/event-calendar
module: ui
---

# EventCalendar / ScheduleCalendar

`<EventCalendar>` es un calendario en cuadrícula de fechas; `<ScheduleCalendar>` es un programador con asignación arrastrar y soltar. Ambos permiten mostrar elementos personalizados.

# `<EventCalendar>` y `<ScheduleCalendar>`

Dos componentes de programación están disponibles en
`@fleetbase/ember-ui`:

* **`<EventCalendar>`**
  — Un calendario ligero para mostrar eventos en una cuadrícula de fechas (mes/semana/día)
* **`<ScheduleCalendar>`**
  — Un programador con carriles de recursos (conductores/vehículos como filas, tiempo como columnas) con asignación arrastrar y soltar

Para acceder directamente a FullCalendar, use
[`<FullCalendar>`](https://fleetbase.io/docs/ui/scheduling/full-calendar)
.

## `<ScheduleCalendar>`

El patrón de programación más común en Fleetbase: asignar elementos a conductores/vehículos en una vista de línea de tiempo.

```
<ScheduleCalendar
  @resources={{this.drivers}}
  @items={{this.scheduleItems}}
  @view="resourceTimeline"
  @onItemClick={{this.handleItemClick}}
  @onItemDrop={{this.handleItemDrop}}
  @onDateClick={{this.handleDateClick}}
>
  <:item as |item|>
    <div class="custom-event-content">{{item.title}}</div>
  </:item>
</ScheduleCalendar>
```

### Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `@resources` | array | — | Recursos (conductores, vehículos, etc.) — se muestran como filas |
| `@items` | array | — | Elementos de programación |
| `@view` | string | `resourceTimeline` | Tipo de vista |
| `@editable` | boolean | `true` | Habilitar arrastrar y soltar |
| `@onItemClick` | `(item)` | — | Elemento clickeado |
| `@onItemDrop` | `(item, oldStart, newStart)` | — | Elemento movido |
| `@onDateClick` | `(date, resource)` | — | Celda vacía clickeada |

### Bloques nombrados

| Bloque | Propósito |
| --- | --- |
| `:item` | Renderizador de elementos personalizado (muestra el elemento) |
| `:header` | Contenido de encabezado personalizado |
| `:footer` | Contenido de pie de página personalizado |

## `<ScheduleItemCard>`

Un renderizador de elementos en estilo de tarjeta, que se utiliza típicamente dentro del bloque `:item` de
`<ScheduleCalendar>`:

```
<ScheduleItemCard @item={{this.scheduleItem}} @onClick={{this.handleClick}}>
  <:content as |ctx|>
    <div class="custom-content">{{ctx.item.title}}</div>
  </:content>
  <:actions as |ctx|>
    <button {{on "click" (fn this.edit ctx.item)}}>Editar</button>
    <button {{on "click" (fn this.delete ctx.item)}}>Eliminar</button>
  </:actions>
</ScheduleItemCard>
```

## `<EventCalendar>`

Un calendario de cuadrícula de fechas más simple: útil cuando no necesitas carriles de recursos:

```
<EventCalendar
  @events={{this.events}}
  @view="month"
  @onEventClick={{this.handleClick}}
/>
```

## Ver también

La referencia completa del componente de programación se encuentra en el repositorio de origen en
`SCHEDULING_COMPONENTS.md`
— léalo para un uso avanzado, vistas personalizadas y estilos.

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/schedule-calendar.hbs` | Plantilla |
| `addon/components/schedule-calendar.js` | Clase |
| `addon/components/schedule-item-card.hbs` | Plantilla de tarjeta de elemento |
| `addon/components/schedule-item-card.js` | Clase de tarjeta de elemento |
| `addon/components/event-calendar.hbs` | Plantilla de calendario de cuadrícula de fechas |
| `addon/components/event-calendar.js` | Clase de calendario de cuadrícula de fechas |
| `SCHEDULING_COMPONENTS.md` | Documentación de referencia en el directorio raíz del paquete |