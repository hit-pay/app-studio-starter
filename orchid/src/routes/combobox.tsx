import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import ComboboxDocs from "../../content/docs/components/combobox.mdx";

export const Route = createFileRoute("/combobox")({
  component: ComboboxExamplesPage,
});

function ComboboxExamplesPage() {
  return (
    <DocExamplePage to="/combobox">
      <DocMdx>
        <ComboboxDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
