---
title: "Verify"
url: https://fleetbase.io/docs/cli/account/verify
module: cli
---

# Verify

Verify your registry account email using `flb verify` and receive your registry auth token.

# flb verify

Verify the email on a registry account you just registered. On success, the registry returns your
**registry auth token**
— save it; you'll use it to publish extensions.

```
flb verify
```

You'll be prompted for the email address and the verification code that was emailed to you when you registered.

## Options

| Option | Description |
| --- | --- |
| `-e, --email <email>` | Email address |
| `-c, --code <code>` | Verification code from the email |
| `-h, --host <host>` | API host (default: `https://api.fleetbase.io` ) |

Anything you don't pass is asked for interactively.

## Examples

### Interactive

```
flb verify
```

### One-liner

```
flb verify -e jane@example.com -c 482931
```

### Against a self-hosted registry

```
flb verify -e jane@example.com -c 482931 --host registry.mycompany.com
```

## What Happens on Success

The CLI prints your
**Registry Token**
and the exact
`flb set-auth`
command to save it:

```
✓ Email verified successfully!

🔑 Your Registry Token:
   <token-value>

💡 Save this token securely! You'll need it to authenticate with the registry.
   Use: flb set-auth <token-value>

✓ You can now login with: flb login -u <username>
```

Run the printed
`flb set-auth`
to write the token into your
`~/.npmrc`
so subsequent
`flb`
commands can authenticate. See
[Set Auth](https://fleetbase.io/docs/cli/account/set-auth)
.

## If the Email Never Arrives

Use
[`flb resend-verification`](https://fleetbase.io/docs/cli/account/resend-verification)
to request a fresh code.

## Troubleshooting

**`Verification failed: Invalid code`**
— codes are single-use and time-limited. Request a fresh one with
`flb resend-verification`
.

**`Verification failed: No response from server`**
— the API host isn't reachable. Check your
`--host`
value.
