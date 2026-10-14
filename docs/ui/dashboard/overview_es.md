---
title: "Descripción general"
url: https://fleetbase.io/docs/ui/dashboard/overview
module: ui
---

# Descripción general

Cómo funcionan los paneles de control en @fleetbase/ember-ui: el servicio de paneles de control, los widgets y los registros de widgets.

# Paneles de control

`@fleetbase/ember-ui`
proporciona un subsistema completo de paneles de control: un
[`panel de control`](https://fleetbase.io/docs/ui/dashboard/service)
para administrar los paneles de control, un
`<Panel de control>`
componente para renderizarlos, así como widgets y un registro de widgets respaldado por Universe que permite que las extensiones contribuyan widgets entre sí.

La mayoría de los autores de extensiones no renderizan
`<Panel de control>`
directamente: la consola proporciona una página de panel de control para cada extensión que los soporta, impulsada por el servicio.

## Cómo encajan todo

```
┌──────────────────────────────────────────────────────┐
│  universe/widget-service                              │
│  ├── registerWidget('chart', { component, defaults })│
│  └── tipos de widgets disponibles para la selección    │
└──────────────────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  servicio de paneles de control                               │
│  ├── loadDashboards()                                 │
│  ├── panel de control actual                               │
│  ├── isEditingDashboard / isAddingWidget               │
│  └── selectDashboard / createDashboard / deleteDashboard │
└──────────────────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  <Panel de control> component                                │
│  └── Renderiza los widgets del panel de control actual en una cuadrícula     │
└──────────────────────────────────────────────────────┘
```

## Páginas

Servicio de paneles de control

API completa para cargar, cambiar, crear y editar paneles de control.

[Servicio de paneles de control →](https://fleetbase.io/docs/ui/dashboard/service)

## Cómo contribuir un widget

Las extensiones registran widgets en un panel de control desde su
`addon/extension.js`
utilizando el
`Widget`
contrato de
`@fleetbase/ember-core/contracts`
y el servicio de Universe
`widget`:

```
// addon/extension.js
import { Widget, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const widgetService = universe.getService('widget');

        const widgets = [
            new Widget({
                id: 'fleet-ops-kpi-earnings-widget',
                name: 'Ingresos (30d)',
                description: 'Ingresos totales de transporte de los últimos 30 días con tendencia.',
                icon: 'sack-dollar',
                component: new ExtensionComponent('@fleetbase/fleetops-engine', 'widget/kpi-earnings'),
                grid_options: { w: 3, h: 4, minW: 3, minH: 4 },
                options: { title: 'Ingresos' },
                default: true,
            }),
        ];

        widgetService.registerWidgets('dashboard', widgets);
    },
};
```

| Campo `Widget` | Descripción |
|---|---|
| `id` | Identificador de widget único |
| `name` | Nombre de visualización en el selector |
| `description` | Descripción corta que se muestra en el selector |
| `icon` | Nombre del icono de FontAwesome |
| `component` | Un `ExtensionComponent` que apunta al renderizador del widget en tu motor |
| `grid_options` | Diseño de cuadrícula — `{ w, h, minW, minH }` columnas/filas para `grid-stack` |
| `options` | Opciones predeterminadas que se pasan al componente del widget |
| `default` | Si es `true`, el widget se añade al panel de control predeterminado automáticamente |

El primer argumento de
`registerWidgets()`
es el ID del panel de control:
`'dashboard'`
para el panel de control predeterminado. Las extensiones que proporcionan sus propios paneles de control registran sus widgets contra el ID del panel de control correspondiente.

Consulte ejemplos reales:

| Extensión | Referencia |
|---|---|
| Fleet-Ops — registra widgets de KPIs de transporte y flota en vivo | `packages/fleetops/addon/extension.js` |
| Ledger — registra panel financiero y widgets de flujo de caja | `packages/ledger/addon/extension.js` |
| IAM Engine — registra un widget de Métricas de IAM | `packages/iam-engine/addon/extension.js` |

## Ver también

* [Servicio de paneles de control](https://fleetbase.io/docs/ui/dashboard/service)
  — API completa
* [Registro y Slots](https://fleetbase.io/docs/ui/registry/overview)
  — el modelo de registro más amplio
* [Universe](https://fleetbase.io/docs/extension-development/universe)
  — el sistema de registro subyacente

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/services/dashboard.js` | Clase de servicio |
| `addon/components/dashboard.hbs` | Plantilla |
| `addon/components/dashboard.js` | Clase |
| `addon/components/widget/` | Componentes de widget |