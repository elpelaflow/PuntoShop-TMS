---
title: "Informes de combustible"
url: https://fleetbase.io/docs/api/fleetbase/fuel-reports
module: api
---

# Informes de combustible

Los informes de combustible registran los eventos de reabastecimiento de vehículos y los costos de combustible. Úselos para realizar un seguimiento de las compras de combustible, el kilometraje y los gastos operativos de los vehículos de la flota.

* [El objeto Fuel Report](#el-objeto-fuel-report)
* [Crear un Informe de Combustible

  POST
  `/v1/fuel-reports`](#crear-un-informe-de-combustible)
* [Consultar Informes de Combustible

  GET
  `/v1/fuel-reports`](#consultar-informes-de-combustible)
* [Obtener un Informe de Combustible

  GET
  `/v1/fuel-reports/:id`](#obtener-un-informe-de-combustible)
* [Actualizar un Informe de Combustible

  PUT
  `/v1/fuel-reports/:id`](#actualizar-un-informe-de-combustible)
* [Eliminar un Informe de Combustible

  DELETE
  `/v1/fuel-reports/:id`](#eliminar-un-informe-de-combustible)

## El objeto Fuel Report

Un informe de combustible registra la compra de combustible o el informe de uso de combustible de un conductor, junto con datos de odómetro, importe, volumen, unidad, ubicación, vehículo y estado.

Atributos

`id`

string

opcional

Identificador público del informe de combustible.

`reporter`

object

opcional

Usuario que reportó la compra de combustible, cuando se carga.

`vehicle`

object

opcional

Vehículo asociado al informe de combustible, cuando se carga.

`driver`

object

opcional

Conductor asociado al informe de combustible, cuando se carga.

`odometer`

number

opcional

Lectura del odómetro en el momento del informe.

`amount`

currency

opcional

Importe monetario para la compra de combustible.

`currency`

currency

opcional

Código de moneda de tres caracteres.

`volume`

number

opcional

Volumen de combustible.

`metric_unit`

string

opcional

Unidad para el volumen de combustible.

`type`

string

opcional

Tipo de informe de combustible.

`status`

string

opcional

Estado del informe de combustible.

`location`

object

opcional

Ubicación donde se reportó el combustible.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez el informe de combustible.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó el informe de combustible.

El
objeto Fuel Report
```
{
  "id": "fuel_report_4Mnp8Qx2Vz",
  "vehicle": null,
  "driver": null,
  "odometer": 10042,
  "amount": 6500,
  "currency": "USD",
  "volume": 42.5,
  "metric_unit": "liters",
  "type": null,
  "status": "created",
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/fuel-reports`

## [Crear un Informe de Combustible](#crear-un-informe-de-combustible)

Crear un Informe de Combustible

Parámetros del cuerpo

`driver`

string

obligatorio

ID del conductor que reporta la compra de combustible.

`odometer`

number

obligatorio

Lectura del odómetro del vehículo en el momento del informe.

`volume`

number

obligatorio

Volumen de combustible comprado o reportado.

`metric_unit`

string

opcional

Unidad utilizada para el volumen de combustible.

`location`

object

opcional

Ubicación donde se compró o reportó el combustible.

`amount`

currency

opcional

Importe monetario para la compra de combustible.

POST
`/v1/fuel-reports`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fuel-reports \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "driver": "{{driver_id}}",
  "odometer": 12042,
  "volume": 42.5,
  "metric_unit": "liter",
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "amount": 120.5,
  "currency": "USD",
  "status": "submitted"
}'
```

GET
`/v1/fuel-reports`

## [Consultar Informes de Combustible](#consultar-informes-de-combustible)

Consultar Informes de Combustible

Parámetros de consulta

`limit`

integer

opcional

Número máximo de informes de combustible a devolver.

`offset`

integer

opcional

Número de informes de combustible a omitir antes de devolver los resultados.

`sort`

string

opcional

Expresión de orden para la consulta del informe de combustible.

`driver`

string

opcional

Filtra los informes de combustible por ID de conductor.

`vehicle`

string

opcional

Filtra los informes de combustible por ID de vehículo.

GET
`/v1/fuel-reports`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fuel-reports?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/fuel-reports/:id`

## [Obtener un Informe de Combustible](#obtener-un-informe-de-combustible)

Obtener un Informe de Combustible

GET
`/v1/fuel-reports/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fuel-reports/:id \
  -H "Authorization: Bearer flb_live_…"
```

PUT
`/v1/fuel-reports/:id`

## [Actualizar un Informe de Combustible](#actualizar-un-informe-de-combustible)

Actualizar un Informe de Combustible

Parámetros del cuerpo

`driver`

string

opcional

ID del conductor que reporta la compra de combustible.

`odometer`

number

opcional

Lectura del odómetro del vehículo en el momento del informe.

`volume`

number

opcional

Volumen de combustible comprado o reportado.

`metric_unit`

string

opcional

Unidad utilizada para el volumen de combustible.

`location`

object

opcional

Ubicación donde se compró o reportó el combustible.

`amount`

currency

opcional

Importe monetario para la compra de combustible.

PUT
`/v1/fuel-reports/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/fuel-reports/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "odometer": 12050,
  "volume": 43.1,
  "metric_unit": "liter",
  "amount": 122.75,
  "currency": "USD",
  "status": "approved"
}'
```

DELETE
`/v1/fuel-reports/:id`

## [Eliminar un Informe de Combustible](#eliminar-un-informe-de-combustible)

Eliminar un Informe de Combustible

DELETE
`/v1/fuel-reports/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/fuel-reports/:id \
  -H "Authorization: Bearer flb_live_…"
```