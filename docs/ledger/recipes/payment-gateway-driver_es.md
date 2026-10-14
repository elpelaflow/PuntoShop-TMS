```
<?php

namespace MyCompany\Ledger\Gateways;

use Fleetbase\Ledger\DTO\GatewayResponse;
use Fleetbase\Ledger\DTO\PurchaseRequest;
use Fleetbase\Ledger\DTO\RefundRequest;
use Fleetbase\Ledger\Exceptions\WebhookSignatureException;
use Fleetbase\Ledger\Gateways\AbstractGatewayDriver;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class PaypalDriver extends AbstractGatewayDriver
{
    private const HOST_PRODUCTION = 'https://api-m.paypal.com';
    private const HOST_SANDBOX    = 'https://api-m.sandbox.paypal.com';

    protected ?Client $client = null;

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
            [
                'key'      => 'client_id',
                'label'    => 'Client ID',
                'type'     => 'text',
                'required' => true,
                'hint'     => 'Your PayPal REST app client ID.',
            ],
            [
                'key'      => 'client_secret',
                'label'    => 'Client Secret',
                'type'     => 'password',
                'required' => true,
                'hint'     => 'Your PayPal REST app secret. Never expose publicly.',
            ],
            [
                'key'      => 'webhook_id',
                'label'    => 'Webhook ID',
                'type'     => 'text',
                'required' => false,
                'hint'     => 'PayPal Webhook ID, used to verify signatures.',
            ],
        ];
    }

    public function initialize(array $config, bool $sandbox = false): static
    {
        parent::initialize($config, $sandbox);

        $this->client = new Client([
            'base_uri'    => $sandbox ? self::HOST_SANDBOX : self::HOST_PRODUCTION,
            'http_errors' => false,
            'headers'     => ['Accept' => 'application/json'],
        ]);

        return $this;
    }

    // purchase(), refund(), handleWebhook() implemented below…
}
```

A few notes:

* **`getCode()`**
  drives both the gateway picker dropdown
  **and**
  the webhook URL:
  `/ledger/webhooks/paypal`
  . Pick a code that's lowercase, URL-safe, and unique.
* **`getConfigSchema()`**
  returns the field definitions for the form in
  **Ledger → Settings → Gateways → New Gateway**
  . Supported
  `type`
  values:
  `text`
  ,
  `password`
  ,
  `boolean`
  ,
  `select`
  ,
  `textarea`
  . For
  `select`
  , include an
  `options`
  array of
  `{ key, label }`
  .
* **`initialize()`**
  is called after the manager loads and decrypts the
  `Gateway`
  row's stored config. The first thing it does in the parent class is set
  `$this->config`
  and
  `$this->sandbox`
  . Always call
  `parent::initialize()`
  first.
* The decrypted config is stored encrypted at rest using Laravel's
  `encrypted:array`
  cast against your
  `APP_KEY`
  .

## Step 2 — Implement purchase()

