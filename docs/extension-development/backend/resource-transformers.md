---
title: "Resource Transformers"
url: https://fleetbase.io/docs/extension-development/backend/resource-transformers
module: extension-development
---

# Resource Transformers

Decorate the JSON output of any API resource — core or another extension's — without modifying the resource or its model. Target by resource, model or interface, chain by priority, scope to webhooks, broadcasts, internal or public requests, and batch-load to avoid N+1 queries.

# Resource Transformers

A
**resource transformer**
changes the serialized output of an API resource that your extension does not own. Register one against the core
`User`
resource, a Fleet-Ops
`Order`
, or every resource at once, and its output is decorated everywhere that resource is serialized — JSON responses, nested resources, collection items, webhook payloads and socket broadcasts. The resource class and the model stay untouched.

Transformers live in
`fleetbase/core-api`
(v1.6.68 and later) and are registered through the
`ResourceTransformerRegistry`
.

## When to Use a Transformer

| You want to… | Reach for |
| --- | --- |
| Add, change or remove keys in the JSON of a resource you don't own | **Resource transformer** |
| Add a relationship or method to a model you don't own | [Expansion](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers#expansions) |
| React when a model is saved or deleted | [Observer](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers#observers) |
| Let operators define their own fields on a resource | Custom fields ( `HasCustomFields` ) |
| Serialize your *own* models | Your own `FleetbaseResource` subclass — see [Connecting Models to Your API](https://fleetbase.io/docs/extension-development/recipes/connecting-models-to-your-api) |

Typical uses: exposing an external account id you store per user or per company, appending a computed status, attaching settings your extension manages for a core record, or removing a key for public API consumers.

## How Output Flows Through Transformers

Every Fleetbase resource extends
`Fleetbase\Http\Resources\FleetbaseResource`
, and Laravel serializes a resource by calling
`resolve()`
— for the top-level response, for nested resources (through
`jsonSerialize()`
), and for paginated responses.
`FleetbaseResource::resolve()`
is where transformers run:

1. The resource builds its array (
   `toArray()`
   ), and Laravel filters conditional values (
   `when()`
   ,
   `merge()`
   ).
2. The registry looks up every transformer whose target matches the resource class, its parents and interfaces, or the wrapped model class, its parents and interfaces.
3. Matching transformers run in priority order, each receiving the array the previous one returned.
4. The result is filtered again (so transformers may return conditional values) and keys excluded with
   `without()`
   are removed again.

Because the hook is
`resolve()`
and not
`toArray()`
, it does not matter how the resource builds its array — nearly every Fleetbase resource hand-builds
`toArray()`
without calling the parent, and they are all covered. When no transformer matches a resource the output is byte-identical to the untransformed output; there is no cost beyond one cached lookup.

Surfaces covered:

| Surface | Channel | Notes |
| --- | --- | --- |
| JSON responses ( `show` , `index` , custom controllers) | `http` | Including `FleetbaseResourceCollection` items |
| Nested resources inside another resource's array | `http` | e.g. the `user` inside a Fleet-Ops driver |
| Webhook payloads ( `ResourceLifecycleEvent` ) | `webhook` | Applied to `toWebhookPayload()` output when the resource defines one |
| Socket broadcasts ( `broadcastWith()` ) | `broadcast` | Lifecycle events and chat participant events |

## Defining a Transformer

Extend
`Fleetbase\Http\Transformers\Transformer`
, name a target, and implement
`transform()`
:

```
<?php

namespace MyOrg\MyExtension\Http\Transformers;

use Fleetbase\Http\Transformers\Transformer;
use Fleetbase\Models\User;
use Fleetbase\Support\ResourceTransformerContext;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use MyOrg\MyExtension\Models\Membership;

class UserMembershipTransformer extends Transformer
{
    /**
     * Apply to every resource that wraps a core User model
     * (the core User resource, and any extension resource that also wraps a User).
     */
    protected static $target = User::class;

    public function transform(array $data, JsonResource $resource, Request $request, ResourceTransformerContext $context): array
    {
        /** @var User $user */
        $user = $resource->resource;

        $membership = Membership::where('user_uuid', $user->uuid)->first();

        return $data + [
            'membership_tier' => $membership?->tier,
        ];
    }
}
```

What each piece is:

* **`$target`**
  — the class (or classes) this transformer applies to. See
  [Targets](#targets)
  .
* **`transform()`**
  — receives the serialized array and must return an array.
  `$resource`
  is the
  `JsonResource`
  being serialized, so
  `$resource->resource`
  is the underlying model.
  `$request`
  is the current request.
  `$context`
  carries the channel, the audience and a scratch store — see
  [The Transformer Context](#the-transformer-context)
  .

The per-user query above is fine for a single resource but becomes an N+1 on a list of users.
[Batch Loading with
`prepare()`](#batch-loading-with-prepare)
fixes that.

### The contract

`Transformer`
is a convenience base. The actual contract is
`Fleetbase\Contracts\ResourceTransformer`
, which you can implement directly:

```
interface ResourceTransformer
{
    /** Resource class, model class, interface, '*', or an array of them. */
    public static function target(): string|array;

    public function transform(array $data, JsonResource $resource, Request $request, ResourceTransformerContext $context): array;
}
```

Implementing the interface directly is useful when the target is computed, or when the class has constructor dependencies — the registry resolves class-string transformers through the container, so constructor injection works.

## Targets

A target names
*what*
a transformer applies to. Matching is by class hierarchy, so subclasses of a target match too.

| Target | Matches | Example |
| --- | --- | --- |
| An HTTP resource class | That resource and every subclass of it | `\Fleetbase\Http\Resources\User::class` |
| An Eloquent model class | Every `FleetbaseResource` whose wrapped model is that class or a subclass | `\Fleetbase\Models\User::class` |
| An interface | Every resource or model implementing it | `\Fleetbase\Contracts\Policy::class` |
| `'*'` | Every resource | `'*'` |
| An array of the above | Any of them | `[Order::class, Payload::class]` |

```
// several targets
protected static $target = [
    \Fleetbase\FleetOps\Models\Order::class,
    \Fleetbase\FleetOps\Models\Payload::class,
];
```

Which one to choose:

* **Model class**
  is usually the right choice. A
  `User`
  is serialized by the core
  `User`
  resource, but also by Fleet-Ops'
  `Driver`
  resource (nested), by
  `Internal\v1`
  variants, and by
  `indexResource`
  classes — all of them wrap a
  `User`
  model, so a model target reaches them all.
* **Resource class**
  when you want exactly one representation. Because subclasses match, targeting
  `Fleetbase\FleetOps\Http\Resources\v1\Order`
  also covers any custom extension resources that extend it.
* **Interface**
  when behaviour follows a capability (for example everything implementing a contract your extension defines).
* **`'*'`**
  for cross-cutting output, such as stamping an environment flag on every resource. Combine with
  `contexts`
  or
  `only`
  to keep it narrow.

Class names may be given with or without a leading backslash.

## Options

Options tune when and in what order a transformer runs. Declare them as static properties on a
`Transformer`
subclass, or pass them when registering (registration options win).

| Option | Values | Default | Effect |
| --- | --- | --- | --- |
| `priority` | integer | `0` | Execution order among transformers matching the same resource. **Lower runs first; higher runs later and can override earlier output.** Ties keep registration order. |
| `contexts` | array of `http` , `webhook` , `broadcast` | all | Channels the transformer applies to |
| `only` | `internal` , `public` | both | `internal` runs only for console requests ( `/int/v1/...` ), `public` only for API-key requests ( `/v1/...` ) |

```
class OrderEtaTransformer extends Transformer
{
    protected static $target   = \Fleetbase\FleetOps\Models\Order::class;
    protected static $priority = 10;                 // after the default-priority transformers
    protected static $contexts = ['http', 'webhook']; // never on socket broadcasts
    protected static $only     = 'public';            // API consumers only
}
```

The same options as registration arguments:

```
ResourceTransformerRegistry::register(OrderEtaTransformer::class, [
    'priority' => 10,
    'contexts' => ['http', 'webhook'],
    'only'     => 'public',
]);
```

Invalid values are rejected at registration with an
`InvalidArgumentException`
, so a typo in a channel name fails at boot rather than silently never running.

## Registering Transformers

All registration happens from your extension's service provider during
`boot()`
, like observers and expansions. Three styles, which you can mix.

### 1. The $transformers property

Declare classes (or
`[class, options]`
pairs) and call
`registerTransformers()`
:

```
// server/src/Providers/MyExtensionServiceProvider.php
use Fleetbase\Providers\CoreServiceProvider;

class MyExtensionServiceProvider extends CoreServiceProvider
{
    public $transformers = [
        \MyOrg\MyExtension\Http\Transformers\UserMembershipTransformer::class,
        [\MyOrg\MyExtension\Http\Transformers\OrderEtaTransformer::class, ['priority' => 10]],
    ];

    public function boot()
    {
        parent::boot();
        $this->registerTransformers();
    }
}
```

### 2. Directory discovery

Put transformers in
`server/src/Http/Transformers/`
and let the provider find them:

```
public function boot()
{
    parent::boot();
    $this->registerTransformersFrom(__DIR__ . '/../Http/Transformers');
}
```

`registerTransformersFrom()`
scans the directory, resolves each file to a class under your package namespace (
`MyOrg\MyExtension\Http\Transformers\`
, read from your
`composer.json`
PSR-4 mapping), and registers every instantiable class implementing
`ResourceTransformer`
. Abstract classes and unrelated files are skipped. It accepts an array of directories, and a missing directory is a no-op. This mirrors
`registerExpansionsFrom()`
.

### 3. Closures and programmatic registration

For small, one-off tweaks you can register a closure. A closure must be given a
`target`
and receives the same arguments as
`transform()`
:

```
use Fleetbase\Support\ResourceTransformerRegistry;

ResourceTransformerRegistry::register(
    fn (array $data, JsonResource $resource, Request $request, ResourceTransformerContext $context) => $data + [
        'region' => config('my-extension.region'),
    ],
    ['target' => \Fleetbase\Models\Company::class, 'only' => 'internal', 'id' => 'my-extension.company-region']
);
```

Give closures an
`id`
so they can be removed later with
`ResourceTransformerRegistry::forget('my-extension.company-region')`
. Instances and invokable objects are accepted as well.

The registry is a container singleton.
`app(ResourceTransformerRegistry::class)`
gives you the instance; the static
`register()`
,
`forget()`
and
`reset()`
helpers proxy to it.

### Registration rules

* Registering the same class twice
  **replaces**
  its options and keeps its original position, so a provider that boots twice (Laravel Octane, tests) is harmless.
* Registration happens once per process. Under Octane a worker serves many requests with the same registry, so never register conditionally on request state.
* Registering a class that does not exist, is abstract, or does not implement the contract throws immediately.

## The Transformer Context

`Fleetbase\Support\ResourceTransformerContext`
is created once per resolve — once for a single resource, once for an entire collection — and shared by every transformer that runs during it.

| Member | Description |
| --- | --- |
| `$context->request` | The current `Illuminate\Http\Request` |
| `$context->channel` | `http` , `webhook` or `broadcast` (constants `ResourceTransformerContext::HTTP` , `::WEBHOOK` , `::BROADCAST` ) |
| `$context->internal` | `true` for console requests, `false` for public API requests |
| `isHttp()` , `isWebhook()` , `isBroadcast()` | Channel checks |
| `isInternal()` , `isPublic()` | Audience checks |
| `get($key, $default)` , `set($key, $value)` , `has($key)` , `forget($key)` | A scratch store scoped to this resolve |
| `remember($key, fn ($context) => …)` | Compute a value once and reuse it for the rest of the resolve |
| `all()` | Everything in the store |

The store is the hand-off between
`prepare()`
and
`transform()`
, and the right place for anything computed once per request. Do
**not**
keep per-request state on the transformer instance itself: instances are reused for the life of the worker.

## Batch Loading with prepare()

A transformer that queries the database in
`transform()`
runs that query once per serialized item — one hundred users in a list means one hundred queries. Implement
`Fleetbase\Contracts\PreparesResourceTransformation`
to load everything up front:

```
<?php

namespace MyOrg\MyExtension\Http\Transformers;

use Fleetbase\Contracts\PreparesResourceTransformation;
use Fleetbase\Http\Transformers\Transformer;
use Fleetbase\Models\User;
use Fleetbase\Support\ResourceTransformerContext;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use MyOrg\MyExtension\Models\Membership;

class UserMembershipTransformer extends Transformer implements PreparesResourceTransformation
{
    protected static $target = User::class;

    /**
     * Called once per resolve with every model about to be serialized:
     * all items of a collection, or the single model of a singular resource.
     */
    public function prepare(Collection $models, Request $request, ResourceTransformerContext $context): void
    {
        $memberships = Membership::whereIn('user_uuid', $models->pluck('uuid'))
            ->get()
            ->keyBy('user_uuid');

        $context->set('memberships', $memberships);
    }

    public function transform(array $data, JsonResource $resource, Request $request, ResourceTransformerContext $context): array
    {
        $membership = $context->get('memberships')?->get($resource->resource->uuid);

        return $data + [
            'membership_tier' => $membership?->tier,
        ];
    }
}
```

How it behaves:

* For a collection,
  `FleetbaseResourceCollection`
  builds one context, calls
  `prepare()`
  once with every underlying model, then resolves each item with that shared context. One query for the whole page.
* For a singular resource,
  `prepare()`
  is called with a one-item collection, so your code has a single path.
* `prepare()`
  runs at most once per transformer per context, even if items are resolved more than once.
* `prepare()`
  respects the same
  `contexts`
  and
  `only`
  filters as
  `transform()`
  .

`$models`
may contain anything the collection holds; for Fleetbase resources that is the Eloquent models. Nulls are filtered out before
`prepare()`
is called.

## Webhooks and Broadcasts

Lifecycle webhooks (
`order.created`
,
`user.updated`
, …) build their
`data`
from the same resource classes, so transformers apply there too, tagged with the
`webhook`
channel. If the resource defines
`toWebhookPayload()`
, transformers run over that payload; otherwise they run over the resolved array. After transformers run, the webhook pipeline still reduces nested resources to their ids, as it always has.

Socket broadcasts of lifecycle events and chat participant events use the
`broadcast`
channel.

Use
`contexts`
to opt in or out:

```
// enrich API responses only; leave webhook payloads stable for integrators
protected static $contexts = ['http'];

// add a field integrators need in webhooks, without touching the console UI
protected static $contexts = ['webhook'];
```

Inside
`transform()`
,
`$context->isWebhook()`
lets a single transformer behave differently per channel.

## What You Can Return

`transform()`
must return an array — anything else throws an
`UnexpectedValueException`
naming the transformer.

* **Add keys**
  :
  `return $data + ['key' => $value];`
  (array union keeps existing keys) or
  `array_merge($data, [...])`
  (overrides existing keys).
* **Remove keys**
  :
  `unset($data['key']); return $data;`
* **Conditional values**
  : you may return
  `new \Illuminate\Http\Resources\MissingValue()`
  to drop a key, or
  `new \Illuminate\Http\Resources\MergeValue([...])`
  to merge a set of keys — they are filtered exactly like
  `when()`
  and
  `merge()`
  in a resource. Note that
  `$resource->when()`
  is protected on resources, so construct the value objects directly.
* **Exclusions win**
  : keys a caller excluded with
  `->without('secret')`
  are removed again after transformers run, so a transformer cannot reintroduce them.
* **Nested resources**
  : a
  `JsonResource`
  placed in the array is serialized (and transformed) when the response is encoded.

Keys you add become part of the API contract for everyone consuming that resource. Prefix them with your extension's name when there is any risk of collision (
`membership_tier`
is fine inside a membership extension;
`status`
is not).

## Testing Your Transformer

Transformers are plain classes, so test them by registering and resolving a resource. With Pest:

```
use Fleetbase\Http\Resources\User as UserResource;
use Fleetbase\Models\User;
use Fleetbase\Support\ResourceTransformerRegistry;
use MyOrg\MyExtension\Http\Transformers\UserMembershipTransformer;

beforeEach(function () {
    ResourceTransformerRegistry::reset();
});

test('user resources carry the membership tier', function () {
    ResourceTransformerRegistry::register(UserMembershipTransformer::class);

    $user = User::factory()->create();
    Membership::factory()->for($user)->create(['tier' => 'gold']);

    $data = (new UserResource($user))->resolve(request());

    expect($data['membership_tier'])->toBe('gold');
});

test('the tier is not exposed to public api consumers', function () {
    ResourceTransformerRegistry::register(UserMembershipTransformer::class, ['only' => 'internal']);

    $request = Request::create('/v1/users');
    $request->setRouteResolver(fn () => new \Illuminate\Routing\Route('GET', 'v1/users', []));

    $data = (new UserResource($user = User::factory()->create()))->resolve($request);

    expect($data)->not->toHaveKey('membership_tier');
});
```

Use
`resolve()`
in assertions, not
`toArray()`
:
`toArray()`
is the resource's raw array before transformers and filtering.

## Pitfalls

* **Querying per item.**
  Implement
  `prepare()`
  whenever
  `transform()`
  needs data that is not already on the model. Lists in the console are paginated at 20–100 items; a per-item query there is a visible slowdown.
* **State on the instance.**
  Class-string transformers are instantiated once and reused. Keep request-scoped data in
  `$context`
  , not in properties.
* **Assuming the model type.**
  A model target can match subclasses, and a resource target can match resources wrapping different models (for example a resource that extends yours). Check
  `$resource->resource instanceof …`
  when in doubt.
* **Relying on
  `toArray()`
  .**
  Anything that calls a resource's
  `toArray()`
  directly bypasses transformers. Core now routes its own direct serializations through
  `resolve()`
  ; do the same in your extension.
* **Changing core keys.**
  Overriding or removing a key the console relies on breaks the UI for every operator with your extension installed. Prefer adding keys.

## Reference

### ResourceTransformerRegistry

| Method | Description |
| --- | --- |
| `static register($transformer, array $options = [])` | Register a class, instance, callable, or an array of them ( `[class, options]` pairs and `class => options` maps accepted) |
| `static forget(string $idOrClass): bool` | Remove a registration |
| `static reset(): void` | Remove every registration (tests) |
| `static instance()` | The active registry (container singleton) |
| `add($transformer, array $options = []): string` | Register one transformer and return its id |
| `addMany(array $transformers): array` | Register many; returns ids |
| `remove(string $idOrClass): bool` , `flush(): void` | Instance equivalents of `forget()` / `reset()` |
| `has(string $idOrClass): bool` , `all(): array` , `ids(): array` , `isEmpty(): bool` | Inspect registrations |
| `matching(string $resourceClass, ?string $modelClass): array` | Registrations applicable to a resource/model pair, in execution order |
| `hasTransformersFor(JsonResource|string $resource, ?string $modelClass): bool` | Cheap check used by the resources |
| `newContext(Request $request, string $channel): ResourceTransformerContext` | Build a context |
| `prepare(string $resourceClass, iterable $models, ResourceTransformerContext $context): void` | Run `prepare()` hooks once |
| `apply(array $data, JsonResource $resource, ResourceTransformerContext $context): array` | Run the transformer chain |
| `transform(array $data, JsonResource $resource, Request $request, string $channel = 'http'): array` | Convenience: context + prepare + apply for an already-serialized payload |

Registration ids: the class name for classes,
`options['id']`
if given, otherwise a generated id for closures and callables.

### FleetbaseResource

| Method | Description |
| --- | --- |
| `resolve($request = null)` | Serialize and apply transformers ( `http` channel) |
| `resolveFor(string $channel, $request = null)` | Same, tagged `webhook` or `broadcast` |
| `transformPayload(array $data, string $channel = 'http', $request = null)` | Apply transformers to an already-built payload, e.g. `toWebhookPayload()` output |
| `withTransformerContext(?ResourceTransformerContext $context)` | Share a context (used by collections) |

### Contracts

| Contract | Methods |
| --- | --- |
| `Fleetbase\Contracts\ResourceTransformer` | `static target(): string|array` , `transform(array $data, JsonResource $resource, Request $request, ResourceTransformerContext $context): array` |
| `Fleetbase\Contracts\PreparesResourceTransformation` | `prepare(Collection $models, Request $request, ResourceTransformerContext $context): void` |
| `Fleetbase\Http\Transformers\Transformer` (abstract) | Implements `ResourceTransformer` ; `$target` , `$priority` , `$contexts` , `$only` statics; `static options(): array` |

## Migrating from the Legacy Registry

Before core-api v1.6.68, a transformer was a duck-typed class with a
`$target`
property and a static
`output($model, $data)`
method, applied only by the core
`User`
resource. That shape is no longer recognised. To migrate:

```
// before
class UserResourceTransformer
{
    public $target = \Fleetbase\Http\Resources\User::class;

    public static function output($model, $data): array
    {
        return array_merge($data, ['external_id' => ExternalAccount::idFor($model)]);
    }
}

// after
class UserResourceTransformer extends \Fleetbase\Http\Transformers\Transformer
{
    protected static $target = \Fleetbase\Models\User::class;

    public function transform(array $data, JsonResource $resource, Request $request, ResourceTransformerContext $context): array
    {
        return array_merge($data, ['external_id' => ExternalAccount::idFor($resource->resource)]);
    }
}
```

Registration through
`ResourceTransformerRegistry::register(Class::class)`
still works unchanged. Expect the transformer to now also run for user collections, nested users and webhook payloads; use
`contexts`
to narrow it if that is not wanted, and add
`prepare()`
if
`output()`
ran a query.

## Source

| File | Description |
| --- | --- |
| `src/Support/ResourceTransformerRegistry.php` | The registry |
| `src/Support/ResourceTransformerContext.php` | Per-resolve context and scratch store |
| `src/Contracts/ResourceTransformer.php` | The transformer contract |
| `src/Contracts/PreparesResourceTransformation.php` | Batch-loading contract |
| `src/Http/Transformers/Transformer.php` | Convenience base class |
| `src/Http/Resources/FleetbaseResource.php` | `resolve()` , `resolveFor()` , `transformPayload()` |
| `src/Http/Resources/FleetbaseResourceCollection.php` | Shared context and `prepare()` per collection |
| `src/Providers/CoreServiceProvider.php` | `$transformers` , `registerTransformers()` , `registerTransformersFrom()` |
