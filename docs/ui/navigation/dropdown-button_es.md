---
title: "DropdownButton"
url: https://fleetbase.io/docs/ui/navigation/dropdown-button
module: ui
---

# DropdownButton

<DropdownButton> es un botón que abre un menú desplegable, utilizado para menús de acciones, acciones masivas y controles agrupados. Acepta un array de elementos o proporciona un cuerpo de menú desplegable personalizado.

# <DropdownButton>

Un botón que abre un panel desplegable al hacer clic. Se utiliza para menús de acciones ("Más…"), controles agrupados (acciones masivas) y cualquier interfaz de usuario donde un disparador principal revela una lista de opciones.

## Uso con elementos

```
<DropdownButton @text="Acciones" @icon="ellipsis" @items={{this.actions}} />
```

```
actions = [
  { text: 'Editar',   icon: 'pencil',  onClick: this.edit },
  { text: 'Exportar', icon: 'download', onClick: this.exportData },
  { separator: true },
  { text: 'Eliminar', icon: 'trash',    onClick: this.delete, class: 'text-red-500' },
];
```

Cada elemento admite:

| Campo | Descripción |
| --- | --- |
| `text` (o `label`) | Etiqueta del elemento del menú |
| `icon` | Icono de FontAwesome |
| `iconSize`, `iconWidth` | Sobreescritura de iconos |
| `onClick` (o `fn`) | Maneador de clics |
| `perform` | Tarea de Ember-concurrencia para realizar |
| `disabled` | Estado deshabilitado |
| `class` | Clases adicionales en el elemento |
| `wrapperClass` | Clases adicionales en el contenedor |
| `separator: true` | Renderiza un separador en lugar de un elemento |
| `seperatorClass` | Clases adicionales en el separador |

## Uso basado en bloques

Para un contenido de menú desplegable más rico, proporciona un bloque. El bloque es la
`BasicDropdown`
API — puedes llamar
`dd.actions.close()`
desde dentro:

```
<DropdownButton @text="Filtros" @icon="filter" as |dd|>
  <div class="next-dd-menu p-4 w-72">
    <h3 class="font-semibold mb-2">Filtrar por estado</h3>
    {{!-- ... --}}
    <Button @text="Aplicar" @onClick={{dd.actions.close}} />
  </div>
</DropdownButton>
```

## Argumentos

### Botón

| Argumento | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `@text` | string | — | Etiqueta del botón |
| `@icon` | string | — | Icono de FontAwesome |
| `@iconPrefix`, `@iconSize`, `@iconClass` | — | — | Sobreescritura de iconos |
| `@type` | string | `default` | Tipo de botón — `primary`, `magic`, etc. |
| `@size` | string | — | `xs`, `sm`, `md`, `lg`, `xl` |
| `@active` | boolean | — | Fuerza el estado activo |
| `@isLoading` | boolean | — | Muestra un spinner |
| `@disabled` | boolean | — | Deshabilita el botón |
| `@visible` | boolean | `true` | Cuando es falso, nada se renderiza |
| `@helpText` | string | — | Tooltip en el botón |
| `@tooltipPlacement` | string | `top` | Posición del tooltip |
| `@buttonClass`, `@buttonWrapperClass`, `@textClass` | — | — | Sobreescritura de clases |
| `@buttonComponent` | string | — | Reemplaza el `<Button>` predeterminado con un componente personalizado |
| `@buttonComponentArgs` | object | — | Argumentos pasados a `@buttonComponent` |
| `@img`, `@imgClass`, `@alt` | — | — | Renderiza una imagen dentro del botón |
| `@permission` | string | — | Control de permisos |

### Comportamiento del menú desplegable

| Argumento | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `@items` | array | — | Descriptores de elementos (cuando no se utiliza un bloque) |
| `@dropdownId` | string | — | `id` de DOM para el menú desplegable |
| `@triggerClass`, `@contentClass`, `@dropdownMenuClass` | — | — | Sobreescritura de clases |
| `@horizontalPosition` | string | — | `left`, `right`, `auto` |
| `@verticalPosition` | string | — | `above`, `below`, `auto` |
| `@matchTriggerWidth` | boolean | — | Hace que el panel tenga el mismo ancho que el disparador |
| `@calculatePosition` | function | — | Función de posicionamiento personalizada |
| `@renderInPlace` | boolean | — | Renderiza en el orden del DOM en lugar de usar un portal |
| `@overlay` | boolean | — | Renderiza un fondo detrás del panel |
| `@defaultClass` | string | — | Clase en el estado predeterminado del menú desplegable |
| `@onOpen`, `@onClose` | funciones | — | Callbacks de ciclo de vida |

## Ejemplos del mundo real

```
{{!-- Menú de acciones en una fila --}}
<DropdownButton @icon="ellipsis" @size="xs" @items={{this.rowActions}} />

{{!-- Menú de acciones masivas (solo visible cuando hay filas seleccionadas) --}}
{{#if this.selectedCount}}
  <DropdownButton
    @icon="layer-group"
    @text="Acciones masivas"
    @type="magic"
    @items={{this.bulkActions}}
  />
{{/if}}

{{!-- Panel de filtros basado en bloques --}}
<DropdownButton @text="Filtros" @icon="filter" as |dd|>
  <div class="p-4">
    <FiltersPanel @onApply={{fn this.applyFilters dd}} />
  </div>
</DropdownButton>
```

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/dropdown-button.hbs` | Plantilla |
| `addon/components/dropdown-button.js` | Clase |