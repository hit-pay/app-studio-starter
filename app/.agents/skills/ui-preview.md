---
description: Screenshot the live app so you can see your own UI. Open after publish, once per job.
---

# UI preview (see your work)

Code review cannot catch blank pages, dead clicks, overflow, or broken layout. After **`bun run publish`**, run **`bun run screenshot` once** and **read the PNGs**.

Do **not** start a second server on Sprite (`bun run dev`, extra `vite`, `bun run start`, `bun run preview`). The live iframe is `start.mjs` behind the HitPay proxy. Do **not** run this after every file save.

Locally (no `sprite-env`): `bun run build`, then **`bun run preview`**. Mock the **three proxy APIs only** (`/api/apps/{id}/user/info`, `/roles`, `/members`) — Owner + Preview User. Then `PREVIEW_URL=http://127.0.0.1:3010 PREVIEW_STRIP_APP_ID=1 bun run screenshot`.

`bun run screenshot` also intercepts those same three paths in Playwright, so the agent does not need HitPay cookies. `start.mjs` never mocks.

## When

All source edits for this request are done, `review.md` + lint passed, and `bun run publish` has run.

## Steps

1. First time in this sandbox (or if Chromium is missing): `bunx playwright install chromium`
2. `bun run screenshot` — auto-opens `/` plus static routes in `src/routes/`. Add paths you actually built, e.g. `bun run screenshot / /orders /orders/new`
3. Skip `$param` routes unless you have a real id (`/orders/1`).
4. **Read** every `.preview/*.png` for those routes. Also read `.preview/report.txt` and the matching `.preview/*.txt` (accessibility tree).
5. Look for: blank/error page, missing AppShell/tabs, unreadable type, clipped controls, horizontal overflow, empty table with no empty state, form with no submit, tabs that cannot scroll on mobile (resize is optional; default shot is 1280×800).
6. If something is wrong: fix source, then **one** lint, **one** `publish`, **one** `screenshot`. Stop after that second pass unless it is still broken.

## Do not

- Treat this as a full E2E suite. No Playwright spec files unless the user asked for tests.
- Click mutating actions (delete, pay) just to get a shot.
- Commit `.preview/` images.
- End the job without opening the screenshots you generated.

On Sprite, `PREVIEW_URL` defaults to `http://127.0.0.1:$PORT` (or 3000) and `APP_STUDIO_APP_ID` is prefixed automatically. The live iframe uses the **proxy**. Screenshot/preview mocks are only those three `/api/apps/...` routes (`scripts/hitpay-preview-mock.mjs`).
