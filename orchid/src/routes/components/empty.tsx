import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/empty.mdx'

export const Route = createFileRoute('/components/empty')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/empty">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
