---
title: "Contratos"
url: https://fleetbase.io/docs/extension-development/reference/contracts
module: extension-development
---

# Contratos

Referencia para cada contrato en `@fleetbase/ember-core/contracts` — MenuItem, MenuPanel, Widget, Hook, ExtensionComponent, TableColumn, ResourceAction, ActionButton, Registry, TemplateHelper, BaseContract.

# Contratos

Los
**contratos**
en
`@fleetbase/ember-core/contracts`
son las formas canónicas que se pasan a los sub-servicios de Universe. Úselos — validan las entradas, normalizan los valores predeterminados y se serializan correctamente cuando se almacenan en los registros.

## Importación

```
import {
    MenuItem,
    MenuPanel,
    Widget,
    Hook,
    ExtensionComponent,
    Registry,
    TableColumn,
    ResourceAction,
    ActionButton,
    BaseContract,
} from '@fleetbase/ember-core/contracts';

// TemplateHelper no está en el índice — importarlo directamente:
import TemplateHelper from '@fleetbase/ember-core/contracts/template-helper';
```

## MenuItem

Representa una entrada en un menú — encabezado, configuración, administración, organización, menú desplegable de usuario, o registro personalizado. Cada registro de menú acepta una instancia de
`MenuItem`
o un objeto simple.

### Construcción

```
// Form 1: título + ruta (más opciones opcionales)
new MenuItem('Operaciones de Flota', 'console.fleet-ops')
    .withIcon('route')
    .withPriority(0)
    .withDescription('Gestionar flotas, conductores y pedidos en tiempo real');

// Form 2: objeto de definición completo
new MenuItem({
    title: 'Configuración',
    slug: 'my-extension',
    icon: 'gear',
    component: new ExtensionComponent('@my-org/my-engine', 'settings'),
});
```

### Propiedades

| Propiedad | Valor predeterminado | Descripción |
| --- | --- | --- |
| `title` | — | Texto de visualización |
| `text` , `label` | se basa en `title` | Alias |
| `id` | título con guiones | Identificador estable |
| `slug` | título con guiones | Clave segura para URL — utilizada como clave del registro |
| `route` | — | Nombre de la ruta de Ember |
| `section` | — | Grupo de subsección (por ejemplo, `'soporte'`) |
| `queryParams` | `{}` | Se pasa a la ruta de Ember |
| `routeParams` | `[]` | Parámetros posicionales |
| `view` | título con guiones | Identificador de vista (se utiliza para rutas virtuales) |
| `icon` | `'circle-dot'` | Ícono de FontAwesome |
| `iconPrefix` , `iconSize` , `iconClass` , `iconComponent` , `iconComponentOptions` | — | Opciones de icono |
| `component` | — | Un `ExtensionComponent` para el contenido renderizado |
| `componentParams` | `{}` | Argumentos que se pasan al componente |
| `renderComponentInPlace` | `false` | Renderiza el componente en su lugar en lugar de a través de un portal |
| `class` , `inlineClass` , `wrapperClass` , `overwriteWrapperClass` | — | Anclajes de estilo |
| `priority` | `9` | Cuanto menor, más arriba |
| `index` | `0` | Ordenamiento secundario dentro de la prioridad |
| `type` | `'default'` | `'default'` o `'link'` |
| `buttonType` | — | Tipo de estilo de botón |
| `onClick` | — | `(menuItem, universe) => void` — auto-envoltorio |
| `disabled` , `isLoading` | `false` | Estado de la interfaz de usuario |
| `permission` , `intl` | — | Clave de permiso, clave i18n |
| `items` | — | Subelementos |
| `description` | — | Se muestra en el desbordamiento / atajos |
| `shortcuts` | `[]` | Array de `{ title, description, icon, route }` para elementos de encabezado |
| `tags` | `[]` | Etiquetas de búsqueda |

### Chainables

`withIcon`
,
`withPriority`
,
`withComponent`
,
`withOnClick`
,
`withSlug`
,
`withQueryParams`
,
`withRouteParams`
,
`inSection`
,
`atIndex`
,
`withType`
,
`withWrapperClass`
,
`withComponentParams`
,
`renderInPlace`
,
`withDescription`
,
`withShortcuts`
,
`withTags`
,
`addShortcut`
.

## MenuPanel

Un grupo de
`MenuItem`
s — utilizado para paneles de configuración de administración.

```
import { MenuPanel, MenuItem } from '@fleetbase/ember-core/contracts';

const panel = new MenuPanel({
    title: 'Configuración de Flota',
    slug: 'fleet-ops',
    items: [
        new MenuItem({ title: 'Rutas', icon: 'route', component: ... }),
        new MenuItem({ title: 'Mapa', icon: 'map', component: ... }),
    ],
});
```

