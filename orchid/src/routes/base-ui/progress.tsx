import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/progress.mdx'

export const Route = createFileRoute('/base-ui/progress')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/progress">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
