---
title: "CommentThread"
url: https://fleetbase.io/docs/ui/display/comment-thread
module: ui
---

# CommentThread

`<CommentThread>` renderiza un campo de entrada de comentarios y un hilo de comentarios existentes para un recurso. Se guarda mediante el modelo `comment` de Ember Data.

# `<CommentThread>`

`<CommentThread>`
renderiza un cuadro de texto para publicar nuevos comentarios, así como un hilo de comentarios existentes. Los comentarios se guardan mediante el modelo
`comment`
de Ember Data y están asociados al registro del tema que se pasa.

## Uso básico

```
<CommentThread @subject={{this.order}} />
```

Publica y carga comentarios asociados al pedido.

## Renderizado de comentarios personalizado

Utilice un bloque para renderizar comentarios con una estructura personalizada. El valor devuelto es un componente
`<CommentThread::Comment>`
curried:

```
<CommentThread @subject={{this.order}} as |Comment comment|>
  <Comment />
  {{!-- o completamente personalizado: --}}
  <div>
    <strong>{{comment.author.name}}</strong>: {{comment.body}}
  </div>
</CommentThread>
```

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@subject` | modelo | El registro de Ember Data al que pertenecen los comentarios |

El componente carga automáticamente los comentarios para
`@subject`
y publica nuevos comentarios en el mismo ámbito.

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/comment-thread.hbs` | Plantilla |
| `addon/components/comment-thread.js` | Clase |
| `addon/components/comment-thread/comment.hbs` | Plantilla de subcomponente |
| `addon/components/comment-thread/comment.js` | Clase de subcomponente |