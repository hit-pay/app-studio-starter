import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import FormBuilderDocs from "../../../docs/components/form-builder.mdx";

export const Route = createFileRoute("/components/form-builder")({
  component: FormBuilderPage,
});

function FormBuilderPage() {
  return (
    <DocExamplePage to="/components/form-builder">
      <DocMdx>
        <FormBuilderDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
