---
título: "Configurar autenticación"
url: https://fleetbase.io/docs/cli/account/set-auth
módulo: cli
---

# Configurar autenticación

Escribe un token de autenticación del registro en el archivo `.npmrc` de tu instancia de Fleetbase y en el archivo `auth.json` de Composer utilizando `flb set-auth`.

# flb set-auth

Escribe un token de autenticación del registro en el archivo
`console/.npmrc`
(para npm) y
`api/auth.json`
(para Composer). Ejecuta esto después de
[`flb verify`](https://fleetbase.io/docs/cli/account/verify)
o
[`flb generate-token`](https://fleetbase.io/docs/cli/account/generate-token)
devuelva un token.

```
flb set-auth <token>
```

El token es el valor que imprime
`verify`
o
`generate-token`
. La CLI lo escribe para ambos gestores de paquetes en una sola operación: las extensiones de Fleetbase suelen distribuirse de forma dual (paquete npm para el complemento, paquete Composer para la API), y ambos archivos de autenticación necesitan el token.

## Opciones

| Opción | Descripción |
|---|---|
| `[token]` | El token de autenticación (argumento posicional) |
| `-p, --path <ruta>` | Ruta a la instancia de Fleetbase (predeterminado: directorio actual; se vuelve a `/fleetbase`) |
| `-r, --registry <url>` | URL del registro para el que es válido el token (predeterminado: `https://registry.fleetbase.io`) |

## Ejemplos

### Desde dentro de tu directorio de Fleetbase

```
cd /path/to/fleetbase
flb set-auth <token>
```

### Desde cualquier lugar con `--path`

```
flb set-auth <token> --path /path/to/fleetbase
```

### Registro auto-alojado

```
flb set-auth <token> --registry https://registry.mycompany.com
```

## Qué se escribe

`flb set-auth`
actualiza dos archivos dentro de tu instancia de Fleetbase:

| Archivo | Formato |
|---|---|
| `console/.npmrc` | Añade `//<host-registro>/:_authToken="<token>"` |
| `api/auth.json` | Añade `{ "bearer": { "<host-registro>": "<token>" } }` |

Si
`console/.npmrc`
ya existe, la línea del token se
**añade**
— las líneas de autenticación existentes para otros registros se conservan. Lo mismo se aplica a
`api/auth.json`
— las entradas existentes de
`bearer`
para otros hosts se mantienen y la nueva entrada se fusiona.

## Resolución de rutas

La CLI resuelve la ruta de la instancia de Fleetbase en el siguiente orden:

1. La ruta proporcionada a través de
   `--path`
   , o el directorio actual
2. Si ninguno contiene tanto
   `console/`
   como
   `api/`
   subdirectorios, se vuelve a
   `/fleetbase`

Si ninguna de estas ubicaciones es una instalación válida de Fleetbase,
`set-auth`
escribe de todos modos, pero los archivos resultantes no serán detectados por tu instalador hasta que los copies al lugar correcto.

## Cuándo necesitas esto

Necesitas configurar la autenticación en la instancia siempre que vayas a:

* **Instalar una extensión de pago o privada**
  —
  `flb install`
  necesita acceso a
  `_authToken`
  para recuperar el paquete del registro
* **Desarrollar contra un registro**
  —
  `composer require`
  y
  `pnpm install`
  desde tu consola / API necesitan credenciales

No necesitas
`flb set-auth`
para instalar extensiones
**gratuitas y públicas**.

## Diferencia entre flb login

|  | `flb login` | `flb set-auth` |
|---|---|---|
| Escribe en | `~/.npmrc` (tu directorio de inicio) | `console/.npmrc` + `api/auth.json` (la instancia) |
| Método de autenticación | Nombre de usuario + contraseña | Token |
| Ideal para | Uso interactivo en tu máquina de desarrollo | CI, instalaciones de servidor, configuraciones sin cabeza |