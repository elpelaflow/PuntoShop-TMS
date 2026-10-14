---
title: "FullCalendar"
url: https://fleetbase.io/docs/ui/scheduling/full-calendar
module: ui
---

# FullCalendar

`<FullCalendar>` es un componente de calendario completo que envuelve FullCalendar.io. Vistas de día/semana/mes/línea de tiempo con edición de eventos mediante arrastrar y soltar.

# `<FullCalendar>`

`<FullCalendar>`
envuelve
[FullCalendar.io](https://fullcalendar.io/)
para interfaces de calendario ricas: vistas de día, semana, mes y línea de tiempo, con arrastrar y soltar, ajuste de tamaño de eventos y recursos/líneas para horarios de asignación.

Para horarios de estilo de conductor con líneas de recursos, el componente de nivel superior
[`<ScheduleCalendar>`](https://fleetbase.io/docs/ui/scheduling/event-calendar)
es generalmente una mejor opción (ya que preconfigura FullCalendar para ese patrón).

## Uso básico

```
<FullCalendar
  @events={{this.events}}
  @initialView="dayGridMonth"
  @headerToolbar={{this.headerToolbar}}
  @editable={{true}}
  @onEventClick={{this.handleEventClick}}
  @onEventDrop={{this.handleEventDrop}}
  @onDateClick={{this.handleDateClick}}
/>
```

## Argumentos comunes

| Argumento | Tipo | Descripción |
| --- | --- | --- |
| `@events` | array | Eventos a mostrar |
| `@resources` | array | Recursos para vistas de estilo de recursos |
| `@initialView` | string | `dayGridMonth`, `timeGridWeek`, `timeGridDay`, `resourceTimeline`, etc. |
| `@headerToolbar` | object | Configuración de la barra de herramientas: botones, diseño |
| `@editable` | boolean | Habilitar arrastrar y soltar |
| `@selectable` | boolean | Habilitar la selección de rango de fechas |
| `@height` | string | Altura del calendario |
| `@plugins` | array | Plugins de FullCalendar para habilitar |

### Métodos de devolución

| Argumento | Descripción |
| --- | --- |
| `@onEventClick` | Evento clickeado |
| `@onEventDrop` | Evento arrastrado y soltado |
| `@onEventResize` | Evento redimensionado |
| `@onDateClick` | Célula de fecha vacía clickeada |
| `@onSelect` | Rango de fechas seleccionado |

El componente pasa la mayoría de las opciones de FullCalendar.io como
`@`
-args: consulte la
[referencia de la API de FullCalendar](https://fullcalendar.io/docs)
para obtener la lista completa.

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/full-calendar.hbs` | Plantilla |
| `addon/components/full-calendar.js` | Clase: envuelve [FullCalendar.io](https://fullcalendar.io) |
| `addon/components/full-calendar/` | Subcomponentes |