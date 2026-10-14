---
título: "Telemetría"
url: https://fleetbase.io/docs/fleet-ops/connectivity/telematics/overview
módulo: fleet-ops
---

Telemetría

# Telemetría

Conecte los proveedores de telemetría con Fleet-Ops, asigne dispositivos a vehículos o remolques, y reciba datos de telemetría en tiempo real.

# Telemetría

**Telemetría**
Los dispositivos son módems o rastreadores de activos que transmiten la posición GPS, datos de diagnóstico y datos de sensores a la plataforma en la nube del proveedor. Fleet-Ops se conecta a los proveedores compatibles a través de la API y asigna cada dispositivo al vehículo o remolque al que mide físicamente.

Navegue a
**Fleet-Ops → Conectividad → Telemetría**
.

![Centro de conectividad — conexiones con proveedores, con su estado, conteo de dispositivos sincronizados y no asignados, advertencias de salud y los proveedores nativos disponibles para conectarse](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-telematics-list.7be18067.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Proveedores compatibles

| Proveedor | Datos disponibles |
|---|---|
| **Flespi** | Posición GPS, velocidad, OBD-II (RPM, combustible, horas del motor), datos de sensores, flujos de eventos |
| **Geotab** | Posición GPS, diagnóstico del motor, códigos de error, puntuación de comportamiento del conductor |
| **Samsara** | Posición GPS, clips de cámara de tablero, cumplimiento de HOS, eficiencia de combustible |
| **Webhook genérico** | Cualquier proveedor que pueda enviar datos de telemetría a un punto final personalizado |

## Configuración de una integración de telemetría

Navegue a
**Fleet-Ops → Conectividad → Telemetría**
.

Haga clic en
**+ Nuevo telemetría**
.

Seleccione el
**Proveedor**
de la lista.

Ingrese las credenciales de la API del proveedor:

* **Flespi**
  — Token de Flespi
* **Geotab**
  — Nombre de la base de datos, nombre de usuario, ID de sesión
* **Samsara**
  — Token de acceso a la API

Haga clic en
**Probar conexión**
para verificar que las credenciales son válidas y que Fleet-Ops puede comunicarse con el proveedor.

Haga clic en
**Guardar**
. Fleet-Ops comienza a sincronizar los datos del dispositivo del proveedor.

![Crear una nueva telemetría — Flespi seleccionado como proveedor, con su token, URL de webhook y campos de caja negra del dispositivo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-telematics-flespi.e7fdfb77.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Descubrimiento e enlace de dispositivos

Una vez que la integración de telemetría esté conectada, Fleet-Ops puede descubrir los dispositivos registrados en la cuenta del proveedor:

Abra el registro de telemetría y haga clic en la pestaña
**Dispositivos**
.

Haga clic en
**Descubrir dispositivos**
— Fleet-Ops recupera la lista de dispositivos registrados del proveedor.

Para cada dispositivo descubierto, seleccione
**Asignar al activo**, seleccione el vehículo o remolque, y luego seleccione el activo donde está instalado.

Guarde. Fleet-Ops ahora asocia los datos de telemetría de este dispositivo con el activo seleccionado.

## Registro de dispositivo de telemetría

Cada integración de telemetría incluye registros de dispositivos:

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre del dispositivo (del proveedor) |
| **Proveedor** | El proveedor de telemetría que gestiona este dispositivo |
| **Modelo** | Modelo del módem (por ejemplo, Teltonika FMB920) |
| **Número de serie** | Número de serie del fabricante |
| **IMEI** | Número de identidad del equipo móvil |
| **SIM ICCID** | Identificador de la tarjeta SIM |
| **Versión del firmware** | Versión actual del firmware |
| **Estado** | activo, inactivo, desconectado |

## Flujo de datos en tiempo real

Una vez que un dispositivo se ha vinculado a un vehículo o remolque:

1. El proveedor envía actualizaciones de posición a Fleet-Ops (a través de webhook o encuestas de API)
2. Fleet-Ops almacena la posición como un registro
   `Posición`
   para el activo asociado
3. La posición se transmite a la vista en vivo a través de SocketCluster
4. Los datos de OBD-II y los datos de sensores se almacenan como registros
   `DeviceEvent`
5. Las alertas (códigos de error del motor, cruces de geocercas) pueden activar Problemas o notificaciones

## Frecuencia de sincronización de datos

La frecuencia de los datos de posición depende de la configuración del dispositivo de telemetría:

* Alta frecuencia: cada 5–30 segundos (entrega urbana)
* Estándar: cada 60 segundos (transporte en carretera)
* Modo estacionado: cada 5–10 minutos (cuando está estacionado)

Configure esto en la configuración del dispositivo de su proveedor de telemetría, no en Fleet-Ops.