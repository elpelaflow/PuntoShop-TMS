---
title: "Fleetbase CLI"
url: https://fleetbase.io/docs/cli
module: cli
---

# Fleetbase CLI

The
**Fleetbase CLI**
(
`flb`
) is the official command-line tool for working with Fleetbase. It does three things:

* **Installs Fleetbase**
  on your own infrastructure with an interactive Docker-based setup wizard
* **Manages extensions**
  on a running Fleetbase instance — search, install, uninstall
* **Publishes extensions**
  to the Fleetbase Extension Registry — scaffold, bundle, version-bump, publish

```
npm install -g @fleetbase/cli
flb --version
```

## What You Can Do

Install Fleetbase

Spin up a self-hosted Fleetbase instance with Docker via the interactive wizard.

[Install Fleetbase →](https://fleetbase.io/docs/cli/installation/overview)

Manage Extensions

Search, install, and uninstall extensions on a running Fleetbase instance.

[Manage Extensions →](https://fleetbase.io/docs/cli/extensions/search)

Publish Extensions

Scaffold a new extension, bundle it, and publish it to the registry.

[Publish Extensions →](https://fleetbase.io/docs/cli/extension-development/overview)

## Global Options

These options work with every command:

| Option | Description |
| --- | --- |
| `-v, --version` | Output the CLI version |
| `-r, --registry [url]` | Override the registry URL (default: `https://registry.fleetbase.io` ) |
| `--help` | Show help for the current command |

## Quick Reference

```
# Install Fleetbase on your machine
flb install-fleetbase

# Find an extension on the registry
flb search

# Install an extension into your instance
flb install fleetbase/flespi

# Create a new extension
flb scaffold

# Publish your extension to the registry
flb bundle --upload
flb publish
```

## Next Steps

* [Requirements](https://fleetbase.io/docs/cli/getting-started/requirements)
  — what you need before installing the CLI
* [Installation](https://fleetbase.io/docs/cli/getting-started/installation)
  — install the CLI globally via npm
* [Install Fleetbase](https://fleetbase.io/docs/cli/installation/overview)
  — install a self-hosted Fleetbase instance
