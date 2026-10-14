---
title: "Login"
url: https://fleetbase.io/docs/cli/account/login
module: cli
---

# Login

Authenticate with the Fleetbase registry using `flb login` — under the hood this writes credentials into your `.npmrc`.

# flb login

Log in to the Fleetbase Extension Registry using your username, password, and email. Under the hood the CLI delegates to
`npm-cli-login`
, which writes a registry auth entry into your
`~/.npmrc`
.

```
flb login -u <username> -p <password> -e <email>
```

All three of
`--username`
,
`--password`
, and
`--email`
are required.

## Options

| Option | Required | Description |
| --- | --- | --- |
| `-u, --username <username>` | yes | Registry username |
| `-p, --password <password>` | yes | Registry password |
| `-e, --email <email>` | yes | Registered email address |
| `-r, --registry <registry>` | no | Registry URL (default: `https://registry.fleetbase.io` ) |
| `--scope <scope>` | no | Limit credentials to a scope (e.g. `@mycompany` ) |
| `--quotes <quotes>` | no | `npm-cli-login` quotes option |
| `--config-path <configPath>` | no | Path to a custom `.npmrc` |

## Examples

### Standard login

```
flb login -u jane -p secret -e jane@example.com
```

### Self-hosted registry

```
flb login \
  -u jane -p secret -e jane@example.com \
  -r https://registry.mycompany.com
```

### Scoped credentials

```
flb login \
  -u jane -p secret -e jane@example.com \
  --scope @mycompany
```

This limits the credentials to packages under the
`@mycompany`
scope.

## When to Use This vs. set-auth

* **`flb login`**
  writes username/password/email-derived credentials. Most common for interactive use.
* **[`flb set-auth`](https://fleetbase.io/docs/cli/account/set-auth)**
  writes a long-lived
  **token**
  (returned by
  `flb verify`
  or
  `flb generate-token`
  ). Best for CI/CD where storing a password is a non-starter.

Both end up in your
`~/.npmrc`
(or the file at
`--config-path`
). Either works for
`flb publish`
and
`flb bundle-upload`
.

## Troubleshooting

**`Username, password, and email are required for login.`**
— pass all three options.

**`Error during login: …`**
— the underlying
`npm-cli-login`
call failed; check that the registry URL is reachable and the credentials are correct.

[Resend Verification

Request a fresh verification code from the registry using `flb resend-verification`.](https://fleetbase.io/docs/cli/account/resend-verification)
[Set Auth

Write a registry auth token into your Fleetbase instance's `.npmrc` and Composer `auth.json` using `flb set-auth`.](https://fleetbase.io/docs/cli/account/set-auth)
