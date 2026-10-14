---
título: "Registro de Extensiones"
url: https://fleetbase.io/docs/extension-development/architecture/extension-registration
módulo: extension-development
---

# Registro de Extensiones

Cómo `.js` de addon/extension conecta tu extensión al ciclo de vida de inicio del panel de control de Fleetbase. El hook `setupExtension`, `onEngineLoaded` y el contrato que implementa cada extensión.

# Registro de Extensiones

Cada extensión de Fleetbase declara un único
**`addon/extension.js`**
en la raíz de su addon. El `ExtensionManager` del panel de control lo encuentra al inicio, lo importa dinámicamente y ejecuta sus hooks de registro.

Esto es el
**único punto de entrada canónico**
— el código de registro no vive en
`engine.js`, inicializadores de instancia o en cualquier otro lugar.

## El contrato `addon/extension.js`

`addon/extension.js`
exporta un
**valor predeterminado**
que es uno de:

### Formulario 1: Un objeto simple con hooks

```
// addon/extension.js
export default {
    setupExtension(app, universe) {
        // se ejecuta antes de que se cargue cualquier motor — registra elementos de menú, widgets, hooks, registros
    },

    onEngineLoaded(engineInstance, universe, app) {
        // se ejecuta cuando el motor de *esta* extensión se inicia (de forma perezosa, al primer acceso)
    },
};
```

### Formulario 2: Una sola función

```
// addon/extension.js
export default function (app, universe) {
    // equivalente a setupExtension solo
}
```

El formato de objeto es el que utilizan todas las extensiones modernas porque te permite combinar
`setupExtension`
y
`onEngineLoaded`
en un solo lugar.

## `setupExtension(app, universe)`

Se llama una vez al iniciar el panel de control,
**antes de que se haya cargado cualquier motor**. Aquí es donde realizas la mayor parte del registro:

