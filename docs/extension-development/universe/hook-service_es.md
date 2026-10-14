---
title: "Servicio de Hooks"
url: https://fleetbase.io/docs/extension-development/universe/hook-service
module: extension-development
---

# Servicio de Hooks

Utilice los hooks para ejecutar lógica en puntos clave de la aplicación, como el inicio de sesión, las transiciones de ruta, el inicio de la consola y eventos personalizados que usted mismo define.

# Servicio de Hooks

El
**servicio de hooks**
(
`universe/hook-service`
) es un bus de eventos tipado compartido en todos los motores. Las extensiones registran manejadores para eventos nombrados; la plataforma (y otras extensiones) los ejecutan en el momento adecuado.

Los hooks residen en un registro singleton en la aplicación raíz, por lo que un hook registrado en un motor se activa cuando se emiten eventos en otro. Por ejemplo, una extensión de cliente personalizada puede redirigir a los usuarios autenticados desde la consola principal (
`console:before-model`
) sin que ninguno de los dos motores lo sepa.

## Utilizando el Servicio

```
// addon/extension.js
import { Hook } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const hookService = universe.getService('hook');
        // …
    },
};
```

## Registrando un Hook

```
// Form 1: Contrato de Hook (preferido — explícito y encadenable)
hookService.registerHook(
    new Hook('console:before-model', (session, router) => {
        // Ejecutar el bootstrap específico de la extensión antes de que se resuelva cualquier ruta de la consola
    })
);

// Form 2: nombre + manejador + opciones
hookService.registerHook('console:after-model', (session, router) => {
    // …
}, { priority: 10, once: false });
```

`registerHook`
acepta:

* Una instancia de
  `Hook`
  (construida a través del
  [`Hook`
  contrato](https://fleetbase.io/docs/extension-development/reference/contracts#hook)
  )
* Un tuple (nombre, manejador, opciones?) — el servicio crea la
  `Hook`
  para usted

## Opciones de Hook

Pase estas opciones a través de
`new Hook({ … })`
o como tercer argumento a
`registerHook`
:

| Opción | Valor predeterminado | Descripción |
| --- | --- | --- |
| `priority` | `0` | Los números más bajos se ejecutan primero |
| `runOnce` (alias `once` ) | `false` | El hook se elimina después de ejecutarse |
| `id` | auto-guid | Identificador estable — pasar a `removeHook(name, id)` |
| `enabled` | `true` | El hook se omite cuando es `false` |

```
new Hook('application:before-model')
    .execute((session, router) => { /* … */ })
    .withPriority(20)
    .once()
    .withId('my-extension:bootstrap');
```

## Ejecutando Hooks

La mayoría de los autores de extensiones no llaman a
`execute`
ellos mismos — la plataforma dispara los eventos bien conocidos. Pero usted puede emitir los suyos:

```
// Async — espera a todos los manejadores en orden de prioridad
const results = await hookService.execute('my-extension:order-imported', order, source);

// Sync — para código que no puede ser async
hookService.executeSync('my-extension:before-render', context);
```

`execute`
maneja los errores de los manejadores (registrados en la consola con el ID del hook) para que una extensión defectuosa no interrumpa la cadena. El valor de retorno de cada manejador se recopila en el array `results`.

## Eliminando y Habilitando Hooks

```
hookService.removeHook('console:before-model', hookId);
hookService.removeAllHooks('my-extension:custom-event');
hookService.disableHook('console:before-model', hookId);
hookService.enableHook('console:before-model', hookId);
```

Capture el ID cuando lo registre si lo necesitará más adelante:

```
const hook = new Hook('console:after-model', handler).withId('my-bootstrap');
hookService.registerHook(hook);
// …más tarde
hookService.removeHook('console:after-model', 'my-bootstrap');
```

## Inspeccionando Hooks

```
hookService.getHooks('console:before-model'); // → array
hookService.hasHook('console:before-model');  // → boolean
```

## Eventos Incorporados

Estos son los eventos que dispara la plataforma hoy en día. Convención de nombres:
`<motor>:<ciclo de vida>`
. Los argumentos
`session`
,
`router`
y
`transition`
reflejan los hooks de ruta de Ember.

| Evento | Args | Fired by |
| --- | --- | --- |
| `application:before-model` | `(session, router, transition)` | `console` ApplicationRoute — el hook más temprano, se ejecuta antes de cualquier verificación de autenticación |
| `console:before-model` | `(session, router, transition)` | `console.*` ApplicationRoute |
| `console:after-model` | `(session, router)` | `console.*` ApplicationRoute |

Los motores pueden emitir sus propios eventos con ámbito — busque
`hookService.execute(`
en el código de la aplicación anfitriona para ver cuáles se están disparando actualmente.

## Nombres de Hooks Personalizados

Utilice un prefijo de espacio con dos puntos para que sus eventos no entren en conflicto con otras extensiones o con la plataforma:

```
'my-extension:order:imported'
'my-extension:invoice:rendering'
'@my-org/my-extension:before-export'
```

## Métodos de Fachada

`UniverseService`
reexporta los métodos comunes para que también pueda llamar a:

```
universe.registerHook(hookOrName, handler, options);
universe.executeHook(hookName, ...args);   // async
universe.hooks;                            // raw registry
```

La fachada es adecuada para llamadas únicas; resuelva
`getService('hook')`
directamente cuando necesite la superficie completa (
`removeAllHooks`
,
`executeSync`
,
`enableHook`
,
`disableHook`
).

## Hooks del Frontend vs. Webhooks del Backend

El servicio de hooks es
**solo para el frontend**
— se activa dentro del navegador cuando se ejecuta el código de la consola. Para las reacciones del lado del servidor a los eventos de la plataforma (por ejemplo, enviar un correo electrónico cuando se completa un pedido, sincronizar con un ERP externo, ejecutar un trabajo en segundo plano), utilice
**webhooks**
— que se configuran en la
[Consola de Desarrollador](https://fleetbase.io/docs/platform/developer-console/webhooks)
y se entregan como POSTs HTTP a su backend. Los webhooks se disparan a partir de observadores del modelo
`core-api`
; vea
[Backend → Expansiones y Observadores](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers)
.

## Fuente

| File | Description |
|---|---|
| `addon/services/universe/hook-service.js` | `HookService` |
| `addon/contracts/hook.js` | `Hook` contract |
| `addon/contracts/hook-registry.js` | Internal singleton storage |

[Servicio de Menú

Registre las entradas de navegación en la consola — elementos de encabezado, paneles de configuración, paneles de administración, menús de organización y usuario, y registros personalizados — a través de universe.getService('menu').](https://fleetbase.io/docs/extension-development/universe/menu-service)
[Servicio de Widgets

Registre los paneles y widgets que aparecen en el panel de inicio de Fleetbase o en el propio panel de su extensión.](https://fleetbase.io/docs/extension-development/universe/widget-service)