import { createFileRoute } from "@tanstack/react-router";
import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import Docs from "../../content/docs/guides/installation-astro.mdx";

export const Route = createFileRoute("/installation/astro")({
  component: Page,
});

function Page() {
  return (
    <DocExamplePage to="/installation/astro">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  );
}
