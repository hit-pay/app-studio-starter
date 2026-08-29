import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import IndexDocs from '../../content/docs/index.mdx'

export const Route = createFileRoute('/')({ component: IndexPage })

function IndexPage() {
  return (
    <DocExamplePage to="/">
      <DocMdx><IndexDocs /></DocMdx>
    </DocExamplePage>
  )
}
