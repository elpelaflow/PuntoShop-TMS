---
title: "Flotas"
url: https://fleetbase.io/docs/api/fleetbase/fleets
module: api
---

# Flotas

Las flotas agrupan vehículos y conductores bajo una unidad operativa. Utiliza las flotas para organizar la capacidad por equipo, región o área de servicio antes de asignar recursos a los pedidos.
Las flotas pueden anidarse: enviar `parent_fleet` al crear o actualizar, convierte una flota en una subflota de otra. Una flota no puede ser su propio padre, y no puede moverse debajo de uno de sus propios descendientes.
La membresía se gestiona con cuatro puntos finales que comparten una misma estructura de respuesta:
```
POST /v1/fleets/{fleet}/vehicles/{vehicle}
DELETE /v1/fleets/{fleet}/vehicles/{vehicle}
POST /v1/fleets/{fleet}/drivers/{driver}
DELETE /v1/fleets/{fleet}/drivers/{driver}
```
```json
{ "fleet": "fleet_123", "vehicle": "vehicle_123", "assigned": true }
```
Cada parámetro es un ID público. La asignación es idempotente, la eliminación es una operación segura sin efecto, eliminar la membresía nunca elimina al conductor o al vehículo, y ninguna de las operaciones modifica el vehículo actual del conductor o su membresía en cualquier otra flota.

