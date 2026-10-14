---
title: "Grupos"
url: https://fleetbase.io/docs/platform/identity-and-access/groups
module: platform
---

# Grupos

Organice a los usuarios en grupos para simplificar la gestión del acceso: defina las políticas una vez y aplíquelas a una colección de usuarios de forma simultánea.

# Grupos

Los grupos le permiten agrupar a los usuarios bajo un nombre común. En lugar de aplicar políticas a cada usuario individualmente, las aplica a un grupo y añade usuarios a él. Navegue a
**IAM → Grupos**
para gestionarlos.

![Lista de grupos — Nombre, Descripción, avatar de los miembros, columnas de creación](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-groups-list.a78d9db8.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Crear un Grupo

Haga clic en
**Nuevo**
para crear un grupo.

![Formulario de grupo — Nombre, Descripción y lista de búsqueda de miembros](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-group-create.cf872598.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Campo | Descripción |
|---|---|
| **Nombre del grupo** | Un nombre descriptivo para el grupo (por ejemplo, `Distribuidores de Singapur`, `Auditores de solo lectura`) |
| **Descripción** | Descripción opcional del propósito del grupo |
| **Miembros** | Busque y añada usuarios al grupo. Los usuarios añadidos aparecen en la lista de miembros a continuación. Haga clic en el icono "×" junto a un usuario para eliminarlo. |

## Gestionar miembros

Los miembros se pueden añadir o eliminar en cualquier momento editando el grupo. Busque por nombre en el selector de usuarios para encontrar y añadir usuarios. Los cambios se aplican inmediatamente: no hay estado pendiente para la pertenencia a un grupo.

![Lista de miembros del grupo con botones de eliminación y selector de búsqueda de usuarios](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-group-members.d53a72fc.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Editar un Grupo

Haga clic en el nombre de cualquier grupo o utilice
**⋯ → Editar**
para abrir el formulario del grupo. Puede cambiar el nombre del grupo, actualizar la descripción y añadir o eliminar miembros.

## Eliminar un Grupo

Utilice
**⋯ → Eliminar**
en cualquier grupo. Eliminar un grupo elimina el registro del grupo y todas las membresías: no elimina las cuentas de usuario.

## Acciones masivas

Seleccione varios grupos y utilice el menú desplegable
**Acción masiva**
para eliminarlos en una sola operación.

## Exportar Grupos

Haga clic en
**Exportar**
para descargar la lista de grupos como un archivo: útil para auditar la pertenencia o migrar la estructura de los grupos a otra instancia.