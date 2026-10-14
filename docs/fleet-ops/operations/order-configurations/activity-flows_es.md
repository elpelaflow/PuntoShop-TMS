---
title: "Flujos de Actividades"
url: https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows
module: fleet-ops
---

Configuración de Órdenes

# Flujos de Actividades

Define el flujo de actividades que se ejecuta en la fase de inicio de una orden: transiciones, lógica, eventos, indicador de finalización y POD por actividad.

# Flujos de Actividades

Un
**Flujo de Actividades**
es el flujo definido en una Configuración de Órdenes. Describe las actividades que un conductor debe completar mientras la orden está en el estado
`iniciada`
del sistema — y cuál es la actividad que finaliza la orden. Cada Configuración de Órdenes tiene exactamente un flujo, almacenado como un grafo JSON de actividades, con las que se identifican mediante su
`code`.

![Editor de flujo de actividades — gráfico de actividades con transiciones, lógica, eventos y indicador de finalización](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-config-activity-flow.1fbe82a5.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Forma de Actividad

Cada actividad en el flujo es un objeto JSON con los siguientes campos:

| Campo | Descripción |
|---|---|
| `key` / `code` | Identificador único para la actividad (por ejemplo, `creado`, `en ruta`, `entregado`). Se utiliza en webhooks, la API y como destino de transición de otras actividades. |
| `status` | Etiqueta de visualización que se muestra en la línea de tiempo de actividad de la consola (por ejemplo, *Orden enviada*, *Conductor en ruta*). |
| `details` | Descripción de una línea de lo que representa la actividad. |
| `color` | Color del indicador de estado en la interfaz de usuario de la consola. |
| `complete` | Booleano. Cuando es `true`, la ejecución de esta actividad mueve el estado del sistema de la orden a `completado`. Cualquier actividad personalizada puede tener esta bandera, y no tiene que llamarse "completado". |
| `sequence` | Entero utilizado para ordenar cuando hay varias actividades accesibles desde el mismo padre. |
| `activities` | Array de códigos de actividades a los que se puede pasar. El flujo es un grafo dirigido, no estrictamente un árbol. |
| `pod_method` | Uno de `scan`, `signature` o `photo`. Controla lo que el conductor captura en Navigator en este paso. |
| `require_pod` | Booleano. Cuando es `true`, el conductor debe capturar el POD antes de que se pueda ejecutar la actividad. |
| `logic` | Lista opcional de condiciones que deben cumplirse para que la actividad esté disponible. Consulte [Condiciones de lógica](#logic-conditions). |
| `events` | Lista opcional de eventos que se disparan cuando se alcanza la actividad (webhooks, notificaciones). Consulte [Eventos](#events). |
| `actions` / `options` / `entities` / `internalId` | Campos internos utilizados por el editor y el renderizador. |

## Flujo de Transporte Predeterminado

La Configuración de Órdenes
**Transporte**
predeterminada viene con un flujo mínimo:

```
creado ──► enviado ──► iniciado ──► en ruta ──► completado   (complete: true)
```

Este es el flujo completo predeterminado. Las operaciones que requieren un seguimiento más detallado (confirmación de recogida, captura de firma, progreso en múltiples paradas) extienden este flujo agregando sus propias actividades y conectándolas a través del array
`activities`
(transiciones) en cada nodo.

Un flujo personalizado típico para un mensajero podría ser:

```
creado ──► enviado ──► iniciado ──► llegado_a_recogida ──► artículos_cargados
              ▲                                                      │
              │                                                      ▼
       cancelado (terminal)                                    en tránsito
                                                                     │
                                                                     ▼
                                                          llegado_a_entrega
                                                                     │
                                                                     ▼
                                                          entregado  (complete: true)
                                                          (pod_method: signature,
                                                           require_pod: true)
```

La bandera
`complete: true`
en
`entregado`
es lo que finaliza la orden — la actividad no tiene que llamarse
`completado`.

## Configurar el Flujo

Abre el
**Editor de Configuración de Órdenes**
y cambia a la pestaña
**Flujo de Actividades**.

### Ver el flujo actual

El editor renderiza el gráfico de actividades. Cada nodo es una actividad; las flechas representan las transiciones definidas en el array
`activities`
de cada actividad.

### Agregar una actividad

Haz clic en
**+ Agregar Actividad**. Establece el
`code`,
`status`
(etiqueta de visualización),
`color`
y
`details`. El editor conecta la nueva actividad al gráfico agregando su
`code`
a las transiciones de otra actividad.

### Configurar el POD por actividad

En cualquier actividad, establece
`pod_method`
(uno de
`scan`,
`signature`
o
`photo`) y activa
`require_pod`. Cuando
`require_pod`
está activado, el conductor no puede ejecutar la actividad en Navigator sin capturar el POD primero.

### Marcar la actividad de finalización

Activa
`complete: true`
en la actividad que debe finalizar la orden — normalmente el paso final de entrega / aprobación / transferencia. Se pueden usar varias actividades para llevar la bandera (por ejemplo, una para
*entregado*, otra para
*rechazado y devuelto*); cualquiera que se ejecute primero finaliza la orden.

### Agregar condiciones de lógica (opcional)

Agrega un bloque de lógica para hacer que una actividad sea condicional — por ejemplo, mostrar
*Recoger COD*
solo si
`order.cod_amount > 0`. Consulte
[Condiciones de lógica](#logic-conditions).

### Agregar eventos (opcional)

Adjunta eventos que se disparan cuando se alcanza la actividad — webhooks para sistemas externos, notificaciones para clientes, alertas push. Consulte
[Eventos](#events).

### Guardar

Haz clic en
**Guardar Configuración**. La configuración actualizada se aplica a las órdenes creadas contra esta configuración a partir de este momento.

## Condiciones de Lógica

Los bloques de lógica hacen que una actividad sea condicional. Cada bloque tiene un
`type`
y una lista de
`conditions`:

| Tipo | Comportamiento |
|---|---|
| `and` | Todas las condiciones deben ser verdaderas |
| `or` | Al menos una condición debe ser verdadera |
| `not` | Ninguna condición puede ser verdadera |
| `if` | La única condición debe ser verdadera |

Las condiciones evalúan contra la orden actual — recogida, entrega, estado, atributos del contenido y campos personalizados.

## Eventos

Los eventos se disparan cuando se alcanza una actividad. Se configuran por actividad:

* **Webhooks**
  — Envío de una solicitud POST HTTP a un punto final de webhook registrado con los datos de la orden y el evento de la actividad
* **Notificaciones**
  — Alertas push, SMS o por correo electrónico para clientes, conductores o operadores

Los eventos se disparan después de que se haya completado la actividad y después de que se haya capturado el POD requerido.

## Flujos de Actividades vs Códigos de Actividad

Algunos códigos de actividad están reservados por el marco de estado del sistema:
`creado`,
`enviado`,
`iniciado`,
`cancelado`
y (cuando se usa como destino de transición)
`completado`. Estas actividades existen en cada flujo y impulsan el estado del sistema de la orden. Cualquier actividad que tenga
`complete: true`
también moverá el estado del sistema de la orden a
`completado`
independientemente de su código, lo que permite dar al paso de finalización un nombre apropiado para el dominio (
*entregado*,
*aprobado*,
*transferido*, etc.) mientras se mantiene el marco de estado del sistema.

Consulte
[Ciclo de vida de la orden](https://fleetbase.io/docs/fleet-ops/operations/orders/order-lifecycle)
para la relación entre los estados del sistema y los flujos de actividades.

## Actividades de Punto de Control

Para órdenes con múltiples paradas, cada punto de control puede ejecutar su propio subconjunto de actividades — por ejemplo,
*llegado a la parada*,
*artículos entregados en la parada*,
*firma capturada*. Los puntos de control mantienen su propio POD y progreso de forma independiente, mientras que el flujo de la orden avanza una vez que todos los puntos de control han completado sus actividades requeridas.

[Tipos de Órdenes
Crea y gestiona tipos de órdenes personalizados: define campos de entidad, restricciones y categorías de servicio para cada configuración de orden.](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/order-types)
[Tasas de Servicio
Define las reglas de precios y las estructuras de tarifas utilizadas para calcular los costes de la orden: tarifas fijas, basadas en la distancia, basadas en el peso, tarifas por zona y cargos adicionales.](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)