import { createFileRoute } from '@tanstack/react-router'
import { CircleIcon, PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const Route = createFileRoute('/dropdown')({
  component: DropdownExamplesPage,
})

function MenuItem({
  variant = 'default',
}: {
  variant?: 'default' | 'destructive'
}) {
  return (
    <DropdownMenuItem variant={variant}>
      <PencilIcon />
      Menu
    </DropdownMenuItem>
  )
}

function OpenButton({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        className="inline-flex w-fit"
        render={
          <Button type="Secondary" size="Small">
            Open
          </Button>
        }
      />
      <DropdownMenuContent align="start">{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

function DropdownExamplesPage() {
  return (
    <DocExamplePage to="/dropdown">
        <div className="space-y-6">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Dropdown Menu
          </p>
          <OpenButton>
            <MenuItem />
            <MenuItem />
            <DropdownMenuSeparator />
            <MenuItem variant="destructive" />
          </OpenButton>
        </div>

        <div className="space-y-6">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Dropdown
          </p>
          <OpenButton>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Group Title</DropdownMenuLabel>
              <MenuItem />
              <MenuItem />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Group Title</DropdownMenuLabel>
              <MenuItem />
              <MenuItem />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <MenuItem variant="destructive" />
          </OpenButton>
        </div>

        <div className="space-y-6">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Dropdown in Button
          </p>
          <Button
            type="Secondary"
            size="Small"
            menu={
              <>
                <MenuItem />
                <MenuItem />
                <DropdownMenuSeparator />
                <MenuItem variant="destructive" />
              </>
            }
          >
            <CircleIcon />
            Button Text
          </Button>
        </div>
      </DocExamplePage>
  )
}
