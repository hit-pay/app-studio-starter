import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/dropdown-menu.mdx'

export const Route = createFileRoute('/base-ui/dropdown-menu')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/dropdown-menu">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
