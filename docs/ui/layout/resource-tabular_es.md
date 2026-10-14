---
título: "Diseño de los recursos"
url: https://fleetbase.io/docs/ui/layout/resource-tabular
módulo: ui
---

# Diseño de los recursos

`<Layout::Resource::Tabular>, <Layout::Resource::Card>, <Layout::Resource::CardsGrid> y <Layout::Resource::Panel> — plantillas de página predefinidas para la visualización de listas de recursos.

# Diseño de los recursos

`@fleetbase/ember-ui`
proporciona cuatro plantillas de página predefinidas para mostrar una lista de recursos. Estas plantillas son envoltorios de nivel superior para
`<Table>`,
filtros, acciones en masa y paginación: simplemente inclúyelas y obtendrá una página de recursos completa.

| Diseño | Componente | Cuándo usar |
|---|---|---|
| Tabular | `<Layout::Resource::Tabular>` | Página estándar/detalles (la predeterminada para la mayoría de los recursos) |
| Card | `<Layout::Resource::Card>` | Vista de detalles con una sola tarjeta |
| CardsGrid | `<Layout::Resource::CardsGrid>` | Cuadro de tarjetas (por ejemplo, galería de medios, cuadrícula de tienda) |
| Panel | `<Layout::Resource::Panel>` | Diseño de panel con secciones |

## Ejemplo de Tabular

```
<Layout::Resource::Tabular
  @title="Conductores"
  @searchQuery={{this.q}}
  @onSearch={{this.onSearch}}
  @onReload={{this.onReload}}
  @columns={{this.columns}}
  @rows={{this.rows}}
  @table={{this.table}}
  @onRowClick={{this.openDriver}}
/>
```

`<Layout::Resource::Tabular>`
renderiza:

* Encabezado de sección con
  `@title`,
  campo de búsqueda y botón de actualización
* Selector de filtros (basado en columnas marcadas
  `filterable`)
* Selector de columnas visibles (para que el usuario pueda mostrar/ocultar columnas)
* Menú de acciones en masa (cuando se seleccionan filas)
* La propia
  `<Table>`
  con columnas ordenables y paginación
* Opcional menú de búsqueda avanzada para búsquedas múltiples con múltiples campos

## Argumentos comunes

| Argumento | Descripción |
|---|---|
| `@title` | Título del encabezado |
| `@columns` | Descripción de las columnas (pasada a `<Table>`) |
| `@rows` | Datos de las filas |
| `@table` | Objeto del modelo ember-light-table |
| `@searchQuery` | Vinculado al campo de búsqueda |
| `@onSearch` | Función de devolución de llamada para la búsqueda |
| `@onReload` | Función de devolución de llamada para el botón de actualización |
| `@onRowClick` | Función de devolución de llamada al hacer clic en cada fila |
| `@onSubmitBulkSearch` | Búsqueda avanzada opcional |
| `@bulkSearchValue` | Vinculado a la búsqueda avanzada |
| `@withoutHeader` | Omitir la fila de encabezado completa |
| `@hideColumnsPicker` | Omitir el selector de columnas visibles |
| `@registry` | Un registro de tabla como `fleet-ops:driver:table`. Fusiona las columnas, las acciones de fila, las acciones en masa y los botones de la barra de herramientas de otras extensiones registradas allí. Consulte [Registros de vistas de recursos](https://fleetbase.io/docs/extension-development/resource-views) |
| `@actionButtons` | Botones de la barra de herramientas: `{ id, text, icon, type, onClick, permission }`, un menú desplegable con `items`, o un `component` |
| `@bulkActions` | Elementos para el menú **Bulk Actions**: `{ id, label, icon, fn, permission }` |
| `@searchDisabled` | Deshabilitar el campo de búsqueda |

Además, una gran cantidad de
`*Class`
y
`*Width`
para cada subsección.

### Controles adicionales del encabezado

Utilice el bloque
`<:header>`
para los controles que deben estar en el encabezado antes de los controles estándar, como un interruptor de modo:

```
<Layout::Resource::Tabular @title="Claves API" @data={{@model}} @columns={{this.columns}}>
  <:header>
    <Toggle @isToggled={{this.isTestMode}} @onToggle={{this.toggleTestMode}} @label="Modo de prueba" />
  </:header>
</Layout::Resource::Tabular>
```

## Registros de extensiones

Pase
`@registry`
y otras extensiones pueden extender la vista sin modificarla:

| Diseño | `@registry` | Fusiona |
|---|---|---|
| `<Layout::Resource::Tabular>` | `<extension>:<resource>:table` | Columnas, acciones de fila, acciones en masa, botones de la barra de herramientas |
| `<Layout::Resource::TabularActions>` | `<extension>:<resource>:table` | Botones de la barra de herramientas y acciones en masa (fusiona las columnas en su controlador) |
| `<Layout::Resource::Panel>` | `<extension>:<resource>:details` | Botones del encabezado y elementos del menú "…" |

Las celdas, los filtros y los componentes de la barra de herramientas que otras extensiones registran pueden provenir de sus propios motores, como
`ExtensionComponent`
s. Los renderizadores compartidos
`<Layout::Resource::ActionButtons @buttons>`
y
`<Layout::Resource::BulkActions @actions>`
están disponibles para los encabezados que usted organiza. Consulte
[Hacer que las vistas sean extensibles](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
.

## Uso en el mundo real

Consulte cualquiera de los controladores de listas de recursos en fleet-ops o ledger — todos utilizan
`<Layout::Resource::Tabular>`
como su plantilla raíz:

* `fleet-ops/addon/templates/management/drivers/index.hbs`
* `fleet-ops/addon/templates/management/vehicles/index.hbs`
* `fleet-ops/addon/templates/operations/orders/index.hbs`

Estudiar cualquiera de estas es la forma más rápida de ver todos los argumentos en acción.

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/layout/resource/tabular.hbs` | Plantilla |
| `addon/components/layout/resource/tabular.js` | Clase |
| `addon/components/layout/resource/card.hbs` | Siguiente — vista de detalle con una sola tarjeta (plantilla) |
| `addon/components/layout/resource/card.js` |  |
| `addon/components/layout/resource/cards-grid.hbs` | Siguiente — cuadro de tarjetas (plantilla) |
| `addon/components/layout/resource/cards-grid.js` |  |
| `addon/components/layout/resource/panel.hbs` | Siguiente — diseño de panel con secciones (plantilla) |
| `addon/components/layout/resource/panel.js` |  |