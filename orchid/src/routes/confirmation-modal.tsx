import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/confirmation-modal.mdx'

export const Route = createFileRoute('/confirmation-modal')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/confirmation-modal">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
