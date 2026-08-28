import { createFileRoute, Link } from '@tanstack/react-router'
import {
  docBlocksByName,
  docComponentsByName,
  docFormsByName,
} from '@/components/doc/doc-components'
import { ListItem, ListItemBody, ListItemDescription, ListItemTitle } from '@/components/ui/list-item'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/')({
  component: ExamplesIndexPage,
})

function ExamplesIndexPage() {
  return (
    <DocExamplePage to="/">
      <Link
        to="/installation"
        className="flex items-center justify-between rounded-xl border border-solid border-oc-border bg-oc-info-soft px-4 py-3 text-sm text-oc-foreground"
      >
        <span>
          <span className="font-medium">Installation</span>
          <span className="text-oc-muted-foreground">
            {' '}
            — create a new app with Cursor, Claude Code, or another AI agent
          </span>
        </span>
        <span className="text-oc-muted-foreground">→</span>
      </Link>
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-oc-muted-foreground">Component</h2>
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
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-oc-muted-foreground">Form</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {docFormsByName().map((item) => (
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
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-oc-muted-foreground">Block</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {docBlocksByName().map((item) => (
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
      </div>
    </DocExamplePage>
  )
}
