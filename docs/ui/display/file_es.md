---
title: "Archivo"
url: https://fleetbase.io/docs/ui/display/file
module: ui
---

# Archivo

`<File>` renderiza una tarjeta de archivo con vista previa (miniatura de imagen o icono), nombre del archivo y un menú desplegable opcional de acciones. Úselo junto con `<FileIcon>` para iconos incrustados.

# `<File>`

`<File>`
renderiza una vista previa en estilo de tarjeta de un registro de Fleetbase
`file`.
Muestra la miniatura de la imagen (para imágenes) o un icono de tipo de archivo (para todo lo demás), el nombre del archivo truncado y un menú desplegable opcional de acciones con las opciones de eliminar/descargar/previsualizar.

Para un icono incrustado más pequeño, use
`<FileIcon>`
.

## Uso básico

```
{{#each this.driver.documents as |doc|}}
  <File
    @file={{doc}}
    @onDownload={{this.downloadDoc}}
    @onPreview={{this.previewDoc}}
    @onDelete={{this.deleteDoc}}
  />
{{/each}}
```

## Argumentos

### Núcleo

| Argumento | Tipo | Descripción |
|---|---|---|
| `@file` | modelo | El registro de Fleetbase `file` (debe tener `original_filename` y `url` ) |

### Acciones

El menú desplegable de acciones solo se renderiza cuando se proporciona al menos una función de devolución de llamada. Cada función de devolución de llamada recibe el archivo:

| Argumento | Firma | Descripción |
|---|---|---|
| `@onDelete` | `(file)` | Muestra la acción de Eliminar |
| `@onDownload` | `(file)` | Muestra la acción de Descargar |
| `@onPreview` | `(file)` | Muestra la acción de Previsualizar |

### Personalización del menú desplegable

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@dropdownIcon` | string | `ellipsis-v` | Icono para activar el menú desplegable |
| `@dropdownButtonIconPrefix` | string | — | Prefijo de FontAwesome |
| `@dropdownButtonText` | string | — | Texto opcional en el disparador |
| `@dropdownButtonRenderInPlace` | boolean | `true` | Renderizar en el orden del DOM |
| `@dropdownButtonWrapperClass` | string | — | Clase en el envoltorio del disparador |
| `@dropdownButtonTriggerClass` | string | — | Clase en el propio disparador |
| `@dropdownButtonCalculatePosition` | función | — | Calculadora de posición personalizada |
| `@registerAPI` | función | — | Capturar la API del menú desplegable |
| `@onInsert` | función | — | Se llama cuando se inserta el menú desplegable |

Cualquier atributo adicional
`...attributes`
se pasa a la tarjeta exterior.

## Ver también

* `<FileIcon>`
  — icono de tipo de archivo pequeño incrustado
* `<UploadButton>`
  — botón de activación para la carga de archivos
* [`<FileUpload>`](https://fleetbase.io/docs/ui/inputs/file-upload)
  — componente de selector de archivos

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/file.hbs` | Plantilla |
| `addon/components/file.js` | Clase |
| `addon/components/file-icon.hbs` | Sibling — icono de tipo de archivo pequeño incrustado |
| `addon/components/file-icon.js` |  |