---
title: "Kanban"
url: https://fleetbase.io/docs/ui/scheduling/kanban
module: ui
---

# Kanban

`<Kanban>` es un componente de tablero arrastrable con columnas y tarjetas de elementos configurables. Se utiliza para flujos de trabajo, tableros de asignación y cualquier flujo de trabajo basado en columnas.

# `<Kanban>`

`<Kanban>`
es un componente de tablero con columnas configurables y tarjetas de elementos arrastrables. Los elementos se mueven entre columnas mediante arrastrar y soltar. Se utiliza para flujos de trabajo (
`Por hacer`
→
`En progreso`
→
`Completado`
), tableros de asignación, tableros de flujo de trabajo de pedidos y cualquier interfaz de usuario basada en columnas.

## Uso básico

```
<Kanban
  @columns={{this.columns}}
  @items={{this.items}}
  @groupBy="status"
  @onItemDrop={{this.handleDrop}}
  @onItemClick={{this.openItem}}
>
  <:card as |item|>
    <div class="font-semibold">{{item.title}}</div>
    <div class="text-xs text-gray-500">{{item.description}}</div>
  </:card>
</Kanban>
```

## Argumentos

| Argumento | Tipo | Descripción |
| --- | --- | --- |
| `@columns` | array | Definiciones de columnas — `{ id, label, color? }` |
| `@items` | array | Elementos a renderizar |
| `@groupBy` | string | Propiedad en cada elemento para determinar su columna |
| `@editable` | boolean | Habilitar arrastrar y soltar (por defecto `true`) |
| `@onItemDrop` | `(item, fromColumn, toColumn)` | Se llama cuando un elemento se mueve entre columnas |
| `@onItemClick` | `(item)` | Se llama cuando se hace clic en un elemento |
| `@onColumnDrop` | `(column, fromIndex, toIndex)` | Se llama cuando se reordena una columna |

## Bloques nombrados

| Bloque | Propósito |
| --- | --- |
| `:card` | Renderizador de tarjeta de elemento personalizado (devuelve el elemento) |
| `:column-header` | Encabezado de columna personalizado (devuelve la columna) |

## Ejemplos del mundo real

```
{{!-- Tablero de asignación de pedidos --}}
<Kanban
  @columns={{array
    (hash id="created" label="Nuevo")
    (hash id="dispatched" label="Asignado")
    (hash id="started" label="En tránsito")
    (hash id="completed" label="Entregado")
  }}
  @items={{this.orders}}
  @groupBy="status"
  @onItemDrop={{this.advanceOrder}}
  @onItemClick={{this.openOrder}}
>
  <:card as |order|>
    <Pill @resource={{order.driver}} />
    <div class="text-xs">{{order.public_id}}</div>
  </:card>
</Kanban>
```

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/kanban.hbs` | Plantilla |
| `addon/components/kanban.js` | Clase |
| `addon/components/kanban/` | Subcomponentes |

[EventCalendar / ScheduleCalendar

<EventCalendar> es un calendario de cuadrícula de fechas; <ScheduleCalendar> es un programador de recursos con arrastrar y soltar. Ambos devuelven bloques para renderizar elementos personalizados.](https://fleetbase.io/docs/ui/scheduling/event-calendar)
[Descripción general

Cómo funcionan los modales en @fleetbase/ember-ui — el servicio modals-manager, los diseños integrados y cómo crear componentes de modales personalizados.](https://fleetbase.io/docs/ui/modals/overview)