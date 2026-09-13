import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/role-select.mdx'

export const Route = createFileRoute('/components/role-select')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/role-select">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
