---
título: "ProgressBar"
url: https://fleetbase.io/docs/ui/display/progress-bar
módulo: ui
---

# ProgressBar

`<ProgressBar>` es un indicador de progreso lineal con un título y un porcentaje. Se utiliza para subir archivos, flujos de varios pasos y para indicar el cumplimiento de los KPI.

# `<ProgressBar>`

Un indicador de progreso lineal simple con un título a la izquierda y un porcentaje a la derecha.

## Uso básico

```
<ProgressBar @title="Progreso de carga" @percent={{this.uploadPercent}} />
```

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@title` | string | Etiqueta que se muestra arriba de la barra (alineada a la izquierda) |
| `@percent` | number | Porcentaje de progreso, de 0 a 100 |

El ancho de la barra interna está vinculado a `@percent` y se actualiza con una transición de 500 ms.

## Ejemplos del mundo real

```
{{!-- Carga de archivo --}}
{{#if this.isUploading}}
  <ProgressBar @title="Cargando {{this.file.name}}" @percent={{this.file.percent}} />
{{/if}}

{{!-- Asistente de varios pasos --}}
<ProgressBar @title="Onboarding" @percent={{div (mul this.step 100) this.totalSteps}} />

{{!-- KPI de cumplimiento de objetivos --}}
<ProgressBar @title="Objetivo mensual" @percent={{this.metrics.completion_pct}} />
```

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/progress-bar.hbs` | Plantilla |
| `addon/components/progress-bar.js` | Clase |