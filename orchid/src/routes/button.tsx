import { createFileRoute } from '@tanstack/react-router'
import { CircleIcon, PencilIcon, SendIcon, Trash2Icon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

export const Route = createFileRoute('/button')({
  component: ButtonExamplesPage,
})

const TYPES = ['Primary', 'Secondary', 'Destructive'] as const
const STYLES = ['Default', 'Border', 'Transparent'] as const
const SIZES = ['Small', 'Default', 'Big'] as const

const TYPE_LABEL: Record<(typeof TYPES)[number], string> = {
  Primary: 'Create invoice',
  Secondary: 'Send payment link',
  Destructive: 'Refund',
}

const STYLE_LABEL: Record<(typeof STYLES)[number], string> = {
  Default: 'Charge',
  Border: 'Send payment link',
  Transparent: 'Void',
}

const SIZE_LABEL: Record<(typeof SIZES)[number], string> = {
  Small: 'Charge',
  Default: 'Create invoice',
  Big: 'Send payment link',
}

const MENU = (
  <>
    <DropdownMenuItem>
      <PencilIcon />
      Edit invoice
    </DropdownMenuItem>
    <DropdownMenuItem>
      <SendIcon />
      Send payment link
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <Trash2Icon />
      Void
    </DropdownMenuItem>
  </>
)

function ButtonExamplesPage() {
  return (
    <DocExamplePage to="/button">
      {TYPES.map((type) => (
        <div key={type} className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            {type}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {STYLES.map((style) => (
              <Button key={style} type={type} style={style}>
                {STYLE_LABEL[style]}
              </Button>
            ))}
            <Button type={type}>
              <CircleIcon />
              {TYPE_LABEL[type]}
            </Button>
            <Button type={type} iconOnly>
              <CircleIcon />
            </Button>
            <Button type={type} menu={MENU}>
              <CircleIcon />
              {TYPE_LABEL[type]}
            </Button>
          </div>
        </div>
      ))}

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Size
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {SIZES.map((size) => (
            <Button key={size} size={size}>
              {SIZE_LABEL[size]}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Disabled
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {TYPES.map((type) => (
            <Button key={type} type={type} disabled>
              {TYPE_LABEL[type]}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice actions
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="Primary">Create invoice</Button>
          <Button type="Secondary" style="Border">
            Send payment link
          </Button>
          <Button type="Secondary" style="Transparent">
            Void
          </Button>
          <Button type="Destructive">Refund</Button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Point of sale
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="Primary" size="Big">
            Charge SGD 48.00
          </Button>
          <Button type="Secondary" style="Border">
            Open terminal
          </Button>
          <Button type="Destructive" size="Small">
            Void sale
          </Button>
        </div>
      </div>
    </DocExamplePage>
  )
}
