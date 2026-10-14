---
title: "Añadir un proveedor de SMS"
url: https://fleetbase.io/docs/extension-development/recipes/adding-a-sms-provider
module: extension-development
---

# Añadir un proveedor de SMS

Integre un nuevo gateway de SMS en el servicio `SmsService` de la plataforma: implemente una clase de envío, configurela y dirija los prefijos de número de teléfono específicos a ella.

# Añadir un proveedor de SMS

El servicio `Fleetbase\Services\SmsService`
viene con Twilio (por defecto) y CallPro. Ambos implementan el mismo contrato mínimo: un constructor que lee la configuración, así como un
`send($to, $text, $options?)`
método. Añadir un tercer proveedor implica escribir la clase de envío, exponerla a través de la configuración, y (si desea la enrutamiento automático) actualizar las reglas de enrutamiento.

## 1. Implementar la clase del proveedor

Cree una clase llamada
`MessageBirdSmsService`
que implemente la funcionalidad de envío de SMS a través de la API de MessageBird:

```php
<?php
// server/src/Services/MessageBirdSmsService.php

namespace MyOrg\MyExtension\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MessageBirdSmsService
{
    protected string $apiKey;
    protected string $from;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey  = config('services.messagebird.api_key', '');
        $this->from    = config('services.messagebird.from', '');
        $this->baseUrl = config('services.messagebird.base_url', 'https://rest.messagebird.com');
    }

    public function send(string $to, string $text, ?string $from = null): array
    {
        if (empty($this->apiKey)) {
            throw new \Exception('Clave API de MessageBird no configurada.');
        }

        $response = Http::withHeaders([
            'Authorization' => "AccessKey {$this->apiKey}",
        ])->post("{$this->baseUrl}/messages", [
            'originator' => $from ?? $this->from,
            'recipients' => [$to],
            'body'       => $text,
        ]);

        if (!$response->successful()) {
            Log::error('El envío a MessageBird falló', [
                'status' => $response->status(),
                'body'   => $response->json(),
                'to'     => $to,
            ]);
            throw new \Exception('El SMS a MessageBird falló: ' . $response->body());
        }

        return [
            'success'    => true,
            'provider'   => 'messagebird',
            'message_id' => $response->json('id'),
            'response'   => $response->json(),
        ];
    }
}
```

## 2. Añadir la configuración

En el archivo
`server/config/services.php`
de su extensión (o métenlo en el archivo
`config/services.php`
existente de Laravel):

```
return [
    'messagebird' => [
        'api_key'  => env('MESSAGEBIRD_API_KEY'),
        'from'     => env('MESSAGEBIRD_FROM'),
        'base_url' => env('MESSAGEBIRD_BASE_URL', 'https://rest.messagebird.com'),
    ],
];
```

Luego, inclúyalo desde su proveedor de servicios:

```
public function boot()
{
    parent::boot();
    $this->mergeConfigFrom(__DIR__ . '/../../config/services.php', 'services');
}
```

## 3. Integrar el proveedor en `SmsService`

La forma más sencilla es extender la clase
`SmsService`
y añadir su proveedor, lo que mantiene la clase principal sin cambios y permite a los usuarios elegir.

```
<?php
// server/src/Services/ExtendedSmsService.php

namespace MyOrg\MyExtension\Services;

use Fleetbase\Services\SmsService;

class ExtendedSmsService extends SmsService
{
    public const PROVIDER_MESSAGEBIRD = 'messagebird';

    public function send(string $to, string $text, array $options = [], ?string $provider = null): array
    {
        $provider ??= $this->resolveProvider($to);

        if ($provider === self::PROVIDER_MESSAGEBIRD) {
            return app(MessageBirdSmsService::class)->send($to, $text, $options['from'] ?? null);
        }

        return parent::send($to, $text, $options, $provider);
    }
}
```

Luego, vincúlalo en el método
`register()`
de su proveedor de servicios:

```
public function register()
{
    parent::register();

    $this->app->singleton(SmsService::class, ExtendedSmsService::class);
    $this->app->singleton(MessageBirdSmsService::class);
}
```

Ahora, cualquier código que resuelva
`SmsService`
desde el contenedor (
`app(SmsService::class)`
) obtendrá la subclase extendida.

## 4. Configurar la enrutamiento de prefijos

Para habilitar el enrutamiento automático de códigos de país a través de MessageBird, extienda la configuración de enrutamiento. En el método
`boot()`
de su proveedor de servicios:

```
config([
    'sms.routing_rules' => array_merge(
        config('sms.routing_rules', []),
        ['+31' => ExtendedSmsService::PROVIDER_MESSAGEBIRD],   // Países Bajos
        ['+44' => ExtendedSmsService::PROVIDER_MESSAGEBIRD],   // Reino Unido
    ),
]);
```

Ahora,
`$smsService->send('+31612345678', 'Hola')`
se enrutará automáticamente a través de MessageBird. Las llamadas a otros prefijos seguirán utilizando el proveedor Twilio por defecto.

## 5. Probar

```
$sms = app(\Fleetbase\Services\SmsService::class);

// Enrutamiento automático (utiliza MessageBird porque +31)
$sms->send('+31612345678', 'Mensaje de prueba');

// Proveedor forzado
$sms->send('+15551234567', 'Mensaje de prueba', [], ExtendedSmsService::PROVIDER_MESSAGEBIRD);
```

## Referencias

* `core-api/src/Services/SmsService.php`
  — servicio base con enrutamiento automático
* `core-api/src/Services/CallProSmsService.php`
  — clase de proveedor de referencia
* [API Services → SmsService](https://fleetbase.io/docs/extension-development/reference/api-services#fleetbase-services-smsservice)
  — descripción del servicio
* [Laravel container singleton binding](https://laravel.com/docs/11.x/container#binding-singletons)