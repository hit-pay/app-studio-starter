import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/customer-card.mdx'

export const Route = createFileRoute('/customer-card')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/customer-card">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
