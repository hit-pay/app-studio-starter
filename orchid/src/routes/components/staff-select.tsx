import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/staff-select.mdx'

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
