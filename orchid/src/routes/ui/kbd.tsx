import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/kbd.mdx'

export const Route = createFileRoute('/ui/kbd')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/kbd">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
