import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import SchemaFormDemoDocs from "../../content/docs/components/schema-form.mdx";

export const Route = createFileRoute("/schema-form")({
  component: SchemaFormExamplesPage,
});

function SchemaFormExamplesPage() {
  return (
    <DocExamplePage to="/schema-form">
      <DocMdx>
        <SchemaFormDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
