---
title: "Dispositivos"
url: https://fleetbase.io/docs/api/fleetbase/devices
module: api
---

# Dispositivos

Los dispositivos representan el hardware de telemetría o de seguimiento que se puede conectar a vehículos u otros recursos de la flota.

* [El objeto Device](#el-objeto-device)
* [Crear un dispositivo

  POST
  `/v1/devices`](#crear-un-dispositivo)
* [Consultar dispositivos

  GET
  `/v1/devices`](#consultar-dispositivos)
* [Obtener un dispositivo

  GET
  `/v1/devices`](#obtener-un-dispositivo)
* [Actualizar un dispositivo

  PUT
  `/v1/devices`](#actualizar-un-dispositivo)
* [Eliminar un dispositivo

  DELETE
  `/v1/devices`](#eliminar-un-dispositivo)
* [Conectar dispositivo

  POST
  `/v1/devices/attach`](#conectar-dispositivo)
* [Desconectar dispositivo

  POST
  `/v1/devices/detach`](#desconectar-dispositivo)

## El objeto Device

Un dispositivo almacena la identidad del hardware, los datos del proveedor, el estado de conexión, el estado de la telemetría y la información de conectividad más reciente.

Atributos

`id`

string

opcional

Identificador del dispositivo público.

`name`

string

opcional

Nombre del dispositivo.

`type`

string

opcional

Tipo de dispositivo.

`device_id`

string

opcional

Identificador del proveedor o del dispositivo de hardware.

`serial_number`

string

opcional

Número de serie del dispositivo.

`telematic`

string

opcional

ID público de la telemetría, cuando se carga.

`attachable`

string

opcional

ID público del recurso al que se adjunta, cuando se carga.

`status`

string

opcional

Estado del dispositivo.

`connection_status`

string

opcional

Estado de conexión derivado.

`meta`

object

opcional

Metadatos adicionales del dispositivo.

El
objeto
Device

```
{
  "id": "device_7YqM3KpL2n",
  "name": "OBD Tracker 12",
  "type": "obd",
  "device_id": "OBD-12",
  "serial_number": "SN-10001",
  "status": "active",
  "connection_status": "online",
  "attached_to_name": "ABC123",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/devices`

## [Crear un dispositivo](#crear-un-dispositivo)

Crear un dispositivo.

Parámetros del cuerpo

`name`

string

opcional

Nombre del dispositivo.

`type`

string

opcional

Tipo de dispositivo.

`device_id`

string

opcional

Identificador del proveedor o del dispositivo de hardware.

`telematic`

string

opcional

ID público de la telemetría.

`attachable_type`

string

opcional

Tipo de recurso al que se puede adjuntar, normalmente
`fleet-ops:vehicle`
.

`attachable`

string

opcional

ID público del recurso al que se adjunta.

`latitude`

number

opcional

Latitud conocida. Requerido con
`longitude`
.

`longitude`

number

opcional

Longitud conocida. Requerido con
`latitude`
.

`meta`

object

opcional

Metadatos adicionales.

POST
`/v1/devices`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/devices \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "OBD Tracker 12",
  "type": "obd",
  "device_id": "OBD-12",
  "serial_number": "SN-10001",
  "status": "active"
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```

GET
`/v1/devices`

## [Consultar dispositivos](#consultar-dispositivos)

Consultar dispositivos.

Parámetros de consulta

`query`

string

opcional

Consulta de búsqueda para dispositivos.

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

Expresión de orden, como
`-created_at`
.

`status`

string

opcional

Filtrar por estado.

`attachment_state`

string

opcional

Filtrar por
`attached`
o
`unattached`
.

`vehicle`

string

opcional

Filtrar por ID público del vehículo al que está adjunto.

`connection_status`

string

opcional

Filtrar por estado de conexión.

GET
`/v1/devices`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/devices \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```

GET
`/v1/devices`

## [Obtener un dispositivo](#obtener-un-dispositivo)

Obtener un dispositivo.

GET
`/v1/devices`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/devices \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```

PUT
`/v1/devices`

## [Actualizar un dispositivo](#actualizar-un-dispositivo)

Actualizar un dispositivo.

Parámetros del cuerpo

`name`

string

opcional

Nombre del dispositivo.

`type`

string

opcional

Tipo de dispositivo.

`device_id`

string

opcional

Identificador del proveedor o del dispositivo de hardware.

`telematic`

string

opcional

ID público de la telemetría.

`attachable_type`

string

opcional

Tipo de recurso al que se puede adjuntar, normalmente
`fleet-ops:vehicle`
.

`attachable`

string

opcional

ID público del recurso al que se adjunta.

`latitude`

number

opcional

Latitud conocida. Requerido con
`longitude`
.

`longitude`

number

opcional

Longitud conocida. Requerido con
`latitude`
.

`meta`

object

opcional

Metadatos adicionales.

PUT
`/v1/devices`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/devices \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "maintenance"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```

DELETE
`/v1/devices`

## [Eliminar un dispositivo](#eliminar-un-dispositivo)

Eliminar un dispositivo.

DELETE
`/v1/devices`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/devices \
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

POST
`/v1/devices/attach`

## [Conectar dispositivo](#conectar-dispositivo)

Conectar este Dispositivo a un Vehículo o Remolque. Se sigue soportando el campo legado
`vehicle`
.

Parámetros del cuerpo

`vehicle`

string

opcional

Alias del ID público del vehículo legado. Use
`attachable_type`
y
`attachable`
para nuevas integraciones.

`attachable_type`

enum

opcional

Tipo de recurso permitido para la instalación del Dispositivo. Uno de
`fleet-ops:vehicle`
,
`fleet-ops:trailer`
.

`attachable`

string

opcional

ID público del vehículo o del remolque.

POST
`/v1/devices/attach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/devices/attach \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "attachable_type": "fleet-ops:vehicle",
  "attachable": "{{vehicle_id}}"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```

POST
`/v1/devices/detach`

## [Desconectar dispositivo](#desconectar-dispositivo)

Desconectar este dispositivo de su recurso actual.

POST
`/v1/devices/detach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/devices/detach \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "devices"
}
```