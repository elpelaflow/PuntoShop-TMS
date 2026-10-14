---
title: "Añadir un Proveedor Integrado"
url: https://fleetbase.io/docs/extension-development/recipes/adding-an-integrated-vendor
module: extension-development
---

# Añadir un Proveedor Integrado

Integre un proveedor de logística de terceros en Fleet-Ops como un ProveedorIntegrado seleccionable — formulario de credenciales, puente de API, llamadas de ciclo de vida y enrutamiento de webhooks.

# Añadir un Proveedor Integrado

El sistema ProveedorIntegrado de Fleet-Ops permite a los usuarios conectar proveedores de entrega externos (Lalamove, etc.) y asignarles los pedidos, como si fueran proveedores internos. La integración consiste en:

1. Una
   **clase de puente**
   — que envuelva la API de terceros
2. **Puentes opcionales de tipo de servicio y país**
   — para servicios seleccionables y enrutamiento regional
3. Una
   **entrada de descriptor**
   registrada en la plataforma — esquema de credenciales, llamadas de vuelta, marca

Fleet-Ops incluye Lalamove de forma predeterminada. Los nuevos proveedores se pueden agregar registrando un descriptor que apunte a su clase de puente.

## 1. Crear el Puente

El puente es una clase PHP inyectable que se comunica con la API de terceros. Debe aceptar sus credenciales a través de la inyección del constructor — así es como la plataforma proporciona las claves de API ingresadas por el usuario en tiempo de ejecución.

```
<?php
// server/src/Integrations/AcmeDispatch/AcmeDispatch.php

namespace MyOrg\MyExtension\Integrations\AcmeDispatch;

use Fleetbase\FleetOps\Models\IntegratedVendor;
use Illuminate\Support\Facades\Http;

class AcmeDispatch
{
    protected ?IntegratedVendor $vendor = null;

    public function __construct(
        protected string $apiKey,
        protected string $apiSecret,
        protected bool $sandbox = false,
        protected ?string $market = null,
    ) {}

    public function setIntegratedVendor(IntegratedVendor $vendor): static
    {
        $this->vendor = $vendor;
        return $this;
    }

    protected function host(): string
    {
        return $this->sandbox
            ? 'https://sandbox.acme-dispatch.com/'
            : 'https://api.acme-dispatch.com/';
    }

    public function quote(array $params): array
    {
        return Http::withBasicAuth($this->apiKey, $this->apiSecret)
            ->baseUrl($this->host())
            ->post('v1/quotes', $params)
            ->throw()
            ->json();
    }

    public function createDelivery(array $params): array
    {
        return Http::withBasicAuth($this->apiKey, $this->apiSecret)
            ->baseUrl($this->host())
            ->post('v1/deliveries', $params)
            ->throw()
            ->json();
    }

    /** Llamada de vuelta de ciclo de vida conectada en el descriptor a continuación. */
    public function setWebhook(string $webhookUrl): void
    {
        Http::withBasicAuth($this->apiKey, $this->apiSecret)
            ->baseUrl($this->host())
            ->post('v1/webhooks', ['url' => $webhookUrl]);
    }

    public function cancelFromFleetbaseOrder(): void
    {
        // Cancel any in-flight delivery the vendor is tracking
    }
}
```

## 2. Registrar el Descriptor

En el proveedor de servicios,
`boot()`
, agregue un descriptor a
`IntegratedVendors::$supported`
:

