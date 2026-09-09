import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/empty.mdx'

export const Route = createFileRoute('/base-ui/empty')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/empty">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
