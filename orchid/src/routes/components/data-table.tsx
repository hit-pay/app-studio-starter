import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import DataTableDocs from "../../../content/docs/components/data-table.mdx";

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
