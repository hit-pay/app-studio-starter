---
description: How to apply source changes on the Sprite. Use after editing routes or source, or if preview looks stale.
---

# Deployment

This process is the live preview. Do not start a second server.

After source changes:

1. If you added or renamed a file under `src/routes/`, run `bun run generate-routes`.
2. Always run **`bun run preview:refresh`** (builds, then signals the Sprite to reload).

Do **not** run `bun run dev`, `vite`, or a second `bun run start`. Do **not** edit `.output/` or `.nitro/` by hand.

`APP_STUDIO_APP_ID`, Turso env, and `start.mjs` are platform wiring. Leave them alone unless you broke them.

When you finish talking to the user, say what they can do in the app. 
