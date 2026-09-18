import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/components-json")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
