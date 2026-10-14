---
title: "Servicio de creación de plantillas"
url: https://fleetbase.io/docs/ui/services/template-builder
module: ui
---

# Servicio de creación de plantillas

El servicio `template-builder` permite a las extensiones registrar las clases de modelos de Fleetbase como tipos de recursos consultables en el formulario de consulta de plantillas.

# Servicio de creación de plantillas

```
@service templateBuilder;
```

El
`template-builder`
es un servicio singleton que se inyecta en las extensiones para registrar
**tipos de recursos consultables**
para el formulario de consulta del componente
[`<TemplateBuilder>`](https://fleetbase.io/docs/ui/builders/template-builder). Cada extensión registra las clases de modelos de Fleetbase que posee, para que el creador de plantillas sepa qué modelos se pueden consultar e incluir como datos dinámicos.

Esto es lo que pobla la cuadrícula del selector de recursos dentro de la interfaz de usuario "Añadir consulta" de una plantilla. Sin registrar, tus modelos simplemente no aparecerán.

## Inyección

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MyExtensionComponent extends Component {
  @service templateBuilder;
}
```

## Registro de tipos de recursos

El patrón estándar es registrar desde un
**inicializador de instancia**
en tu extensión para que el registro ocurra una vez al inicio:

```
// addon/instance-initializers/register-template-resources.js
export function initialize(appInstance) {
    const templateBuilder = appInstance.lookup('service:template-builder');
    templateBuilder.registerResourceTypes([
        { label: 'Order',   value: 'Fleetbase\\FleetOps\\Models\\Order',   icon: 'route' },
        { label: 'Driver',  value: 'Fleetbase\\FleetOps\\Models\\Driver',  icon: 'id-card' },
        { label: 'Vehicle', value: 'Fleetbase\\FleetOps\\Models\\Vehicle', icon: 'truck' },
    ]);
}

export default { initialize };
```

Cada objeto de tipo de recurso debe tener:

| Campo | Tipo | Descripción |
|---|---|---|
| `label` | string | Nombre legible por el usuario que se muestra en la cuadrícula del selector |
| `value` | string | Nombre de clase PHP completo — utilizado por el backend para resolver el modelo |
| `icon` | string | Nombre de icono de FontAwesome (sin el prefijo `fa-`) |

## API pública

| Método | Descripción |
|---|---|
| `registerResourceTypes(types)` | Registra uno o más tipos de recursos. Los duplicados (coincidentes con `value`) se ignoran silenciosamente |
| `unregisterResourceTypes(values)` | Elimina tipos de recursos por `value` — útil cuando se desactiva una extensión |
| `resourceTypes` | Getter — todos los tipos de recursos registrados actualmente |

## Estado rastreado

| Propiedad | Descripción |
|---|---|
| `_resourceTypes` | El array interno de tipos de recursos registrados |

Utiliza el getter público
`resourceTypes`
para leer.

## Cómo utiliza `<TemplateBuilder>`

El formulario de consulta dentro de
`<TemplateBuilder>`
lee desde
`templateBuilder.resourceTypes`
y lo combina con cualquier tipo proporcionado a través del argumento
`@resourceTypes`
del componente — los valores de argumento tienen prioridad (reemplazan).

Esto significa:

* Los recursos registrados
  a nivel global
  están disponibles en cada instancia de creador de plantillas
* Las sobreescrituras por instancia
  pueden reemplazar o extender el selector para un caso de uso específico

## Ejemplo del mundo real

Un registro de estilo Fleet-Ops que expone los tres modelos principales:

```
// addon/instance-initializers/register-template-resources.js
export function initialize(appInstance) {
    const templateBuilder = appInstance.lookup('service:template-builder');
    if (!templateBuilder) return;

    templateBuilder.registerResourceTypes([
        { label: 'Order',     value: 'Fleetbase\\FleetOps\\Models\\Order',     icon: 'route' },
        { label: 'Driver',    value: 'Fleetbase\\FleetOps\\Models\\Driver',    icon: 'id-card' },
        { label: 'Vehicle',   value: 'Fleetbase\\FleetOps\\Models\\Vehicle',   icon: 'truck' },
        { label: 'Place',     value: 'Fleetbase\\FleetOps\\Models\\Place',     icon: 'location-dot' },
        { label: 'Service Rate', value: 'Fleetbase\\FleetOps\\Models\\ServiceRate', icon: 'dollar-sign' },
    ]);
}

export default { initialize };
```

Después de que se ejecute este inicializador, al abrir cualquier
`<TemplateBuilder>`
y hacer clic en "Añadir consulta", se mostrarán todos los cinco tipos de recursos en el selector.

## Ver también

* [`<TemplateBuilder>`](https://fleetbase.io/docs/ui/builders/template-builder)
  — el componente que consume este servicio

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/services/template-builder.js` | Clase de servicio |

[Servicio de panel de contexto de recursos

El servicio `resource-context-panel` abre paneles de detalles contextuales para cualquier recurso de Fleetbase — con contenido único o tabulado, con sincronización de rutas y una pila de paneles anidados.](https://fleetbase.io/docs/ui/services/resource-context-panel)
[Ayudas de formato

Ayudas para formatear bytes, moneda, fechas, duraciones, distancias, nombres de archivo y para humanizar cadenas.](https://fleetbase.io/docs/ui/helpers/formatting)