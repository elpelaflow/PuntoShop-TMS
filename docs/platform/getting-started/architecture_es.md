---
título: "Arquitectura"
url: https://fleetbase.io/docs/platform/getting-started/architecture
módulo: plataforma
---

# Arquitectura

Cómo está estructurado Fleetbase: la API backend, la consola Ember.js, el motor en tiempo real, el sistema de extensiones y los requisitos de infraestructura.

# Arquitectura

Fleetbase sigue una
**arquitectura modular, basada en la API**,
con una clara separación entre la capa de API backend, la consola frontend y el sistema de eventos en tiempo real. Las extensiones se integran tanto en el backend como en el frontend, lo que convierte a cada módulo en una parte fundamental de la plataforma, en lugar de una integración externa.

## Visión general de alto nivel

```
┌─────────────────────────────────────────────────────────────┐
│                  Consola de Fleetbase (Ember.js)               │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌─────────┐  │
│  │ FleetOps  │  │  Ledger   │  │    IAM    │  │  Dev    │  │
│  │  Engine   │  │  Engine   │  │  Engine   │  │ Console │  │
│  └───────────┘  └───────────┘  └───────────┘  └─────────┘  │
│         Motores Ember — módulos aislados y de carga diferida        │
└────────────────────────┬────────────────────────────────────┘
                         │ API REST + WebSocket
┌────────────────────────▼────────────────────────────────────┐
│                  API de Fleetbase (Laravel/PHP)                 │
│  ┌─────────────┐  ┌────────────┐  ┌─────────────────────┐  │
│  │ core-api    │  │fleetops-api│  │     ledger-api      │  │
│  │  (paquete)  │  │ (paquete)  │  │      (paquete)      │  │
│  └─────────────┘  └────────────┘  └─────────────────────┘  │
│         Proveedores de servicios de Laravel — registrados por paquete  │
└──────────┬────────────────────────────────────┬────────────┘
           │                                    │
     ┌─────▼──────┐   ┌──────────────┐   ┌────▼──────────┐
     │  MySQL 8.0 │   │  Redis       │   │ Almacenamiento S3 │
     │ (base de datos) │   │ (caché/cola)│   │ (archivos/medios) │
     └────────────┘   └──────────────┘   └───────────────┘
```

La consola se comunica con la API exclusivamente a través de HTTP y WebSocket; no hay memoria compartida ni acceso directo a la base de datos entre las dos capas. Esto significa que la API se puede escalar de forma independiente, y las interfaces de usuario alternativas (aplicaciones móviles, paneles personalizados) pueden consumir los mismos puntos finales de la API.

## Backend — API de Laravel

El backend de Fleetbase es una
**aplicación PHP de Laravel**
estructurada como un repositorio monorepo de Composer. Tanto la plataforma principal como cada extensión se distribuyen como paquetes separados de Composer que se instalan en una única aplicación de Laravel.

### Paquete principal: fleetbase/core-api

El
`core-api`
es la base. Proporciona:

* **Autenticación**
  — Autenticación de API basada en tokens. Cada solicitud autentica mediante una clave API (generada en la Consola de Desarrollador) o un token de sesión.
* **Multitenancy**
  — Todos los modelos de la plataforma están enmarcados a nivel de consulta en organizaciones. Los datos de una organización nunca están disponibles para otra, y esto se aplica a la capa de modelos Eloquent.
* **Convenciones de API REST**
  — Modelado de recursos, filtrado, paginación y manejo de relaciones consistentes en todas las entidades.
* **Motor de eventos web**
  — Gestión de suscripciones de eventos, entrega fiable con lógica de reintento, verificación de firmas y registros de entrega.
* **Procesamiento de trabajos en segundo plano**
  — Sistema de cola basado en Redis para operaciones asíncronas (entrega de webhooks, notificaciones, generación de informes).
* **Integración WebSocket**
  — Gestión de canales SocketCluster para la publicación de eventos en tiempo real.