| Argumento | Tipo | Descripción |
|---|---|---|
| `app` | `ApplicationInstance` | La aplicación Ember anfitriona — útil para `app.lookup('service:router')` etc. |
| `universe` | `UniverseService` | La fachada central — consulta [Universe Service](https://fleetbase.io/docs/extension-development/universe/overview) |

Úsalo para:

* Registrar elementos de menú de nivel superior mediante
  `universe.getService('menu')`
* Crear registros personalizados mediante
  `universe.getService('registry')`
* Registrar widgets del panel de control mediante
  `universe.getService('widget')`
* Conectarse a eventos del ciclo de vida mediante
  `universe.getService('hook')`
* Programar tareas que involucren varios motores mediante
  `universe.whenEngineLoaded(...)`

```
import { MenuItem, Widget, ExtensionComponent, Hook } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService     = universe.getService('menu');
        const widgetService   = universe.getService('widget');
        const registryService = universe.getService('registry');
        const hookService     = universe.getService('hook');

        menuService.registerHeaderMenuItem('My Extension', 'console.my-extension', {
            icon: 'puzzle-piece',
            description: 'Mi característica de logística personalizada.',
        });

        widgetService.registerWidgets('dashboard', [
            new Widget({
                id: 'my-stats',
                name: 'My Stats',
                icon: 'chart-line',
                component: new ExtensionComponent('@my-org/my-extension-engine', 'widget/my-stats'),
                grid_options: { w: 6, h: 6, minW: 4, minH: 4 },
            }),
        ]);

        registryService.createRegistries(['my-extension:sidebar']);

        hookService.registerHook(
            new Hook('console:after-model', (session, router) => {
                // …
            })
        );
    },
};
```

## `onEngineLoaded(engineInstance, universe, app)`

Se llama después de que el motor de
**tu extensión**
de Ember ha iniciado. El motor se carga de forma perezosa — normalmente en la primera navegación a una ruta dentro de él, o bajo demanda mediante
`universe.ensureEngineLoaded(...)`
.

| Argumento | Tipo | Descripción |
|---|---|---|
| `engineInstance` | `EngineInstance` | El motor iniciado — `engineInstance.lookup('service:my-service')` funciona aquí |
| `universe` | `UniverseService` | La misma fachada anterior |
| `app` | `ApplicationInstance` | La aplicación anfitriona |

Úsalo para
**configurar el motor**
que necesita el contenedor del motor — registrar servicios dentro del propio motor, leer la configuración del motor, etc. La mayoría de las extensiones no lo necesitan;
`setupExtension`
cubre los casos comunes.

## Cuándo Usar Qué

| Necesidad | Uso |
|---|---|
| Registrar un elemento de menú de encabezado | `setupExtension` |
| Agregar un widget al panel de control predeterminado | `setupExtension` |
| Registrar un hook ( `application:before-model` etc.) | `setupExtension` |
| Crear un registro para que otras extensiones puedan integrarse | `setupExtension` |
| Inyectar un componente en un slot de otra extensión | `setupExtension` (si el motor anfitrión aún no se ha iniciado, usa `whenEngineLoaded`) |
| Configurar algo que necesite el contenedor de **tu motor** | `onEngineLoaded` |
| Leer la configuración de tu motor | `onEngineLoaded` |

## Coordinación entre Extensiones

Cuando tu extensión necesita registrar algo en otro motor que puede que aún no se haya iniciado, envuelve el trabajo en
`universe.whenEngineLoaded`
:

```
export default {
    setupExtension(app, universe) {
        // VROOM registra un proveedor de optimización de rutas en Fleet-Ops
        universe.whenEngineLoaded('@fleetbase/fleetops-engine', async (fleetopsEngine, universe) => {
            const myEngine = await universe.extensionManager.ensureEngineLoaded('@fleetbase/vroom-engine');

            const routeOptimization = fleetopsEngine.lookup('service:route-optimization');
            const vroom = myEngine.lookup('service:vroom');

            routeOptimization.register('vroom', vroom);
        });
    },
};
```

`whenEngineLoaded`
ejecuta la devolución de llamada inmediatamente si el motor ya está iniciado, o lo programa para que se ejecute cuando el motor se inicia. Esta es la forma recomendada de coordinación entre motores.

`onEngineLoaded(engineName, cb)`
también está disponible, pero **solo se ejecuta cuando se carga** — no se ejecuta si el motor ya se había iniciado antes de que registraste el escuchador.

## El ciclo de vida del inicio

```
1. Se inicia la aplicación de consola
       ↓
2. ExtensionManager.loadExtensions()
       └── recupera la lista de extensiones habilitadas de la API
       ↓
3. ExtensionManager.setupExtensions()
       ├── para cada extensión:
       │     ├── importa dinámicamente addon/extension.js
       │     ├── llama setupExtension(app, universe)   ← se ejecutan tus registros aquí
       │     └── almacena onEngineLoaded para más tarde
       │
       ↓
4. universe.executeBootCallbacks()
       ↓
5. El usuario navega a una ruta dentro de un motor de extensión
       ↓
6. Ember carga el motor de forma perezosa — normalmente en la primera navegación a una ruta dentro de él, o bajo demanda mediante
  `universe.ensureEngineLoaded(...)`
       ├── cuando se carga, universe.extensionManager dispara `engine.loaded`
       └── los callbacks almacenados en onEngineLoaded para ese motor se ejecutan
```

Todo lo que registras en
`setupExtension`
está en su lugar antes de que se inicie cualquier motor — por lo que los elementos de menú, los widgets y los hooks son visibles desde el momento en que se carga la consola, incluso si el usuario nunca navega a tu extensión.

## Referencias del mundo real

| Extensión | Patrón mostrado | Fuente |
|---|---|---|
| VROOM | `whenEngineLoaded` para registrar un proveedor de optimización de rutas en Fleet-Ops | `vroom/addon/extension.js` |
| Valhalla | `whenEngineLoaded` para registrar un motor de enrutamiento en Fleet-Ops | `valhalla/addon/extension.js` |
| Ledger | Elemento de menú de encabezado + panel de control, widgets y una pestaña de detalles de pedidos de Fleet-Ops | `ledger/addon/extension.js` |

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/services/universe/extension-manager.js` | Implementa `setupExtensions()`, el bucle de inicio |
| `addon/services/universe.js` | La fachada `UniverseService` |