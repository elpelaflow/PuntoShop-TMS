---
title: "Install"
url: https://fleetbase.io/docs/cli/extensions/install
module: cli
---

# Install

Install an extension into a running Fleetbase instance using `flb install`.

# flb install

Install a Fleetbase extension into a running self-hosted Fleetbase instance. The CLI looks up the npm and Composer package names for the extension and runs both
`pnpm install`
(in
`console/`
) and
`composer require`
(in
`api/`
).

```
flb install <packageName>
```

The package name can be either:

* A
  **slug**
  in the form
  `fleetbase/<slug>`
  (e.g.
  `fleetbase/flespi`
  )
* An
  **extension ID**
  (e.g.
  `ext_a1b2c3d4`
  )

Both forms come from
[`flb search`](https://fleetbase.io/docs/cli/extensions/search)
.

## Options

| Option | Description |
| --- | --- |
| `[packageName]` | Slug or ID of the extension to install |
| `-p, --path <path>` | Path to the Fleetbase instance (default: current directory) |

## Examples

### From inside your Fleetbase directory

```
cd /path/to/fleetbase
flb install fleetbase/flespi
```

### From anywhere

```
flb install fleetbase/flespi --path /path/to/fleetbase
```

### Using an extension ID

```
flb install ext_a1b2c3d4 --path /path/to/fleetbase
```

## What Happens

The CLI calls the registry's lookup endpoint to resolve the npm + composer package names for the extension.

Verifies the target directory contains both
`console/`
and
`api/`
subdirectories. If not, the install aborts.

Runs
`pnpm install <npm-package>`
inside
`console/`
to add the addon.

Runs
`composer require <composer-package>`
inside
`api/`
to add the server-side package.

After install completes you need to
**restart your containers**
so the new code is loaded:

```
docker compose restart
```

…and run any pending migrations the extension ships:

```
docker compose exec application php artisan migrate
```

Some extensions also need a settings/seeding step — check the extension's docs.

## Authentication

For
**public free**
extensions, no auth is needed.

For
**paid**
or
**private**
extensions, you need a registry token configured on the instance via
[`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth)
before installing. Without it, both
`pnpm install`
and
`composer require`
fail with a 401 from the registry.

## Path Resolution

`--path`
accepts a
`~`
-prefixed home directory shortcut (e.g.
`--path ~/projects/fleetbase`
). It's resolved to an absolute path before checking for
`console/`
and
`api/`
.

## Troubleshooting

**`Invalid Fleetbase instance path: …`**
— the
`--path`
(or current directory) doesn't contain both
`console/`
and
`api/`
. Pass the correct path.

**`Invalid package data received from registry`**
— the registry returned malformed data for that package name. Verify the slug or ID via
`flb search`
.

**`Installation failed: …`**
— the underlying
`pnpm install`
or
`composer require`
failed. Check the printed error for missing dependencies or auth issues.

## Next

* [Uninstall](https://fleetbase.io/docs/cli/extensions/uninstall)
  — remove an installed extension
* [Search](https://fleetbase.io/docs/cli/extensions/search)
  — discover extensions
