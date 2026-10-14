---
title: "Drawer"
url: https://fleetbase.io/docs/ui/layout/drawer
module: ui
---

# Drawer

`<Drawer>` es un panel anclado en la parte inferior y con altura ajustable — utilizado para vistas de detalles en línea, editores secundarios y UIs con estilo de bandeja.

# `<Drawer>`

`<Drawer>`
es un panel anclado en la parte inferior con un mango arrastrable. El usuario puede ajustarlo verticalmente arrastrando el borde, y, opcionalmente, hacer doble clic en una ranura para minimizar. Se utiliza para vistas de detalles en línea y UIs con estilo de bandeja.

Para un panel deslizante que ocupa todo el borde de la pantalla, utilice
[`<Overlay>`](https://fleetbase.io/docs/ui/layout/overlay).

## Uso básico

```
<Drawer
  @isOpen={{this.editorOpen}}
  @isResizable={{true}}
  @notchEnabled={{true}}
  @onClose={{fn (mut this.editorOpen) false}}
  as |drawer|
>
  <h2>Editar notas</h2>
  <textarea>{{this.notes}}</textarea>
  <Button @text="Cerrar" @onClick={{drawer.close}} />
</Drawer>
```

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `@isOpen` | booleano | `true` | Estado inicial |
| `@isResizable` | booleano | `false` | Permite ajustar la altura arrastrando el borde |
| `@notchEnabled` | booleano | `false` | Muestra el mango arrastrable en el borde — hacer doble clic alterna para minimizar |
| `@noBackdrop` | booleano | `false` | No renderiza el fondo |
| `@fullHeight` | booleano | `false` | Se abre a la altura completa de la ventana |
| `@height` | cadena | — | Altura inicial (por ejemplo, `"400px"`) |
| `@minResizeHeight` | número | — | Altura mínima de ajuste |
| `@maxResizeHeight` | número | — | Altura máxima de ajuste |
| `@overlayClass` | cadena | — | Clases adicionales en el envoltorio exterior |
| `@containerClass` | cadena | — | Clases adicionales en el contenedor del panel |

### Callbacks

| Argumento | Firma | Descripción |
| --- | --- | --- |
| `@onOpen` / `@onClose` / `@onToggle` | `(api)` | Callbacks de cambio de estado |
| `@onResize` / `@onResizeStart` / `@onResizeEnd` | `({ event, drawerPanel })` | Ciclo de vida del ajuste |
| `@onMinimize` | `()` | Se llama cuando el usuario hace doble clic en la ranura |

## API devuelta

El drawer devuelve un objeto de contexto:
`{ toggle, open, close, minimize, isOpen, isMinimized }`
.

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/drawer.hbs` | Plantilla |
| `addon/components/drawer.js` | Clase |

[Overlay

<Overlay> es un panel deslizante que se ancla al lado izquierdo/derecho/superior/inferior de la pantalla. Se utiliza para vistas de detalles deslizables, paneles laterales y UIs similares a bandejas.](https://fleetbase.io/docs/ui/layout/overlay)
[Diseños de recursos

<Layout::Resource::Tabular>, <Layout::Resource::Card>, <Layout::Resource::CardsGrid>, y <Layout::Resource::Panel> — Diseños de página preconstruidos para vistas de listas de recursos.](https://fleetbase.io/docs/ui/layout/resource-tabular)