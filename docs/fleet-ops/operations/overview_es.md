---
title: "Visión general de las operaciones"
url: https://fleetbase.io/docs/fleet-ops/operations/overview
module: fleet-ops
---

# Visión general de las operaciones

Una descripción general de las capacidades operativas de Fleet-Ops: pedidos, asignación, programación y automatización.

# Visión general de las operaciones

La sección de "Operaciones" de Fleet-Ops es el centro de control diario para su operación logística. Cubre todo, desde la creación y asignación de pedidos individuales hasta la ejecución de la asignación automatizada en masa en todo su flota.

![Panel de operaciones de Fleet-Ops — lista de pedidos con barra de filtro y mapa en vivo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orders-map.80724e10.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## ¿Qué hay en "Operaciones"?

| Sección | Propósito |
|---|---|
| **Pedidos** | Crear, gestionar, asignar, enviar y realizar un seguimiento de todas las entregas |
| **Configuraciones de pedidos** | Definir tipos de pedidos personalizados con flujos de trabajo configurables y campos de entidad |
| **Orchestrador** | Planificador de múltiples fases para la asignación de vehículos en masa, la asignación de conductores y la optimización de rutas |
| **Programador** | Programación de turnos de conductores y gestión del cronograma de pedidos |
| **Tasas de servicio** | Reglas de precios para calcular los costes de los pedidos |
| **Cotizaciones de servicio** | Cotización de precios bajo demanda para pedidos |

## El flujo de trabajo de los pedidos

Los pedidos son la unidad de trabajo principal en Fleet-Ops. Un pedido típico pasa por las siguientes etapas:

1. **Crear**
   — Un operador (o un sistema externo a través de API) crea un pedido con una dirección de recogida y entrega, artículos y una Configuración de Pedido. El estado del sistema del pedido es
   `creado`
   .
2. **Programar**
   (opcional) — Establecer un período de fecha y hora específico. El pedido permanece
   `creado`
   hasta que se envía.
3. **Asignar**
   — Vincular un conductor y un vehículo al pedido, manualmente o a través de una fase del Orchestrator. La asignación por sí sola no cambia el estado del sistema.
4. **Enviar**
   — Enviar el pedido a la aplicación Navigator del conductor. El estado se mueve a
   `enviado`
   .
5. **Iniciar**
   — Cuando el conductor acepta y comienza el pedido, el estado se mueve a
   `iniciado`
   . El flujo de actividad definido por la Configuración del Pedido se ejecuta a través de los pasos de recogida, tránsito y entrega.
6. **Completar**
   — Cuando el flujo de actividad con la
   `completado`
   se activa (por ejemplo,
   *Artículos entregados*,
   *Firma capturada*
   ), el estado se mueve a
   `completado`
   .

Consulte
[Ciclo de vida del pedido](https://fleetbase.io/docs/fleet-ops/operations/orders/order-lifecycle)
para el modelo de estado completo.

## Automatización con el Orchestrador

Para operaciones de alto volumen, asignar manualmente cada pedido no es práctico. El
**Orchestrador**
es un planificador de múltiples fases: puede componer fases que se ejecutan en secuencia — por ejemplo
*Asignar vehículos*
→
*Optimizar rutas*
→
*Asignar conductores*
— y el Orchestrador crea un plan completo que puede previsualizar y confirmar. Puede ejecutar una sola fase por sí sola (por ejemplo, solo la optimización de rutas) o apilarlas. Cada fase utiliza un motor configurable (el algoritmo de codicia incorporado, VROOM o cualquier motor registrado por una extensión).

Consulte
[Visión general del Orchestrador](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
para obtener más detalles.

## Programación de turnos con el Programador

El
**Programador**
proporciona una vista de calendario de todos los turnos de conductores y asignaciones de pedidos. Úselo para planificar qué conductores están trabajando en qué días y para visualizar cómo se distribuyen los pedidos en su flota.

Consulte
[Visión general del Programador](https://fleetbase.io/docs/fleet-ops/operations/scheduler/overview)
para obtener más detalles.

## Precios con Tasas de Servicio

**Tasas de servicio**
definen cómo se calculan los costes de los pedidos: tarifas fijas, basadas en la distancia, basadas en el peso, basadas en la zona o escalonadas. Las tarifas pueden aplicarse a áreas de servicio, zonas o tipos de pedidos específicos. Cuando una tarifa coincide con un pedido, se genera una
**Cotización de servicio**
mostrando el coste estimado.

Consulte
[Tasas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
y
[Cotizaciones de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview)
para obtener más detalles.