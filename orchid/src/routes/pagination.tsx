import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationInfo,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export const Route = createFileRoute('/pagination')({
  component: PaginationExamplesPage,
})

function DefaultPagination() {
  const [page, setPage] = useState(2)
  const total = 15

  return (
    <Pagination>
      <PaginationPrevious disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} />
      <PaginationContent>
        <PaginationItem>
          <PaginationLink isActive={page === 1} onClick={() => setPage(1)}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={page === 2} onClick={() => setPage(2)}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={page === 3} onClick={() => setPage(3)}>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={page === 4} onClick={() => setPage(4)}>
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={page === total} onClick={() => setPage(total)}>
            15
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
      <PaginationNext
        disabled={page === total}
        onClick={() => setPage((p) => Math.min(total, p + 1))}
      />
    </Pagination>
  )
}

function InvoicePagination() {
  const [page, setPage] = useState(2)
  const total = 8
  const from = (page - 1) * 10 + 1
  const to = Math.min(page * 10, total * 10)

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4">
      <PaginationInfo>
        Showing {from}–{to} of {total * 10} invoices
      </PaginationInfo>
      <Pagination className="w-auto justify-end">
        <PaginationPrevious disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} />
        <PaginationContent>
          {Array.from({ length: total }, (_, index) => index + 1).map((item) => (
            <PaginationItem key={item}>
              <PaginationLink isActive={item === page} onClick={() => setPage(item)}>
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
        <PaginationNext
          disabled={page === total}
          onClick={() => setPage((p) => Math.min(total, p + 1))}
        />
      </Pagination>
    </div>
  )
}

function PaginationExamplesPage() {
  return (
    <DocExamplePage
      to="/pagination"
      usage={`import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

<Pagination>
  <PaginationPrevious />
  <PaginationContent>
    <PaginationItem>
      <PaginationLink>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink>15</PaginationLink>
    </PaginationItem>
  </PaginationContent>
  <PaginationNext />
</Pagination>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <DefaultPagination />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          With range
        </p>
        <InvoicePagination />
      </div>
    </DocExamplePage>
  )
}
