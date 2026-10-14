---
title: "Parámetros de consulta y IDs"
url: https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/query-params-and-ids
module: extension-development
---

Vistas de recursos

Hacer que sus vistas sean extensibles

# Parámetros de consulta y IDs

Cree los parámetros de consulta de sus controladores de índice con `queryParamsFor()`, para que las columnas filtrables registradas funcionen, y proporcione a sus columnas, acciones y botones incorporados IDs estables para que otros los puedan utilizar.

# Parámetros de consulta y IDs

## Parámetros de consulta

Un filtro solo filtra si su parámetro es uno de los parámetros de consulta del controlador de índice. Cree la lista con
`queryParamsFor()`
, que agrega el
`filterParam`
de cada columna filtrable registrada para la tabla:

```
// addon/controllers/shipments/index.js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShipmentsIndexController extends Controller {
    @service shipmentActions;

    queryParams = this.shipmentActions.queryParamsFor(['page', 'limit', 'sort', 'query', 'status', 'carrier']);

    @tracked page = 1;
    @tracked limit;
    @tracked sort = '-created_at';
    @tracked query;
    @tracked status;
    @tracked carrier;
}
```

Funciona como un campo de clase: los campos de clase se ejecutan cuando se crea el controlador, lo que ocurre después de que se haya ejecutado el `setupExtension` de cada extensión, por lo que todas las columnas registradas ya estarán disponibles.

Sin un servicio de acción, pregunte directamente al servicio de vista de recursos:

```
import { getOwner } from '@ember/application';
import lookupResourceView from '@fleetbase/ember-ui/utils/resource-view';

queryParams = lookupResourceView(getOwner(this))?.queryParamsFor('acme', 'shipment', ['page', 'query']) ?? ['page', 'query'];
```

El lado de la API de cada filtro, una expansión del filtro para su parámetro, pertenece a la extensión que registró la columna; vea
[Columnas filtrables](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
.

## IDs estables

Otras extensiones colocan sus elementos
`antes`
o
`después`
de los suyos, utilizando IDs. Proporcione a cada columna, acción de fila, acción masiva y botón incorporado un
`id`, y manténgalo igual en todas las versiones: es parte de la API de su motor.

```
get columns() {
    return [
        { id: 'tracking-number', label: 'Número de seguimiento', valuePath: 'tracking_number', cellComponent: 'table/cell/anchor', action: this.shipmentActions.transition.view },
        { id: 'status', label: 'Estado', valuePath: 'status', cellComponent: 'table/cell/status' },
        { id: 'created-at', label: 'Creado', valuePath: 'createdAt', sortParam: 'created_at' },
        {
            id: 'row-actions',
            label: '',
            cellComponent: 'table/cell/dropdown',
            ddButtonText: false,
            ddButtonIcon: 'ellipsis-h',
            sticky: 'right',
            actions: [
                { id: 'view', label: 'Ver', fn: this.shipmentActions.transition.view },
                { id: 'edit', label: 'Editar', fn: this.shipmentActions.transition.edit },
                { separator: true },
                { id: 'delete', label: 'Eliminar', fn: this.shipmentActions.delete, class: 'text-red-500' },
            ],
        },
    ];
}
```

Los motores incorporados siguen dos reglas. Seguir estas reglas también hace que sus IDs sean predecibles:

* El ID de una columna es su
  `valuePath`, con guiones:
  `created_at`
  →
  `created-at`
  .
* El ID de una acción es el nombre del manejador, con guiones:
  `assignVehicle`
  →
  `assign-vehicle`
  .

Nombre su acción de eliminación
`delete`
. Las acciones de fila y los elementos del menú registrados van por defecto encima de ella.

## Documentación de sus registros

Otros autores de extensiones necesitan los nombres y IDs de sus registros. Enuméelos en la documentación de su extensión, en el mismo formato que el
[Catálogo de registros](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
: cada recurso, sus nombres y los IDs en cada slot.

## Siguiente

[Vistas personalizadas →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views): combine los elementos registrados en vistas que no utilizan los diseños de recursos.

[Diseños
Pase @registry a Layout::Resource::Tabular, Layout::Resource::Panel, TabularActions y resource context side panels, para que puedan combinar las columnas, acciones, botones y elementos del menú registrados.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/layouts)
[Vistas personalizadas

Combine las columnas, acciones, botones y elementos del menú registrados en vistas que usted renderiza, como una tabla, un encabezado de página o un diálogo, y pase el contexto a los manejadores.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views)