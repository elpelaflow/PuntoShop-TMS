---
title: "Ejecución local"
url: https://fleetbase.io/docs/platform/quickstart/running-locally
module: platform
---

# Ejecución local

Ejecute la pila completa de Fleetbase en su máquina local utilizando Docker Compose, para evaluación, pruebas y uso local.

# Ejecución local

Fleetbase viene con un
`docker-compose.yml`
que inicia toda la pila, incluyendo la API, la consola, la base de datos, Redis, SocketCluster, los trabajadores de la cola y el programador, con un solo comando. Esta es la configuración recomendada para el desarrollo y las pruebas locales.

## Requisitos previos

Antes de comenzar, asegúrese de tener lo siguiente instalado:

* **Docker**
  versión 20.10+ y
  **Docker Compose**
  versión 2.0+ —
  [Instale Docker](https://docs.docker.com/get-docker/)
* **Git**
  — para clonar el repositorio
* **Node.js**
  versión 18+ y
  **npm**
  — requerido si utiliza el método de la CLI
* Al menos
  **4 GB de RAM**
  asignados a Docker y
  **10 GB de espacio libre en disco**

## Instalación

CLI (Recomendado)

Docker Compose

Guion de shell

La CLI de Fleetbase es la forma más rápida. Maneja la clonación, la configuración y el inicio, incluyendo la ejecución del script de despliegue, de forma interactiva.

```
npm install -g @fleetbase/cli
flb install-fleetbase
```

La CLI le pedirá:

* **Host**
  — use
  `localhost`
  para el acceso local únicamente
* **Entorno**
  — elija
  `development`
* **Directorio de instalación**
  — por defecto, una nueva
  `fleetbase/`
  carpeta

La configuración lleva de 3 a 5 minutos. Una vez completado, la CLI imprime las URL para la consola y la API.

Clone el repositorio, inicie la pila y ejecute el script de despliegue:

```
git clone https://github.com/elpelaflow/PuntoShop-TMS.git
cd PuntoShop-TMS
docker compose up -d
```

En la primera ejecución, Docker descarga las imágenes necesarias y construye los contenedores. Espere a que la pila se inicie y luego ejecute el script de despliegue para aplicar las migraciones y configurar la aplicación:

```
docker compose exec application bash -c "./deploy.sh"
```

El repositorio incluye un asistente de instalación que maneja la configuración, inicia la pila y ejecuta el script de despliegue automáticamente:

```
git clone https://github.com/elpelaflow/PuntoShop-TMS.git
cd PuntoShop-TMS
./scripts/docker-install.sh
```

## Servicios y puertos

Una vez que se está ejecutando, la pila expone los siguientes servicios:

| Servicio | URL | Descripción |
|---|---|---|
| **Consola** | <http://localhost:4200> | Interfaz de administración de Ember.js |
| **API** | <http://localhost:8000> | API REST de Laravel |
| **MySQL** | localhost:3306 | Base de datos principal |
| **Redis** | `cache:6379` (solo para uso interno) | Caché y cola de trabajos |
| **SocketCluster** | ws://localhost:38000 | Servidor WebSocket en tiempo real |

Redis no se expone al host. Otros contenedores lo acceden a través de la red Compose en
`cache:6379`. Para inspeccionarlo, ejecute
`redis-cli`
dentro del contenedor con
`docker compose exec cache redis-cli`
.

El contenedor
`httpd`
actúa como un proxy inverso frente a los contenedores de la API y la consola. Los contenedores
`scheduler`
y
`queue`
manejan las tareas cron y el procesamiento de trabajos en segundo plano, respectivamente.

## Verifique que todo esté funcionando

Verifique que todos los contenedores estén en funcionamiento:

```
docker compose ps
```

Todos los servicios deben mostrar un estado de
`Up`
. Si algún contenedor ha terminado, verifique sus registros:

```
docker compose logs -f application
docker compose logs -f console
```

También puede ejecutar comprobaciones de estado rápidas:

```
# Verifique que Redis esté respondiendo
docker compose exec cache redis-cli ping
# Resultado esperado: PONG

# Verifique que MySQL esté en funcionamiento
docker compose exec database mysqladmin -u root ping
# Resultado esperado: mysqld is alive
```

## Configuración inicial

Después de que los contenedores se inician, ejecute el script de despliegue para aplicar las migraciones e inicializar la aplicación:

```
docker compose exec application bash -c "./deploy.sh"
```

Luego, abra
<http://localhost:4200>
en su navegador. Se le pedirá que cree su primera cuenta de administrador y organización.

Si la consola muestra una página en blanco o un error de conexión al iniciar, espere de 30 a 60 segundos para que el contenedor de la API finalice la inicialización, luego actualice.

## Configuración del entorno

Toda la configuración del entorno se gestiona a través de
`docker-compose.override.yml`
para el backend y dos archivos en el
`console/`
directorio para el frontend. Nunca edite
`docker-compose.yml`
directamente; el archivo de sobreescritura es el lugar correcto para toda la configuración local.

Backend

Frontend

Las variables de entorno del backend se establecen en
`services.application.environment`
en
`docker-compose.override.yml`
. El asistente de instalación genera este archivo automáticamente; para configuraciones manuales, cree el suyo.

**Core**

```
services:
  application:
    environment:
      APP_KEY: "base64:su clave generada"   # openssl rand -base64 32
      APP_NAME: "Fleetbase"
      APP_URL: "http://localhost:8000"
      CONSOLE_HOST: "http://localhost:4200"
      ENVIRONMENT: "development"
      APP_DEBUG: "true"
      DATABASE_URL: "mysql://fleetbase:password@database/fleetbase"
      SESSION_DOMAIN: "localhost"
      FRONTEND_HOSTS: ""                      # hosts adicionales de CORS si es necesario
```

**Mail**
— elija un controlador:

```
      # SMTP
      MAIL_MAILER: "smtp"
      MAIL_HOST: "smtp.mailgun.org"
      MAIL_PORT: "587"
      MAIL_USERNAME: "su nombre de usuario"
      MAIL_PASSWORD: "su contraseña"
      MAIL_FROM_ADDRESS: "hello@example.com"
      MAIL_FROM_NAME: "Fleetbase"

      # Mailgun
      MAIL_MAILER: "mailgun"
      MAILGUN_DOMAIN: "mg.example.com"
      MAILGUN_SECRET: "su secreto de Mailgun"

      # Postmark
      MAIL_MAILER: "postmark"
      POSTMARK_TOKEN: "su token de Postmark"

      # SendGrid
      MAIL_MAILER: "sendgrid"
      SENDGRID_API_KEY: "su clave de SendGrid"

      # Resend
      MAIL_MAILER: "resend"
      RESEND_KEY: "su clave de Resend"
```

Para el desarrollo local sin servidor de correo, use
`MAIL_MAILER: "log"`
— los correos electrónicos se escriben en el registro de la aplicación.

**Almacenamiento de archivos**
— elija un controlador:

```
      # AWS S3
      FILESYSTEM_DRIVER: "s3"
      AWS_ACCESS_KEY_ID: "su clave"
      AWS_SECRET_ACCESS_KEY: "su secreto"
      AWS_DEFAULT_REGION: "us-east-1"
      AWS_BUCKET: "su nombre de bucket"
      AWS_URL: ""                              # URL pública CDN opcional
      AWS_USE_PATH_STYLE_ENDPOINT: ""          # establezca en "true" para MinIO/no AWS S3

      # Google Cloud Storage
      FILESYSTEM_DRIVER: "gcs"
      GOOGLE_CLOUD_PROJECT_ID: "su ID de proyecto"
      GOOGLE_CLOUD_STORAGE_BUCKET: "su nombre de bucket"
      GOOGLE_CLOUD_KEY_FILE: "/ruta/a/su/clave.json"
```

Para el desarrollo local, omita
`FILESYSTEM_DRIVER`
— por defecto, utiliza el disco local.

**Servicios de terceros opcionales**

```
      IPINFO_API_KEY: ""          # Geolocalización de IP (ipinfo.io)
      GOOGLE_MAPS_API_KEY: ""     # Mapas y geocodificación
      GOOGLE_MAPS_LOCALE: "us"
      TWILIO_SID: ""              # Notificaciones SMS
      TWILIO_TOKEN: ""
      TWILIO_FROM: ""
```

**Inicio de sesión con OAuth**
— solo necesario si ofrece inicio de sesión con Google, Microsoft, GitHub o Apple. Normalmente, los proveedores se configuran en
**Administrador → Configuración de autenticación → Inicio de sesión con OAuth**
; configure esto cuando la URL pública de la API difiere de
`APP_URL`
:

```
      OAUTH_REDIRECT_BASE: ""     # origen público de la API, por ejemplo, https://api.example.com
```

Consulte
[Inicio de sesión con OAuth](https://fleetbase.io/docs/platform/system-setup/oauth-sign-in)
para obtener la lista completa de variables.

**WebSocket**
— establezca esto en el servicio
`socket`
, no en
`application`
:

```
  socket:
    environment:
      SOCKETCLUSTER_OPTIONS: '{"origins":"http://localhost:*,ws://localhost:*"}'
```

Después de modificar cualquier valor en
`docker-compose.override.yml`
, reinicie los servicios afectados:

```
docker compose up -d
```

La consola se configura a través de dos archivos en el directorio
`console/`
. Estos se generan en tiempo de compilación (
`.env.*`
) y se leen en tiempo de ejecución (
`fleetbase.config.json`
).

**`console/fleetbase.config.json`**
— configuración de tiempo de ejecución cargada por la aplicación Ember:

```
{
  "API_HOST": "http://localhost:8000",
  "SOCKETCLUSTER_HOST": "localhost",
  "SOCKETCLUSTER_PORT": "38000",
  "SOCKETCLUSTER_SECURE": "false"
}
```

> El archivo
> `fleetbase.config.json`
> está deshabilitado en los entornos de producción de forma predeterminada. Para habilitarlo en producción, establezca
> `DISABLE_RUNTIME_CONFIG=false`
> en el contenedor de la consola.

**`console/environments/.env.development`**
— se utiliza durante las compilaciones locales:

```
API_HOST=http://localhost:8000
API_NAMESPACE=int/v1
API_SECURE=false
SOCKETCLUSTER_PATH=/socketcluster/
SOCKETCLUSTER_HOST=localhost
SOCKETCLUSTER_PORT=38000
OSRM_HOST=https://router.project-osrm.org
```

**`console/environments/.env.production`**
— se utiliza para las compilaciones de producción (reemplace con su dominio):

```
API_HOST=https://yourdomain.com:8000
API_NAMESPACE=int/v1
API_SECURE=true
SOCKETCLUSTER_PATH=/socketcluster/
SOCKETCLUSTER_HOST=yourdomain.com
SOCKETCLUSTER_PORT=38000
OSRM_HOST=https://router.project-osrm.org
```

Después de editar estos archivos, reinicie el contenedor de la consola para aplicar los cambios:

```
docker compose up -d
```

## Próximos pasos

Ahora que Fleetbase se está ejecutando localmente, puede:

* **[Configuración del sistema](https://fleetbase.io/docs/platform/system-setup/services)**
  — Configure el correo electrónico, el almacenamiento y otros servicios.
* **[Desarrollo de extensiones](https://fleetbase.io/docs/extension-development/getting-started/quickstart)**
  — Cree y ejecute una extensión personalizada en su instancia local.
* **[Consola de desarrollador → Claves de API](https://fleetbase.io/docs/platform/developer-console/api-keys)**
  — Genere una clave y realice su primera llamada a la API.
* **[Despliegue en la nube](https://fleetbase.io/docs/platform/quickstart/deploy-in-cloud)**
  — Cuando esté listo, despliegue esta misma configuración en un servidor de producción.