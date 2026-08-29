import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { FormModal } from '@/components/ui/form-modal'
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
} from '@/components/ui/schema-form'
import { toast } from '@/components/ui/toast'

const CUSTOMER_FIELDS: SchemaFormField[] = [
  {
    key: 'name',
    title: 'Name',
    type: 'input',
    required: true,
    value: '',
  },
  {
    key: 'email',
    title: 'Email',
    type: 'input',
    validation: 'email',
    required: true,
    value: '',
  },
]

function FormModalDemo() {
  const [open, setOpen] = useState(false)
  const formId = 'customer-form'
  const form = useSchemaForm({
    fields: CUSTOMER_FIELDS,
    onSubmit: () => {
      toast.add({ title: 'Customer saved', type: 'success' })
      setOpen(false)
    },
  })

  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Customer form
        </p>
        <Button onClick={() => setOpen(true)}>Add customer</Button>
        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="Add customer"
          description="Enter the customer details below."
          actions={{
            cancel: { label: 'Cancel' },
            save: { label: 'Save customer', form: formId },
          }}
        >
          <SchemaForm id={formId} form={form} />
        </FormModal>
      </div>
    </>
  )
}

export { FormModalDemo }
