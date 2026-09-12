<!-- Generated from content/docs/components/file-upload.mdx. Do not edit. -->

# File Upload

File and image upload row with upload state, media, and a vertical group.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Wire a real `<input type="file">` (single or `multiple`) and set `state="uploading"` while the file is in flight. Show `Spinner` in `FileUploadMedia` — do not add a title shimmer. After success, switch to `state="done"` and keep the file icon or image preview. `FileUploadGroup` stacks many files vertically. Label icon-only `FileUploadAction`s. Do not call `npx shadcn add file-upload`.
