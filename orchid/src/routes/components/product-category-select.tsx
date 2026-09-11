import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/product-category-select.mdx'

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
