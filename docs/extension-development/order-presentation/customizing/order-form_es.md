---
title: "El formulario de pedido"
url: https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form
module: extension-development
---

Presentación del pedido

Personalización

# El formulario de pedido

Crea el formulario de pedido para tu tipo de pedido utilizando `form.sections` — las secciones nativas de Fleet-Ops por nombre y las tuyas como `ExtensionComponents`, junto con los argumentos que reciben tus secciones y los patrones para leer y escribir el pedido.

# El formulario de pedido

`form.sections`
es el formulario de pedido, de arriba a abajo. Cada entrada es:

* **el nombre de una sección nativa**, como
  `'details'`
  o
  `'route'`, que renderiza la sección propia de Fleet-Ops; o
* **un
  `ExtensionComponent`**, que renderiza un componente de tu motor.

```
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

const section = (path) => new ExtensionComponent('@acme/rental-engine', path);

form: {
    sections: ['details', section('rental/form/equipment'), 'route', 'notes', 'documents'],
},
```

![El formulario de pedido estándar junto a uno personalizado](https://fleetbase.io/_next/static/media/form-standard-vs-profile.d3066928.svg)

La lista
**es**
el formulario: cualquier cosa que no se incluya no se renderiza, y una lista vacía o inexistente renderiza un formulario vacío.

## Secciones nativas

| Nombre | Renderiza |
|---|---|
| `details` | El selector de tipo de pedido, el ID interno, el horario, el cliente, el facilitador, el conductor, el vehículo, el campo ad-hoc, los toggles de envío y comprobante de entrega, y luego los campos personalizados de la configuración del pedido. [Los campos se pueden ocultar o añadir](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields) |
| `route` | Recogida, entrega y puntos intermedios, con el mapa de ruta. [Su título se puede cambiar, y el multi-drop se puede ocultar](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields#the-route-section) |
| `payload` | Las entidades (elementos) que transporta el pedido |
| `service-rate` | Tasa de servicio y selección de cotización |
| `notes` | Notas del pedido |
| `documents` | Adjuntos de archivo |
| `orchestrator-constraints` | Rangos de tiempo, habilidades y prioridad requeridas para el orquestador |
| `metadata` | Metadatos de clave/valor libres |

**Mantén
`details`
en tu formulario.**
Contiene el selector de tipo de pedido, que es cómo los usuarios eligen tu tipo para un nuevo pedido, y los campos personalizados de la configuración del pedido. Oviéntalo solo si tu propia sección establece
`order_config`
y gestiona los campos personalizados.

La validación del pedido de Fleet-Ops sigue requiriendo una recogida y una entrega (o al menos dos puntos intermedios), así que también mantén
`route`,
a menos que tu sección lo establezca.

### El diseño estándar

Para mantener el formulario exactamente como está para otros tipos de pedidos:

```
form: {
    sections: ['details', 'route', 'payload', 'service-rate', 'notes', 'documents', 'orchestrator-constraints', 'metadata'],
},
```

## Tus propias secciones

Una sección de
`ExtensionComponent`
se renderiza con
`LazyEngineComponent`,
para que pueda vivir en tu motor. Tu motor se carga la primera vez que se renderiza la sección.

| Argumento | Valor |
|---|---|
| `@order` | El pedido que se está creando o modificando |
| `@resource` | El mismo pedido |
| `@controller` | El controlador anfitrión, cuando el anfitrión lo pasa |
| `@profile` | Tu objeto de perfil |
| `@hiddenFields` | Los campos ocultos del perfil |

Utiliza los mismos bloques de construcción que las secciones nativas de Fleet-Ops, para que las tuyas se vean nativas: un
`ContentPanel`
con
`@wrapperClass="bordered-top"`
y
`InputGroup`
s en una cuadrícula.

```
<ContentPanel @title="Equipment" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        …
    </div>
</ContentPanel>
```

## Almacenar lo que tu sección recoge

Todo lo que tu sección establece en el pedido se guarda junto con él.

### En el meta del pedido

Para los valores que no tienen una columna de pedido, utiliza
`meta`. Reemplaza
`meta`
con un nuevo objeto en lugar de cambiar una clave dentro de él, para que el cambio se note:

```
// addon/components/rental/form/equipment.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RentalFormEquipmentComponent extends Component {
    get rental() {
        return this.args.order.meta?.rental ?? {};
    }

    @action update(key, event) {
        const order = this.args.order;
        order.set('meta', { ...(order.meta ?? {}), rental: { ...this.rental, [key]: event.target.value } });
    }
}
```

```
{{! addon/components/rental/form/equipment.hbs }}
<ContentPanel @title="Equipment" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <InputGroup @name="Asset tag" @value={{this.rental.asset_tag}} {{on "input" (fn this.update "asset_tag")}} />
        <InputGroup @name="Rental days" @type="number" @value={{this.rental.days}} {{on "input" (fn this.update "days")}} />
    </div>
</ContentPanel>
```

`InputGroup`
pasa atributos y modificadores adicionales a su entrada, que es cómo
`{{on "input"}}`
lo alcanza.

### En los propios campos del pedido

Tu sección puede establecer cualquier campo de pedido que tengan las secciones nativas de Fleet-Ops, como
`scheduled_at`,
`customer`
o el
`pickup`
del payload:

```
@action selectDepot(place) {
    this.args.order.payload.set('pickup', place);
}
```

### En tus propias tablas

Para los datos que pertenecen a tu extensión, mantén un borrador en
`meta`
mientras el formulario está abierto, y luego guárdalo en tus propias tablas en el servidor cuando se crea el pedido, desde un observador en el modelo
`Order`
de Fleet-Ops. Consulta
[Expansions & Observers](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation)
.

## Editar un pedido existente

Se utilizan las mismas secciones cuando se edita un pedido:
**Editar los detalles**
en el menú del pedido abre el formulario personalizado en un panel lateral. Comprueba
`@order.isNew`
donde tu sección debe comportarse de manera diferente para un nuevo pedido, por ejemplo, para bloquear un campo una vez que el pedido existe:

```
<InputGroup @name="Asset tag" @value={{this.rental.asset_tag}} @disabled={{not @order.isNew}} {{on "input" (fn this.update "asset_tag")}} />
```

## Orden de las secciones

Las secciones se renderizan en orden de lista. Algunos patrones:

```
// Tu sección primero, antes del tipo de pedido
sections: [section('loan/form/customer'), 'details', 'route', 'notes'],

// Tu sección entre dos secciones nativas
sections: ['details', 'route', section('rental/form/handover'), 'notes'],

// Varias de las tuyas
sections: ['details', section('rental/form/equipment'), section('rental/form/period'), 'route', 'documents'],
```

## Relacionado

* [Form Fields](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields): cambia los campos dentro de las secciones nativas de los detalles y la ruta.
* [Drafts and Validation](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation): prepara borradores y requiere tus campos.

[Getting Started

Build a first order presentation profile step by step — an order config that names it, a profile that keeps the standard layout, then hidden fields, your own form and details sections, and hidden actions.](https://fleetbase.io/docs/extension-development/order-presentation/getting-started)