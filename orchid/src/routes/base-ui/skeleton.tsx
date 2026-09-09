import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import SkeletonDemoDocs from "../../../content/docs/components/skeleton.mdx";

export const Route = createFileRoute("/base-ui/skeleton")({
  component: SkeletonExamplesPage,
});

function SkeletonExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/skeleton">
      <DocMdx>
        <SkeletonDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
