---
título: "Configuración de la aplicación Navigator"
url: https://fleetbase.io/docs/fleet-ops/settings/navigator-app
módulo: fleet-ops
---

# Configuración de la aplicación Navigator

Configure la funcionalidad de la aplicación Navigator: edición de campos por entidad según la configuración del pedido y registro de conductores desde la aplicación.

# Configuración de la aplicación Navigator

**Configuración de la aplicación Navigator**
Controla dos comportamientos específicos de la aplicación móvil para conductores de Navigator: qué campos de entidad pueden editar los conductores según la configuración del pedido, y si los conductores pueden registrarse desde la aplicación.

Navegue a
**Operaciones → Configuración → Aplicación Navigator**
.

![Panel de configuración de la aplicación Navigator — configuración de edición de campos de entidad y configuración de registro de conductores](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-navigator-app-settings.c6a620e6.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Edición de campos de entidad

El
**Panel de configuración de edición de campos de entidad**
controla qué campos en las entidades de una carga pueden editar los conductores desde la aplicación Navigator, según la
[configuración del pedido](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview).

Seleccione la configuración del pedido que desea configurar en el
**Seleccionar configuración de pedido**
menú desplegable.

Habilite/deshabilite
**Permitir que el conductor edite los campos de entidad**
. Cuando esté desactivado, todos los campos de entidad serán de solo lectura en Navigator para pedidos de esta configuración.

Cuando esté habilitado, marque los campos individuales que los conductores deben poder editar (descripción, peso, dimensiones, campos personalizados, etc.).

Haga clic en
**Guardar cambios**
. La nueva configuración se aplicará la próxima vez que un conductor abra un pedido de esta configuración en Navigator.

La configuración se guarda por configuración de pedido, lo que permite que diferentes tipos de pedidos otorguen diferentes niveles de autonomía al conductor: por ejemplo, un flujo de reparto podría bloquear todo, mientras que un flujo de mantenimiento permite a los conductores actualizar notas y pesos directamente.

## Registro de conductores desde la aplicación

El
**Panel de configuración de registro de conductores**
controla si los nuevos conductores pueden registrarse desde la aplicación Navigator, sin que un operador lo cree previamente en el panel.

| Configuración | Descripción |
|---|---|
| **Habilitar registro de conductores desde la aplicación** | Interruptor principal: cuando está activado, la pantalla de inicio de sesión de Navigator muestra un flujo de *Registro* |
| **Seleccionar método de registro** | El método de verificación utilizado durante el registro |
| **Requerir que el conductor cargue documentos de registro** | Cuando está activado, el flujo de registro se bloquea hasta que el conductor cargue los documentos que se requieren |
| **Documentos de registro requeridos** | Lista de texto libre de nombres de documentos que el conductor debe cargar (por ejemplo, *Licencia de conducir*, *Certificado de seguro*) |

Cuando el registro automático esté desactivado, los conductores deben existir en
**Operaciones → Recursos → Conductores**
antes de poder iniciar sesión.

Otros comportamientos de la aplicación Navigator: frecuencia de transmisión GPS, notificaciones push, idioma y modo de aceptación de pedidos, se gestionan a través de las páginas generales de configuración del sistema de la plataforma o a través de los permisos del dispositivo del conductor, no a través de estas configuraciones de la aplicación Navigator de Operaciones.

## Guardar cambios

Cada panel tiene su propio
**Guardar cambios**
botón. Las actualizaciones se aplican la próxima vez que Navigator se conecte al servidor.