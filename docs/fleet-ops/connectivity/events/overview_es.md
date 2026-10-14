---
título: "Eventos de Dispositivos"
url: https://fleetbase.io/docs/fleet-ops/connectivity/events/overview
módulo: fleet-ops
---

Eventos

# Eventos de Dispositivos

Visualice e inspeccione los datos brutos de eventos de dispositivos y sensores: lecturas GPS, datos OBD-II, valores de sensores y eventos del sistema provenientes del hardware de la flota conectado.

# Eventos de Dispositivos

**Eventos de Dispositivos**
son los datos brutos recibidos del hardware de la flota conectado: actualizaciones de la posición GPS, lecturas de diagnóstico OBD-II, valores de sensores y eventos de alerta. Cada vez que un dispositivo o sensor envía datos a Fleet-Ops, se registra un Evento de Dispositivo.

Navegue a
**Fleet-Ops → Conectividad → Eventos**
.

![Lista de eventos de dispositivos — tipo de evento, dispositivo, vehículo, valor, marca de tiempo y ubicación](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-device-events-list.8de7a98a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Tipos de Eventos

| Tipo de Evento | Fuente | Datos capturados |
|---|---|---|
| **Actualización de Posición** | Rastreador GPS o módem de telemetría | Latitud, longitud, velocidad, dirección, altitud |
| **Lectura OBD-II** | Escáner OBD-II | RPM, nivel de combustible, temperatura del refrigerante, horas del motor, códigos de error |
| **Lectura de Temperatura** | Sensor de temperatura | Valor de temperatura, marca de tiempo |
| **Evento de Puerta** | Sensor de puerta | Estado abierto/cerrado, marca de tiempo |
| **Evento de Movimiento** | Sensor de movimiento/vibración | Fuerza G, severidad del impacto |
| **Alerta de Velocidad** | GPS o OBD-II | Velocidad que excede el umbral |
| **Evento de Geofensa** | Servicio de geofensa | Entrada/Salida de una zona o área de servicio |
| **Código de Error** | Escáner OBD-II | Código de error diagnóstico (DTC) con severidad |
| **Estado de Conectividad del Dispositivo** | Cualquier dispositivo | Verificación del estado de conectividad |

## Visualización de Eventos

La lista de eventos muestra todos los eventos recientes de dispositivos en su flota. Filtre por:

* **Dispositivo**
  — eventos de un rastreador GPS o módem específico
* **Vehículo**
  — todos los eventos asociados a un vehículo
* **Tipo de Evento**
  — filtre para actualizaciones de posición, lecturas OBD, alertas, etc.
* **Rango de fechas**
  — eventos de un período específico

Haga clic en cualquier fila de evento para ver la carga completa del evento, incluyendo datos brutos y coordenadas exactas.

## Carga del Evento

Cada registro de evento contiene:

```
{
  "id": "event_01H...",
  "device_id": "device_01H...",
  "vehicle_id": "vehicle_01H...",
  "event_type": "position_update",
  "timestamp": "2025-04-30T08:42:15Z",
  "location": {
    "type": "Point",
    "coordinates": [103.8198, 1.3521]
  },
  "data": {
    "speed": 42.5,
    "heading": 225,
    "altitude": 15.2,
    "accuracy": 4.0
  }
}
```

## Inspección de Eventos

Hacer clic en un evento abre la
**Vista de Detalles del Evento**
que muestra:

* Dispositivo y vehículo asociados al evento
* Carga completa del evento con todos los campos de datos
* Mapa que muestra la ubicación del evento (para eventos de posición y geofensa)
* Enlace al historial de posición del vehículo para contexto

## Uso de los Eventos para Investigaciones

Los eventos de dispositivos son útiles para investigaciones posteriores a incidentes:

* **Reconstrucción de accidentes**
  — reproducir eventos de posición para rastrear la trayectoria del vehículo antes del impacto
* **Uso no autorizado**
  — verificar los eventos para detectar actividad fuera de las horas de conducción
* **Fuga de cadena de frío**
  — encontrar eventos de temperatura que excedieron el umbral y cuándo
* **Funcionamiento inactivo**
  — identificar períodos de velocidad cero con eventos de encendido del motor

## Acceso Programático

Los eventos de dispositivos se pueden acceder a través de la API interna:

```
GET /int/v1/fleet-ops/devices/{device_id}/events
```

La respuesta incluye eventos paginados con datos de carga completos, adecuados para la integración con sistemas de análisis o cumplimiento externos.