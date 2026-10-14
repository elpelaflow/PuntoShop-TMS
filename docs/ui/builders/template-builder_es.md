---
título: "TemplateBuilder"
url: https://fleetbase.io/docs/ui/builders/template-builder
módulo: ui
---

# TemplateBuilder

`<TemplateBuilder>` es un editor de diseño con arrastrar y soltar para plantillas HTML con interpolación de variables. Se utiliza en las plantillas de facturas de Ledger y en cualquier característica basada en plantillas.

# `<TemplateBuilder>`

`<TemplateBuilder>`
es un editor completo con arrastrar y soltar para diseñar plantillas que combinan un diseño estático con variables dinámicas. Es el motor detrás de las plantillas de facturas de Ledger y es reutilizable para cualquier característica basada en plantillas.

El editor admite texto, imágenes, tablas, líneas, formas, códigos QR y códigos de barras, cada uno posicionable, rotable y con estilo libremente. Las variables (por ejemplo,
`{invoice.number}`
,
`{transaction.reference}`
) se insertan a través de un selector de variables que está impulsado por
**esquemas de contexto**
registrados con el servicio de renderizado de plantillas.

## Uso básico

```
<TemplateBuilder
  @template={{this.template}}
  @contextSchemas={{this.contextSchemas}}
  @isSaving={{this.isSaving}}
  @onSave={{this.saveTemplate}}
  @onPreview={{this.previewTemplate}}
  @onClose={{this.exitBuilder}}
/>
```

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@template` | modelo | El registro de la plantilla que se está editando |
| `@contextSchemas` | array | Esquemas que describen las variables disponibles, normalmente proporcionados por la extensión anfitriona |
| `@isSaving` | booleano | Controla el estado de carga del botón de guardar |
| `@onSave` | `() => Promise` | Callback de guardado |
| `@onPreview` | `() => void` | Callback de vista previa (renderiza con datos de muestra) |
| `@onClose` | `() => void` | Opcional — callback para el botón de retroceso/cierre |
| `@closeIcon` | cadena | Valor predeterminado `chevron-left` |
| `@closeLabel` | cadena | Etiqueta opcional del botón de cierre |

## Tipos de elementos

La barra de herramientas permite al usuario arrastrar y soltar lo siguiente en el lienzo:

| Tipo | Descripción |
|---|---|
| **Texto** | Texto estático o basado en variables con fuente, tamaño, color y alineación |
| **Imagen** | Logo, foto o URL de imagen arbitraria |
| **Tabla** | Diseño tabular para renderizar elementos de línea |
| **Línea** | Separador horizontal o vertical |
| **Forma** | Rectángulo, círculo, etc. |
| **Código QR** | Código QR generado a partir de un valor |
| **Código de barras** | Código de barras generado a partir de un valor |

## Estado rastreado

El editor mantiene:

| Propiedad | Valor predeterminado | Descripción |
|---|---|---|
| `selectedElement` | — | Elemento actualmente seleccionado |
| `zoom` | `1` | Nivel de zoom del lienzo (rango de 0,25 a 3) |
| `variablePickerOpen` | `false` | Indica si el selector de variables está abierto |
| `_undoStack` / `_redoStack` | — | Hasta 50 pasos de deshacer |
| `leftPanelTab` | `layers` | `layers` o `queries` |

## Tamaños de papel

A4, A3, A5, Letter, Legal — seleccionables desde la configuración del lienzo.

## Ejemplo del mundo real

En Ledger, el editor de plantillas de facturas envuelve `<TemplateBuilder>`:

```
<TemplateBuilder
  @template={{@template}}
  @contextSchemas={{this.contextSchemas}}
  @isSaving={{this.saveTemplate.isRunning}}
  @onSave={{perform this.saveTemplate}}
  @onPreview={{this.preview}}
  @closeIcon="chevron-left"
  @onClose={{transition-to "billing.invoice-templates"}}
/>
```

Las variables en el selector se resuelven en tiempo de renderizado contra la factura elegida a través de `TemplateRenderService::registerContextType('invoice', { … })` en el lado del proveedor del servidor.

## Ver también

* [Plantillas de facturas de Ledger](https://fleetbase.io/docs/ledger/billing/invoice-templates)
  — el caso de uso canónico
* [Servicio de Template Builder](https://fleetbase.io/docs/ui/services/template-builder)
  — el servicio asociado para registrar tipos de recursos consultables

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/template-builder.hbs` | Plantilla |
| `addon/components/template-builder.js` | Clase — documentación JSDoc extensa, empieza por aquí para extensiones avanzadas |
| `addon/components/template-builder/` | Subcomponentes |