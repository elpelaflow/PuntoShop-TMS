---
título: "Horarios de trabajo"
url: https://fleetbase.io/docs/fleet-ops/resources/drivers/shift-schedules
módulo: fleet-ops
---

Conductores

# Horarios de trabajo

Visualice y gestione el horario de trabajo de un conductor individual: defina las horas de trabajo, los patrones recurrentes y los períodos de disponibilidad.

# Horarios de trabajo de los conductores

Cada conductor puede tener un
**horario de trabajo**
que define cuándo está disponible para trabajar. Los horarios de trabajo aparecen en el calendario del Programador y se utilizan por el Orchestrator como restricciones de tiempo durante la asignación de pedidos.

## Visualizando el horario de un conductor

1. Navegue a
   **Fleet-Ops → Recursos → Conductores**
2. Haga clic en la fila del conductor para abrir su panel de detalles
3. Haga clic en la pestaña
   **Horario**

La pestaña del horario muestra:

* Las entradas de horario actuales para el conductor
* Una vista del calendario semanal de su disponibilidad
* Los pedidos asignados para los próximos turnos

![Pestaña del horario del conductor — calendario semanal con bloques de turnos y tarjetas de pedidos asignados](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-driver-schedule.8fea6477.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Añadiendo una entrada de horario

En la pestaña
**Horario**
del conductor, haga clic en
**+ Añadir horario**
.

Establezca el
**Día(s)**
para el que se aplica este horario. Puede seleccionar días individuales o un rango.

Establezca la
**Hora de inicio**
y la
**Hora de finalización**
en la zona horaria local del conductor.

Opcionalmente, establezca la
**Duración de la pausa**
(minutos) para la pausa programada dentro del turno.

Establezca el
**Patrón de repetición**:

* **Semanal**
  — se repite en los mismos días cada semana
* **Fecha específica**
  — un turno único en una fecha específica del calendario

Haga clic en
**Guardar**
. El horario aparece en el calendario del Programador para este conductor.

## Editar y eliminar horarios

Haga clic en cualquier entrada de horario en la lista o el calendario para editar sus horarios o patrones de repetición. Haga clic en
**Eliminar**
para eliminar el horario por completo.

Eliminar un horario recurrente elimina todas las ocurrencias futuras. Los registros de horarios anteriores se conservan con fines de auditoría.

## Cómo afectan los horarios al Orchestrator

Cuando se ejecuta el Orchestrator, lee el horario de trabajo del conductor para determinar su
**ventana de tiempo**:

* `time_window_start`
  — la hora de inicio del turno del conductor
* `time_window_end`
  — la hora de finalización del turno del conductor

El Orchestrator no asignará pedidos a este conductor si las rutas no pueden completarse antes de
`time_window_end`. Los pedidos que no puedan ajustarse a ninguna ventana de tiempo disponible de un conductor se devuelven al grupo de pedidos no asignados con una marca
`time_window_exceeded`.

## Marcar la indisponibilidad

Para ausencias planificadas (vacaciones, bajas por enfermedad, formación), añada una entrada de
**Ausencia**
en lugar de eliminar el horario:

1. Haga clic en
   **+ Añadir ausencia**
   en la pestaña del horario
2. Establezca el rango de fechas y el tipo de ausencia (Vacaciones, Baja por enfermedad, Formación, Otro)
3. Guardar

El conductor aparecerá como no disponible en el calendario del Programador para esas fechas y se excluirá de las ejecuciones del Orchestrator durante el período de ausencia.

## Gestión masiva de horarios

Para gestionar los horarios de trabajo de varios conductores a la vez, utilice el
**calendario del Programador**
en
**Operaciones → Programador**. La vista del calendario a nivel de flota le permite editar los horarios de todos los conductores desde una sola pantalla.

Consulte
[Descripción general del Programador](https://fleetbase.io/docs/fleet-ops/operations/scheduler/overview)
para obtener más detalles.