import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/file-upload.mdx'

export const Route = createFileRoute('/base-ui/file-upload')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/base-ui/file-upload">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
