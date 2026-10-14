---
title: "Publicar"
url: https://fleetbase.io/docs/cli/extension-development/publish
module: cli
---

# Publicar

Publica tu extensión en el Registro de Extensiones de Fleetbase utilizando `flb publish` — ejecuta `npm publish` contra el registro configurado.

# flb publish

Publica tu extensión en el Registro de Extensiones de Fleetbase. Internamente, esto ejecuta
`npm publish`
contra el registro. Normalmente se publican tanto un paquete npm (`package.json`) como un paquete Composer (`composer.json`) — pero
`flb publish`
los gestiona mediante el mismo mecanismo de publicación de npm (la CLI convierte automáticamente
`composer.json`
en un
`package.json`
temporal para el lado de la API).

```
flb publish               # Publicar desde el directorio actual
flb publish ./api         # Publicar desde un subdirectorio
```

## Opciones

| Opción | Descripción |
|---|---|
| `[packagePath]` | Ruta del paquete a publicar (predeterminado: directorio actual) |
| `-r, --registry <url>` | URL del registro (predeterminado: `https://registry.fleetbase.io`) |

## Requisitos previos

Antes de publicar, debes haber iniciado sesión. La CLI comprueba
`npm whoami --registry <url>`
; si falla, el comando se aborta:

```
Debes haber iniciado sesión para publicar. Ejecuta `npm adduser`.
```

Configura la autenticación utilizando uno de los siguientes métodos:

* [`flb login`](https://fleetbase.io/docs/cli/account/login)
  — nombre de usuario + contraseña
* `flb set-auth <token>`
  después de
  [`flb generate-token`](https://fleetbase.io/docs/cli/account/generate-token)
  — recomendado para CI

## Ejemplos

### Publicar el complemento (paquete npm)

Desde el directorio raíz del complemento (donde se encuentra
`package.json`
):

```
flb publish
```

### Publicar la API (paquete Composer a través de npm)

Desde el directorio raíz de la API (donde se encuentra
`composer.json`
):

```
flb publish ./api
```

Cuando se publica desde un directorio que contiene
`composer.json`
pero no
`package.json`
, la CLI:

1. Convierte
   `composer.json`
   en un
   `package.json`
   sintético con
   `fleetbase.from-composer = true`
2. Ejecuta
   `npm publish`
3. Elimina el
   `package.json`
   sintético posteriormente

Esto permite que el mismo flujo de
`npm publish`
también distribuya paquetes Composer.

### Publicar en un registro autohospedado

```
flb publish --registry https://registry.mycompany.com
```

## Flujo de trabajo típico de publicación

```
# 1. Asegúrate de que tu checkout local esté limpio y que las pruebas pasen
git status
pnpm test

# 2. Incrementa la versión en todos los manifiestos
flb version-bump --minor

# 3. Realiza un commit y etiqueta
git add extension.json package.json composer.json
git commit -m "Publicar v1.3.0"
git tag v1.3.0

# 4. Publicar
flb publish

# 5. Sube
git push origin main --tags
```

Si tu extensión tiene tanto un complemento como un paquete de API, repite el paso 4 para cada uno:

```
flb publish ./addon   # o ejecutar desde el directorio del complemento
flb publish ./api     # o ejecutar desde el directorio de la API
```

## CI / Publicación automatizada

Para CI, utiliza un flujo de autenticación basado en tokens:

```
# .github/workflows/publish.yml (fragmento)
- name: Configurar la autenticación
  run: |
    echo "//registry.fleetbase.io/:_authToken=${FLEETBASE_TOKEN}" > ~/.npmrc
  env:
    FLEETBASE_TOKEN: ${{ secrets.FLEETBASE_TOKEN }}

- name: Publicar
  run: flb publish
```

Genera el token una vez con
[`flb generate-token`](https://fleetbase.io/docs/cli/account/generate-token)
y guárdalo como un secreto de CI.

## Diferencia entre flb bundle-upload

* **`flb publish`**
  utiliza el flujo de publicación de npm — la ruta canónica para la distribución. El paquete se vuelve instalable mediante
  `flb install fleetbase/<slug>`
  .
* **`flb bundle-upload`**
  envía un archivo `.tar.gz` preconstruido al almacenamiento de paquetes del registro. Es útil para canales de distribución que no utilizan npm.

La mayoría de las extensiones utilizan
**`flb publish`**
como su método de distribución principal.

## Solución de problemas

**`Debes haber iniciado sesión para publicar. Ejecuta npm adduser.`**
— configura la autenticación mediante
`flb login`
o escribe un token en
`~/.npmrc`
.

**`Error: 403 Forbidden`**
— tu cuenta no tiene permiso para publicar bajo el ámbito/nombre del paquete. O no eres el propietario del ámbito o la versión ya existe.

**`Error: 409 Conflict`**
— la versión que estás intentando publicar ya existe. Primero, utiliza
`flb version-bump --patch`
.

## Siguiente

* [`flb unpublish`](https://fleetbase.io/docs/cli/extension-development/unpublish)
  — elimina una versión publicada
* [`flb version-bump`](https://fleetbase.io/docs/cli/extension-development/version-bump)
  — incrementa las versiones antes de volver a publicar

[Subir un paquete de extensión existente al registro de Fleetbase utilizando `flb bundle-upload`.](https://fleetbase.io/docs/cli/extension-development/bundle-upload)
[Despublicar

Elimina una extensión publicada del Registro de Extensiones de Fleetbase utilizando `flb unpublish`.](https://fleetbase.io/docs/cli/extension-development/unpublish)