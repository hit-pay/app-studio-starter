import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { AppShell } from '@/components/ui/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Empty } from '@/components/ui/empty'
import {
  ListItem,
  ListItemBody,
  ListItemDescription,
  ListItemDetail,
  ListItemMeta,
  ListItemTitle,
  ListItemTrailing,
} from '@/components/ui/list-item'
import { PageTitle } from '@/components/ui/page-title'
import { SchemaForm, useSchemaForm, type SchemaFormField } from '@/components/ui/schema-form'
import { type SchemaTableRow } from '@/components/ui/schema-table'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/shift-handover')({
  component: ShiftHandoverDocsPage,
})

const OUTLETS = [
  { value: 'orchard', label: 'Orchard flagship' },
  { value: 'tampines', label: 'Tampines mall' },
  { value: 'jb', label: 'JB outlet' },
]

const SHIFTS = [
  { value: 'morning', label: 'Morning → Afternoon' },
  { value: 'afternoon', label: 'Afternoon → Night' },
  { value: 'night', label: 'Night → Morning' },
]

const SEED: SchemaTableRow[] = [
  {
    id: 'ho-1',
    outlet: 'Orchard flagship',
    shift: 'Morning → Afternoon',
    notes: 'Card reader 2 is flaky. Spare rolls in the drawer.',
    created: '2026-08-27',
    status: 'Open',
  },
  {
    id: 'ho-2',
    outlet: 'Tampines mall',
    shift: 'Afternoon → Night',
    notes: 'VIP pickup at 9pm. Do not close early.',
    created: '2026-08-26',
    status: 'Done',
  },
  {
    id: 'ho-3',
    outlet: 'JB outlet',
    shift: 'Night → Morning',
    notes: 'Cash drawer counted. Float 500 MYR.',
    created: '2026-08-26',
    status: 'Done',
  },
]

function submitFields(row?: SchemaTableRow | null): SchemaFormField[] {
  const outlet =
    OUTLETS.find((item) => item.label === row?.outlet)?.value ?? 'orchard'
  const shift =
    SHIFTS.find((item) => item.label === row?.shift)?.value ?? 'morning'

  return [
    {
      key: 'section',
      title: 'This shift',
      type: 'section',
      description: 'What the next team needs.',
    },
    {
      key: 'outlet',
      title: 'Outlet',
      type: 'select',
      required: true,
      options: OUTLETS,
      value: outlet,
    },
    {
      key: 'shift',
      title: 'Handover',
      type: 'select',
      required: true,
      options: SHIFTS,
      value: shift,
    },
    { key: 'logged_at', title: 'Logged at', type: 'datetime', value: '' },
    {
      key: 'notes',
      title: 'Notes',
      type: 'textarea',
      required: true,
      minLength: 12,
      placeholder: 'Incidents, VIP, hardware, cash…',
      value: row ? String(row.notes) : '',
    },
    {
      key: 'severity',
      title: 'Anything blocking?',
      type: 'radio',
      options: [
        { value: 'none', label: 'All clear' },
        { value: 'watch', label: 'Watch' },
        { value: 'block', label: 'Blocking' },
      ],
      value: row?.status === 'Open' ? 'watch' : 'none',
    },
  ]
}

function settingsFields(): SchemaFormField[] {
  return [
    {
      key: 'notify',
      title: 'Ping the next shift on WhatsApp',
      type: 'section-item',
      value: true,
    },
    {
      key: 'default_outlet',
      title: 'Default outlet',
      type: 'select',
      options: OUTLETS,
      value: 'orchard',
    },
  ]
}

