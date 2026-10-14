---
título: "Carga de paquete"
url: https://fleetbase.io/docs/cli/extension-development/bundle-upload
módulo: cli
---

# Carga de paquete

Carga un paquete de extensión existente al registro de Fleetbase utilizando `flb bundle-upload`.

# flb bundle-upload

Carga un
`.tar.gz`
(creado por
[`flb bundle`](https://fleetbase.io/docs/cli/extension-development/bundle)
) al Registro de Extensiones de Fleetbase. Utilícelo cuando ya haya creado el paquete (por ejemplo, como un paso separado de CI) y solo necesite enviar el archivo.

```
flb bundle-upload                          # Carga el paquete más reciente en el directorio actual
flb bundle-upload my-ext-v1.0.0-bundle.tar.gz   # Carga un paquete específico
```

Si no se proporciona un nombre de archivo, la CLI busca archivos que coincidan con
`*-v*-bundle.tar.gz`
y carga la versión más alta según semver.

## Opciones

| Opción | Descripción |
|---|---|
| `[bundleFile]` | Archivo del paquete para cargar (detecta automáticamente la versión más reciente si no se especifica) |
| `-p, --path <path>` | Directorio que contiene el paquete (predeterminado: directorio actual) |
| `--auth-token <token>` | Token de autenticación para la carga |

## Autenticación

El punto final de carga requiere un token de autenticación para el registro. La CLI lo obtiene en este orden:

1. La
   `--auth-token`
   opción
2. Tu
   `~/.npmrc`
   — buscando la línea
   `//registry.fleetbase.io/:_authToken=<token>`

Si ninguno de los dos está configurado, el comando se detiene:

```
No se encontró un token de autenticación para el registro https://registry.fleetbase.io.
Por favor, proporcione un token de autenticación utilizando la opción --auth-token.
```

Para configurar
`~/.npmrc`
, utilice
[`flb login`](https://fleetbase.io/docs/cli/account/login)
o
`npm login --registry https://registry.fleetbase.io`
.

## Ejemplos

### Carga el paquete más reciente en el directorio actual

```
cd /path/to/your-extension
flb bundle
flb bundle-upload
```

La lógica de detección automática elige el paquete con la versión más alta. Es útil cuando se han creado varios paquetes para pruebas.

### Carga un archivo específico

```
flb bundle-upload vehicle-inspections-v1.2.0-bundle.tar.gz
```

### CI / sin interacción

```
flb bundle-upload --auth-token "$FLEETBASE_TOKEN"
```

## Qué se envía

La CLI envía el archivo como
`multipart/form-data`
(nombre de campo
`bundle`
) al punto final de carga del registro. El token se envía como
`Authorization: Bearer <token>`
.

Los límites de cuerpo y contenido son ilimitados en el cliente: el registro decide el tamaño máximo del paquete.

## Lógica de detección automática

Cuando no se pasa un nombre de archivo,
`flb bundle-upload`
:

1. Busca
   `--path`
   (predeterminado: directorio actual) archivos que coincidan con
   `*-v*-bundle.tar.gz`
2. Extrae la versión de cada nombre de archivo (apoya versiones como
   `1.0.0-rc.1`
   )
3. Ordena por semver y elige la más alta

Si no se encuentra ningún paquete, el comando se detiene:

```
No se encontró ningún archivo de paquete en el directorio actual.
```

## Solución de problemas

**`Error uploading bundle: …`**
— el registro rechazó la carga. Causas comunes:

* Token de autenticación inválido o caducado
* El paquete excede el límite de tamaño del registro
* Problema de red entre usted y el registro

**`Auth token not found for registry …`**
— configure la autenticación mediante
[`flb login`](https://fleetbase.io/docs/cli/account/login)
o
`npm login`
, o proporcione
`--auth-token`
.

## Paquete vs. Publicar

|  | `flb bundle-upload` | `flb publish` |
|---|---|---|
| Qué se envía | Un archivo `.tar.gz` preconstruido | El paquete npm a través de `npm publish` |
| Autenticación requerida | Token Bearer en `~/.npmrc` | Credenciales npm en `~/.npmrc` |
| Para | Almacenar archivos de distribución | Distribución estándar basada en npm |

Ambos se pueden utilizar para enviar una extensión. `publish` es el flujo nativo de npm; `bundle-upload` carga el archivo de forma separada para los canales de distribución que no obtienen datos de npm.