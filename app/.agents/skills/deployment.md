---
description: Publish the built app to the live Sprite process. Run once when the job is finished, not after every edit.
---

# Publish

`bun run publish` builds and restarts the **live app** (the HitPay iframe). It is not a screenshot and not a second server.

Do not start a second server (`bun run dev`, extra `vite`, extra `bun run start`, extra `bun run preview`). Do not edit `.output/` or `.nitro/`. `bun run preview` is local-only: Playwright + **mock** HitPay JSON, no proxy.

Reading kit / route files while coding is fine. **Do not** run `bun run lint` or `bun run publish` after each save. **Do not** `shadcn add` as part of finishing unless a kit file was missing.

When **all** source changes for this request are done:

1. Self-review the diff — `.agents/skills/review.md`. Fix issues.
2. If you added or renamed a file under `src/routes/`, run `bun run generate-routes` **once**.
3. `bun run lint` **once**.
4. **`bun run publish` once**.
5. **`ui-preview.md`** — `bun run screenshot` once, then **read** `.preview/*.png` (and fix + one more publish/screenshot if the UI is wrong).

Do not end the job until that single publish **and** screenshot have run. If lint, review, or screenshots find bugs, fix, then lint **once**, publish **once**, screenshot **once more**.
