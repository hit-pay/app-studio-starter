import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/discount-select.mdx'

export const Route = createFileRoute('/components/discount-select')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/discount-select">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
