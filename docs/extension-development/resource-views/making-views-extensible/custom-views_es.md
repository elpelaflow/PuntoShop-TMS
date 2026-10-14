---
title: "Vistas personalizadas"
url: https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views
module: extension-development
---

Vistas de recursos

Hacer que sus vistas sean extensibles

# Vistas personalizadas

Combine las columnas, acciones, botones y elementos de menú registrados en vistas que usted mismo renderiza, como una tabla creada manualmente, un encabezado de página o un cuadro de diálogo, junto con el contexto que se pasa a los manejadores.

# Vistas personalizadas

Si una vista no utiliza los diseños de recursos, por ejemplo, una
`<Table>`
con un encabezado que usted mismo ha creado, combine los elementos registrados en su controlador. Cada método a continuación toma sus elementos integrados y los devuelve con los elementos registrados colocados.

## Columnas y acciones de fila

Para una
`<Table>`
que renderiza, combine las columnas y las acciones de fila:

```
import { cached } from '@glimmer/tracking';

@cached get registeredColumns() {
    return this.shipmentActions.mergeRegisteredColumns(this.columns, { controller: this });
}
```

```
<Table @rows={{@model}} @columns={{this.registeredColumns}} />
```

## Botones y elementos de menú del encabezado

Combine con
`mergeHeaderButtons`
, y renderice con
`Layout::Resource::ActionButtons`
:

```
import { getOwner } from '@ember/application';
import lookupResourceView, { mergeHeaderButtons } from '@fleetbase/ember-ui/utils/resource-view';

get actionButtons() {
    const buttons = [{ id: 'refresh', icon: 'refresh', onClick: this.reload }];

    return mergeHeaderButtons(
        lookupResourceView(getOwner(this)),
        'acme:shipment:details',
        buttons,
        { resource: this.model, controller: this },
        { withMenu: true }
    );
}
```

```
<Layout::Section::Header @title={{@model.name}} @actionsWrapperClass="space-x-2">
    <Layout::Resource::ActionButtons @buttons={{this.actionButtons}} />
</Layout::Section::Header>
```

`withMenu: true`
también combina la
`menu`
slot, para vistas de detalles. No lo use para un encabezado de tabla.

## Cualquier slot

`mergeRegistered(surface, slot, items, context)`
en su servicio de acciones combina un único slot:

```
get bulkActions() {
    return this.shipmentActions.mergeRegistered('table', 'bulk-actions', [{ id: 'bulk-delete', label: 'Delete selected', fn: this.bulkDelete }], {
        controller: this,
        getSelectedRows: () => this.table?.selectedRows ?? [],
    });
}
```

`Layout::Resource::BulkActions`
renderiza una lista combinada de acciones masivas:

```
<Layout::Resource::BulkActions @actions={{this.bulkActions}} />
```

## Diálogos

Una vista de detalles en un modal puede mostrar los botones registrados en su pie de página. El modal predeterminado renderiza
`actionButtons`
de sus opciones:

```
this.modalsManager.show('modals/shipment-form', {
    title: 'Edit shipment',
    actionButtons: mergeHeaderButtons(this.resourceView, 'acme:shipment:details', [], { resource: shipment }, { withMenu: true }),
    // …
});
```

## El contexto que se pasa

Lo que pasa como contexto es lo que los manejadores reciben como
`ctx`, junto con las claves propias del registro (
`owner`
,
`registry`
,
`extension`
,
`resourceName`
,
`surface`
,
`slot`
):

| Vista | Pasar |
|---|---|
| Tablas | `controller` ; `table`, como un getter, porque la tabla se configura después del primer renderizado; `getSelectedRows()` |
| Detalles | `resource` ; `controller` o `panel` donde los tiene |

Los getters siguen siendo getters:

```
const view = this;
const context = {
    controller: this,
    get table() {
        return view.table;
    },
    getSelectedRows: () => view.table?.selectedRows ?? [],
};
```

## Caché

Use
`@cached`
para listas combinadas que una plantilla lee más de una vez. La combinación crea copias frescas cada vez, por lo que cualquier cambio que los usuarios realicen en ellas, como ocultar una columna, se pierde en la siguiente combinación.