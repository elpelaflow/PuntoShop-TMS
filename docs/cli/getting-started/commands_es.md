---
title: "Comandos"
url: https://fleetbase.io/docs/cli/getting-started/commands
module: cli
---

# Comandos

Tabla de referencia de todos los comandos de la CLI de Fleetbase, con una descripción de una línea y un enlace a su página.

# Comandos

Referencia rápida para todos los comandos que expone la CLI `flb`. Haga clic en cualquier comando para obtener las opciones completas, ejemplos y comportamiento.

## Instalar Fleetbase

| Comando | Descripción |
| --- | --- |
| [`flb install-fleetbase`](https://fleetbase.io/docs/cli/installation/overview) | Asistente interactivo basado en Docker que instala una instancia de Fleetbase auto-hospedada |

## Cuenta

| Comando | Descripción |
| --- | --- |
| [`flb register`](https://fleetbase.io/docs/cli/account/register) | Crea una nueva cuenta de desarrollador para el Registro de Extensiones de Fleetbase |
| [`flb verify`](https://fleetbase.io/docs/cli/account/verify) | Verifica la dirección de correo electrónico de la cuenta del registro y recibe su token de autenticación |
| [`flb resend-verification`](https://fleetbase.io/docs/cli/account/resend-verification) | Solicita un nuevo código de verificación |
| [`flb login`](https://fleetbase.io/docs/cli/account/login) | Inicia sesión en el registro con nombre de usuario y contraseña (guarda en `~/.npmrc`) |
| [`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth) | Guarda un token de autenticación del registro en el archivo `console/.npmrc` y `api/auth.json` de la instancia de Fleetbase |
| [`flb generate-token`](https://fleetbase.io/docs/cli/account/generate-token) | Genera (o regenera) un token de autenticación del registro de larga duración |

## Gestionar Extensiones

| Comando | Descripción |
| --- | --- |
| [`flb search`](https://fleetbase.io/docs/cli/extensions/search) | Explore y filtre el Registro de Extensiones desde la línea de comandos |
| [`flb install`](https://fleetbase.io/docs/cli/extensions/install) | Instale una extensión en una instancia de Fleetbase en ejecución |
| [`flb uninstall`](https://fleetbase.io/docs/cli/extensions/uninstall) | Elimine una extensión instalada de una instancia de Fleetbase |

## Publicar Extensiones

| Comando | Descripción |
| --- | --- |
| [`flb scaffold`](https://fleetbase.io/docs/cli/extension-development/scaffold) | Genera una nueva extensión a partir de la plantilla de inicio |
| [`flb version-bump`](https://fleetbase.io/docs/cli/extension-development/version-bump) | Incrementa la versión en `extension.json`, `package.json` y `composer.json` |
| [`flb bundle`](https://fleetbase.io/docs/cli/extension-development/bundle) | Empaqueta una extensión en un archivo `.tar.gz` con una versión |
| [`flb bundle-upload`](https://fleetbase.io/docs/cli/extension-development/bundle-upload) | Sube un paquete existente al registro |
| [`flb publish`](https://fleetbase.io/docs/cli/extension-development/publish) | Publica una extensión en el registro mediante `npm publish` |
| [`flb unpublish`](https://fleetbase.io/docs/cli/extension-development/unpublish) | Elimina una extensión publicada del registro |

## Funciones integradas

| Comando | Descripción |
| --- | --- |
| `flb --version` (o `-v`) | Muestra la versión de la CLI |
| `flb --help` | Muestra la ayuda general y la lista de comandos |
| `flb <command> --help` | Muestra la ayuda para un comando específico |

## Opciones globales

Estas opciones funcionan con todos los comandos:

| Opción | Valor predeterminado | Descripción |
| --- | --- | --- |
| `-v, --version` | — | Muestra la versión de la CLI |
| `-r, --registry [url]` | `https://registry.fleetbase.io` | Sobreescribe la URL del registro |
| `--help` | — | Muestra la ayuda para el comando actual |