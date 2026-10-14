---
title: "Servicio de la barra lateral"
url: https://fleetbase.io/docs/ui/services/sidebar
module: ui
---

# Servicio de la barra lateral

El servicio `sidebar` controla la visibilidad (visible / minimizada / oculta) y el estado de habilitación de la barra lateral del panel de control.

# Servicio de la barra lateral

```
@service sidebar;
```

El
`sidebar`
servicio controla la barra lateral del panel de control: mostrar, ocultar, minimizar, habilitar, deshabilitar. La mayoría de los autores de extensiones solo lo necesitan para vistas en pantalla completa (donde se desea ocultar la barra lateral para proporcionar más espacio al flujo de trabajo) o para interfaces de usuario especiales que cambian el estado de visibilidad de la barra lateral.

## Inyectar

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FullscreenViewerComponent extends Component {
  @service sidebar;
}
```

## Estados

La barra lateral tiene tres estados visuales:

| Estado | Significado |
| --- | --- |
| `visible` | Predeterminado: barra lateral completa visible |
| `minimized` | Se reduce a iconos solamente |
| `hidden` | Completamente fuera de la pantalla |

Además, un indicador de habilitación: cuando está `disabled`, la barra lateral se oculta forzadamente y los métodos `show()`/`minimize()` se ignoran.

## API pública

### Obtener estados

| Obtener | Descripción |
| --- | --- |
| `isVisible` | Verdadero cuando el estado ≠ `hidden` |
| `isHidden` | Verdadero cuando el estado = `hidden` |
| `isMinimized` | Verdadero cuando el estado = `minimized` |
| `isEnabled` | Verdadero cuando no está deshabilitada |
| `isDisabled` | Verdadero cuando está deshabilitada |
| `hasContext` | Verdadero cuando se ha registrado un componente de barra lateral |

### Acciones

| Método | Descripción |
| --- | --- |
| `show()` | Transición a `visible` |
| `hide(options?)` | Transición a `hidden`. Pasar `{ immediate: true }` para evitar la animación, o `{ preserveDisabled: true }` para mantener el estado deshabilitado |
| `hideNow()` | Ocultar inmediatamente (sin animación) |
| `minimize()` | Transición a `minimized` |
| `toggle()` | Alternar entre visible y oculta |
| `enable(state?)` | Establecer habilitado y restaurar el estado anterior (o el estado pasado) |
| `disable()` | Ocultar forzadamente y evitar que el usuario la vuelva a abrir |
| `setVisualState(state)` | Establecer el estado sin provocar efectos secundarios |
| `setEnabled(bool)` | Establecer el indicador de habilitación sin otros efectos secundarios |
| `transitionTo(state, options?)` | Transición de nivel inferior |

### Acceso al elemento

| Método | Descripción |
| --- | --- |
| `getComponent()` | La instancia del componente de barra lateral registrado |
| `getElement()` | El nodo DOM de la barra lateral |
| `getGutterElement()` | La barra de la barra lateral (mordaza de redimensionamiento) |

## Ejemplos del mundo real

```
// Ocultar la barra lateral al entrar en un flujo de trabajo en pantalla completa
@action enterFullscreen() {
  this.sidebar.hide();
}

@action exitFullscreen() {
  this.sidebar.show();
}

// Deshabilitar la barra lateral por completo (por ejemplo, durante la incorporación)
@action startOnboarding() {
  this.sidebar.disable();
}

@action finishOnboarding() {
  this.sidebar.enable();   // restaura el estado anterior
}

// Minimizar durante el modo de enfoque
@action focusMode() {
  this.sidebar.minimize();
}
```

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/services/sidebar.js` | Clase de servicio |
| `addon/components/layout/sidebar/` | Componente de barra lateral |