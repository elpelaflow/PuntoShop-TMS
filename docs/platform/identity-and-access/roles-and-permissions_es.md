---
title: "Roles y Permisos"
url: https://fleetbase.io/docs/platform/identity-and-access/roles-and-permissions
module: platform
---

# Roles y Permisos

Cree y asigne roles que otorguen a los usuarios acceso a recursos y acciones específicos en la plataforma Fleetbase.

# Roles y Permisos

Los roles son colecciones nombradas de permisos. Asignar un rol a un usuario le otorga todos los permisos que ese rol permite. Fleetbase viene con un conjunto de roles predefinidos y le permite crear roles personalizados con permisos granulares, por recurso. Navegue a
**IAM → Roles**
para gestionarlos.

![Lista de roles — Nombre, Descripción, Servicio, Tipo, Columnas Creadas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-roles-list.9743ee96.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Tipos de Roles

| Tipo | Descripción |
|---|---|
| **Gestionado por FLB** | Roles predefinidos creados por Fleetbase. Solo lectura — sus permisos se pueden ver, pero no se pueden editar ni eliminar. |
| **Gestionado por la Organización** | Roles personalizados creados por su organización. Completamente editables y eliminables. |

Los roles gestionados por FLB aparecen en la lista junto con sus roles personalizados. Al hacer clic en un rol inmutable, se abre una vista de permisos de solo lectura en lugar del formulario de edición.

## Cómo funcionan los permisos

Cada permiso sigue el patrón
`{servicio} {acción} {recurso}`
. Por ejemplo:

* `iam create user`
  — crear usuarios en el servicio IAM
* `fleet-ops list order`
  — listar pedidos en Fleet-Ops
* `fleet-ops update driver`
  — actualizar registros de conductores en Fleet-Ops

Los servicios corresponden a extensiones y motores de la plataforma (por ejemplo,
`iam`
,
`fleet-ops`
,
`ledger`
). Los permisos se actualizan automáticamente cuando se instalan las extensiones, por lo que la lista crece a medida que agrega extensiones a su instancia.

Cuando se asigna un rol a un usuario, este hereda todos los permisos asociados a ese rol. Las políticas y permisos individuales asignados al usuario se suman a los permisos del rol.

## Crear un Rol

Haga clic en
**Nuevo**
para crear un rol personalizado.

![Formulario de rol — Nombre, Descripción, Adjuntar Políticas, y Cuadro de selección de permisos](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-role-create.643eef04.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Campo | Descripción |
|---|---|
| **Nombre del Rol** | Un nombre descriptivo para el rol (por ejemplo, `Dispatcher` , `Visualizador de Solo Lectura`) |
| **Descripción** | Descripción opcional de para qué sirve este rol |
| **Adjuntar Políticas** | Adjunte políticas existentes al rol — los usuarios asignados a este rol también heredarán esas políticas |
| **Seleccionar Permisos** | Elija permisos individuales del selector de permisos |

Los nombres de los roles no pueden ser
`Administrador`
o comenzar con
`Admin`
— ese nombre está reservado para el sistema.

El selector de permisos muestra todos los permisos disponibles en todas las extensiones instaladas, y se pueden buscar por palabra clave. Marque o desmarque los permisos individuales, o utilice
**Alternar Selección**
para invertir la selección actual.

## Editar un Rol

Haga clic en cualquier nombre de rol gestionado por la Organización o utilice la acción
**⋯ → Editar**
para abrir el formulario del rol. Los cambios se aplican a todos los usuarios actualmente asignados al rol inmediatamente después de guardar.

Los roles gestionados por FLB abren una vista de permisos de solo lectura cuando se hacen clic — no se pueden modificar.

## Eliminar un Rol

Utilice
**⋯ → Eliminar**
en cualquier rol gestionado por la Organización. Los roles gestionados por FLB no se pueden eliminar. Si un rol está asignado a usuarios, esos usuarios perderán los permisos que proporciona el rol — reasigne antes de eliminarlo.

## Asignar Roles a Usuarios

Los roles se asignan desde el
[Usuarios](https://fleetbase.io/docs/platform/identity-and-access/users)
cuando se crea o edita un usuario. Cada usuario tiene un solo rol; se pueden agregar permisos adicionales a través de políticas directas o permisos individuales.