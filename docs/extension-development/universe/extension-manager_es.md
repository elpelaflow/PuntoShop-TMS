---
title: "Gestor de Extensiones"
url: https://fleetbase.io/docs/extension-development/universe/extension-manager
module: extension-development
---

# Gestor de Extensiones

Carga los motores bajo demanda, responde a los eventos de carga de motores, comparte servicios y componentes de host con los motores, e inspecciona el estado de las extensiones instaladas.

# Gestor de Extensiones

El
**gestor de extensiones**
(
`universe/extension-manager`
) es un subservicio específico para motores. Mientras que los servicios de menú, registro, widget y hook gestionan los datos, el gestor de extensiones gestiona
**los motores en sí**
— cuando se inician, cuando se activan sus callbacks de configuración, y en qué estado se encuentran.

Lo accederás principalmente a través de la
[`fachada UniverseService`](https://fleetbase.io/docs/extension-development/universe/overview)
(
`universe.whenEngineLoaded(…)`
) — pero el servicio subyacente ofrece más opciones para casos avanzados como el intercambio de servicios entre motores.

## Resolviendo el Servicio

```
const extensionManager = universe.getService('extension-manager');
// o
const extensionManager = universe.extensionManager;
```

## Ciclo de Vida de Arranque

El gestor de extensiones controla la secuencia de arranque:

1.  **Carga la lista de instalación.**
    `loadExtensions(application)`
    llama a la API, obtiene la lista de extensiones instaladas para esta organización, y rellena
    `application.extensions`
    y
    `application.engines`
    . Esto resuelve
    `extensionsLoadedPromise`
    .
2.  **Configura cada extensión.**
    Para cada extensión en la lista,
    `setupExtensions()`
    importa dinámicamente
    `addon/extension.js`
    y ejecuta:
    *   `setupExtension(app, universe)`
        de forma sincrónica (o esperada si es asíncrona)
    *   Almacena
        `onEngineLoaded(engine, universe, app)`
        para que se ejecute más tarde cuando el motor realmente se carga
3.  **Ejecuta los callbacks de arranque.**
    `universe.executeBootCallbacks()`
    ejecuta todo lo que se ha programado a través de
    `universe.afterBoot(…)`
    .
4.  **Marca el arranque como completado.**
    `finishBoot()`
    resuelve
    `bootPromise`
    . A partir de este punto, los callbacks
    `whenEngineLoaded(…)`
    se activan tan pronto como se inicie el motor especificado.

Los motores en sí solo se cargan
**de forma diferida**
— solo cuando el usuario navega a una ruta que se monta en ese motor, o cuando algo llama explícitamente a
    `ensureEngineLoaded(name)`
    .

## whenEngineLoaded(engineName, callback)

Ejecuta un callback una vez que el motor especificado se haya iniciado. Si el motor ya se ha cargado, el callback se ejecuta inmediatamente.

```
// addon/extension.js — VROOM se registra con Fleet-Ops
export default {
    setupExtension(app, universe) {
        universe.whenEngineLoaded('@fleetbase/fleetops-engine', this.registerVroom);
    },

    async registerVroom(fleetopsEngine, universe) {
        const vroomEngine = await universe.extensionManager.ensureEngineLoaded('@fleetbase/vroom-engine');
        const routeOptimization = fleetopsEngine.lookup('service:route-optimization');
        const vroom = vroomEngine.lookup('service:vroom');
        if (routeOptimization && vroom) {
            routeOptimization.register('vroom', vroom);
        }
    },
};
```

La firma del callback es:
`(engineInstance, universe, applicationInstance) => void | Promise<void>`
.

Ejemplo real:
`vroom/addon/extension.js:6`
— VROOM espera a Fleet-Ops, carga su propio motor, y conecta su implementación de enrutamiento al servicio de optimización de rutas de Fleet-Ops.

### setupExtension vs. onEngineLoaded vs. whenEngineLoaded

El
`addon/extension.js`
puede exportar un objeto con
**dos**
hooks de ciclo de vida. Conocer cuándo se ejecutan:

| Hook | Cuando se ejecuta |
|---|---|
| `setupExtension(app, universe)` | Durante el arranque, antes de que se cargue cualquier motor — para elementos de menú, espacios de registro, widgets, hooks |
| `onEngineLoaded(engine, universe, app)` | La primera vez que **tu propio** motor se carga — para la configuración que necesita la instancia del motor |
| `universe.whenEngineLoaded(other, cb)` | Llamado desde `setupExtension` cuando necesitas esperar a que **otro** motor se cargue |

```
export default {
    setupExtension(app, universe) {
        // configuración sincrónica — registros, menús, widgets
    },

    onEngineLoaded(engine, universe, app) {
        // engine.lookup('service:my-service'), etc.
    },
};
```

## ensureEngineLoaded(engineName)

Carga forzosamente un motor y devuelve su instancia. Es idempotente — devuelve la instancia almacenada si ya está cargada, y une la promesa en curso si está en proceso de carga.

```
const fleetopsEngine = await universe.extensionManager.ensureEngineLoaded('@fleetbase/fleetops-engine');
const dispatchService = fleetopsEngine.lookup('service:dispatch');
```

El motor se inicia completamente (su
`Engine#boot()`
resuelve) antes de que se resuelva la promesa, por lo que los hooks
`onEngineLoaded`
ya se han ejecutado.

## preloadEngines(engineNames)

Carga en paralelo una lista de motores — útil para motores que sabes que el usuario necesita:

```
await universe.extensionManager.preloadEngines([
    '@fleetbase/fleetops-engine',
    '@fleetbase/ledger-engine',
]);
```

## Inspeccionar el Estado de la Extensión y del Motor

| Método | Devuelve |
|---|---|
| `getExtensions()` | Toda la lista de extensiones (metadatos del paquete.json) |
| `getExtension(name)` | Los metadatos de una extensión |
| `isExtensionInstalled(name)` | Booleano — la extensión existe en la lista de instalación |
| `isEngineLoaded(name)` | Booleano — el motor ha arrancado |
| `isEngineLoading(name)` | Booleano — el motor está en proceso de carga |
| `getEngineInstance(name)` | La instancia `EngineInstance` si se ha cargado, en caso contrario, `null` |
| `getEngineMountPoint(name)` | La ruta de montaje resuelta (por ejemplo, `'console.fleet-ops.'`) |
| `getStats()` | `{ isBooting, extensionsLoaded, loadedCount, loadingCount, registeredCount, loadedEngines, loadingEngines }` |

Alias para
`isExtensionInstalled`
(conservado para compatibilidad):
`isEngineInstalled`
,
`isInstalled`
,
`hasExtensionIndexed`
,
`isExtensionSetup`
,
`hasExtensionSetup`
.

## Compartir Servicios y Componentes entre Motores

Los motores se ejecutan en sus propios contenedores DI — no ven los servicios de otros motores a menos que los compartas explícitamente. El gestor de extensiones proporciona herramientas para esto:

```
import MyDeviceSelect from '../components/my-device-select';

// Haz que este componente esté disponible dentro del motor fleet-ops
universe.extensionManager.registerComponentIntoEngine(
    '@fleetbase/fleetops-engine',
    'my-device-select',
    MyDeviceSelect
);
```

| Método | Descripción |
|---|---|
| `registerServiceIntoEngine(engineName, serviceName, class, options?)` | Registra un servicio en un motor |
| `registerComponentIntoEngine(engineName, componentName, class, options?)` | Registra un componente en un motor |
| `registerServiceIntoAllEngines(serviceName, class, options?)` | Registra en todos los motores cargados — devuelve la lista de motores en los que tuvo éxito |
| `registerComponentIntoAllEngines(componentName, class, options?)` | Registra en todos los motores cargados |

El motor de destino debe estar cargado — envuelve las llamadas en
`whenEngineLoaded`
para evitar carreras.

Para la mayoría de las integraciones entre motores, el patrón más limpio es registrar un componente renderizable a través del servicio de registro:

```
registryService.registerRenderableComponent(
    'fleet-ops:component:order:details',
    new ExtensionComponent('@fleetbase/ledger-engine', 'order-invoice')
);
```

Esto evita cualquier interacción con el contenedor del motor de destino. Consulta
[Registry Service](https://fleetbase.io/docs/extension-development/universe/registry-service)
.

## Esperando a que se Inicie

Cuando una ruta se ejecuta antes de que las extensiones hayan terminado de registrarse, puedes pausarla:

```
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
    @service('universe/extension-manager') extensionManager;

    async beforeModel() {
        await this.extensionManager.waitForBoot();
    }
}
```

| Método | Resuelve cuando |
|---|---|
| `waitForExtensionsLoaded()` | La API ha cargado la lista de extensiones |
| `waitForBoot()` | Todas las llamadas `setupExtension` se han completado |

## Desmontando

Raro, pero disponible para aplicaciones sensibles a la memoria:

```
universe.extensionManager.unloadEngine('@fleetbase/some-engine');
```

Esto llama a
`destroy()`
del instancia del motor y lo elimina del mapa de motores cargados.

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/services/universe/extension-manager.js` | `ExtensionManagerService` |
| `addon/contracts/extension-boot-state.js` | Singleton compartido del estado de arranque |
| `vroom/addon/extension.js` | `whenEngineLoaded` + `ensureEngineLoaded` |
| `valhalla/addon/extension.js` | El mismo patrón — integración del motor de enrutamiento |