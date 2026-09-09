import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MoonRegular, SunRegular } from "@mingcute/react/core-regular";

import { DOC_GUIDES } from "./doc-components";

const THEME_KEY = "orchid-theme";

const DOC_PATHS = new Set<string>(DOC_GUIDES.map((item) => item.to));

function readTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function navClass(active: boolean) {
  return [
    "rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors",
    active
      ? "bg-white/15 font-medium text-white"
      : "text-white/65 hover:bg-white/10 hover:text-white",
  ].join(" ");
}

function DocHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [theme, setTheme] = useState<"light" | "dark">(readTheme);
  const docsActive = DOC_PATHS.has(pathname);
  const blocksActive =
    pathname === "/components" || pathname.startsWith("/components/");
  const baseActive = pathname === "/base-ui" || pathname.startsWith("/base-ui/");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 bg-black px-6 text-white">
      <div className="flex min-w-0 items-center gap-6">
        <Link to="/" className="shrink-0 text-sm font-semibold text-white">
          Orchid UI
        </Link>
        <nav aria-label="Site" className="flex items-center gap-1">
          <Link
            to="/installation"
            aria-current={docsActive ? "page" : undefined}
            className={navClass(docsActive)}
          >
            Docs
          </Link>
          <Link
            to="/components"
            aria-current={blocksActive ? "page" : undefined}
            className={navClass(blocksActive)}
          >
            Components & Blocks
          </Link>
          <Link
            to="/base-ui"
            aria-current={baseActive ? "page" : undefined}
            className={navClass(baseActive)}
          >
            Base Components
          </Link>
        </nav>
      </div>
      <button
        type="button"
        aria-label={
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        }
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="inline-flex size-8 items-center justify-center rounded-lg text-white/70 outline-none hover:bg-white/10 hover:text-white"
      >
        {theme === "dark" ? (
          <SunRegular className="size-4" />
        ) : (
          <MoonRegular className="size-4" />
        )}
      </button>
    </header>
  );
}

export { DocHeader };
