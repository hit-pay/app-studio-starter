import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  AppShell,
  AppShellNav,
  AppShellNavGroup,
  AppShellNavItem,
} from '@/components/ui/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import {
  DetailList,
  DetailListGrid,
  DetailListHeader,
  DetailListRow,
  DetailListTitle,
} from '@/components/ui/detail-list'
import { PageTitle } from '@/components/ui/page-title'
import { SchemaForm, useSchemaForm, type SchemaFormField } from '@/components/ui/schema-form'
import {
  SchemaTable,
  useSchemaTable,
  type SchemaTableRow,
  type SchemaTableSchema,
} from '@/components/ui/schema-table'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/shift-handover')({
  component: ShiftHandoverDocsPage,
})

type Page = 'submit' | 'log' | 'settings'

const OUTLETS = [
  { value: 'orchard', label: 'Orchard flagship' },
  { value: 'tampines', label: 'Tampines mall' },
  { value: 'jb', label: 'JB outlet' },
]

const LOG_SCHEMA: SchemaTableSchema = {
  selection: true,
  search: { placeholder: 'Search handovers' },
  tabKey: 'status',
  tabs: [
    { key: 'all', title: 'All' },
    { key: 'open', title: 'Open', value: 'Open' },
    { key: 'done', title: 'Done', value: 'Done' },
  ],
  sort: {
    fields: [
      { key: 'created', title: 'Logged' },
      { key: 'outlet', title: 'Outlet' },
    ],
    defaultKey: 'created',
    defaultDir: 'desc',
  },
  pagination: { pageSize: 8, pageSizes: [8, 20] },
  rowActions: ['edit', 'delete'],
  columns: [
    { key: 'outlet', title: 'Outlet', type: 'text', locked: true },
    { key: 'shift', title: 'Shift', type: 'text' },
    { key: 'notes', title: 'Notes', type: 'text' },
    { key: 'created', title: 'Logged', type: 'date' },
    { key: 'status', title: 'Status', type: 'status' },
  ],
}

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

function submitFields(): SchemaFormField[] {
  return [
    { key: 'section', title: 'This shift', type: 'section', description: 'What the next team needs.' },
    {
      key: 'outlet',
      title: 'Outlet',
      type: 'select',
      required: true,
      options: OUTLETS,
      value: 'orchard',
    },
    {
      key: 'shift',
      title: 'Handover',
      type: 'select',
      required: true,
      options: [
        { value: 'morning', label: 'Morning → Afternoon' },
        { value: 'afternoon', label: 'Afternoon → Night' },
        { value: 'night', label: 'Night → Morning' },
      ],
      value: 'morning',
    },
    { key: 'logged_at', title: 'Logged at', type: 'datetime', value: '' },
    {
      key: 'notes',
      title: 'Notes',
      type: 'textarea',
      required: true,
      minLength: 12,
      placeholder: 'Incidents, VIP, hardware, cash…',
      value: '',
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
      value: 'none',
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
  const [page, setPage] = useState<Page>('submit')
  const [rows, setRows] = useState(SEED)
  const [formKey, setFormKey] = useState(0)
  const [edit, setEdit] = useState<SchemaTableRow | null>(null)
  const [remove, setRemove] = useState<SchemaTableRow | null>(null)

  const submit = useSchemaForm({
    fields: useMemo(() => submitFields(), [formKey]),
    onSubmit: (values) => {
      const outlet = OUTLETS.find((item) => item.value === values.outlet)?.label ?? String(values.outlet)
      const shift =
        values.shift === 'afternoon'
          ? 'Afternoon → Night'
          : values.shift === 'night'
            ? 'Night → Morning'
            : 'Morning → Afternoon'
      setRows((current) => [
        {
          id: `ho-${Date.now()}`,
          outlet,
          shift,
          notes: String(values.notes ?? ''),
          created: new Date().toISOString().slice(0, 10),
          status: values.severity === 'none' ? 'Done' : 'Open',
        },
        ...current,
      ])
      setFormKey((key) => key + 1)
      toast.add({ title: 'Handover submitted', type: 'success' })
      setPage('log')
    },
  })

  const settings = useSchemaForm({
    fields: settingsFields(),
    onSubmit: () => {
      toast.add({ title: 'Settings saved', type: 'success' })
    },
  })

  const table = useSchemaTable({ schema: LOG_SCHEMA, data: rows })

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
          />
        </div>
      }
      nav={
        <AppShellNav>
          <AppShellNavGroup>
            <AppShellNavItem active={page === 'submit'} onClick={() => setPage('submit')}>
              Submit a handover
            </AppShellNavItem>
            <AppShellNavItem active={page === 'log'} onClick={() => setPage('log')}>
              Handover log
            </AppShellNavItem>
          </AppShellNavGroup>
          <AppShellNavGroup label="Settings">
            <AppShellNavItem active={page === 'settings'} onClick={() => setPage('settings')}>
              Settings
            </AppShellNavItem>
          </AppShellNavGroup>
        </AppShellNav>
      }
    >
      {page === 'submit' ? (
        <div className="flex max-w-xl flex-col gap-6">
          <PageTitle
            title="Submit a handover"
            description="Record what the next shift needs to know for this outlet."
          />
          <SchemaForm key={formKey} id="handover-submit" form={submit} />
          <Button type="submit" form="handover-submit">
            Submit handover
          </Button>
        </div>
      ) : null}

      {page === 'log' ? (
        <div className="flex flex-col gap-4">
          <PageTitle
            title="Handover log"
            actions={
              <Button variant="Primary" onClick={() => setPage('submit')}>
                New handover
              </Button>
            }
          />
          <SchemaTable
            table={table}
            onRowAction={(action, row) => {
              if (action === 'edit') setEdit(row)
              if (action === 'delete') setRemove(row)
            }}
            emptyActions={
              <Button variant="Primary" onClick={() => setPage('submit')}>
                Submit first handover
              </Button>
            }
          />
        </div>
      ) : null}

      {page === 'settings' ? (
        <div className="flex max-w-xl flex-col gap-6">
          <PageTitle title="Settings" description="Defaults for this demo only. Nothing is stored." />
          <SchemaForm form={settings} id="handover-settings" />
          <Button type="submit" form="handover-settings">
            Save settings
          </Button>
        </div>
      ) : null}

      <Sheet open={Boolean(edit)} onOpenChange={(open) => !open && setEdit(null)}>
        <SheetContent
          side="Right"
          size="Small"
          title="Handover"
          confirmLabel="Mark done"
          onConfirm={() => {
            if (!edit) return
            setRows((current) =>
              current.map((row) => (row.id === edit.id ? { ...row, status: 'Done' } : row)),
            )
            toast.add({ title: 'Marked done', type: 'success' })
            setEdit(null)
          }}
        >
          {edit ? (
            <DetailList>
              <DetailListHeader>
                <DetailListTitle>{String(edit.outlet)}</DetailListTitle>
              </DetailListHeader>
              <DetailListGrid columns={1}>
                <DetailListRow label="Shift">{String(edit.shift)}</DetailListRow>
                <DetailListRow label="Logged">{String(edit.created)}</DetailListRow>
                <DetailListRow label="Status">{String(edit.status)}</DetailListRow>
                <DetailListRow label="Notes" alignment="Vertical">
                  {String(edit.notes)}
                </DetailListRow>
              </DetailListGrid>
            </DetailList>
          ) : null}
        </SheetContent>
      </Sheet>

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
