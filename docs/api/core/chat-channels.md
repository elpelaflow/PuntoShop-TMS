---
title: "Chat Channels"
url: https://fleetbase.io/docs/api/core/chat-channels
module: api
---

# Chat Channels

Chat channels organize conversations between users and participants in an organization. Use chat channel endpoints to create rooms, send messages, manage participants, and record read receipts.

* [The Chat Channel object](#the-chat-channel-object)
* [List Available Participants

  GET
  `/v1/chat-channels/available-participants`](#list-available-participants)
* [Create Chat Channel

  POST
  `/v1/chat-channels`](#create-chat-channel)
* [Send Message

  POST
  `/v1/chat-channels/:id/send-message`](#send-message)
* [Create Read Receipt

  POST
  `/v1/chat-channels/read-message/:chatMessageId`](#create-read-receipt)
* [Update Chat Channel

  PUT
  `/v1/chat-channels/:id`](#update-chat-channel)
* [Query Chat Channels

  GET
  `/v1/chat-channels`](#query-chat-channels)
* [Retrieve Chat Channel

  GET
  `/v1/chat-channels/:id`](#retrieve-chat-channel)
* [Add Participant

  POST
  `/v1/chat-channels/:id/add-participant`](#add-participant)
* [Remove Participant

  DELETE
  `/v1/chat-channels/remove-participant/:participantId`](#remove-participant)
* [Delete Message

  DELETE
  `/v1/chat-channels/delete-message/:chatMessageId`](#delete-message)
* [Delete Chat Channel

  DELETE
  `/v1/chat-channels/:id`](#delete-chat-channel)

## The Chat Channel object

A chat channel groups participants and messages for organization-scoped conversations.

Attributes

`id`

string

optional

Public identifier of the chat channel.

`created_by`

string

optional

Public user ID of the user that created the channel.

`name`

string

optional

Channel name.

`title`

string

optional

Display title for the channel.

`last_message`

object

optional

Most recent chat message for the channel, when available.

`unread_count`

integer

optional

Unread message count for the current session user when session context is available.

`slug`

string

optional

URL-friendly channel slug.

`feed`

array of objects

optional

Messages and feed entries returned for the channel.

`participants`

array of objects

optional

Chat participants in the channel.

`meta`

object

optional

Arbitrary metadata stored with the channel.

`updated_at`

timestamp

optional

Time the channel was last updated.

`created_at`

timestamp

optional

Time the channel was created.

`deleted_at`

timestamp

optional

Time the channel was deleted, when soft deleted.

The
Chat Channel
object

```
{
  "id": "chat_channel_5VUl2v4",
  "created_by": "user_8xP2L1d",
  "name": "Dispatch updates",
  "title": "Dispatch updates",
  "last_message": null,
  "slug": "dispatch-updates",
  "feed": [],
  "participants": [],
  "meta": {},
  "updated_at": "2026-05-07T09:30:00Z",
  "created_at": "2026-05-07T09:30:00Z",
  "deleted_at": null
}
```

GET
`/v1/chat-channels/available-participants`

## [List Available Participants](#list-available-participants)

Lists users in the current organization that can be added to a chat channel. When a channel ID is provided, users already participating in that channel are excluded.

Query parameters

`channel`

string

optional

Channel value for this chat channels request.

GET
`/v1/chat-channels/available-participants`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/chat-channels/available-participants?channel={{chat_channel_id}} \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/chat-channels`

## [Create Chat Channel](#create-chat-channel)

Creates a chat channel for the current organization. Include participant user IDs to add those users to the channel immediately after it is created.

Body parameters

`name`

string

required

Name of the chat channel.

`participants`

array of strings

optional

Public user IDs to add as participants after the channel is created.

POST
`/v1/chat-channels`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/chat-channels \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Dispatch",
  "participants": [
    "{{user_id}}"
  ]
}'
```

POST
`/v1/chat-channels/:id/send-message`

## [Send Message](#send-message)

Sends a message to a chat channel as an existing chat participant. File IDs can be included to attach previously uploaded files to the message.

Body parameters

`sender`

string

required

Public ID of the chat participant sending the message.

`content`

string

optional

Message text to publish to the channel.

`files`

array of strings

optional

Public IDs of uploaded files to attach to the message.

POST
`/v1/chat-channels/:id/send-message`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/chat-channels/:id/send-message \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "sender": "{{chat_participant_id}}",
  "content": "Hello from Fleetbase API",
  "files": []
}'
```

POST
`/v1/chat-channels/read-message/:chatMessageId`

## [Create Read Receipt](#create-read-receipt)

Marks a chat message as read for a participant. If a receipt already exists for the message and participant, Fleetbase returns the existing receipt.

Body parameters

`participant`

string

required

Public ID of the chat participant that read the message.

POST
`/v1/chat-channels/read-message/:chatMessageId`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/chat-channels/read-message/:chatMessageId \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "participant": "{{chat_participant_id}}"
}'
```

PUT
`/v1/chat-channels/:id`

## [Update Chat Channel](#update-chat-channel)

Updates a chat channel's name. The response returns the updated chat channel resource.

Body parameters

`name`

string

required

Updated channel name.

PUT
`/v1/chat-channels/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/chat-channels/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Dispatch Updates"
}'
```

GET
`/v1/chat-channels`

## [Query Chat Channels](#query-chat-channels)

Returns chat channels visible to the current organization. Use query parameters to filter, sort, and paginate the result set.

Query parameters

`limit`

string

optional

Limit value for this chat channels request.

`offset`

string

optional

Offset value for this chat channels request.

`sort`

string

optional

Sort value for this chat channels request.

GET
`/v1/chat-channels`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/chat-channels?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/chat-channels/:id`

## [Retrieve Chat Channel](#retrieve-chat-channel)

Retrieves a chat channel by ID, including its participants, feed, and latest message metadata.

GET
`/v1/chat-channels/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/chat-channels/:id \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/chat-channels/:id/add-participant`

## [Add Participant](#add-participant)

Adds a user in the current organization to an existing chat channel. The response returns the created chat participant resource.

Body parameters

`user`

string

required

Public ID of the user to add to the chat channel.

POST
`/v1/chat-channels/:id/add-participant`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/chat-channels/:id/add-participant \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "user": "{{user_id}}"
}'
```

DELETE
`/v1/chat-channels/remove-participant/:participantId`

## [Remove Participant](#remove-participant)

Removes a participant from a chat channel by participant ID. The channel remains active for the remaining participants.

DELETE
`/v1/chat-channels/remove-participant/:participantId`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/chat-channels/remove-participant/:participantId \
  -H "Authorization: Bearer flb_live_…"
```

DELETE
`/v1/chat-channels/delete-message/:chatMessageId`

## [Delete Message](#delete-message)

Deletes a chat message by ID. Use this when a previously sent message should be removed from the channel feed.

DELETE
`/v1/chat-channels/delete-message/:chatMessageId`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/chat-channels/delete-message/:chatMessageId \
  -H "Authorization: Bearer flb_live_…"
```

DELETE
`/v1/chat-channels/:id`

## [Delete Chat Channel](#delete-chat-channel)

Deletes a chat channel by ID. The response returns a deleted-resource envelope for the removed channel.

DELETE
`/v1/chat-channels/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/chat-channels/:id \
  -H "Authorization: Bearer flb_live_…"
```
