import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/detail-list.mdx'

export const Route = createFileRoute('/detail-list')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/detail-list">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
