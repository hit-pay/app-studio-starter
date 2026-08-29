import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/label.mdx'

export const Route = createFileRoute('/label')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/label">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
