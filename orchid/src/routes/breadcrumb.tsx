import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import BreadcrumbDocs from "../../content/docs/components/breadcrumb.mdx";

export const Route = createFileRoute("/breadcrumb")({
  component: BreadcrumbExamplesPage,
});

function BreadcrumbExamplesPage() {
  return (
    <DocExamplePage to="/breadcrumb">
      <DocMdx>
        <BreadcrumbDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
