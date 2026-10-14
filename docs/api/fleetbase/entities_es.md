---
title: "Entidades"
url: https://fleetbase.io/docs/api/fleetbase/entities
module: api
---

# Entidades

Las entidades describen los bienes, paquetes o artículos individuales que se transportan dentro de una carga. Utilice las entidades para capturar dimensiones, peso, valor declarado, metadatos de seguimiento y propiedad del cliente para el contenido del envío.

* [El objeto Entity](#el-objeto-entity)
* [Crear una Entidad

  POST
  `/v1/entities`](#crear-una-entidad)
* [Consultar Entidades

  GET
  `/v1/entities`](#consultar-entidades)
* [Obtener una Entidad

  GET
  `/v1/entities/:id`](#obtener-una-entidad)
* [Actualizar una Entidad

  PUT
  `/v1/entities/:id`](#actualizar-una-entidad)
* [Eliminar una Entidad

  DELETE
  `/v1/entities/:id`](#eliminar-una-entidad)

## El objeto Entity

Un entity representa un artículo, paquete, envío o unidad física asociada a una carga. Puede incluir dimensiones, peso, precios, destino, cliente, información de seguimiento y metadatos.

Atributos

`id`

string

opcional

Identificador único de la entidad.

`internal_id`

string

opcional

Identificador interno opcional para la entidad.

`name`

string

opcional

Nombre de visualización para la entidad.

`type`

string

opcional

Tipo de entidad.

`payload`

string

opcional

ID público de la carga asociada a la entidad.

`destination`

string

opcional

ID público del lugar de destino.

`customer`

object

opcional

Información de contacto o proveedor asociado a la entidad.

`supplier`

object

opcional

Proveedor asociado a la entidad, cuando se carga.

`tracking_number`

object

opcional

Recurso de número de seguimiento generado para la entidad.

`description`

string

opcional

Descripción legible por humanos de la entidad.

`photo_url`

string

opcional

URL de la foto asociada a la entidad.

`length`

number

opcional

Longitud de la entidad.

`width`

number

opcional

Ancho de la entidad.

`height`

number

opcional

Altura de la entidad.

`dimensions_unit`

string

opcional

Unidad para la longitud, el ancho y la altura.

`weight`

number

opcional

Peso de la entidad.

`weight_unit`

string

opcional

Unidad para el peso.

`declared_value`

currency

opcional

Valor declarado de la entidad.

`price`

currency

opcional

Precio de la entidad.

`sale_price`

currency

opcional

Precio de venta de la entidad.

`sku`

string

opcional

Código de identificación de stock para la entidad.

`currency`

currency

opcional

Código de moneda de tres letras para los campos monetarios.

`meta`

object

opcional

Metadatos adicionales de la entidad.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez la entidad.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó la entidad.

El
objeto
Entity

```
{
  "id": "entity_4Mnp8Qx2Vz",
  "internal_id": "ENTITY001",
  "name": "Sample Entity",
  "type": "parcel",
  "payload": "payload_x9Z2Lm8QpA",
  "destination": "place_9Z8y7X6w5V",
  "customer": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-ENTITY-1001"
  },
  "description": "Sample description",
  "photo_url": null,
  "length": 10,
  "width": 5,
  "height": 8,
  "dimensions_unit": "mm",
  "weight": 2.5,
  "weight_unit": "kg",
  "declared_value": 1500,
  "price": 1200,
  "sale_price": 900,
  "sku": "SKU123",
  "currency": "USD",
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/entities`

## [Crear una Entidad](#crear-una-entidad)

Crea una entidad, como un paquete, envío o artículo. Asócialo a una carga y, opcionalmente, especifica un destino o punto de parada dentro de la ruta de la carga.

Parámetros del cuerpo

`name`

string

obligatorio

Nombre de visualización para la entidad.

`type`

string

obligatorio

Tipo de entidad, como
`parcel`
,
`package`
o cualquier otro tipo definido por la aplicación.

`internal_id`

string

opcional

Identificador interno opcional para la entidad.

`description`

string

opcional

Descripción legible por humanos de la entidad.

`payload`

string

opcional

ID de la carga para asociar la entidad. Es obligatorio cuando se proporciona
`destination`
o
`waypoint`
.

`destination`

string

opcional

ID del lugar dentro de la ruta de la carga para utilizar como destino de la entidad.

`waypoint`

string

opcional

Alias para
`destination`
; resuelve un lugar dentro de la ruta de la carga.

`customer`

string

opcional

ID de contacto o proveedor para asignar como cliente de la entidad.

`driver`

string

opcional

ID del conductor para asociar con la entidad.

`email`

string

opcional

Dirección de correo electrónico de contacto asociada a la entidad.

`weight`

number

opcional

Peso de la entidad.

`weight_unit`

enum

opcional

Unidad para
`weight`
. Es obligatorio cuando se proporciona
`weight`
. Puede ser
`g`
,
`oz`
,
`lb`
o
`kg`
.

`length`

number

opcional

Longitud de la entidad.

`width`

number

opcional

Ancho de la entidad.

`height`

number

opcional

Altura de la entidad.

`dimensions_unit`

enum

opcional

Unidad para la longitud, el ancho y la altura. Es obligatorio cuando se proporcionan las dimensiones. Puede ser
`cm`
,
`in`
,
`ft`
,
`mm`
,
`m`
o
`yd`
.

`declared_value`

currency

opcional

Valor declarado de la entidad.

`price`

currency

opcional

Precio de la entidad.

`sale_price`

currency

opcional

Precio de venta de la entidad.

`sku`

string

opcional

Código de identificación de stock para la entidad.

`currency`

currency

opcional

Código de moneda de tres letras para los campos monetarios.

`meta`

object

opcional

Metadatos adicionales de la entidad.

POST
`/v1/entities`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/entities \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "SampleEntity",
    "type": "parcel",
    "payload": "{{payload_id}}",
    "customer": "ACustomer",
    "internal_id": "ENTITY001",
    "description": "Sample description",
    "meta": {
        "warehouse_bin": "1",
        "warehouse_rack": "3",
        "warehouse_section": "4"
    },
    "weight": 2.5,
    "weight_unit": "kg",
    "length": 10,
    "width": 5,
    "height": 8,
    "dimensions_unit": "mm",
    "declared_value": 1500,
    "price": 1200,
    "sale_price": 900,
    "sku": "SKU123",
    "currency": "USD"
}'
```

200

OK

```
{}
```

GET
`/v1/entities`

## [Consultar Entidades](#consultar-entidades)

Devuelve las entidades para la empresa actual. Utilice filtros como
`type`
,
`payload`
o
`destination`
para refinar el conjunto de resultados.

Parámetros de consulta

`limit`

integer

opcional

Número máximo de entidades a devolver.

`offset`

integer

opcional

Número de entidades a omitir antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la consulta de entidad.

`type`

string

opcional

Filtra las entidades por tipo de entidad.

`payload`

string

opcional

Filtra las entidades por ID de carga.

`destination`

string

opcional

Filtra las entidades por ID del lugar de destino.

GET
`/v1/entities`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/entities?limit=25&offset=0&sort=created_at&type=parcel \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/entities/:id`

## [Obtener una Entidad](#obtener-una-entidad)

Obtener una entidad.

GET
`/v1/entities/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/entities/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "payload": "<string>",
  "tracking_number": "<string>",
  "customer": "<string>",
  "internal_id": "<string>",
  "name": "<string>",
  "type": "<string>",
  "description": "<string>",
  "currency": "<string>",
  "weight": "<number>",
  "weight_unit": "<string>",
  "length": "<number>",
  "width": "<number>",
  "height": "<number>",
  "dimensions_unit": "<string>",
  "declared_value": "<number>",
  "sku": "<string>",
  "price": "<number>",
  "sale_price": "<number>",
  "meta": [],
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

PUT
`/v1/entities/:id`

## [Actualizar una Entidad](#actualizar-una-entidad)

Actualiza los campos descriptivos, la asignación de carga, el destino, las dimensiones, el peso, los precios o los metadatos de una entidad.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización para la entidad.

`type`

string

opcional

Tipo de entidad.

`internal_id`

string

opcional

Identificador interno opcional para la entidad.

`description`

string

opcional

Descripción legible por humanos de la entidad.

`payload`

string

opcional

ID de la carga para asignar a la entidad. Es obligatorio cuando se proporciona
`destination`
o
`waypoint`
.

`destination`

string

opcional

ID del lugar dentro de la ruta de la carga para utilizar como destino de la entidad.

`waypoint`

string

opcional

Alias para
`destination`
; resuelve un lugar dentro de la ruta de la carga.

`customer`

string

opcional

ID de contacto o proveedor para asignar como cliente de la entidad.

`driver`

string

opcional

ID del conductor para asociar con la entidad.

`email`

string

opcional

Dirección de correo electrónico de contacto asociada a la entidad.

`weight`

number

opcional

Peso de la entidad.

`weight_unit`

enum

opcional

Unidad para
`weight`
. Es obligatorio cuando se proporciona
`weight`
. Puede ser
`g`
,
`oz`
,
`lb`
o
`kg`
.

`length`

number

opcional

Longitud de la entidad.

`width`

number

opcional

Ancho de la entidad.

`height`

number

opcional

Altura de la entidad.

`dimensions_unit`

enum

opcional

Unidad para la longitud, el ancho y la altura. Es obligatorio cuando se proporcionan las dimensiones. Puede ser
`cm`
,
`in`
,
`ft`
,
`mm`
,
`m`
o
`yd`
.

`declared_value`

currency

opcional

Valor declarado de la entidad.

`price`

currency

opcional

Precio de la entidad.

`sale_price`

currency

opcional

Precio de venta de la entidad.

`sku`

string

opcional

Código de identificación de stock para la entidad.

`currency`

currency

opcional

Código de moneda de tres letras para los campos monetarios.

`meta`

object

opcional

Metadatos adicionales de la entidad.

PUT
`/v1/entities/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/entities/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "internal_id": "ENTITY001-1",
    "description": "New entity description",
    "destination": "",
    "sku": "SKUABC123",
    "currency": "SGD"
}'
```

200

OK

```
{}
```

DELETE
`/v1/entities/:id`

## [Eliminar una Entidad](#eliminar-una-entidad)

Elimina una Entidad.

DELETE
`/v1/entities/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/entities/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "eliminado": "<booleano>",
  "id": "<cadena de texto>"
}
```