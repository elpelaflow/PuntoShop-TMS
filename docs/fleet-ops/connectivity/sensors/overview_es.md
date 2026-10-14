---
título: "Sensores"
url: https://fleetbase.io/docs/fleet-ops/connectivity/sensors/overview
módulo: fleet-ops
---

Sensores

# Sensores

Gestionar sensores ambientales y de condición: temperatura, humedad, puertas, presión y detección de movimiento para el seguimiento de la condición de la carga y los vehículos.

# Sensores

**Sensores**
son dispositivos de monitorización ambiental y de condición instalados en las áreas de carga de los vehículos o conectados a equipos. Proporcionan datos en tiempo real sobre el estado del entorno de la carga (temperatura, humedad) o eventos físicos (puerta abierta, impacto detectado). Los datos del sensor se obtienen de dispositivos de telemetría o directamente de los dispositivos conectados.

Navegue a
**Fleet-Ops → Conectividad → Sensores**
.

![Lista de sensores — nombre del sensor, tipo, dispositivo vinculado, lectura actual, estado](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-sensors-list.29b87b7e.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Tipos de Sensores

| Tipo | Mide | Uso |
|---|---|---|
| **Temperatura** | Temperatura de la carga o ambiente (°C/°F) | Cadena de frío — productos refrigerados/congelados |
| **Humedad** | Humedad relativa (%) | Carga sensible — productos farmacéuticos, electrónica |
| **Puerta** | Estado abierto/cerrado | Acceso no autorizado, seguridad de la carga |
| **Presión** | Presión de los neumáticos (PSI/bar) o atmosférica | TPMS, monitorización de la altitud |
| **Movimiento** | Vibración, impacto, fuerza G | Productos delicados, detección de accidentes |
| **Luz** | Nivel de luz ambiental | Detección de acceso a la zona de carga |
| **Nivel de combustible** | Porcentaje de combustible en el depósito | Seguimiento del combustible, detección de fugas |

## Atributos del Sensor

| Campo | Descripción |
|---|---|
| **Nombre** | Identificador del sensor (por ejemplo, "Sensor de temperatura de la carga 1") |
| **Tipo** | El tipo de sensor de la lista anterior |
| **Dispositivo** | El dispositivo de telemetría o centro IoT al que está conectado el sensor |
| **Vehículo** | El vehículo en el que está instalado el sensor |
| **Estado** | activo, inactivo, desconectado, defectuoso |
| **Lectura actual** | Valor del sensor más reciente con marca de tiempo |
| **Umbrales de alerta** | Valores mínimos/máximos configurables que activan las alertas |

## Añadir un Sensor

Navegue a
**Fleet-Ops → Conectividad → Sensores**
.

Haga clic en
**+ Nuevo Sensor**
.

Establezca el
**Nombre**
y el
**Tipo**
.

Vincule el
**Dispositivo**
al que está conectado el sensor (por ejemplo, el módem de telemetría que recopila los datos del sensor).

Vincule el
**Vehículo**
en el que está instalado el sensor.

Establezca los
**Umbrales de alerta**
si desea recibir notificaciones cuando las lecturas salgan de rango (por ejemplo, temperatura superior a 8°C para un vehículo de cadena de frío).

Haga clic en
**Guardar**
.

## Flujo de datos del sensor

```
Sensor físico → Dispositivo de telemetría → Nube del proveedor → Consumo en Fleet-Ops → Registro de Evento del Sensor
                                                              │
                                                      Verificación de alertas → Emisión / Notificación
```

Las lecturas del sensor se almacenan como registros de
**Eventos de dispositivo**
vinculados al sensor y al vehículo. Estos eventos se pueden ver en:

* El panel de detalles del sensor → pestaña Eventos
* El panel de detalles del dispositivo → pestaña Eventos
* El panel de detalles del vehículo (vista agregada)

## Umbrales de alerta

Para cada sensor, puede establecer umbrales que activen alertas:

| Tipo de sensor | Ejemplo de umbral | Alerta |
|---|---|---|
| Temperatura | > 8°C | Incumplimiento de la cadena de frío — notificar al operador |
| Puerta | Estado = Abierto durante > 5 min | Alerta de acceso no autorizado |
| Movimiento | Fuerza G > 3G | Potencial accidente — marcar para su revisión |
| Presión | < 28 PSI | Alerta de presión de los neumáticos |

Cuando se supera un umbral:

* Se envía una notificación a los destinatarios configurados
* Se crea opcionalmente un
  **Problema**
  para el seguimiento y la resolución
* El evento se registra en el historial de eventos del vehículo

## Monitorización de la cadena de frío

Para el transporte de mercancías refrigeradas y congeladas, la monitorización con sensores es crucial. Fleet-Ops admite:

* Registro continuo de la temperatura durante todo el viaje
* Registro de la temperatura mínima/máxima por viaje
* Eventos de incumplimiento con marca de tiempo y ubicación exactas
* Registros de temperatura exportables para la documentación de cumplimiento