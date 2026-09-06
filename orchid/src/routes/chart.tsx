import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../content/docs/components/chart.mdx'

export const Route = createFileRoute('/chart')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/chart">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
