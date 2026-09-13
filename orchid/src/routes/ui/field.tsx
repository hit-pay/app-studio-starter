import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/field.mdx'

export const Route = createFileRoute('/ui/field')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/field">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
