---
title: "Generar Token"
url: https://fleetbase.io/docs/cli/account/generate-token
module: cli
---

# Generar Token

Genera o regenera un token de autenticación de registro con una larga duración utilizando `flb generate-token` — ideal para las tuberías de CI/CD.

# flb generate-token

Genera (o regenera) un
**token de autenticación de registro**
para tu cuenta de desarrollador. Los tokens son ideales para las tuberías de CI/CD donde no quieres almacenar un nombre de usuario y una contraseña.

```
flb generate-token
```

Se te pedirá tu correo electrónico y contraseña. En caso de éxito, el registro devuelve un token: utiliza
[`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth)
para guardarlo en
`~/.npmrc`
, o pégalo directamente en un secreto de CI.

Generar un nuevo token
**reemplaza cualquier token previamente generado**
en tu cuenta. Las tuberías de CI que utilizan el token antiguo dejarán de funcionar hasta que las actualices.

## Opciones

| Opción | Descripción |
| --- | --- |
| `-e, --email <email>` | Dirección de correo electrónico |
| `-p, --password <password>` | Contraseña |
| `-h, --host <host>` | Host de la API (predeterminado: `https://api.fleetbase.io`) |

## Ejemplos

### Interactivo

```
flb generate-token
```

### Pre-llenar credenciales

```
flb generate-token -e jane@example.com
```

### Registro auto-alojado

```
flb generate-token --host registry.mycompany.com
```

## ¿Qué sucede en caso de éxito?

La CLI imprime el nuevo token, junto con el comando exacto
`flb set-auth`:

```
✓ Token generado con éxito

🔑 Tu Token de Registro:
   <valor_del_token>

💡 Guarda este token de forma segura.
   Utiliza: flb set-auth <valor_del_token>

⚠  Nota: Esto reemplaza cualquier token previamente generado.
```

## Uso en CI / CD

El patrón recomendado para CI es:

1. Ejecuta
   `flb generate-token`
   una vez localmente y obtén el token.
2. Guárdalo como un secreto en tu proveedor de CI (por ejemplo,
   `FLEETBASE_TOKEN`
   ).
3. En tu tubería, escribe el token en
   `~/.npmrc`
   antes de ejecutar
   `flb publish`:

```
# .github/workflows/publish-extension.yml (fragmento)
- name: Configurar la autenticación del registro
  run: flb set-auth $FLEETBASE_TOKEN
  env:
    FLEETBASE_TOKEN: ${{ secrets.FLEETBASE_TOKEN }}

- name: Publicar
  run: flb publish
```

## Solución de problemas

**`La generación del token falló: Credenciales inválidas`**
— verifica tu correo electrónico y contraseña.

**`La generación del token falló: No se recibió respuesta del servidor`**
— el host de la API no es accesible. Verifica tu valor `--host`.

[Configurar la autenticación

Escribe un token de autenticación de registro en el archivo `.npmrc` de tu instancia de Fleetbase y en el archivo `auth.json` de Composer utilizando `flb set-auth`.](https://fleetbase.io/docs/cli/account/set-auth)
[Buscar

Navega por el Registro de Extensiones de Fleetbase desde la línea de comandos con `flb search`.](https://fleetbase.io/docs/cli/extensions/search)