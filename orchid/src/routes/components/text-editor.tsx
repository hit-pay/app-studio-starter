import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import TextEditorDocs from '../../../docs/components/text-editor.mdx'

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
