import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/product-category-select.mdx'

export const Route = createFileRoute('/components/product-category-select')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/product-category-select">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
