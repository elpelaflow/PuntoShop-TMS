---
title: "Servicio de Widgets"
url: https://fleetbase.io/docs/extension-development/universe/widget-service
module: extension-development
---

# Servicio de Widgets

Registra paneles y widgets que aparecen en el panel de control principal de Fleetbase o en el propio panel de control de tu extensión.

# Servicio de Widgets

El
**servicio de widgets**
(
`universe/widget-service`
) gestiona dos registros utilizados por el panel de control:

* **Paneles de control**
  — grupos nombrados de widgets (
  `'dashboard'`
  es el panel de control principal de la consola; puedes registrar el tuyo)
* **Widgets**
  —
  `Widget`
  descripciones que se pueden seleccionar en un panel de control, y que se cargan automáticamente como predeterminados, opcionalmente.

Normalmente, añadirás widgets al panel de control
`'dashboard'`
predeterminado. También puedes registrar tu propio panel de control para una página específica de la extensión.

## Resolviendo el Servicio

```
// addon/extension.js
import { Widget, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const widgetService = universe.getService('widget');
        // …
    },
};
```

## Registrando Widgets en el Panel de Control Predeterminado

El patrón más común: añadir uno o más widgets al panel de control principal. Los widgets con
`default: true`
también se añaden a la lista de widgets predeterminados, por lo que aparecen automáticamente la primera vez que un usuario accede al panel de control.

```
// addon/extension.js
import { Widget, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const widgetService = universe.getService('widget');

        widgetService.registerWidgets('dashboard', [
            new Widget({
                id: 'fleet-ops-key-metrics',
                name: 'Métricas de Fleet-Ops',
                description: 'Vehículos activos, conductores y órdenes en vivo.',
                icon: 'truck',
                component: new ExtensionComponent(
                    '@fleetbase/fleetops-engine',
                    'widget/fleet-ops-key-metrics'
                ),
                grid_options: { w: 12, h: 7, minW: 8, minH: 7 },
                options: { title: 'Métricas de Fleet-Ops' },
                default: true,
            }),
        ]);
    },
};
```

