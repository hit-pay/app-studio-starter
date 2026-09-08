import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/schema-table")({
  beforeLoad: () => {
    throw redirect({ to: "/data-table" });
  },
});
