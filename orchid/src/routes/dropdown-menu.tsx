import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/dropdown-menu.mdx'

export const Route = createFileRoute('/dropdown-menu')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/dropdown-menu">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
