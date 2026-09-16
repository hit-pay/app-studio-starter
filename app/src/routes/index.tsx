import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/components/layout'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <Layout>
      <div className="min-h-[calc(100dvh-3rem)] w-full" />
    </Layout>
  )
}
