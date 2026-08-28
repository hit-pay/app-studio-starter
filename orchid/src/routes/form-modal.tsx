import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { DocCodePanel } from '@/components/doc/doc-code-panel'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { FormModal } from '@/components/ui/form-modal'
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
} from '@/components/ui/schema-form'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/form-modal')({
  component: FormModalExamplesPage,
})

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

const FORM_MODAL_USAGE = `import { useState } from 'react'
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

function FormModalExample() {
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
  )
}`

function FormModalExamplesPage() {
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
    <DocExamplePage to="/form-modal">
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
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Usage
          </p>
          <DocCodePanel filename="form-modal.tsx" code={FORM_MODAL_USAGE} />
        </div>
      </div>
    </DocExamplePage>
  )
}
