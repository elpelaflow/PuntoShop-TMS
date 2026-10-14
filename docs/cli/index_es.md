---
title: "Fleetbase CLI"
url: https://fleetbase.io/docs/cli
module: cli
---

# Fleetbase CLI

La
**Fleetbase CLI**
(
`flb`
) es la herramienta de línea de comandos oficial para trabajar con Fleetbase. Realiza tres tareas:

* **Instala Fleetbase**
  en tu propia infraestructura con un asistente interactivo basado en Docker
* **Gestiona extensiones**
  en una instancia de Fleetbase en ejecución: buscar, instalar, desinstalar
* **Publica extensiones**
  en el Registro de Extensiones de Fleetbase: crear, empaquetar, actualizar la versión y publicar

```
npm install -g @fleetbase/cli
flb --version
```

## Lo que puedes hacer

Instala Fleetbase

Crea una instancia de Fleetbase auto-hospedada con Docker utilizando el asistente interactivo.

[Instalar Fleetbase →](https://fleetbase.io/docs/cli/installation/overview)

Gestiona Extensiones

Busca, instala y desinstala extensiones en una instancia de Fleetbase en ejecución.

[Gestionar Extensiones →](https://fleetbase.io/docs/cli/extensions/search)

Publica Extensiones

Crea una nueva extensión, empaquétala y publícala en el registro.

[Publicar Extensiones →](https://fleetbase.io/docs/cli/extension-development/overview)

## Opciones Globales

Estas opciones funcionan con todos los comandos:

| Opción | Descripción |
| --- | --- |
| `-v, --version` | Mostrar la versión de la CLI |
| `-r, --registry [url]` | Sobreescribir la URL del registro (predeterminado: `https://registry.fleetbase.io`) |
| `--help` | Mostrar ayuda para el comando actual |

## Referencia Rápida

```
# Instala Fleetbase en tu máquina
flb install-fleetbase

# Busca una extensión en el registro
flb search

# Instala una extensión en tu instancia
flb install fleetbase/flespi

# Crea una nueva extensión
flb scaffold

# Publica tu extensión en el registro
flb bundle --upload
flb publish
```

## Próximos Pasos

* [Requisitos](https://fleetbase.io/docs/cli/getting-started/requirements)
  — lo que necesitas antes de instalar la CLI
* [Instalación](https://fleetbase.io/docs/cli/getting-started/installation)
  — instala la CLI globalmente a través de npm
* [Instalar Fleetbase](https://fleetbase.io/docs/cli/installation/overview)
  — instala una instancia de Fleetbase auto-hospedada