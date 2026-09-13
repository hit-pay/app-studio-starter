import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import DataTableDocs from "../../../docs/components/data-table.mdx";

export const Route = createFileRoute("/components/data-table")({
  component: DataTablePage,
});

function DataTablePage() {
  return (
    <DocExamplePage to="/components/data-table">
      <DocMdx>
        <DataTableDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
