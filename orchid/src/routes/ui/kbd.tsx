import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/kbd.mdx'

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
