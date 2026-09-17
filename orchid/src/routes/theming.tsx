import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import ThemingDocs from "../../docs/guides/theming.mdx";

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
