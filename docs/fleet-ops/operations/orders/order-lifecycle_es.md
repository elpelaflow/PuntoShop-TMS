---
Título: Ciclo de vida de un pedido
URL: https://fleetbase.io/docs/fleet-ops/operations/orders/order-lifecycle
Módulo: fleet-ops
---

Pedidos

# Ciclo de vida de un pedido

Comprenda los diferentes estados del sistema a través del cual pasa cada pedido, cómo fluye la actividad dentro de la fase iniciada, y cómo se completa un pedido.

# Ciclo de vida de un pedido

Cada pedido en Fleet-Ops pasa por un conjunto de
**estados del sistema**
que impulsan la asignación, la facturación, la generación de informes y los eventos de webhook. Dentro de estos estados, especialmente entre
`iniciado`
y la finalización del pedido, el
**flujo de actividad**
definido en la configuración del pedido, ejecuta los pasos detallados a través de los cuales pasa el conductor. El "esqueleto" del estado del sistema es el mismo para cada pedido; el flujo de actividad es lo que diferencia un tipo de pedido del otro.

## Estados del sistema

| Estado | Siempre presente? | Significado |
|---|---|---|
| `creado` | Sí | El pedido ha sido creado y está esperando ser asignado |
| `asignado` | Sí | El pedido ha sido asignado a un conductor |
| `iniciado` | Sí | El conductor ha aceptado y está trabajando en el pedido |
| `cancelado` | Sí | El pedido ha sido cancelado antes de completarse |
| `completado` | Configurable | El pedido ha sido entregado |

Los cuatro primeros son
**estáticos**
— existen en cada pedido y no se pueden eliminar. El
`completado`
está configurado: cualquier actividad personalizada en el flujo de actividad del pedido, con su
`completado`
establecido en
`verdadero`,
finalizará el pedido. La configuración predeterminada del pedido viene con una actividad
*Entregado*
genérica, pero un flujo de mensajería podría usar
*Artículos entregados*, un flujo de servicio podría usar
*Trabajo aprobado*, y así sucesivamente. La actividad que lleva la bandera es la que completa el pedido.

## Flujo de estado

```
creado ──► asignado ──► iniciado ──► completado
                                  │
                            cancelado (en cualquier punto)
```

### Creado

Un nuevo pedido comienza en
**`creado`**
en el momento en que se guarda. Los pedidos creados son visibles en el panel de operaciones y en el grupo de pedidos del Orchestrator, y están disponibles para la asignación manual o automatizada.

### Asignado

Cuando el pedido se envía a un conductor, ya sea haciendo clic en
**Asignar**
en el pedido, o como resultado de una fase del Orchestrator que asigna automáticamente, el estado cambia a
**`asignado`**. El conductor recibe una notificación push en la aplicación Navigator y el pedido aparece en su lista de trabajos activos.

### Iniciado

Cuando el conductor acepta y comienza a trabajar en el pedido en Navigator, el estado cambia a
**`iniciado`**. A partir de este punto, la ubicación GPS del conductor se transmite en vivo al panel, se activan eventos de geocercado cuando llega y sale de las ubicaciones de recogida/entrega, y el
**flujo de actividad**
(definido por la configuración del pedido) comienza a ejecutarse. Cada paso de actividad que completa el conductor se captura con una marca de tiempo, la ubicación del conductor y cualquier prueba requerida.

### Completado

El pedido se marca
**`completado`**
cuando el flujo de actividad llega a una actividad cuyo
`completado`
establecido en
`verdadero`. Esa actividad es lo que define la configuración del pedido:
*Entregado*,
*Firma capturada*,
*Trabajo cerrado*, etc. La finalización activa:

* Un webhook (
  `pedido.completado`
  )
* Notificaciones al cliente, si están configuradas
* Una entrada final de estado de seguimiento con la ubicación del conductor

### Cancelado

Un pedido puede pasar a
**`cancelado`**
en cualquier momento antes de completarse. Se pueden registrar las razones de la cancelación; los pedidos cancelados permanecen en el sistema para informar y auditoría.

## Flujo de actividad vs. Estado del sistema

El estado del sistema (
`creado`
,
`asignado`
,
`iniciado`
,
`completado`
,
`cancelado`) es la etapa de ciclo de vida de alto nivel que es visible en todas partes en el panel y la API. Es cómo Fleet-Ops decide
*qué etapa del ciclo de vida*
está en el pedido.

![Diálogo de actualización de pedido — la siguiente actividad que permite el flujo del pedido desde su paso actual, o una actividad personalizada con su propio estado, código y detalles](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-update-activity.e5f53941.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

El
**flujo de actividad**, definido en la configuración del pedido, es lo que se ejecuta
*dentro*
del ciclo de vida — especialmente entre
`iniciado`
y la actividad que completa el pedido. Un flujo de mensajería simple podría ser:

1. *Conductor en recogida*
2. *Artículos recogidos*
3. *En tránsito*
4. *Llegada a la entrega*
5. *Artículos entregados*
   ←
   `completado: verdadero`
   finaliza el pedido

Cada actividad tiene sus propias condiciones (cuándo puede activarse), eventos (qué ocurre cuando se activa) y una bandera
`completado`
opcional. Diferentes tipos de pedidos pueden tener flujos de actividad completamente diferentes, al tiempo que comparten los mismos cinco estados del sistema.

Consulte
[Flujos de actividad](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows)
para obtener más información sobre cómo diseñarlos y editarlos.

## Ciclo de vida de waypoint

Los pedidos con múltiples paradas tienen su propio sub-ciclo de vida. La actividad de finalización del pedido solo se activa cuando se han visitado todas las paradas y se ha capturado la información requerida.

Cada parada puede tener:

* Su propio método de captura de información (firma, foto, código de barras, personalizado)
* Un período de tiempo (hora de llegada más temprana y más tardía)
* Una estimación del tiempo de servicio (cuánto tiempo se espera que pase el conductor en la parada)

## Eventos de webhook

Cada transición de estado activa un evento de webhook correspondiente:

| Estado | Evento |
|---|---|
| Asignado a conductor | `pedido.asignado_a_conductor` |
| `asignado` | `pedido.asignado` |
| `iniciado` | `pedido.iniciado` |
| `completado` | `pedido.completado` |
| `cancelado` | `pedido.cancelado` |

También se transmiten los cambios de nivel de actividad:
`pedido.cambio_de_actividad`,
`parada.cambio_de_actividad`,
`entidad.cambio_de_actividad`, así como
`parada.completado`
y
`entidad.completado`,
para que las integraciones puedan suscribirse a un progreso detallado, no solo a las transiciones de estado del sistema.

Consulte
[Webhooks](https://fleetbase.io/docs/platform/developer-console/webhooks)
para obtener más información sobre la suscripción.