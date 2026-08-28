import { createFileRoute } from '@tanstack/react-router'

import { DocCodePanel } from '@/components/doc/doc-code-panel'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { useConfirmationModal } from '@/components/ui/confirmation-modal'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/confirmation-modal')({
  component: ConfirmationModalExamplesPage,
})

const CONFIRMATION_MODAL_USAGE = `import { useConfirmationModal } from '@/components/ui/confirmation-modal'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'

function ConfirmationModalExamples() {
  const confirm = useConfirmationModal()

  async function show(options: Parameters<typeof confirm>[0]) {
    const confirmed = await confirm(options)
    toast.add({
      title: confirmed ? 'Action confirmed' : 'Action cancelled',
      type: confirmed ? 'success' : 'info',
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="destructive"
        onClick={() =>
          show({
            type: 'delete',
            message: 'Do you want to delete this payment link?',
            description: "The action can't be undone.",
          })
        }
      >
        Delete
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          show({
            type: 'warning',
            message: 'Continue with this high-risk action?',
            description: 'Review the details before continuing.',
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          show({
            type: 'success',
            message: 'The payment link was created successfully.',
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          show({
            type: 'question',
            message: 'Do you want to publish these changes?',
          })
        }
      >
        Question
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          show({
            type: 'delete',
            message: 'Delete the weekend-workshop payment link?',
            description: "The action can't be undone.",
            confirmPhrase: 'weekend-workshop',
          })
        }
      >
        Type to confirm
      </Button>
    </div>
  )
}`

function ConfirmationModalExamplesPage() {
  const confirm = useConfirmationModal()

  async function show(options: Parameters<typeof confirm>[0]) {
    const confirmed = await confirm(options)
    toast.add({
      title: confirmed ? 'Action confirmed' : 'Action cancelled',
      type: confirmed ? 'success' : 'info',
    })
  }

  return (
    <DocExamplePage to="/confirmation-modal">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="destructive"
            onClick={() =>
              show({
                type: 'delete',
                message: 'Do you want to delete this payment link?',
                description: "The action can't be undone.",
              })
            }
          >
            Delete
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              show({
                type: 'warning',
                message: 'Continue with this high-risk action?',
                description: 'Review the details before continuing.',
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              show({
                type: 'success',
                message: 'The payment link was created successfully.',
              })
            }
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              show({
                type: 'question',
                message: 'Do you want to publish these changes?',
              })
            }
          >
            Question
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              show({
                type: 'delete',
                message: 'Delete the weekend-workshop payment link?',
                description: "The action can't be undone.",
                confirmPhrase: 'weekend-workshop',
              })
            }
          >
            Type to confirm
          </Button>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Usage
          </p>
          <DocCodePanel
            filename="confirmation-modal.tsx"
            code={CONFIRMATION_MODAL_USAGE}
          />
        </div>
      </div>
    </DocExamplePage>
  )
}
