---
Título: Tabla
URL: https://fleetbase.io/docs/ui/display/table
Módulo: ui
---

# Tabla

`<Table>` es el componente de tabla de datos estándar: ordenable, redimensionable, seleccionable, extensible, con soporte para la paginación y componentes de celdas personalizables.

# `<Table>`

`<Table>`
es la tabla de datos estándar para listas de recursos. Soporta columnas ordenables, columnas redimensionables, selección de filas (individual y por lotes), filas expandibles, componentes de celdas personalizados y paginación.

Para páginas de recursos completas con búsqueda, filtros y acciones por lotes, es preferible
[`<Layout::Resource::Tabular>`](https://fleetbase.io/docs/ui/layout/resource-tabular)
— es un envoltorio de nivel superior para
`<Table>`
.

## Uso básico

```
<Table @rows={{this.rows}} @columns={{this.columns}} @onRowClick={{this.openRow}} />
```

```
columns = [
  { label: 'ID',     valuePath: 'public_id', sortable: true,  width: '120px' },
  { label: 'Name',   valuePath: 'name',      sortable: true },
  { label: 'Status', valuePath: 'status',    cellComponent: 'table/cell/status' },
  { label: '',       cellComponent: 'table/cell/dropdown', cellComponentArgs: { actions: this.rowActions } },
];
```

## Descriptores de columnas

Cada columna es un objeto simple con estos campos:

| Campo | Tipo | Descripción |
|---|---|---|
| `label` | string | Texto del encabezado de la columna |
| `valuePath` | string | Ruta en la fila para mostrar |
| `width` | string | Ancho CSS (por ejemplo, `120px`, `15%`) |
| `sortable` | boolean | Permitir ordenar por esta columna |
| `resizable` | boolean | Permitir redimensionar arrastrando |
| `filterable` | boolean | Mostrar en el selector de filtros |
| `cellComponent` | string | Ruta de resolución para un renderizador de celdas personalizado |
| `cellComponentArgs` | objeto | Argumentos que se pasan al componente de la celda |
| `headerComponent` | string | Renderizador de encabezado personalizado |
| `hidden` | boolean | Oculto por defecto; aparece en el selector de columnas |
| `permanent` | boolean | No se puede ocultar mediante el selector de columnas |
| `cellClass`, `headerClass` | string | Clases de estilo |

## Selección de filas

```
<Table
  @rows={{this.rows}}
  @columns={{this.columns}}
  @selectable={{true}}
  @canSelectAll={{true}}
  @onRowClick={{this.openRow}}
/>
```

Lee
`table.selectedRows`
del instancia de la tabla capturada para implementar acciones por lotes.

## Filas expandibles

```
<Table @rows={{this.rows}} @columns={{this.columns}} @canExpand={{true}}>
  <:expandedRow as |row|>
    {{!-- contenido expandido arbitrario --}}
    <DriverDetails @driver={{row}} />
  </:expandedRow>
</Table>
```

## Paginación

```
<Table
  @rows={{this.rows}}
  @columns={{this.columns}}
  @pagination={{true}}
  @paginationMeta={{this.paginationMeta}}
  @page={{this.page}}
  @onPageChange={{fn (mut this.page)}}
  @insertPagination={{true}}
  @useTfootPagination={{true}}
/>
```

## Argumentos

### Núcleo

| Argumento | Descripción |
|---|---|
| `@rows` | Datos de la fila (array) |
| `@columns` | Descriptores de columna |
| `@onRowClick` | `(row, event)` — manejador de clics en la fila |
| `@onSetup` | Captura la API de la tabla |
| `@wrapperClass` | Clase envoltorio externa |
| `@selectable` | Habilitar casillas de verificación por fila |
| `@canSelectAll` | Habilitar una casilla de verificación "seleccionar todo" en el encabezado |
| `@checkboxSticky` | Posición fija para la columna de selección de todo |
| `@selectAllColumnWidth` | Ancho de la columna de selección de todo (predeterminado 40) |

### Expansión

| Argumento | Descripción |
|---|---|
| `@canExpand` | Habilitar filas expandibles |
| `:expandedRow` bloque nombrado | Proporciona la fila para renderizar dentro de la expansión |

### Paginación

| Argumento | Descripción |
|---|---|
| `@pagination` | Mostrar la paginación |
| `@paginationMeta` | `{ total, perPage, lastPage, currentPage }` |
| `@page` | Página actual |
| `@onPageChange` | Función de devolución de llamada para el cambio de página |
| `@insertPagination` | Renderizar la fila de paginación |
| `@useTfootPagination` | Renderizar la paginación en `<tfoot>` |

## Componentes de celdas

`<Table>`
viene con varios componentes de celdas estándar.  Habilítelos en
`cellComponent`
:

| Ruta | Renderiza |
|---|---|
| `table/cell/anchor` | Enlace enlazable |
| `table/cell/checkbox` | Casilla de verificación |
| `table/cell/dropdown` | Menú de acciones |
| `table/cell/status` | `<Badge>` para el estado |
| `table/cell/click-to-copy` | Valor que se puede copiar |
| `table/cell/click-to-reveal` | Valor oculto que se revela al hacer clic |
| `table/cell/media` | Vista previa de imagen |
| `table/cell/datetime` | Fecha formateada |
| `table/cell/money` | Dinero formateado |
| `table/cell/component` | Genérico — pasar cualquier nombre de componente en `cellComponentArgs` |

También puedes apuntar
`cellComponent`
a cualquier componente en tu extensión.

## Ejemplo del mundo real

```
<Table
  @rows={{this.drivers}}
  @columns={{array
    (hash label="ID" valuePath="public_id" sortable=true cellComponent="table/cell/click-to-copy")
    (hash label="Name" valuePath="name" sortable=true)
    (hash label="Status" valuePath="status" cellComponent="table/cell/status")
    (hash label="" cellComponent="table/cell/dropdown" cellComponentArgs=(hash actions=this.rowActions))
  }}
  @selectable={{true}}
  @canSelectAll={{true}}
  @pagination={{true}}
  @paginationMeta={{this.paginationMeta}}
  @onPageChange={{fn (mut this.page)}}
  @onRowClick={{this.openDriver}}
/>
```

## Ver también

* [`<Layout::Resource::Tabular>`](https://fleetbase.io/docs/ui/layout/resource-tabular)
  — envoltorio completo para recursos
* `<VisibleColumnPicker>`
  — permite a los usuarios ocultar/mostrar columnas
* `<Pagination>`
  — componente de paginación independiente

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/table.hbs` | Plantilla |
| `addon/components/table.js` | Clase |
| `addon/components/table/` | Encabezado, cuerpo, fila, th, td y todos los renderizadores de celdas |