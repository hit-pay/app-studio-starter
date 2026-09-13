import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/ui/file-upload.mdx'

export const Route = createFileRoute('/ui/file-upload')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/ui/file-upload">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
