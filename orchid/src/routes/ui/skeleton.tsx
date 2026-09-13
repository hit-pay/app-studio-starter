import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import SkeletonDemoDocs from "../../../docs/ui/skeleton.mdx";

export const Route = createFileRoute("/ui/skeleton")({
  component: SkeletonExamplesPage,
});

function SkeletonExamplesPage() {
  return (
    <DocExamplePage to="/ui/skeleton">
      <DocMdx>
        <SkeletonDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
