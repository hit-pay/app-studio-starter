import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/date-picker.mdx'

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
