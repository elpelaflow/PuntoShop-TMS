---
title: "FileUpload"
url: https://fleetbase.io/docs/ui/inputs/file-upload
module: ui
---

# FileUpload

`<FileUpload>` envuelve el helper `ember-file-upload` para la gestión de colas de archivos. Permite definir cualquier interfaz de usuario para iniciar la carga. Se puede usar con `<UploadButton>` para obtener una interfaz de usuario lista para usar.

# <FileUpload>

`<FileUpload>`
es un envoltorio ligero alrededor del helper `ember-file-upload` para la gestión de colas de archivos. Expone un campo de entrada de archivo oculto y permite definir cualquier interfaz de usuario para iniciar la carga, como un botón, un panel o un área de arrastrar y soltar.

Para obtener un botón listo para usar, utilice
[`<UploadButton>`](#upload-button)
(que se describe a continuación).

## Uso básico

```
<FileUpload @name="avatar" @accept="image/*" @onFileAdded={{this.handleFile}} as |queue|>
  <Button @icon="upload" @text="Cargar avatar" {{on "click" queue.selectFile}} />
</FileUpload>
```

```
@action async handleFile(file) {
  // file es una instancia de File de ember-file-upload
  // llamar a file.upload(url) o a su propio servicio de carga
}
```

La cola obtenida,
`queue`,
es la instancia
`FileQueue`
— útil para iniciar la selección de forma programática y para realizar un seguimiento del estado de la carga.

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@name` | string | Nombre de la cola (utilizado para distinguir múltiples colas) |
| `@accept` | string | Filtro de tipo MIME (por ejemplo, `image/*`, `.pdf`) |
| `@hidden` | boolean | Indica si el `<input type="file">` subyacente está oculto (valor predeterminado: `true`) |
| `@disabled` | boolean | Deshabilitar la entrada |
| `@inputClass` | string | Clases adicionales para la entrada |
| `@labelClass` | string | Clases adicionales para la etiqueta `<label>` |

### Callbacks

| Argumento | Firma | Descripción |
|---|---|---|
| `@onFileAdded` | `(file)` | Se llama cuando se añade un archivo a la cola |
| `@onFileRemoved` | `(file)` | Se llama cuando se elimina un archivo |
| `@onUploadStarted` | `(file)` | Se llama cuando se inicia una carga |
| `@onUploadSucceeded` | `(file, response)` | Se llama cuando la carga tiene éxito |
| `@onUploadFailed` | `(file, error)` | Se llama cuando la carga falla |

## Bloque devuelto

El bloque devuelto,
`queue`,
tiene estas propiedades clave (de
`ember-file-upload`
):

| Propiedad | Descripción |
|---|---|
| `queue.selectFile` | Modificador — adjuntar a un elemento interactivo para abrir el selector |
| `queue.files` | Array de archivos en la cola |

## <UploadButton>

Para obtener un botón de inicio de sesión listo para usar, utilice el componente hermano
`<UploadButton>`
(solo plantilla, en
`addon/components/upload-button.hbs`
):

```
<UploadButton @name="avatar" @accept="image/*" @onFileAdded={{this.handleFile}} />
```

Esto renderiza un botón de inicio de sesión con estilo que abre el selector de archivos al hacer clic. Utiliza los mismos `@`-args que
`<FileUpload>`.

## Ejemplos del mundo real

```
{{!-- Carga de un solo archivo con estado --}}
<FileUpload @name="logo" @accept="image/*" @onFileAdded={{this.uploadLogo}} as |queue|>
  <a tabindex="0" class="btn btn-default">
    {{#if queue.files.length}}
      <Spinner @size="xs" /> Cargar…
    {{else}}
      <FaIcon @icon="upload" class="mr-1" /> Cargar logo
    {{/if}}
  </a>
</FileUpload>

{{!-- Dentro de un grupo de entrada --}}
<InputGroup @name="Profile photo">
  <UploadButton @name="photo" @accept="image/*" @onFileAdded={{this.uploadPhoto}} />
</InputGroup>
```

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/file-upload.hbs` | Plantilla (solo plantilla) |
| `addon/components/upload-button.hbs` | Componente hermano — botón de inicio de sesión listo para usar (solo plantilla) |

Envuelve
[`ember-file-upload`](https://github.com/adopted-ember-addons/ember-file-upload)
.