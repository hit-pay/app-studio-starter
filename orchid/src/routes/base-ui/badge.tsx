import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/badge.mdx'

export const Route = createFileRoute('/base-ui/badge')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/badge">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
