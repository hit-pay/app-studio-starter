import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import AppSidebarDocs from '../../content/docs/components/app-sidebar.mdx'

export const Route = createFileRoute('/app-sidebar')({
  component: AppSidebarExamplesPage,
})

function AppSidebarExamplesPage() {
  return (
    <DocExamplePage to="/app-sidebar">
      <DocMdx>
        <AppSidebarDocs />
      </DocMdx>
    </DocExamplePage>
  )
}
