import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'
import { hitpayPreviewPayload } from './hitpay-preview-mock.mjs'

const outDir = join(process.cwd(), '.preview')
const appId = process.env.APP_STUDIO_APP_ID?.trim()
const origin =
  process.env.PREVIEW_URL?.replace(/\/$/, '') ||
  `http://127.0.0.1:${process.env.PORT || 3000}`
// `bun run preview` rewrites / → /{appId}/ so Playwright can omit the prefix.
const basePath =
  process.env.PREVIEW_STRIP_APP_ID === '1' ? '' : appId ? `/${appId}` : ''
const extraPaths = process.argv.slice(2).filter((arg) => arg.startsWith('/'))

function fileToPath(file) {
  if (!file.endsWith('.tsx')) return null

  const name = file.slice(0, -4)
  if (
    name.startsWith('__') ||
    name.startsWith('_') ||
    name.startsWith('-') ||
    name.includes('$') ||
    name.includes('.')
  ) {
    return null
  }

  return name === 'index' ? '/' : `/${name}`
}

async function discoverRoutes() {
  const files = await readdir(join(process.cwd(), 'src/routes'))
  const fromDisk = files.map(fileToPath).filter(Boolean)
  const paths = [...new Set(['/', ...fromDisk, ...extraPaths])]
  return paths
}

async function waitForServer(url, attempts = 20) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, { redirect: 'manual' })
      if (res.status < 500) return
    } catch {
      // server still restarting after publish
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`Preview server did not respond at ${url}`)
}

function looksBroken(pageText, status) {
  const reasons = []
  if (status >= 400) reasons.push(`HTTP ${status}`)
  if (!pageText.trim()) reasons.push('blank body')
  if (/something went wrong|application error|vite overlay/i.test(pageText)) {
    reasons.push('error copy on page')
  }
  return reasons
}

const routes = await discoverRoutes()
const home = `${origin}${basePath}/`
await waitForServer(home)
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true }).catch((err) => {
  console.error(err.message)
  console.error('Chromium missing. Run: bunx playwright install chromium')
  process.exit(1)
})
const results = []

try {
  for (const path of routes) {
    const url = `${origin}${basePath}${path === '/' ? '/' : path}`
    const slug = path === '/' ? 'home' : path.replace(/^\//, '').replaceAll('/', '_')
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
    const consoleErrors = []
    page.on('pageerror', (err) => consoleErrors.push(err.message))
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })

    await page.route('**/api/apps/**', async (route) => {
      const payload = hitpayPreviewPayload(new URL(route.request().url()).pathname)
      if (!payload) return route.continue()
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(payload),
      })
    })

    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
    await page.waitForTimeout(400)

    const status = response?.status() ?? 0
    const text = await page.locator('body').innerText().catch(() => '')
    const snapshot = await page.locator('body').ariaSnapshot().catch(() => '')
    const overflow = await page.evaluate(() => {
      const el = document.documentElement
      return el.scrollWidth > el.clientWidth + 8
    })
    const reasons = looksBroken(text, status)
    if (overflow) reasons.push('horizontal overflow')
    if (consoleErrors.length) {
      reasons.push(
        `${consoleErrors.length} console error(s): ${consoleErrors[0].slice(0, 160)}`,
      )
    }

    const screenshot = join(outDir, `${slug}.png`)
    await page.screenshot({ path: screenshot, fullPage: true })
    await writeFile(join(outDir, `${slug}.txt`), snapshot || text.slice(0, 4000))
    await page.close()

    results.push({
      path,
      url,
      status,
      ok: reasons.length === 0,
      reasons,
      screenshot: `.preview/${slug}.png`,
      snapshot: `.preview/${slug}.txt`,
    })
  }
} finally {
  await browser.close()
}

const report = results
  .map((r) => {
    const mark = r.ok ? 'ok' : 'FAIL'
    const extra = r.reasons.length ? ` (${r.reasons.join(', ')})` : ''
    return `${mark}  ${r.path}  ${r.status}  ${r.screenshot}${extra}`
  })
  .join('\n')

await writeFile(join(outDir, 'report.txt'), `${report}\n`)
console.log(report)

if (results.some((r) => !r.ok)) {
  process.exitCode = 1
}
