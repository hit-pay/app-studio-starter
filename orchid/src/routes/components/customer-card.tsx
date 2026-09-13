import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/customer-card.mdx'

export const Route = createFileRoute('/components/customer-card')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/customer-card">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
