import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/data-list.mdx'

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
