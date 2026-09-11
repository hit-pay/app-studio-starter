import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DocMdx } from '@/components/doc/doc-mdx'
import Docs from '../../../content/docs/components/location-select.mdx'

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
