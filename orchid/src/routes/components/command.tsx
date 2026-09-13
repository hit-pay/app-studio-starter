import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/command.mdx'

export const Route = createFileRoute('/components/command')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/command">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
