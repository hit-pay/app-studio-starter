import { useMemo, useState } from 'react'
import { CalendarClockIcon, RepeatIcon, UserRoundIcon } from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { AppShell } from '@/components/ui/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { PageTitle } from '@/components/ui/page-title'
import { SchemaForm, useSchemaForm, type SchemaFormField } from '@/components/ui/schema-form'
import {
  SchemaTable,
  useSchemaTable,
  type SchemaTableRow,
  type SchemaTableSchema,
} from '@/components/ui/schema-table'
import { StatCard } from '@/components/ui/stat-card'
import { toast } from '@/components/ui/toast'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createFileRoute('/shift-roster')({
  component: ShiftRosterDocsPage,
})

const WEEKDAYS = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
]

const STAFF = [
  { value: 'maya', label: 'Maya Tan' },
  { value: 'arif', label: 'Arif Rahman' },
  { value: 'siti', label: 'Siti Noor' },
  { value: 'ken', label: 'Ken Lim' },
]

const OUTLETS = [
  { value: 'orchard', label: 'Orchard flagship' },
  { value: 'tampines', label: 'Tampines mall' },
]

const SHIFTS = [
  { value: 'morning', label: 'Morning 9–15' },
  { value: 'afternoon', label: 'Afternoon 15–21' },
  { value: 'night', label: 'Night 21–9' },
]

const ROLES = [
  { value: 'Supervisor', label: 'Supervisor' },
  { value: 'Cashier', label: 'Cashier' },
  { value: 'Floor', label: 'Floor' },
]

const ROSTER_SCHEMA: SchemaTableSchema = {
  selection: true,
  search: { placeholder: 'Search staff or weekday' },
  tabKey: 'weekday',
  tabs: [
    { key: 'all', title: 'All' },
    ...WEEKDAYS.map((day) => ({ key: day.value.toLowerCase(), title: day.label.slice(0, 3), value: day.value })),
  ],
  filters: [
    {
      key: 'outlet',
      title: 'Outlet',
      options: OUTLETS.map((item) => ({ value: item.label, label: item.label })),
    },
  ],
  sort: {
    fields: [
      { key: 'weekday', title: 'Weekday' },
      { key: 'staff', title: 'Staff' },
    ],
    defaultKey: 'weekday',
    defaultDir: 'asc',
  },
  pagination: { pageSize: 10, pageSizes: [10, 20] },
  rowActions: ['edit', 'delete'],
  columns: [
    { key: 'staff', title: 'Staff', type: 'text', locked: true },
    { key: 'role', title: 'Role', type: 'text' },
    { key: 'outlet', title: 'Outlet', type: 'text' },
    { key: 'weekday', title: 'Every', type: 'text' },
    { key: 'shift', title: 'Shift', type: 'text' },
    { key: 'repeats', title: 'Repeats', type: 'text' },
    { key: 'status', title: 'Status', type: 'status' },
  ],
}

const SEED: SchemaTableRow[] = [
  {
    id: 'r-1',
    staff: 'Maya Tan',
    role: 'Supervisor',
    outlet: 'Orchard flagship',
    weekday: 'Monday',
    shift: 'Morning 9–15',
    repeats: 'Weekly',
    status: 'Published',
  },
  {
    id: 'r-2',
    staff: 'Maya Tan',
    role: 'Supervisor',
    outlet: 'Orchard flagship',
    weekday: 'Wednesday',
    shift: 'Morning 9–15',
    repeats: 'Weekly',
    status: 'Published',
  },
  {
    id: 'r-3',
    staff: 'Arif Rahman',
    role: 'Cashier',
    outlet: 'Orchard flagship',
    weekday: 'Monday',
    shift: 'Afternoon 15–21',
    repeats: 'Weekly',
    status: 'Published',
  },
  {
    id: 'r-4',
    staff: 'Siti Noor',
    role: 'Cashier',
    outlet: 'Tampines mall',
    weekday: 'Tuesday',
    shift: 'Morning 9–15',
    repeats: 'Weekly',
    status: 'Draft',
  },
  {
    id: 'r-5',
    staff: 'Ken Lim',
    role: 'Floor',
    outlet: 'Tampines mall',
    weekday: 'Friday',
    shift: 'Night 21–9',
    repeats: 'Weekly',
    status: 'Published',
  },
  {
    id: 'r-6',
    staff: 'Ken Lim',
    role: 'Floor',
    outlet: 'Tampines mall',
    weekday: 'Saturday',
    shift: 'Night 21–9',
    repeats: 'Weekly',
    status: 'Published',
  },
]

