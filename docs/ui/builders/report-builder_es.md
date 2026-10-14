---
título: "ReportBuilder"
url: https://fleetbase.io/docs/ui/builders/report-builder
módulo: ui
---

# ReportBuilder

`<ReportBuilder>` es un constructor de consultas visual para crear informes: seleccione tablas, columnas, filtros, ordenamientos y agrupaciones, y luego vea los resultados en tiempo real.

# `<ReportBuilder>`

`<ReportBuilder>`
es un constructor de consultas visual para crear informes personalizados. El usuario selecciona tablas y columnas, aplica filtros y ordenamientos, y visualiza los datos resultantes en tiempo real. La configuración se guarda como un objeto JSON `query_config` en un registro de informe.

## Uso básico

```
<ReportBuilder
  @extension="fleet-ops"
  @category="orders"
  @report={{this.report}}
  @onQueryConfigChanged={{this.persistConfig}}
/>
```

El componente:

1. Carga las tablas y columnas disponibles desde
   `GET /reports/tables`
   (filtradas por
   `extension`
   y
   `category`)
2. Renderiza la interfaz de usuario de configuración en la pestaña
   **Configuración**
3. Renderiza los resultados en tiempo real en la pestaña
   **Vista previa**
   mediante
   `POST /reports/execute-query`
4. Modifica
   `report.query_config`
   y
   `report.fillResult(...)`
   cuando el usuario edita

## Argumentos

| Argumento | Tipo | Descripción |
| --- | --- | --- |
| `@extension` | string | Clave de extensión: filtra las tablas disponibles |
| `@category` | string | Categoría dentro de la extensión: filtra aún más las tablas |
| `@report` | modelo | El registro de informe que se está editando (su `query_config` y resultado se modifican) |
| `@onQueryConfigChanged` | `(queryConfig)` | Se llama cada vez que cambia la configuración de la consulta |

## Comportamiento interno

| Tarea | Descripción |
| --- | --- |
| `loadSchema` | `GET reports/tables` — recupera las tablas y columnas disponibles |
| `execute` | `POST reports/execute-query` — ejecuta la consulta configurada y devuelve filas |

## Pestañas

El constructor tiene dos pestañas:

* **Configuración**
  — selector de tablas, selector de columnas, filtros, ordenamientos, agrupaciones
* **Vista previa**
  — vista de tabla de los resultados en tiempo real

## Validación

El componente rastrea
`validationErrors`
y
`validationWarnings`
— que se muestran directamente cuando el usuario edita.

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/report-builder.hbs` | Plantilla |
| `addon/components/report-builder.js` | Clase |