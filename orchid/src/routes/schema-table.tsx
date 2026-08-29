import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import SchemaTableDemoDocs from "../../content/docs/components/schema-table.mdx";

export const Route = createFileRoute("/schema-table")({
  component: SchemaTableExamplesPage,
});

function SchemaTableExamplesPage() {
  return (
    <DocExamplePage to="/schema-table">
      <DocMdx>
        <SchemaTableDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
