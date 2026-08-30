import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import CliDocs from "../../content/docs/guides/cli.mdx";

export const Route = createFileRoute("/cli")({ component: CliPage });

function CliPage() {
  return (
    <DocExamplePage to="/cli">
      <DocMdx>
        <CliDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
