```
# Visión general

Cómo funcionan los modales en `@fleetbase/ember-ui` — el servicio `modals-manager`, los diseños integrados y cómo crear componentes de modales personalizados.

# Modales

Los modales en
`@fleetbase/ember-ui`
se controlan mediante un único servicio —
`modals-manager`
— que monta un componente en un portal, gestiona una pila de modales anidados y expone una API basada en Promises.

## Cómo funcionan

```
modals-manager.show('modals/edit-driver', { title, driver, confirm })
       ↓
El componente en addon/components/modals/edit-driver se renderiza
       ↓
El usuario hace clic en Confirmar o Rechazar
       ↓
La Promise devuelta por show() se resuelve (confirm) o se rechaza (decline)
```

También puede utilizar uno de los
**diseños integrados**
(
`confirm`
,
`alert`
,
`prompt`
,
`bulk`
,
`progress`
,
`process`
,
`loader`
,
`userSelectOption`
), que renderizan su propio componente y solo necesitan opciones.

## Tres formas de abrir un modal

### 1. Confirmación integrada

```
this.modalsManager.confirm({
  title: 'Eliminar conductor?',
  body: 'Esto no se puede deshacer.',
  acceptButtonScheme: 'danger',
  confirm: async () => await driver.destroyRecord(),
});
```

### 2. Alerta / Prompt / Bulk / Progress / Process / Loader integrado

```
this.modalsManager.alert({ title: 'Guardado', body: 'Sus cambios se han guardado.' });
this.modalsManager.prompt({ title: 'Cambiar nombre', confirm: async (m) => { /* … */ } });
this.modalsManager.loader({ title: 'Cargando…' });
```

### 3. Componente de modal personalizado

```
this.modalsManager.show('modals/edit-driver', {
  title: 'Editar conductor',
  driver,
  confirm: async (modal) => await modal.options.driver.save(),
});
```

El componente en
`addon/components/modals/edit-driver`
se renderiza dentro del marco del modal.

## Páginas de esta sección

Servicio `modals-manager`

La API completa — show, confirm, alert, prompt, bulk, progress, process, loader y control de la pila.

[modals-manager →](https://fleetbase.io/docs/ui/modals/modals-manager)

Diseños de modales

Los diseños integrados — cómo se ven y qué campos de opciones consumen.

[Diseños →](https://fleetbase.io/docs/ui/modals/modal-layouts)

## Crear un componente de modal personalizado

Coloque su componente en
`addon/components/modals/<nombre>.hbs,js`
. El componente recibe:

| Argumento | Proporcionado por | Propósito |
|---|---|---|
| `@modalIsOpened` | `manager` | Bandera de visibilidad booleana |
| `@options` | `show()` | Todo lo que pasó en `options` |
| `@onConfirm` | `manager` | Maneador de clics para el botón de Confirmar |
| `@onDecline` | `manager` | Maneador de clics para el botón de Rechazar |

Utilice
`<Modal::Default>`
(o
`<Modal::Wide>`
,
`<Modal::Sidebar>`
, etc.) como plantilla raíz:

```
{{!-- addon/components/modals/edit-driver.hbs --}}
<Modal::Default
  @modalIsOpened={{@modalIsOpened}}
  @options={{@options}}
  @confirm={{@onConfirm}}
  @decline={{@onDecline}}
>
  <div class="modal-body-container">
    <InputGroup @name="Name" @value={{@options.driver.name}} />
    <InputGroup @name="Phone">
      <PhoneInput @value={{@options.driver.phone}} />
    </InputGroup>
  </div>
</Modal::Default>
```

El envoltorio
`<Modal::Default>`
maneja el fondo, el botón de cierre, el encabezado, el pie de página, los botones de aceptar/rechazar y la lógica de Promises — su componente solo proporciona el cuerpo.

## Ver también

* [`modals-manager`
  service](https://fleetbase.io/docs/ui/modals/modals-manager)
  — API completa
* [Modal Layouts](https://fleetbase.io/docs/ui/modals/modal-layouts)
  — Diseños preconstruidos
```