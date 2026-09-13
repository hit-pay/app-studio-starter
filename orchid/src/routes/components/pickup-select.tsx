import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/pickup-select.mdx'

export const Route = createFileRoute('/components/pickup-select')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/pickup-select">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
