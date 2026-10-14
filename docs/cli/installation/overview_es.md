---
title: "Instalar Fleetbase"
url: https://fleetbase.io/docs/cli/installation/overview
module: cli
---

# Instalar Fleetbase

Instale una instancia de Fleetbase auto-hospedada en su propia infraestructura utilizando `flb install-fleetbase` — un asistente interactivo basado en Docker.

# Instalar Fleetbase

```
flb install-fleetbase
```

El comando `install-fleetbase` es un asistente interactivo que clona el repositorio de Fleetbase, crea un
`docker-compose.override.yml`
adaptado a su entorno, genera credenciales seguras, inicia los contenedores y ejecuta el script de despliegue — todo en un solo paso.

## Requisitos previos

El asistente verifica si están instaladas estas herramientas y aborta si alguna falta:

* **Docker**
* **Docker Compose v2**
  (el plugin `docker compose`, no el binario legado `docker-compose`)
* **Git**

También verifica los puertos
`8000`,
`4200`,
`3306`
y
`38000`
e imprime advertencias si alguno está en uso.

## Opciones

| Opción | Valor predeterminado | Descripción |
|---|---|---|
| `--host <host>` | `localhost` | Host o dirección IP a la que vincular |
| `--environment <env>` | `development` | `development` o `production` |
| `--directory <path>` | directorio actual | Donde instalar Fleetbase |
| `--non-interactive` | `off` | Saltar las indicaciones opcionales y usar valores predeterminados seguros — útil para CI/CD |

Cualquier cosa que no especifique en la línea de comandos se solicitará de forma interactiva.

## Lo que hace el asistente

El asistente realiza estas fases:

**Verificaciones previas**
— verifica que Docker, Docker Compose v2 y Git estén instalados; verifica que los puertos requeridos estén disponibles.

**Parámetros principales**
— host, entorno, directorio de instalación, nombre de la aplicación.

**Clonar el repositorio**
— ejecuta
`git clone https://github.com/elpelaflow/PuntoShop-TMS.git`
si
`docker-compose.yml`
ya no está presente en el directorio de destino.

**Base de datos**
— elige entre MySQL incorporada (recomendada para el desarrollo) o un servidor MySQL externo (por ejemplo, AWS RDS). Para uno externo, proporcione host/puerto/nombre de base de datos/nombre de usuario/contraseña. Para uno incorporado, el asistente genera automáticamente contraseñas seguras para el usuario raíz y el usuario.

**Correo electrónico**
— configure opcionalmente SMTP, Mailgun, Postmark, SendGrid, Resend o AWS SES. Si lo omite, los correos electrónicos se escriben en el registro de la aplicación.

**Almacenamiento de archivos**
— elija disco local (desarrollo), AWS S3 o Google Cloud Storage. Para S3/GCS, proporcione credenciales y detalles del contenedor.

**Seguridad y CORS**
— `SESSION_DOMAIN` y la lista de origen de SocketCluster se derivan automáticamente de su host. Puede agregar hosts de frontend adicionales para CORS.

**APIs de terceros opcionales**
— IPInfo (geolocalización), Google Maps, Twilio (SMS). Todas son opcionales.

**Generar
`APP_KEY`**
— una nueva clave de cifrado
`base64:`

**Escribir
`docker-compose.override.yml`**
— todos sus valores se guardan en este archivo. Si ya existe, se copia de seguridad en
`docker-compose.override.yml.bak.<timestamp>`

**Escribir la configuración del panel de control**
—
`console/fleetbase.config.json`,
`console/environments/.env.development`
y
`console/environments/.env.production`
se generan en función de su host.

**Iniciar contenedores**
—
`docker compose up -d`
y espera a que la base de datos esté lista (hasta 60 segundos).

**Ejecutar el despliegue**
—
`docker compose exec application bash -c "./deploy.sh"`
ejecuta las migraciones y la configuración inicial.

