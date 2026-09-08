import { a as __toESM, n as require_jsx_runtime, r as require_react } from "./react-dom-L_HNrMjQ.js";
import { K as LoaderCircle, W as cn, t as AppLayout } from "./app-layout-DX4ysKQw.js";
//#region src/lib/hitpay.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function assertBrowser() {
	if (typeof window === "undefined") throw new Error("HitPay /api/apps/{appId}/user/info, /roles, and /members must be fetched in the browser, not from createServerFn or a loader.");
}
function appStudioApi(path) {
	return `/api/apps/${window.location.pathname.split("/").filter(Boolean)[0]}${path}`;
}
async function hitpayGet(path) {
	assertBrowser();
	const response = await fetch(appStudioApi(path), {
		credentials: "include",
		headers: { accept: "application/json" }
	});
	if (response.status === 401) throw new Error("Sign in to HitPay to use this app.");
	if (response.status >= 500) throw new Error("HitPay is temporarily unavailable. Try again shortly.");
	if (!response.ok) throw new Error("You do not have access to this app.");
	return await response.json();
}
var fetchUserInfo = () => hitpayGet("/user/info");
/**
* Who is signed in. Browser only. Opening the app is gated by the proxy
* (user/info must succeed). Gate in-app actions with `user.role.title`.
*/
function useHitPayUser() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		fetchUserInfo().then((next) => {
			if (!cancelled) setUser(next);
		}).catch((caught) => {
			if (!cancelled) setError(caught instanceof Error ? caught.message : "Failed to load user.");
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return {
		user,
		error
	};
}
//#endregion
//#region src/components/ui/spinner.tsx
var import_jsx_runtime = require_jsx_runtime();
function Spinner({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		"data-slot": "spinner",
		role: "status",
		"aria-label": "Loading",
		className: cn("size-4 animate-spin", className),
		...props
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Home() {
	const { user } = useHitPayUser();
	const displayName = user?.name?.trim() || user?.email || null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		appName: "App Studio",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex h-full min-h-0 w-full flex-1 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full max-w-md flex-col items-center px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-8 flex size-14 items-center justify-center rounded-2xl bg-oc-primary shadow-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6 text-oc-primary-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.14em] text-oc-primary uppercase",
						children: "App Studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-2xl font-semibold tracking-tight text-oc-foreground",
						children: "AI is building your app"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6 text-oc-muted-foreground",
						children: "Your request is being turned into a working app. This may take a few minutes."
					}),
					displayName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-xs text-oc-muted-foreground",
						children: ["Signed in as ", displayName]
					}) : null
				]
			})
		})
	});
}
//#endregion
export { Home as component };
