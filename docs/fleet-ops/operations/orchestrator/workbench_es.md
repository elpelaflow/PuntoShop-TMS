---
title: "Workbench"
url: https://fleetbase.io/docs/fleet-ops/operations/orchestrator/workbench
module: fleet-ops
---

Orchestrador

# Workbench

Cree fases, ejecute el Orchestrador, revise el plan propuesto y confirme las asignaciones — todo desde el Workbench del Orchestrador.

# Workbench del Orchestrador

El
**Workbench**
es la interfaz principal para ejecutar el Orchestrador. Muestra la reserva de órdenes sin asignar, los vehículos y conductores disponibles, y un constructor de fases donde puede crear y ejecutar fases de optimización. El Workbench es una superficie de planificación — nada cambia en producción hasta que hace clic en
**Confirmar**.

![Workbench del Orchestrador — constructor de fases con reserva de órdenes, mapa y panel de recursos](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orchestrator-workbench.ff9ab52d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Diseño

Abra el Workbench desde
**Operaciones → Flota → Orchestrador**
. La pantalla se divide en tres regiones:

| Región | Propósito |
|---|---|
| **Reserva de órdenes** (izquierda) | Lista filtrable de órdenes elegibles para asignación |
| **Mapa + Constructor de fases** (centro) | Mapa interactivo; panel del constructor de fases se despliega al activarlo |
| **Panel de recursos** (derecha) | Vehículos y conductores disponibles, filtrables por estado |

Después de ejecutar fases, el panel de la derecha cambia al
**Visualizador de planes**, mostrando las asignaciones propuestas por conductor/vehículo.

## La reserva de órdenes

La reserva de órdenes enumera todas las órdenes actualmente elegibles para asignación. Cada tarjeta muestra el ID de la orden, el cliente, la recogida y la entrega, el horario programado (si corresponde) y el estado del sistema de la orden. Utilice los filtros rápidos que se encuentran arriba de la lista:
*Todas*,
*Programadas*,
*Hoy*,
*Urgentes*,
*No asignadas*,
*Importadas*,
y el botón
**Filtros avanzados**
para filtros de fecha, flota, configuración de la orden y estado.

Haga clic en una orden para resaltar su recogida y entrega en el mapa. El recuento de la reserva se actualiza a medida que filtra.

## El panel de recursos

El panel de recursos enumera los vehículos y conductores disponibles. Cada tarjeta de vehículo muestra la marca/modelo, el número de matrícula, un icono de estado (
*Activo*,
*Mantenimiento*,
*En tránsito*,
*Sin conductor*,
*Disponible*
), y el conductor asignado si está vinculado. La pestaña de conductores muestra los conductores en línea, sus habilidades y su ventana de turnos.

Desactive un vehículo o conductor para excluirlos de la ejecución.

## Constructor de fases

El constructor de fases es donde crea la orquestación. Haga clic en el botón
**Fases**
en la barra de herramientas para abrirlo. Por defecto, el panel está vacío — haga clic en
**Añadir fase**
para añadir la primera fase.

### Añadir una fase

Cada fase tiene estos campos:

| Campo | Significado |
|---|---|
| **Etiqueta de la fase** | Nombre de texto libre que se muestra en la pestaña de la fase (por ejemplo, *Asignar órdenes*, *Reordenar rutas*) |
| **Modo** | Para lo que optimiza la fase: *Asignar vehículos*, *Asignar conductores*, *Optimizar rutas* o *Asignar órdenes* |
| **Motor** | La estrategia utilizada para calcular la fase — `greedy` o `vroom` (o cualquier motor registrado por una extensión) |
| **Incluir estados de orden** | Los estados de orden que utiliza la fase — normalmente `creado`, pero `asignado` o `iniciado` también pueden incluirse para la reprogramación |
| **Equilibrar la carga de trabajo** | Intenta igualar los paradas/órdenes entre los conductores |
| **Respetar las habilidades** | Respetar los requisitos de habilidades en las órdenes y las habilidades en los conductores |
| **Respetar la capacidad** | Respetar la capacidad del vehículo (peso, volumen) al asignar |
| **Regresar al depósito** | Añadir una etapa final de vuelta al depósito de cada conductor |
| **Confirmar automáticamente** | Confirmar el resultado de esta fase antes de que se ejecute la siguiente (en lugar de revisar todo el plan al final) |

Las fases se ejecutan en el orden mostrado en el panel. Utilice las flechas arriba/abajo en una fase para reordenarlas. Utilice el icono de la papelera para eliminar una fase.

### Ejecutar una fase o varias

Puede ejecutar una fase individual — por ejemplo, simplemente
**Optimizar rutas**
para reordenar un manifiesto existente sin cambiar las asignaciones — o encadenar varias fases.

![Interruptor de fase — habilitar y deshabilitar fases individuales antes de la ejecución](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orchestrator-phase-toggle.ef300a23.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

![Workbench con tres fases apiladas — Fase 1: Asignar vehículos, Fase 2: Optimizar rutas, Fase 3: Asignar vehículos, con el modo "Allocate Orders" seleccionado](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orchestrator-phases.fe955c7f.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Patrones comunes de múltiples fases:

* *Asignar vehículos → Optimizar rutas*
  — asignar por capacidad, luego planificar la ruta
* *Asignar vehículos → Asignar conductores → Optimizar rutas*
  — paso completo
* *Asignar conductores → Optimizar rutas*
  — cuando los vehículos ya están emparejados con conductores

Cada fase lee el estado actual y escribe el plan actualizado, por lo que la siguiente fase ve la salida de la fase anterior como su entrada.

## Ejecutar el Orchestrador

### Filtrar la reserva de órdenes

Utilice los filtros rápidos o
**Filtros avanzados**
para reducir la reserva a las órdenes que desea planificar. Las órdenes no asignadas permanecen en la reserva para la siguiente ejecución o asignación manual.

### Abrir el Constructor de fases

Haga clic en
**Fases**
en la barra de herramientas. Añada y configure fases — al menos una fase, o tantas como necesite el flujo de trabajo.

### Haga clic en Ejecutar Fase(s)

La etiqueta del botón refleja el número (
*Ejecutar 1 fase*,
*Ejecutar 3 fases*
). Las fases se ejecutan en secuencia; cada resultado alimenta a la siguiente.

### Revise el plan propuesto

El panel de la derecha cambia al
**Visualizador de planes**, mostrando las asignaciones por conductor/vehículo, la distancia total y la duración estimada. El mapa dibuja las rutas propuestas. Haga clic en cualquier asignación para inspeccionarla.

Las órdenes que no pudieron asignarse aparecen en una sección
**No asignadas**
con la razón (excedido la capacidad, no hay habilidad coincidente, imposible el horario, no hay conductor disponible).

### Ajuste el plan (opcional)

Arrastre las órdenes entre conductores, excluya órdenes o vuelva a ejecutar con diferentes ajustes de fase hasta que el plan sea correcto.

### Confirme

Haga clic en
**Confirmar plan**. El Orchestrador crea un
**Manifesto**
por cada conductor asignado, vincula el conductor y el vehículo a cada orden y asigna las órdenes a la aplicación Navigator. Una confirmación resume el resultado.

## Campos de la tarjeta

El botón
**Campos de la tarjeta**
en la barra de herramientas abre un panel para elegir qué campos se muestran en cada tarjeta de orden en la reserva y en el visualizador de planes (por ejemplo, número de seguimiento, horario programado, cliente, entrega, duración). Puede configurar conjuntos de campos separados para la vista estándar, por configuración de orden y campos de metadatos.

## Revisar los resultados después de confirmar

Una vez confirmado, la lista de órdenes del día del conductor aparece en:

* **Operaciones → Recursos → Conductores → [Conductor] → Horario**
  — la lista de órdenes del día para el conductor
* **Aplicación Navigator**
  — los conductores ven su lista de tareas activa

Las órdenes no asignadas vuelven a la reserva y permanecen disponibles para la siguiente ejecución del Orchestrador o asignación manual.

## Ver también

* [Visión general del Orchestrador](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
  — modos, motores y el modelo de planificación
* [Asignación de vehículos](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/vehicle-allocation)
  — cómo se asignan los vehículos a las órdenes — disponibilidad, proximidad a la ubicación y asignación de conductores
* [Asignación de carga y capacidad](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/payload-capacity-allocation)
  — restricciones de peso y volumen
* [Configuración del Orchestrador](https://fleetbase.io/docs/fleet-ops/settings/orchestrator)
  — valores predeterminados y comportamiento global

[Visión general del Orchestrador

Un planificador de múltiples fases que convierte una reserva de órdenes sin asignar en un plan que se puede confirmar — apila fases de asignación de vehículos, asignación de conductores y optimización de rutas en secuencia.](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
[Asignación de vehículos

Cómo asigna el Orchestrador los vehículos a las órdenes — disponibilidad, proximidad a la ubicación y asignación de conductores.](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/vehicle-allocation)