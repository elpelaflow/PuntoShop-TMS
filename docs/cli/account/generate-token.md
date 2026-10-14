---
title: "Generate Token"
url: https://fleetbase.io/docs/cli/account/generate-token
module: cli
---

# Generate Token

Generate or regenerate a long-lived registry authentication token using `flb generate-token` — ideal for CI/CD pipelines.

# flb generate-token

Generate (or regenerate) a long-lived
**registry authentication token**
for your developer account. Tokens are great for CI/CD pipelines where you don't want to store a username and password.

```
flb generate-token
```

You'll be prompted for your email and password. On success the registry returns a token — use
[`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth)
to write it into
`~/.npmrc`
, or paste it directly into a CI secret.

Generating a new token
**replaces any previously generated token**
on your account. CI pipelines using the old token will break until you update them.

## Options

| Option | Description |
| --- | --- |
| `-e, --email <email>` | Email address |
| `-p, --password <password>` | Password |
| `-h, --host <host>` | API host (default: `https://api.fleetbase.io` ) |

## Examples

### Interactive

```
flb generate-token
```

### Pre-fill credentials

```
flb generate-token -e jane@example.com
```

### Self-hosted registry

```
flb generate-token --host registry.mycompany.com
```

## What Happens on Success

The CLI prints the new token plus the exact
`flb set-auth`
command:

```
✓ Token generated successfully

🔑 Your Registry Token:
   <token-value>

💡 Save this token securely!
   Use: flb set-auth <token-value>

⚠  Note: This replaces any previously generated token.
```

## CI / CD Usage

The intended pattern for CI:

1. Run
   `flb generate-token`
   once locally and grab the token
2. Save it as a secret in your CI provider (e.g.
   `FLEETBASE_TOKEN`
   )
3. In your pipeline, write the token into
   `~/.npmrc`
   before running
   `flb publish`
   :

```
# .github/workflows/publish-extension.yml (excerpt)
- name: Configure registry auth
  run: flb set-auth $FLEETBASE_TOKEN
  env:
    FLEETBASE_TOKEN: ${{ secrets.FLEETBASE_TOKEN }}

- name: Publish
  run: flb publish
```

## Troubleshooting

**`Token generation failed: Invalid credentials`**
— re-check your email and password.

**`Token generation failed: No response from server`**
— the API host isn't reachable. Check your
`--host`
value.

[Set Auth

Write a registry auth token into your Fleetbase instance's `.npmrc` and Composer `auth.json` using `flb set-auth`.](https://fleetbase.io/docs/cli/account/set-auth)
[Search

Browse the Fleetbase Extension Registry from the command line with `flb search`.](https://fleetbase.io/docs/cli/extensions/search)
