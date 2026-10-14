---
title: "Configurar el seguimiento en tiempo real"
url: https://fleetbase.io/docs/platform/recipes/set-up-real-time-tracking
module: platform
---

# Configurar el seguimiento en tiempo real

Suscríbase a los eventos de socket de Fleetbase para mostrar la ubicación en vivo de los conductores y las actualizaciones del estado de los pedidos en su propia aplicación o panel.

# Configurar el seguimiento en tiempo real

Fleetbase transmite eventos en tiempo real: actualizaciones de la ubicación del conductor, cambios de estado de los pedidos y eventos de la plataforma, utilizando WebSocket a través de
[SocketCluster](https://socketcluster.io/)
. Esta receta muestra cómo suscribirse a estos canales desde su propia aplicación y renderizar las posiciones de los conductores en un mapa.

## Lo que construirás

Una página del navegador que se conecta al servidor de socket de Fleetbase, se suscribe al canal de eventos de su organización y dibuja las ubicaciones de los conductores entrantes en un mapa Leaflet.js en tiempo real.

## Requisitos previos

* Una cuenta de Fleetbase con Fleet-Ops instalado y al menos un conductor activo utilizando la aplicación Navigator
* Su
  **clave pública de API**
  y
  **UUID de la empresa**
  del Panel de Desarrollador
* El nombre de host de su servidor de socket (para instalaciones propias: su dominio; para Fleetbase Cloud: proporcionado en la configuración de su cuenta)

## Cómo funciona la capa de socket

Fleetbase mantiene dos tipos de canales a los que puede suscribirse:

| Canal | Lo que recibe |
|---|---|
| `api.{key_id}` | Eventos limitados a una clave de API específica |
| `company.{company_id}` | Todos los eventos para su organización, independientemente de la clave |

Las actualizaciones de la ubicación del conductor se publican en
`company.{company_id}`
cuando los conductores se mueven. El tipo de evento es
`driver.location_changed`
y el payload incluye la latitud, la longitud, la dirección y la velocidad actuales del conductor.

Puede supervisar los eventos en tiempo real directamente en la consola en
**Desarrolladores → Eventos de Socket**
antes de escribir cualquier código.

## Paso 1 — Instale la biblioteca de cliente

```
npm install socketcluster-client
```

O a través de CDN en una página del navegador:

```
<script src="https://cdn.jsdelivr.net/npm/socketcluster-client/socketcluster-client.min.js"></script>
```

## Paso 2 — Conéctese al servidor de socket

```
import socketClusterClient from 'socketcluster-client';

const socket = socketClusterClient.create({
    hostname: 'socket.your-instance.com', // o el host de socket de Fleetbase Cloud
    secure: true,
    port: 443,
});

socket.on('connect', () => {
    console.log('Conectado al servidor de socket de Fleetbase');
});

socket.on('disconnect', () => {
    console.log('Desconectado — intentará reconectarse automáticamente');
});
```

SocketCluster se reconecta automáticamente en caso de desconexión. No necesita implementar la lógica de reconexión usted mismo.

## Paso 3 — Suscríbase al canal de la organización

```
const COMPANY_ID = 'your-company-uuid'; // desde Developer Console → API Keys

async function subscribeToCompanyChannel() {
    const channel = socket.subscribe(`company.${COMPANY_ID}`);

    for await (const event of channel) {
        handleSocketEvent(event);
    }
}

function handleSocketEvent(event) {
    console.log(`Se recibió el evento [${event.event}]:`, event.data);

    switch (event.event) {
        case 'driver.location_changed':
            updateDriverMarker(event.data);
            break;
        case 'order.dispatched':
            onOrderDispatched(event.data);
            break;
        case 'order.completed':
            onOrderCompleted(event.data);
            break;
    }
}

subscribeToCompanyChannel();
```

## Paso 4 — Renderice las ubicaciones de los conductores en un mapa

Este ejemplo utiliza
[Leaflet.js](https://leafletjs.com/)
, una biblioteca de mapas de código abierto y ligera.

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Seguimiento en tiempo real de conductores</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>
    #map { height: 100vh; width: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/socketcluster-client/socketcluster-client.min.js"></script>
  <script>
    // Inicializa el mapa
    const map = L.map('map').setView([1.3521, 103.8198], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Rastrear marcadores por ID de conductor
    const driverMarkers = {};

    function updateDriverMarker(driver) {
        const { id, name, location } = driver;
        const { coordinates } = location; // [lng, lat] en el orden GeoJSON
        const latLng = [coordinates[1], coordinates[0]];

        if (driverMarkers[id]) {
            driverMarkers[id].setLatLng(latLng);
        } else {
            const marker = L.marker(latLng)
                .bindPopup(`<strong>${name}</strong>`)
                .addTo(map);
            driverMarkers[id] = marker;
        }
    }

    // Conéctese al servidor de socket de Fleetbase
    const socket = socketClusterClient.create({
        hostname: 'socket.your-instance.com',
        secure: true,
        port: 443,
    });

    const COMPANY_ID = 'your-company-uuid';

    (async () => {
        const channel = socket.subscribe(`company.${COMPANY_ID}`);
        for await (const event of channel) {
            if (event.event === 'driver.location_changed') {
                updateDriverMarker(event.data);
            }
        }
    })();
  </script>
</body>
</html>
```

## Paso 5 — Cargue las posiciones de los conductores existentes a través de la API

Los eventos de socket solo entregan actualizaciones desde cuando se conecta. Para mostrar los conductores que ya están en el mapa antes de que se active cualquier evento de movimiento, obtenga sus últimas posiciones conocidas a través de la API al cargar:

```
const API_KEY = 'flb_live_your_public_key_here';

async function loadActiveDrivers() {
    const response = await fetch('https://api.fleetbase.io/v1/drivers?status=active', {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        }
    });

    const { data: drivers } = await response.json();

    for (const driver of drivers) {
        if (driver.location) {
            updateDriverMarker(driver);
        }
    }
}

loadActiveDrivers();
```

## Payload del evento de ubicación

El
`driver.location_changed`
payload de evento tiene este aspecto:

```
{
  "event": "driver.location_changed",
  "data": {
    "id": "driver_01H...",
    "public_id": "DRV-001",
    "name": "Alex Tan",
    "phone": "+6591234567",
    "status": "active",
    "location": {
      "type": "Point",
      "coordinates": [103.8198, 1.3521]
    },
    "heading": 145,
    "speed": 42.5
  }
}
```

Las coordenadas siguen el orden GeoJSON:
`[latitud, longitud]`
. Cambie el orden al pasar a la convención
`[lat, lng]`
de Leaflet.js.

## Suscribirse a un canal de clave de API específico

Si solo desea recibir eventos vinculados a una integración específica (en lugar de a todos los eventos de la organización), suscríbase a
`api.{key_id}`
en su lugar:

```
const KEY_ID = 'your-api-key-id'; // El ID de la clave pública
```

Puede encontrar el ID de la clave en
**Desarrolladores → Claves de API**
.

## Restricciones de origen

En producción, restrinja las direcciones desde las que se puede conectar a su servidor de socket. Consulte la sección
[Configuración del sistema → Socket](https://fleetbase.io/docs/platform/system-setup/socket)
para obtener detalles de configuración.

## Próximos pasos

* Supervise los eventos en tiempo real en la consola en
  **Desarrolladores → Eventos de Socket**
* Consulte
  [Eventos de Socket](https://fleetbase.io/docs/platform/developer-console/socket-events)
  para obtener referencias de canal
* Consulte
  [Conecte su primer webhook](https://fleetbase.io/docs/platform/recipes/connect-your-first-webhook)
  para recibir llamadas de retorno de eventos persistentes en lugar de flujos en tiempo real