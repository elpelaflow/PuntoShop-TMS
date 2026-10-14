---
título: "Línea de tiempo"
url: https://fleetbase.io/docs/ui/display/timeline
módulo: ui
---

# Línea de tiempo

`<Timeline>` renderiza una línea de tiempo horizontal de actividades con flechas de navegación. Proporciona un componente `<Timeline::Item>` curried para componer cada entrada.

# `<Timeline>`

`<Timeline>`
renderiza una línea de tiempo horizontal y deslizante de actividades. El usuario navega utilizando los botones de flecha izquierda/derecha. Cada actividad visible se proporciona como un componente `<Timeline::Item>` curried para que lo puedas componer.

## Uso básico

```
<Timeline @activity={{this.events}} as |Item|>
  <Item />
</Timeline>
```

```
events = [
  { code: 'created', label: 'Pedido realizado', timestamp: ... },
  { code: 'accepted', label: 'Conductor aceptado', timestamp: ... },
  { code: 'started', label: 'En camino', timestamp: ... },
  { code: 'completed', label: 'Entregado', timestamp: ... },
];
```

## Cuerpo del elemento personalizado

```
<Timeline @activity={{this.events}} as |Item|>
  <Item>
    <div class="text-sm font-semibold">{{Item.activity.label}}</div>
    <div class="text-xs">{{format-date-fns Item.activity.timestamp "PPpp"}}</div>
  </Item>
</Timeline>
```

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@activity` | array | Entradas de actividad para renderizar |
| `@wrapperClass`, `@itemsContainerClass`, `@controlsClass`, `@arrowClass`, `@arrowLeftClass`, `@arrowRightClass` | string | Clases de hook |

El número de elementos visibles en un momento determinado está controlado internamente; las flechas permiten desplazarse a través de los demás.

## Bloque renderizado

El valor renderizado es un componente `<Timeline::Item>` curried, pre-enlazado a la actividad actual. El subcomponente del elemento tiene su propia plantilla en
`addon/components/timeline/item.hbs`
para el renderizado predeterminado.

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/timeline.hbs` | Plantilla |
| `addon/components/timeline.js` | Clase |
| `addon/components/timeline/item.hbs` | Plantilla del subcomponente del elemento |
| `addon/components/timeline/item.js` | Clase del subcomponente del elemento |