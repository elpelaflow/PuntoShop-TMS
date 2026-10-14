---
title: "Search"
url: https://fleetbase.io/docs/cli/extensions/search
module: cli
---

# Search

Browse the Fleetbase Extension Registry from the command line with `flb search`.

# flb search

Browse and filter the Fleetbase Extension Registry from your terminal. Use this to discover available extensions before installing one.

![flb search output — matching extensions with name, version, and price columns](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fextensions-cli-search.1f07c9b8.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

```
flb search                       # List everything
flb search flespi                # Filter by query
flb search --category logistics  # Filter by category
flb search --free                # Show only free extensions
```

The query (positional argument) matches against extension name, slug, subtitle, description, and tags.

## Options

| Option | Description |
| --- | --- |
| `[query]` | Free-form search term — matches name, slug, subtitle, description, tags |
| `-c, --category <category>` | Filter by category name or slug |
| `-f, --free` | Show only free (no payment required) extensions |
| `--json` | Output raw JSON (useful for scripting) |
| `--simple` | One extension per line: `slug<TAB>name<TAB>vVERSION<TAB>price` |
| `-h, --host <host>` | API host (default: `https://api.fleetbase.io` ) |

## Output Modes

### Default (formatted)

```
flb search flespi
```

```
🔍 Searching Fleetbase Extensions...

Found 1 extension:

Flespi Telematics v1.0.0  Free  ↓ 320  [Telematics]
  fleetbase/flespi  by Fleetbase
  Telematics and IoT GPS device gateway integration.
  Install: flb install fleetbase/flespi  or flb install ext_xxx
─────────────────────────────────────────────
Use flb install fleetbase/<slug> or flb install <extension_id> to install an extension.
Use flb search --json for machine-readable output.
```

Each entry shows:

* Name, version, price (in green if free, yellow if paid), install count, category
* Slug and publisher
* Subtitle (if present)
* Two install commands — by slug or by extension ID

### JSON

```
flb search flespi --json
```

Returns the raw JSON array from the registry, suitable for piping into
`jq`
:

```
flb search --json | jq '.[].slug'
```

### Simple (tab-separated)

```
flb search --simple
```

```
fleetbase/flespi	Flespi	v1.0.0	free
fleetbase/navigator	Navigator	v1.1.0	free
```

Useful for shell scripts that need to iterate over extension slugs.

## Examples

### Find free telematics extensions

```
flb search --category telematics --free
```

### Look up a specific package

```
flb search flespi
```

### Pipe into a script

```
flb search --simple | awk -F'\t' '{ print $1 }'
```

### Against a self-hosted registry

```
flb search --host registry.mycompany.com
```

## Filtering Logic

Filters compose —
`--query foo --category bar --free`
returns extensions matching all three.

The query match is case-insensitive across these fields:

* `name`
* `slug`
* `subtitle`
* `description`
* `tags`
  (array)

Category matching is case-insensitive against both the category's
`name`
and
`slug`
.

## Authentication

`flb search`
does
**not**
require authentication — the registry's extension list is public.

## Troubleshooting

**`No extensions found.`**
— the registry returned an empty list. Verify your
`--host`
is reachable.

**`Search failed: 500 …`**
— the registry returned an error. Try again or check the registry status.

**`Search failed: No response from server`**
— your network or
`--host`
is unreachable.
