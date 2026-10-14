---
título: "Socket"
url: https://fleetbase.io/docs/platform/system-setup/socket
módulo: plataforma
---

# Socket

Supervisa la conexión de SocketCluster que permite el seguimiento en tiempo real de los conductores, las actualizaciones del estado de los pedidos y los eventos en la consola.

# Socket

Fleetbase utiliza
[SocketCluster](https://socketcluster.io/)
para la comunicación bidireccional en tiempo real: actualizaciones en vivo de la ubicación del conductor en el mapa, cambios de estado de los pedidos enviados a la consola sin necesidad de consultar, y eventos en tiempo real entregados a la aplicación Navigator. Navega a
**Administrador → Configuración del sistema → Socket**
para supervisar la conexión.

Para los requisitos de entrada de WebSocket, la guía para réplicas de SocketCluster y la planificación de la red, consulta
[Dimensionamiento de la infraestructura](https://fleetbase.io/docs/platform/quickstart/infrastructure-sizing)
.

## Monitor de conexión

La página de Socket muestra un registro de eventos en vivo del servidor de SocketCluster. Los eventos aparecen a medida que se reciben, con marcas de tiempo y salida codificada por colores. Esta vista es de solo lectura: la configuración de SocketCluster se gestiona a nivel de infraestructura y no se puede modificar desde esta página.

![Monitor de conexión de Socket — registro de eventos en vivo con marcas de tiempo y salida codificada por colores](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-socket-settings.7dde4929.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Configuración

SocketCluster se configura a través de variables de entorno establecidas en
`docker-compose.override.yml`
bajo el servicio
`socket`:

```
services:
  socket:
    environment:
      SOCKETCLUSTER_OPTIONS: '{"origins":"https://console.yourdomain.com"}'
```

El valor de
`origins`
es una lista separada por comas de los orígenes de WebSocket permitidos. En producción, restríngalo a su dominio de consola exacto para evitar conexiones desde orígenes no autorizados.

El contenedor de la API se conecta a SocketCluster utilizando estas variables (establecidas bajo el servicio
`application`
):

| Variable | Valor predeterminado | Descripción |
|---|---|---|
| `SOCKETCLUSTER_HOST` | `socket` | Nombre del contenedor de SocketCluster |
| `SOCKETCLUSTER_PORT` | `38000` | Puerto en el que escucha SocketCluster |
| `SOCKETCLUSTER_SECURE` | `false` | Establecer en `true` cuando se conecta a través de WSS |
| `SOCKETCLUSTER_PATH` | `/socketcluster/` | Prefijo de la ruta WebSocket |

## Pruebas

Haz clic en
**Probar conexión de Socket**
para publicar un mensaje de prueba a través de SocketCluster desde el contenedor de la API. Una respuesta exitosa confirma que la API puede comunicarse con el servidor de SocketCluster y publicar eventos. Si la prueba falla, comprueba que:

* El contenedor
  `socket`
  está en ejecución (`docker compose ps socket`)
* Los valores
  `SOCKETCLUSTER_HOST`
  y
  `SOCKETCLUSTER_PORT`
  en el contenedor
  `application`
  coinciden con el nombre de host y el puerto reales del contenedor
  `socket`
* No hay ninguna regla de firewall interna que bloquee el tráfico entre contenedores en el puerto
  `38000`

## Resolución de problemas

**Conexiones WebSocket rechazadas en el navegador**
La lista
`origins`
en
`SOCKETCLUSTER_OPTIONS`
debe coincidir exactamente con el encabezado
`Origin`
enviado por el navegador, incluyendo el protocolo —
`https://console.yourdomain.com`, no solo
`yourdomain.com`. Una discrepancia hace que el servidor de SocketCluster rechace la solicitud de actualización.

**Eventos que no aparecen en tiempo real**
Si el registro de eventos está vacío pero la prueba de conexión tiene éxito, es probable que haya una discrepancia en el lado del navegador. Comprueba el registro del navegador en busca de errores de WebSocket y compara el origen informado con el valor de
`SOCKETCLUSTER_OPTIONS`.