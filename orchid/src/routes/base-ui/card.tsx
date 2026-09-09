import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/card.mdx'

export const Route = createFileRoute('/base-ui/card')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/card">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