* **IAM**
  — Gestión de usuarios, roles, permisos, grupos, organizaciones y políticas.
* **API de la Consola de Desarrollador**
  — Puntos finales para la gestión de claves API, el almacenamiento de registros de solicitudes y el seguimiento de eventos.

### Paquetes de extensión

Cada extensión de primera parte añade su propio paquete de Laravel que se registra mediante un Proveedor de Servicios:

| Paquete | Proporciona |
|---|---|
| `fleetbase/fleetops-api` | Órdenes, conductores, vehículos, flotas, rutas, eventos de seguimiento, prueba de entrega |
| `fleetbase/ledger-api` | Facturas, facturación, libro mayor, registros financieros, liquidación de transacciones |
| `fleetbase/dev-engine` | Claves API, webhooks, registros de desarrollador y utilidades de integración |
| `fleetbase/iam-engine` | Multiempresa, gestión de usuarios, roles, permisos y seguridad |

Cada paquete sigue el mismo patrón: un Proveedor de Servicios que registra rutas, modelos, políticas y escuchas de eventos en la aplicación de Laravel anfitriona.

### Estructura de la API

```
api/
├── app/                   # Arranque de la aplicación principal
├── config/                # Configuración basada en el entorno
├── database/migrations/   # Migraciones principales de la plataforma
└── public/index.php       # Punto de entrada (servido por Caddy/Nginx)
```

La API se sirve mediante
**Laravel Octane en un servidor Caddy**
en producción, lo que proporciona trabajadores PHP persistentes de alto rendimiento que eliminan la sobrecarga de inicio en frío en cada solicitud.

