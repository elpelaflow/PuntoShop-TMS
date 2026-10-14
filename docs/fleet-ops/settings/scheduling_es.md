---
título: "Configuración de programación"
url: https://fleetbase.io/docs/fleet-ops/settings/scheduling
módulo: fleet-ops
---

# Configuración de programación

Establece el horizonte de materialización, la duración predeterminada de la jornada laboral, los límites de las horas de servicio, el comportamiento de la programación y las plantillas de programación reutilizables que impulsan el programador y el orquestador.

# Configuración de programación

**Configuración de programación**
controla los valores predeterminados globales para
[el programador](https://fleetbase.io/docs/fleet-ops/operations/scheduler/overview)
— la cantidad de días con anticipación en la que se materializan las jornadas laborales, la duración predeterminada de la jornada laboral, los límites de las horas de servicio (HOS), los interruptores de comportamiento y una biblioteca de plantillas de programación reutilizables.

Navega a
**Fleet-Ops → Configuración → Programación**
.

![Panel de configuración de programación — materialización, límites de HOS, comportamiento y plantillas de programación](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-scheduling-settings.3a85e0e3.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

La página está organizada en cuatro paneles.

## Materialización

Establece la cantidad de días con anticipación en la que Fleet-Ops genera instancias de jornada laboral concretas a partir de las reglas de programación recurrentes de cada conductor.

| Configuración | Valor predeterminado | Rango | Descripción |
|---|---|---|---|
| **Horizonte (días)** | 60 | 7–365 | Número de días hacia el futuro en los que se materializan las jornadas laborales. El calendario del programador solo puede mostrar y el orquestador solo puede planificar en función de las jornadas laborales que ya se han materializado. |
| **Duración predeterminada de la jornada laboral (horas)** | 8 | 1–24 | Duración predeterminada utilizada cuando se crea una jornada laboral sin un horario final explícito. |

Almacenado en el backend como
`horizon_days`
y
`default_shift_duration`
.

## Límites de horas de servicio (HOS)

Límites que el orquestador y el programador respetan al asignar órdenes. Los conductores que se acercan a su límite de HOS se excluyen de nuevas asignaciones.

| Configuración | Valor predeterminado | Rango | Descripción |
|---|---|---|---|
| **Límite diario de HOS (horas)** | 11 | 1–24 | Número máximo de horas de conducción por día |
| **Límite semanal de HOS (horas)** | 70 | 1–168 | Número máximo de horas de conducción en una ventana de 7 días |

Almacenado como
`hos_daily_limit`
y
`hos_weekly_limit`
. Estos son los únicos ajustes de HOS que se exponen en la página: no hay campos separados para "en servicio", "descanso obligatorio" o "descanso requerido".

## Comportamiento

Dos interruptores que modifican la forma en que el programador y el Navigator se comportan cuando cambian las jornadas laborales.

| Configuración | Valor predeterminado | Descripción |
|---|---|---|
| **Activar automáticamente la programación** | En | Cuando se añade la primera jornada laboral de un conductor, activa automáticamente la programación (en lugar de dejarla en borrador). |
| **Notificar a los conductores sobre el cambio de jornada laboral** | Desactivado | Cuando está activado, los conductores reciben una notificación en Navigator cada vez que se crea, modifica o elimina su jornada laboral. |

Almacenado como
`auto_activate_schedule`
y
`notify_drivers_on_shift_change`
.

## Plantillas de programación

Una biblioteca de patrones de jornada laboral reutilizables. Las plantillas definen una regla de recurrencia (RRULE) y un color, y se pueden aplicar a los conductores a través del programador para introducir un patrón conocido en su programación (por ejemplo,
*Mañanas de semana*
,
*Tres días de trabajo, tres días de descanso*
).

El panel enumera todas las plantillas con su nombre, resumen de RRULE y marcador de color, así como acciones de
**Editar**
y
**Eliminar**
por fila. Haz clic en
**Nueva plantilla**
en el encabezado del panel para crear una nueva.

Las plantillas se almacenan como registros independientes, por lo que crear una no las aplica inmediatamente a nadie: se aplican por conductor a través del programador.

## Guardar

Haz clic en
**Guardar cambios**
en el encabezado de la página para conservar los valores de materialización, HOS y comportamiento. Los cambios en las plantillas de programación se guardan de forma integrada a medida que las creas/editas/eliminas.

## Cómo afectan estas configuraciones a otras superficies

* El
  **Programador**
  (
  [vista de calendario](https://fleetbase.io/docs/fleet-ops/operations/scheduler/overview)
  ) lee el horizonte de materialización para decidir cuántos días de jornadas laborales debe mostrar y la duración predeterminada de la jornada laboral al crear nuevas jornadas laborales de forma dinámica.
* El
  **Orquestador**
  lee los límites de HOS diarios y semanales para limitar la asignación por conductor y excluir a los conductores que estén en o por encima de su límite de recursos.
* **Navigator**
  recibe la notificación del cambio de jornada laboral cuando
  *Notificar a los conductores sobre el cambio de jornada laboral*
  está activado.

Los ajustes de HOS y jornada laboral solo filtran la asignación del orquestador: no hacen cumplir nada en Navigator en sí. Los conductores siguen conduciendo lo que son capaces de conducir físicamente. Los ajustes dan forma a cómo Fleet-Ops
*planifica*, no a cómo se comporta la carretera.