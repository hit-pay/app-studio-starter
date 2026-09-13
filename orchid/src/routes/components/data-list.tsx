import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/data-list.mdx'

export const Route = createFileRoute('/components/data-list')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/data-list">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