function assignFields(row?: SchemaTableRow | null): SchemaFormField[] {
  return [
    {
      key: 'section',
      title: 'Recurring slot',
      type: 'section',
      description: 'Repeats every selected weekday until you remove it.',
    },
    {
      key: 'staff',
      title: 'Staff',
      type: 'combobox',
      required: true,
      options: STAFF,
      value: STAFF.find((item) => item.label === row?.staff)?.value ?? 'maya',
    },
    {
      key: 'role',
      title: 'Role',
      type: 'select',
      required: true,
      options: ROLES,
      value: row ? String(row.role) : 'Cashier',
    },
    {
      key: 'outlet',
      title: 'Outlet',
      type: 'select',
      required: true,
      options: OUTLETS,
      value: OUTLETS.find((item) => item.label === row?.outlet)?.value ?? 'orchard',
    },
    {
      key: 'weekdays',
      title: 'Weekdays',
      type: 'checkbox-group',
      required: true,
      options: WEEKDAYS,
      value: row ? [String(row.weekday)] : ['Monday'],
    },
    {
      key: 'shift',
      title: 'Shift',
      type: 'select',
      required: true,
      options: SHIFTS,
      value: SHIFTS.find((item) => item.label === row?.shift)?.value ?? 'morning',
    },
    {
      key: 'publish',
      title: 'Publish this template',
      type: 'switch',
      value: row ? row.status === 'Published' : true,
    },
  ]
}

function settingsFields(): SchemaFormField[] {
  return [
    {
      key: 'week_start',
      title: 'Week starts on',
      type: 'select',
      options: [
        { value: 'monday', label: 'Monday' },
        { value: 'sunday', label: 'Sunday' },
      ],
      value: 'monday',
    },
    {
      key: 'min_cover',
      title: 'Minimum staff per weekday shift',
      type: 'quantity',
      min: 1,
      max: 8,
      value: 2,
    },
    {
      key: 'notify',
      title: 'Notify staff when the weekly template changes',
      type: 'section-item',
      value: true,
    },
  ]
}

