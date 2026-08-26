import { createFileRoute, Link } from '@tanstack/react-router'
import { docComponentsByName } from '@/components/doc/doc-components'
import { ListItem, ListItemBody, ListItemDescription, ListItemTitle } from '@/components/ui/list-item'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/')({
  component: ExamplesIndexPage,
})

function ExamplesIndexPage() {
  return (
    <DocExamplePage to="/">
      <Link
        to="/setup"
        className="flex items-center justify-between rounded-xl border border-solid border-oc-border bg-oc-info-soft px-4 py-3 text-sm text-oc-foreground"
      >
        <span>
          <span className="font-medium">Setup guide</span>
          <span className="text-oc-muted-foreground"> — CSS tokens, any AI harness, and shadcn add</span>
        </span>
        <span className="text-oc-muted-foreground">→</span>
      </Link>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {docComponentsByName().map((item) => (
          <Link key={item.to} to={item.to} className="block min-w-0">
            <ListItem className="h-full">
              <ListItemBody>
                <ListItemTitle>{item.name}</ListItemTitle>
                <ListItemDescription className="text-oc-muted-foreground">
                  {item.description}
                </ListItemDescription>
              </ListItemBody>
            </ListItem>
          </Link>
        ))}
      </div>
    </DocExamplePage>
  )
}
