import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/form-section.mdx'

export const Route = createFileRoute('/ui/form-section')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/form-section">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
