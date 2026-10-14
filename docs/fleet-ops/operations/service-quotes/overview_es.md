---
título: "Presupuestos de servicios"
url: https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview
módulo: fleet-ops
---

Presupuestos de servicios

# Presupuestos de servicios

Generar y gestionar presupuestos de servicios para pedidos: cómo se calculan, presentan y vinculan a las transacciones.

# Presupuestos de servicios

A
**Presupuesto de servicios**
es una estimación de precio generada para un pedido, basada en tarifas de servicios correspondientes. Los presupuestos se generan cuando los detalles de origen, destino, tipo y carga de un pedido coinciden con una tarifa configurada. Pueden presentarse a los clientes antes de confirmar un pedido, y los presupuestos aceptados se vinculan a las transacciones.

![Lista de presupuestos de servicios — ID de presupuesto, referencia del pedido, importe, moneda y fecha de caducidad](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-quotes.58c91d4a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Cómo se generan los presupuestos

Cuando se crea o actualiza un pedido, Fleet-Ops evalúa todas las tarifas de servicios para encontrar coincidencias basadas en:

* El origen y destino del pedido (área de servicio y zona)
* El tipo de pedido (Configuración del pedido)
* El peso y el volumen de la carga del pedido (para tarifas basadas en peso/volumen)
* El importe del pago en efectivo al entregar (para tarifas habilitadas para pago en efectivo)
* La hora actual (para tarifas de horas pico)

Si se encuentra una tarifa correspondiente, se genera un presupuesto de servicios con:

* **Importe**
  — el total calculado, incluyendo la tarifa base, el componente de distancia y los cargos adicionales
* **Moneda**
  — de la configuración de moneda de la tarifa de servicios
* **Fecha de caducidad**
  — los presupuestos caducan después de un período configurable (por ejemplo, 30 minutos) para evitar precios obsoletos

## Ver los presupuestos en un pedido

Los presupuestos activos para un pedido aparecen en el
**Panel de detalles del pedido**
en la sección
**Presupuesto**. El panel muestra:

* El importe y la moneda calculados
* La tarifa aplicada
* La hora de caducidad del presupuesto
* Un
  **Aceptar**
  botón si el cliente necesita confirmar antes del envío

## Flujo de trabajo del presupuesto

### Presupuesto automático (gestionado por el operador)

Para operaciones internas donde los precios no son para el cliente:

1. Se crea el pedido → se genera el presupuesto automáticamente
2. El operador revisa el presupuesto en los detalles del pedido
3. Se envía el pedido — el presupuesto se adjunta al registro de la transacción

### Presupuesto para el cliente (API y Portales Externos)

Para portales de clientes e integraciones de API:

1. El cliente envía una solicitud de pedido con detalles de la carga
2. La API devuelve los presupuestos disponibles para que el cliente elija
3. El cliente selecciona un presupuesto y lo confirma
4. Se crea el pedido con el presupuesto seleccionado vinculado

## Generar presupuestos a través de la API

El punto final de presupuestos de servicios es una
**consulta**
— acepta una descripción de ruta y devuelve todos los presupuestos aplicables.

```
GET /v1/service-quotes
Authorization: Bearer flb_live_...
```

Parámetros de consulta aceptados:

| Parámetro | Descripción |
|---|---|
| `payload` | ID público de una carga existente para la que se debe generar el presupuesto |
| `pickup` / `dropoff` | Ubicaciones de recogida y entrega en línea (se utilizan cuando no se proporciona una carga) |
| `waypoints` | Array de puntos de ruta para presupuestos de múltiples paradas (se utilizan cuando no se proporciona una carga) |
| `service_type` | Filtro para un tipo de servicio específico |
| `facilitator` | ID público de un proveedor, proveedor integrado o facilitador de contacto |
| `scheduled_at` | Hora programada (se utiliza para la coincidencia de horas pico) |
| `cod` | Importe del pago en efectivo al entregar (coincide con tarifas habilitadas para pago en efectivo) |
| `currency` | Código de moneda de 3 caracteres |
| `distance` / `time` | Distancia/tiempo precalculados, cuando no desea que la API los recalcule |

La respuesta es una lista de presupuestos coincidentes, cada uno con
`service_rate_uuid`
,
`amount`
,
`currency`
y
`expired_at`
.

## Caducidad del presupuesto

Los presupuestos tienen un tiempo de caducidad configurable. Después de la caducidad, el presupuesto ya no es válido y debe generarse de nuevo. Esto evita que los clientes se comprometan con un precio que puede haber cambiado (por ejemplo, después de que terminen las horas pico o si cambia la carga).

## Múltiples presupuestos

Cuando varias tarifas de servicios coinciden con un pedido, Fleet-Ops puede generar múltiples presupuestos: uno por cada tarifa correspondiente. Esto permite a los clientes elegir entre diferentes niveles de servicio (por ejemplo, Estándar vs. Express). El cliente selecciona su presupuesto preferido antes de confirmar el pedido.

## Integración de pagos

Los presupuestos aceptados se pueden conectar a una pasarela de pagos (Stripe) para cobrar a los clientes en línea. Cuando se configuran los ajustes de pago en
**Fleet-Ops → Settings → Payments**
, los presupuestos aceptados generan una URL de sesión de pago que se puede compartir con el cliente o incrustar en un portal de cliente.

Consulte
[Settings → Payments](https://fleetbase.io/docs/fleet-ops/settings/payments)
para la configuración de la integración de pagos.