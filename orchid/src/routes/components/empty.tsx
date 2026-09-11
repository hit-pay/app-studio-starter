import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/empty.mdx'

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
