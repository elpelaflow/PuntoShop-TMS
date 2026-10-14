---
title: "Extension Anatomy"
url: https://fleetbase.io/docs/extension-development/getting-started/extension-anatomy
module: extension-development
---

# Extension Anatomy

A tour of a scaffolded Fleetbase extension — addon/, server/, extension.json, and the key entry points (addon/extension.js, the engine, the service provider).

# Extension Anatomy

A scaffolded extension is a single repository that ships
**two halves**
:

* **`addon/`**
  — an Ember.js addon (the console UI)
* **`server/`**
  — a Composer/Laravel package (the API)

Plus a top-level
`extension.json`
manifest that ties them together.

## Top-Level Layout

```
my-extension/
├── extension.json        ← the manifest (links addon + server)
├── package.json          ← npm package — the Ember addon
├── composer.json         ← Composer package — the Laravel package
├── README.md
├── addon/                ← Ember addon source
│   ├── extension.js      ← THE entry point — setupExtension hook
│   ├── engine.js         ← Ember Engine declaration + service deps
│   ├── routes.js         ← Engine route map
│   ├── components/       ← Components your engine ships
│   ├── controllers/      ← Ember controllers
│   ├── routes/           ← Ember route handlers
│   ├── templates/        ← .hbs templates
│   ├── services/         ← Engine-scoped services
│   ├── adapters/         ← Ember Data adapters (optional)
│   ├── serializers/      ← Ember Data serializers (optional)
│   ├── models/           ← Ember Data models
│   ├── instance-initializers/   ← engine instance initializers (optional)
│   └── styles/           ← Engine-scoped CSS
├── server/               ← Laravel package source
│   ├── src/
│   │   ├── Providers/    ← <Name>ServiceProvider.php — the Laravel boot point
│   │   ├── Http/
│   │   │   ├── Controllers/      ← Internal/v1 + Api/v1 controllers
│   │   │   ├── Requests/         ← Form-request validation
│   │   │   ├── Resources/        ← API resource shapes
│   │   │   └── Middleware/
│   │   ├── Models/       ← Eloquent models
│   │   ├── Listeners/    ← Event listeners
│   │   ├── Observers/    ← Model observers (auto-registered)
│   │   ├── Expansions/   ← Class expansions (auto-loaded)
│   │   ├── Notifications/
│   │   ├── Services/
│   │   └── routes.php    ← The package's HTTP routes
│   ├── migrations/       ← Database migrations (auto-loaded)
│   ├── seeders/          ← Optional seeders
│   └── config/           ← config/<extension>.php
└── config/               ← addon-side config
```

## The Manifest — extension.json

The manifest is small. It points the registry at your two package definitions:

```
{
    "name": "Ledger",
    "version": "0.0.3",
    "description": "Accounting & Invoicing Extension for Fleetbase",
    "repository": "https://github.com/elpelaflow/PuntoShop-TMS",
    "license": "AGPL-3.0-or-later",
    "author": "Fleetbase Pte Ltd <hello@fleetbase.io>",
    "engine": "package.json",
    "api": "composer.json"
}
```

| Field | Purpose |
| --- | --- |
| `name` , `version` , `description` , `author` , `license` , `repository` | Standard metadata used by the registry |
| `engine` | Path to the Ember addon's `package.json` (relative to the manifest) |
| `api` | Path to the Laravel package's `composer.json` |

Real extensions place both halves at the root, so
`package.json`
and
`composer.json`
are just filenames as shown above.

## The Frontend Entry Points

### addon/extension.js — registration

`addon/extension.js`
is the
**registration entry point**
the console calls at boot. It exports a default object with a
`setupExtension(app, universe)`
method (and optionally
`onEngineLoaded`
):

```
// addon/extension.js
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService = universe.getService('menu');

        menuService.registerHeaderMenuItem('My Extension', 'console.my-extension', {
            icon: 'puzzle-piece',
            description: 'My custom feature.',
        });
    },
};
```

