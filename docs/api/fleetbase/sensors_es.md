---
title: "Sensores"
url: https://fleetbase.io/docs/api/fleetbase/sensors
module: api
---

# Sensores

Los sensores representan canales de telemetría medibles, como la temperatura, el estado de la puerta, la vibración, el nivel de combustible o la presión de los neumáticos.

* [El objeto Sensor](#el-objeto-sensor)
* [Crear un Sensor

  POST
  `/v1/sensors`](#crear-un-sensor)
* [Consultar Sensores

  GET
  `/v1/sensors`](#consultar-sensores)
* [Obtener un Sensor

  GET
  `/v1/sensors`](#obtener-un-sensor)
* [Actualizar un Sensor

  PUT
  `/v1/sensors`](#actualizar-un-sensor)
* [Eliminar un Sensor

  DELETE
  `/v1/sensors`](#eliminar-un-sensor)

## El objeto Sensor

Un sensor almacena el tipo de medición, los umbrales, la lectura más reciente, el dispositivo asociado y los metadatos de adjunto.

Atributos

`id`

string

opcional

Identificador del sensor público.

`name`

string

opcional

Nombre del sensor.

`type`

string

opcional

Tipo de sensor.

`device`

string

opcional

ID público del dispositivo, cuando se carga.

`unit`

string

opcional

Unidad de medida.

`last_value`

string

opcional

Valor más reciente registrado.

`threshold_status`

string

opcional

Estado de umbral derivado.

`status`

string

opcional

Estado del sensor.

`meta`

object

opcional

Metadatos adicionales del sensor.

El
objeto
Sensor

```
{
  "id": "sensor_2Qx9KpL7Vz",
  "name": "Temperatura de la carga",
  "type": "temperatura",
  "unit": "celsius",
  "last_value": "4.2",
  "status": "activo",
  "threshold_status": "normal",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/sensors`

## [Crear un Sensor](#crear-un-sensor)

Crear un sensor.

Parámetros del cuerpo

`name`

string

opcional

Nombre del sensor.

`type`

string

opcional

Tipo de sensor.

`device`

string

opcional

ID público del dispositivo.

`telematic`

string

opcional

ID público de telemetría.

`unit`

string

opcional

Unidad de medida.

`min_threshold`

number

opcional

Umbral mínimo.

`max_threshold`

number

opcional

Umbral máximo.

`sensorable_type`

string

opcional

Tipo de recurso adjuntable.

`sensorable`

string

opcional

ID público del recurso adjuntable.

POST
`/v1/sensors`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/sensors \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Temperatura de la carga",
  "type": "temperatura",
  "device": "{{device_id}}",
  "unit": "celsius",
  "status": "activo",
  "min_threshold": 0,
  "max_threshold": 8
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "sensors"
}
```

GET
`/v1/sensors`

## [Consultar Sensores](#consultar-sensores)

Consultar sensores.

Parámetros de consulta

`query`

string

opcional

Consulta de búsqueda para sensores.

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

`type`

string

opcional

Filtrar por tipo de sensor.

`status`

string

opcional

Filtrar por estado del sensor.

`device`

string

opcional

Filtrar por ID público o ID interno del dispositivo.

GET
`/v1/sensors`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/sensors \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "sensors"
}
```

GET
`/v1/sensors`

## [Obtener un Sensor](#obtener-un-sensor)

Obtener un sensor.

GET
`/v1/sensors`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/sensors \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "sensors"
}
```

PUT
`/v1/sensors`

## [Actualizar un Sensor](#actualizar-un-sensor)

Actualizar un sensor.

Parámetros del cuerpo

`name`

string

opcional

Nombre del sensor.

`type`

string

opcional

Tipo de sensor.

`device`

string

opcional

ID del dispositivo.

`telematic`

string

opcional

ID de telemetría.

`unit`

string

opcional

Unidad de medida.

`min_threshold`

number

opcional

Umbral mínimo.

`max_threshold`

number

opcional

Umbral máximo.

`sensorable_type`

string

opcional

Tipo de recurso adjuntable.

`sensorable`

string

opcional

ID público del recurso adjuntable.

PUT
`/v1/sensors`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/sensors \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "last_value": "4.2",
  "last_reading_at": "2026-05-07T08:30:00Z"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "sensors"
}
```

DELETE
`/v1/sensors`

## [Eliminar un Sensor](#eliminar-un-sensor)

Eliminar un sensor.

DELETE
`/v1/sensors`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/sensors \
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