import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/input-group.mdx'

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
