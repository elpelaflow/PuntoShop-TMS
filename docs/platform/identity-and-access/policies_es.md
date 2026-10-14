---
title: "Políticas"
url: https://fleetbase.io/docs/platform/identity-and-access/policies
module: platform
---

# Políticas

Cree paquetes reutilizables de permisos que pueden asociarse a usuarios y roles en toda su organización Fleetbase.

# Políticas

Las políticas son paquetes reutilizables de permisos que pueden asociarse a usuarios o roles. Mientras que un rol define el nivel de acceso primario de un usuario, las políticas le permiten otorgar permisos adicionales y específicos sin tener que crear un nuevo rol para cada combinación. Navegue a
**IAM → Políticas**
para gestionarlas.

![Lista de políticas — Nombre, Descripción, Servicio, Tipo, Columnas Creadas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-policies-list.2595ad12.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Tipos de Políticas

| Tipo | Descripción |
|---|---|
| **Gestionadas por FLB** | Políticas integradas proporcionadas por Fleetbase. Solo lectura — se pueden asociar a usuarios y roles, pero no se pueden editar ni eliminar. |
| **Gestionadas por la Organización** | Políticas personalizadas creadas por su organización. Completamente editables y eliminables. |

Las políticas gestionadas por FLB suelen corresponder a patrones de acceso predefinidos (por ejemplo, una política de solo lectura para un servicio específico). Al hacer clic en una política inmutable, se abre una vista de permisos que muestra lo que otorga.

## Cómo se combinan las políticas con los roles

Las permisos efectivos de un usuario son la unión de:

1. Los permisos de su rol asignado: **rol**
2. Los permisos de las **políticas** asociadas al rol
3. Los permisos de las **políticas** asociadas directamente al usuario
4. **Permisos individuales** otorgados directamente al usuario

Las políticas son puramente aditivas — no hay ningún mecanismo de denegación. Si necesita restringir el acceso, utilice un rol más limitado en lugar de depender de la ausencia de una política.

## Creando una política

Haga clic en **Nuevo** para crear una política personalizada.

![Formulario de política — Nombre, Descripción y cuadrícula de selección de permisos](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-policy-create.7a4a5497.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Campo | Descripción |
|---|---|
| **Nombre de la política** | Un nombre descriptivo (por ejemplo, `Acceso de solo lectura para operaciones de flota`, `Acceso de exportación de pedidos`) |
| **Descripción** | Descripción opcional de lo que otorga esta política |
| **Seleccionar permisos** | Elija permisos individuales del selector de permisos |

El selector de permisos enumera todos los permisos disponibles en las extensiones instaladas, y se pueden buscar por palabra clave. Puede seleccionar permisos de varios servicios en una sola política.

## Asociando políticas

Las políticas se pueden asociar en dos lugares:

**A un rol**
— Abra un rol en **IAM → Roles** y utilice el campo **Asociar políticas**. Todos los usuarios asignados a ese rol heredarán los permisos de la política.

**A un usuario**
— Abra un usuario en **IAM → Usuarios → Editar** y utilice el campo **Asociar políticas**. La política solo se aplicará a ese usuario, independientemente de su rol.

![Asociador de políticas — campo de búsqueda y lista de políticas seleccionadas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-user-attach-policies.8207cb49.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Editando una política

Haga clic en el nombre de cualquier política gestionada por la Organización o utilice **⋯ → Editar** para actualizarla. Los cambios se propagarán inmediatamente a todos los usuarios y roles que tengan la política asociada.

## Eliminando una política

Utilice **⋯ → Eliminar** en cualquier política gestionada por la Organización. Las políticas gestionadas por FLB no se pueden eliminar. Antes de eliminar, verifique si alguna función o usuario tiene asociada esta política — esas asignaciones se eliminarán junto con la política.