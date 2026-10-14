---
title: "Visión general"
url: https://fleetbase.io/docs/ui/services/overview
module: ui
---

# Visión general

Los seis servicios inyectables exportados por `@fleetbase/ember-ui` — Gestor de modales, Barra lateral, Panel de control, Constructor de plantillas, Panel de contexto de recursos, Leaflet.

# Servicios

`@fleetbase/ember-ui`
exporta seis servicios Ember inyectables. Inyectalos como cualquier otro servicio Ember:

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MyComponent extends Component {
  @service modalsManager;
  @service sidebar;
  @service resourceContextPanel;
  @service dashboard;
  @service templateBuilder;
  @service leaflet;
}
```

## Servicios disponibles

Gestor de modales

Abre, crea pilas y cierra modales. Incluye plantillas predefinidas para confirmar/avisar/solicitar/procesar/progresar/cargar.

[Gestor de modales →](https://fleetbase.io/docs/ui/modals/modals-manager)

Barra lateral

Muestra, oculta, minimiza y activa/desactiva la barra lateral.

[Barra lateral →](https://fleetbase.io/docs/ui/services/sidebar)

Panel de contexto de recursos

Abre superposiciones de detalles contextuales para cualquier recurso, ya sea con un solo contenido o con pestañas, con sincronización de rutas.

[Panel de contexto de recursos →](https://fleetbase.io/docs/ui/services/resource-context-panel)

Panel de control

Gestiona paneles y widgets: carga, cambia, crea, elimina, edita.

[Panel de control →](https://fleetbase.io/docs/ui/dashboard/service)

Constructor de plantillas

Registra las clases de modelo de Fleetbase como tipos de recursos consultables en el formulario de consulta del constructor de plantillas.

[Servicio Constructor de plantillas →](https://fleetbase.io/docs/ui/services/template-builder)

Leaflet

Estado compartido de Leaflet para cualquier componente que utilice la integración de Leaflet.

Leaflet (todavía no hay página dedicada)

## Código fuente

| Archivo | Descripción |
|---|---|
| `addon/services/modals-manager.js` | Servicio Gestor de modales |
| `addon/services/sidebar.js` | Servicio Barra lateral |
| `addon/services/resource-context-panel.js` | Servicio Panel de contexto de recursos |
| `addon/services/dashboard.js` | Servicio Panel de control |
| `addon/services/template-builder.js` | Servicio Constructor de plantillas |
| `addon/services/leaflet.js` | Servicio de estado de Leaflet |