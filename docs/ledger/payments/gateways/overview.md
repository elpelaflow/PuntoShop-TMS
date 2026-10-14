---
title: "Payment Gateways"
url: https://fleetbase.io/docs/ledger/payments/gateways/overview
module: ledger
---

Payment Gateways

# Payment Gateways

Configure GNU Taler, Stripe, Cash, and QPay payment gateways in Ledger.

# Payment Gateways

**Payment Gateways**
connect Ledger to the services that collect, confirm, refund, and audit payments. Ledger includes drivers for
**GNU Taler**
,
**Stripe**
,
**Cash**
, and
**QPay**
, and exposes
`PaymentGatewayManager::extend()`
for registering custom drivers.

Navigate to
**Ledger -> Payments -> Gateways**
.

![Payment gateway details - driver, environment, credentials, and webhook URL](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-payment-gateway-details.dcfed23e.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Supported Gateways

| Gateway | Driver | Use Case |
| --- | --- | --- |
| [GNU Taler](https://fleetbase.io/docs/ledger/payments/gateways/gnu-taler) | `taler` | Wallet-based digital cash payments, refunds, tenant-safe webhooks, and settlement checks |
| [Stripe](https://fleetbase.io/docs/ledger/payments/gateways/stripe) | `stripe` | Card payments, digital wallets, hosted checkout, subscriptions, and global acquiring |
| [Cash](https://fleetbase.io/docs/ledger/payments/gateways/cash) | `cash` | Manual or offline payment collection without an external processor |
| [QPay](https://fleetbase.io/docs/ledger/payments/gateways/qpay) | `qpay` | Invoice-based payments for Mongolian banks |

## Gateway Capabilities

Each driver advertises the operations it supports. Check capabilities before invoking an operation.

| Capability | GNU Taler | Stripe | Cash | QPay |
| --- | --- | --- | --- | --- |
| `purchase` | Yes | Yes | Yes | Yes |
| `refund` | Yes | Yes | Yes | Yes |
| Hosted or wallet payment flow | Yes | Yes | No | Yes |
| Webhook confirmation | Yes | Yes | No | Yes |
| Refund URI or customer refund handoff | Yes | No | No | No |
| Settlement verification | Yes | Partial | No | Partial |
| `tokenization` | No | Yes | No | No |
| `setup_intent` | No | Yes | No | No |
| `checkout_session` | No | Yes | No | No |
| `sandbox` | Yes | Yes | No | Yes |
| `recurring` | No | Yes | No | No |

![Payment Gateways — gateway readiness tiles, connected gateways with driver and environment, and the supported gateway catalogue](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-gateways-list.95cb5fa6.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Adding a Gateway

Navigate to
**Ledger -> Payments -> Gateways**
.

Click
**New Gateway**
.

Enter a
**Name**
and select the driver:
`taler`
,
`stripe`
,
`cash`
, or
`qpay`
.

Fill in the fields shown by the driver's configuration schema.

Set
**Environment**
to
`sandbox`
while testing and
`live`
for production. The boolean
`is_sandbox`
is kept in sync automatically.

Click
**Save**
.

The form also exposes optional
**Return URL**
and
**Webhook URL**
fields. For webhook-capable drivers, Ledger displays the generated webhook URL that should be registered with the external gateway.

## Security

Gateway credentials are:

* Stored encrypted at rest using Laravel's
  `encrypted:array`
  cast against your
  `APP_KEY`
* Never exposed in API responses
* Decrypted only in memory when a payment operation is executed
* Scoped to the company that owns the gateway record

## Gateway Transaction Audit Log

Every gateway interaction is logged as a
`GatewayTransaction`
: purchase attempts, payment confirmations, refunds, webhooks, and reconciliation checks. The log is also the idempotency store for webhook processing.

View the log for any gateway:

1. Open the gateway in Ledger.
2. Click the
   **Transactions**
   tab.

The log includes status, amount, gateway reference ID, raw provider response, normalized event metadata, and processing timestamps. For GNU Taler it also carries tenant routing fields, refund URI metadata, and settlement or reconciliation details when available.

## Extending with Custom Drivers

Register a custom driver from a service provider:

```
use Fleetbase\Ledger\PaymentGatewayManager;

PaymentGatewayManager::extend('mygateway', function () {
    return new MyCustomDriver();
});
```

Your driver class implements the standard payment gateway contract (
`charge`
,
`refund`
,
`getCapabilities`
,
`getConfigSchema`
, etc.) and appears in the gateway picker once registered.
