---
title: "Extensiones y Observadores"
url: https://fleetbase.io/docs/extension-development/backend/extensions-and-observers
module: extension-development
---

# Extensiones y Observadores

Responda a los eventos del ciclo de vida del modelo con observadores, y agregue métodos a los modelos centrales o a las "Facades" de Laravel con extensiones, ambas cargadas automáticamente por su proveedor de servicios.

# Extensiones y Observadores

Dos patrones le permiten conectar su extensión con otro código sin poseerlo:
**observadores**
para los eventos del ciclo de vida del modelo, y
**extensiones**
para agregar métodos a una clase que no posee.

## Observadores

Los observadores ejecutan el código de la extensión en respuesta a los eventos del ciclo de vida de Eloquent en un modelo. Úselos para aplicar restricciones, ejecutar trabajos, enviar notificaciones o sincronizar datos con servicios externos.

### Definir un Observador

```
<?php

namespace MyOrg\MyExtension\Observers;

use MyOrg\MyExtension\Models\Widget;
use MyOrg\MyExtension\Notifications\WidgetCreated;

class WidgetObserver
{
    public function creating(Widget $widget): void
    {
        // Últimos ajustes — se ejecuta antes de INSERT
        if (!$widget->status) {
            $widget->status = 'activo';
        }
    }

    public function created(Widget $widget): void
    {
        $widget->company->notify(new WidgetCreated($widget));
    }

    public function updating(Widget $widget): void
    {
        if ($widget->isDirty('status')) {
            // …
        }
    }

    public function deleted(Widget $widget): void
    {
        // …
    }
}
```

Eventos estándar de Eloquent:
`retrieved`
,
`creating`
,
`created`
,
`updating`
,
`updated`
,
`saving`
,
`saved`
,
`deleting`
,
`deleted`
,
`restoring`
,
`restored`
,
`forceDeleted`
. Cada método recibe la instancia del modelo.

Ejemplo real:
`fleetops/server/src/Observers/OrderObserver.php`
.

### Registrar Observadores

`CoreServiceProvider`
lee el
`$observers`
array de su proveedor de servicios y llama a
`Model::observe()`
para cada par cuando llama a
`$this->registerObservers()`:

```
// server/src/Providers/MyExtensionServiceProvider.php
public $observers = [
    \MyOrg\MyExtension\Models\Widget::class       => \MyOrg\MyExtension\Observers\WidgetObserver::class,

    // También puede observar modelos centrales — se ejecuta en el mismo modelo que utilizan otras extensiones
    \Fleetbase\Models\User::class                 => \MyOrg\MyExtension\Observers\UserObserver::class,
];

public function boot()
{
    parent::boot();
    $this->registerObservers();
}
```

La implementación en
`CoreServiceProvider::registerObservers()`
ignora las entradas cuyo nombre de clase de modelo no existe, por lo que es seguro declarar observadores para dependencias opcionales.

### Observar Modelos Centrales

Puede observar
`Fleetbase\Models\User`
,
`Company`
,
`Order`
, etc. — múltiples extensiones apilan sus observadores en el mismo modelo y todos se ejecutan. Sea defensivo: no asuma que es el único oyente, y no lance desde eventos que no son de creación a menos que realmente quiera abortar el guardado.

## Extensiones

