---
title: "DateTimeInput"
url: https://fleetbase.io/docs/ui/inputs/date-time-input
module: ui
---

# DateTimeInput

`<DateTimeInput>` es un selector combinado de fecha y hora de HTML. Muestra entradas nativas una al lado de la otra y emite un objeto `Date` de JavaScript al cambiar.

# `<DateTimeInput>`

Un selector combinado simple de fecha y hora. Muestra dos entradas nativas de HTML una al lado de la otra (
`<input type="date">`
y
`<input type="time">`
) y emite una instancia de
`Date`
cada vez que cambia alguna de ellas.

Para un selector de estilo de calendario, utilice
[`<DatePicker>`](https://fleetbase.io/docs/ui/inputs/date-picker).

## Uso básico

```
<DateTimeInput
  @value={{this.scheduled_at}}
  @onUpdate={{this.handleScheduleChange}}
/>
```

```
@action handleScheduleChange(date, formatted) {
  this.scheduled_at = date;          // un objeto Date de JavaScript
  // formatted es "yyyy-MM-dd HH:mm"
}
```

## Mínimo / Máximo

```
<DateTimeInput
  @value={{this.scheduled_at}}
  @minDate="2025-01-01"
  @maxDate="2025-12-31"
  @minTime="06:00"
  @maxTime="22:00"
  @onUpdate={{this.handleScheduleChange}}
/>
```

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@value` | Date | Valor inicial como un objeto `Date` de JavaScript |
| `@minDate` | string | Fecha mínima ( `yyyy-MM-dd` ) |
| `@maxDate` | string | Fecha máxima |
| `@minTime` | string | Hora mínima ( `HH:mm` ) |
| `@maxTime` | string | Hora máxima |
| `@onUpdate` | `(date, formatted)` | Se llama con un objeto `Date` y una cadena `"yyyy-MM-dd HH:mm"` |

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/date-time-input.hbs` | Plantilla |
| `addon/components/date-time-input.js` | Clase |