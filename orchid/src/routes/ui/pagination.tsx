import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/pagination.mdx'

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
