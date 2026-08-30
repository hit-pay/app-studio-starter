import { createFileRoute } from "@tanstack/react-router";
import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import Docs from "../../content/docs/guides/installation-vite.mdx";

export const Route = createFileRoute("/installation/vite")({ component: Page });

function Page() {
  return (
    <DocExamplePage to="/installation/vite">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  );
}
