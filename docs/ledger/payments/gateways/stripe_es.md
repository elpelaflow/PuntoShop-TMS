---
título: "Stripe"
url: https://fleetbase.io/docs/ledger/payments/gateways/stripe
módulo: ledger
---

Pasarelas de Pago

# Stripe

Configure Stripe para realizar pagos con tarjetas, carteras digitales, webhooks, reembolsos y pagos en línea en Ledger.

# Stripe

Stripe es la pasarela de tarjetas y carteras digitales de Ledger para la recaudación de pagos a nivel mundial. Úsela para pagos en línea, métodos de pago guardados, reembolsos de tarjetas, intenciones de pago y flujos de pago recurrentes.

## Configuración

| Campo | Descripción |
|---|---|
| **Clave Pública** | `pk_test_...` o `pk_live_...` |
| **Clave Secreta** | `sk_test_...` o `sk_live_...` |
| **Secreto de Firma de Webhooks** | `whsec_...` de la página de control de Stripe -> Webhooks |
| **Mostrar Código Postal** | Si el campo de la tarjeta requiere un código postal |
| **Pago iDEAL** | Habilite iDEAL para los mercados compatibles |
| **Pago FPX** | Habilite FPX para los mercados compatibles |

## Webhooks

Registre la URL del webhook de Ledger que se muestra en el formulario de la pasarela en la página de control de Stripe. Stripe utiliza el secreto de firma de webhooks para que Ledger pueda verificar los eventos antes de registrarlos.

Ledger utiliza los webhooks de Stripe para confirmar eventos de pago y reembolso, como cargos exitosos, cargos fallidos y cargos reembolsados. Los eventos duplicados se eliminan mediante el registro de transacciones de la pasarela.

## Pruebas

Utilice
`sandbox`
al probar con las claves de prueba de Stripe y cambie a
`live`
solo después de haber verificado los webhooks. Mantenga las credenciales de prueba y de producción en registros o entornos separados para que el tráfico de producción nunca utilice las claves de sandbox.