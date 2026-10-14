---
Título: Inicio de sesión con un proveedor
URL: https://fleetbase.io/docs/platform/identity-and-access/oauth-sign-in
Módulo: plataforma
---

# Inicio de sesión con un proveedor

Inicia sesión o crea una cuenta con Google, Microsoft, GitHub o Apple, y gestiona los proveedores vinculados a tu cuenta de Fleetbase.

# Inicio de sesión con un proveedor

Si tu administrador lo ha configurado, puedes iniciar sesión en la consola utilizando una cuenta que ya tienes en Google, Microsoft, GitHub o Apple, en lugar de una contraseña de Fleetbase. Puedes vincular más de una cuenta, y aún así puedes conservar tu contraseña.

El inicio de sesión con un proveedor solo está disponible cuando un administrador lo ha configurado. Consulta
[Configuración del sistema → Inicio de sesión con OAuth](https://fleetbase.io/docs/platform/system-setup/oauth-sign-in)
si lo estás configurando.

## Inicio de sesión

En la página de inicio de sesión, haz clic en
**Continuar con Google**
—o Microsoft, GitHub o Apple— debajo del
**O continuar con**
. Se te redirigirá al proveedor y volverás a la consola una vez que lo hayas aprobado.

Si tienes activada la autenticación de dos factores, se te pedirá que introduzcas tu código único después de que el proveedor te devuelva. El inicio de sesión con un proveedor nunca omite la autenticación de dos factores.

La primera vez que uses un proveedor, ocurre una de estas cosas:

| Situación | Qué ocurre |
|---|---|
| El proveedor ya está vinculado a tu cuenta | Estás iniciado sesión |
| El enlace automático está activado, el proveedor ha verificado tu correo electrónico y coincide con la dirección de correo electrónico de tu cuenta confirmada | El proveedor está vinculado a tu cuenta, estás iniciado sesión y se te envía un correo electrónico sobre el nuevo enlace |
| Ya tienes una cuenta de correo electrónico, pero no puedes vincularla automáticamente | Se te pide que inicies sesión de otra manera y vincules el proveedor tú mismo —consulta [Vinculación de un proveedor](#vinculación-de-un-proveedor) |

Tu cuenta solo se encuentra a través de un proveedor que hayas vinculado. Tener la misma dirección de correo electrónico nunca inicia sesión a nadie.

## Registro

Si tu administrador permite nuevos registros a través de un proveedor, los mismos botones aparecen en la página de registro, debajo del
**O registrarse con correo electrónico**
.

### Elige un proveedor

Haz clic en
**Continuar con Google**
, Microsoft, GitHub o Apple, y aprueba la solicitud.

### Completa el formulario de registro

Se completarán tu nombre y dirección de correo electrónico, y no se requiere contraseña; a partir de ahora, iniciarás sesión con tu proveedor.

Si el proveedor ha confirmado tu dirección de correo electrónico, el campo de correo electrónico estará bloqueado. De lo contrario, puedes cambiarlo y confirmarlo con un código como de costumbre.

### Crear la cuenta

Una vez que el proveedor haya confirmado tu dirección de correo electrónico, tu cuenta estará verificada y no se enviará ningún código de verificación.

Hay dos cosas que debes tener en cuenta al registrarte:

* Si vuelves a cargar la página de registro, empieza desde el botón del proveedor. El registro solo está disponible durante una visita.
* Si ya tienes una cuenta, hacer clic en un botón del proveedor en la página de registro te inicia sesión en lugar de crear una segunda cuenta.

Una dirección de correo electrónico que ya tiene una cuenta nunca se utiliza para crear otra. Inicia sesión y vincula el proveedor en su lugar.

## Vincular un proveedor

El enlace te permite iniciar sesión con un proveedor en una cuenta que has creado con una contraseña.

### Abre tu perfil

Haz clic en tu avatar en la esquina superior derecha de la consola y selecciona
**Tu perfil**
.

### Encuentra las cuentas vinculadas

Haz clic en la pestaña
**Aut**
. El panel
**Cuentas vinculadas**
lista los proveedores que has vinculado en
**Vinculados**
, y los demás en
**Disponibles para vincular**
.

### Vincula el proveedor

Haz clic en
**Vincular**
al lado de un proveedor y aprueba la solicitud. Se te redirigirá a la
**Pestaña Aut**
, y el proveedor pasará a
**Vinculados**
.

Puedes vincular una cuenta por proveedor, y una cuenta de proveedor que ya esté vinculada a otro usuario de Fleetbase no puede vincularse a la tuya.

## Desvincular un proveedor

En
**Cuentas vinculadas**
, haz clic en
**Desvincular**
al lado del proveedor vinculado y confirma. Puedes volver a vincularlo más tarde.

No puedes eliminar tu última forma de iniciar sesión. Si no tienes contraseña y solo tienes un proveedor vinculado, establece una contraseña o vincula otro proveedor primero; de lo contrario, el botón
**Desvincular**
permanecerá desactivado.

Se te enviará un correo electrónico cada vez que se vincule o se elimine un proveedor de tu cuenta, para que sepas si alguien más lo hace.

## ¿Quién puede usar el inicio de sesión con un proveedor?

El inicio de sesión con un proveedor está destinado a cuentas de miembros del equipo, las mismas cuentas que pueden iniciar sesión en la consola con una contraseña.

* Los **clientes**
  inician sesión a través del Portal del Cliente, no a través de la consola.
* Los **conductores y contactos**
  no pueden iniciar sesión en la consola en absoluto. Los conductores utilizan la aplicación Navigator.

Consulta
[Usuarios](https://fleetbase.io/docs/platform/identity-and-access/users)
para obtener información sobre cómo difieren los tipos de cuenta, y
[Autenticación de dos factores](https://fleetbase.io/docs/platform/identity-and-access/two-factor-authentication)
para el segundo paso que se aplica tanto al inicio de sesión con contraseña como con proveedor.