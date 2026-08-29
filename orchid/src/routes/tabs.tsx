import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import TabsDemoDocs from "../../content/docs/components/tabs.mdx";

export const Route = createFileRoute("/tabs")({
  component: TabsExamplesPage,
});

function TabsExamplesPage() {
  return (
    <DocExamplePage to="/tabs">
      <DocMdx>
        <TabsDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
