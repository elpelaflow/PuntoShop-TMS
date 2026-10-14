---
title: "Visión general del mantenimiento"
url: https://fleetbase.io/docs/fleet-ops/maintenance/overview
module: fleet-ops
---

# Visión general del mantenimiento

Gestiona el mantenimiento de vehículos y equipos: horarios de mantenimiento preventivo, órdenes de trabajo, inventario de piezas y historial de mantenimiento.

# Visión general del mantenimiento

La sección de
**Mantenimiento**
de Fleet-Ops proporciona herramientas para mantener su flota en condiciones óptimas. Cubre la programación del mantenimiento preventivo, la asignación y el seguimiento de las órdenes de trabajo, el inventario de piezas y la gestión de equipos.

![Barra lateral de mantenimiento de Fleet-Ops — Horarios, Órdenes de trabajo, Mantenimientos, Equipos, Piezas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-maintenances-list.64d17c52.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## ¿Qué hay en el mantenimiento?

| Sección | Propósito |
|---|---|
| [**Inspecciones**](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/overview) | Formularios de inspección, inspecciones registradas desde el panel y seguimiento de las inspecciones fallidas |
| [**Horarios**](https://fleetbase.io/docs/fleet-ops/maintenance/schedules/overview) | Reglas de mantenimiento preventivo: generar órdenes de trabajo según el kilometraje, las horas del motor o la fecha |
| [**Órdenes de trabajo**](https://fleetbase.io/docs/fleet-ops/maintenance/work-orders/overview) | Asignación de tareas para el mantenimiento, las reparaciones y las inspecciones |
| **Mantenimientos** | Registros completos del historial de mantenimiento |
| [**Equipos**](https://fleetbase.io/docs/fleet-ops/maintenance/equipment/overview) | Herramientas, remolques, contenedores y otros activos de la flota |
| [**Piezas**](https://fleetbase.io/docs/fleet-ops/maintenance/parts/overview) | Inventario de piezas utilizado en las órdenes de trabajo |

## ¿Cómo funciona el mantenimiento?

El flujo de trabajo de mantenimiento tiene tres etapas:

1. **Programación**
   — definir una regla de mantenimiento preventivo para un vehículo o equipo. Establecer el disparador (cada 10.000 km, cada 6 meses, cada 500 horas del motor). Cuando se alcanza el umbral, se genera automáticamente una orden de trabajo.
2. **Orden de trabajo**
   — la orden de trabajo se asigna a un mecánico o conductor. Contiene una lista de verificación de tareas, estimaciones de costos y una fecha límite. El estado progresa de abierto → en curso → completado.
3. **Historial**
   — las órdenes de trabajo completadas crean registros de historial de mantenimiento vinculados al vehículo. Estos registros muestran todos los servicios realizados, las piezas utilizadas y los costos incurridos durante la vida útil del vehículo.

## Integración con los vehículos

El mantenimiento está estrechamente integrado con los registros de los vehículos:

* Cada vehículo tiene una pestaña
  **Horarios**
  que muestra todas las reglas de mantenimiento
* Cada vehículo tiene una pestaña
  **Órdenes de trabajo**
  que muestra las tareas abiertas y completadas
* Cada vehículo tiene una pestaña
  **Mantenimiento**
  que muestra el historial completo de mantenimiento
* Cada vehículo tiene una pestaña
  **Inspecciones**
  que muestra todas las inspecciones registradas

Cuando se establece el estado de un vehículo en
`mantenimiento`, se excluye automáticamente de las ejecuciones de asignación de Orchestrator.

## Accediendo al mantenimiento

Navegue a
**Fleet-Ops → Mantenimiento**
en la barra lateral izquierda. Las subsecciones (Formularios de inspección, Inspecciones, Horarios, Órdenes de trabajo, Equipos, Piezas) se enumeran a continuación.