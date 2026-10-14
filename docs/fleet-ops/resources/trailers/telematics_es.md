---
título: "Telemetría para remolques"
url: https://fleetbase.io/docs/fleet-ops/resources/trailers/telematics
módulo: fleet-ops
---

Remolques

# Telemetría para remolques

Conecte dispositivos IoT a los remolques e ingiera datos de telemetría actuales e históricos de forma independiente del vehículo remolcador.

# Telemetría para remolques

Un remolque puede tener uno o más dispositivos directamente conectados. Esto es útil para rastreadores GPS con batería, controladores de refrigeración, sensores de puertas y carga, sistemas de presión de neumáticos y otros dispositivos IoT que siguen informando cuando el remolque se separa del vehículo.

## Conectar un dispositivo

Desde un remolque, seleccione
**Conectar dispositivo**
(desde las acciones de "Vista general" o la pestaña "Dispositivos") y seleccione un dispositivo no conectado. A través de "Conectividad", el mismo espacio de trabajo de conexión puede dirigirse tanto a un vehículo como a un remolque. Reasignar un dispositivo elimina su registro de instalación anterior y crea uno nuevo; desconectar conserva ese historial.

A través de la API, conecte un dispositivo con el contrato de conexión polimórfico:

```
curl -X POST https://api.fleetbase.io/v1/devices/device_4Hn8rTq2Lx/attach \
  -H "Authorization: Bearer $FLEETBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "attachable_type": "fleet-ops:trailer", "attachable": "trailer_7YqM3KpL2n" }'
```

La respuesta del dispositivo informa:
`attachable_type: "fleet-ops:trailer"`
,
`attachable_id`
y
`attachable_name`
.
`POST /v1/devices/{id}/detach`
elimina la conexión. Los dispositivos no se pueden conectar entre empresas.

## Estado de ingestión

Los eventos de ubicación de un dispositivo conectado actualizan la proyección y el historial de posición actual del remolque, incluyendo la velocidad, la dirección, la altitud, el odómetro, las horas del motor de refrigeración, el estado en línea, el proveedor y la hora de observación. Los eventos más antiguos que no están en orden permanecen en el historial de eventos, pero no sobrescriben la posición actual.

Las actualizaciones del remolque se transmiten
`trailer.location_changed`
en los canales
`company.{uuid}`
,
`trailer.{public_id}`
y canales internos del remolque con el ID público del remolque, su ubicación, altitud, dirección y velocidad. Las respuestas públicas del remolque exponen la instantánea de telemetría bajo
`telematics`
(
`last_event_at`
,
`last_provider`
,
`last_event_type`
y
`last_telemetry_data`
) sin UUIDs de dispositivos o eventos.

## Seguimiento de API directo

Utilice el punto final de seguimiento del remolque cuando la fuente no llega a través de un proveedor de telemetría configurado. Proporcione la latitud y la longitud, así como una hora de observación y valores de movimiento opcionales.

```
curl -X PATCH https://api.fleetbase.io/v1/trailers/trailer_7YqM3KpL2n/track \
  -H "Authorization: Bearer $FLEETBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "latitude": 40.7484, "longitude": -73.9857, "speed": 35, "heading": 90, "observed_at": "2026-09-07T11:44:31Z" }'
```

La respuesta es el remolque actualizado:

```
{
  "id": "trailer_7YqM3KpL2n",
  "connectivity_status": "online",
  "online": true,
  "last_online_at": "2026-09-07T11:44:31.000000Z",
  "location": { "type": "Point", "coordinates": [-73.9857, 40.7484] },
  "speed": 35,
  "heading": 90,
  "telematics": {
    "last_event_at": "2026-09-07T11:44:31.336303Z",
    "last_provider": "public_api",
    "last_telemetry_data": { "speed": 35, "heading": 90 }
  }
}
```

Fleet-Ops almacena una posición histórica y actualiza el "instantánea" del remolque solo cuando la observación no es más antigua que el último evento registrado. Las observaciones en
`0, 0`
se reconocen pero se ignoran.
`GET /v1/trailers/{id}?with=positions`
devuelve el historial de posiciones almacenado.

## Telemetría del vehículo versus remolque

Conecte cada dispositivo al activo que mide físicamente. Un rastreador instalado en un remolque pertenece al remolque incluso cuando está siendo remolcado. La conexión actual le indica qué vehículo lo está moviendo; no debe utilizarse para reasignar la propiedad del dispositivo o duplicar posiciones en el vehículo.

Consulte
[Dispositivos](https://fleetbase.io/docs/fleet-ops/connectivity/devices/overview)
y
[Telemetría](https://fleetbase.io/docs/fleet-ops/connectivity/telematics/overview)
para la configuración del proveedor e ingestión de eventos.