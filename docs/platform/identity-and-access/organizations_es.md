---
título: "Organizaciones"
url: https://fleetbase.io/docs/platform/identity-and-access/organizations
módulo: plataforma
---

# Organizaciones

Comprenda las dos distintas vistas de organizaciones en Fleetbase: la lista de administración a nivel de sistema y su panel de membresía personal.

# Organizaciones

Fleetbase está diseñado para ser multi-inquilino. Una sola instancia puede alojar múltiples organizaciones completamente aisladas, cada una con sus propios usuarios, datos, claves de API, extensiones y configuraciones. Ningún dato cruza las fronteras de las organizaciones, a menos que se comparta explícitamente a través de la API.

Existen dos lugares distintos en la consola donde aparecen las organizaciones: uno para los administradores a nivel del sistema, y otro para cada usuario que gestiona su propia membresía.

---

## Vista de Administrador — Todas las Organizaciones

Esta sección solo es accesible para
**administradores de la instancia**
(administradores a nivel del sistema).

Navegue a
**Administrador → Organizaciones**
para ver todas las organizaciones registradas en la instancia. Este es el panel de gestión global, no una vista de membresía personal.

![Lista de organizaciones — nombre de la organización, propietario, país y fecha de creación](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-organizations-list.d6afcb88.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

La lista muestra el nombre, el propietario, el país y la fecha de creación de cada organización. Haga clic en cualquier fila para ver o gestionar esa organización.

### Cómo se crean las organizaciones

Cuando cualquier usuario crea una cuenta en Fleetbase, se crea automáticamente una organización para él. Todos los recursos del sistema (órdenes, conductores, vehículos, contactos, webhooks) pertenecen a exactamente una organización.

### Casos de uso para múltiples inquilinos

La arquitectura de múltiples organizaciones se utiliza comúnmente para:

* **Departamentos internos**
  — Organizaciones separadas para diferentes equipos regionales o unidades de negocio que comparten una única instancia de Fleetbase
* **Plataformas de marca blanca**
  — Proveedores SaaS que utilizan Fleetbase para ofrecer su propio producto, donde cada cliente tiene una organización separada
* **Aislamiento del cliente**
  — Agencias o operadores logísticos que gestionan flotas en nombre de múltiples clientes, manteniendo los datos de cada cliente completamente aislados

---

## Vista de Usuario — Sus Organizaciones

Cada usuario puede ver y gestionar las organizaciones a las que pertenece. Esto es independiente del panel de administración y está disponible para todos los usuarios.

Navegue a
**Menú de usuario (avatar) → Su perfil → Organizaciones**
.

![Panel de organizaciones — lista de membresías con acciones de "Switch", "Editar", "Salir" y "Eliminar"](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-organizations-list.b4263575.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Este panel muestra todas las organizaciones a las que pertenece el usuario que ha iniciado sesión, incluyendo las organizaciones que posee y las organizaciones a las que ha sido invitado.

### Cambiar de organización

Haga clic en
**Cambiar**
al lado de cualquier organización para que sea el contexto activo. La consola se recarga inmediatamente y solo muestra los datos y la configuración de esa organización. La organización activa se muestra en la barra de navegación superior.

Los usuarios que pertenecen a una sola organización no necesitan cambiar, ya que la organización activa se establece automáticamente al iniciar sesión.

### Editar una organización

Los usuarios pueden editar el nombre, la descripción y la configuración de una organización si
**posee**
la organización o ha sido otorgado el permiso adecuado dentro de ella.

![Formulario para editar una organización — campos de nombre, descripción y configuración](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-organization-edit.cd060f6d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Los usuarios que no poseen la organización o no tienen los permisos necesarios no podrán ver las opciones de edición.

### Salir de una organización

Haga clic en
**Salir**
al lado de cualquier organización a la que pertenezca, pero que no posea. Salir lo elimina de la organización inmediatamente, y ya no tendrá acceso a sus datos ni a la consola.

No puede salir de una organización que posee. En su lugar, transfiera la propiedad o elimine la organización.

### Eliminar una organización

Los propietarios de la organización pueden eliminarla de este panel. Eliminar una organización elimina permanentemente todos los datos, usuarios, claves de API y recursos asociados. Esta acción no se puede deshacer.

Los usuarios que no son propietarios no podrán ver la opción de eliminar para esa organización.

---

## Invitaciones transorganizacionales

Cuando se invita a un usuario a una segunda organización por correo electrónico y ese correo electrónico ya tiene una cuenta en Fleetbase, se emite una invitación transorganizacional. El usuario acepta la invitación y obtiene acceso a la nueva organización, manteniendo su cuenta existente. Sus credenciales, la configuración de 2FA y su perfil permanecen sin cambios, solo el contexto de la organización activa cambia.

Consulte
[Usuarios](https://fleetbase.io/docs/platform/identity-and-access/users)
para obtener más detalles sobre el flujo de invitación.