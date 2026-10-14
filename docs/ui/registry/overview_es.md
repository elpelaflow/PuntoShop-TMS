---
title: "Visión general"
url: https://fleetbase.io/docs/ui/registry/overview
module: ui
---

# Visión general

Cómo las extensiones contribuyen a la interfaz de usuario, creando interconexiones entre los registros, los espacios de trabajo y el componente `<RegistryYield>`. Funciona gracias al archivo `addon/extension.js`.

# Registros y Espacios de Trabajo

Las extensiones de Fleetbase están aisladas por defecto, cada una proporciona sus propios componentes, servicios y rutas. Sin embargo, muchas funcionalidades son más completas cuando las extensiones pueden conectar la interfaz de usuario entre sí:

* Una extensión de pasarela de pago que proporciona un formulario de configuración en la configuración de la pasarela de Ledger.
* Una extensión de análisis que proporciona un gráfico en el panel de control de Fleet-Ops.
* Una extensión de firma de documentos que proporciona acciones en las órdenes de transporte de Fleet-Ops.

El
**sistema de registros**
es la forma en que esto funciona. Las extensiones registran componentes o elementos de menú en registros nombrados; la extensión anfitriona utiliza
[`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
para iterar y renderizarlos.

## Cómo funciona

```
Extensión A (por ejemplo, flespi)                       Extensión anfitriona (por ejemplo, fleet-ops)

   addon/extension.js
   └── setupExtension(app, universe) {           <RegistryYield
         universe                                  @registry="fleet-ops:component:vehicle:details"
           .getService('menu')                     as |Component context|>
           .registerMenuItem(                        <Component @vehicle={{context}} />
             'fleet-ops:component:vehicle:details', </RegistryYield>
             new MenuItem({ ... }))
       }
```

Ambos lados están desacoplados: la extensión anfitriona no necesita saber qué extensiones van a contribuir, y las extensiones contribuyentes no necesitan saber qué hay en el lado posterior.

## Registros

Un
**registro**
es un conjunto de elementos con un nombre. La convención de nombres es
`<nombre de la extensión anfitriona>:<nombre del espacio de trabajo>`:

| Ejemplo de registro | Qué contiene |
| --- | --- |
| `engine:fleet-ops` | Elementos del menú dentro de Fleet-Ops |
| `fleet-ops:contextmenu:vehicle` | Elementos del menú contextual en un vehículo |
| `fleet-ops:component:vehicle:details` | Pestañas/paneles en la vista de detalles del vehículo |
| `fleet-ops:component:map:drawer` | Elementos en el cajón de mapas de Fleet-Ops |
| `fleet-ops:template:settings:routing` | Componentes en la configuración de enrutamiento |
| `auth:login` | Botones en la pantalla de inicio de sesión |

Cada elemento es o bien un
**componente**
(se renderiza en el espacio de trabajo a través de
`<RegistryYield>`
) o un
**elemento de menú**
(un objeto con la forma de
`MenuItem`).

## Registrar elementos mediante addon/extension.js

Cada extensión de Fleetbase moderna declara un único
`addon/extension.js`
que exporta un objeto con un hook
`setupExtension(app, universe)`. La consola llama a este hook una vez cuando la extensión se inicia — aquí es donde registras tus contribuciones.

Un ejemplo mínimo:

```
// addon/extension.js
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService = universe.getService('menu');

        // Añade una entrada de configuración dentro de Fleet-Ops
        menuService.registerMenuItem(
            'engine:fleet-ops',
            new MenuItem({
                title: 'My Plugin Config',
                component: new ExtensionComponent('@my-org/my-plugin-engine', 'my-plugin-settings'),
                icon: 'gear',
                slug: 'my-plugin',
                section: 'settings',
            })
        );
    },
};
```

El hook
`setupExtension`
recibe:

* **`app`**
  — la instancia de la aplicación Ember anfitriona
* **`universe`**
  — el servicio Universe, tu punto de entrada a todos los registros

## Servicios disponibles de Universe

Consíguelos a través de
`universe.getService('<name>')`
:

| Servicio | Propósito |
| --- | --- |
| `menu` | Registrar elementos de menú, elementos de menú de encabezado, elementos de menú de configuración |
| `registry` | Crear y leer registros; registrar componentes renderizables |
| `widget` | Registrar paneles y widgets de panel |
| `hook` | Registrar hooks de ciclo de vida (por ejemplo, `application:before-model`) |

## Patrones comunes

### Añadir un elemento de menú de encabezado

```
// Registra la entrada principal de la extensión en el encabezado de la consola
menuService.registerHeaderMenuItem('Fleet-Ops', 'console.fleet-ops', {
    icon: 'truck',
    priority: 0,
    description: 'Gestión de transporte y operaciones de flota.',
    shortcuts: [
        { title: 'Operaciones', icon: 'route', route: 'console.fleet-ops.operations.orders' },
        { title: 'Vehículos',   icon: 'truck', route: 'console.fleet-ops.management.vehicles' },
    ],
});
```

### Añadir un elemento de menú de configuración

```
menuService.registerSettingsMenuItem(
    new MenuItem({
        title: 'Configuración de Ledger',
        icon: 'book',
        slug: 'ledger-settings',
        view: 'index',
        component: new ExtensionComponent('@fleetbase/ledger-engine', 'ledger-admin-settings'),
    })
);
```

### Registrar un componente en un espacio de trabajo

```
universe.registerRenderableComponent(
    'fleet-ops:template:settings:routing',
    new ExtensionComponent('@fleetbase/vroom-engine', 'organization/vroom-settings')
);
```

### Crear un nuevo registro

Si tu extensión quiere que otras extensiones se conecten a ella, crea el registro primero:

```
const registryService = universe.getService('registry');
registryService.createRegistries(['my-extension:sidebar', 'my-extension:detail-tabs']);
```

### Registrar un hook

```
import { Hook } from '@fleetbase/ember-core/contracts';

