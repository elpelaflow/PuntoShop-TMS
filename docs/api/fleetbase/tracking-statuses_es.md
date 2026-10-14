---
title: "Estados de seguimiento"
url: https://fleetbase.io/docs/api/fleetbase/tracking-statuses
module: api
---

# Estados de seguimiento

Los estados de seguimiento definen los hitos que se muestran durante el seguimiento del envío, desde la perspectiva del cliente. Utilícelos para crear y administrar las etiquetas, códigos y descripciones de estado que se muestran en los flujos de seguimiento.

* [El objeto de estado de seguimiento](#el-objeto-de-estado-de-seguimiento)
* [Crear un estado de seguimiento

  POST
  `/v1/tracking-statuses`](#crear-un-estado-de-seguimiento)
* [Actualizar un estado de seguimiento

  PUT
  `/v1/tracking-statuses/:id`](#actualizar-un-estado-de-seguimiento)
* [Obtener un estado de seguimiento

  GET
  `/v1/tracking-statuses/:id`](#obtener-un-estado-de-seguimiento)
* [Consultar estados de seguimiento

  GET
  `/v1/tracking-statuses`](#consultar-estados-de-seguimiento)
* [Eliminar un estado de seguimiento

  DELETE
  `/v1/tracking-statuses/:id`](#eliminar-un-estado-de-seguimiento)

## El objeto de estado de seguimiento

Un estado de seguimiento es un evento de línea de tiempo para un número de seguimiento. Almacena el texto del estado, los detalles, un código, la ubicación y el contexto de la dirección.

Atributos

`id`

string

opcional

Identificador público del estado de seguimiento.

`status`

string

opcional

Estado legible por humanos.

`details`

string

opcional

Detalles del estado.

`code`

string

opcional

Código de estado legible por máquina.

`complete`

boolean

opcional

Indica si este estado marca el flujo de trabajo de seguimiento como completo.

`tracking_number`

object

opcional

Número de seguimiento asociado al estado.

`city`

string

opcional

Ciudad donde ocurrió el estado.

`province`

string

opcional

Provincia o región donde ocurrió el estado.

`postal_code`

string

opcional

Código postal donde ocurrió el estado.

`country`

string

opcional

Código de país donde ocurrió el estado.

`location`

object

opcional

Ubicación donde ocurrió el estado.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez el estado de seguimiento.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó el estado de seguimiento.

El
objeto de estado de seguimiento
```
{
  "id": "tracking_status_6zV1KqN9pR",
  "status": "Creado",
  "details": "Se creó el pedido.",
  "code": "creado",
  "complete": false,
  "tracking_number": "tracking_3Nf8Qw2YxM",
  "city": "Singapur",
  "province": null,
  "postal_code": null,
  "country": "SG",
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/tracking-statuses`

## [Crear un estado de seguimiento](#crear-un-estado-de-seguimiento)

Cree un nuevo estado de seguimiento.

Parámetros del cuerpo

`tracking_number`

string

opcional

ID del número de seguimiento para asociarlo al estado. Es requerido a menos que se proporcione `order`.

`order`

string

opcional

ID del pedido utilizado para resolver el número de seguimiento del pedido cuando no se proporciona `tracking_number`.

`status`

string

requerido

Estado de seguimiento legible por humanos.

`code`

string

requerido

Código de estado de seguimiento legible por máquina.

`details`

string

requerido

Detalles del estado visibles para los consumidores de seguimiento.

`location`

object

opcional

Punto resoluble donde ocurrió el estado. Es requerido a menos que se proporcionen la latitud y la longitud.

`latitude`

number

opcional

Latitud decimal para la ubicación del estado.

`longitude`

number

opcional

Longitud decimal para la ubicación del estado.

`city`

string

opcional

Ciudad donde ocurrió el estado.

`province`

string

opcional

Provincia o región donde ocurrió el estado.

`postal_code`

string

opcional

Código postal donde ocurrió el estado.

`country`

string

opcional

Código de país donde ocurrió el estado.

`duplicate`

boolean

opcional

Cuando es verdadero, permite texto de estado duplicado para el mismo pedido o número de seguimiento.

POST
`/v1/tracking-statuses`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/tracking-statuses \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "status": "En tránsito",
    "code": "en-tránsito",
    "details": "Nuestro conductor ha recogido su pedido y está en camino a su dirección!",
    "tracking_number": "{{tracking_number_id}}",
    "location": [1.3521, 103.8198],
    "city": "Singapur"
}'
```

200

OK

```
{
  "id": "<string>",
  "status": "<string>",
  "details": "<string>",
  "code": "<string>",
  "tracking_number": "<string>",
  "city": "<string>",
  "province": "<string>",
  "postal_code": "<string>",
  "country": "<string>",
  "location": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

PUT
`/v1/tracking-statuses/:id`

## [Actualizar un estado de seguimiento](#actualizar-un-estado-de-seguimiento)

Actualiza un estado de seguimiento existente. La respuesta devuelve el estado de seguimiento con los nuevos valores aplicados.

Parámetros del cuerpo

`status`

string

opcional

Estado de seguimiento legible por humanos.

`code`

string

opcional

Código de estado de seguimiento legible por máquina.

`details`

string

opcional

Detalles del estado visibles para los consumidores de seguimiento.

`location`

object

opcional

Punto resoluble donde ocurrió el estado.

`latitude`

number

opcional

Latitud decimal para la ubicación del estado.

`longitude`

number

opcional

Longitud decimal para la ubicación del estado.

`city`

string

opcional

Ciudad donde ocurrió el estado.

`province`

string

opcional

Provincia o región donde ocurrió el estado.

`postal_code`

string

opcional

Código postal donde ocurrió el estado.

`country`

string

opcional

Código de país donde ocurrió el estado.

PUT
`/v1/tracking-statuses/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/tracking-statuses/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "country": "SG"
}'
```

200

OK

```
{
  "id": "<string>",
  "status": "<string>",
  "details": "<string>",
  "code": "<string>",
  "tracking_number": "<string>",
  "city": "<string>",
  "province": "<string>",
  "postal_code": "<string>",
  "country": "<string>",
  "location": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/tracking-statuses/:id`

## [Obtener un estado de seguimiento](#obtener-un-estado-de-seguimiento)

Obtenga un estado de seguimiento.

GET
`/v1/tracking-statuses/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/tracking-statuses/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "status": "<string>",
  "details": "<string>",
  "code": "<string>",
  "tracking_number": "<string>",
  "city": "<string>",
  "province": "<string>",
  "postal_code": "<string>",
  "country": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/tracking-statuses`

## [Consultar estados de seguimiento](#consultar-estados-de-seguimiento)

Enumere todos los estados de seguimiento

Parámetros de consulta

`limit`

integer

opcional

Número máximo de estados de seguimiento que se devolverán.

`offset`

integer

opcional

Número de estados de seguimiento que se omitirán antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la consulta de estado de seguimiento.

`tracking_number`

string

opcional

Filtra los estados por ID del número de seguimiento.

GET
`/v1/tracking-statuses`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/tracking-statuses?limit=25&tracking_number={{tracking_number_id}} \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "status": "<string>",
  "details": "<string>",
  "code": "<string>",
  "tracking_number": "<string>",
  "city": "<string>",
  "postal_code": "<string>",
  "country": "<string>",
  "location": "<string>",
  "updated_at": "<string>"
}
```

DELETE
`/v1/tracking-statuses/:id`

## [Eliminar un estado de seguimiento](#eliminar-un-estado-de-seguimiento)

Elimine un estado de seguimiento.

DELETE
`/v1/tracking-statuses/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/tracking-statuses/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "status": "<string>",
  "details": "<string>",
  "code": "<string>",
  "tracking_number": "<string>",
  "city": "<string>",
  "province": "<string>",
  "postal_code": "<string>",
  "country": "<string>",
  "location": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```