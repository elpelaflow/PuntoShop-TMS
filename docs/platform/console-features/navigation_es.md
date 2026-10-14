---
title: "Navegación"
url: https://fleetbase.io/docs/platform/console-features/navigation
module: platform
---

# Navegación

Cómo funciona la navegación en la consola de Fleetbase: la barra de navegación superior, el menú de extensiones, la barra lateral y los controles del usuario.

# Navegación

La consola de Fleetbase utiliza una estructura de navegación en dos partes:
**una barra de navegación superior**
y una
**barra lateral contextual**.
Juntas, proporcionan un acceso rápido a todas las extensiones instaladas y a las funciones integradas de la consola.

![Consola de Fleetbase — barra de navegación superior con menú de extensiones, barra lateral y área de contenido principal](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-navigation-sidebar.45f7e821.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Barra de Navegación Superior

La barra superior siempre es visible. De izquierda a derecha, contiene:

### Logo

Hacer clic en el logotipo de Fleetbase te devuelve al panel de inicio desde cualquier lugar de la consola.

### Botón para mostrar/ocultar la barra lateral

El botón de despliegue/colapso junto al logotipo oculta o muestra la barra lateral. También se puede ajustar el tamaño de la barra lateral arrastrando el borde derecho.

### Menú de Navegación de Extensiones

Las extensiones instaladas se registran como elementos en el menú de navegación. El menú utiliza un patrón de
**Prioridad+**
— se muestran hasta
**5 extensiones**
en línea. Si se instalan más, se utiliza un
**Más (⋯)**
para recopilar el resto en un desplegable.

![Barra de navegación superior — elementos de extensión en línea con el desplegable "Más (⋯)" abierto](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-navigation-extensions-menu.1c7b8d80.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

#### Personalización de la Navegación

Haga clic en el icono
**de deslizadores**
(visible cuando se registran las extensiones) para abrir el panel de personalización de la navegación.

![Panel de personalización de la navegación — columna "Pinned to bar" con controles de arrastre y columna "Available extensions"](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-navigation-customize.5787ad23.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Columna | Descripción |
|---|---|
| **Pinned to bar** | Extensiones actualmente mostradas en línea en la barra superior. Arrastre para reorganizar. |
| **Available** | Extensiones instaladas que no están actualmente en la barra. Haga clic para agregarlas a la barra. |

Puede agregar hasta el máximo número visible (por defecto 5). Las preferencias se guardan por usuario y persisten entre sesiones.

### Controles en el lado derecho

El lado derecho de la barra superior contiene, de izquierda a derecha:

| Control | Descripción |
|---|---|
| **Icono de globo** | Selector de idioma/región — consulte [Internacionalización](https://fleetbase.io/docs/platform/console-features/internationalization) |
| **Icono de bandeja de entrada** | Bandeja de notificaciones — consulte [Notificaciones](https://fleetbase.io/docs/platform/console-features/notifications) |
| **Icono de mensaje** | Bandeja de chat — consulte [Chat](https://fleetbase.io/docs/platform/console-features/chat) |
| **Icono de la organización** | Muestra el nombre de su organización actual. Haga clic para cambiar de organización o acceder a la configuración de la organización |
| **Icono de avatar del usuario** | Abre el menú del usuario — enlaza con Perfil, Autenticación, Organizaciones y Salir |

## Barra Lateral

La barra lateral es contextual: su contenido cambia en función de la sección de la consola que esté activa. Cada extensión registra sus propios enlaces de barra lateral mediante el patrón Ember Wormhole, por lo que los enlaces para Fleet-Ops solo aparecen cuando Fleet-Ops está activo, los enlaces para la sección IAM aparecen cuando IAM está activo, y así sucesivamente.

Patrones comunes de barra lateral:

* **Elementos individuales**
  — un enlace directo a una ruta (por ejemplo, Órdenes, Conductores, Vehículos)
* **Paneles**
  — grupos de enlaces relacionados que se pueden despliegue (por ejemplo, IAM con Usuarios, Roles, Políticas, Grupos, Organizaciones)

La barra lateral es ajustable. Arrastre el borde derecho para ajustar su anchura.

## Menú del Usuario

Haga clic en su avatar en la esquina superior derecha para abrir el menú del usuario. Desde aquí puede:

* Navegar a
  **Su perfil**
  (nombre, foto, teléfono, país)
* Navegar a la pestaña
  **Autenticación**
  (cambiar contraseña, configuración de 2FA y
  [cuentas conectadas](https://fleetbase.io/docs/platform/identity-and-access/oauth-sign-in)
  )
* Ver y administrar sus
  **Organizaciones**
* **Salir**

![Perfil — carga de foto, nombre, correo electrónico, teléfono, fecha de nacimiento y zona horaria, con las pestañas "Perfil", "Autenticación" y "Organizaciones" a la izquierda](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-account.679c73ab.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Móvil

En la vista móvil, la barra de navegación superior se adapta a un diseño compacto. El selector de idioma, la bandeja de notificaciones y la bandeja de chat cambian a menús desplegables de ancho completo anclados en la parte superior de la pantalla. El menú de navegación de extensiones se oculta en la vista móvil.