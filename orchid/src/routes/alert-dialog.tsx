import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/alert-dialog")({
  beforeLoad: () => {
    throw redirect({ to: "/confirmation-modal" });
  },
});
