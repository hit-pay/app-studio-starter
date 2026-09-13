import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/copy-button.mdx'

export const Route = createFileRoute('/components/copy-button')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/copy-button">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
