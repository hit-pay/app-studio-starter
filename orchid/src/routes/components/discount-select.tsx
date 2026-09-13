import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/discount-select.mdx'

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
