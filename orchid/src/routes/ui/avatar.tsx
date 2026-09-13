import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import AvatarDocs from "../../../docs/ui/avatar.mdx";

export const Route = createFileRoute("/ui/avatar")({
  component: AvatarExamplesPage,
});

function AvatarExamplesPage() {
  return (
    <DocExamplePage to="/ui/avatar">
      <DocMdx>
        <AvatarDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
