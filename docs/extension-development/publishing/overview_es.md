---
title: "Publicación en el Marketplace"
url: https://fleetbase.io/docs/extension-development/publishing/overview
module: extension-development
---

# Publicación en el Marketplace

Auténticate con el registro de Fleetbase y publica tu extensión utilizando la CLI.

# Publicación en el Marketplace

Una vez que hayas terminado de desarrollar y probar tu extensión localmente, puedes publicarla en el
**Registro de Fleetbase**.

Publicar tu extensión la hace disponible en el Marketplace de Fleetbase, permitiendo que otros usuarios (o incluso otras organizaciones dentro de tu propia instancia autohospedada) la descubran e instalen con un solo clic.

## Requisitos previos

Antes de poder publicar una extensión, debes asegurarte de que:

1. Tu extensión tenga un archivo de manifiesto válido
   `extension.json`.
2. El código fuente de tu extensión esté alojado en un repositorio Git público (por ejemplo, GitHub, GitLab, Bitbucket). El Registro debe poder clonar el repositorio para construir la extensión.
3. Tienes una cuenta en el Registro de Fleetbase.

## Autenticación con la CLI

Para publicar una extensión, primero debes autenticar la CLI de Fleetbase con el Registro.

1. Abre tu terminal.
2. Ejecuta el comando
   `login`:

```
flb login
```

3. La CLI te pedirá tus credenciales del Registro (correo electrónico y contraseña).

Una vez autenticado, la CLI almacenará un token seguro localmente, lo que te permitirá ejecutar comandos posteriores sin volver a iniciar sesión.

## Publicación de la extensión

Para publicar tu extensión, navega al directorio raíz de tu extensión (donde se encuentra el archivo
`extension.json`) y ejecuta el comando
`publish`.

```
cd my-extension
flb publish
```

La CLI realizará los siguientes pasos:

1. **Validación del manifiesto**: Comprobará tu archivo
   `extension.json`
   para asegurarse de que todos los campos requeridos (nombre, versión, autor, etc.) estén presentes y correctamente formateados.
2. **Verificación de versiones existentes**: Comprobará el Registro para ver si ya existe una extensión con el mismo nombre y versión. Si es así, la publicación fallará. Debes incrementar el número de versión en
   `extension.json`
   antes de publicar una actualización.
3. **Carga del manifiesto**: Enviará los datos del manifiesto al Registro.
4. **Iniciación de la construcción**: El Registro programará una tarea en segundo plano para clonar tu repositorio Git, construir el motor del frontend y empaquetar el código del backend.

## El proceso de construcción

Cuando publicas una extensión, el Registro no sube tus archivos locales directamente. En cambio, descarga el código de tu repositorio Git.

Esto garantiza que la extensión publicada se construya en un entorno limpio y estandarizado, y que el código fuente siempre esté disponible para la auditoría.

El proceso de construcción suele tardar unos minutos. Puedes comprobar el estado de tu extensión en la Consola de Fleetbase navegando a
**Extensiones**
>
**Mis extensiones publicadas**.

## Actualización de una extensión

Para publicar una nueva versión de tu extensión:

1. Realiza un commit de tus cambios y publícalos en tu repositorio Git.
2. Actualiza el campo
   `version`
   en tu archivo
   `extension.json`
   (por ejemplo, de
   `1.0.0`
   a
   `1.0.1`).
3. Ejecuta
   `flb publish`
   nuevamente.

El Registro descargará el código más reciente, construirá la nueva versión y la hará disponible como una actualización para los usuarios que ya hayan instalado la extensión.