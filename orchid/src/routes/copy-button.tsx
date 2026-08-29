import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/copy-button.mdx'

export const Route = createFileRoute('/copy-button')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/copy-button">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
