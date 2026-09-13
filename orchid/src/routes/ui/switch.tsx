import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import SwitchDemoDocs from "../../../content/docs/components/switch.mdx";

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
