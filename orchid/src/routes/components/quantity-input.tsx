import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import QuantityInputDocs from '../../../docs/components/quantity-input.mdx'

export const Route = createFileRoute('/components/quantity-input')({
  component: QuantityInputExamplesPage,
})

function QuantityInputExamplesPage() {
  return (
    <DocExamplePage to="/components/quantity-input">
      <DocMdx>
        <QuantityInputDocs />
      </DocMdx>
    </DocExamplePage>
  )
}
