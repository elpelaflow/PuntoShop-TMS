---
Título: Servicio de Panel de Contexto de Recursos
url: https://fleetbase.io/docs/ui/services/resource-context-panel
módulo: ui
---

# Servicio de Panel de Contexto de Recursos

El servicio `resource-context-panel` abre paneles de detalle contextual para cualquier recurso de Fleetbase, ya sea con un solo contenido o con pestañas, con sincronización de rutas y una pila de paneles anidados.

# Servicio de Panel de Contexto de Recursos

```
@service resourceContextPanel;
```

El servicio
`resource-context-panel`
es la forma estandarizada de abrir un panel de detalle contextual para un registro. Soporta una pila de paneles, diseños con pestañas o con un solo contenido, URLs sincronizadas con la ruta, y guardias de navegación por pestaña.

Esto es el mismo mecanismo que utiliza la consola para "hacer clic en una fila → abrir el panel de detalle" — y puedes controlarlo desde cualquier parte de tu extensión.

## Inyectar

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class DriverRowComponent extends Component {
  @service resourceContextPanel;
}
```

## Abrir un Panel con un Solo Contenido

```
@action openDriver(driver) {
  this.resourceContextPanel.open({
    title: driver.name,
    resource: driver,
    content: 'driver/detail-panel',     // ruta del componente
    size: 'lg',
    onClose: () => { /* … */ },
  });
}
```

El componente en
`addon/components/driver/detail-panel.{hbs,js}`
se renderiza dentro del panel y recibe el recurso a través de sus argumentos.

## Abrir un Panel con Pestañas

```
@action openOrder(order) {
  this.resourceContextPanel.open({
    title: order.public_id,
    resource: order,
    tabs: [
      { key: 'overview', label: 'Resumen', component: 'order/tabs/overview' },
      { key: 'timeline', label: 'Cronología', component: 'order/tabs/timeline' },
      { key: 'comments', label: 'Comentarios', component: 'order/tabs/comments' },
    ],
    initialTab: 'overview',
    routeSync: true,
    closeOnTransition: true,
  });
}
```

Un panel con pestañas requiere **ya sea**
`tabs`
**o**
`content`, pero no ambos.

## Objeto de Definición

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | string | Opcional — generado automáticamente si se omite |
| `title` | string | Título del panel |
| `resource` (o `model`) | modelo | El registro de Fleetbase para el que es el panel |
| `size` | string | `sm`, `md`, `lg`, `xl`, `full` (predeterminado `sm`) |
| `content` | string | Ruta del componente para un panel con un solo contenido |
| `tabs` | array | Descriptores de pestañas (mutuamente excluyentes con `content`) |
| `initialTab` | string | Pestaña inicial |
| `routeSync` | booleano | Refleja el panel abierto + pestaña activa en la URL a través de los parámetros de consulta `panel_id` y `panel_tab` |
| `closeOnTransition` | booleano | Cierra automáticamente cuando el usuario navega |
| `onOpen` | `({ resource, model, close })` | Se llama cuando se abre el panel |
| `onClose` | `({ model, close })` | Se llama al cerrar — devuelve una Promesa para esperar |

### Descriptor de Pestaña

| Campo | Tipo | Descripción |
|---|---|---|
| `key` | string | Clave única |
| `label` (o `title`) | string | Etiqueta de visualización |
| `component` | string | Ruta del componente |
| `render` | función | Alternativa — función de renderizado |
| `beforeLeave` | `({ model, close }) → bool | Promise<bool>` | Guardia que se ejecuta cuando se cambia de esta pestaña — devuelve `false` para bloquear |

## API Pública

| Método | Descripción |
|---|---|
| `open(definition)` | Abre un panel. Devuelve el ID del panel |
| `update(id, partial)` | Combina actualizaciones en un panel existente |
| `close(id?)` | Cierra un panel específico, o el activo si no se especifica |
| `closeAll()` | Cierra todos los paneles de la pila |
| `setActiveTab(id, tabKey)` | Cambia de pestañas (respeta `beforeLeave`) |
| `getActive()` | El panel más alto |
| `getById(id)` | Encuentra un panel específico |
| `getActiveTab(id)` | La pestaña activa para un panel |
| `isOpen(id?)` | Indica si el panel (o cualquier panel) está abierto |
| `stack()` | Una instantánea de la pila de paneles |
| `bringToFront(id)` | Mueve un panel al frente de la pila |

## Sincronización de Rutas

Cuando
`routeSync: true`
, el servicio escribe
`panel_id`
y
`panel_tab`
en los parámetros de consulta de la ruta. Esto significa que los paneles sobreviven a las actualizaciones y se pueden compartir a través de URLs — copia la URL en una nueva pestaña del navegador y el mismo panel se reabre.

Combina
`routeSync: true`
con
`closeOnTransition: true`
si quieres que el panel se cierre limpiamente cuando el usuario navega a otra página.

## Ejemplo del Mundo Real

```
@action openInvoice(invoice) {
  this.resourceContextPanel.open({
    title: `Factura ${invoice.number}`,
    resource: invoice,
    size: 'lg',
    routeSync: true,
    closeOnTransition: true,
    tabs: [
      {
        key: 'details',
        label: 'Detalles',
        component: 'invoice/details',
      },
      {
        key: 'history',
        label: 'Historial',
        component: 'invoice/history',
      },
      {
        key: 'edit',
        label: 'Editar',
        component: 'invoice/edit',
        beforeLeave: async ({ model }) => {
          if (model.hasDirtyAttributes) {
            return confirm('¿Descartar cambios no guardados?');
          }
          return true;
        },
      },
    ],
    onClose: async ({ model }) => {
      if (model.hasDirtyAttributes) {
        model.rollbackAttributes();
      }
    },
  });
}
```

## Ver también

* [`<ResourceContextPanel>`
  component](#)
  — el componente que se monta (renderizado una vez en el shell de la aplicación)
* `helpers/resource-context-panel-save-disabled.js`
  — pequeño helper utilizado por el botón de guardar del panel

## Fuente

* `addon/services/resource-context-panel.js`
  — Clase de servicio
* `addon/components/resource-context-panel.hbs`
  — Plantilla del componente
* `addon/components/resource-context-panel.js`
  — Clase del componente

[Sidebar Service

El servicio `sidebar` controla la visibilidad (visible / minimizada / oculta) y el estado de habilitación de la barra lateral del panel de control.](https://fleetbase.io/docs/ui/services/sidebar)
[Template Builder Service

El servicio `template-builder` permite a las extensiones registrar las clases de modelo de Fleetbase como tipos de recursos consultables en el formulario de consulta de plantillas.](https://fleetbase.io/docs/ui/services/template-builder)