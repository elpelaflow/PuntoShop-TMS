---
título: "Vallas geográficas"
url: https://fleetbase.io/docs/api/fleetbase/geofences
módulo: api
---

# Vallas geográficas

Las vallas geográficas detectan cuándo los recursos rastreados entran o salen de áreas geográficas definidas. Utilice los puntos finales de vallas geográficas para supervisar eventos basados en la ubicación alrededor de los almacenes, zonas de servicio, sitios de clientes y zonas de operación.

* [Listar eventos de vallas geográficas

  GET
  `/v1/geofences/events`](#list-geofence-events)
* [Obtener inventario de vallas geográficas

  GET
  `/v1/geofences/inventory`](#get-geofence-inventory)
* [Obtener informe de permanencia en vallas geográficas

  GET
  `/v1/geofences/dwell-report`](#get-geofence-dwell-report)
* [Obtener historial de vallas geográficas para conductores

  GET
  `/v1/geofences/driver/:driverId/history`](#get-driver-geofence-history)

GET
`/v1/geofences/events`

## [Listar eventos de vallas geográficas](#list-geofence-events)

Listar eventos de vallas geográficas

Parámetros de consulta

`per_page`

entero

opcional

Número de registros de eventos de vallas geográficas que se devuelven por página.

`event_type`

cadena

opcional

Filtra los eventos de vallas geográficas por tipo de evento.

GET
`/v1/geofences/events`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/geofences/events?per_page=50&event_type=entered \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/geofences/inventory`

## [Obtener inventario de vallas geográficas](#get-geofence-inventory)

Obtener inventario de vallas geográficas

GET
`/v1/geofences/inventory`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/geofences/inventory \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/geofences/dwell-report`

## [Obtener informe de permanencia en vallas geográficas](#get-geofence-dwell-report)

Obtener informe de permanencia en vallas geográficas

Parámetros de consulta

`from`

marca de tiempo

opcional

Inicio del rango de tiempo del informe de permanencia.

`to`

marca de tiempo

opcional

Fin del rango de tiempo del informe de permanencia.

GET
`/v1/geofences/dwell-report`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/geofences/dwell-report?from={{from_datetime}}&to={{to_datetime}} \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/geofences/driver/:driverId/history`

## [Obtener historial de vallas geográficas para conductores](#get-driver-geofence-history)

Obtener historial de vallas geográficas para conductores

Parámetros de consulta

`per_page`

entero

opcional

Número de registros de historial de vallas geográficas que se devuelven por página.

GET
`/v1/geofences/driver/:driverId/history`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/geofences/driver/:driverId/history?per_page=50 \
  -H "Authorization: Bearer flb_live_…"
```