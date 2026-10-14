---
title: "Setup"
url: https://fleetbase.io/docs/contributing/translations/setup
module: contributing
---

Translations

# Setup

Fork, clone, and prepare your environment to contribute Fleetbase translations.

# Setup

This page covers the practical setup before you translate anything. None of it is Fleetbase-specific — if you've contributed to any GitHub project before, skim and skip.

## Prerequisites

You need:

* A
  **GitHub account**
* **Git**
  installed locally
* A
  **text editor**
  that handles YAML well (VS Code, Sublime, Vim, anything with syntax highlighting)
* *(Optional)*
  A way to run Fleetbase locally to preview your translation in context — see
  [Self-hosting](https://fleetbase.io/docs/platform/system-setup)
  if you want to go this route

You don't need to run Fleetbase locally to contribute — you can translate the YAML files directly and rely on the maintainers to verify rendering during review. Running locally is faster feedback though, especially for languages that change UI sizing (long German words, RTL Arabic, dense CJK).

## Step 1 — Identify the repository

Decide what you want to translate:

| If you want to translate... | Fork this repo |
| --- | --- |
| **The Console shell** (nav, settings, auth) | [`elpelaflow/PuntoShop-TMS`](https://github.com/elpelaflow/PuntoShop-TMS) |
| **Fleet-Ops** (fleet management UI) | `fleetops` |
| **Ledger** (finance UI) | `ledger` |
| **IAM** (users, roles, policies) | `iam-engine` |
| **Developer Console** (API keys, webhooks) | `dev-engine` |

Full repo map with translation paths:
[Repositories →](https://fleetbase.io/docs/contributing/translations/repositories)
.

You can contribute to one repo at a time. Many translators start with the Console (most user-facing) and expand from there.

## Step 2 — Fork and clone

On GitHub, click
**Fork**
on the repo you chose. Then clone your fork locally:

```
git clone https://github.com/YOUR_USERNAME/<repo-name>.git
cd <repo-name>
```

Add the upstream remote so you can pull latest changes:

```
git remote add upstream https://github.com/elpelaflow/PuntoShop-TMS.git
git fetch upstream
```

## Step 3 — Find the translation files

Translation files live at one of two paths depending on the repo:

* **Main
  `elpelaflow/PuntoShop-TMS`
  repository**
  →
  `console/translations/`
* **Every other extension**
  →
  `translations/`
  (at repo root)

Inside, you'll see one YAML file per locale:

```
translations/
├── en-us.yaml      # base language — never translate this directly
├── ar.yaml         # Arabic
├── de-de.yaml      # German
├── es-es.yaml      # Spanish (Spain)
├── es-mx.yaml      # Spanish (Mexico)
├── fr-fr.yaml      # French (France)
├── hi.yaml         # Hindi
├── ja-jp.yaml      # Japanese
├── ko-kr.yaml      # Korean
├── mn.yaml         # Mongolian
├── pt-br.yaml      # Portuguese (Brazil)
├── ru.yaml         # Russian
├── th.yaml         # Thai
├── vi.yaml         # Vietnamese
├── zh-cn.yaml      # Chinese (Simplified)
└── zh-hk.yaml      # Chinese (Traditional, Hong Kong)
```

The exact list varies by repo. Some extensions have fewer locales than the Console. That's normal — start filling them in.

## Step 4 — Create your locale file

### Adding a new language

```
# from the translations/ directory
cp en-us.yaml es-mx.yaml      # example: Mexican Spanish
```

Use the standard
[BCP-47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag)
format:
`<language>-<region>`
(e.g.
`pt-br`
,
`es-mx`
,
`zh-cn`
). Lowercase, dash-separated.

For languages without strong regional variation, you can drop the region (e.g.
`ar`
,
`hi`
,
`vi`
,
`mn`
).

### Updating an existing language

Open the existing locale file and
`en-us.yaml`
side-by-side. Use a diff tool to find keys present in
`en-us`
that are missing or stale in your locale:

```
# rough comparison — list keys only
yq 'paths | map(.) | join(".")' en-us.yaml > /tmp/en.keys
yq 'paths | map(.) | join(".")' es-mx.yaml > /tmp/es.keys
diff /tmp/en.keys /tmp/es.keys
```

(Requires
`yq`
—
`brew install yq`
or
`apt install yq`
. The exact command varies by
`yq`
version.)

## Step 5 — Create a working branch

```
git checkout -b translations/es-mx-update
# or
git checkout -b translations/add-vietnamese
```

You're now ready to translate. Continue to
[File format →](https://fleetbase.io/docs/contributing/translations/file-format)
to learn the YAML conventions, placeholders, and rules of the road.
