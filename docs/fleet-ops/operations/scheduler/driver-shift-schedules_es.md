---
título: "Horarios de turnos para conductores"
url: https://fleetbase.io/docs/fleet-ops/operations/scheduler/driver-shift-schedules
módulo: fleet-ops
---

Programador de turnos

# Horarios de turnos para conductores

Establezca y gestione horarios de turnos para conductores de forma recurrente: defina las horas de trabajo, los días, los descansos y las reglas de cumplimiento de las horas de trabajo.

# Horarios de turnos para conductores

Los horarios de turnos para conductores definen cuándo cada conductor está disponible para trabajar. Los turnos se utilizan por el "Orchestrator" como restricciones de tiempo durante la asignación de pedidos, y aparecen como bloques en el calendario del programador.

## Qué define un horario de turnos

Cada entrada de horario (ScheduleItem) define:

| Campo | Descripción |
|---|---|
| **Día(s)** | Los días de la semana para los que se aplica este turno |
| **Hora de inicio** | Cuando comienza el turno del conductor |
| **Hora de finalización** | Cuando finaliza el turno del conductor |
| **Descanso** | Duración programada del descanso (en minutos) |
| **Repetición** | Cómo se repite el turno: diariamente, semanalmente, fechas específicas |
| **Zona horaria** | La zona horaria para las horas del turno |

Un conductor puede tener múltiples entradas de horario, por ejemplo, una hora de inicio diferente para los días laborables en comparación con los fines de semana, o un patrón a tiempo parcial con días alternos.

## Gestión de horarios de turnos

### Desde el registro del conductor

Navegue a
**Fleet-Ops → Recursos → Conductores**
.

Abra un registro de conductor y haga clic en la pestaña
**Horario**
.

Haga clic en
**+ Agregar turno**
para crear una nueva entrada de turno.

Establezca los días, la hora de inicio, la hora de finalización y el patrón de repetición.

Haga clic en
**Guardar**
. El turno aparece en el calendario del programador para el conductor.

### Desde el calendario del programador

Navegue a
**Fleet-Ops → Operaciones → Programador**
.

Haga clic en un espacio de tiempo vacío en la fila de un conductor para agregar un turno para ese día.

Arrastre los bordes del bloque de turno para ajustar las horas de inicio/finalización.

Haga clic en un bloque de turno para editarlo o eliminarlo.

## Patrones de turnos

Patrones de turnos comunes y cómo configurarlos:

### Horario estándar de 5 días

* Cree una entrada que cubra de lunes a viernes, de 09:00 a 17:00
* Establezca la repetición en
  **Semanal**

### Turnos divididos

* Cree dos entradas para el mismo día (mañana: de 07:00 a 12:00, tarde: de 14:00 a 19:00)
* Ambas entradas aparecen como bloques separados en el calendario

### Roster rotativo

* Cree entradas para fechas específicas en lugar de patrones de días de la semana
* Utilice la repetición de
  **Fecha específica**
  para horarios irregulares

### A tiempo parcial (días alternos)

* Cree entradas solo para lunes, miércoles y viernes
* O utilice dos entradas separadas con diferentes selecciones de días

## Ventanas de disponibilidad de conductores

Las horas de inicio y finalización del horario de turnos se convierten en la
**ventana de tiempo**
del conductor, que utiliza el "Orchestrator" al asignar pedidos. Específicamente:

* `time_window_start`
  = hora de inicio del turno
* `time_window_end`
  = hora de finalización del turno

El "Orchestrator" no asignará un pedido a un conductor que no pueda completarlo antes de
`time_window_end`
. Esto evita que se asignen pedidos a conductores que excedan su hora de finalización programada.

## Cumplimiento de las horas de trabajo (HOS)

Para los conductores regulados por las normas HOS (transporte comercial, transporte de mercancías), Fleet-Ops realiza un seguimiento de:

* **Horas de conducción diarias**
  — alerta cuando se acerca el límite de horas diarias
* **Horas semanales**
  — alerta cuando se acerca el límite de horas semanales
* **Períodos de descanso obligatorios**
  — marca cuando el conductor necesita una pausa o período de descanso obligatorio

Los límites de HOS y los requisitos de descanso se configuran en
**Fleet-Ops → Configuración → Programación**
.

Cuando el estado de HOS de un conductor muestra que no puede aceptar más pedidos, se excluye del grupo de recursos del "Orchestrator" para esa ejecución.

## Gestión masiva de horarios

Para establecer turnos para varios conductores a la vez:

1. Vaya a
   **Fleet-Ops → Operaciones → Programador**
2. Utilice la opción de
   **Edición masiva**
   en la barra de herramientas
3. Seleccione varios conductores
4. Aplique un patrón de turno: un patrón de turno predefinido guardado en la configuración

## Ausencias y no disponibilidad

Para indicar que un conductor no está disponible para un día específico (por enfermedad, vacaciones):

1. Abra el registro del conductor → pestaña
   **Horario**
2. Haga clic en
   **+ Agregar ausencia**
   para las fechas relevantes
3. Establezca el tipo de ausencia (vacaciones anuales, enfermedad, capacitación, etc.)
4. El conductor aparece como no disponible en el programador y se excluye de las ejecuciones del "Orchestrator" durante ese período