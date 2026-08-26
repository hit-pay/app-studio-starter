import { createFileRoute } from '@tanstack/react-router'
import { CopyIcon, SquareArrowOutUpRightIcon } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  GroupIcon,
  GroupIconButton,
  GroupIconDivider,
  GroupIconLink,
  GroupIconMenu,
} from '@/components/ui/group-icon'

export const Route = createFileRoute('/group-icon')({
  component: GroupIconExamplesPage,
})

function ExampleGroup({ type }: { type?: 'Default' | 'Border' }) {
  return (
    <GroupIcon type={type}>
      <GroupIconMenu
        menu={
          <>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </>
        }
      />
      <GroupIconDivider />
      <GroupIconLink href="https://hitpayapp.com" aria-label="Open new link">
        <SquareArrowOutUpRightIcon />
      </GroupIconLink>
      <GroupIconDivider />
      <GroupIconButton
        aria-label="Copy"
        onClick={() => navigator.clipboard.writeText('https://hitpayapp.com')}
      >
        <CopyIcon />
      </GroupIconButton>
    </GroupIcon>
  )
}

function GroupIconExamplesPage() {
  return (
    <DocExamplePage to="/group-icon">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default
          </p>
          <ExampleGroup type="Default" />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Border
          </p>
          <ExampleGroup type="Border" />
        </div>
      </DocExamplePage>
  )
}