```
<?php
// server/src/Providers/MyExtensionServiceProvider.php

use Fleetbase\FleetOps\Support\IntegratedVendors;
use MyOrg\MyExtension\Integrations\AcmeDispatch\AcmeDispatch;

public function boot()
{
    parent::boot();

    IntegratedVendors::$supported[] = [
        'name'             => 'Acme Dispatch',
        'code'             => 'acme-dispatch',
        'host'             => 'https://api.acme-dispatch.com/',
        'sandbox'          => 'https://sandbox.acme-dispatch.com/',
        'namespace'        => 'v1',
        'bridge'           => AcmeDispatch::class,
        // Opcional — lista de campos de credenciales que el usuario completa
        'credentialParams' => [
            ['key' => 'api_key'],
            ['key' => 'api_secret'],
        ],
        // Opcional — configuración adicional que el usuario establece
        'optionParams' => [
            ['key' => 'market', 'options' => [
                ['code' => 'us', 'key' => 'United States'],
                ['code' => 'mx', 'key' => 'Mexico'],
            ], 'optionValue' => 'code', 'optionLabel' => 'key'],
        ],
        // Mapea los valores guardados por el usuario a los argumentos del constructor de su puente
        'bridgeParams' => [
            'apiKey'    => 'credentials.api_key',
            'apiSecret' => 'credentials.api_secret',
            'sandbox'   => 'sandbox',
            'market'    => 'options.market',
        ],
        // Llamadas de vuelta de ciclo de vida — métodos para llamar al puente en eventos de ciclo de vida del proveedor
        'callbacks' => [
            'onCreated'  => ['setWebhook' => ['webhook_url']],
            'onUpdated'  => ['setWebhook' => ['webhook_url']],
            'onCanceled' => ['cancelFromFleetbaseOrder' => []],
        ],
    ];
}
```

### Campos del Descriptor

| Campo | Propósito |
|---|---|
| `name` / `code` | Nombre de visualización + código de máquina para URL |
| `host` / `sandbox` | URLs base para producción / sandbox |
| `bridge` | FQCN de su clase de puente |
| `svc_bridge` | Opcional — clase que proporciona `::all()` para tipos de servicio seleccionables |
| `iso2cc_bridge` | Opcional — clase que proporciona `::codes()` para códigos regionales |
| `credentialParams` | Campos de formulario que se muestran al agregar el proveedor |
| `optionParams` | Campos de configuración adicionales que no son de credenciales |
| `bridgeParams` | Mapea los atributos de `IntegratedVendor` a los argumentos del constructor de su puente |
| `callbacks` | Métodos para invocar al puente en eventos de `onCreated` , `onUpdated` , `onDeleted` , `onCanceled` |

Los caminos `bridgeParams` se resuelven contra el modelo `IntegratedVendor` en vivo — `'credentials.api_key'` lee
`$vendor->credentials['api_key']`
,
`'sandbox'`
lee
`$vendor->sandbox`
, etc.

## 3. Agregar un Logotipo del Proveedor

Sube un archivo PNG llamado
`<your-code>.png`
al directorio de activos de la plataforma (utilizado por
`ResolvedIntegratedVendor::logo`
). Para instancias auto-hospedadas, colócalo en
`assets/integrated-vendors/<code>.png`
.

## 4. Probar la Integración

La interfaz de usuario "Añadir Proveedor Integrado" ahora muestra su proveedor. Agregarlo persiste un registro de
`IntegratedVendor`
; desde ahí:

```
use Fleetbase\FleetOps\Support\IntegratedVendors;

$vendor = IntegratedVendor::find('iv_xxx');
$bridge = IntegratedVendors::bridgeFromIntegratedVendor($vendor);

$quote = $bridge->quote(['pickup' => $pickup, 'dropoff' => $dropoff]);
```

O desde el flujo de asignación de pedidos, Fleet-Ops asignará automáticamente los pedidos asignados a este proveedor a través de su puente.

## Referencia

* `fleetops/server/src/Support/IntegratedVendors.php`
  — registro del descriptor +
  `bridgeFromIntegratedVendor`
  ayudante
* `fleetops/server/src/Integrations/Lalamove/`
  — referencia completa del puente con tipos de servicio, códigos de mercado y manejo de webhooks
* `fleetops/server/src/Models/IntegratedVendor.php`
  — el modelo persistido

[Registrar un Esquema de Reporte

Expona las tablas de su extensión en el constructor de informes de la plataforma registrando un ReportSchema. Los usuarios pueden construir informes personalizados contra sus datos a través de la interfaz de usuario de informes estándar.](https://fleetbase.io/docs/extension-development/recipes/registering-a-report-schema)
[Añadir un Controlador de Pago

Conecte un nuevo controlador de pago (PayPal, Razorpay, etc.) en Ledger extendiendo AbstractGatewayDriver y registrándolo en PaymentGatewayManager.](https://fleetbase.io/docs/extension-development/recipes/adding-a-payment-gateway-driver)