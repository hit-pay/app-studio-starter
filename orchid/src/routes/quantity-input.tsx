import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import QuantityInputDocs from '../../content/docs/components/quantity-input.mdx'

export const Route = createFileRoute('/quantity-input')({
  component: QuantityInputExamplesPage,
})

function QuantityInputExamplesPage() {
  return (
    <DocExamplePage to="/quantity-input">
      <DocMdx>
        <QuantityInputDocs />
      </DocMdx>
    </DocExamplePage>
  )
}
