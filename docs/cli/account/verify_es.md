---
title: "Verificar"
url: https://fleetbase.io/docs/cli/account/verify
module: cli
---

# Verificar

Verifique su correo electrónico de registro utilizando `flb verify` y obtenga su token de autenticación de registro.

# flb verify

Verifique el correo electrónico en una cuenta de registro que acaba de registrar. En caso de éxito, el registro devuelve su
**token de autenticación de registro**
— guárdelo; lo utilizará para publicar extensiones.

```
flb verify
```

Se le pedirá la dirección de correo electrónico y el código de verificación que se le envió por correo electrónico cuando se registró.

## Opciones

| Opción | Descripción |
| --- | --- |
| `-e, --email <email>` | Dirección de correo electrónico |
| `-c, --code <code>` | Código de verificación del correo electrónico |
| `-h, --host <host>` | Host de la API (predeterminado: `https://api.fleetbase.io`) |

Cualquier cosa que no pase se solicita de forma interactiva.

## Ejemplos

### Interactivos

```
flb verify
```

### De una sola línea

```
flb verify -e jane@example.com -c 482931
```

### Contra un registro autoalojado

```
flb verify -e jane@example.com -c 482931 --host registry.mycompany.com
```

## Lo que sucede en caso de éxito

La CLI imprime su
**Token de Registro**
y el comando exacto
`flb set-auth`
para guardarlo:

```
✓ Correo electrónico verificado con éxito.

🔑 Su Token de Registro:
   <valor_del_token>

💡 Guarde este token de forma segura. Lo necesitará para autenticarse con el registro.
   Utilice: flb set-auth <valor_del_token>

✓ Ahora puede iniciar sesión con: flb login -u <nombre_de_usuario>
```

Ejecute el comando `flb set-auth` que se imprime para escribir el token en su
`~/.npmrc`
para que los comandos posteriores de
`flb`
puedan autenticarse. Consulte
[Establecer autenticación](https://fleetbase.io/docs/cli/account/set-auth)
.

## Si el correo electrónico nunca llega

Utilice
[`flb resend-verification`](https://fleetbase.io/docs/cli/account/resend-verification)
para solicitar un nuevo código.

## Solución de problemas

**`Verificación fallida: Código inválido`**
— los códigos son de uso único y tienen un tiempo limitado. Solicite uno nuevo con
`flb resend-verification`
.

**`Verificación fallida: No se recibió respuesta del servidor`**
— el host de la API no es accesible. Verifique su valor `--host`.