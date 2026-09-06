<!-- Generated from content/docs/components/card.mdx. Do not edit. -->

# Card

shadcn-compatible content card with header, title, description, action, and footer.

## Example

```tsx
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function CardDemo() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Outlet hours</CardTitle>
            <CardDescription>Shown on the customer receipt and booking page.</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            Monday–Friday 10:00–21:00. Kitchen closes 30 minutes earlier.
          </CardContent>
          <CardFooter>
            <Button size="sm">Save</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Small
        </p>
        <Card size="sm">
          <CardHeader>
            <CardTitle>POS terminal</CardTitle>
            <CardDescription>Last seen 2 minutes ago.</CardDescription>
          </CardHeader>
          <CardContent>Counter 1 · Online</CardContent>
        </Card>
      </div>
    </div>
  )
}

export { CardDemo }
```

## Usage

```tsx
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Outlet hours</CardTitle>
    <CardDescription>Shown on the customer receipt.</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm">
        Edit
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>Monday–Friday 10:00–21:00.</CardContent>
  <CardFooter>
    <Button size="sm">Save</Button>
  </CardFooter>
</Card>
```

Use `size="sm"` for compact cards. Prefer `StatCard`, `ChoiceCard`, or `CustomerCard` when those patterns fit.
