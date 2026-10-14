---
title: "Conectar Modelos con tu API de Extensión"
url: https://fleetbase.io/docs/extension-development/recipes/connecting-models-to-your-api
module: extension-development
---

# Conectar Modelos con tu API de Extensión

Vincula los modelos de Ember Data con la API de tu extensión, extendiendo `ApplicationAdapter` con el namespace adecuado, y luego apunta cada modelo al adaptador correcto.

# Conectar Modelos con tu API de Extensión

Ember Data impulsa la mayoría de las interacciones CRUD en la consola:
`store.findRecord`,
`store.query`,
`record.save()`. Cuando cargas registros de tu
**propio**
API en lugar del namespace predeterminado de la consola, lo haces una vez en la capa del
**adaptador**,
en lugar de pasar opciones en cada llamada.

## ¿Por qué un Adaptador?

Sin un adaptador, las llamadas al almacén impactan en la API de la consola:

```
// Impacta en: GET /int/v1/widgets/123  ← API incorrecta
this.store.findRecord('widget', '123');
```

Con un adaptador por extensión, el almacén impacta en tu API:

```
// Impacta en: GET /my-extension/int/v1/widgets/123  ← tu API
this.store.findRecord('widget', '123');
```

Escribes el adaptador una vez; cada llamada al almacén contra tus modelos se dirige correctamente.

## 1. Crea un Adaptador Base para tu Extensión

Extiende
`@fleetbase/ember-core/adapters/application`
y sobreescribe
`namespace`:

```
// addon/adapters/my-extension.js
import ApplicationAdapter from '@fleetbase/ember-core/adapters/application';

export default class MyExtensionAdapter extends ApplicationAdapter {
    namespace = 'my-extension/int/v1';
}
```

El
`ApplicationAdapter`
base ya maneja los encabezados de autenticación (token bearer), el encabezado de la organización activa y el encabezado
`X-Fleetbase-Sandbox`, y la negociación de contenido JSON. Solo estás cambiando a dónde van las solicitudes.

Para el namespace público de la API (consumido por integraciones externas), usa
`my-extension/v1`. Para puntos finales internos solo para la consola, la convención de la plataforma es
`my-extension/int/v1`.

## 2. Apunta cada Modelo al Adaptador

Ember Data resuelve los adaptadores por nombre de modelo:
`widget`
busca
`adapter:widget`,
y recurre a
`adapter:application`. El patrón más limpio es un stub de una sola línea por modelo que reexporta el adaptador base:

```
// addon/adapters/widget.js
export { default } from './my-extension';
```

```
// addon/adapters/widget-category.js
export { default } from './my-extension';
```

```
// addon/adapters/widget-template.js
export { default } from './my-extension';
```

Ahora
`store.findRecord('widget', id)`,
`store.query('widget-category', ...)`
y similares, impactan en tu API.

## 3. Modelos y Serializadores

Los modelos permanecen en su estado original de Ember Data: no se necesita conciencia del adaptador:

```
// addon/models/widget.js
import Model, { attr, belongsTo } from '@ember-data/model';

export default class WidgetModel extends Model {
    /** @ids */
    @attr('string') company_uuid;
    @attr('string') created_by_uuid;

    /** @relationships */
    @belongsTo('user', { async: false }) createdBy;

    /** @attributes */
    @attr('string') public_id;
    @attr('string') name;
    @attr('string') description;
    @attr('string') status;
    @attr('raw') meta;

    /** @dates */
    @attr('date') created_at;
    @attr('date') updated_at;
}
```

Si tu API incluye registros relacionados de forma inline (la convención REST de la plataforma), usa un serializador con
`EmbeddedRecordsMixin`:

```
// addon/serializers/widget.js
import ApplicationSerializer from '@fleetbase/ember-core/serializers/application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class WidgetSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
    get attrs() {
        return {
            template: { embedded: 'always' },
            categories: { embedded: 'always' },
        };
    }
}
```

Refleja los serializadores por modelo si es necesario, o compártelos entre muchos con reexportaciones.

## 4. Forma de Recurso del Backend

Para que el adaptador deserialice correctamente, tus recursos de backend deben coincidir con la forma esperada por Ember Data. La convención de la plataforma
`FleetbaseController`
+
`JsonResource`
maneja esto por ti: consulta
[Rutas y Controladores](https://fleetbase.io/docs/extension-development/backend/routes-and-controllers#controllers)
. La acción
`index`
devuelve:

```
{
    "widgets": [
        { "id": "widget_a1b2", "name": "...", "status": "active", ... },
        ...
    ]
}
```

`show`
devuelve:

```
{
    "widget": { "id": "widget_a1b2", "name": "...", ... }
}
```

La clave raíz es el nombre del modelo, con guiones (o singular para
`show`). Si estás usando un transformador de recursos personalizado, asegúrate de que
`wrap()`
devuelva la forma correcta.

## 5. Usa el Almacén

Una vez que los adaptadores están en su lugar, la API estándar de Ember Data funciona:

```
import { inject as service } from '@ember/service';

export default class WidgetsRoute extends Route {
    @service store;

    model() {
        return this.store.query('widget', { status: 'active' });
    }
}
```

```
@service store;

async create() {
    const widget = this.store.createRecord('widget', {
        name: 'New Widget',
        status: 'active',
    });
    await widget.save();  // POST /my-extension/int/v1/widgets
    return widget;
}

async load(id) {
    return this.store.findRecord('widget', id);  // GET /my-extension/int/v1/widgets/:id
}

async list() {
    return this.store.query('widget', { limit: 50 });  // GET /my-extension/int/v1/widgets?limit=50
}
```

## Cuándo Usar el Almacén vs. `fetch`

| Usa el almacén | Usa `fetch` |
| --- | --- |
| CRUD en tus propios recursos | Acciones únicas ( `/widgets/{id}/duplicate` ) |
| Registros que mostrarás en tablas, formularios y paneles de detalles | Agregados, paneles, exportaciones |
| Cualquier cosa que quieras rastrear para el estado sucio, actualizaciones optimistas o almacenamiento de relaciones | Cualquier cosa que no se ajuste al patrón REST |

Para una acción de punto final que devuelve el registro completo, puedes combinar: usa
`fetch`
para la llamada, y luego
`store.pushPayload(...)`
para fusionar el resultado en el almacén.

```
@service fetch;
@service store;

async duplicate(widget) {
    const payload = await this.fetch.post(
        `widgets/${widget.id}/duplicate`,
        {},
        { namespace: 'my-extension/int/v1', normalizeToEmberData: true }
    );
    this.store.pushPayload('widget', payload);
}
```

`{ normalizeToEmberData: true }`
le dice a
`fetch`
que inserte la respuesta en el almacén antes de resolver, para que puedas obtener un modelo
`WidgetModel`
de vuelta.

## Referencia

* [Llamar a la API de tu Extensión](https://fleetbase.io/docs/extension-development/recipes/calling-your-extension-api)
  — el
  `fetch`
  companion a esta receta
* `addon/adapters/application.js`
  — fuente del adaptador base
* `addon/serializers/application.js`
  — fuente del serializador base
* `packages/fleetops/addon/adapters/fleetops.js`
  — referencia del adaptador por extensión
* `packages/fleetops/addon/adapters/`
  — patrón de reexportación para muchos modelos
* [Adaptador de Ember Data](https://api.emberjs.com/ember-data/release/modules/@ember-data%2Fadapter)
  — API de upstream
* [Adaptador REST](https://api.emberjs.com/ember-data/release/classes/RESTAdapter)
  — lo que extiende
  `ApplicationAdapter`