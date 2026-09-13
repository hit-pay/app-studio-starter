import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/detail-card.mdx'

export const Route = createFileRoute('/components/detail-card')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/detail-card">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
