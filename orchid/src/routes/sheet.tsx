import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import SheetDemoDocs from "../../content/docs/components/sheet.mdx";

export const Route = createFileRoute("/sheet")({
  component: SheetExamplesPage,
});

function SheetExamplesPage() {
  return (
    <DocExamplePage to="/sheet">
      <DocMdx>
        <SheetDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