¿Está planeando una implementación de producción autoalojada o en las instalaciones? Consulte
[Dimensionamiento de la infraestructura](https://fleetbase.io/docs/platform/quickstart/infrastructure-sizing)
para la topología HA recomendada, la hoja de cálculo, los perfiles de carga y las fórmulas de almacenamiento.

### Autenticación

Todas las solicitudes de la API autentican utilizando uno de los dos mecanismos:

* **Clave API**
  — Una pareja de clave pública/secreta generada por organización en la Consola de Desarrollador. Se utiliza la clave secreta para las solicitudes entre servidores; la clave pública para las solicitudes desde navegadores/aplicaciones con un alcance limitado.
* **Token de sesión**
  — Tokens de sesión emitidos al iniciar sesión en la consola, utilizados para la comunicación entre la consola y la API.

Los usuarios de la consola se inician sesión con una contraseña o, cuando un administrador lo ha configurado, con una cuenta de Google, Microsoft, GitHub o Apple — consulte
[Inicio de sesión con OAuth](https://fleetbase.io/docs/platform/system-setup/oauth-sign-in)
. De cualquier forma, la consola termina obteniendo un token de sesión.

Nunca exponga su clave API secreta en el código del lado del cliente o en repositorios públicos. Rotee las claves inmediatamente si se comprometen.

## Frontend — Consola Ember.js

La Consola de Fleetbase está construida con
**Ember.js**
— un marco de JavaScript optimizado para aplicaciones web ambiciosas y de larga duración. La consola utiliza una arquitectura modular donde cada extensión se monta como un
**Motor Ember**
.

### Bibliotecas principales

| Paquete | Rol |
|---|---|
| `@fleetbase/ember-core` | Servicios centrales, adaptadores, utilidades y el Servicio Universo |
| `@fleetbase/ember-ui` | Biblioteca de componentes compartida — botones, tablas, modales, formularios, mapas |

### Motores Ember

Un Motor Ember es una aplicación Ember autocontenida que se ejecuta dentro de la consola. Cada extensión envía su interfaz de usuario como un motor:

* **Enrutamiento aislado**
  — Cada motor define sus propias rutas en su propio espacio de nombres (por ejemplo,
  `/console/fleet-ops/...`
  )
* **Servicios compartidos**
  — Los motores declaran qué servicios anfitriona necesitan (
  `store`
  ,
  `fetch`
  ,
  `universe`
  ,
  `notifications`
  ) y los reciben del sistema de consola al montar.
* **Carga perezosa**
  — Los motores se cargan bajo demanda cuando un usuario navega a esa extensión, manteniendo el tamaño inicial del paquete pequeño

La estructura del directorio de la consola:

console/

app/

environments/

lib/

fleetbase.config.json

ember-cli-build.js

tailwind.config.js

package.json

### El Servicio Universo

El
**Servicio Universo**
(
`@fleetbase/ember-core`
) es el registro de extensibilidad central para la consola. Cuando un motor de extensión se inicializa, llama al Servicio Universo para registrar sus elementos de la interfaz de usuario:

* Elementos del menú lateral y enlaces de paneles
* Widgets del panel
* Secciones de configuración
* Componentes y ayudas de plantilla personalizados
* Integración en eventos de ciclo de vida

Esto permite que las extensiones aparezcan sin problemas dentro de la consola sin modificar la aplicación principal. Consulte la
[documentación de desarrollo de extensiones](https://fleetbase.io/docs/extension-development/universe/overview)
para obtener detalles completos.

## Motor de tiempo real — SocketCluster

Fleetbase utiliza
**SocketCluster**
— un marco de WebSocket para Node.js — para potenciar todas las funciones en tiempo real: el seguimiento en vivo de los conductores, las actualizaciones del estado de los pedidos, los mensajes de chat y los disparadores de notificaciones push.

### Nombres de canales

Los canales siguen el patrón
`{tipo_de_recurso}.{id_de_recurso}`
. Los identificadores de recursos de Fleetbase están precedidos por el tipo de recurso, por lo que un nombre de canal completo tiene la siguiente apariencia:

```
driver.driver_d389234         # Actualizaciones de ubicación y estado del conductor
order.order_ghs8432           # Actualizaciones de estado y actividad del pedido
vehicle.vehicle_k219asd       # Actualizaciones de telemetría del vehículo
chat.chat_room_xp23lq         # Mensajes de la sala de chat
organization.organization_9kd2   # Eventos a nivel de organización
```

### Eventos comunes

| Canal | Evento | Payload |
|---|---|---|
| `driver.driver_{id}` | `driver.location_changed` | `{ latitude, longitude, heading, speed }` |
| `order.order_{id}` | `order.status_updated` | `{ status, updated_at, updated_by }` |
| `order.order_{id}` | `order.driver_assigned` | `{ driver_id, driver_name }` |
| `driver.driver_{id}` | `driver.assigned` | `{ order_id, pickup, dropoff }` |

Puede suscribirse a estos canales utilizando el SDK de Fleetbase JS o cualquier cliente compatible con SocketCluster. El servidor de socket escucha en el puerto
`38000`
y es accesible en la ruta
`/socketcluster/`
. Configure y supervise las suscripciones activas en
[Consola de Desarrollador → Eventos de Socket](https://fleetbase.io/docs/platform/developer-console/socket-events)
.

## Sistema de extensiones

Cada extensión de Fleetbase tiene una
**arquitectura dual**
— un paquete backend y un motor frontend que trabajan juntos. Este es el patrón seguido por todas las extensiones de primera parte y que se refuerza mediante el esquema de desarrollo de extensiones.

**Paquete backend (Laravel)**

El lado del servidor de una extensión vive en un directorio
`server/`
. Es un paquete de Composer estándar que:

* Registra un Proveedor de Servicios de Laravel en la aplicación anfitriona
* Define migraciones de base de datos y modelos de Eloquent
* Expone rutas de API en el espacio de nombres de la extensión (por ejemplo,
  `/fleet-ops/v1/...`
  )
* Registra escuchas de eventos y trabajos en segundo plano

### Paquete principal: fleetbase/core-api

El
`core-api`
es la base. Proporciona:

* **Autenticación**
  — Autenticación de API basada en tokens. Cada solicitud autentica mediante una clave API (generada en la Consola de Desarrollador) o un token de sesión.
* **Multitenancy**
  — Todos los modelos de la plataforma están enmarcados a nivel de consulta en organizaciones. Los datos de una organización nunca están disponibles para otra, y esto se aplica a la capa de modelos Eloquent.
* **Convenciones de API REST**
  — Modelado de recursos, filtrado, paginación y manejo de relaciones consistentes en todas las entidades.
* **Motor de eventos web**
  — Gestión de suscripciones de eventos, entrega fiable con lógica de reintento, verificación de firmas y registros de entrega.
* **Procesamiento de trabajos en segundo plano**
  — Sistema de cola basado en Redis para operaciones asíncronas (entrega de webhooks, notificaciones, generación de informes)
* **Integración WebSocket**
  — Gestión de canales SocketCluster para la publicación de eventos en tiempo real.
* **IAM**
  — Gestión de usuarios, roles, permisos, grupos, organizaciones y políticas.
* **API de la Consola de Desarrollador**
  — Puntos finales para la gestión de claves API, el almacenamiento de registros de solicitudes y el seguimiento de eventos

### Paquetes de extensión

Cada extensión de primera parte añade su propio paquete de Laravel que se registra mediante un Proveedor de Servicios:

| Paquete | Proporciona |
|---|---|
| `fleetbase/fleetops-api` | Órdenes, conductores, vehículos, flotas, rutas, eventos de seguimiento, prueba de entrega |
| `fleetbase/ledger-api` | Facturas, facturación, libro mayor, registros financieros, liquidación de transacciones |
| `fleetbase/dev-engine` | Claves API, webhooks, registros de desarrollador y utilidades de integración |
| `fleetbase/iam-engine` | Multiempresa, gestión de usuarios, roles, permisos y seguridad |

Cada paquete sigue el mismo patrón: un Proveedor de Servicios que registra rutas, modelos, políticas y escuchas de eventos en la aplicación de Laravel anfitriona.

### Estructura de la API

```
api/
├── app/                   # Arranque de la aplicación principal
├── config/                # Configuración basada en el entorno
├── database/migrations/   # Migraciones principales de la plataforma
└── public/index.php       # Punto de entrada (servido por Caddy/Nginx)
```

La API se sirve mediante
**Laravel Octane en un servidor Caddy**
en producción, lo que proporciona trabajadores PHP persistentes de alto rendimiento que eliminan la sobrecarga de inicio en frío en cada solicitud.

¿Está planeando una implementación autoalojada o en las instalaciones de producción? Consulte
[Dimensionamiento de la infraestructura](https://fleetbase.io/docs/platform/quickstart/infrastructure-sizing)
para la topología HA recomendada, la hoja de cálculo, los perfiles de carga y las fórmulas de almacenamiento.

### Autenticación

Todas las solicitudes de la API autentican utilizando uno de los dos mecanismos:

* **Clave API**
  — Una pareja de clave pública/secreta generada por organización en la Consola de Desarrollador. Se utiliza la clave secreta para las solicitudes entre servidores; la clave pública para las solicitudes desde navegadores/aplicaciones con un alcance limitado.
* **Token de sesión**
  — Tokens de sesión emitidos al iniciar sesión en la consola, utilizados para la comunicación entre la consola y la API.

Los usuarios de la consola se inician sesión con una contraseña o, cuando un administrador lo ha configurado, con una cuenta de Google, Microsoft, GitHub o Apple — consulte
[Inicio de sesión con OAuth](https://fleetbase.io/docs/platform/system-setup/oauth-sign-in)
. De cualquier forma, la consola termina obteniendo un token de sesión.

Nunca exponga su clave API secreta en el código del lado del cliente o en repositorios públicos. Rotee las claves inmediatamente si se comprometen.

```
server/
├── src/
│   ├── Providers/ExtensionServiceProvider.php
│   ├── Http/Controllers/
│   ├── Models/
│   └── routes.php
└── composer.json
```

**Motor de interfaz de usuario (Ember)**

La parte de la interfaz de usuario de una extensión se encuentra en un
`addon/`
directorio. Es un motor Ember que:

* Se monta en la consola bajo su propio espacio de nombres de ruta
* Declara dependencias de servicios del consola principal
* Llama a la función `setupExtension()` para registrar enlaces de la barra lateral, widgets del panel de control y páginas de configuración
* Utiliza los componentes
  `@fleetbase/ember-ui`
  para un estilo consistente

```
addon/
├── components/
├── controllers/
├── routes/
├── templates/
├── engine.js      # Punto de entrada del motor + setupExtension()
└── routes.js      # Definiciones de ruta
```

**Instalación y registro**

Las extensiones se instalan a través de la CLI de Fleetbase (`flb install`) o directamente desde el navegador de extensiones en la consola. Al instalar:

* Se añade el paquete de Composer a la API y se descubre automáticamente su proveedor de servicios
* Se añade el paquete npm a la consola y se registra el motor en la compilación
* La extensión aparece en el lateral de la consola al cargarla por primera vez

## Infraestructura

### Servicios requeridos

Un despliegue de Fleetbase requiere tres servicios externos además de los contenedores de la aplicación:

| Servicio | Rol | Recomendado |
| --- | --- | --- |
| **MySQL 8.0+** | Base de datos relacional principal | AWS RDS, Azure Database for MySQL, Cloud SQL, auto-alojado |
| **Redis** | Backend de caché y cola de tareas | AWS ElastiCache, Azure Cache for Redis, Memorystore, auto-alojado |
| **Almacenamiento compatible con S3** | Carga de archivos, documentos, medios | AWS S3, Azure Blob Storage, GCS, Cloudflare R2, MinIO |

Se requiere un servicio SMTP para el correo electrónico transaccional (verificación de cuentas, notificaciones). Se requiere un servicio de notificación push (FCM/APNs) para las notificaciones push a la aplicación Navigator.

### Despliegue en la nube

Fleetbase se ejecuta en cualquier nube que admita contenedores Docker. A continuación, se muestra una guía para desplegar en los cuatro proveedores de nube más comunes utilizando sus servicios gestionados.

AWS

Azure

GCP

DigitalOcean

AWS es ideal para despliegues de Fleetbase de cualquier escala, desde una única instancia de EC2 hasta una arquitectura de contenedor altamente disponible y gestionada.

**Servicios utilizados:**

* **EC2 o ECS Fargate**
  — Ejecuta los contenedores de la API y la consola. Para despliegues más pequeños, una única instancia de EC2 con Docker Compose funciona bien. Para producción a gran escala, ECS Fargate elimina la necesidad de gestionar instancias de EC2 por completo.
* **RDS for MySQL**
  — MySQL 8.0 gestionado con copias de seguridad automáticas, recuperación de puntos en el tiempo y conmutación por error Multi-AZ para alta disponibilidad.
* **ElastiCache for Redis**
  — Cluster de Redis gestionado para caché y colas de tareas, con conmutación automática.
* **S3**
  — Almacenamiento de objetos para la carga de archivos, fotos de conductores, prueba de entrega y documentos.
* **Balanceador de carga de aplicaciones + ACM**
  — Terminación HTTPS con certificados SSL gestionados por AWS, enrutamiento del tráfico a los contenedores de la API y la consola.
* **Route 53**
  — Gestión DNS que apunta tu dominio al balanceador de carga.

Para un despliegue sencillo de un único servidor, provisiona una instancia de EC2 (t3.medium o superior), instala Docker, clona el repositorio de Fleetbase y ejecuta el script de instalación interactivo:

```
bash scripts/docker-install.sh
```

Configura tus puntos finales de RDS y ElastiCache cuando se te solicite, y utiliza un ALB en la parte delantera para HTTPS.

¿Necesitas ayuda para desplegar en AWS? El
[Servicio de instalación de Fleetbase](https://fleetbase.io/services/installation)
maneja toda la arquitectura, el despliegue y el lanzamiento para ti.

Azure proporciona un conjunto completo de servicios gestionados que se corresponden limpiamente con los requisitos de infraestructura de Fleetbase.

**Servicios utilizados:**

* **Azure Container Instances o AKS**
  — Ejecuta la API y la consola como contenedores. ACI es lo más sencillo para despliegues más pequeños; AKS (Kubernetes) es la opción adecuada para operaciones más grandes que requieren escalado automático y alta disponibilidad.
* **Azure Database for MySQL — Flexible Server**
  — MySQL 8.0 gestionado con copias de seguridad automáticas, redundancia de zona de alta disponibilidad y réplicas de lectura.
* **Azure Cache for Redis**
  — Cluster de Redis gestionado para caché y colas de tareas en segundo plano.
* **Azure Blob Storage**
  — Almacenamiento de objetos compatible con S3 (utiliza el SDK de Azure o un gateway de MinIO para la compatibilidad de la API S3 con el conductor de almacenamiento de Fleetbase).
* **Azure Application Gateway o Front Door**
  — Balanceo de carga HTTPS con certificados TLS gestionados por Azure y capacidades de WAF.
* **Azure DNS**
  — Gestión de dominio y enrutamiento.

Para un despliegue de un único servidor, provisiona una máquina virtual de Azure Linux (Standard\_D2s\_v3 o superior), instala Docker y ejecuta el script de instalación de Fleetbase con tus puntos finales de servicio gestionado configurados cuando se te solicite.

¿Necesitas ayuda para desplegar en Azure? El
[Servicio de instalación de Fleetbase](https://fleetbase.io/services/installation)
maneja toda la arquitectura, el despliegue y el lanzamiento para ti.

Google Cloud Platform ofrece sólidas opciones de bases de datos y contenedores gestionadas para los despliegues de Fleetbase.

**Servicios utilizados:**

* **Cloud Run o GKE**
  — Cloud Run es la forma más sencilla de desplegar Fleetbase como contenedor — se ejecuta en un entorno sin servidor con escalado automático. GKE (Kubernetes Engine) es la opción adecuada para las operaciones que necesitan un control fino sobre la orquestación de contenedores.
* **Cloud SQL for MySQL**
  — MySQL 8.0 gestionado con copias de seguridad automáticas, alta disponibilidad y replicación entre regiones.
* **Memorystore for Redis**
  — Cluster de Redis gestionado para caché y colas de tareas.
* **Cloud Storage**
  — Almacenamiento de objetos para archivos y medios, con habilitada la interoperabilidad con S3 para su uso con el conductor de almacenamiento S3 de Fleetbase.
* **Cloud Load Balancing**
  — Balanceo de carga HTTPS global con certificados SSL gestionados por Google.
* **Cloud DNS**
  — Enrutamiento de dominio a tu balanceador de carga.

Para un despliegue en una instancia de Compute Engine, provisiona una máquina (e2-standard-2 o superior), instala Docker y ejecuta el script de instalación apuntando a tus puntos finales de Cloud SQL y Memorystore cuando se te solicite.

¿Necesitas ayuda para desplegar en GCP? El
[Servicio de instalación de Fleetbase](https://fleetbase.io/services/installation)
maneja toda la arquitectura, el despliegue y el lanzamiento para ti.

DigitalOcean es una plataforma sencilla y rentable para despliegues auto-alojados de Fleetbase, especialmente para operaciones pequeñas a medianas.

**Servicios utilizados:**

* **Droplet**
  — Un VPS de Linux (mínimo de 4 GB de RAM / 2 vCPUs; recomendado 8 GB para producción). Ejecuta el stack Docker de Fleetbase completo directamente en el Droplet.
* **Managed MySQL**
  — Cluster de MySQL gestionado de DigitalOcean para MySQL 8.0, con copias de seguridad diarias y nodos de respaldo para alta disponibilidad.
* **Managed Redis**
  — Cluster de Redis gestionado para caché y colas de tareas.
* **Spaces**
  — Almacenamiento de objetos compatible con S3 (utiliza el punto final de Spaces y las claves de acceso de Fleetbase para la compatibilidad de la API S3).
* **Load Balancer**
  — Balanceador de carga gestionado de DigitalOcean que gestiona el terminación HTTPS con certificados Let's Encrypt y enruta el tráfico a tu Droplet.

Provisiona un Droplet, SSH en, instala Docker, clona el repositorio de Fleetbase y ejecuta el script de instalación:

```
bash scripts/docker-install.sh
```

Configura tus puntos finales de Managed MySQL y Managed Redis cuando se te solicite. Utiliza un Load Balancer de DigitalOcean para HTTPS.

¿Necesitas ayuda para desplegar en DigitalOcean? El
[Servicio de instalación de Fleetbase](https://fleetbase.io/services/installation)
maneja toda la configuración, el despliegue y el lanzamiento para ti.

### Configuración del entorno

Fleetbase se configura a través de variables de entorno escritas en
`docker-compose.override.yml`
por el script de instalación. La configuración se divide entre la
**API backend**, el
**servidor de socket**
y el
**panel de control**
.

#### Backend (contenedor de la API)

| Variable | Descripción | Ejemplo |
|---|---|---|
| `APP_KEY` | Secreto de aplicación auto-generado — generado por el script de instalación | `base64:abc123...` |
| `APP_NAME` | Nombre de visualización de la instalación | `Fleetbase` |
| `APP_URL` | URL pública del servidor de la API | `https://api.yourdomain.com` |
| `CONSOLE_HOST` | URL pública del panel de control | `https://console.yourdomain.com` |
| `APP_DEBUG` | Establecer en `false` en producción | `false` |
| `DATABASE_URL` | Cadena de conexión de MySQL | `mysql://user:pass@host/fleetbase` |
| `SESSION_DOMAIN` | Dominio de cookie para sesiones | `yourdomain.com` |
| `FRONTEND_HOSTS` | Orígenes CORS adicionales (separados por comas) | `app.yourdomain.com` |

**Correo electrónico**
— Establece
`MAIL_MAILER`
en uno de:
`smtp`
,
`mailgun`
,
`postmark`
,
`sendgrid`
,
`resend`
,
`ses`
, o
`log`
. Luego proporciona las variables específicas del conductor:

| Variable | Utilizado por |
|---|---|
| `MAIL_HOST` , `MAIL_PORT` , `MAIL_USERNAME` , `MAIL_PASSWORD` | `smtp` |
| `MAIL_FROM_ADDRESS` , `MAIL_FROM_NAME` | Todos los conductores |
| `MAILGUN_DOMAIN` , `MAILGUN_SECRET` | `mailgun` |
| `POSTMARK_TOKEN` | `postmark` |
| `SENDGRID_API_KEY` | `sendgrid` |
| `RESEND_KEY` | `resend` |

**Almacenamiento de archivos**
— Establece
`FILESYSTEM_DRIVER`
en
`s3`
,
`gcs`
, o
`public`
(disco local, solo para desarrollo):

| Variable | Utilizado por |
|---|---|
| `AWS_ACCESS_KEY_ID` , `AWS_SECRET_ACCESS_KEY` , `AWS_DEFAULT_REGION` , `AWS_BUCKET` | `s3` |
| `AWS_URL` | Conductores compatibles con S3 (Cloudflare R2, DigitalOcean Spaces, MinIO) |
| `AWS_USE_PATH_STYLE_ENDPOINT` | Establecer en `true` para MinIO y conductores de estilo de ruta de S3 |
| `GOOGLE_CLOUD_PROJECT_ID` , `GOOGLE_CLOUD_STORAGE_BUCKET` , `GOOGLE_CLOUD_KEY_FILE` | `gcs` |

**Integraciones de terceros**
— todas opcionales:

| Variable | Propósito |
|---|---|
| `IPINFO_API_KEY` | Geolocalización basada en IP (ipinfo.io) |
| `GOOGLE_MAPS_API_KEY` | Renderizado y geocodificación de Google Maps |
| `GOOGLE_MAPS_LOCALE` | Localización de mapas (predeterminado: `us` ) |
| `TWILIO_SID` , `TWILIO_TOKEN` , `TWILIO_FROM` | Notificaciones SMS a través de Twilio |

#### Servidor de socket

El
`socket`
servicio tiene su propio bloque de configuración:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `SOCKETCLUSTER_OPTIONS` | Cadena JSON que restringe los orígenes WebSocket permitidos | `{"origins":"https://console.yourdomain.com"}` |

En producción, siempre restrinja
`SOCKETCLUSTER_OPTIONS`
a la URL exacta de tu consola. El script de instalación establece esto automáticamente en función del host que proporciones.

#### Frontend (Consola)

La consola se configura a través de dos archivos creados por el script de instalación:

**`console/fleetbase.config.json`**
— Configuración de tiempo de ejecución cargada por la aplicación Ember:

```
{
  "API_HOST": "https://api.yourdomain.com",
  "SOCKETCLUSTER_HOST": "yourdomain.com",
  "SOCKETCLUSTER_PORT": "38000",
  "SOCKETCLUSTER_SECURE": "true"
}
```

**`console/environments/.env.production`**
— Entorno de tiempo de compilación:

```
API_HOST=https://api.yourdomain.com
API_NAMESPACE=int/v1
API_SECURE=true
SOCKETCLUSTER_PATH=/socketcluster/
SOCKETCLUSTER_HOST=yourdomain.com
SOCKETCLUSTER_SECURE=true
SOCKETCLUSTER_PORT=38000
OSRM_HOST=https://router.project-osrm.org
```

`API_NAMESPACE`
siempre es
`int/v1`
— este es el espacio de nombres de la API interna utilizado por la consola.
`OSRM_HOST`
apunta al motor de enrutamiento utilizado para los cálculos de rutas; puedes alojar OSRM tú mismo o utilizar la versión pública predeterminada.

Consulta
[Configuración del sistema](https://fleetbase.io/docs/platform/system-setup/services)
para la referencia completa de configuración.

## Resumen

| Capa | Tecnología | Paquete / Herramienta clave |
|---|---|---|
| **Interfaz de usuario de la consola** | Ember.js + Ember Engines | `@fleetbase/ember-core`, `@fleetbase/ember-ui` |
| **Backend de la API** | Laravel / PHP | `fleetbase/core-api` |
| **Tiempo real** | SocketCluster | Integrado en el contenedor de la API |
| **Base de datos** | MySQL 8.0 | Gestionada externamente o autoalojada |
| **Almacenamiento en caché y colas** | Redis | Gestionada externamente o autoalojada |
| **Almacenamiento de archivos** | Compatible con S3 | AWS S3, Cloudflare R2, Azure Blob, GCS, MinIO |
| **Backend de la extensión** | Proveedor de servicios de Laravel | Paquete Composer por extensión |
| **Frontend de la extensión** | Motor Ember | Paquete npm por extensión |

## Próximos pasos

* [Quickstart en la nube](https://fleetbase.io/docs/platform/quickstart/cloud-quickstart)
  — obtén una instancia de Fleetbase funcionando ahora
* [Ejecución local](https://fleetbase.io/docs/platform/quickstart/running-locally)
  — ejecuta la pila completa con Docker Compose en minutos
* [Implementación en la nube](https://fleetbase.io/docs/platform/quickstart/deploy-in-cloud)
  — autoalojar en tu propia infraestructura
* [Configuración del sistema](https://fleetbase.io/docs/platform/system-setup/services)
  — configura tu implementación para producción
* [Desarrollo de extensiones](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
  — comienza a crear tus propias extensiones