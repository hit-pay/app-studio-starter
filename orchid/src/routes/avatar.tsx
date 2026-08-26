import { createFileRoute } from '@tanstack/react-router'
import { Avatar } from '@/components/ui/avatar'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/avatar')({
  component: AvatarExamplesPage,
})

const SIZES = [24, 28, 32, 40, 48, 64] as const
const PHOTO =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop'
const ALEX_PHOTO =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop'

function AvatarExamplesPage() {
  return (
    <DocExamplePage to="/avatar">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Size
        </p>
        <div className="flex flex-wrap items-end gap-4">
          {SIZES.map((size) => (
            <Avatar key={size} size={size} type="Default">
              PN
            </Avatar>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Type
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar type="Default">PN</Avatar>
          <Avatar type="Business">H</Avatar>
          <Avatar type="Image" src={PHOTO} alt="Priya Nair" />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Customers
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar type="Image" src={PHOTO} alt="Priya Nair" />
          <Avatar type="Image" src={ALEX_PHOTO} alt="Alex Turner" />
          <Avatar type="Default">AT</Avatar>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Business
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar type="Business">H</Avatar>
          <Avatar type="Business" size={48}>
            HP
          </Avatar>
          <Avatar type="Default" size={40}>
            POS
          </Avatar>
        </div>
      </div>
    </DocExamplePage>
  )
}
