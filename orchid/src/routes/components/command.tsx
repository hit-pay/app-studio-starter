import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/command.mdx'

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