* [El objeto Fleet](#el-objeto-fleet)
* [Crear una flota

  POST
  `/v1/fleets`](#crear-una-flota)
* [Crear una subflota

  POST
  `/v1/fleets`](#crear-una-subflota)
* [Crear un vehículo en una flota

  POST
  `/v1/vehicles`](#crear-un-vehiculo-en-una-flota)
* [Crear un conductor en una flota

  POST
  `/v1/drivers`](#crear-un-conductor-en-una-flota)
* [Consultar flotas

  GET
  `/v1/fleets`](#consultar-flotas)
* [Obtener una flota

  GET
  `/v1/fleets/:id`](#obtener-una-flota)
* [Asignar un vehículo a una flota

  POST
  `/v1/fleets/:id/vehicles/:vehicle`](#asignar-un-vehiculo-a-una-flota)
* [Reasignar un vehículo a una flota

  POST
  `/v1/fleets/:id/vehicles/:vehicle`](#reasignar-un-vehiculo-a-una-flota)
* [Asignar un conductor a una flota

  POST
  `/v1/fleets/:id/drivers/:driver`](#asignar-un-conductor-a-una-flota)
* [Reasignar un conductor a una flota

  POST
  `/v1/fleets/:id/drivers/:driver`](#reasignar-un-conductor-a-una-flota)
* [Actualizar una flota

  PUT
  `/v1/fleets/:id`](#actualizar-una-flota)
* [Eliminar un vehículo de una flota

  DELETE
  `/v1/fleets/:id/vehicles/:vehicle`](#eliminar-un-vehiculo-de-una-flota)
* [Eliminar un vehículo de una flota de nuevo

  DELETE
  `/v1/fleets/:id/vehicles/:vehicle`](#eliminar-un-vehiculo-de-una-flota-de-nuevo)
* [Eliminar un conductor de una flota

  DELETE
  `/v1/fleets/:id/drivers/:driver`](#eliminar-un-conductor-de-una-flota)
* [Eliminar un conductor de una flota de nuevo

  DELETE
  `/v1/fleets/:id/drivers/:driver`](#eliminar-un-conductor-de-una-flota-de-nuevo)
* [Eliminar un vehículo de una flota

  DELETE
  `/v1/vehicles/:id`](#eliminar-un-vehiculo-de-una-flota)
* [Eliminar un conductor de una flota

  DELETE
  `/v1/drivers/:id`](#eliminar-un-conductor-de-una-flota)
* [Eliminar una subflota

  DELETE
  `/v1/fleets/:id`](#eliminar-una-subflota)
* [Eliminar una flota

  DELETE
  `/v1/fleets/:id`](#eliminar-una-flota)

## El objeto Fleet

Una flota agrupa conductores y vehículos para la asignación operativa. Las flotas pueden asociarse a un área de servicio, una zona, un proveedor y una flota padre, y pueden contener a su vez subflotas, conductores y vehículos.
Cada relación aparece dos veces, y las dos son claves separadas. `<name>_id` es el ID público del recurso relacionado y siempre está presente. `<name>` es el objeto anidado y solo se devuelve cuando la relación se solicitó a través de `?with=`; nunca es una cadena. Las columnas internas de UUID nunca forman parte del contrato público.

Atributos

`id`

string

opcional

Identificador público de la flota.

`name`

string

opcional

Nombre de visualización de la flota.

`color`

string

opcional

Color de visualización de la flota, por ejemplo, un valor hexadecimal como
`#2563EB`
.

`task`

string

opcional

Descripción libre del propósito de la flota.

`status`

string

opcional

Estado de la flota. La consola ofrece
`active`
,
`disabled`
y
`decommissioned`
; el campo no es una enumeración cerrada, por lo que cualquier cadena de estado corta que ya utilice una integración se acepta.

`service_area`

string

opcional

ID público del área de servicio a la que se asigna la flota. Debe pertenecer a la organización autenticada.

`zone`

string

opcional

ID público de la zona a la que se asigna la flota. Debe pertenecer a la organización autenticada.

`vendor`

string

opcional

ID público del proveedor a al que se asigna la flota. Debe pertenecer a la organización autenticada.

`parent_fleet`

string

opcional

ID público de la flota padre a la que pertenece la nueva flota. Crea una flota raíz si se omite. Debe pertenecer a la organización autenticada.

`photo`

string

opcional

ID público del archivo de imagen de la flota, o
`null`
. Debe pertenecer a la organización autenticada.

`updated_at`

timestamp

opcional

Marca de tiempo cuando se actualizó por última vez la flota.

`created_at`

timestamp

opcional

Marca de tiempo cuando se creó la flota.

El
Fleet
object

```
{
  "id": "fleet_4Mnp8Qx2Vz",
  "name": "Haulers",
  "color": "#2563EB",
  "task": "Long haul distribution",
  "status": "active",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": "service_area_9Kp2Vx4Qm1",
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": null,
  "photo_id": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/fleets`

## [Crear una flota](#crear-una-flota)

Crea una flota para agrupar conductores y vehículos.

Se aceptan todos los campos seguros: nombre, color, tarea, estado y las relaciones con el área de servicio, la zona, el proveedor y la flota padre. Las relaciones se proporcionan como IDs públicos (
`service_area_...`
,
`zone_...`
,
`vendor_...`
,
`fleet_...`
) y se resuelven dentro de la organización autenticada: un ID público perteneciente a otra organización se rechaza exactamente como si no existiera, y también si no existe.

Omitir
`parent_fleet`
crea una flota raíz. Esta solicitud crea el padre utilizado por
**Crear una subflota**
.

Parámetros del cuerpo

`name`

string

obligatorio

Nombre de visualización de la flota.

`color`

string

opcional

Color de visualización de la flota, por ejemplo, un valor hexadecimal como
`#2563EB`
.

`task`

string

opcional

Descripción libre del propósito de la flota.

`status`

string

opcional

Estado de la flota. La consola ofrece
`active`
,
`disabled`
y
`decommissioned`
; el campo no es una enumeración cerrada, por lo que cualquier cadena de estado corta que ya utilice una integración se acepta.

`service_area`

string

opcional

ID público del área de servicio a la que se asigna la flota. Debe pertenecer a la organización autenticada.

`zone`

string

opcional

ID público de la zona a la que se asigna la flota. Debe pertenecer a la organización autenticada.

`vendor`

string

opcional

ID público del proveedor a al que se asigna la flota. Debe pertenecer a la organización autenticada.

`parent_fleet`

string

opcional

ID público de la flota padre a la que pertenece la nueva flota. Omitirlo para crear una flota raíz. Debe pertenecer a la organización autenticada.

`photo`

string

opcional

ID público del archivo de imagen de la flota, o
`null`
. Debe pertenecer a la organización autenticada.

POST
`/v1/fleets`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Haulers",
    "color": "#2563EB",
    "task": "Long haul distribution",
    "status": "active",
    "service_area": "{{service_area_id}}"
}'
```

Otras formas de llamar a esto

* OK

200

OK

```
{
  "id": "fleet_4Mnp8Qx2Vz",
  "name": "Haulers",
  "color": "#2563EB",
  "task": "Long haul distribution",
  "status": "active",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": "service_area_9Kp2Vx4Qm1",
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": null,
  "photo_id": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/fleets`

## [Crear una subflota](#crear-una-subflota)

Crea una flota anidada debajo de otra flota enviando el ID público de la flota padre en
`parent_fleet`
.

Se validan las jerarquías al escribir: una flota no puede ser su propio padre, y no puede moverse debajo de uno de sus propios subflotes. Ambos se responden con
`422`
. Un padre perteneciente a otra organización se responde con
`404`
, lo mismo que un padre que no existe.

Parámetros del cuerpo

`name`

string

obligatorio

Nombre de visualización de la subflota.

`parent_fleet`

string

obligatorio

ID público (
`fleet_...`
) de la flota a la que pertenece la subflota. Una flota no puede nombrarse a sí misma, y no puede colocarse debajo de uno de sus propios descendientes.

`color`

string

opcional

Color de visualización de la subflota.

`task`

string

opcional

Descripción libre del propósito de la subflota.

`status`

string

opcional

Estado de la subflota. La consola ofrece
`active`
,
`disabled`
y
`decommissioned`
; el campo no es una enumeración cerrada, por lo que cualquier cadena de estado corta que ya utilice una integración se acepta.

POST
`/v1/fleets`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Carpool",
    "color": "#059669",
    "task": "Employee transport",
    "status": "active",
    "parent_fleet": "{{parent_fleet_id}}"
}'
```

Otras formas de llamar a esto

* OK
* Unprocessable Entity
* Not Found

200

OK

```json
{
  "id": "fleet_1Bd7Rk9Tz3",
  "name": "Carpool",
  "color": "#059669",
  "task": "Transporte de empleados",
  "status": "activo",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": null,
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": "fleet_4Mnp8Qx2Vz",
  "updated_at": "2026-05-07T08:31:00.000000Z",
  "created_at": "2026-05-07T08:31:00.000000Z"
}
```

POST
`/v1/vehículos`

## [Crear un vehículo para la flota](#crear-un-vehículo-para-la-flota)

Crea un vehículo para las solicitudes de membresía de la flota para su uso.

El vehículo creado en la
**Vehículos**
carpeta se elimina antes de que esta carpeta se ejecute, por lo que las afirmaciones de membresía necesitan un recurso propio. Se elimina nuevamente por
**Eliminar un vehículo de la flota**
al final de esta carpeta.

POST
`/v1/vehículos`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/vehicles \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Vehículo para la membresía de la flota",
    "make": "Toyota",
    "model": "HiAce",
    "year": 2024,
    "plate_number": "FLT-0001",
    "status": "disponible"
}'
```

POST
`/v1/conductores`

## [Crear un conductor para la flota](#crear-un-conductor-para-la-flota)

Crea un conductor para las solicitudes de membresía de la flota para su uso.

El conductor creado en la
**Conductores**
carpeta se elimina antes de que esta carpeta se ejecute, por lo que las afirmaciones de membresía necesitan un recurso propio. Se elimina nuevamente por
**Eliminar un conductor de la flota**
al final de esta carpeta.

POST
`/v1/conductores`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/drivers \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Conductor para la membresía de la flota",
    "internal_id": "DRV-FLT-0001"
}'
```

GET
`/v1/flotas`

## [Consultar flotas](#consultar-flotas)

Devuelve una lista paginada de flotas para la organización actual. Utilice los parámetros de paginación y clasificación para controlar el conjunto de resultados.

Parámetros de consulta

`query`

string

opcional

Búsqueda de texto libre en el nombre de la flota, la tarea y el ID público.

`name`

string

opcional

Filtra por el nombre de la flota.

`public_id`

string

opcional

Filtra por el ID público de la flota (
`fleet_...`
). Coincidencia exacta.

`status`

string

opcional

Filtra por el estado de la flota. Acepta una lista separada por comas.

`task`

string

opcional

Filtra por la tarea de la flota.

`parent_fleet`

string

opcional

Filtra para las subflotas de una flota principal, indicada por su ID público (
`fleet_...`
).

`parents_only`

boolean

opcional

Devuelve solo las flotas raíz: aquellas que no tienen una flota principal.

`vendor`

string

opcional

Filtra por el proveedor, indicado por su ID público (
`vendor_...`
).

`service_area`

string

opcional

Filtra por el área de servicio, indicada por su ID público (
`service_area_...`
).

`zone`

string

opcional

Filtra por la zona, indicada por su ID público (
`zone_...`
).

`limit`

integer

opcional

Número máximo de flotas a devolver.

`offset`

integer

opcional

Número de flotas a omitir antes de devolver los resultados.

`sort`

string

opcional

Expresión de clasificación para la consulta de la flota.

`with`

array de strings

opcional

Relaciones para expandir:
`service_area`
,
`zone`
,
`vendor`
,
`parent_fleet`
,
`photo`
,
`subfleets`
,
`conductores`
,
`vehículos`
, y las anidadas
`subfleets.conductores`
/
`subfleets.vehículos`
. Aceptado como
`?with=vendor`
,
`?with[]=vendor`
,
`?with[]=vendor&with[]=driver`
y
`?with=vendor,driver`
;
`expand`
es un alias para los cuatro. Expandir añade el objeto anidado: nunca reemplaza ni reescribe el identificador
`<name_id>`
, que siempre está presente. Un nombre fuera del conjunto admitido se ignora en lugar de ser rechazado.

GET
`/v1/flotas`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fleets?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
[
  {
    "id": "fleet_4Mnp8Qx2Vz",
    "name": "Haulers",
    "color": "#2563EB",
    "task": "Distribución de larga distancia",
    "status": "activo",
    "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
    "service_area_id": "service_area_9Kp2Vx4Qm1",
    "zone_id": null,
    "vendor_id": null,
    "parent_fleet_id": null,
    "photo_id": null,
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  }
]
```

GET
`/v1/flotas/:id`

## [Recuperar una flota](#recuperar-una-flota)

Recupera una flota.

GET
`/v1/flotas/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fleets/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "fleet_4Mnp8Qx2Vz",
  "name": "Haulers",
  "color": "#2563EB",
  "task": "Distribución de larga distancia",
  "status": "activo",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": "service_area_9Kp2Vx4Qm1",
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": null,
  "photo_id": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/flotas/:id/vehículos/:vehículo`

## [Asignar un vehículo a una flota](#asignar-un-vehículo-a-una-flota)

Añade un vehículo a una flota. Ambos parámetros de ruta son ID públicos; no se acepta ni se devuelve ningún UUID interno.

La asignación es idempotente. Repetirla responde de la misma manera y nunca crea un segundo miembro; un miembro que se ha eliminado se restaura en lugar de duplicarse. Asignar a una flota no elimina el recurso de ninguna otra flota, y no cambia el vehículo actual del conductor.

POST
`/v1/flotas/:id/vehículos/:vehículo`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/vehicles/:vehicle \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "vehicle": "vehicle_7YqM3KpL2n",
  "assigned": true
}
```

POST
`/v1/flotas/:id/vehículos/:vehículo`

## [Reasignar un vehículo a una flota](#reasignar-un-vehículo-a-una-flota)

Añade un vehículo a una flota. Ambos parámetros de ruta son ID públicos; no se acepta ni se devuelve ningún UUID interno.

Esta solicitud repite la asignación anterior deliberadamente: la asignación es idempotente, por lo que una segunda llamada responde exactamente como la primera, y produce un único miembro activo, no dos.

POST
`/v1/flotas/:id/vehículos/:vehículo`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/vehicles/:vehicle \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "vehicle": "vehicle_7YqM3KpL2n",
  "assigned": true
}
```

POST
`/v1/flotas/:id/conductores/:conductor`

## [Asignar un conductor a una flota](#asignar-un-conductor-a-una-flota)

Añade un conductor a una flota. Ambos parámetros de ruta son ID públicos; no se acepta ni se devuelve ningún UUID interno.

La asignación es idempotente. Repetirla responde de la misma manera y nunca crea un segundo miembro; un miembro que se ha eliminado se restaura en lugar de duplicarse. Asignar a una flota no elimina el recurso de ninguna otra flota, y no cambia el vehículo actual del conductor.

POST
`/v1/flotas/:id/conductores/:conductor`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/drivers/:conductor \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "driver": "driver_7YqM3KpL2n",
  "assigned": true
}
```

POST
`/v1/flotas/:id/conductores/:conductor`

## [Reasignar un conductor a una flota](#reasignar-un-conductor-a-una-flota)

Añade un conductor a una flota. Ambos parámetros de ruta son ID públicos; no se acepta ni se devuelve ningún UUID interno.

Esta solicitud repite la asignación anterior deliberadamente: la asignación es idempotente, por lo que una segunda llamada responde exactamente como la primera, y produce un único miembro activo, no dos.

POST
`/v1/flotas/:id/conductores/:conductor`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/drivers/:conductor \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "driver": "driver_7YqM3KpL2n",
  "assigned": true
}
```

PUT
`/v1/flotas/:id`

## [Actualizar una flota](#actualizar-una-flota)

Actualiza cualquier campo de flota seguro: nombre, color, tarea, estado y las relaciones de área de servicio, zona, proveedor y flota principal.

Los parámetros de relación toman ID público y se resuelven dentro de la organización autenticada. Enviar
`null`
para una relación elimina la relación:
`"parent_fleet": null`
promueve una flota de subflota a una flota raíz. Una flota no puede ser su propia flota principal, y no puede moverse debajo de una de sus propias subflotas.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización de la flota.

`color`

string

opcional

Color de visualización para la flota.

`task`

string

opcional

Descripción de texto libre de lo que se utiliza la flota.

`status`

string

opcional

Estado de la flota.

`service_area`

string

opcional

ID público del área de servicio (
`service_area_...`
). Enviar
`null`
para eliminar la asignación.

`zone`

string

opcional

ID público de la zona (
`zone_...`
). Enviar
`null`
para eliminar la asignación.

`vendor`

string

opcional

ID público del proveedor (
`vendor_...`
). Enviar
`null`
para eliminar la asignación.

`parent_fleet`

string

opcional

ID público de la flota principal (
`fleet_...`
). Enviar
`null`
para promover la flota a una flota raíz. Una flota no puede ser su propia flota principal, y no puede moverse debajo de una de sus propias subflotas.

`photo`

string

opcional

ID de archivo (
`file_...`
) para utilizar como imagen de la flota.

PUT
`/v1/flotas/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/fleets/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Haulers North",
    "color": "#7C3AED",
    "task": "Distribución regional",
    "status": "activo",
    "service_area": "{{service_area_id}}"
}'
```

Otras formas de llamar a esto

* OK

200

OK
```json
{
  "id": "fleet_4Mnp8Qx2Vz",
  "name": "Haulers",
  "color": "#2563EB",
  "task": "Distribución de larga distancia",
  "status": "activo",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": "service_area_9Kp2Vx4Qm1",
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": null,
  "photo_id": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

GET
`/v1/flotas/:id`

## [Recuperar una flota](#recuperar-una-flota)

Recupera una flota.

GET
`/v1/flotas/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fleets/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "id": "fleet_4Mnp8Qx2Vz",
  "name": "Haulers",
  "color": "#2563EB",
  "task": "Distribución de larga distancia",
  "status": "activo",
  "photo_url": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "service_area_id": "service_area_9Kp2Vx4Qm1",
  "zone_id": null,
  "vendor_id": null,
  "parent_fleet_id": null,
  "photo_id": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/flotas/:id/vehículos/:vehículo`

## [Asignar un vehículo a una flota](#asignar-un-vehículo-a-una-flota)

Añade un vehículo a una flota. Ambos parámetros de ruta son ID públicos; no se acepta ni se devuelve ningún UUID interno.

La asignación es idempotente. Repetirla responde de la misma manera y nunca crea un segundo miembro; un miembro que se ha eliminado se restaura en lugar de duplicarse. Asignar a una flota no elimina el recurso de ninguna otra flota, y no cambia el vehículo actual del conductor.

POST
`/v1/flotas/:id/vehículos/:vehículo`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/vehicles/:vehicle \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "vehicle": "vehicle_7YqM3KpL2n",
  "assigned": true
}
```

POST
`/v1/flotas/:id/vehículos/:vehículo`

## [Reasignar un vehículo a una flota](#reasignar-un-vehículo-a-una-flota)

Añade un vehículo a una flota. Ambos parámetros de ruta son ID públicos; no se acepta ni se devuelve ningún UUID interno.

Esta solicitud repite la asignación anterior deliberadamente: la asignación es idempotente, por lo que una segunda llamada responde exactamente como la primera, y produce un único miembro activo, no dos.

POST
`/v1/flotas/:id/vehículos/:vehículo`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/vehicles/:vehicle \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "vehicle": "vehicle_7YqM3KpL2n",
  "assigned": true
}
```

POST
`/v1/flotas/:id/conductores/:conductor`

## [Asignar un conductor a una flota](#asignar-un-conductor-a-una-flota)

Añade un conductor a una flota. Ambos parámetros de ruta son ID públicos; no se acepta ni se devuelve ningún UUID interno.

La asignación es idempotente. Repetirla responde de la misma manera y nunca crea un segundo miembro; un miembro que se ha eliminado se restaura en lugar de duplicarse. Asignar a una flota no elimina el recurso de ninguna otra flota, y no cambia el vehículo actual del conductor.

POST
`/v1/flotas/:id/conductores/:conductor`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/drivers/:conductor \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "driver": "driver_7YqM3KpL2n",
  "assigned": true
}
```

POST
`/v1/flotas/:id/conductores/:conductor`

## [Reasignar un conductor a una flota](#reasignar-un-conductor-a-una-flota)

Añade un conductor a una flota. Ambos parámetros de ruta son ID públicos; no se acepta ni se devuelve ningún UUID interno.

Esta solicitud repite la asignación anterior deliberadamente: la asignación es idempotente, por lo que una segunda llamada responde exactamente como la primera, y produce un único miembro activo, no dos.

POST
`/v1/flotas/:id/conductores/:conductor`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fleets/:id/drivers/:conductor \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "fleet": "fleet_4Mnp8Qx2Vz",
  "driver": "driver_7YqM3KpL2n",
  "assigned": true
}
```

PUT
`/v1/flotas/:id`

## [Actualizar una flota](#actualizar-una-flota)

Actualiza cualquier campo de flota seguro: nombre, color, tarea, estado y las relaciones de área de servicio, zona, proveedor y flota principal.

La relación de entrada toma ID público y se resuelve dentro de la organización autenticada. Enviar
`null`
para una relación elimina la relación:
`"parent_fleet": null`
promueve una flota de subflota a una flota raíz. Una flota no puede ser su propia flota principal, y no puede moverse debajo de una de sus propias subflotas.

Parámetros del cuerpo

`name`

string

opcional

Nombre de visualización de la flota.

`color`

string

opcional

Color de visualización para la flota.

`task`

string

opcional

Descripción de texto libre de lo que se utiliza la flota.

`status`

string

opcional

Estado de la flota.

`service_area`

string

opcional

ID público del área de servicio (
`service_area_...`
). Enviar
`null`
para eliminar la asignación.

`zone`

string

opcional

ID público de la zona (
`zone_...`
). Enviar
`null`
para eliminar la asignación.

`vendor`

string

opcional

ID público del proveedor (
`vendor_...`
). Enviar
`null`
para eliminar la asignación.

`parent_fleet`

string

opcional

ID público de la flota principal (
`fleet_...`
). Enviar
`null`
para promover la flota a una flota raíz. Una flota no puede ser su propia flota principal, y no puede moverse debajo de una de sus propias subflotas.

`photo`

string

opcional

ID de archivo (
`file_...`
) para utilizar como imagen de la flota.

PUT
`/v1/flotas/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/fleets/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Haulers North",
    "color": "#7C3AED",
    "task": "Distribución regional",
    "status": "activo",
    "service_area": "{{service_area_id}}"
}'
```

Otras formas de llamar a esto

* OK

200

OK

```json
{
  "id": "fleet_4Mnp8Qx2Vz",
  "nombre": "Haulers North",
  "color": "#7C3AED",
  "tarea": "Distribución regional",
  "estado": "activo",
  "url_foto": "https://s3.ap-northeast-2.amazonaws.com/fleetbase/public/default-fleet.png",
  "id_área_de_servicio": "service_area_9Kp2Vx4Qm1",
  "id_zona": null,
  "id_proveedor": null,
  "id_flota_padre": null,
  "id_foto": null,
  "fecha_actualización": "2026-05-07T09:12:00.000000Z",
  "fecha_creación": "2026-05-07T08:30:00.000000Z"
}
```

BORRAR
`/v1/flotas/:id/vehículos/:vehículo`

## [Eliminar un vehículo de una flota](#eliminar-un-vehículo-de-una-flota)

Elimina un vehículo de una flota. Ambos parámetros de ruta son identificadores públicos.

Eliminar un miembro nunca elimina el vehículo, nunca cambia el vehículo actual de un conductor, y nunca afecta la pertenencia del recurso a cualquier otra flota. Repetir la eliminación es una operación sin efecto exitosa.

BORRAR
`/v1/flotas/:id/vehículos/:vehículo`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/flotas/:id/vehículos/:vehículo \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "flota": "fleet_4Mnp8Qx2Vz",
  "vehículo": "vehicle_7YqM3KpL2n",
  "asignado": false
}
```

BORRAR
`/v1/flotas/:id/vehículos/:vehículo`

## [Eliminar un vehículo de una flota de nuevo](#eliminar-un-vehículo-de-una-flota-de-nuevo)

Elimina un vehículo de una flota. Ambos parámetros de ruta son identificadores públicos.

Esta solicitud repite la eliminación anterior deliberadamente: eliminar un miembro que no existe es una operación sin efecto documentada y exitosa.

BORRAR
`/v1/flotas/:id/vehículos/:vehículo`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/flotas/:id/vehículos/:vehículo \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "flota": "fleet_4Mnp8Qx2Vz",
  "vehículo": "vehicle_7YqM3KpL2n",
  "asignado": false
}
```

BORRAR
`/v1/flotas/:id/conductores/:conductor`

## [Eliminar un conductor de una flota](#eliminar-un-conductor-de-una-flota)

Elimina un conductor de una flota. Ambos parámetros de ruta son identificadores públicos.

Eliminar un miembro nunca elimina al conductor, nunca cambia el vehículo actual del conductor, y nunca afecta la pertenencia del recurso a cualquier otra flota. Repetir la eliminación es una operación sin efecto exitosa.

BORRAR
`/v1/flotas/:id/conductores/:conductor`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/flotas/:id/conductores/:conductor \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "flota": "fleet_4Mnp8Qx2Vz",
  "conductor": "driver_7YqM3KpL2n",
  "asignado": false
}
```

BORRAR
`/v1/flotas/:id/conductores/:conductor`

## [Eliminar un conductor de una flota de nuevo](#eliminar-un-conductor-de-una-flota-de-nuevo)

Elimina un conductor de una flota. Ambos parámetros de ruta son identificadores públicos.

Esta solicitud repite la eliminación anterior deliberadamente: eliminar un miembro que no existe es una operación sin efecto documentada y exitosa.

BORRAR
`/v1/flotas/:id/conductores/:conductor`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/flotas/:id/conductores/:conductor \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "flota": "fleet_4Mnp8Qx2Vz",
  "conductor": "driver_7YqM3KpL2n",
  "asignado": false
}
```

BORRAR
`/v1/vehículos/:id`

## [Eliminar un vehículo de una flota](#eliminar-un-vehículo-de-una-flota)

Elimina el vehículo creado para las solicitudes de membresía de la flota. Se ejecuta después de que se haya eliminado cada membresía.

BORRAR
`/v1/vehículos/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/vehículos/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

BORRAR
`/v1/conductores/:id`

## [Eliminar un conductor de una flota](#eliminar-un-conductor-de-una-flota)

Elimina el conductor creado para las solicitudes de membresía de la flota. Se ejecuta después de que se haya eliminado cada membresía.

BORRAR
`/v1/conductores/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/conductores/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

BORRAR
`/v1/flotas/:id`

## [Eliminar una subflota](#eliminar-una-subflota)

Elimina la subflota creada por
**Crear una subflota**
.

Se ejecuta antes de
**Eliminar una flota**
para que el hijo se elimine antes de su padre.

BORRAR
`/v1/flotas/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/flotas/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

BORRAR
`/v1/flotas/:id`

## [Eliminar una flota](#eliminar-una-flota)

Elimina una flota.

BORRAR
`/v1/flotas/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/flotas/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```json
{
  "id": "<string>",
  "objeto": "<string>",
  "eliminado": "<boolean>"
}
```