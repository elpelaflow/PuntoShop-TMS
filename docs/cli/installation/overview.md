---
title: "Install Fleetbase"
url: https://fleetbase.io/docs/cli/installation/overview
module: cli
---

# Install Fleetbase

Install a self-hosted Fleetbase instance on your own infrastructure using `flb install-fleetbase` — an interactive Docker-based wizard.

# Install Fleetbase

```
flb install-fleetbase
```

The
`install-fleetbase`
command is an interactive wizard that clones the Fleetbase repository, builds a
`docker-compose.override.yml`
tailored to your environment, generates secure credentials, starts the containers, and runs the deploy script — all in one go.

## Prerequisites

The wizard pre-flight checks for these tools and aborts if any are missing:

* **Docker**
* **Docker Compose v2**
  (the
  `docker compose`
  plugin, not the legacy
  `docker-compose`
  binary)
* **Git**

It also checks ports
`8000`
,
`4200`
,
`3306`
, and
`38000`
and prints warnings if any are in use.

## Options

| Option | Default | Description |
| --- | --- | --- |
| `--host <host>` | `localhost` | Host or IP address to bind to |
| `--environment <env>` | `development` | `development` or `production` |
| `--directory <path>` | current directory | Where to install Fleetbase |
| `--non-interactive` | off | Skip optional prompts and use safe defaults — useful for CI/CD |

Anything you don't pass on the command line is asked for interactively.

## What the Wizard Does

The wizard runs through these phases:

**Pre-flight checks**
— verifies Docker, Docker Compose v2, and Git are installed; checks required ports are free.

**Core parameters**
— host, environment, install directory, application name.

**Clone the repository**
— runs
`git clone https://github.com/elpelaflow/PuntoShop-TMS.git`
if
`docker-compose.yml`
is not already present in the target directory.

**Database**
— choose between bundled MySQL (recommended for development) or an external MySQL server (e.g. AWS RDS). For external, you provide host/port/database/username/password. For bundled, the wizard auto-generates secure root and user passwords.

**Mail**
— optionally configure SMTP, Mailgun, Postmark, SendGrid, Resend, or AWS SES. If you skip, mail is written to the application log.

**File storage**
— pick local disk (development), AWS S3, or Google Cloud Storage. For S3 / GCS you provide credentials and bucket details.

**Security & CORS**
—
`SESSION_DOMAIN`
and SocketCluster origin allow-list are derived automatically from your host. You can add additional frontend hosts for CORS.

**Optional third-party APIs**
— IPInfo (geolocation), Google Maps, Twilio (SMS). All optional.

**Generate
`APP_KEY`**
— a fresh
`base64:`
encryption key.

**Write
`docker-compose.override.yml`**
— all your answers are baked into this file. If one already exists, it's backed up to
`docker-compose.override.yml.bak.<timestamp>`
.

**Write console config**
—
`console/fleetbase.config.json`
,
`console/environments/.env.development`
, and
`console/environments/.env.production`
are generated against your host.

**Start containers**
—
`docker compose up -d`
, then waits for the database to be ready (up to 60s).

**Run deploy**
—
`docker compose exec application bash -c "./deploy.sh"`
runs migrations and seeds.

**Restart**
—
`docker compose up -d`
once more so all configuration is applied.

When it's done, you'll see the API and Console URLs printed in a summary box.

## Examples

### Interactive (development)

```
flb install-fleetbase
```

Follow the prompts. Defaults work for a local dev install on
`localhost`
.

### Production with a specific host

```
flb install-fleetbase \
  --host fleetbase.mycompany.com \
  --environment production \
  --directory /opt/fleetbase
```

You'll still be prompted for database choice, mail, storage, and optional third-party APIs.

### CI / unattended

```
flb install-fleetbase \
  --host fleetbase.example.com \
  --environment development \
  --directory ./fleetbase \
  --non-interactive
```

In
`--non-interactive`
mode, optional steps default to:

* **Database**
  : bundled Docker MySQL with auto-generated credentials
* **Mail**
  : log driver
* **Storage**
  : local disk
* **Third-party APIs**
  : skipped
* **Frontend hosts**
  : none

## What Gets Written

After the wizard runs you'll have these files (paths relative to your install directory):

| Path | Purpose |
| --- | --- |
| `docker-compose.override.yml` | Your environment overrides — APP\_KEY, mail, storage, third-party API keys, database creds, SocketCluster origins |
| `console/fleetbase.config.json` | Console runtime config (API\_HOST, SocketCluster) |
| `console/environments/.env.development` | Console dev env file |
| `console/environments/.env.production` | Console production env file |

To make changes after install, edit
`docker-compose.override.yml`
and rerun:

```
docker compose up -d
```

## Endpoints

By default after a successful install:

| Service | URL |
| --- | --- |
| **API** | `http://<host>:8000` (or `https://` in production) |
| **Console** | `http://<host>:4200` (or `https://` in production) |
| **SocketCluster** | port `38000` |

Open the Console URL in your browser and complete the onboarding wizard to create your initial organization and administrator account.

## Troubleshooting

**The wizard says a port is already in use.**
Free the port (stop whatever is bound to it) or live with the warning — the wizard continues. You can map the container port to a different host port by editing
`docker-compose.override.yml`
after install.

**The deploy script fails.**
The wizard prints the command to re-run manually:

```
docker compose exec application bash -c "./deploy.sh"
```

**An existing
`docker-compose.override.yml`
was overwritten.**
The wizard backs up the previous file to
`docker-compose.override.yml.bak.<timestamp>`
before writing. Restore from that.

**The wizard can't find Docker Compose v2.**
The CLI uses the
`docker compose`
plugin (with a space), not the legacy
`docker-compose`
binary. Update Docker Desktop or install the Compose plugin manually.

## Next Steps

* Open the Console URL and complete onboarding
* [Install your first extension](https://fleetbase.io/docs/cli/extensions/install)
* [Register a developer account](https://fleetbase.io/docs/cli/account/register)
  if you plan to publish your own extensions

[Commands

Reference table of every Fleetbase CLI command with a one-line description and a link to its page.](https://fleetbase.io/docs/cli/getting-started/commands)
[Register

Create a Fleetbase Extension Registry developer account using `flb register` so you can publish your own extensions.](https://fleetbase.io/docs/cli/account/register)
