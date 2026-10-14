---
Título: Órdenes de trabajo
URL: https://fleetbase.io/docs/fleet-ops/maintenance/work-orders/overview
Módulo: fleet-ops
---

Órdenes de trabajo

# Órdenes de trabajo

Cree, asigne y realice un seguimiento de las órdenes de trabajo de mantenimiento, desde la asignación inicial de tareas hasta la finalización de las listas de verificación y el seguimiento de los costos.

# Órdenes de trabajo

A
**Orden de trabajo**
es una tarea de mantenimiento o reparación asignada. Las órdenes de trabajo se pueden generar automáticamente a partir de los horarios de mantenimiento cuando se alcanzan los umbrales de servicio, o se pueden crear manualmente para reparaciones e inspecciones de forma esporádica. Cada orden de trabajo se realiza un seguimiento desde su creación hasta su finalización, con un registro completo de los costos.

![Lista de órdenes de trabajo — código, tema, objetivo, asignado, prioridad, estado y fecha de vencimiento](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-maintenances-list.64d17c52.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Atributos de la orden de trabajo

| Campo | Descripción |
|---|---|
| **Código** | Código de referencia generado automáticamente (por ejemplo, WO-00123) |
| **Tema** | Título de la tarea (por ejemplo, "Cambio de aceite", "Reemplazo de pastillas de freno") |
| **Objetivo** | El vehículo, conductor o equipo en el que se realiza el trabajo |
| **Asignado a** | ¿Quién es responsable de completar la tarea? |
| **Prioridad** | bajo, medio, alto, crítico |
| **Estado** | Etapa actual del flujo de trabajo |
| **Creado el** | Fecha en que se creó la orden de trabajo |
| **Vencimiento** | Fecha límite para la finalización |
| **Finalizado el** | Fecha en que se completó y finalizó la orden de trabajo |
| **Instrucciones** | Instrucciones detalladas para la tarea |
| **Lista de verificación** | Lista estructurada de tareas secundarias para completar |
| **Costo estimado** | Estimación del costo previo del trabajo |
| **Presupuesto aprobado** | Monto autorizado para el gasto |
| **Costo real** | Costo real después de la finalización |
| **Moneda** | Moneda para todos los campos de costo |
| **Centro de costos** | Código de presupuesto/departamento para la contabilidad |

![Panel de detalles de la orden de trabajo — código, tema y categoría, estado y prioridad, activo objetivo, proveedor asignado, horario vinculado y fechas de apertura y vencimiento](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-work-order-details.266396b9.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Flujo de estado de la orden de trabajo

```
abierto ──► en progreso ──► cerrado
            │
        cancelado (en cualquier momento)
```

| Estado | Significado |
|---|---|
| `abierto` | Creado, aún no iniciado — el valor predeterminado para las nuevas órdenes de trabajo |
| `en progreso` | El trabajo ha comenzado |
| `cerrado` | Trabajo completado, todas las tareas de la lista de verificación completadas, `fecha_de_vencimiento` establecida |
| `cancelado` | Cancelado antes de la finalización |

La asignación se captura mediante el campo polimórfico
`assignee_uuid`
/
`assignee_type`, y no mediante el estado — una orden de trabajo en
`abierto`
ya puede tener un asignado.

## Crear una orden de trabajo

Navegue a
**Fleet-Ops → Mantenimiento → Órdenes de trabajo**
.

Haga clic en
**Nueva orden de trabajo**
.

Establezca el
**Tema**
y
**Prioridad**
.

Seleccione el
**Objetivo**
— un registro de Vehículo, Conductor o Equipo.

Establezca el
**Asignado a**
— un usuario o equipo responsable de completar el trabajo.

Establezca la
**Fecha de vencimiento**
.

Agregue
**Instrucciones**
describiendo lo que debe hacerse.

Cree la
**Lista de verificación**
— agregue elementos de tarea individuales que el asignado debe marcar como completados (por ejemplo, "Drene el aceite viejo", "Reemplace el filtro de aceite", "Llene con aceite nuevo", "Arranque el motor y verifique si hay fugas").

Establezca el
**Costo estimado**
y
**Presupuesto aprobado**
.

Haga clic en
**Guardar**
.

## Lista de verificación

La lista de verificación divide la orden de trabajo en pasos discretos y rastreables. Los asignados marcan cada elemento como completado. La orden de trabajo no puede avanzar a
`pendiente de revisión`
hasta que todos los elementos de la lista de verificación estén marcados como completados.

Los elementos de la lista de verificación pueden incluir:

* Pasos de inspección
* Reemplazo de piezas
* Rellenado de fluidos
* Calibración de sensores
* Prueba en carretera

## Seguimiento de costos

Las órdenes de trabajo rastrean tres valores de costo:

| Campo | Cuando se establece |
|---|---|
| **Costo estimado** | Establecido al crear por el programador o gerente |
| **Presupuesto aprobado** | Autorizado por un supervisor antes de que comience el trabajo |
| **Costo real** | Registrado por el asignado durante o después de la finalización del trabajo |

El desglose de costos se puede detallar utilizando elementos de línea — listando las piezas, la mano de obra y otros gastos por separado. Las piezas utilizadas del inventario de piezas se vinculan automáticamente y su costo se agrega al costo real.

## Notificaciones por correo electrónico

Desde el panel de detalles de la orden de trabajo, haga clic en
**Enviar correo electrónico**
para notificar al asignado o a las partes interesadas sobre el estado, la fecha de vencimiento o las instrucciones de la orden de trabajo. El correo electrónico incluye el código de la orden de trabajo, el tema, las instrucciones y un enlace a la orden de trabajo en la consola.

## Órdenes de trabajo vinculadas a vehículos

Las órdenes de trabajo se vinculan al vehículo objetivo y aparecen en:

* **Fleet-Ops → Recursos → Vehículos → [Vehículo] → Órdenes de trabajo**
  pestaña
* El historial de costos de mantenimiento del vehículo