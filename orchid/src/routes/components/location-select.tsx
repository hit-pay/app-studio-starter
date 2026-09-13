import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/docs/doc-example-page'
import { DocMdx } from '@/docs/doc-mdx'
import Docs from '../../../docs/components/location-select.mdx'

export const Route = createFileRoute('/components/location-select')({
  component: Page,
})

function Page() {
  return (
    <DocExamplePage to="/components/location-select">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  )
}
