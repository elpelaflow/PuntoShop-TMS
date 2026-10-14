---
título: "ActivityLog"
url: https://fleetbase.io/docs/ui/display/activity-log
módulo: ui
---

# ActivityLog

El componente `<ActivityLog>` muestra una línea de tiempo de actividad concisa, recuperando automáticamente los datos del modelo `activity`, permitiendo filtrar por rango de fechas y mostrando las propiedades modificadas.

# <ActivityLog>

`<ActivityLog>`
muestra una línea de tiempo concisa de registros de actividad (acciones del usuario y del sistema). Recupera automáticamente las actividades del modelo `activity` de Ember Data, muestra marcas de tiempo relativas y resume las creaciones, eliminaciones y propiedades modificadas en una lista de frases.

Cuando una actividad modifica más de una propiedad, el conteo de propiedades abre un cuadro emergente que muestra los campos modificados y sus valores anteriores/nuevos.

## Uso básico

```
<ActivityLog @subjectId={{this.order.id}} />
```

Esto carga las actividades donde
`subject_id = order.id`
y las muestra en una línea de tiempo concisa.

## Filtrado

```
<ActivityLog
  @subjectId={{this.order.id}}
  @causerId={{this.user.id}}
/>
```

Las actividades se cargan desde la API con
`subject_id`
y/o
`causer_id`
como parámetros de consulta, junto con el filtro de rango de fechas seleccionado por el usuario.

## Vista previa del panel

```
<ActivityLog
  @subjectId={{this.order.id}}
  @maxVisibleActivities={{3}}
  @showControls={{false}}
>
  <:viewAll>
    <LinkTo @route="orders.order.activity" @model={{this.order}}>
      Ver todo
    </LinkTo>
  </:viewAll>
</ActivityLog>
```

Utilice
`@maxVisibleActivities`
para paneles o tarjetas de panel pequeñas. El bloque
`:viewAll`
se renderiza en la barra de encabezado junto con los controles del componente.

## Argumentos

### Filtrado

| Argumento | Tipo | Descripción |
|---|---|---|
| `@subjectId` | string | Filtra las actividades relacionadas con un registro específico |
| `@causerId` | string | Filtra las actividades causadas por un usuario específico |

### Visual

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@density` | string | `compact` | `compact` o `cozy` |
| `@showAvatars` | boolean | `true` | Muestra los avatares de los usuarios |
| `@showBadges` | boolean | `false` | Muestra las insignias de tipo de actividad |
| `@showHeader` | boolean | `true` | Muestra la fila de encabezado de la actividad |
| `@showControls` | boolean | `true` | Muestra el filtro de fecha y el botón de actualización |
| `@showAttributePreviousValues` | boolean | `true` | Incluye los valores anteriores en el cuadro emergente de propiedades modificadas |
| `@maxVisibleActivities` | number | — | Limita el número de actividades mostradas |
| `@dateFilterButtons` | array | — | Botones rápidos para el filtro de fecha (por ejemplo, "Últimos 7 días") |
| `@autoClose` | boolean | — | Cierra el selector de fecha después de la selección |
| `@toggleSelected` | boolean | — | Comportamiento de conmutación en el selector de fecha |

### Hooks de clase

| Argumento | Descripción |
|---|---|
| `@headerWrapperClass` | Fila de encabezado |
| `@groupClass` | Lista de la línea de tiempo |
| `@itemClass` | Cada elemento de la actividad |
| `@itemDetailsClass` | Contenedor de contenido de la fila |
| `@itemSentenceClass` | Texto de la frase de la actividad |
| `@itemRelativeTimestampClass` | Marca de tiempo relativa |
| `@itemBadgeClass` | Insignia de la actividad cuando `@showBadges={{true}}` |

### Callbacks

| Argumento | Firma | Descripción |
|---|---|---|
| `@onCauserClick` | `(causer)` | Se llama cuando se hace clic en un enlace de usuario en una actividad |
| `@onSubjectClick` | `(subject)` | Se llama cuando se hace clic en un enlace de sujeto |

### Bloque Yielded

| Bloque | Propósito |
|---|---|
| `:filters` | Renderiza controles de filtro adicionales en la barra de encabezado |
| `:viewAll` | Renderiza un enlace o acción en el lado derecho de la barra de encabezado |
| default | Renderiza contenido adicional después del registro de actividad |

## Ejemplo del mundo real

```
{{!-- Dentro de una superposición de detalle de pedido --}}
<ContentPanel @title="Activity Log" @open={{true}}>
  <ActivityLog
    @subjectId={{this.order.id}}
    @density="compact"
    @showAttributePreviousValues={{true}}
    @onCauserClick={{this.openUser}}
  />
</ContentPanel>
```

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/activity-log.hbs` | Plantilla |
| `addon/components/activity-log.js` | Clase — consulta el modelo Ember Data `activity` |