---
title: "Plantillas y Componentes"
url: https://fleetbase.io/docs/extension-development/frontend/templates-and-components
module: extension-development
---

# Plantillas y Componentes

Utiliza `@fleetbase/ember-ui` para crear plantillas y componentes de motor, así como los primitives de diseño, widgets comunes y para renderizar componentes de extensión dentro de otros motores.

# Plantillas y Componentes

Las plantillas del motor utilizan Handlebars + Ember. La consola proporciona una amplia biblioteca de componentes —
**`@fleetbase/ember-ui`**
— que te permite crear elementos de interfaz de usuario (layouts, encabezados, tablas, modales, campos de formulario) sin necesidad de volver a implementar estilos.

## Plantillas

Las plantillas del motor se encuentran en
`addon/templates/`
, reflejando el mapa de rutas:

```
addon/
├── routes.js                                 # this.route('orders', { ... })
├── routes/
│   └── orders.js
├── controllers/
│   └── orders.js
└── templates/
    ├── application.hbs                       # layout principal para el motor
    └── orders.hbs                            # renderizado para la ruta 'orders'
```

El `application.hbs` del motor es tu layout de nivel superior — envuelve el contenido en el elemento `<Layout::Section>` estándar para que se integre correctamente en la consola:

```
{{!-- addon/templates/application.hbs --}}
<Layout::Container>
    <Layout::Sidebar />
    <Layout::Section>
        {{outlet}}
    </Layout::Section>
</Layout::Container>
```

## Componentes Glimmer

Los componentes se encuentran en
`addon/components/`
. Utiliza Octane (
`@glimmer/component`
):

```
// addon/components/order-summary.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OrderSummaryComponent extends Component {
    @service fetch;
    @service notifications;

    @tracked isLoading = false;

    @action
    async refresh() {
        this.isLoading = true;
        try {
            await this.fetch.get(`my-extension/v1/orders/${this.args.order.id}/refresh`);
            this.notifications.success('Refrescado');
        } finally {
            this.isLoading = false;
        }
    }
}
```

```
{{!-- addon/components/order-summary.hbs --}}
<div class="rounded-md border p-4">
    <h3 class="font-semibold">{{@order.public_id}}</h3>
    <Button @text="Refresh" @icon="rotate" @isLoading={{this.isLoading}} @onClick={{this.refresh}} />
</div>
```

## Utilizando @fleetbase/ember-ui

`@fleetbase/ember-ui` ya está disponible en la ruta de resolución de tu motor — los componentes están disponibles globalmente sin necesidad de importaciones. La biblioteca cubre el sistema de diseño de la plataforma — utiliza esta biblioteca antes de crear la interfaz de usuario desde cero.

