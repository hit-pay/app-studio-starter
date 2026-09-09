import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/dialog.mdx'

export const Route = createFileRoute('/base-ui/dialog')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/dialog">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
