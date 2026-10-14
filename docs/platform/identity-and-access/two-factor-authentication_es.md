---
título: "Autenticación de dos factores"
url: https://fleetbase.io/docs/platform/identity-and-access/two-factor-authentication
módulo: platform
---

# Autenticación de dos factores

Habilite la autenticación de dos factores en su cuenta personal, aplíquela para su organización, o configurela a nivel del sistema para todos los usuarios.

# Autenticación de dos factores

La autenticación de dos factores (2FA) añade un segundo paso de verificación al inicio de sesión. Después de ingresar una contraseña, los usuarios deben confirmar un código único antes de acceder. Existen tres niveles donde se puede configurar la 2FA:

| Nivel | Dónde | Quién lo controla |
|---|---|---|
| **Usuario** | Su perfil → Autenticación | Cada usuario para su propia cuenta |
| **Organización** | Configuración de la organización → Dos factores | Administradores de la organización para los usuarios de su organización |
| **A nivel del sistema** | Administrador → Configuración de autenticación → Autenticación de dos factores | Administradores de la instancia para todas las organizaciones |

La 2FA se aplica independientemente de cómo inicie sesión. Si
[inicia sesión con un proveedor](https://fleetbase.io/docs/platform/identity-and-access/oauth-sign-in), aún se le pedirá que ingrese su código único posteriormente.

---

## Autenticación de dos factores a nivel de usuario

Los usuarios individuales pueden habilitar la 2FA en su propia cuenta. La sección de configuración de la 2FA solo es visible cuando el administrador de la instancia ha habilitado la 2FA a nivel del sistema.

### Abra su perfil

Haga clic en su avatar en la esquina superior derecha del panel y seleccione
**Su perfil**
. Esto abrirá su perfil personal y la configuración de la cuenta.

### Encuentre la sección de Autenticación

Haga clic en la pestaña
**Autenticación**
en la página de su perfil.

![Pestaña de Autenticación del perfil — selector de método de 2FA y interruptor de habilitar debajo del panel de Cambiar contraseña](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-user-two-factor.2f462755.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Elija un método

Seleccione cómo desea recibir sus códigos únicos:

| Método | Descripción |
|---|---|
| **Correo electrónico** | Se envía un código a su dirección de correo electrónico registrada al iniciar sesión |
| **SMS** | Se envía un código a su número de teléfono registrado — requiere la configuración de Twilio en la instancia |

### Habilite y Guarde

Habilite la 2FA y haga clic en
**Guardar la configuración de 2FA**
. Desde su próximo inicio de sesión, se le pedirá que ingrese un código después de ingresar su contraseña.

### Iniciar sesión con 2FA habilitado

1. Ingrese su correo electrónico y contraseña como de costumbre
2. Se envía un código único a su correo electrónico o teléfono
3. Ingrese el código para completar el inicio de sesión

Los códigos caducan después de un breve período. Si no recibe un código, verifique su carpeta de correo no deseado (para correo electrónico) o confirme que su número de teléfono está en su perfil (para SMS), y luego solicite un nuevo código.

### Deshabilitar la 2FA a nivel de usuario

Vuelva a
**Su perfil → Autenticación**
y desactive la 2FA. No se le pedirá un código en futuros inicios de sesión, a menos que su organización o el sistema lo exijan.

---

## Autenticación de dos factores a nivel de organización

Los administradores de la organización pueden exigir que todos los usuarios dentro de su organización configuren la 2FA. Navegue a
**Configuración de la organización → Dos factores**
para configurarlo.

![Configuración de dos factores de la organización — interruptor de Habilitar Autenticación de dos factores y Guardar la configuración de 2FA](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-organization-two-factor.bd1d51c0.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Configuración | Descripción |
|---|---|
| **Habilitar Autenticación de dos factores** | Hace que la 2FA esté disponible como una opción para los usuarios en esta organización |
| **Exigir que los usuarios configuren la 2FA** | Obliga a todos los usuarios de la organización a configurar la 2FA en su próximo inicio de sesión — no pueden acceder al panel hasta que se complete la configuración |

Haga clic en
**Guardar la configuración de 2FA**
para aplicar. El interruptor de aplicación solo aparece cuando la 2FA está habilitada.

La aplicación de la 2FA a nivel de organización solo controla el acceso dentro de su organización. Los métodos de entrega disponibles (correo electrónico o SMS) se determinan por la configuración a nivel del sistema establecida por el administrador de la instancia.

---

## Autenticación de dos factores a nivel del sistema

Los administradores de la instancia pueden habilitar y aplicar la 2FA en toda la instancia de Fleetbase — para todos los usuarios en todas las organizaciones. Esto se configura desde
**Administrador → Configuración de autenticación → Autenticación de dos factores**
.

Consulte
[Configuración del sistema → Autenticación de dos factores](https://fleetbase.io/docs/platform/system-setup/two-factor-authentication)
para obtener más detalles.