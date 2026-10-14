---
título: "Requisitos"
url: https://fleetbase.io/docs/cli/getting-started/requirements
módulo: cli
---

# Requisitos

Qué necesitas instalado antes de usar la CLI de Fleetbase: Node, además de Docker y Git para instalar Fleetbase en sí.

# Requisitos

La propia CLI funciona con Node. Algunos comandos también necesitan Docker, Git, pnpm o PHP/Composer en tu máquina.

## La Propia CLI

| Herramienta | Notas |
|---|---|
| **Node.js** ≥ 18 | La CLI se publica como `@fleetbase/cli` en npm |
| **npm** (o pnpm / yarn) | Se utiliza para instalar la CLI globalmente |

## Para instalar Fleetbase ( flb install-fleetbase )

| Herramienta | Notas |
|---|---|
| **Docker** | Requerido — el asistente ejecuta `docker compose up -d` |
| **Docker Compose v2** | El asistente verifica la presencia del plugin `docker compose` (no el binario legado `docker-compose`) |
| **Git** | Se utiliza para clonar `github.com/elpelaflow/PuntoShop-TMS.git` si el directorio de destino no es una copia existente |

El instalador también realiza comprobaciones iniciales para verificar la disponibilidad de estos puertos:

* **8000**
  — API
* **4200**
  — Consola
* **3306**
  — MySQL
* **38000**
  — SocketCluster

Si hay conflictos en alguno de estos, se muestra una advertencia, pero no se interrumpe — el instalador continúa para que puedas decidir si liberar el puerto.

## Para gestionar extensiones en una instancia en ejecución ( flb install , flb uninstall )

La CLI instala extensiones ejecutando
`pnpm install`
(en el
`console/`
directorio) y
`composer require`
(en el
`api/`
directorio) de tu copia de Fleetbase. Necesitarás:

| Herramienta | Notas |
|---|---|
| **pnpm** | Requerido — Fleetbase utiliza pnpm en el espacio de trabajo de la consola |
| **PHP / Composer** | Requerido — se utiliza para instalar el paquete Composer en el lado de la API |

`flb install`
y
`flb uninstall`
necesitan la ruta a tu instancia de Fleetbase — el directorio que contiene las carpetas
`console/`
y
`api/`
Pásala mediante
`--path /path/to/fleetbase`
o ejecuta el comando desde dentro de ese directorio.

## Para publicar extensiones ( flb publish , flb bundle-upload )

| Herramienta | Notas |
|---|---|
| **npm** | Se utiliza internamente en el flujo de publicación ( `npm publish` ) |
| **Una cuenta de registro** | [Regístrate](https://fleetbase.io/docs/cli/account/register) y [verifica](https://fleetbase.io/docs/cli/account/verify) para obtener un token de autenticación |

## Sistemas operativos

La CLI funciona en macOS, Linux y Windows (mediante WSL2 para comandos basados en Docker). El asistente de instalación se ha probado en macOS y Linux; en Windows, ejecútalo dentro de WSL2.

[CLI de Fleetbase

La CLI de Fleetbase (flb) — instala Fleetbase, gestiona extensiones en una instancia en ejecución y publica tus propias extensiones en el registro.](https://fleetbase.io/docs/cli)
[Instalar la CLI

Instala la CLI de Fleetbase globalmente a través de npm para que el comando `flb` esté disponible en todo el sistema.](https://fleetbase.io/docs/cli/getting-started/installation)