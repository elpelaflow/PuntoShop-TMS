---
title: "Paquete"
url: https://fleetbase.io/docs/cli/extension-development/bundle
module: cli
---

# Paquete

Empaquete una extensión en un archivo `.tar.gz` versionado para su distribución utilizando `flb bundle`.

# flb bundle

Empaquete su extensión en un
`.tar.gz`
para su distribución. La salida se llama
`<nombre-del-paquete>-v<versión>-bundle.tar.gz`
y excluye
`node_modules/`
,
`server_vendor/`
y cualquier archivo de paquete previamente generado.

```
flb bundle               # Solo crea el paquete
flb bundle --upload      # Crea y sube al registro
```

Ejecute desde el directorio raíz de su extensión, o pase
`--path`.

## Opciones

| Opción | Descripción |
| --- | --- |
| `-p, --path <ruta>` | Ruta al directorio de la extensión (predeterminado: directorio actual) |
| `-u, --upload` | Sube el paquete al registro después de crearlo |
| `--auth-token <token>` | Token de autenticación para la subida (solo relevante con `--upload`) |

## Ejemplos

### Crear un paquete

```
cd /ruta/a/su/extensión
flb bundle
```

Salida:

```
Creando el paquete vehicle-inspections-v1.2.0-bundle.tar.gz...
Paquete creado en /ruta/a/su/extensión/vehicle-inspections-v1.2.0-bundle.tar.gz
```

### Paquetear y subir en un solo paso

```
flb bundle --upload
```

La CLI busca su token de autenticación en
`~/.npmrc`. Para sobreescribir, pase
`--auth-token`.

### Paquetear un directorio diferente

```
flb bundle --path ./extensions/vehicle-inspections
```

## Qué incluye

El paquete incluye todo en su directorio de extensión
**excepto**:

* `node_modules/`
* `server_vendor/`
* Cualquier archivo que coincida con el patrón del nombre del archivo del paquete (
  `*-v*-bundle.tar.gz`
  ) — por lo que volver a empaquetar nunca incluirá un paquete anterior

Esto significa que los manifiestos (
`extension.json`
,
`package.json`
,
`composer.json`
), el addon (
`addon/`
), el servidor (
`server/`
), las pruebas, la configuración y cualquier documentación, se incluyen en el archivo.

## Nombre del archivo del paquete

La CLI lee
`extension.json`
para determinar el nombre y la versión, y luego genera:

```
<nombre-en-minúsculas>-v<versión>-bundle.tar.gz
```

Por ejemplo:

| `extension.json` | Archivo de paquete |
| --- | --- |
| `{"name": "@acme/vehicle-inspections-engine", "version": "1.2.0"}` | `acme-vehicle-inspections-engine-v1.2.0-bundle.tar.gz` |
| `{"name": "Vehicle Inspections", "version": "0.0.1-rc.1"}` | `vehicle-inspections-v0.0.1-rc.1-bundle.tar.gz` |

## Requisitos previos

El directorio de su extensión debe contener un
`extension.json`
válido con tanto
`name`
como
`version`
definidos. Si alguno de los dos falta,
`flb bundle`
se detiene:

```
Nombre o versión no especificados en extension.json
```

## Siguiente

* [`flb bundle-upload`](https://fleetbase.io/docs/cli/extension-development/bundle-upload)
  — sube un paquete existente al registro
* [`flb publish`](https://fleetbase.io/docs/cli/extension-development/publish)
  — flujo de publicación alternativo a través de npm

## Solución de problemas

**`extension.json no encontrado en …`**
— no está en el directorio raíz de la extensión. Pase el correcto
`--path`.

**El paquete es inesperadamente grande**
— verifique que
`node_modules/`
y
`server_vendor/`
estén excluidos. Si tiene otros directorios grandes que desea excluir (por ejemplo,
`tests/fixtures/`
), utilice un enfoque similar a
`.gitignore`
eliminándolos antes de que se ejecute
`flb bundle`.