import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import InstallationDocs from "../../docs/guides/installation.mdx";

export const Route = createFileRoute("/installation")({
  component: InstallationPage,
});

function InstallationPage() {
  return (
    <DocExamplePage to="/installation">
      <DocMdx>
        <InstallationDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
