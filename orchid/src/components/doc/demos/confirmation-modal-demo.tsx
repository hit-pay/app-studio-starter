import { Button } from '@/components/ui/button'
import { useConfirmationModal } from '@/components/ui/confirmation-modal'

function ConfirmationModalDemo() {
  const confirm = useConfirmationModal()

  async function show(options: Parameters<typeof confirm>[0]) {
    await confirm(options)
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
}

export { ConfirmationModalDemo }