**Reiniciar**
—
`docker compose up -d`
nuevamente para aplicar todas las configuraciones.

Una vez completado, verá las URLs de la API y del Panel de control impresas en una caja de resumen.

## Ejemplos

### Interactivo (desarrollo)

```
flb install-fleetbase
```

Siga las indicaciones. Los valores predeterminados funcionan para una instalación local en
`localhost`

### Producción con un host específico

```
flb install-fleetbase \
  --host fleetbase.mycompany.com \
  --environment production \
  --directory /opt/fleetbase
```

Aún así, se le pedirá que elija la base de datos, el correo electrónico, el almacenamiento y las APIs de terceros.

### CI / sin intervención

```
flb install-fleetbase \
  --host fleetbase.example.com \
  --environment development \
  --directory ./fleetbase \
  --non-interactive
```

En modo
`--non-interactive`
los pasos opcionales tienen los siguientes valores predeterminados:

* **Base de datos**
  : MySQL incorporada con credenciales generadas automáticamente
* **Correo electrónico**
  : motor de registro
* **Almacenamiento**
  : disco local
* **APIs de terceros**
  : sin
* **Hosts de frontend**
  : ninguno

## Se escriben

Después de que el asistente se ejecute, tendrá estos archivos (los caminos son relativos a su directorio de instalación):

| Camino | Propósito |
|---|---|
| `docker-compose.override.yml` | Sus valores de entorno — `APP_KEY`, configuración de correo electrónico, almacenamiento, claves de API de terceros, credenciales de la base de datos, orígenes de SocketCluster |
| `console/fleetbase.config.json` | Configuración de tiempo de ejecución del panel de control (API\_HOST, SocketCluster) |
| `console/environments/.env.development` | Archivo de entorno del panel de control para desarrollo |
| `console/environments/.env.production` | Archivo de entorno del panel de control para producción |

Para realizar cambios después de la instalación, edite
`docker-compose.override.yml`
y ejecute:

```
docker compose up -d
```

## Puntos finales

Por defecto, después de una instalación exitosa:

| Servicio | URL |
|---|---|
| **API** | `http://<host>:8000` (o `https://` en producción) |
| **Panel de control** | `http://<host>:4200` (o `https://` en producción) |
| **SocketCluster** | puerto `38000` |

Abra la URL del Panel de control en su navegador e inicie el asistente de incorporación para crear su cuenta administrativa inicial.

## Solución de problemas

**El asistente dice que un puerto ya está en uso.**
Libere el puerto (detenga lo que lo está utilizando) o continúe con la advertencia — el asistente continúa. Puede asignar el puerto a un host diferente editando
`docker-compose.override.yml`
después de la instalación.

**El script de despliegue falla.**
El asistente imprime el comando para ejecutarlo manualmente:

```
docker compose exec application bash -c "./deploy.sh"
```

**Se sobrescribió un
`docker-compose.override.yml`
existente.**
El asistente copia de seguridad el archivo anterior en
`docker-compose.override.yml.bak.<timestamp>`
antes de escribir. Restaure desde ese archivo.

**El asistente no puede encontrar Docker Compose v2.**
El CLI utiliza el plugin `docker compose` (con un espacio), no el binario legado `docker-compose`. Actualice Docker Desktop o instale el plugin Compose manualmente.

## Próximos pasos

* Abra la URL del Panel de control e inicie la incorporación
* [Instale su primera extensión](https://fleetbase.io/docs/cli/extensions/install)
* [Registre una cuenta de desarrollador](https://fleetbase.io/docs/cli/account/register)
  si planea publicar sus propias extensiones

[Comandos

Consulte la tabla de todos los comandos de la CLI de Fleetbase con una descripción de una línea y un enlace a su página.](https://fleetbase.io/docs/cli/getting-started/commands)
[Registrarse

Cree una cuenta de desarrollador de Fleetbase Registry usando `flb register` para poder publicar sus propias extensiones.](https://fleetbase.io/docs/cli/account/register)