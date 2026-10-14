---
title: "Eventos de Socket"
url: https://fleetbase.io/docs/platform/developer-console/socket-events
module: platform
---

# Eventos de Socket

Supervise los canales WebSocket en tiempo real y suscríbase a los flujos de eventos en tiempo real de su instancia de Fleetbase.

# Eventos de Socket

Fleetbase utiliza
**SocketCluster**
para transmitir eventos en tiempo real a través de conexiones WebSocket. El panel "Eventos de Socket" en la Consola para Desarrolladores le permite explorar los canales disponibles y observar la salida de eventos en tiempo real directamente en la consola. Navegue a
**Desarrolladores → Eventos de Socket**
.

![Lista de Eventos de Socket — Botón "Escuchar" y columnas de Nombre de Canal para cada canal disponible](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-websockets.f6494e94.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Canales Disponibles

El panel muestra todos los canales disponibles para su organización:

| Canal | Descripción |
|---|---|
| `api.{key_id}` | Un canal por clave de API — transmite eventos con ámbito a esa credencial |
| `company.{company_id}` | El canal principal de su organización — transmite todos los eventos para su organización, independientemente de qué clave los haya desencadenado |

## Escuchar en un Canal

Haga clic en
**Escuchar**
en cualquier fila para abrir la vista de eventos en tiempo real para ese canal.

![Vista en vivo del canal — Panel de terminal negro con salida de eventos en monospaced verde y marcas de tiempo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-websockets-channel.b1fa8f58.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

La vista del canal muestra un panel de salida similar a un terminal en negro. A medida que llegan los eventos, aparecen como líneas con marcas de tiempo en texto monospaced verde. Si aún no se han desencadenado eventos, un indicador muestra
**Esperando eventos…**
.

Cada línea muestra la hora en que se recibió el evento y su contenido JSON, formateado para facilitar la lectura.

## Escuchar en un Canal Personalizado

Haga clic en
**Escuchar en canal personalizado**
en el encabezado para ingresar el nombre del canal manualmente — útil cuando conoce el identificador de canal exacto que desea observar.

![Modal para escuchar en un canal personalizado — Campo de entrada de ID de canal y botón "Escuchar"](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-websockets-custom-channel.f1de2d09.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Conexión Programática

Para recibir eventos de socket en su propia aplicación, conéctese al servidor de SocketCluster de Fleetbase utilizando la biblioteca
`socketcluster-client`.

```
import socketClusterClient from 'socketcluster-client';

const socket = socketClusterClient.create({
    hostname: 'socket.your-instance.com',
    secure: true,
    port: 443,
});

socket.on('connect', () => {
    console.log('Connected to Fleetbase socket server');
});
```

### Suscribirse a un Canal

```
// Escuchar en el canal para toda la empresa
const channel = socket.subscribe('company.your-company-uuid');

(async () => {
    for await (const data of channel) {
        console.log('Event received:', data);
    }
})();
```

### Suscribirse a un Canal de Clave de API

```
// Escuchar en un canal específico de clave de API
const channel = socket.subscribe('api.your-api-key-id');

(async () => {
    for await (const data of channel) {
        console.log('Event received:', data);
    }
})();
```

## Restricciones de Origen

En producción, restrinja qué orígenes pueden conectarse a su servidor de socket. Configure esto a través de la variable de entorno
`SOCKETCLUSTER_OPTIONS`
en su
`docker-compose.override.yml`:

```
environment:
    SOCKETCLUSTER_OPTIONS: '{"origins":"https://yourdomain.com:*"}'
```

Sin esta restricción, cualquier cliente que conozca la dirección de su servidor de socket puede conectarse y recibir datos de eventos. Consulte
[Configuración del sistema → Socket](https://fleetbase.io/docs/platform/system-setup/socket)
para obtener detalles de configuración completos.