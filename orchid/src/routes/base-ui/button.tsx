import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import ButtonDocs from '../../../content/docs/components/button.mdx'

export const Route = createFileRoute('/base-ui/button')({
  component: ButtonExamplesPage,
})

function ButtonExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/button">
      <DocMdx>
        <ButtonDocs />
      </DocMdx>
    </DocExamplePage>
  )
}
