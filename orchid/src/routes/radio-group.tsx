import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/radio-group.mdx'

export const Route = createFileRoute('/radio-group')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/radio-group">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