**Referencia completa de componentes:
[Documentación de Fleetbase UI](https://fleetbase.io/docs/ui)
.**
Cada componente a continuación enlaza a su página dedicada con propiedades, slots, ejemplos y casos límite.

### Primitivos de diseño

| Componente | Propósito | Documentación |
|---|---|---|
| `<Layout::Container>` | Contenedor exterior con barra lateral y cuadrícula | [Visión general del diseño](https://fleetbase.io/docs/ui/layout/overview) |
| `<Layout::Sidebar>` | Barra lateral del motor, que se puede plegar | [Visión general del diseño](https://fleetbase.io/docs/ui/layout/overview) |
| `<Layout::Section>` | Columna de contenido principal con slots de encabezado/cuerpo | [Visión general del diseño](https://fleetbase.io/docs/ui/layout/overview) |
| `<Layout::Section::Header @title="…" />` | Barra de encabezado de la página | [Visión general del diseño](https://fleetbase.io/docs/ui/layout/overview) |
| `<Layout::Section::Body>` | Contenedor de cuerpo, que se puede desplazar | [Visión general del diseño](https://fleetbase.io/docs/ui/layout/overview) |
| `<ContentPanel @title @open>` | Sección etiquetada, que se puede plegar | [Panel de contenido](https://fleetbase.io/docs/ui/layout/content-panel) |
| `<Drawer>` | Panel lateral deslizante | [Drawer](https://fleetbase.io/docs/ui/layout/drawer) |
| `<Overlay>` | Fondo + objetivo de portal | [Overlay](https://fleetbase.io/docs/ui/layout/overlay) |
| `<Spacer @height>` | Espaciado vertical | [Spacer](https://fleetbase.io/docs/ui/layout/spacer) |

### Acciones

| Componente | Propósito | Documentación |
|---|---|---|
| `<Button @text @icon @type @onClick @isLoading />` | Variantes: `primary` , `magic` , `danger` , etc. | [Button](https://fleetbase.io/docs/ui/actions/button) |
| `<ClickToCopy @value />` | Copiar al hacer clic | [Click to Copy](https://fleetbase.io/docs/ui/actions/click-to-copy) |
| `<ClickToReveal />` | Mostrar contenido oculto (secretos, tokens) | [Click to Reveal](https://fleetbase.io/docs/ui/actions/click-to-reveal) |

### Visualización

| Componente | Propósito | Documentación |
|---|---|---|
| `<Spinner />` | Indicador de carga | [Spinner](https://fleetbase.io/docs/ui/display/spinner) |
| `<Badge @text @type />` | Etiquetas de estado | [Badge](https://fleetbase.io/docs/ui/display/badge) |
| `<Pill @text />` | Etiqueta compacta | [Pill](https://fleetbase.io/docs/ui/display/pill) |
| `<Table @data @columns />` | Tabla de datos, que se puede ordenar y paginar | [Table](https://fleetbase.io/docs/ui/display/table) |
| `<Timeline />` | Línea de tiempo de eventos vertical | [Timeline](https://fleetbase.io/docs/ui/display/timeline) |
| `<ActivityLog />` | Feed de actividad | [Activity Log](https://fleetbase.io/docs/ui/display/activity-log) |
| `<ProgressBar />` | Indicador de progreso | [Progress Bar](https://fleetbase.io/docs/ui/display/progress-bar) |

### Entradas de formulario

| Componente | Propósito | Documentación |
|---|---|---|
| `<Select @options @onChange />` | Select estilizado | [Select](https://fleetbase.io/docs/ui/inputs/select) |
| `<MultiSelect />` | Selección múltiple con fichas | [Multi Select](https://fleetbase.io/docs/ui/inputs/multi-select) |
| `<ComboBox />` | Menú desplegable, que se puede buscar | [Combo Box](https://fleetbase.io/docs/ui/inputs/combo-box) |
| `<Checkbox />` / `<Toggle />` | Entradas booleanas | [Checkbox](https://fleetbase.io/docs/ui/inputs/checkbox) , [Toggle](https://fleetbase.io/docs/ui/inputs/toggle) |
| `<DatePicker />` / `<DateTimeInput />` | Seleccionador de fecha / fecha y hora | [Date Picker](https://fleetbase.io/docs/ui/inputs/date-picker) |
| `<MoneyInput />` | Entrada de importe con moneda | [Money Input](https://fleetbase.io/docs/ui/inputs/money-input) |
| `<UnitInput />` | Número con selector de unidad | [Unit Input](https://fleetbase.io/docs/ui/inputs/unit-input) |
| `<PhoneInput />` | Número de teléfono internacional | [Phone Input](https://fleetbase.io/docs/ui/inputs/phone-input) |
| `<FileUpload />` | Carga de archivos mediante arrastrar y soltar | [File Upload](https://fleetbase.io/docs/ui/inputs/file-upload) |
| `<CoordinatesInput />` | Lat/lng + mapa | [Coordinates Input](https://fleetbase.io/docs/ui/inputs/coordinates-input) |
| `<ModelSelect />` | Selector de registros de Ember Data | [Model Select](https://fleetbase.io/docs/ui/inputs/model-select) |
| `<InputGroup />` | Etiqueta + entrada + ayuda | [Input Group](https://fleetbase.io/docs/ui/inputs/input-group) |

Para obtener documentación completa — incluyendo cómo extender los componentes, el contenido de los slots y las notas de accesibilidad — consulta la
[documentación de Fleetbase UI](https://fleetbase.io/docs/ui)
.

## Componentes entre motores

Cuando otro motor necesita renderizar un componente de tu motor — por ejemplo, en la página de detalles de pedidos de Fleet-Ops — se produce un límite entre motores. No pasas directamente los nombres de los componentes; pasas un
[`ExtensionComponent`](https://fleetbase.io/docs/extension-development/reference/contracts#extensioncomponent), que el motor anfitrión resuelve de forma dinámica si no está cargado.

```
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

const ref = new ExtensionComponent(
    '@fleetbase/fleetops-engine',
    'order-tracking-card' // se resuelve en addon/components/order-tracking-card.{js,hbs}
);
```

El registro receptor (por ejemplo,
`'fleet-ops:component:order:details'`
) renderiza
`ref`
mediante
`<LazyEngineComponent>`
, que carga el motor de origen si no está cargado.

```
{{!-- dentro del motor anfitrión --}}
<LazyEngineComponent
    @component={{this.extensionComponent}}
    @params={{this.componentArgs}}
/>
```

Normalmente no invocas
`<LazyEngineComponent>`
directamente — el
[Registry Service](https://fleetbase.io/docs/extension-development/universe/registry-service)
y las
[Rutas Virtuales](https://fleetbase.io/docs/extension-development/frontend/virtual-routes)
lo hacen por ti.

## Tailwind y Estilos

La consola utiliza clases de utilidad de Tailwind y un pequeño conjunto de tokens de diseño. La mayoría de los componentes de
`ember-ui`
aceptan cadenas de clases de utilidad a través de
`@class`
o atributos HTML (
`class="…"`
). Para estilos únicos, escópe estos estilos en el CSS de tu motor o utiliza utilidades de Tailwind.

Si necesitas CSS global en el motor, coloca un archivo de estilos en
`addon/styles/`
—
`ember-cli-build.js`
lo detectará.

## Servicios disponibles en los componentes

Estos servicios del anfitrión están disponibles en tu motor a través de
`@fleetbase/ember-core/exports`
y se pueden inyectar en cualquier componente.
**Referencia completa:
[Servicios de Ember](https://fleetbase.io/docs/extension-development/reference/ember-services)
.**

| Servicio | Uso para |
|---|---|
| [`fetch`](https://fleetbase.io/docs/extension-development/reference/ember-services#fetch) | Solicitudes HTTP autenticadas — pasar `{ namespace }` para acceder a la API de tu extensión |
| `store` | [Ember Data Store](https://api.emberjs.com/ember-data/release/modules/@ember-data%2Fstore) — `findRecord`, `query`, etc. |
| [`notifications`](https://fleetbase.io/docs/extension-development/reference/ember-services#notifications) | Notificaciones ( `success` , `error` , `info` , `warning` ) |
| [`currentUser`](https://fleetbase.io/docs/extension-development/reference/ember-services#current-user) | Usuario autenticado |
| [`session`](https://fleetbase.io/docs/extension-development/reference/ember-services#session) | Sesión de autenticación, incluyendo `session.data.authenticated` |
| `modalsManager` | API de modales imperativa |
| [`theme`](https://fleetbase.io/docs/extension-development/reference/ember-services#theme) | Establecer clases del cuerpo, activar el modo oscuro |
| `intl` | i18n / traducciones |
| `abilities` | Verificaciones de permisos basadas en roles ( [ember-can](https://github.com/minutebase/ember-can#readme) ) |
| [`crud`](https://fleetbase.io/docs/extension-development/reference/ember-services#crud) | Ayudantes genéricos para acciones CRUD |
| `events` | Bus de eventos a nivel de aplicación |
| [`socket`](https://fleetbase.io/docs/extension-development/reference/ember-services#socket) | Publicación/suscripción en tiempo real |
| [`appCache`](https://fleetbase.io/docs/extension-development/reference/ember-services#app-cache) | Caché respaldado por el almacenamiento del navegador |
| `universe` | El propio servicio "universe" + sub-servicios |

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class extends Component {
    @service fetch;
    @service notifications;
    @service abilities;
}
```

## Ver también

* **[Fleetbase UI](https://fleetbase.io/docs/ui)**
  — Referencia completa de componentes con propiedades, slots y ejemplos
* [Ember Services](https://fleetbase.io/docs/extension-development/reference/ember-services)
  — Referencia completa para los servicios anfitriones que se pueden inyectar en los componentes
* [Guías de Ember → Componentes](https://guides.emberjs.com/release/components)
  — Documentación de Ember upstream sobre componentes Glimmer
* [API de Componentes de Ember](https://api.emberjs.com/ember/release/classes/Component)

## Fuente

| Archivo | Descripción |
|---|---|
| `packages/ember-ui/addon/components` | Todos los componentes de la interfaz de usuario compartidos (fuente) |
| `packages/ember-core/addon/exports/services.js` | Servicios disponibles para los motores |

[Enrutamiento

Cómo está estructurado el motor Ember de frontend de una extensión — engine.js, rutas.js, dependencias de servicios anfitriones y cómo se montan las rutas en la consola de Fleetbase.](https://fleetbase.io/docs/extension-development/frontend/routing)
[Rutas virtuales

Cómo Fleetbase resuelve las URLs dinámicamente registradas contra los registros de elementos de menú para renderizar componentes de extensión sin rutas codificadas.](https://fleetbase.io/docs/extension-development/frontend/virtual-routes)