function ShiftHandoverApp() {
  const [rows, setRows] = useState(SEED)
  const [sheet, setSheet] = useState<null | 'create' | SchemaTableRow>(null)
  const [formKey, setFormKey] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [remove, setRemove] = useState<SchemaTableRow | null>(null)

  const editing = sheet && sheet !== 'create' ? sheet : null

  const submit = useSchemaForm({
    fields: useMemo(
      () => submitFields(editing),
      [editing, formKey],
    ),
    onSubmit: (values) => {
      const outlet = OUTLETS.find((item) => item.value === values.outlet)?.label ?? String(values.outlet)
      const shift = SHIFTS.find((item) => item.value === values.shift)?.label ?? String(values.shift)
      const status = values.severity === 'none' ? 'Done' : 'Open'
      const notes = String(values.notes ?? '')

      if (editing) {
        setRows((current) =>
          current.map((row) =>
            row.id === editing.id ? { ...row, outlet, shift, notes, status } : row,
          ),
        )
        toast.add({ title: 'Handover updated', type: 'success' })
      } else {
        setRows((current) => [
          {
            id: `ho-${Date.now()}`,
            outlet,
            shift,
            notes,
            created: new Date().toISOString().slice(0, 10),
            status,
          },
          ...current,
        ])
        toast.add({ title: 'Handover submitted', type: 'success' })
      }

      setSheet(null)
      setFormKey((key) => key + 1)
    },
  })

  const settings = useSchemaForm({
    fields: settingsFields(),
    onSubmit: () => {
      toast.add({ title: 'Settings saved', type: 'success' })
      setSettingsOpen(false)
    },
  })

  return (
    <AppShell
      header={
        <div className="px-4 py-3 md:px-6 md:py-4">
          <PageTitle
            title="Shift Handover"
            description="Keep every shift in the loop"
            badge={
              <Badge color="Blue" style="Background">
                Staff
              </Badge>
            }
            actions={
              <>
                <Button variant="Secondary" style="Border" onClick={() => setSettingsOpen(true)}>
                  Settings
                </Button>
                <Button
                  variant="Primary"
                  onClick={() => {
                    setFormKey((key) => key + 1)
                    setSheet('create')
                  }}
                >
                  New handover
                </Button>
              </>
            }
          />
        </div>
      }
    >
      {rows.length === 0 ? (
        <Empty
          title="No handovers yet"
          description="Leave a note for the next team."
          actions={
            <Button
              variant="Primary"
              onClick={() => {
                setFormKey((key) => key + 1)
                setSheet('create')
              }}
            >
              Submit first handover
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((row) => (
            <ListItem key={row.id}>
              <ListItemBody>
                <ListItemTitle>{String(row.outlet)}</ListItemTitle>
                <ListItemDescription>{String(row.notes)}</ListItemDescription>
                <ListItemMeta>
                  <ListItemDetail>{String(row.shift)}</ListItemDetail>
                  <ListItemDetail>{String(row.created)}</ListItemDetail>
                  <Badge
                    color={row.status === 'Open' ? 'Orange' : 'Green'}
                    style="Background"
                  >
                    {String(row.status)}
                  </Badge>
                </ListItemMeta>
              </ListItemBody>
              <ListItemTrailing>
                <Button
                  variant="Secondary"
                  style="Border"
                  size="Small"
                  onClick={() => {
                    setFormKey((key) => key + 1)
                    setSheet(row)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="Secondary"
                  style="Border"
                  size="Small"
                  onClick={() => setRemove(row)}
                >
                  Delete
                </Button>
              </ListItemTrailing>
            </ListItem>
          ))}
        </div>
      )}

      <Dialog open={sheet != null} onOpenChange={(open) => !open && setSheet(null)}>
        <DialogContent
          title={editing ? 'Edit handover' : 'New handover'}
          description="Record what the next shift needs to know."
          confirmLabel={editing ? 'Save' : 'Submit'}
          onConfirm={() => void submit.submit()}
        >
          <SchemaForm key={formKey} form={submit} />
        </DialogContent>
      </Dialog>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent
          title="Settings"
          description="Defaults for this demo only."
          confirmLabel="Save"
          onConfirm={() => void settings.submit()}
        >
          <SchemaForm form={settings} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(remove)}
        onOpenChange={(open) => !open && setRemove(null)}
        type="Delete"
        title="Delete handover?"
        message={`Remove the ${remove?.outlet ?? ''} note from the log?`}
        onConfirm={() => {
          if (!remove) return
          setRows((current) => current.filter((row) => row.id !== remove.id))
          toast.add({ title: 'Handover deleted', type: 'success' })
          setRemove(null)
        }}
      />
    </AppShell>
  )
}

function ShiftHandoverDocsPage() {
  return (
    <DocExamplePage to="/shift-handover" fill>
      <ShiftHandoverApp />
    </DocExamplePage>
  )
}
