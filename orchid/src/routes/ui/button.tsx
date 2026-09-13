import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import ButtonDocs from '../../../docs/ui/button.mdx'

export const Route = createFileRoute('/ui/button')({
  component: ButtonExamplesPage,
})

function ButtonExamplesPage() {
  return (
    <DocExamplePage to="/ui/button">
      <DocMdx>
        <ButtonDocs />
      </DocMdx>
    </DocExamplePage>
  )
}
