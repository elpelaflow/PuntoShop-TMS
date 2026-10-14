---
título: "Conexiones y equipos"
url: https://fleetbase.io/docs/fleet-ops/resources/trailers/connections-and-equipment
módulo: fleet-ops
---

Remolques

# Conexiones y equipos

Conectar los remolques a los vehículos, registrar el historial de remolque y gestionar los equipos conectados a los vehículos o remolques.

# Conexiones y equipos de remolque

Fleet-Ops considera una relación de remolque como una conexión con fecha de validez
**efectiva**, y no como un campo permanente en ninguno de los activos. Cada conexión registra el vehículo, el remolque, la posición de remolque, la hora de inicio, una hora de finalización opcional, la fuente, notas y datos de auditoría.

## Reglas de conexión

* Un remolque solo puede tener una conexión activa con un vehículo a la vez.
* Una posición de remolque en un vehículo solo puede contener un remolque activo.
* Repetir la misma solicitud de enganche o desenganche es seguro y no crea conexiones activas duplicadas.
* Mover un remolque a otro vehículo requiere primero desenganchar la conexión actual.
* Desenganchar cierra el registro activo; no lo elimina.
* Se respetan los límites de los arrendatarios para ambos activos.

Estas reglas también permiten combinar varios remolques: conectar cada remolque al mismo vehículo con una posición de remolque distinta (la posición 1 está directamente detrás del tractor).

## Desde un vehículo

Abrir un vehículo y seleccionar
**Remolques**
para ver los remolques actualmente conectados a él. Utilice
**Conectar remolque**
para seleccionar un remolque desconectado y su posición de remolque, o
**Desconectar**
para finalizar una conexión. La pestaña
**Equipos**
del vehículo enumera por separado los equipos auxiliares equipados en ese vehículo y le permite conectarlos o desconectarlos.

## Desde un remolque

Abrir un remolque y utilizar:

* la
  **Vista general**
  para ver el vehículo actual conectado y conectarlo o desconectarlo;
* **Historial de remolque**
  para revisar las conexiones de remolque actuales y completadas, de la más reciente a la más antigua;
* **Equipos**
  para conectar, abrir o desconectar equipos auxiliares;
* **Dispositivos**
  para conectar y revisar los rastreadores y sensores instalados en el remolque.

![Panel de detalles del remolque → Historial de remolque — todos los vehículos a los que se ha conectado el remolque, de la más reciente a la más antigua, con la conexión actual y una acción de "Desconectar"](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-trailer-connections.4475700d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Las acciones de enganche, desenganche y equipos actualizan el panel abierto inmediatamente; no es necesario volver a cargar la página.

## API de remolque

### Conectar un remolque a un vehículo

```
curl -X POST https://api.fleetbase.io/v1/trailers/trailer_7YqM3KpL2n/attach \
  -H "Authorization: Bearer $FLEETBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "vehicle": "vehicle_58gPloyQb9", "position": 1, "source": "dispatcher" }'
```

```
{
  "id": "connection_mvcfqwn6rn",
  "relationship_type": "towing",
  "position": 1,
  "vehicle_id": "vehicle_58gPloyQb9",
  "trailer_id": "trailer_7YqM3KpL2n",
  "vehicle": { "id": "vehicle_58gPloyQb9", "name": "CEN-01", "plate_number": "GBB-1001" },
  "trailer": { "id": "trailer_7YqM3KpL2n", "name": "Reefer 12", "type": "reefer", "plate_number": "TR-1200" },
  "connected_at": "2026-09-07T11:42:39.000000Z",
  "disconnected_at": null,
  "active": true,
  "source": "dispatcher",
  "notes": null
}
```

`vehicle`
acepta el ID público o el ID interno del vehículo. Conectar un remolque ya conectado al mismo vehículo devuelve la conexión existente. Conectarlo a un vehículo diferente, o a una posición de remolque que ya está ocupada, devuelve
`409 Conflict`
con un
`error`
mensaje.

### Desconectar un remolque

```
curl -X POST https://api.fleetbase.io/v1/trailers/trailer_7YqM3KpL2n/detach \
  -H "Authorization: Bearer $FLEETBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "notes": "Llegada al depósito" }'
```

La respuesta es
`{ "status": "ok", "connection": { ... } }`
con
`active: false`
y una marca de tiempo de
`disconnected_at`
. Desconectar un remolque que no está conectado devuelve
`{ "status": "ok", "connection": null }`
.

### Leer el estado de remolque

* `GET /v1/trailers/{id}`
  expone
  `vehicle_id`
  ,
  `current_vehicle`
  y
  `current_connection`
  .
* `GET /v1/trailers/{id}/connections`
  lista toda la historia de remolques, de la más reciente a la más antigua.
* `GET /v1/vehicles/{id}/trailers`
  lista los remolques actualmente conectados a un vehículo.
* `GET /v1/vehicles/{id}?with=trailers`
  añade la misma lista a la respuesta del vehículo.

## Asignación de equipos

Los equipos tienen una asignación polimórfica. Se pueden conectar directamente a un vehículo o remolque y reasignar de forma atómica. Ejemplos incluyen una grúa fija a un remolque, una carretilla que se transporta en un vehículo o una unidad de refrigeración montada en un remolque.

![Panel de detalles del remolque → Equipos — grúa y barras de carga equipadas al remolque, cada uno con estado y acciones de vista/desenganchar](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-trailer-equipment.1fb5977f.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Los formularios de creación y edición de equipos le permiten elegir el tipo de activo y el activo. La API pública expone operaciones de enganche y desenganche explícitas:

```
curl -X POST https://api.fleetbase.io/v1/equipment/equipment_9kQ2mR4xTz/attach \
  -H "Authorization: Bearer $FLEETBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "attachable_type": "fleet-ops:trailer", "attachable": "trailer_7YqM3KpL2n" }'
```

`attachable_type`
acepta
`fleet-ops:vehicle`
o
`fleet-ops:trailer`
(las formas cortas
`vehicle`
y
`trailer`
también se aceptan). Las respuestas incluyen
`equipable_type`
,
`equipable_id`
y
`equipable_name`
; los UUID privados no se aceptan en los endpoints públicos.
`POST /v1/equipment/{id}/detach`
elimina la asignación.

## Guía operativa

Registre la relación física que existe en el patio o en la carretera. Los equipos montados en un remolque deben permanecer conectados a ese remolque cuando el remolque se mueva entre vehículos. Solo conéctelos al vehículo cuando el equipo pertenezca operativamente a la unidad con motor.