import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import SheetDemoDocs from "../../../content/docs/components/sheet.mdx";

export const Route = createFileRoute("/base-ui/sheet")({
  component: SheetExamplesPage,
});

function SheetExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/sheet">
      <DocMdx>
        <SheetDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
