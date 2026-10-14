---
title: "Configuración de la aplicación Navigator"
url: https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup
module: fleet-ops
---

# Configuración de la aplicación Navigator

Instale la aplicación Navigator, conéctela a su instancia de Fleet-Ops, y asegúrese de que un conductor haya iniciado sesión antes de su primer envío.

# Configuración de la aplicación Navigator

**Navigator**
es la aplicación móvil React Native que utilizan los conductores para recibir pedidos asignados, navegar por las rutas, registrar los pasos de la actividad, capturar la prueba de entrega, informar sobre problemas y enviar informes de combustible. Es de código abierto — el código se encuentra en
`navigator-app`
— y se distribuye como una aplicación para iOS y Android.

## 1. Instale Navigator

Los conductores instalan Navigator desde las tiendas de aplicaciones públicas:

* **iOS**
  —
  [App Store](https://apps.apple.com/app/fleetbase-navigator/id1562987952)
* **Android**
  —
  [Google Play](https://play.google.com/store/apps/details?id=com.fleetbase.navigator)

Para implementaciones con marca propia, clone el código y publíquelo bajo su propia marca con una licencia comercial.

## 2. Conecte la aplicación a su instancia de Fleetbase

Navigator necesita saber a qué instancia de Fleetbase conectarse. Fleet-Ops genera un
**enlace profundo compartible**
que, cuando se abre en un teléfono con Navigator instalado, configura la aplicación para conectarse automáticamente a su instancia — no se requiere la entrada manual del nombre de host.

### Obtenga el enlace desde la consola

En la consola de Fleetbase, vaya a
**Administrador → Configuración de Fleet-Ops → Aplicación Navigator**
. Haga clic en
**Obtener enlace de la aplicación**
para obtener una URL única para su instancia.

El enlace se muestra como un código QR que los conductores pueden escanear con la cámara de su teléfono, la aplicación se abre y se configura.

### Cómo funciona el enlace profundo

El enlace apunta al punto final de Fleet-Ops
`link-app`:

```
GET /int/v1/fleet-ops/navigator/link-app
```

Cuando se abre en un teléfono, el punto final:

1. Detecta la plataforma (iOS o Android) a partir del encabezado User-Agent
2. Genera una URL de enlace profundo con la clave API, el nombre de host y los detalles de conexión SocketCluster de la instancia:
   * **iOS**
     →
     `flbnavigator://configure?key=...&host=...&socketcluster_host=...&socketcluster_port=...&socketcluster_secure=...`
   * **Android**
     →
     `intent://configure?...#Intent;scheme=flbnavigator;package=io.fleetbase.navigator;end`
3. Redirige el teléfono al enlace profundo, que Navigator maneja y utiliza para configurar su configuración

La URL también se devuelve como JSON a través de
`GET /int/v1/fleet-ops/navigator/get-link-app`
si desea integrarla en los flujos de incorporación o imprimirla en los documentos de bienvenida para los conductores.

El enlace profundo incluye credenciales. Trátelo como una clave API — solo compártalo con los conductores que ya haya incorporado, y regenere el credencial de API subyacente si se pierde un teléfono.

### Configuración manual (como respaldo)

Si un conductor no puede abrir el enlace profundo (dispositivo antiguo, navegador en contenedor, etc.), Navigator también acepta la configuración del servidor manualmente: toque el icono
**Configuración**
en la pantalla de inicio de sesión e introduzca su nombre de host y credenciales de API.

## 3. Cree una cuenta de conductor

Antes de que un conductor pueda iniciar sesión, debe tener un registro de conductor en la consola.

### Abra Fleet-Ops → Recursos → Conductores

En la consola de Fleetbase, vaya a
**Fleet-Ops → Recursos → Conductores**
.

### Haga clic en "Nuevo conductor"

Haga clic en
**+ Nuevo conductor**
y rellene:

| Campo | Notas |
|---|---|
| **Nombre** | Nombre completo del conductor |
| **Teléfono** | Número de móvil — utilizado para el inicio de sesión por SMS |
| **Correo electrónico** | Opcional — utilizado para las notificaciones de la cuenta |
| **Proveedor** | Opcional — enlace a un proveedor/operador específico |
| **Vehículo** | Opcional — asigne un vehículo predeterminado |
| **Habilidades** | Habilidades que el Orchestrator puede utilizar para emparejar con los pedidos |

### Guarde el conductor

Haga clic en
**Guardar**
. Se crea el registro del conductor y está listo para iniciar sesión en Navigator.

Opcionalmente, habilite
**Registrarse desde la aplicación**
en
[Configuración de la aplicación Navigator](https://fleetbase.io/docs/fleet-ops/settings/navigator-app)
si prefiere que los conductores se registren y carguen los documentos requeridos desde la pantalla de inicio de sesión.

## 4. Inicio de sesión del conductor

Los conductores inician sesión con su número de teléfono y un código de verificación por SMS.

### Introduzca el número de teléfono

En la pantalla de inicio de sesión, el conductor introduce el número de teléfono registrado en su registro de conductor.

### Introduzca el código de verificación

Fleetbase envía un código de 6 dígitos por SMS. El conductor lo introduce en Navigator para completar el inicio de sesión.

Las instancias autohospedadas pueden configurar un código de desvío a través de la variable de entorno `NAVIGATOR_BYPASS_VERIFICATION_CODE` para el desarrollo y las pruebas.

### Autorice el acceso a la ubicación

Navigator requiere el acceso
*Siempre permitir*
a la ubicación para transmitir la posición mientras la aplicación está en segundo plano. La aplicación solicita esto la primera vez que se inicia sesión.

El acceso de ubicación en segundo plano es necesario para el seguimiento en tiempo real en el mapa. Si un conductor niega el acceso en segundo plano, su posición no se actualizará mientras la aplicación esté en segundo plano.

## Lo que los conductores pueden hacer en Navigator

Una vez iniciados sesión, Navigator admite todo el flujo de trabajo del conductor:

* **Recibir pedidos asignados**
  — notificaciones push + lista de tareas activas
* **Navegar por las rutas**
  — indicaciones paso a paso a través de los mapas nativos del dispositivo
* **Registrar los pasos de la actividad**
  — avanzar el pedido a través de su
  [flujo de actividad](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows)
  , capturando la prueba de entrega según sea necesario
* **Capturar la prueba de entrega**
  —
  `escanear`
  ,
  `firmar`
  ,
  `tomar una foto`
  o
  `enviar SMS`
  según el método de
  `POD`
  del flujo de actividad
* **Informar sobre problemas**
  — enviar informes de problemas desde la
  *Informes*
  (
  [referencia](https://fleetbase.io/docs/fleet-ops/resources/issues/overview)
  )
* **Enviar informes de combustible**
  — enviar y editar informes de combustible desde la
  *Informes de combustible*
  (
  [referencia](https://fleetbase.io/docs/fleet-ops/resources/fuel-reports/overview)
  )
* **Editar campos de entidad**
  — cuando esté habilitado según la configuración del pedido (
  [Configuración de la aplicación Navigator](https://fleetbase.io/docs/fleet-ops/settings/navigator-app)
  )

## Dispositivos Android compatibles

Navigator funciona en
**Android 6.0 (Marshmallow, SDK 23) y versiones posteriores**, en teléfonos, tabletas, Chromebooks que ejecutan aplicaciones de Android y formatos de Android TV / Automotive. La lista completa de compatibilidad — extraída del Google Play Console — cubre
**más de 16.700 combinaciones distintas de marca y modelo**
en todos los principales fabricantes de OEM. La lista se envía como un archivo CSV para que pueda buscarla sin conexión por dispositivo, marca o chipset.

### Puntos clave

| Formato | Dispositivos de la lista |
|---|---|
| Teléfono | 12.120 |
| Tablet | 6.181 |
| Chromebook | 11 |
| Android TV | 5 |
| Android Automotive | 1 |

Las familias de marcas OEM más representadas: Samsung, Vivo, OPPO, TECNO, ZTE, Realme, Blackview, BLU, Infinix, TCL, DOOGEE, Motorola, Lenovo, OUKITEL, Sony, Itel, Teclast, Redmi, Ulefone, HONOR, Xiaomi, Nokia.

### Descargue la lista completa

[Descargar CSV de dispositivos compatibles (2,8 MB · 18.325 filas)](https://fleetbase.io/data/navigator-app-supported-devices.csv)

Las columnas del CSV son: Marca, Dispositivo, Fabricante, Nombre del dispositivo, RAM (TotalMem), Formato, Sistema en chip, GPU, Tamaños de pantalla, Densidades de pantalla, ABIs, Android SDK Versions, OpenGL ES Versions, Base de usuarios, Tasa de informes de ANR, Tasa de informes de fallos, Uso excesivo de la batería. Abra el en cualquier herramienta de hojas de cálculo (Numbers, Excel, Sheets) y utilice la función Buscar para confirmar si un dispositivo es compatible.

La lista es un instantánea de la exportación de compatibilidad del Google Play Console. Los nuevos dispositivos de Android generalmente funcionan gracias a la compatibilidad hacia adelante de Android — si un modelo no está en la lista pero ejecuta Android 6.0, casi siempre funcionará. Utilice la lista como una herramienta de confirmación, no como una lista de exclusiones.

## Pruebe la conexión

Una vez que un conductor haya iniciado sesión:

1. Su registro muestra
   **En línea**
   en
   **Fleet-Ops → Recursos → Conductores**
2. Su marcador aparece en el mapa en vivo
3. Cree un pedido de prueba y envíelo — el conductor recibe una notificación push en Navigator y puede aceptarla

## Próximos pasos

* [Guía rápida](https://fleetbase.io/docs/fleet-ops/getting-started/quickstart)
  — cree y envíe su primer pedido
* [Conductores](https://fleetbase.io/docs/fleet-ops/resources/drivers/overview)
  — gestione los registros de los conductores, los horarios y las habilidades
* [Configuración de la aplicación Navigator](https://fleetbase.io/docs/fleet-ops/settings/navigator-app)
  — edite los campos de entidad y configure la incorporación automática