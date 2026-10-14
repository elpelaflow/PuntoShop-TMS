---
title: "Push Notifications"
url: https://fleetbase.io/docs/platform/system-setup/push-notifications
module: platform
---

# Push Notifications

Configure Apple Push Notification service (APNs) and Firebase Cloud Messaging (FCM) to send push notifications to the Navigator driver mobile app.

# Push Notifications

Fleetbase sends push notifications to the
**Navigator**
driver app for order assignments, status updates, and alerts. Two channels are supported: Apple Push Notification service (APNs) for iOS, and Firebase Cloud Messaging (FCM) for Android. Navigate to
**Admin → System Settings → Push Notifications**
to configure them.

![Push Notifications settings — APNs and Firebase configuration panels](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-push-notification-settings.9bc87482.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Provider Configuration

APNs (iOS)

FCM (Android)

APNs delivers push notifications to iOS devices. You'll need an Apple Developer account and access to your app's push notification credentials.

| Field | Description |
| --- | --- |
| **APN Key ID** | The 10-character Key ID for your `.p8` authentication key |
| **APN Team ID** | Your Apple Developer Team ID (found under Membership in the Apple Developer portal) |
| **APN App Bundle ID** | The bundle identifier of the app receiving notifications (e.g. `io.fleetbase.navigator` ) |
| **P8 Key File** | Upload your `.p8` authentication key file downloaded from the Apple Developer portal |
| **APN Production** | Enable for production (App Store) builds. Disable for development/TestFlight builds. |

To generate a
`.p8`
key: sign in to
[developer.apple.com](https://developer.apple.com/)
→ Certificates, Identifiers & Profiles → Keys → create a new key with
**Apple Push Notifications service (APNs)**
enabled. The
`.p8`
file can only be downloaded once — store it securely.

Firebase Cloud Messaging (FCM) delivers push notifications to Android devices.

| Field | Description |
| --- | --- |
| **Service Account JSON** | Upload the Firebase service account credentials file for your project |

To generate the service account file: open the
[Firebase Console](https://console.firebase.google.com/)
→ Project Settings → Service Accounts →
**Generate New Private Key**
. Upload the downloaded JSON file here.

## Testing

The
**Test Push Notification**
panel lets you verify both channels end-to-end before relying on them in production.

| Field | Description |
| --- | --- |
| **Title** | Notification title |
| **Message** | Notification body text |
| **APN Device Token** | A device token from an iOS device to test APNs delivery |
| **FCM Device Token** | A registration token from an Android device to test FCM delivery |

Fill in one or both device tokens and click
**Test Config**
. The device should receive the notification within a few seconds. Device tokens can be obtained from the Navigator app's debug settings screen.

## Saving

Click
**Save Changes**
to apply the configuration. The config cache is refreshed automatically — no restart is required.
