import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/list.mdx'

export const Route = createFileRoute('/base-ui/list')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/list">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
