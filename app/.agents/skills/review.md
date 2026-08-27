---
description: Screenshot and visual check. Open only if the user asked to check the UI or complained about how it looks.
---

# Review (UI check)

**Skip this whole skill** on a normal build. Do not `bun run screenshot` unless the user asked to check the UI, or they complained about layout/looks and told you to inspect it.

When they did ask:

1. `bun run generate-routes` if you added or renamed `src/routes/`
2. `bun run lint` once
3. `bun run publish` once (live iframe; not a second server)
4. `bun run screenshot` once — **read** the PNGs, `.preview/report.txt`, and `.preview/*.txt`

Do not screenshot after every file. Do not start `bun run dev` / extra `vite` / `start` / `preview` on Sprite. Locally (no `sprite-env`): `bun run preview`, then `PREVIEW_URL=http://127.0.0.1:3010 PREVIEW_STRIP_APP_ID=1 bun run screenshot`. Screenshot intercepts `/api/apps/.../user/info|roles|members`. `start.mjs` never mocks.

Chromium missing: `bunx playwright install chromium`. `bun run screenshot` opens `/` plus static routes; add paths you built. Skip `$param` routes unless you have a real id. Look for blank/error pages, missing AppShell, clipped controls, overflow, empty list with no empty state, form with no submit.

If the shots show a bug: fix, then **one** lint, **one** publish, **one** screenshot. Not a full E2E suite. Do not click delete/pay just for a shot. Do not commit `.preview/`.
