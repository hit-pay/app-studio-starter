import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/select.mdx'

export const Route = createFileRoute('/components/select')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/select">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
