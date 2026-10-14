---
título: "CoordinatesInput"
url: https://fleetbase.io/docs/ui/inputs/coordinates-input
módulo: ui
---

# CoordinatesInput

El componente `CoordinatesInput` muestra campos de latitud/longitud uno al lado del otro, con un menú desplegable de selección de mapa que admite arrastrar y soltar, así como la geolocalización de direcciones.

# `<CoordinatesInput>`

Permite a un usuario ingresar o seleccionar una coordenada geográfica. Muestra dos campos de texto (latitud y longitud) más un menú desplegable "Seleccionar desde el mapa" que abre un mapa de Leaflet con un marcador arrastrable y un campo de búsqueda de direcciones.

Para vincular directamente a un registro de Ember Data, consulte el componente hermano
`<ModelCoordinatesInput>`
(el mismo componente, pero actualiza automáticamente
`record.location`).

## Uso básico

```
<CoordinatesInput
  @latitude={{this.driver.lat}}
  @longitude={{this.driver.lng}}
  @onUpdate={{this.handleCoordsChange}}
/>
```

```
@action handleCoordsChange(lat, lng) {
  this.driver.lat = lat;
  this.driver.lng = lng;
}
```

## Con búsqueda de direcciones

El selector de mapa incluye un campo de búsqueda de direcciones: escriba una dirección, haga clic en
**Buscar**
, y el marcador se desplazará a la ubicación geolocalizada.

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@latitude` | número | Latitud en grados decimales |
| `@longitude` | número | Longitud en grados decimales |
| `@onUpdate` | `(lat, lng)` | Se llama cuando cambia cualquiera de las coordenadas |
| `@disabled` | booleano | Deshabilitar la entrada y el menú desplegable |
| `@renderInPlace` | booleano | Renderizar el menú desplegable en el orden del DOM (predeterminado: `true`) |
| `@triggerClass` | cadena | Clases adicionales en el elemento "Seleccionar desde el mapa" |
| `@mapContainerClass` | cadena | Clases adicionales en el contenedor del mapa |
| `@leafletMapClass` | cadena | Clases adicionales en el mapa de Leaflet |
| `@zoomControlClass` / `@zoomControlContainerClass` | cadena | Clases adicionales en los botones de zoom |

## Ejemplos del mundo real

```
<InputGroup @name="Ubicación de recogida">
  <CoordinatesInput
    @latitude={{this.location.lat}}
    @longitude={{this.location.lng}}
    @onUpdate={{this.handleCoordsChange}}
  />
</InputGroup>
```

## Ver también

* `<ModelCoordinatesInput>`
  — el mismo componente, pero vinculado al polígono `location` de un modelo de Fleetbase

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/coordinates-input.hbs` | Plantilla |
| `addon/components/coordinates-input.js` | Clase — utiliza Leaflet a través del servicio `leaflet` |
| `addon/components/model-coordinates-input.hbs` | Componente hermano — vinculado al polígono `location` de un modelo de Fleetbase |
| `addon/components/model-coordinates-input.js` |  |