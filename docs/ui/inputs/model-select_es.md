---
title: "ModelSelect"
url: https://fleetbase.io/docs/ui/inputs/model-select
module: ui
---

# ModelSelect

`<ModelSelect>` es un selector de tipo de datos de Ember Data — realiza búsquedas en tiempo real en la tienda registrada, admite desplazamiento infinito y acepta la API completa de `ember-power-select`.

# `<ModelSelect>`

`<ModelSelect>`
es un selector de tipo de datos de Ember Data para registros de modelos. Realiza consultas en tiempo real a tu tienda registrada a medida que el usuario escribe y admite desplazamiento infinito. Es la forma estándar de permitir a un usuario seleccionar un conductor, vehículo, cliente, tienda u otro recurso de Fleetbase.

El componente envuelve
`ember-power-select`
y acepta la API completa de esta biblioteca, además de sus propios argumentos.

También existe un componente hermano
**`<ModelSelectMultiple>`**
para la selección de múltiples valores — la misma API, pero selecciona un array de registros.

## Uso básico

```
<ModelSelect
  @modelName="vehicle"
  @selectedModel={{this.driver.vehicle}}
  @optionLabel="display_name"
  @placeholder="Seleccionar un vehículo"
  @onChange={{fn (mut this.driver.vehicle)}}
/>
```

El componente realizará una solicitud
`store.query('vehicle', { ... })`
paginada por
`pageSize`
(por defecto 25), y actualizará los resultados a medida que el usuario escriba.

## Con desplazamiento infinito

El desplazamiento infinito está
**activado por defecto**. Desactívalo con
`@infiniteScroll={{false}}`:

```
<ModelSelect
  @modelName="zone"
  @infiniteScroll={{false}}
  @selectedModel={{this.zone}}
  @onChange={{fn (mut this.zone)}}
/>
```

## Con creación en línea

```
<ModelSelect
  @modelName="tag"
  @selectedModel={{this.tag}}
  @onChange={{fn (mut this.tag)}}
  @withCreate={{true}}
  @onCreate={{this.createTag}}
  @optionLabel="name"
/>
```

Cuando el usuario escribe algo que no está en la lista, aparece una opción "Crear…".

## Bloque de renderizado

El valor renderizado es el modelo de opción — útil para un renderizado rico:

```
<ModelSelect @modelName="driver" @selectedModel={{this.driver}} @onChange={{fn (mut this.driver)}} as |driver|>
  <Pill @resource={{driver}} @subtitle={{driver.public_id}} />
</ModelSelect>
```

## Argumentos

### Fuente

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@modelName` | string | — | Nombre del modelo de Ember Data para consultar |
| `@source` | object | el servicio `store` registrado | Sobreescribe la fuente de datos — por ejemplo, para `ember-data-has-many-query` |

### Visualización

| Argumento | Tipo | Descripción |
|---|---|---|
| `@selectedModel` | model | null | El registro actualmente seleccionado |
| `@optionLabel` | string | Propiedad en el modelo utilizada para la etiqueta |
| `@searchField` | string | Propiedad para buscar (por defecto `@optionLabel`) |
| `@placeholder` | string | Marcador de posición para el estado vacío |
| `@searchPlaceholder` | string | Marcador de posición que se muestra dentro de la entrada de búsqueda |
| `@noMatchesMessage` | string | Mensaje que se muestra cuando no se encuentran resultados |

### Paginación y búsqueda

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@infiniteScroll` | boolean | `true` | Carga los resultados de forma asíncrona a medida que el usuario desplaza |
| `@pageSize` | number | `25` | Número de registros por página |
| `@debounceDuration` | number | `250` | Tiempo de espera de la búsqueda en ms |
| `@searchEnabled` | boolean | `true` | Habilita la búsqueda de tipo |
| `@perPageParam` | string | `limit` | Parámetro de consulta para el tamaño de la página |
| `@pageParam` | string | `page` | Parámetro de consulta para el número de página |

### Permisos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@permission` | string | Si el usuario no tiene esta capacidad, el selector se desactiva y muestra una herramienta de ayuda "No autorizado" |

### Creación en línea

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@withCreate` | boolean | `false` | Muestra una opción "Crear nuevo…" cuando la búsqueda no encuentra coincidencias |
| `@onCreate` | `(query)` | — | Se llama con la búsqueda escrita por el usuario cuando elige "Crear nuevo" |

### Herramienta de ayuda

| Argumento | Tipo | Descripción |
|---|---|---|
| `@helpText` | string | Texto de la herramienta de ayuda |
| `@exampleText` | string | Texto de ejemplo opcional debajo del texto de la herramienta de ayuda |
| `@tooltipPlacement` | string | `top` (predeterminado), `bottom`, `left`, `right` |

### Passthrough de Power-Select

Además de lo anterior, se admiten todos los argumentos de
`ember-power-select`,
incluidos
`@allowClear`
,
`@closeOnSelect`
,
`@disabled`
,
`@multiple`
,
`@matcher`
,
`@matchTriggerWidth`
,
`@onBlur`
,
`@onFocus`
,
`@onClose`
,
`@onOpen`
,
`@onKeydown`
,
`@onInput`
,
`@triggerClass`
,
`@dropdownClass`
,
`@verticalPosition`
,
`@horizontalPosition`
,
`@renderInPlace`
,
`@triggerComponent`
,
`@selectedItemComponent`
,
`@searchFieldPosition`
, etc.

Consulte la documentación de
[ember-power-select](https://fleetbase.io/docs/ui/inputs/combo-box)
para obtener la lista completa.

### Callbacks

| Argumento | Firma | Descripción |
|---|---|---|
| `@onChange` | `(model)` | Se llama con el modelo seleccionado |
| `@onChangeId` | `(id)` | Se llama con solo el ID del modelo — conveniente para enlazar a un campo `_uuid` |

## Ejemplos del mundo real

```
{{!-- Seleccionar un vehículo para un conductor --}}
<InputGroup @name="Vehicle">
  <ModelSelect
    @modelName="vehicle"
    @selectedModel={{this.driver.vehicle}}
    @optionLabel="display_name"
    @onChange={{fn (mut this.driver.vehicle)}}
  />
</InputGroup>

{{!-- Seleccionar un cliente con renderizado enriquecido --}}
<ModelSelect
  @modelName="customer"
  @selectedModel={{this.order.customer}}
  @optionLabel="name"
  @placeholder="Buscar clientes…"
  @onChange={{fn (mut this.order.customer)}}
  as |customer|
>
  <Pill @resource={{customer}} @subtitle={{customer.email}} />
</ModelSelect>

{{!-- Seleccionar múltiples conductores (utiliza ModelSelectMultiple) --}}
<ModelSelectMultiple
  @modelName="user"
  @selectedModel={{@network.alertable.for_new_order}}
  @optionLabel="name"
  @onChange={{fn this.makeAlertable "for_new_order"}}
/>
```

## Ver también

* [`<Select>`](https://fleetbase.io/docs/ui/inputs/select)
  — para listas de opciones estáticas
* [`<ComboBox>`](https://fleetbase.io/docs/ui/inputs/combo-box)
  — para listas de opciones estáticas con tipo de datos

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/model-select.hbs` | Plantilla |
| `addon/components/model-select.js` | Clase |
| `addon/components/model-select-multiple.hbs` | Variante de múltiples valores |
| `addon/components/model-select-multiple.js` |  |