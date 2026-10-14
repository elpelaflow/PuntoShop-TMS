---
title: "Programar Pedidos"
url: https://fleetbase.io/docs/fleet-ops/operations/orders/scheduling-orders
module: fleet-ops
---

Pedidos

# Programar Pedidos

Programa un pedido para una fecha y hora específicas: define ventanas de recogida, restricciones de tiempo y la recogida futura.

# Programar Pedidos

Los pedidos pueden programarse para una fecha y hora futuras específicas, en lugar de ser recogidos inmediatamente. Un pedido programado sigue siendo un pedido normal con estado del sistema:
`creado`
— los campos de programación informan al programador, al orquestador y a la cola de recogida
*cuándo*
es elegible para salir, pero Fleet-Ops no tiene un estado separado "programado".

## Establecer una Recogida Programada

Al crear o editar un pedido, habilita
**Programar**
en el formulario del pedido:

Abre el nuevo formulario del pedido (
**Operaciones → Pedidos → + Nuevo Pedido**
) o edita un pedido existente.

Activa
**Programar Pedido**
.

Establece la fecha y hora
**Programado para**
— la hora de recogida objetivo.

Opcionalmente, establece una
**Rango de Tiempo de Inicio**
y
**Rango de Tiempo de Fin**
para definir el rango de recogida aceptable (por ejemplo, entre las 09:00 y las 12:00).

Guarda el pedido. El pedido se crea con el estado
**`creado`**
y el campo
`scheduled_at`
se establece; aún no se ha recogido.

![Nuevo formulario de pedido — Interruptor de programación con selector de fecha/hora y campos de rango de tiempo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-create-schedule.74347ce4.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Cómo se comportan los pedidos programados

Un pedido
`creado`
con un valor
`scheduled_at`
se comporta de manera diferente de uno sin:

* Se puede filtrar en la lista de pedidos utilizando el filtro rápido
  **Programado**
  (que muestra los pedidos con una fecha
  `scheduled_at`
  futura)
* Aparece en la vista del calendario del programador en su fecha programada
* El orquestador puede incluirlo en las ejecuciones de optimización que se dirigen a una fecha o ventana específica
* No aparece en la cola de recogida activa hasta que se alcanza la ventana programada

## Rangos de tiempo

El
**rango de tiempo**
(hora de inicio y fin) define cuándo se puede recoger el pedido. Esto es diferente del tiempo programado: proporciona al conductor un rango en lugar de un momento exacto.

Los rangos de tiempo se utilizan por el
**Orquestador**
como una restricción obligatoria al asignar y enrutar pedidos. Un pedido con un rango de tiempo de 09:00–12:00 solo se asignará a un conductor que pueda llegar a la ubicación de recogida antes de las 12:00.

Para los puntos de parada dentro de un pedido, cada parada puede tener su propio rango de tiempo independiente.

## Recogida automática en el tiempo programado

Los pedidos programados
**se recogen automáticamente**
cuando llega la fecha y hora programadas. El pedido pasa de
`creado`
a
`recogido`
, el conductor recibe una notificación push en Navigator y el pedido aparece en su lista de trabajos activa: no se requiere ninguna acción del operador.

Si el pedido aún no tiene asignado ningún conductor en el momento programado, se puede configurar la recogida para que:

* Se espere hasta que la siguiente ejecución del orquestador lo recoja, o
* Se inicie una ejecución del orquestador para la asignación en el momento programado y se recoja tan pronto como se encuentre un conductor

También se puede recoger un pedido programado
**temprano**
abriendo el pedido y haciendo clic en
**Recoger**
— útil cuando el conductor está listo antes de la ventana programada.

## Ver pedidos programados

Los pedidos programados aparecen en dos lugares:

1. **Lista de pedidos**
   — utiliza el filtro rápido
   **Programado**
   para ver todos los pedidos
   `creado`
   con una fecha
   `scheduled_at`
   futura
2. **Calendario del programador**
   — navega a
   **Operaciones → Programador**
   para ver una vista de línea de tiempo de todos los pedidos programados organizados por fecha y conductor

## Reprogramar

Para cambiar la fecha o hora programada:

1. Abre el detalle del pedido y haz clic en
   **Editar**
2. Actualiza el campo
   **Programado para**
   y el rango de tiempo
3. Guarda — el pedido permanece en estado
   `creado`
   con la hora actualizada

Si el pedido ya se ha recogido, reprogramar requiere cancelar la recogida primero.