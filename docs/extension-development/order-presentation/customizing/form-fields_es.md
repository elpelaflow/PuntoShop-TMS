---
title: "Campos del formulario"
url: https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields
module: extension-development
---

Presentación del pedido

Personalización

# Campos del formulario

Modifique los campos dentro de las secciones nativas de detalles y rutas del formulario de pedido: agregue sus propios campos con `form.detailFields`, oculte los campos con `hidden.fields`, cambie el nombre de la sección de ruta y oculte la ruta de múltiples puntos.

# Campos del formulario

Las secciones nativas
`details`
y
`route`
se pueden ajustar sin reemplazarlas:

| Lo que desea hacer | Use |
| --- | --- |
| Agregar algunos campos junto con los existentes | [`form.detailFields`](#adding-fields) |
| Ocultar los campos existentes | [`hidden.fields`](#hiding-fields) |
| Cambiar el nombre de la sección de ruta | [`form.titles.route`](#the-route-section) |
| Permitir solo una recogida y una entrega | [`hidden.fields: ['multiple-waypoints']`](#the-route-section) |

## Agregar campos

`form.detailFields`
es un componente de su motor, renderizado
**dentro de la cuadrícula de la sección de
`details`**,
inmediatamente después del tipo de pedido. Úselo para algunos campos que pertenecen junto con los existentes, en lugar de una sección propia.

```
form: {
    detailFields: new ExtensionComponent('@acme/rental-engine', 'rental/form/detail-fields'),
    sections: ['details', 'route', 'notes'],
},
```

Los campos que siguen en la cuadrícula se mueven, por lo que el tipo de pedido, sus campos y los campos existentes se leen como un solo formulario.

El componente recibe
`@order`
,
`@resource`
(el mismo pedido) y
`@profile`
. Renderiza
**dentro**
de una cuadrícula, así que renderice
`InputGroup`
s simples, no un
`ContentPanel`
:

```
// addon/components/rental/form/detail-fields.js
import Component from '@ember/component';
import { action } from '@ember/object';

export default class RentalFormDetailFieldsComponent extends Component {
    @action selectDepot(place) {
        // El depósito es donde salen los equipos: la recogida del pedido.
        this.args.order.payload.set('pickup', place);
    }
}
```

```
{{! addon/components/rental/form/detail-fields.hbs }}
<InputGroup @name="Referencia" @value={{@order.internal_id}} @helpText="Su propia referencia para este alquiler." />
<InputGroup @name="Depósito">
    <ModelSelect @modelName="place" @selectedModel={{@order.payload.pickup}} @onChange={{this.selectDepot}} @placeholder="Seleccionar depósito" as |place|>
        {{place.name}}
    </ModelSelect>
</InputGroup>
```

Este ejemplo muestra el identificador interno nativo bajo su propia etiqueta. Oculte el campo nativo
`internal-id`
para que no se muestre dos veces.

## Ocultar campos

`hidden.fields`
oculta los campos en las secciones nativas
`details`
y
`route`
:

| Clave | Oculta | Sección |
| --- | --- | --- |
| `internal-id` | ID interno | `details` |
| `schedule` | Horario | `details` |
| `customer` | Cliente | `details` |
| `facilitator` | Facilitador | `details` |
| `service-type` | Tipo de servicio de un proveedor integrado | `details` |
| `driver` | Asignar conductor | `details` |
| `vehicle` | Asignar vehículo | `details` |
| `pod` | El interruptor y el método de confirmación de entrega | `details` |
| `adhoc` | El interruptor y la distancia de ping | `details` |
| `dispatch` | El interruptor de despachos | `route` |
| `multiple-waypoints` | El interruptor de múltiples puntos | `route` |

```
hidden: {
    fields: ['internal-id', 'facilitator', 'service-type', 'driver', 'vehicle', 'pod', 'adhoc', 'dispatch'],
},
```

No se pueden ocultar el selector del tipo de pedido y los campos personalizados de la configuración del pedido.

**Ocultar un campo no elimina su valor.**
Si un usuario seleccionó un conductor antes de cambiar el tipo de pedido, el conductor aún está en el pedido. Elimine los valores que no apliquen en
[`prepare`](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation#preparing-drafts)
.

## La sección de ruta

### Cambiar su nombre

```
form: {
    titles: { route: 'Entrega y recogida' },
    sections: ['details', 'route'],
},
```

`titles.route`
es la única sección cuyo título puede cambiar un perfil.

### Solo recogida y entrega

Oculte
`multiple-waypoints`
para eliminar el interruptor de múltiples puntos, de modo que la ruta sea siempre una recogida y una entrega:

```
hidden: {
    fields: ['multiple-waypoints'],
},
```

## Sus propias secciones pueden leer hidden.fields

Las secciones de su formulario reciben los campos ocultos del perfil como
`@hiddenFields`,
por lo que un solo componente puede servir a varios perfiles que ocultan diferentes cosas:

```
{{#unless (includes "deposit" @hiddenFields)}}
    <InputGroup @name="Depósito" @type="number" @value={{this.rental.deposit}} {{on "input" (fn this.update "deposit")}} />
{{/unless}}
```

Use sus propios nombres de clave para sus propios campos; Fleet-Ops ignora las claves que no conoce.

[El formulario de pedido

Compose el formulario de pedido para su tipo de pedido con `form.sections` — las secciones nativas de Fleet-Ops por nombre y los suyos como ExtensionComponents — con los argumentos que reciben sus secciones y los patrones para leer y escribir el pedido.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form)
[La vista de detalles

Compose la vista de detalles del pedido para su tipo de pedido con `details.sections` — las secciones nativas de Fleet-Ops por nombre y las suyas — con los argumentos que reciben sus secciones, actualizando después de los cambios y un resumen con botones de siguiente paso.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view)