---
título: "Registrarse"
url: https://fleetbase.io/docs/cli/account/register
módulo: cli
---

# Registrarse

Cree una cuenta de desarrollador para el Registro de Extensiones de Fleetbase utilizando `flb register` para que pueda publicar sus propias extensiones.

# flb register

Cree una cuenta de desarrollador en el Registro de Extensiones de Fleetbase. Necesita una cuenta para publicar extensiones; la gestión o instalación de extensiones **no** requiere una cuenta.

```
flb register
```

El comando solicita su nombre de usuario, dirección de correo electrónico, contraseña y (opcionalmente) su nombre completo. Después de un registro exitoso, el registro envía un código de verificación a su correo electrónico; complete el proceso con
[`flb verify`](https://fleetbase.io/docs/cli/account/verify)
.

## Opciones

| Opción | Descripción |
|---|---|
| `-u, --username <username>` | Nombre de usuario (3+ caracteres, letras/números/guiones/guiones bajos) |
| `-e, --email <email>` | Dirección de correo electrónico |
| `-p, --password <password>` | Contraseña (8+ caracteres) |
| `-n, --name <name>` | Nombre completo (opcional) |
| `-h, --host <host>` | Host de la API (predeterminado: `https://api.fleetbase.io`) |

Cualquier cosa que no pase en la línea de comandos se solicita de forma interactiva. Si pasa `--password`, omitirá el mensaje; esto es útil para la configuración automatizada, pero tenga en cuenta el historial de la shell.

## Ejemplos

### Interactivos

```
flb register
```

### Rellene algunas respuestas

```
flb register -u jane -e jane@example.com -n "Jane Doe"
```

Aún se le pedirá que introduzca una contraseña.

### Contra un registro autoalojado

```
flb register --host registry.mycompany.com
```

El host se normaliza: `registry.mycompany.com` se convierte en `https://registry.mycompany.com`.

## Reglas de validación

* **Nombre de usuario**
  — al menos 3 caracteres; solo letras, números, guiones y guiones bajos
* **Correo electrónico**
  — debe contener `@`
* **Contraseña**
  — al menos 8 caracteres

Si la API rechaza el registro (por ejemplo, la dirección de correo electrónico ya está en uso), se mostrarán los errores por campo.

## Después del registro

La CLI imprime los siguientes dos comandos que necesita:

```
# Verificar el correo electrónico
flb verify -e <your-email>

# Una vez verificado, iniciar sesión
flb login -u <your-username>
```

Consulte [Verificar](https://fleetbase.io/docs/cli/account/verify) para el flujo de verificación, o [Reenviar Verificación](https://fleetbase.io/docs/cli/account/resend-verification) si el correo electrónico nunca llega.

[Instalar Fleetbase

Instale una instancia de Fleetbase autoalojada en su propia infraestructura utilizando `flb install-fleetbase` — un asistente interactivo basado en Docker.](https://fleetbase.io/docs/cli/installation/overview)
[Verificar

Verifique su correo electrónico de registro utilizando `flb verify` y obtenga su token de autenticación de registro.](https://fleetbase.io/docs/cli/account/verify)