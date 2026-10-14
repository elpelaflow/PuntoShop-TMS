---
title: "Comenzar rápidamente"
url: https://fleetbase.io/docs/fleet-ops/navigator-app/quickstart
module: fleet-ops
---

# Comienza rápidamente

Clona la aplicación Navigator, instala las dependencias, configura tus claves de Fleetbase y ejecútala en iOS, Android o la web.

# Comienza rápidamente con la aplicación Navigator

Obtén la aplicación Navigator para conductores funcionando localmente contra tu backend de Fleetbase en aproximadamente 15 minutos.

## Requisitos previos

| Herramienta | Versión | Notas |
|---|---|---|
| **Node.js** | ≥18 | Entorno de ejecución de JavaScript |
| **Yarn** | — | Administrador de paquetes (npm/pnpm también funcionan, pero Yarn es la opción documentada) |
| **Entorno de línea de comandos de React Native** | — | [Configura tu entorno de desarrollo](https://reactnative.dev/docs/set-up-your-environment) para iOS (Xcode + Watchman) y Android (Android Studio + JDK 17) |
| **Ruby + Bundler** | 3.x | Los pods de iOS se instalan mediante `bundle exec pod install`; la automatización de la publicación utiliza Fastlane |
| **Una instancia de Fleetbase** | — | Auto-alojada o [fleetbase.io](https://fleetbase.io) |

También necesitarás:

* Una
  **clave secreta de la API de Fleetbase**
  — En la consola →
  **Desarrolladores → Claves de API**
* Una
  **clave de la API de Google Maps**
  con el SDK de Google Maps para iOS, el SDK de Google Maps para Android y la API de Direcciones habilitadas

La publicación de builds de lanzamiento requiere una
**licencia comercial**
para
`react-native-background-geolocation`
(Transistor Soft) — una por plataforma. Los builds de depuración funcionan sin ella; los builds de lanzamiento no. Consulta la
[página de compra](https://docs.transistorsoft.com/purchase/?platform=react-native)
.

## 1. Clona e instala

```
git clone git@github.com:fleetbase/navigator-app.git
cd navigator-app
yarn
yarn pod:install
touch .env
```

`yarn pod:install`
ejecuta
`bundle exec pod install --repo-update`
con
`RCT_NEW_ARCH_ENABLED=1`
para que la arquitectura de React Native Nueva se configure correctamente.

## 2. Configura .env

Crea un
`.env`
archivo en la raíz del proyecto con al menos:

```
APP_NAME=Navigator
APP_IDENTIFIER=io.fleetbase.navigator
APP_LINK_PREFIX=flbnavigator

# Tu backend de Fleetbase
FLEETBASE_HOST=https://api.fleetbase.io
FLEETBASE_KEY=flb_live_xxxxxxxxxxxxxxxx

# Mapas
GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Centro de mapa inicial cuando no hay posición del conductor disponible
DEFAULT_COORDINATES=1.369,103.8864
```

El conjunto completo de variables de entorno compatibles — conexión de Fleetbase, mapas, pestañas de la interfaz de usuario del conductor, notificaciones push, geolocalización, temas — está documentado en
[Configuración](https://fleetbase.io/docs/fleet-ops/navigator-app/configuration)
.

## 3. Ejecuta la aplicación

### Simulador de iOS

```
yarn ios
```

Esto inicia Metro y lanza el simulador de iOS. Para apuntar a un dispositivo específico:

```
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### Emulador de Android

```
yarn android
```

Asegúrate de que un emulador ya esté en funcionamiento (
`emulator -list-avds`
, luego
`emulator -avd <nombre>`
) o que un dispositivo físico esté conectado con la depuración USB habilitada.

### Web

```
yarn web
```

Se inicia el servidor de desarrollo de Webpack y se sirve la aplicación en la URL que registra. El objetivo de la web utiliza
`react-native-web`
con alias de tiempo de compilación para módulos nativos únicamente.

La versión de la web es funcional para el desarrollo y demostraciones. La geolocalización en segundo plano, las notificaciones push y otros módulos nativos únicamente están en modo "stub" en la web — los despliegues de lanzamiento apuntan a iOS y Android.

## 4. Inicia sesión

Una vez que la aplicación se inicie:

1. La pantalla de configuración lee
   `FLEETBASE_HOST`
   y
   `FLEETBASE_KEY`
   como valores predeterminados.
2. Para sobreescribirlos en tiempo de ejecución, escanea el
   **Código QR del Enlace**
   emitido por tu consola de Fleetbase — consulta
   [Configuración de la aplicación Navigator](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup)
   para ver cómo lo genera la consola.
3. Los conductores se inician sesión con su número de teléfono; fluye la verificación por SMS a través de tu gateway de notificaciones configurado.

## Problemas comunes

| Síntoma | Causa probable |
|---|---|
| `No autorizado` al iniciar | `FLEETBASE_KEY` está ausente o incorrecto, o `FLEETBASE_HOST` es inaccesible |
| Los mapas no se renderizan | `GOOGLE_MAPS_API_KEY` está ausente, o el SDK de plataforma correspondiente no está habilitado en Google Cloud |
| Las actualizaciones en tiempo real se quedan atascadas | `SOCKETCLUSTER_HOST` / `SOCKETCLUSTER_PORT` no están configurados, o el servicio de socket de Fleetbase no es accesible |
| Fallos en la primera ejecución del build de iOS | Ejecuta `yarn pod:install` de nuevo después de una comprobación limpia |
| Fallos en el lanzamiento de builds de lanzamiento | Falta la licencia para `react-native-background-geolocation` — consulta los requisitos previos anteriores |

## Próximos pasos

* [Configuración](https://fleetbase.io/docs/fleet-ops/navigator-app/configuration)
  — referencia completa de variables de entorno y sobreescrituras en tiempo de ejecución
* [Temas y branding](https://fleetbase.io/docs/fleet-ops/navigator-app/theming)
  — colores, temas, icono de la aplicación, splash, nombres nativos
* [Construye y lanza](https://fleetbase.io/docs/fleet-ops/navigator-app/build-and-release)
  — builds de lanzamiento para la App Store y Google Play