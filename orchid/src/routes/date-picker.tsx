import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/date-picker.mdx'

export const Route = createFileRoute('/date-picker')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/date-picker">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
