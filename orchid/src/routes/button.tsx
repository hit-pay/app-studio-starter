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
      {TYPES.map((variant) => (
        <div key={variant} className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            {variant}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {STYLES.map((style) => (
              <Button key={style} variant={variant} style={style}>
                {STYLE_LABEL[style]}
              </Button>
            ))}
            <Button variant={variant}>
              <CircleIcon />
              {TYPE_LABEL[variant]}
            </Button>
            <Button variant={variant} iconOnly>
              <CircleIcon />
            </Button>
            <Button variant={variant} menu={MENU}>
              <CircleIcon />
              {TYPE_LABEL[variant]}
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
          {TYPES.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {TYPE_LABEL[variant]}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice actions
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="Primary">Create invoice</Button>
          <Button variant="Secondary" style="Border">
            Send payment link
          </Button>
          <Button variant="Secondary" style="Transparent">
            Void
          </Button>
          <Button variant="Destructive">Refund</Button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Point of sale
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="Primary" size="Big">
            Charge SGD 48.00
          </Button>
          <Button variant="Secondary" style="Border">
            Open terminal
          </Button>
          <Button variant="Destructive" size="Small">
            Void sale
          </Button>
        </div>
      </div>
    </DocExamplePage>
  )
}
