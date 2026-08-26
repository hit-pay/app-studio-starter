import { createFileRoute } from '@tanstack/react-router'
import { CircleIcon } from 'lucide-react'
import { Chip, UserChip } from '@/components/ui/chip'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/chip')({
  component: ChipExamplesPage,
})

const COLORS = [
  'Blue',
  'Purple',
  'Orange',
  'Red',
  'LightRed',
  'White',
  'DarkBlue',
  'Grey',
  'Tosca',
  'Green',
] as const

const TYPES = ['Background', 'Border', 'Transparent'] as const

function ChipExamplesPage() {
  return (
    <DocExamplePage to="/chip">
        <div className="space-y-6">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Global Chip
          </p>
          <div className="space-y-4">
            {COLORS.map((color) => (
              <div key={color} className="flex flex-wrap items-center gap-3">
                {TYPES.map((type) => (
                  <Chip key={type} color={color} type={type}>
                    Text
                  </Chip>
                ))}
                <Chip color={color} icon={<CircleIcon />}>
                  Text
                </Chip>
                <Chip color={color} onRemove={() => {}}>
                  Text
                </Chip>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            User Type Chip
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <UserChip type="Owner" />
            <UserChip type="Admin" />
            <UserChip type="Manager" />
            <UserChip type="Cashier" />
          </div>
        </div>
      </DocExamplePage>
  )
}
