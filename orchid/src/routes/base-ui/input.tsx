import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/input.mdx'

export const Route = createFileRoute('/base-ui/input')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/input">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
