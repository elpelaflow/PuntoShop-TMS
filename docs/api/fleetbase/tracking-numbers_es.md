---
title: "Números de seguimiento"
url: https://fleetbase.io/docs/api/fleetbase/tracking-numbers
module: api
---

# Números de seguimiento

Los números de seguimiento identifican envíos, cargas y artefactos de flujo de trabajo que se pueden escanear. Utilice los puntos finales de números de seguimiento para crear identificadores, decodificar datos QR y asociar referencias de seguimiento a las operaciones.

* [El objeto "Número de seguimiento](#the-tracking-number-object)
* [Crear un número de seguimiento

  POST
  `/v1/tracking-numbers`](#create-a-tracking-number)
* [Decodificar el QR del número de seguimiento

  POST
  `/v1/tracking-numbers/from-qr`](#decode-tracking-number-qr)
* [Obtener un número de seguimiento

  GET
  `/v1/tracking-numbers/:id`](#retrieve-a-tracking-number)
* [Consultar números de seguimiento

  GET
  `/v1/tracking-numbers`](#query-tracking-numbers)
* [Eliminar un número de seguimiento

  DELETE
  `/v1/tracking-numbers/:id`](#delete-a-tracking-number)

## El objeto "Número de seguimiento"

Un número de seguimiento vincula un código de seguimiento generado con un pedido o entidad. Permite visualizar el estado de seguimiento actual, los activos QR y de código de barras, la URL de seguimiento en la consola y el tipo de propietario.

Atributos

`id`

string

opcional

Identificador público del número de seguimiento.

`tracking_number`

string

opcional

Código de seguimiento generado.

`subject`

string

opcional

ID público del pedido o entidad propietario.

`region`

string

opcional

Región utilizada para el número de seguimiento.

`status`

string

opcional

Estado más reciente legible por humanos.

`status_code`

string

opcional

Código de estado más reciente legible por máquinas.

`qr_code`

string

opcional

URL o datos del código QR.

`barcode`

string

opcional

URL o datos del código de barras.

`url`

string

opcional

URL de seguimiento.

`type`

string

opcional

Tipo de recurso propietario.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez el número de seguimiento.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó el número de seguimiento.

El
objeto "Número de seguimiento"

```
{
  "id": "tracking_3Nf8Qw2YxM",
  "tracking_number": "FB-1001",
  "subject": "order_7YqM3KpL2n",
  "region": "US",
  "status": "Created",
  "status_code": "created",
  "qr_code": "https://api.fleetbase.io/qr/FB-1001",
  "barcode": "https://api.fleetbase.io/barcode/FB-1001",
  "url": "https://console.fleetbase.io/track-order/FB-1001",
  "type": "order",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/tracking-numbers`

## [Crear un número de seguimiento](#create-a-tracking-number)

Este punto final le permite obtener un objeto "Número de seguimiento" para visualizar sus detalles.

Parámetros del cuerpo

`region`

string

obligatorio

Código de región utilizado al generar el número de seguimiento.

`owner`

string

obligatorio

ID del pedido o entidad que es propietario del número de seguimiento.

`type`

enum

opcional

Granularidad de la región utilizada al generar el número de seguimiento. Puede ser
`city`
,
`province`
,
`country`
.

`status`

enum

opcional

Estado inicial del número de seguimiento. Puede ser
`active`
,
`inactive`
.

POST
`/v1/tracking-numbers`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/tracking-numbers \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "region": "SG",
    "owner": "{{order_id}}"
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

POST
`/v1/tracking-numbers/from-qr`

## [Decodificar el QR del número de seguimiento](#decode-tracking-number-qr)

Decodifica el UUID del código QR de un número, entidad o pedido y devuelve el recurso correspondiente.

Parámetros del cuerpo

`code`

string

obligatorio

UUID del código QR para resolverlo en el número, entidad o recurso de seguimiento correspondiente.

POST
`/v1/tracking-numbers/from-qr`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/tracking-numbers/from-qr \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "code": "{{qr_code}}"
}'
```

GET
`/v1/tracking-numbers/:id`

## [Obtener un número de seguimiento](#retrieve-a-tracking-number)

Este punto final le permite obtener un objeto "Número de seguimiento" para visualizar sus detalles.

GET
`/v1/tracking-numbers/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/tracking-numbers/:id \
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
`/v1/tracking-numbers`

## [Consultar números de seguimiento](#query-tracking-numbers)

Este punto final le permite consultar números de seguimiento que ha creado, y también proporciona resultados paginados de todos los números de seguimiento en su Fleetbase.

Parámetros de consulta

`query`

string

opcional

Término de búsqueda que coincide con los campos del número de seguimiento.

`limit`

integer

opcional

Número máximo de números de seguimiento que se devolverán.

`offset`

integer

opcional

Número de números de seguimiento que se omitirán antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la consulta del número de seguimiento.

`owner`

string

opcional

Filtra los números de seguimiento por el ID del pedido o entidad propietario.

`status`

string

opcional

Filtra los números de seguimiento por el estado más reciente.

GET
`/v1/tracking-numbers`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/tracking-numbers?query=SG&limit=25&offset=0&sort=created_at \
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

DELETE
`/v1/tracking-numbers/:id`

## [Eliminar un número de seguimiento](#delete-a-tracking-number)

Elimina un número de seguimiento por ID.

DELETE
`/v1/tracking-numbers/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/tracking-numbers/:id \
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