import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import BannerDocs from "../../../docs/ui/banner.mdx";

export const Route = createFileRoute("/ui/banner")({
  component: BannerExamplesPage,
});

function BannerExamplesPage() {
  return (
    <DocExamplePage to="/ui/banner">
      <DocMdx>
        <BannerDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
