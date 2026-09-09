import { useState } from 'react'
import {
  FileRegular,
  StoreRegular,
  User3Regular,
} from '@mingcute/react/core-regular'

import { Button } from '@/base-ui/actions/button'
import { Command } from '@/components/overlays/command'
import { toast } from '@/base-ui/feedback/toast'

function CommandDemo() {
  const [open, setOpen] = useState(false)

  function go(value: string) {
    toast.add({ title: value, type: 'success' })
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
        Palette
      </p>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Search
      </Button>
      <Command
        open={open}
        onOpenChange={setOpen}
        placeholder="Search invoices, customers, pages…"
        empty="No results"
        groups={[
          {
            heading: 'Pages',
            items: [
              {
                value: 'invoices',
                label: 'Invoices',
                keywords: ['billing'],
                shortcut: 'I',
                icon: <FileRegular className="size-4 text-oc-muted-foreground" />,
                onSelect: go,
              },
              {
                value: 'outlets',
                label: 'Outlets',
                keywords: ['pos', 'store'],
                icon: <StoreRegular className="size-4 text-oc-muted-foreground" />,
                onSelect: go,
              },
            ],
          },
          {
            heading: 'Customers',
            items: [
              {
                value: 'alex turner',
                label: 'Alex Turner',
                icon: <User3Regular className="size-4 text-oc-muted-foreground" />,
                onSelect: go,
              },
            ],
          },
        ]}
      />
    </div>
  )
}

export { CommandDemo }
