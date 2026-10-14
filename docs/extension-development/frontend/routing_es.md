---
título: "Enrutamiento"
url: https://fleetbase.io/docs/extension-development/frontend/routing
módulo: extension-development
---

# Enrutamiento

Cómo está estructurado el motor Ember del frontend de una extensión: `engine.js`, `routes.js`, dependencias del servicio anfitrión, y cómo se adjuntan las rutas al panel de control de Fleetbase.

# Enrutamiento

La mitad del frontend de una extensión es un
**motor Ember**
instalado dentro del panel de control de Fleetbase. El panel de control gestiona la interfaz de usuario principal (cabecera, barra lateral, autenticación) y dirige cualquier URL bajo
`/console/<tu_montaje>/…`
a tu motor.

## El Diseño de la Extensión

```
addon/
├── extension.js          # Punto de entrada de registro del universo
├── engine.js             # Clase del motor + dependencias
├── routes.js             # Mapa de rutas del motor
├── routes/
│   └── application.js    # Ruta de la aplicación — se ejecuta en cada entrada
├── controllers/
├── components/
├── templates/
├── services/
├── models/
└── serializers/
```

## addon/engine.js

La clase del motor declara qué
**servicios**
del anfitrión utiliza tu motor, y a qué rutas externas se vincula. Utiliza las exportaciones estándar de
`@fleetbase/ember-core`
en lugar de crear las listas manualmente.

```
// addon/engine.js
import Engine from '@ember/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from './config/environment';
import { services, externalRoutes } from '@fleetbase/ember-core/exports';

const { modulePrefix } = config;

export default class MyExtensionEngine extends Engine {
    modulePrefix = modulePrefix;
    Resolver = Resolver;
    dependencies = {
        services,
        externalRoutes,
    };
}

loadInitializers(MyExtensionEngine, modulePrefix);
```

El array exportado
`services`
incluye
`store`
,
`session`
,
`current-user`
,
`fetch`
,
`notifications`
,
`intl`
,
`abilities`
,
`universe`
, los cuatro sub-servicios del universo, y varias utilidades del panel de control. La lista completa se encuentra en
`addon/exports/services.js`
— comienza con la exportación y añade las tuyas propias solo si tienes algo personalizado.

`externalRoutes`
es
`['console', 'extensions']`
— las rutas anfitrionas a las que puedes navegar con
`transitionToExternal('console.…')`
.

**Este archivo ya no es donde se conectan las extensiones.**
Las entradas de la extensión (elementos del menú, widgets, hooks, registros) deben estar en
`addon/extension.js`
— consulta
[Extension Registration](https://fleetbase.io/docs/extension-development/architecture/extension-registration)
.
`engine.js`
solo define el motor en sí.

## addon/routes.js

El mapa de rutas del motor se construye con
`buildRoutes()`
de
`ember-engines`
. Las rutas son relativas al punto de montaje del motor: una ruta llamada
`'orders'`
se corresponde con
`/console/<montaje>/orders`
.

```
// addon/routes.js
import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function () {
    this.route('orders', function () {
        this.route('index', { path: '/' });
        this.route('new');
        this.route('details', { path: '/:public_id' }, function () {
            this.route('index', { path: '/' });
            this.route('edit');
        });
    });

    this.route('settings');

    // Ruta virtual — consulta la guía de Rutas Virtuales
    this.route('virtual', { path: '/:section/:slug' });
});
```

Ejemplo real:
[`packages/fleetops/addon/routes.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/fleetops/addon/routes.js)
.

## Punto de Montaje

El panel de control deriva el punto de montaje de tu motor del nombre del paquete:
`@my-org/my-extension-engine`
se monta en
`console.my-extension`
. Se elimina el sufijo
`-engine`
y se elimina el ámbito de la organización. Un elemento del menú del encabezado registrado con la ruta
`console.my-extension`
se dirigirá a la ruta de índice del motor.

## La Ruta de la Aplicación

`addon/routes/application.js`
se ejecuta una vez al iniciar el motor y es tu punto de entrada para la configuración del nivel del motor que necesita la instancia del motor. La mayoría de la conexión entre extensiones debe vivir en
`addon/extension.js`
, pero la configuración local del motor (clases de tema, tokens de acceso, polling) va aquí.

```
// addon/routes/application.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
    @service theme;
    @service session;

    activate() {
        this.theme.setRoutebodyClassNames(['my-extension']);
    }
}
```

## Enlazar entre Rutas

Dentro de las plantillas del motor, los nombres de las rutas son relativos al motor:

```
<LinkTo @route="orders.details" @model={{order.public_id}}>
    {{order.public_id}}
</LinkTo>
```

Para enlazar al panel de control, utiliza
`LinkToExternal`
:

```
<LinkToExternal @route="console.fleet-ops.operations.orders">
    Abrir en Fleet-Ops
</LinkToExternal>
```

Programáticamente desde una ruta o controlador:

```
this.transitionToExternal('console.settings');
```

## Rutas Autenticadas

La ruta de la aplicación exterior del panel de control gestiona la autenticación: cuando las rutas de tu motor se ejecutan, el usuario ya está autenticado y
`session.currentUser`
está disponible. No necesitas añadir
`AuthenticatedRouteMixin`
(y de hecho, no existe en Ember 5+ ESM).

Para la gestión basada en roles, utiliza el servicio
`abilities`
. Las cadenas de permisos de Fleetbase siempre siguen el formato
**`{extension} {acción} {recurso}`**
— nombre de la extensión + verbo + singular de recurso:

```
@service abilities;

beforeModel() {
    if (!this.abilities.can('fleet-ops view order')) {
        return this.transitionToExternal('console');
    }
}
```

Ejemplos de claves de permisos válidas:

| Permiso | Significado |
|---|---|
| `'fleet-ops view order'` | Ver órdenes en Fleet-Ops |
| `'fleet-ops create order'` | Crear órdenes en Fleet-Ops |
| `'ledger update invoice'` | Editar facturas en Ledger |
| `'my-extension delete widget'` | Eliminar widgets en tu extensión |

El servicio
`abilities`
se basa en
[ember-can](https://github.com/minutebase/ember-can#readme)
— consulta su documentación para obtener el API completo para declarar capacidades. Fleetbase conecta estas claves a un conjunto de permisos de usuario en el backend.

## Modelos, Serializadores, Adaptadores

Los modelos locales del motor viven bajo
`addon/models/`
. El servicio
`store`
es compartido desde el anfitrión, por lo que los modelos registrados en tu motor son visibles para él después del inicio. Los adaptadores extienden
`@fleetbase/ember-core/adapters/application`
, que ya gestiona el espacio de nombres de la API, el anfitrión, los encabezados y la autenticación.

```
// addon/adapters/application.js
import ApplicationAdapter from '@fleetbase/ember-core/adapters/application';

export default class extends ApplicationAdapter {
    namespace = 'my-extension/v1';
}
```

Consulta
`@fleetbase/ember-core/adapters/application`
para la clase base.

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/exports/services.js` | Exportaciones canónicas de dependencias del motor |
| [`packages/fleetops/addon/engine.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/fleetops/addon/engine.js) | Clase del motor de referencia |
| [`packages/fleetops/addon/routes.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/fleetops/addon/routes.js) | Mapa de rutas de referencia |