### Propiedades

| Propiedad | Valor predeterminado | Descripción |
| --- | --- | --- |
| `title` | — | Encabezado del panel |
| `slug` | título con guiones | Clave utilizada como ranura del registro |
| `icon` | — | Ícono de FontAwesome |
| `open` | `true` | Estado inicial de expansión |
| `priority` | `9` | Orden de clasificación |
| `items` | `[]` | Array de `MenuItem` |

### Chainables

`withSlug`
,
`withIcon`
,
`withPriority`
,
`addItem`
,
`addItems`
.

En la práctica, no se construye directamente
`MenuPanel`
—
`menuService.registerAdminMenuPanel(label, items, options)`
lo hace por usted.

## Widget

Un descriptor de widget para el panel de control.

### Construcción

Tres formas:

```
// Forma 1: ruta dentro de un motor
new Widget({
    id: 'acme-score',
    name: 'Puntuación de seguridad',
    description: 'Métricas clave de seguridad',
    icon: 'truck',
    component: new ExtensionComponent('@fleetbase/fleetops-engine', 'widget/fleet-ops-key-metrics'),
    grid_options: { w: 12, h: 12, minW: 8, minH: 12 },
    options: { title: 'Puntuación de seguridad' },
    default: true,
});

// O usando encadenamiento
new Widget('acme-score')
    .withName('Puntuación de seguridad')
    .withIcon('truck')
    .withComponent(new ExtensionComponent('@fleetbase/fleetops-engine', 'widget/fleet-ops-key-metrics'))
    .withGridOptions({ w: 12, h: 12, minW: 8, minH: 12 })
    .asDefault();
```

### Propiedades

| Propiedad | Valor predeterminado | Descripción |
| --- | --- | --- |
| `id` | — | **Requerido** identificador de widget único (también aceptado `widgetId`) |
| `name` | — | Nombre de visualización en el selector |
| `description` | — | Descripción corta mostrada en el selector |
| `icon` | — | Ícono de FontAwesome |
| `component` | — | Instancia de `ExtensionComponent`, objeto o ruta de componente |
| `grid_options` | `{}` | `{ w, h, minW, minH }` para `grid-stack` |
| `options` | `{}` | Opciones predeterminadas que se pasan al componente del widget |
| `category` | `'default'` | Categoría en el selector |
| `default` (solo constructor) | `false` | Si es `true`, se agrega automáticamente a la lista de widgets predeterminados |

### Chainables

`withName`
,
`withDescription`
,
`withIcon`
,
`withComponent`
,
`withGridOptions`
,
`withOptions`
,
`withCategory`
,
`asDefault`
,
`isDefault`
,
`withTitle`
,
`withRefreshInterval`
.

## Hook

Un gancho de ciclo de vida adjunto a un evento nombrado.

### Construcción

Tres formas:

```
// Forma 1: nombre de evento
new Hook('console:after-model', (session, router) => {
    // …
});

// Con opciones
new Hook({
    name: 'application:before-model',
    handler: (session, router, transition) => { /* … */ },
    priority: 10,
    once: false,
    enabled: true,
});

// Enlazado
new Hook('console:before-model')
    .execute((session, router) => { /* … */ })
    .withPriority(20)
    .once();
```

### Propiedades

| Propiedad | Valor predeterminado | Descripción |
| --- | --- | --- |
| `name` | — | Nombre del evento ( `'console:after-model'` , `'application:before-model'` , etc.) |
| `handler` | — | La función de devolución de llamada |
| `priority` | `0` | Cuanto menor, más arriba |
| `runOnce` | `false` | Si es `true`, el gancho se elimina después de ejecutarse |
| `id` | auto-guid | Identificador único — pasar a `removeHook(name, id)` |
| `enabled` | `true` | Cuando es `false`, el gancho se omite |

### Chainables

`execute`
,
`withPriority`
,
`once`
,
`withId`
,
`setEnabled`
,
`enable`
,
`disable`
,
`withMetadata`
.

## ExtensionComponent

Una referencia a un componente que vive en otro motor. Se utiliza dondequiera que se renderice un componente a través de motores — elementos de menú, widgets, registros.

### Construcción

Tres formas:

