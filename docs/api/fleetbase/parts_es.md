---
title: "Piezas"
url: https://fleetbase.io/docs/api/fleetbase/parts
module: api
---

# Piezas

Las piezas representan componentes de reemplazo disponibles, como neumáticos, filtros, correas, electrónica y otros artículos de inventario utilizados para el mantenimiento de la flota.

* [El objeto "Part"](#el-objeto-part)
* [Crear una pieza

  POST
  `/v1/parts`](#crear-una-pieza)
* [Consultar piezas

  GET
  `/v1/parts`](#consultar-piezas)
* [Obtener una pieza

  GET
  `/v1/parts`](#obtener-una-pieza)
* [Actualizar una pieza

  PUT
  `/v1/parts`](#actualizar-una-pieza)
* [Eliminar una pieza

  DELETE
  `/v1/parts`](#eliminar-una-pieza)

## El objeto "Part"

Un objeto "Part" almacena la cantidad en stock, el costo, el proveedor, la garantía, la asociación con el activo y el estado del inventario.

Atributos

`id`

string

opcional

Identificador de la pieza público.

`sku`

string

opcional

SKU de la pieza.

`name`

string

opcional

Nombre de la pieza.

`quantity_on_hand`

integer

opcional

Cantidad actual en stock.

`unit_cost`

currency

opcional

Costo unitario.

`msrp`

currency

opcional

Precio de venta recomendado.

`vendor`

string

opcional

ID público del proveedor, cuando se carga.

`asset`

string

opcional

ID público del activo asociado, cuando se carga.

`is_in_stock`

boolean

opcional

Indica si la cantidad es mayor que cero.

`meta`

object

opcional

Metadatos adicionales de la pieza.

El objeto "Part"

```
{
  "id": "part_8KqM3KpL2n",
  "sku": "FLT-OIL-001",
  "name": "Oil Filter",
  "quantity_on_hand": 24,
  "unit_cost": 1200,
  "currency": "USD",
  "status": "in_stock",
  "is_in_stock": true,
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/parts`

## [Crear una pieza](#crear-una-pieza)

Crear una pieza.

Parámetros del cuerpo

`sku`

string

opcional

SKU de la pieza. Único por organización.

`name`

string

opcional

Nombre de la pieza.

`quantity_on_hand`

integer

opcional

Cantidad actual en stock.

`unit_cost`

currency

opcional

Costo unitario.

`vendor`

string

opcional

ID público del proveedor.

`asset_type`

string

opcional

Tipo de recurso polimórfico, como
`fleet-ops:vehicle`
o
`fleet-ops:equipment`
.

`asset`

string

opcional

ID público del activo asociado.

`specs`

object

opcional

Datos de especificación de la pieza.

`meta`

object

opcional

Metadatos adicionales.

POST
`/v1/parts`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/parts \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "sku": "FLT-OIL-{{$timestamp}}",
  "name": "Oil Filter",
  "quantity_on_hand": 24,
  "unit_cost": 1200,
  "currency": "USD",
  "status": "in_stock"
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "parts"
}
```

GET
`/v1/parts`

## [Consultar piezas](#consultar-piezas)

Consultar piezas.

Parámetros de consulta

`query`

string

opcional

Consulta de búsqueda para piezas.

`limit`

integer

opcional

Número máximo de registros a devolver.

`page`

integer

opcional

Número de página para resultados paginados.

`sort`

string

opcional

Expresión de ordenación, como
`-created_at`
.

`status`

string

opcional

Filtrar por estado de la pieza.

`manufacturer`

string

opcional

Filtrar por fabricante.

`vendor`

string

opcional

Filtrar por ID público o ID interno del proveedor.

GET
`/v1/parts`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/parts \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "parts"
}
```

GET
`/v1/parts`

## [Obtener una pieza](#obtener-una-pieza)

Obtener una pieza.

GET
`/v1/parts`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/parts \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "parts"
}
```

PUT
`/v1/parts`

## [Actualizar una pieza](#actualizar-una-pieza)

Actualizar una pieza.

Parámetros del cuerpo

`sku`

string

opcional

SKU de la pieza.

`name`

string

opcional

Nombre de la pieza.

`quantity_on_hand`

integer

opcional

Cantidad actual en stock.

`unit_cost`

currency

opcional

Costo unitario.

`vendor`

string

opcional

ID público del proveedor.

`asset_type`

string

opcional

Tipo de recurso polimórfico, como
`fleet-ops:vehicle`
o
`fleet-ops:equipment`
.

`asset`

string

opcional

ID público del activo asociado.

`specs`

object

opcional

Datos de especificación de la pieza.

`meta`

object

opcional

Metadatos adicionales.

PUT
`/v1/parts`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/parts \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "quantity_on_hand": 18
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "parts"
}
```

DELETE
`/v1/parts`

## [Eliminar una pieza](#eliminar-una-pieza)

Eliminar una pieza.

DELETE
`/v1/parts`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/parts \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "deleted": true
}
```