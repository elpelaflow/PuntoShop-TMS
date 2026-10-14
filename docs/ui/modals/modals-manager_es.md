---
title: "Servicio de Modales"
url: https://fleetbase.io/docs/ui/modals/modals-manager
module: ui
---

# Servicio de Modales

El servicio `modals-manager` es la API programática para abrir, apilar y cerrar modales. Devuelve una Promesa que se resuelve al confirmar y se rechaza al rechazar.

# Servicio de Modales

```
@service modalsManager;
```

`modals-manager`
es el servicio central para trabajar con modales desde JavaScript. Cada modal en la Consola Fleetbase — confirmaciones, alertas, prompts, hojas de acción masiva, rastreadores de progreso y modales personalizados — pasan por este servicio.

Soporta una pila de modales anidados (el `z-index` se incrementa automáticamente) y devuelve una Promesa para que puedas
`await`
la confirmación del usuario.

## Inyectar el Servicio

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MyComponent extends Component {
  @service modalsManager;
}
```

## Mostrar un Modal

```
this.modalsManager.show('my-modal-template', {
  title: 'Confirmar acción',
  body: '¿Estás seguro?',
  confirm: async (modal) => { /* … */ },
});
```

`show(componentToRender, options)`
monta
`componentToRender`
dentro de un modal y devuelve una Promesa que se resuelve cuando el modal se cierra.

## Plantillas Predeterminadas

El servicio proporciona métodos convenientes que envuelven
`show()`
con plantillas predefinidas.

### confirm(options)

Un pequeño modal de confirmación — utilizado para acciones destructivas, prompts "¿Estás seguro?" y cualquier decisión binaria.

```
@action async deleteDriver() {
  this.modalsManager.confirm({
    title: 'Eliminar conductor?',
    body: 'Esta acción no se puede deshacer.',
    acceptButtonText: 'Eliminar',
    acceptButtonScheme: 'danger',
    confirm: async (modal) => {
      await this.driver.destroyRecord();
    },
  });
}
```

### alert(options)

Un pequeño modal de alerta — un solo botón de OK.

```
this.modalsManager.alert({
  title: 'Actualización disponible',
  body: 'Hay una nueva versión de la consola disponible.',
});
```

### prompt(options)

Un modal que solicita al usuario una única entrada de texto.

```
this.modalsManager.prompt({
  title: 'Renombrar',
  body: 'Introduce un nuevo nombre',
  confirm: async (modal) => {
    const name = modal.options.value;
    /* guardar */
  },
});
```

### bulk(options)

Un modal diseñado para confirmaciones de acciones masivas (aplicar a N filas seleccionadas).

```
this.modalsManager.bulk({
  title: 'Eliminar conductores seleccionados',
  body: `Eliminar ${this.selected.length} conductores?`,
  selected: this.selected,
  confirm: async () => { /* … */ },
});
```

### progress(options)

Muestra el progreso de un array de Promises con un porcentaje en tiempo real.

```
this.modalsManager.progress({
  title: 'Procesando',
  promises: this.records.map((r) => r.save()),
});
```

`options.promises`
es obligatorio.

### process(options)

Muestra un único proceso asíncrono con etapas.

```
this.modalsManager.process({
  title: 'Importando',
  process: async () => { /* … */ },
});
```

`options.process`
es obligatorio.

### loader(options) / displayLoader(options)

Un modal de carga que bloquea (sin botones).

```
this.modalsManager.loader({ title: 'Cargando conductores…' });
// más tarde
this.modalsManager.done();
```

### userSelectOption(title, promptOptions, modalOptions)

Un modal de selección de opciones (radio). Devuelve una Promesa que se resuelve con el valor seleccionado.

```
const selected = await this.modalsManager.userSelectOption(
  'Seleccionar una billetera',
  [
    { value: 'main',    label: 'Principal' },
    { value: 'reserve', label: 'Reserva' },
  ],
);
```

## Modales Personalizados

Para mostrar un modal completamente personalizado, pasa la ruta de resolución del componente como el primer argumento:

```
this.modalsManager.show('modals/edit-driver', {
  title: 'Editar conductor',
  driver: this.driver,
  confirm: async () => { /* … */ },
});
```

Tu componente modal personalizado vive en
`addon/components/modals/edit-driver.{hbs,js}`
y recibe los argumentos
`@modalIsOpened`
,
`@options`
,
`@onConfirm`
y
`@onDecline`
.

## Opciones Comunes

Estas opciones funcionan para todos los diseños de modales:

### Título / Cuerpo

| Opción | Tipo | Descripción |
|---|---|---|
| `title` | string | Título del modal |
| `body` | string | Texto del cuerpo (o renderiza un cuerpo personalizado en tu componente) |
| `footer` | string | Texto del pie de página |
| `hideTitle` | boolean | Ocultar la barra de título |

### Botones

| Opción | Valor predeterminado | Descripción |
|---|---|---|
| `acceptButtonText` | `Sí` | Texto del botón de confirmación |
| `acceptButtonScheme` | `primary` | Color del botón de confirmación (`primary`, `danger`, `success`, `warning`) |
| `acceptButtonIcon` | — | Icono de FontAwesome |
| `declineButtonText` | `No` | Texto del botón de rechazo |
| `declineButtonScheme` | `default` | Color del botón de rechazo |
| `hideAcceptButton` | `false` | Ocultar el botón de confirmación |
| `hideDeclineButton` | `false` | Ocultar el botón de rechazo |
| `confirmButtonDefaultText` / `confirmButtonPendingText` / `confirmButtonFulfilledText` / `confirmButtonRejectedText` | `Sí` | Textos por estado cuando se utilizan botones con Promesa |

### Comportamiento

| Opción | Valor predeterminado | Descripción |
|---|---|---|
| `backdrop` | `true` | Mostrar la capa de desenfoque |
| `backdropClose` | `true` | Clic en el fondo para cerrar |
| `keyboard` | `true` | Permitir que Escape cierre |
| `fade` | `true` | Transición de desvanecimiento |
| `position` | `top` | `top` , `center` |
| `size` | `null` | `sm` , `md` , `lg` , `xl` , etc. |
| `scrollable` | `false` | Permitir que el cuerpo se desplace |
| `renderInPlace` | `false` | Renderizar en el orden del DOM en lugar de en un portal |
| `transitionDuration` | `300` | Duración de la transición en ms |
| `keepOpen` | `false` | No cerrar automáticamente al confirmar — útil para flujos de varios pasos |

### Callbacks

| Opción | Firma | Descripción |
|---|---|---|
| `confirm` | `async (modal, done) => void` | Se llama cuando el usuario hace clic en el botón de confirmación. Devuelve una Promesa para mantener el botón en estado de espera |
| `decline` | `async (modal, done) => void` | Se llama cuando el usuario hace clic en el botón de rechazo |

`modal`
es la instancia del gestor;
`done`
es una devolución de llamada para cerrar el modal manualmente (útil cuando
`keepOpen: true`
).

## Resultado de la Promesa

`show()`
,
`confirm()`
,
`alert()`
, etc. devuelven una Promesa. La Promesa se resuelve cuando el modal se cierra mediante
`done(modalId?, 'onConfirm')`
y se rechaza con
`'onDecline'`
.

```
try {
  await this.modalsManager.confirm({
    title: 'Eliminar conductor?',
    confirm: async () => await this.driver.destroyRecord(),
  });
  // usuario confirmó
} catch (e) {
  // usuario rechazó
}
```

## Apilar Modales

Puedes tener múltiples modales abiertos a la vez. El gestor los rastrea en una pila con un índice z (
`1060`
,
`1070`
, …). El modal más recientemente abierto es el "modal superior" devuelto por
`getTopModal()`
.

## Control Imperativo

Métodos útiles para un control avanzado:

| Método | Propósito |
|---|---|
| `getTopModal()` | El modal actualmente activo |
| `getModalById(id)` | Encontrar un modal específico en la pila |
| `done(modalId?, type?)` | Cerrar un modal — pasar `'onConfirm'` o `'onDecline'` para controlar la resolución de la Promesa |
| `dismiss(modalId?)` | Cerrar sin resolver la Promesa |
| `setOptionForModal(modalId, key, value)` | Actualizar una opción en un modal específico en tiempo de ejecución |
| `getOptionForModal(modalId, key)` | Leer una opción en un modal específico |
| `startLoadingForModal(modalId)` | Alternar el estado de confirmación del modal |
| `stopLoadingForModal(modalId)` | Lo contrario del anterior |

## Ejemplos del Mundo Real

```
// Confirmación con control de permisos
@action async deleteOrder() {
  this.modalsManager.confirm({
    title: 'Cancelar pedido?',
    body: `El pedido ${this.order.public_id} se cancelará.`,
    acceptButtonText: 'Cancelar pedido',
    acceptButtonScheme: 'danger',
    confirm: async () => {
      await this.order.cancel();
      this.notifications.success('Pedido cancelado');
    },
  });
}

// Modal personalizado con propiedades adicionales
@action editProfile(driver) {
  this.modalsManager.show('modals/driver-form', {
    title: 'Editar conductor',
    driver,
    confirm: async (modal) => {
      await modal.options.driver.save();
    },
  });
}

// Cargar durante una operación asíncrona
@action async syncWithUpstream() {
  this.modalsManager.loader({ title: 'Sincronizando…' });
  try {
    await this.upstream.sync();
  } finally {
    this.modalsManager.done();
  }
}

// Selección de usuario
const selected = await this.modalsManager.userSelectOption(
  'Seleccionar una billetera',
  [
    { value: 'main',    label: 'Principal' },
    { value: 'reserve', label: 'Reserva' },
  ],
);
```

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/services/modals-manager.js` | Clase de servicio |