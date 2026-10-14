---
title: "Proveedores Integrados"
url: https://fleetbase.io/docs/fleet-ops/resources/vendors/integrated-vendors
module: fleet-ops
---

Proveedores

# Proveedores Integrados

Conecte plataformas de logística externas (como Lalamove y otras) utilizando el marco de Proveedores Integrados, y aprenda a registrar su propio proveedor.

# Proveedores Integrados

Un
**Proveedor Integrado**
es una plataforma de logística externa — como Lalamove, una red de mensajería o un agregador de fletes — con la que Fleet-Ops se comunica a través de su API. Cuando asigna un pedido a un proveedor integrado, Fleet-Ops envía el pedido a la plataforma del socio, el socio envía a su propio conductor, y las actualizaciones de estado se transmiten a través de webhooks mientras que el ciclo de vida del pedido continúa dentro de Fleet-Ops.

Esta página cubre la configuración de un proveedor integrado en la consola y el
**marco**
que utiliza Fleet-Ops internamente para agregar nuevos proveedores, para que pueda configurar el suyo propio.

## Cómo funciona

Cuando un pedido es facilitado por un proveedor integrado:

1. Fleet-Ops traduce la carga del pedido en el formato de solicitud de la plataforma del socio y la envía a través de su API.
2. La plataforma del socio asigna a uno de sus conductores y devuelve una referencia del lado del proveedor.
3. Fleet-Ops almacena la referencia y continúa rastreando el pedido.
4. Las actualizaciones de estado del socio llegan a la URL del webhook configurada y se escriben de nuevo en el pedido de Fleet-Ops.

El pedido de Fleet-Ops sigue siendo la fuente de información, y las notificaciones al cliente y los informes se generan a partir del pedido local, aunque la ejecución se realiza externamente.

## Proveedores preconfigurados

Out of the box, Fleet-Ops viene con una única implementación de un proveedor integrado:

| Proveedor | Código | Notas |
|---|---|---|
| **Lalamove** | `lalamove` | Servicio de mensajería y logística de un día en múltiples mercados asiáticos y latinoamericanos |

