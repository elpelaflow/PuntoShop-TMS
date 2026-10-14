---
title: "Objeto de Perfil"
url: https://fleetbase.io/docs/extension-development/order-presentation/reference/profile
module: extension-development
---

Presentación de Pedidos

Referencia

# Objeto de Perfil

Cada clave que puede tener un perfil de presentación de pedidos — id, isEnabled, form, details, hidden, prepare y release — con tipos, valores predeterminados y un ejemplo completo y comentado.

# Objeto de Perfil

Un perfil es un objeto simple, registrado en el
`fleet-ops:order-presentation`
registro bajo
`profiles`
:

```
universe.getService('registry').register('fleet-ops:order-presentation', 'profiles', profile.id, profile);
```

## Claves

Propiedad

Tipo

`id`

cadena

`isEnabled
?`

(orderConfig) => booleano

`form.sections`

Array<string | ExtensionComponent>

`form.detailFields
?`

ExtensionComponent

`form.titles.route
?`

cadena

`details.sections`

Array<string | ExtensionComponent>

`hidden.fields
?`

string[]

`hidden.actions
?`

string[]

`prepare
?`

(order) => void

`release
?`

(order) => void

| Clave | Referencia |
|---|---|
| `form.sections` | [El formulario de pedidos](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form) |
| `form.detailFields`, `form.titles`, `hidden.fields` | [Campos de formulario](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields) |
| `details.sections` | [La vista de detalles](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view) |
| `hidden.actions` | [Acciones](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions) |
| `prepare`, `release` | [Borradores y validación](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation) |

Su objeto de perfil se pasa a sus secciones como
`@profile`
, para que también pueda mantener sus propias configuraciones en él, bajo una clave que lleve el nombre de su extensión.

## isEnabled

Sin
`isEnabled`
, un perfil se aplica a todos los pedidos cuyo nombre lo especifique. Añádalo cuando el nombre por sí solo no es suficiente.

### Solo la configuración de su organización

Si su extensión instala una configuración de pedido por organización, aplique el perfil solo a la configuración que ha instalado, mediante UUID. Un usuario puede renombrar una configuración, pero no puede cambiar su UUID:

```
// rentalState.orderConfigUuid se carga de su API cuando Fleet-Ops se carga
isEnabled: (orderConfig) => Boolean(orderConfig?.id) && orderConfig.id === rentalState.orderConfigUuid,
```

### Solo mientras una configuración está activada

```
isEnabled: (orderConfig) => orderConfig?.meta?.acme_rental?.enabled !== false,
```

### Manténgalo rápido

`isEnabled`
se ejecuta cada vez que se renderiza un formulario, una vista de detalles o un menú de acciones. Lea el estado que ya tiene su extensión; no lo obtenga. Cargue lo que necesita una vez, por ejemplo, cuando se carga el motor Fleet-Ops:

```
universe.whenEngineLoaded('@fleetbase/fleetops-engine', async () => {
    const { order_config } = await app.lookup('service:fetch').get('setup', {}, { namespace: 'acme-rental/int/v1' });
    rentalState.orderConfigUuid = order_config;
});
```

**Piense en lo que ocurre cuando
`isEnabled`
devuelve
`false`
.**
El pedido vuelve a la configuración predeterminada y a las acciones, incluyendo el envío y la eliminación, a menos que una
[configuración de ciclo de vida](https://fleetbase.io/docs/extension-development/order-lifecycles)
lo bloquee en el servidor. Si desea que los pedidos estén en modo de solo lectura mientras su extensión está desactivada, mantenga el perfil aplicado y desactive las cosas en sus propias secciones en lugar de eso.

## Un ejemplo completo

```
// addon/extension.js
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';
import rentalState from './utils/rental-state';

const ENGINE = '@acme/rental-engine';
const section = (path) => new ExtensionComponent(ENGINE, path);

export default {
    setupExtension(app, universe) {
        universe.getService('registry').register('fleet-ops:order-presentation', 'profiles', 'acme-rental', {
            id: 'acme-rental',

            // Solo la configuración que esta extensión ha instalado para esta organización.
            isEnabled: (orderConfig) => rentalState.isRental(orderConfig),

            form: {
                // Referencia, depósito y "Next to the order type"
                detailFields: section('rental/form/detail-fields'),
                // "Delivery & collection" en lugar de "Route"
                titles: { route: 'Delivery & collection' },
                // Detalles, luego el equipo, luego la ruta, notas y documentos
                sections: ['details', section('rental/form/equipment'), 'route', 'notes', 'documents'],
            },

            details: {
                // El resumen del alquiler primero, luego las secciones nativas que utiliza un alquiler
                sections: [section('rental/details/summary'), 'activity', 'route', 'notes', 'documents', 'comments'],
            },

            hidden: {
                // Nada relacionado con el envío; la referencia reemplaza el ID interno
                fields: ['internal-id', 'facilitator', 'service-type', 'driver', 'vehicle', 'pod', 'adhoc', 'dispatch', 'multiple-waypoints'],
                // Sin envío, sin conductores, sin etiqueta de envío
                actions: ['dispatch', 'assign-driver', 'unassign-driver', 'view-label'],
            },

            prepare(order) {
                order.set('dispatched', false);
                order.set('adhoc', false);
                order.set('driver_assigned', null);
                order.set('vehicle_assigned', null);
                order.set('pod_required', false);
                order.set('meta', { ...(order.meta ?? {}), rental: order.meta?.rental ?? { days: 1 } });
            },

            release(order) {
                const { rental, ...meta } = order.meta ?? {};
                order.set('meta', meta);
            },
        });
    },
};
```

[Borradores y validación

Prepare un nuevo pedido cuando un usuario lo cambia a su tipo de pedido y limpie cuando lo cambian de nuevo, con prepare y release, y requiera sus propios campos antes de guardar un pedido, con reglas de validación de creación de pedidos.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation)
[Service API

El servicio de presentación de pedidos de Fleet-Ops — busque el perfil de un pedido o configuración de pedido, lea sus secciones y campos ocultos y acciones, y prepare borradores — sobre cómo acceder a él desde su extensión.](https://fleetbase.io/docs/extension-development/order-presentation/reference/service)