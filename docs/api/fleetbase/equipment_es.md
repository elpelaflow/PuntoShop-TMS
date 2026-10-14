---
title: "Equipamiento"
url: https://fleetbase.io/docs/api/fleetbase/equipment
module: api
---

# Equipamiento

El equipamiento representa el equipo auxiliar de la flota, como equipos de protección personal, unidades de refrigeración, herramientas, portabեռas, rampas, contenedores y otros equipos operativos asignables.

* [El objeto "Equipamiento"](#el-objeto-equipamiento)
* [Crear Equipamiento

  POST
  `/v1/equipment`](#crear-equipamiento)
* [Consultar Equipamiento

  GET
  `/v1/equipment`](#consultar-equipamiento)
* [Obtener Equipamiento

  GET
  `/v1/equipment`](#obtener-equipamiento)
* [Actualizar Equipamiento

  PUT
  `/v1/equipment`](#actualizar-equipamiento)
* [Eliminar Equipamiento

  DELETE
  `/v1/equipment`](#eliminar-equipamiento)
* [Asignar Equipamiento

  POST
  `/v1/equipment/:id/attach`](#asignar-equipamiento)
* [Desasignar Equipamiento

  POST
  `/v1/equipment/:id/detach`](#desasignar-equipamiento)

## El objeto "Equipamiento"

Un registro de equipamiento almacena detalles de identidad, asignación, garantía, compra y estado para equipos de flota reutilizables.

Atributos

`id`

string

opcional

Identificador público del equipamiento.

`name`

string

opcional

Nombre del equipamiento.

`code`

string

opcional

Código interno del equipamiento.

`type`

string

opcional

Tipo de equipamiento.

`status`

string

opcional

Estado de disponibilidad del equipamiento.

`serial_number`

string

opcional

Número de serie del equipamiento.

`manufacturer`

string

opcional

Fabricante del equipamiento.

`model`

string

opcional

Modelo del equipamiento.

`equipable`

string

opcional

ID público del recurso al que se asignará el equipamiento, cuando se cargue.

`equipable_type`

string

opcional

Tipo de asignación pública, como
`fleet-ops:vehicle`
o
`fleet-ops:trailer`.

`equipable_id`

string

opcional

ID público del Vehículo o Contenedor al que está asignado el equipamiento.

`equipable_name`

string

opcional

Nombre de visualización del Vehículo o Contenedor al que está asignado el equipamiento.

`meta`

object

opcional

Metadatos adicionales del equipamiento.

El objeto "Equipamiento"

```
{
  "id": "equipment_4Mnp8Qx2Vz",
  "name": "Liftgate LG-12",
  "code": "LG-12",
  "type": "liftgate",
  "status": "available",
  "serial_number": "LG120045",
  "manufacturer": "Maxon",
  "model": "BMR",
  "currency": "USD",
  "is_equipped": false,
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/equipment`

## [Crear Equipamiento](#crear-equipamiento)

Crear equipamiento.

Parámetros del cuerpo

`name`

string

opcional

Nombre del equipamiento.

`code`

string

opcional

Código interno del equipamiento.

`type`

string

opcional

Tipo de equipamiento.

`status`

string

opcional

Estado del equipamiento.

`warranty`

string

opcional

ID público de la garantía.

`photo`

string

opcional

ID público del archivo para la foto del equipamiento.

`equipable_type`

string

opcional

Tipo de recurso polimórfico, como
`fleet-ops:vehicle`
,
`fleet-ops:trailer`
, o el tipo de compatibilidad existente
`fleet-ops:driver`.

`equipable`

string

opcional

ID público del recurso al que se asignará el equipamiento.

`meta`

object

opcional

Metadatos adicionales.

POST
`/v1/equipment`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/equipment \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Liftgate LG-12",
  "code": "LG-12",
  "type": "liftgate",
  "status": "available",
  "serial_number": "LG120045",
  "manufacturer": "Maxon",
  "model": "BMR",
  "currency": "USD"
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "equipment"
}
```

GET
`/v1/equipment`

## [Consultar Equipamiento](#consultar-equipamiento)

Consultar equipamiento.

Parámetros de consulta

`query`

string

opcional

Consulta de búsqueda para el equipamiento.

`limit`

integer

opcional

Número máximo de registros a devolver.

`page`

integer

opcional

Número de página para los resultados paginados.

`sort`

string

opcional

Expresión de orden, como
`-created_at`.

`type`

string

opcional

Filtrar por tipo de equipamiento.

`status`

string

opcional

Filtrar por estado del equipamiento.

`manufacturer`

string

opcional

Filtrar por fabricante.

GET
`/v1/equipment`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/equipment \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "equipment"
}
```

GET
`/v1/equipment`

## [Obtener Equipamiento](#obtener-equipamiento)

Obtener equipamiento.

GET
`/v1/equipment`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/equipment \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "equipment"
}
```

PUT
`/v1/equipment`

## [Actualizar Equipamiento](#actualizar-equipamiento)

Actualizar equipamiento.

Parámetros del cuerpo

`name`

string

opcional

Nombre del equipamiento.

`code`

string

opcional

Código interno del equipamiento.

`type`

string

opcional

Tipo de equipamiento.

`status`

string

opcional

Estado del equipamiento.

`warranty`

string

opcional

ID público de la garantía.

`photo`

string

opcional

ID público del archivo para la foto del equipamiento.

`equipable_type`

string

opcional

Tipo de recurso polimórfico, como
`fleet-ops:vehicle`
,
`fleet-ops:trailer`
, o el tipo de compatibilidad existente
`fleet-ops:driver`.

`equipable`

string

opcional

ID público del recurso al que se asignará el equipamiento.

`meta`

object

opcional

Metadatos adicionales.

PUT
`/v1/equipment`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/equipment \
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
  "object": "equipment"
}
```

DELETE
`/v1/equipment`

## [Eliminar Equipamiento](#eliminar-equipamiento)

Eliminar equipamiento.

DELETE
`/v1/equipment`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/equipment \
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
`/v1/equipment/:id/attach`

## [Asignar Equipamiento](#asignar-equipamiento)

Asignar o reasignar de forma atómica el Equipamiento a un Vehículo o Contenedor.

Parámetros del cuerpo

`attachable_type`

enum

opcional

Tipo de recurso objetivo permitido. Uno de
`fleet-ops:vehicle`
,
`fleet-ops:trailer`.

`attachable`

string

opcional

ID público del Vehículo o Contenedor.

POST
`/v1/equipment/:id/attach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/equipment/:id/attach \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"attachable_type":"fleet-ops:vehicle","attachable":"{{vehicle_id}}"}'
```

POST
`/v1/equipment/:id/detach`

## [Desasignar Equipamiento](#desasignar-equipamiento)

Desasignar Equipamiento de su Vehículo o Contenedor actual.

POST
`/v1/equipment/:id/detach`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/equipment/:id/detach \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```