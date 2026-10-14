---
title: "TabNavigation"
url: https://fleetbase.io/docs/ui/navigation/tab-navigation
module: ui
---

# TabNavigation

El componente `<TabNavigation>` renderiza una barra de pestañas. Admite pestañas basadas en rutas (LinkTo), pestañas basadas en estado, iconos, indicadores, pestañas que se pueden cerrar y un botón para añadir pestañas.

# <TabNavigation>

`<TabNavigation>`
renderiza una barra de pestañas con estado activo, iconos, indicadores y, opcionalmente, un área de contenido. Las pestañas pueden ser:

* **Basadas en rutas**
  — Al hacer clic en una pestaña, se navega a través de
  `LinkTo`
* **Basadas en estado**
  — Al hacer clic en una pestaña, se alterna el estado activo y se emite
  `@onSelect`

Para un contenedor más simple que proporcione un subcomponente `<Tab>`, utilice
`<Tabs>`.

## Ejemplo basado en rutas

```
<TabNavigation @tabs={{this.tabs}} />
```

```
tabs = [
  { id: 'overview', label: 'Overview', route: 'driver.show.overview', icon: 'eye' },
  { id: 'orders',   label: 'Orders',   route: 'driver.show.orders',   icon: 'list', badgeText: this.orderCount },
  { id: 'docs',     label: 'Documents',route: 'driver.show.docs',     icon: 'file' },
];
```

Cada pestaña puede tener:

* `id`
  (obligatorio para pestañas basadas en estado)
* `label`
  — texto de visualización
* `route`
  — nombre de la ruta de Ember (utiliza
  `LinkTo`)
* `query`
  — parámetros de consulta para la ruta
* `model`
  — modelo para la ruta
* `icon`
  — icono de FontAwesome
* `iconSize`, `iconClass`, `iconWrapperClass`
  — personalización del icono
* `hasBadge` / `badgeText`
  — indicador pequeño después de la etiqueta
* `isClosable`
  — mostrar un botón de cierre en la pestaña
* `isDisabled`
  — estado deshabilitado
* `class`
  — clases adicionales para esta pestaña específica

## Ejemplo basado en estado

```
<TabNavigation @tabs={{this.tabs}} @onSelect={{this.selectTab}} as |activeTab|>
  {{#if (eq activeTab.id "overview")}}
    <OverviewPanel />
  {{else if (eq activeTab.id "orders")}}
    <OrdersPanel />
  {{/if}}
</TabNavigation>
```

Cuando las pestañas no tienen una
`route`,
pasan a un estado interno y emiten
`@onSelect(tab)`. La pestaña activa se pasa al bloque predeterminado.

## Argumentos

### Tabs

| Argument | Tipo | Descripción |
|---|---|---|
| `@tabs` | array | Descriptores de pestañas |
| `@iconType` | string | `"icon"` (predeterminado, FontAwesome) o `"component"` (renderiza el icono como un componente) |
| `@onSelect` | `(tab)` | Se llama cuando se hace clic en una pestaña basada en estado |
| `@onAddTab` | `()` | Si se establece, muestra un botón "+" al final de la barra |
| `@onCloseTab` | `(tab)` | Se llama cuando se hace clic en el botón de cierre de una pestaña que se puede cerrar |

### Visual

| Argument | Tipo | Default | Descripción |
|---|---|---|---|
| `@style` | string | `github` | Preajuste de estilo visual |
| `@size` | string | `md` | `sm`, `md`, `lg` |
| `@containerClass` | string | — | Contenedor externo |
| `@tablistClass` | string | — | Fila de la barra de pestañas |
| `@tabClass` | string | — | Cada pestaña |
| `@contentClass` | string | — | Área de contenido |
| `@tabActionsWrapperClass` | string | — | Botones de acción en el lado derecho |
| `@tabTitleWrapperClass` | string | — | Espacio para el título |

### Bloques Yielded

| Block | Receives | Purpose |
|---|---|---|
| (default) | `activeTab` | Contenido para la pestaña activa |
| `:title` | — | Renderiza el contenido antes de las pestañas |
| `:tabs` | the component | Reemplaza toda la lista de pestañas con markup personalizado |
| `:actions` | — | Botones de acción en el lado derecho |

## Ejemplos del mundo real

```
{{!-- Página de detalles del conductor con pestañas basadas en rutas --}}
<TabNavigation @tabs={{this.detailTabs}}>
  <:title>
    <h2 class="text-lg font-semibold">{{this.driver.name}}</h2>
  </:title>
  <:actions>
    <Button @icon="ellipsis" @size="xs" />
  </:actions>
</TabNavigation>

{{!-- Pestañas en línea en un panel de configuración --}}
<TabNavigation @tabs={{this.tabs}} @onSelect={{this.onTab}} as |tab|>
  {{#if (eq tab.id "general")}}
    <GeneralSettings />
  {{else if (eq tab.id "permissions")}}
    <PermissionsSettings />
  {{/if}}
</TabNavigation>
```

## Ver también

* `<Tabs>` — contenedor más simple que proporciona un subcomponente `<Tab>` (utilice `@title` en cada uno)

## Fuente

| File | Description |
|---|---|
| `addon/components/tab-navigation.hbs` | Template |
| `addon/components/tab-navigation.js` | Class |
| `addon/components/tabs.hbs` | Sibling — contenedor más simple que proporciona un subcomponente `<Tab>` |
| `addon/components/tabs.js` |  |
| `addon/components/tabs/tab.hbs` | Tab subcomponent template |
| `addon/components/tabs/tab.js` | Tab subcomponent class |