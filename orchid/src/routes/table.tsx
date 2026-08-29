import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import TableDemoDocs from "../../content/docs/components/table.mdx";

export const Route = createFileRoute("/table")({
  component: TableExamplesPage,
});

function TableExamplesPage() {
  return (
    <DocExamplePage to="/table">
      <DocMdx>
        <TableDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
