---
título: "Seleccionar"
url: https://fleetbase.io/docs/ui/inputs/select
módulo: ui
---

# Seleccionar

`<Select>` es el menú desplegable estándar HTML nativo de un solo valor. Acepta un array o un objeto de opciones, admite etiquetas personalizadas, rutas de valores, humanización y renderizado de opciones.

# `<Select>`

`<Select>`
es el menú desplegable estándar de un solo valor. Envuelve un elemento `<select>` nativo con el estilo de formulario de Fleetbase, además de la comodidad para las etiquetas de opción, las rutas de valores y la humanización.

Para un autocompletar/previsualización, utilice
[`<ComboBox>`](https://fleetbase.io/docs/ui/inputs/combo-box). Para seleccionar un registro de modelo de Fleetbase, utilice
[`<ModelSelect>`](https://fleetbase.io/docs/ui/inputs/model-select).

## Uso básico

```
<Select
  @value={{this.driver.status}}
  @options={{this.statusOptions}}
  @placeholder="Seleccionar un estado"
  @onSelect={{fn (mut this.driver.status)}}
/>
```

```
statusOptions = ['activo', 'inactivo', 'pendiente'];
```

## Opciones de objeto

Cuando las opciones son objetos, apunte a las propiedades de etiqueta y valor mediante
`@optionLabel`
y
`@optionValue`:

```
<Select
  @value={{this.driver.zone_id}}
  @options={{this.zones}}
  @optionLabel="name"
  @optionValue="id"
  @placeholder="Seleccionar una zona"
  @onSelect={{fn (mut this.driver.zone_id)}}
/>
```

```
zones = [
  { id: 'zn_a', name: 'North' },
  { id: 'zn_b', name: 'South' },
];
```

## Humanizar valores sin procesar

Si sus opciones son slugs/snake-case, establezca
`@humanize={{true}}`
para mostrarlos de forma legible (
`pickup_ready`
→
`Listo para la recogida`
):

```
<Select
  @value={{this.order.status}}
  @options={{array "created" "dispatched" "pickup_ready" "completed"}}
  @humanize={{true}}
  @onSelect={{fn (mut this.order.status)}}
/>
```

## Renderizar contenido de opción personalizado

Si necesita contenido de opción rico, renderice un bloque. El valor renderizado es la etiqueta (o la opción) y el segundo valor posicional es la opción o la clave del objeto:

```
<Select @value={{this.choice}} @options={{this.colors}} @optionLabel="name" @onSelect={{fn (mut this.choice)}} as |label color|>
  <span style={{html-safe (concat "color:" color.hex)}}>{{label}}</span>
</Select>
```

## Opciones de objeto

Cuando
`@options`
es un objeto simple (clave/valor), utilice
`@fetched={{true}}`
para habilitar la iteración del objeto:

```
<Select
  @options={{this.optionsHash}}
  @fetched={{true}}
  @optionLabel="label"
  @onSelect={{fn (mut this.value)}}
/>
```

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@value` | any | — | El valor seleccionado actual |
| `@options` | array | object | — | Las opciones a mostrar. Un array de primitivos o objetos, o un objeto cuando `@fetched={{true}}` |
| `@optionLabel` | string | — | Ruta en cada objeto de opción para la etiqueta de visualización |
| `@optionValue` | string | — | Ruta en cada objeto de opción para el valor (de lo contrario, el objeto en sí) |
| `@optionClass` | string | — | Clase en cada `<option>` |
| `@placeholderOptionClass` | string | — | Clase en la opción de marcador de posición |
| `@placeholder` | string | — | Marcador de posición renderizado como una opción seleccionada deshabilitada |
| `@humanize` | boolean | `false` | Humaniza las etiquetas de opción mediante `safe-humanize` |
| `@fetched` | boolean | `false` | Modo de iteración de objeto para `@options` como `{key: object}` |
| `@disabled` | boolean | `false` | Deshabilitar la selección |
| `@unstyled` | boolean | `false` | Eliminar el estilo `form-select` |
| `@defaultStylingDisabled` | boolean | `false` | Similar a `@unstyled` pero no elimina los modificadores `has--selection` / `disabled` |
| `@onSelect` | `(value) => void` | — | Se llama con el nuevo valor al cambiar |
| `@onChange` | `(event, value) => void` | — | Se llama con el evento DOM sin procesar además de `@onSelect` |

Cualquier atributo adicional se pasa al elemento `<select>`.

## Distinción entre @onSelect vs @onChange

Ambos se activan en cada cambio:

* `@onSelect(value)`
  — obtiene solo el valor
* `@onChange(event, value)`
  — obtiene el evento DOM sin procesar junto con el valor

Utilice el que mejor se adapte a su firma de controlador.

## Ejemplos del mundo real

```
{{!-- Menú desplegable de estado --}}
<Select
  @value={{this.order.status}}
  @options={{array "created" "preparing" "ready" "dispatched" "completed"}}
  @humanize={{true}}
  @placeholder="Estado"
  @onSelect={{fn (mut this.order.status)}}
/>

{{!-- Opciones de objeto con etiqueta/valor personalizados --}}
<Select
  @value={{this.gateway.driver}}
  @options={{this.availableGateways}}
  @optionLabel="name"
  @optionValue="code"
  @placeholder="Elegir una puerta de enlace"
  @onSelect={{this.onGatewayChange}}
/>

{{!-- Dentro de un InputGroup --}}
<InputGroup @name="Moneda predeterminada">
  <Select
    @value={{this.settings.currency}}
    @options={{this.currencies}}
    @optionLabel="name"
    @optionValue="code"
    @onSelect={{fn (mut this.settings.currency)}}
  />
</InputGroup>
```

## Ver también

* [`<MultiSelect>`](https://fleetbase.io/docs/ui/inputs/multi-select)
  — Menú desplegable de múltiples valores
* [`<ComboBox>`](https://fleetbase.io/docs/ui/inputs/combo-box)
  — Autocompletar con búsqueda
* [`<ModelSelect>`](https://fleetbase.io/docs/ui/inputs/model-select)
  — Seleccionar un registro de modelo de Ember Data

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/select.hbs` | Plantilla |
| `addon/components/select.js` | Clase |