import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/form-section.mdx'

export const Route = createFileRoute('/base-ui/form-section')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/form-section">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
