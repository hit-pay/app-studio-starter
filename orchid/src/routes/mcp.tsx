import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import McpDocs from "../../docs/guides/mcp.mdx";

export const Route = createFileRoute("/mcp")({
  component: McpPage,
});

function McpPage() {
  return (
    <DocExamplePage to="/mcp">
      <DocMdx>
        <McpDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
