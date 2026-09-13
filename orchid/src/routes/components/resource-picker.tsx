import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/resource-picker.mdx'

export const Route = createFileRoute('/components/resource-picker')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/resource-picker">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
