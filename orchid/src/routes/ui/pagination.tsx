import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/pagination.mdx'

export const Route = createFileRoute('/ui/pagination')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/pagination">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
