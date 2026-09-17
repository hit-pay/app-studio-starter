import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <div className="min-h-[calc(100dvh-3rem)] w-full" />
}
