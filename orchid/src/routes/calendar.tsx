import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import CalendarDocs from "../../content/docs/components/calendar.mdx";

export const Route = createFileRoute("/calendar")({
  component: CalendarExamplesPage,
});

function CalendarExamplesPage() {
  return (
    <DocExamplePage to="/calendar">
      <DocMdx>
        <CalendarDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
