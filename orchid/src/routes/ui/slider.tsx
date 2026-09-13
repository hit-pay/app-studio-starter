import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import SliderDemoDocs from "../../../docs/ui/slider.mdx";

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
