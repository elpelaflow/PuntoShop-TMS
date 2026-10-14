---
title: "Áreas de servicio"
url: https://fleetbase.io/docs/api/fleetbase/service-areas
module: api
---

# Áreas de servicio

Las áreas de servicio definen las regiones geográficas donde opera una flota, un transportista o una zona operativa. Utilice las áreas de servicio para restringir la disponibilidad, los precios, la planificación de rutas y el comportamiento de asignación por región.

* [El objeto Service Area](#el-objeto-service-area)
* [Crear una Área de Servicio

  POST
  `/v1/service-areas`](#crear-una-area-de-servicio)
* [Obtener una Área de Servicio

  GET
  `/v1/service-areas/:id`](#obtener-una-area-de-servicio)
* [Consultar Áreas de Servicio

  GET
  `/v1/service-areas`](#consultar-areas-de-servicio)
* [Actualizar una Área de Servicio

  PUT
  `/v1/service-areas/:id`](#actualizar-una-area-de-servicio)
* [Eliminar una Área de Servicio

  DELETE
  `/v1/service-areas/:id`](#eliminar-una-area-de-servicio)

## El objeto Service Area

Una área de servicio define una región de operación. Almacena un punto central, la geometría del límite, el tipo, el estado y, opcionalmente, las zonas cargadas.

Atributos

`id`

string

opcional

Identificador público de la área de servicio.

`name`

string

opcional

Nombre de visualización de la área de servicio.

`type`

string

opcional

Tipo de área de servicio.

`center`

object

opcional

Punto central de la área de servicio.

`border`

object

opcional

Geometría del límite de la área de servicio.

`zones`

array of objects

opcional

Zonas cargadas con la área de servicio.

`status`

string

opcional

Estado de la área de servicio. Puede ser `active` o `inactive`.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez la área de servicio.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó la área de servicio.

El
objeto Service Area
```
{
  "id": "service_area_4Mnp8Qx2Vz",
  "name": "Singapore",
  "type": "country",
  "center": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "border": [],
  "zones": [],
  "status": "active",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/service-areas`

## [Crear una Área de Servicio](#crear-una-area-de-servicio)

Una área de servicio se crea simplemente proporcionando una ciudad, provincia o país en el que Fleetbase podrá geocodificar para crear una área de servicio.

Si Fleetbase no puede geocodificar la área de servicio, devolverá un error.

Parámetros del cuerpo

`name`

string

obligatorio

Nombre de visualización de la área de servicio.

`country`

string

obligatorio

Código o nombre del país para la área de servicio.

`type`

string

opcional

Tipo de área de servicio.

`status`

enum

opcional

Estado de la área de servicio. Puede ser `active` o `inactive`.

`border`

object

opcional

Geometría del límite de la área de servicio. Se requiere al crear, a menos que se proporcione una ubicación o latitud/longitud.

`location`

object

opcional

Punto resoluble utilizado para crear un área de servicio circular.

`latitude`

number

opcional

Latitud decimal para un área de servicio circular. Se requiere con
`longitude`
.

`longitude`

number

opcional

Longitud decimal para un área de servicio circular. Se requiere con
`latitude`
.

`radius`

number

opcional

Valor predeterminado:
`500`

Radio en metros al crear un área de servicio circular.

`parent`

string

opcional

ID del área de servicio padre.

`color`

string

opcional

Color de relleno utilizado al renderizar la área de servicio.

`stroke_color`

string

opcional

Color del trazo utilizado al renderizar la área de servicio.

`trigger_on_entry`

boolean

opcional

Si la entrada en esta área de servicio debe activar eventos de geofensa.

`trigger_on_exit`

boolean

opcional

Si la salida de esta área de servicio debe activar eventos de geofensa.

`dwell_threshold_minutes`

integer

opcional

Minutos dentro de la área de servicio antes de que se active el comportamiento de permanencia.

`speed_limit_kmh`

integer

opcional

Límite de velocidad en kilómetros por hora para los eventos de geofensa.

POST
`/v1/service-areas`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/service-areas \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Singapore",
    "type": "city",
    "latitude": "1.3521",
    "longitude": "103.8198",
    "radius": "30000",
    "country": "SG",
    "status": "active"
}'
```

Otras formas de llamar a este endpoint

* Crear una Área de Servicio utilizando GeoJSON Point

GET
`/v1/service-areas/:id`

## [Obtener una Área de Servicio](#obtener-una-area-de-servicio)

Este endpoint le permite obtener el objeto de la área de servicio para ver sus detalles.

GET
`/v1/service-areas/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-areas/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "type": "<string>",
  "latitude": "<string>",
  "longitude": "<string>",
  "status": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/service-areas`

## [Consultar Áreas de Servicio](#consultar-areas-de-servicio)

Devuelve las áreas de servicio que coinciden con los filtros proporcionados. Utilícelo para encontrar las áreas de servicio configuradas por nombre u otros parámetros de consulta.

Parámetros de consulta

`query`

string

opcional

Término de búsqueda que coincide con los campos de la área de servicio.

`limit`

integer

opcional

Número máximo de áreas de servicio que se devolverán.

`offset`

integer

opcional

Número de áreas de servicio que se omitirán antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la consulta de la área de servicio.

`country`

string

opcional

Filtra las áreas de servicio por país.

GET
`/v1/service-areas`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-areas?name={{service_area_name}} \
  -H "Authorization: Bearer flb_live_…"
```

PUT
`/v1/service-areas/:id`

## [Actualizar una Área de Servicio](#actualizar-una-area-de-servicio)

Solo puede actualizar el estado de la área de servicio.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización de la área de servicio.

`country`

string

opcional

Código o nombre del país para la área de servicio.

`type`

string

opcional

Tipo de área de servicio.

`status`

enum

opcional

Estado de la área de servicio. Puede ser `active` o `inactive`.

`border`

object

opcional

Geometría del límite de la área de servicio.

`location`

object

opcional

Punto resoluble utilizado para crear un área de servicio circular.

`latitude`

number

opcional

Latitud decimal para un área de servicio circular. Se requiere con
`longitude`
.

`longitude`

number

opcional

Longitud decimal para un área de servicio circular. Se requiere con
`latitude`
.

`radius`

number

opcional

Valor predeterminado:
`500`

Radio en metros al actualizar un área de servicio circular.

`parent`

string

opcional

ID del área de servicio padre.

`color`

string

opcional

Color de relleno utilizado al renderizar la área de servicio.

`stroke_color`

string

opcional

Color del trazo utilizado al renderizar la área de servicio.

`trigger_on_entry`

boolean

opcional

Si la entrada en esta área de servicio debe activar eventos de geofensa.

`trigger_on_exit`

boolean

opcional

Si la salida de esta área de servicio debe activar eventos de geofensa.

`dwell_threshold_minutes`

integer

opcional

Minutos dentro de la área de servicio antes de que se active el comportamiento de permanencia.

`speed_limit_kmh`

integer

opcional

Límite de velocidad en kilómetros por hora para los eventos de geofensa.

PUT
`/v1/service-areas/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/service-areas/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "status": "active"
}'
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "type": "<string>",
  "latitude": "<string>",
  "longitude": "<string>",
  "status": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

DELETE
`/v1/service-areas/:id`

## [Eliminar una Área de Servicio](#eliminar-una-area-de-servicio)

Utilice este endpoint para eliminar una área de servicio. Al eliminar una área de servicio, también se eliminarán todas las zonas dentro de la área de servicio.

DELETE
`/v1/service-areas/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/service-areas/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{}
```