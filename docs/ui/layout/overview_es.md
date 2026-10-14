---
title: "Visión general"
url: https://fleetbase.io/docs/ui/layout/overview
module: ui
---

# Visión general

Elementos básicos de diseño de nivel superior en `@fleetbase/ember-ui — Layout::Container, Layout::Header, Layout::Sidebar, Layout::Section, así como los componentes independientes `<Overlay>`, `<Drawer>`, `<ContentPanel>` y `<Spacer>`.

# Visión general del diseño

`@fleetbase/ember-ui`
proporciona dos conjuntos complementarios de elementos básicos de diseño:

1. **Esqueleto de nivel superior**
   —
   `<Layout::Container>`
   ,
   `<Layout::Header>`
   ,
   `<Layout::Sidebar>`
   ,
   `<Layout::Section>`
   ,
   `<Layout::Main>`
   . Estos conforman la estructura general de la página.
2. **Ayudantes de diseño en línea**
   —
   `<ContentPanel>`
   ,
   `<Overlay>`
   ,
   `<Drawer>`
   ,
   `<Spacer>`
   ,
   `<Floating>`
   . Estos estructuran las regiones dentro de una página.

La mayoría de los autores de extensiones no componen
`<Layout::*>`
directamente; la consola anfitriona ya proporciona la estructura. Sin embargo, utilizará ampliamente los ayudantes en línea.

## Esqueleto de nivel superior

| Componente | Propósito |
|---|---|
| `<Layout::Container>` | La capa exterior |
| `<Layout::Header>` | Barra de aplicación superior con logotipo, barra de búsqueda y notificaciones |
| `<Layout::Sidebar>` | Barra de navegación izquierda |
| `<Layout::Main>` | Área de contenido principal |
| `<Layout::Section>` | Panel desplazable con borde dentro de Main |
| `<Layout::MobileNavbar>` | Barra de navegación inferior para dispositivos móviles/tabletas |

Estos normalmente se componen una vez a nivel de la aplicación.

## Ayudantes de diseño en línea

ContentPanel

Sección plegable con título, estado y botones de acción. El componente de diseño más utilizado.

[ContentPanel →](https://fleetbase.io/docs/ui/layout/content-panel)

Overlay

Panel deslizante anclado al borde — izquierda, derecha, arriba o abajo. Redimensionable, minimizable.

[Overlay →](https://fleetbase.io/docs/ui/layout/overlay)

Drawer

Panel anclado en la parte inferior, con capacidad de redimensionamiento vertical para vistas de detalles en línea.

[Drawer →](https://fleetbase.io/docs/ui/layout/drawer)

Floating

Elemento flotante posicionado en relación con un disparador — menús desplegables, ayudas contextuales, paneles desplegables.

[Floating →](https://fleetbase.io/docs/ui/layout/floating)

ResourceTabular

Diseño estándar de página de lista/detalle para páginas de recursos.

[ResourceTabular →](https://fleetbase.io/docs/ui/layout/resource-tabular)

Spacer

Caja vacía para añadir espacio de tamaño fijo entre elementos.

[Spacer →](https://fleetbase.io/docs/ui/layout/spacer)

## Eligiendo entre Overlay, Drawer y Modal

| Caso de uso | Componente |
|---|---|
| Diálogo centrado y bloqueante | [Modals](https://fleetbase.io/docs/ui/modals/overview) |
| Panel lateral deslizante (por ejemplo, vista de detalles) | [`<Overlay>`](https://fleetbase.io/docs/ui/layout/overlay) |
| Bandeja anclada en la parte inferior (por ejemplo, editor en línea) | [`<Drawer>`](https://fleetbase.io/docs/ui/layout/drawer) |
| Sección plegable en línea en la página | [`<ContentPanel>`](https://fleetbase.io/docs/ui/layout/content-panel) |

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/layout/` | Componentes de diseño de nivel superior |
| `addon/components/` | Ayudantes de diseño en línea ( `<name>.hbs` / `.js` ) |