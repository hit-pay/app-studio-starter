import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/data-table.mdx'

export const Route = createFileRoute('/data-table')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/data-table">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
