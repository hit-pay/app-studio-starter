import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/dialog.mdx'

export const Route = createFileRoute('/ui/dialog')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/dialog">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
