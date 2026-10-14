---
título: "Iniciar sesión"
url: https://fleetbase.io/docs/cli/account/login
módulo: cli
---

# Iniciar sesión

Autentícate con el registro de Fleetbase utilizando `flb login` — internamente, esto escribe las credenciales en tu `.npmrc`.

# flb login

Inicia sesión en el Registro de Extensiones de Fleetbase utilizando tu nombre de usuario, contraseña y correo electrónico. Internamente, la CLI delega a
`npm-cli-login`
, que escribe una entrada de autenticación en el registro en tu
`~/.npmrc`.

```
flb login -u <username> -p <password> -e <email>
```

Los tres parámetros
`--username`
,
`--password`
y
`--email`
son obligatorios.

## Opciones

| Opción | Obligatorio | Descripción |
|---|---|---|
| `-u, --username <username>` | sí | Nombre de usuario del registro |
| `-p, --password <password>` | sí | Contraseña del registro |
| `-e, --email <email>` | sí | Dirección de correo electrónico registrada |
| `-r, --registry <registry>` | no | URL del registro (predeterminado: `https://registry.fleetbase.io`) |
| `--scope <scope>` | no | Limitar las credenciales a un ámbito (por ejemplo, `@mycompany`) |
| `--quotes <quotes>` | no | Opción de comillas de `npm-cli-login` |
| `--config-path <configPath>` | no | Ruta a un `.npmrc` personalizado |

## Ejemplos

### Inicio de sesión estándar

```
flb login -u jane -p secret -e jane@example.com
```

### Registro autoalojado

```
flb login \
  -u jane -p secret -e jane@example.com \
  -r https://registry.mycompany.com
```

### Credenciales con ámbito

```
flb login \
  -u jane -p secret -e jane@example.com \
  --scope @mycompany
```

Esto limita las credenciales a los paquetes dentro del ámbito
`@mycompany`.

## Cuándo usar esto vs. set-auth

* **`flb login`**
  escribe las credenciales derivadas del nombre de usuario/contraseña/correo electrónico. Es la opción más común para su uso interactivo.
* **[`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth)**
  escribe un **token** de larga duración (devuelto por
  `flb verify`
  o
  `flb generate-token`). Es la mejor opción para CI/CD, donde almacenar una contraseña no es viable.

Ambos terminan en tu
`~/.npmrc`
(o en el archivo en
`--config-path`). Ambos funcionan para
`flb publish`
y
`flb bundle-upload`.

## Solución de problemas

**"Se requieren nombre de usuario, contraseña y correo electrónico para iniciar sesión."**
— proporciona todas las tres opciones.

**"Error durante el inicio de sesión: …"**
— la llamada subyacente a
`npm-cli-login`
falló; verifica que la URL del registro sea accesible y que las credenciales sean correctas.

[Reenviar la verificación
Solicita un nuevo código de verificación del registro utilizando `flb resend-verification`.](https://fleetbase.io/docs/cli/account/resend-verification)
[Establecer la autenticación
Escribe un token de autenticación del registro en el `.npmrc` de tu instancia de Fleetbase y en el `auth.json` de Composer utilizando `flb set-auth`.](https://fleetbase.io/docs/cli/account/set-auth)