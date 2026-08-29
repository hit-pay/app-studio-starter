import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/field.mdx'

export const Route = createFileRoute('/field')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/field">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
