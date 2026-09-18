import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/installation")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
