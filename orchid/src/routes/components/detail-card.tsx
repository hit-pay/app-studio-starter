import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/detail-card.mdx'

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
