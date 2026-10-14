---
title: "Cómo llamar a la API de tu extensión"
url: https://fleetbase.io/docs/extension-development/recipes/calling-your-extension-api
module: extension-development
---

# Cómo llamar a la API de tu extensión

Realiza peticiones autenticadas desde tu motor a la parte posterior de tu extensión, pasando el espacio de nombres correcto al servicio `fetch`.

# Cómo llamar a la API de tu extensión

El
`fetch`
servicio sabe cómo llamar
**a la API del**
consola de forma predeterminada, pero tu extensión expone sus propias rutas bajo su propio prefijo, y esas llamadas deben ir allí en lugar de eso. Esta receta cubre los patrones: espacio de nombres por llamada, abreviaturas a nivel de controlador y un servicio envoltorio dedicado.

## El problema

Tu extensión declara el prefijo de su API en
`server/src/routes.php`:

```
Route::prefix(config('my-extension.api.routing.prefix', 'my-extension'))
    ->namespace('MyOrg\MyExtension\Http\Controllers')
    ->group(function ($router) {
        $router->group(['middleware' => ['fleetbase.protected']], function ($router) {
            $router->fleetbaseRoutes('widgets');
        });
    });
```

Esto registra
`GET /my-extension/widgets`
,
`POST /my-extension/widgets`
, etc.

Pero por defecto,
`this.fetch.get('widgets')`
desde tu motor golpea el
**espacio de nombres de la**
consola (
`int/v1`
), no el tuyo. Necesitas decirle
`fetch`
dónde enviar la solicitud.

## Solución 1 — Opción de espacio de nombres por llamada

Pasa
`options.namespace`
como el tercer argumento para cualquier método
`fetch`:

```
import { inject as service } from '@ember/service';

export default class WidgetsController extends Controller {
    @service fetch;

    async loadWidgets() {
        const widgets = await this.fetch.get(
            'widgets',                        // path (relative to the namespace)
            { status: 'active' },             // query params
            { namespace: 'my-extension' }     // ← apunta a tu API
        );
        return widgets;
    }

    async createWidget(payload) {
        return this.fetch.post('widgets', payload, { namespace: 'my-extension' });
    }
}
```

Esto funciona para llamadas únicas. Si tu espacio de nombres está versionado (
`my-extension/v1`
), incluye la versión en la cadena del espacio de nombres.

| Método | Firma |
|---|---|
| `fetch.get(path, query?, options?)` | Solicitud GET |
| `fetch.post(path, data?, options?)` | POST con cuerpo JSON |
| `fetch.put(path, data?, options?)` | PUT |
| `fetch.patch(path, data?, options?)` | PATCH |
| `fetch.delete(path, data?, options?)` | DELETE |
| `fetch.upload(path, files[], options?)` | Carga multipart |
| `fetch.download(path, query?, options?)` | Descarga de archivo |

