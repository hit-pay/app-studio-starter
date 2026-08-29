import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/badge.mdx'

export const Route = createFileRoute('/badge')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/badge">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
