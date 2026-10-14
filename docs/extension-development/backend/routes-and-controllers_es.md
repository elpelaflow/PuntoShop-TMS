---
title: "Rutas y Controladores"
url: https://fleetbase.io/docs/extension-development/backend/routes-and-controllers
module: extension-development
---

# Rutas y Controladores

Define rutas de API con los macros de rutas de Fleetbase, elige el grupo de middleware adecuado y construye controladores de recursos basados en la clase `HasApiControllerBehavior`.

# Rutas y Controladores

Las rutas para una extensión residen en
**`server/src/routes.php`**
(cargadas por tu proveedor de servicios a través de
`loadRoutesFrom`). Las definiciones de rutas siguen las convenciones de Laravel: Fleetbase añade tres macros que se encargan de la configuración básica.

## El archivo de rutas

```
<?php

use Illuminate\Support\Facades\Route;

Route::prefix(config('my-extension.api.routing.prefix', 'my-extension'))
    ->namespace('MyOrg\MyExtension\Http\Controllers')
    ->group(function ($router) {
        // Webhooks públicos — sin autenticación
        $router->post('webhooks/inbound', 'WebhookController@inbound');

        // Consola interna — autenticación de sesión
        $router->group(['middleware' => ['fleetbase.protected']], function ($router) {
            $router->fleetbaseRoutes('widgets');
            $router->fleetbaseRoutes('reports', function ($router, $controller) {
                $router->get('summary', $controller('summary'));
                $router->post('export', $controller('export'));
            });
        });

        // API pública — autenticación con clave de API
        $router->group(['prefix' => 'v1', 'middleware' => ['fleetbase.api']], function ($router) {
            $router->fleetbaseRestRoutes('widgets');
        });
    });
```

Ejemplo real:
`fleetops/server/src/routes.php`
.

## Macros de Rutas

`fleetbase/core-api`
define tres macros de rutas a través de la extensión
`src/Expansions/Route.php`:

### `fleetbaseRestRoutes($name, $controller = null, $options = [], $callback = null)`

Registra las siete rutas REST para un recurso:

| Verbo | Ruta | Acción |
| --- | --- | --- |
| `GET` | `/widgets` | `index` |
| `POST` | `/widgets` | `store` |
| `GET` | `/widgets/{id}` | `show` |
| `PUT/PATCH` | `/widgets/{id}` | `update` |
| `DELETE` | `/widgets/{id}` | `destroy` |
| `POST` | `/widgets/bulk-delete` | `bulkDelete` (función extra de Fleetbase) |
| `GET` | `/widgets/export` | `export` (función extra de Fleetbase) |

El controlador por defecto es
`WidgetController`
(singular-studly +
`Controller`) cuando no se especifica.

```
$router->fleetbaseRestRoutes('widgets'); // → WidgetController
$router->fleetbaseRestRoutes('widgets', 'CustomWidgetController');
```

### `fleetbaseRoutes($name, $registerFn = null, $options = [], $controller = null)`

Similar a
`fleetbaseRestRoutes`
pero te permite anidar rutas adicionales bajo el mismo prefijo y controlador:

```
$router->fleetbaseRoutes('widgets', function ($router, $controller) {
    $router->get('archived', $controller('archived'));
    $router->post('{id}/duplicate', $controller('duplicate'));
});
// Registra: /widgets/archived, /widgets/{id}/duplicate, además de las rutas REST estándar
```

El
`$controller`
callback devuelve cadenas de
`'WidgetController@actionName'`.

### `fleetbaseAuthRoutes($authControllerClass = null, $registerFn = null, $registerProtectedFn = null)`

Registra el paquete de rutas de autenticación estándar (
`/auth/login`
,
`/auth/sign-up`
,
`/auth/reset-password`
, etc.). Úsalo cuando tu extensión proporciona una superficie de autenticación alternativa (por ejemplo, portal de conductores, API de socios).

## Grupos de Middleware

Elige un grupo según
**quién llama a la ruta**:

| Grupo | Autenticación | Cuándo usar |
| --- | --- | --- |
| `fleetbase.protected` | Sanctum + sesión | Consola interna — la interfaz de usuario del motor llamando a su propio backend |
| `fleetbase.api` | Clave de API (autenticación básica) | API REST pública consumida por integraciones externas |
| (ninguno) | Público | Webhooks, callbacks de enlace mágico, puntos finales anónimos |

Ambos grupos incluyen control de velocidad, registro de solicitudes y enrutamiento.
`fleetbase.protected`
además ejecuta
`SetupFleetbaseSession`
,
`AuthorizationGuard`
, y el seguimiento de la presencia — definidas en
`CoreServiceProvider::$middleware`
.

