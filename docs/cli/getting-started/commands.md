---
title: "Commands"
url: https://fleetbase.io/docs/cli/getting-started/commands
module: cli
---

# Commands

Reference table of every Fleetbase CLI command with a one-line description and a link to its page.

# Commands

Quick reference for every command the
`flb`
CLI exposes. Click any command for the full options, examples, and behavior.

## Install Fleetbase

| Command | Description |
| --- | --- |
| [`flb install-fleetbase`](https://fleetbase.io/docs/cli/installation/overview) | Interactive Docker-based wizard that installs a self-hosted Fleetbase instance |

## Account

| Command | Description |
| --- | --- |
| [`flb register`](https://fleetbase.io/docs/cli/account/register) | Create a new Fleetbase Extension Registry developer account |
| [`flb verify`](https://fleetbase.io/docs/cli/account/verify) | Verify a registry account email and receive your auth token |
| [`flb resend-verification`](https://fleetbase.io/docs/cli/account/resend-verification) | Request a fresh verification code |
| [`flb login`](https://fleetbase.io/docs/cli/account/login) | Log in to the registry with username + password (writes to `~/.npmrc` ) |
| [`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth) | Write a registry auth token into a Fleetbase instance's `console/.npmrc` and `api/auth.json` |
| [`flb generate-token`](https://fleetbase.io/docs/cli/account/generate-token) | Generate (or regenerate) a long-lived registry auth token |

## Manage Extensions

| Command | Description |
| --- | --- |
| [`flb search`](https://fleetbase.io/docs/cli/extensions/search) | Browse and filter the Extension Registry from the command line |
| [`flb install`](https://fleetbase.io/docs/cli/extensions/install) | Install an extension into a running Fleetbase instance |
| [`flb uninstall`](https://fleetbase.io/docs/cli/extensions/uninstall) | Remove an installed extension from a Fleetbase instance |

## Publish Extensions

| Command | Description |
| --- | --- |
| [`flb scaffold`](https://fleetbase.io/docs/cli/extension-development/scaffold) | Generate a new extension from the starter template |
| [`flb version-bump`](https://fleetbase.io/docs/cli/extension-development/version-bump) | Increment the version across `extension.json` , `package.json` , and `composer.json` |
| [`flb bundle`](https://fleetbase.io/docs/cli/extension-development/bundle) | Pack an extension into a versioned `.tar.gz` |
| [`flb bundle-upload`](https://fleetbase.io/docs/cli/extension-development/bundle-upload) | Upload an existing bundle to the registry |
| [`flb publish`](https://fleetbase.io/docs/cli/extension-development/publish) | Publish an extension to the registry via `npm publish` |
| [`flb unpublish`](https://fleetbase.io/docs/cli/extension-development/unpublish) | Remove a published extension from the registry |

## Built-in

| Command | Description |
| --- | --- |
| `flb --version` (or `-v` ) | Print the CLI version |
| `flb --help` | Show top-level help and command list |
| `flb <command> --help` | Show help for a specific command |

## Global Options

These options work with every command:

| Option | Default | Description |
| --- | --- | --- |
| `-v, --version` | — | Print the CLI version |
| `-r, --registry [url]` | `https://registry.fleetbase.io` | Override the registry URL |
| `--help` | — | Show help for the current command |
