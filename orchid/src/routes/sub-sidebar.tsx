import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import SubSidebarDemoDocs from "../../content/docs/components/sub-sidebar.mdx";

export const Route = createFileRoute("/sub-sidebar")({
  component: SubSidebarExamplesPage,
});

function SubSidebarExamplesPage() {
  return (
    <DocExamplePage to="/sub-sidebar">
      <DocMdx>
        <SubSidebarDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
