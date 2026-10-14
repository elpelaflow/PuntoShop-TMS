---
título: "Seguimiento"
url: https://fleetbase.io/docs/fleet-ops/operations/orders/tracking
módulo: fleet-ops
---

Órdenes

# Seguimiento

Realiza un seguimiento del progreso en tiempo real de las órdenes, la ubicación del conductor y el tiempo estimado de llegada (ETA) a través de la vista de detalles de la orden y el mapa en vivo.

# Seguimiento

Fleet-Ops proporciona un seguimiento en tiempo real del progreso de las órdenes y la ubicación del conductor desde el momento en que se asigna una orden hasta que se confirma la entrega. El seguimiento es visible para los operadores en la consola y, opcionalmente, para los clientes a través de un enlace de seguimiento público.

## Mapa en vivo

El mapa en vivo (
**Fleet-Ops → Mapa en vivo**
o el mapa visible desde el panel) muestra:

* **Marcadores de conductores**
  — la ubicación en tiempo real de todos los conductores activos, actualizada continuamente a través de la aplicación Navigator o dispositivos de telemetría
* **Rutas de las órdenes**
  — la ruta calculada para cada orden activa, mostrada como una polilínea
* **Marcadores de recogida y entrega**
  — puntos de origen y destino para las órdenes activas
* **Marcadores de puntos intermedios**
  — marcadores de paradas intermedias para las órdenes con múltiples entregas

Haz clic en un marcador de conductor para ver:

* Nombre del conductor, foto y estado
* Velocidad y dirección actuales
* Asignación de la orden activa
* Tiempo estimado de llegada a la siguiente parada

![Mapa en vivo — marcadores de conductores, rutas activas polilíneas, marcadores de recogida y entrega](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-vehicle-positions.3f9d43cb.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Seguimiento de detalles de la orden

Desde el panel de detalles de la orden, la sección de seguimiento muestra:

| Campo | Descripción |
|---|---|
| **Ubicación del conductor** | Mapa en tiempo real con la ubicación del conductor |
| **ETA** | Tiempo estimado de llegada a la siguiente parada |
| **Distancia restante** | Distancia del conductor a la parada de entrega |
| **Estado** | Estado actual de la orden |
| **Cronología de la actividad** | Todas las transiciones de estado con marcas de tiempo y ubicaciones |

La cronología de la actividad registra cada evento con:

* El evento — tanto las transiciones de estado del sistema (`asignado`, `comenzado`, `completado`, `cancelado`) como cualquier actividad definida en el flujo de actividad de la orden [flujo de actividad de la orden](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows) (por ejemplo, `recogida`, `en tránsito`, `llegada a la entrega`)
* La marca de tiempo
* Las coordenadas GPS del conductor en el momento del evento
* Cualquier prueba adjunta (foto, firma)

## Número de seguimiento y seguimiento del cliente

Cada orden tiene un
**Número de seguimiento**
(por ejemplo, `FO-XXXXXXXX`) que los clientes pueden utilizar en una página de seguimiento pública para ver el estado actual de la orden sin iniciar sesión.

![Página de seguimiento de la orden pública — número de seguimiento, cronología de la actividad y mapa en vivo para el cliente](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-tracking.ba27f4e5.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

La página de seguimiento muestra:

* Estado actual y actividad reciente
* Tiempo estimado de entrega
* Mapa con la ubicación actual del conductor (cuando está activo)
* Prueba de entrega una vez completada

La URL de seguimiento pública es
`/~/track-order?order={tracking_number}`
. Los clientes también pueden visitar
`/~/track-order`
sin ningún parámetro de consulta y ingresar un número de seguimiento en el formulario.

En Fleetbase Cloud, las URL completas son:

* Enlace directo:
  `https://console.fleetbase.io/~/track-order?order={tracking_number}`
* Entrada manual:
  `https://console.fleetbase.io/~/track-order`

Para instancias auto alojadas, reemplaza
`console.fleetbase.io`
con el nombre de host de tu consola.

## Seguimiento a nivel de entidad

Cada
**entidad**
(elemento) en una orden tiene su propio número de seguimiento y estado. Para las órdenes con múltiples elementos, el estado de cada elemento se rastrea de forma independiente, por lo que puedes ver qué elementos se han recogido, cuáles están en tránsito y cuáles se han entregado, incluso dentro de una sola orden.

Esto es especialmente útil en los escenarios de entrega parcial, donde algunos elementos se entregan pero otros fallan o requieren devolución.

## Actualizaciones en tiempo real vía WebSocket

Para aplicaciones personalizadas, las actualizaciones de ubicación del conductor y el estado de la orden están disponibles en tiempo real a través del canal WebSocket SocketCluster.

Suscríbete a
`company.{company_id}`
para recibir:

| Evento | Payload |
|---|---|
| `driver.location_changed` | Coordenadas actuales del conductor, velocidad, dirección |
| `order.dispatched` | Orden asignada al conductor |
| `order.started` | El conductor comenzó la orden |
| `order.completed` | La actividad de finalización de la orden se activó |
| `order.canceled` | La orden se canceló |
| `order.activity_changed` | Cualquier actividad personalizada del flujo de actividad de la orden se activó |

Consulta
[Eventos de Socket](https://fleetbase.io/docs/platform/developer-console/socket-events)
para obtener detalles de suscripción y esquemas de carga.

## Historial de posiciones

Para el análisis histórico, Fleet-Ops almacena todos los datos de la ubicación del conductor. Puedes ver el historial de posiciones de un conductor en
**Fleet-Ops → Recursos → Conductores → [Conductor] → Posiciones**
— o utiliza la función de reproducción de posiciones para volver a ver una ruta anterior en el mapa.

Los datos de posición incluyen: latitud, longitud, dirección, velocidad, altitud y marca de tiempo por lectura.