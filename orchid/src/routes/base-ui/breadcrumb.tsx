import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import BreadcrumbDocs from "../../../content/docs/components/breadcrumb.mdx";

export const Route = createFileRoute("/base-ui/breadcrumb")({
  component: BreadcrumbExamplesPage,
});

function BreadcrumbExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/breadcrumb">
      <DocMdx>
        <BreadcrumbDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
