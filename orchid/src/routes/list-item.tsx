import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/list-item.mdx'

export const Route = createFileRoute('/list-item')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/list-item">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
