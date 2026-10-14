---
título: "Configuración de Avatares"
url: https://fleetbase.io/docs/fleet-ops/settings/avatars
módulo: fleet-ops
---

# Configuración de Avatares

Gestiona la biblioteca de imágenes de avatares utilizada para vehículos, lugares y conductores en la consola y el mapa en tiempo real de Fleet-Ops.

# Configuración de Avatares

**Avatares**
son los iconos e imágenes que Fleet-Ops utiliza para identificar vehículos, lugares y conductores en la consola y en el mapa en tiempo real. El Administrador de Avatares es una biblioteca centralizada de estas imágenes, organizada por
**categorías**
— por lo que, al asignar un avatar a un registro de conductor, vehículo o lugar, eliges de la biblioteca de la categoría correcta en lugar de volver a subir los recursos.

Navega a
**Fleet-Ops → Configuración → Avatares**
.

![Administrador de Avatares — barra lateral de categorías con Vehículos / Lugares / Conductores, y una cuadrícula de avatares subidos a la derecha](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-avatar-settings.984ec6b1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Categorías

El Administrador de Avatares organiza las subidas en tres categorías. Selecciona la categoría en la barra lateral izquierda; el panel de la derecha muestra la zona de arrastre y los avatares existentes para esa categoría.

| Categoría | Utilizado para |
|---|---|
| **Vehículos** | Fotos y iconos de tipo de vehículos (coches, furgonetas, camiones, motocicletas) — aparecen como marcadores en el mapa y en las vistas de la lista de vehículos |
| **Lugares** | Iconos de tipo de lugar (almacén, centro, tienda) — aparecen junto a los registros de Lugar y en el mapa en tiempo real |
| **Conductores** | Fotos de perfil de conductores e iconos identificativos — aparecen junto a los registros de conductores y en el mapa en tiempo real |

Otros recursos (contactos, flotas, proveedores, etc.) utilizan sus propios campos de avatar almacenados en el propio recurso, no se extraen de esta biblioteca.

## Tipos de archivo aceptados

El Administrador de Avatares solo acepta dos formatos de imagen:

* **PNG**
  (`image/png`)
* **SVG**
  (`image/svg+xml`)

Otros formatos se rechazan al subir. Se recomiendan los SVGs siempre que sea posible, ya que se escalan limpiamente a los tamaños de los marcadores y a los temas claros/oscuros.

## Subir Avatares

Abre
**Fleet-Ops → Configuración → Avatares**
.

Haz clic en la categoría en la barra lateral izquierda (Vehículos, Lugares o Conductores).

Arrastra los archivos PNG o SVG a la zona de arrastre en el panel de la derecha, o haz clic en
**Seleccionar**
para elegir los archivos. Se admiten varios archivos a la vez.

Los archivos se suben secuencialmente con un indicador de progreso por archivo. Una vez completado, aparecen en la cuadrícula de categorías y se pueden seleccionar inmediatamente en los registros de recursos.

## Eliminar Avatares

Pasa el cursor sobre cualquier avatar en la cuadrícula de categorías y haz clic en el control de eliminación para eliminarlo de la biblioteca. Los recursos que ya tenían asignado el avatar eliminado, vuelven a utilizar el avatar predeterminado que utiliza esa categoría.

## Especificaciones de imagen recomendadas

Para obtener los mejores resultados en el mapa en tiempo real y en las vistas de la lista de la consola:

* Aspecto cuadrado (por ejemplo, 64×64 px o 128×128 px para PNG)
* Fondo transparente — PNG con canal alfa, o SVG
* Líneas/rellenos de alto contraste para que el icono sea visible tanto en temas claros como oscuros del mapa
* Para los marcadores de vehículos: mantén el icono centrado con un pequeño relleno visual para que no se recorte al renderizar a la escala del marcador

## Asignar Avatares a Recursos

Los avatares de la biblioteca se seleccionan directamente en el recurso, no en esta página:

* **Conductor**
  — abre un registro de conductor → campo de foto / avatar → elige de la biblioteca de Conductores
* **Vehículo**
  — abre un registro de vehículo → campo de foto / avatar → elige de la biblioteca de Vehículos
* **Lugar**
  — abre un registro de lugar → icono / campo de avatar → elige de la biblioteca de Lugares

Cualquier recurso que no tenga asignado un avatar, muestra el avatar predeterminado del sistema para su tipo.

[Campos personalizados
Define campos estructurados adicionales para cualquier recurso de Fleet-Ops: conductores, vehículos, contactos, proveedores, lugares, entidades, flotas, incidencias y informes de combustible.](https://fleetbase.io/docs/fleet-ops/settings/custom-fields)