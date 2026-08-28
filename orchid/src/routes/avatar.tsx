import { createFileRoute } from '@tanstack/react-router'
import { CheckIcon } from 'lucide-react'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/ui/avatar'

export const Route = createFileRoute('/avatar')({
  component: AvatarExamplesPage,
})

const SIZES = ['sm', 'default', 'lg'] as const
const PHOTO =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop'
const ALEX_PHOTO =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop'

function AvatarExamplesPage() {
  return (
    <DocExamplePage
      to="/avatar"
      usage={`import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Priya Nair" />
  <AvatarFallback>PN</AvatarFallback>
  <AvatarBadge />
</Avatar>

<AvatarGroup>
  <Avatar>
    <AvatarImage src="/priya.jpg" alt="Priya Nair" />
    <AvatarFallback>PN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/alex.jpg" alt="Alex Turner" />
    <AvatarFallback>AT</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+2</AvatarGroupCount>
</AvatarGroup>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Image and fallback
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar>
            <AvatarImage src={PHOTO} alt="Priya Nair" />
            <AvatarFallback>PN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/missing-avatar.jpg" alt="Alex Turner" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <Avatar variant="business">
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Size
        </p>
        <div className="flex flex-wrap items-end gap-4">
          {SIZES.map((size) => (
            <Avatar key={size} size={size}>
              <AvatarFallback>PN</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Badge
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar size="sm">
            <AvatarImage src={PHOTO} alt="Priya Nair" />
            <AvatarFallback>PN</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <Avatar>
            <AvatarImage src={PHOTO} alt="Priya Nair" />
            <AvatarFallback>PN</AvatarFallback>
            <AvatarBadge>
              <CheckIcon />
            </AvatarBadge>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>AT</AvatarFallback>
            <AvatarBadge>
              <CheckIcon />
            </AvatarBadge>
          </Avatar>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Group
        </p>
        <AvatarGroup>
          <Avatar>
            <AvatarImage src={PHOTO} alt="Priya Nair" />
            <AvatarFallback>PN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src={ALEX_PHOTO} alt="Alex Turner" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <Avatar variant="business">
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+2</AvatarGroupCount>
        </AvatarGroup>
      </div>
    </DocExamplePage>
  )
}
