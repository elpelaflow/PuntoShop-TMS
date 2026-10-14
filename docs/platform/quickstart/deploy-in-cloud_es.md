---
title: "Implementación en la nube"
url: https://fleetbase.io/docs/platform/quickstart/deploy-in-cloud
module: platform
---

# Implementación en la nube

Aloja Fleetbase en AWS, GCP, DigitalOcean o cualquier servidor Linux — implementación con Docker Compose, proxy inverso Nginx y configuración SSL.

# Implementación en la nube

Esta guía cubre la implementación de Fleetbase en una infraestructura que controlas: una máquina virtual en AWS, GCP, DigitalOcean o cualquier servidor Linux con Docker instalado.

¿Prefieres no gestionar la infraestructura tú mismo? Nuestro
**[Servicio de instalación gestionado](https://fleetbase.io/services/installation)**
maneja la configuración, la implementación, el SSL y el mantenimiento continuo — totalmente configurado y listo para producción en tu proveedor de nube preferido.

Para implementaciones autoalojadas o en el sitio, incluyendo la alta disponibilidad de Kubernetes, el crecimiento del almacenamiento, la recuperación ante desastres y el dimensionamiento para entornos empresariales, consulta
[Dimensionamiento de la infraestructura](https://fleetbase.io/docs/platform/quickstart/infrastructure-sizing)
.

## Requisitos de infraestructura

### Especificaciones mínimas del servidor

| Recurso | Mínimo | Recomendado |
|---|---|---|
| **CPU** | 2 núcleos | 4+ núcleos |
| **RAM** | 4 GB | 8–16 GB |
| **Almacenamiento** | 40 GB SSD | 100 GB+ SSD |
| **Sistema operativo** | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |

### Servicios externos recomendados

Para producción, utiliza instancias gestionadas de los servicios de respaldo en lugar de ejecutarlos en Docker en la misma máquina:

| Servicio | Propósito |
|---|---|
| **MySQL 8.0+** | Base de datos principal |
| **Redis** | Caché y cola de tareas |
| **Almacenamiento compatible con S3** | Carga de archivos y medios |
| **SMTP** | Correo electrónico transaccional |

## Implementación

AWS

GCP

DigitalOcean

VPS / Linux

La arquitectura recomendada en AWS utiliza servicios gestionados para la base de datos, la caché y el almacenamiento, con Fleetbase ejecutándose en una instancia EC2.

**Servicios AWS recomendados**

| Componente | Servicio de AWS |
|---|---|
| Base de datos | RDS MySQL 8.0 |
| Caché y colas | ElastiCache Redis |
| Almacenamiento de archivos | S3 |
| Correo electrónico | SES o SendGrid |
| VM | EC2 (t3.medium o superior) |

### Implementa servicios gestionados

Antes de implementar, crea lo siguiente en tu cuenta de AWS:

* **RDS MySQL 8.0**
  — habilita las copias de seguridad automáticas y establece la instancia en la región que prefieras
* **ElastiCache Redis**
  — un nodo es suficiente para la mayoría de los casos de uso
* **Bucket de S3**
  — crea un bucket para la carga de archivos; anota el nombre y la región del bucket
* **Usuario de IAM**
  — crea un usuario de IAM con
  `AmazonS3FullAccess`
  (limitado a tu bucket) y genera las claves de acceso

Ten en cuenta las cadenas de conexión para RDS y ElastiCache — las necesitarás en el siguiente paso.

### Lanza una instancia EC2

Lanza una instancia EC2 que ejecute Ubuntu 22.04. Un
`t3.medium`
(2 vCPU / 4 GB) es el mínimo;
`t3.large`
o superior se recomienda para producción.

En el grupo de seguridad, permite el tráfico entrante en los puertos
**22**
(SSH),
**80**
(HTTP) y
**443**
(HTTPS). Cierra todos los demás puertos — Nginx actuará como proxy interno para los contenedores de Docker.

### Instala Docker

Accede a tu instancia mediante SSH e instala Docker:

```
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

### Clona y configura

```
git clone https://github.com/elpelaflow/PuntoShop-TMS.git
cd PuntoShop-TMS
```

Crea
`docker-compose.override.yml`
y configura tus variables de entorno, apuntando a tus recursos RDS, ElastiCache y S3 gestionados:

```
services:
  application:
    environment:
      APP_KEY: "base64:tu-clave-generada"
      APP_URL: "https://api.tu-dominio.com"
      CONSOLE_HOST: "https://console.tu-dominio.com"
      APP_ENV: "production"
      APP_DEBUG: "false"
      DATABASE_URL: "mysql://usuario:contraseña@tu-endpoint-rds/fleetbase"
      REDIS_HOST: "tu-endpoint-elasticache"
      CACHE_DRIVER: "redis"
      QUEUE_CONNECTION: "redis"
      SESSION_DRIVER: "redis"
      FILESYSTEM_DRIVER: "s3"
      AWS_BUCKET: "tu-bucket"
      AWS_DEFAULT_REGION: "us-east-1"
      AWS_ACCESS_KEY_ID: "..."
      AWS_SECRET_ACCESS_KEY: "..."
  socket:
    environment:
      SOCKETCLUSTER_OPTIONS: '{"origins":"https://console.tu-dominio.com"}'
```

Genera una clave de aplicación:

```
docker run --rm fleetbase/fleetbase-api:latest php artisan key:generate --show
```

### Inicia el stack y ejecuta las migraciones

```
docker compose up -d
docker compose exec application bash -c "./deploy.sh"
```

Una vez que el stack esté en funcionamiento, continúa con las secciones de
[Nginx](#nginx-reverse-proxy)
y
[SSL](#ssl-certificates)
a continuación.

La arquitectura recomendada en GCP utiliza servicios gestionados para la base de datos, la caché y el almacenamiento, con Fleetbase ejecutándose en una instancia de Compute Engine.

**Servicios GCP recomendados**

| Componente | Servicio de GCP |
|---|---|
| Base de datos | Cloud SQL (MySQL 8.0) |
| Caché y colas | Memorystore para Redis |
| Almacenamiento de archivos | Cloud Storage (GCS) |
| Correo electrónico | SendGrid o Mailgun |
| VM | Compute Engine (e2-medium o superior) |

### Implementa servicios gestionados

En tu proyecto de GCP:

* **Cloud SQL**
  — crea una instancia de MySQL 8.0; anota la cadena de conexión y habilita la API de administración de Cloud SQL
* **Memorystore para Redis**
  — crea una instancia de nivel básico en la misma región que tu VM
* **Bucket de Cloud Storage**
  — crea un bucket para la carga de archivos; crea una cuenta de servicio con
  `Storage Object Admin`
  acceso; descarga el archivo JSON de la clave
* **Compute Engine**
  — crea una VM que ejecute Ubuntu 22.04. Un
  `e2-medium`
  (2 vCPU / 4 GB) es el mínimo. En las reglas del firewall, permite el tráfico entrante en los puertos
  **80**
  y
  **443**
  solo — Nginx gestiona el enrutamiento internamente.

### Instala Docker

```
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

### Clona y configura

```
git clone https://github.com/elpelaflow/PuntoShop-TMS.git
cd PuntoShop-TMS
```

Crea
`docker-compose.override.yml`
apuntando a tus recursos RDS, Redis y GCS gestionados:

```
services:
  application:
    environment:
      APP_KEY: "base64:tu-clave-generada"
      APP_URL: "https://api.tu-dominio.com"
      CONSOLE_HOST: "https://console.tu-dominio.com"
      APP_ENV: "production"
      APP_DEBUG: "false"
      DATABASE_URL: "mysql://usuario:contraseña@tu-endpoint-rds/fleetbase"
      REDIS_HOST: "tu-endpoint-elasticache"
      CACHE_DRIVER: "redis"
      QUEUE_CONNECTION: "redis"
      SESSION_DRIVER: "redis"
      FILESYSTEM_DRIVER: "gcs"
      GOOGLE_CLOUD_PROJECT_ID: "tu-id-proyecto"
      GOOGLE_CLOUD_STORAGE_BUCKET: "tu-bucket"
      GOOGLE_CLOUD_KEY_FILE: "/run/secrets/gcp-key.json"
  socket:
    environment:
      SOCKETCLUSTER_OPTIONS: '{"origins":"https://console.tu-dominio.com"}'
```

> Cloud Storage es compatible con S3, por lo que Fleetbase utiliza el controlador S3. Establece
> `AWS_DEFAULT_REGION`
> en el sufijo de región de tu espacio (por ejemplo,
> `nyc3`
> ,
> `sgp1`
> ,
> `ams3`
> ).

### Inicia el stack y ejecuta las migraciones

```
docker compose up -d
docker compose exec application bash -c "./deploy.sh"
```

Una vez que el stack esté en funcionamiento, continúa con las secciones de
[Nginx](#nginx-reverse-proxy)
y
[SSL](#ssl-certificates)
a continuación.

La forma más sencilla es un Droplet que ejecuta Docker Compose, con servicios gestionados de DigitalOcean para la base de datos y los servicios de caché.

**Servicios de DigitalOcean recomendados**

| Componente | Servicio de DigitalOcean |
|---|---|
| Base de datos | MySQL gestionado |
| Caché y colas | Redis gestionado |
| Almacenamiento de archivos | Spaces (compatible con S3) |
| Correo electrónico | SendGrid o Mailgun |
| VM | Droplet (s-2vcpu-4gb o superior) |

### Implementa servicios gestionados

En tu cuenta de DigitalOcean:

* **MySQL**
  — crea un clúster de MySQL 8 en la región que prefieras; crea una base de datos llamada
  `fleetbase`
  y un usuario
* **Redis**
  — crea un clúster de Redis en la misma región
* **Spaces**
  — crea un Space (bucket) para la carga de archivos; genera una clave de Space desde la configuración de la API

### Crea un Droplet

Crea un Droplet de Ubuntu 22.04 —
`s-2vcpu-4gb`
es el mínimo;
`s-4vcpu-8gb`
se recomienda. Agrega tu clave SSH durante la creación. En el firewall del Droplet (o Cloud Firewall de DigitalOcean), permite el tráfico entrante en los puertos
**22**
,
**80**
y
**443**
solo.

Coloca el Droplet en la misma región que tus servicios de base de datos y Redis gestionados para que puedan comunicarse a través de la red privada.

### Instala Docker

```
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

### Clona y configura

```
git clone https://github.com/elpelaflow/PuntoShop-TMS.git
cd PuntoShop-TMS
```

Crea
`docker-compose.override.yml`
apuntando a tus recursos RDS, Redis y Spaces gestionados:

```
services:
  application:
    environment:
      APP_KEY: "base64:tu-clave-generada"
      APP_URL: "https://api.tu-dominio.com"
      CONSOLE_HOST: "https://console.tu-dominio.com"
      APP_ENV: "production"
      APP_DEBUG: "false"
      DATABASE_URL: "mysql://usuario:contraseña@tu-db-host/fleetbase"
      REDIS_HOST: "tu-endpoint-redis"
      CACHE_DRIVER: "redis"
      QUEUE_CONNECTION: "redis"
      SESSION_DRIVER: "redis"
      FILESYSTEM_DRIVER: "s3"
      AWS_BUCKET: "tu-bucket"
      AWS_DEFAULT_REGION: "nyc3"
      AWS_ACCESS_KEY_ID: "tu-clave-de-acceso"
      AWS_SECRET_ACCESS_KEY: "tu-clave-secreta"
      AWS_URL: "https://tu-bucket.nyc3.digitaloceanspaces.com"
      AWS_USE_PATH_STYLE_ENDPOINT: "false"
  socket:
    environment:
      SOCKETCLUSTER_OPTIONS: '{"origins":"https://console.tu-dominio.com"}'
```

> Cloud Storage es compatible con S3, por lo que Fleetbase utiliza el controlador S3. Establece
> `AWS_DEFAULT_REGION`
> en el sufijo de región de tu Space (por ejemplo,
> `nyc3`
> ,
> `sgp1`
> ,
> `ams3`
> ).

### Inicia el stack y ejecuta las migraciones

```
docker compose up -d
docker compose exec application bash -c "./deploy.sh"
```

Una vez que el stack esté en funcionamiento, continúa con las secciones de
[Nginx](#nginx-reverse-proxy)
y
[SSL](#ssl-certificates)
a continuación.

```
Crear
`docker-compose.override.yml`
con la configuración de producción:

```
services:
  application:
    environment:
      APP_KEY: "base64:tu-clave-generada"
      APP_NAME: "Fleetbase"
      APP_URL: "https://api.tu-dominio.com"
      CONSOLE_HOST: "https://console.tu-dominio.com"
      APP_ENV: "production"
      APP_DEBUG: "false"
      DATABASE_URL: "mysql://fleetbase:contraseña@database/fleetbase"
      SESSION_DOMAIN: "tu-dominio.com"
      MAIL_MAILER: "smtp"
      MAIL_HOST: "smtp.sendgrid.net"
      MAIL_PORT: "587"
      MAIL_USERNAME: "apikey"
      MAIL_PASSWORD: "tu-clave-api-sendgrid"
      MAIL_FROM_ADDRESS: "noreply@tu-dominio.com"
      MAIL_FROM_NAME: "Fleetbase"
  socket:
    environment:
      SOCKETCLUSTER_OPTIONS: '{"origins":"https://console.tu-dominio.com"}'
```

Generar una clave de aplicación segura:

```
docker run --rm fleetbase/fleetbase-api:latest php artisan key:generate --show
```

Pegar la salida en
`APP_KEY=`
en tu archivo de configuración.

### Iniciar el stack y ejecutar migraciones

```
docker compose up -d
docker compose exec application bash -c "./deploy.sh"
```

Una vez que el stack esté en funcionamiento, continuar con las secciones
[Nginx](#nginx-reverse-proxy)
y
[SSL](#ssl-certificates)
a continuación.

## Nginx como Proxy Inverso

Nginx actúa como un proxy inverso público, gestiona la finalización de SSL y dirige el tráfico a los contenedores de la API y del console.

```
sudo apt-get update && sudo apt-get install -y nginx
sudo nano /etc/nginx/sites-available/fleetbase
```

Pegar lo siguiente, reemplazando
`tu-dominio.com`
con tu dominio real:

```
# HTTP → HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name console.tu-dominio.com api.tu-dominio.com;
    return 301 https://$host$request_uri;
}

# Console (UI de Ember.js)
server {
    listen 443 ssl http2;
    server_name console.tu-dominio.com;

    ssl_certificate     /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;

    client_max_body_size 100M;

    location / {
        proxy_pass http://localhost:4200;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# API (Laravel)
server {
    listen 443 ssl http2;
    server_name api.tu-dominio.com;

    ssl_certificate     /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;

    client_max_body_size 100M;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /socketcluster/ {
        proxy_pass         http://localhost:38000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade    $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host       $host;
    }
}
```

Habilitar el sitio y probar:

```
sudo ln -s /etc/nginx/sites-available/fleetbase /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Certificados SSL

Utilizar Certbot con Let's Encrypt para certificados gratuitos y renovables automáticamente:

```
sudo apt-get install -y certbot python3-certbot-nginx

sudo certbot --nginx \
  -d console.tu-dominio.com \
  -d api.tu-dominio.com \
  --non-interactive \
  --agree-tos \
  -m admin@tu-dominio.com
```

Verificar que la renovación funciona:

```
sudo certbot renew --dry-run
```

## Mantener Fleetbase Actualizado

Extraer las últimas imágenes y reiniciar el stack:

```
cd PuntoShop-TMS
git pull
docker compose pull
docker compose up -d
docker compose exec application bash -c "./deploy.sh"
```

Siempre ejecutar
`./deploy.sh`
después de extraer una nueva versión. Esto maneja las migraciones, la limpieza de la caché y cualquier otro paso requerido por la versión.

## Reforzamiento para Producción

### Firewall

Restringir el tráfico entrante solo al que necesita exponer Nginx:

```
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP (redirecciona a HTTPS)
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

Los contenedores de Docker se comunican internamente en su propia red; no es necesario exponer los puertos 4200, 8000 o 38000 a Internet.

### Copias de Seguridad Automatizadas

Si está ejecutando MySQL en Docker en lugar de un servicio gestionado, configure copias de seguridad automatizadas:

```
# /usr/local/bin/fleetbase-backup.sh
#!/bin/bash
BACKUP_DIR="/backups/fleetbase"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

docker compose -f /path/to/fleetbase/docker-compose.yml \
  exec -T database \
  mysqldump -u root fleetbase > $BACKUP_DIR/fleetbase_${DATE}.sql

gzip $BACKUP_DIR/fleetbase_${DATE}.sql
find $BACKUP_DIR -mtime +30 -delete
```

Hacerlo ejecutable y programarlo para que se ejecute diariamente:

```
chmod +x /usr/local/bin/fleetbase-backup.sh
echo "0 2 * * * root /usr/local/bin/fleetbase-backup.sh" | sudo tee /etc/cron.d/fleetbase-backup
```

## Lista de Verificación Post-Implementación

* El console se carga en
  `https://console.tu-dominio.com`
* La API responde en
  `https://api.tu-dominio.com`
* El certificado SSL es válido (sin advertencias del navegador)
* Se ha creado la cuenta de administrador y funciona el inicio de sesión
* Se ha generado la clave de la API en la consola de desarrollador
* Se realiza una llamada de API válida
* El correo electrónico funciona (enviar una prueba desde System Setup → Mail)
* Se han registrado las URLs de callback OAuth con cada proveedor (si ofrece inicio de sesión con proveedor)
* Funciona la carga de archivos (cargar un archivo de prueba en el console)
* Se han confirmado las reglas del firewall (
  `ufw status`
  )
* Se han programado y probado las copias de seguridad automatizadas
* Se han configurado los contenedores de Docker para que se reinicien al iniciar