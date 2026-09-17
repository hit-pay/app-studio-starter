import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/resource-list.mdx'

export const Route = createFileRoute('/components/resource-list')({
  component: ResourceListPage,
})

function ResourceListPage() {
  return (
    <DocExamplePage to="/components/resource-list">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
