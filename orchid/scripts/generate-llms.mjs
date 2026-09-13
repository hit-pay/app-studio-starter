import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  DOC_ALL_COMPONENTS,
} from "../src/components/doc/doc-components.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "public", "llms.txt");
const appOutput = join(root, "..", "app", "orchid-ui-guideline.md");
const legacyDocsDir = join(root, "public", "llms");
const documented = [...DOC_ALL_COMPONENTS];
function slug(item) {
  return item.to.replace(/^\//, "").split("/").at(-1);
}

function assertUnique(items, field, label) {
  const seen = new Set();
  for (const item of items) {
    const value = field(item);
    if (seen.has(value)) {
      throw new Error(`Duplicate documented ${label}: ${value}`);
    }
    seen.add(value);
  }
}

assertUnique(documented, slug, "slug");
assertUnique(documented, (item) => item.name, "name");

function findMdx(item) {
  const name = slug(item);
  const candidates = [
    join(root, "content/docs/components", `${name}.mdx`),
    join(root, "content/docs/guides", `${name}.mdx`),
  ];
  const found = candidates.find((path) => existsSync(path));
  if (!found) {
    throw new Error(`No MDX source for ${item.to} (${name})`);
  }
  return found;
}

function rewriteDocHref(href) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("#") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }
  if (!href.startsWith("/")) return href;
  const [path, hash] = href.split("#");
  if (
    path.startsWith("/r/") ||
    path === "/registry.json" ||
    path === "/orchid-tokens.css" ||
    path === "/llms.txt" ||
    /\.\w+$/.test(path)
  ) {
    return href;
  }
  const name = path.replace(/^\//, "").replaceAll("/", "-");
  return `/llms.txt#${name}${hash ? `-${hash}` : ""}`;
}

function mdxToMarkdown(source, title, description, anchor, componentFile) {
  const fences = [];
  let body = source.replace(/```[\s\S]*?```/g, (block) => {
    const token = `@@FENCE${fences.length}@@`;
    fences.push(block);
    return token;
  });

  body = body.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, "");

  body = body.replace(/<[A-Z][A-Za-z0-9]*\s*\/>/g, "");

  body = body.replace(/\]\(([^)]+)\)/g, (_all, href) => `](${rewriteDocHref(href)})`);

  body = body.replace(/@@FENCE(\d+)@@/g, (_all, index) => fences[Number(index)]);
  body = body.replace(/\n{3,}/g, "\n\n").trim();

  return [
    `<a id="${anchor}"></a>`,
    `# ${title}`,
    "",
    description,
    componentFile ? `Source file: \`${componentFile}\`.` : "",
    "",
    body,
    "",
  ].join("\n");
}

function generateMarkdownDocs() {
  const pages = documented;
  return pages.map((item) => {
    const mdxFile = findMdx(item);
    return mdxToMarkdown(
      readFileSync(mdxFile, "utf8"),
      item.name,
      item.description,
      slug(item),
      `${item.to.replace(/^\/(ui|components)\//, "src/$1/")}.tsx`,
    );
  });
}

const markdownDocs = generateMarkdownDocs();

mkdirSync(dirname(output), { recursive: true });
rmSync(legacyDocsDir, { recursive: true, force: true });
const document = markdownDocs.join("\n\n");
writeFileSync(output, document);
writeFileSync(appOutput, document.replaceAll("/llms.txt", "/orchid-ui-guideline.md"));

console.log(
  `Wrote ${output} and ${appOutput} with ${markdownDocs.length} documentation sections`,
);
