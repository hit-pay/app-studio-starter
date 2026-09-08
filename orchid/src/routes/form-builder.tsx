import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import FormBuilderDocs from "../../content/docs/components/form-builder.mdx";

export const Route = createFileRoute("/form-builder")({
  component: FormBuilderPage,
});

function FormBuilderPage() {
  return (
    <DocExamplePage to="/form-builder">
      <DocMdx>
        <FormBuilderDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
