---
description: Reload the live preview. Always run this after you finish editing the app.
---

# Deployment

This process is the live preview. Do not start a second server (`bun run dev`, extra `vite`, extra `bun run start`). Do not edit `.output/` or `.nitro/`.

When you finish changing source:

1. If you added or renamed a file under `src/routes/`, run `bun run generate-routes`.
2. Always run **`bun run preview:refresh`**.

Do not end the job until preview:refresh has run.
