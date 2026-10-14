---
título: "QPay"
url: https://fleetbase.io/docs/ledger/payments/gateways/qpay
módulo: ledger
---

Pasarelas de Pago

# QPay

Configure QPay para realizar pagos a bancos mongoles a través de Ledger.

# QPay

QPay es la pasarela de Ledger basada en facturas para pagos a bancos mongoles. Úselo cuando los clientes realicen pagos a través de aplicaciones bancarias mongoles compatibles y Ledger necesite rastrear el pago de la factura a través del registro de transacciones de la pasarela.

## Configuración

| Campo | Descripción |
|---|---|
| **Nombre de usuario** | Nombre de usuario de QPay |
| **Contraseña** | Contraseña de QPay |
| **Código de factura** (`invoice_code`) | Código del tipo de factura de QPay |

## Flujo de Pago

Ledger crea una factura de QPay, proporciona los detalles del pago al cliente y registra las transacciones de la pasarela para el ciclo de vida del pago. Cuando esté disponible la confirmación de QPay, Ledger utiliza la respuesta del conductor y el manejo de webhooks para actualizar el estado del pago de la factura.

## Pruebas

Configure las credenciales de sandbox de QPay por separado de las credenciales de producción. Mantenga la pasarela en modo `sandbox` hasta que se haya verificado la creación de la factura, la confirmación del pago y el manejo de reembolsos con la cuenta del comerciante.