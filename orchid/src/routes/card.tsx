import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/card.mdx'

export const Route = createFileRoute('/card')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/card">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
