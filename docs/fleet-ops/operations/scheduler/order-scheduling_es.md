---
title: "Programación de pedidos"
url: https://fleetbase.io/docs/fleet-ops/operations/scheduler/order-scheduling
module: fleet-ops
---

Programación de pedidos

# Programación de pedidos

Programa los pedidos en los horarios de los conductores utilizando el programador: establece ventanas de recogida, asigna a turnos y gestiona las colas de pedidos programados.

# Programación de pedidos

La programación de pedidos te permite planificar las entregas para fechas futuras y asignarlas a turnos específicos de conductores. Los pedidos programados aparecen en el calendario del programador y permanecen en estado de espera hasta que se abra la ventana de recogida programada.

## Programar un pedido

Los pedidos se pueden programar al crearlos o actualizarlos a una fecha programada posteriormente.

### Durante la creación del pedido

1. Abre el formulario del nuevo pedido (
   **Operaciones → Pedidos → + Nuevo pedido**
   )
2. Activa la opción
   **Programar pedido**
   en
3. Establece la fecha y hora de
   **Programación**
   en
4. Opcionalmente, establece una
   **Hora de inicio de la ventana**
   y
   **Hora de fin de la ventana**
   para el rango de recogida aceptable
5. Guarda: el pedido se crea con el estado del sistema
   **`creado`**
   y el campo
   `programado_en`
   se establece; no se envía hasta que lo elijas

### Después de la creación

1. Abre un pedido existente
   `creado`
   (uno que aún no se haya enviado)
2. Haz clic en
   **Editar**
3. Activa la opción de programación y establece la fecha/hora
4. Guarda

## Programar desde el calendario del programador

Puedes programar y asignar pedidos directamente desde la vista del calendario del programador:

1. Abre
   **Operaciones → Programador**
2. Encuentra un pedido no programado en la barra lateral de pedidos (panel derecho)
3. Arrastra la tarjeta del pedido a una fila de conductor en el día deseado
4. Establece la hora si se solicita
5. Guarda: el pedido se programa y se asigna a ese conductor

![Calendario del programador — pedidos no programados en la lista lateral, pedidos programados en la cuadrícula del calendario](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-scheduler-2.097d12eb.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Ventanas de tiempo

Cada pedido puede tener una
**ventana de tiempo**
— un rango aceptable para la recogida:

| Campo | Descripción |
|---|---|
| **Programado en** | La hora de recogida objetivo (informativa) |
| **Hora de inicio de la ventana** | La hora más temprana en la que se puede realizar la recogida |
| **Hora de fin de la ventana** | La hora más tardía en la que se puede realizar la recogida |

El Orchestrator trata las ventanas de tiempo como
**restricciones estrictas**. Un pedido con una ventana de 09:00–11:00 solo se asignará a un conductor cuyo itinerario pueda llegar a la recogida antes de las 11:00.

Si un conductor no puede realizar el pedido dentro de la ventana de tiempo, el pedido se devuelve a la piscina sin asignar con la razón
`tiempo_de_ventana_excedido`.

## Ver pedidos programados

Los pedidos programados aparecen en varios lugares:

| Vista | Ubicación |
|---|---|
| **Lista de pedidos** | pestaña **Programados** |
| **Calendario del programador** | en la fila del conductor para la fecha programada |
| **Detalle del pedido** | muestra la fecha y la ventana programadas en el encabezado |

## Re-programar

Para mover un pedido programado a una fecha o hora diferente:

1. En el programador, arrastra la tarjeta del pedido a la nueva fila del día/conductor
2. O abre el pedido, haz clic en Editar y actualiza la fecha de Programado

Re-programar un pedido enviado requiere cancelar primero el envío existente.

## Programación masiva

Para grandes lotes de pedidos, utiliza el
**Orchestrador**
en lugar de programar individualmente:

1. Ejecuta el Orchestrador con el grupo de pedidos filtrado para la fecha objetivo
2. El Orchestrador respeta las ventanas de tiempo y los horarios de los turnos al asignar
3. Confirma el plan: todos los pedidos se programan y asignan en una sola operación

Consulta
[Visión general del Orchestrador](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
para los detalles de la asignación masiva.

[Visión general del Programador

El Programador proporciona una vista del calendario de flota de los turnos de los conductores, las asignaciones de pedidos y las ventanas de disponibilidad.](https://fleetbase.io/docs/fleet-ops/operations/scheduler/overview)
[Horarios de turnos de conductores

Establece y gestiona los horarios de turnos de conductores recurrentes: define las horas de trabajo, los días, los descansos y las normas de cumplimiento de HOS.](https://fleetbase.io/docs/fleet-ops/operations/scheduler/driver-shift-schedules)