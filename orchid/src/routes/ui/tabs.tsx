import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import TabsDemoDocs from "../../../docs/ui/tabs.mdx";

export const Route = createFileRoute("/ui/tabs")({
  component: TabsExamplesPage,
});

function TabsExamplesPage() {
  return (
    <DocExamplePage to="/ui/tabs">
      <DocMdx>
        <TabsDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
