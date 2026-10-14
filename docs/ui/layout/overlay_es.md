---
title: "Superposición"
url: https://fleetbase.io/docs/ui/layout/overlay
module: ui
---

# Superposición

`<Overlay>` es un panel deslizante que se adhiere al borde izquierdo/derecho/superior/inferior de la pantalla. Se utiliza para mostrar detalles, paneles laterales y interfaces similares a cajones.

# `<Overlay>`

`<Overlay>`
es un panel deslizante que se adhiere a un borde de la pantalla. Soporta gestos de minimizar/maximizar/redimensionar y es la base para la mayoría de las vistas de detalles deslizantes en la consola Fleetbase.

Para los diálogos modales (centrados, fondo atenuado), utilice el
[sistema de diálogos](https://fleetbase.io/docs/ui/modals/overview)
en su lugar.

## Uso básico

```
<Overlay
  @position="derecha"
  @isOpen={{this.detailOpen}}
  @onClose={{fn (mut this.detailOpen) false}}
  @isResizable={{true}}
>
  {{!-- Contenido del cuerpo --}}
  <h2>Detalles del conductor</h2>
  <p>{{this.driver.name}}</p>
</Overlay>
```

## Argumentos

### Posición y tamaño

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@position` | string | `derecha` | `izquierda`, `derecha`, `arriba`, `abajo` |
| `@isOpen` | booleano | `verdadero` | Estado inicial |
| `@isResizable` | booleano | `falso` | Permite al usuario redimensionar |
| `@isMinimizable` | booleano | `falso` | Muestra el botón de minimizar |
| `@isMaximizable` | booleano | `falso` | Muestra el botón de maximizar |
| `@disableResize` | booleano | `falso` | Deshabilita la redimensión incluso si `@isResizable` |
| `@minResizeWidth` | número | `560` | Ancho mínimo de redimensión en píxeles |
| `@maxResizeWidth` | número | `900` | Ancho máximo de redimensión en píxeles |

### Callbacks

| Argumento | Firma | Descripción |
|---|---|---|
| `@onLoad` | `(api)` | Se llama una vez cuando se monta el panel | `api` expone `{ toggle, open, close, minimize, maximize }` |
| `@onOpen` / `@onClose` | `(api)` | Se llama cuando cambia el estado |
| `@onToggle` | `(api)` | Se llama al cambiar de estado |
| `@onResize` / `@onResizeStart` / `@onResizeEnd` | `({ event, overlayPanelNode })` | Ciclo de vida de la redimensión |
| `@onMinimize` / `@onMaximize` | `()` | Los botones emiten estos, además de modificar el estado interno |

## Control imperativo

Utilice el API a través de
`@onLoad`
:

```
<Overlay @position="derecha" @onLoad={{this.captureApi}}>
  {{!-- ... --}}
</Overlay>
```

```
@tracked api = null;
@action captureApi(api) { this.api = api; }
@action openDetail() { this.api.open(); }
@action minimizeDetail() { this.api.minimize(); }
```

El objeto API:
`{ toggle, open, close, minimize, maximize, isOpen, isMinimized, isMaximized, overlayNode }`
.

## Componentes secundarios

`<Overlay>`
yields componentes contextuales nombrados para las regiones de encabezado, cuerpo y pie. Consulte
`addon/components/overlay/`
para la lista de subcomponentes.

## Ejemplos del mundo real

```
{{!-- Panel de superposición adosado a la derecha --}}
<Overlay
  @position="derecha"
  @isOpen={{this.detailOpen}}
  @isResizable={{true}}
  @isMinimizable={{true}}
  @onClose={{fn (mut this.detailOpen) false}}
>
  <h2>{{this.selectedOrder.public_id}}</h2>
  {{!-- ... --}}
</Overlay>
```

## Ver también

* [`<Drawer>`](https://fleetbase.io/docs/ui/layout/drawer)
  — panel deslizante más simple
* [Diálogos](https://fleetbase.io/docs/ui/modals/overview)
  — para diálogos centrados y bloqueantes
* [`<ContentPanel>`](https://fleetbase.io/docs/ui/layout/content-panel)
  — sección en línea que se puede plegar

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/overlay.hbs` | Plantilla |
| `addon/components/overlay.js` | Clase |
| `addon/components/overlay/` | Subcomponentes (regiones de encabezado, cuerpo y pie) |