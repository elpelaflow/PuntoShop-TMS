---
title: "Lugares"
url: https://fleetbase.io/docs/api/fleetbase/places
module: api
---

# Lugares

Los lugares representan ubicaciones físicas utilizadas en la planificación de rutas, la asignación de tareas, los contactos, las tiendas y los pedidos. Un lugar puede ser una dirección, un punto de referencia, una instalación o cualquier ubicación que Fleetbase pueda utilizar para la planificación.

* [El objeto Place](#el-objeto-place)
* [Crear un Lugar

  POST
  `/v1/places`](#crear-un-lugar)
* [Consultar Lugares

  GET
  `/v1/places`](#consultar-lugares)
* [Buscar Lugares

  GET
  `/v1/places/search`](#buscar-lugares)
* [Listar todos los Lugares

  GET
  `/v1/places`](#listar-todos-los-lugares)
* [Obtener un Lugar

  GET
  `/v1/places/:id`](#obtener-un-lugar)
* [Actualizar un Lugar

  PUT
  `/v1/places/:id`](#actualizar-un-lugar)
* [Eliminar un Lugar

  DELETE
  `/v1/places/:id`](#eliminar-un-lugar)

## El objeto Place

Un lugar representa una ubicación física utilizada por los recursos de FleetOps, como pedidos, cargas, proveedores, contactos y puntos de referencia. Almacena coordenadas georreferenciadas, campos de dirección, información de propiedad, detalles de contacto y metadatos.

Atributos

`id`

string

opcional

Identificador público del lugar.

`name`

string

opcional

Nombre de visualización del lugar.

`location`

object

opcional

Coordenadas espaciales para el lugar.

`address`

string

opcional

Dirección formateada para el lugar.

`avatar_url`

string

opcional

URL del avatar asociado con el lugar.

`street1`

string

opcional

Dirección principal.

`street2`

string

opcional

Dirección secundaria.

`city`

string

opcional

Ciudad o localidad.

`province`

string

opcional

Estado, provincia o región.

`postal_code`

string

opcional

Código postal.

`neighborhood`

string

opcional

Barrio o zona local.

`district`

string

opcional

Distrito o subdivisión administrativa.

`building`

string

opcional

Nombre, número o detalles adicionales del edificio.

`security_access_code`

string

opcional

Código de acceso o instrucciones de entrega necesarias para acceder al edificio.

`country`

string

opcional

Código de país.

`phone`

string

opcional

Número de teléfono asociado con el lugar.

`owner`

object

opcional

Recurso de contacto o proveedor que posee el lugar, cuando se carga.

`tracking_number`

object

opcional

Número de seguimiento asociado con el lugar, cuando se carga.

`type`

string

opcional

Clasificación del lugar.

`meta`

object

opcional

Metadatos adicionales del lugar.

`eta`

object

opcional

Datos estimados de llegada cuando se solicita la ETA de la ruta.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez el lugar.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó el lugar.

El
objeto
Place

```
{
  "id": "place_1A2b3C4d5E",
  "name": "Central Park",
  "location": {
    "latitude": 40.785091,
    "longitude": -73.968285
  },
  "address": "830 5th Ave, New York, NY 10065, USA",
  "avatar_url": null,
  "street1": "830 5th Ave",
  "street2": null,
  "city": "New York",
  "province": "New York",
  "postal_code": "10065",
  "neighborhood": "Manhattan",
  "district": "Midtown",
  "building": "Park Area",
  "security_access_code": null,
  "country": "US",
  "phone": "+12123106600",
  "type": "park",
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/places`

## [Crear un Lugar](#crear-un-lugar)

Crea un lugar para la empresa actual. Proporciona campos de dirección estructurados, un valor de dirección libre de texto o una dirección principal para que Fleetbase pueda geocodificar el lugar, o coordenadas para que Fleetbase pueda invertir el proceso de geocodificación.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización del lugar. Requerido para crear a menos que la dirección, la calle o las coordenadas sean suficientes para que Fleetbase pueda geocodificar el lugar.

`address`

string

opcional

Cadena de dirección para que Fleetbase pueda geocodificarla.

`street1`

string

opcional

Dirección principal. Requerido para crear a menos que se proporcionen la dirección o las coordenadas.

`street2`

string

opcional

Dirección secundaria.

`city`

string

opcional

Ciudad o localidad para la dirección.

`province`

string

opcional

Estado, provincia o región para la dirección.

`postal_code`

string

opcional

Código postal para la dirección.

`neighborhood`

string

opcional

Barrio o zona local para la dirección.

`district`

string

opcional

Distrito o subdivisión administrativa para la dirección.

`building`

string

opcional

Nombre, número o detalles adicionales del edificio.

`security_access_code`

string

opcional

Código de acceso o instrucciones de entrega necesarias para acceder al edificio.

`country`

string

opcional

Código de país para la dirección.

`phone`

string

opcional

Número de teléfono asociado con el lugar.

`location`

object

opcional

Punto resoluble utilizado como ubicación del lugar. Fleetbase acepta formatos de coordenadas y geocodifica campos de dirección faltantes.

`latitude`

number

opcional

Latitud decimal. Requerido con
`longitude`
.

`longitude`

number

opcional

Longitud decimal. Requerido con
`latitude`
.

`owner`

string

opcional

ID de contacto o proveedor que posee el lugar, cuando se carga.

`customer`

string

opcional

ID de contacto o proveedor para asignar como propietario del lugar.

`contact`

string

opcional

ID de contacto o proveedor para asignar como propietario del lugar.

`vendor`

string

opcional

ID de proveedor para asignar como propietario del lugar.

`type`

string

opcional

Clasificación del lugar.

`meta`

object

opcional

Metadatos adicionales del lugar.

POST
`/v1/places`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/places \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "Central Park",
  "street1": "830 5th Ave",
  "city": "New York",
  "province": "New York",
  "postal_code": "10065",
  "neighborhood": "Manhattan",
  "district": "Midtown",
  "building": "Park Area",
  "country": "US",
  "phone": "+12123106600",
  "type": "Park"
}'
```

Otras formas de llamar a este endpoint

* Crear un Lugar utilizando Coordenadas
* Crear un Lugar utilizando Coordenadas Array
* Crear un Lugar utilizando GeoJSON Point
* Crear un Lugar utilizando Dirección de Calle solamente

GET
`/v1/places`

## [Consultar Lugares](#consultar-lugares)

Busca y filtra lugares para la organización actual. Utiliza parámetros de consulta y de paginación para encontrar ubicaciones guardadas.

Parámetros de consulta

`query`

string

opcional

Término de búsqueda que coincide con los campos del lugar.

`limit`

integer

opcional

Número máximo de lugares para devolver.

`offset`

integer

opcional

Número de lugares para omitir antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la consulta de lugares.

`vendor`

string

opcional

ID de proveedor utilizado para filtrar lugares propiedad de un proveedor.

GET
`/v1/places`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/places?query={{place_name}}&limit=25&offset=<string>&sort=created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

GET
`/v1/places/search`

## [Buscar Lugares](#buscar-lugares)

Busca lugares por texto de búsqueda libre y contexto de ubicación opcional.

Parámetros de consulta

`query`

string

obligatorio

Texto de búsqueda libre que coincide con los campos de nombre y dirección del lugar.

`ll`

string

opcional

Contexto de latitud/longitud utilizado para clasificar o localizar los resultados de búsqueda.

`locale`

string

opcional

Indicador de idioma utilizado para la búsqueda de lugares.

`limit`

integer

opcional

Predeterminado:
`10`

Número máximo de lugares de coincidencia para devolver.

`geo`

boolean

opcional

Cuando es verdadero, habilita el comportamiento de búsqueda geoespacial.

`latitude`

number

opcional

Latitud para la búsqueda geoespacial.

`longitude`

number

opcional

Longitud para la búsqueda geoespacial.

GET
`/v1/places/search`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/places/search?query={{place_query}}&ll={{place_ll}}&locale={{locale}} \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/places`

## [Listar todos los Lugares](#listar-todos-los-lugares)

Devuelve una lista paginada de lugares para la organización actual. Los lugares se ordenan por fecha de creación, a menos que se proporcione otro orden.

Parámetros de consulta

`limit`

integer

opcional

Número máximo de lugares para devolver.

`offset`

integer

opcional

Número de lugares para omitir antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la lista de lugares.

GET
`/v1/places`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/places?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

GET
`/v1/places/:id`

## [Obtener un Lugar](#obtener-un-lugar)

Este endpoint le permite obtener el objeto Place para ver sus detalles.

GET
`/v1/places/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/places/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

PUT
`/v1/places/:id`

## [Actualizar un Lugar](#actualizar-un-lugar)

Actualiza un lugar estableciendo los campos incluidos en la solicitud. Envía campos de dirección, coordenadas, asignación de propietario, tipo, número de teléfono o metadatos para cambiar solo esos valores.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización del lugar.

`street1`

string

opcional

Dirección principal.

`street2`

string

opcional

Dirección secundaria.

`city`

string

opcional

Ciudad o localidad para la dirección.

`province`

string

opcional

Estado, provincia o región para la dirección.

`postal_code`

string

opcional

Código postal para la dirección.

`neighborhood`

string

opcional

Barrio o zona local para la dirección.

`district`

string

opcional

Distrito o subdivisión administrativa para la dirección.

`building`

string

opcional

Nombre, número o detalles adicionales del edificio.

`security_access_code`

string

opcional

Código de acceso o instrucciones de entrega necesarias para acceder al edificio.

`country`

string

opcional

Código de país para la dirección.

`phone`

string

opcional

Número de teléfono asociado con el lugar.

`location`

object

opcional

Punto resoluble utilizado como ubicación del lugar.

`latitude`

number

opcional

Latitud decimal. Requerido con
`longitude`
.

`longitude`

number

opcional

Longitud decimal. Requerido con
`latitude`
.

`owner`

string

opcional

ID de contacto o proveedor que posee el lugar, cuando se carga.

`customer`

string

opcional

ID de contacto o proveedor para asignar como propietario del lugar.

`contact`

string

opcional

ID de contacto o proveedor para asignar como propietario del lugar.

`vendor`

string

opcional

ID de proveedor para asignar como propietario del lugar.

`type`

string

opcional

Clasificación del lugar.

`meta`

object

opcional

Metadatos adicionales del lugar.

PUT
`/v1/places/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/places/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "Central Park",
  "street1": "830 5th Ave",
  "city": "New York",
  "province": "New York",
  "postal_code": "10065",
  "neighborhood": "Manhattan",
  "district": "Midtown",
  "building": "Park Area",
  "country": "US",
  "phone": "+12123106600",
  "type": "Park"
}'
```

DELETE
`/v1/places/:id`

## [Eliminar un Lugar](#eliminar-un-lugar)

Elimina un lugar.

DELETE
`/v1/places/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/places/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

`longitud decimal. Requerido con
`latitud`
.

`owner`

cadena

opcional

ID del propietario o proveedor.

`vendor`

cadena

opcional

ID del proveedor para asignar como propietario del lugar.

`type`

cadena

opcional

Clasificación del lugar.

`meta`

objeto

opcional

Metadatos adicionales del lugar.

PUT
`/v1/places/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/places/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Central Park Edit",
    "street1": "830 5th Ave a ",
    "city": "New York",
    "province": "New York",
    "postal_code": "10065",
    "neighborhood": "Manhattan",
    "district": "Midtown",
    "building": "Park Area",
    "country": "US",
    "phone": "+12123106600",
    "type": "Park"
}'
```

200

OK

```
{
  "id": "place_n0voYdE",
  "name": "Central Park Edited",
  "location": {
    "type": "Point",
    "coordinates": [
      -73.9712519,
      40.7676307
    ]
  },
  "address": "CENTRAL PARK EDITED - 830 5TH AVE, NEW YORK, 10065, UNITED STATES",
  "street1": "830 5th Ave",
  "street2": null,
  "city": "New York",
  "province": "New York",
  "postal_code": "10065",
  "neighborhood": "Manhattan",
  "district": "Midtown",
  "building": "Park Area",
  "security_access_code": null,
  "country": "US",
  "phone": null,
  "owner": null,
  "type": "Park",
  "meta": [],
  "updated_at": "2023-12-27T07:43:57.000000Z",
  "created_at": "2023-12-27T07:25:36.000000Z"
}
```

DELETE
`/v1/places/:id`

## [Eliminar un lugar](#delete-a-place)

Elimina permanentemente un lugar. No se puede deshacer.

DELETE
`/v1/places/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/places/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "place_n0voYdE",
  "object": "place",
  "time": "2023-12-27T07:44:36.000000Z",
  "deleted": true
}
```