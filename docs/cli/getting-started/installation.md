---
title: "Installing the CLI"
url: https://fleetbase.io/docs/cli/getting-started/installation
module: cli
---

# Installing the CLI

Install the Fleetbase CLI globally via npm so the `flb` command is available system-wide.

# Installing the CLI

The Fleetbase CLI is distributed on npm as
`@fleetbase/cli`
. Install it globally so the
`flb`
command is on your PATH.

## With npm

```
npm install -g @fleetbase/cli
```

## With pnpm

```
pnpm add -g @fleetbase/cli
```

## With Yarn

```
yarn global add @fleetbase/cli
```

## Verify

```
flb --version
```

You should see something like:

```
@fleetbase/cli 0.0.6
```

## Get Help

Every command supports
`--help`
:

```
flb --help
flb scaffold --help
flb install --help
```

The top-level
`flb --help`
lists all available commands.

## Updating

To update an existing install:

```
npm install -g @fleetbase/cli@latest
# or
pnpm add -g @fleetbase/cli@latest
```

## Uninstalling

```
npm uninstall -g @fleetbase/cli
# or
pnpm remove -g @fleetbase/cli
```

## Next Steps

* [Install Fleetbase](https://fleetbase.io/docs/cli/installation/overview)
  — install a self-hosted Fleetbase instance with the wizard
* [Search Extensions](https://fleetbase.io/docs/cli/extensions/search)
  — discover extensions in the registry
* [Register an Account](https://fleetbase.io/docs/cli/account/register)
  — create a registry account for publishing
