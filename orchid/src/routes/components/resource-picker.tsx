import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/resource-picker.mdx'

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
