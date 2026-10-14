---
título: "Tablero Kanban"
url: https://fleetbase.io/docs/fleet-ops/operations/orders/kanban-board
módulo: fleet-ops
---

Órdenes

# Tablero Kanban

Gestiona las órdenes de forma visual, utilizando columnas según el estado — visualiza todas las órdenes activas de un vistazo, arrastra para reasignar y filtra por conductor o flota.

# Tablero Kanban

El Tablero Kanban proporciona una vista visual, basada en columnas, de todas las órdenes organizadas por
**estado del sistema**.
Cada columna representa uno de los cinco estados del sistema:
*creada*,
*asignada*,
*en curso*,
*completada*,
*cancelada*,
y cada tarjeta representa una orden. Esto proporciona a los encargados de la asignación una visión en tiempo real del estado actual de la operación, sin necesidad de navegar por los registros individuales de las órdenes.

![Tablero Kanban de Fleet-Ops — columnas para cada estado de la orden, tarjetas de orden con información del conductor y dirección](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orders-board.0a2d988b.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Acceder al Tablero Kanban

En Fleet-Ops, navega a
**Operaciones → Órdenes**
y cambia la vista del
**Listado**
al
**Tablero**
(vista Kanban) utilizando el selector de vista en la esquina superior derecha de la página de órdenes.

## Columnas del Tablero

El tablero tiene una columna por cada estado del sistema:

| Columna | Órdenes mostradas |
|---|---|
| **Creada** | Esperando asignación |
| **Asignada** | Enviada a la aplicación Navigator, esperando que el conductor la inicie |
| **En curso** | El conductor está ejecutando la orden |
| **Completada** | La actividad de finalización de la orden se ha activado |
| **Cancelada** | Órdenes canceladas |

Por defecto, las órdenes completadas y canceladas se ocultan para mantener el enfoque en el trabajo activo. Utiliza el filtro de columna para habilitar o deshabilitar su visibilidad.

## Tarjetas de Órdenes

Cada tarjeta de orden muestra:

* **ID de la orden**
  (public\_id — por ejemplo,
  `ORD-00123`
  )
* **Nombre del**
  cliente
* **Dirección de entrega**
  resumen
* **Conductor asignado**
  nombre (si está asignado)
* **Hora programada**
  (si está programada)
* **Etiqueta de estado**

Haz clic en una tarjeta para abrir el panel de detalles de la orden completa.

## Filtrar el Tablero

Utiliza la barra de filtros en la parte superior para restringir el tablero a:

* **Conductor**
  — muestra solo las órdenes asignadas a un conductor específico
* **Flota**
  — muestra solo las órdenes pertenecientes a una flota
* **Fecha**
  — filtra por fecha programada o fecha de creación
* **Configuración de la orden**
  — filtra por tipo de orden

Los filtros se aplican en conjunto — combina conductor y fecha para ver el horario de un conductor específico para un día determinado.

## Acciones rápidas desde las tarjetas

Desplázate sobre una tarjeta de orden para revelar los botones de acción rápida:

* **Asignar**
  — asigna una orden creada directamente desde la tarjeta, sin necesidad de abrir el detalle
* **Asignar**
  — abre el diálogo de asignación de conductor/vehículo para una orden creada
* **Cancelar**
  — cancela la orden

## Utilizar el Tablero con el Orchestrator

El Tablero Kanban y el
[Orchestrator](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
funcionan bien juntos. Utiliza el Orchestrator para realizar asignaciones masivas y optimizar rutas, y luego cambia a la vista del tablero para supervisar el progreso en tiempo real a medida que los conductores completan sus manifiestos.

[Gestionar Órdenes

Crea, edita, asigna, envía y gestiona órdenes desde la lista y las vistas de detalles de órdenes de Fleet-Ops.](https://fleetbase.io/docs/fleet-ops/operations/orders/managing-orders)
[Programar Órdenes

Programa una orden para una fecha y hora específicas — establece ventanas de recogida, restricciones de tiempo y futuras asignaciones.](https://fleetbase.io/docs/fleet-ops/operations/orders/scheduling-orders)