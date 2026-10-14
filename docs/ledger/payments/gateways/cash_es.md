---
título: "Efectivo"
url: https://fleetbase.io/docs/ledger/payments/gateways/cash
módulo: ledger
---

Pasarelas de Pago

# Efectivo

Configure la pasarela de pago "Efectivo" para la recogida manual y fuera de línea en Ledger.

# Efectivo

La pasarela de pago "Efectivo" registra la recogida manual o fuera de línea de pagos sin necesidad de contactar a un procesador externo. Úsela cuando un operador recoge efectivo, confirma de transferencia bancaria, pago por cheque o cualquier otro recibo fuera de línea y necesita que Ledger registre el pago de la factura.

## Configuración

| Campo | Descripción |
|---|---|
| **Etiqueta** | Etiqueta opcional que se muestra a los operadores |
| **Instrucciones** | Instrucciones de pago opcional que se muestran a los clientes o al personal |

## Comportamiento

"Efectivo" admite compras y reembolsos desde la perspectiva de Ledger, pero no proporciona un sistema de pago alojado, webhooks, tokenización ni verificación de liquidación. Los operadores son responsables de confirmar que el dinero se ha recogido antes de registrar el pago.

Aún se crea la transacción y el registro en Ledger, por lo que los informes y los saldos de las facturas permanecen consistentes con otras pasarelas.