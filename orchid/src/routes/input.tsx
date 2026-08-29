import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/input.mdx'

export const Route = createFileRoute('/input')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/input">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
