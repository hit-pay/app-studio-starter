import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/confirmation-modal.mdx'

export const Route = createFileRoute('/components/confirmation-modal')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/confirmation-modal">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
