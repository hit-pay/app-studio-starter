import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/tax-select.mdx'

export const Route = createFileRoute('/components/tax-select')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/tax-select">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
