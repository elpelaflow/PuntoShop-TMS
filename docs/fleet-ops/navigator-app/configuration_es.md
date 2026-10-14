---
title: "Configuración"
url: https://fleetbase.io/docs/fleet-ops/navigator-app/configuration
module: fleet-ops
---

# Configuración

Referencia completa de variables de entorno para la aplicación Fleetbase Navigator de código abierto — conexión con Fleetbase, mapas, interfaz de usuario para conductores, notificaciones push, geolocalización, localización y enlaces profundos.

# Configuración

Esta guía es la referencia completa de variables de entorno para desarrolladores y operadores que
**clonan, personalizan y publican**
la aplicación Fleetbase Navigator para conductores. Si sus conductores utilizarán la aplicación Fleetbase Navigator pública de la App Store / Google Play, consulte
[Configuración de la aplicación Navigator](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup)
en su lugar — esta página cubre la instalación de la aplicación pública y su conexión a su instancia a través del enlace profundo generado en la consola.

El código fuente de Navigator se encuentra en
`navigator-app`
. Es una aplicación React Native 0.77, sin Expo, con Tamagui para el estilo y Fastlane para la automatización del lanzamiento.

Para ejecutar la aplicación por primera vez, consulte
[Guía rápida](https://fleetbase.io/docs/fleet-ops/navigator-app/quickstart)
. Para colores, temas y otras marcas visuales, consulte
[Temas y personalización](https://fleetbase.io/docs/fleet-ops/navigator-app/theming)
.

## Requisitos previos

| Herramienta | Para |
|---|---|
| **Node.js 18+** | Runtime de JavaScript |
| **Yarn** (o npm/pnpm) | Administrador de paquetes |
| **React Native CLI** | Metro bundler, builds nativos |
| **Xcode 12+** | Builds para iOS (solo macOS) |
| **Android Studio + JDK 17** | Builds para Android |
| **Ruby + Bundler** | CocoaPods y Fastlane |
| **Una instancia de Fleetbase** | La API a la que se conectará la aplicación |
| **Una clave de API de Fleetbase** | Generada en **Desarrolladores → Claves de API** en la consola |

Para publicar builds de lanzamiento para iOS o Android, se requiere una
**licencia comercial**
para
`react-native-background-geolocation`
(Transistor Soft). Los builds de depuración funcionan sin ella, pero no se pueden distribuir sin una licencia por plataforma. Consulte la
[página de compra](https://docs.transistorsoft.com/purchase/?platform=react-native)
y la
[guía de configuración](https://docs.transistorsoft.com/react-native/setup/)
.

## Variables de entorno

Toda la configuración se basa en variables de entorno cargadas a través de
`react-native-config`
. Comience con
`.env.example`
y sobrescriba los valores por entorno en
`.env.dev`
/
`.env.prod`
/ un archivo de sabor personalizado.

### Núcleo

| Variable | Valor predeterminado | Propósito |
|---|---|---|
| `APP_NAME` | `Navigator` | Nombre de visualización que se muestra en la pantalla de inicio y en la barra de título. |
| `APP_IDENTIFIER` | `io.fleetbase.navigator` | ID de paquete (iOS) y applicationId (Android). Debe ser el nombre de dominio inverso y único en las tiendas. |
| `APP_LINK_PREFIX` | `flbnavigator` | Esquema de URL de enlace profundo. Se utiliza tanto para los enlaces "Abrir en la aplicación" desde la consola como para las URLs de devolución de llamada de OAuth. |
| `APP_THEME` | `blue` | Clave de tema base de Tamagui. Controla la paleta de colores de acento. |
| `DEFAULT_COORDINATES` | `1.369,103.8864` | `lat,lng` utilizado para centrar el mapa cuando no hay posición del conductor disponible. |
| `DEFAULT_LOCALE` | `en` | Idioma de la interfaz de usuario inicial. Los usuarios pueden cambiar esto en tiempo de ejecución. |
| `LOGIN_BG_COLOR` | `#111827` | Color de fondo de las pantallas de inicio de sesión / configuración. |

### Conexión con Fleetbase

| Variable | Valor predeterminado | Propósito |
|---|---|---|
| `FLEETBASE_HOST` | `https://api.fleetbase.io` | URL base de la API de Fleetbase. Para instancias autoalojadas, establezca en `https://api.your-domain.com`. |
| `FLEETBASE_KEY` | *(vacío)* | La clave secreta de API con la que se autenticarán los conductores. Generada en **Consola → Desarrolladores → Claves de API**. |
| `SOCKETCLUSTER_HOST` | `socket.fleetbase.io` | Host del backend de envío en tiempo real (actualizaciones de pedidos, chat). |
| `SOCKETCLUSTER_PORT` | `8000` | Puerto del backend de envío en tiempo real. |
| `SOCKETCLUSTER_SECURE` | `true` | Indica si se utiliza WSS sobre WS. |
| `SOCKETCLUSTER_PATH` | `/socketcluster/` | Ruta del backend de envío en tiempo real. |

Estos valores también están integrados en el enlace profundo que emite su consola, por lo que la mayoría de los conductores nunca los tocan directamente. Son los valores predeterminados cuando no se proporciona ningún enlace profundo.

### Mapas

| Variable | Propósito |
|---|---|
| `GOOGLE_MAPS_API_KEY` | Requerido. Se utiliza con `react-native-maps`, `react-native-maps-directions` y el navegador de inicio en la aplicación. |

Genere una clave en el
[Google Cloud Console](https://console.cloud.google.com/)
con
**Maps SDK para iOS**,
**Maps SDK para Android**
y
**API de Direcciones**
habilitados. Restrinja la clave a su ID de paquete / nombre de paquete en producción.

### Interfaz de usuario del conductor

| Variable | Valor predeterminado | Propósito |
|---|---|---|
| `DRIVER_NAVIGATOR_TABS` | `DriverDashboardTab,DriverTaskTab,DriverReportTab,DriverChatTab,DriverAccountTab` | Lista separada por comas de las pestañas que se mostrarán en la barra de navegación inferior del conductor, en orden. |
| `DRIVER_NAVIGATOR_DEFAULT_TAB` | `DriverDashboardTab` | Pestaña que se abre al iniciar la aplicación. |

Elimine las pestañas que no necesite en su implementación (por ejemplo, elimine
`DriverChatTab`
si no está utilizando el chat integrado).

### Firma de Android

La configuración de firma de Android
`release`
en
`android/app/build.gradle`
lee estos valores del entorno cuando están presentes:

| Variable | Propósito |
|---|---|---|
| `ANDROID_VERSION_CODE` | Un entero que aumenta de forma monótona para la reconciliación de versiones en la App Store. |
| `ANDROID_VERSION_NAME` | Nombre de versión para el usuario (por ejemplo, `1.4.2`). |
| `ANDROID_NAVIGATOR_APP_UPLOAD_STORE_FILE` | Ruta absoluta a su archivo `.keystore`. |
| `ANDROID_NAVIGATOR_APP_UPLOAD_STORE_PASSWORD` | Contraseña del almacén. |
| `ANDROID_NAVIGATOR_APP_UPLOAD_KEY_ALIAS` | Alias de la clave dentro del almacén. |
| `ANDROID_NAVIGATOR_APP_UPLOAD_KEY_PASSWORD` | Contraseña de la clave. |

Para publicar builds de lanzamiento para iOS o Android, se requiere una
**licencia comercial**
para
`react-native-background-geolocation`
(Transistor Soft). Los builds de depuración funcionan sin ella, pero no se pueden distribuir sin una licencia por plataforma. Consulte la
[página de compra](https://docs.transistorsoft.com/purchase/?platform=react-native)
y la
[guía de configuración](https://docs.transistorsoft.com/react-native/setup/)
.

## Variables de entorno

Toda la configuración se basa en variables de entorno cargadas a través de
`react-native-config`
. Comience con
`.env.example`
y sobrescriba los valores por entorno en
`.env.dev`
/
`.env.prod`
/ un archivo de sabor personalizado.

### Núcleo

| Variable | Valor predeterminado | Propósito |
|---|---|---|
| `APP_NAME` | `Navigator` | Nombre de visualización que se muestra en la pantalla de inicio y en la barra de título. |
| `APP_IDENTIFIER` | `io.fleetbase.navigator` | ID de paquete (iOS) y applicationId (Android). Debe ser el nombre de dominio inverso y único en las tiendas. |
| `APP_LINK_PREFIX` | `flbnavigator` | Esquema de URL de enlace profundo. Se utiliza tanto para los enlaces "Abrir en la aplicación" desde la consola como para las URLs de devolución de llamada de OAuth. |
| `APP_THEME` | `blue` | Clave de tema base de Tamagui. Controla la paleta de colores de acento. |
| `DEFAULT_COORDINATES` | `1.369,103.8864` | `lat,lng` utilizado para centrar el mapa cuando no hay posición del conductor disponible. |
| `DEFAULT_LOCALE` | `en` | Idioma de la interfaz de usuario inicial. Los usuarios pueden cambiar esto en tiempo de ejecución. |
| `LOGIN_BG_COLOR` | `#111827` | Color de fondo de las pantallas de inicio de sesión / configuración. |

### Conexión con Fleetbase

| Variable | Valor predeterminado | Propósito |
|---|---|---|
| `FLEETBASE_HOST` | `https://api.fleetbase.io` | URL base de la API de Fleetbase. Para instancias autoalojadas, establezca en `https://api.your-domain.com`. |
| `FLEETBASE_KEY` | *(vacío)* | La clave secreta de API con la que se autenticarán los conductores. Generada en **Consola → Desarrolladores → Claves de API**. |
| `SOCKETCLUSTER_HOST` | `socket.fleetbase.io` | Host del backend de envío en tiempo real (actualizaciones de pedidos, chat). |
| `SOCKETCLUSTER_PORT` | `8000` | Puerto del backend de envío en tiempo real. |
| `SOCKETCLUSTER_SECURE` | `true` | Indica si se utiliza WSS sobre WS. |
| `SOCKETCLUSTER_PATH` | `/socketcluster/` | Ruta del backend de envío en tiempo real. |

Estos valores también están integrados en el enlace profundo que emite su consola, por lo que la mayoría de los conductores nunca los tocan directamente. Son los valores predeterminados cuando no se proporciona ningún enlace profundo.

### Mapas

| Variable | Propósito |
|---|---|
| `GOOGLE_MAPS_API_KEY` | Requerido. Se utiliza con `react-native-maps`, `react-native-maps-directions` y el navegador de inicio en la aplicación. |

Genere una clave en el
[Google Cloud Console](https://console.cloud.google.com/)
con
**Maps SDK para iOS**,
**Maps SDK para Android**
y
**API de Direcciones**
habilitados. Restrinja la clave a su ID de paquete / nombre de paquete en producción.

### Interfaz de usuario del conductor

| Variable | Valor predeterminado | Propósito |
|---|---|---|
| `DRIVER_NAVIGATOR_TABS` | `DriverDashboardTab,DriverTaskTab,DriverReportTab,DriverChatTab,DriverAccountTab` | Lista separada por comas de las pestañas que se mostrarán en la barra de navegación inferior del conductor, en orden. |
| `DRIVER_NAVIGATOR_DEFAULT_TAB` | `DriverDashboardTab` | Pestaña que se abre al iniciar la aplicación. |

Elimine las pestañas que no necesite en su implementación (por ejemplo, elimine
`DriverChatTab`
si no está utilizando el chat integrado).

### Android Signing

La configuración de firma de Android
`release`
en
`android/app/build.gradle`
lee estos valores del entorno cuando están presentes:

| Variable | Propósito |
|---|---|---|
| `ANDROID_VERSION_CODE` | Un entero que aumenta de forma monótona para la reconciliación de versiones en la App Store. |
| `ANDROID_VERSION_NAME` | Nombre de versión para el usuario (por ejemplo, `1.4.2`). |
| `ANDROID_NAVIGATOR_APP_UPLOAD_STORE_FILE` | Ruta absoluta a su archivo `.keystore`. |
| `ANDROID_NAVIGATOR_APP_UPLOAD_STORE_PASSWORD` | Contraseña del almacén. |
| `ANDROID_NAVIGATOR_APP_UPLOAD_KEY_ALIAS` | Alias de la clave dentro del almacén. |
| `ANDROID_NAVIGATOR_APP_UPLOAD_KEY_PASSWORD` | Contraseña de la clave. |

Para publicar builds de lanzamiento para iOS o Android, se requiere una
**licencia comercial**
para
`react-native-background-geolocation`
(Transistor Soft). Los builds de depuración funcionan sin ella, pero no se pueden distribuir sin una licencia por plataforma. Consulte la
[página de compra](https://docs.transistorsoft.com/purchase/?platform=react-native)
y la
[guía de configuración](https://docs.transistorsoft.com/react-native/setup/)
.

## Variables de entorno

Todas la configuración se basa en variables de entorno cargadas a través de
`react-native-config`
. Comience con
`.env.example`
y sobrescriba los valores por entorno en
`.env.dev`
/
`.env.prod`
/ un archivo de sabor personalizado.

### Núcleo

| Variable | Valor predeterminado | Propósito |
|---|---|---|
| `APP_NAME` | `Navigator` | Nombre de visualización que se muestra en la pantalla de inicio y en la barra de título. |
| `APP_IDENTIFIER` | `io.fleetbase.navigator` | ID de paquete (iOS) y applicationId (Android). Debe ser el nombre de dominio inverso y único en las tiendas. |
| `APP_LINK_PREFIX` | `flbnavigator` | Esquema de URL de enlace profundo. Se utiliza tanto para los enlaces "Abrir en la aplicación" desde la consola como para las URLs de devolución de llamada de OAuth. |
| `APP_THEME` | `blue` | Clave de tema base de Tamagui. Controla la paleta de colores de acento. |
| `DEFAULT_COORDINATES` | `1.369,103.8864` | `lat,lng` utilizado para centrar el mapa cuando no hay posición del conductor disponible. |
| `DEFAULT_LOCALE` | `en` | Idioma de la interfaz de usuario inicial. Los usuarios pueden cambiar esto en tiempo de ejecución. |
| `LOGIN_BG_COLOR` | `#111827` | Color de fondo de las pantallas de inicio de sesión / configuración. |

### Conexión con Fleetbase

| Variable | Valor predeterminado | Propósito |
|---|---|---|
| `FLEETBASE_HOST` | `https://api.fleetbase.io` | URL base de la API de Fleetbase. Para instancias autoalojadas, establezca en `https://api.your-domain.com`. |
| `FLEETBASE_KEY` | *(vacío)* | La clave secreta de API con la que se autenticarán los conductores. Generada en **Consola → Desarrolladores → Claves de API**. |
| `SOCKETCLUSTER_HOST` | `socket.fleetbase.io` | Host del backend de envío en tiempo real (actualizaciones de pedidos, chat). |
| `SOCKETCLUSTER_PORT` | `8000` | Puerto del backend de envío en tiempo real. |
| `SOCKETCLUSTER_SECURE` | `true` | Indica si se utiliza WSS sobre WS. |
| `SOCKETCLUSTER_PATH` | `/socketcluster/` | Ruta del backend de envío en tiempo real. |

Estos valores también están integrados en el enlace profundo que emite su consola, por lo que la mayoría de los conductores nunca los tocan directamente. Son los valores predeterminados cuando no se proporciona ningún enlace profundo.

### Mapas

| Variable | Propósito |
|---|---|
| `GOOGLE_MAPS_API_KEY` | Requerido. Se utiliza con `react-native-maps`, `react-native-maps-directions` y el navegador de inicio en la aplicación. |

Genere una clave en el
[Google Cloud Console](https://console.cloud.google.com/)
con
**Maps SDK para iOS**,
**Maps SDK para Android**
y
**API de Direcciones**
habilitados. Restrinja la clave a su ID de paquete / nombre de paquete en producción.

### Interfaz de usuario del conductor

| Variable | Valor predeterminado | Propósito |
|---|---|---|
| `DRIVER_NAVIGATOR_TABS` | `DriverDashboardTab,DriverTaskTab,DriverReportTab,DriverChatTab,DriverAccountTab` | Lista separada por comas de las pestañas que se mostrarán en la barra de navegación inferior del conductor, en orden. |
| `DRIVER_NAVIGATOR_DEFAULT_TAB` | `DriverDashboardTab` | Pestaña que se abre al iniciar la aplicación. |

Elimine las pestañas que no necesite en su implementación (por ejemplo, elimine
`DriverChatTab`
si no está utilizando el chat integrado).

### Android Signing

La configuración de firma de Android
`release`
en
`android/app/build.gradle`
lee estos valores del entorno cuando están presentes:

| Variable | Propósito |
|---|---|---|
| `ANDROID_VERSION_CODE` | Un entero que aumenta de forma monótona para la reconciliación de versiones en la App Store. |
| `ANDROID_VERSION_NAME` | Nombre de versión para el usuario (por ejemplo, `1.4.2`). |
| `ANDROID_NAVIGATOR_APP_UPLOAD_STORE_FILE` | Ruta absoluta a su archivo `.keystore`. |
| `ANDROID_NAVIGATOR_APP_UPLOAD_STORE_PASSWORD` | Contraseña del almacén. |
| `ANDROID_NAVIGATOR_APP_UPLOAD_KEY_ALIAS` | Alias de la clave dentro del almacén. |
| `ANDROID_NAVIGATOR_APP_UPLOAD_KEY_PASSWORD` | Contraseña de la clave. |

Para publicar builds de lanzamiento para iOS o Android, se requiere una
**licencia comercial**
para
`react-native-background-geolocation`
(Transistor Soft). Los builds de depuración funcionan sin ella, pero no se pueden distribuir sin una licencia por plataforma. Consulte la
[página de compra](https://docs.transistorsoft.com/purchase/?platform=react-native)
y la
[guía de configuración](https://docs.transistorsoft.com/react-native/setup/)
.

## Configuración mínima .env

Para una primera ejecución apuntando a la instancia de Fleetbase alojada:

```
APP_NAME=Acme Driver
APP_IDENTIFIER=com.acme.driver
APP_LINK_PREFIX=acmedriver
FLEETBASE_HOST=https://api.fleetbase.io
FLEETBASE_KEY=flb_live_xxxxxxxxxxxxxxxx
GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
DEFAULT_COORDINATES=1.369,103.8864
```

## Conectarse a una instancia de Fleetbase autoalojada

Apunte
`FLEETBASE_HOST`
a su URL de dominio de API y actualice los valores de SocketCluster para que coincidan con su gateway de tiempo real:

```
FLEETBASE_HOST=https://api.acme.com
SOCKETCLUSTER_HOST=socket.acme.com
SOCKETCLUSTER_PORT=443
SOCKETCLUSTER_SECURE=true
SOCKETCLUSTER_PATH=/socketcluster/
```

La capa de configuración del runtime (
`src/contexts/ConfigContext.tsx`
) permite a los usuarios sobrescribir estos valores en tiempo de ejecución escaneando un código QR desde la consola — por lo que los valores de la variable funcionan como valores predeterminados, no como códigos fijos.

## Notificaciones push

Navigator utiliza
`react-native-notifications`
para FCM (Android) y APNS (iOS).

Android (FCM)

iOS (APNS)

1. Cree un proyecto de Firebase en el
   [Firebase Console](https://console.firebase.google.com/)
   .
2. Agregue una aplicación de Android con su
   `APP_IDENTIFIER`
   como nombre de paquete.
3. Descargue
   `google-services.json`
   y agréguelo a
   `android/app/`
   .
4. Construya y ejecute —
   `com.google.gms.google-services`
   ya está aplicado en la parte inferior de
   `android/app/build.gradle`
   .

1. En Apple Developer →
   **Claves**,
   cree una clave de autenticación APNS (
   `.p8`
   ).
2. Sube la clave en
   **Consola de Fleetbase → Configuración → Notificaciones**
   bajo credenciales de envío.
3. En Xcode, asegúrese de que
   **Firma y capacidades**
   incluya
   **Notificaciones en segundo plano**
   y
   **Modos de segundo plano → Notificaciones remotas**
   . Ya se declaran los modos de notificación remota,
   `processing`
   ,
   `location`
   y
   `fetch`
   en el
   `Info.plist`.
4. `FirebaseAppDelegateProxyEnabled`
   está configurado en
   `false`
   en el
   `Info.plist` — Navigator gestiona el registro manualmente a través del
   `NotificationContext`
   .

## Geolocalización en segundo plano

Navigator utiliza
[`react-native-background-geolocation`](https://github.com/transistorsoft/react-native-background-geolocation)
(Transistor Soft) para el seguimiento continuo de los conductores — incluso cuando la aplicación está en segundo plano o el dispositivo está bloqueado. Esto NO es el paquete gratuito
`react-native-geolocation-service`
.

La configuración ya está en su lugar:

* Android:
  `apply from: "${background_geolocation.projectDir}/app.gradle"`
  en la parte superior de
  `android/app/build.gradle`
  .
* iOS:
  `Info.plist`
  declara
  `NSLocationAlwaysAndWhenInUseUsageDescription`
  ,
  `NSLocationAlwaysUsageDescription`
  y la
  `location`
  en el modo de segundo plano.
* Código de la aplicación:
  `src/contexts/LocationContext.tsx`
  configura y inicia el plugin.

Lo que debe hacer por plataforma antes de una versión de lanzamiento:

1. Compre una licencia en
   [docs.transistorsoft.com/purchase](https://docs.transistorsoft.com/purchase/?platform=react-native)
   — una para iOS, una para Android.
2. Siga la
   [guía de configuración](https://docs.transistorsoft.com/react-native/setup/)
   para colocar las claves de licencia en:
   * **Android**
     :
     `<meta-data android:name="com.transistorsoft.locationmanager.license" android:value="YOUR_LICENSE_KEY"/>`
     en
     `AndroidManifest.xml`
     .
   * **iOS**
     :
     `BackgroundGeolocation.license`
     en
     `Info.plist`
     .

Sin una licencia, las versiones de lanzamiento (Android
`bundleRelease`
/ iOS Archive) mostrarán un error de licencia al iniciar y el seguimiento no funcionará. Las versiones de depuración funcionan para el desarrollo.

## Temas

Para iconos de la aplicación, pantallas de inicio de sesión, paletas de colores, claves de tema personalizadas y temas nativos, consulte
[Temas y personalización](https://fleetbase.io/docs/fleet-ops/navigator-app/theming)
.

## Localización

El idioma predeterminado está configurado por
`DEFAULT_LOCALE`
. Para agregar un nuevo idioma:

1. Crear un paquete de traducciones e inscripto en
   `react-native-i18n`
   en el proveedor de contexto de idioma.
2. La selección del usuario en tiempo de ejecución se guarda mediante
   `react-native-mmkv-storage`
   y persiste incluso después de reinstalar, si la entrada en la "llave" persiste.

Cuando `DEFAULT_LOCALE` no está definido, la negociación del idioma actual vuelve al idioma predeterminado del dispositivo.

## Enlaces profundos

`APP_LINK_PREFIX` es el esquema de URL registrado en ambas plataformas:

* **iOS:** declarado en
  `Info.plist`
  bajo
  `CFBundleURLTypes`
  .
* **Android:** escrito como
  `appLinkScheme`
  en
  `AndroidManifest.xml`
  mediante
  `manifestPlaceholders`
  en
  `android/app/build.gradle`
  .

Cuando la consola de Fleetbase emite un
**Enlace de la aplicación**
para que los conductores lo escaneen, la URL tiene la siguiente forma:

```
<APP_LINK_PREFIX>://configure?host=https://api.acme.com&key=flb_live_xxx&socket_host=socket.acme.com&...
```

Si cambia `APP_LINK_PREFIX`, también debe cambiar el valor correspondiente en la configuración de su instancia de Fleetbase, `fleetops.navigator.link_prefix`, para que la consola emita un enlace al que la aplicación responderá.

## Siguientes pasos

Para ejecutar la aplicación localmente en iOS, Android o en la web, consulte
[Guía rápida](https://fleetbase.io/docs/fleet-ops/navigator-app/quickstart)
. Cuando esté listo para crear artefactos de lanzamiento y distribuirlos en las tiendas, continúe con
[Crear y publicar](https://fleetbase.io/docs/fleet-ops/navigator-app/build-and-release)
.