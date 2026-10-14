---
title: "Decoradores"
url: https://fleetbase.io/docs/extension-development/reference/decorators
module: extension-development
---

# Decoradores

Decoradores de propiedades de `@fleetbase/ember-core` para la inyección de servicios entre motores y la carga de datos de forma diferida: `@engineService`, `@fromStore` y `@fetchFrom`.

# Decoradores

`@fleetbase/ember-core`
proporciona tres decoradores de propiedades personalizados para los patrones que no cubre el `@service` incorporado de Ember: la obtención de un servicio de otro motor, la consulta diferida del almacén en el primer acceso, y la obtención diferida de la API en el primer acceso.

## `@engineService`

Inyecta un servicio que vive en
**otro**
motor. Es útil cuando una extensión necesita el servicio `location` de Fleet-Ops, el servicio `currency` de Ledger, etc. Un `@service` regular no puede acceder a servicios entre motores.

```
import Component from '@glimmer/component';
import engineService from '@fleetbase/ember-core/decorators/engine-service';

export default class OrderTrackingLookup extends Component {
    @engineService('@fleetbase/fleetops-engine') location;
    @engineService('@fleetbase/fleetops-engine') movementTracker;
    // …
}
```

Ejemplo real:
[`packages/fleetops/addon/components/order-tracking-lookup.js:21`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/fleetops/addon/components/order-tracking-lookup.js#L21)
.

### Firma

```
@engineService(engineName, options?) propertyName;
```

| Argumento | Descripción |
|---|---|
| `engineName` | El nombre del paquete del motor (por ejemplo, `'@fleetbase/fleetops-engine'`) |
| `options` | Opcional `{ serviceName }` — por defecto, el nombre de la propiedad si desea un nombre de servicio diferente |
| `propertyName` | Por defecto, el nombre de la propiedad ( `location` → `service:location` en el motor de destino) |

### Cómo funciona

El decorador se resuelve en una propiedad calculada que, al primer acceso, carga el motor de destino mediante `extensionManager.ensureEngineLoaded(engineName)` y busca el servicio en el contenedor del motor. El primer acceso es asíncrono; debe gestionarse adecuadamente. Los accesos posteriores devuelven el servicio en caché de forma sincrónica.

### Cuándo usar

* Integraciones entre motores que no se pueden expresar mediante `ExtensionComponent` o slots de registro
* Desencadenar una acción en otro motor desde su componente o controlador
* Leer el estado de un servicio cuyo motor propietario se carga bajo demanda

Cuando no esté seguro, prefiera registrar un componente renderizable a través del [Registry Service](https://fleetbase.io/docs/extension-development/universe/registry-service) — de esta manera, no se interactúa con el contenedor del motor de destino en absoluto.

## `@fromStore`

Realiza una consulta diferida al almacén de Ember Data en el primer acceso de una propiedad rastreada:

```
import fromStore from '@fleetbase/ember-core/decorators/from-store';

export default class WebhooksController extends Controller {
    @fromStore('api-credential', { limit: -1 }) apiCredentials;
}
```

Esto es equivalente a escribir:

```
get apiCredentials() {
    return this.store.query('api-credential', { limit: -1 });
}
```

…pero en lugar de volver a consultar cada vez que se accede, se guarda el valor resuelto, y no tiene que referenciar `this.store` constantemente.

### Firma

```
@fromStore(modelName, query?, options?) propertyName;
```

| Argumento | Descripción |
|---|---|
| `modelName` | Nombre del modelo de Ember Data (por ejemplo, `'api-credential'`) |
| `query` | Hash de consulta que se pasa a `store.query()` |
| `options` | Opciones del adaptador que se pasan como el tercer argumento, más la función de devolución de llamada `onComplete(response, this)` |

El primer acceso devuelve una Promesa; la asignación al resolver permite que la plantilla se actualice automáticamente una vez que se ha obtenido los datos. Si la consulta falla, la propiedad se establece en `null`.

También existe una variante `legacy-from-store` para código en objetos Ember clásicos (estilo de propiedad calculada); el decorador moderno es el predeterminado.

## `@fetchFrom`

Igual que `@fromStore`, pero para puntos finales de API sin procesar mediante el servicio `fetch` — no Ember Data:

```
import fetchFrom from '@fleetbase/ember-core/decorators/fetch-from';

export default class WebhooksViewController extends Controller {
    @fetchFrom('webhook-endpoints/events') webhookEvents;
    @fetchFrom('webhook-endpoints/versions') apiVersions;
}
```

Esto es equivalente a:

```
get webhookEvents() {
    return this.fetch.get('webhook-endpoints/events');
}
```

…con el mismo comportamiento de almacenamiento en caché y auto-establecimiento que `@fromStore`.

### Firma

```
@fetchFrom(endpoint, query?, options?) propertyName;
```

| Argumento | Descripción |
|---|---|
| `endpoint` | Ruta que se pasa a `fetch.get()` (relativa a su base de API) |
| `query` | Parámetros de consulta que se serializan en la URL |
| `options` | Opciones que se pasan a `fetch.get()` como el objeto de opciones, más la función de devolución de llamada `onComplete(response, this)` |

Ejemplo real:
[`packages/dev-engine/addon/controllers/webhooks/view.js:25`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/dev-engine/addon/controllers/webhooks/view.js#L25)
.

## Cuándo usar cada uno

| Quieres… | Usa |
|---|---|
| Un servicio de otro motor | `@engineService` |
| Registros de Ember Data, cargados de forma diferida | `@fromStore` |
| JSON de API sin procesar, cargado de forma diferida | `@fetchFrom` |
| Un servicio de su propio motor | `@service` (Ember incorporado) |
| Datos necesarios de forma inmediata antes de renderizar | Hook del `model()` de la ruta |

## Referencia

| Archivo | Descripción |
|---|---|
| `addon/decorators/engine-service.js` | Decorador de servicio entre motores |
| `addon/decorators/from-store.js` | Decorador para `store.query` de forma diferida |
| `addon/decorators/fetch-from.js` | Decorador para `fetch.get` de forma diferida |
| `addon/utils/inject-engine-service.js` | Resolutor subyacente del servicio del motor |

[Contracts

Referencia para todos los contratos en `@fleetbase/ember-core/contracts — MenuItem, MenuPanel, Widget, Hook, ExtensionComponent, TableColumn, ResourceAction, ActionButton, Registry, TemplateHelper, BaseContract.](https://fleetbase.io/docs/extension-development/reference/contracts)
[Ember Services

Referencia para los servicios del host que consume su extensión — fetch, store, current-user, session, abilities, intl, notifications, socket, crud, chat, theme, modalsManager, events, app-cache, language, hostRouter, y más.](https://fleetbase.io/docs/extension-development/reference/ember-services)