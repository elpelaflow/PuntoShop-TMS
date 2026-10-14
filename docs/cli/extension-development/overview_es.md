---
título: "Visión general"
url: https://fleetbase.io/docs/cli/extension-development/overview
módulo: cli
---

# Visión general

Cree, pruebe, versionee, empaquete y publique extensiones Fleetbase personalizadas utilizando la CLI.

# Publicación de extensiones

La CLI le proporciona todo el ciclo de vida para la creación y publicación de una extensión Fleetbase, desde la creación de un nuevo proyecto hasta su publicación en el Registro de Extensiones.

## El ciclo de vida

```
flb scaffold →  Genera una nueva extensión a partir de la plantilla de inicio
                   ↓
        desarrollar localmente — escriba su código de complemento y de servidor
                   ↓
flb version-bump →  Aumente la versión en extension.json / package.json / composer.json
                   ↓
flb bundle →  Empaquete la extensión en un archivo .tar.gz distribuible
                   ↓
flb bundle-upload →  Sube el paquete al almacenamiento del registro
   — o —
flb publish →  Ejecute `npm publish` contra el registro
                   ↓
                    La extensión ahora es instalable mediante `flb install`
```

## Páginas

Plantilla

Genera una nueva extensión a partir de la plantilla de inicio.

[flb scaffold →](https://fleetbase.io/docs/cli/extension-development/scaffold)

Aumentar la versión

Incremente la versión principal / secundaria / de parche / de pre-lanzamiento en todos los archivos de manifiesto.

[flb version-bump →](https://fleetbase.io/docs/cli/extension-development/version-bump)

Empaquetar

Empaquete la extensión en un archivo .tar.gz versionado, subiéndolo opcionalmente.

[flb bundle →](https://fleetbase.io/docs/cli/extension-development/bundle)

Subir el paquete

Sube un paquete existente al registro.

[flb bundle-upload →](https://fleetbase.io/docs/cli/extension-development/bundle-upload)

Publicar

Ejecute
`npm publish`
contra el registro.

[flb publish →](https://fleetbase.io/docs/cli/extension-development/publish)

Despublicar

Elimine una extensión publicada del registro.

[flb unpublish →](https://fleetbase.io/docs/cli/extension-development/unpublish)

## Requisitos previos

Antes de poder publicar, necesitará:

1. Una cuenta de desarrollador de registro — vea
   [Registrarse](https://fleetbase.io/docs/cli/account/register)
2. Una dirección de correo electrónico verificada — vea
   [Verificar](https://fleetbase.io/docs/cli/account/verify)
3. Un token de autenticación para el registro — guardado mediante
   [`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth)
   o variable de entorno para CI

## Anatomía de una extensión

Una extensión Fleetbase es un único repositorio que contiene tanto:

* **Un addon de Ember**
  — la interfaz de usuario de la consola (paquete npm, por ejemplo,
  `@yourcompany/yourext-engine`
  )
* **Un paquete de Laravel**
  — el código del servidor de API (paquete de Composer, por ejemplo,
  `yourcompany/yourext-api`
  )

Ambos paquetes se publican desde el mismo árbol de código. La plantilla de inicio que clona el scaffolder le proporciona ambas partes conectadas.

Para documentación más detallada sobre el desarrollo (arquitectura, servicios, registros, IAM), consulte la
[Documentación de desarrollo de extensiones](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
.