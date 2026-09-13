import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import SliderDemoDocs from "../../../content/docs/components/slider.mdx";

export const Route = createFileRoute("/ui/slider")({
  component: SliderExamplesPage,
});

function SliderExamplesPage() {
  return (
    <DocExamplePage to="/ui/slider">
      <DocMdx>
        <SliderDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
