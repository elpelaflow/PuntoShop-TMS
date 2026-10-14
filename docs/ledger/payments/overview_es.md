---
title: "Pagos y Transacciones"
url: https://fleetbase.io/docs/ledger/payments/overview
module: ledger
---

# Pagos y Transacciones

Realice pagos digitales, gestione carteras digitales y rastree todas las transacciones financieras dentro de su ecosistema Fleetbase.

# Pagos y Transacciones

El
**módulo de Pagos**
abarca tres áreas interconectadas: pasarelas de pago para procesar dinero real, carteras para rastrear saldos internos y transacciones como el registro inmutable de cada movimiento de cartera.

Vaya a
**Libro Mayor → Pagos**
para acceder a las pasarelas, carteras y transacciones.

## Componentes Clave

### Pasarelas de Pago

Procesadores de pago externos:
**GNU Taler**,
**Stripe**,
**Cash**
y
**QPay**
- integrados con credenciales encriptadas y entornos
`sandbox`
/
`live`. Todos los cuatro controladores admiten las capacidades de
`compra`
y
`reembolso`. GNU Taler añade URIs de pago de carteras, webhooks seguros para el inquilino, URIs de reembolso y comprobaciones de liquidación; Stripe añade tokenización, intenciones de configuración, sesiones de pago, webhooks y pagos recurrentes. Cada interacción con la pasarela se registra como
`GatewayTransaction`
para garantizar la idempotencia y la auditoría. Consulte
[Pasarelas de Pago](https://fleetbase.io/docs/ledger/payments/gateways/overview)
.

### Carteras

Cuentas de saldo digital vinculadas a controladores, clientes, su empresa o usuarios individuales. Cada operación de cartera (
`crédito`,
`recargar`,
`transferencia`,
`pago`) crea una o más entradas en el libro mayor, manteniendo la integridad de doble entrada. Las carteras pueden congelarse para bloquear todas las operaciones. Consulte
[Carteras](https://fleetbase.io/docs/ledger/payments/wallets)
.

### Transacciones

El registro completo e inmutable de cada movimiento de cartera. Las transacciones nunca se editan ni se eliminan; son el registro de auditoría completo para el cumplimiento y la conciliación. Consulte
[Transacciones](https://fleetbase.io/docs/ledger/payments/transactions)
.

## Un Ciclo de Pago Típico

```
El cliente paga a través de GNU Taler, Stripe, Cash o QPay
  → Se registra la `GatewayTransaction` (verificación de idempotencia)
    → Se activa el evento `PaymentSucceeded`
      → Se crea una transacción en el Libro Mayor (dirección de crédito)
        → Se publica una entrada en el libro mayor por el servicio correspondiente
          (factura → pago_de_factura / cartera → general / orden → liquidacion_de_orden)
```

Las entradas en el libro mayor exactas varían según la fuente; consulte los ejemplos por flujo en
[Carteras](https://fleetbase.io/docs/ledger/payments/wallets)
y
[Facturas](https://fleetbase.io/docs/ledger/billing/invoices)
.

## Seguridad de Webhooks

Las pasarelas con capacidad de webhook envían notificaciones de confirmación de transacciones. Cada controlador verifica los payloads del proveedor antes de procesar: Stripe valida los eventos firmados, QPay utiliza su propia verificación del controlador y GNU Taler requiere una enrutamiento preciso para el inquilino con
`order_id`,
`company_uuid`
y un identificador de pasarela. Las notificaciones de webhook duplicadas se eliminan utilizando
`GatewayTransaction::isProcessed()`
- una verificación de
`(gateway_reference_id, event_type)`
- para garantizar que cada evento se procese exactamente una vez.

## Múltiples Monedas

Las carteras están denominadas en una sola moneda. Si opera en múltiples monedas, cree carteras separadas para cada moneda. Los registros de transacciones incluyen los campos
`tasa_de_cambio`,
`moneda_liquidada`
y
`monto_liquidado`
para la conciliación multimoneda.