---
título: "MultiSelect"
url: https://fleetbase.io/docs/ui/inputs/multi-select
módulo: ui
---

# MultiSelect

`<MultiSelect>` es un selector de múltiples valores con autocompletado. Es un envoltorio delgado alrededor de `ember-power-select`'s `PowerSelectMultiple`.

# `<MultiSelect>`

Un selector de múltiples valores con autocompletado. Es un envoltorio delgado alrededor de
`ember-power-select`
's
`<PowerSelectMultiple>`
con el estilo de formulario de Fleetbase.

Para registros de Ember Data, es preferible utilizar
[`<ModelSelectMultiple>`](https://fleetbase.io/docs/ui/inputs/model-select).

## Uso básico

```
<MultiSelect
  @options={{this.tagOptions}}
  @selected={{this.selectedTags}}
  @placeholder="Añadir etiquetas…"
  @onChange={{fn (mut this.selectedTags)}}
  as |tag|
>
  {{tag}}
</MultiSelect>
```

## Argumentos

| Argumento | Tipo | Descripción |
| --- | --- | --- |
| `@options` | array | Las opciones para elegir |
| `@selected` | array | Las opciones actualmente seleccionadas |
| `@onChange` | `(selected)` | Se llama con el nuevo array en cada cambio |
| `@placeholder` | string | Placeholder para el estado vacío |
| `@allowClear` | boolean | Mostrar un botón para borrar todo |
| `@searchEnabled` | boolean | Activar la búsqueda con autocompletado |
| `@search` | function | Función de búsqueda asíncrona personalizada |
| `@selectClass` | string | Clases adicionales en el elemento de activación |
| `@registerAPI` | function | Capturar la API de power-select |
| `@placeholderComponent` | string | Componente de placeholder personalizado |
| `@preventScroll` | boolean | Deshabilitar el desplazamiento del cuerpo al abrirse |
| `@renderInPlace` | boolean | Renderizar en el orden del DOM en lugar de usar un portal |
| `@scrollTo` | function | Comportamiento personalizado para desplazarse a una opción |

El valor devuelto es la opción que se está renderizando.

## Ver también

* [`<Select>`](https://fleetbase.io/docs/ui/inputs/select)
  — para un solo valor
* [`<ComboBox>`](https://fleetbase.io/docs/ui/inputs/combo-box)
  — para un solo valor con autocompletado
* [`<ModelSelect>`](https://fleetbase.io/docs/ui/inputs/model-select)
  — para registros de Ember Data

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/multi-select.hbs` | Plantilla (solo plantilla) |