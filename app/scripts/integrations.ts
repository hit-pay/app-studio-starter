import { listIntegrations, requestIntegration } from '#/lib/server/integrations'

const USAGE = 'Usage: bun run integrations list | bun run integrations request <key> "<reason>"'

const [command, key, ...reasonParts] = process.argv.slice(2)

try {
  if (command === 'list') {
    await list()
  } else if (command === 'request' && key) {
    await requestAccess(key, reasonParts.join(' ').trim())
  } else {
    console.error(USAGE)
    process.exit(1)
  }
  process.exit(0)
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}

async function list(): Promise<void> {
  const { integrations, available } = await listIntegrations()
  const byKey = new Map(integrations.map((item) => [item.key, item]))

  for (const { key: itemKey, title } of available) {
    const item = byKey.get(itemKey)
    const status = item?.status ?? 'not requested'
    const connection = !item?.connected ? 'not connected' : item.needs_reconnect ? 'needs reconnect' : 'connected'
    console.log(`${itemKey}\t${title}\t${status}\t${connection}`)
  }
}

async function requestAccess(itemKey: string, reason: string): Promise<void> {
  const { available } = await listIntegrations()
  if (!available.some((item) => item.key === itemKey)) {
    throw new Error(`Unknown integration "${itemKey}". Run "bun run integrations list" for the keys.`)
  }

  const result = await requestIntegration(itemKey, reason || undefined)
  const ready = result.status === 'granted' && result.connected && !result.needs_reconnect
  console.log(`${result.key}\t${result.title}\t${result.status}\t${ready ? 'connected' : 'not connected'}`)

  if (ready) {
    console.log(`${result.title} is allowed. Use the nango MCP tools to explore it.`)
  } else if (result.status === 'declined') {
    console.log(`The owner declined ${result.title}. Do not ask again; offer an alternative.`)
  } else {
    console.log(`Waiting for the owner. Stop building this part and ask them to allow ${result.title} in the card above.`)
  }
}
