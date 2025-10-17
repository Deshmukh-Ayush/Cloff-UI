import fs from "fs/promises";
import path from "path";

export type DocPage = {
  title: string;
  slugSegments: string[];
  filePath: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

function stripNumberPrefix(name: string) {
  return name.replace(/^\d+[-_]/, "");
}

function toSlugSegment(name: string) {
  return stripNumberPrefix(name)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

export async function getDocsSidebar(): Promise<Record<string, DocPage[]>> {
  const sidebar: Record<string, DocPage[]> = {};

  const dirExists = await fs
    .stat(CONTENT_ROOT)
    .then((s) => s.isDirectory())
    .catch(() => false);
  if (!dirExists) return sidebar;

  const categories = (await fs.readdir(CONTENT_ROOT)).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_ROOT, category);
    const stat = await fs.stat(categoryPath);
    if (!stat.isDirectory()) continue;

    const files = (await fs.readdir(categoryPath)).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true }),
    );

    const cleanCategory = stripNumberPrefix(category);
    const categorySlug = toSlugSegment(category);

    sidebar[cleanCategory] = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const cleanTitle = stripNumberPrefix(file).replace(/\.mdx$/, "");
        const title = cleanTitle;
        const slugSegments = [categorySlug, toSlugSegment(cleanTitle)];
        const filePath = path.join(category, file).replace(/\\/g, "/");
        return {
          title,
          slugSegments,
          filePath,
        } as DocPage;
      });
  }

  return sidebar;
}

export async function getAllDocPages(): Promise<DocPage[]> {
  const sidebar = await getDocsSidebar();
  return Object.values(sidebar).flat();
}

export async function findFilePathForSlug(
  slugParts: string[],
): Promise<string | null> {
  const all = await getAllDocPages();
  const match = all.find(
    (p) =>
      p.slugSegments.length === slugParts.length &&
      p.slugSegments.every((seg, i) => seg === slugParts[i]),
  );
  return match ? match.filePath : null;
}
