---
title: "InputGroup"
url: https://fleetbase.io/docs/ui/inputs/input-group
module: ui
---

# InputGroup

El componente `<InputGroup>` envuelve una etiqueta, un campo de entrada y texto de ayuda en un único campo de formulario. Es el componente más utilizado en `@fleetbase/ember-ui: cada formulario se construye a partir de estos.

# <InputGroup>

`<InputGroup>`
es la forma canónica de organizar un campo de formulario con etiqueta. Renderiza una etiqueta, un campo de entrada, texto de ayuda opcional y admite cualquier campo de entrada personalizado a través de un bloque.

Es el componente más utilizado en
`@fleetbase/ember-ui`
— prácticamente todos los formularios en la consola Fleetbase están compuestos con estos.

## Uso básico

```
<InputGroup @name="Email" @value={{this.email}} @type="email" @required={{true}} />
```

Esto renderiza:

* Una etiqueta con el texto
  `Email`
  (y un indicador de requerido si
  `@required`
  )
* Un
  `<input type="email">`
  vinculado a
  `this.email`
  con
  `placeholder="Email"`

## Con un campo de entrada personalizado

Cuando se proporciona un bloque, el `<Input>` predeterminado se reemplaza por lo que ponga dentro. El bloque recibe
`(id, name)`
como argumentos:

```
<InputGroup @name="Vehicle" as |id|>
  <ModelSelect
    @modelName="vehicle"
    @selectedModel={{this.vehicle}}
    @onChange={{fn (mut this.vehicle)}}
    id={{id}}
  />
</InputGroup>
```

Esto es cómo se compone
`InputGroup`
con
`Select`
,
`ModelSelect`
,
`PhoneInput`
,
`DatePicker`
,
`MoneyInput`
, y cualquier otro campo de entrada personalizado, manteniendo la etiqueta uniforme + espaciado.

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `@name` | string | — | El texto de la etiqueta. También se utiliza como el `placeholder` predeterminado |
| `@value` | any | — | Vinculado al `<Input>` subyacente (solo cuando no se proporciona un bloque) |
| `@type` | string | `text` | Tipo de entrada HTML — `text` , `email` , `number` , `password` , etc. |
| `@placeholder` | string | se aplica a `@name` | Placeholder del campo de entrada |
| `@required` | boolean | `false` | Añade el indicador de requerido a la etiqueta y al atributo `required` en el campo de entrada |
| `@disabled` | boolean | `false` | Deshabilita el campo de entrada |
| `@autocomplete` | string | — | Enviado al campo de entrada |
| `@autofill` | string | — | Enviado al campo de entrada |
| `@helpText` | string | — | Texto de tooltip que se muestra junto a la etiqueta |
| `@hideLabel` | boolean | `false` | Renderiza el campo sin una etiqueta visible |
| `@inputClass` | string | — | Clases adicionales en el `<input>` |
| `@labelClass` | string | — | Clases adicionales en la etiqueta |
| `@labelWrapperClass` | string | — | Clases adicionales en el envoltorio de la etiqueta |
| `@wrapperClass` | string | — | Clases adicionales en el `<div>` exterior |

Cualquier atributo adicional
`...attributes`
en
`<InputGroup>`
se pasa al elemento
`<Input>`
subyacente.

## Valores renderizados

Cuando se proporciona un bloque,
`<InputGroup>`
renderiza:

| Posición | Valor | Uso |
| --- | --- | --- |
| 1 | `id` | ID único generado automáticamente — se establece en su campo de entrada personalizado para que la referencia `for=` de la etiqueta funcione |
| 2 | `@name` | El texto de la etiqueta — útil como placeholder |

```
<InputGroup @name="Description" as |id name|>
  <textarea id={{id}} placeholder={{name}} class="form-input"></textarea>
</InputGroup>
```

## Etiqueta oculta (formularios en línea)

Para formularios densos donde cada campo tiene un contexto obvio:

```
<InputGroup @name="Search" @hideLabel={{true}} @value={{this.q}} placeholder="Buscar conductores…" />
```

## Con texto de ayuda

El texto de ayuda se muestra como un tooltip junto a la etiqueta:

```
<InputGroup
  @name="Vehicle Plate"
  @value={{this.plate}}
  @helpText="Utilice la placa registrada en el archivo con la DMV"
  @required={{true}}
/>
```

## Ejemplos del mundo real

```
{{!-- Campo de texto simple --}}
<InputGroup @name="First Name" @value={{this.driver.first_name}} @required={{true}} />

{{!-- Campo numérico --}}
<InputGroup
  @name="Maximum Capacity (kg)"
  @type="number"
  @value={{this.vehicle.max_capacity}}
/>

{{!-- Envuelviendo un Select --}}
<InputGroup @name="Status">
  <Select
    @value={{this.driver.status}}
    @options={{this.statusOptions}}
    @onSelect={{fn (mut this.driver.status)}}
  />
</InputGroup>

{{!-- Envuelviendo un widget personalizado --}}
<InputGroup @name="Available Hours" as |id|>
  <ScheduleManager id={{id}} @value={{this.hours}} />
</InputGroup>
```

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/input-group.hbs` | Plantilla |
| `addon/components/input-group.js` | Clase |