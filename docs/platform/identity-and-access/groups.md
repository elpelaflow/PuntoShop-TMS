---
title: "Groups"
url: https://fleetbase.io/docs/platform/identity-and-access/groups
module: platform
---

# Groups

Organize users into groups to simplify access management — assign policies once and apply them to a collection of users at once.

# Groups

Groups let you collect users together under a shared name. Rather than attaching policies to each user individually, you attach them to a group and add users to it. Navigate to
**IAM → Groups**
to manage them.

![Groups list — Name, Description, Members avatar stack, Created columns](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-groups-list.a78d9db8.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Creating a Group

Click
**New**
to create a group.

![Group form — Name, Description, and member search list](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-group-create.cf872598.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Field | Description |
| --- | --- |
| **Group Name** | A descriptive name for the group (e.g. `Singapore Dispatchers` , `Read-Only Auditors` ) |
| **Description** | Optional description of the group's purpose |
| **Members** | Search for and add users to the group. Added users appear in the member list below. Click the **×** next to a user to remove them. |

## Managing Members

Members can be added or removed at any time by editing the group. Search by name in the user selector to find and add users. Changes take effect immediately — there is no pending state for group membership.

![Group member list with remove buttons and user search selector](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-group-members.d53a72fc.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Editing a Group

Click any group name or use
**⋯ → Edit**
to open the group form. You can rename the group, update the description, and add or remove members.

## Deleting a Group

Use
**⋯ → Delete**
on any group. Deleting a group removes the group record and all memberships — it does not delete the user accounts themselves.

## Bulk Actions

Select multiple groups and use the
**Bulk Action**
dropdown to delete them in one operation.

## Exporting Groups

Click
**Export**
to download the groups list as a file — useful for auditing membership or migrating group structure to another instance.
