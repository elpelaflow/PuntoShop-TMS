---
title: "Servicio de Registro"
url: https://fleetbase.io/docs/extension-development/universe/registry-service
module: extension-development
---

# Servicio de Registro

Cree registros, registre componentes en los espacios de otras extensiones y registre componentes, servicios y ayudantes que funcionan entre motores, a través de `universe.getService('registry')`.

# Servicio de Registro

El
`registry`
servicio es la capa de almacenamiento detrás de los servicios de menú, widgets y hooks, y es el lugar para registrar sus propias contribuciones y registros de componentes.

Lo utilizará por dos razones principales:

1. **Inyectar un componente en un espacio de otra extensión**
   — por ejemplo, un panel de pestañas en el detalle del vehículo de Fleet-Ops
2. **Crear su propio registro**
   — para que otras extensiones puedan integrarse con el suyo

```
// addon/extension.js
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const registryService = universe.getService('registry');
        // …
    },
};
```

## Almacenamiento de dos niveles

Los registros están organizados como
**`sección → lista → elementos`**
. Por ejemplo:

* `console:admin`
  (sección) →
  `elemento del menú`
  (lista) → elementos de administración
* `console:admin`
  (sección) →
  `panel del menú`
  (lista) → paneles de administración
* `fleet-ops:component:order:details`
  (sección) →
  `componentes`
  (lista) → componentes renderizables

El servicio de menú escribe en las listas
`<registry>:menu-item`
; el servicio de registro escribe en la lista
`components`
con `registerRenderableComponent`. Normalmente, no necesita preocuparse por las listas; los registradores dedicados se encargan de ellas.

## registerRenderableComponent(registryName, component, options?)

