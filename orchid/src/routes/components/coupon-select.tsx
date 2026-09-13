import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/coupon-select.mdx'

export const Route = createFileRoute('/components/coupon-select')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/coupon-select">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