Se pueden agregar proveedores adicionales ya sea como contribuciones de Fleet-Ops o como extensiones instaladas desde el
[Marketplace de extensiones](https://fleetbase.io/docs/platform/extensions/browsing-and-installing)
.

## Conectar un Proveedor Integrado

Navegue a
**Fleet-Ops → Recursos → Proveedores**
.

Haga clic en
**+ Agregar Proveedor Integrado**
y seleccione el proveedor (por ejemplo,
*Lalamove*
) del selector.

Ingrese las credenciales del proveedor — para Lalamove, esto es
`api_key`
y
`api_secret`
. Cada proveedor declara sus propios campos de credenciales a través de
`credentialParams`
.

Establezca las opciones del proveedor si es necesario — para Lalamove, esto es el
`market`
selector (el país/región al que están vinculadas las credenciales). Las opciones se declaran por proveedor a través de
`optionParams`
.

Habilite el
**Sandbox**
si las credenciales son para el entorno de sandbox/desarrollo. Fleet-Ops dirigirá las solicitudes al host de sandbox del proveedor en lugar del entorno de producción.

Guarde. Fleet-Ops ejecuta las llamadas de devolución de llamada
`onCreated`
del proveedor (por ejemplo, registrar una URL de webhook con el socio) y el proveedor integrado está listo para facilitar los pedidos.

Puede editar, habilitar/deshabilitar el sandbox y eliminar los proveedores integrados desde la fila del proveedor en la lista de Proveedores. Eliminar un proveedor integrado ejecuta las llamadas de devolución de llamada
`onDeleted`
del proveedor, que normalmente cancelan cualquier pedido abierto en el lado del socio.

## Modelo de datos

El modelo es
`Fleetbase\FleetOps\Models\IntegratedVendor`
. Campos clave:

| Campo | Descripción |
|---|---|
| `provider` | Código del proveedor (por ejemplo, `lalamove`) — selecciona el proveedor resuelto del registro
`IntegratedVendors::$supported` |
| `provider_options` | Almacén JSON de metadatos del proveedor resuelto (host, host de sandbox, namespace, esquema de credenciales, esquema de opción) |
| `host` | URL de la API — se establece automáticamente a partir de la URL de host del proveedor (o del host de sandbox cuando se habilita el modo sandbox) |
| `namespace` | Espacio de nombres de la API (por ejemplo, `v3`) |
| `credentials` | Objeto JSON que contiene los secretos específicos del proveedor — **oculto** en las respuestas de la API |
| `options` | Objeto JSON que contiene las opciones específicas del proveedor (por ejemplo, `market`) |
| `sandbox` | Booleano — cuando está habilitado, el proveedor se conecta al punto final de sandbox |
| `webhook_url` | URL de webhook a la que el socio publica las actualizaciones de estado — generada por Fleet-Ops |

Los tipos de servicio y los países admitidos se agregan dinámicamente — provienen de las clases de puente resueltas del proveedor (ver más abajo) en lugar de almacenarse en la fila.

## El marco de Proveedores Integrados

Agregar un nuevo proveedor implica tres aspectos: el
**puente**
(el cliente de API), clases opcionales de
**tipo de servicio**
y
**mercado**
(código ISO-2), y una
**entrada de registro**
que declara cómo conectarlos.

### 1. El puente — su cliente de API

El puente es una clase PHP estándar que se comunica con la API HTTP del socio. El marco lo instancia a través del contenedor de Laravel con parámetros resueltos del proveedor integrado (típicamente credenciales + indicador de sandbox + mercado):

```
namespace Fleetbase\FleetOps\Integrations\Lalamove;

class Lalamove
{
    public function __construct(
        protected string $apiKey,
        protected string $apiSecret,
        protected bool $sandbox = false,
        protected ?string $market = null,
    ) {
        // Configure HTTP client, signing, etc.
    }

    public function setWebhook(string $webhookUrl): void { /* ... */ }
    public function createOrder(array $payload): array     { /* ... */ }
    public function cancelOrder(string $vendorOrderId): void { /* ... */ }
    public function cancelFromFleetbaseOrder(): void       { /* ... */ }
    // ... cualquier cosa que soporte la API del proveedor
}
```

### 2. Clases de tipo de servicio y mercado (opcional)

Si el proveedor expone una lista descubrible de tipos de servicio (por ejemplo,
*Motorcycle Express*,
*Van*,
*Truck 4x4*) o opera en mercados específicos, expóngalos a través de dos clases estáticas:

```
class LalamoveServiceType
{
    public static function all(): array
    {
        // return [['code' => 'MOTORCYCLE', 'name' => 'Motorcycle'], ...]
    }
}

class LalamoveMarket
{
    public const markets = [/* ... */];

    public static function codes(): array
    {
        return array_map(fn ($m) => $m['code'], self::markets);
    }
}
```

Estos se hacen referencia como
`svc_bridge`
y
`iso2cc_bridge`
y se muestran en la interfaz de usuario de la consola como menús desplegables cuando se configura el proveedor.

### 3. Entrada de registro

Agregue una entrada a
`Fleetbase\FleetOps\Support\IntegratedVendors::$supported`
. El registro le dice a Fleet-Ops:

* El nombre y el código del proveedor
* Los hosts de API que se deben utilizar (producción y sandbox)
* Qué clases implementan el puente, los tipos de servicio y la lista de mercados
* Qué campos de credenciales y opciones debe renderizar el formulario de la consola
* Cómo mapear los campos de la fila guardada
  `IntegratedVendor`
  en los parámetros del constructor del puente
* Qué llamadas de ciclo de vida se deben ejecutar en el puente para cada evento

El marco se encarga del resto:

* El proveedor aparece en el
  **+ Add Integrated Vendor**
  selector
* La consola renderiza los campos de credenciales y opciones
* Cuando se guarda una fila, la URL del host (o host de sandbox) y el espacio de nombres se establecen automáticamente a partir del registro
* Se instancia el puente a través del contenedor de Laravel con parámetros resueltos a partir de
  `bridgeParams`
* Se ejecutan las llamadas de devolución de llamada cuando se produce un evento
  `IntegratedVendor`
  model

### Registrar desde una extensión

Si está enviando un proveedor como una extensión de Fleet-Ops
[extension](https://fleetbase.io/docs/platform/extensions/managing-extensions)
, agregue su entrada de registro a
`IntegratedVendors::$supported`
desde el método
`boot()`
de su proveedor de servicios. Una vez instalado y iniciado, el nuevo proveedor aparece en el selector Add Integrated Vendor sin cambios en Fleet-Ops.

## Enviar pedidos a un Proveedor Integrado

Cuando se crea un pedido, configure al proveedor integrado como el
**facilitador**
del pedido. En el momento del envío, Fleet-Ops detecta que el facilitador es un proveedor integrado y envía el pedido a través del puente resuelto. A partir de este punto:

* El pedido sigue viviendo en Fleet-Ops con su ciclo de vida normal
* Las actualizaciones de estado publicadas en la URL de webhook se traducen en actividades de Fleet-Ops
* La ubicación del conductor, la ETA y la POD (cuando lo proporciona el proveedor) se muestran en el mapa en vivo
* La cancelación en Fleet-Ops cancela a través del proveedor; la cancelación en el proveedor cancela en Fleet-Ops

## Pruebas de la integración

Utilice el modo sandbox para desarrollar y probar:

1. Obtenga las credenciales de sandbox del proveedor
2. Configure el proveedor integrado con
   **Sandbox**
   habilitado
3. Realice pedidos de prueba contra el proveedor de sandbox — la plataforma del socio de sandbox normalmente devuelve conductores y actualizaciones de estado simulados
4. Cuando esté listo, cree un registro de proveedor integrado con credenciales de producción y sandbox desactivado

## Páginas relacionadas

* [Proveedores](https://fleetbase.io/docs/fleet-ops/resources/vendors/overview)
  — La entidad principal de proveedores (también cubre a los proveedores internos)
* [Extensiones](https://fleetbase.io/docs/platform/extensions/managing-extensions)
  — Empaquetar a un proveedor integrado como una extensión instalable

[Proveedores

Gestionar transportistas y proveedores de servicios de terceros: asignar conductores, configurar integraciones y enviar pedidos a plataformas de logística asociadas.](https://fleetbase.io/docs/fleet-ops/resources/vendors/overview)
[Contactos

Gestionar a las personas y empresas con las que trabaja su operación: clientes, proveedores y facilitadores, con ubicaciones vinculadas y campos personalizados.](https://fleetbase.io/docs/fleet-ops/resources/contacts/overview)