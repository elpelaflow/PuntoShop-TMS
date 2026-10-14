---
title: "Crear y publicar"
url: https://fleetbase.io/docs/fleet-ops/navigator-app/crear-y-publicar
module: fleet-ops
---

# Crear y publicar

Publica tu aplicación Navigator, sin marca, en la Tienda de Aplicaciones de Apple y Google Play — cuentas, autenticación, Fastlane, y los requisitos de pruebas de Google.

# Crear y publicar

Esta página describe el proceso completo para publicar una aplicación Navigator, sin marca: cuentas de desarrollador, namespace, perfiles de tienda, firma de código, automatización de la construcción con Fastlane, y las restricciones que aplican a cada tienda.

Deberías haber completado
[Configuración](https://fleetbase.io/docs/fleet-ops/navigator-app/configuration)
— variables de entorno y una versión de depuración en el simulador — y
[Temática y marca](https://fleetbase.io/docs/fleet-ops/navigator-app/theming)
para tu icono, pantalla de inicio y colores.

**Espera que la aprobación de iOS sea más rápida.**
El proceso de revisión de Apple suele durar entre 24 y 48 horas. Google requiere que tengas
**un grupo de pruebas cerrado con al menos 12 probadores activos durante al menos 14 días**
antes de poder pasar a la versión de producción — esta es una política estricta, y no hay atajos.

## Requisitos previos

**Cuenta de desarrollador de Apple**
—
[$99 al año](https://developer.apple.com/programs/enroll/)
. Para organizaciones, espera entre 1 y 3 semanas para la verificación de D-U-N-S antes de que se complete el registro.

**Cuenta de desarrollador de Google Play**
—
[$25 de tarifa única](https://play.google.com/console/signup)
. Se requiere la verificación de identidad, y suele completarse en unos pocos días hábiles.

**Namespace decidido.**
La convención es el dominio inverso más el nombre de la aplicación, por ejemplo,
`io.fleetbase.navigator`
,
`com.acme.driver`
. Una vez publicado, el namespace es permanente — no podrás cambiarlo más tarde. Configúralo como
`APP_IDENTIFIER`
en tu
`.env`
y verifica que se refleje en
`android/app/build.gradle`
(
`applicationId`
) y el identificador de paquete de iOS
`Bundle Identifier`
.

**Nombre de publicación decidido.**
Configúralo como
`APP_NAME`
. Aparecerá en las pantallas de inicio, en las búsquedas de la tienda de aplicaciones y en la barra de título de la aplicación. Debe tener menos de 30 caracteres para la Tienda de Aplicaciones / 50 caracteres para Google Play.

**Licencia de geolocalización de fondo comprada para ambas plataformas.**
[Compra en docs.transistorsoft.com/purchase](https://docs.transistorsoft.com/purchase/?platform=react-native)
y sigue
[la guía de configuración](https://docs.transistorsoft.com/react-native/setup/)
para insertar las claves en
`AndroidManifest.xml`
y
`Info.plist`
. Las versiones de lanzamiento fallarán al iniciar sin esto.

## Crear perfiles de tienda

### Apple — App Store Connect

1. Inicia sesión en
   [App Store Connect](https://appstoreconnect.apple.com/)
   .
2. **Mis aplicaciones → +**
   →
   **Nueva aplicación**
   .
3. Completa:
   * **Plataforma**
     : iOS
   * **Nombre**
     : tu
     `APP_NAME`
   * **Idioma principal**
   * **Identificador de paquete**
     : que coincida con
     `APP_IDENTIFIER`
     (debe existir ya bajo
     **Certificados, identificadores y perfiles → Identificadores**
     ; regístralo primero si no).
   * **SKU**
     : un identificador interno de tu elección.
   * **Acceso al usuario**
     : quién en tu equipo puede ver la aplicación.
4. En
   **Información de la aplicación**
   , establece la categoría y los derechos de contenido.
5. En
   **Precios y disponibilidad**
   , establece el precio (el precio gratuito es válido) y la lista de países.
6. Prepara las respuestas para
   **Privacidad de la aplicación**
   — Navigator recopila la ubicación continuamente mientras está en uso
   *y*
   en segundo plano, además de los identificadores utilizados para la autenticación. Revela la información correspondiente.

### Google — Google Play Console

1. Inicia sesión en
   [Google Play Console](https://play.google.com/console/)
   .
2. **Crear aplicación**
   .
3. Completa:
   * **Nombre de la aplicación**
     : que coincida con
     `APP_NAME`
     .
   * **Idioma predeterminado**
     .
   * **Aplicación o juego**
     : Aplicación.
   * **Gratis o de pago**
     : normalmente gratuito.
   * Acepta la declaración de políticas del programa de desarrolladores.
4. Completa el
   **Panel → Configurar tu aplicación**
   :
   * **Acceso a la aplicación**
     — proporciona credenciales de prueba para la revisión.
   * **Anuncios**
     — declara si la aplicación contiene anuncios.
   * **Clasificación de contenido**
     — cuestionario.
   * **Público objetivo**
     — elige los grupos de edad (Navigator está destinado a conductores profesionales, por lo que 18+).
   * **App de noticias**
     — normalmente no.
   * **Seguimiento de contactos COVID-19**
     — no.
   * **Datos**
     — declara la ubicación (en segundo plano), correo electrónico, número de teléfono, fotos.
   * **Aplicación gubernamental**
     — normalmente no.
   * **Características financieras**
     — no, a menos que recopiles pagos con la aplicación.
   * **Salud**
     — no.
   * **Listado de la tienda**
     — título, descripción corta, descripción completa, icono, gráfico de función, capturas de pantalla, vídeo.
   * **Listado principal de la tienda → URL de la política de privacidad**
     — requerido.

Google hace preguntas de cumplimiento de forma anticipada sobre tu
*empresa*
, no solo la aplicación — controlador de datos, representante de la UE, correo electrónico de contacto, dirección física. Tenlo todo listo antes de empezar. Representar incorrectamente cualquier información es motivo de terminación permanente de la cuenta.

## iOS — Construir y enviar

### Versionado

En Xcode, abre
`ios/NavigatorApp.xcworkspace`
y establece:

* **MARKETING\_VERSION**
  (por ejemplo,
  `1.4.0`
  ) — la versión que ven los usuarios.
* **CURRENT\_PROJECT\_VERSION**
  (por ejemplo,
  `42`
  ) — un número de versión numérico. Debe ser único para cada envío de TestFlight para una versión de marketing dada.

### Firma con Fastlane Match

Navigator incluye Fastlane lanes que utilizan
[match](https://docs.fastlane.tools/actions/match/)
con almacenamiento S3 para los perfiles de configuración, lo que permite a varias máquinas y a la automatización crear firmas sin tener que mover manualmente los certificados.

Las variables de entorno requeridas (consulta
`ios/fastlane/Fastfile`
):

| Variable | Propósito |
|---|---|
| `APP_IDENTIFIER` | Identificador de paquete (individual o separado para múltiples objetivos). |
| `APPSTORE_API_KEY_ID` | ID de la clave de la API de App Store Connect. |
| `APPSTORE_API_ISSUER_ID` | ID del emisor de la API de App Store Connect. |
| `DEVELOPMENT_TEAM_ID` | ID del equipo de desarrollo de Apple. |
| `MATCH_S3_BUCKET` | Nombre del bucket de S3 que contiene el repositorio de match (por defecto `flb-navigator-app-profiles`). |
| `MATCH_S3_REGION` | Región de AWS del bucket (por defecto `ap-southeast-1`). |
| `MATCH_S3_OBJECT_PREFIX` | Prefijo dentro del bucket (por defecto `$PROFILE/certs`). |
| `MATCH_READONLY` | `true` en la automatización para evitar la regeneración. |

El
`.p8`
archivo de la clave de App Store Connect debe estar en
`~/.appstoreconnect/private_keys/AuthKey_<APPSTORE_API_KEY_ID>.p8`
.

### Lanes disponibles

```
cd ios

# Construir solo (sin subir)
bundle exec fastlane build_ios

# Construir y subir a TestFlight (probadores externos habilitados)
bundle exec fastlane deploy_testflight

# Construir y subir a App Store (NO envía automáticamente para revisión)
bundle exec fastlane deploy_appstore
```

Cada lane:

1. Carga la clave de la API de App Store Connect desde el entorno.
2. Crea un keychain
   `ci-signing`
   .
3. Recupera los certificados y perfiles de configuración de S3 a través de match.
4. Construye con
   `gym`
   utilizando la firma manual y el perfil
   `match AppStore <APP_IDENTIFIER>`
   .
5. Sube a la ubicación elegida.
6. Elimina el keychain.

### Enviar para revisión

Después de
`deploy_appstore`
, la construcción termina en App Store Connect bajo la versión que hayas seleccionado. En la interfaz de usuario de App Store Connect:

1. Selecciona la construcción subida.
2. Completa
   **Información de la versión**
   : lo que es nuevo, capturas de pantalla (por clase de dispositivo), texto promocional, URL de soporte.
3. Completa
   **Información de revisión de la aplicación**
   : información de contacto, credenciales de prueba para la revisión, notas para los revisores (indica que es una aplicación de gestión de flotas para conductores comerciales, y que se requiere la ubicación en tiempo real para la gestión).
4. **Enviar para revisión**
   .

El tiempo típico de revisión: 24–48 horas. Las razones comunes para el rechazo se cubren en
[Solución de problemas](#troubleshooting)
.

## Android — Construir y enviar

### Versionado

Establece esto en tu
`.env`
(o en el entorno de automatización):

```
ANDROID_VERSION_CODE=42
ANDROID_VERSION_NAME=1.4.0
```

`ANDROID_VERSION_CODE`
debe incrementarse para cada subida, incluso entre los perfiles de prueba.

### Generar un almacén de carga

Si aún no tienes uno:

```
keytool -genkeypair -v \
  -keystore navigator-upload.keystore \
  -alias navigator-upload \
  -keyalg RSA -keysize 2048 -validity 10000
```

Guarda el archivo
`.keystore`
resultante en un lugar seguro (con un gestor de contraseñas, en un repositorio seguro, en un bucket S3 con KMS).
**Si lo pierdes, no podrás publicar actualizaciones**
sin pasar por el proceso de restablecimiento de la clave de Google Play App Signing, que tarda varias semanas.

Luego, extrae las variables de entorno que espera la construcción de lanzamiento (ya leídas en
`android/app/build.gradle`
):

```
export ANDROID_NAVIGATOR_APP_UPLOAD_STORE_FILE=/secure/path/navigator-upload.keystore
export ANDROID_NAVIGATOR_APP_UPLOAD_STORE_PASSWORD=...
export ANDROID_NAVIGATOR_APP_UPLOAD_KEY_ALIAS=navigator-upload
export ANDROID_NAVIGATOR_APP_UPLOAD_KEY_PASSWORD=...
```

### Lanes disponibles

Todos los lanes de Fastlane (
`android/fastlane/Fastfile`
) ejecutan
`gradle clean bundleRelease`
y suben un
`.aab`
a la pista elegida:

```
cd android

bundle exec fastlane deploy_internal     # → Pruebas internas (instantáneas, hasta 100 probadores)
bundle exec fastlane deploy_alpha        # → Pruebas cerradas (alfa)
bundle exec fastlane deploy_beta         # → Pruebas cerradas (beta) — úsalo para cumplir con el requisito de 12 probadores / 14 días
bundle exec fastlane deploy_production   # → Pista de producción
```

Necesitas una clave de servicio de Google Play. Créala en
**Google Play → Configuración → Acceso a la API**
y otorga acceso a
**Gestor de aplicaciones**
para la aplicación.

### La regla de los 12 probadores de Google

Desde noviembre de 2023, cualquier nueva cuenta personal de Google Play debe ejecutar su aplicación en
**pruebas cerradas con al menos 12 probadores optados en continuo durante al menos 14 días**
antes de poder solicitar el acceso a la producción. El período de 14 días solo cuenta los días en los que tienes ≥ 12 probadores activos, y Google revisa la solicitud manualmente antes de conceder el acceso.

**Flujo de trabajo:**

1. `bundle exec fastlane deploy_beta`
   para subir tu versión de lanzamiento
   `.aab`
   a la pista cerrada de Beta.
2. En
   **Play Console → Pruebas → Pruebas cerradas**
   , añade probadores a través de un grupo de Google o una lista de correo electrónico con más de 12 cuentas de Gmail reales.
3. Comparte la URL de autorización con los probadores: cada probador debe hacer clic en la URL
   **y**
   instalar la aplicación a partir de la lista resultante de la Play Store para que comience la prueba.
4. Después de ≥ 14 días con ≥ 12 probadores activos, verás un
   **Solicitar acceso a producción**
   en la página de pruebas. Completa el formulario (Google puede solicitar capturas de pantalla que muestren a los probadores en la aplicación o artefactos de comentarios).
5. Una vez que Google conceda el acceso a producción (típicamente unos días), promociona la versión a través de
   `deploy_production`
   o seleccionando la versión de la pista cerrada en el panel de control de producción.

Para cuentas de desarrolladores corporativas/organizacionales, el requisito de 12 probadores no se aplica actualmente: verifica el tipo de tu cuenta en
**Play Console → Configuración → Cuenta de desarrollador → Detalles de la cuenta**
.

### Solicitar revisión

Una vez que se haya promocionado a producción, Google revisa la versión. Las revisiones iniciales pueden tardar más de 7 días; las actualizaciones posteriores suelen durar menos de 24 horas. Las versiones en pistas internas/cerradas se revisan, pero normalmente se ponen en funcionamiento el mismo día.

## Convención de nomenclatura de versiones

| Plataforma | Versión pública | Número de versión interna |
| --- | --- | --- |
| **iOS** | `MARKETING_VERSION` en Xcode (o `agvtool new-marketing-version`) | `CURRENT_PROJECT_VERSION` en Xcode (o `agvtool next-version -all`) |
| **Android** | `ANDROID_VERSION_NAME` (variable de entorno) | `ANDROID_VERSION_CODE` (variable de entorno) |

Mantén las versiones públicas sincronizadas en todas las plataformas. Los números de versión son independientes: Apple quiere que la versión de marketing sea monótona, Google quiere que sea monótona en todas las subidas.

## CI / Entrega continua

Los archivos Fastfiles son compatibles con CI:

* `ensure_ci_keychain`
  /
  `cleanup_ci_keychain`
  para que las pistas de iOS se ejecuten con un nuevo
  `ci-signing`
  keychain creado y destruido por cada ejecución.
* Asegúrate de que las ejecuciones estén en modo `MATCH_READONLY=true` en el CI para evitar la regeneración accidental de certificados.
* Todos los valores sensibles se transmiten a través de variables de entorno: configúralas a través de la tienda de secretos de tu proveedor de CI (GitHub Actions, GitLab CI, CircleCI, etc.).

Una matriz típica de GitHub Actions tendría un trabajo para iOS (ejecutándose en
`macos-latest`) y otro para Android (ejecutándose en
`ubuntu-latest`), cada uno cargando los secretos relevantes e invocando la pista Fastlane correspondiente al despliegue.

## Solución de problemas

| Síntoma | Causa probable |
| --- | --- |
| La aplicación falla al iniciarse con la clave `licenseKey` en la pila | La licencia de Transistor Soft de background-geolocation está ausente o es incorrecta. Verifica nuevamente el valor que se inyecta en `AndroidManifest.xml` / `Info.plist`. |
| El revisor de iOS rechaza por "ubicación en segundo plano no justificada" | Fortalece las cadenas de `NSLocationAlwaysAndWhenInUseUsageDescription` en `Info.plist` y explica el caso de uso en las notas de revisión de la aplicación. |
| El revisor de iOS rechaza por falta de manifiesto de privacidad | Añade `PrivacyInfo.xcprivacy` que declare el uso de la API requerida para el seguimiento, el acceso al sistema de archivos y las preferencias del usuario. |
| El compilación de Android falla en `bundleRelease` con errores de firma | Verifica que todas las cuatro variables de entorno `ANDROID_NAVIGATOR_APP_UPLOAD_*` estén exportadas en el mismo shell que la invocación de Gradle. |
| Match sigue intentando regenerar certificados | Desactiva `MATCH_FORCE` y vuelve a ejecutar con `MATCH_READONLY=true`. El bucket de S3 es la fuente de verdad. |
| Google rechaza con "violación de política: ubicación en segundo plano" | Proporciona una demostración en vídeo que muestre el flujo de trabajo de ubicación requerido y enlaza la política de privacidad en el recurso de apelación. |

## Después del lanzamiento

Una vez que tu aplicación esté en funcionamiento:

* Distribuye el
  **Enlace de la aplicación**
  (QR + URL) desde
  **Console → Admin → Fleet-Ops Config → Navigator App**
  para que los conductores puedan configurar la aplicación con un solo escaneo.
* Integra el seguimiento de errores y el rendimiento (Crashlytics, Sentry o tu proveedor de elección) en las versiones de lanzamiento.
* Para cada versión posterior, sigue el mismo flujo: actualiza las versiones, ejecuta la pista de despliegue, solicita la revisión.