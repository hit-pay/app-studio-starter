import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/progress.mdx'

export const Route = createFileRoute('/progress')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/progress">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
