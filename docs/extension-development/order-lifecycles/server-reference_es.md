---
title: "Referencia del Servidor"
url: https://fleetbase.io/docs/extension-development/order-lifecycles/server-reference
module: extension-development
---

Ciclos de Vida de Pedidos

# Referencia del Servidor

Los métodos `OrderConfig` y `Order` que leen un ciclo de vida configurado, y las partes de Fleet-Ops que aún no aplican ciclos de vida.

# Referencia del Servidor

## OrderConfig

`Fleetbase\FleetOps\Models\OrderConfig`
lee el ciclo de vida utilizando estos métodos. Todos funcionan para configuraciones sin ciclo de vida, devolviendo la respuesta del ciclo de vida de envío.

| Método | Devuelve |
|---|---|
| `lifecycle()` | `meta.lifecycle` , o `[]` |
| `hasConfiguredLifecycle()` | Indica si `meta.lifecycle` está configurado |
| `getInitialActivity()` | La actividad `initial`; sin ciclo de vida, la actividad `created` |
| `getInitialStatusCode()` | `initial` , o `created` |
| `getCompletedActivity()` | La actividad `completed`, recurriendo al `completed` del flujo |
| `getCanceledActivity()` | La actividad `canceled`, recurriendo al `canceled` del flujo |
| `allowsDispatch()` | `false` solo cuando `dispatch` es `false` (o `'false'` , `0` , `'0'` ) |
| `hasStrictTransitions()` | `strict_transitions` |
| `getTerminalActivityCodes()` | `terminal` más los códigos `completed` y `canceled`; sin ciclo de vida, `['completed', 'canceled']` |
| `isTerminalActivityCode($code)` | Indica si `$code` es un código terminal |
| `canTransition($from, $to)` | Indica si `$to` está listado en la actividad `$from`, y si `$from` no es un código terminal. Se consulta solo el flujo, independientemente de lo que diga `strict_transitions` |
| `getActivityByCode($code)` | La actividad con ese código, o `null` |

## Order

| Método | Devuelve |
|---|---|
| `config()` | La `OrderConfig` del pedido, o `null` |
| `getInitialTrackingStatus()` | El primer estado de seguimiento para un nuevo pedido con ciclo de vida, como `['code', 'status', 'details']`, o `null` para usar el valor predeterminado |

## Limitaciones

Estas partes de Fleet-Ops aún no aplican ciclos de vida:

| Parte | Asume |
|---|---|
| La API REST pública ( `/v1/orders` ) | Los pedidos comienzan en `created`; las actualizaciones de envío y actividad siguen el ciclo de vida de envío |
| La aplicación Navigator | Los códigos `created`, `dispatched` y `started` |
| El filtro "Activo" en la lista de pedidos | Los códigos activos del ciclo de vida de envío |
| Los pedidos activos en el mapa en vivo | Los códigos activos del ciclo de vida de envío |
| Métricas y conteos del panel de control de pedidos | Los códigos del ciclo de vida de envío |

Los pedidos con un ciclo de vida configurado pueden no estar presentes en estos, o pueden contarse de manera diferente. Tenga esto en cuenta si los usuarios de su tipo de pedido dependen de ellos.

## Fuente

| Archivo |  |
|---|---|
| `server/src/Models/OrderConfig.php` | Los métodos del ciclo de vida |
| `server/src/Http/Controllers/Internal/v1/OrderController.php` | Crear, enviar y actualizar la actividad |
| `server/src/Models/TrackingNumber.php` | El primer estado de seguimiento |