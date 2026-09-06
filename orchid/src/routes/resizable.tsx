import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/resizable.mdx'

export const Route = createFileRoute('/resizable')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/resizable">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
