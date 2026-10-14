---
title: "Servicio de Panel"
url: https://fleetbase.io/docs/ui/dashboard/service
module: ui
---

# Servicio de Panel

El servicio `dashboard` gestiona los paneles de control de una extensión: cargar, cambiar, crear, eliminar, y rastrea el estado de edición y los paneles de widgets.

# Servicio de Panel

```
@service dashboard;
```

El
`dashboard`
servicio es la API detrás de las páginas de panel en la consola. Cada extensión que proporciona un panel de control interactúa con este servicio para cargar su conjunto de paneles, cambiar entre ellos y añadir/eliminar widgets.

Para la mayoría de los autores de extensiones, los componentes
`<Layout::Resource::Tabular>`
y el componente de panel de control gestionan esto automáticamente: solo necesitas inyectar el servicio directamente para flujos personalizados.

## Inyectar

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class DashboardPageComponent extends Component {
  @service dashboard;
}
```

## Cargar Paneles

```
@action async loadInitialDashboards() {
  await this.dashboard.loadDashboards.perform({
    defaultDashboardId: 'fleet-ops-overview',
    defaultDashboardName: 'Overview',
    extension: 'fleet-ops',
  });
}
```

`loadDashboards`
es una tarea asíncrona: las llamadas concurrentes se cancelan para evitar condiciones de carrera. Después de cargar:

* `dashboards`
  es un array de registros de paneles (el valor predeterminado se desplaza al principio si no está ya presente)
* `currentDashboard`
  se establece en el siguiente panel de control aplicable

## Estado Rastreado

| Propiedad | Tipo | Descripción |
| --- | --- | --- |
| `dashboards` | array | Todos los paneles de control cargados |
| `currentDashboard` | dashboard | El panel de control activo |
| `isEditingDashboard` | boolean | Indica si el usuario está en modo de edición |
| `isAddingWidget` | boolean | Indica si el panel de añadir widgets está abierto |
| `showPanelWhenZeroWidgets` | boolean | Abre automáticamente el panel de añadir widgets para paneles vacíos |

## Tareas

| Tarea | Args | Descripción |
| --- | --- | --- |
| `loadDashboards` | `{ defaultDashboardId, defaultDashboardName, extension }` | Carga los paneles de control desde la API y selecciona el siguiente |
| `selectDashboard` | `dashboard` | Cambia a un panel de control diferente (envía una solicitud POST a `/dashboards/switch`) |
| `createDashboard` | `name, attributes?` | Crea un nuevo panel de control |
| `deleteDashboard` | `dashboard, options?` | Elimina un panel de control |
| `setCurrentDashboard` | `dashboard` | Establece el panel de control activo sin activar el punto final de intercambio |

## Acciones

| Acción | Descripción |
| --- | --- |
| `onChangeEdit(state = true)` | Activa/desactiva el modo de edición |
| `onAddingWidget(state = true)` | Activa/desactiva el panel de añadir widgets |
| `reset()` | Borra todos los paneles de control cargados y restablece el estado |

## Paneles de Control del Sistema

Algunos paneles de control están marcados como
**paneles de control del sistema**
(el valor predeterminado inicial para una extensión). Cuando el usuario cambia el que es "predeterminado", el servicio envía una solicitud POST a
`/dashboards/reset-default`
para persistir la selección a nivel de empresa.

## Ejemplo Práctico

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class FleetOpsDashboardComponent extends Component {
  @service dashboard;

  constructor() {
    super(...arguments);
    this.dashboard.loadDashboards.perform({
      defaultDashboardId: 'fleet-ops-overview',
      defaultDashboardName: 'Overview',
      extension: 'fleet-ops',
    });
  }

  @action toggleEdit() {
    this.dashboard.onChangeEdit(!this.dashboard.isEditingDashboard);
  }

  @action async addWidget() {
    this.dashboard.onAddingWidget(true);
  }
}
```

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/services/dashboard.js` | Clase de servicio |
| `addon/services/universe/widget-service.js` | Servicio asociado: gestiona el registro de widgets disponibles |