Las extensiones agregan métodos a una clase
**que no posee**
— "Facades" de Laravel (
`Route`
,
`Str`
,
`Arr`
,
`Builder`
,
`Carbon`
,
`Request`
,
`Response`
), o cualquier modelo que admita
`Macroable`
. El macro
`Route::fleetbaseRoutes()`
que vio en
[Rutas y Controladores](https://fleetbase.io/docs/extension-development/backend/routes-and-controllers)
es en sí mismo una extensión proporcionada por
`core-api`
.

### Definir una Extensión

```
<?php

namespace MyOrg\MyExtension\Expansions;

use Fleetbase\Build\Expansion;

class StrExpansion implements Expansion
{
    /**
     * La clase a la que apunta esta extensión.
     */
    public static function target()
    {
        return \Illuminate\Support\Str::class;
    }

    /**
     * Cada método público se convierte en un macro en el objetivo.
     */
    public static function dasherizeUuid()
    {
        return function (string $uuid): string {
            return strtolower(str_replace('_', '-', $uuid));
        };
    }
}
```

Ahora
`Str::dasherizeUuid('ABC_123')`
funciona en cualquier parte de la aplicación.

### Dirigirse a un Modelo

Para adjuntar un comportamiento a un modelo central, diríjase al nombre de clase del modelo. Cada método de la extensión, devuelto como un closure, se vincula a una instancia de modelo —
`$this`
dentro de él es el modelo:

```
<?php

namespace MyOrg\MyExtension\Expansions;

use MyOrg\MyExtension\Models\Widget;
use Fleetbase\Build\Expansion;

class UserExpansion implements Expansion
{
    public static function target()
    {
        return \Fleetbase\Models\User::class;
    }

    public static function widgets()
    {
        return function () {
            /** @var \Fleetbase\Models\User $this */
            return $this->hasMany(Widget::class, 'created_by_uuid', 'uuid');
        };
    }
}
```

Después de que se cargue esta extensión, cualquier
`User`
tiene una relación
`$user->widgets`
como una relación de Eloquent real — utilizable en consultas, cargas anticipadas y
`with()`
.

Ejemplo real:
`fleetops/server/src/Expansions/UserExpansion.php`
— agrega
`driver()`
,
`customer()`
,
`contact()`
, y otras relaciones al modelo central
`User`
.

### Cargar Extensiones Automáticamente

Deje las extensiones en
`server/src/Expansions/`
y llame a
`registerExpansionsFrom`
desde
`boot()`
:

```
// server/src/Providers/MyExtensionServiceProvider.php
public function boot()
{
    parent::boot();
    $this->registerExpansionsFrom(__DIR__ . '/../Expansions');
}
```

El proveedor escanea el directorio, resuelve cada clase a través del espacio de nombres de
`Expansions\\`
,
`Macros\\`
, o
`Mixins\\`
, y llama a
`Target::expand($expansion)`
(siendo
`Target::mixin($expansion)`
si el objetivo es un modelo). Fuente:
`CoreServiceProvider::registerExpansionsFrom()`
.

## Observadores vs. Hooks vs. Webhooks

Estos tres mecanismos de respuesta funcionan en diferentes capas:

| Mecanismo | Se ejecuta en | Para |
|---|---|---|
| **Observador del backend** | PHP — la misma solicitud que el guardado del modelo | Invariantes del lado del servidor, efectos secundarios en el guardado (notificaciones, trabajos, sincronización) |
| **Hook del frontend** | Navegador — runtime de Ember | Reacciones de la interfaz de usuario durante las transiciones de ruta, inicio de sesión, etc. Consulte [Servicio de Hooks](https://fleetbase.io/docs/extension-development/universe/hook-service) |
| **Webhook** | Externo — POST HTTP después de la solicitud | Servicios de terceros que reaccionan a los eventos de la plataforma. Se configura a través del [Panel de desarrolladores](https://fleetbase.io/docs/platform/developer-console/webhooks) |

Elija la capa que corresponda al propietario del efecto secundario.

## Cuándo usar cada uno

* ¿Necesita aplicar una regla cada vez que se guarda un modelo?
  **Observador.**
* ¿Necesita agregar un método a una "Facade" de Laravel o a un modelo central?
  **Extensión.**
* ¿Necesita cambiar el JSON que devuelve un recurso central o de otra extensión?
  **[Transformador de recursos](https://fleetbase.io/docs/extension-development/backend/resource-transformers)**
* ¿Necesita que un tercero (o un trabajo de fondo) reaccione de forma asíncrona?
  **Webhook + Listener**
  — defina un proveedor de eventos de Laravel (al igual que su proveedor principal) y registre los listeners allí.

Para los proveedores de eventos, siga el patrón
`fleetops/server/src/Providers/EventServiceProvider.php`
.

## Fuente

| Archivo | Descripción |
|---|---|
| `src/Build/Expansion.php` | La interfaz `Expansion` |
| `src/Providers/CoreServiceProvider.php` | `$observers` , `registerObservers()` , `registerExpansionsFrom()` |
| `src/Expansions/Route.php` | Referencia a la extensión — agrega `fleetbaseRoutes()` a `Route` |
| `fleetops/server/src/Observers/OrderObserver.php` | Referencia al observador |
| `fleetops/server/src/Expansions/UserExpansion.php` | Referencia a la extensión del modelo |

[Migraciones

Defina migraciones de base de datos para su extensión. Viven en server/migrations/, siguen las convenciones de UUID y public\_id de Fleetbase, y se cargan automáticamente a través del proveedor de servicios.](https://fleetbase.io/docs/extension-development/backend/migrations)
[Transformadores de Recursos

Decore la salida JSON de cualquier recurso — central o de otra extensión — sin modificar el recurso ni su modelo. Diríjase por recurso, modelo o interfaz, encadene por prioridad, escópale para evitar consultas N+1, y cargue en lote para evitar consultas N+1.](https://fleetbase.io/docs/extension-development/backend/resource-transformers)