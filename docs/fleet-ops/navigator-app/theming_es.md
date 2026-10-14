---
título: "Temática y Marca"
url: https://fleetbase.io/docs/fleet-ops/navigator-app/theming
módulo: fleet-ops
---

# Temática y Marca

Personalice los colores, temas, icono de la aplicación, pantalla de inicio y nombres de visualización para la aplicación Navigator.

# Temática y Marca

La aplicación Navigator utiliza
[Tamagui](https://tamagui.dev)
para la temática. La configuración combina una paleta de colores al estilo Tailwind con temas nombrados, así como sobrescrituras en tiempo de ejecución a través de variables de entorno para un trabajo de marca rápido sin necesidad de modificar el código.

## Cómo funcionan los temas

Fuente de la temática:
`tamagui.config.ts`
en la raíz del proyecto.

### Bases

La aplicación define dos bases semánticas
**bases**:
—
`lightBase`
y
`darkBase`
— y cada pantalla consume tokens de estas. El conjunto de tokens incluye:

* `background`
  ,
  `surface`
  ,
  `subsurface`
  ,
  `color`
* `textPrimary`
  ,
  `textSecondary`
  ,
  `textPlaceholder`
* `primary`
  ,
  `primaryBorder`
  ,
  `primaryText`
* `secondary`
  ,
  `secondaryBorder`
* `borderColor`
  ,
  `borderColorWithShadow`
  ,
  `shadowColor`
  ,
  `borderActive`
* `default`
  ,
  `defaultBorder`
  ,
  `defaultText`
* `success`
  ,
  `successBorder`
  ,
  `successText`
* `error`
  ,
  `errorBorder`
  ,
  `errorText`
* `warning`
  ,
  `warningBorder`
  ,
  `warningText`
* `info`
  ,
  `infoBorder`
  ,
  `infoText`
* `tabIconBlur`

### Capas de sobrescritura

Las bases se extienden en este orden: las capas posteriores tienen prioridad:

1. `globalColors`
   —
   `transparent`
   ,
   `white`
   ,
   `black`
2. `CUSTOM_COLORS`
   — variables de entorno — se aplican sobrescrituras universales a ambas bases (clara y oscura)
3. `CUSTOM_COLORS_LIGHT`
   o
   `CUSTOM_COLORS_DARK`
   — sobrescrituras específicas del modo
4. Paleta de colores de Tailwind (
   `gray`
   ,
   `red`
   ,
   `blue`
   ,
   `green`
   ,
   `yellow`
   ,
   `orange`
   ,
   `indigo`
   ,
   `purple`
   ,
   `pink`
   ) — cada tono del 50 al 900, disponibles como
   `$gray-500`
   ,
   `$blue-700`
   , etc.

### Temas nombrados

`tamagui.config.ts`
exporta estos temas a través de
`createTheme()`
:

* **Light**
  :
  `lightBlue`
  ,
  `lightRed`
  ,
  `lightGreen`
  ,
  `lightIndigo`
  ,
  `lightOrange`
* **Dark**
  :
  `darkBlue`
  ,
  `darkRed`
  ,
  `darkGreen`
  ,
  `darkIndigo`
  ,
  `darkOrange`

El tema activo se calcula en tiempo de ejecución como
`${userColorScheme}${capitalize(APP_THEME)}`
— por lo que
`APP_THEME=indigo`
más el modo oscuro del dispositivo, resulta en
`darkIndigo`
.

El conductor puede cambiar entre el modo claro y oscuro dentro de la aplicación. La elección persiste a través del hook
`useStorage`
bajo la clave
`app_theme`
(ver
`src/hooks/use-app-theme.ts`
).

## Reutilice los colores rápidamente con CUSTOM_COLORS

Para la mayoría del trabajo de marca, no es necesario modificar el código: configure las variables de entorno:

```
APP_THEME=blue

# Variables de entorno universales (aplicadas a ambas bases)
CUSTOM_COLORS=primary:#FF3A44,primaryBorder:#FF3A44,primaryText:#FFFFFF

# Diferentes sobrescrituras por modo
CUSTOM_COLORS_LIGHT=background:#FFFFFF,surface:#F7F7F7
CUSTOM_COLORS_DARK=background:#0A0A0A,surface:#171717
```

Formato:
`tokenName:#hex`
separados por comas. El analizador se encuentra en
`src/utils/tamagui.js`
(
`parseConfigObjectString`
) — revise el formato exacto aceptado allí si necesita casos especiales.

El resultado combinado se conecta tanto a
`lightBase`
como a
`darkBase`
, por lo que un token personalizado (por ejemplo,
`primary`
) está disponible de forma consistente en ambos temas (claro y oscuro).

## Añada un tema de marca

Si las sobrescrituras del entorno no son suficientes — por ejemplo, si desea una paleta completamente personalizada encima de cada tono de color de estilo Tailwind — añada directamente las nuevas entradas de tema en
`tamagui.config.ts`
. Navigator define todos los temas de marca en este archivo de configuración.

Abra
`tamagui.config.ts`
y añada su paleta de marca al objeto
`colors`
. Mantenga la misma estructura — las claves
`50`
hasta
`900`
— si desea acceder a los tokens de estilo
`$brand-300`
.

Añada las entradas
`lightAcme`
y
`darkAcme`
al mapa
`themes`
, reflejando la forma de
`lightBlue`
/
`darkBlue`
. Sobrescriba
`primary`
,
`primaryBorder`
y
`primaryText`
(y cualquier otro token que desee re-marcar).

Establezca
`APP_THEME=acme`
en
`.env`
.

Reinicie Metro / Webpack y reconstruya — el plugin de Babel de Tamagui lee la configuración en tiempo de compilación, por lo que las modificaciones del tema requieren una nueva compilación.

## Activos de marca

| Activo | Archivo fuente | Cómo aplicar |
| --- | --- | --- |
| **Icono de la aplicación** | `assets/app-icon.png` (PNG de 1024x1024, sin transparencia, sin esquinas redondeadas — las tiendas redondean las suyas) | Reemplace, luego `yarn generate:app-icon` — ramifica a `ios/NavigatorApp/Images.xcassets/AppIcon.appiconset` y `android/app/src/main/res/mipmap-*` |
| **Pantalla de inicio** | — | Reemplace, luego `yarn generate:launch-screen` — ejecuta `react-native-bootsplash` con `--background=#111827 --logo-width=100 --flavor=main` |
| **Color de fondo de inicio de sesión** | — | Establezca `LOGIN_BG_COLOR=#111827` (o cualquier código hexadecimal) — se lee en tiempo de ejecución por las pantallas de inicio de sesión |

### Generación del icono de la aplicación y la pantalla de inicio

```
# Después de reemplazar assets/app-icon.png:
yarn generate:app-icon

# Después de reemplazar assets/splash-screen.png:
yarn generate:launch-screen
```

`yarn generate:launch-screen`
tiene como valor predeterminado
`--background=#111827 --logo-width=100 --flavor=main`
. Modifique el script en
`package.json`
si desea un fondo, ancho de logotipo o sabor diferente.

## Nombres de visualización nativos

`app.json`
solo controla el nombre del registro de React Native. El nombre de la aplicación visible para el usuario se establece de forma nativa:

* **iOS**
  :
  `ios/NavigatorApp/Info.plist`
  →
  `CFBundleDisplayName`
  es
  `$(APP_NAME)`
  , impulsado por xcconfig de su
  `.env`
  .
* **Android**
  :
  `android/app/src/main/res/values/strings.xml`
  →
  `<string name="app_name">NavigatorApp</string>`
  .

Si re-marca completamente, también actualice:

* `ios/NavigatorApp.xcodeproj`
  (nombre del proyecto de Xcode)
* `android/app/build.gradle`
  namespace y
  `applicationId`
  (normalmente también se establece a través de
  `APP_IDENTIFIER`
  )
* `app.json`
  `name`
  y
  `displayName`

Consulte
[Build & Release](https://fleetbase.io/docs/fleet-ops/navigator-app/build-and-release)
para el flujo de trabajo de renombre.

## Extracción estática de Tamagui

El proceso de compilación ejecuta el plugin de Babel de Tamagui (
`@tamagui/babel-plugin`
) según la configuración en
`babel.config.js`
, que extrae y optimiza los estilos de Tamagui en tiempo de compilación. En el objetivo web, la configuración de Webpack también ejecuta
`tamagui-loader`
para la extracción de CSS estático.

En desarrollo, la extracción está desactivada (
`disableExtraction: process.env.NODE_ENV === 'development'`
) para que las ediciones de temas se carguen de forma dinámica — pero los paquetes de producción siempre pasan por la extracción. Normalmente no es necesario que se preocupe por esto — si una actualización de Tamagui rompe los builds, la configuración del plugin en
`babel.config.js`
es donde debe buscar.