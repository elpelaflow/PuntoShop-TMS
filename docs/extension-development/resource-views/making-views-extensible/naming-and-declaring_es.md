---
título: "Nomenclatura y Declaración"
url: https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/naming-and-declaring
módulo: extension-development
---

Vistas de Recursos

Hacer que sus vistas sean extensibles

# Nomenclatura y Declaración

Elija los nombres de registro para su motor a través de `ResourceActionService` y declare cada registro para sus recursos en `setupExtension`.

# Nomenclatura y Declaración

## Nomenclatura

Los nombres de registro siguen la misma regla que todos los demás motores:
`<extension>:<resource>:<surface>:<slot>`
. La
`extension`
parte es la sección de su motor en la URL de la consola: un motor montado en
`console.acme`
usa
`acme`
.

Si sus servicios de acción extienden
`ResourceActionService`
, funcionan con los nombres que ya proporciona a
`initialize()`
:

```
// addon/services/shipment-actions.js
import ResourceActionService from '@fleetbase/ember-core/services/resource-action';

export default class ShipmentActionsService extends ResourceActionService {
    constructor() {
        super(...arguments);
        this.initialize('acme-shipment', { permissionPrefix: 'acme', mountPrefix: 'console.acme' });
    }
}
```

| Propiedad | Valor | Proviene de |
|---|---|---|
| `registryExtension` | `acme` | `mountPrefix`, sin `console.` |
| `registryResource` | `shipment` | El nombre del modelo, sin el prefijo del propio motor |
| `tableRegistry` | `acme:shipment:table` | Ambos |
| `detailsRegistry` | `acme:shipment:details` | Ambos |

### Cuando el nombre del modelo no es el nombre del recurso

Proporcione
`registryResource`
y
`registryExtension`
si es necesario:

```
// El modelo es api-credential, pero los usuarios lo conocen como API keys
this.initialize('api-credential', { permissionPrefix: 'developers', mountPrefix: 'console.developers', registryResource: 'api-key' });

// Dos vistas del modelo de contacto
this.initialize('contact', { defaultAttributes: { type: 'customer' }, registryResource: 'customer' });
```

Elija nombres que los usuarios reconozcan en la pantalla: el nombre del recurso es lo que otros autores de extensiones escriben.

## Declaración

Declare sus recursos desde
`setupExtension`
, para que sus registros existan antes de que cualquier extensión se registre en ellos:

```
// addon/extension.js
export default {
    setupExtension(app, universe) {
        // …sus menús, widgets y hooks

        universe.getService('universe/resource-view-service')?.declare('acme', ['shipment', 'carrier', 'manifest']);
    },
};
```

`declare(extension, resources)`
crea todos los siete registros para cada recurso, incluyendo el alias
`details:tabs`
, y devuelve sus nombres.

El
`?.`
mantiene funcionando su motor en una consola con una versión anterior de ember-core, que no tiene el servicio.

## Siguiente

[Diseños →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/layouts): renderice los elementos registrados en sus tablas y paneles de detalles.

[Visión general

Permita que otras extensiones agreguen columnas, acciones, botones y pestañas a sus propias tablas y vistas de detalles del motor: lo que se necesita, en cinco pasos, y una lista de verificación.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
[Diseños

Proporcione @registry a Layout::Resource::Tabular, Layout::Resource::Panel, TabularActions y los paneles laterales del contexto de recursos, para que se fusionen las columnas, acciones, botones y elementos del menú registrados.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/layouts)