---
título: "Diseños"
url: https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/layouts
módulo: extension-development
---

Vistas de recursos

Crear vistas extensibles

# Diseños

Utilizar `@registry` en `Layout::Resource::Tabular`, `Layout::Resource::Panel`, `TabularActions` y los paneles laterales del contexto de recursos, para que se fusionen las columnas, acciones, botones y elementos del menú registrados.

# Diseños

Los diseños de recursos compartidos de
`@fleetbase/ember-ui`
fusionan los elementos registrados cuando se les proporciona un registro. Pasar el
**prefijo de la superficie**
,
`<extension>:<resource>:<surface>`
, y añaden el nombre de cada slot.

| Diseño | `@registry` | Fusiona |
|---|---|---|
| `Layout::Resource::Tabular` | `acme:shipment:table` | Columnas, acciones de fila, acciones masivas, botones de barra de herramientas |
| `Layout::Resource::TabularActions` | `acme:shipment:table` | Acciones masivas, botones de barra de herramientas |
| `Layout::Resource::Panel` | `acme:shipment:details` | Botones de encabezado, elementos del menú |
| `resourceContextPanel.open({ registry })` | `acme:shipment:details` | Botones de encabezado, elementos del menú |

## Tablas

```
{{! addon/templates/shipments/index.hbs }}
<Layout::Resource::Tabular
    @registry="acme:shipment:table"
    @title="Shipments"
    @searchQuery={{this.query}}
    @onSearch={{perform this.shipmentActions.controllerSearchTask this}}
    @data={{@model}}
    @columns={{this.columns}}
    @page={{this.page}}
    @onPageChange={{fn (mut this.page)}}
    @setupTable={{fn (mut this.table)}}
    @actionButtons={{this.actionButtons}}
    @bulkActions={{this.bulkActions}}
    @controller={{this}}
/>
```

Con
`@registry`
, Tabular:

* fusiona las
  **columnas**
  registradas en
  `@columns`
  , y las
  **acciones de fila**
  registradas en la columna cuyo
  `cellComponent`
  es
  `table/cell/dropdown`
* fusiona las
  **acciones masivas**
  y
  **botones de barra de herramientas**
* enumera las columnas registradas en el menú de filtros y el selector de columnas, y mantiene las opciones de columnas ocultas del usuario;
* renderiza las celdas y los filtros de otros motores.

Pasar
`@controller`
: se convierte en
`ctx.controller`
en los manejadores.

Una cadena literal es la forma más legible de
`@registry`
.
`{{this.shipmentActions.tableRegistry}}`
tiene el mismo valor.

## Paneles de detalles

```
{{! addon/templates/shipments/index/details.hbs }}
<Layout::Resource::Panel
    @registry="acme:shipment:details"
    @resource={{@model}}
    @headerComponent={{component "shipment/panel-header" resource=@model}}
    @actionButtons={{this.actionButtons}}
    @onPressCancel={{transition-to "shipments.index"}}
>
    <TabNavigation @tabs={{this.tabs}}>{{outlet}}</TabNavigation>
</Layout::Resource::Panel>
```

El panel fusiona los
**botones de encabezado**
registrados en
`@actionButtons`
, y los
**elementos del menú**
registrados en el primer botón que tiene
`items`
. Si no tiene ninguno, añade un menú "…" para ellos.

Un
`@headerComponent`
personalizado recibe los botones fusionados como
`@actionButtons`
. Renderizarlos con
`<Layout::Resource::Panel::HeaderActions @actionButtons={{@actionButtons}} />`
o
`<Layout::Resource::ActionButtons @buttons={{@actionButtons}} />`
.

### Tablas

El panel no renderiza las tablas. Leer las tablas registradas en tu controlador y añadirlas a las tuyas:

```
get tabs() {
    const registered = this.menuService.getMenuItems('acme:component:shipment:details');
    return [
        { route: 'shipments.index.details.index', label: 'Overview' },
        ...(Array.isArray(registered) ? registered : []),
    ];
}
```

Añadir una ruta
`virtual`
debajo de tu ruta de detalles, para que las tablas registradas tengan un lugar para renderizarse; ver
[Rutas Virtuales](https://fleetbase.io/docs/extension-development/frontend/virtual-routes)
.

## Paneles laterales

Si tu servicio de acciones abre los detalles en un panel lateral a través de
`resourceContextPanel.open()`
, pasa el registro allí también:

```
panel = {
    view: (shipment, options = {}) => {
        return this.resourceContextPanel.open({
            registry: this.detailsRegistry,
            shipment,
            header: 'shipment/panel-header',
            actionButtons: [ /* … */ ],
            tabs: this.panelTabs,
            ...options,
        });
    },
};
```

## Solo encabezados de tabla

`Layout::Resource::TabularActions`
solo renderiza el encabezado de una tabla: búsqueda, filtros, el selector de columnas, acciones masivas y botones de barra de herramientas. Se utiliza cuando una ruta principal o una cuadrícula de tarjetas organizan la página:

```
<Layout::Section::Header @title="Shipments">
    <Layout::Resource::TabularActions
        @registry="acme:shipment:table"
        @columns={{this.columns}}
        @actionButtons={{this.actionButtons}}
        @bulkActions={{this.bulkActions}}
        @table={{this.table}}
        @controller={{this}}
    />
</Layout::Section::Header>
```

No renderiza la tabla, por lo que no puede fusionar columnas. Fusionarlas en el controlador y pasarlas tanto al encabezado como a la tabla; ver
[Vistas personalizadas](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views#columns-and-row-actions)
.

## Siguiente

[Parámetros de consulta e IDs →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/query-params-and-ids)

[Nombres y Declaración

Elige los nombres de registro de tu motor a través de ResourceActionService, y declara cada registro para tus recursos en setupExtension.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/naming-and-declaring)
[Parámetros de consulta e IDs

Construye los parámetros de consulta de tus controladores de índice con queryParamsFor() para que funcionen los filtros registrados, y proporciona a tus columnas, acciones y botones incorporados, IDs estables para que otros los puedan colocar.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/query-params-and-ids)