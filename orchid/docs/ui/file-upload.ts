// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const fileUploadRegistry = registry.items.find(
  (item: { name: string }) => item.name === "file-upload",
);

const fileUploadDocs = {
  ...fileUploadRegistry,
  category: "ui",
  props: {
    state: ["idle", "uploading", "processing", "error", "done"],
    size: ["default", "sm", "xs"],
    orientation: ["horizontal", "vertical"],
  },
  examples: [
    {
      description: "Uploaded file",
      code: `<FileUpload state="done" className="w-full max-w-md">
  <FileUploadMedia variant="icon">
    <FileIcon />
  </FileUploadMedia>
  <FileUploadContent>
    <FileUploadTitle>invoice-2048.pdf</FileUploadTitle>
    <FileUploadDescription>PDF · 128 KB</FileUploadDescription>
  </FileUploadContent>
  <FileUploadActions>
    <FileUploadAction aria-label="Remove invoice-2048.pdf">
      <CloseIcon />
    </FileUploadAction>
  </FileUploadActions>
</FileUpload>`,
    },
    {
      description: "Uploading",
      code: `<FileUpload state="uploading" className="w-full max-w-md">
  <FileUploadMedia>
    <Spinner />
  </FileUploadMedia>
  <FileUploadContent>
    <FileUploadTitle>store-banner.png</FileUploadTitle>
    <FileUploadDescription>Uploading · 64%</FileUploadDescription>
  </FileUploadContent>
</FileUpload>`,
    },
    {
      description: "Idle picker",
      code: `<FileUpload state="idle" className="w-full max-w-md">
  <FileUploadMedia>
    <UploadIcon />
  </FileUploadMedia>
  <FileUploadContent>
    <FileUploadTitle>Upload receipt</FileUploadTitle>
    <FileUploadDescription>PDF or image up to 10 MB</FileUploadDescription>
  </FileUploadContent>
</FileUpload>`,
    },
    {
      description: "Multiple files",
      code: `<FileUploadGroup>
  <FileUpload state="done" className="w-full max-w-md">
    <FileUploadMedia variant="icon">
      <FileIcon />
    </FileUploadMedia>
    <FileUploadContent>
      <FileUploadTitle>terms.pdf</FileUploadTitle>
      <FileUploadDescription>PDF · 42 KB</FileUploadDescription>
    </FileUploadContent>
  </FileUpload>
  <FileUpload state="done" className="w-full max-w-md">
    <FileUploadMedia variant="icon">
      <FileIcon />
    </FileUploadMedia>
    <FileUploadContent>
      <FileUploadTitle>logo.svg</FileUploadTitle>
      <FileUploadDescription>SVG · 8 KB</FileUploadDescription>
    </FileUploadContent>
  </FileUpload>
</FileUploadGroup>`,
    },
  ],
  related_components: ["button", "spinner", "form-builder"],
};

export default fileUploadDocs;
