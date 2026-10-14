---
title: "Vallas geográficos"
url: https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/geofences
module: fleet-ops
---

Áreas de servicio y vallas geográficas

# Vallas geográficas

Cómo las áreas y zonas de servicio se convierten en vallas geográficas activas: eventos de entrada, salida, permanencia y límite de velocidad, el motor de detección y los informes que los generan.

# Vallas geográficas

Un
**valla geográfica**
en Fleet-Ops es cualquier
[área de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/service-areas)
o
[zona](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/zones)
que tenga al menos un disparador habilitado. Las vallas geográficas detectan cuándo un conductor o vehículo cruza una frontera y emiten eventos que las funciones posteriores reaccionan: llegada automática, acuerdos de nivel de servicio (SLA) de permanencia, alertas de áreas restringidas y informes de límites de velocidad.

Las vallas geográficas no son un objeto separado en Fleet-Ops: son el comportamiento operativo de las áreas y zonas de servicio. Activa o desactiva los campos de disparador y tendrás una valla geográfica; elimínalos y el mismo polígono seguirá definiendo el alcance de precios, pero no emitirá eventos.

## Disparadores

Cada área y zona de servicio expone los mismos cuatro campos de disparador:

| Campo | Tipo | ¿Qué hace? |
|---|---|---|
| `trigger_on_entry` | booleano | Emite un evento de "entrada" cuando un sujeto entra en el perímetro por primera vez después de estar fuera. |
| `trigger_on_exit` | booleano | Emite un evento de "salida" cuando un sujeto sale del perímetro por primera vez después de estar dentro. |
| `dwell_threshold_minutes` | entero | Programa un evento de "permanencia" N minutos después de la entrada, solo si el sujeto ha permanecido dentro continuamente. |
| `speed_limit_kmh` | entero | Se registra para el perímetro. Se combina con la telemetría del vehículo para señalar las infracciones de los límites de velocidad dentro de él. |

La entrada/salida/permanencia se evalúan para cada actualización de ubicación del conductor y del vehículo. La evaluación de la infracción de los límites de velocidad se basa en la integración de telemetría cuando se informa la velocidad.

## ¿Cómo funciona la detección?

La detección de vallas geográficas reside en
`GeofenceIntersectionService`
(
`server/src/Support/GeofenceIntersectionService.php`
). Para cada actualización de ubicación de un conductor o vehículo:

**Prefiltrado de la caja delimitadora.**
Una consulta `MBRContains` utiliza el índice espacial de MySQL para estrechar rápidamente el conjunto de candidatos de zonas y áreas de servicio cuyo rectángulo delimitador mínimo contiene el nuevo punto. Esto es rápido: milisegundos, incluso con miles de vallas geográficas por empresa.

**Verificación de contención precisa.**
Para cada candidato, se ejecuta una consulta `ST_Contains` sobre el polígono real para confirmar o rechazar el punto. Esta es la prueba de contención definitiva.

**Comparación de estado.**
El resultado se compara con el último estado conocido del sujeto en
`driver_geofence_states`
/
`vehicle_geofence_states`
(filas por valla geográfica que rastrean
`is_inside`
,
`entered_at`
,
`dwell_job_id`
).

**Emitir transiciones.**
Cada transición detectada escribe una fila en
`geofence_events_log`
con
`event_type`
(
`entered`
,
`exited`
, o
`dwelled`
), el UUID del sujeto, el UUID de la valla geográfica y
`geofence_type`
(
`zone`
o
`service_area`
).

**Enviar eventos.**
Laravel dispara eventos (por ejemplo,
`DriverArrivedAtGeofence`
), para que las webhooks, las notificaciones y las automatizaciones puedan reaccionar.

Dado que el prefiltrado utiliza el índice espacial y la verificación precisa solo se ejecuta en el conjunto estrechado, esto escala bien: agregar más vallas geográficas aumenta la evaluación de candidatos linealmente, pero las búsquedas en el índice espacial permanecen sublineales.

## Detección de permanencia

La permanencia se implementa como un trabajo programado, no como una comprobación por cada tick:

1. Cuando se activa
   `entered`
   , se programa un trabajo en cola para que se ejecute después de
   `dwell_threshold_minutes`
   .
2. El UUID del trabajo se almacena en la fila de estado como
   `dwell_job_id`
   .
3. Cuando se ejecuta el trabajo, confirma que el sujeto todavía está dentro antes de emitir el evento
   `dwelled`
   .
4. Si el sujeto sale antes de que transcurran los minutos, el controlador de
   `exited`
   cancela el trabajo de permanencia pendiente.

