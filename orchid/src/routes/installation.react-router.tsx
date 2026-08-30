import { createFileRoute } from "@tanstack/react-router";
import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import Docs from "../../content/docs/guides/installation-react-router.mdx";

export const Route = createFileRoute("/installation/react-router")({
  component: Page,
});

function Page() {
  return (
    <DocExamplePage to="/installation/react-router">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  );
}
