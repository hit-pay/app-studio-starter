import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import SwitchDemoDocs from "../../../docs/ui/switch.mdx";

export const Route = createFileRoute("/ui/switch")({
  component: SwitchExamplesPage,
});

function SwitchExamplesPage() {
  return (
    <DocExamplePage to="/ui/switch">
      <DocMdx>
        <SwitchDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
