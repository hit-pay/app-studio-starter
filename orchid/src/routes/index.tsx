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
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {docComponentsByName().map((item) => (
          <Link key={item.to} to={item.to} className="block min-w-0">
            <ListItem className="h-full">
              <ListItemBody>
                <ListItemTitle>{item.name}</ListItemTitle>
                <ListItemDescription className="text-muted-foreground">
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
