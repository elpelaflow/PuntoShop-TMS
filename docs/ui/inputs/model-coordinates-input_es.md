---
title: "ModelCoordinatesInput"
url: https://fleetbase.io/docs/ui/inputs/model-coordinates-input
module: ui
---

# ModelCoordinatesInput

`<ModelCoordinatesInput>` envuelve `<CoordinatesInput>` para vincularlo directamente a un modelo de datos de Fleetbase — actualiza automáticamente la propiedad `location` del registro y realiza la geocodificación inversa de la dirección en el modelo.

# `<ModelCoordinatesInput>`

`<ModelCoordinatesInput>`
es un envoltorio delgado alrededor de
[`<CoordinatesInput>`](https://fleetbase.io/docs/ui/inputs/coordinates-input)
que se vincula directamente a un registro de Ember Data. Cuando el usuario mueve el marcador en el mapa, la propiedad
`location`
del registro se actualiza y el geocodificador de Fleetbase completa
`street1`
,
`city`
,
`country`
, etc., en el mismo registro.

Úselo cuando tiene un modelo con un campo
`location`
de GeoJSON — como
`Place`
,
`StoreLocation`
,
`Driver`
,
`FuelReport`
, etc. — y desea que un único componente gestione tanto el selector de coordenadas como el rellenado automático de la dirección.

## Uso básico

```
<ModelCoordinatesInput @model={{this.place}} />
```

Cuando el usuario selecciona una coordenada:

1. `place.location`
   se actualiza a un Punto de GeoJSON
2. El geocodificador inverso de Fleetbase completa
   `place.street1`
   ,
   `place.city`
   ,
   `place.province`
   ,
   `place.country`
   ,
   `place.postal_code`
   , etc.

## Ruta de propiedad diferente

Por defecto, el componente lee y escribe
`model.location`
. Vuelva a sobrescribir con
`@locationProperty`
:

```
<ModelCoordinatesInput @model={{this.driver}} @locationProperty="current_location" />
```

## Autocompletado de direcciones

```
<ModelCoordinatesInput @model={{this.place}} @autocomplete="all" />
```

| `@autocomplete` | Efecto cuando el usuario selecciona un lugar de la búsqueda de direcciones del mapa |
| --- | --- |
| `"location"` | Solo actualiza la propiedad de ubicación |
| `"all"` (o `true`) | Actualiza todas las propiedades coincidentes en el modelo (calle, ciudad, país, etc.) |
| omitido | No se realiza ninguna actualización del modelo basada en la autocompletado |

## Argumentos

| Argumento | Tipo | Descripción |
| --- | --- | --- |
| `@model` | model | El registro de Ember Data al que vincular |
| `@locationProperty` | string | Ruta de propiedad en el registro (predeterminado: `location`) |
| `@autocomplete` | `'all' | 'location' | true` | Indica si se deben completar automáticamente las propiedades del modelo a partir del geocodificador |
| `@disabled` | boolean | Deshabilitar la entrada |

### Llamadas de retorno

| Argumento | Firma | Descripción |
| --- | --- | --- |
| `@onReverseGeocode` | `({ latitude, longitude })` | Se llama después de una geocodificación inversa exitosa (además de modificar el modelo) |
| `@onAutocomplete` | `(selected)` | Se llama cuando el usuario selecciona una dirección de la búsqueda en el mapa |
| `@onInputReady` | `(coordinatesInput)` | Se llama una vez con la API del `<CoordinatesInput>` subyacente |

## Ejemplo del mundo real

```
{{!-- Editar un registro de Place con el mapa y rellenado automático --}}
<ContentPanel @title="Ubicación" @open={{true}}>
  <ModelCoordinatesInput
    @model={{this.place}}
    @autocomplete="all"
    @onReverseGeocode={{this.onLocationChanged}}
  />

  <InputGroup @name="Street" @value={{this.place.street1}} />
  <InputGroup @name="City" @value={{this.place.city}} />
  <InputGroup @name="Country" @value={{this.place.country}} />
</ContentPanel>
```

Después de que el usuario mueva el marcador, los tres
`<InputGroup>`
se rellenarán automáticamente a partir del resultado de la geocodificación inversa.

## Ver también

* [`<CoordinatesInput>`](https://fleetbase.io/docs/ui/inputs/coordinates-input)
  — el componente subyacente sin vinculación de modelo

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/model-coordinates-input.hbs` | Plantilla — envuelve `<CoordinatesInput>` |
| `addon/components/model-coordinates-input.js` | Clase — gestiona la vinculación del modelo y la geocodificación inversa |