`purchase()`
receives a
[`PurchaseRequest`](#purchaserequest-fields)
and must return a
[`GatewayResponse`](#gatewayresponse-anatomy)
. All amounts are integer
**minor currency units**
(cents for USD, etc.).

For an
**immediate-capture**
gateway (e.g. card-on-file flow):

```
public function purchase(PurchaseRequest $request): GatewayResponse
{
    try {
        $token = $this->fetchAccessToken();

        $response = $this->client->post('/v2/checkout/orders', [
            'headers' => ['Authorization' => "Bearer {$token}"],
            'json'    => [
                'intent'         => 'CAPTURE',
                'purchase_units' => [[
                    'amount' => [
                        'currency_code' => $request->currency,
                        'value'         => number_format($request->amount / 100, 2, '.', ''),
                    ],
                    'description' => $request->description,
                    'custom_id'   => $request->invoiceUuid,
                ]],
                'application_context' => [
                    'return_url' => $request->returnUrl ?? url('/'),
                    'cancel_url' => $request->cancelUrl ?? url('/'),
                ],
            ],
        ]);

        $body = json_decode((string) $response->getBody(), true);

        if ($response->getStatusCode() >= 400) {
            return GatewayResponse::failure(
                eventType: GatewayResponse::EVENT_PAYMENT_FAILED,
                message:   $body['message'] ?? 'PayPal order creation failed.',
                errorCode: $body['name'] ?? null,
                rawResponse: $body ?? [],
            );
        }

        // For redirect flows, return pending and surface the approve URL on $data.
        $approveUrl = collect($body['links'] ?? [])
            ->firstWhere('rel', 'approve')['href'] ?? null;

        $this->logInfo('PayPal order created', [
            'id'     => $body['id'] ?? null,
            'amount' => $request->amount,
        ]);

        return GatewayResponse::pending(
            gatewayTransactionId: $body['id'],
            eventType:   GatewayResponse::EVENT_PAYMENT_PENDING,
            message:     'Order created. Awaiting customer approval.',
            rawResponse: $body,
            data: [
                'order_id'    => $body['id'],
                'approve_url' => $approveUrl,
            ],
        );
    } catch (\Throwable $e) {
        $this->logError('PayPal purchase failed', ['error' => $e->getMessage()]);

        return GatewayResponse::failure(
            eventType: GatewayResponse::EVENT_PAYMENT_FAILED,
            message:   $e->getMessage(),
        );
    }
}
```

Patterns to lean on:

* **`GatewayResponse::pending()`**
  para flujos fuera del sitio / de redirección donde el cliente aún no ha realizado el pago. Incluye la URL de redirección en el
  `data`
  array — el código que llama la lee.
* **`GatewayResponse::success()`**
  cuando el gateway captura de forma sincrónica.
* **`GatewayResponse::failure()`**
  con una constante de evento normalizada y el código de error del gateway.
* Siempre rellena
  `gatewayTransactionId`
  — es la clave de idempotencia que utiliza el controlador del webhook para eliminar duplicados de eventos.
* Envía
  `$request->invoiceUuid`
  y
  `$request->orderUuid`
  como metadatos del lado del gateway si la API lo admite. Estos metadatos se envían de vuelta en el webhook para que puedas resolver el registro de origen.
* Utiliza
  `$this->logInfo()`
  y
  `$this->logError()`
  (proporcionados por
  `AbstractGatewayDriver`
  ) — escriben en el canal de registro
  `ledger`
  con tu código de controlador como prefijo.

## Paso 3 — Implementar refund()

```
public function refund(RefundRequest $request): GatewayResponse
{
    try {
        $token = $this->fetchAccessToken();

        // Reembolsos de PayPal contra un ID de captura. El ID de captura se almacenó como
        // gatewayTransactionId por handleWebhook() cuando se completó el pago.
        $response = $this->client->post(
            "/v2/payments/captures/{$request->gatewayTransactionId}/refund",
            [
                'headers' => ['Authorization' => "Bearer {$token}"],
                'json'    => [
                    'amount' => [
                        'currency_code' => $request->currency,
                        'value'         => number_format($request->amount / 100, 2, '.', ''),
                    ],
                    'note_to_payer' => $request->reason,
                ],
            ],
        );

        $body = json_decode((string) $response->getBody(), true);

        if ($response->getStatusCode() >= 400) {
            return GatewayResponse::failure(
                eventType:   GatewayResponse::EVENT_REFUND_FAILED,
                message:     $body['message'] ?? 'Refund failed.',
                errorCode:   $body['name'] ?? null,
                rawResponse: $body ?? [],
            );
        }

        $this->logInfo('PayPal refund created', ['id' => $body['id'] ?? null]);

        return new GatewayResponse(
            successful:           true,
            gatewayTransactionId: $body['id'],
            status:               GatewayResponse::STATUS_REFUNDED,
            eventType:            GatewayResponse::EVENT_REFUND_PROCESSED,
            message:              'Refund processed successfully.',
            amount:               $request->amount,
            currency:             $request->currency,
            rawResponse:          $body,
        );
    } catch (\Throwable $e) {
        $this->logError('PayPal refund failed', ['error' => $e->getMessage()]);

        return GatewayResponse::failure(
            eventType: GatewayResponse::EVENT_REFUND_FAILED,
            message:   $e->getMessage(),
        );
    }
}
```

El
`RefundRequest::$gatewayTransactionId`
es el ID de captura / de cargo que devuelve tu compra anterior o el webhook — el que tu controlador escribió en
`gatewayTransactionId`
en el registro
`GatewayTransaction`.

## Paso 4 — Implementar handleWebhook()

Este es el método más importante de implementar correctamente. La ruta
`WebhookController`
en
`POST /ledger/webhooks/{driver}`
resuelve tu controlador, llama a
`handleWebhook()`
y:

1. **Confía en la verificación de la firma**
   — si aceptas la solicitud, persiste una fila
   `GatewayTransaction`
   con una clave
   `(gatewayTransactionId, event_type)`
2. **Idempotencia**
   — las entregas duplicadas de webhooks no crean entradas de registro duplicadas porque
   `firstOrCreate()`
   encuentra la fila existente
3. **Envía eventos**
   —
   `PaymentSucceeded`
   ,
   `RefundProcessed`
   , etc., basándose en
   `GatewayResponse::eventType`

Tu trabajo dentro de
`handleWebhook()`
:

```
public function handleWebhook(Request $request): GatewayResponse
{
    $payload = $request->getContent();
    $headers = $request->headers->all();

    // 1. Verifica la firma.
    if (!$this->verifyWebhookSignature($payload, $headers)) {
        throw new WebhookSignatureException('paypal', 'Signature verification failed.');
    }

    $event = json_decode($payload, true);
    $type  = $event['event_type'] ?? '';

    // 2. Mapea los tipos de eventos nativos del gateway a las constantes de evento normalizadas de Ledger.
    [$normalizedEvent, $status] = match ($type) {
        'PAYMENT.CAPTURE.COMPLETED' => [
            GatewayResponse::EVENT_PAYMENT_SUCCEEDED,
            GatewayResponse::STATUS_SUCCEEDED,
        ],
        'PAYMENT.CAPTURE.DENIED', 'PAYMENT.CAPTURE.DECLINED' => [
            GatewayResponse::EVENT_PAYMENT_FAILED,
            GatewayResponse::STATUS_FAILED,
        ],
        'PAYMENT.CAPTURE.REFUNDED' => [
            GatewayResponse::EVENT_REFUND_PROCESSED,
            GatewayResponse::STATUS_REFUNDED,
        ],
        default => [
            GatewayResponse::EVENT_UNKNOWN,
            GatewayResponse::STATUS_PENDING,
        ],
    };

    // 3. Extrae el ID de recurso y el monto del payload del evento.
    $resource     = $event['resource'] ?? [];
    $referenceId  = $resource['id'] ?? $event['id'] ?? '';
    $amountValue  = $resource['amount']['value']         ?? null;
    $currency     = $resource['amount']['currency_code'] ?? null;
    $amountMinor  = $amountValue !== null ? (int) round(((float) $amountValue) * 100) : null;

    $this->logInfo('Webhook received', [
        'paypal_event'     => $type,
        'normalized_event' => $normalizedEvent,
        'resource_id'      => $referenceId,
    ]);

    return new GatewayResponse(
        successful:           in_array($normalizedEvent, [
            GatewayResponse::EVENT_PAYMENT_SUCCEEDED,
            GatewayResponse::EVENT_REFUND_PROCESSED,
        ], true),
        gatewayTransactionId: $referenceId,
        status:               $status,
        eventType:            $normalizedEvent,
        message:              "PayPal event: {$type}",
        amount:               $amountMinor,
        currency:             $currency,
        rawResponse:          $event,
        data: [
            // Si puedes resolver la factura desde el webhook, inclúyela en $data
            // para que el escuchador pueda marcar la factura como pagada sin una segunda búsqueda.
            'invoice_uuid' => $resource['custom_id'] ?? null,
        ],
    );
}
```

Tres reglas:

1. **Siempre verifica la firma primero.**
   Si la verificación falla, lanza
   `WebhookSignatureException`
   — el controlador devuelve un código de estado 400 para que el gateway sepa que la entrega no se ha aceptado.
2. **Siempre normaliza el evento.**
   Mapea los nombres de eventos nativos del gateway a las constantes
   `GatewayResponse::EVENT_*`
   del downstream. Los escuchadores solo conocen los nombres normalizados.
3. **Siempre rellena
   `gatewayTransactionId`
   .**
   Es la clave de idempotencia. Dos entregas con el mismo
   `(gatewayTransactionId, eventType)`
   producen una sola
   `GatewayTransaction`
   fila y una sola entrada de registro.

Si
`'invoice_uuid'`
está en
`$data`
, el escuchador
`HandleSuccessfulPayment`
lo utiliza para marcar la factura como pagada sin una búsqueda adicional. Si no puedes resolverlo desde el webhook, el escuchador recurre a otras estrategias — pero proporcionarlo acelera las cosas.

## Paso 5 — (Opcional) Implementar createPaymentMethod()

Solo implementa si
`'tokenization'`
está en tu array de capacidades. El valor predeterminado en
`AbstractGatewayDriver`
lanza una
`RuntimeException`
para que los llamadores sepan que no deben llamarlo.

```
public function getCapabilities(): array
{
    return ['purchase', 'refund', 'webhooks', 'sandbox', 'tokenization'];
}

public function createPaymentMethod(array $data): GatewayResponse
{
    // Llama a la API de tokenización del gateway y devuelve una referencia de token
    // en gatewayTransactionId. El token se puede pasar de vuelta en
    // PurchaseRequest::$paymentMethodToken en una futura compra.
    // …
}
```

## Paso 6 — Registrar el controlador

Los controladores se registran mediante la API estándar de Laravel
`Manager::extend()`
en el método
`boot()`
de un proveedor. Esto integra tu controlador en el
`PaymentGatewayManager`
sin modificar el código base.

```
<?php

namespace MyCompany\Ledger;

use Fleetbase\Ledger\PaymentGatewayManager;
use Illuminate\Support\ServiceProvider;
use MyCompany\Ledger\Gateways\PaypalDriver;

class PaypalServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->app->resolving(PaymentGatewayManager::class, function ($manager) {
            $manager->extend('paypal', fn ($app) => $app->make(PaypalDriver::class));
        });
    }
}
```

Dos conexiones adicionales que tu controlador necesita para ser descubierto en la UI y resolvable para webhooks:

1. **Añade el código del controlador a la lista de registro.**
   El método
   `getRegisteredDriverCodes()`
   en
   `PaymentGatewayManager`
   es lo que popula el selector de gateways. Sobreescribe este método en tu proveedor de servicios, o contribuye el código a través de tu propio mecanismo de manifiesto (
   `getDriverManifest()`
   ) que itera sobre los códigos de registro para producir la definición del formulario.
2. **Registra el proveedor de servicios.**
   En tu proveedor de servicios principal de extensión, registra
   `PaypalServiceProvider`
   .

En entornos de producción, es común también publicar un archivo de configuración que enumera todos los controladores registrados, para que el manifiesto pueda ser ensamblado dinámicamente sin modificar el código base.

## Paso 7 — Endpoint de Webhook

No necesitas añadir una ruta. Los webhooks llegan al endpoint existente:

```
POST /ledger/webhooks/{driver}
```

Para el ejemplo anterior, es
`POST /ledger/webhooks/paypal`
. Configura esta URL en el panel de control de tu gateway. El controlador
`WebhookController`
:

* Resuelve el gateway por el código
  `driver`
  + estado activo
* Llama a
  `$driver->handleWebhook($request)`
  (tu método)
* Persiste la fila
  `GatewayTransaction`
  con una clave
  `(gatewayTransactionId, event_type)`
  de forma idempotente
* Envía
  `PaymentSucceeded`
  /
  `PaymentFailed`
  /
  `RefundProcessed`
  eventos

Tu trabajo dentro de
`handleWebhook()`
:

```
public function handleWebhook(Request $request): GatewayResponse
{
    $payload = $request->getContent();
    $headers = $request->headers->all();

    // 1. Verifica la firma.
    if (!$this->verifyWebhookSignature($payload, $headers)) {
        throw new WebhookSignatureException('paypal', 'Signature verification failed.');
    }

    $event = json_decode($payload, true);
    $type  = $event['event_type'] ?? '';

    // 2. Mapea los tipos de eventos nativos del gateway a las constantes de evento normalizadas de Ledger.
    [$normalizedEvent, $status] = match ($type) {
        'PAYMENT.CAPTURE.COMPLETED' => [
            GatewayResponse::EVENT_PAYMENT_SUCCEEDED,
            GatewayResponse::STATUS_SUCCEEDED,
        ],
        'PAYMENT.CAPTURE.DENIED', 'PAYMENT.CAPTURE.DECLINED' => [
            GatewayResponse::EVENT_PAYMENT_FAILED,
            GatewayResponse::STATUS_FAILED,
        ],
        'PAYMENT.CAPTURE.REFUNDED' => [
            GatewayResponse::EVENT_REFUND_PROCESSED,
            GatewayResponse::STATUS_REFUNDED,
        ],
        default => [
            GatewayResponse::EVENT_UNKNOWN,
            GatewayResponse::STATUS_PENDING,
        ],
    };

    // 3. Extrae el ID de recurso y el monto del payload del evento.
    $resource     = $event['resource'] ?? [];
    $referenceId  = $resource['id'] ?? $event['id'] ?? '';
    $amountValue  = $resource['amount']['value']         ?? null;
    $currency     = $resource['amount']['currency_code'] ?? null;
    $amountMinor  = $amountValue !== null ? (int) round(((float) $amountValue) * 100) : null;

    $this->logInfo('Webhook received', [
        'paypal_event'     => $type,
        'normalized_event' => $normalizedEvent,
        'resource_id'      => $referenceId,
    ]);

    return new GatewayResponse(
        successful:           in_array($normalizedEvent, [
            GatewayResponse::EVENT_PAYMENT_SUCCEEDED,
            GatewayResponse::EVENT_REFUND_PROCESSED,
        ], true),
        gatewayTransactionId: $referenceId,
        status:               $status,
        eventType:            $normalizedEvent,
        message:              "PayPal event: {$type}",
        amount:               $amountMinor,
        currency:             $currency,
        rawResponse:          $event,
        data: [
            // Si puedes resolver la factura desde el webhook, inclúyela en $data
            // para que el escuchador pueda marcar la factura como pagada sin una segunda búsqueda.
            'invoice_uuid' => $resource['custom_id'] ?? null,
        ],
    );
}
```

Tres reglas:

1. **Siempre verifica la firma primero.**
   Si la verificación falla, lanza
   `WebhookSignatureException`
   — el controlador devuelve un código de estado 400 para que el gateway sepa que la entrega no se ha aceptado.
2. **Siempre normaliza el evento.**
   Mapea los nombres de eventos nativos del gateway a las constantes
   `GatewayResponse::EVENT_*`
   del downstream. Los escuchadores solo conocen los nombres normalizados.
3. **Siempre rellena
   `gatewayTransactionId`
   .**
   Es la clave de idempotencia. Dos entregas con el mismo
   `(gatewayTransactionId, eventType)`
   producen una sola
   `GatewayTransaction`
   fila y una entrada de registro.

Si
`'invoice_uuid'`
está en
`$data`
, el escuchador
`HandleSuccessfulPayment`
lo utiliza para marcar la factura como pagada sin una búsqueda adicional. Si no puedes resolverlo desde el webhook, el escuchador recurre a otras estrategias — pero proporcionarlo acelera las cosas.

Debido a que la puerta de enlace se resuelve a partir de la URL más la fila activa
`Gateway`
,
**solo se admite una puerta de enlace activa por código de conductor por empresa**
gracias al enrutamiento predeterminado del webhook.

## Paso 8 — Modo Sandbox

`AbstractGatewayDriver::initialize()`
establece
`$this->sandbox`
. Cambie las URL base en su controlador según la opción:

```
public function initialize(array $config, bool $sandbox = false): static
{
    parent::initialize($config, $sandbox);

    $this->client = new Client([
        'base_uri' => $sandbox ? self::HOST_SANDBOX : self::HOST_PRODUCTION,
        // …
    ]);

    return $this;
}
```

Agregue
`'sandbox'`
a
`getCapabilities()`
para que la interfaz de usuario muestre el interruptor del sandbox en el formulario de la puerta de enlace.

## Referencia

### Campos de PurchaseRequest

| Campo | Tipo | Notas |
|---|---|---|
| `amount` | `int` | Unidades monetarias menores |
| `currency` | `string` | Código ISO 4217 |
| `description` | `string` | Para uso humano |
| `paymentMethodToken` | `?string` | Para compras con token o métodos guardados |
| `customerId` | `?string` | ID del cliente en la puerta de enlace (por ejemplo, Stripe `cus_xxx`) |
| `customerEmail` | `?string` | Correo electrónico del cliente para los recibos |
| `invoiceUuid` | `?string` | Factura de Ledger original |
| `orderUuid` | `?string` | Orden de Fleet-Ops original |
| `returnUrl` | `?string` | Para flujos de redirección fuera del sitio |
| `cancelUrl` | `?string` | Para flujos de redirección fuera del sitio |
| `metadata` | `array` | Clave/valor arbitrario que se pasa a la puerta de enlace |

### Campos de RefundRequest

| Campo | Tipo | Notas |
|---|---|---|
| `gatewayTransactionId` | `string` | ID original de captura/cargado |
| `amount` | `int` | Unidades monetarias menores |
| `currency` | `string` | Código ISO 4217 |
| `reason` | `?string` | `'duplicate'`, `'fraudulent'`, `'requested_by_customer'`, etc. |
| `invoiceUuid` | `?string` | Factura de Ledger original |
| `metadata` | `array` | Clave/valor arbitrario |

### Anatomía de la respuesta de la puerta de enlace

| Campo | Tipo | Notas |
|---|---|---|
| `successful` | `bool` | ¿El resultado fue exitoso? |
| `gatewayTransactionId` | `string` | Clave idempotencia — ID de referencia de la puerta de enlace |
| `status` | `string` | Uno de `STATUS_PENDING`, `STATUS_SUCCEEDED`, `STATUS_FAILED`, `STATUS_REFUNDED`, `STATUS_CANCELLED` |
| `eventType` | `string` | Uno de `EVENT_PAYMENT_SUCCEEDED`, `EVENT_PAYMENT_FAILED`, `EVENT_PAYMENT_PENDING`, `EVENT_REFUND_PROCESSED`, `EVENT_REFUND_FAILED`, `EVENT_SETUP_SUCCEEDED`, `EVENT_CHARGEBACK`, `EVENT_UNKNOWN` |
| `message` | `?string` | Para uso humano |
| `errorCode` | `?string` | Código específico de la puerta de enlace (para depuración) |
| `amount`, `currency` | `?int`, `?string` | Se repite cuando la puerta de enlace lo devuelve |
| `rawResponse` | `array` | Respuesta completa de la puerta de enlace (se guarda en `GatewayTransaction`) |
| `data` | `array` | Extras normalizados — `client_secret`, `approve_url`, `invoice_uuid`, etc. |

Utilice los helpers estáticos:

* `GatewayResponse::success(...)`
  — capturado de forma sincrónica
* `GatewayResponse::pending(...)`
  — esperando a que se active el webhook o el cliente
* `GatewayResponse::failure(...)`
  — se interrumpe en caso de error

### Registro

`AbstractGatewayDriver`
expone:

* `$this->logInfo(string $message, array $context = [])`
* `$this->logError(string $message, array $context = [])`

Ambos escriben en el canal de registro `ledger` con el prefijo
`[<driver-code>]`
.

### Helpers en la clase base

* `$this->config('key', $default = null)`
  — leer un valor de configuración
* `$this->isSandbox()`
  — booleano
* `$this->hasCapability('refund')`
  — comprobación rápida de capacidades

## Lista de verificación de pruebas

Antes de lanzar un controlador, confirme lo siguiente en modo sandbox:

* El selector de la puerta de enlace muestra su controlador bajo
  **Settings → Gateways → New Gateway**
* Los campos que ha definido en
  `getConfigSchema()`
  se muestran correctamente en el formulario
* Guardar la puerta de enlace cifra las credenciales en reposo (verifique a través de la
  `gateways`
  tabla)
* Una llamada a
  `purchase()`
  devuelve una
  `GatewayResponse`
  con el
  `eventType`
  y
  `status`
  correctos
* Para los flujos de redirección, el
  `data`
  array contiene la URL de redirección
* Una entrega de webhook desde la puerta de enlace llega a
  `POST /ledger/webhooks/{your-code}`
  y crea una
  `GatewayTransaction`
* Repetir el mismo webhook **no**
  crea una segunda
  `GatewayTransaction`
  (idempotencia)
* Una firma inválida devuelve un código de error HTTP 400
* Una llamada a
  `refund()`
  contra una transacción capturada tiene éxito
* Si implementa
  `createPaymentMethod()`
  , se puede utilizar un token guardado en una posterior
  `purchase()`
  con
  `paymentMethodToken`

## Próximos pasos

* Lea los controladores existentes:
  `Fleetbase\Ledger\Gateways\TalerDriver`,
  `StripeDriver`,
  `QPayDriver`
  y
  `CashDriver`
  son las referencias canónicas
* Utilice
  `Fleetbase\Ledger\PaymentGatewayManager`
  si necesita invocar puertas de enlace de forma programática desde fuera de Ledger