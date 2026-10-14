---
title: "UnitInput"
url: https://fleetbase.io/docs/ui/inputs/unit-input
module: ui
---

# UnitInput

`<UnitInput>` es un campo de entrada numérico con una etiqueta de unidad o selector de unidades adjunto, utilizado para pesos, distancias, capacidades y cualquier tipo de medida.

# `<UnitInput>`

Un campo de entrada numérico con una etiqueta de unidad fija a su derecha. Opcionalmente, permite al usuario seleccionar una unidad diferente a través de un menú desplegable.

Se utiliza para:
*   Pesos (
    `kg`
    ,
    `lb`
    )
*   Distancias (
    `km`
    ,
    `mi`
    )
*   Capacidades (
    `L`
    ,
    `gal`
    )
*   Y otros campos de medición similares.

## Uso básico

```
<UnitInput @value={{this.vehicle.max_weight}} @unit="kg" />
```

## Con selector de unidades

```
<UnitInput
  @value={{this.vehicle.max_weight}}
  @unit={{this.vehicle.weight_unit}}
  @canSelectUnit={{true}}
  @units={{this.weightUnits}}
  @onUnitChange={{fn (mut this.vehicle.weight_unit)}}
/>
```

```
weightUnits = [
  { name: 'Kilograms', value: 'kg' },
  { name: 'Pounds', value: 'lb' },
  { name: 'Tonnes', value: 'tn' },
];
```

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@value` | número | El valor numérico |
| `@unit` | cadena | El código de la unidad que se muestra a la derecha |
| `@units` | array | Array de `{ name, value }` para el selector de unidades |
| `@canSelectUnit` | booleano | Mostrar el selector desplegable |
| `@onUnitChange` | `(unit)` | Se llama cuando el usuario selecciona una unidad diferente |
| `@disabled` | booleano | Deshabilitar el campo de entrada |
| `@placeholder` | cadena | Placeholder para el campo de entrada numérico |
| `@wrapperClass` | cadena | Clases adicionales en el envoltorio exterior |

Cualquier atributo adicional
`...attributes`
se pasa al campo de entrada interno
`<input>`.

## Ejemplos del mundo real

```
{{!-- Capacidad del vehículo --}}
<InputGroup @name="Maximum Weight">
  <UnitInput
    @value={{this.vehicle.max_weight}}
    @unit={{this.vehicle.weight_unit}}
    @canSelectUnit={{true}}
    @units={{this.weightUnits}}
    @onUnitChange={{fn (mut this.vehicle.weight_unit)}}
  />
</InputGroup>

{{!-- Distancia base de la tarifa --}}
<UnitInput @value={{this.rate.base_distance}} @unit="km" />
```

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/unit-input.hbs` | Plantilla |
| `addon/components/unit-input.js` | Clase |
| `addon/components/unit-input/` | Subcomponente `UnitHandle` |