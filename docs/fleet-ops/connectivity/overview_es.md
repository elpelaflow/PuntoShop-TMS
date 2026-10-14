---
title: "Visión general de la conectividad"
url: https://fleetbase.io/docs/fleet-ops/connectivity/overview
module: fleet-ops
---

# Visión general de la conectividad

Conecte Fleet-Ops con hardware externo: módems de telemetría, dispositivos GPS, sensores IoT y proveedores de datos de terceros.

# Visión general de la conectividad

La sección "**Conectividad**" de Fleet-Ops gestiona la integración del hardware físico y los proveedores de datos externos. Esto incluye los módems de telemetría instalados en los vehículos, los dispositivos GPS y IoT, los sensores ambientales y los eventos de datos brutos que generan.

![Barra lateral de conectividad de Fleet-Ops — Telemetría, Dispositivos, Sensores, Eventos](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-telematics-flespi.e7fdfb77.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## ¿Qué hay en la sección de Conectividad?

| Sección | Propósito |
|---|---|
| [**Telemetría**](https://fleetbase.io/docs/fleet-ops/connectivity/telematics/overview) | Módems de telemetría: dispositivos de hardware que envían datos GPS, OBD-II y de sensores de los vehículos |
| [**Dispositivos**](https://fleetbase.io/docs/fleet-ops/connectivity/devices/overview) | Rastreadores GPS, escáneres OBD-II, cámaras y otros dispositivos conectados |
| [**Sensores**](https://fleetbase.io/docs/fleet-ops/connectivity/sensors/overview) | Sensores ambientales: temperatura, humedad, puerta, presión, movimiento |
| [**Eventos**](https://fleetbase.io/docs/fleet-ops/connectivity/events/overview) | Eventos de datos brutos recibidos de dispositivos y proveedores de telemetría |

## Arquitectura de la conectividad

```
Proveedor de telemetría (Flespi / Geotab / Samsara)
        │
        │  Envía datos de telemetría
        ▼
API de ingestión de Fleet-Ops
        │
        ├─► DeviceEvent (punto de datos brutos)
        ├─► Position (actualización de ubicación del conductor/vehículo)
        ├─► Lectura de sensor (temperatura, humedad, etc.)
        └─► Actualización de mapa en vivo (a través de la transmisión de SocketCluster)
```

## Proveedores de telemetría compatibles

Fleet-Ops se integra con:

* **Flespi**
  — Datos GPS y OBD-II brutos a través de MQTT y REST API
* **Geotab**
  — Telemetría empresarial con diagnóstico de vehículos
* **Samsara**
  — Plataforma de operaciones de flotas con GPS y vídeo en tiempo real
* **Personalizado**
  — Ingestión genérica de webhook/REST para otros proveedores

## ¿Cómo funciona en la práctica?

1. Se instala un módem de telemetría (por ejemplo, un dispositivo IMEI de Flespi) en un vehículo.
2. El dispositivo envía la posición GPS, la velocidad y los datos OBD-II a la nube del proveedor de telemetría.
3. Fleet-Ops se conecta al proveedor a través de las credenciales de API configuradas en
   **Conectividad → Telemetría**
4. El proveedor transmite los datos a Fleet-Ops: las posiciones se almacenan y se transmiten al mapa en vivo.
5. Las lecturas de los sensores (si están disponibles) se almacenan como DeviceEvents.
6. Las alertas de mantenimiento (por ejemplo, códigos de fallo del motor) se pueden mostrar a través de Issues.

## Ventajas sobre el seguimiento de la aplicación Navigator

Los dispositivos de telemetría proporcionan un seguimiento más fiable que la aplicación Navigator por sí sola:

| Característica | Dispositivo de telemetría | Aplicación Navigator |
|---|---|---|
| **Funciona sin el teléfono del conductor** | ✅ Sí | ❌ No |
| **Diagnóstico OBD-II** | ✅ Sí | ❌ No |
| **Monitorización de batería/alimentación** | ✅ Sí | ❌ No |
| **Datos de sensores (temp, puerta)** | ✅ Sí | ❌ No |
| **Detección de manipulación** | ✅ Sí | ❌ No |
| **Integración con la aplicación del conductor** | ❌ No | ✅ Sí (POD, navegación) |

Para la mayoría de las flotas de producción, se utilizan ambos juntos: telemetría para datos continuos del vehículo, Navigator para el flujo de trabajo del conductor.

[Partes

Rastrea el inventario de piezas utilizado en el mantenimiento de la flota: registra las piezas utilizadas en las órdenes de trabajo, gestiona la información del proveedor y realiza un seguimiento de los costes.](https://fleetbase.io/docs/fleet-ops/maintenance/parts/overview)
[Telemetría

Conecte los proveedores de telemetría a Fleet-Ops, mapee los dispositivos con Vehículos o Remolques y reciba datos de telemetría en tiempo real.](https://fleetbase.io/docs/fleet-ops/connectivity/telematics/overview)