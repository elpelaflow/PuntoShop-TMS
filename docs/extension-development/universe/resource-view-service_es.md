---
title: "Servicio de Vista de Recursos"
url: https://fleetbase.io/docs/extension-development/universe/resource-view-service
module: extension-development
---

# Servicio de Vista de Recursos

Registre columnas, acciones de fila, acciones masivas y botones en cualquier tabla y vistas de detalles de un motor, y combínelos en los suyos propios: la API completa de `universe.getService('resource-view')`.

# Servicio de Vista de Recursos

El
`resource-view`
servicio contiene los
[registros de vistas de recursos](https://fleetbase.io/docs/extension-development/resource-views)
: espacios de nombres en cada tabla y vistas de detalles de un motor, que otras extensiones pueden agregar columnas, acciones y botones.

```
// addon/extension.js
export default {
    setupExtension(app, universe) {
        const views = universe.getService('resource-view');
    },
};
```

`getService`
también acepta
`'resourceView'`
,
`'resource-views'`
,
`'resource-view-service'`
y
`'universe/resource-view-service'`
. Dentro de un motor, el servicio es
`universe/resource-view-service`
. Se comparte con el host, por lo que cada motor ve los mismos registros.

**Requisitos**
`@fleetbase/ember-core`
0.3.25 o posterior. En código que puede ejecutarse en una consola más antigua, busque el servicio con encadenamiento opcional, como
`universe.getService('universe/resource-view-service')?.declare(…)`
. El
`@fleetbase/ember-ui`
ayudante
`lookupResourceView(owner)`
devuelve
`null`
si el servicio no está disponible.

## Registro

### register(registryName, items)

Registre un elemento o un array de elementos en un espacio de nombres. Devuelve
`true`
si todos los elementos fueron aceptados.

```
views.register('fleet-ops:driver:table:columns', new TableColumn({ id: 'acme-score', label: 'Score', valuePath: 'meta.acme_score' }));
views.register('ledger:invoice:details:menu', [itemA, itemB]);
```

Un elemento se rechaza, con un mensaje de depuración en la consola, cuando:

* `registryName`
  no sigue el formato
  `<extension>:<resource>:<table|details>:<slot>`
  , o usa un espacio de nombres que no existe (ver
  [Nombres de registro](https://fleetbase.io/docs/extension-development/resource-views/registry-names)
  );
* el elemento no tiene
  `id`
  ;
* es un contrato del tipo incorrecto para el espacio de nombres, por ejemplo un
  `ActionButton`
  en
  `columns`
  .

Registrar un id que ya está en el espacio de nombres reemplaza el elemento anterior. Los elementos pueden ser contratos o objetos simples. Cada uno se almacena como un objeto simple, etiquetado con su tipo.

### Atajos

Cada uno acepta
`(extension, resource, item)`
y construye el nombre del registro para usted:

| Método | Espacio de nombres |
| --- | --- |
| `registerTableColumn` | `<extension>:<resource>:table:columns` |
| `registerRowAction` | `<extension>:<resource>:table:row-actions` |
| `registerBulkAction` | `<extension>:<resource>:table:bulk-actions` |
| `registerTableAction` | `<extension>:<resource>:table:actions` |
| `registerDetailsAction` | `<extension>:<resource>:details:actions` |
| `registerDetailsMenuItem` | `<extension>:<resource>:details:menu` |
| `registerDetailsTab` | `<extension>:<resource>:details:tabs` : una pestaña de detalles, un `MenuItem` |

Los mismos atajos están disponibles en la fachada Universe, como
`universe.registerTableColumn(…)`
y así sucesivamente, junto con
`universe.registerInResourceView(registryName, items)`
.

### Unregister(registryName, id)

Elimine un elemento. Devuelve
`true`
si se eliminó uno.

## Lectura

### get(registryName)

Los elementos registrados en un espacio de nombres, en el orden de registro. Un nombre inválido devuelve un array vacío.

### resourceRegistryNames(extension, resource)

Los siete nombres de registro para un recurso:

```
views.resourceRegistryNames('iam', 'user');
// ['iam:user:table:columns', 'iam:user:table:row-actions', 'iam:user:table:bulk-actions',
//  'iam:user:table:actions', 'iam:user:details:actions', 'iam:user:details:menu',
//  'iam:user:details:tabs']
```

### La pestaña Slot

`<extension>:<resource>:details:tabs`
es un alias. Las pestañas de detalles se almacenan donde siempre se han almacenado, en el registro del servicio de menú
`<extension>:component:<resource>:details`
, por lo que las pestañas registradas con cualquiera de estos nombres son las mismas pestañas.
`register`
,
`get`
,
`unregister`
y
`declare`
aceptan el alias. Las pestañas deben ser
`MenuItem`
s (o objetos simples), y se identifican mediante
`slug`
en lugar de
`id`
.

## Declaración (Autores de Motores)

### declare(extension, resources)

Cree todos los registros para los recursos dados, y devuelva sus nombres. Llámalos desde el
`setupExtension`
de su motor:

```
universe.getService('universe/resource-view-service')?.declare('acme', ['shipment', 'carrier']);
```

## Combinación (Autores de Motores)

Los diseños de recursos se combinan para usted cuando se proporciona
`@registry`
. Estos métodos están diseñados para vistas que construyen sus propias listas. Consulte
[Hacer que las vistas sean extensibles](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
.

### merge(registryName, baseItems = [], context = {})

Combine los elementos incorporados de una vista con los elementos registrados en un espacio de nombres. Los elementos registrados se colocan mediante
`before`
,
`after`
,
`index`
y
`priority`
, o en la ubicación predeterminada del espacio de nombres. Sus manejadores se vinculan al contexto de la vista. Cada elemento registrado es una copia fresca, por lo que cambiarlo no cambia el registro. Si no hay nada registrado, o el nombre es inválido, devuelve los elementos incorporados como un array simple.

El
`context`
se combina con
`registry`
,
`extension`
,
`surface`
,
`resourceName`
,
`slot`
y
`owner`
, y se pasa a cada manejador. Los getters en él siguen siendo getters.

### mergeSlot(prefix, slot, baseItems = [], context = {})

`merge()`
, dirigido a un espacio de nombres:
`mergeSlot('acme:shipment:table', 'bulk-actions', items, ctx)`
.

### mergeRowActions(prefix, columns = [], context = {})

Las columnas, junto con las acciones de fila registradas en una columna con un componente de celda
`table/cell/dropdown`
, se combinan en las acciones de la columna. Las otras columnas se devuelven tal como están.

## Filtros

### queryParamsFor(extension, resource, baseQueryParams = [])

Los parámetros de consulta del controlador, junto con el
`filterParam`
de cada columna filtrable registrada para
`<extension>:<resource>:table`
. Úselos en el campo
`queryParams`
de la clase del controlador:

```
queryParams = views.queryParamsFor('acme', 'shipment', ['page', 'limit', 'sort', 'query']);
```

Después de llamar a esto para una tabla, registrar otra columna filtrable para ella genera una advertencia, ya que los parámetros de consulta del controlador ya están fijos. Consulte
[Columnas filtrables](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
.

## En ResourceActionService

Los servicios de acción que extienden
`ResourceActionService`
obtienen lo siguiente, derivado de
`initialize(modelName, { mountPrefix, registryResource, registryExtension })`
:

| Miembro | Descripción |
|---|---|
| `registryExtension` | `mountPrefix` sin `console.` , a menos que `registryExtension` se pase |
| `registryResource` | El nombre del modelo, sin el prefijo `<extension>-` , a menos que `registryResource` se pase |
| `tableRegistry` | `<extension>:<resource>:table` |
| `detailsRegistry` | `<extension>:<resource>:details` |
| `mergeRegistered(surface, slot, items, context)` | `mergeSlot()` para este recurso; `surface` es `'table'` o `'details'` |
| `mergeRegisteredColumns(columns, context)` | Columnas y acciones de fila registradas, combinadas en las columnas de una tabla |
| `queryParamsFor(baseQueryParams)` | `queryParamsFor()` para el recurso de la tabla |
| `resourceView` | El servicio, o `undefined` en un Ember más antiguo |

## En @fleetbase/ember-ui

| Export | Descripción |
|---|---|
| `lookupResourceView(owner)` from `@fleetbase.io/docs/extension-development/resource-views/utils/resource-view` | El servicio, o `null` |
| `mergeHeaderButtons(resourceView, prefix, buttons, context, { withMenu })` | Botones de encabezado con las acciones registradas en
`actions`
combinadas. Si `withMenu: true` , los elementos del menú se combinan en el primer botón desplegable, o en un botón "…" |
| `<Layout::Resource::ActionButtons @buttons>` | Renderiza botones de encabezado: botones simples, desplegables y componentes |
| `<Layout::Resource::BulkActions @actions>` | Renderiza un menú de **Acciones Masivas** |
| `@registry` on `<Layout::Resource::Tabular>` , `<Layout::Resource::TabularActions>` and `<Layout::Resource::Panel>` ; `resourceContextPanel.open()` | Combina automáticamente |

## Ver también

* [Vistas de recursos](https://fleetbase.io/docs/extension-development/resource-views)
  : lo que puedes agregar, con diagramas
* [Comenzar](https://fleetbase.io/docs/extension-development/resource-views/getting-started)
  : un primer ejemplo de columna y acción, paso a paso
* [Columnas](https://fleetbase.io/docs/extension-development/resource-views/tables/columns)
  ,
  [Acciones de fila](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
  ,
  [Acciones masivas](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions)
  ,
  [Botones de la barra de herramientas](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons)
  ,
  [Botones de encabezado](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons)
  ,
  [Elementos del menú](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
  ,
  [Pestañas](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
  : cada opción, por elemento
* [Contratos](https://fleetbase.io/docs/extension-development/reference/contracts#tablecolumn)
  :
  `TableColumn`
  ,
  `ResourceAction`
  ,
  `ActionButton`
  :
* [Registro de servicios](https://fleetbase.io/docs/extension-development/universe/registry-service)
  : el almacenamiento subyacente

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/services/universe/resource-view-service.js` | El servicio |
| `addon/utils/resource-view-registry.js` | Análisis y creación de nombres |
| `addon/utils/merge-registered-items.js` | Posicionamiento y vinculación de controladores |
| `addon/contracts/table-column.js`, `resource-action.js`, `action-button.js` | Los contratos |
| `ember-ui/addon/utils/resource-view.js` | `lookupResourceView`, `mergeHeaderButtons` |