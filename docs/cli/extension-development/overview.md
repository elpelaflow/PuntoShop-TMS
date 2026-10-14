---
title: "Overview"
url: https://fleetbase.io/docs/cli/extension-development/overview
module: cli
---

# Overview

Build, test, version, bundle, and publish custom Fleetbase extensions using the CLI.

# Publishing Extensions

The CLI gives you the full lifecycle for authoring and shipping a Fleetbase extension — from scaffolding a new project to publishing it on the Extension Registry.

## The Lifecycle

```
flb scaffold        →  Generate a new extension from the starter template
                          ↓
        develop locally — write your addon and server code
                          ↓
flb version-bump    →  Bump version in extension.json / package.json / composer.json
                          ↓
flb bundle          →  Pack the extension into a distributable .tar.gz
                          ↓
flb bundle-upload   →  Upload the bundle to the registry's storage
   — or —
flb publish         →  Run npm publish against the registry
                          ↓
                    Extension is now installable via flb install
```

## Pages

Scaffold

Generate a new extension from the starter template.

[flb scaffold →](https://fleetbase.io/docs/cli/extension-development/scaffold)

Version Bump

Increment major / minor / patch / prerelease across all manifest files.

[flb version-bump →](https://fleetbase.io/docs/cli/extension-development/version-bump)

Bundle

Pack the extension into a versioned .tar.gz, optionally uploading.

[flb bundle →](https://fleetbase.io/docs/cli/extension-development/bundle)

Bundle Upload

Upload an existing bundle to the registry.

[flb bundle-upload →](https://fleetbase.io/docs/cli/extension-development/bundle-upload)

Publish

Run
`npm publish`
against the registry.

[flb publish →](https://fleetbase.io/docs/cli/extension-development/publish)

Unpublish

Remove a published extension from the registry.

[flb unpublish →](https://fleetbase.io/docs/cli/extension-development/unpublish)

## Prerequisites

Before you can publish, you need:

1. A registry developer account — see
   [Register](https://fleetbase.io/docs/cli/account/register)
2. A verified email — see
   [Verify](https://fleetbase.io/docs/cli/account/verify)
3. A registry auth token — saved via
   [`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth)
   or environment variable for CI

## Extension Anatomy

A Fleetbase extension is a single repository that contains both:

* **An Ember addon**
  — the console UI (npm package, e.g.
  `@yourcompany/yourext-engine`
  )
* **A Laravel package**
  — the API server code (composer package, e.g.
  `yourcompany/yourext-api`
  )

Both packages are published from the same source tree. The starter template the scaffolder clones gives you both halves wired up.

For deeper development docs (architecture, services, registries, IAM), see the
[Extension Development](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
.
