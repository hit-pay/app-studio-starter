import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/theming")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
