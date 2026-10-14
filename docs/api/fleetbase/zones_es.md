---
title: "Zonas"
url: https://fleetbase.io/docs/api/fleetbase/zones
module: api
---

# Zonas

Las zonas definen límites dentro de un área de servicio para la fijación de precios, la asignación y el control operativo. Utilice las zonas para modelar barrios, regiones de entrega, áreas restringidas o superposiciones de mapas estilizadas.

* [El objeto Zone](#el-objeto-zone)
* [Crear una Zona

  POST
  `/v1/zones`](#crear-una-zona)
* [Obtener una Zona

  GET
  `/v1/zones/:id`](#obtener-una-zona)
* [Consultar Zonas

  GET
  `/v1/zones`](#consultar-zonas)
* [Actualizar una Zona

  PUT
  `/v1/zones/:id`](#actualizar-una-zona)
* [Eliminar una Zona

  DELETE
  `/v1/zones/:id`](#eliminar-una-zona)

## El objeto Zone

Un objeto Zone representa un área delimitada geográficamente dentro de un área de servicio. Almacena un punto central, la geometría del borde, los colores de visualización, la configuración de activación de la delimitación geográfica y el estado del ciclo de vida.

Atributos

`id`

string

opcional

Identificador de zona público.

`name`

string

opcional

Nombre de visualización de la zona.

`description`

string

opcional

Descripción de la zona.

`center`

object

opcional

Punto central para la zona.

`border`

object

opcional

Geometría del borde de la zona.

`color`

string

opcional

Color de relleno utilizado al renderizar la zona.

`stroke_color`

string

opcional

Color del contorno utilizado al renderizar la zona.

`status`

string

opcional

Estado de la zona.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez la zona.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó la zona.

El
objeto
Zone

```
{
  "id": "zone_7YqM3KpL2n",
  "name": "Downtown",
  "description": "Zona de entrega Downtown",
  "center": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "border": [],
  "color": "#1f78ff",
  "stroke_color": "#0b4fc4",
  "status": "active",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/zones`

## [Crear una Zona](#crear-una-zona)

Crea una zona dentro de un área de servicio. Proporcione un límite GeoJSON o un punto central con radio, y Fleetbase almacenará la zona para la delimitación geográfica y las comprobaciones de cobertura de servicio.

Parámetros del cuerpo

`name`

string

obligatorio

Nombre de visualización de la zona.

`service_area`

string

obligatorio

ID del área de servicio a la que pertenece la zona.

`border`

object

opcional

Borde poligonal de la zona. Es obligatorio en la creación, a menos que se proporcione una ubicación o latitud/longitud.

`location`

object

opcional

Punto resoluble utilizado para crear una zona circular.

`latitude`

number

opcional

Latitud decimal para una zona circular. Es obligatorio con
`longitude`
.

`longitude`

number

opcional

Longitud decimal para una zona circular. Es obligatorio con
`latitude`
.

`radius`

number

opcional

Valor predeterminado:
`500`

Radio en metros al crear una zona circular.

`description`

string

opcional

Descripción de la zona.

`color`

string

opcional

Color de relleno utilizado al renderizar la zona.

`stroke_color`

string

opcional

Color del contorno utilizado al renderizar la zona.

`status`

enum

opcional

Estado de la zona. Uno de
`active`
,
`inactive`
.

`trigger_on_entry`

boolean

opcional

Si la entrada en esta zona debe activar los eventos de delimitación geográfica.

`trigger_on_exit`

boolean

opcional

Si la salida de esta zona debe activar los eventos de delimitación geográfica.

`dwell_threshold_minutes`

integer

opcional

Minutos dentro de la zona antes de que se active el comportamiento de permanencia.

`speed_limit_kmh`

integer

opcional

Límite de velocidad en kilómetros por hora para los eventos de delimitación geográfica.

POST
`/v1/zones`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/zones \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Center of Singapore",
    "service_area": "{{service_area_id}}",
    "color":"#66e0ff",
    "stroke_color":"#00bfff",
    "border": {
        "type":"Polygon",
        "bbox":[103.867493,1.35085,103.912125,1.383113],
        "coordinates":[
            [
                [103.907661,1.362863],
                [103.892555,1.357714],
                [103.891525,1.353252],
                [103.883629,1.35085],
                [103.874702,1.351193],
                [103.870583,1.358744],
                [103.867493,1.368354],
                [103.870926,1.377621],
                [103.875732,1.38174],
                [103.886032,1.383113],
                [103.900452,1.383113],
                [103.909721,1.381397],
                [103.912125,1.374189],
                [103.907661,1.362863]
            ]
        ]
    }
}'
```

200

OK

```
{
  "id": "<string>",
  "service_area": "<string>",
  "name": "<string>",
  "description": "<string>",
  "coordinates": "<string>",
  "color": "<string>",
  "stroke_color": "<string>",
  "status": "<string>",
  "created_at": "<string>",
  "updated_at": "<string>"
}
```

GET
`/v1/zones/:id`

## [Obtener una Zona](#obtener-una-zona)

Obtiene una zona individual por ID. La respuesta incluye la geometría de la zona, el estilo de visualización y la relación con el área de servicio.

GET
`/v1/zones/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/zones/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "service_area": "<string>",
  "name": "<string>",
  "description": "<string>",
  "coordinates": "<string>",
  "color": "<string>",
  "stroke_color": "<string>",
  "status": "<string>",
  "updated_at": "2024-01-02T05:54:57.000000Z",
  "created_at": "2024-01-02T05:54:57.000000Z"
}
```

GET
`/v1/zones`

## [Consultar Zonas](#consultar-zonas)

Devuelve las zonas que coinciden con los filtros proporcionados. Utilícelo para encontrar delimitaciones geográficas configuradas por nombre u otros parámetros de consulta.

Parámetros de consulta

`query`

string

opcional

Término de búsqueda que coincide con los campos de la zona.

`limit`

integer

opcional

Número máximo de zonas que se devolverán.

`offset`

integer

opcional

Número de zonas que se omitirán antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la consulta de la zona.

`service_area`

string

opcional

Filtra las zonas por ID del área de servicio.

GET
`/v1/zones`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/zones?name={{zone_name}} \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "service_area": "<string>",
  "name": "<string>",
  "description": "<string>",
  "coordinates": "<string>",
  "color": "<string>",
  "stroke_color": "<string>",
  "status": "<string>",
  "created_at": "<string>",
  "updated_at": "<string>"
}
```

PUT
`/v1/zones/:id`

## [Actualizar una Zona](#actualizar-una-zona)

Puede actualizar todas las propiedades de la Zona.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización de la zona.

`service_area`

string

opcional

ID del área de servicio a la que pertenece la zona.

`border`

object

opcional

Borde poligonal de la zona. Es obligatorio en la creación, a menos que se proporcione una ubicación o latitud/longitud.

`location`

object

opcional

Punto resoluble utilizado para crear una zona circular.

`latitude`

number

opcional

Latitud decimal para una zona circular. Es obligatorio con
`longitude`
.

`longitude`

number

opcional

Longitud decimal para una zona circular. Es obligatorio con
`latitude`
.

`radius`

number

opcional

Valor predeterminado:
`500`

Radio en metros al crear una zona circular.

`description`

string

opcional

Descripción de la zona.

`color`

string

opcional

Color de relleno utilizado al renderizar la zona.

`stroke_color`

string

opcional

Color del contorno utilizado al renderizar la zona.

`status`

enum

opcional

Estado de la zona. Uno de
`active`
,
`inactive`
.

`trigger_on_entry`

boolean

opcional

Si la entrada en esta zona debe activar los eventos de delimitación geográfica.

`trigger_on_exit`

boolean

opcional

Si la salida de esta zona debe activar los eventos de delimitación geográfica.

`dwell_threshold_minutes`

integer

opcional

Minutos dentro de la zona antes de que se active el comportamiento de permanencia.

`speed_limit_kmh`

integer

opcional

Límite de velocidad en kilómetros por hora para los eventos de delimitación geográfica.

PUT
`/v1/zones/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/zones/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "color": "#ff00000"
}'
```

200

OK

```
{
  "id": "<string>",
  "service_area": "<string>",
  "name": "<string>",
  "description": "<string>",
  "coordinates": "<string>",
  "color": "<string>",
  "stroke_color": "<string>",
  "status": "<string>",
  "created_at": "<string>",
  "updated_at": "<string>"
}
```

DELETE
`/v1/zones/:id`

## [Eliminar una Zona](#eliminar-una-zona)

Utilice este punto final para eliminar una zona.

DELETE
`/v1/zones/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/zones/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "deleted": "<boolean>",
  "id": "<string>"
}
```