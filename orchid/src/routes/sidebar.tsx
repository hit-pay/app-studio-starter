import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import SidebarDocs from '../../content/docs/components/sidebar.mdx'

export const Route = createFileRoute('/sidebar')({
  component: SidebarExamplesPage,
})

function SidebarExamplesPage() {
  return (
    <DocExamplePage to="/sidebar">
      <DocMdx>
        <SidebarDocs />
      </DocMdx>
    </DocExamplePage>
  )
}