This is the
**only**
place you register menu items, widgets, hooks, registries, and component contributions. See
[Extension Registration](https://fleetbase.io/docs/extension-development/architecture/extension-registration)
for the full contract.

### addon/engine.js — Ember Engine declaration

`addon/engine.js`
declares the Ember Engine — the host services to inject, the resolver, and the exported route. It is
**not**
for registration code:

```
// addon/engine.js
import Engine from '@ember/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from './config/environment';
import services from '@fleetbase/ember-core/exports/services';
import modulePrefix from './module-prefix';

const { modulePrefix: prefix } = config;

export default class MyExtensionEngine extends Engine {
    modulePrefix = prefix;
    Resolver = Resolver;
    dependencies = {
        services,
        externalRoutes: ['console'],
    };
}

loadInitializers(MyExtensionEngine, modulePrefix);
```

The
`services`
array imported from
`@fleetbase/ember-core/exports/services`
is the canonical list of host services you can inject in your engine (
`store`
,
`fetch`
,
`notifications`
,
`current-user`
,
`session`
,
`universe`
,
`crud`
,
`theme`
, etc.).

### addon/routes.js — the route map

```
// addon/routes.js
import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function () {
    this.route('index');
    this.route('settings');
    this.route('reports', function () {
        this.route('show', { path: '/:report_id' });
    });
});
```

## The Backend Entry Points

### server/src/Providers/<Name>ServiceProvider.php — Laravel boot

```
<?php

namespace MyOrg\MyExtension\Providers;

use Fleetbase\Providers\CoreServiceProvider;

class MyExtensionServiceProvider extends CoreServiceProvider
{
    /**
     * Observers automatically registered by the parent's registerObservers().
     */
    public $observers = [
        \MyOrg\MyExtension\Observers\InvoiceObserver::class,
    ];

    /**
     * Middleware groups the parent's registerMiddleware() pushes into the router.
     */
    public $middleware = [];

    public function boot()
    {
        parent::boot();

        $this->registerObservers();
        $this->registerExpansionsFrom(__DIR__ . '/../Expansions');
        $this->loadRoutesFrom(__DIR__ . '/../routes.php');
        $this->loadMigrationsFrom(__DIR__ . '/../../migrations');
    }
}
```

The provider extends
`Fleetbase\Providers\CoreServiceProvider`
— that's where the route helpers, observer auto-registration, expansion auto-loading, and middleware groups come from. See
[Service Provider](https://fleetbase.io/docs/extension-development/backend/service-provider)
.

### server/src/routes.php — the HTTP routes

```
<?php

use Illuminate\Support\Facades\Route;

Route::prefix(config('my-extension.api.routing.prefix', 'my-extension'))
    ->namespace('MyOrg\\MyExtension\\Http\\Controllers')
    ->group(function ($router) {
        // Public webhook routes
        $router->post('webhooks/stripe', 'WebhookController@handle');

        // API-key routes
        $router->prefix('v1')->middleware(['fleetbase.api'])->group(function ($router) {
            $router->fleetbaseRoutes('invoices');
        });

        // Session-authenticated console routes
        $router->prefix('int/v1')->middleware(['fleetbase.protected'])->group(function ($router) {
            $router->fleetbaseRoutes('invoices');
            $router->fleetbaseRoutes('gateways');
        });
    });
```

Notice
`$router->fleetbaseRoutes('invoices')`
— that's the route helper from
`core-api`
's
`Route`
expansion that auto-generates a REST resource set (
`index`
,
`show`
,
`store`
,
`update`
,
`destroy`
, plus search/count/bulk-action). See
[Routes & Controllers](https://fleetbase.io/docs/extension-development/backend/routes-and-controllers)
.

## Wired-Up Pieces

How everything fits at boot:

```
Console application boots
  ├── ExtensionManager loads each extension's addon/extension.js
  │     └── setupExtension(app, universe) runs
  │           ├── menu service registers your header item, settings panels, etc.
  │           ├── widget service registers your dashboard widgets
  │           └── registry service creates registries / injects components
  │
  └── On first navigation into your extension:
        └── Ember loads addon/engine.js
              ├── routes.js wires your route map
              └── onEngineLoaded(engineInstance, universe, app) fires (if exported)

Laravel boots
  └── <Name>ServiceProvider.boot() runs
        ├── parent::boot() — middleware groups, abilities schemas
        ├── registerObservers() — attach your model observers
        ├── registerExpansionsFrom() — auto-load class expansions
        ├── loadRoutesFrom('server/src/routes.php')
        └── loadMigrationsFrom('server/migrations')
```

## Real Extension to Browse

`ledger`
is a representative full-featured extension — both halves, observers, expansions, dashboard, settings menu items, routes, models, migrations. Read it alongside this section.

## Source Reference

| File | Description |
| --- | --- |
| `ledger/extension.json` | Real manifest |
| `ledger/addon/extension.js` | Real `setupExtension` |
| `ledger/addon/engine.js` | Real engine declaration |
| `ledger/server/src/Providers/LedgerServiceProvider.php` | Real provider |
| `ledger/server/src/routes.php` | Real routes file |

[Quickstart

Use the Fleetbase CLI to scaffold a new extension with a working backend and frontend skeleton.](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
[Overview

A Fleetbase extension is a single repository with two halves — an Ember.js addon (the console UI) and a Laravel package (the API). The extension.json manifest ties them together and addon/extension.js is the registration entry point.](https://fleetbase.io/docs/extension-development/architecture/overview)
