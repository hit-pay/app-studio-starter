import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/aspect-ratio.mdx'

export const Route = createFileRoute('/base-ui/aspect-ratio')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/aspect-ratio">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
