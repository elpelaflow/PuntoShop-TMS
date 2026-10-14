---
title: "Files"
url: https://fleetbase.io/docs/api/core/files
module: api
---

# Files

Files store uploaded documents, images, and other binary assets used across Fleetbase. Use file endpoints to upload, retrieve, download, update, and attach file metadata to other resources.

* [The File object](#the-file-object)
* [Upload File

  POST
  `/v1/files`](#upload-file)
* [Upload Base64 File

  POST
  `/v1/files/base64`](#upload-base64-file)
* [Update File

  PUT
  `/v1/files/:id`](#update-file)
* [Download File

  GET
  `/v1/files/:id/download`](#download-file)
* [Query Files

  GET
  `/v1/files`](#query-files)
* [Retrieve a File

  GET
  `/v1/files/:id`](#retrieve-a-file)
* [Delete a File

  DELETE
  `/v1/files/:id`](#delete-a-file)

## The File object

A file represents an uploaded binary object and the metadata Fleetbase stores for it.

Attributes

`id`

string

optional

Public identifier of the file.

`url`

string

optional

Public URL for the stored file.

`original_filename`

string

optional

Original filename stored on the file record.

`folder`

string

optional

Storage folder containing the file.

`content_type`

string

optional

MIME content type of the file.

`file_size`

integer

optional

File size in bytes.

`caption`

string

optional

Caption displayed with the file.

`type`

string

optional

Logical file type stored on the file record.

`meta`

object

optional

Arbitrary metadata stored with the file.

`updated_at`

timestamp

optional

Time the file record was last updated.

`created_at`

timestamp

optional

Time the file record was created.

The
File
object

```
{
  "id": "file_4WdX9o2",
  "url": "https://files.example.com/uploads/example.png",
  "original_filename": "example.png",
  "folder": "uploads",
  "content_type": "image/png",
  "file_size": 24576,
  "caption": "Proof of delivery",
  "type": "attachment",
  "meta": {},
  "updated_at": "2026-05-07T09:30:00Z",
  "created_at": "2026-05-07T09:30:00Z"
}
```

POST
`/v1/files`

## [Upload File](#upload-file)

Uploads a multipart file and creates a file record. The response includes the stored file URL and metadata captured from the upload.

Body parameters

`file`

string

required

Multipart file upload. The uploaded file may be up to 100 MB and must use one of the supported MIME types.

`resize`

enum

optional

Optional image resize preset. One of
`thumb`
,
`sm`
,
`md`
,
`lg`
,
`xl`
,
`2xl`
.

`resize_width`

integer

optional

Target resize width in pixels. Must be between 1 and 10000.

`resize_height`

integer

optional

Target resize height in pixels. Must be between 1 and 10000.

`resize_mode`

enum

optional

Resize mode used when transforming the image. One of
`fit`
,
`crop`
,
`stretch`
,
`contain`
.

`resize_quality`

integer

optional

Resize output quality from 1 to 100.

`resize_format`

enum

optional

Output image format for the resized file. One of
`jpg`
,
`jpeg`
,
`png`
,
`webp`
,
`gif`
,
`bmp`
,
`avif`
.

`resize_upscale`

boolean

optional

Whether smaller images may be upscaled during resizing.

POST
`/v1/files`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/files \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/files/base64`

## [Upload Base64 File](#upload-base64-file)

Creates a file from base64-encoded data. Fleetbase stores the decoded file, creates a file record, and optionally associates it with a subject resource.

Body parameters

`data`

string

required

Base64-encoded file contents.

`file_name`

string

required

Filename to use when storing the decoded file.

`file_type`

string

optional

Logical file type stored on the file record. Defaults to
`image`
.

`content_type`

string

optional

MIME content type stored on the file record. Defaults to
`image/png`
.

`subject_uuid`

string

optional

UUID of a subject resource to associate with the file.

`subject_type`

string

optional

Model class or subject type for the associated resource.

`resize`

enum

optional

Optional image resize preset. One of
`thumb`
,
`sm`
,
`md`
,
`lg`
,
`xl`
,
`2xl`
.

`resize_width`

integer

optional

Target resize width in pixels. Must be between 1 and 10000.

`resize_height`

integer

optional

Target resize height in pixels. Must be between 1 and 10000.

`resize_mode`

enum

optional

Resize mode used when transforming the image. One of
`fit`
,
`crop`
,
`stretch`
,
`contain`
.

`resize_quality`

integer

optional

Resize output quality from 1 to 100.

`resize_format`

enum

optional

Output image format for the resized file. One of
`jpg`
,
`jpeg`
,
`png`
,
`webp`
,
`gif`
,
`bmp`
,
`avif`
.

`resize_upscale`

boolean

optional

Whether smaller images may be upscaled during resizing.

POST
`/v1/files/base64`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/files/base64 \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "data": "{{base64_file_data}}",
  "file_name": "example.png",
  "file_type": "image",
  "content_type": "image/png",
  "path": "uploads"
}'
```

PUT
`/v1/files/:id`

## [Update File](#update-file)

Updates a file record's caption, metadata, or original filename. The uploaded binary object is not replaced.

Body parameters

`caption`

string

optional

Caption displayed with the file.

`filename`

string

optional

New original filename to store on the file record.

`meta`

object

optional

Arbitrary metadata stored with the file record.

PUT
`/v1/files/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/files/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "caption": "Updated caption",
  "meta": {}
}'
```

GET
`/v1/files/:id/download`

## [Download File](#download-file)

Downloads the binary contents of a file by ID. The API streams the stored file using its original filename.

GET
`/v1/files/:id/download`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/files/:id/download \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/files`

## [Query Files](#query-files)

Returns uploaded files for the current organization. Use query parameters to filter, sort, and paginate the result set.

Query parameters

`limit`

string

optional

Limit value for this files request.

`offset`

string

optional

Offset value for this files request.

`sort`

string

optional

Sort value for this files request.

GET
`/v1/files`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/files?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/files/:id`

## [Retrieve a File](#retrieve-a-file)

Retrieves a file record by ID, including its URL, original filename, content type, size, caption, and metadata.

GET
`/v1/files/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/files/:id \
  -H "Authorization: Bearer flb_live_…"
```

DELETE
`/v1/files/:id`

## [Delete a File](#delete-a-file)

Deletes a file record by ID. The response returns a deleted-resource envelope for the removed file.

DELETE
`/v1/files/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/files/:id \
  -H "Authorization: Bearer flb_live_…"
```
