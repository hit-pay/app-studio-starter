import { useState } from 'react'
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


function DefaultPagination() {
  const [page, setPage] = useState(2)
  const total = 15

  return (
    <Pagination>
      <PaginationPrevious
        href={`?page=${Math.max(1, page - 1)}`}
        aria-disabled={page === 1}
        tabIndex={page === 1 ? -1 : undefined}
        onClick={(event) => {
          event.preventDefault()
          setPage((p) => Math.max(1, p - 1))
        }}
      />
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="?page=1"
            isActive={page === 1}
            onClick={(event) => {
              event.preventDefault()
              setPage(1)
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="?page=2"
            isActive={page === 2}
            onClick={(event) => {
              event.preventDefault()
              setPage(2)
            }}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="?page=3"
            isActive={page === 3}
            onClick={(event) => {
              event.preventDefault()
              setPage(3)
            }}
          >
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="?page=4"
            isActive={page === 4}
            onClick={(event) => {
              event.preventDefault()
              setPage(4)
            }}
          >
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`?page=${total}`}
            isActive={page === total}
            onClick={(event) => {
              event.preventDefault()
              setPage(total)
            }}
          >
            15
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
      <PaginationNext
        href={`?page=${Math.min(total, page + 1)}`}
        aria-disabled={page === total}
        tabIndex={page === total ? -1 : undefined}
        onClick={(event) => {
          event.preventDefault()
          setPage((p) => Math.min(total, p + 1))
        }}
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
        <PaginationPrevious
          href={`?page=${Math.max(1, page - 1)}`}
          aria-disabled={page === 1}
          tabIndex={page === 1 ? -1 : undefined}
          onClick={(event) => {
            event.preventDefault()
            setPage((p) => Math.max(1, p - 1))
          }}
        />
        <PaginationContent>
          {Array.from({ length: total }, (_, index) => index + 1).map((item) => (
            <PaginationItem key={item}>
              <PaginationLink
                href={`?page=${item}`}
                isActive={item === page}
                onClick={(event) => {
                  event.preventDefault()
                  setPage(item)
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
        <PaginationNext
          href={`?page=${Math.min(total, page + 1)}`}
          aria-disabled={page === total}
          tabIndex={page === total ? -1 : undefined}
          onClick={(event) => {
            event.preventDefault()
            setPage((p) => Math.min(total, p + 1))
          }}
        />
      </Pagination>
    </div>
  )
}

function PaginationDemo() {
  return (
    <>
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
    </>
  )
}

export { PaginationDemo }
