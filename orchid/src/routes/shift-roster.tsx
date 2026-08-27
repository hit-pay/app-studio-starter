import { useMemo, useState } from 'react'
import { CalendarClockIcon, RepeatIcon, UserRoundIcon } from 'lucide-react'
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
import { StatCard } from '@/components/ui/stat-card'
import { toast } from '@/components/ui/toast'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createFileRoute('/shift-roster')({
  component: ShiftRosterDocsPage,
})

type Page = 'week' | 'assign' | 'settings'

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

function assignFields(): SchemaFormField[] {
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
      value: 'maya',
    },
    {
      key: 'role',
      title: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'Supervisor', label: 'Supervisor' },
        { value: 'Cashier', label: 'Cashier' },
        { value: 'Floor', label: 'Floor' },
      ],
      value: 'Cashier',
    },
    {
      key: 'outlet',
      title: 'Outlet',
      type: 'select',
      required: true,
      options: OUTLETS,
      value: 'orchard',
    },
    {
      key: 'weekdays',
      title: 'Weekdays',
      type: 'checkbox-group',
      required: true,
      options: WEEKDAYS,
      value: ['Monday'],
    },
    {
      key: 'shift',
      title: 'Shift',
      type: 'select',
      required: true,
      options: SHIFTS,
      value: 'morning',
    },
    {
      key: 'publish',
      title: 'Publish this template',
      type: 'switch',
      value: true,
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
  const [page, setPage] = useState<Page>('week')
  const [rows, setRows] = useState(SEED)
  const [formKey, setFormKey] = useState(0)
  const [edit, setEdit] = useState<SchemaTableRow | null>(null)
  const [remove, setRemove] = useState<SchemaTableRow | null>(null)

  const assign = useSchemaForm({
    fields: useMemo(() => assignFields(), [formKey]),
    onSubmit: (values) => {
      const staff = STAFF.find((item) => item.value === values.staff)?.label ?? String(values.staff)
      const outlet = OUTLETS.find((item) => item.value === values.outlet)?.label ?? String(values.outlet)
      const shift = SHIFTS.find((item) => item.value === values.shift)?.label ?? String(values.shift)
      const days = Array.isArray(values.weekdays) ? values.weekdays.map(String) : ['Monday']
      const status = values.publish ? 'Published' : 'Draft'
      const next = days.map((weekday, index) => ({
        id: `r-${Date.now()}-${index}`,
        staff,
        role: String(values.role ?? 'Cashier'),
        outlet,
        weekday,
        shift,
        repeats: 'Weekly',
        status,
      }))
      setRows((current) => [...next, ...current])
      setFormKey((key) => key + 1)
      toast.add({
        title: `${staff} repeats weekly`,
        description: days.join(', '),
        type: 'success',
      })
      setPage('week')
    },
  })

  const settings = useSchemaForm({
    fields: settingsFields(),
    onSubmit: () => {
      toast.add({ title: 'Weekly rules saved', type: 'success' })
    },
  })

  const table = useSchemaTable({ schema: ROSTER_SCHEMA, data: rows })
  const people = new Set(rows.map((row) => String(row.staff))).size
  const weekdaysCovered = new Set(rows.map((row) => String(row.weekday))).size

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
            />
          </div>
        }
        nav={
          <AppShellNav>
            <AppShellNavGroup>
              <AppShellNavItem active={page === 'week'} onClick={() => setPage('week')}>
                Weekly template
              </AppShellNavItem>
              <AppShellNavItem active={page === 'assign'} onClick={() => setPage('assign')}>
                Add recurring
              </AppShellNavItem>
            </AppShellNavGroup>
            <AppShellNavGroup label="Settings">
              <AppShellNavItem active={page === 'settings'} onClick={() => setPage('settings')}>
                Week rules
              </AppShellNavItem>
            </AppShellNavGroup>
          </AppShellNav>
        }
      >
        {page === 'week' ? (
          <div className="flex flex-col gap-4">
            <PageTitle
              title="Weekly template"
              description="Each row repeats every week on that weekday."
              actions={
                <Button variant="Primary" onClick={() => setPage('assign')}>
                  Add recurring
                </Button>
              }
            />
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
                if (action === 'edit') setEdit(row)
                if (action === 'delete') setRemove(row)
              }}
              emptyActions={
                <Button variant="Primary" onClick={() => setPage('assign')}>
                  Add first recurring slot
                </Button>
              }
            />
          </div>
        ) : null}

        {page === 'assign' ? (
          <div className="flex max-w-xl flex-col gap-6">
            <PageTitle
              title="Add recurring"
              description="Pick weekdays. The slot repeats every week until you delete it."
            />
            <SchemaForm key={formKey} id="roster-assign" form={assign} />
            <Button type="submit" form="roster-assign">
              Save weekly slot
            </Button>
          </div>
        ) : null}

        {page === 'settings' ? (
          <div className="flex max-w-xl flex-col gap-6">
            <PageTitle title="Week rules" description="Applies to this demo template only." />
            <SchemaForm form={settings} id="roster-settings" />
            <Button type="submit" form="roster-settings">
              Save rules
            </Button>
          </div>
        ) : null}

        <Sheet open={Boolean(edit)} onOpenChange={(open) => !open && setEdit(null)}>
          <SheetContent
            side="Right"
            size="Small"
            title="Recurring shift"
            confirmLabel="Publish"
            onConfirm={() => {
              if (!edit) return
              setRows((current) =>
                current.map((row) => (row.id === edit.id ? { ...row, status: 'Published' } : row)),
              )
              toast.add({ title: 'Slot published', type: 'success' })
              setEdit(null)
            }}
          >
            {edit ? (
              <DetailList>
                <DetailListHeader>
                  <DetailListTitle>{String(edit.staff)}</DetailListTitle>
                </DetailListHeader>
                <DetailListGrid columns={1}>
                  <DetailListRow label="Role">{String(edit.role)}</DetailListRow>
                  <DetailListRow label="Outlet">{String(edit.outlet)}</DetailListRow>
                  <DetailListRow label="Every">{String(edit.weekday)}</DetailListRow>
                  <DetailListRow label="Shift">{String(edit.shift)}</DetailListRow>
                  <DetailListRow label="Repeats">{String(edit.repeats)}</DetailListRow>
                  <DetailListRow label="Status">{String(edit.status)}</DetailListRow>
                </DetailListGrid>
              </DetailList>
            ) : null}
          </SheetContent>
        </Sheet>

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
