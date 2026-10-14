---
title: "Roles & Permissions"
url: https://fleetbase.io/docs/platform/identity-and-access/roles-and-permissions
module: platform
---

# Roles & Permissions

Create and assign roles that grant users access to specific resources and actions across the Fleetbase platform.

# Roles & Permissions

Roles are named collections of permissions. Assigning a role to a user grants them everything that role allows. Fleetbase ships with a set of built-in roles and lets you create custom roles with granular, per-resource permissions. Navigate to
**IAM → Roles**
to manage them.

![Roles list — Name, Description, Service, Type, Created columns](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-roles-list.9743ee96.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Role Types

| Type | Description |
| --- | --- |
| **FLB Managed** | Built-in roles created by Fleetbase. Read-only — their permissions can be viewed but not edited or deleted. |
| **Organization Managed** | Custom roles created by your organization. Fully editable and deletable. |

FLB Managed roles appear in the list alongside your custom roles. Clicking an immutable role opens a read-only permissions viewer instead of the edit form.

## How Permissions Work

Each permission follows the pattern
`{service} {action} {resource}`
. For example:

* `iam create user`
  — create users in the IAM service
* `fleet-ops list order`
  — list orders in Fleet-Ops
* `fleet-ops update driver`
  — update driver records in Fleet-Ops

Services correspond to platform extensions and engines (e.g.
`iam`
,
`fleet-ops`
,
`ledger`
). Permissions are populated automatically when extensions are installed, so the list grows as you add extensions to your instance.

When a user is assigned a role, they inherit all permissions on that role. Direct policies and individual permissions attached to the user are additive on top of the role.

## Creating a Role

Click
**New**
to create a custom role.

![Role form — Name, Description, Attach Policies, and Permission Picker grid](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-role-create.643eef04.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Field | Description |
| --- | --- |
| **Role Name** | A descriptive name for the role (e.g. `Dispatcher` , `Read-Only Viewer` ) |
| **Description** | Optional description of what this role is for |
| **Attach Policies** | Attach existing policies to the role — users assigned this role inherit those policies too |
| **Select Permissions** | Choose individual permissions from the permission picker |

Role names cannot be
`Administrator`
or start with
`Admin`
— that name is system-reserved.

The permission picker lists every permission available across all installed extensions, searchable by keyword. Check or uncheck individual permissions, or use
**Toggle Selected**
to flip the current selection.

## Editing a Role

Click any Organization Managed role name or use the
**⋯ → Edit**
action to open the role form. Changes apply to all users currently assigned the role immediately on save.

FLB Managed roles open a read-only permissions viewer when clicked — they cannot be modified.

## Deleting a Role

Use
**⋯ → Delete**
on any Organization Managed role. FLB Managed roles cannot be deleted. If a role is currently assigned to users, those users will lose the permissions the role provided — reassign them before deleting.

## Assigning Roles to Users

Roles are assigned from the
[Users](https://fleetbase.io/docs/platform/identity-and-access/users)
panel when creating or editing a user. Each user carries one role; additional permissions can be added through direct policies or individual permission grants.
