import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import ThemingDocs from "../../content/docs/guides/theming.mdx";

export const Route = createFileRoute("/theming")({ component: ThemingPage });

function ThemingPage() {
  return (
    <DocExamplePage to="/theming">
      <DocMdx>
        <ThemingDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
