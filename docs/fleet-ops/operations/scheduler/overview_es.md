---
title: "Visión general del programador"
url: https://fleetbase.io/docs/fleet-ops/operations/scheduler/overview
module: fleet-ops
---

Programador

# Visión general del programador

El programador proporciona una vista del calendario de toda la flota, que incluye los horarios de los conductores, las asignaciones de pedidos y los períodos de disponibilidad.

# Visión general del programador

El
**Programador**
es una herramienta de planificación basada en calendario que permite a los operadores visualizar los horarios de los conductores, los pedidos programados y los períodos de disponibilidad en toda la flota. Úselo para planificar qué conductores trabajarán en qué días, visualizar cómo se distribuyen los pedidos en su flota y gestionar los patrones de trabajo.

![Programador — cuadrícula de calendario semanal con filas de conductores, bloques de horarios y tarjetas de pedidos programados](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-scheduler.d1cf0d16.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Lo que muestra el Programador

El Programador tiene dos vistas principales:

### Vista de la flota

Un calendario semanal con una fila por conductor, que muestra:

* **Bloques de horarios**
  — las horas en las que está programado que el conductor trabaje
* **Pedidos programados**
  — pedidos asignados a cada conductor en cada día
* **Períodos de disponibilidad**
  — el período de tiempo activo del conductor dentro de su horario

### Vista del conductor

Un cronograma detallado para un solo conductor, que muestra:

* Horario diario
* Pedidos individuales asignados para cada turno
* Períodos de descanso
* Estado de las horas trabajadas (HOS)

## Abrir el Programador

Navegue a
**Operaciones → Programador**
. El programador se abre automáticamente en la semana actual. Utilice los controles de fecha para navegar hacia adelante o hacia atrás.

## Horarios de trabajo de los conductores

Cada conductor en Fleet-Ops tiene un
**horario de trabajo**
— un conjunto de patrones recurrentes que definen cuándo está disponible para trabajar. Los horarios se gestionan en el registro del conductor o en lote a través del Programador.

Una entrada de horario (ScheduleItem) define:

* **Día de la semana**
  — los días en que se aplica el turno
* **Hora de inicio**
  — cuándo comienza el turno del conductor
* **Hora de finalización**
  — cuándo finaliza el turno del conductor
* **Duración del descanso**
  — descanso programado dentro del turno
* **Recurrencia**
  — diario, semanal o fechas específicas

El Orchestrator utiliza los horarios de trabajo como
**restricciones de tiempo**
— solo asignará pedidos que puedan completarse dentro del período de tiempo del conductor.

Consulte
[Horarios de trabajo de los conductores](https://fleetbase.io/docs/fleet-ops/operations/scheduler/driver-shift-schedules)
para obtener más información.

## Pedidos programados en el calendario

Los pedidos con una fecha de
**Programación**
aparecen en el Programador en su día programado, en la fila del conductor asignado. Cada tarjeta de pedido muestra:

* ID del pedido y cliente
* Direcciones de recogida y entrega
* Estado

Haga clic en una tarjeta de pedido para abrir el detalle completo del pedido. Arrastre una tarjeta de pedido a una fila de conductor diferente para reasignarla, o a un día diferente para reprogramarla.

Consulte
[Programación de pedidos](https://fleetbase.io/docs/fleet-ops/operations/scheduler/order-scheduling)
para obtener más información sobre la programación de pedidos individuales.

## Cumplimiento de las horas de trabajo (HOS)

Para las operaciones de transporte reguladas, el Programador incluye
**seguimiento del estado de las horas de trabajo (HOS)**
. Fleet-Ops supervisa las horas de trabajo de los conductores y marca:

* Conductores que se acercan a su límite diario de conducción
* Conductores que han superado sus horas semanales
* Períodos de descanso obligatorios

Las reglas de HOS se configuran en
**Operaciones → Configuración → Programación**
.

## Relación con el Orchestrator

El Programador y el Orchestrator trabajan juntos:

1. Definir los horarios de los conductores en el Programador
2. Ejecutar el Orchestrator — respeta las ventanas de tiempo cuando se asignan los pedidos
3. Revisar las asignaciones resultantes en el calendario del Programador
4. Ajustar cualquier conflicto o sobreasignación visualmente

El Programador es la superficie de planificación legible por humanos; el Orchestrator es el planificador de múltiples fases que produce las asignaciones.

## Páginas relacionadas

* [Programación de pedidos](https://fleetbase.io/docs/fleet-ops/operations/scheduler/order-scheduling)
  — programar pedidos individuales y gestionar ventanas de tiempo
* [Horarios de trabajo de los conductores](https://fleetbase.io/docs/fleet-ops/operations/scheduler/driver-shift-schedules)
  — configurar horarios de trabajo recurrentes para los conductores
* [Configuración → Programación](https://fleetbase.io/docs/fleet-ops/settings/scheduling)
  — configurar reglas de HOS y valores predeterminados de programación