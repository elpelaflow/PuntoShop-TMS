---
Título: "Pasarelas de pago"
URL: https://fleetbase.io/docs/ledger/payments/gateways/overview
Módulo: ledger
---

Pasarelas de pago

# Pasarelas de pago

Configure las pasarelas de pago GNU Taler, Stripe, Cash y QPay en Ledger.

# Pasarelas de pago

**Pasarelas de pago**
conecta Ledger con los servicios que gestionan, confirman, reembolsan y auditan los pagos. Ledger incluye controladores para
**GNU Taler**
,
**Stripe**
,
**Cash**
y
**QPay**
, y expone
`PaymentGatewayManager::extend()`
para registrar controladores personalizados.

Navega a
**Ledger -> Pagos -> Pasarelas**
.

![Detalles de la pasarela de pago - controlador, entorno, credenciales y URL de webhook](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-payment-gateway-details.dcfed23e.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Pasarelas de pago compatibles

| Pasarela | Controlador | Caso de uso |
|---|---|---|
| [GNU Taler](https://fleetbase.io/docs/ledger/payments/gateways/gnu-taler) | `taler` | Pagos en efectivo digitales basados en billetera, reembolsos, webhooks seguros para inquilinos y comprobaciones de liquidación |
| [Stripe](https://fleetbase.io/docs/ledger/payments/gateways/stripe) | `stripe` | Pagos con tarjeta, billeteras digitales, proceso de pago alojado, suscripciones y adquisición global |
| [Cash](https://fleetbase.io/docs/ledger/payments/gateways/cash) | `cash` | Recopilación de pagos manuales o fuera de línea sin un procesador externo |
| [QPay](https://fleetbase.io/docs/ledger/payments/gateways/qpay) | `qpay` | Pagos basados en facturas para bancos mongoles |

## Capacidades de la pasarela de pago

Cada controlador anuncia las operaciones que soporta. Verifica las capacidades antes de invocar una operación.

| Capacidad | GNU Taler | Stripe | Cash | QPay |
|---|---|---|---|---|
| `purchase` | Sí | Sí | Sí | Sí |
| `refund` | Sí | Sí | Sí | Sí |
| Flujo de pago con o sin tarjeta | Sí | Sí | No | Sí |
| Confirmación de webhook | Sí | Sí | No | Sí |
| URI de reembolso o transferencia de reembolso al cliente | Sí | No | No | No |
| Verificación de liquidación | Sí | Parcial | No | Parcial |
| `tokenization` | No | Sí | No | No |
| `setup_intent` | No | Sí | No | No |
| `checkout_session` | No | Sí | No | No |
| `sandbox` | Sí | Sí | No | Sí |
| `recurring` | No | Sí | No | No |

![Pasarelas de pago — paneles de preparación de la pasarela, pasarelas conectadas con controlador y entorno, y catálogo de pasarelas compatibles](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-gateways-list.95cb5fa6.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Agregar una pasarela de pago

Navega a
**Ledger -> Pagos -> Pasarelas**
.

Haz clic en
**Nueva pasarela**
.

Introduce un
**Nombre**
y selecciona el controlador:
`taler`
,
`stripe`
,
`cash`
o
`qpay`
.

Completa los campos que se muestran en el esquema de configuración del controlador.

Establece
**Entorno**
en
`sandbox`
para pruebas y
`live`
para producción. El valor booleano
`is_sandbox`
se mantiene sincronizado automáticamente.

Haz clic en
**Guardar**
.

El formulario también expone campos opcionales de
**URL de retorno**
y
**URL de webhook**
. Para controladores compatibles con webhooks, Ledger muestra la URL de webhook generada que debe registrarse con la pasarela externa.

## Seguridad

Las credenciales de la pasarela son:

* Almacenadas encriptadas en reposo utilizando el tipo de dato `encrypted:array` de Laravel contra tu
  `APP_KEY`
* Nunca expuestas en las respuestas de la API
* Se desencriptan solo en memoria cuando se ejecuta una operación de pago
* Se limitan a la empresa que posee el registro de la pasarela

## Registro de auditoría de transacciones de la pasarela de pago

Cada interacción con la pasarela se registra como una
`GatewayTransaction`
: intentos de compra, confirmaciones de pago, reembolsos, webhooks y comprobaciones de liquidación. El registro también es el almacén de idempotencia para el procesamiento de webhooks.

Visualiza el registro para cualquier pasarela:

1. Abre la pasarela en Ledger.
2. Haz clic en la pestaña
   **Transacciones**
   .

El registro incluye el estado, el importe, el ID de referencia de la pasarela, la respuesta bruta del proveedor, los metadatos de evento normalizados y las marcas de tiempo de procesamiento. Para GNU Taler también incluye campos de enrutamiento para inquilinos, metadatos de URI de reembolso y detalles de liquidación o conciliación cuando estén disponibles.

## Extender con controladores personalizados

Registra un controlador personalizado de un proveedor de servicios:

```
use Fleetbase\Ledger\PaymentGatewayManager;

PaymentGatewayManager::extend('mygateway', function () {
    return new MyCustomDriver();
});
```

Tu clase de controlador implementa el contrato estándar de pasarela de pago (
`charge`
,
`refund`
,
`getCapabilities`
,
`getConfigSchema`
, etc.) y aparece en el selector de pasarelas una vez registrado.