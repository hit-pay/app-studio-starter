import type { ComponentType } from "react";

function withDemoUsage(
  Demo: ComponentType,
  _source: string,
  _filename: string,
) {
  return Demo;
}

export { withDemoUsage };
