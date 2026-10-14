---
title: "Filesystem"
url: https://fleetbase.io/docs/platform/system-setup/filesystem
module: platform
---

# Filesystem

Configure where Fleetbase stores file uploads — local disk, Amazon S3, Google Cloud Storage, or any S3-compatible provider.

# Filesystem

The Filesystem settings control where Fleetbase stores uploaded files — driver documents, proof of delivery photos, import CSVs, and other user-uploaded content. Navigate to
**Admin → System Settings → Filesystem**
to access these settings.

![Filesystem settings — Driver dropdown with S3 configuration fields visible](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-filesystem-settings-s3.ba6176bf.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

For storage growth formulas, backup targets, and production object-storage guidance, see
[Infrastructure Sizing](https://fleetbase.io/docs/platform/quickstart/infrastructure-sizing)
.

## Driver

Select the storage backend from the
**Driver**
dropdown. The form updates to show the fields required for the selected driver.

![Filesystem settings with the Public (local) driver selected](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-filesystem-settings-public.e316e95d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Local

S3 / S3-Compatible

Google Cloud Storage

Stores files on the server's local disk. No additional configuration required. Only suitable for single-server setups with persistent, non-ephemeral storage — not recommended for cloud deployments where containers may be restarted.

Amazon S3 or any S3-compatible provider (Cloudflare R2, MinIO, DigitalOcean Spaces, Backblaze B2).

| Field | Description |
| --- | --- |
| **S3 Bucket** | The name of your S3 bucket |
| **S3 URL** | Optional public CDN or custom domain URL for serving files (e.g. a CloudFront distribution URL) |
| **S3 Endpoint** | Custom endpoint for S3-compatible providers — leave empty for AWS S3 (e.g. `https://nyc3.digitaloceanspaces.com` for DigitalOcean Spaces) |

AWS credentials (Access Key ID, Secret Access Key, and region) for S3 are configured in
[Services](https://fleetbase.io/docs/platform/system-setup/services)
or set via environment variables (
`AWS_ACCESS_KEY_ID`
,
`AWS_SECRET_ACCESS_KEY`
,
`AWS_DEFAULT_REGION`
).

| Field | Description |
| --- | --- |
| **GCS Bucket** | The name of your GCS bucket |
| **GCS Service Account Key File** | Upload your GCS service account credentials JSON file |

If GCS is already configured via environment variables (
`GOOGLE_CLOUD_STORAGE_BUCKET`
,
`GOOGLE_CLOUD_PROJECT_ID`
, or
`GOOGLE_APPLICATION_CREDENTIALS`
), the console will display a warning. Saving new values here will override the environment configuration.

To generate a service account key file: open the Google Cloud Console → IAM & Admin → Service Accounts → select your service account → Keys → Add Key → JSON. Grant the service account the
**Storage Object Admin**
role on your bucket.

## Testing

Click
**Test Config**
to verify the configuration by uploading a small test file to the selected storage backend. A success or error message is shown inline. Test before saving to confirm credentials and bucket access are correct.

## Saving

Click
**Save Changes**
to apply the configuration. The config cache is refreshed automatically — no restart is required.

[Mail

Configure the outbound mail driver Fleetbase uses for notifications, invitations, order updates, and system alerts.](https://fleetbase.io/docs/platform/system-setup/mail)
[Queue

Configure the background job queue that powers webhook delivery, notifications, imports, and async processing in Fleetbase.](https://fleetbase.io/docs/platform/system-setup/queue)
