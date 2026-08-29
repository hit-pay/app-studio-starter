import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/icon-group.mdx'

export const Route = createFileRoute('/icon-group')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/icon-group">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
