import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/input-group.mdx'

export const Route = createFileRoute('/ui/input-group')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/input-group">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
