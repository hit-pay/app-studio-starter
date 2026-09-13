import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import AvatarDocs from "../../../content/docs/components/avatar.mdx";

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
