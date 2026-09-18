import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/mcp")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
