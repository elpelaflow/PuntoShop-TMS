---
title: "Configuración del entorno de desarrollo"
url: https://fleetbase.io/docs/platform/quickstart/development-setup
module: platform
---

# Configuración del entorno de desarrollo

Configura un entorno de desarrollo de Fleetbase: monta la fuente original, enlaza los paquetes y trabaja con extensiones con recarga automática.

# Configuración del entorno de desarrollo

Esta guía está destinada a los contribuyentes y desarrolladores de extensiones que necesitan trabajar directamente con el código fuente de Fleetbase o enlazar un paquete local a una instancia en ejecución. Si simplemente quieres ejecutar Fleetbase localmente sin modificar su funcionamiento interno, consulta
[Ejecución local](https://fleetbase.io/docs/platform/quickstart/running-locally)
en su lugar.

## Requisitos previos

* **Docker**
  versión 20.10+ y
  **Docker Compose**
  versión 2.0+
* **Git**
  con soporte para submódulos
* **Node.js**
  versión 18+ y
  **pnpm**
  — para ejecutar la consola localmente fuera de Docker
* **PHP**
  versión 8.1+ y
  **Composer**
  — para trabajar con paquetes en el backend fuera de Docker

## Clonar con submódulos

El repositorio de Fleetbase utiliza submódulos de Git para sus paquetes. La configuración del entorno de desarrollo requiere que se extraigan todos los submódulos para que el
`directorios/`
contenga la fuente original:

```
git clone https://github.com/elpelaflow/PuntoShop-TMS.git
cd PuntoShop-TMS
git submodule update --init --recursive
```

Esto llena
`directorios/`
con la fuente para las extensiones centrales del TMS (Fleet-Ops, Ledger, Dev Engine e IAM Engine). Cada paquete contiene dos directorios:

| Directorio | Contenido |
|---|---|
| `addon/` | Código del addon de Ember.js |
| `server/` | Paquete de backend de Laravel (proveedor de servicios, modelos, rutas, migraciones) |

## Enlace de paquetes

Fleetbase incluye un enlazador de desarrollo en el repositorio para que no tengas que editar manualmente
`console/package.json`,
`api/composer.json`
y
`console/pnpm-workspace.yaml`
cada vez que cambies el trabajo de la extensión. Úsalo cuando quieras que un paquete local en
`packages/`
reemplace el paquete publicado del registro.

El enlazador gestiona ambos lados de la extensión:

* el motor Ember utilizado por la consola
* el paquete de Laravel utilizado por la API
* paquetes de frontend compartidos como
  `ember-core`,
  `ember-ui`
  y
  `fleetops-data`
* paquetes compartidos de backend solamente como
  `core-api`

Instálalo una vez desde la raíz del repositorio de Fleetbase:

```
npm link
```

Después de enlazar, el comando
`flb-package-linker`
está disponible globalmente:

```
flb-package-linker --help
flb-package-linker list
flb-package-linker status
```

Si no quieres instalar el comando globalmente, ejecútalo directamente:

```
node scripts/package-linker.mjs status
```

### Enlaza Fleet-Ops para el desarrollo

El desarrollo de Fleet-Ops normalmente necesita la extensión Fleet-Ops más los paquetes compartidos de Ember en los que depende. Desde la raíz del repositorio:

```
flb-package-linker enable fleetops --shared ember-core ember-ui fleetops-data
flb-package-linker install fleetops
```

Esto actualiza los manifiestos locales e imprime los comandos de instalación que se ejecutarían:

```
cd console && pnpm install
cd api && composer update fleetbase/fleetops-api --with-dependencies
```

Utiliza
`--install`
si quieres que el enlazador ejecute esos comandos inmediatamente:

```
flb-package-linker enable fleetops --shared ember-core ember-ui fleetops-data --install
```

### Enlaza múltiples extensiones

Pasa más de un nombre de extensión para habilitarlas o deshabilitarlas juntas:

```
flb-package-linker enable fleetops ledger --shared ember-core ember-ui fleetops-data
flb-package-linker install fleetops ledger
```

El comando de instalación combina los paquetes de Composer de backend en una sola actualización:

```
cd api && composer update fleetbase/fleetops-api fleetbase/ledger-api --with-dependencies
```

### Enlaza paquetes compartidos

Cuando trabajes en paquetes de Ember compartidos, enlaza estos a través del espacio de trabajo de la consola en lugar de editar cada extensión manualmente:

```
flb-package-linker enable-shared ember-core ember-ui fleetops-data
flb-package-linker install
```

El enlazador añade estos paquetes a
`console/pnpm-workspace.yaml`,
establece
`linkWorkspacePackages: deep`,
habilita la preferencia del espacio de trabajo y escribe las sobrecargas de pnpm del espacio de trabajo. Esto es importante porque los motores Ember pueden, de lo contrario, resolver sus propias copias anidadas de un paquete compartido, lo que hace que los cambios locales parezcan ignorados.

Para el trabajo de paquetes de backend solamente, enlaza Core API de la misma manera:

```
flb-package-linker enable-shared core-api
flb-package-linker install core-api
```

### Inspecciona y deshace los enlaces

Comprueba el estado actual de enlace local:

```
flb-package-linker status
flb-package-linker doctor
```

`doctor`
verifica los enlaces de símbolos instalados y informa sobre versiones de paquetes de Fleetbase duplicadas en el archivo de bloqueo de pnpm.

Si solo quieres deshacer enlaces específicos, desactívalos por nombre:

```
flb-package-linker disable fleetops ledger
flb-package-linker disable-shared ember-core ember-ui fleetops-data core-api
flb-package-linker install fleetops ledger core-api
```

Para restablecer completamente todos los enlaces de desarrollo gestionados por el enlazador, utiliza
`reset`
:

```
flb-package-linker reset --dry-run
flb-package-linker reset
flb-package-linker install
```

El dry run muestra primero los cambios del manifiesto. El restablecimiento real restaura las extensiones y paquetes compartidos enlazados a sus rangos originales del registro, elimina las entradas de repositorio de Composer, elimina las entradas de pnpm del espacio de trabajo y las sobrecargas, y vacía
`.fleetbase-dev-links.json`
una vez que esté vacío.

El enlazador almacena los rangos de dependencia originales en
`.fleetbase-dev-links.json`
para que los cambios puedan deshacerse. Este archivo está destinado al estado de desarrollo local y debe permanecer fuera de los commits.

Los comandos anteriores esperan la disposición actual del monorepo donde
`console/`,
`api/`
y
`packages/`
están uno al lado del otro. Ejecuta
`flb-package-linker list`
para ver qué paquetes se reconocen como extensiones y qué dependencias compartidas de desarrollo se pueden enlazar.

## Desarrollo backend

### Monta la fuente en Docker

Para trabajar con la API o los paquetes con fuente original, añade los montajes de volumen en
`docker-compose.override.yml`
para que los archivos locales se utilicen directamente en los contenedores que se ejecutan:

```
services:
  application:
    environment:
      ENVIRONMENT: "development"
      APP_DEBUG: "true"
    volumes:
      - ./api:/fleetbase/api
      - ./packages:/fleetbase/packages
```

Después de actualizar el archivo de sobreescritura, reinicia el stack:

```
docker compose up -d
```

### Enlaces de paquetes backend manuales

El enlazador de paquetes es el flujo de trabajo recomendado, pero la configuración de Composer es sencilla. Para desarrollar un paquete de backend manualmente, añade una entrada
`path`
en
`api/composer.json`
para cada paquete. Composer sincronizará el directorio local con el árbol de dependencias:

```
{
  "repositories": [
    { "type": "path", "url": "../packages/fleetops", "options": { "symlink": true } },
    { "type": "path", "url": "../packages/ledger", "options": { "symlink": true } },
    { "type": "path", "url": "../packages/core-api", "options": { "symlink": true } }
  ]
}
```

Luego ejecuta Composer dentro del contenedor de la aplicación para resolver los enlaces:

```
docker compose exec application composer install
```

Después de que Composer instale, ejecuta el script de despliegue para aplicar cualquier nueva migración de los paquetes enlazados:

```
docker compose exec application bash -c "./deploy.sh"
```

Después de que se ejecute el script de despliegue, ejecuta las migraciones directamente:

```
docker compose exec application php artisan migrate
```

### Cambios de Octane y PHP

Fleetbase ejecuta Laravel Octane, que mantiene la aplicación en memoria para el rendimiento.
**Los cambios en los archivos de PHP no se detectan automáticamente.**
Después de editar cualquier archivo de PHP, recarga el trabajador de Octane:

```
docker compose exec application php artisan octane:reload
```

Si añades nuevas migraciones, ejecútalas directamente:

```
docker compose exec application php artisan migrate
```

## Desarrollo frontend

Hay dos caminos para el desarrollo frontend: ejecutar el servidor de desarrollo de Ember dentro de un contenedor, o ejecutarlo directamente en tu máquina. Ambos te proporcionan recarga automática y recarga en vivo en los cambios de archivo.

### Camino A — Docker (Dockerfile.server-build)

`Dockerfile.server-build`
ejecuta
`ember serve`
dentro de un contenedor en lugar de realizar una construcción de producción. Esto es útil si quieres mantener todo en Docker sin instalar Node localmente.

Supervisa el servicio de la consola en
`docker-compose.override.yml`
para construir desde el Dockerfile de desarrollo y montar tu fuente local:

```
services:
  console:
    build:
      context: ./console
      dockerfile: Dockerfile.server-build
    volumes:
      - ./console:/console
      - /console/node_modules
    ports:
      - "4200:4200"
```

Luego reconstruye y inicia el contenedor de la consola:

```
docker compose up -d
```

La consola estará disponible en
`http://localhost:4200`
con recarga en vivo en los cambios dentro de
`./console/`
.

### Camino B — Servidor de desarrollo de Ember local

Detén el contenedor de la consola y ejecuta el servidor de desarrollo de Ember directamente en tu máquina:

```
docker compose stop console
cd console
pnpm install
pnpm start:dev
```

La consola estará disponible en
`http://localhost:4200`
. Este es el flujo de trabajo más rápido: el servidor de desarrollo supervisa
`console/`,
`packages/*/addon/`
y cualquier paquete enlazado, y recarga en vivo en los cambios.

Asegúrate de que
`console/environments/.env.development`
apunte a tu contenedor de API en ejecución antes de iniciar:

```
API_HOST=http://localhost:8000
```

### Enlace de paquetes compartidos

Cuando trabajes en paquetes de Ember compartidos, enlaza estos a través del espacio de trabajo de la consola en lugar de editar cada extensión manualmente:

```
flb-package-linker enable-shared ember-core ember-ui fleetops-data
flb-package-linker install
```

El enlazador añadirá estos paquetes a
`console/pnpm-workspace.yaml`,
establecerá
`linkWorkspacePackages: deep`,
habilitará la preferencia del espacio de trabajo y escribirá las sobrecargas de pnpm del espacio de trabajo. Esto es importante porque los motores Ember pueden, de lo contrario, resolver sus propias copias anidadas de un paquete compartido, lo que hace que los cambios locales parezcan ignorados.

Para el trabajo de paquetes de backend solamente, enlaza Core API de la misma manera:

```
flb-package-linker enable-shared core-api
flb-package-linker install core-api
```

### Inspecciona y deshace los enlaces

Comprueba el estado de enlace local actual:

```
flb-package-linker status
flb-package-linker doctor
```

`doctor`
verifica los enlaces de símbolos instalados y informa sobre versiones de paquetes de Fleetbase duplicadas en el archivo de bloqueo de pnpm.

Si solo quieres deshacer enlaces específicos, desactívalos por nombre:

```
flb-package-linker disable fleetops ledger
flb-package-linker disable-shared ember-core ember-ui fleetops-data core-api
flb-package-linker install fleetops ledger core-api
```

Para restablecer completamente todos los enlaces de desarrollo gestionados por el enlazador, utiliza
`reset`
:

```
flb-package-linker reset --dry-run
flb-package-linker reset
flb-package-linker install
```

El dry run muestra primero los cambios del manifiesto. El restablecimiento real restaura las extensiones y paquetes compartidos enlazados a sus rangos originales del registro, elimina las entradas de repositorio de Composer, elimina las entradas de pnpm del espacio de trabajo y las sobrecargas, y vacía
`.fleetbase-dev-links.json`
una vez que esté vacío.

El enlazador almacena los rangos de dependencia originales en
`.fleetbase-dev-links.json`
para que los cambios puedan deshacerse. Este archivo está destinado al estado de desarrollo local y debe permanecer fuera de los commits.

Los comandos anteriores esperan la disposición actual del monorepo donde
`console/`,
`api/`
y
`packages/`
están uno al lado del otro. Ejecuta
`flb-package-linker list`
para ver qué paquetes se reconocen como extensiones y qué dependencias compartidas de desarrollo se pueden enlazar.

```
docker compose exec console pnpm install
```

O localmente (Ruta B):

```
cd console
pnpm install
```

## Trabajando en un Paquete

Una vez que los volúmenes estén montados y los paquetes estén enlazados, el flujo de trabajo típico para editar un paquete de extensión es el siguiente:

**Cambios en el backend**
(PHP —
`packages/your-package/server/`
)

Edite los archivos PHP directamente. Después de guardarlos, vuelva a cargar Octane para que el trabajador reciba los cambios:

```
docker compose exec application php artisan octane:reload
```

Si agrega nuevas migraciones, ejecute directamente:

```
docker compose exec application php artisan migrate
```

**Cambios en el frontend**
(Ember —
`packages/your-package/addon/`
)

El servidor de desarrollo de Ember (ya sea Docker o local) supervisa los addons enlazados y los recarga automáticamente. No se necesitan pasos adicionales.

## Creando una Nueva Extensión

Para crear una nueva extensión desde cero, utilice la CLI de Fleetbase:

```
npm install -g @fleetbase/cli
flb scaffold
```

La CLI se ejecuta de forma interactiva y solicita el nombre de la extensión, la descripción, el autor, el espacio de nombres de PHP y la URL del repositorio. Genera un nuevo paquete con la estructura correcta (
`addon/`
,
`server/`
,
`package.json`
,
`composer.json`
) listo para enlazarse utilizando los pasos anteriores.

También puede pasar opciones directamente para omitir las solicitudes:

```
flb scaffold --name my-extension --namespace "MyCompany\\MyExtension"
```

Consulte la
[referencia del comando flb scaffold](https://fleetbase.io/docs/cli/extension-development/scaffold)
para todas las opciones disponibles, y la
[Guía rápida para el desarrollo de extensiones](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
para una guía completa sobre la creación y registro de una nueva extensión.

## Licencia

Fleetbase está licenciado bajo la
**GNU Affero General Public License v3 (AGPL-3.0)**
. Si modifica Fleetbase o crea extensiones que se ejecutan como parte de un servicio en red, la AGPL requiere que haga que su código fuente modificado esté disponible públicamente para los usuarios de ese servicio.

Si tiene la intención de mantener sus modificaciones o extensiones privadas (por ejemplo, como parte de un producto comercial o una plataforma interna), necesitará una
**licencia comercial**.
[Reserva una llamada](https://cal.com/shivthakker/enquiry)
para discutir las opciones de licencia, o visite la
[página de licencias](https://fleetbase.io/licensing)
para obtener más información.