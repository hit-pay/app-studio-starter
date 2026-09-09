import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/date-picker.mdx'

export const Route = createFileRoute('/components/date-picker')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/date-picker">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
