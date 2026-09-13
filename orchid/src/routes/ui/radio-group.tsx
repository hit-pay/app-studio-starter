import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/radio-group.mdx'

export const Route = createFileRoute('/ui/radio-group')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/radio-group">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
