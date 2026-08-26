import { createFileRoute } from '@tanstack/react-router'
import { CircleIcon, PencilIcon, ToggleLeftIcon, Trash2Icon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

export const Route = createFileRoute('/button')({
  component: ButtonExamplesPage,
})

const TYPES = ['Primary', 'Secondary', 'Destructive'] as const
const STYLES = ['Default', 'Border', 'Transparent'] as const
const SIZES = ['Small', 'Default', 'Big'] as const

const MENU = (
  <>
    <DropdownMenuItem>
      <PencilIcon />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem>
      <ToggleLeftIcon />
      Unpublish
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <Trash2Icon />
      Delete
    </DropdownMenuItem>
  </>
)

function ButtonExamplesPage() {
  return (
    <DocExamplePage to="/button">
      {TYPES.map((type) => (
        <div key={type} className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {type}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {STYLES.map((style) => (
              <Button key={style} type={type} style={style}>
                Button Text
              </Button>
            ))}
            <Button type={type}>
              <CircleIcon />
              Button Text
            </Button>
            <Button type={type} iconOnly>
              <CircleIcon />
            </Button>
            <Button type={type} menu={MENU}>
              <CircleIcon />
              Button Text
            </Button>
          </div>
        </div>
      ))}

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Size
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {SIZES.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Disabled
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {TYPES.map((type) => (
            <Button key={type} type={type} disabled>
              {type}
            </Button>
          ))}
        </div>
      </div>
    </DocExamplePage>
  )
}
