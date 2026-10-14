---
title: "Desarrollo de extensiones"
url: https://fleetbase.io/docs/extension-development
module: extension-development
---

# Desarrollo de extensiones

Fleetbase está diseñado desde cero para ser modular. El panel principal y la API proporcionan una superficie básica; todo lo demás — Fleet-Ops, Ledger, Valhalla, Vroom — es una extensión construida utilizando las mismas APIs que utilizarás para crear la tuya propia.

Esta sección es tu referencia para crear esas extensiones.

**Dos partes, una extensión.**
Una extensión de Fleetbase es un único repositorio que incluye
**tanto**
un addon de Ember.js (la interfaz de usuario del panel) como un paquete de Laravel (la API). El mismo
`flb scaffold`
comando genera ambas partes conectadas. Consulta
[Arquitectura](https://fleetbase.io/docs/extension-development/architecture/overview)
.

## ¿Qué impulsa tu extensión?

Dos paquetes fundamentales proporcionan todo lo que necesita tu extensión: servicios, contratos, clases base y funciones auxiliares. Los importas; no los modificas.

| Paquete | Qué proporciona |
|---|---|
| **`@fleetbase/ember-core`** | Addon de Ember.js — el servicio `UniverseService` y sus sub-servicios, contratos (`MenuItem`, `Widget`, `Hook`, `ExtensionComponent`), servicios host compartidos (`fetch`, `store`, `notifications`, `currentUser`, etc.), decoradores y un adaptador base para comunicarse con la API |
| **`fleetbase/core-api`** | Paquete de Composer — el `CoreServiceProvider` que extiendes, macros de ruta (`fleetbaseRoutes`, `fleetbaseRestRoutes`), expansiones, auto-registro de observadores, traits (`HasUuid`, `HasPublicId`), el `NotificationRegistry`, `SmsService` y el emisor SocketCluster |

El panel conecta ambas partes al inicio; tú creas tu extensión utilizando estos paquetes, lo escafolds en una instancia de Fleetbase en ejecución, y tus funcionalidades aparecen.

## ¿Qué vas a construir?

Comienza

Crea una nueva extensión, conéctala a tu Fleetbase local y ejecútala por primera vez.

[Guía rápida →](https://fleetbase.io/docs/extension-development/getting-started/quickstart)

Arquitectura

Cómo está estructurada una extensión — addon + servidor, manifiesto y carga del motor.

[Arquitectura →](https://fleetbase.io/docs/extension-development/architecture/overview)

Servicio Universe

La API de extensibilidad del frontend — registra elementos de menú, componentes, widgets y hooks a través de
`addon/extension.js`
.

[Servicio Universe →](https://fleetbase.io/docs/extension-development/universe/overview)

Desarrollo del frontend

Rutas, plantillas y componentes dentro de tu motor Ember.

[Frontend →](https://fleetbase.io/docs/extension-development/frontend/routing)

Desarrollo del backend

Proveedores de servicios, rutas, controladores, modelos, migraciones, expansiones, observadores y transformadores de recursos.

[Backend →](https://fleetbase.io/docs/extension-development/backend/service-provider)

Publicación

Empaqueta, versiona y publica tu extensión en el Registro de Extensiones de Fleetbase.

[Publicación →](https://fleetbase.io/docs/extension-development/publishing/overview)

## ¿Cómo se integran las extensiones en el panel?

Cada extensión moderna declara un único archivo
**`addon/extension.js`**
en la raíz de su addon. El archivo exporta un objeto predeterminado con un
`setupExtension(app, universe)`
hook — el panel lo llama una vez al inicio.

```
// addon/extension.js
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService = universe.getService('menu');

        menuService.registerHeaderMenuItem('Mi extensión', 'console.my-extension', {
            icon: 'puzzle-piece',
            description: 'Mi característica de logística personalizada.',
        });
    },
};
```

El
`universe`
parámetro es el
[`UniverseService`](https://fleetbase.io/docs/extension-development/universe/overview)
— el registro central para toda la plataforma. A través de él accedes a los sub-servicios del menú, registro, widget y hook.

Consulta
[Servicio Universe](https://fleetbase.io/docs/extension-development/universe/overview)
para la API completa.

## ¿Dónde empezar?

Si esta es tu primera extensión, sigue la
[Guía rápida](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
— te guiará a través de la creación, la conexión a una instancia de Fleetbase en ejecución y el primer viaje a la API.

Si ya has creado una y quieres profundizar en un tema específico, ve directamente a:

* [Servicio Universe →](https://fleetbase.io/docs/extension-development/universe/overview)
* [Rutas de Frontend →](https://fleetbase.io/docs/extension-development/frontend/routing)
* [Proveedor de Servicio de Backend →](https://fleetbase.io/docs/extension-development/backend/service-provider)
* [Publicación →](https://fleetbase.io/docs/extension-development/publishing/overview)