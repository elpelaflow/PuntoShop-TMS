---
título: "Reenviar Verificación"
url: https://fleetbase.io/docs/cli/account/resend-verification
módulo: cli
---

# Reenviar Verificación

Solicite un nuevo código de verificación utilizando el comando `flb resend-verification`.

# flb resend-verification

Solicite que el registro envíe un nuevo código de verificación por correo electrónico. Utilícelo cuando el correo electrónico original enviado por
`flb register`
no haya llegado, o cuando el código haya caducado.

```
flb resend-verification
```

Se le pedirá que introduzca la dirección de correo electrónico.

## Opciones

| Opción | Descripción |
| --- | --- |
| `-e, --email <email>` | Dirección de correo electrónico |
| `-h, --host <host>` | Host de la API (predeterminado: `https://api.fleetbase.io`) |

## Ejemplos

```
flb resend-verification -e jane@example.com
```

Contra un registro autoalojado:

```
flb resend-verification -e jane@example.com --host registry.mycompany.com
```

## ¿Qué ocurre en caso de éxito?

El registro envía un nuevo código a la dirección de correo electrónico. La CLI imprime el siguiente comando para ejecutar:

```
✓ Código de verificación enviado.
✓ Consulte su correo electrónico para obtener el nuevo código de verificación.

👉 Una vez que lo haya recibido, ejecute:
   flb verify -e jane@example.com
```

## Solución de problemas

**`No se pudo reenviar: No se recibió respuesta del servidor`**
— el host de la API no es accesible. Verifique su valor `--host`.

**No llega ningún correo electrónico, incluso después de reenviarlo**
— verifique la carpeta de correo no deseado; verifique que la dirección de correo electrónico sea correcta (el registro no le indicará si una dirección de correo electrónico con errores coincide con ninguna cuenta, para evitar revelar la existencia de una cuenta). Si la ha introducido incorrectamente, póngase en contacto con el soporte para eliminar la cuenta no verificada.