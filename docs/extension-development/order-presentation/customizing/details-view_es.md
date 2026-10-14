---
título: "Vista de Detalles"
url: https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view
módulo: extension-development
---

Presentación de Pedidos

Personalización

# Vista de Detalles

Cree la vista de detalles de su tipo de pedido, utilizando secciones como `fleet-ops:component:order:details:sections`, junto con sus propias secciones, pasando los argumentos correspondientes, y actualizando la vista después de los cambios, y mostrando un resumen con botones para la siguiente etapa.

# Vista de Detalles

`fleet-ops:component:order:details:sections`
es la vista general de los detalles del pedido, de arriba a abajo, construida de la misma manera que el
[formulario](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form)
: nombres de secciones nativas y
`ExtensionComponent`
s.

```
details: {
    sections: [section('rental/details/summary'), 'activity', 'route', 'notes', 'documents', 'comments'],
},
```

![La vista estándar de detalles del pedido junto a una vista personalizada](https://fleetbase.io/_next/static/media/details-standard-vs-profile.d1e1c5b4.svg)

Al igual que con el formulario, la lista
**es**
la vista: cualquier cosa que no se incluya no se mostrará.

## Secciones Nativas

| Nombre | Muestra |
|---|---|
| `activity` | La actividad actual y el historial, con **Actualizar actividad** |
| `detail` | Los detalles del pedido: tipo, ID interno, número de seguimiento, cliente, facilitador, conductor, vehículo, fechas de programación, ejecución y inicio, campos personalizados y prueba de entrega |
| `custom-fields` | Los valores de los campos personalizados de la configuración del pedido |
| `purchase-rate` | La tasa de compra y la transacción |
| `tracking` | El número de seguimiento, el código QR y el ETA |
| `proof` | Registros de prueba de entrega |
| `notes` | Notas |
| `integrated-vendor-details` | Detalles del pedido de un proveedor integrado |
| `route` | La ruta y sus paradas |
| `payload` | Las entidades |
| `documents` | Documentos |
| `comments` | Comentarios |
| `metadata` | Metadatos |

**Los nombres nativos difieren entre el formulario y la vista de detalles.**
El resumen de la vista de detalles es
`detail`
; el del formulario es
`details`
. Los campos personalizados son una sección independiente aquí (
`custom-fields`
), mientras que en el formulario forman parte de
`details`
.

Las secciones nativas mantienen su comportamiento de edición: las notas, los documentos, los comentarios y la actualización de la actividad funcionan de la misma manera que en la vista estándar.

### Diseño Estándar

```
details: {
    sections: ['activity', 'detail', 'custom-fields', 'purchase-rate', 'tracking', 'proof', 'notes', 'integrated-vendor-details', 'route', 'payload', 'documents', 'comments', 'metadata'],
},
```

## Sus Propias Secciones

| Argumento | Valor |
|---|---|
| `@resource` | El pedido |
| `@controller` | El controlador de detalles |
| `@permission` | El permiso de escritura para el pedido, para comprobaciones de estilo como "cannot-write" |
| `@isLoading` | Si el pedido se está recargando |
| `@profile` | Su objeto de perfil |
| `@onChange` | Llamar después de que cambie el pedido, para que la vista se actualice |

### Resumen

```
{{! addon/components/rental/details/summary.hbs }}
<ContentPanel @title="Rental" @open={{true}} @wrapperClass="bordered-top">
    {{#if @isLoading}}
        <Spinner />
    {{else}}
        <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="text-gray-500">Asset tag</div>
            <div>{{or @resource.meta.rental.asset_tag "—"}}</div>
            <div class="text-gray-500">Rental days</div>
            <div>{{or @resource.meta.rental.days "—"}}</div>
            <div class="text-gray-500">Status</div>
            <div><Badge @status={{@resource.status}} /></div>
        </div>
    {{/if}}
</ContentPanel>
```

### Botones para la Siguiente Etapa

Una sección puede ofrecer los siguientes pasos para el pedido como botones. Solicite estos a Fleet-Ops, para que los botones siempre sigan el flujo de la configuración del pedido:

```
// addon/components/rental/details/next-steps.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class RentalDetailsNextStepsComponent extends Component {
    @service fetch;
    @service notifications;
    @tracked nextActivities = [];

    constructor() {
        super(...arguments);
        this.load.perform();
    }

    @task *load() {
        try {
            this.nextActivities = yield this.fetch.get(`orders/next-activity/${this.args.resource.id}`);
        } catch {
            this.nextActivities = [];
        }
    }

    @task *advance(activity) {
        try {
            yield this.fetch.patch(`orders/update-activity/${this.args.resource.id}`, { activity: { code: activity.code } });
            yield this.args.resource.reload();
            this.args.onChange?.();
            this.notifications.success(`Moved to ${activity.status}.`);
            yield this.load.perform();
        } catch (error) {
            this.notifications.serverError(error);
        }
    }
}
```

```
{{! addon/components/rental/details/next-steps.hbs }}
{{#if this.nextActivities.length}}
    <div class="flex flex-wrap gap-2 p-4">
        {{#each this.nextActivities as |activity|}}
            <Button @text={{activity.status}} @type="primary" @isLoading={{this.advance.isRunning}} @onClick={{perform this.advance activity}} />
        {{/each}}
    </div>
{{/if}}
```

Con un
[ciclo de vida configurado](https://fleetbase.io/docs/extension-development/order-lifecycles)
que establece
`strict_transitions`
, estos son los únicos movimientos que acepta la API.

## Tablas de Detalles

Las tablas son separadas de las secciones: las tablas registradas para los pedidos, como la
**Factura**
de Ledger, aún aparecen en un pedido personalizado. Para agregar una tabla para su tipo de pedido, regístrela y muéstrela solo para sus pedidos; vea
[Tablas](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
.

## Los Slots de Registro No Se Renderizan

La vista de detalles estándar renderiza los slots de registro
`fleet-ops:component:order:details:*`, donde las extensiones inyectan componentes. Una vista personalizada no: sus secciones son todo el diseño. Si su tipo de pedido necesita algo que proporciona otra extensión, renderícelo desde una de sus propias secciones.