<!-- Generated from content/docs/components/text-editor.mdx. Do not edit. -->

# Text Editor

Lexical rich text: bold, italic, heading, lists. Persist editor JSON.

Rich text for notes and handover, built with [Lexical](https://lexical.dev/) (Meta). Toolbar: bold, italic, underline, heading, lists. Use `Textarea` for a single plain field.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

```tsx
import { TextEditor } from "@/components/form/text-editor";

<TextEditor
  onValueChange={(document) => {
    // persist Lexical JSON (SerializedEditorState)
  }}
/>
```

`onValueChange` receives Lexical editor state. Store it as JSON text. Do not persist HTML.