function ShiftRosterApp() {
  const [rows, setRows] = useState(SEED)
  const [formKey, setFormKey] = useState(0)
  const [sheet, setSheet] = useState<null | 'create' | SchemaTableRow>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [remove, setRemove] = useState<SchemaTableRow | null>(null)

  const editing = sheet && sheet !== 'create' ? sheet : null

  const assign = useSchemaForm({
    fields: useMemo(() => assignFields(editing), [editing, formKey]),
    onSubmit: (values) => {
      const staff = STAFF.find((item) => item.value === values.staff)?.label ?? String(values.staff)
      const outlet = OUTLETS.find((item) => item.value === values.outlet)?.label ?? String(values.outlet)
      const shift = SHIFTS.find((item) => item.value === values.shift)?.label ?? String(values.shift)
      const days = Array.isArray(values.weekdays) ? values.weekdays.map(String) : ['Monday']
      const status = values.publish ? 'Published' : 'Draft'
      const role = String(values.role ?? 'Cashier')

      if (editing) {
        const weekday = days[0] ?? String(editing.weekday)
        setRows((current) =>
          current.map((row) =>
            row.id === editing.id
              ? { ...row, staff, role, outlet, weekday, shift, status }
              : row,
          ),
        )
        toast.add({ title: 'Slot updated', type: 'success' })
      } else {
        const next = days.map((weekday, index) => ({
          id: `r-${Date.now()}-${index}`,
          staff,
          role,
          outlet,
          weekday,
          shift,
          repeats: 'Weekly',
          status,
        }))
        setRows((current) => [...next, ...current])
        toast.add({
          title: `${staff} repeats weekly`,
          description: days.join(', '),
          type: 'success',
        })
      }

      setSheet(null)
      setFormKey((key) => key + 1)
    },
  })

  const settings = useSchemaForm({
    fields: settingsFields(),
    onSubmit: () => {
      toast.add({ title: 'Weekly rules saved', type: 'success' })
      setSettingsOpen(false)
    },
  })

  const table = useSchemaTable({ schema: ROSTER_SCHEMA, data: rows })
  const people = new Set(rows.map((row) => String(row.staff))).size
  const weekdaysCovered = new Set(rows.map((row) => String(row.weekday))).size

  function openCreate() {
    setFormKey((key) => key + 1)
    setSheet('create')
  }

  return (
    <TooltipProvider>
      <AppShell
        header={
          <div className="px-4 py-3 md:px-6 md:py-4">
            <PageTitle
              title="Shift Roster"
              description="Weekly recurring template — same staff, same weekdays"
              badge={
                <Badge color="Blue" style="Background">
                  Manager
                </Badge>
              }
              actions={
                <>
                  <Button variant="Secondary" style="Border" onClick={() => setSettingsOpen(true)}>
                    Week rules
                  </Button>
                  <Button variant="Primary" onClick={openCreate}>
                    Add recurring
                  </Button>
                </>
              }
            />
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={<RepeatIcon />} iconColor="Blue" title="Recurring slots" content={String(rows.length)} />
            <StatCard icon={<UserRoundIcon />} iconColor="Green" title="Staff" content={String(people)} />
            <StatCard
              icon={<CalendarClockIcon />}
              iconColor="Grey"
              title="Weekdays covered"
              content={`${weekdaysCovered}/7`}
            />
          </div>
          <SchemaTable
            table={table}
            onRowAction={(action, row) => {
              if (action === 'edit') {
                setFormKey((key) => key + 1)
                setSheet(row)
              }
              if (action === 'delete') setRemove(row)
            }}
            emptyActions={
              <Button variant="Primary" onClick={openCreate}>
                Add first recurring slot
              </Button>
            }
          />
        </div>

        <Dialog open={sheet != null} onOpenChange={(open) => !open && setSheet(null)}>
          <DialogContent
            title={editing ? 'Edit recurring slot' : 'Add recurring'}
            description="Pick weekdays. The slot repeats every week until you delete it."
            confirmLabel="Save"
            onConfirm={() => void assign.submit()}
          >
            <SchemaForm key={formKey} form={assign} />
          </DialogContent>
        </Dialog>

        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogContent
            title="Week rules"
            description="Applies to this demo template only."
            confirmLabel="Save rules"
            onConfirm={() => void settings.submit()}
          >
            <SchemaForm form={settings} />
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={Boolean(remove)}
          onOpenChange={(open) => !open && setRemove(null)}
          type="Delete"
          title="Stop this recurring shift?"
          message={`${remove?.staff ?? ''} will no longer cover every ${remove?.weekday ?? ''}.`}
          onConfirm={() => {
            if (!remove) return
            setRows((current) => current.filter((row) => row.id !== remove.id))
            toast.add({ title: 'Recurring slot removed', type: 'success' })
            setRemove(null)
          }}
        />
      </AppShell>
    </TooltipProvider>
  )
}

function ShiftRosterDocsPage() {
  return (
    <DocExamplePage to="/shift-roster" fill>
      <ShiftRosterApp />
    </DocExamplePage>
  )
}
