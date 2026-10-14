---
title: "Registro de Notificaciones"
url: https://fleetbase.io/docs/extension-development/recipes/registering-notifications
module: extension-development
---

# Registro de Notificaciones

Defina clases de notificación que aparezcan en las preferencias de notificación del usuario y que se envíen por correo electrónico, SMS, notificaciones push, difusión y canales de base de datos.

# Registro de Notificaciones

El
`NotificationRegistry`
de la plataforma es el
**directorio de notificaciones opt-in**
que los usuarios ven en sus ajustes. Cada clase de notificación registrada puede enviarse por correo electrónico, SMS, difusión (interfaz de usuario en tiempo real), base de datos (feed en la aplicación), FCM (push de Android) y APN (push de iOS), y los usuarios eligen qué canales utilizar para recibir cada notificación.

Sin registro, su notificación seguirá enviándose (es solo una notificación de Laravel), pero los usuarios no la verán en su interfaz de preferencias y no podrán activarla o desactivarla.

## 1. Definir la Clase de Notificación

Extienda
`Illuminate\Notifications\Notification`
de Laravel y agregue tres propiedades de metadatos estáticas:
`$name`
,
`$description`
,
`$package`
, que se utilizan en la interfaz de usuario del registro:

```
<?php
// server/src/Notifications/WidgetCreated.php

namespace MyOrg\MyExtension\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use MyOrg\MyExtension\Models\Widget;
use NotificationChannels\Apn\ApnChannel;
use NotificationChannels\Fcm\FcmChannel;

class WidgetCreated extends Notification implements ShouldQueue
{
    use Queueable;

    /** Nombre de visualización que se muestra en las preferencias de notificación del usuario. */
    public static string $name = 'Widget Created';

    /** Descripción de una línea que se muestra junto con el nombre. */
    public static string $description = 'Notificar cuando se crea un nuevo widget.';

    /** Slug de la extensión — se utiliza para agrupar las notificaciones por origen. */
    public static string $package = 'my-extension';

    public string $title;
    public string $message;
    public array $data = [];

    public function __construct(public Widget $widget)
    {
        $this->title   = "Widget {$widget->name} created";
        $this->message = "A new widget was created in your organization.";
        $this->data    = ['id' => $widget->public_id, 'type' => 'widget_created'];
    }

    /** Canales — elegidos en tiempo de ejecución por cada notifiable. */
    public function via($notifiable): array
    {
        return ['broadcast', 'mail', 'database', FcmChannel::class, ApnChannel::class];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject($this->title)
            ->line($this->message)
            ->action('View Widget', url("/console/my-extension/widgets/{$this->widget->public_id}"));
    }

    public function toBroadcast($notifiable): array
    {
        return [
            'id'    => $this->widget->public_id,
            'title' => $this->title,
            'body'  => $this->message,
        ];
    }

    public function toArray($notifiable): array
    {
        return $this->data;
    }
}
```

Las propiedades estáticas
`$name`
,
`$description`
, y
`$package`
se leen por
`NotificationRegistry::register()`
para poblar la interfaz de usuario de preferencias de notificación para el usuario. Háguelas descriptivas — aparecen directamente en el panel de configuración.

## 2. Registrar la Clase en su Proveedor de Servicios

Utilice un método dedicado que se ejecute desde
`boot()`
:

```
<?php
// server/src/Providers/MyExtensionServiceProvider.php

use Fleetbase\Providers\CoreServiceProvider;
use Fleetbase\Support\NotificationRegistry;

class MyExtensionServiceProvider extends CoreServiceProvider
{
    public function boot()
    {
        parent::boot();

        $this->registerObservers();
        $this->loadRoutesFrom(__DIR__ . '/../routes.php');
        $this->loadMigrationsFrom(__DIR__ . '/../../migrations');

        $this->registerNotifications();
    }

    protected function registerNotifications(): void
    {
        NotificationRegistry::register([
            \MyOrg\MyExtension\Notifications\WidgetCreated::class,
            \MyOrg\MyExtension\Notifications\WidgetExpired::class,
            \MyOrg\MyExtension\Notifications\WidgetShared::class,
        ]);
    }
}
```

Si las notificaciones de su extensión pueden dirigirse a tipos de destinatarios personalizados más allá de
`User`
/
`Group`
/
`Role`
/
`Company`
(los valores predeterminados), regístrelas también:

```
NotificationRegistry::registerNotifiable([
    \MyOrg\MyExtension\Models\Recipient::class,
    'dynamic:partner',  // destinatario dinámico — resuelto por su código en tiempo de evento
]);
```

## 3. Enviar la Notificación

### Envío directo — selecciona automáticamente a todos los destinatarios opt-in

`NotificationRegistry::notify()`
se resuelve para todos los destinatarios que se han optado a recibir esta notificación:

```
use Fleetbase\Support\NotificationRegistry;
use MyOrg\MyExtension\Notifications\WidgetCreated;

NotificationRegistry::notify(WidgetCreated::class, $widget);
```

### Envío directo de Laravel — destinatario explícito

Para destinatarios conocidos, utilice el envío de notificaciones estándar de Laravel:

```
$user->notify(new WidgetCreated($widget));

// O para varios destinatarios:
\Notification::send($company->users, new WidgetCreated($widget));
```

Esto omite el filtrado de opt-in del registro — útil para notificaciones transaccionales (por ejemplo, restablecimiento de contraseña) que no son de usuario y no se pueden configurar.

## 4. Envío automático desde un Observador

La mayoría de las notificaciones "se ha producido X" están asociadas a un observador de modelo:

```
<?php
// server/src/Observers/WidgetObserver.php

namespace MyOrg\MyExtension\Observers;

use Fleetbase\Support\NotificationRegistry;
use MyOrg\MyExtension\Models\Widget;
use MyOrg\MyExtension\Notifications\WidgetCreated;

class WidgetObserver
{
    public function created(Widget $widget): void
    {
        NotificationRegistry::notify(WidgetCreated::class, $widget);
    }
}
```

Conecte el observador a través del array
`$observers`
de su proveedor de servicios — vea
[Expansiones y Observadores](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers#observers)
.

## 5. Verifique en la Configuración del Usuario

Abra las preferencias de notificación del usuario en la consola — su notificación aparecerá en su grupo
`$package`
, con interruptores de encendido/apagado por canal. Ajuste, luego desencadene el evento subyacente y verifique que los canales en los que se ha optado realmente se activen.

## Referencia

* `fleetops/server/src/Notifications/OrderAssigned.php`
  — clase de notificación con
  `$name`
  ,
  `$description`
  ,
  `$package`
* `fleetops/server/src/Providers/FleetOpsServiceProvider.php`
  — patrón
  `registerNotifications()`
* `fleetops/server/src/Notifications/`
  — muchos ejemplos de notificaciones
* `core-api/src/Support/NotificationRegistry.php`
  — implementación del registro
* [API Services → NotificationRegistry](https://fleetbase.io/docs/extension-development/reference/api-services#fleetbase-support-notificationregistry)