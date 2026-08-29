import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/input-group.mdx'

export const Route = createFileRoute('/input-group')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/input-group">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
