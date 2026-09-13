import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/label.mdx'

export const Route = createFileRoute('/ui/label')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/label">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
