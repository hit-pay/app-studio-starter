import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import IntroductionDocs from "../../content/docs/guides/introduction.mdx";

export const Route = createFileRoute("/introduction")({
  component: IntroductionPage,
});

function IntroductionPage() {
  return (
    <DocExamplePage to="/introduction">
      <DocMdx>
        <IntroductionDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