## Controladores

Tres clases base vienen con
`core-api`
:

### `Fleetbase\Http\Controllers\Controller`

Controlador de Laravel estándar con
`AuthorizesRequests`
,
`DispatchesJobs`
,
`ValidatesRequests`
. Úsalo para puntos finales aislados que no siguen el patrón de recursos REST.

### `Fleetbase\Http\Controllers\FleetbaseController`

Clase base abstracta que añade la clase `HasApiControllerBehavior` — que conecta los métodos de acción y el transformador de recursos JSON:

```
namespace MyOrg\MyExtension\Http\Controllers;

use Fleetbase\Http\Controllers\FleetbaseController;

class WidgetController extends FleetbaseController
{
    public string $namespace = '\\MyOrg\\MyExtension';
}
```

La propiedad
`$namespace`
indica a la clase trait dónde encontrar tus clases
`Models/Widget`
y
`Http/Resources/Widget`
— configúrala una vez y
`index/show/store/update/destroy`
funcionan automáticamente.

### Extender `FleetbaseController` directamente

Para un controlador de recursos totalmente configurado, normalmente no escribes tus propios métodos de acción. En su lugar, sobrescribe los hooks para un comportamiento personalizado:

```
namespace MyOrg\MyExtension\Http\Controllers;

use Fleetbase\Http\Controllers\FleetbaseController;
use Illuminate\Http\Request;

class WidgetController extends FleetbaseController
{
    public string $namespace = '\\MyOrg\\MyExtension';

    public $resource = 'widget';
    public $createRequest = \MyOrg\MyExtension\Http\Requests\WidgetRequest::class;
    public $updateRequest = \MyOrg\MyExtension\Http\Requests\WidgetRequest::class;

    public function onBeforeCreate(Request $request, array &$input)
    {
        $input['company_uuid'] = session('company');
    }

    public function onAfterUpdate($model, Request $request)
    {
        // despacha un trabajo de sincronización, envía una notificación, etc.
    }
}
```

Ejemplo real:
`ledger/server/src/Http/Controllers/Internal/v1/InvoiceController.php`
.

## Solicitudes de Formulario

Para la validación, utiliza las clases de solicitud de formulario de Laravel. Fleetbase proporciona una clase base
`Fleetbase\Http\Requests\FleetbaseRequest`
que añade la autenticación basada en la sesión:

```
namespace MyOrg\MyExtension\Http\Requests;

use Fleetbase\Http\Requests\FleetbaseRequest;

class WidgetRequest extends FleetbaseRequest
{
    public function authorize(): bool
    {
        return $this->session()->has('user');
    }

    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:120',
            'description' => 'nullable|string',
            'metadata'    => 'array',
        ];
    }
}
```

Hace referencia a estas desde las propiedades
`$createRequest`
/
`$updateRequest`
de tu controlador.

## Acceder al usuario autenticado

Dentro de una ruta protegida,
`$request->user()`
devuelve el usuario autenticado
`Fleetbase\Models\User`
. La compañía activa está en la sesión:

```
$user      = $request->user();
$companyId = session('company'); // string UUID
```

Para las rutas de API con clave de API (
`fleetbase.api`
), el contexto de autenticación es la credencial de API —
`$request->user()`
se resuelve a través de Sanctum para el usuario asociado a la credencial, y la compañía se establece desde la credencial.

## Rutas de Recursos — Registrador de Rutas

`fleetbaseRestRoutes`
utiliza un
`Fleetbase\Routing\RESTRegistrar`
personalizado en lugar del registrador de recursos incorporado de Laravel. El registrador normaliza los parámetros de ID (siempre
`{id}`
), asegura que las secciones de URI estén con guiones y conecta las operaciones en lote.

Si necesitas una forma de verbo no estándar, omite y utiliza rutas simples
`Route::get`
/
`Route::post`
.

## Fuente

| Archivo | Descripción |
|---|---|
| `src/Expansions/Route.php` | `fleetbaseRoutes` , `fleetbaseRestRoutes` , `fleetbaseAuthRoutes` |
| `src/Routing/RESTRegistrar.php` | Generador de rutas REST |
| `src/Http/Controllers/FleetbaseController.php` | Clase base de controlador de recursos |
| `src/Traits/HasApiControllerBehavior.php` | Clase trait que conecta los métodos de acción |
| `ledger/server/src/Http/Controllers/Internal/v1/InvoiceController.php` | Ejemplo de controlador de recursos |
| `fleetops/server/src/routes.php` | Archivo de rutas de ejemplo |