import { createFileRoute } from '@tanstack/react-router'
import { MailIcon, MessageCircleIcon, SmartphoneIcon } from 'lucide-react'
import { ClickableOption, ClickableOptionGroup } from '@/components/ui/clickable-option'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/clickable-option')({
  component: ClickableOptionExamplesPage,
})

function ClickableOptionExamplesPage() {
  return (
    <DocExamplePage to="/clickable-option">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Left
          </p>
          <ClickableOptionGroup defaultValue="email">
            <ClickableOption
              value="email"
              alignment="Left"
              iconAlign="Left"
              icon={<MailIcon />}
              title="Email"
              description="Send to the customer inbox"
            />
            <ClickableOption
              value="sms"
              alignment="Left"
              iconAlign="Left"
              icon={<SmartphoneIcon />}
              title="SMS"
              description="Send a text message"
            />
            <ClickableOption
              value="chat"
              alignment="Left"
              iconAlign="Left"
              icon={<MessageCircleIcon />}
              title="Chat"
              description="Open in messenger"
            />
          </ClickableOptionGroup>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Center
          </p>
          <ClickableOptionGroup defaultValue="email" alignment="Horizontal">
            <ClickableOption
              value="email"
              alignment="Center"
              iconAlign="Center"
              icon={<MailIcon />}
              title="Email"
              description="Inbox"
              className="flex-1"
            />
            <ClickableOption
              value="sms"
              alignment="Center"
              iconAlign="Center"
              icon={<SmartphoneIcon />}
              title="SMS"
              description="Text"
              className="flex-1"
            />
            <ClickableOption
              value="chat"
              alignment="Center"
              iconAlign="Center"
              icon={<MessageCircleIcon />}
              title="Chat"
              description="Messenger"
              className="flex-1"
            />
          </ClickableOptionGroup>
        </div>
      </DocExamplePage>
  )
}