const hookService = universe.getService('hook');
hookService.registerHook(
    new Hook('application:before-model', (session, router, transition) => {
        // ejecutar antes del hook del modelo de la aplicación
    })
);
```

### Esperar a que otro motor se cargue

Algunas configuraciones deben realizarse solo después de que otro motor se haya cargado — por ejemplo, registrar un proveedor de servicios en el motor de optimización de rutas del motor de Fleet-Ops:

```
universe.whenEngineLoaded('@fleetbase/fleetops-engine', async (fleetopsEngine, universe) => {
    const myEngine = await universe.extensionManager.ensureEngineLoaded('@my-org/my-engine');
    const routeOptimization = fleetopsEngine.lookup('service:route-optimization');
    const myProvider = myEngine.lookup('service:my-provider');
    routeOptimization.register('my-provider', myProvider);
});
```

### Registrar un panel o widget

```
const widgetService = universe.getService('widget');
widgetService.registerDashboard('fleetops');
```

## Los contratos

`@fleetbase/ember-core/contracts`
exporta las formas canónicas que pasas a los registros:

| Contrato | Propósito |
| --- | --- |
| `MenuItem` | Elementos de menú — `{ title, route, component, icon, slug, section, shortcuts, onClick, ... }` |
| `ExtensionComponent` | Una referencia a un componente en otro motor — `new ExtensionComponent(engineName, componentName)` |
| `Widget` | Descriptor de widget de panel |
| `Hook` | Hook de ciclo de vida — `new Hook(eventName, callback)` |

## Renderizar elementos

En cualquier lugar donde una extensión anfitriona quiera exponer un espacio de trabajo, utiliza
`<RegistryYield>`
:

```
<RegistryYield @registry="fleet-ops:component:vehicle:details" @context={{this.vehicle}} as |Component ctx|>
  <Component @vehicle={{ctx}} />
</RegistryYield>
```

Consulta
[`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
para obtener la referencia completa del componente.

## Ejemplos del mundo real

Todas estas extensiones utilizan
`addon/extension.js`
para registrar sus contribuciones — léelas como referencia:

| Extensión | Qué registra | `addon/extension.js` |
| --- | --- | --- |
| Fleet-Ops | Elemento de menú de encabezado con atajos, paneles de detalles del vehículo, cajón de mapa en vivo, widgets de panel | `packages/fleetops/addon/extension.js` |
| VROOM | Componentes renderizables en espacios de trabajo, proveedor de optimización de rutas a través de `whenEngineLoaded` | `packages/fleetops/addon/extension.js` |
| Ledger | Contexto de plantilla de factura, paneles de configuración, widgets financieros | `packages/ledger/addon/extension.js` |
| IAM Engine | Controles de identidad y acceso, hooks de autenticación, paneles de configuración | `packages/iam-engine/addon/extension.js` |

## Ver también

* [`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
  — renderizar contribuciones a registros en plantillas
* [Universe](https://fleetbase.io/docs/extension-development/universe)
  — la referencia completa de la API Universe
* [Desarrollo de extensiones](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
  — guía completa para la creación de extensiones