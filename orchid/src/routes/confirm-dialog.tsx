import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { useConfirmDialog } from '@/components/ui/confirm-dialog'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/confirm-dialog')({
  component: ConfirmDialogExamplesPage,
})

function ConfirmDialogExamplesPage() {
  const confirm = useConfirmDialog()

  async function show(options: Parameters<typeof confirm>[0]) {
    const confirmed = await confirm(options)
    toast.add({
      title: confirmed ? 'Action confirmed' : 'Action cancelled',
      type: confirmed ? 'success' : 'info',
    })
  }

  return (
    <DocExamplePage
      to="/confirm-dialog"
      usage={`import { useConfirmDialog } from '@/components/ui/confirm-dialog'

function DeleteButton() {
  const confirm = useConfirmDialog()

  async function handleDelete() {
    const confirmed = await confirm({
      type: 'delete',
      title: 'Are you sure?',
      message: 'Do you want to delete this payment link?',
      description: "The action can't be undone.",
      confirmLabel: 'Delete',
    })

    if (!confirmed) return
    // Run the destructive action.
  }

  return <Button onClick={handleDelete}>Delete payment link</Button>
}`}
    >
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
    </DocExamplePage>
  )
}
