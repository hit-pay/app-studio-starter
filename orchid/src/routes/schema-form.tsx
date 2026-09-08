import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/schema-form")({
  beforeLoad: () => {
    throw redirect({ to: "/form-builder" });
  },
});
