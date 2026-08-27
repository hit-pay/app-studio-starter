---
description: Reload the live preview. Run once when the job is finished, not after every edit.
---

# Deployment

This process is the live preview. Do not start a second server (`bun run dev`, extra `vite`, extra `bun run start`). Do not edit `.output/` or `.nitro/`.

Reading kit / route files while coding is fine. **Do not** run `bun run lint` or `bun run preview:refresh` after each save. **Do not** `shadcn add` as part of finishing unless a kit file was missing.

When **all** source changes for this request are done:

1. Self-review the diff — `.agents/skills/review.md`. Fix issues.
2. If you added or renamed a file under `src/routes/`, run `bun run generate-routes` **once**.
3. `bun run lint` **once**.
4. **`bun run preview:refresh` once**.

Do not end the job until that single preview:refresh has run. If lint or review finds bugs, fix, then lint **once** and preview:refresh **once more**.
