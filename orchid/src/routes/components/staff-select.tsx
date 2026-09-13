import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/staff-select.mdx'

export const Route = createFileRoute('/components/staff-select')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/staff-select">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
