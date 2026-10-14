---
title: "API de Servicio"
url: https://fleetbase.io/docs/extension-development/order-presentation/reference/service
module: extension-development
---

Presentación de Pedidos

Referencia

# API de Servicio

El servicio de presentación de pedidos de Fleet-Ops: consultar el perfil de un pedido o configuración de pedido, leer sus secciones y campos y acciones ocultos, y preparar borradores — con la forma de acceder a él desde tu extensión.

# API de Servicio

El servicio `order-presentation` de Fleet-Ops resuelve los perfiles. El formulario, la vista de detalles y los menús de acciones propios de Fleet-Ops los utilizan; tu extensión también puede hacerlo, por ejemplo, para comprobar si un pedido es tuyo.

## Acceder al Servicio

El servicio pertenece al motor de Fleet-Ops.

**Desde
`extension.js`**, puedes acceder a él una vez que Fleet-Ops se haya cargado:

```
export default {
    setupExtension(app, universe) {
        universe.whenEngineLoaded('@fleetbase/fleetops-engine', (engine) => {
            const orderPresentation = engine.lookup('service:order-presentation');
            // …
        });
    },
};
```

**En un componente que Fleet-Ops renderiza**, como una de las secciones de tu perfil, puedes inyectarlo:

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class RentalFormEquipmentComponent extends Component {
    @service orderPresentation;
}
```

**En un manejador de vista de recurso**, que se ejecuta en el contexto de la consola, puedes leer la configuración en lugar de eso:
`order.order_config?.meta?.presentation_profile`

## Métodos

| Miembro | Devuelve | Descripción |
|---|---|---|
| `profiles` | `Array` | Todos los perfiles registrados |
| `profileFor(orderOrConfig)` | `Object | null` | El perfil que se aplica a un pedido o a una configuración de pedido, o `null`. Recibe un pedido (y lee su `order_config`) o una configuración de pedido |
| `sectionsFor(profile, surface)` | `Array` | La lista de secciones `form` o `details` originales del perfil; `[]` si no hay ninguna |
| `renderableSectionsFor(profile, surface)` | `Array` | La lista de secciones como descriptores: `{ key, native: true, name, componentName }` para una sección nativa, `{ key, native: false, component }` para la tuya |
| `isHidden(orderOrConfig, group, key)` | `Boolean` | Indica si el perfil que se aplica oculta un campo ( `group` `'fields'`) o una acción ( `'actions'`) |
| `hiddenFieldsFor(orderOrConfig)` | `string[]` | Los campos ocultos del perfil que se aplica; `[]` si no hay ninguno |
| `prepare(order)` | `Object | null` | Llama al método `prepare(order)` del perfil que se aplica, y devuelve el perfil |

## Ejemplos

```
// ¿Es este pedido nuestro?
const isRental = orderPresentation.profileFor(order)?.id === 'acme-rental';

// Antes de que exista cualquier pedido: ¿tiene este tipo de pedido nuestro perfil?
const isRentalType = orderPresentation.profileFor(orderConfig)?.id === 'acme-rental';

// ¿Oculta el perfil la cancelación?
const canCancel = !orderPresentation.isHidden(order, 'actions', 'cancel');

// ¿Qué campos oculta?
const hidden = orderPresentation.hiddenFieldsFor(order); // ['driver', 'vehicle', …]

// Prepara un borrador que tu extensión crea en código
orderPresentation.prepare(draftOrder);
```

## El Registro

Los perfiles se almacenan en el registro compartido, por lo que no es necesario cargar el motor de Fleet-Ops para registrar uno:

|  |  |
|---|---|
| **Sección** | `fleet-ops:order-presentation` |
| **Lista** | `profiles` |
| **Clave** | El `id` del perfil |

```
const registryService = universe.getService('registry');

registryService.register('fleet-ops:order-presentation', 'profiles', 'acme-rental', profile);
registryService.getRegistry('fleet-ops:order-presentation', 'profiles'); // todos los perfiles
```

Registrar de nuevo con la misma clave reemplaza el perfil.

## Fuente

| Archivo |  |
|---|---|
| `addon/services/order-presentation.js` | El servicio |
| `addon/components/order/form.js` | Renderiza las secciones de formulario |
| `addon/components/order/form/details.js` | Campos ocultos, `detailFields`, `prepare` y `release` |
| `addon/components/order/details.js` | Renderiza las secciones de detalles |

[Objeto de perfil

Todas las claves que puede tener un perfil de presentación de pedidos — id, isEnabled, form, details, hidden, prepare y release — con tipos, valores predeterminados y un ejemplo completo anotado.](https://fleetbase.io/docs/extension-development/order-presentation/reference/profile)
[Solución de problemas

¿Por qué no se aplica un perfil de presentación de pedidos, falta o está vacío una sección, un campo o una acción sigue apareciendo, o un valor persiste después de un cambio de tipo — y cómo solucionarlo.](https://fleetbase.io/docs/extension-development/order-presentation/reference/troubleshooting)