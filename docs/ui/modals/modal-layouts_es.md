---
título: "Diseños de modales"
url: https://fleetbase.io/docs/ui/modals/modal-layouts
módulo: ui
---

# Diseños de modales

Diseños de modales preconstruidos en `@fleetbase/ember-ui — confirmación, alerta, solicitud, acción masiva, progreso, proceso, carga y solicitud de opción.

# Diseños de modales

`@fleetbase/ember-ui`
ofrece varios diseños de modales preconstruidos. No los renderizas directamente; los llamas a través del
[`modals-manager`](https://fleetbase.io/docs/ui/modals/modals-manager)
servicio. Cada uno es simplemente un envoltorio de conveniencia alrededor de
`modalsManager.show()`
con un componente de diseño preestablecido.

| Diseño | Método del servicio | Componente |
|---|---|---|
| Confirmar | `confirm(opciones)` | `modal/layouts/confirm` |
| Alerta | `alert(opciones)` | `modal/layouts/alert` |
| Solicitar | `prompt(opciones)` | `modal/layouts/prompt` |
| Acción masiva | `bulk(opciones)` | `modal/layouts/bulk-action` |
| Progreso | `progress(opciones)` | `modal/layouts/progress` |
| Proceso | `process(opciones)` | `modal/layouts/process` |
| Carga | `loader(opciones)` / `displayLoader(opciones)` | `modal/layouts/loading` |
| Solicitud de opción | `userSelectOption(título, opciones, modalOptions)` | `modal/layouts/option-prompt` |

## Confirmar

El diseño más utilizado. Un diálogo pequeño con una pregunta y botones "Confirmar" / "Cancelar". Se utiliza para cualquier decisión binaria.

```
this.modalsManager.confirm({
  title: '¿Eliminar conductor?',
  body: 'Esta acción no se puede deshacer.',
  acceptButtonText: 'Eliminar',
  acceptButtonScheme: 'danger',
  confirm: async () => await driver.destroyRecord(),
});
```

Opciones útiles:
`title`
,
`body`
,
`acceptButtonText`
,
`acceptButtonScheme`
,
`acceptButtonIcon`
,
`declineButtonText`
,
`confirm`
,
`decline`
.

## Alerta

Un aviso de "OK" con un solo botón. El botón "Confirmar" está oculto; "Cancelar" se renombra a
**OK**
.

```
this.modalsManager.alert({
  title: 'Actualización disponible',
  body: 'Hay una nueva versión del panel de control disponible — por favor, actualice.',
});
```

Opciones útiles:
`title`
,
`body`
,
`declineButtonText`
.

## Solicitar

Un modal que solicita una única entrada de texto.

```
this.modalsManager.prompt({
  title: 'Cambiar nombre',
  body: 'Introduzca un nuevo nombre:',
  confirm: async (modal) => {
    const nombre = modal.options.value;
    /* … */
  },
});
```

Opciones útiles:
`title`
,
`body`
,
`value`
(valor inicial),
`placeholder`
,
`inputType`
,
`acceptButtonText`
,
`confirm`
.

## Acción masiva

Diseñado para confirmar una acción en varias filas seleccionadas. Muestra el número de filas seleccionadas y (opcionalmente) una vista previa de la lista.

```
this.modalsManager.bulk({
  title: 'Eliminar conductores',
  body: `Eliminar ${this.selected.length} conductores?`,
  selected: this.selected,
  acceptButtonScheme: 'danger',
  confirm: async () => {
    await Promise.all(this.selected.map((d) => d.destroyRecord()));
  },
});
```

Opciones útiles:
`selected`
(array),
`title`
,
`body`
,
`acceptButtonScheme`
,
`confirm`
.

## Progreso

Rastrea el progreso en un array de promesas y muestra una barra de porcentaje.

```
this.modalsManager.progress({
  title: 'Importando filas…',
  promises: rows.map((r) => r.save()),
});
```

`options.promises`
es
**obligatorio**
(el gestor lanza una excepción si no se proporciona).

## Proceso

Similar a "Progreso", pero para una única función asíncrona con etapas explícitas.

```
this.modalsManager.process({
  title: 'Generando informe…',
  process: async () => {
    await this.fetchData();
    await this.computeAggregates();
    await this.renderPdf();
  },
});
```

`options.process`
es
**obligatorio**
.

## Cargar / Cargar

Un cargador bloqueante con ningún botón. Úselo para indicar que se está realizando una tarea; cierre manualmente con
`done()`
.

```
this.modalsManager.loader({ title: 'Cargando…' });
try {
  await this.upstream.sync();
} finally {
  this.modalsManager.done();
}
```

## Solicitud de opción

Una selección de lista de opciones. Devuelve una Promesa que se resuelve con el valor seleccionado.

```
const elección = await this.modalsManager.userSelectOption(
  'Elegir destino',
  [
    { value: 'wallet_main', label: 'Cartera principal' },
    { value: 'wallet_reserve', label: 'Cartera de reserva' },
  ],
);
```

El tercer argumento posicional es un objeto regular
`modalOptions`
que admite los mismos campos que
`confirm()`
.

## Opciones comunes

Todos los diseños aceptan las opciones de modal estándar — consulte la página
[`modals-manager`](https://fleetbase.io/docs/ui/modals/modals-manager)
para obtener la lista completa (textos de los botones, esquemas, comportamiento de fondo, posición, tamaño, duración de la transición,
`keepOpen`
, etc.).