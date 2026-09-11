import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import BannerDocs from "../../../content/docs/components/banner.mdx";

export const Route = createFileRoute("/base-ui/banner")({
  component: BannerExamplesPage,
});

function BannerExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/banner">
      <DocMdx>
        <BannerDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
