---
title: "Dispositivos"
url: https://fleetbase.io/docs/fleet-ops/connectivity/devices/overview
module: fleet-ops
---

Dispositivos

# Dispositivos

Gestionar rastreadores GPS, escáneres OBD-II, cámaras de tablero y otros dispositivos IoT conectados a vehículos y remolques.

# Dispositivos

**Dispositivos**
son unidades de hardware físicas conectadas a los activos de la flota: rastreadores GPS, escáneres OBD-II, cámaras de tablero y sensores IoT. Si bien los módems de telemetría se gestionan en la sección de Telemetría (se conectan a la nube de un proveedor), "Dispositivos" rastrea el hardware individual instalado en o sobre vehículos y remolques.

Navegue a
**Operaciones de la flota → Conectividad → Dispositivos**
.

![Lista de dispositivos — nombre del dispositivo, tipo, categoría, vehículo asociado, estado y última hora de evento](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-devices-list.e799253c.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Categorías de dispositivos

| Categoría | Ejemplos |
|---|---|
| **Rastreador GPS** | Rastreador GPS independiente (no OBD), rastreador de activos |
| **Escáner OBD-II** | Lectura de diagnóstico del motor a través del puerto OBD-II |
| **Cámara de tablero** | Cámaras frontales/traseras, vídeo activado por evento |
| **Sensor de temperatura** | Sensor de monitoreo de la cadena de frío |
| **Sensor de humedad** | Monitoreo de la humedad de la carga |
| **Sensor de puerta** | Detección de apertura/cierre de la puerta de carga |
| **Sensor de movimiento** | Detección de impacto o vibración |
| **Sensor de presión** | Monitoreo de la presión de los neumáticos (TPMS) |
| **Sensor de nivel de combustible** | Indicador de nivel de combustible montado en el depósito |

## Atributos de dispositivos

| Campo | Descripción |
|---|---|
| **Nombre** | Identificador del dispositivo |
| **Tipo** | Tipo de hardware específico |
| **Categoría** | Categoría del dispositivo (GPS, OBD-II, cámara, etc.) |
| **Proveedor** | Fabricante o proveedor |
| **Descripción** | Notas sobre el dispositivo |
| **Estado** | activo, inactivo, desconectado, defectuoso |
| **Meta** | Datos adicionales clave-valor (IMEI, firmware, etc.) |

![Panel de detalles del dispositivo — estado de conexión, proveedor de telemetría, vehículo asociado, recuento de sensores y eventos, última ubicación conocida y detalles del hardware](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-device-details.ec7d2b2e.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Añadir un dispositivo

Navegue a
**Operaciones de la flota → Conectividad → Dispositivos**
.

Haga clic en
**Nuevo dispositivo**
.

Introduzca el
**Nombre**,
**Tipo**
y
**Categoría**.

Establezca el
**Proveedor**
y cualquier información de identificación en
**Meta**
(por ejemplo, IMEI, número de serie, versión del firmware).

Haga clic en
**Guardar**
.

## Vincular dispositivos a activos

Asocie un dispositivo con el activo que mide físicamente. Un rastreador de remolque permanece asociado con ese remolque cuando el vehículo que lo remolca cambia.

1. Abra la vista de detalles del
   **Vehículo**
   o
   **Remolque**
2. Haga clic en la pestaña
   **Dispositivos**
3. Haga clic en
   **Añadir dispositivo**
   y seleccione de la lista de dispositivos
4. Establezca la
   **Ubicación de montaje**
   (por ejemplo, tablero, área de carga, hueco de rueda)
5. Guarde

Un activo puede tener varios dispositivos. Por ejemplo, un vehículo puede tener dispositivos GPS y OBD-II, mientras que un remolque refrigerado conectado puede tener un rastreador y un sensor de temperatura independientes.

## Eventos de dispositivos

Cada vez que un dispositivo envía datos, se registra un
**Evento de dispositivo**. Estos eventos son visibles en el panel de detalles del dispositivo:

* Coordenadas GPS y marca de tiempo
* Lecturas OBD-II (RPM, nivel de combustible, temperatura del refrigerante, códigos de error)
* Lecturas de sensores (valores de temperatura, estado de la puerta, eventos de movimiento)
* Eventos de alerta (exceso de velocidad, frenada brusca, fallo del motor)

Visualice los eventos del dispositivo en
**Operaciones de la flota → Conectividad → Dispositivos → [Dispositivo] → Eventos**
.

## Monitorización del estado del dispositivo

El estado del dispositivo se actualiza en función de los datos recibidos:

* `activo`
  — datos recibidos dentro del intervalo esperado
* `desconectado`
  — no se han recibido datos más allá del intervalo esperado
* `defectuoso`
  — informa de códigos de error o problemas de calidad de datos

Los dispositivos desconectados pueden marcarse para crear automáticamente un problema, alertando al gestor de flota para que investigue.

[Telemetría

Conecte los proveedores de telemetría a Fleet-Ops, mapee los dispositivos con vehículos o remolques y reciba datos de telemetría en tiempo real.](https://fleetbase.io/docs/fleet-ops/connectivity/telematics/overview)
[Sensores

Gestionar sensores ambientales y de condición: monitoreo de temperatura, humedad, puerta, presión y movimiento para el seguimiento de la condición de la carga y del vehículo.](https://fleetbase.io/docs/fleet-ops/connectivity/sensors/overview)