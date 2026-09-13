import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/badge.mdx'

export const Route = createFileRoute('/ui/badge')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/badge">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
