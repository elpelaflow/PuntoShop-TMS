---
título: "Conceptos fundamentales"
url: https://fleetbase.io/docs/ui/getting-started/core-concepts
módulo: ui
---

# Conceptos fundamentales

Cómo está estructurado ember-ui: componentes, helpers, modificadores, servicios y las convenciones que hacen que cada extensión de Fleetbase se sienta nativa.

# Conceptos fundamentales

`@fleetbase/ember-ui`
es un addon de Ember estándar. Si eres nuevo en Ember, los cuatro conceptos a continuación son los únicos que necesitas antes de leer el resto de esta sección.

## Componentes

Un
**componente**
es una pieza de UI reutilizable. Ember-ui exporta más de 200 componentes: desde los más simples, como
`<Button>`
y
`<Spinner>`,
hasta constructores más complejos, como
`<TemplateBuilder>`
y
`<ReportBuilder>`.

Utilizas los componentes por su nombre, precedido por corchetes, en cualquier plantilla `.hbs`:

```
<Button @type="primary" @text="Guardar" @onClick={{this.save}} />
```

Los valores precedidos por `@` son los
**argumentos**
del componente: son equivalentes a las propiedades de React. Los argumentos tienen tipos y nombres.

Los componentes también pueden renderizar contenido. El ejemplo de
`<ContentPanel>`
a continuación permite renderizar el contenido dentro del panel, para que puedas incluir cualquier código HTML:

```
<ContentPanel @title="Settings">
  <p>Cualquier cosa aquí se renderiza dentro del cuerpo del panel.</p>
</ContentPanel>
```

Algunos componentes renderizan un subcomponente anónimo. Por ejemplo,
`<Tabs>`
renderiza un componente
`<Tab>`
para que puedas componer varios:

```
<Tabs as |Tab|>
  <Tab @title="Perfil">Contenido del perfil</Tab>
  <Tab @title="Seguridad">Contenido de seguridad</Tab>
</Tabs>
```

Cada componente en esta sección enumera todos los argumentos, el valor predeterminado, el contenido renderizado y ejemplos de uso.

## Helpers

Un
**helper**
es una función que llamas dentro de una plantilla: normalmente, para formatear un valor.

```
{{format-currency 12500 "USD"}}      {{!-- $125.00 --}}
{{format-bytes 1048576}}              {{!-- 1 MB --}}
{{format-date-fns @order.created_at "PPpp"}}   {{!-- Jul 4, 2025 at 3:42 PM --}}
{{is-uuid this.id}}                  {{!-- true / false --}}
{{can-action "fleet-ops driver" "delete"}}     {{!-- permission check --}}
```

Los helpers son funciones puras: toman entradas y devuelven valores. Están disponibles globalmente; no es necesario importarlos.

Consulta
[Formatear](https://fleetbase.io/docs/ui/helpers/formatting),
[Verificar tipos](https://fleetbase.io/docs/ui/helpers/type-checking),
[Permisos](https://fleetbase.io/docs/ui/helpers/permissions)
y
[Datos](https://fleetbase.io/docs/ui/helpers/data)
para obtener la lista completa.

## Modificadores

Un
**modificador**
añade funcionalidad a un elemento. Se parecen a los helpers, pero se aplican al propio elemento, en lugar de generar un valor:

```
<div {{set-height "400px"}}>Contenedor de altura fija</div>
<input {{imask "phone"}} type="text" />
<img {{fallback-img-src "/assets/placeholder.png"}} src={{this.url}} />
```

El modificador se ejecuta cuando el elemento se renderiza o cuando cambian sus entradas. Utiliza modificadores para cosas que normalmente harías con los hooks
`didInsertElement`: establecer alturas, máscaras, imágenes de respaldo, restricciones de dimensiones.

Consulta
[Modificadores](https://fleetbase.io/docs/ui/helpers/modifiers)
para obtener la lista completa.

## Servicios

Un
**servicio**
es un singleton de larga duración que inyectas en tu componente, controlador o en otro servicio. Ember-ui expone seis servicios:

| Servicio | Qué hace |
|---|---|
| `modals-manager` | Mostrar, ocultar y configurar modales desde JavaScript |
| `sidebar` | Activar/desactivar la barra lateral; registrar elementos de la barra lateral |
| `dashboard` | Gestionar widgets y diseños del panel de control |
| `template-builder` | Gestionar plantillas para facturas, correos electrónicos, etc. |
| `resource-context-panel` | Gestionar el panel de contexto del recurso (la barra lateral derecha para los registros seleccionados) |
| `leaflet` | Estado de mapa compartido para cualquier componente que utilice Leaflet |

Inyectalos y utilízalos como cualquier servicio de Ember:

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DriverActionsComponent extends Component {
  @service modalsManager;

  @action
  confirmDelete() {
    this.modalsManager.confirm({
      title: 'Eliminar conductor?',
      body: 'Esto no se puede deshacer.',
      acceptButtonText: 'Eliminar',
      acceptButtonScheme: 'danger',
      confirm: () => this.args.driver.destroyRecord(),
    });
  }
}
```

## Dónde se encuentran las cosas

Dentro del paquete ember-ui:

```
@fleetbase/ember-ui
├── addon/
│   ├── components/    ← cada componente (.hbs template + .js class)
│   ├── helpers/       ← cada helper
│   ├── modifiers/     ← cada modificador
│   └── services/      ← cada servicio
├── app/               ← re-exporta para la aplicación anfitriona
└── styles/            ← hojas de estilo basadas en Tailwind
```

Dentro de tu extensión, no necesitas interactuar directamente con ninguno de los anteriores: simplemente utilizas los componentes, helpers, modificadores y servicios en tus propias plantillas y clases.

## Cómo se conecta a la consola

Cada extensión de Fleetbase se carga en la consola como un motor de Ember. Cuando el motor se inicia, hereda el resolver de la aplicación anfitriona: y los componentes de ember-ui forman parte de ese resolver. Por eso puedes utilizar
`<Button>`
en cualquier plantilla de extensión sin importar que.

Lo mismo se aplica a las extensiones que cargan otras extensiones a través del
**Universe**
registry: consulta
[Desarrollo de extensiones](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
para obtener más información.

## Próximos pasos

* [Diseño](https://fleetbase.io/docs/ui/layout/overview)
  — estructura tus páginas
* [Entradas](https://fleetbase.io/docs/ui/inputs/input-group)
  — construye formularios
* [Modales](https://fleetbase.io/docs/ui/modals/overview)
  — muestra modales desde JavaScript o plantillas