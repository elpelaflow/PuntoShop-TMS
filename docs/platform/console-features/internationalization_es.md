---
title: "Internacionalización"
url: https://fleetbase.io/docs/platform/console-features/internationalization
module: platform
---

# Internacionalización

Cambie el idioma de la interfaz de la consola utilizando el selector de idioma en la barra de navegación superior.

# Internacionalización

La consola de Fleetbase está disponible en varios idiomas. Los usuarios pueden cambiar su idioma en cualquier momento utilizando el
**selector de idioma**
en la barra de navegación superior. La selección se guarda en la cuenta del usuario y se aplica de inmediato sin necesidad de recargar la página.

## Cambiar de idioma

Haga clic en el
**icono de la esfera**
en el lado derecho de la barra de navegación superior para abrir el selector de idioma.

![Selector de idioma: lista de idiomas con emojis de banderas y una marca de verificación en el idioma activo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-locale-select.8048c1a4.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Un desplegable muestra todos los idiomas disponibles, junto con sus emojis de banderas correspondientes. El idioma activo actualmente tiene una marca de verificación verde a su lado. Haga clic en cualquier idioma para cambiarlo de inmediato.

La preferencia se guarda en la cuenta de usuario en el servidor, por lo que el mismo idioma se aplicará la próxima vez que inicie sesión en cualquier dispositivo.

## Idiomas disponibles

| Idioma | Código de idioma |
|---|---|
| Inglés | `en-us` |
| Árabe | `ar-ae` |
| Búlgaro | `bg-bg` |
| Español (España) | `es-es` |
| Español (México) | `es-mx` |
| Persa | `fa-ir` |
| Francés | `fr-fr` |
| Mongol | `mn-mn` |
| Portugués (Brasil) | `pt-br` |
| Ruso | `ru-ru` |
| Uzbeko | `uz-uz` |
| Vietnamita | `vi-vn` |
| Chino (simplificado) | `zh-cn` |

## Agregar o extender idiomas

Los archivos de traducción se encuentran en el
`directorio translations/`
de la aplicación de la consola, un archivo YAML por idioma (por ejemplo,
`en-us.yaml`
). Los paquetes de extensión incluyen sus propias claves de traducción en sus propios
`directorio translations/`
, que se fusionan en tiempo de compilación.

Para agregar un nuevo idioma o sobrescribir cadenas existentes, agregue o edite el archivo YAML correspondiente y vuelva a compilar la consola. Las claves siguen una estructura de ruta con puntos (por ejemplo,
`console.notifications.mark-as-read`
).