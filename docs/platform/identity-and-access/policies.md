---
title: "Policies"
url: https://fleetbase.io/docs/platform/identity-and-access/policies
module: platform
---

# Policies

Create reusable permission bundles that can be attached to users and roles across your Fleetbase organization.

# Policies

Policies are reusable bundles of permissions that can be attached to users or roles. Where a role defines a user's primary access level, policies let you grant additional, targeted permissions without creating a whole new role for each combination. Navigate to
**IAM → Policies**
to manage them.

![Policies list — Name, Description, Service, Type, Created columns](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-policies-list.2595ad12.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Policy Types

| Type | Description |
| --- | --- |
| **FLB Managed** | Built-in policies shipped by Fleetbase. Read-only — can be attached to users and roles, but not edited or deleted. |
| **Organization Managed** | Custom policies created by your organization. Fully editable and deletable. |

FLB Managed policies typically map to predefined access patterns (e.g. a read-only policy for a specific service). Clicking an immutable policy opens a permissions viewer showing what it grants.

## How Policies Compose with Roles

A user's effective permissions are the union of:

1. Permissions from their assigned
   **role**
2. Permissions from
   **policies**
   attached to the role
3. Permissions from
   **policies**
   attached directly to the user
4. **Individual permissions**
   granted directly to the user

Policies are purely additive — there is no deny mechanism. If you need to restrict access, use a more limited role rather than relying on policy absence.

## Creating a Policy

Click
**New**
to create a custom policy.

![Policy form — Name, Description, and Permission Picker grid](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-policy-create.7a4a5497.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Field | Description |
| --- | --- |
| **Policy Name** | A descriptive name (e.g. `Fleet-Ops Read Only` , `Order Export Access` ) |
| **Description** | Optional description of what this policy grants |
| **Select Permissions** | Choose individual permissions from the permission picker |

The permission picker lists all permissions across installed extensions, searchable by keyword. You can select permissions from multiple services in a single policy.

## Attaching Policies

Policies can be attached in two places:

**To a role**
— Open a role in
**IAM → Roles**
and use the
**Attach Policies**
field. All users assigned that role inherit the policy's permissions.

**To a user**
— Open a user in
**IAM → Users → Edit**
and use the
**Attach Policies**
field. The policy applies only to that user, independently of their role.

![Policy Attacher — search field and list of selected policies](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiam-user-attach-policies.8207cb49.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Editing a Policy

Click any Organization Managed policy name or use
**⋯ → Edit**
to update it. Changes propagate immediately to all users and roles that have the policy attached.

## Deleting a Policy

Use
**⋯ → Delete**
on any Organization Managed policy. FLB Managed policies cannot be deleted. Before deleting, check whether any roles or users have this policy attached — those assignments are removed along with the policy.
