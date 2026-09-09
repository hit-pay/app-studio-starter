import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import SubSidebarDocs from '../../../content/docs/components/sub-sidebar.mdx'

export const Route = createFileRoute('/components/sub-sidebar')({
  component: SubSidebarExamplesPage,
})

function SubSidebarExamplesPage() {
  return (
    <DocExamplePage to="/components/sub-sidebar">
      <DocMdx>
        <SubSidebarDocs />
      </DocMdx>
    </DocExamplePage>
  )
}
