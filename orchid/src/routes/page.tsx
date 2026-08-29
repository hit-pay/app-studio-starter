import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/page.mdx'

export const Route = createFileRoute('/page')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/page">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
