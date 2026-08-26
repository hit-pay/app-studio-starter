---
description: Reload the live preview. Run once when the job is finished, not after every edit.
---

# Deployment

This process is the live preview. Do not start a second server (`bun run dev`, extra `vite`, extra `bun run start`). Do not edit `.output/` or `.nitro/`.

Reading kit / route files while coding is fine. **Do not** run `bun run lint` or `bun run preview:refresh` after each save.

When **all** source changes for this request are done:

1. If you added or renamed a file under `src/routes/`, run `bun run generate-routes` **once**.
2. Optionally `bun run lint` **once** if you want a typecheck.
3. Always run **`bun run preview:refresh` once**.

Do not end the job until that single preview:refresh has run. If lint fails, fix, then preview:refresh **once more** — not after every hunk.
