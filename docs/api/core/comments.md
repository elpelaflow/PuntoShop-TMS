---
title: "Comments"
url: https://fleetbase.io/docs/api/core/comments
module: api
---

# Comments

Comments attach discussion to Fleetbase resources or reply to existing comments. Use comment endpoints to create threaded context around orders, files, operational records, and other subject models.

* [The Comment object](#the-comment-object)
* [Create Comment

  POST
  `/v1/comments`](#create-comment)
* [Update Comment

  PUT
  `/v1/comments/:id`](#update-comment)
* [Query Comments

  GET
  `/v1/comments`](#query-comments)
* [Retrieve Comment

  GET
  `/v1/comments/:id`](#retrieve-comment)
* [Delete Comment

  DELETE
  `/v1/comments/:id`](#delete-comment)

## The Comment object

A comment stores authored text against a subject resource or as a reply to another comment.

Attributes

`id`

string

optional

Public identifier of the comment.

`content`

string

optional

Comment body.

`tags`

array of strings

optional

Tags associated with the comment.

`meta`

object

optional

Arbitrary metadata stored with the comment.

`author`

object

optional

User that authored the comment.

`replies`

array of objects

optional

Nested replies to the comment.

`editable`

boolean

optional

Whether the current session user can edit the comment.

`updated_at`

timestamp

optional

Time the comment was last updated.

`created_at`

timestamp

optional

Time the comment was created.

`deleted_at`

timestamp

optional

Time the comment was deleted, when soft deleted.

The
Comment
object

```
{
  "id": "comment_8JVZr4q",
  "content": "Please confirm the delivery window.",
  "tags": [],
  "meta": {},
  "author": {
    "id": "user_8xP2L1d",
    "name": "Alex Rivera"
  },
  "replies": [],
  "editable": true,
  "updated_at": "2026-05-07T09:30:00Z",
  "created_at": "2026-05-07T09:30:00Z",
  "deleted_at": null
}
```

POST
`/v1/comments`

## [Create Comment](#create-comment)

Creates a comment on a subject resource or as a reply to an existing comment. Provide either a subject reference or a parent comment ID with the comment content.

Body parameters

`content`

string

required

Comment body.

`subject`

object

optional

Subject resource receiving the comment. Provide this object when creating a top-level comment.

`id`

string

required

Public ID of the subject resource.

`type`

string

required

Mutation type or resource type used to resolve the subject model.

`subject_id`

string

optional

Public ID of the subject resource. Use with
`subject_type`
as an alternative to
`subject`
.

`subject_type`

string

optional

Mutation type or resource type used to resolve the subject model. Use with
`subject_id`
.

`parent`

string

optional

Public ID of the parent comment when creating a reply.

POST
`/v1/comments`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/comments \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "content": "Example comment",
  "subject": {
    "id": "{{file_id}}",
    "type": "file"
  }
}'
```

PUT
`/v1/comments/:id`

## [Update Comment](#update-comment)

Updates the content of an existing comment. The subject and parent linkage are not changed by this endpoint.

Body parameters

`content`

string

required

Updated comment body.

PUT
`/v1/comments/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/comments/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "content": "Updated comment"
}'
```

GET
`/v1/comments`

## [Query Comments](#query-comments)

Returns comments for the current organization. Use query parameters to filter, sort, and paginate the result set.

Query parameters

`limit`

string

optional

Limit value for this comments request.

`offset`

string

optional

Offset value for this comments request.

`sort`

string

optional

Sort value for this comments request.

GET
`/v1/comments`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/comments?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/comments/:id`

## [Retrieve Comment](#retrieve-comment)

Retrieves a comment by ID, including its author and any nested replies returned by the API resource.

GET
`/v1/comments/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/comments/:id \
  -H "Authorization: Bearer flb_live_…"
```

DELETE
`/v1/comments/:id`

## [Delete Comment](#delete-comment)

Deletes a comment by ID. The response returns a deleted-resource envelope for the removed comment.

DELETE
`/v1/comments/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/comments/:id \
  -H "Authorization: Bearer flb_live_…"
```
