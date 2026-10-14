---
title: "Register"
url: https://fleetbase.io/docs/cli/account/register
module: cli
---

# Register

Create a Fleetbase Extension Registry developer account using `flb register` so you can publish your own extensions.

# flb register

Create a developer account on the Fleetbase Extension Registry. You need an account to publish extensions — managing or installing extensions does
**not**
require an account.

```
flb register
```

The command prompts for your username, email, password, and (optional) full name. After successful registration, the registry sends a verification code to your email — finish the flow with
[`flb verify`](https://fleetbase.io/docs/cli/account/verify)
.

## Options

| Option | Description |
| --- | --- |
| `-u, --username <username>` | Username (3+ chars, letters/numbers/hyphens/underscores) |
| `-e, --email <email>` | Email address |
| `-p, --password <password>` | Password (8+ chars) |
| `-n, --name <name>` | Full name (optional) |
| `-h, --host <host>` | API host (default: `https://api.fleetbase.io` ) |

Anything you don't pass on the command line is asked for interactively. Pass
`--password`
and you'll skip the prompt — useful for scripted setup, but be aware of shell history.

## Examples

### Interactive

```
flb register
```

### Pre-fill some answers

```
flb register -u jane -e jane@example.com -n "Jane Doe"
```

You'll still be prompted for a password.

### Against a self-hosted registry

```
flb register --host registry.mycompany.com
```

The host is normalised —
`registry.mycompany.com`
becomes
`https://registry.mycompany.com`
.

## Validation Rules

* **Username**
  — at least 3 characters; only letters, numbers, hyphens, and underscores
* **Email**
  — must contain
  `@`
* **Password**
  — at least 8 characters

If the API rejects the registration (e.g., email already in use), the per-field errors are printed.

## After Registration

The CLI prints the next two commands you need:

```
# Verify the email
flb verify -e <your-email>

# Once verified, log in
flb login -u <your-username>
```

See
[Verify](https://fleetbase.io/docs/cli/account/verify)
for the verification flow, or
[Resend Verification](https://fleetbase.io/docs/cli/account/resend-verification)
if the email never arrives.

[Install Fleetbase

Install a self-hosted Fleetbase instance on your own infrastructure using `flb install-fleetbase` — an interactive Docker-based wizard.](https://fleetbase.io/docs/cli/installation/overview)
[Verify

Verify your registry account email using `flb verify` and receive your registry auth token.](https://fleetbase.io/docs/cli/account/verify)