El
`options`
contiene
`namespace`
,
`host`
,
`externalRequest`
,
`fromCache`
,
`normalizeToEmberData`
,
`onSuccess`
,
`onError`
y
`rawError`
. Consulta
[Ember Services → fetch](https://fleetbase.io/docs/extension-development/reference/ember-services#fetch)
.

## Solución 2 — Un servicio envoltorio

Cuando el mismo componente o controlador realiza muchas llamadas a tu API, repetir el espacio de nombres se vuelve engorroso. Define un servicio delgado que pre-configure el espacio de nombres:

```
// addon/services/my-extension-api.js
import Service, { inject as service } from '@ember/service';

export default class MyExtensionApi extends Service {
    @service fetch;

    namespace = 'my-extension/v1';

    get(path, query) {
        return this.fetch.get(path, query, { namespace: this.namespace });
    }

    post(path, data) {
        return this.fetch.post(path, data, { namespace: this.namespace });
    }

    put(path, data) {
        return this.fetch.put(path, data, { namespace: this.namespace });
    }

    delete(path, data) {
        return this.fetch.delete(path, data, { namespace: this.namespace });
    }

    upload(path, files) {
        return this.fetch.upload(path, files, { namespace: this.namespace });
    }
}
```

Inyecta y úsalo como el
`fetch`
subyacente:

```
import { inject as service } from '@ember/service';

export default class WidgetsController extends Controller {
    @service('my-extension-api') api;

    async loadWidgets() {
        return this.api.get('widgets', { status: 'active' });
    }

    async createWidget(payload) {
        return this.api.post('widgets', payload);
    }
}
```

El envoltorio hace que la intención ("estamos hablando con
*nuestra*
API") sea explícita en el punto de llamada, sin exponer la cadena del espacio de nombres en todas partes.

## Solución 3 — setNamespace() (usar con moderación)

`fetch.setNamespace('my-extension')`
modifica el
*servicio compartido*
de
`fetch`
para usar tu espacio de nombres de forma predeterminada.
**Esto afecta a todas las demás llamadas**
desde componentes de otras extensiones que podrían ejecutarse en paralelo. No lo uses a menos que tengas el control total del ciclo de vida de la ruta (por ejemplo, una aplicación aislada independiente donde tu extensión es lo único que se está ejecutando).

```
this.fetch.setNamespace('my-extension');
this.fetch.setHost('https://api.my-extension.example.com'); // también posible
```

Si necesitas este tipo de aislamiento, la solución 2 — un servicio envoltorio es tan ergonómica y no contamina el estado global.

## Versionado

Si tu API está versionada (recomendado para cualquier superficie pública), incluye la versión en el espacio de nombres:

```
// server/src/routes.php
Route::prefix('my-extension')
    ->group(function ($router) {
        $router->group(['prefix' => 'v1', 'middleware' => ['fleetbase.api']], function ($router) {
            $router->fleetbaseRestRoutes('widgets');
        });
    });
```

```
this.fetch.get('widgets', {}, { namespace: 'my-extension/v1' });
```

Los endpoints internos solo suelen usar la convención
`int/v1`:

```
$router->prefix('int/v1')->group(function ($router) {
    $router->group(['middleware' => ['fleetbase.protected']], function ($router) {
        $router->fleetbaseRoutes('widgets');
    });
});
```

```
this.fetch.get('widgets', {}, { namespace: 'my-extension/int/v1' });
```

## Manejo de errores

`fetch`
rechaza con el primer error del array
`errors[]`. Combínalo con
`notifications.serverError()`
para mostrar el mensaje:

```
@service fetch;
@service notifications;

async createWidget(payload) {
    try {
        const widget = await this.fetch.post('widgets', payload, { namespace: 'my-extension' });
        this.notifications.success(`Widget ${widget.public_id} creado`);
        return widget;
    } catch (err) {
        this.notifications.serverError(err, 'No se pudo crear el widget');
        throw err;
    }
}
```

## ¿Y los datos de Ember?

Si estás cargando
**registros**
(no JSON sin procesar), usa el
`store`
en su lugar y deja que un adaptador maneje el espacio de nombres una vez. Consulta la siguiente receta:
[Conectar modelos a tu API de extensión](https://fleetbase.io/docs/extension-development/recipes/connecting-models-to-your-api)
.

## Referencia

* [Ember Services → fetch](https://fleetbase.io/docs/extension-development/reference/ember-services#fetch)
  — superficie de métodos completa
* `addon/services/fetch.js`
  — fuente del servicio
* [Rutas y controladores](https://fleetbase.io/docs/extension-development/backend/routes-and-controllers)
  — declarar la API en el backend

[Servicios de API

Clases de soporte entregadas por fleetbase/core-api — SmsService, los helpers de Support\Http y Support\Find/Resolve, NotificationRegistry y el emisor SocketCluster.](https://fleetbase.io/docs/extension-development/reference/api-services)
[Conectar modelos a tu API de extensión

Conecta modelos de Ember Data a la API de tu extensión extendiendo ApplicationAdapter con el espacio de nombres correcto, luego apunta cada modelo al adaptador correcto.](https://fleetbase.io/docs/extension-development/recipes/connecting-models-to-your-api)