import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import CommandDocs from "../../content/docs/components/command.mdx";

export const Route = createFileRoute("/command")({
  component: CommandExamplesPage,
});

function CommandExamplesPage() {
  return (
    <DocExamplePage to="/command">
      <DocMdx>
        <CommandDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
