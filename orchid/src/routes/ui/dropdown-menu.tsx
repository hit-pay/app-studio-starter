import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/dropdown-menu.mdx'

export const Route = createFileRoute('/ui/dropdown-menu')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/dropdown-menu">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
