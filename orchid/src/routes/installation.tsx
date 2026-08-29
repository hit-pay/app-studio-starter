import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import InstallationDocs from '../../content/docs/guides/installation.mdx'

export const Route = createFileRoute('/installation')({ component: InstallationPage })

function InstallationPage() {
  return (
    <DocExamplePage to={'/installation' as '/'}>
      <DocMdx><InstallationDocs /></DocMdx>
    </DocExamplePage>
  )
}
