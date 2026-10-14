---
título: "Seguimiento de vehículos"
url: https://fleetbase.io/docs/fleet-ops/resources/vehicles/tracking
módulo: fleet-ops
---

Vehículos

# Seguimiento de vehículos

Monitoree la posición en tiempo real del vehículo, vea el historial de viajes y reproduzca rutas históricas desde el panel de detalles del vehículo.

# Seguimiento de vehículos

Fleet-Ops rastrea la posición del vehículo en tiempo real y almacena un historial completo de posiciones para cada vehículo. Los datos de posición provienen de dos fuentes:
**La aplicación Navigator**
(GPS del teléfono del conductor) y
**dispositivos de telemetría**
(módulos GPS instalados en el vehículo).

## Posición en tiempo real

La posición actual del vehículo es visible en varios lugares:

* **Mapa en vivo**
  — los marcadores del vehículo se actualizan en tiempo real en todo el mapa
* **Panel de detalles del vehículo → Mapa**
  — vista del mapa enfocada para un solo vehículo
* **Panel de detalles del del conductor**
  — muestra la posición actual del conductor (vinculada a su vehículo asignado)
* **Panel de detalles del pedido**
  — muestra la posición actual y el tiempo estimado de llegada del vehículo asignado

Los datos de posición incluyen:

* Latitud y longitud
* Dirección (grados desde el norte)
* Velocidad (km/h)
* Altitud (metros)
* Marca de última actualización

## Fuentes de posición

| Fuente | Cómo funciona |
|---|---|
| **Aplicación Navigator** | El teléfono del conductor envía actualizaciones GPS a través de la aplicación — actualizaciones cada pocos segundos |
| **Dispositivo de telemetría** | El módulo instalado en el vehículo envía datos a Fleet-Ops a través de un proveedor de telemetría (Flespi, Geotab, Samsara) |
| **Actualización manual** | La posición se puede establecer manualmente a través de la API |

Los dispositivos de telemetría son la fuente más fiable para el seguimiento continuo, ya que funcionan de forma independiente del teléfono del conductor. Consulte
[Conectividad → Telemetría](https://fleetbase.io/docs/fleet-ops/connectivity/telematics/overview)
para la configuración del dispositivo.

## Historial de posiciones

Cada actualización de posición se almacena como un registro histórico. Para ver el historial de posiciones de un vehículo:

1. Abra
   **Fleet-Ops → Recursos → Vehículos**
2. Haga clic en un vehículo para abrir su panel de detalles
3. Haga clic en la pestaña
   **Posiciones**

La pestaña Posiciones muestra una tabla de todas las posiciones registradas con marca de tiempo, coordenadas, velocidad y dirección.

El período de tiempo durante el cual se conserva este historial se establece por organización en
**Fleet-Ops → Configuración → Telemetría**
, dentro del límite que permita su administrador del sistema.

![Configuración de telemetría — duración de los eventos del dispositivo y el historial de posiciones, dentro de los límites establecidos por el administrador del sistema](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-telematics-settings.a31adb8d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Reproducción de rutas

La función **Reproducción** le permite volver a ver la ruta de un vehículo desde cualquier período pasado en el mapa:

1. En la pestaña **Posiciones** del vehículo, haga clic en **Reproducción**
2. Seleccione un rango de fechas
3. Haga clic en **Reproducir** — el mapa anima la ruta del vehículo para el período seleccionado

La reproducción es útil para:

* Verificar que el conductor siguió la ruta prevista
* Investigar incidentes revisando la ruta exacta del vehículo
* Verificar los tiempos y ubicaciones de confirmación de entrega

![Reproducción de la posición del vehículo — ruta animada en el mapa con control deslizante de tiempo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-vehicle-positions.3f9d43cb.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Historial de viajes

La pestaña **Posiciones** también muestra resúmenes de viajes — grupos de posiciones organizadas por trayecto (de inicio a fin). Cada viaje muestra:

* Hora de inicio y fin
* Distancia total
* Velocidad máxima
* Duración

## Dispositivos conectados

Los vehículos con dispositivos de telemetría o sensores conectados reciben datos más ricos que el GPS básico:

* **Escáner OBD-II**
  — RPM del motor, nivel de combustible, temperatura del refrigerante, códigos de error
* **Cámara de tablero**
  — clips de vídeo vinculados a eventos
* **Sensor de temperatura**
  — lecturas de temperatura de la carga para la cadena de frío
* **Sensor de puerta**
  — eventos de apertura/cierre

Consulte
[Conectividad → Dispositivos](https://fleetbase.io/docs/fleet-ops/connectivity/devices/overview)
para la gestión de dispositivos conectados.

## Eventos de geocercas

Si el vehículo entra o sale de un área o zona configurada, Fleet-Ops dispara eventos de geocercas. Estos pueden activar:

* Notificaciones webhooks a su sistema externo
* Notificaciones push para el conductor/operador
* Alertas de tiempo de inactividad (el vehículo está detenido durante demasiado tiempo)

Configure los desencadenantes de geocercas en la configuración del área o zona.