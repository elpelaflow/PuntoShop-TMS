---
Título: Programas de mantenimiento
URL: https://fleetbase.io/docs/fleet-ops/maintenance/schedules/overview
Módulo: fleet-ops
---

Programas de mantenimiento

# Programas de mantenimiento

Establezca las reglas de mantenimiento preventivo para vehículos y equipos: inicie automáticamente las órdenes de trabajo según la distancia recorrida, las horas del motor o el intervalo de calendario.

# Programas de mantenimiento

**Programas de mantenimiento**
son las reglas de mantenimiento preventivo que supervisan los vehículos y equipos y generan automáticamente las órdenes de trabajo cuando es necesario realizar el mantenimiento. Cada programa define un objetivo (vehículo o equipo), un método de intervalo y umbrales: Fleet-Ops supervisa el uso y genera órdenes de trabajo cuando se alcanza el umbral.

![Lista de programas de mantenimiento — vehículo, nombre del programa, tipo de intervalo, fecha de próxima ejecución, estado](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-maintenance-schedules-list.8d17a25a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Atributos del programa

| Campo | Descripción |
|---|---|
| **Nombre** | Descripción de la tarea de mantenimiento (p. ej., "Cambio de aceite", "Inspección de frenos") |
| **Objetivo** | El vehículo o equipo que se está manteniendo |
| **Método de intervalo** | Cómo se mide el intervalo de mantenimiento |
| **Tipo de intervalo** | El tipo de activación específico dentro del método |
| **Valor del intervalo** | La cantidad del umbral (p. ej., 10.000 km, 90 días) |
| **Última fecha de mantenimiento** | Fecha de la última realización de mantenimiento |
| **Odometer de la última realización de mantenimiento** | Lectura del odómetro en la última realización de mantenimiento |
| **Horas del motor de la última realización de mantenimiento** | Horas del motor en la última realización de mantenimiento |
| **Próxima fecha de ejecución** | Fecha calculada de la próxima ejecución |
| **Odometer de la próxima ejecución** | Lectura del odómetro calculada para la próxima ejecución |
| **Prioridad predeterminada** | Prioridad para las órdenes de trabajo generadas automáticamente |
| **Asignado predeterminado** | Quién se asignan automáticamente las órdenes de trabajo |
| **Instrucciones** | Instrucciones específicas para la tarea de mantenimiento |
| **Desplazamientos de recordatorio** | Períodos de advertencia (p. ej., 7 días antes de la fecha de ejecución) |
| **Estado** | activo, pausado, completado |

## Métodos de intervalo

| Método | Se activa cuando |
|---|---|
| **Basado en el tiempo** | Transcurre un intervalo de calendario (p. ej., cada 90 días) |
| **Basado en la distancia** | El odómetro supera un umbral (p. ej., cada 10.000 km) |
| **Basado en las horas del motor** | Las horas del motor superan un umbral (p. ej., cada 250 horas) |
| **Híbrido** | Una combinación de los anteriores: se activa el primero que se cumpla |

## Creación de un programa de mantenimiento

Navegue a
**Fleet-Ops → Mantenimiento → Programas**
.

Haga clic en
**+ Nuevo programa**
.

Seleccione el
**Objetivo**
— un registro de Vehículo o Equipo.

Introduzca un
**Nombre**
para la tarea de mantenimiento.

Seleccione el
**Método de intervalo**
y establezca el
**Valor del intervalo**
(p. ej., 10.000 km o 90 días).

Introduzca la
**Última fecha de mantenimiento**
y el odómetro/horas del motor en la última realización de mantenimiento. Fleet-Ops utiliza estos datos para calcular la próxima fecha de ejecución inmediatamente.

Establezca la
**Prioridad predeterminada**
y el
**Asignado predeterminado**
para las órdenes de trabajo generadas automáticamente.

Añada
**Desplazamientos de recordatorio**
— p. ej., enviar un recordatorio 7 días y 1 día antes de la fecha de ejecución.

Añada cualquier
**Instrucción**
que el mecánico necesite para esta tarea.

Haga clic en
**Guardar**
. Fleet-Ops empieza a supervisar el vehículo y generará una orden de trabajo cuando se alcance el umbral.

## Generación automática de órdenes de trabajo

Cuando se alcanza el umbral de un programa:

1. Fleet-Ops crea una
   **Orden de trabajo**
   automáticamente con la prioridad y el asignado predeterminados del programa
2. La orden de trabajo aparece en
   **Mantenimiento → Órdenes de trabajo**
   marcada como abierta
3. La persona asignada recibe una notificación
4. El estado del vehículo se puede establecer automáticamente como
   `mantenimiento`
   (configurable)

## Calendario y exportación a iCal

Los programas de mantenimiento se pueden exportar a un calendario:

* **Exportación a iCal**
  — descargue un
  `.ics`
  archivo con todas las fechas de mantenimiento programadas
* **URL de la alimentación del calendario**
  — suscríbase desde Google Calendar, Outlook o cualquier aplicación de calendario utilizando la URL de la alimentación

Esto permite a los gestores de flotas realizar un seguimiento de las próximas tareas de mantenimiento junto con otras calendarios de operaciones.

## Pausar y reanudar programas

Si se retira un vehículo del servicio o se vende:

1. Abra el programa y haga clic en
   **Pausar**
   — el programa deja de supervisar, pero no se elimina
2. Haga clic en
   **Reanudar**
   cuando el vehículo vuelva a estar en servicio

Los programas pausados no generan órdenes de trabajo. La próxima fecha de ejecución se recalcula a partir de la fecha de reanudo.

## Adjuntar programas a vehículos

También se pueden crear programas de mantenimiento directamente desde el registro del vehículo:

1. Abra
   **Fleet-Ops → Recursos → Vehículos → [Vehículo]**
2. Haga clic en la pestaña
   **Programas**
3. Haga clic en
   **+ Añadir programa**
   — en el mismo formulario, con el vehículo pre-rellenado