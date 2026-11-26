// The backend runs on Web APIs only (fetch, Request, Response, URL, crypto, TextEncoder), in the preview (Bun)
// and in the published app runtime. The one host global beyond them is process.env, with the app's settings.
declare const process: { env: Record<string, string | undefined> }
