---
title: "Comenzar rápidamente"
url: https://fleetbase.io/docs/extension-development/getting-started/quickstart
module: extension-development
---

# Comenzar rápidamente

Utilice la CLI de Fleetbase para crear una nueva extensión con un backend y frontend funcionales.

# Comenzar rápidamente

La forma más sencilla de comenzar a desarrollar una nueva extensión de Fleetbase es utilizar la
**CLI de Fleetbase**.

La CLI proporciona un
`scaffold`
que genera un esqueleto de extensión completo y funcional, incluyendo tanto el
[Backend](https://fleetbase.io/docs/extension-development/backend/service-provider)
(paquete de Laravel) como el
[Frontend](https://fleetbase.io/docs/extension-development/frontend/routing)
(Ember Engine), junto con el archivo de manifiesto
`extension.json`
necesario.

## Requisitos previos

Antes de comenzar, asegúrese de tener lo siguiente instalado en su máquina de desarrollo local:

* **Node.js**
  (versión 18 o superior)
* **PHP**
  (versión 8.2 o superior)
* **Composer**
* **Git**
* La
  **CLI de Fleetbase**

Si aún no ha instalado la CLI, puede hacerlo mediante npm:

```
npm install -g @fleetbase/cli
```

## Crear la extensión

Cree la extensión dentro del directorio
`packages/`
de su clon de Fleetbase. El contenedor de Docker de la plataforma ya monta
`./packages`
(de acuerdo con
[Configuración de desarrollo → Comienza](https://fleetbase.io/docs/platform/quickstart/development-setup)
), por lo que cualquier extensión que se coloque allí será visible tanto para el contenedor de la API como para el servidor de desarrollo de Ember, sin necesidad de configurar la unión.

```
cd /path/to/fleetbase/packages
flb scaffold my-extension
```

La CLI le pedirá algunos detalles:

* **Nombre de la extensión**: nombre legible para humanos (por ejemplo, "Mi extensión personalizada")
* **Descripción**: resumen breve
* **Autor**: usted o su organización
* **Espacio de nombres**: espacio de nombres de PHP para el backend (por ejemplo,
  `MyOrg\MyExtension`
  )

Luego, la CLI generará la estructura de directorios.

## La estructura generada

```
fleetbase/
├── api/
├── console/
└── packages/
    └── my-extension/
        ├── addon/                 # Adorno de Ember.js
        ├── server/                # Paquete de backend de Laravel de PHP
        ├── extension.json         # Manifiesto de la extensión
        ├── package.json
        ├── composer.json
        └── README.md
```

Vacío pero completamente funcional — listo para vincular.

## Vincular para el desarrollo

Los mecanismos del lado de la plataforma — montajes de volúmenes de Docker, las dos rutas para el servidor de desarrollo de Ember, Octane reload — están cubiertos una vez en
[Configuración de desarrollo → Comienza](https://fleetbase.io/docs/platform/quickstart/development-setup#frontend-development)
. Asegúrese de que la plataforma esté en funcionamiento antes de continuar.

### Vincule el paquete de backend

En
`fleetbase/api/composer.json`
, agregue una entrada de repositorio que apunte al directorio
`server/`
de su extensión y requiera el paquete:

```
{
  "repositories": [
    { "type": "path", "url": "../packages/my-extension/server" }
  ],
  "require": {
    "my-org/my-extension-api": "*"
  }
}
```

Resolva dentro del contenedor en ejecución:

```
docker compose exec application composer install
docker compose exec application bash -c "./deploy.sh"
```

### Vincule el adorno

**Construya el adorno primero.**
Antes de que pnpm pueda resolver una
`link:`
dependencia, el paquete vinculado debe tener su propio
`node_modules`
poblado. Omita esto y
`pnpm install`
(o
`pnpm build`
) en la consola fallará con errores de módulo faltantes.

```
cd packages/my-extension
pnpm install
```

Luego, en
`fleetbase/console/package.json`
, agregue una dependencia
`link:`
que apunte a la raíz de la extensión (el adorno está en la raíz del paquete, no dentro
`addon/`
):

```
{
  "dependencies": {
    "@my-org/my-extension-engine": "link:../packages/my-extension"
  }
}
```

Instale en la consola:

```
cd PuntoShop-TMS/console
pnpm install
```

## Ejecutar

Siga
[Configuración de desarrollo → Desarrollo del frontend](https://fleetbase.io/docs/platform/quickstart/development-setup#frontend-development)
para iniciar el servidor de desarrollo. Cualquiera de las rutas funciona:

* **Ruta A**
  — Servidor de desarrollo de Ember a través de
  `Dockerfile.server-build`
* **Ruta B**
  — Servidor de desarrollo de Ember local (
  `pnpm start:dev`
  en
  `console/`
  )

La consola se reinicia cuando realiza cambios en el adorno
`addon/`
. Los cambios en el código de
`server/`
necesitan un reinicio de Octane:

```
docker compose exec application php artisan octane:reload
```

Abra
`http://localhost:4200`
— su extensión aparecerá en la barra lateral. Al hacer clic en ella se carga la ruta predeterminada de su motor.

Está listo para comenzar con
[Desarrollo del backend](https://fleetbase.io/docs/extension-development/backend/service-provider)
y
[Desarrollo del frontend](https://fleetbase.io/docs/extension-development/frontend/routing)
.

[Desarrollo de extensiones

Cree extensiones personalizadas para Fleetbase. Agregue funciones, integraciones y módulos completos utilizando la arquitectura de servicio Universe en @fleetbase/ember-core y la capa de paquetes de Laravel en fleetbase/core-api.](https://fleetbase.io/docs/extension-development)
[Anatomía de la extensión

Un recorrido por una extensión de Fleetbase escenificada — addon/, server/, extension.json, y los puntos de entrada clave (addon/extension.js, el motor, el proveedor de servicios).](https://fleetbase.io/docs/extension-development/getting-started/extension-anatomy)