Inyecte un componente en un espacio de otra extensión. La extensión anfitriona lo renderiza a través de
[`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
.

```
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

registryService.registerRenderableComponent(
    'fleet-ops:component:order:details',
    new ExtensionComponent('@fleetbase/ledger-engine', 'order-invoice-summary')
);
```

Formularios compatibles para el
`component`
argumento:

| Formulario | Ejemplo |
| --- | --- |
| Instancia de `ExtensionComponent` | `new ExtensionComponent('@fleetbase/my-engine', 'components/my-tab')` |
| Clase de componente con la opción `engineName` | `MyComponent` + `{ engineName: '@my-org/my-engine' }` |
| Cualquier combinación de los anteriores | Itera y registra cada uno |

### Registros de componentes renderizables bien conocidos

Los motores reales exponen estos espacios (extraídos de los archivos `extension.js` de las extensiones de código abierto):

| Registro | Lo renderiza |
| --- | --- |
| `fleet-ops:component:order:details` | Pestañas/paneles en la vista de detalles del pedido |
| `fleet-ops:component:driver:details` | Pestañas/paneles en la vista de detalles del conductor |
| `fleet-ops:component:vehicle:details` | Pestañas/paneles en la vista de detalles del vehículo |
| `fleet-ops:component:map:drawer` | Elementos en el cajón de mapas de Fleet-Ops |
| `fleet-ops:contextmenu:vehicle` | Menú de contexto al hacer clic derecho en un vehículo |
| `fleet-ops:contextmenu:driver` | Menú de contexto al hacer clic derecho en un conductor |
| `fleet-ops:template:settings:routing` | Componentes en la página de configuración de enrutamiento |
| `fleet-ops:template:settings:orchestrator` | Componentes en la página de configuración del orquestador |
| `fleet-ops:component:admin:routing-settings` | Componentes en la página de configuración de enrutamiento de administración |
| `fleet-ops:template:operations:orders:new:entities-input` | Entradas personalizadas en el flujo de nuevas entidades de pedidos |
| `@fleetbase/console` | Componentes de tour/lanzador/guard a nivel de aplicación (raro, solo las extensiones del sistema utilizan esto) |

Para obtener la lista completa de espacios de Fleet-Ops, consulte
`fleetops/addon/extension.js#createRegistries`
.

## createRegistry(name) / createRegistries(names)

Cree sus propios registros para que otras extensiones puedan integrarse con ellos.

```
const registryService = universe.getService('registry');

registryService.createRegistries([
    'my-extension:sidebar',
    'my-extension:order:tabs',
    'my-extension:dashboard:widgets',
]);
```

Otras extensiones pueden entonces
`registerRenderableComponent('my-extension:sidebar', …)`
y sus plantillas renderizan a través de
`<RegistryYield>`
.

## getRenderableComponents(registryName)

Lea los componentes en un registro. Es útil cuando itera en su propia plantilla:

```
get sidebarComponents() {
    return this.universe.getService('registry').getRenderableComponents('my-extension:sidebar');
}
```

## API de registro de bajo nivel

Estos métodos son la base de los registradores de nivel superior. Raramente los llamará directamente.

| Método | Propósito |
| --- | --- |
| `register(sectionName, listName, key, value)` | Método base — escribe cualquier valor en cualquier espacio (sección, lista, clave) |
| `lookup(sectionName, listName, key)` | Lee un solo elemento |
| `getRegistry(sectionName, listName)` | Lee toda la lista como un array |
| `getSection(sectionName)` | Lee todas las listas en una sección |
| `getAllFromPrefix(sectionName, listName, prefix)` | Búsqueda parcial de claves |
| `hasSection(name)` / `hasList(section, list)` | Comprobaciones de existencia |
| `clearList(section, list)` / `clearSection(section)` / `clearAll()` | Eliminación |
| `createSection(name)` / `createSections(names)` | Creación de secciones de bajo nivel |

## Registrar componentes, servicios y ayudantes a nivel global

Además de los componentes renderizables, el servicio de registro también puede registrar componentes, servicios y ayudantes de primera clase en el contenedor de la aplicación anfitriona, haciéndolos disponibles para todos los motores:

### registerComponent(name, ComponentClass, options?)

Haga que un componente esté disponible para todos los motores por su nombre.

```
import MyComponent from './components/my-component';
registryService.registerComponent('my-component', MyComponent);
```

### registerService(name, ServiceClass, options?)

Haga que un servicio esté disponible para todos los motores por su nombre.

```
import MyService from './services/my-service';
registryService.registerService('my-service', MyService);
```

### registerHelper(helperName, helperOrTemplateHelper, options?)

Registre un ayudante de Handlebars. Soporta la carga diferida a través del contrato
`TemplateHelper`:

```
import TemplateHelper from '@fleetbase/ember-core/contracts/template-helper';

registryService.registerHelper(
    'calculate-freight-distance',
    new TemplateHelper('@fleetbase/fleetops-engine', 'helpers/calculate-freight-distance')
);
```

La mayoría de las extensiones no necesitan estos registradores globales; los componentes, servicios y ayudantes locales del motor se resuelven automáticamente en Ember dentro de su motor. Úselos solo cuando algo debe ser visible para
**otras**
extensiones.

## Referencias del mundo real

| Extensión | Patrón | Fuente |
| --- | --- | --- |
| Fleet-Ops | Crea más de 40 registros para sus propios espacios | `packages/fleetops/addon/extension.js` |
| Ledger | Registra un panel de pedidos y resumen de facturación en Fleet-Ops | `packages/ledger/addon/extension.js` |
| VROOM | Registra `fleet-ops:template:settings:routing` y `fleet-ops:component:admin:routing-settings` | `packages/fleetops/addon/extension.js` |
| Valhalla | Registra componentes de configuración en los espacios de enrutamiento de Fleet-Ops | `packages/fleetops/addon/extension.js` |
| IAM Engine | Registra componentes de autenticación y acceso en la consola | `packages/iam-engine/addon/extension.js` |

## Ver también

* [`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
  — renderizar el contenido del registro en plantillas
* [`ExtensionComponent`](https://fleetbase.io/docs/extension-development/reference/contracts#extensioncomponent)
  contrato
* [Servicio de menú](https://fleetbase.io/docs/extension-development/universe/menu-service)
  — para los registros de elementos del menú
* [Servicio de vista de recursos](https://fleetbase.io/docs/extension-development/universe/resource-view-service)
  — columnas, acciones y botones en las vistas de tabla y detalles de otras extensiones

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/services/universe/registry-service.js` | Implementación de RegistryService |
| `addon/contracts/extension-component.js` | Contrato `ExtensionComponent` |
| `addon/contracts/registry.js` | `Registry` |