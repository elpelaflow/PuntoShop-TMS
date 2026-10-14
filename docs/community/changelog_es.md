---
title: "Registro de cambios"
url: https://fleetbase.io/docs/community/changelog
module: community
---

# Registro de cambios

Notas de lanzamiento e historial de versiones en la plataforma Fleetbase: API principal, Console, extensiones y aplicaciones móviles.

# Registro de cambios

Fleetbase es una plataforma modular compuesta por varios repositorios independientes, cada uno con su propio ciclo de lanzamiento. Las notas de lanzamiento se mantienen en GitHub Releases para cada repositorio.

## Lanzamientos de la plataforma

| Repositorio | ¿Qué cubre? | Lanzamientos |
|---|---|---|
| **fleetbase/fleetbase** | Plataforma principal: API, Console, IAM, Console para desarrolladores | [Ver lanzamientos →](https://github.com/elpelaflow/PuntoShop-TMS/releases) |
| **PuntoShop-TMS (Fleet-Ops)** | Extensión Fleet-Ops: gestión de flotas, despachos, seguimiento | [Ver lanzamientos →](https://github.com/elpelaflow/PuntoShop-TMS/releases) |
| **PuntoShop-TMS (Ledger)** | Extensión Ledger: contabilidad e facturación | [Ver lanzamientos →](https://github.com/elpelaflow/PuntoShop-TMS/releases) |

## Lanzamientos de aplicaciones móviles

| Repositorio | ¿Qué cubre? | Lanzamientos |
|---|---|---|
| **Navigator App** | Aplicación para conductores Navigator (React Native) | [Ver lanzamientos →](https://github.com/elpelaflow/PuntoShop-TMS/releases) |

## Lanzamientos de CLI

| Repositorio | ¿Qué cubre? | Lanzamientos |
|---|---|---|
| **fleetbase/fleetbase-cli** | CLI de Fleetbase: instalación, publicación y gestión de extensiones | [Ver lanzamientos →](https://github.com/elpelaflow/PuntoShop-TMS-cli/releases) |

## Suscribirse a las notificaciones de lanzamiento

Para recibir un correo electrónico cuando se publique una nueva versión:

Ve al repositorio de GitHub que deseas seguir (por ejemplo,
[fleetbase/fleetbase](https://github.com/elpelaflow/PuntoShop-TMS)
).

Haz clic en el botón
**Watch**
en la esquina superior derecha de la página del repositorio.

Selecciona
**Custom**, luego marca
**Releases**.

Haz clic en
**Apply**. GitHub ahora te enviará un correo electrónico cada vez que se publique una nueva versión.

## Anuncios importantes

Para anuncios de productos de alto nivel, lanzamientos de nuevas extensiones y noticias de la empresa:

* **Discord
  `#announcements`**
  — únete al
  [servidor de Discord](https://fleetbase.io/docs/community/discord)
  y observa el canal
  `#announcements`
* **Twitter/X**
  — síguenos a
  [@fleetbase\_io](https://twitter.com/fleetbase_io)

## Actualización

Cuando esté disponible una nueva versión principal de la plataforma, descarga las últimas imágenes y ejecuta el script de despliegue:

```
git pull origin main
docker compose pull
docker compose exec application bash -c "./deploy.sh"
docker compose up -d
```

El script
`deploy.sh`
maneja las migraciones de la base de datos, la limpieza de la caché y cualquier otro paso requerido por la versión. Consulta
[Deploy in Cloud](https://fleetbase.io/docs/platform/quickstart/deploy-in-cloud)
para instrucciones completas de actualización.

Siempre revisa las notas de lanzamiento para detectar cambios que puedan afectar antes de actualizar una instancia de producción. Los paquetes de extensión pueden requerir actualizaciones separadas cuando cambie la versión principal de la plataforma.