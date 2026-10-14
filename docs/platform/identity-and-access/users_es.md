---
título: "Usuarios"
url: https://fleetbase.io/docs/platform/identity-and-access/users
módulo: plataforma
---

# Usuarios

Invita, crea y gestiona usuarios en tu organización Fleetbase: roles, estados, permisos y acciones de ciclo de vida.

# Usuarios

Cada persona con acceso a Fleetbase tiene una cuenta de usuario. Los usuarios pertenecen a una organización, tienen un rol asignado y pueden tener políticas y permisos adicionales asociados directamente. Navega a
**IAM → Usuarios**
para gestionarlos.

![Lista de usuarios IAM — Nombre, Correo electrónico, Teléfono, Rol, Estado, Última entrada](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-users-list.e84c182c.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Tipos de Usuarios

La sección de Usuarios tiene tres pestañas, cada una enfocada en un tipo de cuenta diferente:

| Pestaña | Descripción |
|---|---|
| **Usuarios** | Miembros del equipo interno: personal de operaciones, despachadores, administradores |
| **Clientes** | Cuentas de clientes y dadores de carga creadas a través de Fleet-Ops o la API |
| **Conductores** | Cuentas de conductores vinculadas a la aplicación móvil Navigator |

## Estado del Usuario

| Estado | Descripción |
|---|---|
| **Pendiente** | Invitado, pero aún no ha aceptado. Aparece en la lista, pero no puede iniciar sesión hasta que se acepte la invitación y se establezca una contraseña. |
| **Activo** | Acceso completo. El usuario puede iniciar sesión y utilizar la consola. |
| **Inactivo** | Desactivado. No puede iniciar sesión. La cuenta y los datos se conservan y se pueden reactivar en cualquier momento. |

## Invitar a un Usuario

Haz clic en
**Invitar Usuario**
para enviar un correo electrónico de invitación. El flujo de invitación gestiona dos casos de forma transparente:

* **Nueva dirección de correo electrónico**
  — Se crea inmediatamente un registro de usuario "Pendiente" y se envía un correo electrónico de invitación. El usuario establece su contraseña al aceptar.
* **Dirección de correo electrónico existente (otra organización)**
  — Se emite una invitación trans-organizacional. El usuario conserva su contraseña existente y se une a tu organización al aceptar.

![Modal de invitación de usuario — Campos de Correo electrónico, Nombre y Rol](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-user-invite.0098bd0d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Campo | Descripción |
|---|---|
| **Correo electrónico** | La dirección de correo electrónico del destinatario — obligatorio |
| **Nombre** | Nombre de visualización opcional, pre-completado para el usuario invitado |
| **Rol** | Rol opcional asignado automáticamente al aceptar |

## Crear un Usuario Directamente

Haz clic en
**Nuevo**
para crear una cuenta de usuario sin enviar un correo electrónico de invitación — útil cuando se están configurando cuentas de antemano o se están distribuyendo credenciales a través de un canal separado.

![Modal de creación de usuario — Campos de foto, Nombre, Correo electrónico, Teléfono, País, Rol, Políticas, Permisos](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-user-create.78e6e096.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Campo | Descripción |
|---|---|
| **Foto** | Carga una imagen de avatar |
| **Nombre** | Nombre completo de visualización |
| **Correo electrónico** | Dirección de correo electrónico para iniciar sesión |
| **Teléfono** | Número de teléfono — utilizado para notificaciones SMS y autenticación de dos factores (2FA) a través de SMS |
| **País** | País del usuario |
| **Rol** | Asigna un rol de tu lista de roles de la organización |
| **Adjuntar políticas** | Adjunta una o más políticas directamente a este usuario, complementando el rol |
| **Seleccionar permisos** | Otorga permisos individuales más allá de lo que proporciona el rol asignado |

## Acciones por Usuario

Haz clic en el menú
**⋯**
en cualquier fila para acceder a las acciones de ciclo de vida para ese usuario:

| Acción | Descripción |
|---|---|
| **Editar** | Abre el formulario de usuario para actualizar cualquier campo |
| **Ver permisos** | Visualiza el conjunto de permisos resuelto completo para este usuario (rol + políticas directas + permisos individuales) |
| **Reenviar invitación** | Reenvía el correo electrónico de invitación — visible solo para los usuarios "Pendientes" |
| **Desactivar** | Bloquea el acceso de inicio de sesión sin eliminar la cuenta |
| **Activar** | Restaura el acceso para un usuario desactivado |
| **Verificar** | Marca manualmente la dirección de correo electrónico del usuario como verificada |
| **Cambiar contraseña** | Establece una nueva contraseña para el usuario directamente desde el panel de administración |
| **Eliminar** | Elimina al usuario de la organización |

No puedes eliminar tu propia cuenta desde este panel.

## Acciones Masivas

Selecciona múltiples usuarios con las casillas de verificación de fila, luego utiliza el menú desplegable
**Acción masiva**
para eliminar los usuarios seleccionados en una sola operación.

## Búsqueda y Filtrado

Utiliza la barra de búsqueda para encontrar usuarios por nombre, correo electrónico o número de teléfono. El selector de filtros te permite reducir los resultados por rol o estado.