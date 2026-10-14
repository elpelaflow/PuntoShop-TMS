---
title: "API Keys"
url: https://fleetbase.io/docs/platform/developer-console/api-keys
module: platform
---

# API Keys

Generate and manage API credentials for authenticating requests to the Fleetbase REST API.

# API Keys

API keys are the credentials used to authenticate requests to the Fleetbase REST API. Each key belongs to either the
**Test**
or
**Live**
environment and can be scoped to a specific expiry window. Navigate to
**Developers → API Keys**
to manage them.

![API Keys list — Name, Public Key, Secret Key, Environment badge, Expiry, Last Used columns](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-api-keys-list.ae033a14.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Test Mode Toggle

The header contains a
**Test mode**
toggle. When active, the table switches to show only test keys and the console enters sandbox mode — no changes affect production data. When test mode is on you can also select a specific test key from the dropdown next to the toggle; this controls which test key is sent as the active credential when making requests from the console.

## Creating an API Key

Click
**New**
to create a key. The environment is set automatically based on whether test mode is currently on or off.

![API Key form — Name field, Expiration dropdown, and Test/Live environment badge](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-api-key-create.7b5e8391.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Field | Description |
| --- | --- |
| **Name** | A descriptive label for the key (e.g. `Mobile App` , `ERP Integration` ) |
| **Expiration** | When the key expires — choose from `never` , `immediately` , `in 1 hour` , `in 24 hours` , `in 3 days` , or `in 7 days` |
| **Environment** | Set automatically — `test` when test mode is on, `live` when off |

Click
**Save**
to generate the key. The public key and secret are shown in the table immediately after creation.

## Key Fields

| Column | Description |
| --- | --- |
| **Name** | The label you gave the key — click to edit |
| **Public Key** | The `flb_test_…` or `flb_live_…` token — click to copy |
| **Secret Key** | The corresponding secret — click to reveal, then copy |
| **Environment** | `test` or `live` |
| **Expiry** | When the key becomes invalid, or blank if it never expires |
| **Last Used** | Timestamp of the most recent authenticated request |

## Using a Key

Include the public key as a Bearer token in every API request:

```
Authorization: Bearer flb_live_your_public_key_here
```

Example with cURL:

```
curl -X GET "https://api.fleetbase.io/v1/orders" \
  -H "Authorization: Bearer flb_live_your_public_key_here" \
  -H "Content-Type: application/json"
```

## Key Actions

Right-click or use the
**⋯**
menu on any row to access key actions:

| Action | Description |
| --- | --- |
| **Edit** | Update the key name or expiration |
| **Rename** | Quickly rename the key without opening the full form |
| **Roll** | Generate a new public/secret pair — requires your account password. Use this to rotate credentials after a suspected leak without deleting the key record |
| **View Request Logs** | Jump directly to Request Logs pre-filtered to this key |
| **Delete** | Permanently remove the key — any integrations using it will stop authenticating immediately |

## Bulk Actions

Select multiple keys and use the
**Bulk Action**
dropdown to delete them in one operation.

## Exporting Keys

Click
**Export**
to download the API key list in your chosen format (CSV, XLSX, XLS, HTML, PDF). The export includes key names, environments, and expiry dates — not the secret values.

## Security

* Never commit keys to version control or embed them in client-side code
* Rotate keys periodically using the Roll action
* Use descriptive names so you know which system each key belongs to and can revoke the right one quickly
* Monitor usage in
  [Request Logs](https://fleetbase.io/docs/platform/developer-console/request-logs)
  to detect unexpected activity