```
// Forma 1: ruta de componente dentro de un motor
new ExtensionComponent('@fleetbase/fleetops-engine', 'order-tracking-card');

// Forma 2: una clase de componente directamente
import MyComponent from '../components/my-component';
new ExtensionComponent('@my-org/my-engine', MyComponent);

// Forma 3: objeto de opciones completo
new ExtensionComponent('@my-org/my-engine', {
    path: 'components/my-component',
    loadingComponent: 'spinner',
    errorComponent: 'error-fallback',
});
```

### Propiedades

| Propiedad | Descripción |
| --- | --- |
| `engine` | Nombre del motor ( `'@fleetbase/fleetops-engine'` ) |
| `path` | Ruta del componente dentro del motor (formato de cadena) |
| `class` | Clase del componente (cuando se construye desde una clase) |
| `name` | Nombre de componente resuelto |
| `isClass` | `true` cuando se construye desde una clase |
| `loadingComponent` | Componente que se muestra mientras el motor se está cargando |
| `errorComponent` | Componente que se muestra si falla la carga |

### Chainables

`withLoadingComponent`
,
`withErrorComponent`
,
`withData`
,
`withTimeout`
.

## TableColumn

Una columna añadida a la tabla de otro motor, registrada en
`<extension>:<resource>:table:columns`
. Ver
[Registro](https://fleetbase.io/docs/extension-development/resource-views/tables/columns)
.

### Construcción

```
new TableColumn({ id: 'acme-score', label: 'Puntuación de seguridad', valuePath: 'meta.safety_score' })
    .after('status')
    .withCellComponent(new ExtensionComponent('@acme/safety-engine', 'cell/safety-score'))
    .withFilter('acme_score', 'filter/string');
```

### Propiedades

Cada clave de columna incorporada acepta:
`label`
,
`valuePath`
,
`cellComponent`
,
`width`
,
`sticky`
,
`hidden`
,
`cellClassNames`
,
`wrapperClass`
, y las claves de filtro
`filterable`
,
`filterParam`
,
`filterComponent`
,
`filterLabel`
,
`filterOptions`
,
`filterFetchOptions`
,
`model`
y
`modelNamePath`
. Además:

| Propiedad | Valor predeterminado | Descripción |
| --- | --- | --- |
| `id` | — | **Requerido** identificador de columna, y ancla otros elementos |
| `sortable` | `false` | Desactivado a menos que la API pueda ordenar en `sortParam` / `valuePath` |
| `resizable` | `true` |  |
| `cellComponent` , `filterComponent` | — | Nombre de componente, o un `ExtensionComponent` de su motor |
| `permission` | — | La columna está oculta a los usuarios sin ella |
| `before` , `after` | — | Coloca directamente antes o después del elemento con este id |
| `index` | — | Coloca en esta posición |
| `priority` | `10` | Cuanto menor, más arriba |

### Chainables

`withLabel`
,
`withValuePath`
,
`withCellComponent`
,
`withFilter(filterParam, filterComponent = 'filter/string', options = {})`
,
`before`
,
`after`
,
`withIndex`
,
`withPriority`
,
`withPermission`
.

Un elemento del menú desplegable: acciones de una fila de la tabla (
`row-actions`
), el menú
**Acciones masivas**
(
`bulk-actions`
), o el menú "…" del encabezado de los detalles (
`menu`
). Consulte
[Registro](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
.

### Construcción

```
new ResourceAction({ id: 'acme-sync', label: 'Sincronizar con Acme', icon: 'rotate', permission: 'acme sync driver' })
    .withHandler((driver, ctx) => ctx.owner.lookup('service:acme').sync(driver))
    .visibleWhen((driver) => driver.status === 'active')
    .before('delete');
```

### Propiedades

| Propiedad | Descripción |
|---|---|
| `id` | **Requerido** |
| `label` | Texto del elemento |
| `icon`, `iconPrefix`, `class` | Visualización |
| `fn` | `(target, ctx)`. `target` es la fila ( `row-actions` ), las filas seleccionadas ( `bulk-actions` ) o el registro ( `menu` ) |
| `isVisible` | `(target, ctx) => Boolean` para acciones de fila y elementos del menú |
| `permission` | Se muestra desactivado si no se proporciona (acciones de fila y masivas) |
| `disabled`, `separator` |  |
| `before`, `after`, `index`, `priority` | Posicionamiento |

### Elementos que se pueden encadenar

`withLabel`
,
`withIcon(icon, iconPrefix?)`
,
`withHandler(fn)`
,
`visibleWhen(isVisible)`
,
`before`
,
`after`
,
`withIndex`
,
`withPriority`
,
`withPermission`
.

## Botón de Acción

Un botón de encabezado: la barra de herramientas de una tabla (
`<extension>:<resource>:table:actions`
) o un encabezado de detalles (
`<extension>:<resource>:details:actions`
). Consulte
[Registro](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons)
.

### Construcción

```
new ActionButton({ id: 'acme-import', text: 'Importar desde Acme', icon: 'download' })
    .withHandler((ctx) => ctx.owner.lookup('service:acme').import());

// Un menú desplegable
new ActionButton({ id: 'acme-more', text: 'Acme', icon: 'ellipsis-h' })
    .withItems([new ResourceAction({ id: 'acme-sync-all', label: 'Sincronizar todo', fn: (resource, ctx) => {} })]);
```

### Propiedades

| Propiedad | Descripción |
|---|---|
| `id` | **Requerido** |
| `text`, `icon`, `iconPrefix`, `type`, `size`, `helpText`, `class` | Para `<Button>` |
| `onClick` | `(ctx)` |
| `items` | `ResourceAction` s: convierte el botón en un menú desplegable; cada elemento del `fn` recibe `(ctx.resource, ctx)` |
| `component` | Renderiza un componente en su lugar: un nombre o un `ExtensionComponent` |
| `isVisible` | `(ctx) => Boolean` |
| `permission` | Se muestra desactivado si no se proporciona |
| `before`, `after`, `index`, `priority` | Posicionamiento |

### Elementos que se pueden encadenar

`withText`
,
`withIcon(icon, iconPrefix?)`
,
`withHandler(onClick)`
,
`withItems(items)`
,
`withComponent(component)`
,
`visibleWhen(isVisible)`
,
`before`
,
`after`
,
`withIndex`
,
`withPriority`
,
`withPermission`
.

## Registro

Representa un registro con nombre. La mayoría del código se refiere a los registros por su nombre de cadena (
`'header'`
,
`'fleet-ops:component:order:details'`
, etc.) —
`Registry`
es una clase explícita para casos en los que desea manipular o nombrar un espacio de nombres en el código.

```
new Registry('my-extension:sidebar');
```

### Elementos que se pueden encadenar

`withNamespace`
,
`withSubNamespace`
.
`toString()`
devuelve el nombre del registro.

En la práctica, es preferible utilizar
`registryService.createRegistry('my-extension:sidebar')`
— esto normaliza y registra el nombre en un solo paso.

## HelperTemplate

Una referencia a un helper que vive en otro motor. Se utiliza por
`registryService.registerHelper()`
para helpers cargados de forma perezosa.

```
import TemplateHelper from '@fleetbase/ember-core/contracts/template-helper';

// Cargado de forma perezosa desde otro motor
new TemplateHelper('@fleetbase/fleetops-engine', 'helpers/calculate-distance');

// O una clase directa
new TemplateHelper(null, MyHelperClass);
```

| Propiedad | Descripción |
|---|---|
| `engineName` | Nombre del motor (o `null` para una clase directa) |
| `path` | Ruta del helper dentro del motor |
| `class` | Clase del helper (cuando se construye directamente) |
| `isClass` | `true` para la forma de clase directa |
| `name` | Nombre del helper resuelto |

## BaseContract

La clase base compartida. No se construye directamente, pero todas las contratas anteriores se extienden de ella.

| Método | Descripción |
|---|---|
| `setup()` | Las subclases llaman a esto después de establecer las propiedades — activa la validación |
| `validate()` | Sobreescriba para agregar lógica de validación |
| `toObject()` | Objeto JS plano para la serialización |
| `setOption(k, v)`, `getOption(k, default?)`, `hasOption(k)`, `removeOption(k)`, `getOptions()` | Bolsa de opciones arbitraria almacenada en `_options` |

## Contratos solo para uso interno

Estos existen en el código fuente pero no están destinados a su uso directo en la extensión. Alimentan a Universe internamente:

* `ExtensionBootState`
  — estado de arranque compartido
* `HookRegistry`
  — almacenamiento interno de hooks
* `UniverseRegistry`
  — almacenamiento interno del registro

Solo los encontrará al leer el código fuente o al extender Universe.

## Código fuente

| Archivo | Descripción |
|---|---|
| `addon/contracts/index.js` | Exportaciones públicas |
| `addon/contracts/menu-item.js` | `MenuItem` |
| `addon/contracts/menu-panel.js` | `MenuPanel` |
| `addon/contracts/widget.js` | `Widget` |
| `addon/contracts/hook.js` | `Hook` |
| `addon/contracts/extension-component.js` | `ExtensionComponent` |
| `addon/contracts/registry.js` | `Registry` |
| `addon/contracts/template-helper.js` | `TemplateHelper` |
| `addon/contracts/base-contract.js` | `BaseContract` |