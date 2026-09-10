import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import TextEditorDocs from '../../../content/docs/components/text-editor.mdx'

export const Route = createFileRoute('/components/text-editor')({
  component: TextEditorExamplesPage,
})

function TextEditorExamplesPage() {
  return (
    <DocExamplePage to="/components/text-editor">
      <DocMdx>
        <TextEditorDocs />
      </DocMdx>
    </DocExamplePage>
  )
}
