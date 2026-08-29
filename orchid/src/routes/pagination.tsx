import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/pagination.mdx'

export const Route = createFileRoute('/pagination')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/pagination">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