Esto significa que un cambio en
`dwell_threshold_minutes`
se aplica a las nuevas entradas después del cambio: los trabajos de permanencia en curso utilizan el umbral que estaba activo cuando se produjo la entrada. Para volver a evaluar las entradas existentes con el nuevo umbral, salga y vuelva a entrar en la valla geográfica.

## Eventos emitidos

| Evento | Se activa cuando |
|---|---|
| `DriverArrivedAtGeofence` | Un conductor entra en una valla geográfica con `trigger_on_entry = true` . |
| `DriverLeftGeofence` | Un conductor sale de una valla geográfica con `trigger_on_exit = true` . |
| `DriverDwelledAtGeofence` | Un conductor ha permanecido dentro durante `dwell_threshold_minutes` . |
| `VehicleEntered/Left/DwelledAtGeofence` | El mismo conjunto, pero para vehículos cuando se integra la telemetría del vehículo. |

Suscríbase a través de webhooks (
**Consola → Desarrolladores → Webhooks**
) o a través de escuchas de eventos de Laravel en una extensión del lado del servidor. El payload de la webhook incluye el UUID de la valla geográfica, el ID público, el nombre, el discriminador de tipo (
`zone`
o
`service_area`
) y la ubicación del sujeto en el momento del evento.

## Casos de uso comunes

| Caso de uso | Configuración |
|---|---|
| **Llegada automática a puntos de recogida/entrega** | Establezca una pequeña valla geográfica (unos pocos cientos de metros) alrededor de cada instalación conocida con `trigger_on_entry = true` . Conecte `DriverArrivedAtGeofence` para que el flujo de actividad del pedido se avance automáticamente. |
| **Alertas de áreas restringidas** | Marque las áreas sensibles (zonas sin vuelo, patios restringidos para clientes) como vallas geográficas con `trigger_on_entry = true` y dirija el evento a un canal de alerta. |
| **Acuerdo de permanencia SLA** | Para puntos de recogida donde los conductores deben estar dentro y fuera rápidamente, establezca `dwell_threshold_minutes` al SLA. El evento `dwelled` se convierte en una señal de escalamiento. |
| **Límite de velocidad** | Establezca `speed_limit_kmh` en áreas con límites conocidos (zonas escolares, patios de vehículos). El informe de infracciones se recopila sobre el tiempo. |
| **Reconciliación de tarifas de área de servicio** | Utilice los eventos de entrada/salida para confirmar que un vehículo realmente cruzó en el área de servicio facturada, en caso de disputas posteriores. |

## Informes

| Endpoint | Propósito |
|---|---|
| `GET /geofence-events` | Historial de eventos sin procesar. Filtre por sujeto, valla geográfica, tipo, rango de fechas. |
| `GET /dwell-report` | Duraciones de permanencia agregadas por valla geográfica por sujeto, para análisis de SLA. |
| `GET /geofence-violations` | Infracciones de límites de velocidad y áreas restringidas, que se muestran en el widget del panel de control **Violaciones**. |

Todos los tres alimentan los widgets de vallas geográficas en los paneles de control de
**Analytics → Informes**
de Fleet-Ops.

## Flujo de trabajo de configuración

En la consola, los disparadores de vallas geográficas son parte del modal de edición de áreas/zonas de servicio: no hay una página "Vallas geográficas" en la IU. Para convertir un polígono existente en una valla geográfica, vaya a
**Fleet-Ops → Dashboard → Map**
y:

1. Haga clic derecho en el polígono de área de servicio o zona en el mapa (o abra el panel de áreas de servicio de la barra de herramientas del mapa y seleccione el área de la lista).
2. Elija
   **Editar**
   del menú contextual.
3. En la sección "Disparadores de valla geográfica" del modal, active o desactive los disparadores y establezca el valor de permanencia o límite de velocidad.
4. Guarde. Las actualizaciones de ubicación posteriores respetan inmediatamente la nueva configuración: no hay un paso de implementación separado.

Para eliminar una valla geográfica, elimine los campos de disparador. El polígono permanece en su lugar para la fijación de precios y la visualización, pero no se emiten nuevos eventos.

## Permisos

La configuración de vallas geográficas sigue el modelo de permisos estándar de Fleet-Ops:

* **Gestionar áreas/zonas de servicio**
  para editar los campos de disparador (normalmente el rol de administración de operaciones).
* **Ver eventos de vallas geográficas**
  para acceder a los informes de eventos y violaciones.

Consulte cómo asignar estos permisos en
[Identity & Access](https://fleetbase.io/docs/identity-access/overview)
.

## Ver también

* [Áreas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/service-areas)
  — los polígonos más grandes sobre los que se construyen la mayoría de las vallas geográficas.
* [Zonas](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/zones)
  — polígonos más finos para vallas geográficas ajustadas.
* [Tarifas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
  — tarifas fijadas en los mismos polígonos.