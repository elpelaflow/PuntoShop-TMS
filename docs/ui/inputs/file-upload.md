---
title: "FileUpload"
url: https://fleetbase.io/docs/ui/inputs/file-upload
module: ui
---

# FileUpload

<FileUpload> wraps `ember-file-upload`'s file-queue helper for triggered uploads. Yields the queue so you can compose any trigger UI. Pair with <UploadButton> for a ready-made trigger.

# <FileUpload>

`<FileUpload>`
is a thin wrapper around
`ember-file-upload`
's file-queue helper. It exposes a hidden file input and yields the queue so you can compose any trigger you like — a button, a panel, a drag area.

For a ready-made button trigger, use
[`<UploadButton>`](#upload-button)
(covered below).

## Basic Usage

```
<FileUpload @name="avatar" @accept="image/*" @onFileAdded={{this.handleFile}} as |queue|>
  <Button @icon="upload" @text="Upload avatar" {{on "click" queue.selectFile}} />
</FileUpload>
```

```
@action async handleFile(file) {
  // file is an ember-file-upload File instance
  // call file.upload(url) or your own upload service
}
```

The yielded
`queue`
is the
`FileQueue`
instance — useful for triggering selection programmatically and tracking upload state.

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `@name` | string | Queue name (used to disambiguate multiple queues) |
| `@accept` | string | MIME type filter (e.g. `image/*` , `.pdf` ) |
| `@hidden` | boolean | Whether the underlying `<input type="file">` is hidden (default `true` ) |
| `@disabled` | boolean | Disable the input |
| `@inputClass` | string | Extra classes on the input |
| `@labelClass` | string | Extra classes on the wrapping `<label>` |

### Callbacks

| Argument | Signature | Description |
| --- | --- | --- |
| `@onFileAdded` | `(file)` | Called when a file is added to the queue |
| `@onFileRemoved` | `(file)` | Called when a file is removed |
| `@onUploadStarted` | `(file)` | Called when an upload starts |
| `@onUploadSucceeded` | `(file, response)` | Called on successful upload |
| `@onUploadFailed` | `(file, error)` | Called on upload failure |

## Yielded Block

The yielded
`queue`
has these key properties (from
`ember-file-upload`
):

| Property | Description |
| --- | --- |
| `queue.selectFile` | Modifier — attach to a clickable element to open the picker |
| `queue.files` | Array of files in the queue |

## <UploadButton>

For a ready-made trigger button, use the sibling
`<UploadButton>`
component (template-only, at
`addon/components/upload-button.hbs`
):

```
<UploadButton @name="avatar" @accept="image/*" @onFileAdded={{this.handleFile}} />
```

It renders a
`<Button>`
styled trigger that opens the file picker on click. Same
`@`
-args as
`<FileUpload>`
.

## Real-World Examples

```
{{!-- Single file upload with status --}}
<FileUpload @name="logo" @accept="image/*" @onFileAdded={{this.uploadLogo}} as |queue|>
  <a tabindex="0" class="btn btn-default">
    {{#if queue.files.length}}
      <Spinner @size="xs" /> Uploading…
    {{else}}
      <FaIcon @icon="upload" class="mr-1" /> Upload logo
    {{/if}}
  </a>
</FileUpload>

{{!-- Inside a form group --}}
<InputGroup @name="Profile photo">
  <UploadButton @name="photo" @accept="image/*" @onFileAdded={{this.uploadPhoto}} />
</InputGroup>
```

## Source

| File | Description |
| --- | --- |
| `addon/components/file-upload.hbs` | Template (template-only) |
| `addon/components/upload-button.hbs` | Sibling — ready-made trigger button (template-only) |

Wraps
[`ember-file-upload`](https://github.com/adopted-ember-addons/ember-file-upload)
.

[MoneyInput

<MoneyInput> is a currency-aware money input — formats as the user types using AutoNumeric and shows the currency symbol on the left. Optional currency picker.](https://fleetbase.io/docs/ui/inputs/money-input)
[Table

<Table> is the standard data table component — sortable, resizable, selectable, expandable, with pagination support and pluggable cell components.](https://fleetbase.io/docs/ui/display/table)
