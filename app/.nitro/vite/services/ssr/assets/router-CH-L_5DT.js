import { a as __toESM, n as require_jsx_runtime, r as require_react, t as require_react_dom } from "./react-dom-L_HNrMjQ.js";
import { A as exactPathTest, B as functionalUpdate$1, E as createNonReactiveReadonlyStore, F as invariant, H as isDangerousProtocol, J as rootRouteId, M as removeTrailingSlash, N as trimPathLeft, P as trimPathRight, R as deepEqual, S as RouterCore, T as createNonReactiveMutableStore, U as isModuleNotFoundError, V as hasKeys, _ as useForwardedRef, b as _getAssetMatches, c as appendUniqueUserTags, d as getAssetCrossOrigin, f as getScriptPreloadAttrs, g as reactUse, h as resolveManifestCssLink, i as useRouter, j as joinPaths, n as dummyMatchContext, q as redirect, r as matchContext, s as useHydrated, z as escapeHtml } from "./useStore-BUKAMGkD.js";
import { A as useDialogRootContext, B as useStableCallback, C as useBaseUiId, D as none, E as createChangeEventDetails, F as NOOP, G as X, H as getWindow, I as useButton, K as LoaderCircle, L as ownerDocument, M as cva, N as useRenderElement, O as DialogBackdrop, P as EMPTY_OBJECT, R as formatErrorMessage, S as useOnMount, T as DialogClose$1, U as isElement, V as useRefWithInit, W as cn, _ as activeElement, a as inertValue, b as Timeout, c as ReactStore, d as LEGACY_SWIPE_IGNORE_SELECTOR, f as FocusGuard, g as matchesFocusVisible, h as addEventListener, i as DialogPortal$1, j as Button, k as transitionStatusMapping, l as useFloatingPortalNode, m as mergeCleanups, n as DialogTitle$1, o as DialogPopup, p as visuallyHidden, q as createLucideIcon, r as DialogRoot, s as useOpenChangeComplete, t as AppLayout, u as BASE_UI_SWIPE_IGNORE_SELECTOR, v as contains, w as useId, x as useTimeout, y as getTarget, z as useIsoLayoutEffect } from "./app-layout-DX4ysKQw.js";
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/route.js
var BaseRoute = class {
	get to() {
		return this._to;
	}
	get id() {
		return this._id;
	}
	get path() {
		return this._path;
	}
	get fullPath() {
		return this._fullPath;
	}
	constructor(options) {
		this.init = (opts) => {
			this.originalIndex = opts.originalIndex;
			const options = this.options;
			const isRoot = !options?.path && !options?.id;
			this.parentRoute = this.options.getParentRoute?.();
			if (isRoot) this._path = rootRouteId;
			else if (!this.parentRoute) invariant();
			let path = isRoot ? rootRouteId : options?.path;
			if (path && path !== "/") path = trimPathLeft(path);
			const customId = options?.id || path;
			let id = isRoot ? rootRouteId : joinPaths([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, customId]);
			if (path === "__root__") path = "/";
			if (id !== "__root__") id = joinPaths(["/", id]);
			const fullPath = id === "__root__" ? "/" : joinPaths([this.parentRoute.fullPath, path]);
			this._path = path;
			this._id = id;
			this._fullPath = fullPath;
			this._to = trimPathRight(fullPath);
		};
		this.addChildren = (children) => {
			return this._addFileChildren(children);
		};
		this._addFileChildren = (children) => {
			if (Array.isArray(children)) this.children = children;
			if (typeof children === "object" && children !== null) this.children = Object.values(children);
			return this;
		};
		this._addFileTypes = () => {
			return this;
		};
		this.updateLoader = (options) => {
			Object.assign(this.options, options);
			return this;
		};
		this.update = (options) => {
			Object.assign(this.options, options);
			return this;
		};
		this.lazy = (lazyFn) => {
			this.lazyFn = lazyFn;
			return this;
		};
		this.redirect = (opts) => redirect({
			from: this.fullPath,
			...opts
		});
		this.options = options || {};
		this.isRoot = !options?.getParentRoute;
		if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
	}
};
var BaseRootRoute = class extends BaseRoute {
	constructor(options) {
		super(options);
	}
};
//#endregion
//#region node_modules/@tanstack/react-router/node_modules/@tanstack/react-store/node_modules/@tanstack/store/dist/esm/alien.js
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
	ReactiveFlags2[ReactiveFlags2["None"] = 0] = "None";
	ReactiveFlags2[ReactiveFlags2["Mutable"] = 1] = "Mutable";
	ReactiveFlags2[ReactiveFlags2["Watching"] = 2] = "Watching";
	ReactiveFlags2[ReactiveFlags2["RecursedCheck"] = 4] = "RecursedCheck";
	ReactiveFlags2[ReactiveFlags2["Recursed"] = 8] = "Recursed";
	ReactiveFlags2[ReactiveFlags2["Dirty"] = 16] = "Dirty";
	ReactiveFlags2[ReactiveFlags2["Pending"] = 32] = "Pending";
	return ReactiveFlags2;
})(ReactiveFlags || {});
// @__NO_SIDE_EFFECTS__
function createReactiveSystem({ update, notify, unwatched }) {
	return {
		link,
		unlink,
		propagate,
		checkDirty,
		shallowPropagate
	};
	function link(dep, sub, version) {
		const prevDep = sub.depsTail;
		if (prevDep !== void 0 && prevDep.dep === dep) return;
		const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
		if (nextDep !== void 0 && nextDep.dep === dep) {
			nextDep.version = version;
			sub.depsTail = nextDep;
			return;
		}
		const prevSub = dep.subsTail;
		if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) return;
		const newLink = sub.depsTail = dep.subsTail = {
			version,
			dep,
			sub,
			prevDep,
			nextDep,
			prevSub,
			nextSub: void 0
		};
		if (nextDep !== void 0) nextDep.prevDep = newLink;
		if (prevDep !== void 0) prevDep.nextDep = newLink;
		else sub.deps = newLink;
		if (prevSub !== void 0) prevSub.nextSub = newLink;
		else dep.subs = newLink;
	}
	function unlink(link2, sub = link2.sub) {
		const dep = link2.dep;
		const prevDep = link2.prevDep;
		const nextDep = link2.nextDep;
		const nextSub = link2.nextSub;
		const prevSub = link2.prevSub;
		if (nextDep !== void 0) nextDep.prevDep = prevDep;
		else sub.depsTail = prevDep;
		if (prevDep !== void 0) prevDep.nextDep = nextDep;
		else sub.deps = nextDep;
		if (nextSub !== void 0) nextSub.prevSub = prevSub;
		else dep.subsTail = prevSub;
		if (prevSub !== void 0) prevSub.nextSub = nextSub;
		else if ((dep.subs = nextSub) === void 0) unwatched(dep);
		return nextDep;
	}
	function propagate(link2) {
		let next = link2.nextSub;
		let stack;
		top: do {
			const sub = link2.sub;
			let flags = sub.flags;
			if (!(flags & 60)) sub.flags = flags | 32;
			else if (!(flags & 12)) flags = 0;
			else if (!(flags & 4)) sub.flags = flags & -9 | 32;
			else if (!(flags & 48) && isValidLink(link2, sub)) {
				sub.flags = flags | 40;
				flags &= 1;
			} else flags = 0;
			if (flags & 2) notify(sub);
			if (flags & 1) {
				const subSubs = sub.subs;
				if (subSubs !== void 0) {
					const nextSub = (link2 = subSubs).nextSub;
					if (nextSub !== void 0) {
						stack = {
							value: next,
							prev: stack
						};
						next = nextSub;
					}
					continue;
				}
			}
			if ((link2 = next) !== void 0) {
				next = link2.nextSub;
				continue;
			}
			while (stack !== void 0) {
				link2 = stack.value;
				stack = stack.prev;
				if (link2 !== void 0) {
					next = link2.nextSub;
					continue top;
				}
			}
			break;
		} while (true);
	}
	function checkDirty(link2, sub) {
		let stack;
		let checkDepth = 0;
		let dirty = false;
		top: do {
			const dep = link2.dep;
			const flags = dep.flags;
			if (sub.flags & 16) dirty = true;
			else if ((flags & 17) === 17) {
				if (update(dep)) {
					const subs = dep.subs;
					if (subs.nextSub !== void 0) shallowPropagate(subs);
					dirty = true;
				}
			} else if ((flags & 33) === 33) {
				if (link2.nextSub !== void 0 || link2.prevSub !== void 0) stack = {
					value: link2,
					prev: stack
				};
				link2 = dep.deps;
				sub = dep;
				++checkDepth;
				continue;
			}
			if (!dirty) {
				const nextDep = link2.nextDep;
				if (nextDep !== void 0) {
					link2 = nextDep;
					continue;
				}
			}
			while (checkDepth--) {
				const firstSub = sub.subs;
				const hasMultipleSubs = firstSub.nextSub !== void 0;
				if (hasMultipleSubs) {
					link2 = stack.value;
					stack = stack.prev;
				} else link2 = firstSub;
				if (dirty) {
					if (update(sub)) {
						if (hasMultipleSubs) shallowPropagate(firstSub);
						sub = link2.sub;
						continue;
					}
					dirty = false;
				} else sub.flags &= -33;
				sub = link2.sub;
				const nextDep = link2.nextDep;
				if (nextDep !== void 0) {
					link2 = nextDep;
					continue top;
				}
			}
			return dirty;
		} while (true);
	}
	function shallowPropagate(link2) {
		do {
			const sub = link2.sub;
			const flags = sub.flags;
			if ((flags & 48) === 32) {
				sub.flags = flags | 16;
				if ((flags & 6) === 2) notify(sub);
			}
		} while ((link2 = link2.nextSub) !== void 0);
	}
	function isValidLink(checkLink, sub) {
		let link2 = sub.depsTail;
		while (link2 !== void 0) {
			if (link2 === checkLink) return true;
			link2 = link2.prevDep;
		}
		return false;
	}
}
var queuedEffects = [];
var { link, unlink, propagate, checkDirty, shallowPropagate } = /* @__PURE__ */ createReactiveSystem({
	update(atom) {
		return atom._update();
	},
	notify(effect2) {
		queuedEffects[queuedEffectsLength++] = effect2;
		effect2.flags &= ~ReactiveFlags.Watching;
	},
	unwatched(atom) {
		if (atom.depsTail !== void 0) {
			atom.depsTail = void 0;
			atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
			purgeDeps(atom);
		}
	}
});
var queuedEffectsLength = 0;
function purgeDeps(sub) {
	const depsTail = sub.depsTail;
	let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
	while (dep !== void 0) dep = unlink(dep, sub);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useMatch.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Read and select the nearest or targeted route match.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useMatchHook
*/
function useMatch(opts) {
	const router = useRouter();
	const nearestRouteId = import_react.useContext(opts.from ? dummyMatchContext : matchContext);
	const routeId = opts.from ?? nearestRouteId;
	const matchStore = router.stores.getMatchStore(routeId);
	{
		const match = matchStore.get();
		if (!match) {
			if (opts.shouldThrow ?? true) invariant();
			return;
		}
		return opts.select ? opts.select(match) : match;
	}
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useLoaderData.js
/**
* Read and select the current route's loader data with type‑safety.
*
* Options:
* - `from`/`strict`: Choose which route's data to read and strictness
* - `select`: Map the loader data to a derived value
* - `structuralSharing`: Enable structural sharing for stable references
*
* @returns The loader data (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDataHook
*/
function useLoaderData(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		structuralSharing: opts.structuralSharing,
		select: (match) => {
			return opts.select ? opts.select(match.loaderData) : match.loaderData;
		}
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js
/**
* Read and select the current route's loader dependencies object.
*
* Options:
* - `from`: Choose which route's loader deps to read
* - `select`: Map the deps to a derived value
* - `structuralSharing`: Enable structural sharing for stable references
*
* @returns The loader deps (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDepsHook
*/
function useLoaderDeps(opts) {
	const { select, ...rest } = opts;
	return useMatch({
		...rest,
		select: (match) => {
			return select ? select(match.loaderDeps) : match.loaderDeps;
		}
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useParams.js
/**
* Access the current route's path parameters with type-safety.
*
* Options:
* - `from`/`strict`: Specify the matched route and whether to enforce strict typing
* - `select`: Project the params object to a derived value for memoized renders
* - `structuralSharing`: Enable structural sharing for stable references
* - `shouldThrow`: Throw if the route is not found in strict contexts
*
* @returns The params object (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useParamsHook
*/
function useParams(opts) {
	return useMatch({
		from: opts.from,
		shouldThrow: opts.shouldThrow,
		structuralSharing: opts.structuralSharing,
		strict: opts.strict,
		select: (match) => {
			const params = opts.strict === false ? match.params : match._strictParams;
			return opts.select ? opts.select(params) : params;
		}
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useSearch.js
/**
* Read and select the current route's search parameters with type-safety.
*
* Options:
* - `from`/`strict`: Control which route's search is read and how strictly it's typed
* - `select`: Map the search object to a derived value for render optimization
* - `structuralSharing`: Enable structural sharing for stable references
* - `shouldThrow`: Throw when the route is not found (strict contexts)
*
* @returns The search object (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useSearchHook
*/
function useSearch(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		shouldThrow: opts.shouldThrow,
		structuralSharing: opts.structuralSharing,
		select: (match) => {
			return opts.select ? opts.select(match.search) : match.search;
		}
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useNavigate.js
/**
* Imperative navigation hook.
*
* Returns a stable `navigate(options)` function to change the current location
* programmatically. Prefer the `Link` component for user-initiated navigation,
* and use this hook from effects, callbacks, or handlers where imperative
* navigation is required.
*
* Options:
* - `from`: Optional route base used to resolve relative `to` paths.
*
* @returns A function that accepts `NavigateOptions`.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useNavigateHook
*/
function useNavigate(_defaultOpts) {
	const router = useRouter();
	return import_react.useCallback((options) => {
		return router.navigate({
			...options,
			from: options.from ?? _defaultOpts?.from
		});
	}, [_defaultOpts?.from, router]);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useRouteContext.js
function useRouteContext(opts) {
	return useMatch({
		...opts,
		select: (match) => opts.select ? opts.select(match.context) : match.context
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/link.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Build anchor-like props for declarative navigation and preloading.
*
* Returns stable `href`, event handlers and accessibility props derived from
* router options and active state. Used internally by `Link` and custom links.
*
* Options cover `to`, `params`, `search`, `hash`, `state`, `preload`,
* `activeProps`, `inactiveProps`, and more.
*
* @returns React anchor props suitable for `<a>` or custom components.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLinkPropsHook
*/
function useLinkProps(options, forwardedRef) {
	const router = useRouter();
	const innerRef = useForwardedRef(forwardedRef);
	const { activeProps, inactiveProps, activeOptions, to, preload: userPreload, preloadDelay: userPreloadDelay, preloadIntentProximity: _preloadIntentProximity, hashScrollIntoView, replace, startTransition, resetScroll, viewTransition, children, target, disabled, style, className, onClick, onBlur, onFocus, onMouseEnter, onMouseLeave, onTouchStart, ignoreBlocker, params: _params, search: _search, hash: _hash, state: _state, mask: _mask, reloadDocument: _reloadDocument, unsafeRelative: _unsafeRelative, from: _from, _fromLocation, ...propsSafeToSpread } = options;
	{
		const safeInternal = isSafeInternal(to);
		if (typeof to === "string" && !safeInternal && to.indexOf(":") > -1) try {
			new URL(to);
			if (isDangerousProtocol(to, router.protocolAllowlist)) return {
				...propsSafeToSpread,
				ref: innerRef,
				href: void 0,
				...children && { children },
				...target && { target },
				...disabled && { disabled },
				...style && { style },
				...className && { className }
			};
			return {
				...propsSafeToSpread,
				ref: innerRef,
				href: to,
				...children && { children },
				...target && { target },
				...disabled && { disabled },
				...style && { style },
				...className && { className }
			};
		} catch {}
		const next = router.buildLocation({
			...options,
			from: options.from
		});
		const hrefOption = getHrefOption(next.maskedLocation ? next.maskedLocation.publicHref : next.publicHref, next.maskedLocation ? next.maskedLocation.external : next.external, router.history, disabled);
		const externalLink = (() => {
			if (hrefOption?.external) {
				if (isDangerousProtocol(hrefOption.href, router.protocolAllowlist)) return;
				return hrefOption.href;
			}
			if (safeInternal) return void 0;
			if (typeof to === "string" && to.indexOf(":") > -1) try {
				new URL(to);
				if (isDangerousProtocol(to, router.protocolAllowlist)) return;
				return to;
			} catch {}
		})();
		const isActive = (() => {
			if (externalLink) return false;
			const currentLocation = router.stores.location.get();
			const exact = activeOptions?.exact ?? false;
			if (exact) {
				if (!exactPathTest(currentLocation.pathname, next.pathname, router.basepath)) return false;
			} else {
				const currentPathSplit = removeTrailingSlash(currentLocation.pathname, router.basepath);
				const nextPathSplit = removeTrailingSlash(next.pathname, router.basepath);
				if (!(currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/"))) return false;
			}
			if (activeOptions?.includeSearch ?? true) {
				if (currentLocation.search !== next.search) {
					const currentSearchEmpty = !currentLocation.search || typeof currentLocation.search === "object" && !hasKeys(currentLocation.search);
					const nextSearchEmpty = !next.search || typeof next.search === "object" && !hasKeys(next.search);
					if (!(currentSearchEmpty && nextSearchEmpty)) {
						if (!deepEqual(currentLocation.search, next.search, {
							partial: !exact,
							ignoreUndefined: !activeOptions?.explicitUndefined
						})) return false;
					}
				}
			}
			if (activeOptions?.includeHash) return false;
			return true;
		})();
		if (externalLink) return {
			...propsSafeToSpread,
			ref: innerRef,
			href: externalLink,
			...children && { children },
			...target && { target },
			...disabled && { disabled },
			...style && { style },
			...className && { className }
		};
		const resolvedActiveProps = isActive ? functionalUpdate$1(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
		const resolvedInactiveProps = isActive ? STATIC_EMPTY_OBJECT : functionalUpdate$1(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
		const resolvedStyle = (() => {
			const baseStyle = style;
			const activeStyle = resolvedActiveProps.style;
			const inactiveStyle = resolvedInactiveProps.style;
			if (!baseStyle && !activeStyle && !inactiveStyle) return;
			if (baseStyle && !activeStyle && !inactiveStyle) return baseStyle;
			if (!baseStyle && activeStyle && !inactiveStyle) return activeStyle;
			if (!baseStyle && !activeStyle && inactiveStyle) return inactiveStyle;
			return {
				...baseStyle,
				...activeStyle,
				...inactiveStyle
			};
		})();
		const resolvedClassName = (() => {
			const baseClassName = className;
			const activeClassName = resolvedActiveProps.className;
			const inactiveClassName = resolvedInactiveProps.className;
			if (!baseClassName && !activeClassName && !inactiveClassName) return "";
			let out = "";
			if (baseClassName) out = baseClassName;
			if (activeClassName) out = out ? `${out} ${activeClassName}` : activeClassName;
			if (inactiveClassName) out = out ? `${out} ${inactiveClassName}` : inactiveClassName;
			return out;
		})();
		return {
			...propsSafeToSpread,
			...resolvedActiveProps,
			...resolvedInactiveProps,
			href: hrefOption?.href,
			ref: innerRef,
			disabled: !!disabled,
			target,
			...resolvedStyle && { style: resolvedStyle },
			...resolvedClassName && { className: resolvedClassName },
			...disabled && STATIC_DISABLED_PROPS,
			...isActive && STATIC_ACTIVE_PROPS
		};
	}
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var STATIC_DISABLED_PROPS = {
	role: "link",
	"aria-disabled": true
};
var STATIC_ACTIVE_PROPS = {
	"data-status": "active",
	"aria-current": "page"
};
function getHrefOption(publicHref, external, history, disabled) {
	if (disabled) return void 0;
	if (external) return {
		href: publicHref,
		external: true
	};
	return {
		href: history.createHref(publicHref) || "/",
		external: false
	};
}
function isSafeInternal(to) {
	if (typeof to !== "string") return false;
	const zero = to.charCodeAt(0);
	if (zero === 47) return to.charCodeAt(1) !== 47;
	return zero === 46;
}
/**
* A strongly-typed anchor component for declarative navigation.
* Handles path, search, hash and state updates with optional route preloading
* and active-state styling.
*
* Props:
* - `preload`: Controls route preloading (eg. 'intent', 'render', 'viewport', true/false)
* - `preloadDelay`: Delay in ms before preloading on focus, hover, or viewport entry
* - `activeProps`/`inactiveProps`: Additional props merged when link is active/inactive
* - `resetScroll`/`hashScrollIntoView`: Control scroll behavior on navigation
* - `viewTransition`/`startTransition`: Use View Transitions/React transitions for navigation
* - `ignoreBlocker`: Bypass registered blockers
*
* @returns An anchor-like element that navigates without full page reloads.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent
*/
var Link = import_react.forwardRef((props, ref) => {
	const { _asChild, ...rest } = props;
	const { type: _type, ...linkProps } = useLinkProps(rest, ref);
	const children = typeof rest.children === "function" ? rest.children({ isActive: linkProps["data-status"] === "active" }) : rest.children;
	if (!_asChild) {
		const { disabled: _, ...rest } = linkProps;
		return import_react.createElement("a", rest, children);
	}
	return import_react.createElement(_asChild, linkProps, children);
});
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/route.js
var Route$2 = class extends BaseRoute {
	/**
	* @deprecated Use the `createRoute` function instead.
	*/
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				select: opts?.select,
				from: this.id,
				structuralSharing: opts?.structuralSharing
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = import_react.forwardRef((props, ref) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				ref,
				from: this.fullPath,
				...props
			});
		});
	}
};
/**
* Creates a non-root Route instance for code-based routing.
*
* Use this to define a route that will be composed into a route tree
* (typically via a parent route's `addChildren`). If you're using file-based
* routing, prefer `createFileRoute`.
*
* @param options Route options (path, component, loader, context, etc.).
* @returns A Route instance to be attached to the route tree.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouteFunction
*/
function createRoute(options) {
	return new Route$2(options);
}
var RootRoute = class extends BaseRootRoute {
	/**
	* @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
	*/
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				select: opts?.select,
				from: this.id,
				structuralSharing: opts?.structuralSharing
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = import_react.forwardRef((props, ref) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				ref,
				from: this.fullPath,
				...props
			});
		});
	}
};
/**
* Creates a root Route instance used to build your route tree.
*
* Typically paired with `createRouter({ routeTree })`. If you need to require
* a typed router context, use `createRootRouteWithContext` instead.
*
* @param options Root route options (component, error, pending, etc.).
* @returns A root route instance.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRootRouteFunction
*/
function createRootRoute(options) {
	return new RootRoute(options);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/fileRoute.js
/**
* Creates a file-based Route factory for a given path.
*
* Used by TanStack Router's file-based routing to associate a file with a
* route. The returned function accepts standard route options. In normal usage
* the `path` string is inserted and maintained by the `tsr` generator.
*
* @param path File path literal for the route (usually auto-generated).
* @returns A function that accepts Route options and returns a Route instance.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createFileRouteFunction
*/
function createFileRoute(path) {
	return (options) => {
		const route = createRoute(options);
		route.isRoot = false;
		return route;
	};
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/lazyRouteComponent.js
/**
* Wrap a dynamic import to create a route component that supports
* `.preload()` and friendly reload-on-module-missing behavior.
*
* @param importer Function returning a module promise
* @param exportName Named export to use (default: `default`)
* @returns A lazy route component compatible with TanStack Router
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/lazyRouteComponentFunction
*/
function lazyRouteComponent(importer, exportName) {
	let loadPromise;
	let comp;
	let error;
	const load = () => {
		if (!loadPromise) {
			error = void 0;
			loadPromise = importer().then((res) => {
				comp = res[exportName ?? "default"];
			}).catch((err) => {
				loadPromise = void 0;
				error = err;
			});
		}
		return loadPromise;
	};
	const lazyComp = function Lazy(props) {
		if (error) {
			if (isModuleNotFoundError(error) && false);
			throw error;
		}
		if (!comp) if (reactUse) reactUse(load());
		else throw load();
		return import_react.createElement(comp, props);
	};
	lazyComp.preload = load;
	return lazyComp;
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/routerStores.js
var getStoreFactory = (opts) => {
	return {
		createMutableStore: createNonReactiveMutableStore,
		createReadonlyStore: createNonReactiveReadonlyStore,
		batch: (fn) => fn()
	};
};
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/router.js
/**
* Creates a new Router instance for React.
*
* Pass the returned router to `RouterProvider` to enable routing.
* Notable options: `routeTree` (your route definitions) and `context`
* (required if the root route was created with `createRootRouteWithContext`).
*
* @param options Router options used to configure the router.
* @returns A Router instance to be provided to `RouterProvider`.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouterFunction
*/
var createRouter = (options) => {
	return new Router(options);
};
var Router = class extends RouterCore {
	constructor(options) {
		super(options, getStoreFactory);
	}
};
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/Asset.js
var INLINE_CSS_HYDRATION_ATTR = "data-tsr-inline-css";
var noopScriptHandler = () => {};
function setScriptAttrs(script, attrs) {
	if (!attrs) return;
	for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
}
function Asset(asset) {
	const { attrs, children, nonce, preventScriptHoist } = asset;
	switch (asset.tag) {
		case "title": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", {
			...attrs,
			suppressHydrationWarning: true,
			children
		});
		case "meta": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			...attrs,
			suppressHydrationWarning: true
		});
		case "link": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
			...attrs,
			precedence: attrs?.precedence ?? (attrs?.rel === "stylesheet" ? "default" : void 0),
			nonce,
			suppressHydrationWarning: true
		});
		case "style":
			if (asset.inlineCss && true) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCssStyle, {
				attrs,
				nonce,
				children
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				...attrs,
				dangerouslySetInnerHTML: { __html: children },
				nonce
			});
		case "script": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Script, {
			attrs,
			preventScriptHoist,
			children
		});
		default: return null;
	}
}
function InlineCssStyle({ attrs, children, nonce }) {
	const isInlineCssPlaceholder = children === void 0;
	const [hydratedInlineCss] = import_react.useState(() => {
		if (!isInlineCssPlaceholder || typeof document === "undefined") return;
		return document.querySelector(`style[${INLINE_CSS_HYDRATION_ATTR}]`)?.textContent ?? void 0;
	});
	const html = isInlineCssPlaceholder ? hydratedInlineCss ?? "" : children ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
		...attrs,
		[INLINE_CSS_HYDRATION_ATTR]: "",
		dangerouslySetInnerHTML: { __html: html },
		nonce,
		suppressHydrationWarning: true
	});
}
function Script({ attrs, children, preventScriptHoist }) {
	useRouter();
	useHydrated();
	const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
	import_react.useEffect(() => {
		if (dataScript) return;
		if (attrs?.src) {
			const normSrc = (() => {
				try {
					const base = document.baseURI || window.location.href;
					return new URL(attrs.src, base).href;
				} catch {
					return attrs.src;
				}
			})();
			for (const el of document.querySelectorAll("script[src]")) if (el.src === normSrc) return;
			const script = document.createElement("script");
			setScriptAttrs(script, attrs);
			document.head.appendChild(script);
			return () => script.remove();
		}
		if (typeof children === "string") {
			const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
			const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
			for (const el of document.querySelectorAll("script:not([src])")) {
				if (!(el instanceof HTMLScriptElement)) continue;
				const sType = el.getAttribute("type") ?? "text/javascript";
				const sNonce = el.getAttribute("nonce") ?? void 0;
				if (el.textContent === children && sType === typeAttr && sNonce === nonceAttr) return;
			}
			const script = document.createElement("script");
			script.textContent = children;
			setScriptAttrs(script, attrs);
			document.head.appendChild(script);
			return () => script.remove();
		}
	}, [
		attrs,
		children,
		dataScript
	]);
	if (attrs?.src) {
		if (!preventScriptHoist) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			...attrs,
			suppressHydrationWarning: true
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			...attrs,
			onLoad: noopScriptHandler,
			suppressHydrationWarning: true
		});
	}
	if (typeof children === "string") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		...attrs,
		dangerouslySetInnerHTML: { __html: children },
		suppressHydrationWarning: true
	});
	return null;
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/headContentUtils.js
function buildTagsFromMatches(router, nonce, matches, assetCrossOrigin) {
	matches = _getAssetMatches(matches);
	const routeMeta = matches.map((match) => match.meta).filter((meta) => meta !== void 0);
	const resultMeta = [];
	const metaByAttribute = {};
	let title;
	for (let i = routeMeta.length - 1; i >= 0; i--) {
		const metas = routeMeta[i];
		for (let j = metas.length - 1; j >= 0; j--) {
			const m = metas[j];
			if (!m) continue;
			if (m.title) {
				if (!title) title = {
					tag: "title",
					children: m.title
				};
			} else if ("script:ld+json" in m) try {
				const json = JSON.stringify(m["script:ld+json"]);
				resultMeta.push({
					tag: "script",
					attrs: { type: "application/ld+json" },
					children: escapeHtml(json)
				});
			} catch {}
			else {
				const attribute = m.name ?? m.property;
				if (attribute) if (metaByAttribute[attribute]) continue;
				else metaByAttribute[attribute] = true;
				resultMeta.push({
					tag: "meta",
					attrs: {
						...m,
						nonce
					}
				});
			}
		}
	}
	if (title) resultMeta.push(title);
	if (nonce) resultMeta.push({
		tag: "meta",
		attrs: {
			property: "csp-nonce",
			content: nonce
		}
	});
	resultMeta.reverse();
	const constructedLinks = matches.flatMap((match) => match.links ?? []).filter((link) => link !== void 0).map((link) => ({
		tag: "link",
		attrs: {
			...link,
			nonce
		}
	}));
	const manifest = router.ssr?.manifest;
	const manifestCssTags = [];
	if (manifest) {
		matches.forEach((match) => {
			(manifest.routes[match.routeId]?.css)?.forEach((link) => {
				const resolvedLink = resolveManifestCssLink(link);
				manifestCssTags.push({
					tag: "link",
					attrs: {
						rel: "stylesheet",
						...resolvedLink,
						crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? resolvedLink.crossOrigin,
						suppressHydrationWarning: true,
						nonce
					}
				});
			});
		});
		if (manifest.inlineStyle) manifestCssTags.push({
			tag: "style",
			attrs: {
				...manifest.inlineStyle.attrs,
				nonce
			},
			children: manifest.inlineStyle.children,
			inlineCss: true
		});
	}
	const preloadLinks = [];
	if (manifest) matches.forEach((match) => {
		manifest.routes[match.routeId]?.preloads?.forEach((preload) => {
			preloadLinks.push({
				tag: "link",
				attrs: {
					...getScriptPreloadAttrs(manifest, preload, assetCrossOrigin),
					nonce
				}
			});
		});
	});
	const styles = matches.flatMap((match) => match.styles ?? []).filter((style) => style !== void 0).map(({ children, ...attrs }) => ({
		tag: "style",
		attrs: {
			...attrs,
			nonce
		},
		children
	}));
	const headScripts = matches.flatMap((match) => match.headScripts ?? []).filter((script) => script !== void 0).map(({ children, ...script }) => ({
		tag: "script",
		attrs: {
			...script,
			nonce
		},
		children
	}));
	const tags = [];
	appendUniqueUserTags(tags, resultMeta);
	tags.push(...preloadLinks);
	appendUniqueUserTags(tags, constructedLinks);
	tags.push(...manifestCssTags);
	appendUniqueUserTags(tags, styles);
	appendUniqueUserTags(tags, headScripts);
	return tags;
}
/**
* Build the head/link/meta/script tags from the renderable presented prefix.
* Used internally by `HeadContent`.
*/
var useTags = (assetCrossOrigin) => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	return buildTagsFromMatches(router, nonce, router.stores.matches.get(), assetCrossOrigin);
};
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/HeadContent.js
/**
* Render route-managed head tags (title, meta, links, styles, head scripts).
* Place inside the document head of your app shell.
* @link https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management
*/
function HeadContent(props) {
	const tags = useTags(props.assetCrossOrigin);
	const nonce = useRouter().options.ssr?.nonce;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: tags.map((tag) => /* @__PURE__ */ (0, import_react.createElement)(Asset, {
		...tag,
		key: `tsr-meta-${JSON.stringify(tag)}`,
		nonce
	})) });
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/Scripts.js
/**
* Render body script tags collected from route matches and SSR manifests.
* Should be placed near the end of the document body.
*/
var Scripts = () => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	const getScripts = (matches) => {
		matches = _getAssetMatches(matches);
		const scripts = matches.flatMap((match) => match.scripts ?? []).filter(Boolean).map(({ children, ...script }) => ({
			tag: "script",
			attrs: {
				...script,
				suppressHydrationWarning: true,
				nonce
			},
			children
		}));
		const manifest = router.ssr?.manifest;
		if (!manifest) return scripts;
		for (const match of matches) {
			const manifestScripts = manifest.routes[match.routeId]?.scripts;
			if (!manifestScripts) continue;
			for (const asset of manifestScripts) scripts.push({
				tag: "script",
				attrs: {
					...asset.attrs,
					nonce
				},
				children: asset.children,
				...typeof asset.attrs?.src === "string" ? { preventScriptHoist: true } : {}
			});
		}
		return scripts;
	};
	return renderScripts(router, getScripts(router.stores.matches.get()));
};
function renderScripts(router, scripts) {
	if (router.serverSsr) {
		const serverBufferedScript = router.serverSsr.takeBufferedScripts();
		if (serverBufferedScript) scripts.unshift(serverBufferedScript);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: scripts.map((asset, i) => /* @__PURE__ */ (0, import_react.createElement)(Asset, {
		...asset,
		key: `tsr-scripts-${asset.tag}-${i}`
	})) });
}
//#endregion
//#region node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
var QueryClientContext = import_react.createContext(void 0);
var QueryClientProvider = ({ client, children }) => {
	import_react.useEffect(() => {
		client.mount();
		return () => {
			client.unmount();
		};
	}, [client]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientContext.Provider, {
		value: client,
		children
	});
};
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var defaultTimeoutProvider = {
	setTimeout: (callback, delay) => setTimeout(callback, delay),
	clearTimeout: (timeoutId) => clearTimeout(timeoutId),
	setInterval: (callback, delay) => setInterval(callback, delay),
	clearInterval: (intervalId) => clearInterval(intervalId)
};
/**
* Allows customization of how timeouts are created.
*
* @tanstack/query-core makes liberal use of timeouts to implement `staleTime`
* and `gcTime`. The default TimeoutManager provider uses the platform's global
* `setTimeout` implementation, which is known to have scalability issues with
* thousands of timeouts on the event loop.
*
* If you hit this limitation, consider providing a custom TimeoutProvider that
* coalesces timeouts.
*/
var TimeoutManager = class {
	#provider = defaultTimeoutProvider;
	#providerCalled = false;
	setTimeoutProvider(provider) {
		this.#provider = provider;
	}
	setTimeout(callback, delay) {
		return this.#provider.setTimeout(callback, delay);
	}
	clearTimeout(timeoutId) {
		this.#provider.clearTimeout(timeoutId);
	}
	setInterval(callback, delay) {
		return this.#provider.setInterval(callback, delay);
	}
	clearInterval(intervalId) {
		this.#provider.clearInterval(intervalId);
	}
};
var timeoutManager = new TimeoutManager();
/**
* In many cases code wants to delay to the next event loop tick; this is not
* mediated by {@link timeoutManager}.
*
* This function is provided to make auditing the `tanstack/query-core` for
* incorrect use of system `setTimeout` easier.
*/
function systemSetTimeoutZero(callback) {
	setTimeout(callback, 0);
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/utils.js
/** @deprecated
* use `environmentManager.isServer()` instead.
*/
var isServer$1 = typeof window === "undefined" || "Deno" in globalThis;
function noop() {}
function functionalUpdate(updater, input) {
	return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
	return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
	return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveQueryValue(value, query) {
	return typeof value === "function" ? value(query) : value;
}
function matchQuery(filters, query) {
	const { type = "all", exact, fetchStatus, predicate, queryKey, stale } = filters;
	if (queryKey) {
		if (exact) {
			if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) return false;
		} else if (!partialMatchKey(query.queryKey, queryKey)) return false;
	}
	if (type !== "all") {
		const isActive = query.isActive();
		if (type === "active" && !isActive) return false;
		if (type === "inactive" && isActive) return false;
	}
	if (typeof stale === "boolean" && query.isStale() !== stale) return false;
	if (fetchStatus && fetchStatus !== query.state.fetchStatus) return false;
	if (predicate && !predicate(query)) return false;
	return true;
}
function matchMutation(filters, mutation) {
	const { exact, status, predicate, mutationKey } = filters;
	if (mutationKey) {
		if (!mutation.options.mutationKey) return false;
		if (exact) {
			if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) return false;
		} else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) return false;
	}
	if (status && mutation.state.status !== status) return false;
	if (predicate && !predicate(mutation)) return false;
	return true;
}
function hashQueryKeyByOptions(queryKey, options) {
	return (options?.queryKeyHashFn || hashKey)(queryKey);
}
/**
* Default query & mutation keys hash function.
* Hashes the value into a stable hash.
*/
function hashKey(queryKey) {
	return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
		result[key] = val[key];
		return result;
	}, {}) : val);
}
function partialMatchKey(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (a && b && typeof a === "object" && typeof b === "object") {
		if (Array.isArray(a) && Array.isArray(b)) {
			for (let i = 0; i < b.length; i++) if (!partialMatchKey(a[i], b[i])) return false;
			return true;
		}
		const bKeys = Object.keys(b);
		for (const key of bKeys) if (!partialMatchKey(a[key], b[key])) return false;
		return true;
	}
	return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b, depth = 0) {
	if (a === b) return a;
	if (depth > 500) return b;
	const array = isPlainArray(a) && isPlainArray(b);
	if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
	const aSize = (array ? a : Object.keys(a)).length;
	const bItems = array ? b : Object.keys(b);
	const bSize = bItems.length;
	const copy = array ? new Array(bSize) : {};
	let equalItems = 0;
	for (let i = 0; i < bSize; i++) {
		const key = array ? i : bItems[i];
		const aItem = a[key];
		const bItem = b[key];
		if (aItem === bItem) {
			copy[key] = aItem;
			if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
			continue;
		}
		if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
			copy[key] = bItem;
			continue;
		}
		const v = replaceEqualDeep(aItem, bItem, depth + 1);
		copy[key] = v;
		if (v === aItem) equalItems++;
	}
	return aSize === bSize && equalItems === aSize ? a : copy;
}
function isPlainArray(value) {
	return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
	if (!hasObjectPrototype(o)) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	const prot = ctor.prototype;
	if (!hasObjectPrototype(prot)) return false;
	if (!prot.hasOwnProperty("isPrototypeOf")) return false;
	if (Object.getPrototypeOf(o) !== Object.prototype) return false;
	return true;
}
function hasObjectPrototype(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
	return new Promise((resolve) => {
		timeoutManager.setTimeout(resolve, timeout);
	});
}
function replaceData(prevData, data, options) {
	if (typeof options.structuralSharing === "function") return options.structuralSharing(prevData, data);
	else if (options.structuralSharing !== false) return replaceEqualDeep(prevData, data);
	return data;
}
function addToEnd(items, item, max = 0) {
	const newItems = [...items, item];
	return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
	const newItems = [item, ...items];
	return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = Symbol();
function ensureQueryFn(options, fetchOptions) {
	if (!options.queryFn && fetchOptions?.initialPromise) return () => fetchOptions.initialPromise;
	if (!options.queryFn || options.queryFn === skipToken) return () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${options.queryHash}'`));
	return options.queryFn;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
	let consumed = false;
	let signal;
	Object.defineProperty(object, "signal", {
		enumerable: true,
		get: () => {
			signal ??= getSignal();
			if (consumed) return signal;
			consumed = true;
			if (signal.aborted) onCancelled();
			else signal.addEventListener("abort", onCancelled, { once: true });
			return signal;
		}
	});
	return object;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/environmentManager.js
var isServerFn = () => isServer$1;
/**
* Returns whether the current runtime should be treated as a server environment.
*/
var isServer = () => isServerFn();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set();
		this.subscribe = this.subscribe.bind(this);
	}
	subscribe(listener) {
		this.listeners.add(listener);
		this.onSubscribe();
		return () => {
			this.listeners.delete(listener);
			this.onUnsubscribe();
		};
	}
	hasListeners() {
		return this.listeners.size > 0;
	}
	onSubscribe() {}
	onUnsubscribe() {}
};
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/focusManager.js
var FocusManager = class extends Subscribable {
	#focused;
	#cleanup;
	#setup;
	constructor() {
		super();
		this.#setup = (onFocus) => {
			if (typeof window !== "undefined" && window.addEventListener) {
				const listener = () => onFocus();
				window.addEventListener("visibilitychange", listener, false);
				return () => {
					window.removeEventListener("visibilitychange", listener);
				};
			}
		};
	}
	onSubscribe() {
		if (!this.#cleanup) this.setEventListener(this.#setup);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			this.#cleanup?.();
			this.#cleanup = void 0;
		}
	}
	setEventListener(setup) {
		this.#setup = setup;
		this.#cleanup?.();
		this.#cleanup = setup((focused) => {
			if (typeof focused === "boolean") this.setFocused(focused);
			else this.onFocus();
		});
	}
	setFocused(focused) {
		if (this.#focused !== focused) {
			this.#focused = focused;
			this.onFocus();
		}
	}
	onFocus() {
		const isFocused = this.isFocused();
		this.listeners.forEach((listener) => {
			listener(isFocused);
		});
	}
	isFocused() {
		if (typeof this.#focused === "boolean") return this.#focused;
		return globalThis.document?.visibilityState !== "hidden";
	}
};
var focusManager = new FocusManager();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/notifyManager.js
var defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
	let queue = [];
	let transactions = 0;
	let notifyFn = (callback) => {
		callback();
	};
	let batchNotifyFn = (callback) => {
		callback();
	};
	let scheduleFn = defaultScheduler;
	const schedule = (callback) => {
		if (transactions) queue.push(callback);
		else scheduleFn(() => {
			notifyFn(callback);
		});
	};
	const flush = () => {
		const originalQueue = queue;
		queue = [];
		if (originalQueue.length) scheduleFn(() => {
			batchNotifyFn(() => {
				originalQueue.forEach((callback) => {
					notifyFn(callback);
				});
			});
		});
	};
	return {
		batch: (callback) => {
			let result;
			transactions++;
			try {
				result = callback();
			} finally {
				transactions--;
				if (!transactions) flush();
			}
			return result;
		},
		/**
		* All calls to the wrapped function will be batched.
		*/
		batchCalls: (callback) => {
			return (...args) => {
				schedule(() => {
					callback(...args);
				});
			};
		},
		schedule,
		/**
		* Use this method to set a custom notify function.
		* This can be used to for example wrap notifications with `React.act` while running tests.
		*/
		setNotifyFunction: (fn) => {
			notifyFn = fn;
		},
		/**
		* Use this method to set a custom function to batch notifications together into a single tick.
		* By default React Query will use the batch function provided by ReactDOM or React Native.
		*/
		setBatchNotifyFunction: (fn) => {
			batchNotifyFn = fn;
		},
		setScheduler: (fn) => {
			scheduleFn = fn;
		}
	};
}
var notifyManager = createNotifyManager();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/onlineManager.js
var OnlineManager = class extends Subscribable {
	#online = true;
	#cleanup;
	#setup;
	constructor() {
		super();
		this.#setup = (onOnline) => {
			if (typeof window !== "undefined" && window.addEventListener) {
				const onlineListener = () => onOnline(true);
				const offlineListener = () => onOnline(false);
				window.addEventListener("online", onlineListener, false);
				window.addEventListener("offline", offlineListener, false);
				return () => {
					window.removeEventListener("online", onlineListener);
					window.removeEventListener("offline", offlineListener);
				};
			}
		};
	}
	onSubscribe() {
		if (!this.#cleanup) this.setEventListener(this.#setup);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			this.#cleanup?.();
			this.#cleanup = void 0;
		}
	}
	setEventListener(setup) {
		this.#setup = setup;
		this.#cleanup?.();
		this.#cleanup = setup(this.setOnline.bind(this));
	}
	setOnline(online) {
		if (this.#online !== online) {
			this.#online = online;
			this.listeners.forEach((listener) => {
				listener(online);
			});
		}
	}
	isOnline() {
		return this.#online;
	}
};
var onlineManager = new OnlineManager();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
	return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
	return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
	constructor(options) {
		super("CancelledError");
		this.revert = options?.revert;
		this.silent = options?.silent;
	}
};
function createRetryer(config) {
	let isRetryCancelled = false;
	let failureCount = 0;
	let continueFn;
	let status = "pending";
	let promiseResolve;
	let promiseReject;
	const promise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});
	promise.catch(noop);
	const isResolved = () => status !== "pending";
	const cancel = (cancelOptions) => {
		if (!isResolved()) {
			const error = new CancelledError(cancelOptions);
			reject(error);
			config.onCancel?.(error);
		}
	};
	const cancelRetry = () => {
		isRetryCancelled = true;
	};
	const continueRetry = () => {
		isRetryCancelled = false;
	};
	const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
	const canStart = () => canFetch(config.networkMode) && config.canRun();
	const resolve = (value) => {
		if (!isResolved()) {
			continueFn?.();
			status = "resolved";
			promiseResolve(value);
		}
	};
	const reject = (value) => {
		if (!isResolved()) {
			continueFn?.();
			status = "rejected";
			promiseReject(value);
		}
	};
	const pause = () => {
		return new Promise((continueResolve) => {
			continueFn = (value) => {
				if (isResolved() || canContinue()) continueResolve(value);
			};
			config.onPause?.();
		}).then(() => {
			continueFn = void 0;
			if (!isResolved()) config.onContinue?.();
		});
	};
	const run = () => {
		if (isResolved()) return;
		let promiseOrValue;
		const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
		try {
			promiseOrValue = initialPromise ?? config.fn();
		} catch (error) {
			promiseOrValue = Promise.reject(error);
		}
		Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
			if (isResolved()) return;
			const retry = config.retry ?? (isServer() ? 0 : 3);
			const retryDelay = config.retryDelay ?? defaultRetryDelay;
			const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
			const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
			if (isRetryCancelled || !shouldRetry) {
				reject(error);
				return;
			}
			failureCount++;
			config.onFail?.(failureCount, error);
			sleep(delay).then(() => {
				return canContinue() ? void 0 : pause();
			}).then(() => {
				if (isRetryCancelled) reject(error);
				else run();
			});
		});
	};
	return {
		promise,
		status: () => status,
		cancel,
		continue: () => {
			continueFn?.();
			return promise;
		},
		cancelRetry,
		continueRetry,
		canStart,
		start: () => {
			if (canStart()) run();
			else pause().then(run);
			return promise;
		}
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/removable.js
var Removable = class {
	#gcTimeout;
	destroy() {
		this.clearGcTimeout();
	}
	scheduleGc() {
		this.clearGcTimeout();
		if (isValidTimeout(this.gcTime)) this.#gcTimeout = timeoutManager.setTimeout(() => {
			this.optionalRemove();
		}, this.gcTime);
	}
	updateGcTime(newGcTime) {
		this.gcTime = Math.max(this.gcTime || 0, newGcTime ?? (isServer() ? Infinity : 3e5));
	}
	clearGcTimeout() {
		if (this.#gcTimeout !== void 0) {
			timeoutManager.clearTimeout(this.#gcTimeout);
			this.#gcTimeout = void 0;
		}
	}
};
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function infiniteQueryBehavior(pages) {
	return { onFetch: (context, query) => {
		const options = context.options;
		const direction = context.fetchOptions?.meta?.fetchMore?.direction;
		const oldPages = context.state.data?.pages || [];
		const oldPageParams = context.state.data?.pageParams || [];
		let result = {
			pages: [],
			pageParams: []
		};
		let currentPage = 0;
		const fetchFn = async () => {
			let cancelled = false;
			const addSignalProperty = (object) => {
				addConsumeAwareSignal(object, () => context.signal, () => cancelled = true);
			};
			const queryFn = ensureQueryFn(context.options, context.fetchOptions);
			const fetchPage = async (data, param, previous) => {
				if (cancelled) return Promise.reject(context.signal.reason);
				if (param == null && data.pages.length) return Promise.resolve(data);
				const createQueryFnContext = () => {
					const queryFnContext = {
						client: context.client,
						queryKey: context.queryKey,
						pageParam: param,
						direction: previous ? "backward" : "forward",
						meta: context.options.meta
					};
					addSignalProperty(queryFnContext);
					return queryFnContext;
				};
				const queryFnContext = createQueryFnContext();
				const page = await queryFn(queryFnContext);
				const { maxPages } = context.options;
				const addTo = previous ? addToStart : addToEnd;
				return {
					pages: addTo(data.pages, page, maxPages),
					pageParams: addTo(data.pageParams, param, maxPages)
				};
			};
			if (direction && oldPages.length) {
				const previous = direction === "backward";
				const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
				const oldData = {
					pages: oldPages,
					pageParams: oldPageParams
				};
				result = await fetchPage(oldData, pageParamFn(options, oldData), previous);
			} else {
				const remainingPages = pages ?? oldPages.length;
				do {
					const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
					if (currentPage > 0 && param == null) break;
					result = await fetchPage(result, param);
					currentPage++;
				} while (currentPage < remainingPages);
			}
			return result;
		};
		if (context.options.persister) context.fetchFn = () => {
			return context.options.persister?.(fetchFn, {
				client: context.client,
				queryKey: context.queryKey,
				meta: context.options.meta,
				signal: context.signal
			}, query);
		};
		else context.fetchFn = fetchFn;
	} };
}
function getNextPageParam(options, { pages, pageParams }) {
	const lastIndex = pages.length - 1;
	return pages.length > 0 ? options.getNextPageParam(pages[lastIndex], pages, pageParams[lastIndex], pageParams) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
	return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/query.js
var Query = class extends Removable {
	#queryType;
	#initialState;
	#revertState;
	#cache;
	#client;
	#retryer;
	#defaultOptions;
	#abortSignalConsumed;
	constructor(config) {
		super();
		this.#abortSignalConsumed = false;
		this.#defaultOptions = config.defaultOptions;
		this.setOptions(config.options);
		this.observers = [];
		this.#client = config.client;
		this.#cache = this.#client.getQueryCache();
		this.queryKey = config.queryKey;
		this.queryHash = config.queryHash;
		this.#initialState = getDefaultState$1(this.options);
		this.state = config.state ?? this.#initialState;
		this.scheduleGc();
	}
	get meta() {
		return this.options.meta;
	}
	get queryType() {
		return this.#queryType;
	}
	get promise() {
		return this.#retryer?.promise;
	}
	setOptions(options) {
		this.options = {
			...this.#defaultOptions,
			...options
		};
		if (options?._type) this.#queryType = options._type;
		this.updateGcTime(this.options.gcTime);
		if (this.state && this.state.data === void 0) {
			const defaultState = getDefaultState$1(this.options);
			if (defaultState.data !== void 0) {
				this.setState(successState(defaultState.data, defaultState.dataUpdatedAt));
				this.#initialState = defaultState;
			}
		}
	}
	optionalRemove() {
		if (!this.observers.length && this.state.fetchStatus === "idle") this.#cache.remove(this);
	}
	setData(newData, options) {
		const data = replaceData(this.state.data, newData, this.options);
		this.#dispatch({
			data,
			type: "success",
			dataUpdatedAt: options?.updatedAt,
			manual: options?.manual
		});
		return data;
	}
	setState(state) {
		this.#dispatch({
			type: "setState",
			state
		});
	}
	cancel(options) {
		const promise = this.#retryer?.promise;
		this.#retryer?.cancel(options);
		return promise ? promise.then(noop).catch(noop) : Promise.resolve();
	}
	destroy() {
		super.destroy();
		this.cancel({ silent: true });
	}
	get resetState() {
		return this.#initialState;
	}
	reset() {
		this.destroy();
		this.setState(this.resetState);
	}
	isActive() {
		return this.observers.some((observer) => resolveQueryValue(observer.options.enabled, this) !== false);
	}
	isDisabled() {
		if (this.getObserversCount() > 0) return !this.isActive();
		return this.options.queryFn === skipToken || !this.isFetched();
	}
	isFetched() {
		return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
	}
	isStatic() {
		if (this.getObserversCount() > 0) return this.observers.some((observer) => resolveQueryValue(observer.options.staleTime, this) === "static");
		return false;
	}
	isStale() {
		if (this.getObserversCount() > 0) return this.observers.some((observer) => observer.getCurrentResult().isStale);
		return this.state.data === void 0 || this.state.isInvalidated;
	}
	isStaleByTime(staleTime = 0) {
		if (this.state.data === void 0) return true;
		if (staleTime === "static") return false;
		if (this.state.isInvalidated) return true;
		return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
	}
	onFocus() {
		this.observers.find((x) => x.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: false });
		this.#retryer?.continue();
	}
	onOnline() {
		this.observers.find((x) => x.shouldFetchOnReconnect())?.refetch({ cancelRefetch: false });
		this.#retryer?.continue();
	}
	addObserver(observer) {
		if (!this.observers.includes(observer)) {
			this.observers.push(observer);
			this.clearGcTimeout();
			this.#cache.notify({
				type: "observerAdded",
				query: this,
				observer
			});
		}
	}
	removeObserver(observer) {
		const index = this.observers.indexOf(observer);
		if (index !== -1) {
			this.observers.splice(index, 1);
			if (!this.observers.length) {
				if (this.#retryer) {
					if (this.#abortSignalConsumed || this.state.fetchStatus === "paused" && this.state.status === "pending") this.#retryer.cancel({ revert: true });
					else this.#retryer.cancelRetry();
				}
				this.scheduleGc();
			}
			this.#cache.notify({
				type: "observerRemoved",
				query: this,
				observer
			});
		}
	}
	getObserversCount() {
		return this.observers.length;
	}
	invalidate() {
		if (!this.state.isInvalidated) this.#dispatch({ type: "invalidate" });
	}
	async fetch(options, fetchOptions) {
		if (this.state.fetchStatus !== "idle" && this.#retryer?.status() !== "rejected") {
			if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) this.cancel({ silent: true });
			else if (this.#retryer) {
				this.#retryer.continueRetry();
				return this.#retryer.promise;
			}
		}
		if (options) this.setOptions(options);
		if (!this.options.queryFn) {
			const observer = this.observers.find((x) => x.options.queryFn);
			if (observer) this.setOptions(observer.options);
		}
		const abortController = new AbortController();
		const addSignalProperty = (object) => {
			Object.defineProperty(object, "signal", {
				enumerable: true,
				get: () => {
					this.#abortSignalConsumed = true;
					return abortController.signal;
				}
			});
		};
		const fetchFn = () => {
			const queryFn = ensureQueryFn(this.options, fetchOptions);
			const createQueryFnContext = () => {
				const queryFnContext = {
					client: this.#client,
					queryKey: this.queryKey,
					meta: this.meta
				};
				addSignalProperty(queryFnContext);
				return queryFnContext;
			};
			const queryFnContext = createQueryFnContext();
			this.#abortSignalConsumed = false;
			if (this.options.persister) return this.options.persister(queryFn, queryFnContext, this);
			return queryFn(queryFnContext);
		};
		const createFetchContext = () => {
			const context = {
				fetchOptions,
				options: this.options,
				queryKey: this.queryKey,
				client: this.#client,
				state: this.state,
				fetchFn
			};
			addSignalProperty(context);
			return context;
		};
		const context = createFetchContext();
		(this.#queryType === "infinite" ? infiniteQueryBehavior(this.options.pages) : this.options.behavior)?.onFetch(context, this);
		this.#revertState = this.state;
		if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) this.#dispatch({
			type: "fetch",
			meta: context.fetchOptions?.meta
		});
		const retryer = this.#retryer = createRetryer({
			initialPromise: fetchOptions?.initialPromise,
			fn: context.fetchFn,
			onCancel: (error) => {
				if (error instanceof CancelledError && error.revert) this.setState({
					...this.#revertState,
					fetchStatus: "idle"
				});
				abortController.abort();
			},
			onFail: (failureCount, error) => {
				this.#dispatch({
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				this.#dispatch({ type: "pause" });
			},
			onContinue: () => {
				this.#dispatch({ type: "continue" });
			},
			retry: context.options.retry,
			retryDelay: context.options.retryDelay,
			networkMode: context.options.networkMode,
			canRun: () => true
		});
		try {
			const data = await retryer.start();
			if (data === void 0) throw new Error(`${this.queryHash} data is undefined`);
			this.setData(data);
			this.#cache.config.onSuccess?.(data, this);
			this.#cache.config.onSettled?.(data, this.state.error, this);
			return data;
		} catch (error) {
			if (error instanceof CancelledError) {
				if (error.silent) return this.#retryer.promise;
				else if (error.revert) {
					if (this.state.data === void 0) throw error;
					return this.state.data;
				}
			}
			this.#dispatch({
				type: "error",
				error
			});
			this.#cache.config.onError?.(error, this);
			this.#cache.config.onSettled?.(this.state.data, error, this);
			throw error;
		} finally {
			if (this.#retryer === retryer) this.#retryer = void 0;
			this.scheduleGc();
		}
	}
	#dispatch(action) {
		const reducer = (state) => {
			switch (action.type) {
				case "failed": return {
					...state,
					fetchFailureCount: action.failureCount,
					fetchFailureReason: action.error
				};
				case "pause": return {
					...state,
					fetchStatus: "paused"
				};
				case "continue": return {
					...state,
					fetchStatus: "fetching"
				};
				case "fetch": return {
					...state,
					...fetchState(state.data, this.options),
					fetchMeta: action.meta ?? null
				};
				case "success":
					const newState = {
						...state,
						...successState(action.data, action.dataUpdatedAt),
						dataUpdateCount: state.dataUpdateCount + 1,
						...!action.manual && {
							fetchStatus: "idle",
							fetchFailureCount: 0,
							fetchFailureReason: null
						}
					};
					this.#revertState = action.manual ? newState : void 0;
					return newState;
				case "error":
					const error = action.error;
					return {
						...state,
						error,
						errorUpdateCount: state.errorUpdateCount + 1,
						errorUpdatedAt: Date.now(),
						fetchFailureCount: state.fetchFailureCount + 1,
						fetchFailureReason: error,
						fetchStatus: "idle",
						status: "error",
						isInvalidated: true
					};
				case "invalidate": return {
					...state,
					isInvalidated: true
				};
				case "setState": return {
					...state,
					...action.state
				};
			}
		};
		this.state = reducer(this.state);
		notifyManager.batch(() => {
			this.observers.slice().forEach((observer) => {
				observer.onQueryUpdate();
			});
			this.#cache.notify({
				query: this,
				type: "updated",
				action
			});
		});
	}
};
function fetchState(data, options) {
	return {
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
		...data === void 0 && {
			error: null,
			status: "pending"
		}
	};
}
function successState(data, dataUpdatedAt) {
	return {
		data,
		dataUpdatedAt: dataUpdatedAt ?? Date.now(),
		error: null,
		isInvalidated: false,
		status: "success"
	};
}
function getDefaultState$1(options) {
	const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
	const hasData = data !== void 0;
	const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
	return {
		data,
		dataUpdateCount: 0,
		dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
		error: null,
		errorUpdateCount: 0,
		errorUpdatedAt: 0,
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchMeta: null,
		isInvalidated: false,
		status: hasData ? "success" : "pending",
		fetchStatus: "idle"
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/mutation.js
var Mutation = class extends Removable {
	#client;
	#observers;
	#mutationCache;
	#retryer;
	constructor(config) {
		super();
		this.#client = config.client;
		this.mutationId = config.mutationId;
		this.#mutationCache = config.mutationCache;
		this.#observers = [];
		this.state = config.state || getDefaultState();
		this.setOptions(config.options);
		this.scheduleGc();
	}
	setOptions(options) {
		this.options = options;
		this.updateGcTime(this.options.gcTime);
	}
	get meta() {
		return this.options.meta;
	}
	addObserver(observer) {
		if (!this.#observers.includes(observer)) {
			this.#observers.push(observer);
			this.clearGcTimeout();
			this.#mutationCache.notify({
				type: "observerAdded",
				mutation: this,
				observer
			});
		}
	}
	removeObserver(observer) {
		this.#observers = this.#observers.filter((x) => x !== observer);
		this.scheduleGc();
		this.#mutationCache.notify({
			type: "observerRemoved",
			mutation: this,
			observer
		});
	}
	optionalRemove() {
		if (!this.#observers.length) {
			if (this.state.status === "pending") this.scheduleGc();
			else this.#mutationCache.remove(this);
		}
	}
	continue() {
		return this.#retryer?.continue() ?? (this.state.status === "pending" ? this.execute(this.state.variables) : Promise.resolve());
	}
	async execute(variables) {
		const onContinue = () => {
			this.#dispatch({ type: "continue" });
		};
		const mutationFnContext = {
			client: this.#client,
			meta: this.options.meta,
			mutationKey: this.options.mutationKey
		};
		const retryer = this.#retryer = createRetryer({
			fn: () => {
				if (!this.options.mutationFn) return Promise.reject(/* @__PURE__ */ new Error("No mutationFn found"));
				return this.options.mutationFn(variables, mutationFnContext);
			},
			onFail: (failureCount, error) => {
				this.#dispatch({
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				this.#dispatch({ type: "pause" });
			},
			onContinue,
			retry: this.options.retry ?? 0,
			retryDelay: this.options.retryDelay,
			networkMode: this.options.networkMode,
			canRun: () => this.#mutationCache.canRun(this)
		});
		const restored = this.state.status === "pending";
		const isPaused = !retryer.canStart();
		try {
			if (restored) onContinue();
			else {
				this.#dispatch({
					type: "pending",
					variables,
					isPaused
				});
				if (this.#mutationCache.config.onMutate) await this.#mutationCache.config.onMutate(variables, this, mutationFnContext);
				const context = await this.options.onMutate?.(variables, mutationFnContext);
				if (context !== this.state.context) this.#dispatch({
					type: "pending",
					context,
					variables,
					isPaused
				});
			}
			const data = await retryer.start();
			await this.#mutationCache.config.onSuccess?.(data, variables, this.state.context, this, mutationFnContext);
			await this.options.onSuccess?.(data, variables, this.state.context, mutationFnContext);
			await this.#mutationCache.config.onSettled?.(data, null, this.state.variables, this.state.context, this, mutationFnContext);
			await this.options.onSettled?.(data, null, variables, this.state.context, mutationFnContext);
			this.#dispatch({
				type: "success",
				data
			});
			return data;
		} catch (error) {
			try {
				await this.#mutationCache.config.onError?.(error, variables, this.state.context, this, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onError?.(error, variables, this.state.context, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.#mutationCache.config.onSettled?.(void 0, error, this.state.variables, this.state.context, this, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onSettled?.(void 0, error, variables, this.state.context, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			this.#dispatch({
				type: "error",
				error
			});
			throw error;
		} finally {
			if (this.#retryer === retryer) this.#retryer = void 0;
			this.#mutationCache.runNext(this);
		}
	}
	#dispatch(action) {
		const reducer = (state) => {
			switch (action.type) {
				case "failed": return {
					...state,
					failureCount: action.failureCount,
					failureReason: action.error
				};
				case "pause": return {
					...state,
					isPaused: true
				};
				case "continue": return {
					...state,
					isPaused: false
				};
				case "pending": return {
					...state,
					context: action.context,
					data: void 0,
					failureCount: 0,
					failureReason: null,
					error: null,
					isPaused: action.isPaused,
					status: "pending",
					variables: action.variables,
					submittedAt: Date.now()
				};
				case "success": return {
					...state,
					data: action.data,
					failureCount: 0,
					failureReason: null,
					error: null,
					status: "success",
					isPaused: false
				};
				case "error": return {
					...state,
					data: void 0,
					error: action.error,
					failureCount: state.failureCount + 1,
					failureReason: action.error,
					isPaused: false,
					status: "error"
				};
			}
		};
		this.state = reducer(this.state);
		notifyManager.batch(() => {
			this.#observers.forEach((observer) => {
				observer.onMutationUpdate(action);
			});
			this.#mutationCache.notify({
				mutation: this,
				type: "updated",
				action
			});
		});
	}
};
function getDefaultState() {
	return {
		context: void 0,
		data: void 0,
		error: null,
		failureCount: 0,
		failureReason: null,
		isPaused: false,
		status: "idle",
		variables: void 0,
		submittedAt: 0
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/mutationCache.js
var MutationCache = class extends Subscribable {
	#mutations;
	#scopes;
	#mutationId;
	constructor(config = {}) {
		super();
		this.config = config;
		this.#mutations = /* @__PURE__ */ new Set();
		this.#scopes = /* @__PURE__ */ new Map();
		this.#mutationId = 0;
	}
	build(client, options, state) {
		const mutation = new Mutation({
			client,
			mutationCache: this,
			mutationId: ++this.#mutationId,
			options: client.defaultMutationOptions(options),
			state
		});
		this.add(mutation);
		return mutation;
	}
	add(mutation) {
		this.#mutations.add(mutation);
		const scope = scopeFor(mutation);
		if (typeof scope === "string") {
			const scopedMutations = this.#scopes.get(scope);
			if (scopedMutations) scopedMutations.push(mutation);
			else this.#scopes.set(scope, [mutation]);
		}
		this.notify({
			type: "added",
			mutation
		});
	}
	remove(mutation) {
		if (this.#mutations.delete(mutation)) {
			const scope = scopeFor(mutation);
			if (typeof scope === "string") {
				const scopedMutations = this.#scopes.get(scope);
				if (scopedMutations) {
					if (scopedMutations.length > 1) {
						const index = scopedMutations.indexOf(mutation);
						if (index !== -1) scopedMutations.splice(index, 1);
					} else if (scopedMutations[0] === mutation) this.#scopes.delete(scope);
				}
			}
		}
		this.notify({
			type: "removed",
			mutation
		});
	}
	canRun(mutation) {
		const scope = scopeFor(mutation);
		if (typeof scope === "string") {
			const firstPendingMutation = this.#scopes.get(scope)?.find((m) => m.state.status === "pending");
			return !firstPendingMutation || firstPendingMutation === mutation;
		} else return true;
	}
	runNext(mutation) {
		const scope = scopeFor(mutation);
		if (typeof scope === "string") return (this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused))?.continue() ?? Promise.resolve();
		else return Promise.resolve();
	}
	clear() {
		notifyManager.batch(() => {
			this.#mutations.forEach((mutation) => {
				this.notify({
					type: "removed",
					mutation
				});
			});
			this.#mutations.clear();
			this.#scopes.clear();
		});
	}
	getAll() {
		return Array.from(this.#mutations);
	}
	find(filters) {
		const defaultedFilters = {
			exact: true,
			...filters
		};
		return this.getAll().find((mutation) => matchMutation(defaultedFilters, mutation));
	}
	findAll(filters = {}) {
		return this.getAll().filter((mutation) => matchMutation(filters, mutation));
	}
	notify(event) {
		notifyManager.batch(() => {
			this.listeners.forEach((listener) => {
				listener(event);
			});
		});
	}
	resumePausedMutations() {
		const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
		return notifyManager.batch(() => Promise.all(pausedMutations.map((mutation) => mutation.continue().catch(noop))));
	}
};
function scopeFor(mutation) {
	return mutation.options.scope?.id;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/queryCache.js
var QueryCache = class extends Subscribable {
	#queries;
	constructor(config = {}) {
		super();
		this.config = config;
		this.#queries = /* @__PURE__ */ new Map();
	}
	build(client, options, state) {
		const queryKey = options.queryKey;
		const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
		let query = this.get(queryHash);
		if (!query) {
			query = new Query({
				client,
				queryKey,
				queryHash,
				options: client.defaultQueryOptions(options),
				state,
				defaultOptions: client.getQueryDefaults(queryKey)
			});
			this.add(query);
		}
		return query;
	}
	add(query) {
		if (!this.#queries.has(query.queryHash)) {
			this.#queries.set(query.queryHash, query);
			this.notify({
				type: "added",
				query
			});
		}
	}
	remove(query) {
		const queryInMap = this.#queries.get(query.queryHash);
		if (queryInMap) {
			query.destroy();
			if (queryInMap === query) this.#queries.delete(query.queryHash);
			this.notify({
				type: "removed",
				query
			});
		}
	}
	clear() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				this.remove(query);
			});
		});
	}
	get(queryHash) {
		return this.#queries.get(queryHash);
	}
	getAll() {
		return [...this.#queries.values()];
	}
	find(filters) {
		const defaultedFilters = {
			exact: true,
			...filters
		};
		return this.getAll().find((query) => matchQuery(defaultedFilters, query));
	}
	findAll(filters = {}) {
		const queries = this.getAll();
		return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
	}
	notify(event) {
		notifyManager.batch(() => {
			this.listeners.forEach((listener) => {
				listener(event);
			});
		});
	}
	onFocus() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				query.onFocus();
			});
		});
	}
	onOnline() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				query.onOnline();
			});
		});
	}
};
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/queryClient.js
var QueryClient = class {
	#queryCache;
	#mutationCache;
	#defaultOptions;
	#queryDefaults;
	#mutationDefaults;
	#mountCount;
	#unsubscribeFocus;
	#unsubscribeOnline;
	constructor(config = {}) {
		this.#queryCache = config.queryCache || new QueryCache();
		this.#mutationCache = config.mutationCache || new MutationCache();
		this.#defaultOptions = config.defaultOptions || {};
		this.#queryDefaults = /* @__PURE__ */ new Map();
		this.#mutationDefaults = /* @__PURE__ */ new Map();
		this.#mountCount = 0;
	}
	mount() {
		this.#mountCount++;
		if (this.#mountCount !== 1) return;
		this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
			if (focused) {
				await this.resumePausedMutations();
				this.#queryCache.onFocus();
			}
		});
		this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
			if (online) {
				await this.resumePausedMutations();
				this.#queryCache.onOnline();
			}
		});
	}
	unmount() {
		this.#mountCount--;
		if (this.#mountCount !== 0) return;
		this.#unsubscribeFocus?.();
		this.#unsubscribeFocus = void 0;
		this.#unsubscribeOnline?.();
		this.#unsubscribeOnline = void 0;
	}
	isFetching(filters) {
		return this.#queryCache.findAll({
			...filters,
			fetchStatus: "fetching"
		}).length;
	}
	isMutating(filters) {
		return this.#mutationCache.findAll({
			...filters,
			status: "pending"
		}).length;
	}
	/**
	* Imperative (non-reactive) way to retrieve data for a QueryKey.
	* Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
	*
	* Hint: Do not use this function inside a component, because it won't receive updates.
	* Use `useQuery` to create a `QueryObserver` that subscribes to changes.
	*/
	getQueryData(queryKey) {
		const options = this.defaultQueryOptions({ queryKey });
		return this.#queryCache.get(options.queryHash)?.state.data;
	}
	/**
	* @deprecated Use queryClient.query({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
	*/
	ensureQueryData(options) {
		const defaultedOptions = this.defaultQueryOptions(options);
		const query = this.#queryCache.build(this, defaultedOptions);
		const cachedData = query.state.data;
		if (cachedData === void 0) return this.fetchQuery(options);
		if (options.revalidateIfStale && query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query))) this.prefetchQuery(defaultedOptions);
		return Promise.resolve(cachedData);
	}
	getQueriesData(filters) {
		return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
			return [queryKey, state.data];
		});
	}
	setQueryData(queryKey, updater, options) {
		const defaultedOptions = this.defaultQueryOptions({ queryKey });
		const prevData = this.#queryCache.get(defaultedOptions.queryHash)?.state.data;
		const data = functionalUpdate(updater, prevData);
		if (data === void 0) return;
		return this.#queryCache.build(this, defaultedOptions).setData(data, {
			...options,
			manual: true
		});
	}
	setQueriesData(filters, updater, options) {
		return notifyManager.batch(() => this.#queryCache.findAll(filters).map(({ queryKey }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
	}
	getQueryState(queryKey) {
		const options = this.defaultQueryOptions({ queryKey });
		return this.#queryCache.get(options.queryHash)?.state;
	}
	removeQueries(filters) {
		const queryCache = this.#queryCache;
		notifyManager.batch(() => {
			queryCache.findAll(filters).forEach((query) => {
				queryCache.remove(query);
			});
		});
	}
	resetQueries(filters, options) {
		const queryCache = this.#queryCache;
		return notifyManager.batch(() => {
			const matched = queryCache.findAll(filters);
			const queriesToRefetch = new Set(matched);
			matched.forEach((query) => {
				query.reset();
			});
			return this.refetchQueries({
				type: "active",
				predicate: (query) => queriesToRefetch.has(query)
			}, options);
		});
	}
	cancelQueries(filters, cancelOptions = {}) {
		const defaultedCancelOptions = {
			revert: true,
			...cancelOptions
		};
		const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions)));
		return Promise.all(promises).then(noop).catch(noop);
	}
	invalidateQueries(filters, options = {}) {
		return notifyManager.batch(() => {
			this.#queryCache.findAll(filters).forEach((query) => {
				query.invalidate();
			});
			if (filters?.refetchType === "none") return Promise.resolve();
			return this.refetchQueries({
				...filters,
				type: filters?.refetchType ?? filters?.type ?? "active"
			}, options);
		});
	}
	refetchQueries(filters, options = {}) {
		const fetchOptions = {
			...options,
			cancelRefetch: options.cancelRefetch ?? true
		};
		const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
			let promise = query.fetch(void 0, fetchOptions);
			if (!fetchOptions.throwOnError) promise = promise.catch(noop);
			return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
		}));
		return Promise.all(promises).then(noop);
	}
	async query(options) {
		const defaultedOptions = this.defaultQueryOptions(options);
		if (defaultedOptions.retry === void 0) defaultedOptions.retry = false;
		const query = this.#queryCache.build(this, defaultedOptions);
		const queryData = query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query)) ? await query.fetch(defaultedOptions) : query.state.data;
		const select = defaultedOptions.select;
		if (select) return select(queryData);
		return queryData;
	}
	/**
	* @deprecated Use queryClient.query(options) instead. This method will be removed in the next major version.
	*/
	fetchQuery(options) {
		const defaultedOptions = this.defaultQueryOptions(options);
		if (defaultedOptions.retry === void 0) defaultedOptions.retry = false;
		const query = this.#queryCache.build(this, defaultedOptions);
		return query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query)) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
	}
	/**
	* @deprecated Use queryClient.query(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
	*/
	prefetchQuery(options) {
		return this.fetchQuery(options).then(noop).catch(noop);
	}
	infiniteQuery(options) {
		options._type = "infinite";
		return this.query(options);
	}
	/**
	* @deprecated Use queryClient.infiniteQuery(options) instead. This method will be removed in the next major version.
	*/
	fetchInfiniteQuery(options) {
		options._type = "infinite";
		return this.fetchQuery(options);
	}
	/**
	* @deprecated Use queryClient.infiniteQuery(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
	*/
	prefetchInfiniteQuery(options) {
		return this.fetchInfiniteQuery(options).then(noop).catch(noop);
	}
	/**
	* @deprecated Use queryClient.infiniteQuery({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
	*/
	ensureInfiniteQueryData(options) {
		options._type = "infinite";
		return this.ensureQueryData(options);
	}
	resumePausedMutations() {
		if (onlineManager.isOnline()) return this.#mutationCache.resumePausedMutations();
		return Promise.resolve();
	}
	getQueryCache() {
		return this.#queryCache;
	}
	getMutationCache() {
		return this.#mutationCache;
	}
	getDefaultOptions() {
		return this.#defaultOptions;
	}
	setDefaultOptions(options) {
		this.#defaultOptions = options;
	}
	setQueryDefaults(queryKey, options) {
		this.#queryDefaults.set(hashKey(queryKey), {
			queryKey,
			defaultOptions: options
		});
	}
	getQueryDefaults(queryKey) {
		const defaults = [...this.#queryDefaults.values()];
		const result = {};
		defaults.forEach((queryDefault) => {
			if (partialMatchKey(queryKey, queryDefault.queryKey)) Object.assign(result, queryDefault.defaultOptions);
		});
		return result;
	}
	setMutationDefaults(mutationKey, options) {
		this.#mutationDefaults.set(hashKey(mutationKey), {
			mutationKey,
			defaultOptions: options
		});
	}
	getMutationDefaults(mutationKey) {
		const defaults = [...this.#mutationDefaults.values()];
		const result = {};
		defaults.forEach((queryDefault) => {
			if (partialMatchKey(mutationKey, queryDefault.mutationKey)) Object.assign(result, queryDefault.defaultOptions);
		});
		return result;
	}
	defaultQueryOptions(options) {
		if (options._defaulted) return options;
		const defaultedOptions = {
			...this.#defaultOptions.queries,
			...this.getQueryDefaults(options.queryKey),
			...options,
			_defaulted: true
		};
		if (!defaultedOptions.queryHash) defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
		if (defaultedOptions.refetchOnReconnect === void 0) defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
		if (defaultedOptions.throwOnError === void 0) defaultedOptions.throwOnError = !!defaultedOptions.suspense;
		if (!defaultedOptions.networkMode && defaultedOptions.persister) defaultedOptions.networkMode = "offlineFirst";
		if (defaultedOptions.queryFn === skipToken) defaultedOptions.enabled = false;
		return defaultedOptions;
	}
	defaultMutationOptions(options) {
		if (options?._defaulted) return options;
		return {
			...this.#defaultOptions.mutations,
			...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
			...options,
			_defaulted: true
		};
	}
	clear() {
		this.#queryCache.clear();
		this.#mutationCache.clear();
	}
};
//#endregion
//#region src/lib/query.tsx
function makeQueryClient() {
	return new QueryClient({ defaultOptions: { queries: {
		staleTime: 3e4,
		refetchOnWindowFocus: false
	} } });
}
var browserClient;
function getQueryClient() {
	if (typeof document === "undefined") return makeQueryClient();
	browserClient ??= makeQueryClient();
	return browserClient;
}
function QueryProvider({ children }) {
	const [client] = (0, import_react.useState)(getQueryClient);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client,
		children
	});
}
/**
* @license lucide-react v1.33.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Check = createLucideIcon("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]);
/**
* @license lucide-react v1.33.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
/**
* @license lucide-react v1.33.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleQuestionMark = createLucideIcon("circle-question-mark", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
		key: "1u773s"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
/**
* @license lucide-react v1.33.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Info = createLucideIcon("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]);
/**
* @license lucide-react v1.33.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var OctagonX = createLucideIcon("octagon-x", [
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
		key: "2d38gg"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]);
/**
* @license lucide-react v1.33.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
/**
* @license lucide-react v1.33.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TriangleAlert = createLucideIcon("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/dialog/description/DialogDescription.mjs
/**
* A paragraph with additional information about the dialog.
* Renders a `<p>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogDescription$1 = /*#__PURE__*/ import_react.forwardRef(function DialogDescription(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, ...elementProps } = componentProps;
	const store = useDialogRootContext();
	const id = useBaseUiId(idProp);
	store.useSyncedValueWithCleanup("descriptionElementId", id);
	return useRenderElement("p", componentProps, {
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
//#endregion
//#region src/components/ui/dialog.tsx
function Dialog({ children, persistent = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot, {
		"data-slot": "dialog",
		disablePointerDismissal: persistent,
		...props,
		children
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogClose({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
		"data-slot": "dialog-close",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 isolate z-50 bg-black/45 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
var dialogContentVariants = cva("fixed z-50 grid w-full gap-4 overflow-y-auto bg-oc-background p-4 text-sm text-oc-foreground shadow-[0_3px_22px_rgba(38,42,50,0.09)] outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", {
	variants: { size: {
		sm: "top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-xs",
		default: "top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-sm",
		lg: "top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-xl",
		fullscreen: "inset-0 flex h-dvh max-h-none max-w-none flex-col overflow-hidden rounded-none p-0 shadow-none",
		Small: "top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-xs",
		Medium: "top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-md",
		Default: "top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-xl",
		Confirmation: "top-1/2 left-1/2 max-h-[80vh] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:max-w-xs",
		Fullscreen: "inset-0 flex h-dvh max-h-none max-w-none flex-col overflow-hidden rounded-none p-0 shadow-none"
	} },
	defaultVariants: { size: "default" }
});
function DialogContent({ className, children, showCloseButton = true, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
		"data-slot": "dialog-content",
		"data-size": size,
		className: cn(dialogContentVariants({ size }), className),
		...props,
		children: [children, showCloseButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose$1, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				className: "absolute top-2 right-2"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		}) : null]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "dialog-header",
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: cn("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-2xl border-t border-oc-border bg-oc-muted/50 p-4 sm:flex-row sm:justify-end", className),
		...props,
		children: [children, showCloseButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { variant: "outline" }),
			children: "Close"
		}) : null]
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-slot": "dialog-title",
		className: cn("text-base leading-none font-medium text-oc-foreground", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		"data-slot": "dialog-description",
		className: cn("text-sm text-oc-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-oc-foreground", className),
		...props
	});
}
//#endregion
//#region src/components/ui/alert-dialog.tsx
function AlertDialog({ persistent = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		persistent,
		...props
	});
}
function AlertDialogContent({ size = "Confirmation", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
		"data-slot": "alert-dialog-content",
		size,
		showCloseButton: false,
		...props
	});
}
function AlertDialogHeader(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
		"data-slot": "alert-dialog-header",
		...props
	});
}
function AlertDialogFooter(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
		"data-slot": "alert-dialog-footer",
		...props
	});
}
function AlertDialogTitle(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		"data-slot": "alert-dialog-title",
		...props
	});
}
function AlertDialogDescription(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		"data-slot": "alert-dialog-description",
		...props
	});
}
function AlertDialogAction({ children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-slot": "alert-dialog-action",
			...props
		}),
		children
	});
}
function AlertDialogCancel({ children, variant = "outline", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-slot": "alert-dialog-cancel",
			variant,
			...props
		}),
		children
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-constants/constants.mjs
var DEFAULT_VALIDITY_STATE = {
	badInput: false,
	customError: false,
	patternMismatch: false,
	rangeOverflow: false,
	rangeUnderflow: false,
	stepMismatch: false,
	tooLong: false,
	tooShort: false,
	typeMismatch: false,
	valid: null,
	valueMissing: false
};
var DEFAULT_FIELD_ROOT_STATE = {
	disabled: false,
	valid: null,
	touched: false,
	dirty: false,
	filled: false,
	focused: false
};
var fieldValidityMapping = { valid(value) {
	if (value === null) return null;
	if (value) return { "data-valid": "" };
	return { "data-invalid": "" };
} };
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
var DEFAULT_FIELD_ROOT_CONTEXT = {
	invalid: void 0,
	name: void 0,
	validityData: {
		state: DEFAULT_VALIDITY_STATE,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: NOOP,
	disabled: void 0,
	setTouched: NOOP,
	setDirty: NOOP,
	setFilled: NOOP,
	setFocused: NOOP,
	validationMode: "onSubmit",
	shouldValidateOnChange: () => false,
	state: DEFAULT_FIELD_ROOT_STATE,
	registerFieldControl: NOOP,
	validation: {
		getValidationProps: (_disabled, props = EMPTY_OBJECT) => props,
		inputRef: { current: null },
		registeredInputs: /* @__PURE__ */ new Map(),
		registerInput: NOOP,
		getInputControl: () => null,
		commit: async () => {},
		change: NOOP
	}
};
var FieldRootContext = /*#__PURE__*/ import_react.createContext(DEFAULT_FIELD_ROOT_CONTEXT);
function useFieldRootContext(optional = true) {
	const context = import_react.useContext(FieldRootContext);
	if (context.setValidityData === NOOP && !optional) throw new Error(formatErrorMessage(28));
	return context;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var FormContext = /*#__PURE__*/ import_react.createContext({
	elementRef: { current: null },
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: NOOP,
	validationMode: "onSubmit",
	submitAttemptedRef: { current: false }
});
function useFormContext() {
	return import_react.useContext(FormContext);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
/**
* A context for providing [labelable elements](https://html.spec.whatwg.org/multipage/forms.html#category-label)\
* with an accessible name (label) and description.
*/
var LabelableContext = /*#__PURE__*/ import_react.createContext({
	controlId: void 0,
	registerControlId: NOOP,
	labelId: void 0,
	setLabelId: NOOP,
	messageIds: [],
	setMessageIds: NOOP,
	getDescriptionProps: (externalProps) => externalProps
});
function useLabelableContext() {
	return import_react.useContext(LabelableContext);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function useLabelableId(params = {}) {
	const { id, implicit = false, controlRef } = params;
	const { controlId, registerControlId } = useLabelableContext();
	const defaultId = useBaseUiId(id);
	const controlIdForEffect = implicit ? controlId : void 0;
	const controlSourceRef = useRefWithInit(() => Symbol());
	const hasRegisteredRef = import_react.useRef(false);
	const hadExplicitIdRef = import_react.useRef(id != null);
	const unregisterControlId = useStableCallback(() => {
		if (!hasRegisteredRef.current || registerControlId === NOOP) return;
		hasRegisteredRef.current = false;
		registerControlId(controlSourceRef.current, void 0);
	});
	useIsoLayoutEffect(() => {
		if (registerControlId === NOOP) return;
		let nextId;
		if (implicit) {
			const elem = controlRef?.current;
			if (isElement(elem) && elem.closest("label") != null) nextId = id ?? null;
			else nextId = controlIdForEffect ?? defaultId;
		} else if (id != null) {
			hadExplicitIdRef.current = true;
			nextId = id;
		} else if (hadExplicitIdRef.current) nextId = defaultId;
		else {
			unregisterControlId();
			return;
		}
		if (nextId === void 0) {
			unregisterControlId();
			return;
		}
		hasRegisteredRef.current = true;
		registerControlId(controlSourceRef.current, nextId);
	}, [
		id,
		controlRef,
		controlIdForEffect,
		registerControlId,
		implicit,
		defaultId,
		controlSourceRef,
		unregisterControlId
	]);
	import_react.useEffect(() => {
		return unregisterControlId;
	}, [unregisterControlId]);
	return controlId ?? defaultId;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/useControlled.mjs
function useControlled({ controlled, default: defaultProp, name, state = "value" }) {
	const { current: isControlled } = import_react.useRef(controlled !== void 0);
	const [valueState, setValue] = import_react.useState(defaultProp);
	return [isControlled ? controlled : valueState, import_react.useCallback((newValue) => {
		if (!isControlled) setValue(newValue);
	}, [])];
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true, name) {
	const { registerFieldControl } = useFieldRootContext();
	const sourceRef = useRefWithInit(() => Symbol());
	useIsoLayoutEffect(() => {
		const source = sourceRef.current;
		if (!enabled) {
			registerFieldControl(source, void 0);
			return;
		}
		registerFieldControl(source, {
			controlRef,
			getValue: getFormValueOverride,
			id,
			name,
			value
		});
	}, [
		controlRef,
		enabled,
		getFormValueOverride,
		id,
		name,
		registerFieldControl,
		sourceRef,
		value
	]);
	useIsoLayoutEffect(() => {
		const source = sourceRef.current;
		return () => {
			registerFieldControl(source, void 0);
		};
	}, [registerFieldControl, sourceRef]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/field/control/FieldControl.mjs
/**
* The form control to label and validate.
* Renders an `<input>` element.
*
* You can omit this part and use any Base UI input component instead. For example,
* [Input](https://base-ui.com/react/components/input), [Checkbox](https://base-ui.com/react/components/checkbox),
* or [Select](https://base-ui.com/react/components/select), among others, will work with Field out of the box.
*
* Documentation: [Base UI Field](https://base-ui.com/react/components/field)
*/
var FieldControl = /*#__PURE__*/ import_react.forwardRef(function FieldControl(componentProps, forwardedRef) {
	const { render, className, id: idProp, name: nameProp, value: valueProp, disabled: disabledProp = false, onValueChange, defaultValue, autoFocus = false, style, ...elementProps } = componentProps;
	const { state: fieldState, name: fieldName, disabled: fieldDisabled, setTouched, setDirty, validityData, setFocused, setFilled, validationMode, validation } = useFieldRootContext();
	const { clearErrors } = useFormContext();
	const disabled = fieldDisabled || disabledProp;
	const name = fieldName ?? nameProp;
	const state = {
		...fieldState,
		disabled
	};
	const { labelId } = useLabelableContext();
	const id = useLabelableId({ id: idProp });
	useIsoLayoutEffect(() => {
		const hasExternalValue = valueProp != null;
		if (validation.inputRef.current?.value || hasExternalValue && valueProp !== "") setFilled(true);
		else if (hasExternalValue && valueProp === "") setFilled(false);
	}, [
		validation.inputRef,
		setFilled,
		valueProp
	]);
	const inputRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (autoFocus && inputRef.current === activeElement(ownerDocument(inputRef.current))) setFocused(true);
	}, [autoFocus, setFocused]);
	const [valueUnwrapped] = useControlled({
		controlled: valueProp,
		default: defaultValue,
		name: "FieldControl",
		state: "value"
	});
	const isControlled = valueProp !== void 0;
	const value = isControlled ? valueUnwrapped : void 0;
	const getValueFromInput = useStableCallback(() => validation.inputRef.current?.value);
	useRegisterFieldControl(validation.inputRef, id, value, getValueFromInput, !disabled, nameProp);
	return useRenderElement("input", componentProps, {
		ref: [forwardedRef, inputRef],
		state,
		props: [
			{
				id,
				disabled,
				name,
				ref: validation.inputRef,
				"aria-labelledby": labelId,
				autoFocus,
				...isControlled ? { value } : { defaultValue },
				onChange(event) {
					const inputValue = event.currentTarget.value;
					onValueChange?.(inputValue, createChangeEventDetails(none, event.nativeEvent));
					setDirty(inputValue !== (validityData.initialValue ?? ""));
					setFilled(inputValue !== "");
					if (!event.nativeEvent.defaultPrevented) {
						clearErrors(name);
						validation.change(inputValue);
					}
				},
				onFocus() {
					setFocused(true);
				},
				onBlur(event) {
					setTouched(true);
					setFocused(false);
					if (validationMode === "onBlur") validation.commit(event.currentTarget.value);
				},
				onKeyDown(event) {
					if (event.currentTarget.tagName === "INPUT" && event.key === "Enter") {
						setTouched(true);
						validation.commit(event.currentTarget.value);
					}
				}
			},
			elementProps,
			(props) => validation.getValidationProps(disabled, props)
		],
		stateAttributesMapping: fieldValidityMapping
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/input/Input.mjs
/**
* A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
* Renders an `<input>` element.
*
* Documentation: [Base UI Input](https://base-ui.com/react/components/input)
*/
var Input$1 = /*#__PURE__*/ import_react.forwardRef(function Input(props, forwardedRef) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldControl, {
		ref: forwardedRef,
		...props
	});
});
//#endregion
//#region src/components/ui/input.tsx
var inputSurface = "h-9 w-full min-w-0 rounded-lg border border-oc-border bg-oc-background px-2 py-1 text-base leading-normal text-oc-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)] outline-none transition-shadow file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-oc-foreground placeholder:text-oc-muted-foreground focus-visible:border-oc-primary focus-visible:shadow-[0_0_0_3px_var(--oc-info-border)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-oc-muted disabled:opacity-50 aria-invalid:border-oc-destructive aria-invalid:shadow-[0_0_0_3px_var(--oc-destructive-border)] md:text-sm";
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
		type,
		"data-slot": "input",
		className: cn(inputSurface, className),
		...props
	});
}
//#endregion
//#region src/components/confirmation-modal.tsx
var PRESETS = {
	delete: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}),
		iconClassName: "bg-oc-destructive-soft text-oc-destructive",
		confirmLabel: "Delete",
		cancelLabel: "Cancel",
		confirmVariant: "destructive",
		showCancel: true
	},
	warning: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
		iconClassName: "bg-oc-warning-soft text-oc-warning",
		confirmLabel: "Continue",
		cancelLabel: "Cancel",
		confirmVariant: "destructive",
		showCancel: true
	},
	success: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}),
		iconClassName: "bg-oc-success-soft text-oc-success",
		confirmLabel: "OK",
		cancelLabel: "Cancel",
		confirmVariant: "default",
		showCancel: false
	},
	question: {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {}),
		iconClassName: "bg-oc-info-soft text-oc-primary",
		confirmLabel: "Yes",
		cancelLabel: "No",
		confirmVariant: "default",
		showCancel: true
	}
};
var ConfirmationModalContext = import_react.createContext(null);
function ConfirmationModalProvider({ children }) {
	const [request, setRequest] = import_react.useState(null);
	const [open, setOpen] = import_react.useState(false);
	const [typed, setTyped] = import_react.useState("");
	const requestRef = import_react.useRef(null);
	const closeTimerRef = import_react.useRef(null);
	const finish = import_react.useCallback((confirmed) => {
		const current = requestRef.current;
		if (!current) return;
		requestRef.current = null;
		setOpen(false);
		current?.resolve(confirmed);
		if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
		closeTimerRef.current = setTimeout(() => {
			setRequest((value) => value === current ? null : value);
			setTyped("");
			closeTimerRef.current = null;
		}, 100);
	}, []);
	const confirm = import_react.useCallback((options) => {
		requestRef.current?.resolve(false);
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
			closeTimerRef.current = null;
		}
		return new Promise((resolve) => {
			const nextRequest = {
				...options,
				resolve
			};
			requestRef.current = nextRequest;
			setTyped("");
			setRequest(nextRequest);
			setOpen(true);
		});
	}, []);
	import_react.useEffect(() => () => {
		if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
		requestRef.current?.resolve(false);
	}, []);
	const preset = PRESETS[request?.type ?? "question"];
	const matched = !request?.confirmPhrase || typed.trim() === request.confirmPhrase;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmationModalContext.Provider, {
		value: confirm,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open,
			onOpenChange: (nextOpen) => {
				if (!nextOpen) finish(false);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
				size: request?.confirmPhrase ? "Medium" : "Confirmation",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogCancel, {
						variant: "ghost",
						size: "icon-sm",
						className: "absolute top-2 right-2 text-oc-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Close"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: request?.title ?? "Are you sure?" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn(request?.confirmPhrase ? "space-y-4 py-2" : "flex flex-col items-center gap-4 py-4 text-center"),
						children: [
							!request?.confirmPhrase ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("inline-flex size-12 items-center justify-center rounded-full [&_svg]:size-6", preset.iconClassName),
								children: preset.icon
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, {
								className: cn(!request?.confirmPhrase && "max-w-64 text-center text-oc-foreground"),
								children: [request?.message, request?.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}), request.description] }) : null]
							}),
							request?.confirmPhrase ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block space-y-2 text-sm text-oc-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Type ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: request.confirmPhrase }),
									" to confirm"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-2",
									value: typed,
									onChange: (event) => setTyped(event.currentTarget.value),
									placeholder: request.inputPlaceholder ?? "Type here...",
									autoFocus: true
								})]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						className: !request?.confirmPhrase ? "sm:justify-center" : void 0,
						children: [preset.showCancel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
							className: "min-w-28",
							children: request?.cancelLabel ?? preset.cancelLabel
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							className: "min-w-28",
							variant: preset.confirmVariant,
							disabled: !matched,
							onClick: () => finish(true),
							children: request?.confirmLabel ?? preset.confirmLabel
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/provider/ToastProviderContext.mjs
var ToastContext = /*#__PURE__*/ import_react.createContext(void 0);
function useToastProviderContext() {
	const context = import_react.useContext(ToastContext);
	if (!context) throw new Error(formatErrorMessage(73));
	return context;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+utils@0.3.2_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/utils/generateId.mjs
var counter = 0;
function generateId(prefix) {
	counter += 1;
	return `${prefix}-${Math.random().toString(36).slice(2, 6)}-${counter}`;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/utils/resolvePromiseOptions.mjs
function resolvePromiseOptions(options, result) {
	if (typeof options === "string") return { description: options };
	if (typeof options === "function") {
		const resolvedOptions = options(result);
		return typeof resolvedOptions === "string" ? { description: resolvedOptions } : resolvedOptions;
	}
	return options;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/store.mjs
/**
* A toast once it lives in the store. `addToast` is the only way in and it always
* assigns `updateKey`, so unlike the public `ToastObject` it is never missing.
*/
function createToastMetadata(toasts) {
	const metadata = /* @__PURE__ */ new Map();
	let visibleIndex = 0;
	let offsetY = 0;
	toasts.forEach((toast, toastIndex) => {
		const isEnding = toast.transitionStatus === "ending";
		metadata.set(toast.id, {
			value: toast,
			domIndex: toastIndex,
			visibleIndex: isEnding ? -1 : visibleIndex,
			offsetY
		});
		offsetY += toast.height || 0;
		if (!isEnding) visibleIndex += 1;
	});
	return metadata;
}
function applyLimited(toasts, limit) {
	let activeIndex = 0;
	return toasts.map((toast) => {
		if (toast.transitionStatus === "ending") return toast;
		const limited = activeIndex >= limit;
		activeIndex += 1;
		return toast.limited === limited ? toast : {
			...toast,
			limited
		};
	});
}
var selectors = {
	toasts: (state) => state.toasts,
	isEmpty: (state) => state.toasts.length === 0,
	toast: (state, id) => state.toastMetadata.get(id)?.value,
	toastIndex: (state, id) => state.toastMetadata.get(id)?.domIndex ?? -1,
	toastOffsetY: (state, id) => state.toastMetadata.get(id)?.offsetY ?? 0,
	toastVisibleIndex: (state, id) => state.toastMetadata.get(id)?.visibleIndex ?? -1,
	focused: (state) => state.focused,
	expanded: (state) => state.hovering || state.focused,
	expandedOrOutOfFocus: (state) => state.hovering || state.focused || !state.isWindowFocused,
	prevFocusElement: (state) => state.prevFocusElement
};
var ToastStore = class extends ReactStore {
	timers = /* @__PURE__ */ new Map();
	areTimersPaused = false;
	constructor(initialState) {
		super({
			...initialState,
			toastMetadata: createToastMetadata(initialState.toasts)
		}, {}, selectors);
	}
	setViewport = (viewport) => {
		this.set("viewport", viewport);
	};
	syncProviderProps(timeout, limit) {
		const limitChanged = this.state.limit !== limit;
		if (this.state.timeout === timeout && !limitChanged) return;
		const updates = {
			timeout,
			limit
		};
		if (limitChanged) {
			const newToasts = applyLimited(this.state.toasts, limit);
			updates.toasts = newToasts;
			updates.toastMetadata = createToastMetadata(newToasts);
		}
		this.update(updates);
	}
	disposeEffect = () => {
		return () => {
			this.timers.forEach((timer) => {
				timer.timeout?.clear();
			});
			this.timers.clear();
		};
	};
	removeToast(toastId, skipOnRemove = false) {
		const index = selectors.toastIndex(this.state, toastId);
		if (index === -1) return;
		const toast = this.state.toasts[index];
		if (!skipOnRemove) toast?.onRemove?.();
		const newToasts = [...this.state.toasts];
		newToasts.splice(index, 1);
		this.setToasts(newToasts);
	}
	addToast = (toast) => {
		const { timeout, limit } = this.state;
		const id = toast.id || generateId("toast");
		if (toast.id) {
			const existingToast = selectors.toast(this.state, toast.id);
			if (existingToast) {
				if (existingToast.transitionStatus === "ending") this.removeToast(toast.id, true);
				else {
					const { id: ignoredId, transitionStatus: ignoredTransitionStatus, ...updates } = toast;
					this.updateToastInternal(toast.id, updates, true, true);
					return toast.id;
				}
			}
		}
		const toastToAdd = {
			...toast,
			id,
			updateKey: 0,
			transitionStatus: "starting"
		};
		const updatedToasts = [toastToAdd, ...this.state.toasts];
		this.setToasts(applyLimited(updatedToasts, limit));
		const duration = toastToAdd.timeout ?? timeout;
		if (toastToAdd.type !== "loading" && duration > 0) this.scheduleTimer(id, duration, () => this.closeToast(id));
		if (selectors.expandedOrOutOfFocus(this.state)) this.pauseTimers();
		return id;
	};
	updateToast = (id, updates) => {
		this.updateToastInternal(id, updates, false, true);
	};
	updateToastInternal = (id, updates, resetTimer = false, markUpdated = false) => {
		const { timeout, toasts } = this.state;
		const prevToast = selectors.toast(this.state, id);
		if (!prevToast) return;
		if (prevToast.transitionStatus === "ending") return;
		const nextToast = {
			...prevToast,
			...updates,
			...markUpdated && { updateKey: prevToast.updateKey + 1 }
		};
		this.setToasts(toasts.map((toast) => toast.id === id ? nextToast : toast));
		const nextTimeout = nextToast.timeout ?? timeout;
		const prevTimeout = prevToast.timeout ?? timeout;
		const timeoutUpdated = Object.hasOwn(updates, "timeout");
		const shouldHaveTimer = nextToast.transitionStatus !== "ending" && nextToast.type !== "loading" && nextTimeout > 0;
		const hasTimer = this.timers.has(id);
		const timeoutChanged = prevTimeout !== nextTimeout;
		const wasLoading = prevToast.type === "loading";
		if (!shouldHaveTimer && hasTimer) {
			this.clearTimer(id);
			return;
		}
		if (shouldHaveTimer && (!hasTimer || timeoutChanged || timeoutUpdated || wasLoading || resetTimer)) {
			this.clearTimer(id);
			this.scheduleTimer(id, nextTimeout, () => this.closeToast(id));
			if (selectors.expandedOrOutOfFocus(this.state)) this.pauseTimers();
		}
	};
	closeToast = (toastId) => {
		const closeAll = toastId === void 0;
		const { limit, toasts } = this.state;
		let toastsToClose;
		if (closeAll) {
			toastsToClose = toasts;
			this.clearTimers();
		} else {
			const toast = selectors.toast(this.state, toastId);
			if (!toast) return;
			toastsToClose = [toast];
			this.clearTimer(toastId);
		}
		const newToasts = applyLimited(toasts.map((item) => closeAll || item.id === toastId ? {
			...item,
			transitionStatus: "ending",
			height: 0
		} : item), limit);
		this.setToasts(newToasts, !newToasts.some((toast) => toast.transitionStatus !== "ending"));
		toastsToClose.forEach((toast) => {
			if (toast.transitionStatus !== "ending") toast.onClose?.();
		});
		this.handleFocusManagement(toastId);
	};
	promiseToast = (promiseValue, options) => {
		const loadingOptions = resolvePromiseOptions(options.loading);
		const id = this.addToast({
			...loadingOptions,
			type: "loading"
		});
		const handledPromise = promiseValue.then((result) => {
			const successOptions = resolvePromiseOptions(options.success, result);
			this.updateToast(id, {
				...successOptions,
				type: "success",
				timeout: successOptions.timeout
			});
			return result;
		}).catch((error) => {
			const errorOptions = resolvePromiseOptions(options.error, error);
			this.updateToast(id, {
				...errorOptions,
				type: "error",
				timeout: errorOptions.timeout
			});
			return Promise.reject(error);
		});
		if ({}.hasOwnProperty.call(options, "setPromise")) options.setPromise(handledPromise);
		return handledPromise;
	};
	pauseTimers() {
		if (this.areTimersPaused) return;
		this.areTimersPaused = true;
		this.timers.forEach((timer) => {
			if (timer.timeout) {
				timer.timeout.clear();
				timer.remaining = Math.max(timer.remaining - (Date.now() - timer.start), 0);
			}
		});
	}
	resumeTimers() {
		if (!this.areTimersPaused) return;
		this.areTimersPaused = false;
		this.timers.forEach((timer, id) => {
			timer.remaining = timer.remaining > 0 ? timer.remaining : timer.delay;
			timer.timeout ??= Timeout.create();
			timer.timeout.start(timer.remaining, () => {
				this.handleTimerFired(id);
				timer.callback();
			});
			timer.start = Date.now();
		});
	}
	restoreFocusToPrevElement() {
		this.state.prevFocusElement?.focus({ preventScroll: true });
	}
	handleDocumentPointerDown = (event) => {
		if (event.pointerType !== "touch") return;
		const target = getTarget(event);
		if (contains(this.state.viewport, target)) return;
		this.resumeTimers();
		this.update({
			hovering: false,
			focused: false
		});
	};
	scheduleTimer(id, delay, callback) {
		const start = Date.now();
		const currentTimeout = !selectors.expandedOrOutOfFocus(this.state) ? Timeout.create() : void 0;
		currentTimeout?.start(delay, () => {
			this.handleTimerFired(id);
			callback();
		});
		this.timers.set(id, {
			timeout: currentTimeout,
			start,
			delay,
			remaining: delay,
			callback
		});
	}
	clearTimers() {
		this.timers.forEach((timer) => {
			timer.timeout?.clear();
		});
		this.timers.clear();
		this.areTimersPaused = false;
	}
	clearTimer(id) {
		this.timers.get(id)?.timeout?.clear();
		this.timers.delete(id);
		this.resetPausedStateIfNoTimersRemain();
	}
	handleTimerFired(id) {
		this.timers.delete(id);
		this.resetPausedStateIfNoTimersRemain();
	}
	resetPausedStateIfNoTimersRemain() {
		if (this.timers.size === 0) this.areTimersPaused = false;
	}
	setToasts(newToasts, clearInteraction = newToasts.length === 0) {
		const updates = {
			toasts: newToasts,
			toastMetadata: createToastMetadata(newToasts)
		};
		if (clearInteraction) {
			updates.hovering = false;
			updates.focused = false;
		}
		this.update(updates);
	}
	handleFocusManagement(toastId) {
		const activeEl = activeElement(ownerDocument(this.state.viewport));
		if (!this.state.viewport || !contains(this.state.viewport, activeEl) || !matchesFocusVisible(activeEl)) return;
		if (toastId === void 0) {
			this.restoreFocusToPrevElement();
			return;
		}
		const toasts = selectors.toasts(this.state);
		const currentIndex = selectors.toastIndex(this.state, toastId);
		const scan = (from, step) => {
			for (let index = from; index >= 0 && index < toasts.length; index += step) if (toasts[index].transitionStatus !== "ending") return toasts[index];
			return null;
		};
		const nextToast = scan(currentIndex + 1, 1) ?? scan(currentIndex - 1, -1);
		if (nextToast) nextToast.ref?.current?.focus();
		else this.restoreFocusToPrevElement();
	}
};
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/provider/ToastProvider.mjs
/**
* Provides a context for creating and managing toasts.
*
* Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
*/
var ToastProvider$1 = function ToastProvider(props) {
	const { children, timeout = 5e3, limit = 3, toastManager } = props;
	const store = useRefWithInit(() => new ToastStore({
		timeout,
		limit,
		viewport: null,
		toasts: [],
		hovering: false,
		focused: false,
		isWindowFocused: true,
		prevFocusElement: null
	})).current;
	useOnMount(store.disposeEffect);
	import_react.useEffect(function subscribeToToastManager() {
		if (!toastManager) return;
		return toastManager[" subscribe"](({ action, options }) => {
			const id = options.id;
			if (action === "promise" && options.promise) store.promiseToast(options.promise, options);
			else if (action === "update" && id) store.updateToast(id, options);
			else if (action === "close") store.closeToast(id);
			else store.addToast(options);
		});
	}, [store, toastManager]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ToastContext.Provider, {
		value: store,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(ToastProviderPropsSynchronizer, {
			store,
			timeout,
			limit
		}), children]
	});
};
function ToastProviderPropsSynchronizer(props) {
	const { store, timeout, limit } = props;
	useIsoLayoutEffect(() => {
		store.syncProviderProps(timeout, limit);
	}, [
		store,
		timeout,
		limit
	]);
	return null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/viewport/ToastViewport.mjs
/**
* A container viewport for toasts.
* Renders a `<div>` element.
*
* Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
*/
var ToastViewport$1 = /*#__PURE__*/ import_react.forwardRef(function ToastViewport(componentProps, forwardedRef) {
	const { render, className, style, children, ...elementProps } = componentProps;
	const store = useToastProviderContext();
	const windowFocusTimeout = useTimeout();
	const handlingFocusGuardRef = import_react.useRef(false);
	const markedReadyForMouseLeaveRef = import_react.useRef(false);
	const touchActiveRef = import_react.useRef(false);
	const isEmpty = store.useState("isEmpty");
	const toasts = store.useState("toasts");
	const focused = store.useState("focused");
	const expanded = store.useState("expanded");
	const prevFocusElement = store.useState("prevFocusElement");
	const frontmostHeight = toasts[0]?.height;
	const hasTransitioningToasts = toasts.some((toast) => toast.transitionStatus === "ending");
	const highPriorityToasts = toasts.filter((toast) => toast.priority === "high");
	import_react.useEffect(() => {
		const viewport = store.state.viewport;
		if (!viewport || isEmpty) return;
		const win = getWindow(viewport);
		const doc = ownerDocument(viewport);
		function handleGlobalKeyDown(event) {
			if (event.key === "F6" && getTarget(event) !== viewport) {
				event.preventDefault();
				store.set("prevFocusElement", activeElement(doc));
				viewport?.focus({ preventScroll: true });
				store.pauseTimers();
				store.set("focused", true);
			}
		}
		function handleWindowBlur(event) {
			if (getTarget(event) !== win) return;
			store.set("isWindowFocused", false);
			store.pauseTimers();
		}
		function handleWindowFocus(event) {
			if (event.relatedTarget) return;
			const target = getTarget(event);
			const activeEl = activeElement(ownerDocument(viewport));
			if (target === win || !contains(viewport, target) || !matchesFocusVisible(activeEl)) store.resumeTimers();
			windowFocusTimeout.start(0, () => store.set("isWindowFocused", true));
		}
		return mergeCleanups(addEventListener(win, "keydown", handleGlobalKeyDown), addEventListener(win, "blur", handleWindowBlur, true), addEventListener(win, "focus", handleWindowFocus, true), addEventListener(doc, "pointerdown", store.handleDocumentPointerDown, true));
	}, [
		store,
		windowFocusTimeout,
		isEmpty
	]);
	function handleFocusGuard(event) {
		handlingFocusGuardRef.current = true;
		const firstFocusableToast = event.relatedTarget === store.state.viewport ? toasts.find((toast) => toast.transitionStatus !== "ending" && !toast.limited) : void 0;
		if (firstFocusableToast) firstFocusableToast.ref?.current?.focus();
		else store.restoreFocusToPrevElement();
	}
	function handleKeyDown(event) {
		if (event.key === "Tab" && event.shiftKey && getTarget(event.nativeEvent) === store.state.viewport) {
			event.preventDefault();
			store.restoreFocusToPrevElement();
		}
	}
	function flushMouseLeave() {
		if (store.state.toasts.some((toast) => toast.transitionStatus === "ending") || touchActiveRef.current || !markedReadyForMouseLeaveRef.current) return;
		if (store.state.isWindowFocused) store.resumeTimers();
		store.set("hovering", false);
		markedReadyForMouseLeaveRef.current = false;
	}
	import_react.useEffect(flushMouseLeave, [hasTransitioningToasts, store]);
	function handleMouseEnter() {
		store.pauseTimers();
		store.set("hovering", true);
		markedReadyForMouseLeaveRef.current = false;
	}
	function resumeTimersIfWindowFocused() {
		if (store.state.isWindowFocused) store.resumeTimers();
	}
	function handleMouseLeave() {
		markedReadyForMouseLeaveRef.current = true;
		flushMouseLeave();
	}
	function handlePointerDown(event) {
		if (event.pointerType === "touch") touchActiveRef.current = true;
	}
	function handlePointerEnd(event) {
		if (event.pointerType !== "touch") return;
		touchActiveRef.current = false;
		flushMouseLeave();
	}
	function handleFocus() {
		if (handlingFocusGuardRef.current) {
			handlingFocusGuardRef.current = false;
			return;
		}
		if (focused) return;
		if (matchesFocusVisible(activeElement(ownerDocument(store.state.viewport)))) {
			store.set("focused", true);
			store.pauseTimers();
		}
	}
	function handleBlur(event) {
		if (!focused || contains(store.state.viewport, event.relatedTarget)) return;
		store.set("focused", false);
		resumeTimersIfWindowFocused();
	}
	const defaultProps = {
		tabIndex: -1,
		role: "region",
		"aria-live": "polite",
		"aria-atomic": false,
		"aria-relevant": "additions text",
		"aria-label": "Notifications",
		onMouseEnter: handleMouseEnter,
		onMouseMove: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		onFocus: handleFocus,
		onBlur: handleBlur,
		onKeyDown: handleKeyDown,
		onClick: handleFocus,
		onPointerDown: handlePointerDown,
		onPointerUp: handlePointerEnd,
		onPointerCancel: handlePointerEnd,
		style: { ["--toast-frontmost-height"]: frontmostHeight ? `${frontmostHeight}px` : void 0 }
	};
	const state = { expanded };
	const focusGuard = !isEmpty && prevFocusElement && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, { onFocus: handleFocusGuard });
	const element = useRenderElement("div", componentProps, {
		ref: [forwardedRef, store.setViewport],
		state,
		props: [
			defaultProps,
			elementProps,
			{ children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
				focusGuard,
				children,
				focusGuard
			] }) }
		]
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		focusGuard,
		element,
		!focused && highPriorityToasts.length > 0 && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			style: visuallyHidden,
			children: highPriorityToasts.map((toast) => /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
				role: "alert",
				"aria-atomic": true,
				children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { children: toast.title }), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", { children: toast.description })]
			}, toast.id))
		})
	] });
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/root/ToastRootContext.mjs
var ToastRootContext = /*#__PURE__*/ import_react.createContext(void 0);
function useToastRootContext() {
	const context = import_react.useContext(ToastRootContext);
	if (!context) throw new Error(formatErrorMessage(66));
	return context;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/useSwipeDismiss.mjs
function getDisplacement(direction, deltaX, deltaY) {
	switch (direction) {
		case "up": return -deltaY;
		case "down": return deltaY;
		case "left": return -deltaX;
		case "right": return deltaX;
		default: return 0;
	}
}
function getElementTransform(element) {
	const transform = getWindow(element).getComputedStyle(element).transform;
	let translateX = 0;
	let translateY = 0;
	let scale = 1;
	if (transform && transform !== "none") {
		const matrix = transform.match(/matrix(?:3d)?\(([^)]+)\)/);
		if (matrix) {
			const values = matrix[1].split(", ").map(parseFloat);
			if (values.length === 6) {
				translateX = values[4];
				translateY = values[5];
				scale = Math.sqrt(values[0] * values[0] + values[1] * values[1]);
			} else if (values.length === 16) {
				translateX = values[12];
				translateY = values[13];
				scale = values[0];
			}
		}
	}
	return {
		x: translateX,
		y: translateY,
		scale
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/root/ToastRoot.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var toastRootStateAttributesMapping = {
	...transitionStatusMapping,
	swipeDirection(value) {
		return value ? { "data-swipe-direction": value } : null;
	}
};
var SWIPE_THRESHOLD = 40;
var REVERSE_CANCEL_THRESHOLD = 10;
var OPPOSITE_DIRECTION_DAMPING_FACTOR = .5;
var MIN_DRAG_THRESHOLD = 1;
var TOAST_SWIPE_IGNORE_SELECTOR = `${BASE_UI_SWIPE_IGNORE_SELECTOR},${LEGACY_SWIPE_IGNORE_SELECTOR}`;
/**
* Groups all parts of an individual toast.
* Renders a `<div>` element.
*
* Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
*/
var ToastRoot = /*#__PURE__*/ import_react.forwardRef(function ToastRoot(componentProps, forwardedRef) {
	const { toast, render, className, swipeDirection = ["down", "right"], style, ...elementProps } = componentProps;
	const isAnchored = toast.positionerProps?.anchor !== void 0;
	let swipeDirections = [];
	if (!isAnchored) swipeDirections = Array.isArray(swipeDirection) ? swipeDirection : [swipeDirection];
	const swipeEnabled = swipeDirections.length > 0;
	const store = useToastProviderContext();
	const [currentSwipeDirection, setCurrentSwipeDirection] = import_react.useState(void 0);
	const [isSwiping, setIsSwiping] = import_react.useState(false);
	const [isRealSwipe, setIsRealSwipe] = import_react.useState(false);
	const [dragOffset, setDragOffset] = import_react.useState({
		x: 0,
		y: 0
	});
	const [initialTransform, setInitialTransform] = import_react.useState({
		x: 0,
		y: 0,
		scale: 1
	});
	const [titleId, setTitleId] = import_react.useState();
	const [descriptionId, setDescriptionId] = import_react.useState();
	const [lockedDirection, setLockedDirection] = import_react.useState(null);
	const rootRef = import_react.useRef(null);
	const lastToastIdRef = import_react.useRef(void 0);
	const dragStartPosRef = import_react.useRef({
		x: 0,
		y: 0
	});
	const initialTransformRef = import_react.useRef({
		x: 0,
		y: 0,
		scale: 1
	});
	const intendedSwipeDirectionRef = import_react.useRef(void 0);
	const maxSwipeDisplacementRef = import_react.useRef(0);
	const cancelledSwipeRef = import_react.useRef(false);
	const swipeCancelBaselineRef = import_react.useRef({
		x: 0,
		y: 0
	});
	const isFirstPointerMoveRef = import_react.useRef(false);
	const dragOffsetRef = import_react.useRef({
		x: 0,
		y: 0
	});
	const activePointerIdRef = import_react.useRef(null);
	const dragAbortControllerRef = import_react.useRef(null);
	const domIndex = store.useState("toastIndex", toast.id);
	const visibleIndex = store.useState("toastVisibleIndex", toast.id);
	const offsetY = store.useState("toastOffsetY", toast.id);
	const focused = store.useState("focused");
	const expanded = store.useState("expanded");
	useOpenChangeComplete({
		open: toast.transitionStatus !== "ending",
		ref: rootRef,
		onComplete() {
			if (toast.transitionStatus === "ending") store.removeToast(toast.id);
		}
	});
	const recalculateHeight = useStableCallback((flushSync = false) => {
		const element = rootRef.current;
		if (!element) return;
		const previousHeight = element.style.height;
		element.style.height = "auto";
		const height = element.offsetHeight;
		element.style.height = previousHeight;
		function update() {
			store.updateToastInternal(toast.id, {
				ref: rootRef,
				height,
				transitionStatus: void 0
			});
		}
		if (flushSync) import_react_dom.flushSync(update);
		else update();
	});
	useIsoLayoutEffect(() => {
		const previousToastId = lastToastIdRef.current;
		if (toast.transitionStatus !== "starting" && previousToastId === toast.id) return;
		if (previousToastId !== void 0) {
			setCurrentSwipeDirection(void 0);
			setInitialTransform({
				x: 0,
				y: 0,
				scale: 1
			});
			setResolvedDragOffset({
				x: 0,
				y: 0
			});
		}
		lastToastIdRef.current = toast.id;
		recalculateHeight();
	}, [
		recalculateHeight,
		toast.id,
		toast.transitionStatus
	]);
	function setResolvedDragOffset(nextDragOffset) {
		dragOffsetRef.current = nextDragOffset;
		setDragOffset(nextDragOffset);
	}
	useIsoLayoutEffect(() => {
		return () => {
			dragAbortControllerRef.current?.abort();
		};
	}, []);
	function applyDirectionalDamping(deltaX, deltaY) {
		const damp = (delta) => delta > 0 ? delta ** OPPOSITE_DIRECTION_DAMPING_FACTOR : -(Math.abs(delta) ** OPPOSITE_DIRECTION_DAMPING_FACTOR);
		const dampX = deltaX > 0 && !swipeDirections.includes("right") || deltaX < 0 && !swipeDirections.includes("left");
		const dampY = deltaY > 0 && !swipeDirections.includes("down") || deltaY < 0 && !swipeDirections.includes("up");
		return {
			x: dampX ? damp(deltaX) : deltaX,
			y: dampY ? damp(deltaY) : deltaY
		};
	}
	const handleSwipeEnd = useStableCallback((event) => {
		if (event.pointerId !== activePointerIdRef.current) return;
		activePointerIdRef.current = null;
		dragAbortControllerRef.current?.abort();
		dragAbortControllerRef.current = null;
		setIsSwiping(false);
		setIsRealSwipe(false);
		setLockedDirection(null);
		const resolvedInitialTransform = initialTransformRef.current;
		if (event.type === "pointercancel" || cancelledSwipeRef.current) {
			setResolvedDragOffset({
				x: resolvedInitialTransform.x,
				y: resolvedInitialTransform.y
			});
			setCurrentSwipeDirection(void 0);
			return;
		}
		const resolvedDragOffset = dragOffsetRef.current;
		const deltaX = resolvedDragOffset.x - resolvedInitialTransform.x;
		const deltaY = resolvedDragOffset.y - resolvedInitialTransform.y;
		let dismissDirection;
		for (const direction of swipeDirections) if (getDisplacement(direction, deltaX, deltaY) > SWIPE_THRESHOLD) {
			dismissDirection = direction;
			break;
		}
		if (dismissDirection) {
			setCurrentSwipeDirection(dismissDirection);
			store.closeToast(toast.id);
		} else {
			setResolvedDragOffset({
				x: resolvedInitialTransform.x,
				y: resolvedInitialTransform.y
			});
			setCurrentSwipeDirection(void 0);
		}
	});
	function handlePointerDown(event) {
		if (event.button !== 0) return;
		if (event.pointerType === "touch") store.pauseTimers();
		if (getTarget(event.nativeEvent)?.closest(`button,a,input,textarea,[role="button"],${TOAST_SWIPE_IGNORE_SELECTOR}`)) return;
		cancelledSwipeRef.current = false;
		intendedSwipeDirectionRef.current = void 0;
		maxSwipeDisplacementRef.current = 0;
		activePointerIdRef.current = event.pointerId;
		dragStartPosRef.current = {
			x: event.clientX,
			y: event.clientY
		};
		swipeCancelBaselineRef.current = dragStartPosRef.current;
		const element = event.currentTarget;
		const transform = getElementTransform(element);
		initialTransformRef.current = transform;
		setInitialTransform(transform);
		setResolvedDragOffset({
			x: transform.x,
			y: transform.y
		});
		store.set("hovering", true);
		setIsSwiping(true);
		setIsRealSwipe(false);
		setLockedDirection(null);
		isFirstPointerMoveRef.current = true;
		dragAbortControllerRef.current?.abort();
		const dragAbortController = new AbortController();
		dragAbortControllerRef.current = dragAbortController;
		const doc = ownerDocument(element);
		doc.addEventListener("pointerup", handleSwipeEnd, { signal: dragAbortController.signal });
		doc.addEventListener("pointercancel", handleSwipeEnd, { signal: dragAbortController.signal });
		element.setPointerCapture?.(event.pointerId);
	}
	function handlePointerMove(event) {
		if (event.pointerId !== activePointerIdRef.current) return;
		event.preventDefault();
		if (isFirstPointerMoveRef.current) {
			dragStartPosRef.current = {
				x: event.clientX,
				y: event.clientY
			};
			isFirstPointerMoveRef.current = false;
		}
		const { clientY, clientX, movementX, movementY } = event;
		if (movementY < 0 && clientY > swipeCancelBaselineRef.current.y || movementY > 0 && clientY < swipeCancelBaselineRef.current.y) swipeCancelBaselineRef.current = {
			x: swipeCancelBaselineRef.current.x,
			y: clientY
		};
		if (movementX < 0 && clientX > swipeCancelBaselineRef.current.x || movementX > 0 && clientX < swipeCancelBaselineRef.current.x) swipeCancelBaselineRef.current = {
			x: clientX,
			y: swipeCancelBaselineRef.current.y
		};
		const deltaX = clientX - dragStartPosRef.current.x;
		const deltaY = clientY - dragStartPosRef.current.y;
		const cancelDeltaY = clientY - swipeCancelBaselineRef.current.y;
		const cancelDeltaX = clientX - swipeCancelBaselineRef.current.x;
		let resolvedLockedDirection = lockedDirection;
		if (!isRealSwipe) {
			if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) >= MIN_DRAG_THRESHOLD) {
				setIsRealSwipe(true);
				const hasHorizontal = swipeDirections.includes("left") || swipeDirections.includes("right");
				const hasVertical = swipeDirections.includes("up") || swipeDirections.includes("down");
				if (hasHorizontal && hasVertical) {
					resolvedLockedDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
					setLockedDirection(resolvedLockedDirection);
				}
			}
		}
		let candidate;
		if (!intendedSwipeDirectionRef.current) {
			if (resolvedLockedDirection === "vertical") {
				if (deltaY > 0) candidate = "down";
				else if (deltaY < 0) candidate = "up";
			} else if (resolvedLockedDirection === "horizontal") {
				if (deltaX > 0) candidate = "right";
				else if (deltaX < 0) candidate = "left";
			} else if (Math.abs(deltaX) >= Math.abs(deltaY)) candidate = deltaX > 0 ? "right" : "left";
			else candidate = deltaY > 0 ? "down" : "up";
			if (candidate && swipeDirections.includes(candidate)) {
				intendedSwipeDirectionRef.current = candidate;
				maxSwipeDisplacementRef.current = getDisplacement(candidate, deltaX, deltaY);
				setCurrentSwipeDirection(candidate);
			}
		} else {
			const direction = intendedSwipeDirectionRef.current;
			const currentDisplacement = getDisplacement(direction, cancelDeltaX, cancelDeltaY);
			if (currentDisplacement > SWIPE_THRESHOLD) {
				cancelledSwipeRef.current = false;
				setCurrentSwipeDirection(direction);
			} else if (!(swipeDirections.includes("left") && swipeDirections.includes("right")) && !(swipeDirections.includes("up") && swipeDirections.includes("down")) && maxSwipeDisplacementRef.current - currentDisplacement >= REVERSE_CANCEL_THRESHOLD) cancelledSwipeRef.current = true;
		}
		const dampedDelta = applyDirectionalDamping(deltaX, deltaY);
		let newOffsetX = initialTransformRef.current.x;
		let newOffsetY = initialTransformRef.current.y;
		const hasHorizontalDir = swipeDirections.includes("left") || swipeDirections.includes("right");
		const hasVerticalDir = swipeDirections.includes("up") || swipeDirections.includes("down");
		if (resolvedLockedDirection !== "vertical" && hasHorizontalDir) newOffsetX += dampedDelta.x;
		if (resolvedLockedDirection !== "horizontal" && hasVerticalDir) newOffsetY += dampedDelta.y;
		setResolvedDragOffset({
			x: newOffsetX,
			y: newOffsetY
		});
	}
	function handleKeyDown(event) {
		if (event.key === "Escape") {
			if (!rootRef.current || !contains(rootRef.current, activeElement(ownerDocument(rootRef.current)))) return;
			store.closeToast(toast.id);
		}
	}
	import_react.useEffect(() => {
		const element = rootRef.current;
		if (!swipeEnabled || !element) return;
		function preventDefaultTouchStart(event) {
			if (activePointerIdRef.current === null || !contains(element, getTarget(event))) return;
			event.preventDefault();
		}
		return addEventListener(element, "touchmove", preventDefaultTouchStart, { passive: false });
	}, [swipeEnabled]);
	function getDragStyles() {
		const deltaX = dragOffset.x - initialTransform.x;
		const deltaY = dragOffset.y - initialTransform.y;
		return {
			transition: isSwiping ? "none" : void 0,
			transform: isSwiping ? `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) scale(${initialTransform.scale})` : void 0,
			["--toast-swipe-movement-x"]: `${deltaX}px`,
			["--toast-swipe-movement-y"]: `${deltaY}px`
		};
	}
	const isHighPriority = toast.priority === "high";
	const defaultProps = {
		role: isHighPriority ? "alertdialog" : "dialog",
		tabIndex: 0,
		"aria-modal": false,
		"aria-labelledby": titleId,
		"aria-describedby": descriptionId,
		"aria-hidden": isHighPriority && !focused ? true : void 0,
		onPointerDown: swipeEnabled ? handlePointerDown : void 0,
		onPointerMove: swipeEnabled ? handlePointerMove : void 0,
		onPointerUp: swipeEnabled ? handleSwipeEnd : void 0,
		onPointerCancel: swipeEnabled ? handleSwipeEnd : void 0,
		onKeyDown: handleKeyDown,
		inert: inertValue(toast.limited),
		style: {
			...getDragStyles(),
			["--toast-index"]: toast.transitionStatus === "ending" ? domIndex : visibleIndex,
			["--toast-offset-y"]: `${offsetY}px`,
			["--toast-height"]: toast.height ? `${toast.height}px` : void 0
		}
	};
	const toastRoot = import_react.useMemo(() => ({
		toast,
		setTitleId,
		setDescriptionId,
		recalculateHeight,
		visibleIndex,
		expanded
	}), [
		toast,
		setTitleId,
		setDescriptionId,
		recalculateHeight,
		visibleIndex,
		expanded
	]);
	const state = {
		transitionStatus: toast.transitionStatus,
		expanded,
		limited: toast.limited || false,
		type: toast.type,
		swiping: isSwiping,
		swipeDirection: currentSwipeDirection
	};
	const element = useRenderElement("div", componentProps, {
		ref: [forwardedRef, rootRef],
		state,
		stateAttributesMapping: toastRootStateAttributesMapping,
		props: [defaultProps, elementProps]
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ToastRootContext.Provider, {
		value: toastRoot,
		children: element
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/content/ToastContent.mjs
/**
* A container for the contents of a toast.
* Renders a `<div>` element.
*
* Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
*/
var ToastContent$1 = /*#__PURE__*/ import_react.forwardRef(function ToastContent(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { visibleIndex, expanded, recalculateHeight } = useToastRootContext();
	const contentRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		recalculateHeight();
		const node = contentRef.current;
		if (!node || typeof ResizeObserver !== "function" || typeof MutationObserver !== "function") return;
		const resizeObserver = new ResizeObserver(() => recalculateHeight(true));
		const mutationObserver = new MutationObserver(() => recalculateHeight(true));
		resizeObserver.observe(node);
		mutationObserver.observe(node, {
			childList: true,
			subtree: true,
			characterData: true
		});
		return () => {
			resizeObserver.disconnect();
			mutationObserver.disconnect();
		};
	}, [recalculateHeight]);
	return useRenderElement("div", componentProps, {
		ref: [forwardedRef, contentRef],
		state: {
			expanded,
			behind: visibleIndex > 0
		},
		props: elementProps
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/utils/isRenderableNode.mjs
function isRenderableNode(node) {
	if (node == null || typeof node === "boolean" || node === "") return false;
	if (Array.isArray(node)) return node.some(isRenderableNode);
	return true;
}
function hasRenderableChildren(element) {
	return /*#__PURE__*/ import_react.isValidElement(element) && isRenderableNode(element.props.children);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/utils/useToastLabelPart.mjs
/**
* Shared logic for `Toast.Title` and `Toast.Description`, which only differ by the rendered tag,
* the fallback content, and which id setter they register with. Resolves the content and returns
* the pieces each part passes to `useRenderElement` and `useToastLabelElement`.
*/
function useToastLabelPart(idProp, childrenProp, part) {
	const { toast, setTitleId, setDescriptionId } = useToastRootContext();
	const setId = part === "title" ? setTitleId : setDescriptionId;
	const children = childrenProp ?? (part === "title" ? toast.title : toast.description);
	return {
		id: useId(idProp),
		children,
		type: toast.type,
		setId
	};
}
/**
* Mounts the evaluated label element only when it carries renderable content (so a `render` prop's
* own children count, while a childless styling-only `render` stays conditional), registering the
* generated id with the root while the part renders.
*/
function useToastLabelElement(element, id, setId) {
	const shouldRender = hasRenderableChildren(element);
	useIsoLayoutEffect(() => {
		if (!shouldRender) return;
		setId(id);
		return () => {
			setId((currentId) => currentId === id ? void 0 : currentId);
		};
	}, [
		shouldRender,
		id,
		setId
	]);
	return shouldRender ? element : null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/description/ToastDescription.mjs
/**
* A description that describes the toast.
* Can be used as the default message for the toast when no title is provided.
* Renders a `<p>` element.
*
* Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
*/
var ToastDescription$1 = /*#__PURE__*/ import_react.forwardRef(function ToastDescription(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, children: childrenProp, ...elementProps } = componentProps;
	const { id, children, type, setId } = useToastLabelPart(idProp, childrenProp, "description");
	return useToastLabelElement(useRenderElement("p", componentProps, {
		ref: forwardedRef,
		state: { type },
		props: {
			...elementProps,
			id,
			children
		}
	}), id, setId);
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/title/ToastTitle.mjs
/**
* A title that labels the toast.
* Renders an `<h2>` element.
*
* Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
*/
var ToastTitle$1 = /*#__PURE__*/ import_react.forwardRef(function ToastTitle(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, children: childrenProp, ...elementProps } = componentProps;
	const { id, children, type, setId } = useToastLabelPart(idProp, childrenProp, "title");
	return useToastLabelElement(useRenderElement("h2", componentProps, {
		ref: forwardedRef,
		state: { type },
		props: {
			...elementProps,
			id,
			children
		}
	}), id, setId);
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/close/ToastClose.mjs
/**
* Closes the toast when clicked.
* Renders a `<button>` element.
*
* Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
*/
var ToastClose$1 = /*#__PURE__*/ import_react.forwardRef(function ToastClose(componentProps, forwardedRef) {
	const { render, className, style, disabled, nativeButton = true, ...elementProps } = componentProps;
	const store = useToastProviderContext();
	const { toast, expanded } = useToastRootContext();
	const [hasFocus, setHasFocus] = import_react.useState(false);
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const state = { type: toast.type };
	return useRenderElement("button", componentProps, {
		ref: [forwardedRef, buttonRef],
		state,
		props: [
			{
				"aria-hidden": !expanded && !hasFocus,
				onClick() {
					store.closeToast(toast.id);
				},
				onFocus() {
					setHasFocus(true);
				},
				onBlur() {
					setHasFocus(false);
				}
			},
			elementProps,
			getButtonProps
		]
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/action/ToastAction.mjs
/**
* Performs an action when clicked.
* Renders a `<button>` element.
*
* Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
*/
var ToastAction$1 = /*#__PURE__*/ import_react.forwardRef(function ToastAction(componentProps, forwardedRef) {
	const { render, className, style, disabled, nativeButton = true, ...elementProps } = componentProps;
	const { toast } = useToastRootContext();
	const computedChildren = toast.actionProps?.children ?? elementProps.children;
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const state = { type: toast.type };
	const element = useRenderElement("button", componentProps, {
		ref: [forwardedRef, buttonRef],
		state,
		props: [
			elementProps,
			toast.actionProps,
			getButtonProps,
			{ children: computedChildren }
		]
	});
	return hasRenderableChildren(element) ? element : null;
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/utils/FloatingPortalLite.mjs
/**
* `FloatingPortal` includes tabbable logic handling for focus management.
* For components that don't need tabbable logic, use `FloatingPortalLite`.
* @internal
*/
var FloatingPortalLite = /*#__PURE__*/ import_react.forwardRef(function FloatingPortalLite(componentProps, forwardedRef) {
	const { children, container, className, render, style, ...elementProps } = componentProps;
	const { node: portalNode, subtree: portalSubtree } = useFloatingPortalNode({
		container,
		ref: forwardedRef,
		componentProps,
		elementProps
	});
	if (!portalSubtree && !portalNode) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [portalSubtree, portalNode && /*#__PURE__*/ import_react_dom.createPortal(children, portalNode)] });
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/portal/ToastPortal.mjs
/**
* A portal element that moves the viewport to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
*/
var ToastPortal$1 = /*#__PURE__*/ import_react.forwardRef(function ToastPortal(props, forwardedRef) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingPortalLite, {
		ref: forwardedRef,
		...props
	});
});
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/useToastManager.mjs
/**
* Returns the array of toasts and methods to manage them.
*/
function useToastManager$1() {
	const store = useToastProviderContext();
	const toasts = store.useState("toasts");
	return import_react.useMemo(() => ({
		toasts,
		add: store.addToast,
		close: store.closeToast,
		update: store.updateToast,
		promise: store.promiseToast
	}), [toasts, store]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui+react@1.7.0_@date-fns+tz@1.5.0_@types+react@19.2.18_date-fns@4.4.0_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@base-ui/react/toast/createToastManager.mjs
/**
* Creates a new toast manager.
*/
function createToastManager$1() {
	const listeners = /* @__PURE__ */ new Set();
	function emit(data) {
		listeners.forEach((listener) => listener(data));
	}
	return {
		" subscribe": function subscribe(listener) {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		},
		add(options) {
			const id = options.id || generateId("toast");
			emit({
				action: "add",
				options: {
					...options,
					id,
					transitionStatus: "starting"
				}
			});
			return id;
		},
		close(id) {
			emit({
				action: "close",
				options: { id }
			});
		},
		update(id, updates) {
			emit({
				action: "update",
				options: {
					...updates,
					id
				}
			});
		},
		promise(promiseValue, options) {
			let handledPromise = promiseValue;
			emit({
				action: "promise",
				options: {
					...options,
					promise: promiseValue,
					setPromise(promise) {
						handledPromise = promise;
					}
				}
			});
			return handledPromise;
		}
	};
}
//#endregion
//#region src/components/ui/toast.tsx
var TOAST_BAR_COLOR = {
	Default: "border-oc-success-border bg-oc-success-soft [&_[data-slot=toast-bar-icon]]:text-oc-success",
	Blue: "border-oc-info-border bg-oc-info-soft [&_[data-slot=toast-bar-icon]]:text-oc-primary",
	Red: "border-oc-destructive-border bg-oc-destructive-soft [&_[data-slot=toast-bar-icon]]:text-oc-destructive",
	Orange: "border-oc-warning-border bg-oc-warning-soft [&_[data-slot=toast-bar-icon]]:text-oc-warning",
	Grey: "border-oc-neutral-border bg-oc-neutral-soft [&_[data-slot=toast-bar-icon]]:text-oc-muted-foreground"
};
function ToastBar({ className, color, size, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "toast-bar",
		className: cn("relative flex w-fit max-w-full flex-nowrap items-center rounded-lg border border-solid text-oc-foreground shadow-[0_8px_6px_rgba(42,50,82,0.04)]", size === "Small" ? "gap-1 py-2 pr-3 pl-2 text-xs leading-normal" : "gap-3 py-3 pr-4 pl-3 text-sm leading-normal", TOAST_BAR_COLOR[color] ?? TOAST_BAR_COLOR.Default, className),
		children
	});
}
/** Use `toast.add({ title, description, type })`. `type`: success|info|warning|error|loading — not sonner. Default color is green. */
var toast = createToastManager$1();
var ToastPlacementContext = import_react.createContext("bottom-right");
var TYPE_TO_COLOR = {
	success: "Default",
	info: "Blue",
	warning: "Orange",
	error: "Red",
	loading: "Grey"
};
function ToastProvider({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastProvider$1, { ...props });
}
function ToastPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastPortal$1, {
		"data-slot": "toast-portal",
		...props
	});
}
function ToastViewport({ className, placement = "bottom-right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastPlacementContext.Provider, {
		value: placement,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastViewport$1, {
			"data-slot": "toast-viewport",
			"data-placement": placement,
			className: cn("pointer-events-none fixed z-50 w-[min(calc(100vw-2rem),24rem)] outline-none", placement === "top-left" && "top-4 left-4", placement === "top-center" && "top-4 left-1/2 -translate-x-1/2", placement === "top-right" && "top-4 right-4", placement === "bottom-left" && "bottom-4 left-4", placement === "bottom-center" && "bottom-4 left-1/2 -translate-x-1/2", placement === "bottom-right" && "right-4 bottom-4", className),
			...props
		})
	});
}
function Toast({ className, ...props }) {
	const placement = import_react.useContext(ToastPlacementContext);
	const fromTop = placement.startsWith("top-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastRoot, {
		"data-slot": "toast",
		"data-placement": placement,
		className: cn("group/toast pointer-events-auto absolute right-0 z-[calc(1000-var(--toast-index))] w-full rounded-lg bg-transparent shadow-none will-change-transform outline-none select-none", "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]", "h-(--height) [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]", "data-expanded:h-(--toast-height) data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]", "data-limited:opacity-0", "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]", "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]", "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]", "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]", "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]", "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]", "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]", "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]", fromTop ? "top-0 origin-top [--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))] transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))] after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-starting-style:transform-[translateY(-150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(-150%)]" : "bottom-0 origin-bottom [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-starting-style:transform-[translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]", className),
		...props
	});
}
function ToastContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastContent$1, {
		"data-slot": "toast-content",
		className: cn("flex w-full items-start overflow-visible p-0 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100", className),
		...props
	});
}
function ToastTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastTitle$1, {
		"data-slot": "toast-title",
		className: cn("text-sm font-medium text-oc-foreground", className),
		...props
	});
}
function ToastDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastDescription$1, {
		"data-slot": "toast-description",
		className: cn("text-oc-foreground", className),
		...props
	});
}
function ToastAction({ className, render = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
	variant: "outline",
	size: "sm"
}), ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastAction$1, {
		"data-slot": "toast-action",
		render,
		className: cn("shrink-0", className),
		...props
	});
}
function ToastClose({ className, children, render = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
	variant: "ghost",
	size: "icon-sm"
}), ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastClose$1, {
		"data-slot": "toast-close",
		"aria-label": "Close toast",
		render,
		className: cn("relative shrink-0 text-oc-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-oc-foreground", className),
		...props,
		children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": "true" })
	});
}
function ToastIcon({ type, size }) {
	let icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "aria-hidden": "true" });
	if (type === "success") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { "aria-hidden": "true" });
	if (type === "info") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { "aria-hidden": "true" });
	if (type === "warning") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { "aria-hidden": "true" });
	if (type === "error") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonX, { "aria-hidden": "true" });
	if (type === "loading") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		className: "animate-spin",
		"aria-hidden": "true"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-slot": "toast-bar-icon",
		className: cn("inline-flex shrink-0 items-center justify-center [&_svg]:size-full", size === "Small" ? "size-4" : "size-6"),
		children: icon
	});
}
function ToastList() {
	const { toasts } = useToastManager$1();
	return toasts.map((toastItem) => {
		const color = TYPE_TO_COLOR[toastItem.type ?? ""] ?? "Default";
		const hasTitle = Boolean(toastItem.title);
		const hasDescription = Boolean(toastItem.description);
		const size = hasTitle && hasDescription ? "Default" : "Small";
		const hasAction = Boolean(toastItem.actionProps);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {
			toast: toastItem,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastBar, {
				color,
				size,
				className: "mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastIcon, {
						type: toastItem.type,
						size
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 flex-col gap-0.5 whitespace-nowrap",
						children: [hasTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-auto text-sm font-medium text-oc-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastTitle, {})
						}) : null, hasDescription ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-auto text-oc-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastDescription, { className: size === "Small" ? "text-xs" : "text-sm" })
						}) : null]
					}),
					hasAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-1 shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastAction, {})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastClose, {})
				]
			}) })
		}, toastItem.id);
	});
}
function Toaster({ children, toastManager = toast, placement = "bottom-right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastProvider, {
		toastManager,
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastViewport, {
			placement,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastList, {})
		}) })]
	});
}
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-BNA0SRaR.css";
//#endregion
//#region src/routes/__root.tsx
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex h-full min-h-0 w-full flex-1 items-center justify-center px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-oc-muted-foreground",
				children: "That page does not exist."
			})
		})
	});
}
function Pending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full min-h-0 w-full flex-1 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-oc-muted-foreground",
			children: "Loading…"
		})
	});
}
var Route$1 = createRootRoute({
	ssr: false,
	pendingComponent: Pending,
	notFoundComponent: NotFound,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "HitPay App" }
		],
		links: [
			{
				rel: "icon",
				href: "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><rect width=\"32\" height=\"32\" rx=\"8\" fill=\"%232465de\"/></svg>"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "h-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmationModalProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				placement: "top-center",
				children
			}) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-B8SOxklb.js");
//#endregion
//#region src/routeTree.gen.ts
var rootRouteChildren = { IndexRoute: createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") }).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultPendingMinMs: 0,
		defaultNotFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-8 text-sm text-oc-muted-foreground",
			children: "That page does not exist."
		})
	});
}
//#endregion
export { getRouter };
