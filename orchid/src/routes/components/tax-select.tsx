import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/tax-select.mdx'

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
