// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const textEditorRegistry = registry.items.find(
  (item: { name: string }) => item.name === "text-editor",
);

export const TEXT_EDITOR_HANDOVER_NOTE = JSON.stringify({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Shift handover",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "heading",
        version: 1,
        tag: "h2",
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Note what the next team needs to know. Keep it short.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});

export const TEXT_EDITOR_READONLY_NOTE = JSON.stringify({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "This note is locked. Staff can read it, not edit it.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});

const textEditorDocs = {
  ...textEditorRegistry,
  category: "components",
  props: {
    defaultValue: "TextEditorDocument | string (Lexical JSON)",
    editable: "boolean",
    onValueChange: "function",
  },
  examples: [
    {
      description: "Empty note",
      code: `<TextEditor />`,
    },
    {
      description: "Prefilled handover",
      code: `<TextEditor defaultValue={HANDOVER_NOTE} />`,
    },
    {
      description: "Read only",
      code: `<TextEditor editable={false} defaultValue={READONLY_NOTE} />`,
    },
  ],
  related_components: ["textarea", "field", "form-builder"],
};

export default textEditorDocs;
