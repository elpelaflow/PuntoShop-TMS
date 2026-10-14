```
// Connect to a channel
this.socket.connect('company:' + this.currentUser.companyId);

// Subscribe to a channel
this.socket.subscribe('company:' + this.currentUser.companyId, (data) => {
    // Handle incoming data
});

// Unsubscribe from a channel
this.socket.unsubscribe('company:' + this.currentUser.companyId);

// Emit a message to a channel
this.socket.publish('company:' + this.currentUser.companyId, { message: 'Hello!' });
```

### Channels

| Channel | Description |
| --- | --- |
| `company:{uuid}` | Company-level events |
| `user:{uuid}` | User-level events |
| `api-credential:{uuid}` | API credential events |
| `my-extension:widget-updates` | Custom channel for widget updates |

### Source

`addon/services/socket.js`
+ SocketCluster's
[Client](https://socketcluster.io/docs/v3/client/)
.

---

## crud

Generic CRUD operations for interacting with Ember Data models. Supports
`createRecord`,
`deleteRecord`,
`get`,
`query`,
`reload`,
`save`,
`sync`,
and more.

```
// Create a new widget
this.store.createRecord('widget', { name: 'New Widget' }).save();

// Delete a widget
this.store.deleteRecord('widget', '123');

// Query for active widgets
this.store.query('widget', { status: 'active' });

// Sync changes to the backend
this.store.sync();
```

### Options

| Option | Description |
| --- | --- |
| `namespace` | API path prefix to target (e.g. `'my-extension/int/v1'` ) |
| `host` | Override the API host (rare — usually only for cross-region testing) |
| `externalRequest: true` | Treat `path` as an absolute URL, skip host/namespace prefixing |
| `fromCache: true` | Use the local cache (delegates to `cachedGet` ) |
| `normalizeToEmberData: true` | Push response into the store before resolving |
| `onSuccess(response)` / `onError(error)` | Per-call callbacks |
| `rawError: true` | Resolve with the raw `Error` instead of `errors[0]` |

### Source

`addon/services/crud.js`

---

## chat

Real-time chat functionality, built on SocketCluster.

### Methods

| Method | Description |
| --- | --- |
| `connect()` | Connect to the chat server |
| `send(message)` | Send a chat message |
| `disconnect()` | Disconnect from the chat server |
| `getHistory(limit)` | Retrieve chat history (limited to `limit` messages) |

### Example

```
// Send a chat message
this.chat.send('Hello, everyone!');

// Get the last 10 messages
this.chat.getHistory(10);
```

### Source

`addon/services/chat.js`

---

## theme

Access to the current application theme.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `primaryColor` | string | Primary color |
| `secondaryColor` | string | Secondary color |
| `textColor` | string | Text color |
| `backgroundColor` | string | Background color |

### Methods

| Method | Description |
| --- | --- |
| `applyTheme(theme)` | Apply a new theme |
| `getCurrentTheme()` | Get the current theme |

### Source

`addon/services/theme.js`

---

## modalsManager

Helper for displaying and managing modals.

### Methods

| Method | Description |
| --- | --- |
| `openModal(modal)` | Open a modal |
| `closeModal()` | Close the current modal |
| `getCurrentModal()` | Get the current modal |

### Source

`addon/services/modals-manager.js`

---

## events

Ember's event system.

### Methods

| Method | Description |
| --- | --- |
| `on(eventName, callback)` | Subscribe to an event |
| `off(eventName, callback)` | Unsubscribe from an event |
| `trigger(eventName, data)` | Trigger an event |

### Example

```
// Subscribe to the 'widget:created' event
this.events.on('widget:created', (widget) => {
    // Handle the new widget
});

// Trigger the 'widget:created' event
this.events.trigger('widget:created', { widget: new Widget() });
```

### Source

`addon/services/events.js`

---

## app-cache

Cache management for application data.

### Methods

| Method | Description |
| --- | --- |
| `get(key)` | Get data from the cache |
| `set(key, data)` | Set data in the cache |
| `delete(key)` | Delete data from the cache |
| `clear()` | Clear the entire cache |

### Source

`addon/services/app-cache.js`

---

## language

Language management.

### Methods

| Method | Description |
| --- | --- |
| `getCurrentLanguage()` | Get the current language |
| `setLanguage(language)` | Set the current language |

### Source

`addon/services/language.js`

---

## hostRouter

Router for the application.

### Methods

| Method | Description |
| --- | --- |
| `navigate(route, options)` | Navigate to a route |
| `getCurrentRoute()` | Get the current route |

### Source

`addon/services/host-router.js`

---

## More

This list is not exhaustive. Other services may be available depending on your specific needs.

| Método | Descripción |
|---|---|
| `instance()` | Devuelve el cliente SocketCluster subyacente |
| `listen(channelId, callback)` | Suscríbete a un canal; `callback(event)` se dispara por cada evento |
| `closeChannels()` | Cierra todos los canales propiedad de esta instancia de servicio |

### Ejemplo

```
import { inject as service } from '@ember/service';

export default class ActivityFeed extends Component {
    @service socket;
    @service currentUser;

    constructor() {
        super(...arguments);
        this.socket.listen(`company.${this.currentUser.companyId}`, (event) => {
            if (event.type === 'my-extension.widget.created') {
                this.handleNewWidget(event.data);
            }
        });
    }

    willDestroy() {
        super.willDestroy(...arguments);
        this.socket.closeChannels();
    }
}
```

La plataforma transmite eventos de ciclo de vida del modelo en el canal de la empresa; el código del backend los envía a través de
[la integración de SocketCluster en
`core-api`](https://fleetbase.io/docs/extension-development/reference/api-services#socketcluster-broadcasting)
.

### Fuente

`addon/services/socket.js`
— también consulta
[la documentación del cliente de SocketCluster](https://socketcluster.io/docs)
.

---

## crud

Ayudantes impulsados por modales para las operaciones estándar de crear/actualizar/eliminar/importar/exportar en los registros de Ember Data. Envuelve
`modalsManager`
+
`notifications`
+
`events`
para que no tengas que repetir el mismo
`confirm()`
+
`try/catch`
+ baile de toast por recurso.

### Métodos

| Método | Descripción |
|---|---|
| `delete(record, options?)` | Elimina un registro |
| `bulkDelete(selected[], options?)` | Elimina un array de registros |
| `bulkAction(verb, selected[], options?)` | Acción confirmada y en masa para cualquier verbo |
| `export(modelName, options?)` | Abre el modal de exportación (CSV/XLSX) |
| `import(modelName, options?)` | Abre el modal de importación con una cola |

### Ejemplo

```
@service crud;

@action removeWidget(widget) {
    this.crud.delete(widget, {
        title: `Eliminar ${widget.name}?`,
        onSuccess: () => this.refreshList(),
        onError: (err) => console.error(err),
    });
}

@action removeAllSelected() {
    this.crud.bulkDelete(this.selected, {
        modelName: 'widget',
        onSuccess: () => this.clearSelection(),
    });
}
```

### Opciones

| Opción | Descripción |
|---|---|
| `title` , `body` , `acceptButtonText` | Texto del modal |
| `successNotification` | Texto del toast de éxito |
| `modelName` | Sobreescribe el nombre del modelo derivado automáticamente |
| `onTrigger` , `onSuccess` , `onError` , `callback` | Callbacks de ciclo de vida |

### Fuente

`addon/services/crud.js`

---

## chat

Cliente de chat en tiempo real respaldado por los modelos de la plataforma
`chat-channel`
y
`chat-message`
. Se utiliza en la barra de chat de la aplicación y para la comunicación entre el cliente y el conductor.

### Métodos

| Método | Descripción |
|---|---|
| `openChannel(channelRecord)` | Abre un canal en la lista de chats activos |
| `closeChannel(channelRecord)` | Cierra el canal |
| `getOpenChannels()` | Canales actualmente abiertos |
| `createChatChannel(name)` | Crea un nuevo canal |
| `deleteChatChannel(channelRecord)` | Elimina un canal |
| `rememberOpenedChannel(channelRecord)` / `forgetOpenedChannel(...)` / `restoreOpenedChats()` | Persiste el conjunto de canales abiertos a través de sesiones |

Los eventos de chat fluyen a través del servicio
`socket`
en el ID del canal — escucha en
`chat.{channel_uuid}`
para mensajes.

### Fuente

`addon/services/chat.js`

---

## theme

Modo claro/oscuro + gestión de clases del cuerpo. Los motores llaman a
`setRoutebodyClassNames`
desde la ruta de su aplicación para nombrar el
`<body>`
para que los CSS específicos del motor puedan aplicarse.

### Métodos

| Método | Descripción |
|---|---|
| `set activeTheme(name)` | Cambia al tema registrado (`'light'` , `'dark'`) |
| `toggleTheme()` | Alterna entre claro y oscuro |
| `setRoutebodyClassNames(classes[])` | Aplica clases al `<body>` mientras esta ruta esté activa |
| `removeConsoleLoader()` | Oculta el cargador de inicio (si tu ruta es responsable del ciclo de vida) |
| `resetScroll()` | Desplaza hasta arriba |
| `setEnvironment()` | Aplica clases de entorno (indicadores de desarrollo/sandbox) |

### Patrón

```
// addon/routes/application.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
    @service theme;

    activate() {
        this.theme.setRoutebodyClassNames(['my-extension', 'sidebar-collapsed']);
    }
}
```

### Fuente

`addon/services/theme.js`

---

## modalsManager

API modal imperativa. Para modales declarativos, preferir `<Modal>` de `ember-ui`.

```
this.modalsManager.confirm({
    title: 'Delete Widget',
    body: 'This cannot be undone.',
    confirm: async (modal) => {
        await widget.destroyRecord();
        modal.done();
    },
});
```

---

## events

Sistema de eventos de toda la aplicación. Similar al servicio de
[hook](https://fleetbase.io/docs/extension-development/universe/hook-service)
, pero para eventos en vivo y en el proceso en lugar de hooks de ciclo de vida.

```
this.events.publish('my-extension:thing-changed', payload);
this.events.subscribe('my-extension:thing-changed', (payload) => { … });
```

---

## app-cache

Almacenamiento en el navegador para preferencias persistentes entre sesiones (paneles plegados, filtros recientemente utilizados, pestaña seleccionada, etc.). Las claves se escapan automáticamente a
`${userId}:${companyId}:`
para que los almacenes no se filtren entre usuarios o organizaciones.

### Métodos

| Método | Descripción |
|---|---|
| `set(key, value)` | Almacena un valor (serializado automáticamente) |
| `get(key, defaultValue?)` | Recupera, con valor predeterminado |
| `has(key)` / `doesntHave(key)` | Comprobaciones de existencia (clave o array) |
| `setEmberData(key, record, except?)` | Almacena un registro de Ember Data |
| `getEmberData(key, modelName)` | Restaura un registro almacenado en el almacén |

### Ejemplo

```
@service appCache;

setLastTab(tab) {
    this.appCache.set('my-extension:last-tab', tab);
}

get lastTab() {
    return this.appCache.get('my-extension:last-tab', 'overview');
}
```

Utiliza un prefijo de nombre de clave de dos puntos para evitar conflictos con los almacenes centrales.

### Fuente

`addon/services/app-cache.js`

---

## language

Gestión de la localización (i18n) con soporte para múltiples idiomas. Los idiomas se cargan desde
`addon/translations/`
(por ejemplo,
`en-us.yaml`
) y se seleccionan por usuario.

### Métodos

| Método | Descripción |
|---|---|
| `setLocale(localeCode)` | Cambia el idioma activo (también persiste en el perfil del usuario) |
| `getLanguage(name, options?)` | Recupera un idioma por nombre |
| `hasLanguage(name, options?)` | Comprueba si un idioma está registrado |
| `availableLocales` | Objeto — idiomas disponibles |

### Patrón

```
@service language;
@service intl;

await this.language.setLocale('fr-fr');
this.intl.t('my-extension.widget.created'); // ahora devuelve el texto del francés
```

Para la mayoría del trabajo de traducción, utiliza directamente el servicio
`intl`
—
`language`
es para cambiar el idioma activo.

### Fuente

`addon/services/language.js`

---

## resource-action

El servicio base que la plataforma extiende para
**servicios de acción por modelo**
— los "OrderActions" de Fleet-Ops, los "InvoiceActions" de Ledger, etc. Pre-cablea las operaciones CRUD estándar contra
`crud`
,
`notifications`
,
`intl`
y el sistema de paneles/contexto, para que los servicios por modelo simplemente declaren un
`modelName`
y sobrescriban los hooks de acción según sea necesario.

### Patrón

```
// addon/services/widget-actions.js
import ResourceActionService from '@fleetbase/ember-core/services/resource-action';

export default class WidgetActions extends ResourceActionService {
    modelName = 'widget';
    modelNamePath = 'name';

    fetchOptions = { namespace: 'my-extension/v1' };

    onAfterCreate(widget) {
        this.notifications.success(`Widget ${widget.name} created`);
    }
}
```

### Acciones pre-cableadas

| Acción | Qué hace |
|---|---|
| `create(attributes?, options?)` | Crea y muestra en el panel de recursos |
| `update(record, options?)` | Guarda con manejo de conflictos |
| `delete(record, options?, deleteOptions?)` | Delega a `crud.delete` |
| `bulkDelete(selected[], options?)` | Delega a `crud.bulkDelete` |
| `export(selections[], options?)` | Abre el modal de exportación (CSV/XLSX) |
| `import(options?)` | Abre el modal de importación con una cola |
| `search(query, options?)` | Búsqueda del lado del servidor que devuelve registros |
| `refresh()` | Vuelve a ejecutar la consulta de la tabla activa |
| `transitionTo(routeName, …args)` | Delega a la ruta del host |
| `confirmContinueWithUnsavedChanges(model, options?)` | Modal estándar "tienes cambios sin guardar" |

### Fuente

`addon/services/resource-action.js`

---

## loader

Primitivo de sobrecarga utilizado durante las operaciones de larga duración (importación, exportación, acciones en masa).

```
this.loader.show({ loadingMessage: 'Importing…' });
this.loader.hide();
```

---

## urlSearchParams

Lee y modifica los parámetros de la URL sin pasar por el enrutador.

```
this.urlSearchParams.all();
this.urlSearchParams.get('view');
this.urlSearchParams.set('view', 'details');
this.urlSearchParams.setParamsToCurrentUrl({ view: 'details', id: '123' });
```

---

## filters

Se utiliza por Fleet-Ops, Ledger, etc. para la interfaz de usuario estándar de filtrado en las páginas de lista de recursos. Crea una especificación de filtro y el servicio genera los parámetros de consulta correspondientes — esto es útil cuando estás renderizando tu propia interfaz de usuario de filtrado, pero quieres que el esquema de parámetros de consulta sea el mismo que Fleet-Ops ya entiende.

---

## hostRouter

Los motores utilizan el enrutador del motor
`router`
. Para navegar a las rutas del host (
`console.…`
,
`auth.…`
), se utiliza
`hostRouter`
:

```
@service hostRouter;
```

```
logout() {
    this.hostRouter.transitionTo('auth.login');
}
```

---

## Servicios secundarios de Universe

El árbol de servicios de Universe está documentado por separado. Cada servicio secundario tiene su propia página dedicada:

| Nombre del servicio | Propósito | Documentación |
| --- | --- | --- |
| `universe` | Fachada — `getService(name)`, `whenEngineLoaded`, `registerHook`, etc. | [Servicio Universe](https://fleetbase.io/docs/extension-development/universe/overview) |
| `universe/menu-service` | Elementos del menú | [Servicio de menú](https://fleetbase.io/docs/extension-development/universe/menu-service) |
| `universe/registry-service` | Registros de componentes | [Servicio de registro](https://fleetbase.io/docs/extension-development/universe/registry-service) |
| `universe/widget-service` | Widgets del panel de control | [Servicio de widgets](https://fleetbase.io/docs/extension-development/universe/widget-service) |
| `universe/hook-service` | Hooks de ciclo de vida | [Servicio de hooks](https://fleetbase.io/docs/extension-development/universe/hook-service) |
| `universe/extension-manager` | Arranque del motor, carga diferida, compartición entre motores | [Gestor de extensiones](https://fleetbase.io/docs/extension-development/universe/extension-manager) |

## Ver también

* [Servicios de API](https://fleetbase.io/docs/extension-development/reference/api-services)
  — Clases de soporte del backend (SmsService, NotificationRegistry, SocketCluster broadcaster, etc.)
* [Decoradores](https://fleetbase.io/docs/extension-development/reference/decorators)
  —
  `@engineService`
  ,
  `@fromStore`
  ,
  `@fetchFrom`
* [Contratos](https://fleetbase.io/docs/extension-development/reference/contracts)
  —
  `MenuItem`
  ,
  `Widget`
  ,
  `Hook`
  ,
  `ExtensionComponent`
  , etc.
* [Clase base de servicio Ember](https://api.emberjs.com/ember/release/classes/Service)
  en la documentación de la API Ember upstream
* [Ember Data Store](https://api.emberjs.com/ember-data/release/modules/@ember-data%2Fstore)
  — el
  `store`
  service

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/exports/services.js` | Lista canónica de inyección de servicios para los motores |
| `addon/services/` | Todos los servicios de host |