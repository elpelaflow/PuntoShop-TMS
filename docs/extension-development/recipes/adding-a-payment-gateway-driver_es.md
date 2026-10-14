---
title: "Añadir un Controlador de Pasarela de Pago"
url: https://fleetbase.io/docs/extension-development/recipes/adding-a-payment-gateway-driver
module: extension-development
---

# Añadir un Controlador de Pasarela de Pago

Integre una nueva pasarela de pago (PayPal, Razorpay, etc.) en Ledger extendiendo `AbstractGatewayDriver` y registrándolo con `PaymentGatewayManager`.

# Añadir un Controlador de Pasarela de Pago

La
Ledger
utiliza un patrón de controlador basado en Laravel
[`Manager`](https://laravel.com/api/11.x/Illuminate/Support/Manager.html)
para pasarelas de pago. Los controladores Stripe, QPay y Cash se envían por defecto; los controladores de terceros se registran mediante
`PaymentGatewayManager::extend()`
.

## ¿Qué implementa un Controlador?

El contrato es
`Fleetbase\Ledger\Contracts\GatewayDriverInterface`
. La clase base abstracta
`AbstractGatewayDriver`
cubre la mayor parte; solo necesitas completar los métodos específicos de la pasarela.

| Método | ¿Qué hace? |
| --- | --- |
| `getName()` / `getCode()` | Nombre + código de máquina seguro para URL |
| `getCapabilities()` | Array de `'purchase'`, `'refund'`, `'tokenization'`, `'webhooks'`, `'sandbox'`, `'recurring'`, etc. |
| `getConfigSchema()` | Esquema de formulario renderizado al configurar la pasarela |
| `initialize($config, $sandbox)` | Recibe la configuración descifrada — gestionada por `AbstractGatewayDriver` |
| `purchase(PurchaseRequest $req)` | Cobrar al cliente |
| `refund(RefundRequest $req)` | Devolver una transacción |
| `handleWebhook(Request $req)` | Procesar eventos de webhook entrantes |
| `createPaymentMethod($data)` | Tokenizar/guardar un método de pago (si está soportado) |

## 1. Implementar el Controlador

```
<?php
// server/src/Gateways/PaypalDriver.php

namespace MyOrg\MyExtension\Gateways;

use Fleetbase\Ledger\DTO\GatewayResponse;
use Fleetbase\Ledger\DTO\PurchaseRequest;
use Fleetbase\Ledger\DTO\RefundRequest;
use Fleetbase\Ledger\Gateways\AbstractGatewayDriver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaypalDriver extends AbstractGatewayDriver
{
    public function getName(): string
    {
        return 'PayPal';
    }

    public function getCode(): string
    {
        return 'paypal';
    }

    public function getCapabilities(): array
    {
        return ['purchase', 'refund', 'webhooks', 'sandbox'];
    }

    public function getConfigSchema(): array
    {
        return [
            ['key' => 'client_id',     'label' => 'Client ID',     'type' => 'text',     'required' => true],
            ['key' => 'client_secret', 'label' => 'Client Secret', 'type' => 'password', 'required' => true],
        ];
    }

    public function purchase(PurchaseRequest $request): GatewayResponse
    {
        $token = $this->getAccessToken();

        $response = Http::withToken($token)
            ->baseUrl($this->host())
            ->post('/v2/checkout/orders', [
                'intent'         => 'CAPTURE',
                'purchase_units' => [[
                    'amount' => [
                        'currency_code' => $request->currency,
                        'value'         => sprintf('%.2f', $request->amount / 100),
                    ],
                    'reference_id' => $request->reference,
                ]],
            ])
            ->throw();

        $data = $response->json();

        return new GatewayResponse(
            success:   true,
            reference: $data['id'],
            raw:       $data,
        );
    }

    public function refund(RefundRequest $req): GatewayResponse
    {
        $token = $this->getAccessToken();

        $response = Http::withToken($token)
            ->baseUrl($this->host())
            ->post("/v2/payments/captures/{$request->transactionReference}/refund", [
                'amount' => [
                    'currency_code' => $request->currency,
                    'value'         => sprintf('%.2f', $request->amount / 100),
                ],
            ])
            ->throw();

        return new GatewayResponse(
            success:   true,
            reference: $response->json('id'),
            raw:       $response->json(),
        );
    }

    public function handleWebhook(Request $req): GatewayResponse
    {
        $event = $request->input('event_type');

        return match ($event) {
            'PAYMENT.CAPTURE.COMPLETED' => $this->handleCaptureCompleted($request),
            'PAYMENT.CAPTURE.REFUNDED'  => $this->handleRefundCompleted($request),
            default                      => GatewayResponse::ignored($event),
        };
    }

    protected function host(): string
    {
        return $this->sandbox
            ? 'https://api-m.sandbox.paypal.com'
            : 'https://api-m.paypal.com';
    }

    protected function getAccessToken(): string
    {
        return Http::withBasicAuth($this->config['client_id'], $this->config['client_secret'])
            ->asForm()
            ->baseUrl($this->host())
            ->post('/v1/oauth2/token', ['grant_type' => 'client_credentials'])
            ->json('access_token');
    }

    protected function handleCaptureCompleted(Request $request): GatewayResponse { /* ... */ }
    protected function handleRefundCompleted(Request $request): GatewayResponse { /* ... */ }
}
```

## 2. Registrar el Controlador

En el proveedor de su extensión, al iniciar:

```
<?php
// server/src/Providers/MyExtensionServiceProvider.php

use Fleetbase\Ledger\PaymentGatewayManager;
use MyOrg\MyExtension\Gateways\PaypalDriver;

public function boot()
{
    parent::boot();

    $this->app->afterResolving(PaymentGatewayManager::class, function (PaymentGatewayManager $manager) {
        $manager->extend('paypal', fn ($app) => $app->make(PaypalDriver::class));
    });
}
```

El hook
`afterResolving`
se integra con el contenedor de Laravel para registrar el controlador justo cuando se solicita el gestor, de forma segura en el orden de inicio.

### Superficiando el Controlador en la Interfaz de Usuario

Ledger renderiza el formulario "Añadir Pasarela de Pago" a partir de
`PaymentGatewayManager::getDriverManifest()`
, que itera
`getRegisteredDriverCodes()`
. Para añadir su controlador a esa lista, deberá:

1.  Enviar una pequeña PR a Ledger para añadir
    `'paypal'`
    a
    `getRegisteredDriverCodes()`
    — preferible para controladores ampliamente utilizados de terceros
2.  Sobreescribir
    `PaymentGatewayManager`
    en su contenedor con una subclase que añada su código

La opción 1 es más sencilla. La opción 2 se ve así:

```
$this->app->extend(PaymentGatewayManager::class, function (PaymentGatewayManager $manager) {
    return new class($manager) extends PaymentGatewayManager {
        public function getRegisteredDriverCodes(): array
        {
            return [...parent::getRegisteredDriverCodes(), 'paypal'];
        }
    };
});
```

## 3. Punto de Extracción

Ledger envía un controlador de webhook genérico que llama a
`handleWebhook()`
en el controlador que coincide con la URL:

```
/ledger/webhooks/paypal
```

Configure esa URL en el panel de control de PayPal, con los eventos que maneje.

## 4. Probar en la Consola

En la configuración de Ledger, "Añadir Pasarela de Pago" ahora ofrece PayPal. El formulario lee
`getConfigSchema()`
; la entrada del usuario se cifra y se guarda en un modelo
`Gateway`
. Desde cualquier punto de código:

```
use Fleetbase\Ledger\PaymentGatewayManager;
use Fleetbase\Ledger\DTO\PurchaseRequest;

$manager = app(PaymentGatewayManager::class);
$paypal  = $manager->gateway('paypal');

$response = $paypal->purchase(new PurchaseRequest(
    amount: 5000, // cents
    currency: 'USD',
    reference: $invoice->public_id,
));
```

## Referencia

*   `ledger/server/src/Contracts/GatewayDriverInterface.php`
    — contrato completo
*   `ledger/server/src/Gateways/AbstractGatewayDriver.php`
    — extienda esto
*   `ledger/server/src/Gateways/StripeDriver.php`
    — controlador de referencia completo con tokenización
*   `ledger/server/src/PaymentGatewayManager.php`
    — registro mediante
    `extend()`
*   [Laravel
    `Manager`
    API](https://laravel.com/api/11.x/Illuminate/Support/Manager.html)
    — patrón de controlador de nivel superior

[Añadir un Proveedor Integrado

Conecte un proveedor de logística de terceros a Fleet-Ops como un Proveedor Integrado seleccionable — formulario de credenciales, puente de API, callbacks de ciclo de vida y enrutamiento de webhooks.](https://fleetbase.io/docs/extension-development/recipes/adding-an-integrated-vendor)
[Añadir un Proveedor de SMS

Integre un nuevo proveedor de SMS en la plataforma como un proveedor de SMS — implemente un remitente, conéctelo a través de la configuración y rote los prefijos de número de teléfono específicos a él.](https://fleetbase.io/docs/extension-development/recipes/adding-a-sms-provider)