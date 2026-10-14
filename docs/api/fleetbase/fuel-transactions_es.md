---
title: "Transacciones de combustible"
url: https://fleetbase.io/docs/api/fleetbase/transacciones-de-combustible
module: api
---

# Transacciones de combustible

Las transacciones de combustible representan transacciones de tarjetas/proveedores de combustible importadas o registradas, expuestas a los usuarios de la API como transacciones de combustible.

* [El objeto Transacción de combustible](#el-objeto-transaccion-de-combustible)
* [Crear una Transacción de combustible

  POST
  `/v1/transacciones-de-combustible`](#crear-una-transaccion-de-combustible)
* [Consultar Transacciones de combustible

  GET
  `/v1/transacciones-de-combustible`](#consultar-transacciones-de-combustible)
* [Obtener una Transacción de combustible

  GET
  `/v1/transacciones-de-combustible`](#obtener-una-transaccion-de-combustible)
* [Actualizar una Transacción de combustible

  PUT
  `/v1/transacciones-de-combustible`](#actualizar-una-transaccion-de-combustible)
* [Eliminar una Transacción de combustible

  DELETE
  `/v1/transacciones-de-combustible`](#eliminar-una-transaccion-de-combustible)
* [Asociar la Transacción de combustible con un vehículo

  POST
  `/v1/transacciones-de-combustible/asociar-vehiculo`](#asociar-la-transaccion-de-combustible-con-un-vehiculo)
* [Asociar la Transacción de combustible con un pedido

  POST
  `/v1/transacciones-de-combustible/asociar-pedido`](#asociar-la-transaccion-de-combustible-con-un-pedido)
* [Re-procesar la Transacción de combustible

  POST
  `/v1/transacciones-de-combustible/reprocesar`](#re-procesar-la-transaccion-de-combustible)
* [Revisar la Transacción de combustible

  POST
  `/v1/transacciones-de-combustible/revisar`](#revisar-la-transaccion-de-combustible)

## El objeto Transacción de combustible

Un objeto de transacción de combustible almacena la identidad de la transacción del proveedor, enlaces a vehículos/pedidos/informes de combustible coincidentes, datos de la estación, volumen, importe, odómetro y estado de sincronización.

Atributos

`id`

string

opcional

Identificador público de la transacción de combustible.

`proveedor`

string

opcional

Clave del proveedor de combustible.

`id-de-transaccion-del-proveedor`

string

opcional

Identificador de la transacción del proveedor. Único para un proveedor dentro de una organización.

`vehiculo`

string

opcional

Identificador público del vehículo, cuando se carga.

`conductor`

string

opcional

Identificador público del conductor, cuando se carga.

`pedido`

string

opcional

Identificador público del pedido, cuando se carga.

`informe-de-combustible`

string

opcional

Identificador público del informe de combustible generado, cuando se carga.

`nombre-de-la-estacion`

string

opcional

Nombre de la estación de combustible.

`volumen`

number

opcional

Volumen de combustible.

`estado-de-sincronizacion`

string

opcional

Estado de sincronización o revisión.

El
objeto Transacción de combustible
```
{
  "id": "fuel_provider_transaction_3KpL7Vz9Qx",
  "provider": "petroapp",
  "provider_transaction_id": "TX-10001",
  "vehicle": "vehicle_7YqM3KpL2n",
  "station_name": "North Depot Fuel",
  "volume": 42.5,
  "metric_unit": "liter",
  "amount": 6500,
  "currency": "USD",
  "sync_status": "matched",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/transacciones-de-combustible`

## [Crear una Transacción de combustible](#crear-una-transaccion-de-combustible)

Crear una transacción de combustible.

Parámetros del cuerpo

`proveedor`

string

opcional

Clave del proveedor de combustible.

`id-de-transaccion-del-proveedor`

string

opcional

Identificador de la transacción del proveedor. Único por proveedor dentro de una organización.

`conexion`

string

opcional

Identificador público de la conexión con el proveedor de combustible.

`vehiculo`

string

opcional

Identificador público del vehículo.

`conductor`

string

opcional

Identificador público del conductor.

`pedido`

string

opcional

Identificador público del pedido.

`informe-de-combustible`

string

opcional

Identificador público del informe de combustible.

`fecha-de-la-transaccion`

timestamp

opcional

Marca de tiempo de la transacción.

`volumen`

number

opcional

Volumen de combustible.

`importe`

currency

opcional

Importe de la transacción.

POST
`/v1/transacciones-de-combustible`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/transacciones-de-combustible \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "provider": "petroapp",
  "provider_transaction_id": "TX-{{$timestamp}}",
  "vehicle": "{{vehicle_id}}",
  "station_name": "North Depot Fuel",
  "fecha_de_la_transaccion": "2026-05-07T08:30:00Z",
  "volumen": 42.5,
  "metric_unit": "liter",
  "importe": 6500,
  "currency": "USD"
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "transacciones-de-combustible"
}
```

GET
`/v1/transacciones-de-combustible`

## [Consultar Transacciones de combustible](#consultar-transacciones-de-combustible)

Consultar transacciones de combustible.

Parámetros de consulta

`consulta`

string

opcional

Consulta de búsqueda para transacciones de combustible.

`limite`

integer

opcional

Número máximo de registros a devolver.

`pagina`

integer

opcional

Número de página para resultados paginados.

`ordenar`

string

opcional

Expresión de orden, como
`-fecha-de-la-transaccion`
.

`proveedor`

string

opcional

Filtrar por proveedor.

`estado-de-sincronizacion`

string

opcional

Filtrar por estado de sincronización.

`vehiculo`

string

opcional

Filtrar por identificador público del vehículo.

`conexion`

string

opcional

Filtrar por identificador público de la conexión.

`fecha-de-la-transaccion`

timestamp

opcional

Filtrar por fecha o rango de fechas de la transacción.

GET
`/v1/transacciones-de-combustible`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/transacciones-de-combustible \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "transacciones-de-combustible"
}
```

GET
`/v1/transacciones-de-combustible`

## [Obtener una Transacción de combustible](#obtener-una-transaccion-de-combustible)

Obtener una transacción de combustible.

GET
`/v1/transacciones-de-combustible`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/transacciones-de-combustible \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "transacciones-de-combustible"
}
```

PUT
`/v1/transacciones-de-combustible`

## [Actualizar una Transacción de combustible](#actualizar-una-transaccion-de-combustible)

Actualizar una transacción de combustible.

Parámetros del cuerpo

`proveedor`

string

opcional

Clave del proveedor de combustible.

`id-de-transaccion-del-proveedor`

string

opcional

Identificador de la transacción del proveedor.

`conexion`

string

opcional

Identificador público de la conexión con el proveedor de combustible.

`vehiculo`

string

opcional

Identificador público del vehículo.

`conductor`

string

opcional

Identificador público del conductor.

`pedido`

string

opcional

Identificador público del pedido.

`informe-de-combustible`

string

opcional

Identificador público del informe de combustible.

`fecha-de-la-transaccion`

timestamp

opcional

Marca de tiempo de la transacción.

`volumen`

number

opcional

Volumen de combustible.

`importe`

currency

opcional

Importe de la transacción.

PUT
`/v1/transacciones-de-combustible`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/transacciones-de-combustible \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "estado-de-sincronizacion": "reviewado"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "transacciones-de-combustible"
}
```

DELETE
`/v1/transacciones-de-combustible`

## [Eliminar una Transacción de combustible](#eliminar-una-transaccion-de-combustible)

Eliminar una transacción de combustible.

DELETE
`/v1/transacciones-de-combustible`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/transacciones-de-combustible \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "eliminado": true
}
```

POST
`/v1/transacciones-de-combustible/asociar-vehiculo`

## [Asociar la Transacción de combustible con un vehículo](#asociar-la-transaccion-de-combustible-con-un-vehiculo)

Asociar esta transacción de combustible con un vehículo.

Parámetros del cuerpo

`vehiculo`

string

opcional

Identificador público del vehículo.

POST
`/v1/transacciones-de-combustible/asociar-vehiculo`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/transacciones-de-combustible/asociar-vehiculo \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "vehiculo": "{{vehicle_id}}"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "transacciones-de-combustible"
}
```

POST
`/v1/transacciones-de-combustible/asociar-pedido`

## [Asociar la Transacción de combustible con un pedido](#asociar-la-transaccion-de-combustible-con-un-pedido)

Asociar esta transacción de combustible con un pedido.

Parámetros del cuerpo

`pedido`

string

opcional

Identificador público del pedido.

POST
`/v1/transacciones-de-combustible/asociar-pedido`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/transacciones-de-combustible/asociar-pedido \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "pedido": "{{order_id}}"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "transacciones-de-combustible"
}
```

POST
`/v1/transacciones-de-combustible/reprocesar`

## [Re-procesar la Transacción de combustible](#re-procesar-la-transaccion-de-combustible)

Re-procesar la coincidencia y la generación del informe de combustible para esta transacción de combustible.

POST
`/v1/transacciones-de-combustible/reprocesar`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/transacciones-de-combustible/reprocesar \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "transacciones-de-combustible"
}
```

POST
`/v1/transacciones-de-combustible/revisar`

## [Revisar la Transacción de combustible](#revisar-la-transaccion-de-combustible)

Marcar esta transacción de combustible como revisada o ignorada.

POST
`/v1/transacciones-de-combustible/revisar`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/transacciones-de-combustible/revisar \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "estado": "reviewado"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "transacciones-de-combustible"
}
```