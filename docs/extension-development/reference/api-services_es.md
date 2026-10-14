---
Título: Servicios de API
URL: https://fleetbase.io/docs/extension-development/reference/api-services
Módulo: extension-development
---

# Servicios de API

Clases de soporte proporcionadas por fleetbase/core-api: SmsService, las clases de ayuda Support\Http y Support\Find/Resolve, NotificationRegistry y el emisor SocketCluster.

# Servicios de API

`fleetbase/core-api`
proporciona un conjunto de clases de soporte que puedes utilizar en lugar de reconstruirlas para cada extensión. Esta página describe las más importantes y muestra su uso estándar. Los archivos fuente de cada una están enlazados al final.

Para los servicios de host del frontend (los
`fetch`,
`store`,
`notifications`,
etc. que inyectas en tu motor), consulta
[Servicios de Ember](https://fleetbase.io/docs/extension-development/reference/ember-services)
.

Todos estos están disponibles una vez que tu proveedor de servicios extiende
`Fleetbase\Providers\CoreServiceProvider`
— consulta
[Proveedor de servicios](https://fleetbase.io/docs/extension-development/backend/service-provider)
.

## Fleetbase\Services\SmsService

Servidor SMS multi-proveedor con reglas de enrutamiento basadas en el prefijo del teléfono. Se obtiene del contenedor de Laravel como una instancia única; normalmente lo inyectas o lo usas con
`app()`.

### Resolución

```
use Fleetbase\Services\SmsService;

$sms = app(SmsService::class);
```

### Envío

```
$sms->send(
    to: '+15551234567',
    text: 'Su código de verificación es 123456',
    options: [
        'from' => '+18005550000',          // ID del remitente opcional
    ],
    provider: SmsService::PROVIDER_TWILIO  // ID del remitente opcional
);
```

El enrutamiento automático se aplica según
`config('sms.routing_rules')`
— la configuración predeterminada incluye
`'+976' → CallPro`
(Mongolia). Se puede personalizar a nivel de llamada pasando el argumento
`$provider`
o globalmente editando la configuración de enrutamiento.

### Agregar un Proveedor

Coloca una nueva clase de servicio junto a
`SmsService`
y
`CallProSmsService`, regístrala en tu proveedor de servicios, y agrega una entrada + de enrutamiento a
`SmsService`
(o, si prefieres, expón tu proveedor a través de la configuración de SMS y permite a los usuarios que se registren). Consulta la
[receta para agregar un proveedor de SMS](https://fleetbase.io/docs/extension-development/recipes/adding-a-sms-provider)
.

### Fuente

`src/Services/SmsService.php`
·
`src/Services/CallProSmsService.php`

---

## Fleetbase\Support\Http

Ayudas estáticas para inspeccionar la solicitud HTTP actual. Se extiende a la fachada de Laravel
[`Http`](https://laravel.com/api/11.x/Http/Client/Factory.html)
para que también puedas usar los métodos estándar de HTTP-client.

### Métodos

| Método | Devuelve |
|---|---|
| `Http::isInternalRequest($request?)` | `true` para rutas con el prefijo `/int/` o nombrespaces `Internal\\` |
| `Http::isPublicRequest($request?)` | `true` para rutas con el prefijo `v1/` |
| `Http::useSort($sort)` | Analiza parámetros de estilo `?sort=-name` en `['param', 'direction']` |
| `Http::trace($key?)` | Datos de rastreo de la solicitud — útil para el registro distribuido |
| `Http::isPublicIp($ip?)` / `Http::isPrivateIp($ip?)` | Comprobaciones de tipo de IP |
| `Http::lookupIp($ip?)` | Búsqueda de IP |
| `Http::action($verb?)` | Resuelve el verbo de la acción del controlador (`'index'`, `'store'`, etc.) |

### Ejemplo

```
use Fleetbase\Support\Http;

if (Http::isInternalRequest()) {
    // Solicitud desde la consola — carga el transformador de recursos interno
}

[$sortField, $direction] = Http::useSort($request->input('sort'));
$query->orderBy($sortField, $direction);
```

### Fuente

`src/Support/Http.php`

---

## Fleetbase\Support\Find

Resuelve los
**nombres de clase**
para las clases de recursos, solicitudes y filtros HTTP que corresponden a un modelo de Eloquent. Se utiliza en
`HasApiControllerBehavior`
para buscar el transformador correcto para
`index`,
`show`,
etc.

### Métodos

| Método | Devuelve |
|---|---|
| `Find::httpResourceForModel($model, $namespace?, $version?)` | El nombre de clase del recurso `JsonResource` correspondiente |
| `Find::httpRequestForModel($model, $namespace?, $version?)` | El nombre de clase de la solicitud de formulario correspondiente |
| `Find::httpFilterForModel($model, $namespace?, $version?)` | El nombre de clase del filtro correspondiente |
| `Find::getModelPackage($model)` | El prefijo de espacio de nombres del paquete (`'FleetOps'`, `'Ledger'`, etc.) |

### Comportamiento

Para un modelo
`MyOrg\MyExtension\Models\Widget`
en una solicitud interna,
`Find`
recorre los espacios de nombres en este orden, y recurre al siguiente si no se encuentra:

1. `MyOrg\MyExtension\Http\Resources\Internal\v1\Widget`
2. `MyOrg\MyExtension\Http\Resources\v1\Widget`
3. `MyOrg\MyExtension\Http\Resources\Widget`
4. `Fleetbase\Http\Resources\FleetbaseResource`
   (fallback universal)

Por eso, un recurso básico en
`Http/Resources/Widget.php`
es suficiente para empezar — la plataforma lo encuentra y lo usa sin necesidad de registrarlo explícitamente.

### Fuente

`src/Support/Find.php`

---

## Fleetbase\Support\Resolve

Una capa ligera sobre
`Find`
— en lugar de devolver nombres de clase,
`Resolve`
**instancia**
las clases de recursos y solicitudes correspondientes, devolviendo el objeto en vivo.

### Métodos

| Método | Devuelve |
|---|---|
| `Resolve::httpResourceForModel($model, $namespace?, $version?)` | Una instancia de `JsonResource` que envuelve el modelo |
| `Resolve::httpRequestForModel($model, $namespace?, $version?)` | Una instancia de `FormRequest` |
| `Resolve::httpFilterForModel($model, $request, $version?)` | Una instancia de filtro |
| `Resolve::resourceForMorph($type, $id, $resourceClass?)` | Resuelve una relación polimórfica a un recurso |
| `Resolve::instance($class, $args?)` | Instanciador genérico con paso de argumentos de constructor |

### Ejemplo

```
use Fleetbase\Support\Resolve;

public function show(Widget $widget)
{
    return Resolve::httpResourceForModel($widget);
    // → devuelve el JsonResource correcto para el contexto de la solicitud
}
```

La mayoría de los controladores no llaman directamente a
`Resolve`
—
`HasApiControllerBehavior`
lo hace por ti. Úsalo cuando necesites el transformador resuelto en una acción personalizada (por ejemplo, un punto final de callback que devuelve un modelo envuelto en su recurso apropiado).

### Fuente

`src/Support/Resolve.php`

---

## Fleetbase\Support\NotificationRegistry

El registro centralizado para las notificaciones. Las notificaciones que registres aquí se mostrarán en la interfaz de usuario de preferencias de notificación del usuario, y se pueden enviar a través de los canales estándar de
[Laravel notifications](https://laravel.com/docs/11.x/notifications)
(correo electrónico, SMS, broadcast, base de datos, push).

### Métodos

| Método | Descripción |
|---|---|
| `NotificationRegistry::register($notificationClassOrArray, $options?)` | Registra una o varias clases de notificación |
| `NotificationRegistry::registerNotifiable($notifiableClass)` | Registra una clase que puede recibir notificaciones (por defecto: `User`, `Group`, `Role`, `Company`) |
| `NotificationRegistry::getNotificationsByPackage($package)` | Filtra para las notificaciones de un solo paquete |
| `NotificationRegistry::getNotifiables()` / `getNotifiablesForCompany($companyId)` | Lista los destinatarios disponibles para la inscripción |
| `NotificationRegistry::notify($notificationClass, ...$params)` | Envía a todos los destinatarios inscritos que han dado su consentimiento |
| `NotificationRegistry::notifyUsingDefinitionName($class, $name, ...$params)` | Lo mismo, pero seleccionable por nombre registrado |

### Registro desde tu proveedor de servicios

```
// server/src/Providers/MyExtensionServiceProvider.php
public function boot()
{
    parent::boot();
    $this->registerExpansionsFrom(__DIR__ . '/../Expansions');
    $this->loadRoutesFrom(__DIR__ . '/../routes.php');
    $this->loadMigrationsFrom(__DIR__ . '/../../migrations');

    NotificationRegistry::register([
        \MyOrg\MyExtension\Notifications\WidgetCreated::class,
        \MyOrg\MyExtension\Notifications\WidgetExpired::class,
    ]);
}
```

Cada clase de notificación declara sus propios
`name`,
`description`
y
`package`
para que la interfaz de usuario pueda agruparlas correctamente. Consulta la
[receta para registrar notificaciones](https://fleetbase.io/docs/extension-development/recipes/registering-notifications)
para obtener el patrón completo.

### Fuente

`src/Support/NotificationRegistry.php`

---

## Broadcasting de SocketCluster

La plataforma incluye un controlador de Laravel
[broadcasting](https://laravel.com/docs/11.x/broadcasting)
conectado a una instancia de SocketCluster. Esta es la forma en que se utilizan los canales de tiempo real del frontend
[`socket`](https://fleetbase.io/docs/extension-development/reference/ember-services#socket)
.

### Configuración (ya está hecha por el núcleo)

`SocketClusterServiceProvider`
extiende la fachada de Laravel
`Broadcast`
con un controlador
`'socketcluster'`
. Con
`BROADCAST_DRIVER=socketcluster`
en tu
`.env`,
cada llamada a
`broadcast(new MyEvent(...))`
se envía a la instancia de SocketCluster configurada.

### Publicación desde tu backend

Para los eventos de nivel de aplicación que deben llegar al navegador, define un evento de Laravel con
`ShouldBroadcast`:

```
namespace MyOrg\MyExtension\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class WidgetCreated implements ShouldBroadcast
{
    use Dispatchable;

    public function __construct(public array $payload) {}

    public function broadcastOn(): Channel
    {
        return new Channel('company.' . $this->payload['company_uuid']);
    }

    public function broadcastAs(): string
    {
        return 'my-extension.widget.created';
    }
}
```

```
// En cualquier parte de tu código:
broadcast(new WidgetCreated($widget->toArray()));
```

El frontend
[`socket`](https://fleetbase.io/docs/extension-development/reference/ember-services#socket)
que escucha
`company.{uuid}`
recibe
`event.type === 'my-extension.widget.created'`
con los parámetros del evento.

### Publicación Directa (sin clase de Evento)

Para mensajes ad-hoc, utilice directamente el
`SocketClusterService`
singleton:

```
use Fleetbase\Support\SocketCluster\SocketClusterService;

SocketClusterService::publish('company.' . $companyUuid, [
    'type' => 'my-extension.refresh-needed',
    'data' => ['reason' => 'config-changed'],
]);
```

### Fuente

`src/Providers/SocketClusterServiceProvider.php`
·
`src/Support/SocketCluster/SocketClusterService.php`
· upstream
[Documentación de SocketCluster](https://socketcluster.io/docs)

---

## Otras Clases de Soporte Útiles

El
`src/Support/`
directorio contiene varios helpers más pequeños que vale la pena conocer:

| Clase | Propósito |
|---|---|
| `Fleetbase\Support\Auth` | Ayudantes para el estado de autenticación — resolución del usuario/empresa actual |
| `Fleetbase\Support\ApiModelCache` | Caché de modelos por solicitud para evitar consultas duplicadas |
| `Fleetbase\Support\Utils` | Utilidades generales — `classExists` , `classBasename` , slugificación, etc. |
| `Fleetbase\Support\PushNotification` | Dispatcher de notificaciones push multiplataforma |
| `Fleetbase\Support\ParsePhone` | Normalización de números de teléfono (envoltorio de libphonenumber) |
| `Fleetbase\Support\IdempotencyManager` | Gestión de claves idempotencia para endpoints POST seguros y reutilizables |
| `Fleetbase\Support\QueryOptimizer` | Heurísticas para cargar relaciones de forma anticipada para evitar N+1 |
| `Fleetbase\Support\Reporting\ReportSchemaRegistry` | Registrar un esquema de informe — consulte la [receta](https://fleetbase.io/docs/extension-development/recipes/registering-a-report-schema) |
| `Fleetbase\Services\TemplateRenderService` | Renderizador de sustitución de variables para plantillas (PDFs, correos electrónicos) |
| `Fleetbase\Services\FileResolverService` | Resolver de URL/ruta de archivos en S3 / disco / URLs de datos |

Explore el directorio completo en
`src/Support/`
y
`src/Services/`
.

## Ver también

* [Proveedor de Servicios](https://fleetbase.io/docs/extension-development/backend/service-provider)
  — cómo
  `CoreServiceProvider`
  conecta estos
* [Extensiones y Observadores](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers)
  — patrones para extender el comportamiento del modelo
* [Llamar a la API de su Extensión](https://fleetbase.io/docs/extension-development/recipes/calling-your-extension-api)
  y otras
  [recetas](https://fleetbase.io/docs/extension-development/recipes/calling-your-extension-api)
  — tutoriales concretos utilizando estos servicios
* [Laravel Service Container](https://laravel.com/docs/11.x/container)
  — para resolver servicios del contenedor
* [Laravel Broadcasting](https://laravel.com/docs/11.x/broadcasting)
  — el framework de backend detrás de la integración de SocketCluster

[Servicios Ember

Referencia para los servicios de host que consume su extensión — fetch, store, current-user, session, abilities, intl, notifications, socket, crud, chat, theme, modalsManager, events, app-cache, language, hostRouter, y más.](https://fleetbase.io/docs/extension-development/reference/ember-services)
[Llamar a la API de su Extensión

Realice solicitudes autenticadas desde su motor a la parte posterior de su extensión pasando el espacio de nombres correcto al servicio `fetch`.](https://fleetbase.io/docs/extension-development/recipes/calling-your-extension-api)