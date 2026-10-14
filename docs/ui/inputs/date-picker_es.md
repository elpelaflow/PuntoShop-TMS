---
título: "DatePicker"
url: https://fleetbase.io/docs/ui/inputs/date-picker
módulo: ui
---

# DatePicker

`<DatePicker>` es el selector de fechas del calendario — utiliza `air-datepicker`. Acepta todo el conjunto de opciones de `air-datepicker` más llamadas de retorno compatibles con Fleetbase.

# `<DatePicker>`

Un selector de fechas basado en calendario. Internamente utiliza la
[`biblioteca air-datepicker`](https://air-datepicker.com) — todas las opciones de `air-datepicker` están soportadas como
`@`
-argumentos.

Para entradas combinadas de fecha y hora, utilice
[`<DateTimeInput>`](https://fleetbase.io/docs/ui/inputs/date-time-input).

## Uso básico

```
<DatePicker
  @value={{this.start_date}}
  @placeholder="Fecha de inicio"
  @onChange={{fn (mut this.start_date)}}
/>
```

## Selección de rango

```
<DatePicker
  @range={{true}}
  @value={{this.dateRange}}
  @onChange={{this.onDateRangeChange}}
/>
```

Cuando
`@range={{true}}`
, el valor es un array de dos fechas.

## Calendario en línea

Para mostrar siempre el calendario (en lugar de un pop-up):

```
<DatePicker @inline={{true}} @value={{this.date}} @onChange={{fn (mut this.date)}} />
```

## Formato personalizado

El formato predeterminado es
`yyyy-MM-dd`
. Sobrescriba con
`@dateFormat`
:

```
<DatePicker @dateFormat="dd/MM/yyyy" @value={{this.date}} @onChange={{fn (mut this.date)}} />
```

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@value` | Date | Date[] | string | — | El valor actual (o cadena separada por comas para el rango) |
| `@dateFormat` | string | `yyyy-MM-dd` | Formato de visualización |
| `@placeholder` | string | — | Texto del marcador de posición |
| `@inline` | boolean | `false` | Mostrar el calendario en línea |
| `@range` | boolean | — | Permitir la selección de rango |
| `@class` | string | — | Clases adicionales en la entrada |

Además, todas las
[opciones de air-datepicker](https://air-datepicker.com/docs#options)
—
`multipleDates`,
`minDate`,
`maxDate`,
`disableNavWhenOutOfRange`,
`view`,
`minView`,
`firstDay`, etc. Puede pasarlos como
`@`
-argumentos.

### Llamadas de retorno

| Argumento | Firma | Descripción |
|---|---|---|
| `@onSelect` | `(selection)` | Se llama con el objeto de selección de `air-datepicker` |
| `@onChange` | `(date)` | Se llama con la fecha seleccionada |
| `@onDateChanged` | `(formattedDate)` | Se llama con la cadena formateada |

## Ejemplos del mundo real

```
{{!-- Dentro de un grupo de entrada --}}
<InputGroup @name="Fecha de nacimiento">
  <DatePicker @value={{this.driver.date_of_birth}} @onChange={{fn (mut this.driver.date_of_birth)}} />
</InputGroup>

{{!-- Filtro de rango --}}
<DatePicker
  @range={{true}}
  @value={{this.dateRange}}
  @onChange={{this.applyDateFilter}}
  @placeholder="Rango de fechas"
/>
```

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/date-picker.hbs` | Plantilla |
| `addon/components/date-picker.js` | Clase — utiliza `air-datepicker` |