Ejemplo real:
[`packages/fleetops/addon/extension.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/fleetops/addon/extension.js)
.

## Registrando un Nuevo Panel de Control

Para extensiones que ofrecen su propio panel de control (por ejemplo, la vista de
`/console/ledger`
de Ledger), registra el panel de control y luego añade widgets a él.

```
widgetService.registerDashboard('ledger');
widgetService.registerWidgets('ledger', widgets);
```

Ejemplo real:
[`packages/ledger/addon/extension.js:185`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/ledger/addon/extension.js#L185)
— Ledger registra su propio panel de control, añade su conjunto completo de widgets allí, y además expone un subconjunto curado en el panel de control
`'dashboard'`
predeterminado.

## Métodos

### registerDashboard(name, options?)

Registra un panel de control con un nombre.
`options`
se almacenan junto con el registro del panel de control y se pasan a cualquier componente que lo renderice.

```
widgetService.registerDashboard('ledger', {
    title: 'Visión general de Ledger',
    icon: 'gauge-high',
});
```

### registerWidgets(dashboardName, widgets)

Añade widgets a la lista de widgets seleccionables de un panel de control. Los widgets con
`default: true`
también se añaden a la lista de widgets predeterminados.

* `widgets`
  aceptan un único
  `Widget`
  /objeto o un array
* Cada widget se normaliza mediante
  `Widget.toObject()`
  y se almacena bajo la clave
  `${dashboardName}#${widget.id}`
* `id`
  (o el alias legado
  `widgetId`
  ) es obligatorio; los ids faltantes emiten una advertencia

### registerDefaultWidgets(dashboardName, widgets)

Añade widgets directamente a la lista de widgets predeterminados — se cargan automáticamente al renderizarse por primera vez, incluso si no están en la lista de widgets seleccionables. Úsalo con moderación; la mayoría de los widgets deben ir a través de
`registerWidgets()`
con
`default: true`
.

### getWidgets(dashboardName)

Devuelve todos los widgets registrados para el panel de control dado.

### getDefaultWidgets(dashboardName)

Devuelve el subconjunto cargado automáticamente.

### getWidget(dashboardName, widgetId)

Busca un único widget.

### getDashboards() / getDashboard(name)

Devuelve el registro de paneles de control / un registro de panel de control individual.

## El Contrato de Widgets

`Widget`
acepta tanto un objeto de opciones como un formato de constructor fluido. Consulta
[Contracts →
`Widget`](https://fleetbase.io/docs/extension-development/reference/contracts#widget)
para la tabla completa de propiedades.

| Propiedad | Descripción |
|---|---|
| `id` | **Requerido.** Identificador único (también aceptado el alias `widgetId`) |
| `name` | Nombre de visualización en el selector |
| `description` | Descripción corta en el selector |
| `icon` | Icono de FontAwesome |
| `component` | Un `ExtensionComponent` (ruta, clase o opciones completas) |
| `grid_options` | `{ w, h, minW, minH }` — se pasan a `grid-stack` |
| `options` | Opciones predeterminadas que se pasan al componente del widget |
| `category` | Categoría del selector (predeterminado `'default'`) |
| `default` | Añadir automáticamente a la lista de widgets predeterminados del panel de control |

```
new Widget({
    id: 'fleet-ops-key-metrics',
    name: 'Métricas de Fleet-Ops',
    description: 'Vehículos, conductores y pedidos activos.',
    icon: 'truck',
    component: new ExtensionComponent('@fleetbase/fleetops-engine', 'widget/fleet-ops-key-metrics'),
    grid_options: { w: 12, h: 7, minW: 8, minH: 7 },
    options: { title: 'Métricas de Fleet-Ops' },
    default: true,
});
```

## Construyendo el Componente de Widgets

Un componente de widgets vive dentro de tu motor — cualquier lugar bajo
`addon/components/`
funciona. La referencia
`ExtensionComponent`
es lo que cruza el límite del motor.

```
{{!-- addon/components/widget/fleet-ops-key-metrics.hbs --}}
<div class="widget">
    {{#if this.isLoading}}
        <Spinner />
    {{else}}
        <div class="text-2xl">{{this.metrics.activeOrders}}</div>
        <div class="text-xs text-secondary">Órdenes de transporte activas</div>
    {{/if}}
</div>
```

```
// addon/components/widget/fleet-ops-key-metrics.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class FleetOpsKeyMetricsWidget extends Component {
    @service fetch;
    @tracked metrics = null;
    @tracked isLoading = true;

    constructor() {
        super(...arguments);
        this.load();
    }

    async load() {
        this.metrics = await this.fetch.get('fleet-ops/metrics');
        this.isLoading = false;
    }
}
```

## Métodos Obsoletos

Los dos atajos de la fachada en
`UniverseService`
siguen estando, pero emiten advertencias de obsolescencia:

| Obsoleto | En su lugar |
|---|---|
| `universe.registerDashboardWidgets(widgets)` | `universe.getService('widget').registerWidgets('dashboard', widgets)` |
| `universe.registerDefaultDashboardWidgets(widgets)` | `universe.getService('widget').registerDefaultWidgets('dashboard', widgets)` |

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/services/universe/widget-service.js` | `WidgetService` |
| `addon/contracts/widget.js` | Contrato `Widget` |
| [`packages/fleetops/addon/extension.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/fleetops/addon/extension.js) | Widgets de transporte en el panel principal |
| [`packages/ledger/addon/extension.js`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/packages/ledger/addon/extension.js) | Panel de control personalizado + conjunto completo de widgets |

[Hook Service

Utiliza los hooks para interactuar con los puntos clave del ciclo de vida de la aplicación, como el inicio de sesión, los cambios de ruta, el inicio del panel de control y los eventos personalizados que puedas disparar.](https://fleetbase.io/docs/extension-development/universe/hook-service)
[Registry Service

Crea registros, registra componentes en los espacios de otros extensiones y registra componentes, servicios y ayudas que cruzan los límites del motor — a través de `universe.getService('registry')`.](https://fleetbase.io/docs/extension-development/universe/registry-service)